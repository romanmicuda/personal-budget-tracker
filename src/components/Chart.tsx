import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { TransactionType } from "../types";

const aggregateTransactionsByCategory = (transactions: TransactionType[]) => {
  return transactions
    .filter((item) => item.transactionCategory === "Outcome")
    .reduce<{ [key: string]: number }>((acc, transaction) => {
      const categoryName = transaction.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }
      acc[categoryName] += transaction.amount;
      return acc;
    }, {});
};

const Chart: React.FC<{ transactions: TransactionType[] }> = ({
  transactions,
}) => {
  const aggregatedData = aggregateTransactionsByCategory(transactions);

  const chartData = Object.entries(aggregatedData).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1>Plots</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Chart;
