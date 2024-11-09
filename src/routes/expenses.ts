import express, { Request, Response, Router } from "express";
import { Expenses } from "../data";

const expensesRouter: Router = express.Router();

expensesRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Expenses);
});

expensesRouter.post("/", (req: Request, res: Response) => {
  const { name, cost, budgetId } = req.body;
  const id = Expenses.length + 1;
  const newExpense = { id, name, cost, budgetId };
  Expenses.push(newExpense);
  res.status(201).send(newExpense);
});

export default expensesRouter;
