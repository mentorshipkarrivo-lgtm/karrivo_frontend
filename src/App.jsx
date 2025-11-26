import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/PrivateRoute";
import LoginPage from "./Authentication/Login";

import Home  from  "./pages/home/Home"
// Authentication helper functions
const getAuthToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing storage:", error);
    return null;
  }
};

const isValidToken = (token) => {
  if (!token) return false;

  try {
    return token.length > 0;

    // Uncomment below if you're using JWT:
    /*
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
    */
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const isAuthenticated = () => {
  const token = getAuthToken();
  return isValidToken(token);
};

// Public Route Component - redirects authenticated users
const PublicRoute = () => {
  const userIsAuthenticated = isAuthenticated();

  console.log("PublicRoute - Is Authenticated:", userIsAuthenticated);

  if (userIsAuthenticated) {
    console.log("User is authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

// Dashboard placeholder component
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          You are successfully logged in!
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Protected Dashboard Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Public Auth Routes - Protected from logged-in users */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<AuthContainer />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Route>
        

            <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<AuthContainer />} /> */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Route>

        {/* Root route - redirect based on auth status */}
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;