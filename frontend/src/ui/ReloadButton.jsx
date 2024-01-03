import { useNavigate } from "react-router-dom";

const ReloadButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Reloading...");
    navigate();
  };

  return <button onClick={handleClick}>Reload</button>;
};

export default ReloadButton;
