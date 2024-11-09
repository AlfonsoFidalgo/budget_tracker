import express, { Request, Response, Router } from "express";
import { Budgets } from "../data";

const budgetsRouter: Router = express.Router();

budgetsRouter.get("/", (req: Request, res: Response) => {
  res.status(202).send(Budgets);
});

export default budgetsRouter;
