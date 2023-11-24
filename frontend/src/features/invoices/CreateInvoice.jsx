import { useState } from "react";
import { FaPaperclip, FaPenClip, FaPlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";

const CreateInvoice = ({ setInvoiceModalVisibilty }) => {
  /**
   * Component is responsible for displaying the create invoice modal and submitting the form's dats to the backend
   *
   * It takes a setInvoiceModalVisibilty prop which is used to close the modal
   */

  //   state to hold invoice itemes
  const [invoiceItems, setInvoiceItems] = useState([
    {
      item: "",
      price: 0,
      quantity: 0,
      get total() {
        return this.price * this.quantity;
      },
    },
  ]);

  // function to add new invoice item
  const addItem = () => {
    const itemData = {
      item: "",
      price: 0,
      quantity: 0,
      get total() {
        this.price * this.quantity;
      },
    };
    setInvoiceItems((prev) => [...prev, itemData]);
  };
  //   function to handle invoice items input change
  const handleInvoiceItemsInputChange = (e, id) => {
    setInvoiceItems((prev) =>
      prev.map((item, index) =>
        index == id
          ? {
              ...item,
              [e.target.name]: e.target.value,
              get total() {
                return this.price * this.quantity;
              },
            }
          : item
      )
    );
  };

  return (
    <div className="fixed overflow-y-auto top-0 left-0 w-screen bg-slate-500  h-screen bg-opacity-50 flex justify-end px-16 py-8">
      <div className="bg-white rounded-md shadow-md w-1/2 pb-4 overflow-y-auto">
        <div className="flex items-center gap-16  p-6 border-b">
          <button onClick={() => setInvoiceModalVisibilty(false)}>
            <IoCloseCircle size={28} />
          </button>

          <h2 className="self-end font-semibold text-2xl">
            Create New Invoice
          </h2>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between gap-4 text-xl">
            <span className="font-semibold">Invoice</span>
            <span>#INV-20231120-001</span>
          </div>
          <button>COPY LINK</button>
        </div>
        <form className="px-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="recipient-email">Recipient Email</label>
            <input
              type="text"
              id="recipient-email"
              autoComplete="off"
              className="border p-2 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="product-description">Product Description</label>
            <input
              type="text"
              id="product-description"
              autoComplete="off"
              className="border p-2 rounded-md"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="issued-on">Issued On</label>
              <input
                type="text"
                id="issued-on"
                autoComplete="off"
                className="border p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="due-on">Due On</label>
              <input
                type="text"
                id="due-on"
                autoComplete="off"
                className="border p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bill-from">Bill from</label>
              <input
                type="text"
                id="bill-from"
                autoComplete="off"
                className="border p-2 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="bill-to">Bill to</label>
              <input
                type="text"
                id="bill-to"
                autoComplete="off"
                className="border p-2 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <span className="font-bold my-4">Invoice Items</span>
            <div className="w-full">
              <table className=" text-left w-full border-separate border-spacing-2 ">
                <thead>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </thead>
                <tbody>
                  {invoiceItems &&
                    invoiceItems.map((item, index) => (
                      <tr key={index}>
                        <td className=" border text-ellipsis ">
                          <input
                            type="text"
                            required
                            className="w-full p-2"
                            name="item"
                            value={item.item}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border text-ellipsis ">
                          <input
                            type="number"
                            step={0.0}
                            required
                            className="w-full p-2"
                            name="price"
                            value={item.price}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border">
                          <input
                            type="number"
                            required
                            className="w-full p-2"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border p-2">
                          {item.total?.toFixed(2) ?? 0.0}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex items-start justify-between">
                <button
                  className="flex items-center gap-2"
                  onClick={addItem}
                  type="button"
                >
                  <FaPlus size={14} />
                  Add Item
                </button>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-8 items-center justify-between">
                    <span>Subtotal</span>
                    <span>
                      {invoiceItems
                        .reduce((acc, curr) => acc + curr.total, 0)
                        ?.toFixed(2) ?? 0.0}
                    </span>
                  </div>
                  <div className="flex gap-8 items-center justify-between">
                    <span>Tax</span>
                    <span>0.00</span>
                  </div>
                  <div className="flex gap-8 items-center justify-between">
                    <span>Total</span>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="block text-xs">
            Payment due within 30 days. Late payments subject to a 5% fee.
          </span>
          <div className="flex flex-col gap-2">
            <label htmlFor="notes" className="text-sm">
              Additional Notes
            </label>
            <textarea
              type="text"
              id="notes"
              autoComplete="off"
              className="border p-2 rounded-md"
            ></textarea>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 items-start">
              <button type="submit" className="p-2">
                Save as draft
              </button>
              <button className="p-2">Preview</button>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <button
                type="submit"
                className="p-2 flex items-center gap-2 bg-blue-500 text-white rounded-md"
              >
                {" "}
                <FaPaperclip size={14} color="white" /> Send Invoice
              </button>
              <button className="p-2">Print</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
