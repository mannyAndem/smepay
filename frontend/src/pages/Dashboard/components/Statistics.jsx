import InvoiceStatsCard from "../../../features/invoices/InvoiceStatsCard";
import StatisticCard from "./StatisticCard";
import projectsIcon from "../../../assets/eos-icons_project-outlined.png";
import paidIcon from "../../../assets/icon-paid.png";
import clientsIcon from "../../../assets/clients-icon.png";
import invoiceIcon from "../../../assets/invoice-icon.png";
import { useSelector } from "react-redux";
import {
  selectInvoices,
  selectInvoicesStatus,
} from "../../../features/invoices/invoicesSlice";

const Statistics = () => {
  /**
   * Component is responsible for passing statistics data to the statistic card components and rendering them out
   */

  // this is a test constant,  will be replaced with data from server

  const invoices = useSelector(selectInvoices);
  const status = useSelector(selectInvoicesStatus);
  const statistics = [
    {
      name: "Projects",
      amount: invoices?.length,
      isCurrency: false,
      icon: projectsIcon,
    },
    {
      name: "Paid",
      amount: invoices?.reduce(
        (acc, curr) =>
          acc + curr.items.reduce((acc, curr) => acc + curr.price, 0),
        0
      ),
      isCurrency: true,
      icon: paidIcon,
    },
    {
      name: "Clients",
      amount: invoices?.length,
      isCurrency: false,
      icon: clientsIcon,
    },
    {
      name: "Invoices sent",
      amount: invoices?.length,
      isCurrency: false,
      icon: invoiceIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-10 lg:grid-cols-3">
      {status === "pending" && (
        <span className="text-center font-semibold">Loading...</span>
      )}
      {status === "error" && (
        <span className="text-center text-red font-semibold">
          An error occurred
        </span>
      )}
      {status != "pending" &&
        status != "error" &&
        statistics.map((statistic, index) => (
          <div className="col-span-1 row-span-1 h-full" key={index}>
            <StatisticCard statistic={statistic} />
          </div>
        ))}
      <div className="lg:row-start-1 lg:col-start-3 col-span-1 row-span-2">
        <InvoiceStatsCard />
      </div>
    </div>
  );
};

export default Statistics;
