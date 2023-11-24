import Statistics from "./Statistics";
import InvoicesTable from "../../../features/invoices/InvoicesTable";
import { useState } from "react";
import CreateInvoice from "../../../features/invoices/CreateInvoice";

const Overview = () => {
  /**
   * Component is responsible for rendering out the overview page and all its components
   * It is also responsible for holding the state of the CreateInvoice modal component.
   */

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
            className="bg-black text-white text-sm px-6 py-4 rounded-md"
            onClick={() => setInvoiceModalVisibilty(true)}
          >
            New Invoice
          </button>
        </div>
        <Statistics />
        <div>
          <InvoicesTable />
        </div>
      </div>
    </>
  );
};

export default Overview;
