import { IoCloseCircleOutline } from "react-icons/io5";

const AddClient = ({ setAddClientModal }) => {
  return (
    <div className="fixed overflow-y-auto top-0 left-0 w-screen bg-slate-500  h-screen bg-opacity-50 flex justify-end px-16 py-2 z-50">
      <div className="bg-gray rounded-md shadow-md w-1/2 pb-4 overflow-y-auto">
        <div className="flex items-center gap-16  p-6 border-b border-lightGray">
          <button onClick={() => setAddClientModal(false)}>
            <IoCloseCircleOutline size={28} />
          </button>

          <h2 className="self-end font-semibold text-2xl">New Client</h2>
        </div>
        <div className="px-8 py-5 flex items-center justify-between">
          <form className="px-8 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <label htmlFor="client-name">Client Name</label>
              <input
                type="text"
                id="client-name"
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-email">Client Email</label>
              <input
                type="text"
                id="client-email"
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-phone">
                Client Phone Number (Optional)
              </label>
              <input
                type="text"
                id="client-phone"
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client-address">Client Address</label>
              <input
                type="text"
                id="client-address"
                autoComplete="off"
                className="border border-lightGray p-2 rounded-md bg-transparent"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="text-sm">
                Additional Notes
              </label>
              <textarea
                type="text"
                id="notes"
                autoComplete="off"
                className="border bg-transparent  border-lightGray p-2 rounded-md"
              ></textarea>
            </div>
            <div className="mt-12 flex items-center gap-6 justify-end">
              <button
                className="py-3 px-4 border border-blue text-blue rounded-md"
                type="button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-3  bg-blue text-gray rounded-md"
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClient;
