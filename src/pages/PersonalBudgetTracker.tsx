import { useState, useEffect } from "react";
import Category from "../components/Category";
import { CategoryType, TransactionType } from "../types";
import { initialCategories } from "../data";
import { Transaction } from "../components/Transaction";
import { DisplayTransactions } from "../components/DisplayTransactions";
import { Balance } from "./Balance";
import Chart from "../components/Chart";

const parseTransactions = (transactions: TransactionType[]): any[] => {
  return transactions.map((transaction: TransactionType) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));
};

const stringifyTransactions = (transactions: TransactionType[]): any[] => {
  return transactions.map((transaction) => ({
    ...transaction,
    date: transaction.date.toISOString(),
  }));
};

function PersonalBudgetTracker() {
  const [categories, setCategories] = useState<CategoryType[]>(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : initialCategories;
  });

  const [transactions, setTransactions] = useState<TransactionType[]>(() => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions
      ? parseTransactions(JSON.parse(storedTransactions))
      : [];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(stringifyTransactions(transactions))
    );
  }, [transactions]);

  const addCategory = (category: string) => {
    setCategories((previous) => [...previous, { name: category }]);
  };

  const addTransaction = (transaction: TransactionType) => {
    setTransactions((previous) => [...previous, transaction]);
  };

  const deleteTransaction = (transaction: TransactionType) => {
    setTransactions((previous) =>
      previous.filter(
        (trans) => trans.date.getTime() !== transaction.date.getTime()
      )
    );
  };

  return (
    <div>
      <Balance transactions={transactions} />
      <Transaction
        transactions={transactions}
        categories={categories}
        addTransaction={addTransaction}
      />
      <Category categories={categories} addCategory={addCategory} />
      {transactions.length !== 0 ? <Chart transactions={transactions} /> : null}
      <DisplayTransactions
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default PersonalBudgetTracker;
