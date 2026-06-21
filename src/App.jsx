import React, { useState, useCallback, useMemo } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/PrivateRoute";
import LoginPage from "./Authentication/Login";

import Home from "./pages/home/Home";
import FindTopMentors from "./pages/topMentors/MentorsSection";

import Navbar from "./global/Navbar";
import FooterLinks from "./pages/home/HomeFoot";
import ProductMentorDiscovery from "./pages/productMentors/ProductMentorDiscovery";
import MarketingMentorDiscovery from "./pages/marketingmentors/MarketingMentorDiscovery";
import LeadershipMentorDiscovery from "./pages/leadershipmentors/LeadershipMentorDiscovery";
import EngineeringMentors from "./pages/EngineeringMentors/EngineerMentors";
import MenteeApplicationForm from "./pages/menteeApplication/MenteeApplicationForm";
import MentorLayout from "./components/MentorDashboard/MentorLayout";
import MentorDashboardSection from "./components/MentorDashboard/MentorDashboardSection";
import StartupMentorDiscovery from "./pages/startUpmentors/StartupMentorDiscovery";
import AIMentorDiscovery from "./pages/aimentors/AIMentorDiscovery";
import AllMentorsDiscovery from "./pages/allmentors/AllMentorsDiscovery";
import MentorProfile from "./components/MentorDashboard/mentorProfile/MentorProfile";
import ProfileModal from "./pages/home/mentorsection/ProfileModal";
import BookingModal from "./pages/home/mentorsection/BookingModal";
import BookSessionPage from "./pages/home/mentorsection/BookSessionPage";
import SearchResults from "./pages/home/SearchResults";

// Mentee Dashboard
import MenteeDashboard from "./pages/menteeDashboard/MentorDashboard";
import DashboardSection from "./pages/menteeDashboard/pages/dashboard/Dashboardsection";
import MentorshipProfile from "./pages/menteeDashboard/pages/profile/MentorshipProfile";
import HelpSupport from "./pages/menteeDashboard/pages/help&support/HelpSupport";
import BookingsSection from "./pages/menteeDashboard/pages/BookingsSection";
import MenteeBookingssessions from "./pages/menteeDashboard/pages/Bookings/MenteeBookingssessions";
import MenteePayment from "./pages/menteeDashboard/pages/payment/MenteePayment";
import UpcomingMeetings from "./pages/menteeDashboard/pages/upcomingMeteings/UpcomingMeetings";
import MentorSessionBookings from "./components/MentorDashboard/sessions/MentorSessionBookings";
import MentorHelpSupport from "./components/MentorDashboard/MentorSupport/MentorHelpSupport";
import MentorshipHome from "./pages/LongTermMentorship/MentorshipHome/MentorshipHome";
import Ltmhomesessions from "./pages/LongTermMentorship/ltmbooksessions/Ltmhomesessions";
import Ltmupcommingsessions from "./pages/LongTermMentorship/ltmupcommingsessions/Ltmupcommingsessions";
import Ltmsessionhistory from "./pages/LongTermMentorship/ltmsessionhistory/Ltmsessionhistory";
import Subscriptionplan from "./pages/LongTermMentorship/subscriptionplan/Subscriptionplan";
import Mymentor from "./pages/LongTermMentorship/mymentor/Mymentor";
import Mymessages from "./pages/LongTermMentorship/messages/Mymessages";
import Myearnings from "./components/MentorDashboard/MyEarnings/Myearnings";
import Reviews from "./components/MentorDashboard/Reviews/Reviews";
import ResetPassword from "./Authentication/ResetPassword";
import MentorMessages from "./components/MentorDashboard/mentorMessages/MentorMessages";
import MentorAvailability from "./components/MentorDashboard/mentorLtmAvialibility/MentorLtmAvialibility";
import ExploreMentors from "./pages/exploreMentors/ExploreMentors";
import MentorLTMPlans from "./pages/home/mentorsection/MentorLTMPlans";
import MyPricing from "./pages/menteeDashboard/pages/MentorPricing/Mypricing";
import MentorSessions from "./components/MentorDashboard/mySucribers/MySubcribers";
import MentorSessionsTable from "./components/MentorDashboard/mySucribers/MySubcribers";
import MentorSessionDetails from "./components/MentorDashboard/mySucribers/Mentorsessiondetails ";
import LtmsessionsCompleted from "./pages/LongTermMentorship/ltmsessionhistory/Ltmsessionhistory";
import MenteePayments from "./pages/menteeDashboard/pages/menteePayments/MenteePayments";
import MenteePerformanceDashboard from "./pages/menteeDashboard/pages/menteePerformanceTracking/menteePerformanceTracking";

// ─── Mentee Support Chat Widget ───
import MenteeSupport from "./pages/menteeDashboard/pages/MenteechatAssistant/Menteechatassistant";
import MentorReviews from "./components/MentorDashboard/Reviews/Reviews";
import MentorDiscoveryUI from "./pages/exploreMentors/explorementorsSubSection";

// ─── Routes where chat button should be HIDDEN ───
const HIDE_CHAT_PATHS = ["/login", "/reset-password"];

// ─── Auth helpers ───
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

// ─── Floating Chat Button ───
const ChatButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "58px",
      height: "58px",
      borderRadius: "50%",
      background: isOpen
        ? "#fff"
        : "linear-gradient(135deg, #0098cc, #007ba7)",
      border: isOpen ? "2px solid #0098cc" : "none",
      // boxShadow: isOpen
      //   ? "0 4px 20px rgba(0,152,204,0.25)"
      //   : "0 6px 24px rgba(0,152,204,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
    aria-label="Mentee Support"
  >
    {isOpen ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0098cc"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ) : (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <line x1="9" y1="10" x2="9.01" y2="10" />
        <line x1="13" y1="10" x2="13.01" y2="10" />
      </svg>
    )}
  </button>
);

// ─── PUBLIC ROUTE ───
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

    if (
      currentPath.includes("/dashboard") ||
      currentPath.includes("/book-session") ||
      currentPath.includes("/mentor-profile") ||
      currentPath.includes("/mentee") ||
      currentPath.includes("/mentor") ||
      currentPath.includes("/payment") ||
      currentPath.includes("/search")
    ) {
      return <Outlet />;
    }

    if (currentPath === "/login") {
      if (userRole === "2") {
        return <Navigate to="/mentor/dashboard" replace />;
      } else if (userRole === "1") {
        return <Navigate to="/mentee/bookings" replace />;
      }
      return <Navigate to="/mentee/bookings" replace />;
    }
  }

  return <Outlet />;
};

// ─── GLOBAL LAYOUT (Navbar + Footer) ───
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

// ─── Main App ───
const App = () => {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  // Determine if chat button should be visible on current route
  const showChat = useMemo(() => {
    return !HIDE_CHAT_PATHS.some((path) => location.pathname.startsWith(path));
  }, [location.pathname]);

  const toggleChat = useCallback(() => setChatOpen((prev) => !prev), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ─── Floating Chat Button + Widget (visible on all pages except login/reset) ─── */}
      {/* {showChat && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {!chatOpen && (
              <div
                style={{
                  background: "#1a1a2e",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  animation: "fadeInUp 0.4s ease",
                  fontFamily: "'Segoe UI', system-ui, sans-serif",
                }}
              >
                Need help?
              </div>
            )}
            <ChatButton isOpen={chatOpen} onClick={toggleChat} />
          </div>

          {chatOpen && <MenteeSupport onclose={closeChat} />}

        </>
      )} */}  

      {/* ─── Routes ─── */}
      <Routes>
        {/* LOGIN PAGE - NO NAVBAR + NO FOOTER */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* PAYMENT PAGE - STANDALONE (NO NAVBAR/FOOTER) */}
        <Route path="/payment" element={<MenteePayment />} />

        {/* MENTOR DASHBOARD WITH LAYOUT - NESTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/mentor"
            element={
              <MentorLayout>
                <Outlet />
              </MentorLayout>
            }
          >
            <Route index element={<Navigate to="/mentor/dashboard" replace />} />
            <Route path="dashboard" element={<MentorDashboardSection />} />
            <Route path="dashboard/sessions" element={<MentorSessionBookings />} />
            <Route path="dashboard/messages" element={<MentorMessages />} />
            <Route path="dashboard/Pricing" element={<MyPricing />} />
            <Route path="dashboard/mentor/sessions" element={<MentorSessionsTable />} />
            <Route path="dashboard/mentor/sessions/:subscription_id" element={<MentorSessionDetails />} />
            <Route path="dashboard/my-mentee-sessions" element={<MentorSessions />} />
            <Route path="dashboard/Manage_Availability" element={<MentorAvailability />} />
            <Route path="dashboard/earnings" element={<Myearnings />} />
            <Route path="dashboard/reviews" element={<MentorReviews />} />
          </Route>
        </Route>

        {/* MENTOR PROFILE - STANDALONE */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mentor-profile" element={<MentorProfile />} />
        </Route>

        <Route path="/mentor/:mentorId/ltm-plans" element={<MentorLTMPlans />} />
        <Route path="/explore-mentors" element={<ExploreMentors />} />

        <Route path="/get-Mentors" element={<MentorDiscoveryUI />} />




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
            <Route index element={<Navigate to="/mentee/bookings" replace />} />
            <Route path="dashboard" element={<DashboardSection />} />
            <Route path="profile" element={<MentorshipProfile />} />
            <Route path="bookings" element={<BookingsSection />} />
            <Route path="bookingsessions" element={<MenteeBookingssessions />} />
            <Route path="messages" element={<Mymessages />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="sessions" element={<BookingsSection />} />
            <Route path="/mentee/ltm-home" element={<MentorshipHome />} />
            <Route path="/mentee/book-session" element={<Ltmhomesessions />} />
            <Route path="/mentee/upcoming" element={<Ltmupcommingsessions />} />
            <Route path="/mentee/completed_sessions" element={<LtmsessionsCompleted />} />
            <Route path="/mentee/subscription" element={<Subscriptionplan />} />
            <Route path="/mentee/mentor" element={<Mymentor />} />
            <Route path="/mentee/messages" element={<Mymessages />} />
            <Route path="/mentee/mentee-payments" element={<MenteePayments />} />
            <Route path="/mentee/performance-tracking" element={<MenteePerformanceDashboard />} />
          </Route>
        </Route>

        {/* MENTOR DASHBOARD ROUTES (ALTERNATIVE PATHS) */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/mentor-dashboard"
            element={
              <MentorLayout>
                <Outlet />
              </MentorLayout>
            }
          >
            <Route index element={<MentorDashboardSection />} />
            <Route path="sessions" element={<MentorSessionBookings />} />
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