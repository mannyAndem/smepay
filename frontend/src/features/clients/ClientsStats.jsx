import { useSelector } from "react-redux";
import { selectClients } from "./clientSlice";
import projectsIcon from "../../assets/eos-icons_project-outlined.png";
import paidIcon from "../../assets/icon-paid.png";
import clientsIcon from "../../assets/clients-icon.png";
import invoiceIcon from "../../assets/invoice-icon.png";
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
          icon: clientsIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Active Clients",
          amount: clients.length,
          isCurrency: false,
          icon: clientsIcon,
        }}
      />
      <StatisticCard
        statistic={{
          name: "Total Outstanding Payments",
          amount: clients.reduce((acc, curr) => curr.totalOutstanding + acc, 0),
          isCurrency: false,
          icon: invoiceIcon,
        }}
      />
    </div>
  );
};

export default ClientStats;
