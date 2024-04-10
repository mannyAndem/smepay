import { useState } from "react";
import ClientStats from "../../../../features/clients/ClientsStats";
import ClientsTable from "../../../../features/clients/ClientsTable";
import Loader from "../../../../ui/Loader";
import ErrorMessage from "../../../../ui/ErrorMessage";
import AddClientModal from "./components/AddClientModal";
import { useGetAllClientsQuery } from "../../../../features/api/apiSlice";

const Clients = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllClientsQuery();

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <AddClientModal isOpen={modalOpen} closeModal={closeModal} />
      <div className="relative">
        <div className="flex justify-between items-center my-6">
          <h1 className="font-semibold text-2xl">Clients</h1>
          <button
            className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
            onClick={openModal}
          >
            Add Client
          </button>
        </div>
        {isLoading ? (
          <div className="mt-24">
            <Loader type="lg" />
          </div>
        ) : isSuccess ? (
          <>
            <ClientStats clients={clients} />
            <ClientsTable clients={clients} />
          </>
        ) : isError ? (
          <ErrorMessage error={error.message} />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Clients;
