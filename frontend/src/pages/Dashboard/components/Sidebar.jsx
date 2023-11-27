import SidebarIcon from "./SidebarIcon";
import { FaClipboardUser } from "react-icons/fa6";
import { MdGroup, MdOutlineDashboard } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  /**
   * Component is responsible for taking an array of links and rendering in a sidebar.
   * Links in the sidebar are defined within the component.
   * To add new or update link, simply add a new link object to the LINKS array with properties, name, to and icon.
   */

  const LINKS = [
    {
      name: "dashboard",
      to: "/dashboard",
      icon: <MdOutlineDashboard size={24} color="#001F3F" />,
    },
    {
      name: "clients",
      to: "/dashboard/clients",
      icon: <MdGroup size={24} color="#001F3F" />,
    },
    {
      name: "transactions",
      to: "/dashboard/transactions",
      icon: <CiBank size={24} color="#001F3F" />,
    },
    {
      name: "settings",
      to: "/dashboard/settings",
      icon: <IoSettingsOutline size={24} color="#001F3F" />,
    },
  ];
  return (
    <div className="py-5">
      <span className="font-semibold text-3xl m-5">SMEPAY</span>
      <div className="mt-12 flex flex-col gap-4">
        {LINKS.map((link) => (
          <SidebarIcon link={link} />
        ))}
        <div className="w-full flex items-center gap-4 py-6 px-6 cursor-pointer">
          <div className="p-1 bg-darkGray rounded-sm shadow-sm">
            <CiLogout size={24} color="#001F3F" />
          </div>
          <span className="capitalize text-lg">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
