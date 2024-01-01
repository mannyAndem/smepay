const Input = ({
  pill,
  disabled,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  if (name === undefined) {
    throw new Error("name prop is required");
  }
  if (value === undefined) {
    throw new Error("value prop is required");
  }
  if (onChange === undefined || typeof onChange !== "function") {
    throw new Error("onchange prop is required and must be a function");
  }

  const pillClass = "rounded-3xl";
  const disabledClass = "opacity-70";

  return (
    <input
      type={type ? type : "text"}
      autoComplete="off"
      id={id ? id : name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={Boolean(disabled)}
      className={`${pill ? pillClass : ""} ${
        disabled ? disabledClass : ""
      } text-sm w-full bg-white border border-lightGray p-3 focus:outline-blue`}
    />
  );
};

export default Input;
