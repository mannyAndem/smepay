import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({ children, isOpen, closeModal, title }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } overflow-y-auto top-0 left-0 w-screen bg-slate-500 h-screen bg-opacity-50 flex justify-end px-5 lg:px-16 py-2 z-50`}
    >
      <div className="bg-gray rounded-md shadow-md w-full pb-4 overflow-y-auto lg:w-1/2">
        <div className="flex items-center gap-16  p-6 border-b border-lightGray">
          <button onClick={closeModal}>
            <IoCloseCircleOutline size={28} />
          </button>

          <h2 className="self-end font-semibold text-2xl">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
