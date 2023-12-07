import { selectTransactions } from "./transactionsSlice";
import { useSelector } from "react-redux";
import projectsIcon from "../../assets/eos-icons_project-outlined.png";
import paidIcon from "../../assets/icon-paid.png";
import clientsIcon from "../../assets/clients-icon.png";
import invoiceIcon from "../../assets/invoice-icon.png";
import StatisticCard from "../../pages/Dashboard/components/StatisticCard";

const TransactionsStats = ({ transactions, status }) => {
  /**
   * Component is responsible for passing the transactions statistics to a statistic card and renedering same rendering out same.
   *
   * The statistic card component is used is loacted in the /src/pages/dashboard/components
   */
  return (
    <div className="flex justify-between gap-8">
      {status === "pending" && (
        <span className="block text-center font-semibold">Loading...</span>
      )}
      {status === "error" && (
        <span className="block text-center font-semibold text-red">
          An error occurred
        </span>
      )}
      {status === "success" && (
        <>
          <StatisticCard
            statistic={{
              name: "Total Transactions",
              amount: transactions?.length,
              isCurrency: false,
            }}
          />
          <StatisticCard
            statistic={{
              name: "Total Revenue",
              amount: 0,
              isCurrency: false,
            }}
          />
          <StatisticCard
            statistic={{
              name: "Total Outstanding Payments",
              amount: 0,
              isCurrency: true,
            }}
          />
        </>
      )}
    </div>
  );
};

export default TransactionsStats;
