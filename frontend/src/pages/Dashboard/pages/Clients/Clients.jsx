import { useEffect, useState } from "react";
import AddClient from "../../../../features/clients/AddClient";
import ClientStats from "../../../../features/clients/ClientsStats";
import ClientsTable from "../../../../features/clients/ClientsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  selectClients,
  selectClientsError,
  selectClientsStatus,
} from "../../../../features/clients/clientSlice";
import Loader from "../../../../ui/Loader";
import ReloadButton from "../../../../ui/ReloadButton";

const Clients = () => {
  const [addClientModal, setAddClientModal] = useState(false);

  const clients = useSelector(selectClients);
  const error = useSelector(selectClientsError);
  const status = useSelector(selectClientsStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchClients());
    }
  }, [status, dispatch]);

  return (
    <>
      {addClientModal && <AddClient setAddClientModal={setAddClientModal} />}
      <div className="relative">
        <div className="flex justify-between items-center my-6">
          <h1 className="font-semibold text-2xl">Clients</h1>
          <button
            className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
            onClick={() => setAddClientModal(true)}
          >
            Add Client
          </button>
        </div>
        {status === "pending" ? (
          <div className="mt-24">
            <Loader type="lg" />
          </div>
        ) : status === "success" ? (
          <>
            <ClientStats clients={clients} />
            <ClientsTable clients={clients} />
          </>
        ) : status === "error" ? (
          <div className="mt-24 flex flex-col items-center gap-4">
            <span className="block text-center text-xl text-red">{error}</span>
            <ReloadButton />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Clients;
