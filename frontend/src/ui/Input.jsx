import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({
  pill,
  disabled,
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  className,
  ...rest
}) => {
  const pillClass = pill ? "rounded-3xl" : "rounded-sm";
  const disabledClass = disabled ? "opacity-70" : "";

  return type === "date" ? (
    <DatePicker
      id={id ? id : name}
      name={name}
      onChange={(date, e) => onChange(name, date, true)}
      selected={value}
      className={
        className
          ? className
          : `${pillClass} ${disabledClass} text-sm w-full bg-transparent border border-lightGray p-3 focus:outline-blue`
      }
    />
  ) : (
    <Field
      type={type ? type : "text"}
      autoComplete="off"
      id={id ? id : name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={!!disabled}
      className={
        className
          ? className
          : `${pillClass} ${disabledClass} text-sm w-full bg-transparent border border-lightGray p-3 focus:outline-blue`
      }
      {...rest}
    />
  );
};

export default Input;
