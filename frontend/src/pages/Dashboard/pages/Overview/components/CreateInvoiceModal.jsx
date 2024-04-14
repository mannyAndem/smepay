import { useGetClientsQuery } from "../../../../../features/api/apiSlice";
import CreateInvoiceForm from "../../../../../features/invoices/CreateInvoiceForm";
import Modal from "../../../../../ui/Modal";

const CreateInvoiceModal = ({ isOpen, closeModal }) => {
  const { data: clients, isLoading, isSuccess } = useGetClientsQuery();

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Create New Invoice">
      <div className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center justify-between gap-4 lg:text-xl">
          <span className="font-semibold">Invoice</span>
          <span>#INV-20231120-001</span>
        </div>
        {/* <button className="underline">COPY LINK</button> */}
        <select className="p-2 rounded-md bg-transparent border border-lightGray">
          <option className="py-4 bg-transparent border border-lightGray focus:">
            Import client
          </option>
          {isSuccess &&
            clients.map((client) => (
              <option value={client.id}>{client.name}</option>
            ))}
        </select>
      </div>
      <CreateInvoiceForm />
    </Modal>
  );
};

export default CreateInvoiceModal;
