import { CiBellOn } from "react-icons/ci";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/authentication/authSlice";

const MobileNavHeader = ({ expanded, toggleMobileNav }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <header className="p-5">
      <div className="flex justify-between items-center">
        <button className="z-50" onClick={toggleMobileNav}>
          <IoMenu size={24} className={expanded ? "hidden" : "block"} />
          <IoClose size={24} className={!expanded ? "hidden" : "block"} />
        </button>
        <div className="flex items-center gap-3">
          <CiBellOn size={20} />
          <div className="h-10 w-10 rounded-full bg-white shadow-sm flex justify-center items-center  text-2xl font-semibold text-blue">
            {currentUser.fullname.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      <search className="mt-4 w-full flex items-center">
        <input
          id="searchInput"
          type="search"
          autoComplete="off"
          placeholder="Search Invoices"
          className="px-4 py-2 rounded-md w-full border bg-gray border-[#aaa] focus:outline-none focus:border-blue focus:border-2"
        />
      </search>
    </header>
  );
};

export default MobileNavHeader;
