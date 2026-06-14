



// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, GraduationCap, Briefcase, Star, Search, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const colors = {
//     primary: "#0098cc",
//     white: "#ffffff",
//     lightGray: "#f5f5f5",
//     borderGray: "#e0e0e0",
//     textDark: "#1a1a2e",
//     textLight: "#666666",
//     mutedText: "#999999",
// };

// const MAX_DOMAINS = 3;

// const domains = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "DevOps / SRE / Cloud Engineer",
//     "Data Scientist",
//     "Machine Learning Engineer",
//     "Mobile Developer",
//     "Product Manager",
//     "UI/UX Designer",
//     "Data Engineer",
// ];

// const userCategories = [
//     { label: "Fresher", icon: GraduationCap },
//     { label: "Working Professional", icon: Briefcase },
// ];

// const companyLogos = {
//     Amazon: { icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", color: "#FF9900" },
//     Microsoft: { icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", color: "#00A4EF" },
//     Google: { icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", color: "#4285F4" },
//     Atlassian: { icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atlassian-logo.svg", color: "#0052CC" },
//     Netflix: { icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", color: "#E50914" },
//     Meta: { icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", color: "#0668E1" },
//     Apple: { icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", color: "#555555" },
// };

// const previewMentors = [
//     { id: 1, name: "Shishir Chandra", title: "Director Of Technology - Distributed Platform Engineering", company: "Amazon", initials: "SC", color: "#0083b2" },
//     { id: 2, name: "Nisha Malhotra", title: "Senior Software Engineering", company: "Microsoft", initials: "NM", color: "#7c3aed" },
//     { id: 3, name: "Pranav Bhat", title: "Staff Software Engineer", company: "Atlassian", initials: "PB", color: "#059669" },
//     { id: 4, name: "Drishti Mamtani", title: "Software Engineer L4", company: "Google", initials: "DM", color: "#d97706" },
//     { id: 5, name: "Sakshi Sharma", title: "Software Engineer", company: "Google", initials: "SS", color: "#dc2626" },
//     { id: 6, name: "Rajesh Kumar", title: "Principal Engineer", company: "Netflix", initials: "RK", color: "#e50914" },
//     { id: 7, name: "Ananya Singh", title: "Quality Assurance Engineer II", company: "Amazon", initials: "AS", color: "#FF9900" },
//     { id: 8, name: "Vikram Nair", title: "Cloud Architect", company: "Microsoft", initials: "VN", color: "#0052CC" },
//     { id: 9, name: "Priya Mehta", title: "Lead Data Scientist", company: "Meta", initials: "PM", color: "#0668E1" },
//     { id: 10, name: "Rohan Verma", title: "iOS Engineer", company: "Apple", initials: "RV", color: "#555555" },
//     { id: 11, name: "Deepa Iyer", title: "Senior Product Manager", company: "Google", initials: "DI", color: "#34a853" },
//     { id: 12, name: "Arjun Kapoor", title: "UX Design Lead", company: "Microsoft", initials: "AK", color: "#00BCF2" },
// ];

// // // ── Preview card ──
// // function PreviewCard({ mentor }) {
// //     const logo = companyLogos[mentor.company];
// //     return (
// //         <div style={{
// //             background: colors.white,
// //             border: `1.5px solid ${colors.borderGray}`,
// //             borderRadius: "14px",
// //             padding: "14px 12px",
// //             textAlign: "center",
// //             cursor: "default",
// //             boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
// //             marginBottom: "12px",
// //             userSelect: "none",
// //         }}>
// //             <div style={{
// //                 width: "56px", height: "56px", borderRadius: "50%",
// //                 background: `linear-gradient(135deg, ${mentor.color}bb, ${mentor.color})`,
// //                 margin: "0 auto 10px",
// //                 display: "flex", alignItems: "center", justifyContent: "center",
// //                 fontSize: "17px", fontWeight: 800, color: "#fff",
// //                 letterSpacing: "1px", fontFamily: "Cambria, serif",
// //             }}>
// //                 {mentor.initials}
// //             </div>
// //             <p style={{ fontSize: "12px", fontWeight: 800, color: colors.textDark, marginBottom: "3px", fontFamily: "Cambria, serif", lineHeight: "1.3" }}>
// //                 {mentor.name}
// //             </p>
// //             <p style={{
// //                 fontSize: "10px", color: colors.textLight, marginBottom: "8px",
// //                 lineHeight: "1.35", fontFamily: "Cambria, serif", fontWeight: 500,
// //                 minHeight: "26px", display: "-webkit-box",
// //                 WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
// //             }}>
// //                 {mentor.title}
// //             </p>
// //             <div style={{
// //                 display: "inline-flex", alignItems: "center", gap: "5px",
// //                 background: colors.lightGray, padding: "4px 10px", borderRadius: "5px",
// //                 marginBottom: "8px", fontSize: "10px", fontWeight: 700, fontFamily: "Cambria, serif",
// //             }}>
// //                 {logo && (
// //                     <img src={logo.icon} alt={mentor.company}
// //                         style={{ height: "11px", objectFit: "contain" }}
// //                         onError={(e) => { e.target.style.display = "none"; }} />
// //                 )}
// //                 <span style={{ color: mentor.color }}>{mentor.company}</span>
// //             </div>
// //             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
// //                 {[1, 2, 3, 4, 5].map(i => <Star key={i} size={9} fill="#f59e0b" color="#f59e0b" />)}
// //                 <span style={{ color: colors.mutedText, marginLeft: "4px", fontSize: "10px", fontFamily: "Cambria, serif" }}>5.0</span>
// //             </div>
// //         </div>
// //     );
// // }




// function PreviewCard({ mentor }) {
//     const logo = companyLogos[mentor.company];
//     return (
//         <div style={{
//             background: "#ffffff",
//             border: "1.5px solid #0098cc",
//             borderRadius: "14px",
//             padding: "14px 12px",
//             textAlign: "center",
//             cursor: "default",
//             boxShadow: "0 2px 6px rgba(0,152,204,0.10)",
//             marginBottom: "12px",
//             userSelect: "none",
//         }}>
//             {/* Avatar */}
//             <div style={{
//                 width: "56px", height: "56px", borderRadius: "50%",
//                 background: "#0098cc",
//                 margin: "0 auto 10px",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: "17px", fontWeight: 800, color: "#ffffff",
//                 letterSpacing: "1px", fontFamily: "Cambria, serif",
//             }}>
//                 {mentor.initials}
//             </div>

//             {/* Name */}
//             <p style={{
//                 fontSize: "12px", fontWeight: 800, color: "#1a1a2e",
//                 marginBottom: "3px", fontFamily: "Cambria, serif", lineHeight: "1.3"
//             }}>
//                 {mentor.name}
//             </p>

//             {/* Title */}
//             <p style={{
//                 fontSize: "10px", color: "#1a1a2e", opacity: 0.6,
//                 marginBottom: "8px", lineHeight: "1.35",
//                 fontFamily: "Cambria, serif", fontWeight: 500,
//                 minHeight: "26px", display: "-webkit-box",
//                 WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
//             }}>
//                 {mentor.title}
//             </p>

//             {/* Company badge */}
//             <div style={{
//                 display: "inline-flex", alignItems: "center", gap: "5px",
//                 background: "rgba(0,152,204,0.08)",
//                 border: "1px solid rgba(0,152,204,0.25)",
//                 padding: "4px 10px", borderRadius: "5px",
//                 marginBottom: "8px", fontSize: "10px", fontWeight: 700,
//                 fontFamily: "Cambria, serif",
//             }}>
//                 {logo && (
//                     <img src={logo.icon} alt={mentor.company}
//                         style={{ height: "11px", objectFit: "contain" }}
//                         onError={(e) => { e.target.style.display = "none"; }} />
//                 )}
//                 <span style={{ color: "#0098cc" }}>{mentor.company}</span>
//             </div>

//             {/* Stars */}
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
//                 {[1, 2, 3, 4, 5].map(i => (
//                     <Star key={i} size={9} fill="#0098cc" color="#0098cc" />
//                 ))}
//                 <span style={{
//                     color: "#1a1a2e", opacity: 0.45,
//                     marginLeft: "4px", fontSize: "10px", fontFamily: "Cambria, serif"
//                 }}>
//                     5.0
//                 </span>
//             </div>
//         </div>
//     );
// }



// // ── Infinite scroll column (Desktop only) ──
// function ScrollColumn({ mentors, direction = "up" }) {
//     const doubled = [...mentors, ...mentors];
//     const animName = direction === "up" ? "scrollUp" : "scrollDown";
//     const duration = mentors.length * 5;
//     return (
//         <div style={{ overflow: "hidden", height: "580px", position: "relative" }}>
//             <div style={{
//                 display: "flex", flexDirection: "column",
//                 animation: `${animName} ${duration}s linear infinite`,
//                 willChange: "transform",
//             }}>
//                 {doubled.map((mentor, i) => (
//                     <PreviewCard key={`${mentor.id}-${i}`} mentor={mentor} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// // ── Static grid for mobile/tablet ──
// function MentorGrid({ mentors, columns = 2 }) {
//     return (
//         <div style={{
//             display: "grid",
//             gridTemplateColumns: `repeat(${columns}, 1fr)`,
//             gap: "12px",
//         }}>
//             {mentors.map((mentor) => (
//                 <PreviewCard key={mentor.id} mentor={mentor} />
//             ))}
//         </div>
//     );
// }

// // ══════════════════════════════════════════════════════
// //  MAIN COMPONENT
// // ══════════════════════════════════════════════════════
// const MentorDiscoveryUI = () => {
//     const [windowWidth, setWindowWidth] = useState(
//         typeof window !== "undefined" ? window.innerWidth : 1024
//     );

//     const navigate = useNavigate();

//     const [userCategory, setUserCategory] = useState("Working Professional");
//     const [selectedDomains, setSelectedDomains] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [showDropdown, setShowDropdown] = useState(false);

//     const dropdownRef = useRef(null);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         const handleResize = () => setWindowWidth(window.innerWidth);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const isMobile = windowWidth < 768;
//     const isTablet = windowWidth >= 768 && windowWidth < 1024;
//     const isDesktop = windowWidth >= 1024;

//     const atMax = selectedDomains.length >= MAX_DOMAINS;

//     const filteredDomains = domains.filter(d =>
//         !selectedDomains.includes(d) &&
//         (searchText === "" || d.toLowerCase().includes(searchText.toLowerCase()))
//     );

//     useEffect(() => {
//         const handler = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//                 setShowDropdown(false);
//         };
//         document.addEventListener("mousedown", handler);
//         return () => document.removeEventListener("mousedown", handler);
//     }, []);

//     const addDomain = (domain) => {
//         if (selectedDomains.includes(domain) || atMax) return;
//         setSelectedDomains(prev => [...prev, domain]);
//         setSearchText("");
//         if (selectedDomains.length + 1 < MAX_DOMAINS) {
//             setTimeout(() => inputRef.current?.focus(), 0);
//         } else {
//             setShowDropdown(false);
//         }
//     };

//     const removeDomain = (domain) => {
//         setSelectedDomains(prev => prev.filter(d => d !== domain));
//     };

//     const handleInputClick = () => {
//         if (!atMax) setShowDropdown(true);
//     };

//     // ─────────────────────────────────────────────────────────────────────────
//     // FIX: Build URL query params and navigate — ExploreMentors will read these
//     //      params, build the POST body, and call the backend correctly.
//     // ─────────────────────────────────────────────────────────────────────────
//     const handleFindMentors = () => {
//         const params = new URLSearchParams();

//         // domain → comma-separated string e.g. "Frontend Developer,Backend Developer"
//         if (selectedDomains.length > 0) {
//             params.set("domain", selectedDomains.join(","));
//         }

//         // userCategory → e.g. "Working Professional" or "Fresher"
//         if (userCategory) {
//             params.set("userCategory", userCategory);
//         }

//         const qs = params.toString();
//         console.log("🚀 Navigating to explore-mentors with params:", qs);
//         navigate(`/explore-mentors${qs ? `?${qs}` : ""}`);
//     };

//     const col1 = previewMentors.slice(0, 6);
//     const col2 = previewMentors.slice(6);

//     return (
//         <div style={{
//             background: colors.white,
//             fontFamily: "Cambria, serif",
//             minHeight: "100vh",
//             padding: isMobile ? "24px 16px" : isTablet ? "32px 24px" : "40px 28px",
//         }}>
//             <style>{`
//         @keyframes scrollUp   { 0% { transform: translateY(0); }    100% { transform: translateY(-50%); } }
//         @keyframes scrollDown { 0% { transform: translateY(-50%); } 100% { transform: translateY(0); }    }
//         .scroll-wrap:hover > div > div { animation-play-state: paused; }
//         .cat-btn  { transition: all 0.2s ease; }
//         .cat-btn:hover  { box-shadow: 0 6px 16px rgba(0,131,178,0.15); transform: translateY(-1px); }
//         .find-btn { transition: all 0.2s ease; cursor: pointer; }
//         .find-btn:hover { background: #006a91 !important; transform: translateY(-1px); }
//         .find-btn:active { transform: scale(0.98); }
//         .tag-btn  { transition: all 0.18s ease; }
//         .tag-btn:hover  { background: #0083b2 !important; color: #fff !important; }
//         .dd-opt:hover   { background: rgba(0,131,178,0.06) !important; }
//         .chip-remove { transition: all 0.15s ease; }
//         .chip-remove:hover { background: rgba(0,152,204,0.2) !important; }
//         * { box-sizing: border-box; margin: 0; padding: 0; }

//         @media (max-width: 767px) {
//             .cat-btn:hover { box-shadow: none; transform: none; }
//             .find-btn:hover { background: #1a1a2e !important; transform: none; }
//             .tag-btn:hover { background: #e0e0e0 !important; color: #1a1a2e !important; }
//         }

//         @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
//       `}</style>

//             <div style={{
//                 display: isDesktop ? "grid" : "flex",
//                 gridTemplateColumns: isDesktop ? "50% 40%" : undefined,
//                 flexDirection: "column",
//                 gap: isDesktop ? "150px" : isMobile ? "32px" : "48px",
//                 maxWidth: isDesktop ? "1280px" : isTablet ? "900px" : "100%",
//                 margin: "0 auto",
//                 paddingLeft: isDesktop ? "20px" : "0",
//                 alignItems: isDesktop ? "center" : "stretch",
//             }}>

//                 {/* ════════ LEFT SECTION ════════ */}
//                 <div style={{
//                     position: isDesktop ? "sticky" : "relative",
//                     top: isDesktop ? "40px" : undefined,
//                 }}>

//                     {/* Heading */}
//                     <div style={{ marginBottom: isMobile ? "24px" : isTablet ? "28px" : "30px" }}>
//                         <h1 style={{
//                             fontSize: isMobile ? "24px" : isTablet ? "28px" : "32px",
//                             fontWeight: 900, color: colors.textDark, marginBottom: "6px", lineHeight: "1.2"
//                         }}>
//                             Find Your Ideal Mentor
//                         </h1>
//                         <h2 style={{
//                             fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
//                             fontWeight: 700, color: colors.primary
//                         }}>
//                             From 600+ Top Experienced Mentors
//                         </h2>
//                     </div>

//                     {/* I'm a */}
//                     <div style={{ marginBottom: isMobile ? "24px" : isTablet ? "28px" : "30px" }}>
//                         <p style={{
//                             fontSize: "13px", fontWeight: 900, color: colors.textDark,
//                             marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.8px"
//                         }}>
//                             I'm a
//                         </p>
//                         <div style={{
//                             display: "flex", gap: isMobile ? "12px" : "14px",
//                             flexDirection: isMobile ? "column" : "row",
//                         }}>
//                             {userCategories.map(({ label, icon: Icon }) => {
//                                 const active = userCategory === label;
//                                 return (
//                                     <button
//                                         key={label}
//                                         className="cat-btn"
//                                         onClick={() => setUserCategory(label)}
//                                         style={{
//                                             flex: 1, padding: isMobile ? "16px 12px" : "20px 12px",
//                                             borderRadius: "10px",
//                                             fontSize: "13px", fontWeight: 700, fontFamily: "Cambria, serif",
//                                             border: active ? `2px solid ${colors.primary}` : `2px solid ${colors.borderGray}`,
//                                             background: active ? "rgba(0,131,178,0.07)" : colors.white,
//                                             color: active ? colors.primary : colors.textLight,
//                                             cursor: "pointer",
//                                             display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
//                                             boxShadow: active ? "0 4px 12px rgba(0,131,178,0.12)" : "none",
//                                         }}>
//                                         <div style={{
//                                             width: "44px", height: "44px", borderRadius: "8px",
//                                             background: active ? "rgba(0,131,178,0.12)" : colors.lightGray,
//                                             display: "flex", alignItems: "center", justifyContent: "center",
//                                         }}>
//                                             <Icon size={22} color={active ? colors.primary : colors.textLight} />
//                                         </div>
//                                         {label}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Looking for mentorship in */}
//                     <div style={{ marginBottom: isMobile ? "24px" : isTablet ? "28px" : "30px" }}>
//                         <div style={{
//                             display: "flex", alignItems: "center",
//                             justifyContent: "space-between", marginBottom: "14px",
//                             flexDirection: isMobile ? "column" : "row",
//                             gap: isMobile ? "8px" : "0",
//                             alignItems: isMobile ? "flex-start" : "center",
//                         }}>
//                             <p style={{
//                                 fontSize: "13px", fontWeight: 900, color: colors.textDark,
//                                 textTransform: "uppercase", letterSpacing: "0.8px"
//                             }}>
//                                 Looking for mentorship in
//                             </p>
//                             <span style={{
//                                 fontSize: "10px", fontWeight: 700, fontFamily: "Cambria, serif",
//                                 color: atMax ? colors.primary : colors.mutedText,
//                                 background: atMax ? "rgba(0,152,204,0.08)" : colors.lightGray,
//                                 padding: "3px 9px", borderRadius: "20px",
//                                 border: atMax ? `1px solid rgba(0,152,204,0.25)` : "1px solid transparent",
//                                 transition: "all 0.2s ease",
//                             }}>
//                                 {selectedDomains.length}/{MAX_DOMAINS} selected
//                             </span>
//                         </div>

//                         {/* Multi-select Dropdown */}
//                         <div ref={dropdownRef} style={{ position: "relative", marginBottom: "14px" }}>
//                             <div
//                                 onClick={handleInputClick}
//                                 style={{
//                                     display: "flex",
//                                     flexWrap: "wrap",
//                                     alignItems: "center",
//                                     gap: "6px",
//                                     border: `1.5px solid ${showDropdown ? colors.primary : colors.borderGray}`,
//                                     borderRadius: showDropdown && !atMax ? "8px 8px 0 0" : "8px",
//                                     background: colors.white,
//                                     minHeight: "46px",
//                                     padding: "6px 10px",
//                                     cursor: atMax ? "default" : "text",
//                                     boxShadow: showDropdown ? "0 0 0 3px rgba(0,131,178,0.08)" : "none",
//                                     transition: "border-color 0.2s, box-shadow 0.2s",
//                                 }}>

//                                 {selectedDomains.map((domain) => (
//                                     <span
//                                         key={domain}
//                                         style={{
//                                             display: "inline-flex",
//                                             alignItems: "center",
//                                             gap: "5px",
//                                             background: "rgba(0,152,204,0.10)",
//                                             border: "1px solid rgba(0,152,204,0.3)",
//                                             color: colors.primary,
//                                             fontSize: "11px",
//                                             fontWeight: 700,
//                                             fontFamily: "Cambria, serif",
//                                             padding: "3px 8px 3px 10px",
//                                             borderRadius: "20px",
//                                             whiteSpace: "nowrap",
//                                             animation: "fadeIn 0.2s ease",
//                                         }}>
//                                         {domain}
//                                         <button
//                                             className="chip-remove"
//                                             onClick={(e) => { e.stopPropagation(); removeDomain(domain); }}
//                                             style={{
//                                                 background: "rgba(0,152,204,0.08)",
//                                                 border: "none",
//                                                 borderRadius: "50%",
//                                                 width: "16px", height: "16px",
//                                                 display: "flex", alignItems: "center", justifyContent: "center",
//                                                 cursor: "pointer", padding: 0, flexShrink: 0,
//                                             }}>
//                                             <X size={10} color={colors.primary} strokeWidth={2.5} />
//                                         </button>
//                                     </span>
//                                 ))}

//                                 {!atMax && (
//                                     <div style={{
//                                         display: "flex", alignItems: "center",
//                                         flex: 1, minWidth: isMobile ? "100%" : "120px", gap: "6px"
//                                     }}>
//                                         <Search size={13} color={colors.mutedText} style={{ flexShrink: 0 }} />
//                                         <input
//                                             ref={inputRef}
//                                             value={searchText}
//                                             onChange={(e) => { setSearchText(e.target.value); setShowDropdown(true); }}
//                                             onFocus={() => setShowDropdown(true)}
//                                             placeholder={selectedDomains.length === 0 ? "eg: frontend, backend…" : "Add more…"}
//                                             style={{
//                                                 flex: 1, border: "none", outline: "none",
//                                                 fontSize: "12px", color: colors.textDark, fontWeight: 600,
//                                                 fontFamily: "Cambria, serif", background: "transparent",
//                                                 minWidth: 0,
//                                             }}
//                                         />
//                                     </div>
//                                 )}

//                                 {atMax && (
//                                     <span style={{
//                                         fontSize: "11px", color: colors.primary,
//                                         fontWeight: 600, fontFamily: "Cambria, serif", flex: 1
//                                     }}>
//                                         Max {MAX_DOMAINS} selected — remove one to change
//                                     </span>
//                                 )}

//                                 {!atMax && (
//                                     <ChevronDown
//                                         size={16} color={colors.primary}
//                                         style={{
//                                             flexShrink: 0,
//                                             transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
//                                             transition: "transform 0.28s ease",
//                                         }}
//                                     />
//                                 )}
//                             </div>

//                             {showDropdown && !atMax && (
//                                 <div style={{
//                                     position: "absolute", top: "100%", left: 0, right: 0,
//                                     background: colors.white,
//                                     border: `1.5px solid ${colors.primary}`,
//                                     borderTop: "none", borderRadius: "0 0 8px 8px",
//                                     boxShadow: "0 8px 20px rgba(0,0,0,0.11)",
//                                     zIndex: 200, maxHeight: isMobile ? "180px" : "220px", overflowY: "auto",
//                                 }}>
//                                     {filteredDomains.length === 0 && (
//                                         <div style={{
//                                             padding: "12px 14px", fontSize: "12px",
//                                             color: colors.mutedText, fontFamily: "Cambria, serif"
//                                         }}>
//                                             No results found
//                                         </div>
//                                     )}
//                                     {filteredDomains.map((domain) => (
//                                         <div
//                                             key={domain}
//                                             className="dd-opt"
//                                             onClick={() => addDomain(domain)}
//                                             style={{
//                                                 padding: "10px 14px", cursor: "pointer", fontSize: "13px",
//                                                 color: colors.textDark,
//                                                 fontWeight: 600,
//                                                 background: colors.white,
//                                                 fontFamily: "Cambria, serif",
//                                                 borderLeft: "3px solid transparent",
//                                                 transition: "background 0.15s ease",
//                                                 display: "flex", alignItems: "center", justifyContent: "space-between",
//                                             }}>
//                                             <span>{domain}</span>
//                                             <span style={{
//                                                 fontSize: "9px", color: colors.mutedText, fontWeight: 600,
//                                                 background: colors.lightGray, padding: "2px 7px", borderRadius: "10px",
//                                             }}>
//                                                 + Add
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Quick filter tags */}
//                         <div style={{
//                             display: "flex", flexWrap: "wrap", gap: isMobile ? "6px" : "8px"
//                         }}>
//                             {domains.slice(0, 5).filter(d => !selectedDomains.includes(d))
//                                 .slice(0, isMobile ? 2 : 4).map((domain) => (
//                                     <button
//                                         key={domain}
//                                         className="tag-btn"
//                                         disabled={atMax}
//                                         onClick={() => addDomain(domain)}
//                                         style={{
//                                             padding: isMobile ? "6px 11px" : "7px 13px",
//                                             borderRadius: "6px",
//                                             fontSize: isMobile ? "10px" : "11px",
//                                             fontWeight: 700, border: "none",
//                                             background: colors.lightGray,
//                                             color: colors.textDark,
//                                             cursor: atMax ? "not-allowed" : "pointer",
//                                             fontFamily: "Cambria, serif",
//                                             opacity: atMax ? 0.45 : 1,
//                                             transition: "all 0.18s ease",
//                                         }}>
//                                         + {domain}
//                                     </button>
//                                 ))}
//                         </div>
//                     </div>

//                     {/* Find Mentors button */}
//                     <button
//                         className="find-btn"
//                         onClick={handleFindMentors}
//                         style={{
//                             width: "100%", padding: isMobile ? "13px" : "15px",
//                             background: "#1a1a2e",
//                             color: colors.white, border: "none", borderRadius: "10px",
//                             fontSize: isMobile ? "14px" : "15px", fontWeight: 700,
//                             fontFamily: "Cambria, serif", letterSpacing: "0.3px",
//                         }}>
//                         Find Matching Mentors →
//                     </button>

//                 </div>

//                 {/* ════════ RIGHT — animated preview (Desktop only) ════════ */}
//                 {isDesktop && (
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                         <div className="scroll-wrap"><ScrollColumn mentors={col1} direction="up" /></div>
//                         <div className="scroll-wrap"><ScrollColumn mentors={col2} direction="down" /></div>
//                     </div>
//                 )}

//                 {/* ════════ STATIC MENTOR GRID (Mobile/Tablet) ════════ */}
//                 {!isDesktop && (
//                     <div style={{ marginTop: "8px" }}>
//                         <h3 style={{
//                             fontSize: isMobile ? "16px" : "18px",
//                             fontWeight: 700, color: colors.textDark,
//                             marginBottom: "16px",
//                         }}>
//                             Popular Mentors
//                         </h3>
//                         <MentorGrid
//                             mentors={previewMentors.slice(0, isMobile ? 4 : 6)}
//                             columns={isMobile ? 2 : 3}
//                         />
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default MentorDiscoveryUI;







import { useState, useEffect, useRef } from "react";
import { ChevronDown, GraduationCap, Briefcase, Star, Search, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const colors = {
    primary: "#0098cc",
    white: "#ffffff",
    lightGray: "#f5f5f5",
    borderGray: "#e0e0e0",
    textDark: "#1a1a2e",
    textLight: "#666666",
    mutedText: "#999999",
};

const FONT = "Cambria";

const domains = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps / SRE / Cloud Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Mobile Developer",
    "Product Manager",
    "UI/UX Designer",
    "Data Engineer",
];

const userCategories = [
    { label: "Fresher", icon: GraduationCap },
    { label: "Working Professional", icon: Briefcase },
];

const companyLogos = {
    Amazon: { icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    Microsoft: { icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    Google: { icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    Atlassian: { icon: "https://upload.wikimedia.org/wikipedia/commons/8/82/Atlassian-logo.svg" },
    Netflix: { icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    Meta: { icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    Apple: { icon: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
};

const previewMentors = [
    { id: 1, name: "Shishir Chandra", title: "Director Of Technology - Distributed Platform Engineering", company: "Amazon", initials: "SC" },
    { id: 2, name: "Nisha Malhotra", title: "Senior Software Engineering", company: "Microsoft", initials: "NM" },
    { id: 3, name: "Pranav Bhat", title: "Staff Software Engineer", company: "Atlassian", initials: "PB" },
    { id: 4, name: "Drishti Mamtani", title: "Software Engineer L4", company: "Google", initials: "DM" },
    { id: 5, name: "Sakshi Sharma", title: "Software Engineer", company: "Google", initials: "SS" },
    { id: 6, name: "Rajesh Kumar", title: "Principal Engineer", company: "Netflix", initials: "RK" },
    { id: 7, name: "Ananya Singh", title: "Quality Assurance Engineer II", company: "Amazon", initials: "AS" },
    { id: 8, name: "Vikram Nair", title: "Cloud Architect", company: "Microsoft", initials: "VN" },
    { id: 9, name: "Priya Mehta", title: "Lead Data Scientist", company: "Meta", initials: "PM" },
    { id: 10, name: "Rohan Verma", title: "iOS Engineer", company: "Apple", initials: "RV" },
    { id: 11, name: "Deepa Iyer", title: "Senior Product Manager", company: "Google", initials: "DI" },
    { id: 12, name: "Arjun Kapoor", title: "UX Design Lead", company: "Microsoft", initials: "AK" },
];

function PreviewCard({ mentor }) {
    const logo = companyLogos[mentor.company];
    return (
        <div style={{
            background: "#ffffff",
            border: "1.5px solid #0098cc",
            borderRadius: "14px",
            padding: "14px 12px",
            textAlign: "center",
            cursor: "default",
            boxShadow: "0 2px 6px rgba(0,152,204,0.10)",
            marginBottom: "12px",
            userSelect: "none",
            fontFamily: FONT,
        }}>
            <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "#0098cc",
                margin: "0 auto 10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "17px", fontWeight: 800, color: "#ffffff",
                letterSpacing: "1px", fontFamily: FONT,
            }}>
                {mentor.initials}
            </div>
            <p style={{ fontSize: "12px", fontWeight: 800, color: "#1a1a2e", marginBottom: "3px", fontFamily: FONT, lineHeight: "1.3" }}>
                {mentor.name}
            </p>
            <p style={{
                fontSize: "10px", color: "#1a1a2e", opacity: 0.6, marginBottom: "8px",
                lineHeight: "1.35", fontFamily: FONT, fontWeight: 500, minHeight: "26px",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
                {mentor.title}
            </p>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "rgba(0,152,204,0.08)", border: "1px solid rgba(0,152,204,0.25)",
                padding: "4px 10px", borderRadius: "5px", marginBottom: "8px",
                fontSize: "10px", fontWeight: 700, fontFamily: FONT,
            }}>
                {logo && (
                    <img src={logo.icon} alt={mentor.company}
                        style={{ height: "11px", objectFit: "contain" }}
                        onError={(e) => { e.target.style.display = "none"; }} />
                )}
                <span style={{ color: "#0098cc", fontFamily: FONT }}>{mentor.company}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={9} fill="#0098cc" color="#0098cc" />)}
                <span style={{ color: "#1a1a2e", opacity: 0.45, marginLeft: "4px", fontSize: "10px", fontFamily: FONT }}>5.0</span>
            </div>
        </div>
    );
}

function ScrollColumn({ mentors, direction = "up" }) {
    const doubled = [...mentors, ...mentors];
    const animName = direction === "up" ? "scrollUp" : "scrollDown";
    const duration = mentors.length * 5;
    return (
        <div style={{ overflow: "hidden", height: "580px", position: "relative" }}>
            <div style={{
                display: "flex", flexDirection: "column",
                animation: `${animName} ${duration}s linear infinite`,
                willChange: "transform",
            }}>
                {doubled.map((mentor, i) => <PreviewCard key={`${mentor.id}-${i}`} mentor={mentor} />)}
            </div>
        </div>
    );
}

function MentorGrid({ mentors, columns = 2 }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "12px" }}>
            {mentors.map((mentor) => <PreviewCard key={mentor.id} mentor={mentor} />)}
        </div>
    );
}

const MentorDiscoveryUI = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    const navigate = useNavigate();

    const [userCategory, setUserCategory] = useState("Working Professional");
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isDesktop = windowWidth >= 1024;

    // Domains not yet selected that match search
    const filteredDomains = domains.filter(d =>
        !selectedDomains.includes(d) &&
        (searchText === "" || d.toLowerCase().includes(searchText.toLowerCase()))
    );

    // Custom entry: show if typed text doesn't exactly match any domain and isn't already selected
    const trimmed = searchText.trim();
    const canAddCustom =
        trimmed.length > 0 &&
        !domains.some(d => d.toLowerCase() === trimmed.toLowerCase()) &&
        !selectedDomains.some(d => d.toLowerCase() === trimmed.toLowerCase());

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowDropdown(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const addDomain = (domain) => {
        const val = domain.trim();
        if (!val || selectedDomains.some(d => d.toLowerCase() === val.toLowerCase())) return;
        setSelectedDomains(prev => [...prev, val]);
        setSearchText("");
        setShowDropdown(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const addCustom = () => {
        if (!canAddCustom) return;
        addDomain(trimmed);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // If there's exactly one filtered result, add it; otherwise add custom
            if (filteredDomains.length === 1) {
                addDomain(filteredDomains[0]);
            } else if (canAddCustom) {
                addCustom();
            }
        }
        if (e.key === "Escape") setShowDropdown(false);
    };

    const removeDomain = (domain) => {
        setSelectedDomains(prev => prev.filter(d => d !== domain));
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleFindMentors = () => {
        const params = new URLSearchParams();
        if (selectedDomains.length > 0) params.set("domain", selectedDomains.join(","));
        if (userCategory) params.set("userCategory", userCategory);
        const qs = params.toString();
        navigate(`/explore-mentors${qs ? `?${qs}` : ""}`);
    };

    const col1 = previewMentors.slice(0, 6);
    const col2 = previewMentors.slice(6);

    return (
        <div style={{ background: colors.white, fontFamily: FONT, minHeight: "100vh", padding: isMobile ? "24px 16px" : isTablet ? "32px 24px" : "40px 28px" }}>
            <style>{`
                @keyframes scrollUp   { 0%{transform:translateY(0)}    100%{transform:translateY(-50%)} }
                @keyframes scrollDown { 0%{transform:translateY(-50%)} 100%{transform:translateY(0)}    }
                .scroll-wrap:hover > div > div { animation-play-state: paused; }
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: Cambria !important; }
                .cat-btn  { transition: all 0.2s ease; }
                .cat-btn:hover { box-shadow: 0 6px 16px rgba(0,131,178,0.15); transform: translateY(-1px); }
                .find-btn { transition: all 0.2s ease; cursor: pointer; }
                .find-btn:hover { background: #006a91 !important; transform: translateY(-1px); }
                .find-btn:active { transform: scale(0.98); }
                .tag-btn { transition: all 0.18s ease; }
                .tag-btn:hover { background: #0083b2 !important; color: #fff !important; }
                .dd-opt { transition: background 0.15s ease; }
                .dd-opt:hover { background: rgba(0,131,178,0.08) !important; }
                .dd-custom:hover { background: rgba(0,152,204,0.12) !important; }
                .chip-remove { transition: all 0.15s ease; }
                .chip-remove:hover { background: rgba(0,152,204,0.25) !important; }
                @keyframes fadeIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
                @media (max-width:767px) {
                    .cat-btn:hover { box-shadow: none; transform: none; }
                    .find-btn:hover { background: #1a1a2e !important; transform: none; }
                    .tag-btn:hover { background: #e0e0e0 !important; color: #1a1a2e !important; }
                }
            `}</style>

            <div style={{
                display: isDesktop ? "grid" : "flex",
                gridTemplateColumns: isDesktop ? "50% 42%" : undefined,
                flexDirection: isDesktop ? undefined : "column",
                gap: isDesktop ? "100px" : isMobile ? "32px" : "48px",
                maxWidth: isDesktop ? "1280px" : isTablet ? "900px" : "100%",
                margin: "0 auto",
                alignItems: isDesktop ? "center" : "stretch",
            }}>

                {/* ════ LEFT ════ */}
                <div style={{ position: isDesktop ? "sticky" : "relative", top: isDesktop ? "40px" : undefined }}>

                    {/* Heading */}
                    <div style={{ marginBottom: isMobile ? "24px" : "30px" }}>
                        <h1 style={{ fontSize: isMobile ? "24px" : isTablet ? "28px" : "32px", fontWeight: 900, color: colors.textDark, marginBottom: "6px", lineHeight: "1.2", fontFamily: FONT }}>
                            Find Your Ideal Mentor
                        </h1>
                        <h2 style={{ fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px", fontWeight: 700, color: colors.primary, fontFamily: FONT }}>
                            From 600+ Top Experienced Mentors
                        </h2>
                    </div>

                    {/* I'm a */}
                    <div style={{ marginBottom: isMobile ? "24px" : "30px" }}>
                        {/* <p style={{ fontSize: "13px", fontWeight: 900, color: colors.textDark, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT }}>
                            I'm a
                        </p> */}
                        <div style={{ display: "flex", gap: isMobile ? "12px" : "14px", flexDirection: isMobile ? "column" : "row" }}>
                            {userCategories.map(({ label, icon: Icon }) => {
                                const active = userCategory === label;
                                return (
                                    <button key={label} className="cat-btn" onClick={() => setUserCategory(label)} style={{
                                        flex: 1, padding: isMobile ? "16px 12px" : "20px 12px", borderRadius: "10px",
                                        fontSize: "13px", fontWeight: 700, fontFamily: FONT,
                                        border: active ? `2px solid ${colors.primary}` : `2px solid ${colors.borderGray}`,
                                        background: active ? "rgba(0,131,178,0.07)" : colors.white,
                                        color: active ? colors.primary : colors.textLight, cursor: "pointer",
                                        display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
                                        boxShadow: active ? "0 4px 12px rgba(0,131,178,0.12)" : "none",
                                    }}>
                                        <div style={{
                                            width: "44px", height: "44px", borderRadius: "8px",
                                            background: active ? "rgba(0,131,178,0.12)" : colors.lightGray,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <Icon size={22} color={active ? colors.primary : colors.textLight} />
                                        </div>
                                        <span style={{ fontFamily: FONT }}>{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Domain selector */}
                    <div style={{ marginBottom: isMobile ? "24px" : "30px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                            <p style={{ fontSize: "13px", fontWeight: 900, color: colors.textDark, textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT }}>
                                Looking for mentorship in
                            </p>
                            {selectedDomains.length > 0 && (
                                <span style={{
                                    fontSize: "10px", fontWeight: 700, fontFamily: FONT,
                                    color: colors.primary, background: "rgba(0,152,204,0.08)",
                                    padding: "3px 9px", borderRadius: "20px", border: "1px solid rgba(0,152,204,0.25)",
                                }}>
                                    {selectedDomains.length} selected
                                </span>
                            )}
                        </div>

                        {/* ── Multi-select box ── */}
                        <div ref={dropdownRef} style={{ position: "relative", marginBottom: "14px" }}>

                            {/* Input box */}
                            <div
                                onClick={() => { setShowDropdown(true); inputRef.current?.focus(); }}
                                style={{
                                    display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px",
                                    border: `1.5px solid ${showDropdown ? colors.primary : colors.borderGray}`,
                                    borderRadius: showDropdown ? "8px 8px 0 0" : "8px",
                                    background: colors.white, minHeight: "46px",
                                    padding: "6px 10px", cursor: "text",
                                    boxShadow: showDropdown ? "0 0 0 3px rgba(0,131,178,0.08)" : "none",
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                }}>

                                {/* Selected chips */}
                                {selectedDomains.map((domain) => (
                                    <span key={domain} style={{
                                        display: "inline-flex", alignItems: "center", gap: "5px",
                                        background: "rgba(0,152,204,0.10)", border: "1px solid rgba(0,152,204,0.3)",
                                        color: colors.primary, fontSize: "11px", fontWeight: 700,
                                        fontFamily: FONT, padding: "3px 8px 3px 10px", borderRadius: "20px",
                                        whiteSpace: "nowrap", animation: "fadeIn 0.2s ease",
                                    }}>
                                        {domain}
                                        <button className="chip-remove"
                                            onClick={(e) => { e.stopPropagation(); removeDomain(domain); }}
                                            style={{
                                                background: "rgba(0,152,204,0.08)", border: "none", borderRadius: "50%",
                                                width: "16px", height: "16px", display: "flex", alignItems: "center",
                                                justifyContent: "center", cursor: "pointer", padding: 0, flexShrink: 0,
                                            }}>
                                            <X size={10} color={colors.primary} strokeWidth={2.5} />
                                        </button>
                                    </span>
                                ))}

                                {/* Search input row */}
                                <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: "140px", gap: "6px" }}>
                                    <Search size={13} color={colors.mutedText} style={{ flexShrink: 0 }} />
                                    <input
                                        ref={inputRef}
                                        value={searchText}
                                        onChange={(e) => { setSearchText(e.target.value); setShowDropdown(true); }}
                                        onFocus={() => setShowDropdown(true)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={selectedDomains.length === 0 ? "Search or type a custom role…" : "Add more…"}
                                        style={{
                                            flex: 1, border: "none", outline: "none",
                                            fontSize: "12px", color: colors.textDark, fontWeight: 600,
                                            fontFamily: FONT, background: "transparent", minWidth: 0,
                                            width: "100%",
                                        }}
                                    />
                                    {searchText && (
                                        <button onClick={(e) => { e.stopPropagation(); setSearchText(""); inputRef.current?.focus(); }}
                                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0, display: "flex", alignItems: "center" }}>
                                            <X size={12} color={colors.mutedText} />
                                        </button>
                                    )}
                                    <ChevronDown size={15} color={colors.primary} style={{
                                        flexShrink: 0,
                                        transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.25s ease",
                                    }} />
                                </div>
                            </div>

                            {/* Dropdown */}
                            {showDropdown && (
                                <div style={{
                                    position: "absolute", top: "100%", left: 0, right: 0, zIndex: 300,
                                    background: colors.white,
                                    border: `1.5px solid ${colors.primary}`,
                                    borderTop: "none", borderRadius: "0 0 10px 10px",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.13)",
                                    maxHeight: "240px", overflowY: "auto",
                                }}>
                                    {/* Custom entry option */}
                                    {canAddCustom && (
                                        <div className="dd-custom" onClick={addCustom} style={{
                                            padding: "10px 14px", cursor: "pointer",
                                            display: "flex", alignItems: "center", gap: "8px",
                                            borderBottom: `1px solid rgba(0,152,204,0.15)`,
                                            background: "rgba(0,152,204,0.04)",
                                        }}>
                                            <div style={{
                                                width: "20px", height: "20px", borderRadius: "50%",
                                                background: colors.primary, display: "flex",
                                                alignItems: "center", justifyContent: "center", flexShrink: 0,
                                            }}>
                                                <Plus size={11} color="#fff" strokeWidth={2.5} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: "12px", fontWeight: 700, color: colors.primary, fontFamily: FONT }}>
                                                    Add "{trimmed}"
                                                </span>
                                                <span style={{ fontSize: "10px", color: colors.mutedText, fontFamily: FONT, marginLeft: "6px" }}>
                                                    custom entry
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Filtered domain list */}
                                    {filteredDomains.length === 0 && !canAddCustom && (
                                        <div style={{ padding: "12px 14px", fontSize: "12px", color: colors.mutedText, fontFamily: FONT }}>
                                            {searchText ? `No results — press Enter to add "${trimmed}"` : "All domains selected"}
                                        </div>
                                    )}
                                    {filteredDomains.map((domain) => (
                                        <div key={domain} className="dd-opt" onClick={() => addDomain(domain)} style={{
                                            padding: "10px 14px", cursor: "pointer", fontSize: "13px",
                                            color: colors.textDark, fontWeight: 600, fontFamily: FONT,
                                            background: colors.white, display: "flex",
                                            alignItems: "center", justifyContent: "space-between",
                                        }}>
                                            <span style={{ fontFamily: FONT }}>{domain}</span>
                                            <span style={{
                                                fontSize: "9px", color: colors.mutedText, fontWeight: 600,
                                                fontFamily: FONT, background: colors.lightGray,
                                                padding: "2px 7px", borderRadius: "10px", flexShrink: 0,
                                            }}>
                                                + Add
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Quick tags — all unselected domains */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "6px" : "8px" }}>
                            {domains.filter(d => !selectedDomains.includes(d)).map((domain) => (
                                <button key={domain} className="tag-btn" onClick={() => addDomain(domain)} style={{
                                    padding: isMobile ? "6px 11px" : "7px 13px", borderRadius: "6px",
                                    fontSize: isMobile ? "10px" : "11px", fontWeight: 700,
                                    border: "none", background: colors.lightGray, color: colors.textDark,
                                    cursor: "pointer", fontFamily: FONT,
                                }}>
                                    + {domain}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Find Mentors CTA */}
                    <button className="find-btn" onClick={handleFindMentors} style={{
                        width: "100%", padding: isMobile ? "13px" : "15px",
                        background: "#1a1a2e", color: colors.white, border: "none",
                        borderRadius: "10px", fontSize: isMobile ? "14px" : "15px",
                        fontWeight: 700, fontFamily: FONT, letterSpacing: "0.3px",
                    }}>
                        Find Matching Mentors →
                    </button>
                </div>

                {/* ════ RIGHT — animated columns (Desktop) ════ */}
                {isDesktop && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div className="scroll-wrap"><ScrollColumn mentors={col1} direction="up" /></div>
                        <div className="scroll-wrap"><ScrollColumn mentors={col2} direction="down" /></div>
                    </div>
                )}

                {/* ════ Static grid (Mobile / Tablet) ════ */}
                {!isDesktop && (
                    <div style={{ marginTop: "8px" }}>
                        <h3 style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: 700, color: colors.textDark, marginBottom: "16px", fontFamily: FONT }}>
                            Popular Mentors
                        </h3>
                        <MentorGrid mentors={previewMentors.slice(0, isMobile ? 4 : 6)} columns={isMobile ? 2 : 3} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorDiscoveryUI;