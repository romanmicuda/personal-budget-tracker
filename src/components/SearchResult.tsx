import React from "react";
import { DisplayTransactionProps } from "../types";

const SearchResult: React.FC<DisplayTransactionProps> = ({
  transactions,
  deleteTransaction,
}) => {
  return (
    <div>
      {transactions.map((trans) => (
        <div
          key={trans.date.toISOString()}
          className="mb-4 p-4 border rounded hover:bg-gray-100"
        >
          <p>Amount: {trans.amount}</p>
          <p>Type: {trans.category.name}</p>
          <p>Date: {trans.date.toISOString().split("T")[0]}</p>
          <p>Description: {trans.description}</p>
          <p>Category: {trans.transactionCategory}</p>
          <button onClick={() => deleteTransaction(trans)}>
            Delete transaction
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
