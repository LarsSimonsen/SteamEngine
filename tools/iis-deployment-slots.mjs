import fs from "node:fs";
import path from "node:path";

const decodeXml = (value) => value
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");

const normalizeDirectory = (directory) => path.resolve(directory)
    .replace(/[\\/]+$/, "")
    .toLocaleLowerCase("en-US");

const directoriesMatch = (first, second) => normalizeDirectory(first) === normalizeDirectory(second);

const describeRoots = (roots) => roots
    .map(({ name, physicalPath }) => `${name} -> ${physicalPath || "<empty>"}`)
    .join(", ") || "<none>";

export const localIisSlotsRoot = (projectRoot) => path.join(projectRoot, ".iis-slots");

export const localIisSlotDirectories = (projectRoot) => ({
    blue: path.join(localIisSlotsRoot(projectRoot), "blue"),
    green: path.join(localIisSlotsRoot(projectRoot), "green"),
});

export const determineIisDeploymentPlanFromBroker = ({
    activeState,
    inactiveTarget,
    projectRoot,
}) => {
    const slots = localIisSlotDirectories(projectRoot);
    const activeDirectory = activeState === "legacy-public"
        ? path.join(projectRoot, "public")
        : activeState === "blue" || activeState === "green" ? slots[activeState] : undefined;
    const expectedInactiveTarget = activeState === "blue" ? "green" : "blue";
    if (!activeDirectory || !slots[inactiveTarget] || inactiveTarget !== expectedInactiveTarget) {
        throw new Error("The IIS slot broker returned an invalid active/inactive slot combination.");
    }
    const inactiveDirectory = slots[inactiveTarget];
    if (directoriesMatch(activeDirectory, inactiveDirectory)) {
        throw new Error(`Refusing to clean the active IIS directory: ${inactiveDirectory}`);
    }
    return {
        projectRoot,
        activeDirectory: path.resolve(activeDirectory),
        activeSlot: activeState,
        inactiveDirectory: path.resolve(inactiveDirectory),
        inactiveSlot: inactiveTarget,
    };
};

export const parseAppCmdVirtualDirectories = (xml) => [...xml.matchAll(/<VDIR\b([^>]*)\/?\s*>/g)]
    .map((match) => Object.fromEntries(
        [...match[1].matchAll(/([\w.]+)="([^"]*)"/g)]
            .map((attribute) => [attribute[1], decodeXml(attribute[2])]),
    ))
    .map((attributes) => ({
        name: attributes["VDIR.NAME"] ?? attributes.name ?? "",
        path: attributes.path ?? "",
        physicalPath: attributes.physicalPath ?? "",
    }));

export const determineIisDeploymentPlan = ({
    roots,
    projectRoot,
    siteName = "",
}) => {
    const publicDirectory = path.join(projectRoot, "public");
    const slots = localIisSlotDirectories(projectRoot);
    const expectedDirectories = [publicDirectory, slots.blue, slots.green];
    const rootVirtualDirectories = roots.filter((root) => root.path === "/");
    let matches;

    if (siteName) {
        const expectedName = `${siteName.replace(/[\\/]+$/, "")}/`;
        matches = rootVirtualDirectories.filter((root) => root.name.toLocaleLowerCase("en-US")
            === expectedName.toLocaleLowerCase("en-US"));
        if (matches.length !== 1) {
            throw new Error(
                `Expected exactly one IIS root virtual directory named ${expectedName}; found ${matches.length}. `
                + `Configured roots: ${describeRoots(rootVirtualDirectories)}.`,
            );
        }
    } else {
        matches = rootVirtualDirectories.filter((root) => expectedDirectories
            .some((directory) => directoriesMatch(root.physicalPath, directory)));
        if (matches.length !== 1) {
            throw new Error(
                "Could not identify exactly one Steam Engine IIS site from its physicalPath. "
                + "Point one IIS site root at public, .iis-slots/blue, or .iis-slots/green, or set "
                + `STEAM_ENGINE_IIS_SITE. Matching roots: ${describeRoots(matches)}.`,
            );
        }
    }

    const activeRoot = matches[0];
    if (!expectedDirectories.some((directory) => directoriesMatch(activeRoot.physicalPath, directory))) {
        throw new Error(
            `IIS ${activeRoot.name} points to unexpected directory ${activeRoot.physicalPath}. `
            + "Refusing to guess which deployment slot is inactive.",
        );
    }

    const activeSlot = directoriesMatch(activeRoot.physicalPath, slots.blue)
        ? "blue"
        : directoriesMatch(activeRoot.physicalPath, slots.green) ? "green" : "legacy-public";
    const inactiveSlot = activeSlot === "blue" ? "green" : "blue";
    const inactiveDirectory = slots[inactiveSlot];
    if (directoriesMatch(activeRoot.physicalPath, inactiveDirectory)) {
        throw new Error(`Refusing to clean the active IIS directory: ${inactiveDirectory}`);
    }

    return {
        projectRoot,
        virtualDirectoryName: activeRoot.name,
        activeDirectory: path.resolve(activeRoot.physicalPath),
        activeSlot,
        inactiveDirectory,
        inactiveSlot,
    };
};

export const prepareInactiveIisSlot = (plan) => {
    const allowedSlots = Object.values(localIisSlotDirectories(plan.projectRoot));
    if (!allowedSlots.some((directory) => directoriesMatch(directory, plan.inactiveDirectory))) {
        throw new Error(`Refusing to clean an unexpected IIS slot path: ${plan.inactiveDirectory}`);
    }
    if (directoriesMatch(plan.activeDirectory, plan.inactiveDirectory)) {
        throw new Error(`Refusing to clean the active IIS directory: ${plan.inactiveDirectory}`);
    }
    try {
        fs.rmSync(plan.inactiveDirectory, { recursive: true, force: true });
    } catch (error) {
        if (error?.code !== "EBUSY") throw error;
        const slot = fs.lstatSync(plan.inactiveDirectory, { throwIfNoEntry: false });
        if (!slot?.isDirectory() || slot.isSymbolicLink()) {
            throw new Error(`Refusing to clean a locked non-directory IIS slot: ${plan.inactiveDirectory}`);
        }
        for (const entry of fs.readdirSync(plan.inactiveDirectory)) {
            fs.rmSync(path.join(plan.inactiveDirectory, entry), { recursive: true, force: true });
        }
        console.warn(`Inactive IIS slot root is locked; cleaned its contents in place: ${plan.inactiveDirectory}`);
    }
    fs.mkdirSync(plan.inactiveDirectory, { recursive: true });
};
