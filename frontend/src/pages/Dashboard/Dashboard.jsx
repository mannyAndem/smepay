import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Clients from "./components/Clients";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import { CiBellOn } from "react-icons/ci";
import Header from "./components/Header";

const Dashboard = () => {
  /**
   * Component is responsible for rendering out entire sidebar page.
   */

  return (
    <div className="grid grid-cols-6 min-h-screen">
      <div className="col-span-1 sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="pl-10 col-span-5 bg-gray">
        <Header />
        <div className="pr-5">
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
