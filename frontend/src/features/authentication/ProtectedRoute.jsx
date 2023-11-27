import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) return <Navigate to="/login" replace={true} />;

  return children;
};

export default ProtectedRoute;
