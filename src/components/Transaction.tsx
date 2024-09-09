import React, { useState } from "react";
import {
  CategoryType,
  TransactionCategory,
  TransactionProps,
  TransactionType,
} from "../types";

export const Transaction: React.FC<TransactionProps> = ({
  transactions,
  categories,
  addTransaction,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [transactionCategory, settransactionCategory] =
    useState<TransactionCategory>("Outcome");
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const handleAddTransation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const transaction: TransactionType = {
      amount: amount,
      transactionCategory: transactionCategory,
      category: category,
      description: description,
      date: date,
    };
    addTransaction(transaction);
    setAmount(0);
    settransactionCategory("Outcome");
    setCategory(categories[0]);
    setDescription("");
    setDate(new Date());
  };

  return (
    <div className="mb-6">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="border p-2 rounded"
          />
          <select
            name="transactionCategory"
            value={transactionCategory}
            required
            onChange={(e) =>
              settransactionCategory(e.target.value as TransactionCategory)
            }
            className="border p-2 rounded"
          >
            <option value="Income">Income</option>
            <option value="Outcome">Outcome</option>
          </select>
          {transactionCategory === "Outcome" && (
            <select
              id="category"
              value={category.name}
              onChange={(e) =>
                setCategory(
                  categories.find((cat) => cat.name === e.target.value) ||
                    categories[0]
                )
              }
              className="border p-2 rounded"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={(e) => handleAddTransation(e)}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
        >
          Add transaction
        </button>
      </form>
    </div>
  );
};

export default Transaction;
