import { FaEllipsis } from "react-icons/fa6";

/**
 * Component is responsible for taking the transactions data from the transactions slice and rendering it out in a table.
 */
const TransactionsTable = ({ transactions, status }) => {
  return (
    <div className=" my-16 bg-white rounded-md shadow-md ">
      <div className="flex items-center justify-between  p-6">
        <div className="flex">
          <span className="px-2 py-1 border-r text-sm font-semibold">All</span>
          <div className="px-2 py-1 flex gap-1 items-center border-r">
            <div className="p-1 rounded-full bg-green "></div>
            <span className=" text-sm font-semibold ">Completed</span>
          </div>
          <div className="px-2 py-1 flex gap-1 items-center border-r">
            <div className="p-1 rounded-full bg-orange "></div>
            <span className=" text-sm font-semibold ">Pending</span>
          </div>
          <div className="px-2 py-1 flex gap-1 items-center">
            <div className="p-1 rounded-full bg-red "></div>
            <span className=" text-sm font-semibold ">Due</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm">
            <option>Newest</option>
          </select>
        </div>
      </div>
      <table className="w-full text-center">
        <thead className="bg-veryDarkBlue text-gray font-semibold">
          <tr>
            <th className="p-2 border-r border-gray">Client Name</th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Transaction Date
            </th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Amount
            </th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Payment Method
            </th>
            <th className="p-2 border-x border-gray hidden lg:table-cell">
              Status
            </th>
            <th className="p-2 border-l border-gray ">Details</th>
          </tr>
        </thead>
        <tbody>
          {status === "pending" && (
            <span className="block text-center font-semibold">Loading...</span>
          )}
          {status === "error" && (
            <span className="block text-center font-semibold text-red">
              An error occurred
            </span>
          )}
          {status === "success" &&
            transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td className="p-2">{transaction.clientName}</td>
                  <td className="p-2 hidden lg:table-cell">
                    {transaction.date}
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {transaction.amount}
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {transaction.paymentMethod}
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {transaction.status}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-4 justify-center">
                      <button className="py-2 px-4 w-1/2 bg-blue rounded-2xl text-white text-sm">
                        View
                      </button>
                      <div className="group relative">
                        <button>
                          <FaEllipsis size={20} />
                        </button>
                        <div className="z-10 scale-x-0 origin-right absolute top-1/2 transform -translate-y-1/2 right-[-8px] bg-white flex gap-1 flex-col p-5 rounded-md transition duration-300 ease-out group-hover:scale-x-100 shadow-sm">
                          <button className="p-2 flex justify-start items-center">
                            Edit
                          </button>
                          <button className="p-2 whitespace-nowrap flex justify-start items-center">
                            Recent Payment
                          </button>
                          <button className="p-2 flex justify-start items-center">
                            Print
                          </button>
                          <button className="p-2 flex justify-start items-center">
                            Delete
                          </button>
                        </div>
                      </div>
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
