import express, { Request, Response, Router, NextFunction } from "express";
import { Expenses, Budgets } from "../data";

const expensesRouter: Router = express.Router();

interface ExpenseRequest extends Request {
  newExpense?: {
    name: string;
    cost: number;
    budgetId: string;
  };
  expenseId?: string;
  expenseIndex?: number;
}

const validateExpense = (
  req: ExpenseRequest,
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
  //Check total budget and total expenses of that budget
  const budgetAmount = budget.budget;
  const expenses = Expenses.filter((expense) => expense.id === budgetId);
  const totalCost = expenses.reduce((a, b) => a + b.cost, 0);
  if (totalCost + cost > budgetAmount) {
    res.status(403).send("Budget depleted, can't add more expenses");
    return;
  }
  req.newExpense = { name, cost, budgetId };
  next();
};

expensesRouter.param(
  "expenseId",
  (req: ExpenseRequest, res: Response, next: NextFunction, id: string) => {
    const expenseId = Number(id);
    if (!expenseId) {
      res.status(400).send("Invalid expenseId");
      return;
    }
    const expenseIndex = Expenses.findIndex(
      (expense) => expense.id === expenseId
    );
    if (expenseIndex === -1) {
      res.status(400).send("Invalid expenseId");
      return;
    }
    req.expenseId = String(expenseId);
    req.expenseIndex = expenseIndex;
    next();
  }
);

expensesRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Expenses);
});

expensesRouter.get("/:expenseId", (req: ExpenseRequest, res: Response) => {
  const filteresExpenses = Expenses.filter(
    (expense) => expense.id === Number(req.expenseId)
  );
  res.status(200).send(filteresExpenses);
});

expensesRouter.post(
  "/",
  validateExpense,
  (req: ExpenseRequest, res: Response) => {
    if (req.newExpense) {
      const id = Expenses.length + 1;
      const payload = {
        ...req.newExpense,
        id,
        budgetId: Number(req.newExpense.budgetId),
      };
      Expenses.push(payload);
      res.status(201).send(req.newExpense);
    }
  }
);

expensesRouter.delete("/:expenseId", (req: ExpenseRequest, res: Response) => {
  if (req.expenseIndex) {
    const deletedExpense = Expenses.splice(req.expenseIndex, 1);
    res.send(deletedExpense);
  }
});

expensesRouter.put(
  "/:expenseId",
  validateExpense,
  (req: ExpenseRequest, res: Response) => {
    if (req.expenseIndex) {
      const updatedExpense = {
        id: Expenses[req.expenseIndex].id,
        name: req.body.name,
        cost: req.body.cost,
        budgetId: req.body.budgetId,
      };
      Expenses[req.expenseIndex] = updatedExpense;
      res.send(updatedExpense);
    }
    res.send();
  }
);

export default expensesRouter;
