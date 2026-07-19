import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  PhoneCall,
  ChevronDown
} from "lucide-react";

import KarrivoLogo from "../assets/KarrivoLogo.png";

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
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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

  const getInitials = () =>
    userData?.name
      ? userData.name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase()
      : "US";

  const go = (path) => { navigate(path); setIsOpen(false); setIsDropdownOpen(false); };
  const handleDashboard = () => go(userData?.role === 2 ? "/mentor/dashboard" : "/mentee/bookings");
  const handleProfile = () => go("/mentee/profile");
  const handleLogout = () => {
    clearAllData();
    setIsOpen(false);
    setIsDropdownOpen(false);
    setTimeout(() => { window.location.href = "/login"; }, 100);
  };

  const Avatar = ({ size = "md" }) => {
    const dim = size === "lg" ? "w-10 h-10" : size === "sm" ? "w-7 h-7" : "w-8 h-8";
    const txt = size === "lg" ? "text-sm" : "text-xs";
    return (
      <div className={`${dim} rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-200`}>
        {profilePhotoUrl
          ? <img src={profilePhotoUrl} alt="avatar" className="w-full h-full object-cover" />
          : <div className={`w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold ${txt}`}>{getInitials()}</div>
        }
      </div>
    );
  };

  const PRIMARY_TEXT = "#1a1a2e";

  const navFont = {
    fontFamily: "Cambria, 'Times New Roman', serif",
  };

  const textColor = {
    color: PRIMARY_TEXT,
  };

  const navStyle = {
    ...navFont,
    ...textColor,
  };

  const menuItems = [
    { icon: <LayoutDashboard size={15} />, label: "My Dashboard", action: handleDashboard },
    { icon: <User size={15} />, label: "My Profile", action: handleProfile },
  ];

  const centerLinks = [
    { label: "Explore Mentors", path: "/explore-mentors" },
    { label: "Book a Free Trial", path: "/login", highlight: true },
    { label: "Find your mentor", path: "/get-Mentors" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[9999] lg:mx-10 xl:mx-16 bg-white border border-gray-200 rounded-b-2xl shadow-[0_1px_8px_rgba(0,0,0,0.08)]"
        style={navStyle}
      >

        {/* ═══ DESKTOP (≥ 1024px) ═══ */}
        <div className="hidden lg:flex items-center h-16 px-8 max-w-[1440px] mx-auto">

          {/* LEFT — Logo + nav links grouped together */}
          <div className="flex items-center gap-8 flex-1">
            <button className="bg-transparent border-none cursor-pointer p-0 flex-shrink-0" onClick={() => go("/")}>
              <img src={KarrivoLogo} alt="Karrivo" className="h-8 w-auto" />
            </button>

            <div className="flex items-center gap-1">
              {centerLinks
                .filter(({ highlight }) => !highlight)
                .map(({ label, path }) => (
                  <button
                    key={label}
                    onClick={() => go(path)}
                    style={{ ...navFont, color: PRIMARY_TEXT }}
                    className="px-4 py-2 text-[14px] font-medium bg-transparent border-none cursor-pointer transition-all duration-150 whitespace-nowrap rounded-md hover:bg-gray-50"
                  >
                    {label}
                  </button>
                ))}
            </div>
          </div>

          {/* RIGHT — CTA pill + auth, grouped together, edge gap preserved */}
          <div className="flex items-center gap-3 flex-shrink-0 pr-2 lg:pr-4">
            {centerLinks
              .filter(({ highlight }) => highlight)
              .map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => go(path)}
                  style={navFont}
                  className="px-5 py-2 bg-[#0a1a22] text-white text-[14px] font-semibold rounded-full border-none cursor-pointer hover:bg-[#2d2d4e] active:scale-[0.97] transition-all duration-150 whitespace-nowrap inline-flex items-center gap-2"
                >
                  {label}
                  <PhoneCall size={16} className="rotate-90" />
                </button>
              ))}

            {isLoggedIn ? (
              <div className="relative flex items-center gap-2" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer group"
                  onClick={() => setIsDropdownOpen((p) => !p)}
                  aria-expanded={isDropdownOpen}
                  aria-label="Account menu"
                >
                  <Avatar size="md" />
                  <span style={{ ...navFont, color: PRIMARY_TEXT }} className="text-[13px] font-medium max-w-[80px] truncate">
                    {userData?.name?.split(" ")[0] || "Account"}
                  </span>
                  <ChevronDown
                    size={14}
                    style={{ color: PRIMARY_TEXT }}
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+10px)] w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-[99999] overflow-hidden"
                    style={{ animation: "fadeDown 0.12s ease", ...navFont }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100 bg-gray-50">
                      <Avatar size="lg" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[13px] truncate leading-tight" style={{ color: PRIMARY_TEXT }}>{userData?.name || "User"}</p>
                        <p
                          className="text-[12px] truncate"
                          style={{ color: PRIMARY_TEXT }}
                        >{userData?.email}</p>
                      </div>
                    </div>
                    <div className="py-1">
                      {menuItems.map(({ icon, label, action }) => (
                        <button key={label} onClick={action}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-[13px] font-medium hover:bg-gray-50 transition-colors bg-transparent border-none cursor-pointer"
                          style={{ ...navFont, color: PRIMARY_TEXT }}>
                          <span style={{ color: PRIMARY_TEXT }}>{icon}</span>{label}
                        </button>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors bg-transparent border-none cursor-pointer"
                        style={navFont}>
                        <LogOut size={15} />Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => go("/login")}
                style={{
                  ...navFont,
                  color: PRIMARY_TEXT,
                  borderColor: PRIMARY_TEXT,
                }} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-sm font-medium rounded-lg border hover:bg-gray-50 active:scale-[0.97] transition-all duration-150 cursor-pointer whitespace-nowrap"
              >
                <LogIn size={15} />Log In
              </button>
            )}
          </div>
        </div>

        {/* ═══ MOBILE / TABLET (< 1024px) ═══ */}
        <div className="lg:hidden flex items-center justify-between h-14 px-4">
          <button className="bg-transparent border-none cursor-pointer p-0" onClick={() => go("/")}>
            <img src={KarrivoLogo} alt="Karrivo" className="h-7 w-auto" />
          </button>
          <div className="flex items-center gap-2">
            {isLoggedIn && <Avatar size="sm" />}
            <button
              className="p-2 rounded-lg border bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              style={{
                borderColor: PRIMARY_TEXT,
                color: PRIMARY_TEXT,
              }} onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-14 left-0 right-0 z-[9999] bg-white border-b border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        style={navStyle}
      >
        <div className="px-5 pt-4 pb-6 flex flex-col overflow-y-auto max-h-[80vh]">

          {isLoggedIn && (
            <div className="flex items-center gap-3 pb-4 mb-1 border-b border-gray-100">
              <Avatar size="lg" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px] truncate" style={{ color: PRIMARY_TEXT }}>{userData?.name || "User"}</p>
                <p className="text-[12px] truncate" style={{ color: PRIMARY_TEXT, opacity: 0.5 }}>{userData?.email}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            {centerLinks.map(({ label, path }) => (
              <button key={label} onClick={() => go(path)}
                className="flex items-center text-[15px] font-medium py-3.5 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer text-left transition-all hover:opacity-70"
                style={{ ...navFont, color: PRIMARY_TEXT }}>
                {label}
              </button>
            ))}
            {isLoggedIn && menuItems.map(({ icon, label, action }) => (
              <button key={label} onClick={action}
                className="flex items-center gap-3 text-[15px] font-medium py-3.5 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer text-left transition-all hover:opacity-70"
                style={{ ...navFont, color: PRIMARY_TEXT }}>
                <span style={{ color: PRIMARY_TEXT }}>{icon}</span>{label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 mt-4">
            {isLoggedIn ? (
              <button onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-[15px] font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border-none cursor-pointer transition-colors"
                style={navFont}>
                <LogOut size={16} />Log out
              </button>
            ) : (
              <button
                onClick={() => go("/login")}
                style={{
                  ...navFont,
                  color: PRIMARY_TEXT,
                  borderColor: PRIMARY_TEXT,
                }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-[15px] font-medium bg-white rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <LogIn size={16} />Log In
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;