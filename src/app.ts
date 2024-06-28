import express, { Request, Response } from "express";
import cep from "cep-promise";
import logToJson from "./logger-file";

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

    const result = await cep(zipcode.toString());

    logToJson("Response", result);

    res.status(200).json(result);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
