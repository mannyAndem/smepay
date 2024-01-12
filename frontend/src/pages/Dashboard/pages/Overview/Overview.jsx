import Statistics from "../../components/Statistics";
import InvoicesTable from "../../../../features/invoices/InvoicesTable";
import { useEffect, useState } from "react";
import CreateInvoice from "../../../../features/invoices/CreateInvoice";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  selectInvoices,
  selectInvoicesError,
  selectInvoicesStatus,
} from "../../../../features/invoices/invoicesSlice";
import Loader from "../../../../ui/Loader";
import ReloadButton from "../../../../ui/ReloadButton";

/**
 * Component is responsible for rendering out the overview page and all its components
 * It is also responsible for holding the state of the CreateInvoice modal component.
 */
const Overview = () => {
  const status = useSelector(selectInvoicesStatus);
  const error = useSelector(selectInvoicesError);
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
      <div className="relative h-full">
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
          <div className="mt-24">
            <Loader type="lg" />
          </div>
        ) : (
          <div className="mt-24 flex flex-col items-center gap-4">
            <span className="block text-center text-xl text-red">{error}</span>
            <ReloadButton />
          </div>
        )}
      </div>
    </>
  );
};

export default Overview;
