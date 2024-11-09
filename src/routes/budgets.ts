import express, { Request, Response, Router } from "express";
import { Budgets } from "../data";

const budgetsRouter: Router = express.Router();

budgetsRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Budgets);
});

budgetsRouter.get("/total", (req: Request, res: Response) => {
    const total = Budgets.reduce((a, b) => a + b.budget, 0)
    res.send({total: total})
})

budgetsRouter.post("/", (req: Request, res: Response) => {
  const { name, budget, description } = req.body;
  const id = Budgets.length + 1;
  const newBudget = { id, name, budget, description };
  Budgets.push(newBudget);
  res.status(201).send(newBudget);
});

export default budgetsRouter;
