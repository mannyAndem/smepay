import Loader from "./Loader";

const Button = ({
  children,
  type = "primary",
  pill,
  pending,
  onClick,
  size,
}) => {
  const typeClass =
    type === "secondary" ? "border border-blue text-blue" : "bg-blue text-gray";
  const pillClass = pill ? "rounded-3xl" : "rounded-sm";
  const pendingClass = pending ? "opacity-70" : "";
  const sizeClass = size === "sm" ? "text-base" : "text-xl font-bold";

  return (
    <button
      disabled={Boolean(pending)}
      className={`${typeClass} ${pillClass} ${pendingClass} ${sizeClass} relative p-3`}
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
          <Loader color={type == "primary" ? "#D9D9D9" : null} />
        </div>
      )}
    </button>
  );
};

export default Button;
