import { useState } from "react";
import Category from "../components/Category";
import { CategoryType, TransactionType } from "../types";
import { initialCategories } from "../data";
import { Transaction } from "../components/Transaction";
import { DisplayTransactions } from "../components/DisplayTransactions";
import { Balance } from "./Balance";
import Chart from "../components/Chart";
function PersonalBudgetTracker() {
  const [categories, setCategories] =
    useState<CategoryType[]>(initialCategories);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const addCategory = (category: string) => {
    setCategories((previous) => [...previous, { name: category }]);
  };
  const addTransaction = (transaction: TransactionType) => {
    setTransactions((previous) => [...previous, transaction]);
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
      <Chart transactions={transactions} />
      <DisplayTransactions transactions={transactions} />
    </div>
  );
}

export default PersonalBudgetTracker;
