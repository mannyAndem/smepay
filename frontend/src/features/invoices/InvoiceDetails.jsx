const InvoiceDetails = () => {
  return (
    <div className="w-full">
      <div className="py-4 px-8 border-b border-lightGray text-xl font-semibold">
        <h1 className="text-2xl font-semibold">Invoice Details</h1>
      </div>
      <div className="text-sm py-4 px-8 border-b border-lightGray flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Invoice Number: </span>
          <span>#INV-20231120-001</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Client: </span>
          <span>ABC Corp</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Total Amount Due: </span>
          <span>2700</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Due Date: </span>
          <span>December 20, 2023</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Payment Status</span>
          <span>Pending</span>
        </div>
      </div>
      <form className="py-4 px-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="payment-amount" className="text-sm font-semibold">
            Payment Amount
          </label>
          <input
            type="number"
            value={200}
            className="p-2 border border-lightGray bg-transparent rounded-md"
            disabled
          />
        </div>
        <div className="my-4 px-8 flex items-center gap-8 justify-end">
          <button
            className="p-2 rounded-md border border-blue text-blue"
            type="button"
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
      </form>
    </div>
  );
};

export default InvoiceDetails;
