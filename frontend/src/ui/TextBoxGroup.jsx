import InputError from "./InputErrors";
import TextBox from "./TextBox";

const TextBoxGroup = ({
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
      <TextBox
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <InputError isInvalid={isInvalid} error={error} />
    </div>
  );
};

export default TextBoxGroup;
