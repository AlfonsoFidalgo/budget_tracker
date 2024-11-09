import express, { Express, Request, Response } from "express";
import budgetsRouter from "./routes/budgets";

const app: Express = express();
const PORT: number = 8000;

app.use("/api/budgets", budgetsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
