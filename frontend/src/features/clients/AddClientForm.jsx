import toast, { Toaster } from "react-hot-toast";
import InputGroup from "../../ui/InputGroup";
import Button from "../../ui/Button";
import { Formik } from "formik";
import TextBoxGroup from "../../ui/TextBoxGroup";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { createUrlFromBlob } from "../../utils/createUrlFromBlob";
import * as yup from "yup";
import InputError from "../../ui/InputErrors";
import { useAddClientMutation } from "../api/apiSlice";
import { useEffect } from "react";
import { createFormDataFromObject } from "../../utils/createFormDataFromObject";

const AddClientForm = () => {
  const initialValues = {
    name: "",
    email: "",
    number: "",
    address: "",
    category: "",
    status: "",
    note: "",
    file: null,
  };

  const [addClient, { isSuccess, isError, isLoading, error }] =
    useAddClientMutation();

  const formSchema = yup.object().shape({
    name: yup.string().required("Client's name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Client's email is required"),
    number: yup.string().required("Client's phone number is required"),
    address: yup.string().required("Client's address is required"),
    category: yup.string().required("Category is required"),
    status: yup.string().required("Status is required"),
    note: yup.string().notRequired(),
    file: yup.mixed().required("Please upload an image"),
  });

  const handleSubmit = (values) => {
    const data = createFormDataFromObject(values);
    addClient(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Client added successfully!");
    }

    if (isError) {
      console.error(error);
      toast.error("Something went wrong :(");
    }
  }, [isSuccess, isError]);
  return (
    <div className="px-8 py-5">
      <Toaster />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          isValid,
          dirty,
          setFieldValue,
          handleSubmit,
        }) => (
          <form
            className="px-8 flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
          >
            <InputGroup
              name="name"
              value={values.name}
              error={errors.name}
              isInvalid={touched.name && !!errors.name}
              onChange={handleChange}
              label="Client Name"
            />
            <InputGroup
              name="email"
              value={values.email}
              error={errors.email}
              isInvalid={touched.email && !!errors.email}
              onChange={handleChange}
              label="Client Email"
            />
            <InputGroup
              name="number"
              value={values.number}
              error={errors.number}
              isInvalid={touched.number && !!errors.number}
              onChange={handleChange}
              label="Client Phone Number"
            />
            <InputGroup
              name="address"
              value={values.address}
              error={errors.address}
              isInvalid={touched.address && !!errors.address}
              onChange={handleChange}
              label="Client Address"
            />
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold mb-1">Categories</h3>
                <p className="text-xs">
                  Assign tags for organizational purposes
                </p>
                <div className="my-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="category"
                      id="vip"
                      value="vip"
                      onChange={handleChange}
                    />
                    <label htmlFor="vip">VIP</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="regular"
                      name="category"
                      value="regular"
                      onChange={handleChange}
                    />
                    <label htmlFor="regular">Regular</label>
                  </div>
                </div>
                <InputError
                  isInvalid={!!errors.category}
                  error={errors.category}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Client Status</h3>
                <p className="text-xs">Select a status for your client</p>
                <div className="my-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      id="active"
                      value="active"
                      onChange={handleChange}
                    />
                    <label htmlFor="active">Active</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="status"
                      id="inactive"
                      value="inactive"
                      onChange={handleChange}
                    />
                    <label htmlFor="inactive">Inactive</label>
                  </div>
                </div>
                <InputError isInvalid={!!errors.status} error={errors.status} />
              </div>
            </div>
            <TextBoxGroup
              name="note"
              value={values.note}
              onChange={handleChange}
              label="Client Notes (Optional)"
              isInvalid={touched.note && !!errors.note}
              error={errors.note}
              placeholder="Important client, prefers monthly billing, etc."
            />
            <div className="w-full flex flex-col gap-3">
              <Label>Client Profile Image</Label>
              <Label
                htmlFor="file"
                className="relative cursor-pointer w-32 h-32 border border-lightGray rounded-md overflow-hidden flex items-center justify-center"
              >
                Choose File
                {/* file preview */}
                {values.file && (
                  <div className="absolute top-0 bottom-0 right-0 left-0">
                    <img
                      className="w-full h-full object-cover"
                      src={createUrlFromBlob(values.file)}
                      alt="Client Image"
                    />
                  </div>
                )}
              </Label>
              <Input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFieldValue("file", e.target.files[0])}
                className="hidden"
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                pending={isLoading}
                disabled={!isValid || !dirty}
                size="sm"
                type="submit"
              >
                Save Client
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddClientForm;
