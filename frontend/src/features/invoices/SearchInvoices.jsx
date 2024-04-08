import { FaDiaspora } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSearchValue } from "./invoicesSlice";

const SearchInvoices = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchValue(e.target.value.toLowerCase()));
  };
  return (
    <search className="flex items-center">
      <input
        onChange={handleChange}
        id="searchInput"
        type="search"
        autoComplete="off"
        placeholder="Search Invoices"
        className="px-4 py-2 rounded-md w-full border bg-gray border-[#aaa] focus:outline-none focus:border-blue focus:border-2"
      />
    </search>
  );
};

export default SearchInvoices;
