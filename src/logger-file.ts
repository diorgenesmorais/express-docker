import { promises as fs } from "fs";
import * as path from "path";

interface ILogMessage {
    timestamp: string;
    message: string;
    additionalInfo?: any;
}

const logDir = path.join(__dirname, "..", "logs");
const logFilePath = path.join(logDir, "log.json");

async function logToJson(message: string, additionalInfo?: any): Promise<void> {
    try {
        const logData: ILogMessage = {
            timestamp: new Date().toISOString(),
            message,
            ...(additionalInfo && { additionalInfo }),
        };

        await fs.mkdir(logDir, { recursive: true });

        let existingLogs: ILogMessage[] = [];

        try {
            const content = await fs.readFile(logFilePath, "utf-8");
            existingLogs = JSON.parse(content);
        } catch (err: any) {
            if (err.code !== "ENOENT") throw err;
        }

        existingLogs.push(logData);
        await fs.writeFile(logFilePath, JSON.stringify(existingLogs, null, 2), "utf-8");
    } catch (err) {
        console.error("Erro ao escrever log:", err);
    }
}

async function logList(): Promise<ILogMessage[]> {
    try {
        const data = await fs.readFile(logFilePath, "utf-8");
        return JSON.parse(data);
    } catch (err: any) {
        if (err.code === "ENOENT") {
            throw new Error("Arquivo de log não existe.");
        }
        throw err;
    }
}

export { logToJson, logList };
