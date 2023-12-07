import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./components/Overview";
import Clients from "./components/Clients";
import Transactions from "./components/Transactions";
import Settings from "./components/Settings";
import Header from "./components/Header";
import MobileNavHeader from "./components/MobileNavHeader";

const Dashboard = () => {
  /**
   * Component is responsible for rendering out entire sidebar page.
   */

  return (
    <div className="grid grid-cols-1 min-h-screen lg:grid-cols-6">
      <div className="hidden col-span-1 sticky top-0 h-screen lg:block">
        <Sidebar />
      </div>
      <div className="lg:pl-10 col-span-5 bg-gray">
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="block lg:hidden">
          <MobileNavHeader />
        </div>
        <div className="px-5 lg:pr-5 lg:px-0">
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
