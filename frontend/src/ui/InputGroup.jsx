import Input from "./Input";
import InputError from "./InputErrors";

const InputGroup = ({
  isInvalid,
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
      <InputError isInvalid={isInvalid} error={error} />
    </div>
  );
};

export default InputGroup;
