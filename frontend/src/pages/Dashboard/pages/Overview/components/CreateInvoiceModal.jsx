import CreateInvoiceForm from "../../../../../features/invoices/CreateInvoiceForm";
import Modal from "../../../../../ui/Modal";

const CreateInvoiceModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Create New Invoice">
      <div className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center justify-between gap-4 lg:text-xl">
          <span className="font-semibold">Invoice</span>
          <span>#INV-20231120-001</span>
        </div>
        <button className="underline">COPY LINK</button>
      </div>
      <CreateInvoiceForm />
    </Modal>
  );
};

export default CreateInvoiceModal;
