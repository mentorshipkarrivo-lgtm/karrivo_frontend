// import React from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
//   useNavigate,
// } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import ProtectedRoute from "./routes/PrivateRoute";
// import LoginPage from "./Authentication/Login";

// import Home from "./pages/home/Home";
// import FindTopMentors from "./pages/topMentors/mentors";

// import Navbar from "./global/Navbar";
// import FooterLinks from "./pages/home/HomeFoot";
// import ProductMentorDiscovery from "./pages/productMentors/ProductMentorDiscovery"
// import MarketingMentorDiscovery from "./pages/marketingmentors/MarketingMentorDiscovery";
// import LeadershipMentorDiscovery from "./pages/leadershipmentors/LeadershipMentorDiscovery";
// import EngineeringMentors from "./pages/EngineeringMentors/engineeringMentors";
// import MenteeApplicationForm from "./pages/menteeApplication/MenteeApplicationForm";
// import MentorDashboard from "./components/MentorDashboard/MentorDashboard ";
// import StartupMentorDiscovery from './pages/startUpmentors/StartupMentorDiscovery';
// import AIMentorDiscovery from "./pages/aimentors/AIMentorDiscovery";
// import AllMentorsDiscovery from "./pages/allmentors/AllMentorsDiscovery";
// import MentorProfile from "./components/MentorDashboard/mentorProfile/mentorProfile";
// import SessionsPage from "./components/MentorDashboard/sessions/session";
// import ProfileModal from "./pages/home/mentorsection/profileSection";
// import BookingModal from "./pages/home/mentorsection/BookMODAL.JSX";
// import BookSessionPage from "./pages/home/mentorsection/booksessionPage";
// import SearchResults from "./pages/home/SearchResults";

// // 🔥 UPDATED: Import Mentee Dashboard and all page components
// import MenteeDashboard from "./pages/menteeDashboard/menteeDashboard";
// import DashboardSection from "./pages/menteeDashboard/pages/dashboard/dashboard";
// import MentorshipProfile from "./pages/menteeDashboard/pages/profile/profilsection";

// import HelpSupport from "./pages/menteeDashboard/pages/help&support/help&supportsection";
// import BookingsSection from "./pages/menteeDashboard/pages/bookings";
// import TasksSection from "./pages/menteeDashboard/pages/TasksSection/TasksSection ";
// import GoalsSection from "./pages/menteeDashboard/pages/GoalsSection/GoalsSection ";
// import MessagesSection from "./pages/menteeDashboard/pages/MessagesSection/MessagesSection ";
// import LTMHomeSection from "./pages/menteeDashboard/pages/LTMHomeSection/LTMHomeSection";
// import MenteePayment from "./pages/menteeDashboard/pages/payment/payment"


// // Auth helpers
// const getAuthToken = () => {
//   try {
//     return localStorage.getItem("token") || localStorage.getItem("authToken");
//   } catch (error) {
//     console.error("Error accessing storage:", error);
//     return null;
//   }
// };

// const isValidToken = (token) => {
//   if (!token) return false;
//   try {
//     return token.length > 0;
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return false;
//   }
// };

// const isAuthenticated = () => {
//   const token = getAuthToken();
//   const userRole = localStorage.getItem("userRole");
//   console.log(token, "token for getAuth token");
//   console.log(userRole, "user role");
//   return isValidToken(token);
// };

// // PUBLIC ROUTE - Handles mentor booking flow
// const PublicRoute = () => {
//   const userIsAuthenticated = isAuthenticated();
//   const userRole = localStorage.getItem("userRole");

//   // Get mentorId from URL if present
//   const urlParams = new URLSearchParams(window.location.search);
//   const mentorId = urlParams.get("mentorId");

//   if (userIsAuthenticated) {
//     const currentPath = window.location.pathname;

//     // CRITICAL: If user is logged in and trying to access login with mentorId
//     // Redirect them to booking page instead
//     if (currentPath === "/login" && mentorId) {
//       return <Navigate to={`/book-session?mentorId=${mentorId}`} replace />;
//     }

//     // Don't redirect if already on a dashboard or protected route
//     if (currentPath.includes('/dashboard') ||
//       currentPath.includes('/book-session') ||
//       currentPath.includes('/mentor-profile') ||
//       currentPath.includes('/mentee') || // 🔥 ADDED: Allow all mentee routes
//       currentPath.includes('/search')) {
//       return <Outlet />;
//     }

//     // Normal redirect for authenticated users on login page
//     if (currentPath === "/login") {
//       if (userRole === "2") {
//         return <Navigate to="/mentor/dashboard" replace />;
//       } else if (userRole === "1") {
//         return <Navigate to="/mentee/dashboard" replace />;
//       }
//       return <Navigate to="/mentee/dashboard" replace />;
//     }
//   }

//   return <Outlet />;
// };

// // GLOBAL LAYOUT (Navbar + Footer)
// const MainLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen">
//         <Outlet />
//       </div>
//       <FooterLinks />
//     </>
//   );
// };

// // 🔥 Logout utility function
// export const logout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("token");
//   window.location.href = "/login";
// };

// // Main App
// const App = () => {
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <Routes>
//         {/* LOGIN PAGE - NO NAVBAR + NO FOOTER */}
//         <Route element={<PublicRoute />}>
//           <Route path="/login" element={<LoginPage />} />
//         </Route>

//         {/* MENTOR DASHBOARD - NO NAVBAR + NO FOOTER (STANDALONE) */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/mentor/dashboard" element={<MentorDashboard />} />
//         </Route>

//         {/* MENTOR PROFILE */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/mentor-profile" element={<MentorProfile />} />
//         </Route>

//         {/* MENTOR SESSIONS */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/Mentor-sessions" element={<SessionsPage />} />
//         </Route>

//         {/* 🔥 PUBLIC MENTOR PROFILE - Can be viewed without login */}
//         <Route path="/mentor-profile/:mentorId" element={<ProfileModal />} />

//         {/* 🔥 BOOKING PAGES */}
//         <Route path="/book-session" element={<BookSessionPage />} />
//         <Route element={<ProtectedRoute />}>
//           <Route path="/booking" element={<BookingModal />} />
//         </Route>

//         {/* 🔥 MENTEE DASHBOARD - NESTED ROUTES WITH LAYOUT */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="/mentee" element={<MenteeDashboard />}>
//             <Route index element={<Navigate to="/mentee/dashboard" replace />} />
//             <Route path="dashboard" element={<DashboardSection />} />
//             <Route path="profile" element={<MentorshipProfile />} />
//             <Route path="bookings" element={<BookingsSection />} />
//             <Route path="messages" element={<MessagesSection />} />
//             <Route path="support" element={<HelpSupport />} />
//             <Route path="ltm-home" element={<LTMHomeSection />} />
//             <Route path="sessions" element={<BookingsSection />} />
//             <Route path="tasks" element={<TasksSection />} />
//             <Route path="goals" element={<GoalsSection />} />
//             <Route path="subscription" element={<div className="p-6 text-center text-gray-600">Subscription Plan - Coming Soon</div>} />
//             <Route path="achievements" element={<div className="p-6 text-center text-gray-600">Achievements - Coming Soon</div>} />
//             <Route path="linkedin" element={<div className="p-6 text-center text-gray-600">Profile Builder - Coming Soon</div>} />
//             <Route path="referrals" element={<div className="p-6 text-center text-gray-600">Refer & Earn - Coming Soon</div>} />
//             <Route path="gift" element={<div className="p-6 text-center text-gray-600">Gift a Session - Coming Soon</div>} />
//           </Route>
//         </Route>

//         {/* ALL OTHER PAGES WITH NAVBAR + FOOTER */}
//         <Route element={<MainLayout />}>
//           {/* PUBLIC PAGES */}
//           <Route path="/" element={<Home />} />
//           <Route path="/search" element={<SearchResults />} />
//           <Route path="/top" element={<FindTopMentors />} />
//           <Route path="/engineering" element={<EngineeringMentors />} />
//           <Route path="/startup" element={<StartupMentorDiscovery />} />
//           <Route path="/product" element={<ProductMentorDiscovery />} />
//           <Route path="/marketing" element={<MarketingMentorDiscovery />} />
//           <Route path="/leadership" element={<LeadershipMentorDiscovery />} />
//           <Route path="/ai-mentors" element={<AIMentorDiscovery />} />
//           <Route path="/mentee/apply" element={<MenteeApplicationForm />} />
//           <Route path="/Allmentors" element={<AllMentorsDiscovery />} />
//           <Route path="/payment" element={<MenteePayment />} />



//         </Route>

//         {/* DEFAULT REDIRECT */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </>
//   );
// };

// export default App;




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
import EngineeringMentors from "./pages/EngineeringMentors/engineeringMentors";
import MenteeApplicationForm from "./pages/menteeApplication/MenteeApplicationForm";
import MentorDashboard from "./components/MentorDashboard/MentorDashboard ";
import StartupMentorDiscovery from './pages/startUpmentors/StartupMentorDiscovery';
import AIMentorDiscovery from "./pages/aimentors/AIMentorDiscovery";
import AllMentorsDiscovery from "./pages/allmentors/AllMentorsDiscovery";
import MentorProfile from "./components/MentorDashboard/mentorProfile/mentorProfile";
import SessionsPage from "./components/MentorDashboard/sessions/session";
import ProfileModal from "./pages/home/mentorsection/profileSection";
import BookingModal from "./pages/home/mentorsection/BookMODAL.JSX";
import BookSessionPage from "./pages/home/mentorsection/booksessionPage";
import SearchResults from "./pages/home/SearchResults";

// Mentee Dashboard
import MenteeDashboard from "./pages/menteeDashboard/menteeDashboard";
import DashboardSection from "./pages/menteeDashboard/pages/dashboard/dashboard";
import MentorshipProfile from "./pages/menteeDashboard/pages/profile/profilsection";
import HelpSupport from "./pages/menteeDashboard/pages/help&support/help&supportsection";
import BookingsSection from "./pages/menteeDashboard/pages/bookings";
import TasksSection from "./pages/menteeDashboard/pages/TasksSection/TasksSection ";
import GoalsSection from "./pages/menteeDashboard/pages/GoalsSection/GoalsSection ";
// import MenteeBookingssessions from "./pages/menteeDashboard/pages/bookingsessions/bookingsessions";
import LTMHomeSection from "./pages/menteeDashboard/pages/LTMHomeSection/LTMHomeSection";
import MenteePayment from "./pages/menteeDashboard/pages/payment/payment"
import UpcomingMeetings from "./pages/menteeDashboard/pages/upcomingMeteings/upcommongMeetings";

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

        {/* MENTOR DASHBOARD - NO NAVBAR + NO FOOTER */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        </Route>

        {/* MENTOR PROFILE */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor-profile" element={<MentorProfile />} />
        </Route>

        {/* MENTOR SESSIONS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/Mentor-sessions" element={<SessionsPage />} />
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
            {/* <Route path="bookingsessions" element={<MenteeBookingssessions />} /> */}

            <Route path="yourmeetings" element={<UpcomingMeetings />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="ltm-home" element={<LTMHomeSection />} />
            <Route path="sessions" element={<BookingsSection />} />
            <Route path="tasks" element={<TasksSection />} />
            <Route path="goals" element={<GoalsSection />} />
            <Route path="subscription" element={<div className="p-6 text-center text-gray-600">Subscription Plan - Coming Soon</div>} />
            <Route path="achievements" element={<div className="p-6 text-center text-gray-600">Achievements - Coming Soon</div>} />
            <Route path="linkedin" element={<div className="p-6 text-center text-gray-600">Profile Builder - Coming Soon</div>} />
            <Route path="referrals" element={<div className="p-6 text-center text-gray-600">Refer & Earn - Coming Soon</div>} />
            <Route path="gift" element={<div className="p-6 text-center text-gray-600">Gift a Session - Coming Soon</div>} />
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


