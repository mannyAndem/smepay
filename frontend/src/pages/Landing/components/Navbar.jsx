import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-24 py-5 flex items-center justify-between">
      <a href="#" className="text-3xl font-semibold">
        SMEPAY
      </a>
      <ul className="flex gap-8 items-center">
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
      <div className="flex items-center gap-8">
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
