import { format } from "date-fns";

const InvoiceDetails = ({ invoice }) => {
  return (
    <div className="w-full">
      <div className="py-4 px-8 border-b border-lightGray text-xl font-semibold">
        <h1 className="text-2xl font-semibold">Invoice Details</h1>
      </div>
      <div className="text-sm py-4 px-8 border-b border-lightGray flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Invoice Number: </span>
          <span>{invoice.invoiceNo}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Client: </span>
          <span>{invoice.billTo}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Total Amount Due: </span>
          <span>#{invoice.totalAmount.toLocaleString()}.00</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Due Date: </span>
          <span>{format(new Date(invoice.dueDate), "dd, MMMM yyyy")}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Payment Status:</span>
          <span>{invoice.status.toUpperCase()}</span>
        </div>
        <div className="flex gap-2 flex-col">
          <span className="font-semibold">Description: </span>
          <span>{invoice.description}</span>
        </div>
      </div>
      <div className="py-4 px-8 flex flex-col gap-6">
        <div className="my-4 px-8 flex items-center gap-8 justify-end">
          <button
            className="p-2 rounded-md border border-blue text-blue"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="p-2 rounded-md bg-blue text-white border border-blue"
            type="submit"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
