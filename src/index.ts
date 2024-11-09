import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import budgetsRouter from "./routes/budgets";

const app: Express = express();
const PORT: number = 8000;

app.use(bodyParser.json());
app.use("/api/budgets", budgetsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
