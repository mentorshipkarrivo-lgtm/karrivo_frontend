


// import React, { useState, useRef, useEffect } from "react";
// import {
//     ChevronDown,
//     ChevronLeft,
//     ChevronRight,
//     Phone,
//     Send,
//     User,
//     Mail,
//     Headphones,
//     Clock,
//     HelpCircle,
//     MessageCircle,
//     ArrowUpRight,
// } from "lucide-react";

// const PHONE_NUMBER = "+917893467045";
// const WHATSAPP_NUMBER = "917893467045";
// const SUPPORT_EMAIL = "mentorship.karrivo@gmail.com";

// const WhatsAppIcon = ({ size = 20 }) => (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
//         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//     </svg>
// );

// const FAQ_DATA = [
//     { id: "find-mentor", question: "How do I find the right mentor?", answer: "Browse our mentor directory, filter by expertise, industry, and availability. Each mentor profile includes their background, specializations, and mentee reviews. You can also take our matching quiz for personalized recommendations." },
//     { id: "session-cost", question: "What does a mentoring session cost?", answer: "We offer flexible plans starting from free introductory sessions. Premium plans include unlimited messaging, scheduled video calls, and personalized roadmaps. Check our pricing page for current offers." },
//     { id: "first-session", question: "What happens in the first session?", answer: "Your first session is a free 15-minute discovery call where you discuss your goals, challenges, and expectations. Your mentor will suggest a personalized learning path based on your needs." },
//     { id: "cancel-reschedule", question: "Can I cancel or reschedule?", answer: "Yes! You can reschedule up to 4 hours before your session. Cancellations are free if done 24 hours in advance. Check your dashboard for easy rescheduling options." },
//     { id: "become-mentor", question: "How can I become a mentor?", answer: "We're always looking for experienced professionals! Apply through our 'Become a Mentor' page. We review applications within 48 hours and look for 3+ years of industry experience." },
//     { id: "technical-issues", question: "Having technical issues?", answer: "Try clearing your browser cache and cookies first. If the issue persists, reach out to our support team via WhatsApp or call — we typically resolve technical issues within 30 minutes." },
// ];

// /* ─── Style helpers ─── */
// const iconCircle = (bg) => ({
//     width: "36px",
//     height: "36px",
//     borderRadius: "9px",
//     background: bg,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexShrink: 0,
// });

// const contactBtnStyle = (bg) => ({
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "6px",
//     padding: "10px",
//     background: bg,
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "12.5px",
//     fontWeight: 600,
//     cursor: "pointer",
//     transition: "filter 0.15s",
// });

// const listItemStyle = (isLast) => ({
//     width: "100%",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     padding: "12px 14px",
//     background: "#fff",
//     border: "none",
//     borderBottom: isLast ? "none" : "1px solid rgba(0,152,204,0.1)",
//     cursor: "pointer",
//     textAlign: "left",
//     transition: "background 0.15s",
// });

// const hoverBtnIn = (e) => { e.currentTarget.style.filter = "brightness(0.9)"; };
// const hoverBtnOut = (e) => { e.currentTarget.style.filter = "none"; };
// const hoverItemIn = (e) => { e.currentTarget.style.background = "#f0f9ff"; };
// const hoverItemOut = (e) => { e.currentTarget.style.background = "#fff"; };

// /* ─── Contact items config ─── */
// const CONTACT_ITEMS = [
//     { key: "wa", label: "WhatsApp", desc: "Chat with us instantly", bg: "#e8faf1", color: "#25D366", external: true },
//     { key: "call", label: "Call us", desc: "Speak to our team directly", bg: "#e6f5fb", color: "#0098cc", external: true },
//     { key: "email", label: "Email", desc: "Get a detailed response", bg: "#e6f5fb", color: "#0098cc", external: true },
// ];

// const HELP_ITEMS = [
//     { key: "chat", label: "Chat with us", desc: "Start a conversation" },
// ];

// export default function MenteeSupport({ onclose }) {
//     const [view, setView] = useState("home");
//     const [selectedFaq, setSelectedFaq] = useState(null);
//     const [chatMessages, setChatMessages] = useState([]);
//     const [inputMsg, setInputMsg] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const chatEndRef = useRef(null);
//     const inputRef = useRef(null);

//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [chatMessages, isTyping]);

//     useEffect(() => {
//         if (view === "chat" && chatMessages.length === 0) {
//             setChatMessages([{
//                 type: "bot",
//                 text: "Hi there! I'm here to help with your mentorship journey. Ask me anything!",
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             }]);
//         }
//     }, [view]);

//     const handleSendMessage = () => {
//         if (!inputMsg.trim()) return;
//         const text = inputMsg.trim();
//         const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//         setChatMessages((prev) => [...prev, { type: "user", text, time }]);
//         setInputMsg("");
//         setIsTyping(true);
//         setTimeout(() => {
//             setIsTyping(false);
//             setChatMessages((prev) => [...prev, {
//                 type: "bot",
//                 text: generateBotReply(text),
//                 time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             }]);
//         }, 1000);
//     };

//     const generateBotReply = (msg) => {
//         const l = msg.toLowerCase();
//         if (l.includes("mentor") && l.includes("find")) return "You can browse our mentor directory and filter by expertise. Want personalized matching? Reach out to our team via WhatsApp or Call!";
//         if (l.includes("price") || l.includes("cost")) return "Plans start from free introductory sessions. Premium mentoring starts at ₹499/session. Our team can share detailed pricing via WhatsApp.";
//         if (l.includes("cancel") || l.includes("reschedule")) return "You can reschedule up to 4 hours before your session and cancel free within 24 hours via your dashboard.";
//         if (l.includes("hello") || l.includes("hi") || l.includes("hey")) return "Hello! 😊 How can I help you today?";
//         if (l.includes("thank")) return "You're welcome! Happy mentoring! 🎉";
//         return "For detailed help, connect with our team directly via WhatsApp or Call using the options below.";
//     };

//     const openWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help with my mentorship journey.")}`, "_blank");
//     const openCall = () => window.open(`tel:${PHONE_NUMBER}`);
//     const openEmail = () => window.open(`mailto:${SUPPORT_EMAIL}?subject=Mentee Support Request`);

//     const goBack = () => {
//         if (view === "faq-detail") setView("faq");
//         else setView("home");
//     };

//     const handleContactClick = (key) => {
//         if (key === "wa") openWhatsApp();
//         else if (key === "call") openCall();
//         else if (key === "email") openEmail();
//     };

//     const handleHelpClick = (key) => {
//         if (key === "faq") setView("faq");
//         else if (key === "chat") setView("chat");
//     };

//     const getContactIcon = (key, size = 16) => {
//         if (key === "wa") return <WhatsAppIcon size={size} />;
//         if (key === "call") return <Phone size={size} />;
//         if (key === "email") return <Mail size={size} />;
//     };

//     const getHelpIcon = (key, size = 16) => {
//         if (key === "faq") return <HelpCircle size={size} />;
//         if (key === "chat") return <MessageCircle size={size} />;
//     };

//     return (
//         <div className="mentee-support-widget" style={{
//             position: "fixed",
//             bottom: 0,
//             right: 0,
//             width: "100%",
//             height: "100%",
//             zIndex: 9999,
//             fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//             display: "flex",
//             flexDirection: "column",
//             background: "#fff",
//             minHeight: 0,
//             overflow: "hidden",
//         }}>

//             {/* ═══ HEADER ═══ */}
//             <div style={{
//                 background: "#0098cc",
//                 padding: "15px 16px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 flexShrink: 0,
//                 borderBottom: "1px solid rgba(0,120,160,0.25)",
//             }}>
//                 {view !== "home" && (
//                     <button
//                         onClick={goBack}
//                         style={{
//                             background: "rgba(255,255,255,0.18)",
//                             border: "none",
//                             color: "#fff",
//                             cursor: "pointer",
//                             padding: "5px 7px",
//                             display: "flex",
//                             borderRadius: "8px",
//                             lineHeight: 1,
//                         }}
//                     >
//                         <ChevronLeft size={18} />
//                     </button>
//                 )}
//                 <div style={{
//                     width: "34px",
//                     height: "34px",
//                     borderRadius: "9px",
//                     background: "rgba(255,255,255,0.2)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                 }}>
//                     <Headphones size={17} color="#fff" />
//                 </div>
//                 <div style={{ flex: 1 }}>
//                     <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px", lineHeight: 1.2 }}>
//                         Mentor Connect
//                     </div>

//                 </div>
//                 <button
//                     onClick={onclose}
//                     style={{
//                         background: "rgba(255,255,255,0.18)",
//                         border: "none",
//                         color: "#fff",
//                         cursor: "pointer",
//                         padding: "5px 7px",
//                         display: "flex",
//                         borderRadius: "8px",
//                         lineHeight: 1,
//                     }}
//                 >
//                     <ChevronDown size={18} />
//                 </button>
//             </div>

//             {/* ═══ HOME VIEW ═══ */}
//             {view === "home" && (
//                 <div style={{ flex: 1, overflowY: "auto", background: "#fff", minHeight: 0 }}>

//                     {/* Hero strip */}
//                     <div style={{
//                         background: "rgba(0,152,204,0.05)",
//                         borderBottom: "1px solid rgba(0,152,204,0.08)",
//                         padding: "20px 20px 16px",
//                     }}>
//                         <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0098cc", margin: "0 0 4px", letterSpacing: "-0.2px" }}>
//                             Hey there, Mentee! 
//                         </h2>
//                         <p style={{ fontSize: "13px", color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
//                             How can we help you today?
//                         </p>
//                     </div>

//                     {/* Get in touch */}
//                     <div style={{ padding: "16px 16px 0" }}>
//                         <div style={{
//                             fontSize: "10.5px",
//                             fontWeight: 700,
//                             color: "#0098cc",
//                             textTransform: "uppercase",
//                             letterSpacing: "0.7px",
//                             padding: "0 4px 10px",
//                         }}>
//                             Get in touch
//                         </div>
//                         <div style={{
//                             background: "#fff",
//                             border: "1px solid rgba(0,152,204,0.18)",
//                             borderRadius: "12px",
//                             overflow: "hidden",
//                         }}>
//                             {CONTACT_ITEMS.map((item, i) => (
//                                 <button
//                                     key={item.key}
//                                     onClick={() => handleContactClick(item.key)}
//                                     className="mentee-list-item"
//                                     style={listItemStyle(i === CONTACT_ITEMS.length - 1)}
//                                     onMouseEnter={hoverItemIn}
//                                     onMouseLeave={hoverItemOut}
//                                 >
//                                     <div style={iconCircle(item.bg)}>
//                                         <span style={{ color: item.color, display: "flex" }}>
//                                             {getContactIcon(item.key)}
//                                         </span>
//                                     </div>
//                                     <div style={{ flex: 1, minWidth: 0 }}>
//                                         <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{item.label}</div>
//                                         <div style={{ fontSize: "11.5px", color: "#9ca3af", marginTop: "1px" }}>{item.desc}</div>
//                                     </div>
//                                     {item.external && <ArrowUpRight size={14} color="#d1d5db" />}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Help */}
//                     <div style={{ padding: "14px 16px 0" }}>
//                         <div style={{
//                             fontSize: "10.5px",
//                             fontWeight: 700,
//                             color: "#0098cc",
//                             textTransform: "uppercase",
//                             letterSpacing: "0.7px",
//                             padding: "0 4px 10px",
//                         }}>
//                             Help
//                         </div>
//                         <div style={{
//                             background: "#fff",
//                             border: "1px solid rgba(0,152,204,0.18)",
//                             borderRadius: "12px",
//                             overflow: "hidden",
//                         }}>
//                             {HELP_ITEMS.map((item, i) => (
//                                 <button
//                                     key={item.key}
//                                     onClick={() => handleHelpClick(item.key)}
//                                     className="mentee-list-item"
//                                     style={listItemStyle(i === HELP_ITEMS.length - 1)}
//                                     onMouseEnter={hoverItemIn}
//                                     onMouseLeave={hoverItemOut}
//                                 >
//                                     <div style={iconCircle("#e6f5fb")}>
//                                         <span style={{ color: "#0098cc", display: "flex" }}>
//                                             {getHelpIcon(item.key)}
//                                         </span>
//                                     </div>
//                                     <div style={{ flex: 1, minWidth: 0 }}>
//                                         <div style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>{item.label}</div>
//                                         <div style={{ fontSize: "11.5px", color: "#9ca3af", marginTop: "1px" }}>{item.desc}</div>
//                                     </div>
//                                     <ChevronRight size={14} color="#d1d5db" />
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div style={{ padding: "14px 20px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
//                         <Clock size={13} color="#d1d5db" />
//                         <span style={{ fontSize: "11.5px", color: "#d1d5db" }}>Mon – Sat, 9 AM – 8 PM IST</span>
//                     </div>
//                 </div>
//             )}

//             {/* ═══ FAQ LIST ═══ */}
//             {view === "faq" && (
//                 <div style={{ flex: 1, overflowY: "auto", background: "#fff", minHeight: 0 }}>
//                     <div style={{
//                         background: "rgba(0,152,204,0.05)",
//                         borderBottom: "1px solid rgba(0,152,204,0.08)",
//                         padding: "20px 20px 14px",
//                     }}>
//                         <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0098cc", margin: "0 0 2px" }}>FAQs</h3>
//                         <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>Quick answers to common questions</p>
//                     </div>
//                     <div style={{ padding: "14px 16px 16px" }}>
//                         <div style={{
//                             background: "#fff",
//                             border: "1px solid rgba(0,152,204,0.18)",
//                             borderRadius: "12px",
//                             overflow: "hidden",
//                         }}>
//                             {FAQ_DATA.map((faq, i) => (
//                                 <button
//                                     key={faq.id}
//                                     onClick={() => { setSelectedFaq(faq); setView("faq-detail"); }}
//                                     className="mentee-list-item"
//                                     style={listItemStyle(i === FAQ_DATA.length - 1)}
//                                     onMouseEnter={hoverItemIn}
//                                     onMouseLeave={hoverItemOut}
//                                 >
//                                     <div style={iconCircle("#e6f5fb")}>
//                                         <HelpCircle size={15} color="#0098cc" />
//                                     </div>
//                                     <span style={{ fontSize: "12.5px", fontWeight: 500, color: "#333", lineHeight: 1.4, flex: 1 }}>
//                                         {faq.question}
//                                     </span>
//                                     <ChevronRight size={14} color="#d1d5db" style={{ flexShrink: 0 }} />
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ═══ FAQ DETAIL ═══ */}
//             {view === "faq-detail" && selectedFaq && (
//                 <div style={{ flex: 1, overflowY: "auto", background: "#fff", minHeight: 0 }}>
//                     <div style={{ padding: "22px 20px" }}>
//                         <div style={{
//                             display: "flex",
//                             alignItems: "flex-start",
//                             gap: "10px",
//                             marginBottom: "14px",
//                         }}>
//                             <div style={iconCircle("#e6f5fb")}>
//                                 <HelpCircle size={15} color="#0098cc" />
//                             </div>
//                             <h3 style={{ fontSize: "14.5px", fontWeight: 700, color: "#111", margin: 0, lineHeight: 1.45 }}>
//                                 {selectedFaq.question}
//                             </h3>
//                         </div>
//                         <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.75, margin: "0 0 24px" }}>
//                             {selectedFaq.answer}
//                         </p>
//                         <div style={{
//                             background: "rgba(0,152,204,0.04)",
//                             border: "1px solid rgba(0,152,204,0.12)",
//                             borderRadius: "10px",
//                             padding: "14px",
//                         }}>
//                             <p style={{ fontSize: "12px", fontWeight: 600, color: "#0098cc", margin: "0 0 10px" }}>
//                                 Still need help?
//                             </p>
//                             <div style={{ display: "flex", gap: "8px" }}>
//                                 <button
//                                     onClick={openWhatsApp}
//                                     style={contactBtnStyle("#25D366")}
//                                     onMouseEnter={hoverBtnIn}
//                                     onMouseLeave={hoverBtnOut}
//                                 >
//                                     <WhatsAppIcon size={15} /> WhatsApp
//                                 </button>
//                                 <button
//                                     onClick={openCall}
//                                     style={contactBtnStyle("#0098cc")}
//                                     onMouseEnter={hoverBtnIn}
//                                     onMouseLeave={hoverBtnOut}
//                                 >
//                                     <Phone size={15} /> Call
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ═══ CHAT VIEW ═══ */}
//             {view === "chat" && (
//                 <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc", minHeight: 0 }}>

//                     {/* Messages */}
//                     <div style={{ flex: 1, overflowY: "auto", padding: "16px", minHeight: 0 }}>
//                         {chatMessages.map((msg, i) => (
//                             <div
//                                 key={i}
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
//                                     marginBottom: "10px",
//                                     gap: "8px",
//                                     alignItems: "flex-end",
//                                 }}
//                             >
//                                 {msg.type === "bot" && (
//                                     <div style={{
//                                         width: "28px",
//                                         height: "28px",
//                                         borderRadius: "50%",
//                                         background: "#0098cc",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         flexShrink: 0,
//                                     }}>
//                                         <Headphones size={13} color="#fff" />
//                                     </div>
//                                 )}
//                                 <div style={{ maxWidth: "76%" }}>
//                                     <div style={{
//                                         padding: "10px 14px",
//                                         borderRadius: msg.type === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
//                                         background: msg.type === "user" ? "#0098cc" : "#fff",
//                                         color: msg.type === "user" ? "#fff" : "#333",
//                                         fontSize: "13px",
//                                         lineHeight: 1.55,
//                                         border: msg.type === "bot" ? "1px solid rgba(0,152,204,0.15)" : "none",
//                                         boxShadow: msg.type === "bot" ? "0 1px 3px rgba(0,152,204,0.07)" : "none",
//                                     }}>
//                                         {msg.text}
//                                     </div>
//                                     <div style={{
//                                         fontSize: "10px",
//                                         color: "#d1d5db",
//                                         marginTop: "3px",
//                                         textAlign: msg.type === "user" ? "right" : "left",
//                                         padding: "0 4px",
//                                     }}>
//                                         {msg.time}
//                                     </div>
//                                 </div>
//                                 {msg.type === "user" && (
//                                     <div style={{
//                                         width: "28px",
//                                         height: "28px",
//                                         borderRadius: "50%",
//                                         background: "rgba(0,152,204,0.1)",
//                                         border: "1.5px solid rgba(0,152,204,0.2)",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         flexShrink: 0,
//                                     }}>
//                                         <User size={13} color="#0098cc" />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}

//                         {/* Typing indicator */}
//                         {isTyping && (
//                             <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", marginBottom: "10px" }}>
//                                 <div style={{
//                                     width: "28px",
//                                     height: "28px",
//                                     borderRadius: "50%",
//                                     background: "#0098cc",
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     flexShrink: 0,
//                                 }}>
//                                     <Headphones size={13} color="#fff" />
//                                 </div>
//                                 <div style={{
//                                     padding: "11px 15px",
//                                     background: "#fff",
//                                     border: "1px solid rgba(0,152,204,0.15)",
//                                     borderRadius: "14px 14px 14px 3px",
//                                     display: "flex",
//                                     gap: "4px",
//                                     alignItems: "center",
//                                 }}>
//                                     {[0, 1, 2].map((j) => (
//                                         <div key={j} style={{
//                                             width: "5px",
//                                             height: "5px",
//                                             borderRadius: "50%",
//                                             background: "#0098cc",
//                                             opacity: 0.5,
//                                             animation: "dotBounce 1.4s infinite ease-in-out",
//                                             animationDelay: `${j * 0.16}s`,
//                                         }} />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         <div ref={chatEndRef} />
//                     </div>

//                     {/* Quick contact strip */}
//                     <div style={{
//                         padding: "6px 12px",
//                         background: "#fff",
//                         borderTop: "1px solid rgba(0,152,204,0.1)",
//                         display: "flex",
//                         gap: "8px",
//                         flexShrink: 0,
//                     }}>
//                         <button
//                             onClick={openWhatsApp}
//                             style={{ ...contactBtnStyle("#25D366"), fontSize: "11px", padding: "7px 10px", borderRadius: "7px" }}
//                             onMouseEnter={hoverBtnIn}
//                             onMouseLeave={hoverBtnOut}
//                         >
//                             <WhatsAppIcon size={13} /> WhatsApp
//                         </button>
//                         <button
//                             onClick={openCall}
//                             style={{ ...contactBtnStyle("#0098cc"), fontSize: "11px", padding: "7px 10px", borderRadius: "7px" }}
//                             onMouseEnter={hoverBtnIn}
//                             onMouseLeave={hoverBtnOut}
//                         >
//                             <Phone size={13} /> Call Now
//                         </button>
//                     </div>

//                     {/* Input bar */}
//                     <div style={{
//                         padding: "8px 12px 10px",
//                         background: "#fff",
//                         borderTop: "1px solid rgba(0,152,204,0.1)",
//                         display: "flex",
//                         gap: "8px",
//                         alignItems: "center",
//                         flexShrink: 0,
//                     }}>
//                         <input
//                             ref={inputRef}
//                             value={inputMsg}
//                             onChange={(e) => setInputMsg(e.target.value)}
//                             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                             placeholder="Type a message..."
//                             style={{
//                                 flex: 1,
//                                 padding: "9px 13px",
//                                 border: "1.5px solid rgba(0,152,204,0.22)",
//                                 borderRadius: "9px",
//                                 fontSize: "13px",
//                                 outline: "none",
//                                 background: "#fafcfe",
//                                 color: "#111",
//                                 transition: "border-color 0.15s",
//                             }}
//                             onFocus={(e) => (e.target.style.borderColor = "#0098cc")}
//                             onBlur={(e) => (e.target.style.borderColor = "rgba(0,152,204,0.22)")}
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             disabled={!inputMsg.trim()}
//                             style={{
//                                 width: "38px",
//                                 height: "38px",
//                                 borderRadius: "9px",
//                                 background: inputMsg.trim() ? "#0098cc" : "rgba(0,152,204,0.1)",
//                                 color: inputMsg.trim() ? "#fff" : "rgba(0,152,204,0.4)",
//                                 border: "none",
//                                 cursor: inputMsg.trim() ? "pointer" : "default",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 flexShrink: 0,
//                                 transition: "background 0.15s",
//                             }}
//                             onMouseEnter={(e) => { if (inputMsg.trim()) e.currentTarget.style.background = "#007aaa"; }}
//                             onMouseLeave={(e) => { if (inputMsg.trim()) e.currentTarget.style.background = "#0098cc"; }}
//                         >
//                             <Send size={15} />
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* ═══ FOOTER ═══ */}
//             {view !== "chat" && (
//                 <div style={{
//                     padding: "8px 16px",
//                     borderTop: "1px solid rgba(0,152,204,0.1)",
//                     textAlign: "center",
//                     flexShrink: 0,
//                     background: "#fff",
//                 }}>
//                     <p style={{ fontSize: "10.5px", color: "#0098cc", margin: 0, fontWeight: 500, opacity: 0.7 }}>
//                         Powered by Mentor Connect
//                     </p>
//                 </div>
//             )}

//             <style>{`
//         @keyframes dotBounce {
//           0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
//           40% { transform: scale(1); opacity: 1; }
//         }
//         @keyframes widgetOpen {
//           from { opacity: 0; transform: translateY(12px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .mentee-support-widget {
//           animation: widgetOpen 0.22s ease-out forwards;
//         }
//         .mentee-support-widget * { box-sizing: border-box; }
//         .mentee-support-widget ::-webkit-scrollbar { width: 3px; }
//         .mentee-support-widget ::-webkit-scrollbar-thumb {
//           background: rgba(0,152,204,0.25);
//           border-radius: 3px;
//         }
//         .mentee-list-item:hover  { background: #f0f9ff !important; }
//         .mentee-list-item:active { background: #e0f4fb !important; }
//         @media (min-width: 768px) {
//           .mentee-support-widget {
//             bottom: 96px !important;
//             right: 16px !important;
//             width: 360px !important;
//             height: 560px !important;
//             max-height: 82vh !important;
//             border-radius: 16px !important;
//             overflow: hidden !important;
//             border: 1px solid rgba(0,152,204,0.2) !important;
//             box-shadow: 0 8px 32px rgba(0,152,204,0.12), 0 2px 8px rgba(0,0,0,0.06) !important;
//           }
//         }
//       `}</style>
//         </div>
//     );
// }


import React, { useState, useRef, useEffect } from "react";
import {
    ChevronDown, ChevronLeft, ChevronRight, Phone, Send,
    User, Mail, Headphones, Clock, HelpCircle, MessageCircle, ArrowUpRight,
} from "lucide-react";

const PHONE_NUMBER = "+917893467045";
const WHATSAPP_NUMBER = "917893467045";
const SUPPORT_EMAIL = "mentorship.karrivo@gmail.com";

const WhatsAppIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const FAQ_DATA = [
    { id: "find-mentor", question: "How do I find the right mentor?", answer: "Browse our mentor directory, filter by expertise, industry, and availability. Each mentor profile includes their background, specializations, and mentee reviews. You can also take our matching quiz for personalized recommendations." },
    { id: "session-cost", question: "What does a mentoring session cost?", answer: "We offer flexible plans starting from free introductory sessions. Premium plans include unlimited messaging, scheduled video calls, and personalized roadmaps. Check our pricing page for current offers." },
    { id: "first-session", question: "What happens in the first session?", answer: "Your first session is a free 15-minute discovery call where you discuss your goals, challenges, and expectations. Your mentor will suggest a personalized learning path based on your needs." },
    { id: "cancel-reschedule", question: "Can I cancel or reschedule?", answer: "Yes! You can reschedule up to 4 hours before your session. Cancellations are free if done 24 hours in advance. Check your dashboard for easy rescheduling options." },
    { id: "become-mentor", question: "How can I become a mentor?", answer: "We're always looking for experienced professionals! Apply through our 'Become a Mentor' page. We review applications within 48 hours and look for 3+ years of industry experience." },
    { id: "technical-issues", question: "Having technical issues?", answer: "Try clearing your browser cache and cookies first. If the issue persists, reach out via WhatsApp or call — we typically resolve technical issues within 30 minutes." },
];

const CONTACT_ITEMS = [
    { key: "wa", label: "WhatsApp", desc: "Chat with us instantly", iconBg: "bg-emerald-50", iconColor: "text-emerald-500" },
    { key: "call", label: "Call us", desc: "Speak to our team directly", iconBg: "bg-sky-50", iconColor: "text-[#0098cc]" },
    { key: "email", label: "Email", desc: "Get a detailed response", iconBg: "bg-sky-50", iconColor: "text-[#0098cc]" },
];

const HELP_ITEMS = [
    { key: "chat", label: "Chat with us", desc: "Start a conversation" },
];

/* ── reusable row ── */
function ListRow({ onClick, iconBg, iconColor, icon, label, desc, right, isLast }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-sky-50 active:bg-sky-100 transition-colors text-left${isLast ? "" : " border-b border-sky-100"}`}
        >
            <span className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center flex-shrink-0`}>
                {icon}
            </span>
            <span className="flex-1 min-w-0">
                <span className="block text-[13px] font-semibold text-gray-900 leading-tight">{label}</span>
                <span className="block text-[11.5px] text-gray-400 mt-0.5">{desc}</span>
            </span>
            <span className="text-gray-300 flex-shrink-0">{right}</span>
        </button>
    );
}

/* ── action button ── */
function ActionBtn({ onClick, children, green }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75 ${green ? "bg-emerald-500" : "bg-[#1a1a2e]"}`}
        >
            {children}
        </button>
    );
}

export default function MenteeSupport({ onclose }) {
    const [view, setView] = useState("home");
    const [selectedFaq, setSelectedFaq] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages, isTyping]);

    useEffect(() => {
        if (view === "chat" && chatMessages.length === 0) {
            setChatMessages([{
                type: "bot",
                text: "Hi there! 👋 I'm here to help with your mentorship journey. Ask me anything!",
                time: now(),
            }]);
        }
    }, [view]);

    const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const handleSend = () => {
        if (!inputMsg.trim()) return;
        const text = inputMsg.trim();
        setChatMessages(p => [...p, { type: "user", text, time: now() }]);
        setInputMsg("");
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setChatMessages(p => [...p, { type: "bot", text: botReply(text), time: now() }]);
        }, 1000);
    };

    const botReply = (msg) => {
        const l = msg.toLowerCase();
        if (l.includes("mentor") && l.includes("find")) return "Browse our mentor directory and filter by expertise. Want personalized matching? Reach out via WhatsApp or Call!";
        if (l.includes("price") || l.includes("cost")) return "Plans start from free intro sessions. Premium starts at ₹499/session. Our team can share detailed pricing via WhatsApp.";
        if (l.includes("cancel") || l.includes("reschedule")) return "Reschedule up to 4 hours before your session, cancel free within 24 hours — all from your dashboard.";
        if (l.match(/hello|hi|hey/)) return "Hello! 😊 How can I help you today?";
        if (l.includes("thank")) return "You're welcome! Happy mentoring! 🎉";
        return "For detailed help, connect with our team directly via WhatsApp or Call using the buttons below.";
    };

    const openWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help with my mentorship journey.")}`, "_blank");
    const openCall = () => window.open(`tel:${PHONE_NUMBER}`);
    const openEmail = () => window.open(`mailto:${SUPPORT_EMAIL}?subject=Mentee Support Request`);

    const goBack = () => view === "faq-detail" ? setView("faq") : setView("home");

    const contactAction = { wa: openWhatsApp, call: openCall, email: openEmail };
    const contactIcon = { wa: <WhatsAppIcon size={16} />, call: <Phone size={15} />, email: <Mail size={15} /> };
    const helpIcon = { chat: <MessageCircle size={15} /> };

    return (
        <div className="fixed bottom-0 right-0 w-full h-full z-[9999] flex flex-col bg-white overflow-hidden
                    md:bottom-24 md:right-4 md:w-[360px] md:h-[560px] md:max-h-[82vh]
                    md:rounded-2xl md:border md:border-sky-200 md:shadow-2xl
                    font-sans animate-[fadeUp_0.22s_ease-out_both]">

            {/* ── HEADER ── */}
            <div className="bg-[#1a1a2e] px-4 py-3.5 flex items-center gap-2.5 flex-shrink-0">
                {view !== "home" && (
                    <button onClick={goBack} className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-1.5 flex transition-colors">
                        <ChevronLeft size={17} />
                    </button>
                )}
                <span className="w-8 h-8 rounded-xl bg-[#0098cc]/20 flex items-center justify-center flex-shrink-0">
                    <Headphones size={16} className="text-[#0098cc]" />
                </span>
                <span className="flex-1">
                    <span className="block text-white font-bold text-sm leading-tight tracking-tight">Mentor Connect</span>
                    <span className="block text-sky-300/70 text-[10.5px]">Support</span>
                </span>
                <button onClick={onclose} className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-1.5 flex transition-colors">
                    <ChevronDown size={17} />
                </button>
            </div>

            {/* ── HOME ── */}
            {view === "home" && (
                <div className="flex-1 overflow-y-auto min-h-0 bg-white no-scrollbar">

                    {/* Hero */}
                    <div className="bg-gradient-to-br from-[#0098cc]/8 to-sky-50 border-b border-sky-100 px-5 py-5">
                        <h2 className="text-[17px] font-bold text-[#1a1a2e] mb-1 tracking-tight">Hey there, Mentee! 👋</h2>
                        <p className="text-[13px] text-gray-500 leading-relaxed">How can we help you today?</p>
                    </div>

                    {/* Get in touch */}
                    <div className="px-4 pt-4">
                        <p className="text-[10px] font-bold text-[#0098cc] uppercase tracking-widest px-1 pb-2.5">Get in touch</p>
                        <div className="bg-white border border-sky-100 rounded-xl overflow-hidden shadow-sm">
                            {CONTACT_ITEMS.map((item, i) => (
                                <ListRow
                                    key={item.key}
                                    onClick={() => contactAction[item.key]()}
                                    iconBg={item.iconBg}
                                    iconColor={item.iconColor}
                                    icon={contactIcon[item.key]}
                                    label={item.label}
                                    desc={item.desc}
                                    right={<ArrowUpRight size={13} />}
                                    isLast={i === CONTACT_ITEMS.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Help */}
                    <div className="px-4 pt-3.5">
                        <p className="text-[10px] font-bold text-[#0098cc] uppercase tracking-widest px-1 pb-2.5">Help</p>
                        <div className="bg-white border border-sky-100 rounded-xl overflow-hidden shadow-sm">
                            {HELP_ITEMS.map((item, i) => (
                                <ListRow
                                    key={item.key}
                                    onClick={() => item.key === "chat" ? setView("chat") : setView("faq")}
                                    iconBg="bg-sky-50"
                                    iconColor="text-[#0098cc]"
                                    icon={helpIcon[item.key]}
                                    label={item.label}
                                    desc={item.desc}
                                    right={<ChevronRight size={13} />}
                                    isLast={i === HELP_ITEMS.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-5 py-4 mt-1">
                        <Clock size={12} className="text-gray-300" />
                        <span className="text-[11px] text-gray-300">Mon – Sat, 9 AM – 8 PM IST</span>
                    </div>
                </div>
            )}

            {/* ── FAQ LIST ── */}
            {view === "faq" && (
                <div className="flex-1 min-h-0 overflow-y-auto bg-white no-scrollbar">

                    <div className="p-4">
                        <p className="mb-3 text-[11.5px] text-gray-400">
                            Quick answers to common questions
                        </p>

                        <div className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
                            {FAQ_DATA.map((faq, i) => (
                                <ListRow
                                    key={faq.id}
                                    onClick={() => {
                                        setSelectedFaq(faq);
                                        setView("faq-detail");
                                    }}
                                    iconBg="bg-sky-50"
                                    iconColor="text-[#0098cc]"
                                    icon={<HelpCircle size={14} />}
                                    label={faq.question}
                                    desc=""
                                    right={<ChevronRight size={13} />}
                                    isLast={i === FAQ_DATA.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            )}

            {/* ── FAQ DETAIL ── */}
            {view === "faq-detail" && selectedFaq && (
                <div className="flex-1 overflow-y-auto min-h-0 bg-white no-scrollbar">
                    <div className="p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <span className="w-9 h-9 rounded-xl bg-sky-50 text-[#0098cc] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <HelpCircle size={15} />
                            </span>
                            <h3 className="text-[14px] font-bold text-[#1a1a2e] leading-snug">{selectedFaq.question}</h3>
                        </div>
                        <p className="text-[13px] text-gray-600 leading-relaxed mb-6">{selectedFaq.answer}</p>

                        {/* Still need help card */}
                        <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                            <p className="text-[11.5px] font-bold text-[#0098cc] mb-3 uppercase tracking-wide">Still need help?</p>
                            <div className="flex gap-2">
                                <ActionBtn onClick={openWhatsApp} green>
                                    <WhatsAppIcon size={14} /> WhatsApp
                                </ActionBtn>
                                <ActionBtn onClick={openCall}>
                                    <Phone size={14} /> Call Now
                                </ActionBtn>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── CHAT ── */}
            {view === "chat" && (
                <div className="flex-1 flex flex-col bg-slate-50 min-h-0">

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 no-scrollbar">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`flex gap-2 items-end ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                                {/* Avatar */}
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === "bot"
                                        ? "bg-[#1a1a2e]"
                                        : "bg-sky-100 border border-sky-200"
                                    }`}>
                                    {msg.type === "bot"
                                        ? <Headphones size={12} className="text-[#0098cc]" />
                                        : <User size={12} className="text-[#0098cc]" />}
                                </span>
                                <div className={`max-w-[76%] ${msg.type === "user" ? "items-end" : "items-start"} flex flex-col`}>
                                    <div className={`px-3.5 py-2.5 text-[13px] leading-relaxed ${msg.type === "user"
                                            ? "bg-[#1a1a2e] text-white rounded-2xl rounded-br-sm"
                                            : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-sky-100 shadow-sm"
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <span className={`text-[10px] text-gray-300 mt-1 px-1 ${msg.type === "user" ? "text-right" : ""}`}>{msg.time}</span>
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2 items-end">
                                <span className="w-7 h-7 rounded-full bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                                    <Headphones size={12} className="text-[#0098cc]" />
                                </span>
                                <div className="bg-white border border-sky-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                                    {[0, 1, 2].map(j => (
                                        <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#0098cc] opacity-50"
                                            style={{ animation: "dotBounce 1.4s infinite ease-in-out", animationDelay: `${j * 0.16}s` }} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Quick contact */}
                    <div className="px-3 py-2 bg-white border-t border-sky-100 flex gap-2 flex-shrink-0">
                        <ActionBtn onClick={openWhatsApp} green>
                            <WhatsAppIcon size={13} /> WhatsApp
                        </ActionBtn>
                        <ActionBtn onClick={openCall}>
                            <Phone size={13} /> Call Now
                        </ActionBtn>
                    </div>

                    {/* Input */}
                    <div className="px-3 pb-3 pt-2 bg-white border-t border-sky-100 flex gap-2 items-center flex-shrink-0">
                        <input
                            ref={inputRef}
                            value={inputMsg}
                            onChange={e => setInputMsg(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-3.5 py-2.5 border border-sky-200 focus:border-[#0098cc] focus:outline-none
                         rounded-xl text-[13px] bg-slate-50 text-gray-800 placeholder-gray-400 transition-colors"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputMsg.trim()}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
                          ${inputMsg.trim()
                                    ? "bg-[#1a1a2e] text-white hover:bg-[#0d0d1e] active:scale-95 cursor-pointer"
                                    : "bg-sky-100 text-sky-300 cursor-default"}`}
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── FOOTER ── */}
            {view !== "chat" && (
                <div className="py-2.5 px-4 border-t border-sky-100 text-center flex-shrink-0 bg-white">
                    <p className="text-[10px] text-[#0098cc]/60 font-medium tracking-wide">Powered by Mentor Connect</p>
                </div>
            )}

            {/* keyframes injected minimally — only what Tailwind can't provide */}
            <style>{`
        @keyframes dotBounce{0%,80%,100%{transform:scale(0);opacity:.3}40%{transform:scale(1);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .no-scrollbar{scrollbar-width:none;-ms-overflow-style:none;}
        .no-scrollbar::-webkit-scrollbar{display:none;}
      `}</style>
        </div>
    );
}














