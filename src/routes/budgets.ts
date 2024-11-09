import express, { Request, Response, Router } from "express";
import { Budgets } from "../data";

const budgetsRouter: Router = express.Router();

budgetsRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Budgets);
});

budgetsRouter.get("/:budgetId", (req: Request, res: Response) => {
  const budget = Budgets.filter(
    (budget) => budget.id === Number(req.params.budgetId)
  );
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

budgetsRouter.delete("/:budgetId", (req: Request, res: Response) => {
  const idx = Budgets.findIndex(
    (budget) => budget.id === Number(req.params.budgetId)
  );
  if (idx !== -1) {
    const budget = Budgets.splice(idx, 1);
    res.send(budget);
  } else {
    res.status(404).send("Budget not found");
  }
});

budgetsRouter.put("/:budgetId", (req: Request, res: Response) => {
  const idx = Budgets.findIndex(
    (budget) => budget.id === Number(req.params.budgetId)
  );
  if (idx !== -1) {
    Budgets[idx] = {
      id: Budgets[idx].id,
      name: req.body.name,
      budget: req.body.budget,
      description: req.body.description,
    };
    res.send(Budgets[idx]);
  } else {
    res.status(404).send("Budget not found");
  }
});

export default budgetsRouter;
