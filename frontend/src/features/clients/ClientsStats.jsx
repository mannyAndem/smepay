import { useSelector } from "react-redux";
import { selectClients } from "./clientSlice";
import clientsIcon from "../../assets/clients-icon.png";
import invoiceIcon from "../../assets/invoice-icon.png";
import StatisticCard from "../../pages/Dashboard/components/StatisticCard";

/**
 * Component is responsible for passing the clients statistics to a statistic card and renedering same rendering out same.
 *
 * The statistic card component used is located in the /src/pages/dashboard/components
 */
const ClientStats = () => {
  const clients = useSelector(selectClients);
  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row">
      <StatisticCard
        statistic={{
          name: "Total Clients",
          amount: clients?.length ?? 0,
          isCurrency: false,
          icon: clientsIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Active Clients",
          amount: clients?.length ?? 0,
          isCurrency: false,
          icon: clientsIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Outstanding Payments",
          amount: 0,
          isCurrency: false,
          icon: invoiceIcon,
        }}
      />
    </div>
  );
};

export default ClientStats;
