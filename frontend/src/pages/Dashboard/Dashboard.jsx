import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Clients from "./components/Clients";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import { FaBell } from "react-icons/fa6";

const Dashboard = () => {
  /**
   * Component is responsible for rendering out entire sidebar page.
   */

  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="col-span-1 sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="pl-12 col-span-5 bg-gray-100">
        <header className="flex items-center justify-between px-4 py-2 bg-white">
          <form className="w-1/2 flex items-center">
            <input
              id="searchInput"
              type="search"
              autoComplete="off"
              placeholder="Search Invoices"
              className="px-4 py-2 rounded-md w-full border"
            />
          </form>
          <div className="flex items-center justify-start gap-6">
            <FaBell size={28} />
            <div className="h-16 w-16 rounded-full bg-slate-400"></div>
            <span>Lucas John</span>
          </div>
        </header>
        <div className="px-8">
          <Routes>
            <Route path="/" element={<Overview />} exact />
            <Route path="clients" element={<Clients />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
