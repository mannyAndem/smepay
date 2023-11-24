import { useSelector } from "react-redux";
import { selectClients } from "./clientSlice";
import StatisticCard from "../../pages/Dashboard/components/StatisticCard";

const ClientStats = () => {
  const clients = useSelector(selectClients);
  /**
   * Component is responsible for passing the clients statistics to a statistic card and renedering same rendering out same.
   *
   * The statistic card component is used is loacted in the /src/pages/dashboard/components
   */
  return (
    <div className="flex justify-between gap-8">
      <StatisticCard
        statistic={{
          name: "Total Clients",
          amount: clients.length,
          isCurrency: false,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Active Clients",
          amount: clients.length,
          isCurrency: false,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Outstanding Payments",
          amount: clients.reduce((acc, curr) => curr.totalOutstanding + acc, 0),
          isCurrency: false,
        }}
      />
    </div>
  );
};

export default ClientStats;
