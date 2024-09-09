import React, {
  useCallback,
  useDebugValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import { DisplayTransactionProps, TransactionType } from "../types";
import SearchResult from "./SearchResult";

export const DisplayTransactions: React.FC<DisplayTransactionProps> = ({
  transactions,
  deleteTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] =
    useState<TransactionType[]>(transactions);
  const [isPending, startTransition] = useTransition();

  useDebugValue(
    searchResult,
    (searchResult) => `Search result ${searchResult}`
  );

  useEffect(() => {
    startTransition(() => {
      if (searchTerm.trim() === "") {
        setSearchResult(transactions);
      } else {
        const result = transactions.filter(
          (transaction) =>
            String(transaction.amount).includes(searchTerm) ||
            transaction.category.name.includes(searchTerm) ||
            transaction.date.toISOString().split("T")[0].includes(searchTerm) ||
            transaction.description.includes(searchTerm) ||
            transaction.transactionCategory.includes(searchTerm)
        );
        setSearchResult(result);
      }
    });
  }, [transactions, searchTerm, startTransition]);

  const handleSearch = useCallback(
    (input: string) => {
      setSearchTerm(input);
    },
    [transactions]
  );

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-green-600 mb-2">
          Transactions Filter
        </h3>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        {isPending ? (
          "Loading..."
        ) : (
          <SearchResult
            transactions={searchResult}
            deleteTransaction={deleteTransaction}
          />
        )}
      </div>
    </div>
  );
};
