const InvoiceDetails = () => {
  return (
    <div className="w-full shadow-md rounded-md">
      <div className="p-6 border-b text-xl font-semibold">
        <h1>Invoice Details</h1>
      </div>
      <div className="text-sm p-6 border-b flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Invoice Number: </span>
          <span>#INV-20231120-001</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Client: </span>
          <span>ABC Corp</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Total Amount Due: </span>
          <span>2700</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Due Date: </span>
          <span>December 20, 2023</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Payment Status</span>
          <span>Pending</span>
        </div>
      </div>
      <form className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="payment-amount" className="text-xs">
            Payment Amount
          </label>
          <input
            type="number"
            value={200}
            className="p-2 border rounded-md"
            disabled
          />
        </div>
        {/* <div className="text-xs">
          <h2 className="text-sm font-semibold">Payment Method</h2>
          <span className="block mb-4">Select a payment Method</span>
          <div className="flex items-center gap-4 my-2">
            <input type="radio" name="payment-type" id="card" />
            <label htmlFor="card">Credit Card/Debit Card</label>
          </div>
          <div className="flex items-center gap-4 my-2">
            <input type="radio" name="payment-type" id="paypal" />
            <label htmlFor="card">Paypal</label>
          </div>
          <div className="flex items-center gap-4 my-2">
            <input type="radio" name="payment-type" id="transfer" />
            <label htmlFor="card">Bank transfer</label>
          </div>
        </div> */}
        <div className="px-6 flex items-center gap-8 justify-end">
          <button
            className="p-2 rounded-md border border-blue text-blue"
            type="button"
          >
            Cancel
          </button>
          <button
            className="p-2 rounded-md bg-blue-500 text-white border border-blue"
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
