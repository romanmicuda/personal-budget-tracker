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
    <div>
      <form>
        <div>
          <input
            type="text"
            value={amount}
            placeholder="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
          <select
            name="transactionCategory"
            value={transactionCategory}
            required
            onChange={(e) =>
              settransactionCategory(e.target.value as TransactionCategory)
            }
          >
            <option value="Income">Income</option>
            <option value="Outcome">Outcome</option>
          </select>
          {transactionCategory === "Outcome" ? (
            <select
              id="category"
              value={category.name}
              onChange={(e) =>
                setCategory(
                  categories.find((cat) => cat.name === e.target.value) ||
                    categories[0]
                )
              }
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          ) : (
            <></>
          )}

          <textarea
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            required
          />
        </div>
        <button onClick={(e) => handleAddTransation(e)}>Add Transaction</button>
      </form>
    </div>
  );
};
