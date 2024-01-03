import projectsIcon from "../../assets/eos-icons_project-outlined.png";
import paidIcon from "../../assets/icon-paid.png";
import revenueIcon from "../../assets/revenue-icon.png";
import StatisticCard from "../../pages/Dashboard/components/StatisticCard";

/**
 * Component is responsible for passing the transactions statistics to a statistic card and renedering same rendering out same.
 *
 * The statistic card component is used is loacted in the /src/pages/dashboard/components
 */
const TransactionsStats = ({ transactions }) => {
  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row">
      <StatisticCard
        statistic={{
          name: "Total Transactions",
          amount: transactions?.length,
          isCurrency: false,
          icon: projectsIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Revenue",
          amount: 0,
          isCurrency: false,
          icon: revenueIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Outstanding Payments",
          amount: 0,
          isCurrency: true,
          icon: paidIcon,
        }}
      />
    </div>
  );
};

export default TransactionsStats;
