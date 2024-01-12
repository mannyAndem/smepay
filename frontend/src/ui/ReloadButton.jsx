import Button from "./Button";
import reloadIcon from "../assets/refresh.png";

const ReloadButton = () => {
  const handleClick = () => {
    location.reload();
  };

  return (
    <Button type="secondary" size="sm" onClick={handleClick}>
      Reload <img src={reloadIcon} alt="" />
    </Button>
  );
};

export default ReloadButton;
