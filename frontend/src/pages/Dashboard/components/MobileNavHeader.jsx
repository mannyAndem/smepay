import { CiBellOn } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";

const MobileNavHeader = () => {
  return (
    <header className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <IoMenu size={24} color="" />
        </div>
        <div className="flex items-center gap-3">
          <CiBellOn size={20} />
          <div className="h-10 w-10 rounded-full bg-gray flex justify-center items-center  text-2xl font-semibold text-blue">
            E
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
