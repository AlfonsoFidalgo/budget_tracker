import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import budgetsRouter from "./routes/budgets";
import expensesRouter from "./routes/expenses";

const app: Express = express();
const PORT: number = 8000;

app.use(bodyParser.json());
app.use("/api/budgets", budgetsRouter);
app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
