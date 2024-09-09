import React, { useDebugValue, useEffect, useState } from "react";
import { BalanceProps, DisplayTransactionProps } from "../types";

export const Balance: React.FC<BalanceProps> = ({ transactions }) => {
  const [monthIncome, setMonthIncome] = useState(0);
  const [monthExpenses, setMonthExpenses] = useState(0);
  const [yearIncome, setYearIncome] = useState(0);
  const [yearExpenses, setYearExpenses] = useState(0);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useDebugValue(currentMonth, (currentMonth) => `currentMonth ${currentMonth}`);

  useEffect(() => {
    console.log(transactions);

    let monthIncome = 0;
    let monthExpenses = 0;
    let yearIncome = 0;
    let yearExpenses = 0;

    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth();
      const year = transactionDate.getFullYear();

      if (transaction.transactionCategory === "Income") {
        if (month === currentMonth) {
          monthIncome += transaction.amount;
        }
        if (year === currentYear) {
          yearIncome += transaction.amount;
        }
      } else if (transaction.transactionCategory === "Outcome") {
        if (month === currentMonth) {
          monthExpenses += transaction.amount;
        }
        if (year === currentYear) {
          yearExpenses += transaction.amount;
        }
      }
    });

    setMonthIncome(monthIncome);
    setMonthExpenses(monthExpenses);
    setYearIncome(yearIncome);
    setYearExpenses(yearExpenses);
  }, [transactions, currentMonth, currentYear]);

  const monthBalance = monthIncome - monthExpenses;
  const yearBalance = yearIncome - yearExpenses;

  return (
    <div>
      <h2>Summaries</h2>
      <p>Month Income: ${monthIncome.toFixed(2)}</p>
      <p>Month Expenses: ${monthExpenses.toFixed(2)}</p>
      <p>Month Balance: ${monthBalance.toFixed(2)}</p>
      <p>Year Income: ${yearIncome.toFixed(2)}</p>
      <p>Year Expenses: ${yearExpenses.toFixed(2)}</p>
      <p>Year Balance: ${yearBalance.toFixed(2)}</p>
    </div>
  );
};
