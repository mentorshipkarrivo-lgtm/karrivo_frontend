// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const ProtectedRoute = () => {
//   const location = useLocation();

//   // Get token from localStorage (not Cookies)
//   const token = localStorage.getItem("token");

//   console.log(token, "token in ProtectedRoute");

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const getAuthToken = () => {
    try {
      return localStorage.getItem("token") || localStorage.getItem("authToken");
    } catch (error) {
      console.error("Error accessing storage:", error);
      return null;
    }
  };

  const isAuthenticated = () => {
    const token = getAuthToken();
    return token && token.length > 0;
  };

  console.log("🔐 ProtectedRoute Check:", {
    path: location.pathname,
    isAuth: isAuthenticated(),
    token: getAuthToken() ? "exists" : "missing"
  });

  if (!isAuthenticated()) {
    console.log("❌ Not authenticated, redirecting to login");
    // Save the attempted URL to redirect back after login
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  console.log("✅ Authenticated, allowing access");
  // If children are passed, render them; otherwise render Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;