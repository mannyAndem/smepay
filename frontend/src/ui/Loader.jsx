import DotLoader from "react-spinners/DotLoader";

const Loader = ({ type, color }) => {
  const size = type === "lg" ? 148 : type === "md" ? 96 : 20;
  return <DotLoader size={size} color={color ? color : "#3498DB"} />;
};

export default Loader;
