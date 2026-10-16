import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const BROKER_PROTOCOL_VERSION = 1;
export const BROKER_MAX_MESSAGE_BYTES = 4096;
export const BROKER_SERVICE_NAME = "SteamEngineIisSlotBroker";
export const BROKER_NATIVE_CLIENT_PATH = "C:\\Program Files\\SteamEngineIisSlotBroker\\"
    + "SteamEngineIisSlotBrokerClient.exe";

const execFileAsync = promisify(execFile);

const installHint = "Install and start it with tools/iis-slot-broker/install-broker.ps1 and start-broker.ps1.";

export class IisSlotBrokerUnavailableError extends Error {
    constructor(cause) {
        super(`Steam Engine IIS slot broker is unavailable. ${installHint}`, { cause });
        this.name = "IisSlotBrokerUnavailableError";
    }
}

export class IisSlotBrokerHostIdentityError extends Error {
    constructor(cause) {
        super(
            "Steam Engine IIS slot broker is running, but its authenticated client is hidden from this "
            + "sandbox identity. Rerun the same build with host/unsandboxed execution approval; do not use "
            + "administrator elevation.",
            { cause },
        );
        this.name = "IisSlotBrokerHostIdentityError";
    }
}

export class IisSlotBrokerOperationError extends Error {
    constructor(code, message) {
        super(`Steam Engine IIS slot broker rejected the request (${code}): ${message}`);
        this.name = "IisSlotBrokerOperationError";
        this.code = code;
    }
}

const exchangeAuthenticatedPipe = async (request, timeoutMs) => {
    const arguments_ = request.operation === "inspect" ? ["inspect"] : ["switch", request.leaseId];
    const { stdout } = await execFileAsync(BROKER_NATIVE_CLIENT_PATH, arguments_, {
        encoding: "utf8",
        timeout: timeoutMs,
        windowsHide: true,
        maxBuffer: BROKER_MAX_MESSAGE_BYTES,
    });
    return stdout.trimEnd();
};

const probeBrokerService = async () => {
    try {
        const { stdout } = await execFileAsync("sc.exe", ["query", BROKER_SERVICE_NAME], {
            encoding: "utf8",
            timeout: 3000,
            windowsHide: true,
            maxBuffer: BROKER_MAX_MESSAGE_BYTES,
        });
        return /STATE\s+:\s+4\s+RUNNING/u.test(stdout);
    } catch {
        return false;
    }
};

const validateResponse = (responseText) => {
    let response;
    try {
        response = JSON.parse(responseText);
    } catch (error) {
        throw new IisSlotBrokerUnavailableError(error);
    }
    if (!response || response.protocolVersion !== BROKER_PROTOCOL_VERSION || typeof response.ok !== "boolean") {
        throw new IisSlotBrokerUnavailableError(new Error("invalid broker response"));
    }
    if (!response.ok) {
        throw new IisSlotBrokerOperationError(
            response.error?.code || "broker-error",
            response.error?.message || "The broker returned an unspecified error.",
        );
    }
    return response;
};

const request = async (payload, exchange, timeoutMs, serviceProbe) => {
    try {
        return validateResponse(await exchange(payload, timeoutMs));
    } catch (error) {
        if (error instanceof IisSlotBrokerOperationError || error instanceof IisSlotBrokerUnavailableError
            || error instanceof IisSlotBrokerHostIdentityError) throw error;
        if ((error?.code === "ENOENT" || error?.code === "EACCES") && await serviceProbe()) {
            throw new IisSlotBrokerHostIdentityError(error);
        }
        throw new IisSlotBrokerUnavailableError(error);
    }
};

export const createIisSlotBrokerClient = ({
    exchange = exchangeAuthenticatedPipe,
    serviceProbe = probeBrokerService,
    timeoutMs = 20000,
} = {}) => ({
    inspect: () => request(
        { protocolVersion: BROKER_PROTOCOL_VERSION, operation: "inspect" },
        exchange,
        timeoutMs,
        serviceProbe,
    ),
    switch: (leaseId) => {
        if (typeof leaseId !== "string" || !/^[A-Za-z0-9_-]{1,256}$/.test(leaseId)) {
            throw new TypeError("The broker lease ID must be an opaque broker-generated identifier.");
        }
        return request(
            { protocolVersion: BROKER_PROTOCOL_VERSION, operation: "switch", leaseId },
            exchange,
            timeoutMs,
            serviceProbe,
        );
    },
});

export const defaultIisSlotBrokerClient = createIisSlotBrokerClient();
