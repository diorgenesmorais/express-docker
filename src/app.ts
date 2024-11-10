import express from "express";
import helmet from "helmet";
import router from "./routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(helmet());

app.use('/v1', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ensure that unhandled promise rejections are caught here
process.on('unhandledRejection', (reason, promise) => {
    console.error('[Unhandled Rejection at:]', promise, '[reason:]', reason);
});