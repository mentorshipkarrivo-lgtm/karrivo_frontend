// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
// import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
// import {
//     AlertTriangle, Inbox, CalendarClock, CheckCircle2,
//     Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
// } from "lucide-react";

// // ── Color tokens ──────────────────────────────────────────────────────────────
// const C = {
//     dark: "#1a1a2e",
//     blue: "#0091c3",
//     white: "#ffffff",
//     border: "#e2e8f0",
//     muted: "#94a3b8",
//     text: "#1a1a2e",
//     sub: "#475569",
//     bg: "#ffffff",
//     rowHov: "#f8fafc",
// };

// const FONT = "'DM Sans', 'Segoe UI', sans-serif";

// // ── Global CSS ────────────────────────────────────────────────────────────────
// const GLOBAL_CSS = `
//   *, *::before, *::after { box-sizing: border-box; }
//   body { margin: 0; }
//   ::-webkit-scrollbar { width: 0; height: 0; }
//   * { scrollbar-width: none; -ms-overflow-style: none; }
//   @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
//   @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.35} }
//   .sub-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
//   .sub-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
//   .pay-btn:hover  { opacity: 0.88; transform: scale(1.02); }
// `;

// // ── Helpers ───────────────────────────────────────────────────────────────────
// const fmt = (iso) =>
//     iso
//         ? new Date(iso).toLocaleDateString("en-IN", {
//             day: "2-digit", month: "short", year: "numeric",
//         })
//         : "—";

// const planLabel = (t) =>
// ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
//     t?.replace(/_/g, " ") || "—");

// // ── Status badge ──────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//     const map = {
//         active: { color: "#16a34a", dot: "#16a34a", label: "Active" },
//         expired: { color: "#dc2626", dot: "#dc2626", label: "Expired" },
//         onprocess: { color: C.blue, dot: C.blue, label: "On Process" },
//         pending: { color: C.text, dot: C.muted, label: "Pending" },
//     };
//     const m = map[status] ?? { color: C.muted, dot: C.muted, label: status || "—" };
//     return (
//         <span style={{
//             display: "inline-flex", alignItems: "center", gap: 5,
//             fontSize: 11, fontWeight: 700, fontFamily: FONT,
//             color: m.color,
//         }}>
//             <span style={{
//                 width: 6, height: 6, borderRadius: "50%",
//                 background: m.dot, flexShrink: 0,
//             }} />
//             {m.label}
//         </span>
//     );
// };

// // ── Payment status label ──────────────────────────────────────────────────────
// const PaymentLabel = ({ done, status }) => {
//     if (done) return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}><CheckCircle2 size={13} />Paid</span>;
//     if (status === "onprocess") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.blue, fontFamily: FONT }}><Clock size={13} />Processing</span>;
//     return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: FONT }}><Clock size={13} />Pending</span>;
// };

// // ── Subscription Card ─────────────────────────────────────────────────────────
// const SubscriptionCard = ({ sub, i, onView, onPay }) => {
//     const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

//     return (
//         <div
//             className="sub-card"
//             style={{
//                 background: C.white,
//                 borderRadius: 12,
//                 border: `1px solid ${C.border}`,
//                 overflow: "hidden",
//                 display: "flex",
//                 flexDirection: "column",
//                 fontFamily: FONT,
//                 animationDelay: `${i * 70}ms`,
//             }}
//         >
//             {/* Top accent */}
//             <div style={{ height: 3, background: C.dark }} />

//             <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>

//                 {/* Pending payment banner */}
//                 {sub.payment_status === "pending" && (
//                     <div style={{
//                         display: "flex", alignItems: "center",
//                         justifyContent: "space-between", gap: 10,
//                         flexWrap: "wrap",
//                         border: `1px solid ${C.border}`,
//                         borderRadius: 10, padding: "10px 12px",
//                         background: "#fafbfc",
//                     }}>
//                         <span style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             fontSize: 12, fontWeight: 600, color: C.text, fontFamily: FONT,
//                         }}>
//                             <AlertCircle size={13} style={{ color: C.blue }} />
//                             Payment Incomplete
//                         </span>
//                         <button
//                             className="pay-btn"
//                             onClick={() => onPay(sub, mentor)}
//                             style={{
//                                 background: C.dark, color: C.white,
//                                 border: "none", borderRadius: 8,
//                                 padding: "7px 14px", fontSize: 12,
//                                 fontWeight: 700, cursor: "pointer",
//                                 fontFamily: FONT, transition: "all 0.2s",
//                                 whiteSpace: "nowrap",
//                             }}
//                         >
//                             Pay Now
//                         </button>
//                     </div>
//                 )}

//                 {/* Icon + status row */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                     <div style={{
//                         width: 36, height: 36, borderRadius: 8,
//                         background: C.dark,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         flexShrink: 0,
//                     }}>
//                         <CreditCard size={16} style={{ color: C.white }} />
//                     </div>
//                     <StatusBadge status={sub.status} />
//                 </div>

//                 {/* Amount */}
//                 <div>
//                     <p style={{
//                         fontSize: 9, fontWeight: 700, color: C.muted,
//                         letterSpacing: "0.1em",
//                         margin: "0 0 3px", fontFamily: FONT,
//                     }}>
//                         Plan Amount
//                     </p>
//                     <p style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0, fontFamily: FONT }}>
//                         ₹{sub.amount?.toLocaleString("en-IN")}
//                     </p>
//                 </div>

//                 {/* Meta chips */}
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
//                     {[
//                         ["Plan", planLabel(sub.plan_type)],
//                         ["Sessions", sub.total_sessions],
//                         ["Expires", fmt(sub.effective_end_date)],
//                     ].map(([lbl, val]) => (
//                         <div key={lbl} style={{
//                             background: "#f8fafc", borderRadius: 8,
//                             padding: "8px 10px", border: `1px solid ${C.border}`,
//                         }}>
//                             <p style={{
//                                 fontSize: 8, fontWeight: 700, color: C.muted,
//                                 letterSpacing: "0.08em",
//                                 margin: "0 0 2px", fontFamily: FONT,
//                             }}>{lbl}</p>
//                             <p style={{
//                                 fontSize: 11, fontWeight: 700, color: C.text,
//                                 margin: 0, wordBreak: "break-word", fontFamily: FONT,
//                             }}>{val}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Extension badge */}
//                 {sub.is_extended && (
//                     <div style={{
//                         display: "flex", alignItems: "center", gap: 8,
//                         background: "#f0fdf4", border: "1px solid #bbf7d0",
//                         borderRadius: 8, padding: "8px 12px",
//                     }}>
//                         <CalendarClock size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
//                         <span style={{ fontSize: 12, fontWeight: 600, color: "#15803d", fontFamily: FONT }}>
//                             Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
//                         </span>
//                     </div>
//                 )}

//                 {/* Divider */}
//                 <div style={{ borderTop: `1px solid ${C.border}`, marginTop: "auto" }} />

//                 {/* Bottom row */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
//                     <PaymentLabel done={sub.payment_done} status={sub.payment_status} />
//                     <button
//                         className="pay-btn"
//                         onClick={() => onView(sub, mentor)}
//                         style={{
//                             background: C.dark, color: C.white,
//                             border: "none", borderRadius: 8,
//                             padding: "7px 16px", fontSize: 12,
//                             fontWeight: 700, cursor: "pointer",
//                             fontFamily: FONT, transition: "all 0.2s",
//                         }}
//                     >
//                         View Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ── Skeleton Card ─────────────────────────────────────────────────────────────
// const SkeletonCard = () => (
//     <div style={{
//         borderRadius: 12, border: `1px solid ${C.border}`,
//         overflow: "hidden", background: C.white,
//     }}>
//         <div style={{ height: 3, background: C.border }} />
//         <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
//             {[80, 120, 60, 40].map((w, i) => (
//                 <div key={i} style={{
//                     height: i === 1 ? 28 : 12, borderRadius: 6,
//                     background: "#f1f5f9", width: `${w}%`,
//                     animation: "pulse 1.5s ease-in-out infinite",
//                 }} />
//             ))}
//         </div>
//     </div>
// );

// // ── Main Component ────────────────────────────────────────────────────────────
// const Subscriptionplan = () => {
//     const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
//     const { data: subs = [], isLoading, isError, error } =
//         useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

//     const [selected, setSelected] = useState(null);
//     const navigate = useNavigate();
//     console.log(selected, '12w3er')

//     const handleCompletePayment = (sub, mentor) => {
//         const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//         const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };
//         console.log(sub,"subwder")
//         navigate("/payment", {
//             state: {
//                 subscription_id: sub._id,
//                 mentorId: sub.mentor_id,
//                 mentorName: mentor?.fullName,
//                 mentorRole: mentor?.currentRole || "",
//                 menteeId: sub.mentee_id,
//                 menteeName: userData.name,
//                 planMonths: planMonthsMap[sub.plan_type],
//                 totalSessions: sub.total_sessions,
//                 paymentType: "subcription",
//                 basePrice: sub.amount,
//                 createdBy: sub.mentee_id,
//             },
//         });
//     };

//     const handleView = (sub, mentor) => {
//         setSelected({
//             ...sub,
//             mentorName: mentor?.fullName || "",
//             mentorRole: mentor?.currentRole || "",
//         });
//     };

//     return (
//         <>
//             <style>{GLOBAL_CSS}</style>

//             <div style={{
//                 minHeight: "100vh",
//                 background: C.bg,
//                 padding: "clamp(16px, 4vw, 28px)",
//                 fontFamily: FONT,
//             }}>
//                 <div style={{ maxWidth: 1000, margin: "0 auto" }}>

//                     {/* Header */}
//                     <div style={{ marginBottom: 20 }}>
//                         <h1 style={{
//                             fontSize: "clamp(16px, 4vw, 20px)",
//                             fontWeight: 700, color: C.text,
//                             margin: "0 0 3px", fontFamily: FONT,
//                         }}>
//                             Subscription Plan

//                         </h1>
//                         <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
//                             {isLoading ? "Loading…" : `${subs.length} subscription${subs.length !== 1 ? "s" : ""}`}
//                         </p>
//                     </div>

//                     {/* Error / not logged in */}
//                     {(!menteeId || isError) && (
//                         <div style={{
//                             background: "#fff5f5", border: "1px solid #fecaca",
//                             borderRadius: 12, padding: "28px 20px",
//                             textAlign: "center", maxWidth: 360, margin: "0 auto",
//                         }}>
//                             <AlertTriangle size={26} style={{ color: "#dc2626", marginBottom: 10 }} />
//                             <p style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", margin: 0, fontFamily: FONT }}>
//                                 {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
//                             </p>
//                         </div>
//                     )}

//                     {/* Skeleton */}
//                     {menteeId && !isError && isLoading && (
//                         <div style={{
//                             display: "grid",
//                             gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//                             gap: 16,
//                         }}>
//                             {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
//                         </div>
//                     )}

//                     {/* Empty state */}
//                     {menteeId && !isError && !isLoading && !subs.length && (
//                         <div style={{
//                             background: C.white, border: `1px dashed ${C.border}`,
//                             borderRadius: 14, padding: "56px 20px",
//                             textAlign: "center", maxWidth: 360, margin: "0 auto",
//                         }}>
//                             <Inbox size={32} style={{ color: C.border, marginBottom: 14 }} />
//                             <h3 style={{
//                                 fontSize: 15, fontWeight: 700, color: C.text,
//                                 margin: "0 0 6px", fontFamily: FONT,
//                             }}>
//                                 No Subscriptions Yet
//                             </h3>
//                             <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
//                                 Browse mentors and pick a plan to get started.
//                             </p>
//                         </div>
//                     )}

//                     {/* Cards grid */}
//                     {menteeId && !isError && !isLoading && subs.length > 0 && (
//                         <div style={{
//                             display: "grid",
//                             gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//                             gap: 16,
//                         }}>
//                             {subs.map((sub, i) => (
//                                 <SubscriptionCard
//                                     key={sub._id}
//                                     sub={sub}
//                                     i={i}
//                                     onPay={handleCompletePayment}
//                                     onView={handleView}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* ── Modal ─────────────────────────────────────────────────── */}
//             {selected && (
//                 <div
//                     onClick={() => setSelected(null)}
//                     style={{
//                         position: "fixed", inset: 0, zIndex: 50,
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         background: "rgba(0,0,0,0.4)",
//                         backdropFilter: "blur(4px)",
//                         padding: 16,
//                         animation: "fadeIn 0.15s ease",
//                     }}
//                 >
//                     <div
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                             width: "100%", maxWidth: 440,
//                             background: C.white,
//                             borderRadius: 14,
//                             border: `1px solid ${C.border}`,
//                             boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
//                             overflow: "hidden",
//                             animation: "slideUp 0.2s ease",
//                             fontFamily: FONT,
//                         }}
//                     >
//                         {/* Modal header */}
//                         <div style={{ background: C.dark, padding: "16px 18px" }}>
//                             <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//                                 <div>
//                                     <p style={{
//                                         fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)",
//                                         letterSpacing: "0.2em",
//                                         margin: "0 0 4px", fontFamily: FONT,
//                                     }}>
//                                         Subscription Details
//                                     </p>
//                                     <h2 style={{
//                                         fontSize: 16, fontWeight: 700, color: C.white,
//                                         margin: "0 0 3px", fontFamily: FONT,
//                                     }}>
//                                         {planLabel(selected.plan_type)} Plan
//                                     </h2>
//                                     <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0, fontFamily: FONT }}>
//                                         ID: {selected._id?.slice(-8).toUpperCase()}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSelected(null)}
//                                     style={{
//                                         width: 30, height: 30, borderRadius: 7,
//                                         background: "rgba(255,255,255,0.1)",
//                                         border: "1px solid rgba(255,255,255,0.15)",
//                                         color: "rgba(255,255,255,0.7)",
//                                         display: "flex", alignItems: "center", justifyContent: "center",
//                                         cursor: "pointer",
//                                     }}
//                                 >
//                                     <X size={13} />
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Modal body */}
//                         <div style={{ padding: "16px 18px" }}>

//                             {/* Status row */}
//                             <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
//                                 <StatusBadge status={selected.status} />
//                                 <PaymentLabel done={selected.payment_done} status={selected.payment_status} />
//                             </div>

//                             {/* Extension */}
//                             {selected.is_extended && (
//                                 <div style={{
//                                     marginBottom: 14,
//                                     background: "#f0fdf4", border: "1px solid #bbf7d0",
//                                     borderRadius: 8, padding: "10px 12px",
//                                 }}>
//                                     <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
//                                         <TrendingUp size={13} style={{ color: "#16a34a" }} />
//                                         <p style={{ fontSize: 12, fontWeight: 600, color: "#15803d", margin: 0, fontFamily: FONT }}>
//                                             Extended · {selected.extended_days} Days
//                                         </p>
//                                     </div>
//                                     <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
//                                         {selected.extensions?.map((ext, i) => (
//                                             <div key={i} style={{
//                                                 display: "flex", alignItems: "center", gap: 6,
//                                                 fontSize: 11, color: C.sub, fontFamily: FONT,
//                                             }}>
//                                                 <CalendarDays size={10} style={{ color: "#16a34a" }} />
//                                                 +{ext.added_days}d · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Info grid */}
//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//                                 {[
//                                     ["Sessions", `${selected.total_sessions}`, false],
//                                     ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`, false],
//                                     ["Start", fmt(selected.subscribed_at), false],
//                                     ["Original End", fmt(selected.subscription_end_date), false],
//                                     ["Extra Days", `+${selected.extended_days || 0}`, false],
//                                     ["Effective End", fmt(selected.effective_end_date), true],
//                                 ].map(([label, value, highlight]) => (
//                                     <div key={label} style={{
//                                         borderRadius: 8, padding: "10px 12px",
//                                         background: highlight ? "#f0f9ff" : "#f8fafc",
//                                         border: `1px solid ${highlight ? "#bae6fd" : C.border}`,
//                                     }}>
//                                         <p style={{
//                                             fontSize: 9, fontWeight: 700,
//                                             color: highlight ? C.blue : C.muted,
//                                             letterSpacing: "0.08em",
//                                             margin: "0 0 3px", fontFamily: FONT,
//                                         }}>{label}</p>
//                                         <p style={{
//                                             fontSize: 13, fontWeight: 700, color: C.text,
//                                             margin: 0, fontFamily: FONT, lineHeight: 1.3,
//                                         }}>{value}</p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Action buttons */}
//                             <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
//                                 {selected.payment_status === "pending" && (
//                                     <button
//                                         className="pay-btn"
//                                         onClick={() => handleCompletePayment(selected, {
//                                             fullName: selected.mentorName,
//                                             currentRole: selected.mentorRole,
//                                         })}
//                                         style={{
//                                             flex: 1, background: C.dark, color: C.white,
//                                             border: "none", borderRadius: 8,
//                                             padding: "10px 0", fontSize: 13,
//                                             fontWeight: 700, cursor: "pointer",
//                                             fontFamily: FONT, transition: "all 0.2s",
//                                         }}
//                                     >
//                                         Pay Now
//                                     </button>
//                                 )}
//                                 <button
//                                     onClick={() => setSelected(null)}
//                                     style={{
//                                         flex: 1,
//                                         background: selected.payment_status === "pending" ? C.white : C.dark,
//                                         color: selected.payment_status === "pending" ? C.text : C.white,
//                                         border: `1px solid ${selected.payment_status === "pending" ? C.border : C.dark}`,
//                                         borderRadius: 8, padding: "10px 0",
//                                         fontSize: 13, fontWeight: 700,
//                                         cursor: "pointer", fontFamily: FONT,
//                                         transition: "all 0.15s",
//                                     }}
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Subscriptionplan;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
import {
    AlertTriangle, Inbox, CalendarClock, CheckCircle2,
    Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
} from "lucide-react";

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
    dark: "#1a1a2e",
    blue: "#0091c3",
    white: "#ffffff",
    border: "#e2e8f0",
    muted: "#94a3b8",
    text: "#1a1a2e",
    sub: "#475569",
    bg: "#ffffff",
    rowHov: "#f8fafc",
};

const FONT = "'DM Sans', 'Segoe UI', sans-serif";

// ── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.35} }
  .sub-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .sub-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
  .pay-btn:hover  { opacity: 0.88; transform: scale(1.02); }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        })
        : "—";

const planLabel = (t) =>
({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
    t?.replace(/_/g, " ") || "—");

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        active: { color: "#16a34a", dot: "#16a34a", label: "Active" },
        expired: { color: "#dc2626", dot: "#dc2626", label: "Expired" },
        onprocess: { color: C.blue, dot: C.blue, label: "On Process" },
        pending: { color: C.text, dot: C.muted, label: "Pending" },
    };
    const m = map[status] ?? { color: C.muted, dot: C.muted, label: status || "—" };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontWeight: 700, fontFamily: FONT,
            color: m.color,
        }}>
            <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: m.dot, flexShrink: 0,
            }} />
            {m.label}
        </span>
    );
};

// ── Payment status label ──────────────────────────────────────────────────────
const PaymentLabel = ({ done, status }) => {
    if (done) return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}><CheckCircle2 size={13} />Paid</span>;
    if (status === "onprocess") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.blue, fontFamily: FONT }}><Clock size={13} />Processing</span>;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: FONT }}><Clock size={13} />Pending</span>;
};

// ── Subscription Card ─────────────────────────────────────────────────────────
const SubscriptionCard = ({ sub, i, onView, onPay }) => {
    return (
        <div
            className="sub-card"
            style={{
                background: C.white,
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                fontFamily: FONT,
                animationDelay: `${i * 70}ms`,
            }}
        >
            {/* Top accent */}
            <div style={{ height: 3, background: C.dark }} />

            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>

                {/* Pending payment banner */}
                {sub.payment_status === "pending" && (
                    <div style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between", gap: 10,
                        flexWrap: "wrap",
                        border: `1px solid ${C.border}`,
                        borderRadius: 10, padding: "10px 12px",
                        background: "#fafbfc",
                    }}>
                        <span style={{
                            display: "flex", alignItems: "center", gap: 6,
                            fontSize: 12, fontWeight: 600, color: C.text, fontFamily: FONT,
                        }}>
                            <AlertCircle size={13} style={{ color: C.blue }} />
                            Payment Incomplete
                        </span>
                        <button
                            className="pay-btn"
                            onClick={() => onPay(sub)}
                            style={{
                                background: C.dark, color: C.white,
                                border: "none", borderRadius: 8,
                                padding: "7px 14px", fontSize: 12,
                                fontWeight: 700, cursor: "pointer",
                                fontFamily: FONT, transition: "all 0.2s",
                                whiteSpace: "nowrap",
                            }}
                        >
                            Pay Now
                        </button>
                    </div>
                )}

                {/* Icon + status row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: C.dark,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <CreditCard size={16} style={{ color: C.white }} />
                    </div>
                    <StatusBadge status={sub.status} />
                </div>

                {/* Amount */}
                <div>
                    <p style={{
                        fontSize: 9, fontWeight: 700, color: C.muted,
                        letterSpacing: "0.1em",
                        margin: "0 0 3px", fontFamily: FONT,
                    }}>
                        Plan Amount
                    </p>
                    <p style={{ fontSize: 24, fontWeight: 800, color: C.text, margin: 0, fontFamily: FONT }}>
                        ₹{sub.amount?.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Meta chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                    {[
                        ["Plan", planLabel(sub.plan_type)],
                        ["Sessions", sub.total_sessions],
                        ["Expires", fmt(sub.effective_end_date)],
                    ].map(([lbl, val]) => (
                        <div key={lbl} style={{
                            background: "#f8fafc", borderRadius: 8,
                            padding: "8px 10px", border: `1px solid ${C.border}`,
                        }}>
                            <p style={{
                                fontSize: 8, fontWeight: 700, color: C.muted,
                                letterSpacing: "0.08em",
                                margin: "0 0 2px", fontFamily: FONT,
                            }}>{lbl}</p>
                            <p style={{
                                fontSize: 11, fontWeight: 700, color: C.text,
                                margin: 0, wordBreak: "break-word", fontFamily: FONT,
                            }}>{val}</p>
                        </div>
                    ))}
                </div>

                {/* Extension badge */}
                {sub.is_extended && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: "#f0fdf4", border: "1px solid #bbf7d0",
                        borderRadius: 8, padding: "8px 12px",
                    }}>
                        <CalendarClock size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#15803d", fontFamily: FONT }}>
                            Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
                        </span>
                    </div>
                )}

                {/* Divider */}
                <div style={{ borderTop: `1px solid ${C.border}`, marginTop: "auto" }} />

                {/* Bottom row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <PaymentLabel done={sub.payment_done} status={sub.payment_status} />
                    <button
                        className="pay-btn"
                        onClick={() => onView(sub)}
                        style={{
                            background: C.dark, color: C.white,
                            border: "none", borderRadius: 8,
                            padding: "7px 16px", fontSize: 12,
                            fontWeight: 700, cursor: "pointer",
                            fontFamily: FONT, transition: "all 0.2s",
                        }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div style={{
        borderRadius: 12, border: `1px solid ${C.border}`,
        overflow: "hidden", background: C.white,
    }}>
        <div style={{ height: 3, background: C.border }} />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {[80, 120, 60, 40].map((w, i) => (
                <div key={i} style={{
                    height: i === 1 ? 28 : 12, borderRadius: 6,
                    background: "#f1f5f9", width: `${w}%`,
                    animation: "pulse 1.5s ease-in-out infinite",
                }} />
            ))}
        </div>
    </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleCompletePayment = (sub) => {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };
        navigate("/payment", {
            state: {
                subscription_id: sub._id,
                mentorId: sub.mentor_id,
                mentorName: sub.mentor_name,
                mentorRole: sub.mentor_role || "",
                menteeId: sub.mentee_id,
                menteeName: userData.name,
                planMonths: planMonthsMap[sub.plan_type],
                totalSessions: sub.total_sessions,
                paymentType: "subcription",
                basePrice: sub.amount,
                createdBy: sub.mentee_id,
            },
        });
    };

    const handleView = (sub) => {
        setSelected({
            ...sub,
            mentorName: sub.mentor_name || "",
            mentorRole: sub.mentor_role || "",
        });
    };

    return (
        <>
            <style>{GLOBAL_CSS}</style>

            <div style={{
                minHeight: "100vh",
                background: C.bg,
                padding: "clamp(16px, 4vw, 28px)",
                fontFamily: FONT,
            }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>

                    {/* Header */}
                    <div style={{ marginBottom: 20 }}>
                        <h1 style={{
                            fontSize: "clamp(16px, 4vw, 20px)",
                            fontWeight: 700, color: C.text,
                            margin: "0 0 3px", fontFamily: FONT,
                        }}>
                            Subscription Plan
                        </h1>
                        <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
                            {isLoading ? "Loading…" : `${subs.length} subscription${subs.length !== 1 ? "s" : ""}`}
                        </p>
                    </div>

                    {/* Error / not logged in */}
                    {(!menteeId || isError) && (
                        <div style={{
                            background: "#fff5f5", border: "1px solid #fecaca",
                            borderRadius: 12, padding: "28px 20px",
                            textAlign: "center", maxWidth: 360, margin: "0 auto",
                        }}>
                            <AlertTriangle size={26} style={{ color: "#dc2626", marginBottom: 10 }} />
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", margin: 0, fontFamily: FONT }}>
                                {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
                            </p>
                        </div>
                    )}

                    {/* Skeleton */}
                    {menteeId && !isError && isLoading && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 16,
                        }}>
                            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {/* Empty state */}
                    {menteeId && !isError && !isLoading && !subs.length && (
                        <div style={{
                            background: C.white, border: `1px dashed ${C.border}`,
                            borderRadius: 14, padding: "56px 20px",
                            textAlign: "center", maxWidth: 360, margin: "0 auto",
                        }}>
                            <Inbox size={32} style={{ color: C.border, marginBottom: 14 }} />
                            <h3 style={{
                                fontSize: 15, fontWeight: 700, color: C.text,
                                margin: "0 0 6px", fontFamily: FONT,
                            }}>
                                No Subscriptions Yet
                            </h3>
                            <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
                                Browse mentors and pick a plan to get started.
                            </p>
                        </div>
                    )}

                    {/* Cards grid */}
                    {menteeId && !isError && !isLoading && subs.length > 0 && (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                            gap: 16,
                        }}>
                            {subs.map((sub, i) => (
                                <SubscriptionCard
                                    key={sub._id}
                                    sub={sub}
                                    i={i}
                                    onPay={handleCompletePayment}
                                    onView={handleView}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Modal ─────────────────────────────────────────────────── */}
            {selected && (
                <div
                    onClick={() => setSelected(null)}
                    style={{
                        position: "fixed", inset: 0, zIndex: 50,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(4px)",
                        padding: 16,
                        animation: "fadeIn 0.15s ease",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "100%", maxWidth: 440,
                            background: C.white,
                            borderRadius: 14,
                            border: `1px solid ${C.border}`,
                            boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
                            overflow: "hidden",
                            animation: "slideUp 0.2s ease",
                            fontFamily: FONT,
                        }}
                    >
                        {/* Modal header */}
                        <div style={{ background: C.dark, padding: "16px 18px" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{
                                        fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)",
                                        letterSpacing: "0.2em",
                                        margin: "0 0 4px", fontFamily: FONT,
                                    }}>
                                        Subscription Details
                                    </p>
                                    <h2 style={{
                                        fontSize: 16, fontWeight: 700, color: C.white,
                                        margin: "0 0 3px", fontFamily: FONT,
                                    }}>
                                        {planLabel(selected.plan_type)} Plan
                                    </h2>
                                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0, fontFamily: FONT }}>
                                        ID: {selected._id?.slice(-8).toUpperCase()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        width: 30, height: 30, borderRadius: 7,
                                        background: "rgba(255,255,255,0.1)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "rgba(255,255,255,0.7)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    <X size={13} />
                                </button>
                            </div>
                        </div>

                        {/* Modal body */}
                        <div style={{ padding: "16px 18px" }}>

                            {/* Status row */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                                <StatusBadge status={selected.status} />
                                <PaymentLabel done={selected.payment_done} status={selected.payment_status} />
                            </div>

                            {/* Extension */}
                            {selected.is_extended && (
                                <div style={{
                                    marginBottom: 14,
                                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                                    borderRadius: 8, padding: "10px 12px",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                                        <TrendingUp size={13} style={{ color: "#16a34a" }} />
                                        <p style={{ fontSize: 12, fontWeight: 600, color: "#15803d", margin: 0, fontFamily: FONT }}>
                                            Extended · {selected.extended_days} Days
                                        </p>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                        {selected.extensions?.map((ext, i) => (
                                            <div key={i} style={{
                                                display: "flex", alignItems: "center", gap: 6,
                                                fontSize: 11, color: C.sub, fontFamily: FONT,
                                            }}>
                                                <CalendarDays size={10} style={{ color: "#16a34a" }} />
                                                +{ext.added_days}d · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Info grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                {[
                                    ["Sessions", `${selected.total_sessions}`, false],
                                    ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`, false],
                                    ["Start", fmt(selected.subscribed_at), false],
                                    ["Original End", fmt(selected.subscription_end_date), false],
                                    ["Extra Days", `+${selected.extended_days || 0}`, false],
                                    ["Effective End", fmt(selected.effective_end_date), true],
                                ].map(([label, value, highlight]) => (
                                    <div key={label} style={{
                                        borderRadius: 8, padding: "10px 12px",
                                        background: highlight ? "#f0f9ff" : "#f8fafc",
                                        border: `1px solid ${highlight ? "#bae6fd" : C.border}`,
                                    }}>
                                        <p style={{
                                            fontSize: 9, fontWeight: 700,
                                            color: highlight ? C.blue : C.muted,
                                            letterSpacing: "0.08em",
                                            margin: "0 0 3px", fontFamily: FONT,
                                        }}>{label}</p>
                                        <p style={{
                                            fontSize: 13, fontWeight: 700, color: C.text,
                                            margin: 0, fontFamily: FONT, lineHeight: 1.3,
                                        }}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                                {selected.payment_status === "pending" && (
                                    <button
                                        className="pay-btn"
                                        onClick={() => handleCompletePayment(selected)}
                                        style={{
                                            flex: 1, background: C.dark, color: C.white,
                                            border: "none", borderRadius: 8,
                                            padding: "10px 0", fontSize: 13,
                                            fontWeight: 700, cursor: "pointer",
                                            fontFamily: FONT, transition: "all 0.2s",
                                        }}
                                    >
                                        Pay Now
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        flex: 1,
                                        background: selected.payment_status === "pending" ? C.white : C.dark,
                                        color: selected.payment_status === "pending" ? C.text : C.white,
                                        border: `1px solid ${selected.payment_status === "pending" ? C.border : C.dark}`,
                                        borderRadius: 8, padding: "10px 0",
                                        fontSize: 13, fontWeight: 700,
                                        cursor: "pointer", fontFamily: FONT,
                                        transition: "all 0.15s",
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Subscriptionplan;