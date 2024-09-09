import React, { useDebugValue, useEffect, useState } from "react";
import { BalanceProps } from "../types";

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
    <div className="p-4 bg-white shadow rounded-md mb-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Summaries</h2>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 p-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Month Summary
          </h3>
          <p className="text-lg font-semibold text-gray-700">Income:</p>
          <p className="text-xl text-green-700">${monthIncome.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Expenses:</p>
          <p className="text-xl text-red-700">${monthExpenses.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Balance:</p>
          <p
            className={`text-xl ${
              monthBalance >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            ${monthBalance.toFixed(2)}
          </p>
        </div>

        <div className="md:w-1/2 p-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Year Summary
          </h3>
          <p className="text-lg font-semibold text-gray-700">Income:</p>
          <p className="text-xl text-green-700">${yearIncome.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Expenses:</p>
          <p className="text-xl text-red-700">${yearExpenses.toFixed(2)}</p>
          <p className="text-lg font-semibold text-gray-700 mt-2">Balance:</p>
          <p
            className={`text-xl ${
              yearBalance >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            ${yearBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
