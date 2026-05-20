

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
// import { useFetchMentorByIdQuery } from '../../topMentors/Mentorsectionapislice';
// import {
//     AlertTriangle, Inbox, CalendarClock, CheckCircle2,
//     Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
// } from "lucide-react";

// const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// const fmt = (iso) =>
//     iso
//         ? new Date(iso).toLocaleDateString("en-IN", {
//             day: "2-digit", month: "short", year: "numeric",
//         })
//         : "—";

// const planLabel = (t) =>
// ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
//     t?.replace(/_/g, " ") || "—");

// const statusColor = (s) =>
// ({
//     active: "#10b981",
//     expired: "#ef4444",
//     onprocess: "#ffffff",   // blue — "in progress"
// }[s] ?? "#f59e0b");
// // ✅ Separate card component so hook can be called per subscription
// const SubscriptionCard = ({ sub, i, onView, onPay }) => {
//     const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

//     console.log(mentor, "data222")

//     return (
//         <div
//             key={sub._id}
//             className="sub-card"
//             style={{
//                 borderRadius: 20,
//                 background: "linear-gradient(140deg,#0098cc 0%,#006699 52%,#003d5c 100%)",
//                 padding: "20px 20px 18px",
//                 boxShadow: "0 18px 48px rgba(0,120,180,0.25)",
//                 position: "relative",
//                 overflow: "hidden",
//                 animation: `fadeUp .4s ease ${i * 0.07}s both`,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 0,
//             }}
//         >
//             {/* Deco blob */}
//             <div style={{
//                 position: "absolute", top: -48, right: -48,
//                 width: 160, height: 160, borderRadius: "50%",
//                 background: "rgba(255,255,255,0.055)", pointerEvents: "none",
//             }} />
//             <div style={{
//                 position: "absolute", bottom: -30, left: -30,
//                 width: 100, height: 100, borderRadius: "50%",
//                 background: "rgba(255,255,255,0.03)", pointerEvents: "none",
//             }} />

//             {/* ── Pending Payment Banner ── */}
//             {sub.payment_status === "pending" && (
//                 <div style={{
//                     background: "rgba(253,230,138,0.13)",
//                     border: "1px solid rgba(253,230,138,0.34)",
//                     borderRadius: 10, padding: "8px 11px",
//                     marginBottom: 14, position: "relative", zIndex: 1,
//                     display: "flex", alignItems: "center",
//                     justifyContent: "space-between", gap: 8, flexWrap: "wrap",
//                 }}>
//                     <span style={{
//                         fontSize: 10, fontWeight: 700, color: "#fde68a",
//                         display: "flex", alignItems: "center", gap: 5,
//                     }}>
//                         <AlertCircle size={11} color="#fde68a" />
//                         Payment Incomplete
//                     </span>
//                     <button
//                         className="pay-btn"
//                         onClick={() => onPay(sub, mentor)}
//                         style={{
//                             background: "linear-gradient(90deg,#d4a84b,#f0c96a)",
//                             border: "none", borderRadius: 7,
//                             padding: "5px 13px", fontSize: 10, fontWeight: 800,
//                             color: "#0a0a0a", cursor: "pointer",
//                             whiteSpace: "nowrap", fontFamily: FONT,
//                         }}
//                     >
//                         Complete Payment →
//                     </button>
//                 </div>
//             )}

//             {/* ── Icon + Status ── */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, position: "relative", zIndex: 1 }}>
//                 <CreditCard size={26} color="rgba(255,255,255,0.58)" />
//                 <span style={{
//                     fontSize: 10, fontWeight: 700, padding: "3px 10px",
//                     borderRadius: 20,
//                     background: statusColor(sub.status) + "28",
//                     color: statusColor(sub.status),
//                     display: "flex", alignItems: "center", gap: 4,
//                 }}>
//                     <span style={{
//                         width: 5, height: 5, borderRadius: "50%",
//                         background: statusColor(sub.status), display: "inline-block",
//                     }} />
//                     {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
//                 </span>
//             </div>

//             {/* ── Amount ── */}
//             <div style={{ position: "relative", zIndex: 1, marginBottom: 14 }}>
//                 <p style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
//                     Plan Amount
//                 </p>
//                 <p style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>
//                     ₹{sub.amount?.toLocaleString("en-IN")}
//                 </p>
//             </div>

//             {/* ── Meta row ── */}
//             <div style={{
//                 display: "flex", justifyContent: "space-between",
//                 marginBottom: 12, gap: 6, position: "relative", zIndex: 1,
//             }}>
//                 {[
//                     ["Plan", planLabel(sub.plan_type), "left"],
//                     ["Sessions", sub.total_sessions, "center"],
//                     ["Expires", fmt(sub.effective_end_date), "right"],
//                 ].map(([lbl, val, align]) => (
//                     <div key={lbl} style={{ textAlign: align, flex: 1, minWidth: 0 }}>
//                         <p style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 3 }}>{lbl}</p>
//                         <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", wordBreak: "break-word" }}>{val}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Extension badge */}
//             {sub.is_extended && (
//                 <div style={{
//                     background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
//                     borderRadius: 8, padding: "6px 10px", marginBottom: 12,
//                     display: "flex", alignItems: "center", gap: 6, position: "relative", zIndex: 1,
//                 }}>
//                     <CalendarClock size={12} color="#86efac" />
//                     <span style={{ fontSize: 10, fontWeight: 700, color: "#86efac" }}>
//                         Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
//                     </span>
//                 </div>
//             )}

//             <div style={{ height: 1, background: "rgba(255,255,255,0.09)", margin: "2px 0 12px", position: "relative", zIndex: 1 }} />

//             {/* ── Bottom row ── */}
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
//                 <span style={{
//                     fontSize: 10, fontWeight: 700,
//                     color: sub.payment_done ? "#86efac" : "#fde68a",
//                     display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
//                 }}>
//                     {sub.payment_done
//                         ? <><CheckCircle2 size={11} color="#86efac" /> Paid</>
//                         : sub.payment_status === "onprocess"
//                             ? <><Clock size={11} color="#93c5fd" /> Processing</>
//                             : <><Clock size={11} color="#fde68a" /> Pending</>}
//                 </span>
//                 <button
//                     className="view-btn"
//                     onClick={() => onView(sub, mentor)}
//                     style={{
//                         background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)",
//                         borderRadius: 8, padding: "5px 14px",
//                         fontSize: 11, fontWeight: 700, color: "#fff",
//                         cursor: "pointer", fontFamily: FONT,
//                     }}
//                 >
//                     View Details →
//                 </button>
//             </div>
//         </div>
//     );
// };


// const Subscriptionplan = () => {
//     const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
//     const { data: subs = [], isLoading, isError, error } =
//         useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

//     const [selected, setSelected] = useState(null);
//     const navigate = useNavigate();

//     const handleCompletePayment = (sub, mentor) => {
//         const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//         const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };

//         console.log(mentor, "deayils")

//         navigate("/payment", {
//             state: {
//                 subscription_id: sub._id,
//                 mentorId: sub.mentor_id,
//                 mentorName: mentor?.fullName,
//                 mentorRole: mentor?.currentRole || '',
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
//             mentorName: mentor?.fullName || '',
//             mentorRole: mentor?.currentRole || '',
//         });
//     };

//     return (
//         <div style={{ minHeight: "100vh", background: "#eef5f9", fontFamily: FONT, padding: "32px 20px 72px" }}>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
//         @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
//         @keyframes modalIn { from{opacity:0;transform:translateY(14px) scale(0.96)} to{opacity:1;transform:none} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         .sub-card { transition: transform 0.28s cubic-bezier(0.23,1,0.32,1), box-shadow 0.28s ease; }
//         .sub-card:hover { transform: translateY(-6px) !important; box-shadow: 0 32px 72px rgba(0,120,180,0.38) !important; }
//         .pay-btn  { transition: opacity 0.18s, transform 0.16s; }
//         .pay-btn:hover  { opacity: 0.86; transform: translateY(-1px); }
//         .view-btn { transition: background 0.18s; }
//         .view-btn:hover { background: rgba(255,255,255,0.3) !important; }
//         .close-btn { transition: background 0.18s; }
//         .close-btn:hover { opacity: 0.88; }
//         .subs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
//         @media (max-width: 480px) { .subs-grid { grid-template-columns: 1fr; } }
//         @media (min-width: 1100px) { .subs-grid { grid-template-columns: repeat(3, 1fr); } }
//         .modal-scroll { max-height: 92vh; overflow-y: auto; -webkit-overflow-scrolling: touch; }
//         @media (max-width: 480px) { .modal-overlay { align-items: flex-end !important; } .modal-inner { border-radius: 20px 20px 0 0 !important; } }
//         .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
//         .skeleton { background: linear-gradient(90deg,#cfe4ef 25%,#b9d4e4 50%,#cfe4ef 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
//       `}</style>

//             <div style={{ maxWidth: 1100, margin: "0 auto" }}>

//                 {/* ── Page Header ── */}
//                 <div style={{ marginBottom: 28, animation: "fadeUp .38s ease both" }}>
//                     <h1 style={{ fontSize: "clamp(18px,4vw,23px)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>
//                         My Subscriptions
//                     </h1>
//                     <p style={{ fontSize: 13, color: "#64748b", marginTop: 5, lineHeight: 1.6 }}>
//                         Your active and past mentorship plans
//                     </p>
//                 </div>

//                 {/* ── Not logged in / Error ── */}
//                 {(!menteeId || isError) && (
//                     <div style={{
//                         background: "#fff5f5", borderRadius: 16, padding: "28px 24px",
//                         textAlign: "center", border: "1px solid #fecaca",
//                         maxWidth: 380, margin: "0 auto", animation: "fadeUp .38s ease both",
//                     }}>
//                         <AlertTriangle size={28} color="#dc2626" style={{ margin: "0 auto 10px", display: "block" }} />
//                         <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
//                             {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
//                         </p>
//                     </div>
//                 )}

//                 {/* ── Skeleton ── */}
//                 {menteeId && !isError && isLoading && (
//                     <div className="subs-grid">
//                         {[1, 2, 3].map((i) => (
//                             <div key={i} className="skeleton" style={{ height: 252, borderRadius: 20 }} />
//                         ))}
//                     </div>
//                 )}

//                 {/* ── Empty ── */}
//                 {menteeId && !isError && !isLoading && !subs.length && (
//                     <div style={{
//                         background: "#fff", borderRadius: 20, padding: "52px 32px",
//                         textAlign: "center", border: "1px dashed #b0d8ee",
//                         maxWidth: 400, margin: "0 auto", animation: "fadeUp .38s ease both",
//                     }}>
//                         <Inbox size={34} color="#94a3b8" style={{ margin: "0 auto 14px", display: "block" }} />
//                         <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>No Subscriptions Yet</h3>
//                         <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
//                             Browse mentors and pick a plan to get started.
//                         </p>
//                     </div>
//                 )}

//                 {/* ── Cards ── */}
//                 {menteeId && !isError && !isLoading && subs.length > 0 && (
//                     <div className="subs-grid">
//                         {subs.map((sub, i) => (
//                             <SubscriptionCard
//                                 key={sub._id}
//                                 sub={sub}
//                                 i={i}
//                                 onPay={handleCompletePayment}
//                                 onView={handleView}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* ════════════════ MODAL ════════════════ */}
//             {selected && (
//                 <div
//                     className="modal-overlay"
//                     onClick={() => setSelected(null)}
//                     style={{
//                         position: "fixed", inset: 0,
//                         background: "rgba(0,10,22,0.55)",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         zIndex: 1000, backdropFilter: "blur(5px)", padding: "16px",
//                     }}
//                 >
//                     <div
//                         className="modal-inner modal-scroll"
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                             background: "#fff", borderRadius: 18,
//                             width: "100%", maxWidth: 420,
//                             boxShadow: "0 28px 72px rgba(0,80,130,0.24)",
//                             overflow: "hidden",
//                             animation: "modalIn .25s cubic-bezier(0.34,1.56,0.64,1) both",
//                         }}
//                     >
//                         {/* Modal Header */}
//                         <div style={{
//                             background: "linear-gradient(135deg,#0098cc,#005f8a)",
//                             padding: "18px 20px 16px", position: "relative", overflow: "hidden",
//                         }}>
//                             <div style={{
//                                 position: "absolute", top: -28, right: -28, width: 110, height: 110,
//                                 borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none",
//                             }} />
//                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
//                                 <div>
//                                     <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "rgba(255,255,255,0.48)" }}>
//                                         Subscription Details
//                                     </span>
//                                     <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 4, letterSpacing: "-0.2px" }}>
//                                         {planLabel(selected.plan_type)} Plan
//                                     </h2>
//                                     <p style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 2 }}>
//                                         ID: {selected._id?.slice(-8).toUpperCase()}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSelected(null)}
//                                     style={{
//                                         background: "rgba(255,255,255,0.14)", border: "none",
//                                         borderRadius: 8, width: 30, height: 30, cursor: "pointer",
//                                         display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                                     }}
//                                 >
//                                     <X size={15} color="#fff" />
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Modal Body */}
//                         <div style={{ padding: "18px 20px 20px" }}>

//                             {/* Status pills */}
//                             <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
//                                 <span style={{
//                                     fontSize: 10, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
//                                     background: statusColor(selected.status) + "18",
//                                     color: statusColor(selected.status),
//                                     display: "flex", alignItems: "center", gap: 4,
//                                 }}>
//                                     <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor(selected.status), display: "inline-block" }} />
//                                     {selected.status?.charAt(0).toUpperCase() + selected.status?.slice(1)}
//                                 </span>
//                                 <span style={{
//                                     fontSize: 10, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
//                                     background: selected.payment_done ? "#ecfdf5" : "#fffbeb",
//                                     color: selected.payment_done ? "#059669" : "#d97706",
//                                     display: "flex", alignItems: "center", gap: 4,
//                                 }}>
//                                     {selected.payment_done
//                                         ? <><CheckCircle2 size={11} color="#059669" /> Payment Done</>
//                                         : selected.payment_status === "onprocess"
//                                             ? <><Clock size={11} color="#3b82f6" /> Processing</>
//                                             : <><Clock size={11} color="#d97706" /> Pending</>}
//                                 </span>
//                             </div>

//                             {/* Extension info */}
//                             {selected.is_extended && (
//                                 <div style={{
//                                     background: "#f0fdf4", border: "1px solid #bbf7d0",
//                                     borderRadius: 10, padding: "10px 12px", marginBottom: 14,
//                                 }}>
//                                     <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
//                                         <TrendingUp size={13} color="#059669" />
//                                         <p style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>
//                                             Plan Extended — {selected.extended_days} days added
//                                         </p>
//                                     </div>
//                                     {selected.extensions?.map((ext, i) => (
//                                         <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
//                                             <CalendarDays size={10} color="#16a34a" />
//                                             <p style={{ fontSize: 10, color: "#16a34a" }}>
//                                                 +{ext.added_days} day{ext.added_days > 1 ? "s" : ""} · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             {/* Info grid */}
//                             <div className="info-grid" style={{ marginBottom: 16 }}>
//                                 {[
//                                     ["Total Sessions", `${selected.total_sessions} sessions`, false],
//                                     ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`, false],
//                                     ["Start Date", fmt(selected.subscribed_at), false],
//                                     ["Original End", fmt(selected.subscription_end_date), false],
//                                     ["Extended Days", `+${selected.extended_days || 0} days`, false],
//                                     ["Effective End", fmt(selected.effective_end_date), true],
//                                 ].map(([label, value, highlight]) => (
//                                     <div key={label} style={{
//                                         background: highlight ? "#f0fdf4" : "#f8fafc",
//                                         borderRadius: 9, padding: "8px 10px",
//                                         border: `1px solid ${highlight ? "#bbf7d0" : "#f1f5f9"}`,
//                                     }}>
//                                         <p style={{
//                                             fontSize: 8, fontWeight: 700, letterSpacing: 0.7,
//                                             textTransform: "uppercase",
//                                             color: highlight ? "#059669" : "#94a3b8", marginBottom: 3,
//                                         }}>{label}</p>
//                                         <p style={{ fontSize: 12, fontWeight: 700, color: highlight ? "#059669" : "#1e293b" }}>
//                                             {value}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Complete Payment CTA */}
//                             {selected.payment_status === "pending" && (
//                                 <button
//                                     className="pay-btn"
//                                     onClick={() => handleCompletePayment(selected, {
//                                         fullName: selected.mentorName,
//                                         currentRole: selected.mentorRole
//                                     })} style={{
//                                         width: "100%",
//                                         background: "linear-gradient(90deg,#d4a84b,#f0c96a)",
//                                         color: "#0a0a0a", border: "none", borderRadius: 10,
//                                         padding: "13px", fontSize: 14, fontWeight: 800,
//                                         cursor: "pointer", marginBottom: 9, fontFamily: FONT,
//                                         display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//                                     }}
//                                 >
//                                     <CreditCard size={15} />
//                                     Complete Your Payment →
//                                 </button>
//                             )}

//                             {/* Close */}
//                             <button
//                                 className="close-btn"
//                                 onClick={() => setSelected(null)}
//                                 style={{
//                                     width: "100%",
//                                     background: selected.payment_status === "pending" ? "#f8fafc" : "linear-gradient(135deg,#0098cc,#005f8a)",
//                                     color: selected.payment_status === "pending" ? "#64748b" : "#fff",
//                                     border: selected.payment_status === "pending" ? "1px solid #e2e8f0" : "none",
//                                     borderRadius: 10, padding: "12px",
//                                     fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
//                                 }}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Subscriptionplan;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";
import {
    AlertTriangle, Inbox, CalendarClock, CheckCircle2,
    Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
} from "lucide-react";

/* ─── Helpers ─────────────────────────────────────────────────── */
const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        })
        : "—";

const planLabel = (t) =>
({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
    t?.replace(/_/g, " ") || "—");

const statusCls = (s) =>
({
    active: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    expired: "bg-red-50 text-red-500 border border-red-200",
    onprocess: "bg-blue-50 text-blue-500 border border-blue-200",
}[s] ?? "bg-amber-50 text-amber-500 border border-amber-200");

const statusDot = (s) =>
({
    active: "bg-emerald-500",
    expired: "bg-red-500",
    onprocess: "bg-blue-400",
}[s] ?? "bg-amber-400");

/* ─── Subscription Card ────────────────────────────────────────── */
const SubscriptionCard = ({ sub, i, onView, onPay }) => {
    const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

    return (
        <div
            className="bg-white rounded-xl border border-slate-100 hover:-translate-y-0.5 transition-transform duration-200 flex flex-col overflow-hidden"
            style={{ animationDelay: `${i * 70}ms` }}
        >
            {/* Card top accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-[#0098cc] to-[#1a1a2e]" />

            <div className="p-4 flex flex-col gap-3 flex-1">

                {/* Pending payment banner */}
                {sub.payment_status === "pending" && (
                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-3 flex-wrap">

                        <span className="flex items-center gap-2 text-[#1a1a2e] text-xs font-semibold">
                            <AlertCircle size={14} className="text-[#0098cc]" />
                            Payment Incomplete
                        </span>

                        <button
                            onClick={() => onPay(sub, mentor)}
                            className="rounded-xl bg-[#1a1a2e] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90 whitespace-nowrap"
                        >
                            Pay Now
                        </button>

                    </div>
                )}

                {/* Icon + status */}
                <div className="flex items-center justify-between">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white">
                        <CreditCard size={16} className="text-[#0098cc]" />
                    </div>

                    <span
                        className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold ${sub.status === "active"
                            ? "border-[#0098cc]/20 bg-[#0098cc]/5 text-[#0098cc]"
                            : sub.status === "pending"
                                ? "border-gray-200 bg-gray-50 text-[#1a1a2e]"
                                : "border-red-200 bg-red-50 text-red-600"
                            }`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${sub.status === "active"
                                ? "bg-[#0098cc]"
                                : sub.status === "pending"
                                    ? "bg-[#1a1a2e]"
                                    : "bg-red-500"
                                }`}
                        />

                        {sub.status?.charAt(0).toUpperCase() +
                            sub.status?.slice(1)}
                    </span>

                </div>

                {/* Amount */}
                <div>
                    <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                        Plan Amount
                    </p>
                    <p className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
                        ₹{sub.amount?.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Meta row */}
                <div className="grid grid-cols-3 gap-1.5">
                    {[
                        ["Plan", planLabel(sub.plan_type)],
                        ["Sessions", sub.total_sessions],
                        ["Expires", fmt(sub.effective_end_date)],
                    ].map(([lbl, val]) => (
                        <div key={lbl} className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{lbl}</p>
                            <p className="text-[10px] font-bold text-[#1a1a2e] break-words">{val}</p>
                        </div>
                    ))}
                </div>

                {/* Extension badge */}
                {sub.is_extended && (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                        <CalendarClock size={13} className="text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-700">
                            Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
                        </span>
                    </div>
                )}

                <div className="border-t border-slate-100 mt-auto" />

                {/* Bottom row */}
                <div className="flex items-center justify-between gap-2 pt-1">

                    <span
                        className={`flex items-center gap-1.5 text-xs font-semibold ${sub.payment_done
                            ? "text-[#0098cc]"
                            : sub.payment_status === "onprocess"
                                ? "text-blue-600"
                                : "text-[#1a1a2e]"
                            }`}
                    >
                        {sub.payment_done ? (
                            <>
                                <CheckCircle2 size={13} />
                                Paid
                            </>
                        ) : sub.payment_status === "onprocess" ? (
                            <>
                                <Clock size={13} />
                                Processing
                            </>
                        ) : (
                            <>
                                <Clock size={13} />
                                Pending
                            </>
                        )}
                    </span>

                    <button
                        onClick={() => onView(sub, mentor)}
                        className="rounded-xl bg-[#1a1a2e] px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
                    >
                        View Details
                    </button>

                </div>
            </div>
        </div>
    );
};

/* ─── Main Page ────────────────────────────────────────────────── */
const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleCompletePayment = (sub, mentor) => {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };
        navigate("/payment", {
            state: {
                subscription_id: sub._id,
                mentorId: sub.mentor_id,
                mentorName: mentor?.fullName,
                mentorRole: mentor?.currentRole || "",
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

    const handleView = (sub, mentor) => {
        setSelected({
            ...sub,
            mentorName: mentor?.fullName || "",
            mentorRole: mentor?.currentRole || "",
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 pb-20">
            <div className="max-w-5xl mx-auto">

                {/* Page header */}
                {/* <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-[#1a1a2e] tracking-tight">
            My Subscriptions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Your active and past mentorship plans
          </p>
        </div> */}

                {/* Error / not logged in */}
                {(!menteeId || isError) && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-7 text-center max-w-sm mx-auto">
                        <AlertTriangle size={28} className="text-red-500 mx-auto mb-3" />
                        <p className="text-sm text-red-600 font-semibold">
                            {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
                        </p>
                    </div>
                )}

                {/* Skeleton */}
                {menteeId && !isError && isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-64 rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {menteeId && !isError && !isLoading && !subs.length && (
                    <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-14 text-center max-w-sm mx-auto">
                        <Inbox size={36} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-base font-extrabold text-[#1a1a2e] mb-2">No Subscriptions Yet</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Browse mentors and pick a plan to get started.
                        </p>
                    </div>
                )}

                {/* Cards grid */}
                {menteeId && !isError && !isLoading && subs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

            {/* ─── Modal ──────────────────────────────────────────────── */}


            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setSelected(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[460px] rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden"
                    >

                        {/* Header */}
                        <div className="border-b border-gray-100 px-5 py-4 bg-white">
                            <div className="flex items-start justify-between">

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0098cc]">
                                        Subscription Details
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-[#1a1a2e]">
                                        {planLabel(selected.plan_type)} Plan
                                    </h2>

                                    <p className="mt-1 text-[11px] text-gray-500">
                                        ID: {selected._id?.slice(-8).toUpperCase()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelected(null)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-50"
                                >
                                    <X size={16} className="text-[#1a1a2e]" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-5">

                            {/* Status */}
                            <div className="mb-4 flex flex-wrap gap-2">
                                <div
                                    className="flex items-center gap-1 rounded-full border border-[#0098cc]/20 bg-[#0098cc]/10 px-3 py-1.5 text-[10px] font-semibold text-[#1a1a2e]"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#0098cc]" />

                                    {selected.status?.charAt(0).toUpperCase() +
                                        selected.status?.slice(1)}
                                </div>

                                {/* <div
                                    className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-[10px] font-semibold ${selected.payment_done
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                        : selected.payment_status === "onprocess"
                                            ? "border-blue-200 bg-blue-50 text-blue-600"
                                            : "border-amber-200 bg-amber-50 text-amber-600"
                                        }`}
                                >
                                    {selected.payment_done ? (
                                        <>
                                            <CheckCircle2 size={11} />
                                            Paid
                                        </>
                                    ) : selected.payment_status === "onprocess" ? (
                                        <>
                                            <Clock size={11} />
                                            Processing
                                        </>
                                    ) : (
                                        <>
                                            <Clock size={11} />
                                            Pending
                                        </>
                                    )}
                                </div> */}
                            </div>

                            {/* Extension */}
                            {selected.is_extended && (
                                <div className="mb-4 rounded-2xl border border-[#0098cc]/20 bg-[#0098cc]/5 p-4">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={14} className="text-[#0098cc]" />

                                        <p className="text-xs font-semibold text-[#1a1a2e]">
                                            Extended • {selected.extended_days} Days
                                        </p>
                                    </div>

                                    <div className="mt-3 space-y-2">
                                        {selected.extensions?.map((ext, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 text-[11px] text-gray-600"
                                            >
                                                <CalendarDays size={11} className="text-[#0098cc]" />

                                                <span>
                                                    +{ext.added_days}d • {fmt(ext.unavailable_from)} –{" "}
                                                    {fmt(ext.unavailable_to)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3">

                                {[
                                    ["Sessions", `${selected.total_sessions}`, false],
                                    ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`, false],
                                    ["Start", fmt(selected.subscribed_at), false],
                                    ["Original End", fmt(selected.subscription_end_date), false],
                                    ["Extra Days", `+${selected.extended_days || 0}`, false],
                                    ["Effective End", fmt(selected.effective_end_date), true],
                                ].map(([label, value, highlight]) => (
                                    <div
                                        key={label}
                                        className={` border p-3 ${highlight
                                            ? "border-[#0098cc]/20 bg-[#0098cc]/5"
                                            : "border-gray-200 bg-white"
                                            }`}
                                    >
                                        <p
                                            className={`text-[9px] font-semibold uppercase tracking-wide ${highlight ? "text-[#0098cc]" : "text-gray-400"
                                                }`}
                                        >
                                            {label}
                                        </p>

                                        <p className="mt-1 text-[12px] font-bold text-[#1a1a2e] leading-snug">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="mt-5 flex gap-3">

                                {selected.payment_status === "pending" && (
                                    <button
                                        onClick={() =>
                                            handleCompletePayment(selected, {
                                                fullName: selected.mentorName,
                                                currentRole: selected.mentorRole,
                                            })
                                        }
                                        className="flex-1 rounded-2xl bg-[#1a1a2e] py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                                    >
                                        Pay Now
                                    </button>
                                )}

                                <button
                                    onClick={() => setSelected(null)}
                                    className={`${selected.payment_status === "pending"
                                        ? "flex-1 border border-gray-200 bg-white text-[#1a1a2e]"
                                        : "w-full bg-[#1a1a2e] text-white"
                                        } rounded-2xl py-3 text-sm font-semibold transition hover:bg-gray-50`}
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Subscriptionplan;














