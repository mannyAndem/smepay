import InvoiceDetails from "../../features/invoices/InvoiceDetails";

/**
 * This component is responsibe for rendering out an invoice card. It takes the id specified in the URL and renders same
 */
const Invoice = () => {
  return (
    <div className="bg-lightGray flex min-h-screen justify-center items-center">
      <div className="bg-gray w-1/2  rounded-md overflow-hidden shadow-md">
        <InvoiceDetails />
      </div>
    </div>
  );
};

export default Invoice;
