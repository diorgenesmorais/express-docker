import express, { Request, Response } from 'express'

const app = express()
const PORT = process.env.PORT || 4000

app.get('/', (req: Request, res: Response) => {
    res.json({text: 'Hello, welcome'})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
