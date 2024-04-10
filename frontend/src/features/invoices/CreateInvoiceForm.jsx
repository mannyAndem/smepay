import { Formik, FieldArray, useFormik, useFormikContext } from "formik";
import InputGroup from "../../ui/InputGroup";
import DatePicker from "react-datepicker";
import Button from "../../ui/Button";
import { FaPaperclip, FaPlus } from "react-icons/fa6";
import Input from "../../ui/Input";
import * as yup from "yup";
import InputError from "../../ui/InputErrors";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo } from "react";
import { useCreateInvoiceMutation } from "../api/apiSlice";
import toast, { Toaster } from "react-hot-toast";

const CreateInvoiceForm = () => {
  const [createInvoice, { isSuccess, isError, isLoading }] =
    useCreateInvoiceMutation();

  const initialValues = {
    recipientEmail: "",
    description: "",
    issuedDate: new Date(),
    dueDate: new Date(),
    billFrom: "",
    billTo: "",
    additionalNotes: "",
    items: [{ name: "", price: 0, qty: 0 }],
  };

  const handleSubmit = (values) => {
    createInvoice(values);
  };

  const formSchema = yup.object().shape({
    recipientEmail: yup
      .string()
      .required("Recipient's email is required")
      .email("Invalid email"),
    description: yup.string().required("Invoice description is required"),
    issuedDate: yup.date().required("Issued date is required"),
    dueDate: yup.date().required("Due date is required"),
    billFrom: yup.string().required("Bill From is required"),
    billTo: yup.string().required("Bill To is required"),
    additionalNotes: yup.string().notRequired(),
    items: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Name is required"),
          price: yup.number().required("Price is required"),
          qty: yup
            .number()
            .required("Qty is required")
            .moreThan(0, "Qty must be 1 or more"),
        })
      )
      .min(1, "You must add an item"),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Invoice created successfully!");
    }
    if (isError) {
      toast.error("Something went wrong.");
    }
  }, [isSuccess, isError, toast]);
  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          isValid,
          setFieldValue,
          handleSubmit,
        }) => (
          <form className="px-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputGroup
              isInvalid={!!errors.recipientEmail && !!touched?.recipientEmail}
              type="text"
              name="recipientEmail"
              value={values.recipientEmail}
              onChange={handleChange}
              error={errors.recipientEmail}
              label="Email"
            />
            <InputGroup
              isInvalid={!!errors.description && !!touched?.description}
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              error={errors.description}
              label="Description"
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <InputGroup
                isInvalid={!!errors.issuedDate && !!touched.issuedDate}
                type="date"
                name="issuedDate"
                value={values.issuedDate}
                onChange={setFieldValue}
                error={errors.issuedDate}
                label="Issued on"
              />
              <InputGroup
                isInvalid={!!errors.dueDate && !!touched.dueDate}
                type="date"
                name="dueDate"
                value={values.dueDate}
                onChange={setFieldValue}
                error={errors.dueDate}
                label="Due on"
              />
              <InputGroup
                isInvalid={!!errors.billFrom && !!touched.billFrom}
                type="text"
                name="billFrom"
                value={values.billFrom}
                onChange={handleChange}
                error={errors.billFrom}
                label="Bill From"
              />
              <InputGroup
                isInvalid={!!errors.billTo && !!touched.billTo}
                type="text"
                name="billTo"
                value={values.billTo}
                onChange={handleChange}
                error={errors.billTo}
                label="Bill To"
              />
            </div>
            <FieldArray
              name="items"
              render={({ push }) => (
                <div>
                  <span className="font-bold">Invoice Items</span>
                  <table className="border-separate border-spacing-x-4 border-spacing-y-2 text-left">
                    <tbody>
                      <tr className="font-medium">
                        <th className="w-1/2">Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                      {values.items.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Input
                              onChange={handleChange}
                              value={item.name}
                              name={`items[${index}].name`}
                            />
                            <InputError
                              isInvalid={touched.items?.[index]?.name}
                              error={errors.items?.[index]?.name}
                            />
                          </td>
                          <td>
                            <Input
                              onChange={handleChange}
                              type="number"
                              value={item.price}
                              name={`items[${index}].price`}
                            />
                            <InputError
                              isInvalid={touched.items?.[index]?.price}
                              error={errors.items?.[index]?.price}
                            />
                          </td>
                          <td>
                            <Input
                              onChange={handleChange}
                              type="number"
                              value={item.qty}
                              name={`items[${index}].qty`}
                            />
                            <InputError
                              isInvalid={touched.items?.[index]?.qty}
                              error={errors.items?.[index]?.qty}
                            />
                          </td>
                          <td>
                            <Input
                              type="number"
                              name={`items[${index}].total`}
                              value={item.qty * item.price}
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-start my-4">
                    <button
                      className="flex items-center gap-2"
                      type="button"
                      onClick={() => push({ name: "", price: 0, qty: 0 })}
                    >
                      <FaPlus size={14} />
                      Add Item
                    </button>
                    <InvoiceDetails />
                  </div>
                </div>
              )}
            />

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
                value={values.additionalNotes}
                onChange={handleChange}
                autoComplete="off"
                className="border bg-transparent  border-lightGray p-2 rounded-md focus:outline-blue"
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
                <Button
                  pending={isLoading}
                  size="sm"
                  disabled={!isValid || !dirty}
                >
                  <FaPaperclip size={14} color="#f5f5f5" /> Send Invoice
                </Button>
                <button className="p-2">Print</button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

const InvoiceDetails = () => {
  const { values } = useFormikContext();

  const subtotal = useMemo(
    () => values.items.reduce((acc, curr) => acc + curr.price * curr.qty, 0),
    [values.items]
  );

  const tax = useMemo(
    () =>
      values.items.reduce((acc, curr) => acc + curr.price * curr.qty, 0) *
      (10 / 100),
    [values.items]
  );

  return (
    <ul className="flex flex-col gap-3">
      <li className="flex items-center gap-4  justify-between">
        <span className="font-medium text-veryDarkGray">Subtotal:</span>
        <span className="font-lg font-semibold">#{subtotal.toFixed(2)}</span>
      </li>
      <li className="flex items-center gap-4 justify-between">
        <span className="font-medium text-veryDarkGray">Tax (10%)</span>
        <span className="font-lg font-semibold">#{tax.toFixed(2)}</span>
      </li>
      <li className="flex items-center gap-4 justify-between">
        <span className="font-medium text-veryDarkGray">Total amount due:</span>
        <span className="font-lg font-semibold">
          #{(subtotal + tax).toFixed(2)}
        </span>
      </li>
    </ul>
  );
};

export default CreateInvoiceForm;
