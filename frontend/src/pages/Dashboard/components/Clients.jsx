import { useState } from "react";
import AddClient from "../../../features/clients/AddClient";
import ClientStats from "../../../features/clients/ClientsStats";
import ClientsTable from "../../../features/clients/ClientsTable";

const Clients = () => {
  const [addClientModal, setAddClientModal] = useState(false);

  return (
    <>
      {addClientModal && <AddClient setAddClientModal={setAddClientModal} />}
      <div>
        <div className="flex justify-between items-center my-6">
          <h1 className="font-semibold text-2xl">Clients</h1>
          <button
            className="bg-blue text-white text-sm px-10 font-bold py-4 rounded-md"
            onClick={() => setAddClientModal(true)}
          >
            Add Client
          </button>
        </div>
        <ClientStats />
        <ClientsTable />
      </div>
    </>
  );
};

export default Clients;
