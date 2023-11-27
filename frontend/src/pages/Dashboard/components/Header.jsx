import { CiBellOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/authentication/authSlice";

/**
 * The component is responsible for rendering out the dashboard header
 *
 */
const Header = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <header className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
      <form className="w-1/2 flex items-center">
        <input
          id="searchInput"
          type="search"
          autoComplete="off"
          placeholder="Search Invoices"
          className="px-4 py-2 rounded-md w-full border bg-gray border-[#aaa] focus:outline-none focus:border-blue focus:border-2"
        />
      </form>
      <div className="flex items-center justify-start gap-6">
        <CiBellOn size={32} />
        <div className="h-16 w-16 rounded-full bg-slate-400"></div>
        <span className="text-xl font-semibold">Lucas John</span>
      </div>
    </header>
  );
};

export default Header;
