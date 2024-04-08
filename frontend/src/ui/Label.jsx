const Label = ({ className, style, children, htmlFor, ...rest }) => {
  const labelClass = style === "bold" ? "capitalize text-xs font-bold" : "";

  return (
    <label
      className={className ? className : labelClass}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
