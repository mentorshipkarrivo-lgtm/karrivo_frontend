


// import React, { useEffect, useState, useRef } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LayoutDashboard,
//   LogOut,
//   User,
//   Menu,
//   X,
// } from "lucide-react";

// import KarrivoLogo from "../assets/KarrivoLogo.png";

// /* ───────────────── Helpers ───────────────── */

// const clearAllData = () => {
//   localStorage.clear();

//   document.cookie.split(";").forEach((cookie) => {
//     const name = cookie.split("=")[0].trim();
//     document.cookie = `${name}=; path=/; max-age=0`;
//   });

//   sessionStorage.clear();
// };

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const dropdownRef = useRef(null);

//   /* ───────────────── User Data ───────────────── */

//   const getUserData = () => {
//     try {
//       const raw = localStorage.getItem("userData");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   };

//   const getProfileData = () => {
//     try {
//       const raw = localStorage.getItem("profileData");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   };

//   const userData = getUserData();
//   const profileData = getProfileData();

//   const isLoggedIn = !!userData?.token;
//   const profilePhotoUrl = profileData?.profilePhotoUrl;

//   /* ───────────────── Close Dropdown ───────────────── */

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setIsProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   /* ───────────────── Route Change ───────────────── */

//   useEffect(() => {
//     setIsOpen(false);
//     setIsProfileDropdownOpen(false);
//     window.scrollTo(0, 0);
//   }, [location]);

//   /* ───────────────── Navigation ───────────────── */

//   const handleDashboardNavigate = () => {
//     if (userData?.role === 2) {
//       navigate("/mentor/dashboard");
//     } else if (userData?.role === 1) {
//       navigate("/mentee/bookings");
//     } else {
//       navigate("/login");
//     }

//     setIsOpen(false);
//     setIsProfileDropdownOpen(false);
//   };

//   const handleProfileClick = () => {
//     navigate("/mentee/profile");
//     setIsOpen(false);
//     setIsProfileDropdownOpen(false);
//   };

//   const handleBookDemo = () => {
//     navigate("/login");
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     clearAllData();

//     setIsOpen(false);
//     setIsProfileDropdownOpen(false);

//     setTimeout(() => {
//       window.location.href = "/login";
//     }, 100);
//   };

//   /* ───────────────── Avatar Initials ───────────────── */

//   const getInitials = () => {
//     if (userData?.name) {
//       return userData.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase();
//     }

//     return "U";
//   };

//   return (
//     <nav className="fixed top-0 left-0 z-[9999] w-full px-0 md:px-2 lg:px-3 py-0 md:py-2">
//       {/* 
//         Mobile = full width (no empty side space)
//         Tablet + Desktop = centered with radius + spacing
//       */}
//       <div className="w-full md:w-[94%] lg:w-[85%] mx-auto bg-white/95 backdrop-blur-sm border border-gray-200 rounded-none md:rounded-2xl shadow-md">

//         {/* ───────────── Top Bar ───────────── */}
//         <div className="flex items-center justify-between h-14 px-4 md:px-6">

//           {/* Logo */}
//           <div
//             onClick={() => navigate("/")}
//             className="cursor-pointer flex-shrink-0"
//           >
//             <img
//               src={KarrivoLogo}
//               alt="Karrivo Logo"
//               className="h-9 md:h-10 w-auto"
//             />
//           </div>

//           {/* ───────────── Desktop + Tablet ───────────── */}
//           <div className="hidden md:flex items-center gap-5">

//             {/* Book Demo */}
//             <button
//               onClick={handleBookDemo}
//               className="px-5 py-2 bg-[#0098cc] hover:bg-[#0077a3] text-white rounded-lg font-semibold text-sm transition-all duration-300"
//             >
//               Book a FREE Trial
//             </button>

//             {/* Logged In */}
//             {isLoggedIn ? (
//               <div className="relative" ref={dropdownRef}>

//                 {/* Avatar */}
//                 <button
//                   onClick={() =>
//                     setIsProfileDropdownOpen((prev) => !prev)
//                   }
//                   className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm hover:scale-105 transition-all duration-300"
//                 >
//                   {profilePhotoUrl ? (
//                     <img
//                       src={profilePhotoUrl}
//                       alt="profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold text-sm">
//                       {getInitials()}
//                     </div>
//                   )}
//                 </button>

//                 {/* Dropdown */}
//                 {isProfileDropdownOpen && (
//                   <div className="absolute right-0 top-[55px] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[99999]">

//                     {/* User Info */}
//                     <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
//                       <div className="w-12 h-12 rounded-full overflow-hidden border">
//                         {profilePhotoUrl ? (
//                           <img
//                             src={profilePhotoUrl}
//                             alt="profile"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold">
//                             {getInitials()}
//                           </div>
//                         )}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm font-semibold truncate">
//                           {userData?.name || "User"}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {userData?.email}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-1">

//                       <button
//                         onClick={handleDashboardNavigate}
//                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
//                       >
//                         <LayoutDashboard className="w-4 h-4" />
//                         Dashboard
//                       </button>

//                       <button
//                         onClick={handleProfileClick}
//                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
//                       >
//                         <User className="w-4 h-4" />
//                         Profile
//                       </button>

//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         Logout
//                       </button>

//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={() => navigate("/login")}
//                 className="flex items-center gap-2 text-gray-700 hover:text-[#0098cc] font-medium transition-all duration-300"
//               >
//                 Log in
//                 <LogIn className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* ───────────── Mobile Menu Toggle ───────────── */}
//           <button
//             onClick={() => setIsOpen((prev) => !prev)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
//           >
//             {isOpen ? (
//               <X className="w-6 h-6 text-gray-700" />
//             ) : (
//               <Menu className="w-6 h-6 text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* ───────────── Mobile Menu ───────────── */}
//         {isOpen && (
//           <div className="md:hidden w-full border-t border-gray-200 bg-white px-4 py-4 space-y-3">

//             {/* Book Demo */}
//             <button
//               onClick={handleBookDemo}
//               className="w-full py-3 bg-[#0098cc] hover:bg-[#0077a3] text-white rounded-lg font-semibold text-sm transition-all duration-300"
//             >
//               Book a Demo
//             </button>

//             {isLoggedIn ? (
//               <>
//                 {/* User Info */}
//                 <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-3">
//                   <div className="w-10 h-10 rounded-full overflow-hidden border">
//                     {profilePhotoUrl ? (
//                       <img
//                         src={profilePhotoUrl}
//                         alt="profile"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold text-xs">
//                         {getInitials()}
//                       </div>
//                     )}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <p className="text-sm font-semibold truncate">
//                       {userData?.name || "User"}
//                     </p>
//                     <p className="text-xs text-gray-500 truncate">
//                       {userData?.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Dashboard */}
//                 <button
//                   onClick={handleDashboardNavigate}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
//                 >
//                   <LayoutDashboard className="w-4 h-4" />
//                   Dashboard
//                 </button>

//                 {/* Profile */}
//                 <button
//                   onClick={handleProfileClick}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
//                 >
//                   <User className="w-4 h-4" />
//                   Profile
//                 </button>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => navigate("/login")}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
//               >
//                 Log in
//                 <LogIn className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import KarrivoLogo from "../assets/KarrivoLogo.png";

/* ───────────────── Helpers ───────────────── */

const clearAllData = () => {
  localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; path=/; max-age=0`;
  });
  sessionStorage.clear();
};

/* ───────────────── Inline Styles ───────────────── */

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100%",
    fontFamily: "'Cambria', 'Georgia', serif",
    boxSizing: "border-box",
  },
  /* Desktop/large tablet: centered pill */
  wrapperDesktop: {
    width: "85%",
    margin: "8px auto 0",
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(12px)",
    border: "1.5px solid #e0eef5",
    borderRadius: "18px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  /* Mobile/tablet: full width, no margin, no radius */
  wrapperMobile: {
    width: "100%",
    margin: 0,
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(12px)",
    borderBottom: "1.5px solid #e0eef5",
    borderRadius: 0,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    padding: "0 28px",
  },
  logo: {
    cursor: "pointer",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: "40px",
    width: "auto",
  },
  desktopActions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  bookBtn: {
    padding: "11px 26px",
    background: "#0098cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
  },
  loginBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    background: "transparent",
    border: "2.5px solid #0098cc",
    color: "#0098cc",
    borderRadius: "6px",
    padding: "9px 20px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
    letterSpacing: "0.02em",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  avatarBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px 8px 4px 4px",
    borderRadius: "40px",
    transition: "background 0.2s",
  },
  avatarCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2.5px solid #0098cc",
    flexShrink: 0,
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0098cc",
    color: "#fff",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
  },
  avatarName: {
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#1a2940",
    letterSpacing: "0.01em",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "58px",
    width: "290px",
    background: "#fff",
    borderRadius: "12px",
    border: "2px solid #e8f4f8",
    overflow: "hidden",
    zIndex: 99999,
  },
  dropdownHeader: {
    padding: "16px 18px",
    borderBottom: "2px solid #e8f4f8",
    background: "linear-gradient(135deg, #f0faff 0%, #e8f4f8 100%)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dropdownAvatar: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #0098cc",
    flexShrink: 0,
  },
  dropdownName: {
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
    color: "#1a2940",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dropdownEmail: {
    fontFamily: "'Cambria', 'Georgia', serif",
    fontSize: "12px",
    color: "#6b8a9e",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    padding: "13px 18px",
    background: "transparent",
    border: "none",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a2940",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "background 0.15s",
    textAlign: "left",
  },
  dropdownItemDanger: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    padding: "13px 18px",
    background: "transparent",
    border: "none",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "600",
    fontSize: "14px",
    color: "#d63c3c",
    cursor: "pointer",
    letterSpacing: "0.01em",
    transition: "background 0.15s",
    textAlign: "left",
    borderTop: "1.5px solid #f5e8e8",
  },
  mobileToggle: {
    background: "transparent",
    border: "2px solid #0098cc",
    borderRadius: "8px",
    padding: "7px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0098cc",
  },
  mobileMenu: {
    borderTop: "2px solid #e8f4f8",
    background: "#fafcff",
    padding: "16px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  mobileBookBtn: {
    width: "100%",
    padding: "14px",
    background: "#0098cc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  mobileUserCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border: "2px solid #0098cc22",
    borderRadius: "10px",
    padding: "12px 14px",
  },
  mobileAvatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2.5px solid #0098cc",
    flexShrink: 0,
  },
  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    padding: "13px 16px",
    background: "#fff",
    border: "2px solid #e8f4f8",
    borderRadius: "8px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "700",
    fontSize: "14px",
    color: "#1a2940",
    cursor: "pointer",
    letterSpacing: "0.01em",
    textAlign: "left",
  },
  mobileMenuItemDanger: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    padding: "13px 16px",
    background: "#fff5f5",
    border: "2px solid #ffd5d5",
    borderRadius: "8px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "700",
    fontSize: "14px",
    color: "#d63c3c",
    cursor: "pointer",
    letterSpacing: "0.01em",
    textAlign: "left",
  },
  mobileLoginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "13px",
    background: "#fff",
    border: "2.5px solid #0098cc",
    borderRadius: "8px",
    fontFamily: "'Cambria', 'Georgia', serif",
    fontWeight: "bold",
    fontSize: "15px",
    color: "#0098cc",
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const dropdownRef = useRef(null);

  /* ───────────────── Responsive ───────────────── */

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ───────────────── User Data ───────────────── */

  const getUserData = () => {
    try {
      const raw = localStorage.getItem("userData");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };

  const getProfileData = () => {
    try {
      const raw = localStorage.getItem("profileData");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  };

  const userData = getUserData();
  const profileData = getProfileData();
  const isLoggedIn = !!userData?.token;
  const profilePhotoUrl = profileData?.profilePhotoUrl;

  /* ───────────────── Close Dropdown ───────────────── */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  /* ───────────────── Navigation ───────────────── */

  const handleDashboardNavigate = () => {
    if (userData?.role === 2) navigate("/mentor/dashboard");
    else if (userData?.role === 1) navigate("/mentee/bookings");
    else navigate("/login");
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/mentee/profile");
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleBookDemo = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const handleLogout = () => {
    clearAllData();
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
    setTimeout(() => { window.location.href = "/login"; }, 100);
  };

  const getInitials = () => {
    if (userData?.name) {
      return userData.name
        .replace(/\s+/g, "")
        .slice(0, 2)
        .toUpperCase();
    }
    return "US";
  };

  /* ───────────────── Avatar ───────────────── */

  const AvatarCircle = ({ size = 40, borderWidth = 2.5 }) => (
    <div style={{ ...styles.avatarCircle, width: size, height: size, borderWidth }}>
      {profilePhotoUrl ? (
        <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={styles.avatarFallback}>{getInitials()}</div>
      )}
    </div>
  );

  const wrapper = isMobile ? styles.wrapperMobile : styles.wrapperDesktop;

  return (
    <nav style={styles.nav}>
      <div style={wrapper}>

        {/* ─── Top Bar ─── */}
        <div style={{
          ...styles.topBar,
          padding: isMobile ? "0 16px" : "0 28px",
        }}>

          {/* Logo */}
          <div style={styles.logo} onClick={() => navigate("/")}>
            <img src={KarrivoLogo} alt="Karrivo" style={styles.logoImg} />
          </div>

          {/* Desktop */}
          {!isMobile && (
            <div style={styles.desktopActions}>
              <button
                style={styles.bookBtn}
                onClick={handleBookDemo}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Book a FREE Trial
              </button>

              {isLoggedIn ? (
                <div style={{ position: "relative" }} ref={dropdownRef}>
                  <button
                    style={styles.avatarBtn}
                    onClick={() => setIsProfileDropdownOpen(p => !p)}
                    onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <AvatarCircle />
                    <span style={styles.avatarName}>{userData?.name?.split(" ")[0] || "User"}</span>
                    <ChevronDown
                      size={15}
                      color="#0098cc"
                      style={{ transition: "transform 0.2s", transform: isProfileDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>

                  {isProfileDropdownOpen && (
                    <div style={styles.dropdown}>
                      <div style={styles.dropdownHeader}>
                        <div style={styles.dropdownAvatar}>
                          {profilePhotoUrl
                            ? <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <div style={styles.avatarFallback}>{getInitials()}</div>
                          }
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={styles.dropdownName}>{userData?.name || "User"}</div>
                          <div style={styles.dropdownEmail}>{userData?.email}</div>
                        </div>
                      </div>
                      <div>
                        <button
                          style={styles.dropdownItem}
                          onClick={handleDashboardNavigate}
                          onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <LayoutDashboard size={16} color="#0098cc" />
                          Dashboard
                        </button>
                        <button
                          style={styles.dropdownItem}
                          onClick={handleProfileClick}
                          onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <User size={16} color="#0098cc" />
                          Profile
                        </button>
                        <button
                          style={styles.dropdownItemDanger}
                          onClick={handleLogout}
                          onMouseEnter={e => e.currentTarget.style.background = "#fff0f0"}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                        >
                          <LogOut size={16} color="#d63c3c" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  style={styles.loginBtn}
                  onClick={() => navigate("/login")}
                  onMouseEnter={e => { e.currentTarget.style.background = "#0098cc"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0098cc"; }}
                >
                  Log In
                  <LogIn size={15} />
                </button>
              )}
            </div>
          )}

          {/* Mobile Toggle */}
          {isMobile && (
            <button style={styles.mobileToggle} onClick={() => setIsOpen(p => !p)}>
              {isOpen
                ? <X size={22} color="#0098cc" />
                : <Menu size={22} color="#0098cc" />
              }
            </button>
          )}
        </div>

        {/* ─── Mobile Menu ─── */}
        {isMobile && isOpen && (
          <div style={styles.mobileMenu}>
            <button style={styles.mobileBookBtn} onClick={handleBookDemo}>
              Book a FREE Trial
            </button>

            {isLoggedIn ? (
              <>
                <div style={styles.mobileUserCard}>
                  <div style={styles.mobileAvatar}>
                    {profilePhotoUrl
                      ? <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={styles.avatarFallback}>{getInitials()}</div>
                    }
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontFamily: "'Cambria', 'Georgia', serif", fontWeight: "bold", fontSize: "15px", color: "#1a2940", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {userData?.name || "User"}
                    </div>
                    <div style={{ fontFamily: "'Cambria', 'Georgia', serif", fontSize: "12px", color: "#6b8a9e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {userData?.email}
                    </div>
                  </div>
                </div>

                <button style={styles.mobileMenuItem} onClick={handleDashboardNavigate}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                  <LayoutDashboard size={17} color="#0098cc" />
                  Dashboard
                </button>

                <button style={styles.mobileMenuItem} onClick={handleProfileClick}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
                  onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                >
                  <User size={17} color="#0098cc" />
                  Profile
                </button>

                <button style={styles.mobileMenuItemDanger} onClick={handleLogout}>
                  <LogOut size={17} color="#d63c3c" />
                  Logout
                </button>
              </>
            ) : (
              <button style={styles.mobileLoginBtn} onClick={() => navigate("/login")}>
                <LogIn size={16} />
                Log In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;