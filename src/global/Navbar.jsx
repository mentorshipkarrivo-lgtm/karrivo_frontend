// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { Turn as Hamburger } from "hamburger-react";
// import { Sparkles, LogIn } from "lucide-react";

// import KarrivoLogo from "../assets/KarrivoLogo.png";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const getUserData = () => {
//     try {
//       const raw = localStorage.getItem("userData");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   };

//   const userData = getUserData();
//   const isLoggedIn = !!userData?.token;

//   const handleDashboardNavigate = () => {
//     if (userData?.role === 2) navigate("/mentor/dashboard");
//     else if (userData?.role === 1) navigate("/mentee/bookings");
//     else navigate("/login");
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   const closeNavbar = () => setIsOpen(false);

//   return (
//     <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 sm:py-3 px-2 sm:px-3">
//       <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] bg-white border border-gray-200/30 rounded-xl shadow-md">
//         <div className="flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 md:px-6 lg:px-8">

//           {/* Logo directly at left corner with padding */}
//           <img
//             src={KarrivoLogo}
//             alt="Karrivo Logo"
//             className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer p-1 sm:p-2"
//             onClick={() => navigate("/")}
//           />

//           {/* Desktop Buttons */}
//           <div className="hidden lg:flex items-center gap-3">
//             <NavLink to="/login" onClick={closeNavbar}>
//               <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0098cc] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap">
//                 Book a Demo
//               </button>
//             </NavLink>

//             {isLoggedIn ? (
//               <button
//                 onClick={handleDashboardNavigate}
//                 className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm whitespace-nowrap"
//               >
//                 Dashboard
//               </button>
//             ) : (
//               <button
//                 onClick={() => navigate("/login")}
//                 className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm whitespace-nowrap"
//               >
//                 Log in <LogIn className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle navigation"
//           >
//             <Hamburger toggled={isOpen} toggle={setIsOpen} color="#4a5568" size={22} />
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
//             }`}
//         >
//           <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//             <ul className="flex flex-col p-3 space-y-2">
//               <li>
//                 <NavLink
//                   to="/"
//                   onClick={closeNavbar}
//                   className={({ isActive }) =>
//                     isActive
//                       ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 py-2 rounded-lg text-sm"
//                       : "flex items-center justify-center text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 text-sm"
//                   }
//                 >
//                   Home
//                 </NavLink>
//               </li>

//               <li className="pt-2 border-t border-gray-200">
//                 <div className="flex flex-col space-y-2">
//                   <NavLink to="/login" onClick={closeNavbar}>
//                     <button className="w-full flex items-center justify-center gap-2 bg-[#0098cc] text-white rounded-lg px-4 py-2 font-semibold text-sm">
//                       <Sparkles className="w-4 h-4" />
//                       Book a Demo
//                     </button>
//                   </NavLink>

//                   {isLoggedIn ? (
//                     <button
//                       onClick={() => {
//                         handleDashboardNavigate();
//                         closeNavbar();
//                       }}
//                       className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
//                     >
//                       Dashboard
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         navigate("/login");
//                         closeNavbar();
//                       }}
//                       className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
//                     >
//                       Log in <LogIn className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import {
  Sparkles,
  LogIn,
  LayoutDashboard,
  CreditCard,
  Heart,
  User,
  Mail,
  LogOut,
} from "lucide-react";

import KarrivoLogo from "../assets/KarrivoLogo.png";

/* ── Helpers ──────────────────────────────────────────────────────────────── */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const clearAllData = () => {
  localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; path=/; max-age=0`;
  });
  sessionStorage.clear();
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getUserData = () => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const userData = getUserData();
  const isLoggedIn = !!userData?.token;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardNavigate = () => {
    if (userData?.role === 2) navigate("/mentor/dashboard");
    else if (userData?.role === 1) navigate("/mentee/bookings");
    else navigate("/login");
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    clearAllData();
    setTimeout(() => (window.location.href = "/login"), 100);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/mentee/profile");
    setIsProfileDropdownOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const closeNavbar = () => setIsOpen(false);

  // Get initials from user data
  const getInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  // Get avatar color based on user
  const getAvatarColor = () => {
    const colors = [
      "bg-[#0098cc]",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-green-500",
      "bg-red-500",
    ];
    if (userData?.name) {
      const index = userData.name.charCodeAt(0) % colors.length;
      return colors[index];
    }
    return "bg-blue-500";
  };

  return (
    <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 sm:py-3 px-2 sm:px-3">
      <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] bg-white border border-gray-200/30 rounded-xl shadow-md">
        <div className="flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <img
            src={KarrivoLogo}
            alt="Karrivo Logo"
            className="h-10 sm:h-12 md:h-14 object-contain cursor-pointer p-1 sm:p-2"
            onClick={() => navigate("/")}
          />

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <NavLink to="/login" onClick={closeNavbar}>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#0098cc] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap">
                Book a Demo
              </button>
            </NavLink>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white transition-all duration-200 bg-[#0098cc] hover:shadow-lg cursor-pointer hover:scale-110`}
                  title={userData?.name || "User"}
                >
                  {getInitials()}
                </button>

                {/* Dropdown Menu with Triangle */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-[1001] overflow-hidden">
                    {/* Triangle Arrow */}
                    {/* <div className="absolute -top-3 right-4 w-6 h-6 bg-white border-t border-r border-gray-200 transform rotate-45"></div> */}

                    {/* User Info Section */}
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-white flex-shrink-0 bg-[#0098cc]`}
                        >
                          {getInitials()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 font-semibold text-sm truncate">
                            {userData?.name || "User"}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {userData?.email || "user@example.com"}
                          </p>
                        </div>
                      </div>


                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Dashboard */}
                      <button
                        onClick={handleDashboardNavigate}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium border-b border-gray-100 last:border-b-0"
                      >
                        <LayoutDashboard className="w-4 h-4 text-gray-600" />
                        My Dashboard
                      </button>



                      {/* My Profile */}
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium border-b border-gray-100 last:border-b-0"
                      >
                        <User className="w-4 h-4 text-gray-600" />
                        My Profile
                      </button>


                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm whitespace-nowrap"
              >
                Log in <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <Hamburger toggled={isOpen} toggle={setIsOpen} color="#4a5568" size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <ul className="flex flex-col p-3 space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={closeNavbar}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 py-2 rounded-lg text-sm"
                      : "flex items-center justify-center text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 text-sm"
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="pt-2 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <NavLink to="/login" onClick={closeNavbar}>
                    <button className="w-full flex items-center justify-center gap-2 bg-[#0098cc] text-white rounded-lg px-4 py-2 font-semibold text-sm">
                      <Sparkles className="w-4 h-4" />
                      Book a Demo
                    </button>
                  </NavLink>

                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          handleDashboardNavigate();
                          closeNavbar();
                        }}
                        className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={() => {
                          handleProfileClick();
                          closeNavbar();
                        }}
                        className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          closeNavbar();
                        }}
                        className="w-full flex items-center justify-center gap-2 text-red-600 font-medium py-2 text-sm hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                        closeNavbar();
                      }}
                      className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
                    >
                      Log in <LogIn className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;