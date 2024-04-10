const TextBox = ({
  className,
  placeholder,
  name,
  value,
  onChange,
  ...rest
}) => {
  return (
    <textarea
      className={
        className
          ? className
          : `text-sm w-full bg-transparent border border-lightGray p-3 focus:outline-blue disabled:opacity-50`
      }
      rows={5}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      {...rest}
    ></textarea>
  );
};

export default TextBox;
