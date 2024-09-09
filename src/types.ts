// src\types.ts

export type CategoryType = {
  name: string;
};

export interface CategoriesProps {
  categories: CategoryType[];
  addCategory: (category: string) => void;
}
export interface TransactionProps {
  transactions: TransactionType[];
  categories: CategoryType[];
  addTransaction: (transaction: TransactionType) => void;
}

export interface DisplayTransactionProps {
  transactions: TransactionType[];
}

export interface ChartProps {
  transactions: TransactionType[];
}

export type TransactionCategory = "Income" | "Outcome";

export type TransactionType = {
  amount: number;
  transactionCategory: TransactionCategory;
  category: CategoryType;
  description: string;
  date: Date;
};
