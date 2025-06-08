import express, { Request, Response } from 'express';
import { logList } from '../logger-file';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await logList();
        return res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Arquivo de log não existe.') {
            return res.status(404).json({
                message: 'Log file does not exist'
            });
        }
        
        return res.status(500).json({
            error: 'Error reading or parsing log file'
        });
    }
});

export default router;
