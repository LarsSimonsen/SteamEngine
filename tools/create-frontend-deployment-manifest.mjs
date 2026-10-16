import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);

const argumentValue = (name, fallback) => {
    const index = args.indexOf(name);
    return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const sourceDirectory = path.resolve(projectRoot, argumentValue("--source", "public"));
const outputPath = path.resolve(projectRoot, argumentValue(
    "--output",
    path.join(".build-runs", "frontend-deployment-manifest.json"),
));
const forbiddenNames = new Set(["web.config"]);

const contentTypeFor = (filePath) => {
    const contentTypes = {
        ".css": "text/css",
        ".gif": "image/gif",
        ".html": "text/html",
        ".ico": "image/x-icon",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".js": "text/javascript",
        ".json": "application/json",
        ".map": "application/json",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".txt": "text/plain",
        ".webmanifest": "application/manifest+json",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".xml": "application/xml",
    };
    return contentTypes[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
};

const filesUnder = (directory, relativeDirectory = "") => fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
        const relativePath = path.join(relativeDirectory, entry.name);
        const absolutePath = path.join(directory, entry.name);
        if (entry.isDirectory()) return filesUnder(absolutePath, relativePath);
        if (forbiddenNames.has(entry.name.toLowerCase())) {
            throw new Error(`Deployment source contains forbidden file: ${relativePath}`);
        }
        return [{ absolutePath, relativePath: relativePath.split(path.sep).join("/") }];
    });

if (!fs.existsSync(sourceDirectory)) throw new Error(`Deployment source does not exist: ${sourceDirectory}`);

const files = filesUnder(sourceDirectory).sort((left, right) => left.relativePath.localeCompare(right.relativePath));
const entries = files.map(({ absolutePath, relativePath }) => {
    const contents = fs.readFileSync(absolutePath);
    return {
        contentType: contentTypeFor(absolutePath),
        path: relativePath,
        sha256: crypto.createHash("sha256").update(contents).digest("hex"),
        size: contents.byteLength,
    };
});
const relativeSource = path.relative(projectRoot, sourceDirectory);

const manifest = {
    format: "steam-engine-frontend-deployment-v1",
    generatedAt: new Date().toISOString(),
    source: relativeSource.startsWith("..") ? "<temporary-upload-copy>" : relativeSource.split(path.sep).join("/"),
    excludedNames: [],
    fileCount: entries.length,
    totalBytes: entries.reduce((total, entry) => total + entry.size, 0),
    files: entries,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 4)}\n`, "utf8");
console.log(`Created ${path.relative(projectRoot, outputPath)} with ${entries.length} files.`);
