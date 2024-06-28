import * as fs from "fs";
import * as path from "path";

interface ILogMessage {
    timestamp: string;
    message: string;
    additionalInfo?: any;
}

const logFilePath = path.join(__dirname, "..", "./logs", "log.json");
const logs: ILogMessage[] = [];

function logToJson(message: string, additionalInfo?: any) {
    const logData: ILogMessage = {
        timestamp: new Date().toISOString(),
        message: message,
    };

    if (additionalInfo) {
        logData["additionalInfo"] = additionalInfo;
    }

    logs.push(logData);
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    fs.writeFileSync(logFilePath, JSON.stringify(logs), {
        encoding: "utf8",
    });
}

export default logToJson;
