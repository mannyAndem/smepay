import illustration from "../assets/error.svg";
import ReloadButton from "./ReloadButton";

const ErrorMessage = ({ error }) => {
  return (
    <div className="flex flex-col items-center h-[50vh]">
      <img
        src={illustration}
        className="w-full h-full"
        alt="Error illustration"
      />
      <div className="flex flex-col items-center gap-4">
        <span className="block text-center text-xl text-red">{error}</span>
        <ReloadButton />
      </div>
    </div>
  );
};

export default ErrorMessage;
