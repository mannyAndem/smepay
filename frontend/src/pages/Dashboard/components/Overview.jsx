import Statistics from "./Statistics";
import InvoicesTable from "../../../features/invoices/InvoicesTable";
import { useEffect, useState } from "react";
import CreateInvoice from "../../../features/invoices/CreateInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  selectInvoices,
  selectInvoicesStatus,
} from "../../../features/invoices/invoicesSlice";
import Loader from "../../../ui/Loader";

/**
 * Component is responsible for rendering out the overview page and all its components
 * It is also responsible for holding the state of the CreateInvoice modal component.
 */
const Overview = () => {
  const status = useSelector(selectInvoicesStatus);
  const invoices = useSelector(selectInvoices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvoices());
    }
  }, [status, dispatch]);

  const [invoiceModalVisibility, setInvoiceModalVisibilty] = useState(false);
  return (
    <>
      {invoiceModalVisibility && (
        <CreateInvoice setInvoiceModalVisibilty={setInvoiceModalVisibilty} />
      )}
      <div>
        <div className="flex justify-between items-center my-6">
          <h1 className="font-semibold text-2xl">Overview</h1>
          <button
            className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
            onClick={() => setInvoiceModalVisibilty(true)}
          >
            New Invoice
          </button>
        </div>
        {status === "success" ? (
          <>
            <Statistics invoices={invoices} />
            <div className="my-12">
              <InvoicesTable invoices={invoices} />
            </div>
          </>
        ) : status === "pending" ? (
          <div className="absolute top-0 left-0 right-0 h-screen">
            <Loader type="lg" />
          </div>
        ) : (
          <span className="block text-center text-xl text-red-400">
            An error occured
          </span>
        )}
      </div>
    </>
  );
};

export default Overview;
