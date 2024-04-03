const InputError = ({ isInvalid, error }) => {
  return isInvalid && <span className="block text-xs text-red">{error}</span>;
};

export default InputError;
