import { FaHamburger } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-5 py-5 flex items-center justify-between lg:px-24">
      <a href="#" className="lg:text-3xl font-semibold">
        SMEPAY
      </a>
      <div className="block lg:hidden">
        <IoMenuOutline size={24} />
      </div>
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
    </nav>
  );
};

export default Navbar;
