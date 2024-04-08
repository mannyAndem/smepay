import { FaEllipsis } from "react-icons/fa6";
import Loader from "../../ui/Loader";

const ClientsTable = ({ clients }) => {
  return (
    <div className="my-16  bg-white rounded-md shadow-md pb-4">
      <div className="flex items-center justify-between  p-6">
        <div className="flex">
          <span className="px-2 py-1 border-r text-sm font-semibold text-green">
            All
          </span>
          <span className="px-2 py-1 border-r text-sm font-semibold">
            Active
          </span>
          <span className="px-2 py-1 text-sm font-semibold">Inactive</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm">
            <option>Newest</option>
          </select>
        </div>
      </div>
      {clients.length === 0 ? (
        <span className="block text-xl text-center font-medium my-8">
          Add your first client by clicking the{" "}
          <span className="text-blue">Add Client</span> button!
        </span>
      ) : (
        <table className="w-full text-center">
          <thead className="bg-veryDarkBlue text-gray font-semibold">
            <tr>
              <th className="p-2 border-r border-gray">Name</th>
              <th className="p-2 border-x border-gray hidden lg:table-cell">
                Email Address
              </th>
              <th className="p-2 border-x border-gray hidden lg:table-cell">
                Total Outstanding
              </th>
              <th className="p-2 border-l border-gray">Details</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => {
              return (
                <tr key={client.id}>
                  <td className="p-2">{client.name}</td>
                  <td className="p-2 hidden lg:table-cell">{client.email}</td>
                  <td className="p-2 hidden lg:table-cell">
                    {client.totalOutstanding.toLocaleString()}
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-4 justify-center">
                      <button className="p-2 w-1/2 bg-blue rounded-2xl text-gray font-semibold text-sm">
                        View
                      </button>
                      <div className="group relative">
                        <button>
                          <FaEllipsis size={20} />
                        </button>
                        <div className="z-10 scale-x-0 origin-right absolute top-1/2 transform -translate-y-1/2 right-[-8px] bg-white flex gap-1 flex-col p-5 rounded-md transition duration-300 ease-out group-hover:scale-x-100 shadow-sm">
                          <button className="p-2 flex justify-start items-center">
                            Edit
                          </button>
                          <button className="p-2 whitespace-nowrap flex justify-start items-center">
                            Recent Payment
                          </button>
                          <button className="p-2 flex justify-start items-center">
                            Print
                          </button>
                          <button className="p-2 flex justify-start items-center">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientsTable;
