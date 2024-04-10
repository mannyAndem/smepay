import AddClientForm from "../../../../../features/clients/AddClientForm";
import Modal from "../../../../../ui/Modal";

const AddClientModal = ({ isOpen, closeModal }) => {
  return (
    <Modal title="New Client" isOpen={isOpen} closeModal={closeModal}>
      <AddClientForm />
    </Modal>
  );
};

export default AddClientModal;
