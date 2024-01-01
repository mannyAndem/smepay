import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  selectInvoices,
  selectInvoicesStatus,
} from "./invoicesSlice";
import { FaEllipsis } from "react-icons/fa6";
import { useEffect } from "react";
import { selectCurrentUser } from "../authentication/authSlice";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

/**
 * Component is responsible for taking the invoices data from the invoices slice and rendering it out in a table.
 */
const InvoicesTable = () => {
  const invoices = useSelector(selectInvoices);
  const status = useSelector(selectInvoicesStatus);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvoices());
    }
  }, [invoices, dispatch]);

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
      {status === "pending" && (
        <div className="w-full justify-center items-center">
          <Loader type="md" />
        </div>
      )}
      {status === "error" && (
        <span className="block text-center text-red font-semibold">
          An error occurred
        </span>
      )}
      {status != "pending" && status != "error" && invoices && (
        <>
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
                  <tr key={invoice.id}>
                    <td className="p-2 text-left pl-4">
                      {invoice.billTo.toUpperCase()}
                    </td>
                    <td className="p-2 hidden lg:table-cell">
                      {invoice.totalAmount}
                    </td>
                    <td className="p-2 hidden lg:table-cell">
                      {invoice.dueDate.split("T")[0]}
                    </td>
                    <td className="p-2 hidden lg:table-cell">{invoice.id}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-4 justify-center">
                        <Link
                          to={`/invoices/${invoice._id}`}
                          className={`${
                            invoice.status === "paid"
                              ? "bg-green"
                              : invoice.status === "pending"
                              ? "bg-orange"
                              : "bg-red"
                          } py-2 px-4 rounded-2xl text-white text-sm`}
                        >
                          {invoice.status.toUpperCase()}
                        </Link>
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
        </>
      )}
    </div>
  );
};

export default InvoicesTable;
