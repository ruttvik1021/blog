import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const AuthWrapper = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Outlet />
    </section>
  );
};

export default AuthWrapper;
