import InvoiceDetails from "../../../features/invoices/InvoiceDetails";

/**
 * This component is responsibe for rendering out an invoice card. It takes the id specified in the URL and renders same
 */
const Invoice = () => {
  return (
    <div className="bg-gray-100 flex min-h-screen justify-center items-center">
      <div className="bg-white w-1/2">
        <InvoiceDetails />
      </div>
    </div>
  );
};

export default Invoice;
