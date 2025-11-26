// Navbar.jsx
import { React, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/logo.svg";
import { Turn as Hamburger } from "hamburger-react";
import { Sparkles, Hammer, LogIn } from "lucide-react";

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
    <nav className=" bg-[#062117] sticky top-0 z-[1000] w-full flex justify-center py-4">
      <div
        className="w-[80%] bg-[#f8f5f3]/95 backdrop-blur-md border border-gray-200/30 rounded-full shadow-lg"
        style={{
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo with circular design */}
            <NavLink
              className="flex items-center gap-2 lg:gap-3 transition-transform duration-300 hover:scale-105"
              to="/"
              onClick={closeNavbar}
            >
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-[#ff7b6d] to-[#ff9a7b] rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={Logo}
                  className="h-5 w-5 lg:h-6 lg:w-6 filter brightness-0 invert"
                  alt="Logo Icon"
                />
              </div>
              <span className="text-lg lg:text-xl xl:text-[22px] font-semibold bg-[#0098cc] bg-clip-text text-transparent">
                Karrivo.in
              </span>
            </NavLink>


            {/* Action buttons - Mentorloop style */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <NavLink to="/login" onClick={closeNavbar}>
                <button
                  type="button"
                  className="hidden sm:flex items-center gap-1.5 px-4 xl:px-5 py-2 bg-[#0098cc]  text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-xs xl:text-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Book a Demo
                </button>
              </NavLink>


              <button className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors text-xs xl:text-sm">
                Log in
                <LogIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-all duration-200"
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
                size={24}
              />
            </button>
          </div>

          {/* Mobile navigation */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            id="navbarNav"
          >
            <div className="pb-4 pt-2">
              <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl overflow-hidden mt-2"
                style={{
                  WebkitBackdropFilter: 'blur(16px)'
                }}>
                <ul className="flex flex-col p-4 space-y-2">
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive && location.pathname === "/" && !location.hash
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
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
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
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
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
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
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
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
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
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
                          ? "flex items-center justify-center text-gray-900 bg-gray-100 font-semibold px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                          : "flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      }
                      to="/contact"
                      onClick={closeNavbar}
                    >
                      Contact
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="flex items-center justify-center text-gray-600 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 text-sm"
                      to="/images/Jaimax_white_paper.pdf"
                      target="_blank"
                      onClick={closeNavbar}
                    >
                      White Paper
                    </NavLink>
                  </li>

                  <li className="pt-4 border-t border-gray-200 mt-4">
                    <div className="flex flex-col space-y-3">
                      <NavLink to="/login" onClick={closeNavbar}>
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-[#0098cc] text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg text-sm"
                        >
                          <Sparkles className="w-4 h-4" />
                          Book a Demo
                        </button>
                      </NavLink>



                      <button
                        type="button"
                        onClick={() => navigate("/login")}
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