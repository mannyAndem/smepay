import SidebarIcon from "./SidebarIcon";
import { FaClipboardUser } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
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
      to: "/",
      icon: <MdOutlineDashboard size={28} />,
    },
    {
      name: "clients",
      to: "/clients",
      icon: <FaClipboardUser size={28} />,
    },
    {
      name: "transactions",
      to: "/transactions",
      icon: <CiBank size={28} />,
    },
    {
      name: "settings",
      to: "/settings",
      icon: <IoSettingsOutline size={28} />,
    },
  ];
  return (
    <div className="py-4 border-r-2 ">
      <span className="font-semibold text-xl m-4">SMEPAY</span>
      <div className="mt-12 flex flex-col gap-4">
        {LINKS.map((link) => (
          <SidebarIcon link={link} />
        ))}
        <div className="w-full flex items-center gap-4 py-6 px-4 cursor-pointer">
          <div className="p-2 bg-gray-400 rounded-sm shadow-sm">
            <CiLogout size={28} />
          </div>
          <span className="capitalize text-lg">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
