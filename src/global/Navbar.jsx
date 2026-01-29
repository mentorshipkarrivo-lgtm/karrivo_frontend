// Navbar
import { React, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/logo.svg";
import { Turn as Hamburger } from "hamburger-react";
import { Sparkles, Hammer, LogIn } from "lucide-react";

import KarrivoLogo from "../assets/KarivoLogo.jpg"

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 sm:py-3 md:py-4 px-2 sm:px-3 md:px-4">
      <div
        className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] bg-[#f8f5f3]/95 backdrop-blur-md border border-gray-200/30 rounded-2xl sm:rounded-3xl md:rounded-full shadow-lg"
        style={{
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-13 md:h-14 lg:h-16">
            {/* Logo without text */}
            <NavLink
              className="flex items-center transition-transform duration-300 hover:scale-105"
              to="/"
              onClick={closeNavbar}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-transparent">
                <img
                  src={KarrivoLogo}
                  className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
                  alt="Logo"
                />
              </div>

            </NavLink>


            {/* Action buttons - Mentorloop style */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <NavLink to="/login" onClick={closeNavbar}>
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 bg-[#0098cc] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs lg:text-sm whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                  Book a Demo
                </button>
              </NavLink>



              <NavLink to="/login" onClick={closeNavbar}>

                <button className="flex items-center gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs lg:text-sm whitespace-nowrap">
                  Log in
                  <LogIn className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                </button>

              </NavLink>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-all duration-200"
              type="button"
              onClick={toggleNavbar}
              aria-controls="navbarNav"
              aria-expanded={isOpen}
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

          {/* Mobile navigation */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            id="navbarNav"
          >
            <div className="pb-3 sm:pb-4 pt-2">
              <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mt-2"
                style={{
                  WebkitBackdropFilter: 'blur(16px)'
                }}>
                <ul className="flex flex-col p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive && location.pathname === "/" && !location.hash
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/"
                      onClick={closeNavbar}
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/about"
                      onClick={closeNavbar}
                    >
                      About
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/services"
                      onClick={closeNavbar}
                    >
                      Services
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/features"
                      onClick={closeNavbar}
                    >
                      Features
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/blog"
                      onClick={closeNavbar}
                    >
                      Blog
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/contact"
                      onClick={closeNavbar}
                    >
                      Contact
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="flex items-center justify-center text-gray-600 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      to="/images/Jaimax_white_paper.pdf"
                      target="_blank"
                      onClick={closeNavbar}
                    >
                      White Paper
                    </NavLink>
                  </li>

                  <li className="pt-3 sm:pt-4 border-t border-gray-200 mt-3 sm:mt-4">
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                      <NavLink to="/login" onClick={closeNavbar}>
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-[#0098cc] text-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                        >
                          <Sparkles className="w-4 h-4" />
                          Book a Demo
                        </button>
                      </NavLink>



                      <button
                        type="button"
                        onClick={() => {
                          navigate("/login");
                          closeNavbar();
                        }}
                        className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors text-sm"
                      >
                        Log in
                        <LogIn className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;