import express, { Request, Response } from 'express';
import routerCep from './cep';
import routerLogs from './logs';

const router = express.Router();

router.use('/cep', routerCep);
router.use('/logs', routerLogs);

router.get("/", (req: Request, res: Response) => {
    res.json({
        text: 'hello, welcome, check a cep on the route "/cep?zipcode=01000000"',
    });
});

export default router;