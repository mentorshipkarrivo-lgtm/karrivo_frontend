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
import StartupMentorDiscovery from './pages/startUpmentors/StartupMentorDiscovery';
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
import MenteePayment from "./pages/menteeDashboard/pages/payment/MenteePayment"
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


                <Route element={<PublicRoute />}>


                    <Route path="/reset-password" element={<ResetPassword />} />
                </Route>

                {/* 🔥 PAYMENT PAGE - STANDALONE (NO NAVBAR/FOOTER) */}
                <Route path="/payment" element={<MenteePayment />} />

                {/* MENTOR DASHBOARD WITH LAYOUT - NESTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/mentor" element={<MentorLayout><Outlet /></MentorLayout>}>
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
                        <Route path="dashboard/reviews" element={<Reviews />} />

                    </Route>
                </Route>

                {/* MENTOR PROFILE - STANDALONE */}``
                <Route element={<ProtectedRoute />}>
                    <Route path="/mentor-profile" element={<MentorProfile />} />
                </Route>

                <Route path="/mentor/:mentorId/ltm-plans" element={<MentorLTMPlans />} />

                <Route path="/explore-mentors" element={< ExploreMentors />} />









                {/* <Route element={<ProtectedRoute />}>
                    <Route path="/mentor-dashboard/earnings" element={<Myearnings />} />
                </Route> */}


                {/* 
                <Route element={<ProtectedRoute />}>
                    <Route path="/mentor-dashboard/reviews" element={<Reviews />} />
                </Route> */}

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
                        <Route path="messages" element={<Mymessages />} />
                        <Route path="support" element={<HelpSupport />} />
                        <Route path="sessions" element={<BookingsSection />} />
                        {/* Mentorship Routes */}
                        <Route path="/mentee/ltm-home" element={< MentorshipHome />} />
                        <Route path="/mentee/book-session" element={< Ltmhomesessions />} />
                        <Route path="/mentee/upcoming" element={<Ltmupcommingsessions />} />
                        <Route path="/mentee/sessions" element={<Ltmsessionhistory />} />
                        <Route path="/mentee/subscription" element={<Subscriptionplan />} />
                        <Route path="/mentee/mentor" element={<Mymentor />} />
                        <Route path="/mentee/messages" element={<Mymessages />} />
                    </Route>
                </Route>

                {/* MENTOR DASHBOARD ROUTES (ALTERNATIVE PATHS) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/mentor-dashboard" element={<MentorLayout><Outlet /></MentorLayout>}>
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