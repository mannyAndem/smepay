import { NavLink } from "react-router-dom";

const SidebarIcon = ({ link }) => {
  /**
   * Component is responsible for taking a link prop and rendering out a sidebar icon for that link.
   */

  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? "bg-gray-700 text-white" : "bg-transparent"
        } w-full flex items-center gap-4 py-4 px-4`
      }
      to={link.to}
      end
    >
      <div className="p-2 bg-gray-400 rounded-sm shadow-sm">{link.icon}</div>
      <span className="capitalize text-lg">
        {link.name.charAt(0).toUpperCase() + link.name.substring(1)}
      </span>
    </NavLink>
  );
};

export default SidebarIcon;
