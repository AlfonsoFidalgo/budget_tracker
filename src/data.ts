export const Budgets = [
  {
    id: 1,
    name: "Groceries",
    budget: 400,
    description: "Groceries and other household items",
  },
  {
    id: 2,
    name: "Eating Out",
    budget: 200,
    description: "Restaurants, fast food, etc.",
  },
  {
    id: 3,
    name: "Rent",
    budget: 1000,
    description: "Monthly rent",
  },
];

export const Expenses = [
  {
    id: 1,
    name: "Landlord",
    cost: 750,
    budgetId: 3,
  },
  {
    id: 2,
    name: "Utilities",
    cost: 150,
    budgetId: 3,
  },
  {
    id: 3,
    name: "Dinner with people",
    cost: 35,
    budgetId: 2,
  },
];
