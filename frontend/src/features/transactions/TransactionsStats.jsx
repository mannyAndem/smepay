import { selectTransactions } from "./transactionsSlice";
import { useSelector } from "react-redux";
import StatisticCard from "../../pages/Dashboard/components/StatisticCard";

const TransactionsStats = () => {
  const transactions = useSelector(selectTransactions);
  /**
   * Component is responsible for passing the transactions statistics to a statistic card and renedering same rendering out same.
   *
   * The statistic card component is used is loacted in the /src/pages/dashboard/components
   */
  return (
    <div className="flex justify-between gap-8">
      <StatisticCard
        statistic={{
          name: "Total Transactions",
          amount: transactions.length,
          isCurrency: false,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Revenue",
          amount: transactions.reduce((acc, curr) => acc + curr.amount, 0),
          isCurrency: false,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Outstanding Payments",
          amount: transactions
            .filter((transaction) => transaction.status !== "Paid")
            .reduce((acc, curr) => acc + curr.amount, 0),
          isCurrency: false,
        }}
      />
    </div>
  );
};

export default TransactionsStats;
