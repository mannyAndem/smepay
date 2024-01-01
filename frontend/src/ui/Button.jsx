import Loader from "./Loader";

const Button = ({ children, type, pill, pending, onClick }) => {
  const primary = "bg-blue text-gray";
  const secondary = "";
  const pillClass = "rounded-3xl";
  const notPill = "rounded-sm";
  const pendingClass = "opacity-70";

  return (
    <button
      disabled={Boolean(pending)}
      className={`${type == "secondary" ? secondary : primary} ${
        pill ? pillClass : notPill
      } ${pending ? pendingClass : ""} relative p-3  text-xl font-bold`}
      onClick={onClick}
    >
      <span
        className={`${
          pending ? "opacity-0" : ""
        } flex items-center justify-center gap-2`}
      >
        {children}
      </span>
      {pending && (
        <div className=" absolute top-0 left-0 right-0 bottom-0">
          <Loader color={primary ? "#D9D9D9" : null} />
        </div>
      )}
    </button>
  );
};

export default Button;
