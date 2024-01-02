import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import { MdOutlineDashboard, MdOutlineGroup } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";

const MobileSidebar = ({ expanded }) => {
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

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div
      className={`z-20 ${
        expanded ? "scale-x-100" : "scale-x-0"
      } origin-left transition duration-300 ease-out pt-16 px-5 flex flex-col absolute top-0 left-0 h-screen w-[60vw] bg-opacity-70 backdrop-blur-md bg-gray`}
    >
      <div className="mt-6 flex flex-col gap-4">
        {LINKS.map((link, index) => (
          <SidebarIcon key={index} link={link} />
        ))}
        <button
          className="w-full flex items-center gap-4 py-4 px-4 cursor-pointer"
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

export default MobileSidebar;
