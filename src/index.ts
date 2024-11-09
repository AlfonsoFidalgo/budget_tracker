import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 8000;

app.get("/", (req: Request, res: Response) => {
  res.status(202).send({response: "Hello World!"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
