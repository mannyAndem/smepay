import InvoiceStatsCard from "../../../features/invoices/InvoiceStatsCard";
import StatisticCard from "./StatisticCard";

const Statistics = () => {
  /**
   * Component is responsible for passing statistics data to the statistic card components and rendering them out
   */

  // this is a test constant,  will be replaced with data from server
  const statistics = [
    {
      name: "Projects",
      amount: 50,
      isCurrency: false,
    },
    {
      name: "Paid",
      amount: 200000,
      isCurrency: true,
    },
    {
      name: "Clients",
      amount: 30,
      isCurrency: false,
    },
    {
      name: "Invoices sent",
      amount: 50,
      isCurrency: false,
    },
  ];

  const invoiceStatistics = {
    total: 100,
    paid: 50,
    pending: 35,
    overdue: 15,
  };
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6">
      {statistics.map((statistic) => (
        <div className="col-span-1 row-span-1 h-full">
          <StatisticCard statistic={statistic} />
        </div>
      ))}
      <div className="row-start-1 col-start-3 col-span-1 row-span-2">
        <InvoiceStatsCard statistic={invoiceStatistics} />
      </div>
    </div>
  );
};

export default Statistics;
