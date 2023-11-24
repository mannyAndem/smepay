import { useDispatch, useSelector } from "react-redux";
import { addNewInvoice, selectInvoices } from "./invoicesSlice";
import { FaEllipsis } from "react-icons/fa6";

const InvoicesTable = () => {
  /**
   * Component is responsible for taking the invoices data from the invoices slice and rendering it out in a table.
   */

  const invoices = useSelector(selectInvoices);
  const dispatch = useDispatch();

  return (
    <div className=" my-16  bg-white rounded-md shadow-md ">
      <div className="flex items-center justify-between  p-6">
        <span className="text-sm font-semibold">Open Invoices</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm">
            <option>Newest</option>
          </select>
        </div>
      </div>
      <table className="w-full text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border-r border-black">Name</th>
            <th className="p-2 border-x border-black">Amount</th>
            <th className="p-2 border-x border-black">Dates</th>
            <th className="p-2 border-x border-black">Invoice Number</th>
            <th className="p-2 border-l border-black">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <td className="p-2 border-r border-black">{invoice.name}</td>
                <td className="p-2 border-x border-black">
                  {invoice.amount.toLocaleString()}
                </td>
                <td className="p-2 border-x border-black">{invoice.dates}</td>
                <td className="p-2 border-x border-black">
                  {invoice.invoiceNumber}
                </td>
                <td className="p-2 border-l border-black">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="p-2 w-1/2 bg-black rounded-2xl text-white text-sm">
                      {invoice.status.toUpperCase()}
                    </div>
                    <FaEllipsis size={24} />
                  </div>
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
