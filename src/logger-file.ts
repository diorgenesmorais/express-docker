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
    fs.mkdir(path.dirname(logFilePath), { recursive: true }, (err) => {
        if (err) {
            throw err;
        }

        fs.writeFile(logFilePath, JSON.stringify(logs), "utf-8", (err) => {
            if (err) {
                throw err;
            }
        });
    });
}

function logList() {
    if (!fs.existsSync(logFilePath)) {
        throw new Error("Log file does not exist.");
    }

    try {
        const logData = fs.readFileSync(logFilePath, "utf-8");
        const logs: ILogMessage[] = JSON.parse(logData);
        return logs;
    } catch (err) {
        throw err;
    }
}

export { logToJson, logList };
