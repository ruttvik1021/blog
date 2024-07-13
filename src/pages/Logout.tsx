import { Navigate } from "react-router-dom";
import { useAuthContext } from "../wrappers/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  logout();
  return <Navigate to="/auth/login" replace />;
};

export default Logout;
