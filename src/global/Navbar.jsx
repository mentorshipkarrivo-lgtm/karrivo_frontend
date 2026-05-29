


import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  CreditCard,
  Heart,
  MessageSquare,
  Coins,
} from "lucide-react";

import KarrivoLogo from "../assets/KarrivoLogo.png";

/* ─── Helpers ─── */
const clearAllData = () => {
  localStorage.clear();
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    document.cookie = `${name}=; path=/; max-age=0`;
  });
  sessionStorage.clear();
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const getUserData = () => {
    try { return JSON.parse(localStorage.getItem("userData") || "null"); }
    catch { return null; }
  };
  const getProfileData = () => {
    try { return JSON.parse(localStorage.getItem("profileData") || "null"); }
    catch { return null; }
  };

  const userData = getUserData();
  const profileData = getProfileData();
  const isLoggedIn = !!userData?.token;
  const profilePhotoUrl = profileData?.profilePhotoUrl;
  const coins = profileData?.coins ?? 0;

  const getInitials = () =>
    userData?.name ? userData.name.replace(/\s+/g, "").slice(0, 2).toUpperCase() : "US";

  const handleDashboard = () => {
    navigate(userData?.role === 2 ? "/mentor/dashboard" : "/mentee/bookings");
    setIsOpen(false); setIsDropdownOpen(false);
  };
  const handleProfile = () => { navigate("/mentee/profile"); setIsOpen(false); setIsDropdownOpen(false); };
  const handleLogout = () => {
    clearAllData(); setIsOpen(false); setIsDropdownOpen(false);
    setTimeout(() => { window.location.href = "/login"; }, 100);
  };

  /* ─── Avatar ─── */
  const Avatar = ({ cls = "w-9 h-9" }) => (
    <div className={`${cls} rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-300`}>
      {profilePhotoUrl
        ? <img src={profilePhotoUrl} alt="avatar" className="w-full h-full object-cover" />
        : <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-xs">{getInitials()}</div>
      }
    </div>
  );

  const handleBookDemo = () => {
    navigate("/login");
    setIsOpen(false);
  };

  /* ─── Nav links ─── */
  const NavLinks = () => (
    <>
      <button
        onClick={() => navigate("/explore-mentors")}
        className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
      >
        Explore Mentors
      </button>
      <button
        className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
        onClick={handleBookDemo}
      >
        Book a FREE Trial
      </button>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 z-[9999] w-full bg-white border-b border-gray-200">

      {/* ── Desktop bar (lg and above only) ── */}
      <div className="hidden lg:flex items-center justify-between h-[60px] px-8">

        {/* Left: Logo */}
        <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
          <img src={KarrivoLogo} alt="Karrivo" className="h-8 w-auto" />
        </div>

        {/* Center: nav links */}
        <div className="flex items-center gap-8">
          <NavLinks />
        </div>

        {/* Right: avatar (logged-in) OR login btn + Find mentor */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2" ref={dropdownRef}>
              {/* Avatar circle — clicking opens dropdown */}
              <button
                className="p-0 bg-transparent border-none cursor-pointer"
                onClick={() => setIsDropdownOpen((p) => !p)}
              >
                <Avatar cls="w-9 h-9" />
              </button>

              {/* ≡ when closed → ✕ when open */}
              <button
                className="p-0 bg-transparent border-none cursor-pointer text-gray-600 hover:text-gray-900"
                onClick={() => setIsDropdownOpen((p) => !p)}
              >
                {isDropdownOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Find your mentor button — DESKTOP ONLY */}
              <button
                className="px-5 py-2 bg-gray-900 text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors border-none cursor-pointer"
                onClick={() => navigate("/mentors")}
              >
                Find your mentor
              </button>

              {/* ── Dropdown ── */}
              {isDropdownOpen && (
                <div className="absolute right-8 top-[60px] w-[260px] bg-white border border-gray-200 rounded-xl z-[99999] overflow-hidden">
                  {/* User header */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
                    <Avatar cls="w-11 h-11" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[14px] text-gray-900 truncate">
                        {userData?.name || "User"}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {userData?.email}
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: <LayoutDashboard size={15} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
                    { icon: <User size={15} className="text-gray-500" />, label: "My Profile", action: handleProfile },
                  ].map(({ icon, label, action, badge }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="flex items-center justify-between w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        {icon}
                        {label}
                      </span>
                      {badge !== undefined && (
                        <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold px-1.5">
                          {badge}
                        </span>
                      )}
                    </button>
                  ))}

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <LogOut size={15} className="text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <LogIn size={15} />
                Log In
              </button>
              {/* Find your mentor button — DESKTOP ONLY */}
              <button
                className="px-5 py-2 bg-gray-900 text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors border-none cursor-pointer"
                onClick={() => navigate("/explore-mentors")}
              >
                Find your mentor
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile / Tablet bar (below lg) ── */}
      <div className="lg:hidden flex items-center justify-between h-[56px] px-4">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={KarrivoLogo} alt="Karrivo" className="h-7 w-auto" />
        </div>

        {/* Right side of mobile bar — NO "Find your mentor" button here */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Avatar */}
              <Avatar cls="w-8 h-8" />

              {/* Hamburger / X toggle */}
              <button
                className="p-1.5 bg-transparent border-none cursor-pointer text-gray-700"
                onClick={() => setIsOpen((p) => !p)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          ) : (
            <button
              className="p-2 rounded-md border border-gray-300 bg-white text-gray-700"
              onClick={() => setIsOpen((p) => !p)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile menu drawer ── */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 flex flex-col gap-2">
          {/* Nav links */}
          <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
            <button
              onClick={() => { navigate("/explore-mentors"); setIsOpen(false); }}
              className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer"
            >
              Explore Mentors
            </button>
            <button
              className="text-left text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer py-2"
              onClick={handleBookDemo}
            >
              Book a FREE Trial
            </button>
          </div>

          {isLoggedIn ? (
            <>
              {/* User card */}
              <div className="flex items-center gap-3 py-3 border-b border-gray-100">
                <Avatar cls="w-10 h-10" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] text-gray-900 truncate">{userData?.name || "User"}</div>
                  <div className="text-xs text-gray-400 truncate">{userData?.email}</div>
                </div>
              </div>

              {[
                { icon: <LayoutDashboard size={16} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
                { icon: <User size={16} className="text-gray-500" />, label: "My Profile", action: handleProfile },
              ].map(({ icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer hover:bg-gray-50 transition-colors px-1"
                >
                  {icon}{label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 bg-transparent border-none cursor-pointer hover:bg-gray-50 px-1"
              >
                <LogOut size={16} className="text-gray-500" />Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 bg-white cursor-pointer"
              >
                <LogIn size={15} />Log In
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



