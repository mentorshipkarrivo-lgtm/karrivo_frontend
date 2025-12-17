import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/PrivateRoute";
import LoginPage from "./Authentication/Login";

import Home from "./pages/home/Home";
import FindTopMentors from "./pages/topMentors/mentors";

import Navbar from "./global/Navbar";
import FooterLinks from "./pages/home/HomeFoot";
import ProductMentorDiscovery from "./pages/productMentors/ProductMentorDiscovery"
import MarketingMentorDiscovery from "./pages/marketingmentors/MarketingMentorDiscovery";
import LeadershipMentorDiscovery from "./pages/leadershipmentors/LeadershipMentorDiscovery";
import EngineeringMentors from "./pages/EngineeringMentors/engineeringMentors";
import MenteeApplicationForm from "./pages/menteeApplication/MenteeApplicationForm";
import MentorDashboard from "./components/MentorDashboard/MentorDashboard ";
import StartupMentorDiscovery from './pages/startUpmentors/StartupMentorDiscovery';
import AIMentorDiscovery from "./pages/aimentors/AIMentorDiscovery";
import AllMentorsDiscovery from "./pages/allmentors/AllMentorsDiscovery";
import MenteeDashboard    from "./pages/menteeDashboard/menteeDashboard"


// Auth helpers
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
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const isAuthenticated = () => {
  const token = getAuthToken();
  const userRole = localStorage.getItem("userRole");
  console.log(token, "token for getAuth token");
  console.log(userRole, "user role");
  return isValidToken(token);
};
// Public Route Wrapper
const PublicRoute = () => {
  const userIsAuthenticated = isAuthenticated();
  const userRole = localStorage.getItem("userRole");

  if (userIsAuthenticated) {
    // Only redirect if we're actually on a public route that needs protection
    const currentPath = window.location.pathname;

    // Don't redirect if already on a dashboard
    if (currentPath.includes('/dashboard')) {
      return <Outlet />;
    }

    // Redirect based on role
    if (userRole === "2") {
      return <Navigate to="/mentor/dashboard" replace />;
    } else if (userRole === "1") {
      return <Navigate to="/mentee/dashboard" replace />;
    }
    return <Navigate to="/mentor/dashboard" replace />;
  }

  return <Outlet />;
};
// GLOBAL LAYOUT (Navbar + Footer)
const MainLayout = () => {
  return (
    <>
      <Navbar />

      {/* Main page content */}
      <div className="min-h-screen">
        <Outlet />
      </div>

      <FooterLinks />
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Dashboard
        </h1>
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

// Main App
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* LOGIN PAGE - NO NAVBAR + NO FOOTER */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* MENTOR DASHBOARD - NO NAVBAR + NO FOOTER (STANDALONE) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        </Route>


        <Route element={<ProtectedRoute />}>
          <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
        </Route>



        {/* ALL OTHER PAGES WITH NAVBAR + FOOTER */}
        <Route element={<MainLayout />}>

          {/* PUBLIC PAGES */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/top" element={<FindTopMentors />} />
            <Route path="/engineering" element={<EngineeringMentors />} />
            <Route path="/startup" element={<  StartupMentorDiscovery />} />
            <Route path="/product" element={<ProductMentorDiscovery />} />
            <Route path="/marketing" element={<MarketingMentorDiscovery />} />
            <Route path="/leadership" element={<LeadershipMentorDiscovery />} />
            <Route path="/ai-mentors" element={<AIMentorDiscovery />} />
            <Route path="/mentee/apply" element={<MenteeApplicationForm />} />
            <Route path="/Allmentors" element={<AllMentorsDiscovery />} />





          </Route>



        </Route>

        {/* DEFAULT REDIRECT */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
};

export default App;