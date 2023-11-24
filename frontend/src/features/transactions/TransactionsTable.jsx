import { useSelector } from "react-redux";
import { FaEllipsis } from "react-icons/fa6";
import { selectTransactions } from "./transactionsSlice";

/**
 * Component is responsible for taking the transactions data from the transactions slice and rendering it out in a table.
 */
const TransactionsTable = () => {
  const transactions = useSelector(selectTransactions);

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
            <th className="p-2 border-r border-black">Client Name</th>
            <th className="p-2 border-x border-black">Transaction Date</th>
            <th className="p-2 border-x border-black">Amount</th>
            <th className="p-2 border-x border-black">Payment Method</th>
            <th className="p-2 border-x border-black">Status</th>
            <th className="p-2 border-l border-black">Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td className="p-2 border-x border-black">
                  {transaction.clientName}
                </td>
                <td className="p-2 border-r border-black">
                  {transaction.date}
                </td>
                <td className="p-2 border-x border-black">
                  {transaction.amount}
                </td>
                <td className="p-2 border-x border-black">
                  {transaction.paymentMethod}
                </td>
                <td className="p-2 border-x border-black">
                  {transaction.status}
                </td>
                <td className="p-2 border-l border-black">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="p-2 w-1/2 bg-blue-500 rounded-2xl text-white text-sm">
                      View
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

export default TransactionsTable;
