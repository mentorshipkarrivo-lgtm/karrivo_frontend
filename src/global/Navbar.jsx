// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { Turn as Hamburger } from "hamburger-react";
// import { Sparkles, LogIn } from "lucide-react";

// import KarrivoLogo from "../assets/KarivoLogo.jpg";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   // Detect login based on how your login works
//   const isLoggedIn = !!localStorage.getItem("token");
//   // 👆 If your login stores something else, replace "token" with that key

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   const closeNavbar = () => setIsOpen(false);

//   return (
//     <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 sm:py-3 px-2 sm:px-3">
//       <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] bg-white border border-gray-200/30 rounded-xl shadow-md">
//         <div className="px-3 sm:px-4 md:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-12 sm:h-14">

//             {/* Logo */}
//             <NavLink
//               className="flex items-center transition-transform duration-300 hover:scale-105"
//               to="/"
//               onClick={closeNavbar}
//             >
//               <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center">
//                 <img
//                   src={KarrivoLogo}
//                   className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
//                   alt="Logo"
//                 />
//               </div>
//             </NavLink>

//             {/* Desktop Buttons */}
//             <div className="hidden lg:flex items-center gap-2">

//               {/* Book Demo always visible */}
//               <NavLink to="/login" onClick={closeNavbar}>
//                 <button className="flex items-center gap-1.5 px-3 lg:px-4 py-1.5 bg-[#0098cc] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs lg:text-sm whitespace-nowrap">
//                   Book a Demo
//                 </button>
//               </NavLink>

//               {isLoggedIn ? (
//                 <button
//                   onClick={() => navigate("/mentee/dashboard")}
//                   className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs lg:text-sm whitespace-nowrap"
//                 >
//                   Dashboard
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs lg:text-sm whitespace-nowrap"
//                 >
//                   Log in <LogIn className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
//                 </button>
//               )}
//             </div>

//             {/* Mobile Hamburger */}
//             <button
//               className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle navigation"
//             >
//               <Hamburger
//                 toggled={isOpen}
//                 toggle={setIsOpen}
//                 color="#4a5568"
//                 duration={0.5}
//                 size={20}
//               />
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           <div
//             className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
//               }`}
//           >
//             <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg overflow-hidden">
//               <ul className="flex flex-col p-3 space-y-2">

//                 <li>
//                   <NavLink
//                     to="/"
//                     onClick={closeNavbar}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 py-2 rounded-lg text-sm"
//                         : "flex items-center justify-center text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 text-sm"
//                     }
//                   >
//                     Home
//                   </NavLink>
//                 </li>

//                 <li className="pt-2 border-t border-gray-200">
//                   <div className="flex flex-col space-y-2">

//                     <NavLink to="/login" onClick={closeNavbar}>
//                       <button className="w-full flex items-center justify-center gap-2 bg-[#0098cc] text-white rounded-lg px-4 py-2 font-semibold text-sm">
//                         <Sparkles className="w-4 h-4" />
//                         Book a Demo
//                       </button>
//                     </NavLink>

//                     {isLoggedIn ? (
//                       <button
//                         onClick={() => {
//                           navigate("/mentee/dashboard");
//                           closeNavbar();
//                         }}
//                         className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
//                       >
//                         Dashboard
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => {
//                           navigate("/login");
//                           closeNavbar();
//                         }}
//                         className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
//                       >
//                         Log in <LogIn className="w-4 h-4" />
//                       </button>
//                     )}

//                   </div>
//                 </li>

//               </ul>
//             </div>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import { Sparkles, LogIn } from "lucide-react";

import KarrivoLogo from "../assets/KarivoLogo.jpg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleDashboardNavigate = () => {
    if (userData?.role === 2) {
      navigate("/mentor/dashboard");
    } else if (userData?.role === 1) {
      navigate("/mentee/dashboard");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const closeNavbar = () => setIsOpen(false);

  return (
    <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 sm:py-3 px-2 sm:px-3">
      <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] bg-white border border-gray-200/30 rounded-xl shadow-md">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">

            {/* Logo */}
            <NavLink
              className="flex items-center transition-transform duration-300 hover:scale-105"
              to="/"
              onClick={closeNavbar}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center">
                <img
                  src={KarrivoLogo}
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
                  alt="Logo"
                />
              </div>
            </NavLink>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2">

              <NavLink to="/login" onClick={closeNavbar}>
                <button className="flex items-center gap-1.5 px-3 lg:px-4 py-1.5 bg-[#0098cc] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs lg:text-sm whitespace-nowrap">
                  Book a Demo
                </button>
              </NavLink>

              {isLoggedIn ? (
                <button
                  onClick={handleDashboardNavigate}
                  className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs lg:text-sm whitespace-nowrap"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs lg:text-sm whitespace-nowrap"
                >
                  Log in <LogIn className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                color="#4a5568"
                duration={0.5}
                size={20}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
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
                      <button
                        onClick={() => {
                          handleDashboardNavigate();
                          closeNavbar();
                        }}
                        className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium py-2 text-sm"
                      >
                        Dashboard
                      </button>
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
      </div>
    </nav>
  );
};

export default Navbar;