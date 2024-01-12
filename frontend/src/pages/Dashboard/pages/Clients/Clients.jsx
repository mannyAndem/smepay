import wip from "../../../../assets/wip.svg";

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
import ErrorMessage from "../../../../ui/ErrorMessage";

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
    // <>
    //   {addClientModal && <AddClient setAddClientModal={setAddClientModal} />}
    //   <div className="relative">
    //     <div className="flex justify-between items-center my-6">
    //       <h1 className="font-semibold text-2xl">Clients</h1>
    //       <button
    //         className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
    //         onClick={() => setAddClientModal(true)}
    //       >
    //         Add Client
    //       </button>
    //     </div>
    //     {status === "pending" ? (
    //       <div className="mt-24">
    //         <Loader type="lg" />
    //       </div>
    //     ) : status === "success" ? (
    //       <>
    //         <ClientStats clients={clients} />
    //         <ClientsTable clients={clients} />
    //       </>
    //     ) : status === "error" ? (
    //       <ErrorMessage error={error} />
    //     ) : (
    //       <div></div>
    //     )}
    //   </div>
    // </>
    <div className="px-24 pb-24">
      <div className="mx-auto max-w-[600px]">
        <img src={wip} alt="Developer at work" className="w-full" />
      </div>
      <p className="text-4xl text-center text-blue font-semibold">
        Coming soon!
      </p>
    </div>
  );
};

export default Clients;
