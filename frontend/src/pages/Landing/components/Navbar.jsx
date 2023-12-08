import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <nav className="px-5 py-5 flex items-center justify-between lg:px-24">
      <a href="#" className="lg:text-3xl font-semibold">
        SMEPAY
      </a>
      <button className="block lg:hidden z-50" onClick={toggleMenu}>
        <IoMenuOutline size={24} className={!expanded ? "block" : "hidden"} />
        <IoClose size={24} className={expanded ? "block" : "hidden"} />
      </button>
      <ul className="hidden gap-8 items-center lg:flex">
        <li className="text-2xl font-semibold">
          <Link>Home</Link>
        </li>
        <li className="text-2xl font-semibold">
          <Link>Features</Link>
        </li>
        <li className="text-2xl font-semibold">
          <Link>Invoice</Link>
        </li>
        <li className="text-2xl font-semibold">
          <Link>Transactions</Link>
        </li>
      </ul>
      <div className="hidden items-center gap-8 lg:flex">
        <Link to="/login" className="text-2xl font-semibold">
          Sign in
        </Link>
        <Link
          to="/signup"
          className="py-4 px-5 rounded-md bg-blue text-gray text-2xl font-semibold"
        >
          Get Started
        </Link>
      </div>

      {/* mobile menu */}
      <div
        className={`${
          expanded ? "scale-x-100" : "scale-x-0"
        } origin-right transition-all duration-300 ease-out z-20 absolute py-24 px-5 top-0 right-0 h-screen w-[60vw] backdrop-blur-md bg-gray bg-opacity-70 rounded-s-lg lg:hidden`}
      >
        <ul className="flex flex-col gap-4 items-center ">
          <li className="text-xl font-semibold">
            <Link>Home</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link>Features</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link>Invoice</Link>
          </li>
          <li className="text-xl font-semibold">
            <Link>Transactions</Link>
          </li>
        </ul>
        <div className="mt-16 flex flex-col gap-4 items-center ">
          <Link to="/login" className="text-xl font-semibold">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="py-4 px-5 rounded-md bg-blue text-gray text-xl font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
