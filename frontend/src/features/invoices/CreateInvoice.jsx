import { useState } from "react";
import { FaPaperclip, FaPlus } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoice,
  selectCreateInvoiceError,
  selectCreateInvoiceStatus,
} from "./invoicesSlice";

/**
 * Component is responsible for displaying the create invoice modal and submitting the form's dats to the backend
 *
 * It takes a setInvoiceModalVisibilty prop which is used to close the modal
 */
const CreateInvoice = ({ setInvoiceModalVisibilty }) => {
  const status = useSelector(selectCreateInvoiceStatus);
  const error = useSelector(selectCreateInvoiceError);
  const dispatch = useDispatch();

  // State to hold form data
  const [formData, setFormData] = useState({
    recipientEmail: "",
    description: "",
    issuedDate: "",
    dueDate: "",
    billFrom: "",
    billTo: "",
    additionalNotes: "",
  });

  // state to hold form errors
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    setFormErrors({});
    let validateCounter = 0;

    if (formData.recipientEmail.length === 0) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      validateCounter++;
    }
    if (formData.description.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        description: "This field is required",
      }));
      validateCounter++;
    }
    if (formData.issuedDate.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        issuedOn: "This field is required",
      }));
      validateCounter++;
    }
    if (formData.dueDate.length === 0) {
      setFormErrors((prev) => ({ ...prev, dueOn: "This field is required" }));
      validateCounter++;
    }
    if (formData.billFrom.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        billFrom: "This field is required",
      }));
      validateCounter++;
    }
    if (formData.billTo.length === 0) {
      setFormErrors((prev) => ({ ...prev, billTo: "This field is required" }));
      validateCounter++;
    }
    if (!invoiceItems.some((item) => item.item.length > 0)) {
      setFormErrors((prev) => ({
        ...prev,
        items: "Atleast one item is required",
      }));
    }

    return validateCounter === 0;
  };

  const handleFormInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   state to hold invoice itemes
  const [invoiceItems, setInvoiceItems] = useState([
    {
      item: "",
      price: 0,
      quantity: 0,
      get total() {
        return this.price * this.quantity ?? 0;
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
        return this.price * this.quantity;
      },
    };
    console.log(itemData);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(createInvoice(formData));
  };

  return (
    <div className="fixed overflow-y-auto top-0 left-0 w-screen bg-slate-500  h-screen bg-opacity-50 flex justify-end px-16 py-2 z-50">
      <div className="bg-gray rounded-md shadow-md w-1/2 pb-4 overflow-y-auto">
        <div className="flex items-center gap-16  p-6 border-b border-lightGray">
          <button onClick={() => setInvoiceModalVisibilty(false)}>
            <IoCloseCircleOutline size={28} />
          </button>

          <h2 className="self-end font-semibold text-2xl">
            Create New Invoice
          </h2>
        </div>
        <div className="px-8 py-5 flex items-center justify-between">
          <div className="flex items-center justify-between gap-4 text-xl">
            <span className="font-semibold">Invoice</span>
            <span>#INV-20231120-001</span>
          </div>
          <button className="underline">COPY LINK</button>
        </div>
        <form
          className="px-8 flex flex-col gap-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="recipient-email">Recipient Email</label>
            <input
              type="text"
              id="recipient-email"
              name="recipientEmail"
              value={formData.email}
              onChange={(e) => handleFormInputChange(e)}
              autoComplete="off"
              className="border border-lightGray p-2 rounded-md bg-transparent"
            />
            {formErrors?.email && (
              <span className="text-red font-semibold text-sm">
                {formErrors.email}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">Product Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) => handleFormInputChange(e)}
              autoComplete="off"
              className="border border-lightGray p-2 rounded-md bg-transparent"
            />
            {formErrors?.description && (
              <span className="text-red font-semibold text-sm">
                {formErrors.description}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="issuOn">Issued On</label>
              <input
                type="text"
                id="issuedOn"
                name="issuedDate"
                value={formData.issuedOn}
                onChange={(e) => handleFormInputChange(e)}
                autoComplete="off"
                placeholder="e.g December 21, 1885"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.issuedOn && (
                <span className="text-red font-semibold text-sm">
                  {formErrors.issuedOn}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dueOn">Due On</label>
              <input
                type="text"
                id="dueOn"
                name="dueDate"
                placeholder="e.g December 21, 1885"
                value={formData.dueOn}
                onChange={(e) => handleFormInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.dueOn && (
                <span className="text-red font-semibold text-sm">
                  {formErrors.dueOn}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="billFrom">Bill from</label>
              <input
                type="text"
                id="billFrom"
                name="billFrom"
                value={formData.billFrom}
                onChange={(e) => handleFormInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.billFrom && (
                <span className="text-red font-semibold text-sm">
                  {formErrors.billFrom}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="billTo">Bill to</label>
              <input
                type="text"
                id="billTo"
                name="billTo"
                value={formData.billTo}
                onChange={(e) => handleFormInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.billTo && (
                <span className="text-red font-semibold text-sm">
                  {formErrors.billTo}
                </span>
              )}
            </div>
          </div>
          <div>
            <span className="font-bold my-4">Invoice Items</span>
            <div className="w-full">
              <table className=" text-left w-full border-separate border-spacing-4 ">
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
                        <td className=" border border-lightGray text-ellipsis rounded-md overflow-hidden">
                          <input
                            type="text"
                            className="w-full p-2 bg-transparent"
                            name="item"
                            value={item.item}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border border-lightGray text-ellipsis rounded-md overflow-hidden">
                          <input
                            type="number"
                            step={0.0}
                            className="w-full p-2 bg-transparent"
                            name="price"
                            value={item.price}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border border-lightGray rounded-md overflow-hidden">
                          <input
                            type="number"
                            className="w-full p-2 bg-transparent"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInvoiceItemsInputChange(e, index)
                            }
                          />
                        </td>
                        <td className=" border border-lightGray p-2 rounded-md overflow-hidden">
                          {item.total?.toFixed(2)}
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
                        ?.toFixed(2)}
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
          {formErrors?.items && (
            <span className="block mb-4 text-red font-semibold text-sm">
              {formErrors.items}
            </span>
          )}
          <span className="block text-xs">
            Payment due within 30 days. Late payments subject to a 5% fee.
          </span>
          <div className="flex flex-col gap-2">
            <label htmlFor="additionalNotes" className="text-sm">
              Additional Notes (Optional)
            </label>
            <textarea
              type="text"
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleFormInputChange(e)}
              autoComplete="off"
              className="border bg-transparent  border-lightGray p-2 rounded-md"
            ></textarea>
          </div>
          <div className="mt-8 flex justify-between">
            <div className="flex flex-col gap-2 items-start">
              <button type="submit" className="p-2">
                Save as draft
              </button>
              <button className="p-2">Preview</button>
            </div>
            <div className="flex flex-col gap-2 items-start">
              {status !== "pending" && (
                <button
                  type="submit"
                  className="p-2 flex items-center gap-2 bg-blue text-gray rounded-md"
                >
                  <FaPaperclip size={14} color="#f5f5f5" /> Send Invoice
                </button>
              )}
              {status === "pending" && (
                <button
                  type="submit"
                  className="opacity-30 p-2 flex items-center gap-2 bg-blue text-gray rounded-md"
                >
                  <FaPaperclip size={14} color="#f5f5f5" /> Send Invoice
                </button>
              )}
              <button className="p-2">Print</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
