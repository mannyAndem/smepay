import { CiBellOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/authentication/authSlice";
import SearchInvoices from "../../../features/invoices/SearchInvoices";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <header className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
      <div className="w-1/2">
        <SearchInvoices />
      </div>

      <div className="flex items-center justify-start gap-6">
        <CiBellOn size={32} />
        <div className="h-16 w-16 rounded-full bg-gray flex justify-center items-center  text-2xl font-semibold text-blue">
          {currentUser.fullname.charAt(0).toUpperCase()}
        </div>
        <span className="text-xl font-semibold">
          {currentUser.fullname.toUpperCase()}
        </span>
      </div>
    </header>
  );
};

export default Header;
