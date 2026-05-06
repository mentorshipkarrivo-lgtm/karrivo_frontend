// // import React, { useEffect, useState, useRef } from "react";
// // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   Sparkles,
// //   LogIn,
// //   LayoutDashboard,
// //   LogOut,
// //   User,
// //   Menu,
// //   X,
// // } from "lucide-react";

// // import KarrivoLogo from "../assets/KarrivoLogo.png";

// // /* ── Helpers ───────────────────────────────────────── */

// // const clearAllData = () => {
// //   localStorage.clear();
// //   document.cookie.split(";").forEach((cookie) => {
// //     const name = cookie.split("=")[0].trim();
// //     document.cookie = `${name}=; path=/; max-age=0`;
// //   });
// //   sessionStorage.clear();
// // };

// // const Navbar = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
// //   const dropdownRef = useRef(null);

// //   /* ── User Data ───────────────────────────────────── */

// //   const getUserData = () => {
// //     try {
// //       const raw = localStorage.getItem("userData");
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   };

// //   const getProfileData = () => {
// //     try {
// //       const raw = localStorage.getItem("profileData");
// //       return raw ? JSON.parse(raw) : null;
// //     } catch {
// //       return null;
// //     }
// //   };

// //   const userData = getUserData();
// //   const profileData = getProfileData();

// //   const isLoggedIn = !!userData?.token;
// //   const profilePhotoUrl = profileData?.profilePhotoUrl;

// //   /* ── Close dropdown outside click ─────────────────── */

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsProfileDropdownOpen(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   /* ── Close menu on route change ─────────────────── */

// //   useEffect(() => {
// //     setIsOpen(false);
// //     window.scrollTo(0, 0);
// //   }, [location]);

// //   /* ── Navigation ───────────────────────────────────── */

// //   const handleDashboardNavigate = () => {
// //     if (userData?.role === 2) navigate("/mentor/dashboard");
// //     else if (userData?.role === 1) navigate("/mentee/bookings");
// //     else navigate("/login");
// //     setIsProfileDropdownOpen(false);
// //     setIsOpen(false);
// //   };

// //   const handleLogout = () => {
// //     clearAllData();
// //     setTimeout(() => (window.location.href = "/login"), 100);
// //     setIsProfileDropdownOpen(false);
// //     setIsOpen(false);
// //   };

// //   const handleProfileClick = () => {
// //     navigate("/mentee/profile");
// //     setIsProfileDropdownOpen(false);
// //     setIsOpen(false);
// //   };

// //   const handleBookDemo = () => {
// //     navigate("/login");
// //     setIsOpen(false);
// //   };

// //   /* ── Avatar helpers ───────────────────────────────── */

// //   const getInitials = () => {
// //     if (userData?.name) {
// //       return userData.name
// //         .split(" ")
// //         .map((n) => n[0])
// //         .join("")
// //         .toUpperCase();
// //     }
// //     return "U";
// //   };

// //   return (
// //     // <nav className="fixed top-0 left-0 z-[1000] w-full flex justify-center py-1 px-2 bg-white/95 backdrop-blur-sm border-b border-gray-200">
// //     //   <div className="w-full lg:w-[85%]">

// //     //     {/* ── Top Bar ── */}
// //     //     <div className="flex items-center justify-between h-12 px-4">

// //     //       {/* Logo */}
// //     //       <div
// //     //         onClick={() => navigate("/")}
// //     //         className="cursor-pointer flex-shrink-0"
// //     //       >
// //     //         <img
// //     //           src={KarrivoLogo}
// //     //           alt="Karrivo Logo"
// //     //           className="h-8 w-auto"
// //     //         />
// //     //       </div>

// //     //       {/* Desktop Navigation */}
// //     //       <div className="hidden lg:flex items-center gap-6">

// //     //         <NavLink to="/login" className="flex-shrink-0">
// //     //           <button className="px-5 py-1.5 bg-[#0098cc] text-white rounded-lg font-semibold hover:bg-[#0077a3] transition-all duration-200 shadow-md hover:shadow-lg text-sm">
// //     //             Book a Demo
// //     //           </button>
// //     //         </NavLink>

// //     //         {isLoggedIn ? (
// //     //           <div className="relative flex-shrink-0" ref={dropdownRef}>

// //     //             {/* Avatar Button */}
// //     //             <button
// //     //               onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
// //     //               className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-md hover:scale-110 transition-transform duration-200"
// //     //             >
// //     //               {profilePhotoUrl ? (
// //     //                 <img
// //     //                   src={profilePhotoUrl}
// //     //                   alt="profile"
// //     //                   className="w-full h-full object-cover"
// //     //                 />
// //     //               ) : (
// //     //                 <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0098cc] to-[#0077a3] text-white font-semibold text-sm">
// //     //                   {getInitials()}
// //     //                 </div>
// //     //               )}
// //     //             </button>

// //     //             {/* Dropdown Menu */}
// //     //             {isProfileDropdownOpen && (
// //     //               <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

// //     //                 {/* User Info Section */}
// //     //                 <div className="p-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex gap-3 items-center">
// //     //                   <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
// //     //                     {profilePhotoUrl ? (
// //     //                       <img
// //     //                         src={profilePhotoUrl}
// //     //                         alt="profile"
// //     //                         className="w-full h-full object-cover"
// //     //                       />
// //     //                     ) : (
// //     //                       <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0098cc] to-[#0077a3] text-white font-semibold">
// //     //                         {getInitials()}
// //     //                       </div>
// //     //                     )}
// //     //                   </div>

// //     //                   <div className="min-w-0 flex-1">
// //     //                     <p className="font-semibold text-sm truncate text-gray-900">
// //     //                       {userData?.name || "User"}
// //     //                     </p>
// //     //                     <p className="text-xs text-gray-500 truncate">
// //     //                       {userData?.email}
// //     //                     </p>
// //     //                   </div>
// //     //                 </div>

// //     //                 {/* Menu Items */}
// //     //                 <div className="py-1">
// //     //                   <button
// //     //                     onClick={handleDashboardNavigate}
// //     //                     className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 hover:text-[#0098cc] transition-colors duration-200"
// //     //                   >
// //     //                     <LayoutDashboard className="w-4 h-4" />
// //     //                     <span>Dashboard</span>
// //     //                   </button>

// //     //                   <button
// //     //                     onClick={handleProfileClick}
// //     //                     className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-50 text-sm text-gray-700 hover:text-[#0098cc] transition-colors duration-200"
// //     //                   >
// //     //                     <User className="w-4 h-4" />
// //     //                     <span>Profile</span>
// //     //                   </button>

// //     //                   <div className="border-t border-gray-100 my-1"></div>

// //     //                   <button
// //     //                     onClick={handleLogout}
// //     //                     className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 text-sm transition-colors duration-200"
// //     //                   >
// //     //                     <LogOut className="w-4 h-4" />
// //     //                     <span>Logout</span>
// //     //                   </button>
// //     //                 </div>
// //     //               </div>
// //     //             )}
// //     //           </div>
// //     //         ) : (
// //     //           <button
// //     //             onClick={() => navigate("/login")}
// //     //             className="flex items-center gap-2 text-gray-700 hover:text-[#0098cc] transition-colors duration-200 font-medium"
// //     //           >
// //     //             Log in <LogIn className="w-4 h-4" />
// //     //           </button>
// //     //         )}
// //     //       </div>

// //     //       {/* Mobile Menu Toggle */}
// //     //       <button
// //     //         onClick={() => setIsOpen(!isOpen)}
// //     //         className="lg:hidden flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //     //         aria-label="Toggle menu"
// //     //       >
// //     //         {isOpen ? (
// //     //           <X className="w-6 h-6 text-gray-700" />
// //     //         ) : (
// //     //           <Menu className="w-6 h-6 text-gray-700" />
// //     //         )}
// //     //       </button>

// //     //     </div>

// //     //     {/* ── Mobile Menu ── */}
// //     //     {isOpen && (
// //     //       <div className="lg:hidden border-t border-gray-200 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
// //     //         <div className="px-4 py-3 space-y-2">

// //     //           {/* Book Demo Button */}
// //     //           <button
// //     //             onClick={handleBookDemo}
// //     //             className="w-full px-4 py-2 bg-[#0098cc] text-white rounded-lg font-semibold hover:bg-[#0077a3] transition-all duration-200 shadow-md text-sm"
// //     //           >
// //     //             Book a Demo
// //     //           </button>

// //     //           {isLoggedIn ? (
// //     //             <>
// //     //               {/* User Info */}
// //     //               <div className="px-3 py-2 bg-gray-50 rounded-lg flex gap-3 items-center border border-gray-200">
// //     //                 <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
// //     //                   {profilePhotoUrl ? (
// //     //                     <img
// //     //                       src={profilePhotoUrl}
// //     //                       alt="profile"
// //     //                       className="w-full h-full object-cover"
// //     //                     />
// //     //                   ) : (
// //     //                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0098cc] to-[#0077a3] text-white font-semibold text-xs">
// //     //                       {getInitials()}
// //     //                     </div>
// //     //                   )}
// //     //                 </div>
// //     //                 <div className="min-w-0 flex-1">
// //     //                   <p className="font-semibold text-sm truncate text-gray-900">
// //     //                     {userData?.name || "User"}
// //     //                   </p>
// //     //                   <p className="text-xs text-gray-500 truncate">
// //     //                     {userData?.email}
// //     //                   </p>
// //     //                 </div>
// //     //               </div>

// //     //               {/* Mobile Menu Items */}
// //     //               <div className="space-y-1.5">
// //     //                 <button
// //     //                   onClick={handleDashboardNavigate}
// //     //                   className="w-full flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-blue-50 text-sm text-gray-700 hover:text-[#0098cc] rounded-lg transition-colors duration-200"
// //     //                 >
// //     //                   <LayoutDashboard className="w-4 h-4" />
// //     //                   <span>Dashboard</span>
// //     //                 </button>

// //     //                 <button
// //     //                   onClick={handleProfileClick}
// //     //                   className="w-full flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-blue-50 text-sm text-gray-700 hover:text-[#0098cc] rounded-lg transition-colors duration-200"
// //     //                 >
// //     //                   <User className="w-4 h-4" />
// //     //                   <span>Profile</span>
// //     //                 </button>

// //     //                 <button
// //     //                   onClick={handleLogout}
// //     //                   className="w-full flex items-center gap-3 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition-colors duration-200"
// //     //                 >
// //     //                   <LogOut className="w-4 h-4" />
// //     //                   <span>Logout</span>
// //     //                 </button>
// //     //               </div>
// //     //             </>
// //     //           ) : (
// //     //             <button
// //     //               onClick={() => navigate("/login")}
// //     //               className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 font-medium text-sm"
// //     //             >
// //     //               Log in <LogIn className="w-4 h-4" />
// //     //             </button>
// //     //           )}
// //     //         </div>
// //     //       </div>
// //     //     )}
// //     //   </div>
// //     // </nav>

// //     <nav className="fixed top-0 left-0 z-[1000] w-full flex justify-center py-3 px-3 bg-transparent">
// //       <div className="w-full lg:w-[85%] md:w-[92%] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md">

// //         {/* ── Top Bar ── */}
// //         <div className="flex items-center justify-between h-14 px-4 md:px-6">

// //           {/* Logo */}
// //           <div
// //             onClick={() => navigate("/")}
// //             className="cursor-pointer flex-shrink-0"
// //           >
// //             <img
// //               src={KarrivoLogo}
// //               alt="Karrivo Logo"
// //               className="h-9 md:h-10 w-auto"
// //             />
// //           </div>

// //           {/* Desktop + Tablet Navigation */}
// //           <div className="hidden md:flex items-center gap-5">

// //             <NavLink to="/login" className="flex-shrink-0">
// //               <button className="px-5 py-2 bg-[#0098cc] text-white rounded-lg font-semibold hover:bg-[#0077a3] transition-all duration-200 shadow-sm text-sm">
// //                 Book a Demo
// //               </button>
// //             </NavLink>

// //             {isLoggedIn ? (
// //               <div className="relative flex-shrink-0" ref={dropdownRef}>

// //                 {/* Avatar Button */}
// //                 <button
// //                   onClick={() =>
// //                     setIsProfileDropdownOpen(!isProfileDropdownOpen)
// //                   }
// //                   className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm hover:scale-105 transition"
// //                 >
// //                   {profilePhotoUrl ? (
// //                     <img
// //                       src={profilePhotoUrl}
// //                       alt="profile"
// //                       className="w-full h-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold text-sm">
// //                       {getInitials()}
// //                     </div>
// //                   )}
// //                 </button>

// //                 {/* Dropdown */}
// //                 {isProfileDropdownOpen && (
// //                   <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[9999]">

// //                     <div className="p-4 border-b bg-gray-50 flex gap-3 items-center">
// //                       <div className="w-12 h-12 rounded-full overflow-hidden border">
// //                         {profilePhotoUrl ? (
// //                           <img
// //                             src={profilePhotoUrl}
// //                             alt="profile"
// //                             className="w-full h-full object-cover"
// //                           />
// //                         ) : (
// //                           <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold">
// //                             {getInitials()}
// //                           </div>
// //                         )}
// //                       </div>

// //                       <div className="min-w-0 flex-1">
// //                         <p className="font-semibold text-sm truncate">
// //                           {userData?.name || "User"}
// //                         </p>
// //                         <p className="text-xs text-gray-500 truncate">
// //                           {userData?.email}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="py-1">
// //                       <button
// //                         onClick={handleDashboardNavigate}
// //                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
// //                       >
// //                         <LayoutDashboard className="w-4 h-4" />
// //                         Dashboard
// //                       </button>

// //                       <button
// //                         onClick={handleProfileClick}
// //                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-sm"
// //                       >
// //                         <User className="w-4 h-4" />
// //                         Profile
// //                       </button>

// //                       <button
// //                         onClick={handleLogout}
// //                         className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
// //                       >
// //                         <LogOut className="w-4 h-4" />
// //                         Logout
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <button
// //                 onClick={() => navigate("/login")}
// //                 className="flex items-center gap-2 text-gray-700 hover:text-[#0098cc] transition font-medium"
// //               >
// //                 Log in
// //                 <LogIn className="w-4 h-4" />
// //               </button>
// //             )}
// //           </div>

// //           {/* Mobile Menu Toggle */}
// //           <button
// //             onClick={() => setIsOpen(!isOpen)}
// //             className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
// //           >
// //             {isOpen ? (
// //               <X className="w-6 h-6 text-gray-700" />
// //             ) : (
// //               <Menu className="w-6 h-6 text-gray-700" />
// //             )}
// //           </button>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;






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

//   /* ───────────────── Close dropdown outside click ───────────────── */

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

//   /* ───────────────── Route change ───────────────── */

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

//     setIsProfileDropdownOpen(false);
//     setIsOpen(false);
//   };

//   const handleProfileClick = () => {
//     navigate("/mentee/profile");
//     setIsProfileDropdownOpen(false);
//     setIsOpen(false);
//   };

//   const handleBookDemo = () => {
//     navigate("/login");
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     clearAllData();
//     setIsProfileDropdownOpen(false);
//     setIsOpen(false);

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
//     <nav className="fixed top-0 left-0 z-[9999] w-full px-2 py-2">
//       {/* 
//         Mobile = full width
//         Tablet + Laptop = centered with radius + side spacing
//       */}
//       <div className="w-full md:w-[94%] lg:w-[85%] mx-auto bg-white/95 backdrop-blur-sm border border-gray-200 md:rounded-2xl shadow-md">

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

//             <button
//               onClick={handleBookDemo}
//               className="px-5 py-2 bg-[#0098cc] hover:bg-[#0077a3] text-white rounded-lg font-semibold text-sm transition-all duration-300"
//             >
//               Book a Demo
//             </button>

//             {isLoggedIn ? (
//               <div
//                 className="relative"
//                 ref={dropdownRef}
//               >
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

//                     {/* Menu */}
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

//         {/* ───────────── Mobile Menu (Full Width) ───────────── */}
//         {isOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">

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

//                 <button
//                   onClick={handleDashboardNavigate}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
//                 >
//                   <LayoutDashboard className="w-4 h-4" />
//                   Dashboard
//                 </button>

//                 <button
//                   onClick={handleProfileClick}
//                   className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
//                 >
//                   <User className="w-4 h-4" />
//                   Profile
//                 </button>

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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LogIn,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
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

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* ───────────────── User Data ───────────────── */

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

  /* ───────────────── Close Dropdown ───────────────── */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /* ───────────────── Route Change ───────────────── */

  useEffect(() => {
    setIsOpen(false);
    setIsProfileDropdownOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  /* ───────────────── Navigation ───────────────── */

  const handleDashboardNavigate = () => {
    if (userData?.role === 2) {
      navigate("/mentor/dashboard");
    } else if (userData?.role === 1) {
      navigate("/mentee/bookings");
    } else {
      navigate("/login");
    }

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

    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  /* ───────────────── Avatar Initials ───────────────── */

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
    <nav className="fixed top-0 left-0 z-[9999] w-full px-0 md:px-2 lg:px-3 py-0 md:py-2">
      {/* 
        Mobile = full width (no empty side space)
        Tablet + Desktop = centered with radius + spacing
      */}
      <div className="w-full md:w-[94%] lg:w-[85%] mx-auto bg-white/95 backdrop-blur-sm border border-gray-200 rounded-none md:rounded-2xl shadow-md">

        {/* ───────────── Top Bar ───────────── */}
        <div className="flex items-center justify-between h-14 px-4 md:px-6">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex-shrink-0"
          >
            <img
              src={KarrivoLogo}
              alt="Karrivo Logo"
              className="h-9 md:h-10 w-auto"
            />
          </div>

          {/* ───────────── Desktop + Tablet ───────────── */}
          <div className="hidden md:flex items-center gap-5">

            {/* Book Demo */}
            <button
              onClick={handleBookDemo}
              className="px-5 py-2 bg-[#0098cc] hover:bg-[#0077a3] text-white rounded-lg font-semibold text-sm transition-all duration-300"
            >
              Book a Demo
            </button>

            {/* Logged In */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>

                {/* Avatar */}
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen((prev) => !prev)
                  }
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm hover:scale-105 transition-all duration-300"
                >
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold text-sm">
                      {getInitials()}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-[55px] w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[99999]">

                    {/* User Info */}
                    <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
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

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">
                          {userData?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userData?.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">

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
                className="flex items-center gap-2 text-gray-700 hover:text-[#0098cc] font-medium transition-all duration-300"
              >
                Log in
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ───────────── Mobile Menu Toggle ───────────── */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* ───────────── Mobile Menu ───────────── */}
        {isOpen && (
          <div className="md:hidden w-full border-t border-gray-200 bg-white px-4 py-4 space-y-3">

            {/* Book Demo */}
            <button
              onClick={handleBookDemo}
              className="w-full py-3 bg-[#0098cc] hover:bg-[#0077a3] text-white rounded-lg font-semibold text-sm transition-all duration-300"
            >
              Book a Demo
            </button>

            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 bg-gray-50 border rounded-lg p-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    {profilePhotoUrl ? (
                      <img
                        src={profilePhotoUrl}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0098cc] text-white font-semibold text-xs">
                        {getInitials()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold truncate">
                      {userData?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userData?.email}
                    </p>
                  </div>
                </div>

                {/* Dashboard */}
                <button
                  onClick={handleDashboardNavigate}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>

                {/* Profile */}
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
              >
                Log in
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;







