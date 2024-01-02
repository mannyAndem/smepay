import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";
import StatusButton from "./StatusButton";

/**
 * Component is responsible for taking the invoices data from the invoices slice and rendering it out in a table.
 */
const InvoicesTable = ({ invoices }) => {
  return (
    <div className="bg-white rounded-md shadow-md pb-4">
      <div className="flex items-center justify-between  p-6">
        <span className="text-sm font-semibold">Open Invoices</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm">
            <option>Newest</option>
          </select>
        </div>
      </div>

      <table className="hidden w-full text-center lg:table">
        <thead className="bg-veryDarkBlue text-gray font-semibold">
          <tr>
            <th className="p-2 border-r border-gray">Name</th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Amount
            </th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Dates
            </th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Invoice Number
            </th>
            <th className="p-2 border-l border-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice._id}>
                <td className="p-2 text-left pl-4">
                  {invoice.billTo.toUpperCase()}
                </td>
                <td className="p-2 hidden lg:table-cell">
                  {invoice.totalAmount}
                </td>
                <td className="p-2 hidden lg:table-cell">
                  {invoice.dueDate.split("T")[0]}
                </td>
                <td className="p-2 hidden lg:table-cell">
                  {invoice.invoiceNo}
                </td>
                <td className="p-2">
                  <StatusButton invoice={invoice} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
