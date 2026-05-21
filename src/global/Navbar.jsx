

// // // // import React, { useEffect, useState, useRef } from "react";
// // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // import {
// // // //   LogIn,
// // // //   LayoutDashboard,
// // // //   LogOut,
// // // //   User,
// // // //   Menu,
// // // //   X,
// // // //   ChevronDown,
// // // // } from "lucide-react";

// // // // import KarrivoLogo from "../assets/KarrivoLogo.png";

// // // // /* ───────────────── Helpers ───────────────── */

// // // // const clearAllData = () => {
// // // //   localStorage.clear();
// // // //   document.cookie.split(";").forEach((cookie) => {
// // // //     const name = cookie.split("=")[0].trim();
// // // //     document.cookie = `${name}=; path=/; max-age=0`;
// // // //   });
// // // //   sessionStorage.clear();
// // // // };

// // // // /* ───────────────── Inline Styles ───────────────── */

// // // // const styles = {
// // // //   nav: {
// // // //     position: "fixed",
// // // //     top: 0,
// // // //     left: 0,
// // // //     zIndex: 9999,
// // // //     width: "100%",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     boxSizing: "border-box",
// // // //   },
// // // //   /* Desktop/large tablet: centered pill */
// // // //   wrapperDesktop: {
// // // //     width: "85%",
// // // //     margin: "8px auto 0",
// // // //     background: "rgba(255,255,255,0.97)",
// // // //     backdropFilter: "blur(12px)",
// // // //     border: "1.5px solid #e0eef5",
// // // //     borderRadius: "18px",
// // // //     boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
// // // //   },
// // // //   /* Mobile/tablet: full width, no margin, no radius */
// // // //   wrapperMobile: {
// // // //     width: "100%",
// // // //     margin: 0,
// // // //     background: "rgba(255,255,255,0.97)",
// // // //     backdropFilter: "blur(12px)",
// // // //     borderBottom: "1.5px solid #e0eef5",
// // // //     borderRadius: 0,
// // // //     boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
// // // //   },
// // // //   topBar: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     justifyContent: "space-between",
// // // //     height: "64px",
// // // //     padding: "0 28px",
// // // //   },
// // // //   logo: {
// // // //     cursor: "pointer",
// // // //     flexShrink: 0,
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //   },
// // // //   logoImg: {
// // // //     height: "40px",
// // // //     width: "auto",
// // // //   },
// // // //   desktopActions: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "20px",
// // // //   },
// // // //   bookBtn: {
// // // //     padding: "11px 26px",
// // // //     background: "#0098cc",
// // // //     color: "#fff",
// // // //     border: "none",
// // // //     borderRadius: "6px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //     letterSpacing: "0.02em",
// // // //     cursor: "pointer",
// // // //     transition: "all 0.2s ease",
// // // //     textTransform: "uppercase",
// // // //   },
// // // //   loginBtn: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "7px",
// // // //     background: "transparent",
// // // //     border: "2.5px solid #0098cc",
// // // //     color: "#0098cc",
// // // //     borderRadius: "6px",
// // // //     padding: "9px 20px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //     letterSpacing: "0.02em",
// // // //     cursor: "pointer",
// // // //     transition: "all 0.2s ease",
// // // //   },
// // // //   avatarBtn: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "8px",
// // // //     background: "transparent",
// // // //     border: "none",
// // // //     cursor: "pointer",
// // // //     padding: "4px 8px 4px 4px",
// // // //     borderRadius: "40px",
// // // //     transition: "background 0.2s",
// // // //   },
// // // //   avatarCircle: {
// // // //     width: "40px",
// // // //     height: "40px",
// // // //     borderRadius: "50%",
// // // //     overflow: "hidden",
// // // //     border: "2.5px solid #0098cc",
// // // //     flexShrink: 0,
// // // //   },
// // // //   avatarFallback: {
// // // //     width: "100%",
// // // //     height: "100%",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //     background: "#0098cc",
// // // //     color: "#fff",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //   },
// // // //   avatarName: {
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "14px",
// // // //     color: "#1a2940",
// // // //     letterSpacing: "0.01em",
// // // //   },
// // // //   dropdown: {
// // // //     position: "absolute",
// // // //     right: 0,
// // // //     top: "58px",
// // // //     width: "290px",
// // // //     background: "#fff",
// // // //     borderRadius: "12px",
// // // //     border: "2px solid #e8f4f8",
// // // //     overflow: "hidden",
// // // //     zIndex: 99999,
// // // //   },
// // // //   dropdownHeader: {
// // // //     padding: "16px 18px",
// // // //     borderBottom: "2px solid #e8f4f8",
// // // //     background: "linear-gradient(135deg, #f0faff 0%, #e8f4f8 100%)",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "12px",
// // // //   },
// // // //   dropdownAvatar: {
// // // //     width: "46px",
// // // //     height: "46px",
// // // //     borderRadius: "50%",
// // // //     overflow: "hidden",
// // // //     border: "2px solid #0098cc",
// // // //     flexShrink: 0,
// // // //   },
// // // //   dropdownName: {
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //     color: "#1a2940",
// // // //     whiteSpace: "nowrap",
// // // //     overflow: "hidden",
// // // //     textOverflow: "ellipsis",
// // // //   },
// // // //   dropdownEmail: {
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontSize: "12px",
// // // //     color: "#6b8a9e",
// // // //     whiteSpace: "nowrap",
// // // //     overflow: "hidden",
// // // //     textOverflow: "ellipsis",
// // // //   },
// // // //   dropdownItem: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "11px",
// // // //     width: "100%",
// // // //     padding: "13px 18px",
// // // //     background: "transparent",
// // // //     border: "none",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "600",
// // // //     fontSize: "14px",
// // // //     color: "#1a2940",
// // // //     cursor: "pointer",
// // // //     letterSpacing: "0.01em",
// // // //     transition: "background 0.15s",
// // // //     textAlign: "left",
// // // //   },
// // // //   dropdownItemDanger: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "11px",
// // // //     width: "100%",
// // // //     padding: "13px 18px",
// // // //     background: "transparent",
// // // //     border: "none",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "600",
// // // //     fontSize: "14px",
// // // //     color: "#d63c3c",
// // // //     cursor: "pointer",
// // // //     letterSpacing: "0.01em",
// // // //     transition: "background 0.15s",
// // // //     textAlign: "left",
// // // //     borderTop: "1.5px solid #f5e8e8",
// // // //   },
// // // //   mobileToggle: {
// // // //     background: "transparent",
// // // //     border: "2px solid #0098cc",
// // // //     borderRadius: "8px",
// // // //     padding: "7px",
// // // //     cursor: "pointer",
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //     color: "#0098cc",
// // // //   },
// // // //   mobileMenu: {
// // // //     borderTop: "2px solid #e8f4f8",
// // // //     background: "#fafcff",
// // // //     padding: "16px 20px 20px",
// // // //     display: "flex",
// // // //     flexDirection: "column",
// // // //     gap: "10px",
// // // //   },
// // // //   mobileBookBtn: {
// // // //     width: "100%",
// // // //     padding: "14px",
// // // //     background: "#0098cc",
// // // //     color: "#fff",
// // // //     border: "none",
// // // //     borderRadius: "8px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //     letterSpacing: "0.04em",
// // // //     textTransform: "uppercase",
// // // //     cursor: "pointer",
// // // //   },
// // // //   mobileUserCard: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "12px",
// // // //     border: "2px solid #0098cc22",
// // // //     borderRadius: "10px",
// // // //     padding: "12px 14px",
// // // //   },
// // // //   mobileAvatar: {
// // // //     width: "42px",
// // // //     height: "42px",
// // // //     borderRadius: "50%",
// // // //     overflow: "hidden",
// // // //     border: "2.5px solid #0098cc",
// // // //     flexShrink: 0,
// // // //   },
// // // //   mobileMenuItem: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "11px",
// // // //     width: "100%",
// // // //     padding: "13px 16px",
// // // //     background: "#fff",
// // // //     border: "2px solid #e8f4f8",
// // // //     borderRadius: "8px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "700",
// // // //     fontSize: "14px",
// // // //     color: "#1a2940",
// // // //     cursor: "pointer",
// // // //     letterSpacing: "0.01em",
// // // //     textAlign: "left",
// // // //   },
// // // //   mobileMenuItemDanger: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     gap: "11px",
// // // //     width: "100%",
// // // //     padding: "13px 16px",
// // // //     background: "#fff5f5",
// // // //     border: "2px solid #ffd5d5",
// // // //     borderRadius: "8px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "700",
// // // //     fontSize: "14px",
// // // //     color: "#d63c3c",
// // // //     cursor: "pointer",
// // // //     letterSpacing: "0.01em",
// // // //     textAlign: "left",
// // // //   },
// // // //   mobileLoginBtn: {
// // // //     display: "flex",
// // // //     alignItems: "center",
// // // //     justifyContent: "center",
// // // //     gap: "8px",
// // // //     width: "100%",
// // // //     padding: "13px",
// // // //     background: "#fff",
// // // //     border: "2.5px solid #0098cc",
// // // //     borderRadius: "8px",
// // // //     fontFamily: "'Cambria', 'Georgia', serif",
// // // //     fontWeight: "bold",
// // // //     fontSize: "15px",
// // // //     color: "#0098cc",
// // // //     cursor: "pointer",
// // // //     letterSpacing: "0.02em",
// // // //   },
// // // // };

// // // // const Navbar = () => {
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();

// // // //   const [isOpen, setIsOpen] = useState(false);
// // // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
// // // //   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

// // // //   const dropdownRef = useRef(null);

// // // //   /* ───────────────── Responsive ───────────────── */

// // // //   useEffect(() => {
// // // //     const handleResize = () => setIsMobile(window.innerWidth < 1024);
// // // //     window.addEventListener("resize", handleResize);
// // // //     return () => window.removeEventListener("resize", handleResize);
// // // //   }, []);

// // // //   /* ───────────────── User Data ───────────────── */

// // // //   const getUserData = () => {
// // // //     try {
// // // //       const raw = localStorage.getItem("userData");
// // // //       return raw ? JSON.parse(raw) : null;
// // // //     } catch { return null; }
// // // //   };

// // // //   const getProfileData = () => {
// // // //     try {
// // // //       const raw = localStorage.getItem("profileData");
// // // //       return raw ? JSON.parse(raw) : null;
// // // //     } catch { return null; }
// // // //   };

// // // //   const userData = getUserData();
// // // //   const profileData = getProfileData();
// // // //   const isLoggedIn = !!userData?.token;
// // // //   const profilePhotoUrl = profileData?.profilePhotoUrl;

// // // //   /* ───────────────── Close Dropdown ───────────────── */

// // // //   useEffect(() => {
// // // //     const handleClickOutside = (e) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// // // //         setIsProfileDropdownOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("click", handleClickOutside);
// // // //     return () => document.removeEventListener("click", handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     setIsOpen(false);
// // // //     setIsProfileDropdownOpen(false);
// // // //     window.scrollTo(0, 0);
// // // //   }, [location]);

// // // //   /* ───────────────── Navigation ───────────────── */

// // // //   const handleDashboardNavigate = () => {
// // // //     if (userData?.role === 2) navigate("/mentor/dashboard");
// // // //     else if (userData?.role === 1) navigate("/mentee/bookings");
// // // //     else navigate("/login");
// // // //     setIsOpen(false);
// // // //     setIsProfileDropdownOpen(false);
// // // //   };

// // // //   const handleProfileClick = () => {
// // // //     navigate("/mentee/profile");
// // // //     setIsOpen(false);
// // // //     setIsProfileDropdownOpen(false);
// // // //   };

// // // const handleBookDemo = () => {
// // //   navigate("/login");
// // //   setIsOpen(false);
// // // };

// // // //   const handleLogout = () => {
// // // //     clearAllData();
// // // //     setIsOpen(false);
// // // //     setIsProfileDropdownOpen(false);
// // // //     setTimeout(() => { window.location.href = "/login"; }, 100);
// // // //   };

// // // //   const getInitials = () => {
// // // //     if (userData?.name) {
// // // //       return userData.name
// // // //         .replace(/\s+/g, "")
// // // //         .slice(0, 2)
// // // //         .toUpperCase();
// // // //     }
// // // //     return "US";
// // // //   };

// // // //   /* ───────────────── Avatar ───────────────── */

// // // //   const AvatarCircle = ({ size = 40, borderWidth = 2.5 }) => (
// // // //     <div style={{ ...styles.avatarCircle, width: size, height: size, borderWidth }}>
// // // //       {profilePhotoUrl ? (
// // // //         <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //       ) : (
// // // //         <div style={styles.avatarFallback}>{getInitials()}</div>
// // // //       )}
// // // //     </div>
// // // //   );

// // // //   const wrapper = isMobile ? styles.wrapperMobile : styles.wrapperDesktop;

// // // //   return (
// // // //     <nav style={styles.nav}>
// // // //       <div style={wrapper}>

// // // //         {/* ─── Top Bar ─── */}
// // // //         <div style={{
// // // //           ...styles.topBar,
// // // //           padding: isMobile ? "0 16px" : "0 28px",
// // // //         }}>

// // // //           {/* Logo */}
// // // //           <div style={styles.logo} onClick={() => navigate("/")}>
// // // //             <img src={KarrivoLogo} alt="Karrivo" style={styles.logoImg} />
// // // //           </div>

// // // //           {/* Desktop */}
// // // //           {!isMobile && (
// // // //             <div style={styles.desktopActions}>
// // // //               <button
// // // //                 style={styles.bookBtn}
// // // //                 onClick={handleBookDemo}
// // // //                 onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
// // // //                 onMouseLeave={e => e.currentTarget.style.opacity = "1"}
// // // //               >
// // // //                 Book a FREE Trial
// // // //               </button>

// // // //               {isLoggedIn ? (
// // // //                 <div style={{ position: "relative" }} ref={dropdownRef}>
// // // //                   <button
// // // //                     style={styles.avatarBtn}
// // // //                     onClick={() => setIsProfileDropdownOpen(p => !p)}
// // // //                     onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
// // // //                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// // // //                   >
// // // //                     <AvatarCircle />
// // // //                     <span style={styles.avatarName}>{userData?.name?.split(" ")[0] || "User"}</span>
// // // //                     <ChevronDown
// // // //                       size={15}
// // // //                       color="#0098cc"
// // // //                       style={{ transition: "transform 0.2s", transform: isProfileDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
// // // //                     />
// // // //                   </button>

// // // //                   {isProfileDropdownOpen && (
// // // //                     <div style={styles.dropdown}>
// // // //                       <div style={styles.dropdownHeader}>
// // // //                         <div style={styles.dropdownAvatar}>
// // // //                           {profilePhotoUrl
// // // //                             ? <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                             : <div style={styles.avatarFallback}>{getInitials()}</div>
// // // //                           }
// // // //                         </div>
// // // //                         <div style={{ minWidth: 0, flex: 1 }}>
// // // //                           <div style={styles.dropdownName}>{userData?.name || "User"}</div>
// // // //                           <div style={styles.dropdownEmail}>{userData?.email}</div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div>
// // // //                         <button
// // // //                           style={styles.dropdownItem}
// // // //                           onClick={handleDashboardNavigate}
// // // //                           onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
// // // //                           onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// // // //                         >
// // // //                           <LayoutDashboard size={16} color="#0098cc" />
// // // //                           Dashboard
// // // //                         </button>
// // // //                         <button
// // // //                           style={styles.dropdownItem}
// // // //                           onClick={handleProfileClick}
// // // //                           onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
// // // //                           onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// // // //                         >
// // // //                           <User size={16} color="#0098cc" />
// // // //                           Profile
// // // //                         </button>
// // // //                         <button
// // // //                           style={styles.dropdownItemDanger}
// // // //                           onClick={handleLogout}
// // // //                           onMouseEnter={e => e.currentTarget.style.background = "#fff0f0"}
// // // //                           onMouseLeave={e => e.currentTarget.style.background = "transparent"}
// // // //                         >
// // // //                           <LogOut size={16} color="#d63c3c" />
// // // //                           Logout
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               ) : (
// // // //                 <button
// // // //                   style={styles.loginBtn}
// // // //                   onClick={() => navigate("/login")}
// // // //                   onMouseEnter={e => { e.currentTarget.style.background = "#0098cc"; e.currentTarget.style.color = "#fff"; }}
// // // //                   onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0098cc"; }}
// // // //                 >
// // // //                   Log In
// // // //                   <LogIn size={15} />
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           )}

// // // //           {/* Mobile Toggle */}
// // // //           {isMobile && (
// // // //             <button style={styles.mobileToggle} onClick={() => setIsOpen(p => !p)}>
// // // //               {isOpen
// // // //                 ? <X size={22} color="#0098cc" />
// // // //                 : <Menu size={22} color="#0098cc" />
// // // //               }
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {/* ─── Mobile Menu ─── */}
// // // //         {isMobile && isOpen && (
// // // //           <div style={styles.mobileMenu}>
// // // <button style={styles.mobileBookBtn} onClick={handleBookDemo}>
// // //   Book a FREE Trial
// // // </button>

// // // //             {isLoggedIn ? (
// // // //               <>
// // // //                 <div style={styles.mobileUserCard}>
// // // //                   <div style={styles.mobileAvatar}>
// // // //                     {profilePhotoUrl
// // // //                       ? <img src={profilePhotoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
// // // //                       : <div style={styles.avatarFallback}>{getInitials()}</div>
// // // //                     }
// // // //                   </div>
// // // //                   <div style={{ minWidth: 0, flex: 1 }}>
// // // //                     <div style={{ fontFamily: "'Cambria', 'Georgia', serif", fontWeight: "bold", fontSize: "15px", color: "#1a2940", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// // // //                       {userData?.name || "User"}
// // // //                     </div>
// // // //                     <div style={{ fontFamily: "'Cambria', 'Georgia', serif", fontSize: "12px", color: "#6b8a9e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// // // //                       {userData?.email}
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <button style={styles.mobileMenuItem} onClick={handleDashboardNavigate}
// // // //                   onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
// // // //                   onMouseLeave={e => e.currentTarget.style.background = "#fff"}
// // // //                 >
// // // //                   <LayoutDashboard size={17} color="#0098cc" />
// // // //                   Dashboard
// // // //                 </button>

// // // //                 <button style={styles.mobileMenuItem} onClick={handleProfileClick}
// // // //                   onMouseEnter={e => e.currentTarget.style.background = "#f0faff"}
// // // //                   onMouseLeave={e => e.currentTarget.style.background = "#fff"}
// // // //                 >
// // // //                   <User size={17} color="#0098cc" />
// // // //                   Profile
// // // //                 </button>

// // // //                 <button style={styles.mobileMenuItemDanger} onClick={handleLogout}>
// // // //                   <LogOut size={17} color="#d63c3c" />
// // // //                   Logout
// // // //                 </button>
// // // //               </>
// // // //             ) : (
// // // //               <button style={styles.mobileLoginBtn} onClick={() => navigate("/login")}>
// // // //                 <LogIn size={16} />
// // // //                 Log In
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;


// // // import React, { useEffect, useState, useRef } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import {
// // //   LogIn,
// // //   LayoutDashboard,
// // //   LogOut,
// // //   User,
// // //   Menu,
// // //   X,
// // //   CreditCard,
// // //   Heart,
// // //   MessageSquare,
// // // } from "lucide-react";

// // // import KarrivoLogo from "../assets/KarrivoLogo.png";

// // // /* ───────────────── Helpers ───────────────── */

// // // const clearAllData = () => {
// // //   localStorage.clear();
// // //   document.cookie.split(";").forEach((cookie) => {
// // //     const name = cookie.split("=")[0].trim();
// // //     document.cookie = `${name}=; path=/; max-age=0`;
// // //   });
// // //   sessionStorage.clear();
// // // };

// // // const Navbar = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
// // //   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

// // //   const dropdownRef = useRef(null);

// // //   useEffect(() => {
// // //     const handleResize = () => setIsMobile(window.innerWidth < 1024);
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);

// // //   const getUserData = () => {
// // //     try {
// // //       const raw = localStorage.getItem("userData");
// // //       return raw ? JSON.parse(raw) : null;
// // //     } catch {
// // //       return null;
// // //     }
// // //   };

// // //   const getProfileData = () => {
// // //     try {
// // //       const raw = localStorage.getItem("profileData");
// // //       return raw ? JSON.parse(raw) : null;
// // //     } catch {
// // //       return null;
// // //     }
// // //   };

// // //   const userData = getUserData();
// // //   const profileData = getProfileData();
// // //   const isLoggedIn = !!userData?.token;
// // //   const profilePhotoUrl = profileData?.profilePhotoUrl;

// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// // //         setIsProfileDropdownOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("click", handleClickOutside);
// // //     return () => document.removeEventListener("click", handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setIsOpen(false);
// // //     setIsProfileDropdownOpen(false);
// // //     window.scrollTo(0, 0);
// // //   }, [location]);

// // //   const handleDashboardNavigate = () => {
// // //     if (userData?.role === 2) navigate("/mentor/dashboard");
// // //     else if (userData?.role === 1) navigate("/mentee/bookings");
// // //     else navigate("/login");
// // //     setIsOpen(false);
// // //     setIsProfileDropdownOpen(false);
// // //   };

// // //   const handleProfileClick = () => {
// // //     navigate("/mentee/profile");
// // //     setIsOpen(false);
// // //     setIsProfileDropdownOpen(false);
// // //   };

// // // const handleBookDemo = () => {
// // //   navigate("/login");
// // //   setIsOpen(false);
// // // };

// // //   const handleLogout = () => {
// // //     clearAllData();
// // //     setIsOpen(false);
// // //     setIsProfileDropdownOpen(false);
// // //     setTimeout(() => {
// // //       window.location.href = "/login";
// // //     }, 100);
// // //   };

// // //   const getInitials = () => {
// // //     if (userData?.name) {
// // //       return userData.name.replace(/\s+/g, "").slice(0, 2).toUpperCase();
// // //     }
// // //     return "US";
// // //   };

// // //   const AvatarCircle = ({ size = "w-10 h-10", border = "border-2" }) => (
// // //     <div
// // //       className={`${size} ${border} border-[#0098cc] rounded-full overflow-hidden flex-shrink-0`}
// // //     >
// // //       {profilePhotoUrl ? (
// // //         <img
// // //           src={profilePhotoUrl}
// // //           alt="profile"
// // //           className="w-full h-full object-cover"
// // //         />
// // //       ) : (
// // //         <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-sm font-serif">
// // //           {getInitials()}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );

// // //   return (
// // //     <nav className="fixed top-0 left-0 z-[9999] w-full font-serif box-border">
// // //       <div
// // //         className={
// // //           isMobile
// // //             ? "w-full bg-white/97 backdrop-blur-md border-b border-[#e0eef5]"
// // //             : "w-[85%] mx-auto mt-2 bg-white/97 backdrop-blur-md border border-[#e0eef5] rounded-[18px]"
// // //         }
// // //       >
// // //         {/* ─── Top Bar ─── */}
// // //         <div
// // //           className={`flex items-center justify-between h-16 ${isMobile ? "px-4" : "px-7"}`}
// // //         >
// // //           {/* Logo */}
// // //           <div
// // //             className="cursor-pointer flex-shrink-0 flex items-center"
// // //             onClick={() => navigate("/")}
// // //           >
// // //             <img src={KarrivoLogo} alt="Karrivo" className="h-10 w-auto" />
// // //           </div>

// // //           {/* Desktop */}
// // //           {!isMobile && (
// // //             <div className="flex items-center gap-4">
// // //               {/* Find Your Mentor — desktop only */}
// // //               <button
// // //                 className="px-5 py-2.5 bg-[#1a2940] text-white border-none rounded-md font-bold text-sm tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
// // //                 onClick={() => navigate("/mentors")}
// // //               >
// // //                 Find your mentor
// // //               </button>

// // //               <button
// // //                 className="px-6 py-2.5 bg-[#0098cc] text-white border-none rounded-md font-bold text-sm tracking-wide cursor-pointer uppercase hover:opacity-90 transition-opacity"
// // //                 onClick={handleBookDemo}
// // //               >
// // //                 Book a FREE Trial
// // //               </button>

// // //               {isLoggedIn ? (
// // //                 <div className="relative" ref={dropdownRef}>
// // //                   {/* Avatar trigger — just the circle */}
// // //                   <button
// // //                     className="bg-transparent border-none cursor-pointer p-0 rounded-full hover:opacity-80 transition-opacity"
// // //                     onClick={() => setIsProfileDropdownOpen((p) => !p)}
// // //                   >
// // //                     <AvatarCircle />
// // //                   </button>

// // //                   {/* ─── Dropdown (reference style) ─── */}
// // //                   {isProfileDropdownOpen && (
// // //                     <div className="absolute right-0 top-14 w-72 bg-white border border-gray-200 rounded-xl overflow-hidden z-[99999]">
// // //                       {/* Top row: avatar (left) + X close (right) */}
// // //                       <div className="flex items-center justify-between px-4 pt-3 pb-1">
// // //                         <AvatarCircle size="w-10 h-10" border="border-2" />
// // //                         <button
// // //                           className="p-1 rounded-full hover:bg-gray-100 transition-colors"
// // //                           onClick={() => setIsProfileDropdownOpen(false)}
// // //                         >
// // //                           <X size={16} color="#6b7280" />
// // //                         </button>
// // //                       </div>
// // //                       {/* Name + email below avatar */}
// // //                       <div className="px-4 pb-3 border-b border-gray-100">
// // //                         <div className="font-bold text-[15px] text-[#1a2940] truncate">
// // //                           {userData?.name || "User"}
// // //                         </div>
// // //                         <div className="text-xs text-gray-400 truncate">
// // //                           {userData?.email}
// // //                         </div>
// // //                       </div>

// // //                       {/* Menu items — plain, no shadow, divider lines */}
// // //                       <div>
// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#1a2940] hover:bg-gray-50 transition-colors border-b border-gray-100"
// // //                           onClick={handleDashboardNavigate}
// // //                         >
// // //                           <LayoutDashboard size={16} color="#6b7280" />
// // //                           My Dashboard
// // //                         </button>

// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#1a2940] hover:bg-gray-50 transition-colors border-b border-gray-100"
// // //                           onClick={() => {
// // //                             navigate("/mentee/credits");
// // //                             setIsProfileDropdownOpen(false);
// // //                           }}
// // //                         >
// // //                           <CreditCard size={16} color="#6b7280" />
// // //                           Apply Credits
// // //                         </button>

// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#1a2940] hover:bg-gray-50 transition-colors border-b border-gray-100"
// // //                           onClick={() => {
// // //                             navigate("/mentee/shortlisted");
// // //                             setIsProfileDropdownOpen(false);
// // //                           }}
// // //                         >
// // //                           <Heart size={16} color="#6b7280" />
// // //                           Shortlisted Mentors
// // //                         </button>

// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#1a2940] hover:bg-gray-50 transition-colors border-b border-gray-100"
// // //                           onClick={handleProfileClick}
// // //                         >
// // //                           <User size={16} color="#6b7280" />
// // //                           My Profile
// // //                         </button>

// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#1a2940] hover:bg-gray-50 transition-colors border-b border-gray-100"
// // //                           onClick={() => {
// // //                             navigate("/mentee/messages");
// // //                             setIsProfileDropdownOpen(false);
// // //                           }}
// // //                         >
// // //                           <MessageSquare size={16} color="#6b7280" />
// // //                           My Messages
// // //                         </button>

// // //                         <button
// // //                           className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-semibold text-[#d63c3c] hover:bg-red-50 transition-colors"
// // //                           onClick={handleLogout}
// // //                         >
// // //                           <LogOut size={16} color="#d63c3c" />
// // //                           Logout
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <button
// // //                   className="flex items-center gap-2 bg-transparent border-2 border-[#0098cc] text-[#0098cc] rounded-md px-5 py-2 font-bold text-sm tracking-wide cursor-pointer hover:bg-[#0098cc] hover:text-white transition-colors"
// // //                   onClick={() => navigate("/login")}
// // //                 >
// // //                   Log In
// // //                   <LogIn size={15} />
// // //                 </button>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* Mobile Toggle */}
// // //           {isMobile && (
// // //             <button
// // //               className="bg-transparent border-2 border-[#0098cc] rounded-lg p-1.5 cursor-pointer flex items-center justify-center text-[#0098cc]"
// // //               onClick={() => setIsOpen((p) => !p)}
// // //             >
// // //               {isOpen ? <X size={22} /> : <Menu size={22} />}
// // //             </button>
// // //           )}
// // //         </div>

// // //         {/* ─── Mobile Menu ─── */}
// // //         {isMobile && isOpen && (
// // //           <div className="border-t border-[#e8f4f8] bg-[#fafcff] px-5 pt-4 pb-5 flex flex-col gap-2.5">
// // //             <button
// // //               className="w-full py-3.5 bg-[#0098cc] text-white border-none rounded-lg font-bold text-sm tracking-widest uppercase cursor-pointer"
// // //               onClick={handleBookDemo}
// // //             >
// // //               Book a FREE Trial
// // //             </button>

// // //             {isLoggedIn ? (
// // //               <>
// // //                 {/* User card */}
// // //                 <div className="flex items-center gap-3 border border-[#0098cc]/20 rounded-xl px-3.5 py-3">
// // //                   <div className="w-11 h-11 border-2 border-[#0098cc] rounded-full overflow-hidden flex-shrink-0">
// // //                     {profilePhotoUrl ? (
// // //                       <img
// // //                         src={profilePhotoUrl}
// // //                         alt="profile"
// // //                         className="w-full h-full object-cover"
// // //                       />
// // //                     ) : (
// // //                       <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-sm">
// // //                         {getInitials()}
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                   <div className="flex-1 min-w-0">
// // //                     <div className="font-bold text-[15px] text-[#1a2940] truncate">
// // //                       {userData?.name || "User"}
// // //                     </div>
// // //                     <div className="text-xs text-gray-400 truncate">
// // //                       {userData?.email}
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Plain menu items */}
// // //                 {[
// // //                   { icon: <LayoutDashboard size={17} color="#6b7280" />, label: "My Dashboard", action: handleDashboardNavigate },
// // //                   { icon: <CreditCard size={17} color="#6b7280" />, label: "Apply Credits", action: () => { navigate("/mentee/credits"); setIsOpen(false); } },
// // //                   { icon: <Heart size={17} color="#6b7280" />, label: "Shortlisted Mentors", action: () => { navigate("/mentee/shortlisted"); setIsOpen(false); } },
// // //                   { icon: <User size={17} color="#6b7280" />, label: "My Profile", action: handleProfileClick },
// // //                   { icon: <MessageSquare size={17} color="#6b7280" />, label: "My Messages", action: () => { navigate("/mentee/messages"); setIsOpen(false); } },
// // //                 ].map(({ icon, label, action }) => (
// // //                   <button
// // //                     key={label}
// // //                     className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg font-bold text-sm text-[#1a2940] cursor-pointer text-left hover:bg-gray-50 transition-colors"
// // //                     onClick={action}
// // //                   >
// // //                     {icon}
// // //                     {label}
// // //                   </button>
// // //                 ))}

// // //                 <button
// // //                   className="flex items-center gap-3 w-full px-4 py-3 bg-red-50 border border-red-200 rounded-lg font-bold text-sm text-[#d63c3c] cursor-pointer text-left"
// // //                   onClick={handleLogout}
// // //                 >
// // //                   <LogOut size={17} color="#d63c3c" />
// // //                   Logout
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <button
// // //                 className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border-2 border-[#0098cc] rounded-lg font-bold text-sm text-[#0098cc] cursor-pointer hover:bg-[#0098cc] hover:text-white transition-colors"
// // //                 onClick={() => navigate("/login")}
// // //               >
// // //                 <LogIn size={16} />
// // //                 Log In
// // //               </button>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;




// // // import React, { useEffect, useState, useRef } from "react";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import {
// // //   LogIn,
// // //   LayoutDashboard,
// // //   LogOut,
// // //   User,
// // //   Menu,
// // //   X,
// // //   CreditCard,
// // //   Heart,
// // //   MessageSquare,
// // //   Coins,
// // // } from "lucide-react";

// // // import KarrivoLogo from "../assets/KarrivoLogo.png";

// // // /* ─── Helpers ─── */
// // // const clearAllData = () => {
// // //   localStorage.clear();
// // //   document.cookie.split(";").forEach((c) => {
// // //     const name = c.split("=")[0].trim();
// // //     document.cookie = `${name}=; path=/; max-age=0`;
// // //   });
// // //   sessionStorage.clear();
// // // };

// // // const Navbar = () => {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// // //   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

// // //   const dropdownRef = useRef(null);

// // //   useEffect(() => {
// // //     const onResize = () => setIsMobile(window.innerWidth < 1024);
// // //     window.addEventListener("resize", onResize);
// // //     return () => window.removeEventListener("resize", onResize);
// // //   }, []);

// // //   useEffect(() => {
// // //     const onClickOutside = (e) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
// // //         setIsDropdownOpen(false);
// // //     };
// // //     document.addEventListener("mousedown", onClickOutside);
// // //     return () => document.removeEventListener("mousedown", onClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     setIsOpen(false);
// // //     setIsDropdownOpen(false);
// // //     window.scrollTo(0, 0);
// // //   }, [location]);

// // //   const getUserData = () => {
// // //     try { return JSON.parse(localStorage.getItem("userData") || "null"); }
// // //     catch { return null; }
// // //   };
// // //   const getProfileData = () => {
// // //     try { return JSON.parse(localStorage.getItem("profileData") || "null"); }
// // //     catch { return null; }
// // //   };

// // //   const userData = getUserData();
// // //   const profileData = getProfileData();
// // //   const isLoggedIn = !!userData?.token;
// // //   const profilePhotoUrl = profileData?.profilePhotoUrl;
// // //   const coins = profileData?.coins ?? 0;

// // //   const getInitials = () =>
// // //     userData?.name ? userData.name.replace(/\s+/g, "").slice(0, 2).toUpperCase() : "US";

// // //   const handleDashboard = () => {
// // //     navigate(userData?.role === 2 ? "/mentor/dashboard" : "/mentee/bookings");
// // //     setIsOpen(false); setIsDropdownOpen(false);
// // //   };
// // //   const handleProfile = () => { navigate("/mentee/profile"); setIsOpen(false); setIsDropdownOpen(false); };
// // //   const handleLogout = () => {
// // //     clearAllData(); setIsOpen(false); setIsDropdownOpen(false);
// // //     setTimeout(() => { window.location.href = "/login"; }, 100);
// // //   };

// // const handleBookDemo = () => {
// //   navigate("/login");
// //   setIsOpen(false);
// // };
// // //   /* ─── Avatar ─── */
// // //   const Avatar = ({ cls = "w-9 h-9" }) => (
// // //     <div className={`${cls} rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-300`}>
// // //       {profilePhotoUrl
// // //         ? <img src={profilePhotoUrl} alt="avatar" className="w-full h-full object-cover" />
// // //         : <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-xs">{getInitials()}</div>
// // //       }
// // //     </div>
// // //   );

// // //   /* ─── Nav links ─── */
// // //   const NavLinks = () => (
// // //     <>
// // //       <button
// // //         onClick={() => navigate("/mentors")}
// // //         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
// // //       >
// // //         Explore Mentors
// // //       </button>

// // <button
// //   className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"        onClick={handleBookDemo}>
// //   Book a FREE Trial
// // </button>
// // //       {/* <button
// // //         onClick={() => navigate("/success-stories")}
// // //         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
// // //       >
// // //         Success Stories
// // //       </button> */}
// // //     </>
// // //   );

// // //   return (
// // //     <nav className="fixed top-0 left-0 z-[9999] w-full bg-white border-b border-gray-200">
// // //       {/* ── Desktop bar ── */}
// // //       <div className="hidden lg:flex items-center justify-between h-[60px] px-8">

// // //         {/* Left: Logo */}
// // //         <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
// // //           <img src={KarrivoLogo} alt="Karrivo" className="h-8 w-auto" />
// // //         </div>

// // //         {/* Center: nav links */}
// // //         <div className="flex items-center gap-8">
// // //           <NavLinks />
// // //         </div>

// // //         {/* Right: avatar (logged-in) OR login btn + Find mentor */}
// // //         <div className="flex items-center gap-3">
// // //           {isLoggedIn ? (
// // //             <div className="flex items-center gap-2" ref={dropdownRef}>
// // //               {/* Avatar circle — clicking opens dropdown */}
// // //               <button
// // //                 className="p-0 bg-transparent border-none cursor-pointer"
// // //                 onClick={() => setIsDropdownOpen((p) => !p)}
// // //               >
// // //                 <Avatar cls="w-9 h-9" />
// // //               </button>

// // //               {/* X close — only when dropdown open, else just the avatar */}
// // //               {isDropdownOpen && (
// // //                 <button
// // //                   className="p-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700"
// // //                   onClick={() => setIsDropdownOpen(false)}
// // //                 >
// // //                   <X size={18} />
// // //                 </button>
// // //               )}

// // //               {/* Find your mentor button */}
// // //               <button
// // //                 className="ml-1 px-5 py-2 bg-gray-900 text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap border-none cursor-pointer"
// // //                 onClick={() => navigate("/mentors")}
// // //               >
// // //                 Find your mentor
// // //               </button>

// // //               {/* ── Dropdown ── */}
// // //               {isDropdownOpen && (
// // //                 <div className="absolute right-8 top-[60px] w-[260px] bg-white border border-gray-200 rounded-xl z-[99999] overflow-hidden">
// // //                   {/* User header */}
// // //                   <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
// // //                     <Avatar cls="w-11 h-11" />
// // //                     <div className="flex-1 min-w-0">
// // //                       <div className="font-semibold text-[14px] text-gray-900 truncate">
// // //                         {userData?.name || "User"}
// // //                       </div>
// // //                       <div className="text-xs text-gray-400 truncate">
// // //                         {userData?.email}
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {/* Coins row */}
// // //                   <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
// // //                     <span className="text-[13px] text-gray-600 font-medium">My Karrivo Coins:</span>
// // //                     <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold px-2">
// // //                       {coins}
// // //                     </span>
// // //                   </div>

// // //                   {/* Menu items */}
// // //                   {[
// // //                     { icon: <LayoutDashboard size={15} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
// // //                     { icon: <CreditCard size={15} className="text-gray-500" />, label: "Apply Credits", action: () => { navigate("/mentee/credits"); setIsDropdownOpen(false); } },
// // //                     { icon: <Heart size={15} className="text-gray-500" />, label: "Shortlisted Mentors", action: () => { navigate("/mentee/shortlisted"); setIsDropdownOpen(false); }, badge: 0 },
// // //                     { icon: <User size={15} className="text-gray-500" />, label: "My Profile", action: handleProfile },
// // //                     { icon: <MessageSquare size={15} className="text-gray-500" />, label: "My Messages", action: () => { navigate("/mentee/messages"); setIsDropdownOpen(false); } },
// // //                   ].map(({ icon, label, action, badge }) => (
// // //                     <button
// // //                       key={label}
// // //                       onClick={action}
// // //                       className="flex items-center justify-between w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer"
// // //                     >
// // //                       <span className="flex items-center gap-3">
// // //                         {icon}
// // //                         {label}
// // //                       </span>
// // //                       {badge !== undefined && (
// // //                         <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold px-1.5">
// // //                           {badge}
// // //                         </span>
// // //                       )}
// // //                     </button>
// // //                   ))}

// // //                   {/* Logout */}
// // //                   <button
// // //                     onClick={handleLogout}
// // //                     className="flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors bg-transparent border-none cursor-pointer"
// // //                   >
// // //                     <LogOut size={15} className="text-gray-500" />
// // //                     Logout
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ) : (
// // //             <>
// // //               <button
// // //                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
// // //                 onClick={() => navigate("/login")}
// // //               >
// // //                 <LogIn size={15} />
// // //                 Log In
// // //               </button>
// // //               <button
// // //                 className="px-5 py-2 bg-[#1a1a2e] text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors border-none cursor-pointer"
// // //                 onClick={() => navigate("/mentors")}
// // //               >
// // //                 Find your mentor
// // //               </button>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ── Mobile / Tablet bar ── */}
// // //       <div className="lg:hidden flex items-center justify-between h-[56px] px-4 border-b border-gray-200">
// // //         <div className="cursor-pointer" onClick={() => navigate("/")}>
// // //           <img src={KarrivoLogo} alt="Karrivo" className="h-7 w-auto" />
// // //         </div>
// // //         <button
// // //           className="p-2 rounded-md border border-gray-300 bg-white text-gray-700"
// // //           onClick={() => setIsOpen((p) => !p)}
// // //         >
// // //           {isOpen ? <X size={20} /> : <Menu size={20} />}
// // //         </button>
// // //       </div>

// // //       {/* ── Mobile menu drawer ── */}
// // //       {isOpen && (
// // //         <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 flex flex-col gap-2">
// // //           {/* Nav links */}
// // //           <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
// // //             <button onClick={() => { navigate("/mentors"); setIsOpen(false); }}
// // //               className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer">
// // //               Explore Mentors
// // //             </button>
// // //             <button onClick={() => { navigate("/success-stories"); setIsOpen(false); }}
// // //               className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer">
// // //               Success Stories
// // //             </button>
// // //           </div>

// // //           {isLoggedIn ? (
// // //             <>
// // //               {/* User card */}
// // //               <div className="flex items-center gap-3 py-3 border-b border-gray-100">
// // //                 <Avatar cls="w-10 h-10" />
// // //                 <div className="flex-1 min-w-0">
// // //                   <div className="font-semibold text-[14px] text-gray-900 truncate">{userData?.name || "User"}</div>
// // //                   <div className="text-xs text-gray-400 truncate">{userData?.email}</div>
// // //                 </div>
// // //               </div>

// // //               {/* Coins */}
// // //               <div className="flex items-center justify-between py-2 border-b border-gray-100">
// // //                 <span className="text-[13px] text-gray-600 font-medium">My Karrivo Coins:</span>
// // //                 <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold px-2">{coins}</span>
// // //               </div>

// // //               {[
// // //                 { icon: <LayoutDashboard size={16} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
// // //                 { icon: <CreditCard size={16} className="text-gray-500" />, label: "Apply Credits", action: () => { navigate("/mentee/credits"); setIsOpen(false); } },
// // //                 { icon: <Heart size={16} className="text-gray-500" />, label: "Shortlisted Mentors", action: () => { navigate("/mentee/shortlisted"); setIsOpen(false); } },
// // //                 { icon: <User size={16} className="text-gray-500" />, label: "My Profile", action: handleProfile },
// // //                 { icon: <MessageSquare size={16} className="text-gray-500" />, label: "My Messages", action: () => { navigate("/mentee/messages"); setIsOpen(false); } },
// // //               ].map(({ icon, label, action }) => (
// // //                 <button key={label} onClick={action}
// // //                   className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer hover:bg-gray-50 transition-colors px-1">
// // //                   {icon}{label}
// // //                 </button>
// // //               ))}

// // //               <button onClick={handleLogout}
// // //                 className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 bg-transparent border-none cursor-pointer hover:bg-gray-50 px-1">
// // //                 <LogOut size={16} className="text-gray-500" />Logout
// // //               </button>
// // //             </>
// // //           ) : (
// // //             <div className="flex flex-col gap-2 pt-2">
// // //               <button onClick={() => { navigate("/login"); setIsOpen(false); }}
// // //                 className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 bg-white cursor-pointer">
// // //                 <LogIn size={15} />Log In
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;


// // import React, { useEffect, useState, useRef } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import {
// //   LogIn,
// //   LayoutDashboard,
// //   LogOut,
// //   User,
// //   Menu,
// //   X,
// //   CreditCard,
// //   Heart,
// //   MessageSquare,
// //   Coins,
// // } from "lucide-react";

// // import KarrivoLogo from "../assets/KarrivoLogo.png";

// // /* ─── Helpers ─── */
// // const clearAllData = () => {
// //   localStorage.clear();
// //   document.cookie.split(";").forEach((c) => {
// //     const name = c.split("=")[0].trim();
// //     document.cookie = `${name}=; path=/; max-age=0`;
// //   });
// //   sessionStorage.clear();
// // };

// // const Navbar = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     const onResize = () => setIsMobile(window.innerWidth < 1024);
// //     window.addEventListener("resize", onResize);
// //     return () => window.removeEventListener("resize", onResize);
// //   }, []);

// //   useEffect(() => {
// //     const onClickOutside = (e) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
// //         setIsDropdownOpen(false);
// //     };
// //     document.addEventListener("mousedown", onClickOutside);
// //     return () => document.removeEventListener("mousedown", onClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     setIsOpen(false);
// //     setIsDropdownOpen(false);
// //     window.scrollTo(0, 0);
// //   }, [location]);

// //   const getUserData = () => {
// //     try { return JSON.parse(localStorage.getItem("userData") || "null"); }
// //     catch { return null; }
// //   };
// //   const getProfileData = () => {
// //     try { return JSON.parse(localStorage.getItem("profileData") || "null"); }
// //     catch { return null; }
// //   };

// //   const userData = getUserData();
// //   const profileData = getProfileData();
// //   const isLoggedIn = !!userData?.token;
// //   const profilePhotoUrl = profileData?.profilePhotoUrl;
// //   const coins = profileData?.coins ?? 0;

// //   const getInitials = () =>
// //     userData?.name ? userData.name.replace(/\s+/g, "").slice(0, 2).toUpperCase() : "US";

// //   const handleDashboard = () => {
// //     navigate(userData?.role === 2 ? "/mentor/dashboard" : "/mentee/bookings");
// //     setIsOpen(false); setIsDropdownOpen(false);
// //   };
// //   const handleProfile = () => { navigate("/mentee/profile"); setIsOpen(false); setIsDropdownOpen(false); };
// //   const handleLogout = () => {
// //     clearAllData(); setIsOpen(false); setIsDropdownOpen(false);
// //     setTimeout(() => { window.location.href = "/login"; }, 100);
// //   };

// //   /* ─── Avatar ─── */
// //   const Avatar = ({ cls = "w-9 h-9" }) => (
// //     <div className={`${cls} rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-300`}>
// //       {profilePhotoUrl
// //         ? <img src={profilePhotoUrl} alt="avatar" className="w-full h-full object-cover" />
// //         : <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-xs">{getInitials()}</div>
// //       }
// //     </div>
// //   );

// //   /* ─── Nav links ─── */
// //   const NavLinks = () => (
// //     <>
// //       <button
// //         onClick={() => navigate("/mentors")}
// //         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
// //       >
// //         Explore Mentors
// //       </button>
// //       <button
// //         onClick={() => navigate("/success-stories")}
// //         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
// //       >
// //         Success Stories
// //       </button>
// //     </>
// //   );

// //   return (
// //     <nav className="fixed top-0 left-0 z-[9999] w-full bg-white border-b border-gray-200">
// //       {/* ── Desktop bar ── */}
// //       <div className="hidden lg:flex items-center justify-between h-[60px] px-8">

// //         {/* Left: Logo */}
// //         <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
// //           <img src={KarrivoLogo} alt="Karrivo" className="h-8 w-auto" />
// //         </div>

// //         {/* Center: nav links */}
// //         <div className="flex items-center gap-8">
// //           <NavLinks />
// //         </div>

// //         {/* Right: avatar (logged-in) OR login btn + Find mentor */}
// //         <div className="flex items-center gap-3">
// //           {isLoggedIn ? (
// //             <div className="flex items-center gap-2" ref={dropdownRef}>
// //               {/* Avatar circle — clicking opens dropdown */}
// //               <button
// //                 className="p-0 bg-transparent border-none cursor-pointer"
// //                 onClick={() => setIsDropdownOpen((p) => !p)}
// //               >
// //                 <Avatar cls="w-9 h-9" />
// //               </button>

// //               {/* X close — only when dropdown open, else just the avatar */}
// //               {isDropdownOpen && (
// //                 <button
// //                   className="p-0 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700"
// //                   onClick={() => setIsDropdownOpen(false)}
// //                 >
// //                   <X size={18} />
// //                 </button>
// //               )}

// //               {/* Find your mentor button */}
// //               <button
// //                 className="ml-1 px-5 py-2 bg-gray-900 text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap border-none cursor-pointer"
// //                 onClick={() => navigate("/mentors")}
// //               >
// //                 Find your mentor
// //               </button>

// //               {/* ── Dropdown ── */}
// //               {isDropdownOpen && (
// //                 <div className="absolute right-8 top-[60px] w-[260px] bg-white border border-gray-200 rounded-xl z-[99999] overflow-hidden">
// //                   {/* User header */}
// //                   <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
// //                     <Avatar cls="w-11 h-11" />
// //                     <div className="flex-1 min-w-0">
// //                       <div className="font-semibold text-[14px] text-gray-900 truncate">
// //                         {userData?.name || "User"}
// //                       </div>
// //                       <div className="text-xs text-gray-400 truncate">
// //                         {userData?.email}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Coins row */}
// //                   <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
// //                     <span className="text-[13px] text-gray-600 font-medium">My Karrivo Coins:</span>
// //                     <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold px-2">
// //                       {coins}
// //                     </span>
// //                   </div>

// //                   {/* Menu items */}
// //                   {[
// //                     { icon: <LayoutDashboard size={15} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
// //                     { icon: <CreditCard size={15} className="text-gray-500" />, label: "Apply Credits", action: () => { navigate("/mentee/credits"); setIsDropdownOpen(false); } },
// //                     { icon: <Heart size={15} className="text-gray-500" />, label: "Shortlisted Mentors", action: () => { navigate("/mentee/shortlisted"); setIsDropdownOpen(false); }, badge: 0 },
// //                     { icon: <User size={15} className="text-gray-500" />, label: "My Profile", action: handleProfile },
// //                     { icon: <MessageSquare size={15} className="text-gray-500" />, label: "My Messages", action: () => { navigate("/mentee/messages"); setIsDropdownOpen(false); } },
// //                   ].map(({ icon, label, action, badge }) => (
// //                     <button
// //                       key={label}
// //                       onClick={action}
// //                       className="flex items-center justify-between w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer"
// //                     >
// //                       <span className="flex items-center gap-3">
// //                         {icon}
// //                         {label}
// //                       </span>
// //                       {badge !== undefined && (
// //                         <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold px-1.5">
// //                           {badge}
// //                         </span>
// //                       )}
// //                     </button>
// //                   ))}

// //                   {/* Logout */}
// //                   <button
// //                     onClick={handleLogout}
// //                     className="flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors bg-transparent border-none cursor-pointer"
// //                   >
// //                     <LogOut size={15} className="text-gray-500" />
// //                     Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <>
// //               <button
// //                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
// //                 onClick={() => navigate("/login")}
// //               >
// //                 <LogIn size={15} />
// //                 Log In
// //               </button>
// //               <button
// //                 className="px-5 py-2 bg-gray-900 text-white text-[14px] font-semibold rounded-md hover:bg-gray-800 transition-colors border-none cursor-pointer"
// //                 onClick={() => navigate("/mentors")}
// //               >
// //                 Find your mentor
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Mobile / Tablet bar ── */}
// //       <div className="lg:hidden flex items-center justify-between h-[56px] px-4">
// //         <div className="cursor-pointer" onClick={() => navigate("/")}>
// //           <img src={KarrivoLogo} alt="Karrivo" className="h-7 w-auto" />
// //         </div>

// //         {/* Right side of mobile bar */}
// //         <div className="flex items-center gap-2">
// //           {isLoggedIn ? (
// //             <>
// //               {/* Avatar */}
// //               <Avatar cls="w-8 h-8" />

// //               {/* Hamburger / X toggle */}
// //               <button
// //                 className="p-1.5 bg-transparent border-none cursor-pointer text-gray-700"
// //                 onClick={() => setIsOpen((p) => !p)}
// //               >
// //                 {isOpen ? <X size={22} /> : <Menu size={22} />}
// //               </button>

// //               {/* Find your mentor — visible in mobile bar when logged in */}
// //               <button
// //                 className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-md border-none cursor-pointer whitespace-nowrap"
// //                 onClick={() => navigate("/mentors")}
// //               >
// //                 Find your mentor
// //               </button>
// //             </>
// //           ) : (
// //             <button
// //               className="p-2 rounded-md border border-gray-300 bg-white text-gray-700"
// //               onClick={() => setIsOpen((p) => !p)}
// //             >
// //               {isOpen ? <X size={20} /> : <Menu size={20} />}
// //             </button>
// //           )}
// //         </div>
// //       </div>

// //       {/* ── Mobile menu drawer ── */}
// //       {isOpen && (
// //         <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 flex flex-col gap-2">
// //           {/* Nav links */}
// //           <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
// //             <button onClick={() => { navigate("/mentors"); setIsOpen(false); }}
// //               className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer">
// //               Explore Mentors
// //             </button>
// //             <button onClick={() => { navigate("/success-stories"); setIsOpen(false); }}
// //               className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer">
// //               Success Stories
// //             </button>
// //           </div>

// //           {isLoggedIn ? (
// //             <>
// //               {/* User card */}
// //               <div className="flex items-center gap-3 py-3 border-b border-gray-100">
// //                 <Avatar cls="w-10 h-10" />
// //                 <div className="flex-1 min-w-0">
// //                   <div className="font-semibold text-[14px] text-gray-900 truncate">{userData?.name || "User"}</div>
// //                   <div className="text-xs text-gray-400 truncate">{userData?.email}</div>
// //                 </div>
// //               </div>

// //               {/* Coins */}
// //               <div className="flex items-center justify-between py-2 border-b border-gray-100">
// //                 <span className="text-[13px] text-gray-600 font-medium">My Karrivo Coins:</span>
// //                 <span className="min-w-[28px] h-[28px] flex items-center justify-center rounded-md bg-orange-500 text-white text-xs font-bold px-2">{coins}</span>
// //               </div>

// //               {[
// //                 { icon: <LayoutDashboard size={16} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
// //                 { icon: <CreditCard size={16} className="text-gray-500" />, label: "Apply Credits", action: () => { navigate("/mentee/credits"); setIsOpen(false); } },
// //                 { icon: <Heart size={16} className="text-gray-500" />, label: "Shortlisted Mentors", action: () => { navigate("/mentee/shortlisted"); setIsOpen(false); } },
// //                 { icon: <User size={16} className="text-gray-500" />, label: "My Profile", action: handleProfile },
// //                 { icon: <MessageSquare size={16} className="text-gray-500" />, label: "My Messages", action: () => { navigate("/mentee/messages"); setIsOpen(false); } },
// //               ].map(({ icon, label, action }) => (
// //                 <button key={label} onClick={action}
// //                   className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer hover:bg-gray-50 transition-colors px-1">
// //                   {icon}{label}
// //                 </button>
// //               ))}

// //               <button onClick={handleLogout}
// //                 className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 bg-transparent border-none cursor-pointer hover:bg-gray-50 px-1">
// //                 <LogOut size={16} className="text-gray-500" />Logout
// //               </button>
// //             </>
// //           ) : (
// //             <div className="flex flex-col gap-2 pt-2">
// //               <button onClick={() => { navigate("/login"); setIsOpen(false); }}
// //                 className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 bg-white cursor-pointer">
// //                 <LogIn size={15} />Log In
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;


// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   LogIn,
//   LayoutDashboard,
//   LogOut,
//   User,
//   Menu,
//   X,
//   CreditCard,
//   Heart,
//   MessageSquare,
//   Coins,
// } from "lucide-react";

// import KarrivoLogo from "../assets/KarrivoLogo.png";

// /* ─── Helpers ─── */
// const clearAllData = () => {
//   localStorage.clear();
//   document.cookie.split(";").forEach((c) => {
//     const name = c.split("=")[0].trim();
//     document.cookie = `${name}=; path=/; max-age=0`;
//   });
//   sessionStorage.clear();
// };

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth < 1024);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useEffect(() => {
//     const onClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setIsDropdownOpen(false);
//     };
//     document.addEventListener("mousedown", onClickOutside);
//     return () => document.removeEventListener("mousedown", onClickOutside);
//   }, []);

//   useEffect(() => {
//     setIsOpen(false);
//     setIsDropdownOpen(false);
//     window.scrollTo(0, 0);
//   }, [location]);

//   const getUserData = () => {
//     try { return JSON.parse(localStorage.getItem("userData") || "null"); }
//     catch { return null; }
//   };
//   const getProfileData = () => {
//     try { return JSON.parse(localStorage.getItem("profileData") || "null"); }
//     catch { return null; }
//   };

//   const userData = getUserData();
//   const profileData = getProfileData();
//   const isLoggedIn = !!userData?.token;
//   const profilePhotoUrl = profileData?.profilePhotoUrl;
//   const coins = profileData?.coins ?? 0;

//   const getInitials = () =>
//     userData?.name ? userData.name.replace(/\s+/g, "").slice(0, 2).toUpperCase() : "US";

//   const handleDashboard = () => {
//     navigate(userData?.role === 2 ? "/mentor/dashboard" : "/mentee/bookings");
//     setIsOpen(false); setIsDropdownOpen(false);
//   };
//   const handleProfile = () => { navigate("/mentee/profile"); setIsOpen(false); setIsDropdownOpen(false); };
//   const handleLogout = () => {
//     clearAllData(); setIsOpen(false); setIsDropdownOpen(false);
//     setTimeout(() => { window.location.href = "/login"; }, 100);
//   };

//   /* ─── Avatar ─── */
//   const Avatar = ({ cls = "w-9 h-9" }) => (
//     <div className={`${cls} rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-300`}>
//       {profilePhotoUrl
//         ? <img src={profilePhotoUrl} alt="avatar" className="w-full h-full object-cover" />
//         : <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-bold text-xs">{getInitials()}</div>
//       }
//     </div>
//   );



//   const handleBookDemo = () => {
//     navigate("/login");
//     setIsOpen(false);
//   };
//   /* ─── Nav links ─── */
//   const NavLinks = () => (
//     <>
//       <button
//         onClick={() => navigate("/explore-mentors")}
//         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
//       >
//         Explore Mentors
//       </button>
//       <button
//         className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" onClick={handleBookDemo}>
//         Book a FREE Trial
//       </button>
//     </>
//   );

//   return (
//     <nav className="fixed top-0 left-0 z-[9999] w-full bg-white border-b border-gray-200">
//       {/* ── Desktop bar ── */}
//       <div className="hidden lg:flex items-center justify-between h-[60px] px-8">

//         {/* Left: Logo */}
//         <div className="cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
//           <img src={KarrivoLogo} alt="Karrivo" className="h-8 w-auto" />
//         </div>

//         {/* Center: nav links */}
//         <div className="flex items-center gap-8">
//           <NavLinks />
//         </div>

//         {/* Right: avatar (logged-in) OR login btn + Find mentor */}
//         <div className="flex items-center gap-3">
//           {isLoggedIn ? (
//             <div className="flex items-center gap-2" ref={dropdownRef}>
//               {/* Avatar circle — clicking opens dropdown */}
//               <button
//                 className="p-0 bg-transparent border-none cursor-pointer"
//                 onClick={() => setIsDropdownOpen((p) => !p)}
//               >
//                 <Avatar cls="w-9 h-9" />
//               </button>

//               {/* ≡ when closed → ✕ when open */}
//               <button
//                 className="p-0 bg-transparent border-none cursor-pointer text-gray-600 hover:text-gray-900"
//                 onClick={() => setIsDropdownOpen((p) => !p)}
//               >
//                 {isDropdownOpen ? <X size={20} /> : <Menu size={20} />}
//               </button>

//               {/* Find your mentor button */}
//               {/* Find your mentor — visible in mobile bar when logged in */}
//               <button
//                 className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-md border-none cursor-pointer whitespace-nowrap"
//                 onClick={() => navigate("/explore-mentors")}
//               >
//                 Find your mentor
//               </button>

//               {/* ── Dropdown ── */}
//               {isDropdownOpen && (
//                 <div className="absolute right-8 top-[60px] w-[260px] bg-white border border-gray-200 rounded-xl z-[99999] overflow-hidden">
//                   {/* User header */}
//                   <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
//                     <Avatar cls="w-11 h-11" />
//                     <div className="flex-1 min-w-0">
//                       <div className="font-semibold text-[14px] text-gray-900 truncate">
//                         {userData?.name || "User"}
//                       </div>
//                       <div className="text-xs text-gray-400 truncate">
//                         {userData?.email}
//                       </div>
//                     </div>
//                   </div>


//                   {/* Menu items */}
//                   {[
//                     { icon: <LayoutDashboard size={15} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
//                     { icon: <User size={15} className="text-gray-500" />, label: "My Profile", action: handleProfile },
//                   ].map(({ icon, label, action, badge }) => (
//                     <button
//                       key={label}
//                       onClick={action}
//                       className="flex items-center justify-between w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer"
//                     >
//                       <span className="flex items-center gap-3">
//                         {icon}
//                         {label}
//                       </span>
//                       {badge !== undefined && (
//                         <span className="min-w-[22px] h-[22px] flex items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold px-1.5">
//                           {badge}
//                         </span>
//                       )}
//                     </button>
//                   ))}

//                   {/* Logout */}
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium text-gray-800 hover:bg-gray-50 transition-colors bg-transparent border-none cursor-pointer"
//                   >
//                     <LogOut size={15} className="text-gray-500" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <button
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white cursor-pointer"
//                 onClick={() => navigate("/login")}
//               >
//                 <LogIn size={15} />
//                 Log In
//               </button>
//               {/* Find your mentor — visible in mobile bar when logged in */}
//               <button
//                 className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-md border-none cursor-pointer whitespace-nowrap"
//                 onClick={() => navigate("/explore-mentors")}
//               >
//                 Find your mentor
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ── Mobile / Tablet bar ── */}
//       <div className="lg:hidden flex items-center justify-between h-[56px] px-4">
//         <div className="cursor-pointer" onClick={() => navigate("/")}>
//           <img src={KarrivoLogo} alt="Karrivo" className="h-7 w-auto" />
//         </div>

//         {/* Right side of mobile bar */}
//         <div className="flex items-center gap-2">
//           {isLoggedIn ? (
//             <>
//               {/* Avatar */}
//               <Avatar cls="w-8 h-8" />

//               {/* Hamburger / X toggle */}
//               <button
//                 className="p-1.5 bg-transparent border-none cursor-pointer text-gray-700"
//                 onClick={() => setIsOpen((p) => !p)}
//               >
//                 {isOpen ? <X size={22} /> : <Menu size={22} />}
//               </button>

//               {/* Find your mentor — visible in mobile bar when logged in */}
//               {/* Find your mentor — visible in mobile bar when logged in */}
//               <button
//                 className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-md border-none cursor-pointer whitespace-nowrap"
//                 onClick={() => navigate("/explore-mentors")}
//               >
//                 Find your mentor
//               </button>
//             </>
//           ) : (
//             <button
//               className="p-2 rounded-md border border-gray-300 bg-white text-gray-700"
//               onClick={() => setIsOpen((p) => !p)}
//             >
//               {isOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ── Mobile menu drawer ── */}
//       {isOpen && (
//         <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 flex flex-col gap-2">
//           {/* Nav links */}
//           <div className="flex flex-col gap-1 pb-3 border-b border-gray-100">
//             <button onClick={() => { navigate("/explore-mentors"); setIsOpen(false); }}
//               className="text-left text-[15px] font-medium text-gray-700 py-2 bg-transparent border-none cursor-pointer">
//               Explore Mentors
//             </button>
//             <button
//               className="text-[15px] font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" onClick={handleBookDemo}>
//               Book a FREE Trial
//             </button>
//           </div>

//           {isLoggedIn ? (
//             <>
//               {/* User card */}
//               <div className="flex items-center gap-3 py-3 border-b border-gray-100">
//                 <Avatar cls="w-10 h-10" />
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold text-[14px] text-gray-900 truncate">{userData?.name || "User"}</div>
//                   <div className="text-xs text-gray-400 truncate">{userData?.email}</div>
//                 </div>
//               </div>



//               {[
//                 { icon: <LayoutDashboard size={16} className="text-gray-500" />, label: "My Dashboard", action: handleDashboard },
//                 { icon: <User size={16} className="text-gray-500" />, label: "My Profile", action: handleProfile },
//               ].map(({ icon, label, action }) => (
//                 <button key={label} onClick={action}
//                   className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 border-b border-gray-100 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer hover:bg-gray-50 transition-colors px-1">
//                   {icon}{label}
//                 </button>
//               ))}

//               <button onClick={handleLogout}
//                 className="flex items-center gap-3 w-full py-3 text-left text-[14px] font-medium text-gray-800 bg-transparent border-none cursor-pointer hover:bg-gray-50 px-1">
//                 <LogOut size={16} className="text-gray-500" />Logout
//               </button>
//             </>
//           ) : (
//             <div className="flex flex-col gap-2 pt-2">
//               <button onClick={() => { navigate("/login"); setIsOpen(false); }}
//                 className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-md text-[14px] font-medium text-gray-700 bg-white cursor-pointer">
//                 <LogIn size={15} />Log In
//               </button>
//             </div>
//           )}
//         </div>
//       )}
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



