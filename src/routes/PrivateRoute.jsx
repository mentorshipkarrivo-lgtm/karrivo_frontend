import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;