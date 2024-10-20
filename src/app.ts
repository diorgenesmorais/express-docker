import express, { Request, Response } from "express";
import cep from "cep-promise";
import { logList, logToJson } from "./logger-file";

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
    res.json({
        text: 'hello, welcome, check a cep on the route "/cep?zipcode=01000000"',
    });
});

app.get("/cep", async (req: Request, res: Response) => {
    const { zipcode } = req.query;

    if (!zipcode) {
        res.status(400).json({
            error: "You need to pass the zipcode as a parameter in the url",
        });
        return;
    }

    try {
        const result = await cep(zipcode.toString());
    
        logToJson("Response", result);
    
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: error,
        });
    }
});

app.get('/logs', async (req: Request, res: Response) => {
    try {
        const result = logList();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Error reading or parsing log file'
        });
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ensure that unhandled promise rejections are caught here
process.on('unhandledRejection', (reason, promise) => {
    console.error('[Unhandled Rejection at:]', promise, '[reason:]', reason);
});