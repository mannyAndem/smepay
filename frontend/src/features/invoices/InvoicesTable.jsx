import StatusButton from "./StatusButton";
import { useSelector } from "react-redux";
import { selectSearchValue } from "./invoicesSlice";
import { useState } from "react";
import { useEffect } from "react";

const InvoicesTable = ({ invoices }) => {
  const searchValue = useSelector(selectSearchValue);
  const [data, setData] = useState(invoices);

  const [sortOrder, setSortOrder] = useState("newest");

  const handleChange = (e) => {
    console.log(e.target.value);
    setSortOrder(e.target.value);
  };
  // TODO: HANDLE SORTING OF INVOICES
  useEffect(() => {
    if (sortOrder === "oldest") {
      setData((prev) => {
        const copy = [...prev];
        console.log("before: ", copy);
        copy.sort((a, b) => {
          return Date.parse(a.issuedDate) < Date.parse(b.issuedDate) ? -1 : 1;
        });
        console.log("after: ", copy);
        return copy;
      });
    }
    if (sortOrder === "newest") {
      setData((prev) => {
        const copy = [...prev];
        console.log("before: ", copy);
        copy.sort((a, b) =>
          Date.parse(a.issuedDate) > Date.parse(b.issuedDate) ? -1 : 1
        );
        console.log("after: ", copy);
        return copy;
      });
    }
  }, [sortOrder]);

  useEffect(() => {
    if (searchValue) {
      setData((prev) =>
        prev.filter((invoice) =>
          invoice.billTo.toLowerCase().includes(searchValue)
        )
      );
    } else {
      setData(invoices);
      setSortOrder("oldest");
    }
  }, [searchValue]);

  return (
    <div className="bg-white rounded-md shadow-md pb-4">
      <div className="flex items-center justify-between  p-6">
        <span className="text-sm font-semibold">Open Invoices</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select value={sortOrder} onChange={handleChange} className="text-sm">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {data?.length > 0 ? (
        <table className="hidden w-full text-center lg:table">
          <thead className="bg-veryDarkBlue text-gray font-semibold">
            <tr>
              <th className="p-2 border-r border-gray">Name</th>
              <th className="p-2 border-x border-gray hidden lg:table-cell">
                Amount
              </th>
              <th className="p-2 border-x border-gray hidden lg:table-cell">
                Dates
              </th>
              <th className="p-2 border-x border-gray hidden lg:table-cell">
                Invoice Number
              </th>
              <th className="p-2 border-l border-gray">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice) => {
              return (
                <tr key={invoice._id}>
                  <td className="p-2 text-left pl-4">
                    {invoice.billTo.toUpperCase()}
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    #{invoice.totalAmount.toLocaleString()}.00
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {invoice.dueDate.split("T")[0]}
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {invoice.invoiceNo}
                  </td>
                  <td className="p-2">
                    <StatusButton invoice={invoice} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : searchValue ? (
        <span className="block text-center text-blue">
          No invoices match the search term
        </span>
      ) : (
        <span className="block text-center text-blue">
          You haven't created any invoices yet.
        </span>
      )}
    </div>
  );
};

export default InvoicesTable;
