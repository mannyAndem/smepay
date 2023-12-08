import { NavLink } from "react-router-dom";

const SidebarIcon = ({ link }) => {
  /**
   * Component is responsible for taking a link prop and rendering out a sidebar icon for that link.
   */

  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-blue text-white [&>div]:bg-white"
            : "[&>div]:bg-darkGray bg-transparent"
        } w-full flex items-center gap-4 py-4 px-6`
      }
      to={link.to}
      end
    >
      <div className="p-1 rounded-sm shadow-sm">{link.icon}</div>
      <span className="capitalize lg:text-lg">
        {link.name.charAt(0).toUpperCase() + link.name.substring(1)}
      </span>
    </NavLink>
  );
};

export default SidebarIcon;
