import Loader from "./Loader";

const Button = ({
  children,
  variant = "primary",
  pill,
  pending,
  onClick,
  size,
  disabled,
  type,
}) => {
  const typeClass =
    variant === "secondary"
      ? "border border-blue text-blue"
      : "bg-blue text-gray";
  const pillClass = pill ? "rounded-3xl" : "rounded-sm";
  const sizeClass = size === "sm" ? "text-base" : "text-xl font-bold";

  return (
    <button
      type={type}
      disabled={!!pending || disabled}
      className={`${typeClass} ${pillClass} ${sizeClass} relative p-3 disabled:opacity-70`}
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
          <Loader color={variant == "primary" ? "#D9D9D9" : null} />
        </div>
      )}
    </button>
  );
};

export default Button;
