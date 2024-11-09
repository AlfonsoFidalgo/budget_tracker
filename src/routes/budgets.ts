import express, { Request, Response, Router, NextFunction } from "express";
import { Budgets } from "../data";

const budgetsRouter: Router = express.Router();

interface BudgetRequest extends Request {
  budgetId?: string;
  budgetIndex?: number;
}

budgetsRouter.param(
  "budgetId",
  (req: BudgetRequest, res: Response, next: NextFunction, id: string) => {
    const budgetId = Number(id);
    if (!budgetId) {
      res.status(400).send("Invalid budget id.");
      return;
    }
    const idx = Budgets.findIndex((budget) => budget.id === budgetId);
    if (idx === -1) {
      res.status(400).send("Invalid budget id.");
      return;
    }
    req.budgetId = String(budgetId);
    req.budgetIndex = idx;
    next();
  }
);

budgetsRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Budgets);
});

budgetsRouter.get("/:budgetId", (req: BudgetRequest, res: Response) => {
  const budget = Budgets.find((budget) => budget.id === Number(req.budgetId));
  res.send(budget);
});

budgetsRouter.get("/total", (req: Request, res: Response) => {
  const total = Budgets.reduce((a, b) => a + b.budget, 0);
  res.send({ total });
});

budgetsRouter.post("/", (req: Request, res: Response) => {
  const { name, budget, description } = req.body;
  const id = Budgets.length + 1;
  const newBudget = { id, name, budget, description };
  Budgets.push(newBudget);
  res.status(201).send(newBudget);
});

budgetsRouter.delete("/:budgetId", (req: BudgetRequest, res: Response) => {
  if (req.budgetIndex) {
    const budget = Budgets.splice(req.budgetIndex, 1);
    res.send(budget);
  } else {
    res.status(400).send();
  }
});

budgetsRouter.put("/:budgetId", (req: BudgetRequest, res: Response) => {
  if (req.budgetIndex) {
    Budgets[req.budgetIndex] = {
      id: Budgets[req.budgetIndex].id,
      name: req.body.name,
      budget: req.body.budget,
      description: req.body.description,
    };
    res.send(Budgets[req.budgetIndex]);
  } else {
    res.status(404).send("Budget not found");
  }
});

export default budgetsRouter;
