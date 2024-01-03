import Input from "./Input";

const InputGroup = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
  pill,
  labelStyle,
}) => {
  const labelClass =
    labelStyle === "bold" ? "capitalize text-xs font-bold" : "";

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor="name" className={labelClass}>
          {label}
        </label>
      )}
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pill={pill}
      />
      {error && <span className="text-xs text-red">{error}</span>}
    </div>
  );
};

export default InputGroup;
