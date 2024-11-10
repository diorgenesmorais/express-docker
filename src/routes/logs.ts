import express, { Request, Response } from 'express';
import { logList } from '../logger-file';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = logList();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Error reading or parsing log file'
        });
    }
});

export default router;
