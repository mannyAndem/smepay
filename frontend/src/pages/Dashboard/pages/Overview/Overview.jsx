import Statistics from "../../components/Statistics";
import InvoicesTable from "../../../../features/invoices/InvoicesTable";
import { useState } from "react";
import Loader from "../../../../ui/Loader";
import ErrorMessage from "../../../../ui/ErrorMessage";
import { useGetInvoicesQuery } from "../../../../features/api/apiSlice";
import CreateInvoiceModal from "./components/CreateInvoiceModal";

const Overview = () => {
  const { isLoading, error, data: invoices, isSuccess } = useGetInvoicesQuery();

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <CreateInvoiceModal isOpen={modalOpen} closeModal={closeModal} />
      <div className="relative h-full">
        <div className="flex justify-between items-center my-6">
          <h1 className="font-semibold text-2xl">Overview</h1>
          <button
            className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
            onClick={openModal}
          >
            New Invoice
          </button>
        </div>
        {isSuccess ? (
          <>
            <Statistics invoices={invoices} />
            <div className="my-12">
              <InvoicesTable invoices={invoices} />
            </div>
          </>
        ) : isLoading ? (
          <div className="mt-24">
            <Loader type="lg" />
          </div>
        ) : (
          <ErrorMessage error={error?.name} />
        )}
      </div>
    </>
  );
};

export default Overview;
