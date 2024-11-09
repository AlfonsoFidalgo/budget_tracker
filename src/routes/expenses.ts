import express, { Request, Response, Router, NextFunction } from "express";
import { Expenses, Budgets } from "../data";

const expensesRouter: Router = express.Router();

interface CustomRequest extends Request {
  newExpense?: {
    name: string;
    cost: number;
    budgetId: string;
  };
}

const validateExpense = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const { name, cost, budgetId } = req.body;
  if (typeof cost !== "number") {
    res.status(400).send("Bad input type");
    return;
  }
  const budget = Budgets.find((b) => b.id === budgetId);
  if (!budget) {
    res.status(400).send("Inexisting budget");
    return;
  }
  req.newExpense = { name, cost, budgetId };
  next();
};

expensesRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Expenses);
});

expensesRouter.post("/", validateExpense, (req: Request, res: Response) => {
  const { name, cost, budgetId } = req.body;
  const id = Expenses.length + 1;
  const newExpense = { id, name, cost, budgetId };
  Expenses.push(newExpense);
  res.status(201).send(newExpense);
});

export default expensesRouter;
