import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Turn as Hamburger } from "hamburger-react";
import {
  Sparkles,
  LogIn,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import KarrivoLogo from "../assets/KarrivoLogo.png";

/* ── Helpers ───────────────────────────────────────── */

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

  /* ── User Data ───────────────────────────────────── */

  const getUserData = () => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const getProfileData = () => {
    try {
      const raw = localStorage.getItem("profileData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const userData = getUserData();
  const profileData = getProfileData();

  const isLoggedIn = !!userData?.token;

  const profilePhotoUrl = profileData?.profilePhotoUrl;

  /* ── Close dropdown outside click ─────────────────── */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ── Navigation ───────────────────────────────────── */

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

  /* ── Avatar helpers ───────────────────────────────── */

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

  return (
    <nav className="absolute top-0 left-0 z-[1000] w-full flex justify-center py-2 px-2">
      <div className="w-full lg:w-[85%] bg-white border border-gray-200 rounded-xl shadow-md">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between h-14 px-4">

          {/* Logo */}
          <img
            src={KarrivoLogo}
            alt="Logo"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-4">

            <NavLink to="/login">
              <button className="px-4 py-2 bg-[#0098cc] text-white rounded-lg font-semibold">
                Book a Demo
              </button>
            </NavLink>

            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>

                {/* Avatar */}
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden border shadow-sm hover:scale-110 transition"
                >
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold">
                      {getInitials()}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden">

                    {/* User Info */}
                    <div className="p-4 border-b bg-gray-50 flex gap-3 items-center">

                      <div className="w-12 h-12 rounded-full overflow-hidden border">
                        {profilePhotoUrl ? (
                          <img
                            src={profilePhotoUrl}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold">
                            {getInitials()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {userData?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userData?.email}
                        </p>
                      </div>

                    </div>

                    {/* Menu */}
                    <div>

                      <button
                        onClick={handleDashboardNavigate}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-gray-700"
              >
                Log in <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={22} />
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;