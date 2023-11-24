import { useSelector } from "react-redux";
import { selectClients } from "./clientSlice";
import { FaEllipsis } from "react-icons/fa6";

const ClientsTable = () => {
  const clients = useSelector(selectClients);

  return (
    <div className=" my-16  bg-white rounded-md shadow-md ">
      <div className="flex items-center justify-between  p-6">
        <div className="flex">
          <span className="p-2 border-r text-sm">All</span>
          <span className="p-2 border-r text-sm">Active</span>
          <span className="p-2 text-sm">Inactive</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm">
            <option>Newest</option>
          </select>
        </div>
      </div>
      <table className="w-full text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border-r border-black">Name</th>
            <th className="p-2 border-x border-black">Email Address</th>
            <th className="p-2 border-x border-black">Total Outstanding</th>
            <th className="p-2 border-l border-black">Details</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            return (
              <tr key={client.id}>
                <td className="p-2 border-r border-black">{client.name}</td>
                <td className="p-2 border-x border-black">{client.email}</td>
                <td className="p-2 border-x border-black">
                  {client.totalOutstanding.toLocaleString()}
                </td>
                <td className="p-2 border-l border-black">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="p-2 w-1/2 bg-black rounded-2xl text-white text-sm">
                      View
                    </div>
                    <FaEllipsis size={24} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
