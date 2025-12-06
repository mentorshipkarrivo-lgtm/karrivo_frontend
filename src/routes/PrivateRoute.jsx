import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  // Get token from localStorage (not Cookies)
  const token = localStorage.getItem("token");

  console.log(token, "token in ProtectedRoute");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;