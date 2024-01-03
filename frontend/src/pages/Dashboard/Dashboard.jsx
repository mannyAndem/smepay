import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview/Overview";
import Clients from "./pages/Clients/Clients";
import Transactions from "./pages/Transactions/Transactions";
import Settings from "./pages/Settings/Settings";
import Header from "./components/Header";
import MobileNavHeader from "./components/MobileNavHeader";
import MobileSidebar from "./components/MobileSidebar";
import { useState } from "react";

const Dashboard = () => {
  /**
   * Component is responsible for rendering out entire sidebar page.
   */

  const [expanded, setExpanded] = useState(false);

  const toggleMobileNav = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      <div className="hidden col-span-1 h-screen sticky top-0 lg:block">
        <Sidebar />
      </div>
      <div className="h-full lg:pl-10 col-span-5 bg-gray ">
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="block lg:hidden">
          <MobileNavHeader
            toggleMobileNav={toggleMobileNav}
            expanded={expanded}
          />
          <MobileSidebar expanded={expanded} />
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
