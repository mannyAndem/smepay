import SidebarIcon from "./SidebarIcon";
import { MdOutlineDashboard, MdOutlineGroup } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

/**
 * Component is responsible for taking an array of links and rendering in a sidebar.
 * Links in the sidebar are defined within the component.
 * To add new or update link, simply add a new link object to the LINKS array with properties, name, to and icon.
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LINKS = [
    {
      name: "dashboard",
      to: "/dashboard",
      icon: <MdOutlineDashboard size={24} color="#001F3F" />,
    },
    {
      name: "clients",
      to: "/dashboard/clients",
      icon: <MdOutlineGroup size={24} color="#001F3F" />,
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

  // function to handle sign out
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="py-5">
      <span className="font-semibold text-3xl m-5">SMEPAY</span>
      <div className="mt-12 flex flex-col gap-4">
        {LINKS.map((link) => (
          <SidebarIcon link={link} />
        ))}
        <button
          className="w-full flex items-center gap-4 py-6 px-6 cursor-pointer"
          onClick={handleLogOut}
        >
          <div className="p-1 bg-darkGray rounded-sm shadow-sm">
            <CiLogout size={24} color="#001F3F" />
          </div>
          <span className="capitalize text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
