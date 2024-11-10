import express, { Request, Response } from 'express';
import cep from 'cep-promise';
import { logToJson } from '../logger-file';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
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

export default router;
