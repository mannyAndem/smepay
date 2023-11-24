import ClientStats from "../../../features/clients/ClientsStats";
import ClientsTable from "../../../features/clients/ClientsTable";

const Clients = () => {
  return (
    <div>
      <div className="flex justify-between items-center my-6">
        <h1 className="font-semibold text-2xl">Clients</h1>
        <button className="bg-black text-white text-sm px-6 py-4 rounded-md">
          Add Client
        </button>
      </div>
      <ClientStats />
      <ClientsTable />
    </div>
  );
};

export default Clients;
