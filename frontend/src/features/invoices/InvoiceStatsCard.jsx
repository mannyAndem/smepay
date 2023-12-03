import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { selectInvoices, selectInvoicesStatus } from "./invoicesSlice";

const InvoiceStatsCard = () => {
  /**
   * Component is responsible for calculating the invoice stats and rendering a doughnut chart representing the data.
   */

  const invoices = useSelector(selectInvoices);
  const status = useSelector(selectInvoicesStatus);

  const paidInvoices =
    invoices?.filter((invoice) => invoice.status === "paid") ?? 0;
  const pendingInvoices =
    invoices?.filter((invoice) => invoice.status === "pending") ?? 0;
  const overdueInvoices =
    invoices?.filter((invoice) => invoice.status === "overdue") ?? 0;

  const data = {
    labels: ["Paid", "Pending", "Overdue"],
    datasets: [
      {
        label: "Invoices",
        backgroundColor: ["#2ECC71", "#FF9800", "#E74C3C"],

        data: [
          paidInvoices?.length,
          pendingInvoices?.length,
          overdueInvoices?.length,
        ],
      },
    ],
  };
  return (
    <div className="h-full w-full flex flex-col p-6 bg-white justify-between shadow-md rounded-md">
      <span className="text-2xl">Invoice Status</span>
      {status === "error" && (
        <span className="block text-center text-red-500 font-semibold text-red">
          An error occurred
        </span>
      )}
      {status === "pending" && (
        <span className="block text-center font-semibold">Loading...</span>
      )}
      {status === "success" && (
        <>
          <div className="w-full self-center flex items-center justify-center mt-4">
            <Doughnut
              data={data}
              options={{
                plugins: { legend: { display: false } },
                aspectRatio: 2,
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green rounded-full"></div>
              <span className="text-sm">
                Paid - {(paidInvoices.length / invoices.length || 0) * 100}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange rounded-full"></div>
              <span className="text-sm">
                Pending -{" "}
                {(pendingInvoices.length / invoices.length || 0) * 100}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red rounded-full"></div>
              <span className="text-sm">
                Overdue -{" "}
                {(overdueInvoices.length / invoices.length || 0) * 100}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceStatsCard;
