import { useRef, useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addClient,
  resetAddClientStatus,
  selectAddClientStatus,
} from "./clientSlice";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../ui/Button";
import { validateEmail, validateString } from "../../utils/validateFuncs";
import { parseImageUrl } from "../../utils/parseImageUrl";

const AddClient = ({ setAddClientModal }) => {
  const status = useSelector(selectAddClientStatus);
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    category: "",
    status: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    setFormErrors({});

    const validName = validateString(formData.name);
    const validEmail = validateEmail(formData.email);
    //  const validNumber = validateString(formData.number);
    const validAddress = validateString(formData.address);
    const validCategory = validateString(formData.category);
    const validStatus = validateString(formData.status);

    if (!validName) {
      setFormErrors((prev) => ({ ...prev, name: "This field is required" }));
    }
    if (!validEmail) {
      setFormErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    }

    if (!validAddress) {
      setFormErrors((prev) => ({ ...prev, address: "This field is required" }));
    }
    if (!validCategory) {
      setFormErrors((prev) => ({
        ...prev,
        category: "Please pick a category",
      }));
    }
    if (!validStatus) {
      setFormErrors((prev) => ({ ...prev, status: "Please select a status" }));
    }

    return (
      validEmail && validEmail && validAddress && validCategory && validStatus
    );
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handeSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(addClient({ ...formData, image: imageFile ?? null }));
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Client added successfully");
    }
    if (status === "error") {
      toast.error("Something went wrong");
    }
  }, [status]);

  console.log(imageFile);
  // useEffect(() => {
  //   if (imageInput) {
  //     console.log(imageInput);
  //     const url = URL.createObjectURL(imageInput);
  //     setImage(url);
  //   }
  // }, [imageInput]);
  return (
    <div className="fixed overflow-y-auto top-0 left-0 w-screen bg-slate-500  h-screen bg-opacity-50 flex justify-end px-16 py-2 z-50">
      <Toaster />
      <div className="bg-gray rounded-md shadow-md w-1/2 pb-4 overflow-y-auto">
        <div className="flex items-center gap-16  p-6 border-b border-lightGray">
          <button onClick={() => setAddClientModal(false)}>
            <IoCloseCircleOutline size={28} />
          </button>

          <h2 className="self-end font-semibold text-2xl">New Client</h2>
        </div>
        <div className="px-8 py-5 flex items-center justify-between">
          <form
            className="px-8 flex flex-col gap-4 w-full"
            onSubmit={(e) => handeSubmit(e)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="client-name">Client Name</label>
              <input
                type="text"
                id="client-name"
                name="name"
                onChange={(e) => handleInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.name && (
                <span className="text-sm font-semibold text-red">
                  {formErrors.name}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-email">Client Email</label>
              <input
                type="text"
                id="client-email"
                name="email"
                onChange={(e) => handleInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.email && (
                <span className="text-sm font-semibold text-red">
                  {formErrors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-phone">
                Client Phone Number (Optional)
              </label>
              <input
                type="text"
                id="client-phone"
                name="phone"
                onChange={(e) => handleInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-address">Client Address</label>
              <input
                type="text"
                id="client-address"
                name="address"
                onChange={(e) => handleInputChange(e)}
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
              {formErrors?.address && (
                <span className="text-sm font-semibold text-red">
                  {formErrors.address}
                </span>
              )}
            </div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-sm font-semibold">Categories</h3>
                <span className="text-xs mb-6 block">
                  Assign tags for organizational purposes
                </span>
                <div className="flex gap-4 items-center mb-4">
                  <input
                    type="radio"
                    name="category"
                    id="vip"
                    value="VIP"
                    onChange={(e) =>
                      e.target.checked == true && handleInputChange(e)
                    }
                  />
                  <label htmlFor="vip" className="text-xs">
                    VIP
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="category"
                    id="regular"
                    value="regular"
                    onChange={(e) =>
                      e.target.checked == true && handleInputChange(e)
                    }
                  />
                  <label htmlFor="regular" className="text-xs">
                    Regular
                  </label>
                </div>
                {formErrors?.category && (
                  <span className="text-sm font-semibold text-red">
                    {formErrors.category}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold">Client Status</h3>
                <span className="text-xs mb-6 block">
                  Select a status for your client
                </span>
                <div className="flex gap-4 items-center mb-4">
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    value="active"
                    onChange={(e) =>
                      e.target.checked == true && handleInputChange(e)
                    }
                  />
                  <label htmlFor="active" className="text-xs">
                    Active
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    value="inactive"
                    onChange={(e) =>
                      e.target.checked == true && handleInputChange(e)
                    }
                  />
                  <label htmlFor="inactive" className="text-xs">
                    Inactive
                  </label>
                </div>
                {formErrors?.status && (
                  <span className="text-sm font-semibold text-red">
                    {formErrors.status}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="text-sm">
                Additional Notes
              </label>
              <textarea
                type="text"
                id="notes"
                name="note"
                onChange={(e) => handleInputChange(e)}
                autoComplete="off"
                className="border bg-transparent  border-lightGray p-2 rounded-md"
              ></textarea>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="image"
                className="cursor-pointer self-start p-3 text-gray bg-blue rounded-sm text-sm"
              >
                Select Client Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImageFile(e.target.files)}
                className="hidden"
              />
              <div className="relative w-40 h-40 flex items-center justify-center border-blue border">
                {imageFile && (
                  <img
                    src={parseImageUrl(imageFile)}
                    className="z-10 absolute w-full h-full object-cover"
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
            <div className="mt-12 flex items-center gap-6 justify-end">
              <button
                className="py-3 px-4 border border-blue text-blue rounded-md"
                type="button"
              >
                Cancel
              </button>
              <Button pending={status === "pending"}>Add Client</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
