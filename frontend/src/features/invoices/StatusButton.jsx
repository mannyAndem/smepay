import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { Link } from "react-router-dom";

const StatusButton = ({ invoice }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 justify-center">
      <Link
        to={`/invoices/${invoice._id}`}
        className={`${
          invoice.status === "paid"
            ? "bg-green"
            : invoice.status === "pending"
            ? "bg-orange"
            : "bg-red"
        } py-2 px-4 rounded-2xl text-white text-sm`}
      >
        {invoice.status.toUpperCase()}
      </Link>
      <div className="relative">
        <button onClick={toggleVisible}>
          <FaEllipsis size={20} />
        </button>
        <Popup visible={visible} />
      </div>
    </div>
  );
};

export default StatusButton;

const Popup = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? "scale-y-100" : "scale-y-0"
      } z-10  origin-top absolute top-[100%] transform right-[-8px] bg-white flex gap-1 flex-col p-5 rounded-md transition duration-300 ease-out shadow-sm`}
    >
      <button className="p-2 flex justify-start items-center">Edit</button>
      <button className="p-2 whitespace-nowrap flex justify-start items-center">
        Recent Payment
      </button>
      <button className="p-2 flex justify-start items-center">Print</button>
      <button className="p-2 flex justify-start items-center">Delete</button>
    </div>
  );
};
