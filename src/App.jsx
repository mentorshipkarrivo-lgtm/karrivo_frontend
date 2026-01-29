


import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
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
import EngineeringMentors from "./pages/EngineeringMentors/mentorsengineering";
import MenteeApplicationForm from "./pages/menteeApplication/MenteeApplicationForm";
import MentorLayout from "./components/MentorDashboard/MentorLayout";
import MentorDashboardSection from "./components/MentorDashboard/dashboard";
import StartupMentorDiscovery from './pages/startUpmentors/StartupMentorDiscovery';
import AIMentorDiscovery from "./pages/aimentors/AIMentorDiscovery";
import AllMentorsDiscovery from "./pages/allmentors/AllMentorsDiscovery";
import MentorProfile from "./components/MentorDashboard/mentorProfile/Profile";
import ProfileModal from "./pages/home/mentorsection/profileSection";
import BookingModal from "./pages/home/mentorsection/BookModal";
import BookSessionPage from "./pages/home/mentorsection/booksessionPage";
import SearchResults from "./pages/home/SearchResults";

// Mentee Dashboard
import MenteeDashboard from "./pages/menteeDashboard/dashboard";
import DashboardSection from "./pages/menteeDashboard/pages/dashboard/dashboardsesction";
import MentorshipProfile from "./pages/menteeDashboard/pages/profile/profilsection";
import HelpSupport from "./pages/menteeDashboard/pages/help&support/help&supportsection";
import BookingsSection from "./pages/menteeDashboard/pages/bookings";
import MenteeBookingssessions from "./pages/menteeDashboard/pages/Bookings/bookingSessions";
import MenteePayment from "./pages/menteeDashboard/pages/payment/paymentsection";
import UpcomingMeetings from "./pages/menteeDashboard/pages/upcomingMeteings/upcomming";
import MentorSessionBookings from "./components/MentorDashboard/sessions/sessionsPage";
import MentorHelpSupport from "./components/MentorDashboard/MentorSupport/SupportMentor";

// Import placeholder components for mentor dashboard routes (create these as needed)
// import MenteesSection from "./components/MentorDashboard/mentees/MenteesSection";
// import MessagesSection from "./components/MentorDashboard/messages/MessagesSection";
// import EarningsSection from "./components/MentorDashboard/earnings/EarningsSection";
// import ReviewsSection from "./components/MentorDashboard/reviews/ReviewsSection";
// import SupportSection from "./components/MentorDashboard/support/SupportSection";

// Auth helpers
const getAuthToken = () => {
  try {
    return localStorage.getItem("token") || localStorage.getItem("authToken");
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
  return isValidToken(token);
};

// PUBLIC ROUTE
const PublicRoute = () => {
  const userIsAuthenticated = isAuthenticated();
  const userRole = localStorage.getItem("userRole");

  const urlParams = new URLSearchParams(window.location.search);
  const mentorId = urlParams.get("mentorId");

  if (userIsAuthenticated) {
    const currentPath = window.location.pathname;

    if (currentPath === "/login" && mentorId) {
      return <Navigate to={`/book-session?mentorId=${mentorId}`} replace />;
    }

    // 🔥 ALLOW PAYMENT ROUTE
    if (currentPath.includes('/dashboard') ||
      currentPath.includes('/book-session') ||
      currentPath.includes('/mentor-profile') ||
      currentPath.includes('/mentee') ||
      currentPath.includes('/mentor') ||
      currentPath.includes('/payment') ||
      currentPath.includes('/search')) {
      return <Outlet />;
    }

    if (currentPath === "/login") {
      if (userRole === "2") {
        return <Navigate to="/mentor/dashboard" replace />;
      } else if (userRole === "1") {
        return <Navigate to="/mentee/dashboard" replace />;
      }
      return <Navigate to="/mentee/dashboard" replace />;
    }
  }

  return <Outlet />;
};

// GLOBAL LAYOUT (Navbar + Footer)
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterLinks />
    </>
  );
};

// Logout utility
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("token");
  window.location.href = "/login";
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

        {/* 🔥 PAYMENT PAGE - STANDALONE (NO NAVBAR/FOOTER) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/payment" element={<MenteePayment />} />
        </Route>

        {/* MENTOR DASHBOARD WITH LAYOUT - NESTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor" element={<MentorLayout><Outlet /></MentorLayout>}>
            <Route index element={<Navigate to="/mentor/dashboard" replace />} />
            <Route path="dashboard" element={<MentorDashboardSection />} />
            <Route path="dashboard/sessions" element={<MentorSessionBookings />} />
            {/* Uncomment these when you create the components */}
            {/* <Route path="dashboard/mentees" element={<MenteesSection />} /> */}
            {/* <Route path="dashboard/messages" element={<MessagesSection />} /> */}
            {/* <Route path="dashboard/earnings" element={<EarningsSection />} /> */}
            {/* <Route path="dashboard/reviews" element={<ReviewsSection />} /> */}
            {/* <Route path="dashboard/support" element={<SupportSection />} /> */}
          </Route>
        </Route>

        {/* MENTOR PROFILE - STANDALONE */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor-profile" element={<MentorProfile />} />
        </Route>

        {/* PUBLIC MENTOR PROFILE */}
        <Route path="/mentor-profile/:mentorId" element={<ProfileModal />} />

        {/* BOOKING PAGES */}
        <Route path="/book-session" element={<BookSessionPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/booking" element={<BookingModal />} />
        </Route>

        {/* MENTEE DASHBOARD - NESTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentee" element={<MenteeDashboard />}>
            <Route index element={<Navigate to="/mentee/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardSection />} />
            <Route path="profile" element={<MentorshipProfile />} />
            <Route path="bookings" element={<BookingsSection />} />
            <Route path="bookingsessions" element={<MenteeBookingssessions />} />
            <Route path="yourmeetings" element={<UpcomingMeetings />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="sessions" element={<BookingsSection />} />
            <Route path="subscription" element={<div className="p-6 text-center text-gray-600">Subscription Plan - Coming Soon</div>} />
            <Route path="achievements" element={<div className="p-6 text-center text-gray-600">Achievements - Coming Soon</div>} />
            <Route path="linkedin" element={<div className="p-6 text-center text-gray-600">Profile Builder - Coming Soon</div>} />
            <Route path="referrals" element={<div className="p-6 text-center text-gray-600">Refer & Earn - Coming Soon</div>} />
            <Route path="gift" element={<div className="p-6 text-center text-gray-600">Gift a Session - Coming Soon</div>} />
          </Route>
        </Route>

        {/* MENTOR DASHBOARD ROUTES (ALTERNATIVE PATHS) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor-dashboard" element={<MentorLayout><Outlet /></MentorLayout>}>
            <Route index element={<MentorDashboardSection />} />
            <Route path="sessions" element={<MentorSessionBookings />} />
            {/* <Route path="mentees" element={<MenteesSection />} />
            <Route path="messages" element={<MessagesSection />} />
            <Route path="earnings" element={<EarningsSection />} />
            <Route path="reviews" element={<ReviewsSection />} /> */ }
            <Route path="support" element={<MentorHelpSupport />} />
          </Route>
        </Route>

        {/* ALL OTHER PAGES WITH NAVBAR + FOOTER */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/top" element={<FindTopMentors />} />
          <Route path="/engineering" element={<EngineeringMentors />} />
          <Route path="/startup" element={<StartupMentorDiscovery />} />
          <Route path="/product" element={<ProductMentorDiscovery />} />
          <Route path="/marketing" element={<MarketingMentorDiscovery />} />
          <Route path="/leadership" element={<LeadershipMentorDiscovery />} />
          <Route path="/ai-mentors" element={<AIMentorDiscovery />} />
          <Route path="/mentee/apply" element={<MenteeApplicationForm />} />
          <Route path="/Allmentors" element={<AllMentorsDiscovery />} />
        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;