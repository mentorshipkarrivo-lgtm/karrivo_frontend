

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
import { useFetchMentorByIdQuery } from '../../topMentors/Mentorsectionapislice';
import {
    AlertTriangle, Inbox, CalendarClock, CheckCircle2,
    Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
} from "lucide-react";

const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
        })
        : "—";

const planLabel = (t) =>
({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
    t?.replace(/_/g, " ") || "—");

const statusColor = (s) =>
({
    active: "#10b981",
    expired: "#ef4444",
    onprocess: "#ffffff",   // blue — "in progress"
}[s] ?? "#f59e0b");
// ✅ Separate card component so hook can be called per subscription
const SubscriptionCard = ({ sub, i, onView, onPay }) => {
    const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

    console.log(mentor, "data222")

    return (
        <div
            key={sub._id}
            className="sub-card"
            style={{
                borderRadius: 20,
                background: "linear-gradient(140deg,#0098cc 0%,#006699 52%,#003d5c 100%)",
                padding: "20px 20px 18px",
                boxShadow: "0 18px 48px rgba(0,120,180,0.25)",
                position: "relative",
                overflow: "hidden",
                animation: `fadeUp .4s ease ${i * 0.07}s both`,
                display: "flex",
                flexDirection: "column",
                gap: 0,
            }}
        >
            {/* Deco blob */}
            <div style={{
                position: "absolute", top: -48, right: -48,
                width: 160, height: 160, borderRadius: "50%",
                background: "rgba(255,255,255,0.055)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: -30, left: -30,
                width: 100, height: 100, borderRadius: "50%",
                background: "rgba(255,255,255,0.03)", pointerEvents: "none",
            }} />

            {/* ── Pending Payment Banner ── */}
            {sub.payment_status === "pending" && (
                <div style={{
                    background: "rgba(253,230,138,0.13)",
                    border: "1px solid rgba(253,230,138,0.34)",
                    borderRadius: 10, padding: "8px 11px",
                    marginBottom: 14, position: "relative", zIndex: 1,
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: 8, flexWrap: "wrap",
                }}>
                    <span style={{
                        fontSize: 10, fontWeight: 700, color: "#fde68a",
                        display: "flex", alignItems: "center", gap: 5,
                    }}>
                        <AlertCircle size={11} color="#fde68a" />
                        Payment Incomplete
                    </span>
                    <button
                        className="pay-btn"
                        onClick={() => onPay(sub, mentor)}
                        style={{
                            background: "linear-gradient(90deg,#d4a84b,#f0c96a)",
                            border: "none", borderRadius: 7,
                            padding: "5px 13px", fontSize: 10, fontWeight: 800,
                            color: "#0a0a0a", cursor: "pointer",
                            whiteSpace: "nowrap", fontFamily: FONT,
                        }}
                    >
                        Complete Payment →
                    </button>
                </div>
            )}

            {/* ── Icon + Status ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, position: "relative", zIndex: 1 }}>
                <CreditCard size={26} color="rgba(255,255,255,0.58)" />
                <span style={{
                    fontSize: 10, fontWeight: 700, padding: "3px 10px",
                    borderRadius: 20,
                    background: statusColor(sub.status) + "28",
                    color: statusColor(sub.status),
                    display: "flex", alignItems: "center", gap: 4,
                }}>
                    <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: statusColor(sub.status), display: "inline-block",
                    }} />
                    {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
                </span>
            </div>

            {/* ── Amount ── */}
            <div style={{ position: "relative", zIndex: 1, marginBottom: 14 }}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                    Plan Amount
                </p>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1 }}>
                    ₹{sub.amount?.toLocaleString("en-IN")}
                </p>
            </div>

            {/* ── Meta row ── */}
            <div style={{
                display: "flex", justifyContent: "space-between",
                marginBottom: 12, gap: 6, position: "relative", zIndex: 1,
            }}>
                {[
                    ["Plan", planLabel(sub.plan_type), "left"],
                    ["Sessions", sub.total_sessions, "center"],
                    ["Expires", fmt(sub.effective_end_date), "right"],
                ].map(([lbl, val, align]) => (
                    <div key={lbl} style={{ textAlign: align, flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", textTransform: "uppercase", letterSpacing: 0.7, marginBottom: 3 }}>{lbl}</p>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", wordBreak: "break-word" }}>{val}</p>
                    </div>
                ))}
            </div>

            {/* Extension badge */}
            {sub.is_extended && (
                <div style={{
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 8, padding: "6px 10px", marginBottom: 12,
                    display: "flex", alignItems: "center", gap: 6, position: "relative", zIndex: 1,
                }}>
                    <CalendarClock size={12} color="#86efac" />
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#86efac" }}>
                        Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
                    </span>
                </div>
            )}

            <div style={{ height: 1, background: "rgba(255,255,255,0.09)", margin: "2px 0 12px", position: "relative", zIndex: 1 }} />

            {/* ── Bottom row ── */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
                <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: sub.payment_done ? "#86efac" : "#fde68a",
                    display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
                }}>
                    {sub.payment_done
                        ? <><CheckCircle2 size={11} color="#86efac" /> Paid</>
                        : sub.payment_status === "onprocess"
                            ? <><Clock size={11} color="#93c5fd" /> Processing</>
                            : <><Clock size={11} color="#fde68a" /> Pending</>}
                </span>
                <button
                    className="view-btn"
                    onClick={() => onView(sub, mentor)}
                    style={{
                        background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 8, padding: "5px 14px",
                        fontSize: 11, fontWeight: 700, color: "#fff",
                        cursor: "pointer", fontFamily: FONT,
                    }}
                >
                    View Details →
                </button>
            </div>
        </div>
    );
};


const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleCompletePayment = (sub, mentor) => {
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };

        console.log(mentor, "deayils")

        navigate("/payment", {
            state: {
                subscription_id: sub._id,
                mentorId: sub.mentor_id,
                mentorName: mentor?.fullName,
                mentorRole: mentor?.currentRole || '',
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
            mentorName: mentor?.fullName || '',
            mentorRole: mentor?.currentRole || '',
        });
    };

    return (
        <div style={{ minHeight: "100vh", background: "#eef5f9", fontFamily: FONT, padding: "32px 20px 72px" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        @keyframes shimmer { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
        @keyframes modalIn { from{opacity:0;transform:translateY(14px) scale(0.96)} to{opacity:1;transform:none} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        .sub-card { transition: transform 0.28s cubic-bezier(0.23,1,0.32,1), box-shadow 0.28s ease; }
        .sub-card:hover { transform: translateY(-6px) !important; box-shadow: 0 32px 72px rgba(0,120,180,0.38) !important; }
        .pay-btn  { transition: opacity 0.18s, transform 0.16s; }
        .pay-btn:hover  { opacity: 0.86; transform: translateY(-1px); }
        .view-btn { transition: background 0.18s; }
        .view-btn:hover { background: rgba(255,255,255,0.3) !important; }
        .close-btn { transition: background 0.18s; }
        .close-btn:hover { opacity: 0.88; }
        .subs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
        @media (max-width: 480px) { .subs-grid { grid-template-columns: 1fr; } }
        @media (min-width: 1100px) { .subs-grid { grid-template-columns: repeat(3, 1fr); } }
        .modal-scroll { max-height: 92vh; overflow-y: auto; -webkit-overflow-scrolling: touch; }
        @media (max-width: 480px) { .modal-overlay { align-items: flex-end !important; } .modal-inner { border-radius: 20px 20px 0 0 !important; } }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .skeleton { background: linear-gradient(90deg,#cfe4ef 25%,#b9d4e4 50%,#cfe4ef 75%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }
      `}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                {/* ── Page Header ── */}
                <div style={{ marginBottom: 28, animation: "fadeUp .38s ease both" }}>
                    <h1 style={{ fontSize: "clamp(18px,4vw,23px)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>
                        My Subscriptions
                    </h1>
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 5, lineHeight: 1.6 }}>
                        Your active and past mentorship plans
                    </p>
                </div>

                {/* ── Not logged in / Error ── */}
                {(!menteeId || isError) && (
                    <div style={{
                        background: "#fff5f5", borderRadius: 16, padding: "28px 24px",
                        textAlign: "center", border: "1px solid #fecaca",
                        maxWidth: 380, margin: "0 auto", animation: "fadeUp .38s ease both",
                    }}>
                        <AlertTriangle size={28} color="#dc2626" style={{ margin: "0 auto 10px", display: "block" }} />
                        <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
                            {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
                        </p>
                    </div>
                )}

                {/* ── Skeleton ── */}
                {menteeId && !isError && isLoading && (
                    <div className="subs-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="skeleton" style={{ height: 252, borderRadius: 20 }} />
                        ))}
                    </div>
                )}

                {/* ── Empty ── */}
                {menteeId && !isError && !isLoading && !subs.length && (
                    <div style={{
                        background: "#fff", borderRadius: 20, padding: "52px 32px",
                        textAlign: "center", border: "1px dashed #b0d8ee",
                        maxWidth: 400, margin: "0 auto", animation: "fadeUp .38s ease both",
                    }}>
                        <Inbox size={34} color="#94a3b8" style={{ margin: "0 auto 14px", display: "block" }} />
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>No Subscriptions Yet</h3>
                        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
                            Browse mentors and pick a plan to get started.
                        </p>
                    </div>
                )}

                {/* ── Cards ── */}
                {menteeId && !isError && !isLoading && subs.length > 0 && (
                    <div className="subs-grid">
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

            {/* ════════════════ MODAL ════════════════ */}
            {selected && (
                <div
                    className="modal-overlay"
                    onClick={() => setSelected(null)}
                    style={{
                        position: "fixed", inset: 0,
                        background: "rgba(0,10,22,0.55)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 1000, backdropFilter: "blur(5px)", padding: "16px",
                    }}
                >
                    <div
                        className="modal-inner modal-scroll"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff", borderRadius: 18,
                            width: "100%", maxWidth: 420,
                            boxShadow: "0 28px 72px rgba(0,80,130,0.24)",
                            overflow: "hidden",
                            animation: "modalIn .25s cubic-bezier(0.34,1.56,0.64,1) both",
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{
                            background: "linear-gradient(135deg,#0098cc,#005f8a)",
                            padding: "18px 20px 16px", position: "relative", overflow: "hidden",
                        }}>
                            <div style={{
                                position: "absolute", top: -28, right: -28, width: 110, height: 110,
                                borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none",
                            }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                                <div>
                                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.1, textTransform: "uppercase", color: "rgba(255,255,255,0.48)" }}>
                                        Subscription Details
                                    </span>
                                    <h2 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginTop: 4, letterSpacing: "-0.2px" }}>
                                        {planLabel(selected.plan_type)} Plan
                                    </h2>
                                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 2 }}>
                                        ID: {selected._id?.slice(-8).toUpperCase()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        background: "rgba(255,255,255,0.14)", border: "none",
                                        borderRadius: 8, width: 30, height: 30, cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                    }}
                                >
                                    <X size={15} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: "18px 20px 20px" }}>

                            {/* Status pills */}
                            <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
                                    background: statusColor(selected.status) + "18",
                                    color: statusColor(selected.status),
                                    display: "flex", alignItems: "center", gap: 4,
                                }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor(selected.status), display: "inline-block" }} />
                                    {selected.status?.charAt(0).toUpperCase() + selected.status?.slice(1)}
                                </span>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, padding: "4px 11px", borderRadius: 20,
                                    background: selected.payment_done ? "#ecfdf5" : "#fffbeb",
                                    color: selected.payment_done ? "#059669" : "#d97706",
                                    display: "flex", alignItems: "center", gap: 4,
                                }}>
                                    {selected.payment_done
                                        ? <><CheckCircle2 size={11} color="#059669" /> Payment Done</>
                                        : selected.payment_status === "onprocess"
                                            ? <><Clock size={11} color="#3b82f6" /> Processing</>
                                            : <><Clock size={11} color="#d97706" /> Pending</>}
                                </span>
                            </div>

                            {/* Extension info */}
                            {selected.is_extended && (
                                <div style={{
                                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                                    borderRadius: 10, padding: "10px 12px", marginBottom: 14,
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                                        <TrendingUp size={13} color="#059669" />
                                        <p style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>
                                            Plan Extended — {selected.extended_days} days added
                                        </p>
                                    </div>
                                    {selected.extensions?.map((ext, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                                            <CalendarDays size={10} color="#16a34a" />
                                            <p style={{ fontSize: 10, color: "#16a34a" }}>
                                                +{ext.added_days} day{ext.added_days > 1 ? "s" : ""} · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Info grid */}
                            <div className="info-grid" style={{ marginBottom: 16 }}>
                                {[
                                    ["Total Sessions", `${selected.total_sessions} sessions`, false],
                                    ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`, false],
                                    ["Start Date", fmt(selected.subscribed_at), false],
                                    ["Original End", fmt(selected.subscription_end_date), false],
                                    ["Extended Days", `+${selected.extended_days || 0} days`, false],
                                    ["Effective End", fmt(selected.effective_end_date), true],
                                ].map(([label, value, highlight]) => (
                                    <div key={label} style={{
                                        background: highlight ? "#f0fdf4" : "#f8fafc",
                                        borderRadius: 9, padding: "8px 10px",
                                        border: `1px solid ${highlight ? "#bbf7d0" : "#f1f5f9"}`,
                                    }}>
                                        <p style={{
                                            fontSize: 8, fontWeight: 700, letterSpacing: 0.7,
                                            textTransform: "uppercase",
                                            color: highlight ? "#059669" : "#94a3b8", marginBottom: 3,
                                        }}>{label}</p>
                                        <p style={{ fontSize: 12, fontWeight: 700, color: highlight ? "#059669" : "#1e293b" }}>
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Complete Payment CTA */}
                            {selected.payment_status === "pending" && (
                                <button
                                    className="pay-btn"
                                    onClick={() => handleCompletePayment(selected, {
                                        fullName: selected.mentorName,
                                        currentRole: selected.mentorRole
                                    })} style={{
                                        width: "100%",
                                        background: "linear-gradient(90deg,#d4a84b,#f0c96a)",
                                        color: "#0a0a0a", border: "none", borderRadius: 10,
                                        padding: "13px", fontSize: 14, fontWeight: 800,
                                        cursor: "pointer", marginBottom: 9, fontFamily: FONT,
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                                    }}
                                >
                                    <CreditCard size={15} />
                                    Complete Your Payment →
                                </button>
                            )}

                            {/* Close */}
                            <button
                                className="close-btn"
                                onClick={() => setSelected(null)}
                                style={{
                                    width: "100%",
                                    background: selected.payment_status === "pending" ? "#f8fafc" : "linear-gradient(135deg,#0098cc,#005f8a)",
                                    color: selected.payment_status === "pending" ? "#64748b" : "#fff",
                                    border: selected.payment_status === "pending" ? "1px solid #e2e8f0" : "none",
                                    borderRadius: 10, padding: "12px",
                                    fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscriptionplan;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
// // import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";

// // /* ─── helpers ──────────────────────────────────────────────────── */
// // const fmt = (iso) =>
// //   iso
// //     ? new Date(iso).toLocaleDateString("en-IN", {
// //         day: "2-digit", month: "short", year: "numeric",
// //       })
// //     : "—";

// // const planLabel = (t) =>
// //   ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
// //     t?.replace(/_/g, " ") || "—");

// // /* ─── Payment Alert (Jio/Airtel style full-screen interrupt) ───── */
// // const PaymentAlert = ({ sub, mentor, onPay, onDismiss }) => {
// //   const [closing, setClosing] = useState(false);

// //   const close = () => {
// //     setClosing(true);
// //     setTimeout(onDismiss, 320);
// //   };

// //   return (
// //     <div
// //       onClick={close}
// //       style={{
// //         position: "fixed", inset: 0, zIndex: 9999,
// //         background: "rgba(0,8,20,0.82)",
// //         backdropFilter: "blur(8px) saturate(1.4)",
// //         display: "flex", alignItems: "center", justifyContent: "center",
// //         padding: 20,
// //         animation: closing
// //           ? "alertFadeOut 0.32s ease forwards"
// //           : "alertFadeIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
// //       }}
// //     >
// //       <style>{`
// //         @keyframes alertFadeIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
// //         @keyframes alertFadeOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.94)} }
// //         @keyframes pulseRing    { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.14);opacity:0} }
// //         @keyframes badgePop     { from{transform:scale(0) rotate(-12deg)} to{transform:scale(1) rotate(0)} }
// //         @keyframes slideUp      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
// //       `}</style>

// //       <div
// //         onClick={(e) => e.stopPropagation()}
// //         style={{
// //           width: "100%", maxWidth: 380,
// //           background: "#fff",
// //           borderRadius: 24,
// //           overflow: "hidden",
// //           boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
// //         }}
// //       >
// //         {/* ── Top alert band ── */}
// //         <div style={{
// //           background: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 100%)",
// //           padding: "28px 24px 22px",
// //           textAlign: "center",
// //           position: "relative",
// //           overflow: "hidden",
// //         }}>
// //           {/* pulsing rings */}
// //           {[80, 110, 140].map((s, i) => (
// //             <div key={i} style={{
// //               position: "absolute", top: "50%", left: "50%",
// //               width: s, height: s, borderRadius: "50%",
// //               border: "2px solid rgba(255,255,255,0.3)",
// //               transform: "translate(-50%,-50%)",
// //               animation: `pulseRing 2.4s ease ${i * 0.5}s infinite`,
// //               pointerEvents: "none",
// //             }} />
// //           ))}

// //           {/* bell icon */}
// //           <div style={{
// //             width: 56, height: 56, borderRadius: "50%",
// //             background: "rgba(255,255,255,0.25)",
// //             margin: "0 auto 14px",
// //             display: "flex", alignItems: "center", justifyContent: "center",
// //             position: "relative", zIndex: 1,
// //             animation: "badgePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
// //           }}>
// //             <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2">
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M15 17H9m6 0a3 3 0 01-6 0m6 0H5.6A2 2 0 013.6 15l1.4-7.5A4 4 0 019 4h6a4 4 0 013.97 3.5L20.4 15a2 2 0 01-2 2H15z" />
// //             </svg>
// //           </div>

// //           <p style={{
// //             fontSize: 11, fontWeight: 800, letterSpacing: 1.4,
// //             textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
// //             marginBottom: 6, position: "relative", zIndex: 1,
// //           }}>
// //             Action Required
// //           </p>
// //           <h2 style={{
// //             fontSize: 20, fontWeight: 900, color: "#fff",
// //             letterSpacing: "-0.4px", lineHeight: 1.25,
// //             position: "relative", zIndex: 1,
// //           }}>
// //             Payment Pending
// //           </h2>
// //         </div>

// //         {/* ── Body ── */}
// //         <div style={{ padding: "20px 24px 24px" }}>
// //           {/* plan summary pill */}
// //           <div style={{
// //             background: "#f8fafc",
// //             border: "1px solid #e8f0fe",
// //             borderRadius: 14, padding: "12px 16px",
// //             marginBottom: 20,
// //             animation: "slideUp 0.4s ease 0.15s both",
// //           }}>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
// //               <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8 }}>
// //                 Subscription Plan
// //               </span>
// //               <span style={{
// //                 fontSize: 9, fontWeight: 800, color: "#0098cc",
// //                 background: "#e0f2fe", borderRadius: 20, padding: "2px 8px",
// //                 textTransform: "uppercase", letterSpacing: 0.5,
// //               }}>
// //                 {planLabel(sub.plan_type)}
// //               </span>
// //             </div>
// //             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
// //               <div>
// //                 <p style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>
// //                   {mentor?.fullName || "Your Mentor"} · {sub.total_sessions} sessions
// //                 </p>
// //                 <p style={{ fontSize: 10, color: "#94a3b8" }}>
// //                   Expires {fmt(sub.effective_end_date)}
// //                 </p>
// //               </div>
// //               <div style={{ textAlign: "right" }}>
// //                 <p style={{ fontSize: 9, color: "#94a3b8", marginBottom: 1 }}>Amount</p>
// //                 <p style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px" }}>
// //                   ₹{sub.amount?.toLocaleString("en-IN")}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           <p style={{
// //             fontSize: 12, color: "#64748b", lineHeight: 1.65,
// //             marginBottom: 20, textAlign: "center",
// //             animation: "slideUp 0.4s ease 0.22s both",
// //           }}>
// //             Your subscription is active but payment hasn't been confirmed yet. Complete now to avoid interruption.
// //           </p>

// //           {/* CTA buttons */}
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "slideUp 0.4s ease 0.28s both" }}>
// //             <button
// //               onClick={() => { onPay(sub, mentor); close(); }}
// //               style={{
// //                 width: "100%", padding: "15px",
// //                 background: "linear-gradient(135deg, #0098cc, #005f8a)",
// //                 color: "#fff", border: "none", borderRadius: 14,
// //                 fontSize: 14, fontWeight: 800,
// //                 cursor: "pointer", letterSpacing: "-0.1px",
// //                 display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
// //                 boxShadow: "0 8px 24px rgba(0,152,204,0.38)",
// //                 transition: "transform 0.15s, box-shadow 0.15s",
// //               }}
// //               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,152,204,0.48)"; }}
// //               onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,152,204,0.38)"; }}
// //             >
// //               <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h.01M11 15h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
// //               </svg>
// //               Pay ₹{sub.amount?.toLocaleString("en-IN")} Now
// //             </button>

// //             <button
// //               onClick={close}
// //               style={{
// //                 width: "100%", padding: "12px",
// //                 background: "transparent", color: "#94a3b8",
// //                 border: "1px solid #e2e8f0", borderRadius: 12,
// //                 fontSize: 12, fontWeight: 600, cursor: "pointer",
// //               }}
// //             >
// //               Remind me later
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── Single subscription card ──────────────────────────────────── */
// // const SubscriptionCard = ({ sub, i, onPay, navigate }) => {
// //   const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

// //   const isApproved = sub.payment_status === "approved";
// //   const isPaid = sub.payment_done;
// //   const isActive = sub.status === "active";

// //   return (
// //     <div
// //       style={{
// //         background: "#fff",
// //         borderRadius: 20,
// //         overflow: "hidden",
// //         border: "1px solid #e8f1f8",
// //         boxShadow: "0 4px 24px rgba(0,80,140,0.07)",
// //         animation: `slideUp 0.38s ease ${i * 0.08}s both`,
// //         display: "flex", flexDirection: "column",
// //         transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease",
// //       }}
// //       onMouseEnter={e => {
// //         e.currentTarget.style.transform = "translateY(-4px)";
// //         e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,80,140,0.14)";
// //       }}
// //       onMouseLeave={e => {
// //         e.currentTarget.style.transform = "none";
// //         e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,80,140,0.07)";
// //       }}
// //     >
// //       {/* Card top stripe */}
// //       <div style={{
// //         background: isActive
// //           ? "linear-gradient(135deg, #0098cc 0%, #005f8a 100%)"
// //           : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
// //         padding: "18px 20px 16px",
// //         position: "relative", overflow: "hidden",
// //       }}>
// //         <div style={{
// //           position: "absolute", top: -30, right: -30,
// //           width: 120, height: 120, borderRadius: "50%",
// //           background: "rgba(255,255,255,0.07)", pointerEvents: "none",
// //         }} />

// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
// //           <div>
// //             <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.52)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
// //               Mentorship Plan
// //             </p>
// //             <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>
// //               {planLabel(sub.plan_type)}
// //             </h3>
// //             {mentor?.fullName && (
// //               <p style={{ fontSize: 11, color: "rgba(255,255,255,0.58)", marginTop: 3 }}>
// //                 with {mentor.fullName}
// //               </p>
// //             )}
// //           </div>

// //           {/* Status pill */}
// //           <span style={{
// //             fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 20,
// //             background: isActive ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.3)",
// //             color: isActive ? "#6ee7b7" : "#cbd5e1",
// //             textTransform: "uppercase", letterSpacing: 0.6,
// //             display: "flex", alignItems: "center", gap: 4,
// //             whiteSpace: "nowrap", flexShrink: 0,
// //           }}>
// //             <span style={{
// //               width: 5, height: 5, borderRadius: "50%",
// //               background: isActive ? "#10b981" : "#94a3b8",
// //             }} />
// //             {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
// //           </span>
// //         </div>

// //         {/* Amount */}
// //         <div style={{ marginTop: 14, position: "relative" }}>
// //           <p style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Amount</p>
// //           <p style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
// //             ₹{sub.amount?.toLocaleString("en-IN")}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Card body */}
// //       <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>

// //         {/* Info grid */}
// //         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
// //           {[
// //             ["Sessions", `${sub.total_sessions}`],
// //             ["Started", fmt(sub.subscribed_at)],
// //             ["Expires", fmt(sub.effective_end_date)],
// //           ].map(([label, value]) => (
// //             <div key={label} style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 10px", border: "1px solid #f1f5f9" }}>
// //               <p style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>
// //                 {label}
// //               </p>
// //               <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>{value}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Payment status row */}
// //         <div style={{
// //           display: "flex", alignItems: "center", justifyContent: "space-between",
// //           padding: "10px 14px",
// //           background: isApproved
// //             ? (isPaid ? "#f0fdf4" : "#fffbeb")
// //             : "#fff5f5",
// //           borderRadius: 12,
// //           border: `1px solid ${isApproved ? (isPaid ? "#bbf7d0" : "#fde68a") : "#fecaca"}`,
// //         }}>
// //           <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //             {isApproved ? (
// //               isPaid ? (
// //                 <>
// //                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2.5">
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                   </svg>
// //                   <span style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>Payment Confirmed</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth="2.5">
// //                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
// //                   </svg>
// //                   <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706" }}>Payment Pending</span>
// //                 </>
// //               )
// //             ) : (
// //               <>
// //                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.5">
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                 </svg>
// //                 <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>Pending Approval</span>
// //               </>
// //             )}
// //           </div>

// //           {/* Pay button — only if approved + not paid */}
// //           {isApproved && !isPaid && (
// //             <button
// //               onClick={() => onPay(sub, mentor)}
// //               style={{
// //                 background: "linear-gradient(90deg, #0098cc, #005f8a)",
// //                 color: "#fff", border: "none", borderRadius: 8,
// //                 padding: "6px 14px", fontSize: 10, fontWeight: 800,
// //                 cursor: "pointer", letterSpacing: 0.3,
// //                 boxShadow: "0 4px 12px rgba(0,152,204,0.3)",
// //               }}
// //             >
// //               Pay Now
// //             </button>
// //           )}
// //         </div>

// //         {/* Mentee type */}
// //         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// //           <span style={{
// //             fontSize: 9, fontWeight: 700, color: "#0098cc",
// //             background: "#e0f2fe", borderRadius: 20, padding: "3px 10px",
// //             textTransform: "capitalize", letterSpacing: 0.5,
// //           }}>
// //             {sub.mentee_status || "mentee"}
// //           </span>
// //           <span style={{ fontSize: 10, color: "#94a3b8" }}>
// //             Subscribed {fmt(sub.subscribed_at)}
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ─── Main Component ────────────────────────────────────────────── */
// // const Subscriptionplan = () => {
// //   const navigate = useNavigate();
// //   const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
// //   const userData = JSON.parse(localStorage.getItem("userData") || "{}");

// //   const { data: res, isLoading, isError } =
// //     useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

// //   // Handle both shapes: array directly, or { success, data: [] }
// //   const subs = Array.isArray(res)
// //     ? res
// //     : Array.isArray(res?.data)
// //       ? res.data
// //       : [];

// //   // ── Find first subscription needing payment → show popup on mount
// //   const [alertSub, setAlertSub] = useState(null);
// //   const [alertMentor, setAlertMentor] = useState(null);

// //   // We use a helper inner component to fetch mentor for the alert sub
// //   const pendingPaymentSub = subs.find(
// //     (s) => s.payment_status === "approved" && !s.payment_done
// //   );

// //   useEffect(() => {
// //     if (pendingPaymentSub) {
// //       // Small delay so page renders first (Jio/Airtel style — appears ~500ms after load)
// //       const t = setTimeout(() => setAlertSub(pendingPaymentSub), 600);
// //       return () => clearTimeout(t);
// //     }
// //   }, [pendingPaymentSub?._id]);

// //   const handlePay = (sub, mentor) => {
// //     const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };
// //     navigate("/payment", {
// //       state: {
// //         subscription_id: sub._id,
// //         mentorId: sub.mentor_id,
// //         mentorName: mentor?.fullName || "",
// //         mentorRole: mentor?.currentRole || "",
// //         menteeId: sub.mentee_id,
// //         menteeName: userData.name,
// //         planMonths: planMonthsMap[sub.plan_type],
// //         totalSessions: sub.total_sessions,
// //         paymentType: "subcription",
// //         basePrice: sub.amount,
// //         createdBy: sub.mentee_id,
// //       },
// //     });
// //   };

// //   return (
// //     <div style={{
// //       minHeight: "100vh",
// //       background: "#f0f6fb",
// //       fontFamily: `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
// //       padding: "32px 20px 72px",
// //     }}>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
// //         @keyframes slideUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
// //         @keyframes pulseRing { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5} 50%{transform:translate(-50%,-50%) scale(1.18);opacity:0} }
// //         @keyframes alertFadeIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
// //         @keyframes alertFadeOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.94)} }
// //         @keyframes badgePop  { from{transform:scale(0) rotate(-12deg)} to{transform:scale(1) rotate(0)} }
// //         @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
// //         .subs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
// //         @media(max-width:480px){.subs-grid{grid-template-columns:1fr;}}
// //         @media(min-width:1100px){.subs-grid{grid-template-columns:repeat(3,1fr);}}
// //         .skeleton { background:linear-gradient(90deg,#d9e9f3 25%,#c5dcea 50%,#d9e9f3 75%); background-size:800px 100%; animation:shimmer 1.4s infinite linear; border-radius:20px; }
// //       `}</style>

// //       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
// //         {/* Header */}
// //         <div style={{ marginBottom: 28, animation: "slideUp 0.35s ease both" }}>
// //           <h1 style={{
// //             fontSize: "clamp(20px,4vw,26px)", fontWeight: 900,
// //             color: "#0f172a", letterSpacing: "-0.5px",
// //           }}>
// //             My Subscriptions
// //           </h1>
// //           <p style={{ fontSize: 13, color: "#64748b", marginTop: 5 }}>
// //             Your active and past mentorship plans
// //           </p>
// //         </div>

// //         {/* Error / not logged in */}
// //         {(!menteeId || isError) && (
// //           <div style={{
// //             background: "#fff5f5", borderRadius: 16, padding: "28px 24px",
// //             textAlign: "center", border: "1px solid #fecaca",
// //             maxWidth: 380, margin: "0 auto", animation: "slideUp 0.35s ease both",
// //           }}>
// //             <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
// //               {!menteeId ? "Please log in to view subscriptions." : "Failed to load subscriptions."}
// //             </p>
// //           </div>
// //         )}

// //         {/* Skeleton */}
// //         {menteeId && !isError && isLoading && (
// //           <div className="subs-grid">
// //             {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 280 }} />)}
// //           </div>
// //         )}

// //         {/* Empty */}
// //         {menteeId && !isError && !isLoading && subs.length === 0 && (
// //           <div style={{
// //             background: "#fff", borderRadius: 20, padding: "52px 32px",
// //             textAlign: "center", border: "1px dashed #b0d8ee",
// //             maxWidth: 400, margin: "0 auto", animation: "slideUp 0.35s ease both",
// //           }}>
// //             <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: "0 auto 14px", display: "block" }}>
// //               <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
// //             </svg>
// //             <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>No Subscriptions Yet</h3>
// //             <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
// //               Browse mentors and pick a plan to get started.
// //             </p>
// //           </div>
// //         )}

// //         {/* Cards */}
// //         {menteeId && !isError && !isLoading && subs.length > 0 && (
// //           <div className="subs-grid">
// //             {subs.map((sub, i) => (
// //               <SubscriptionCard
// //                 key={sub._id}
// //                 sub={sub}
// //                 i={i}
// //                 onPay={handlePay}
// //                 navigate={navigate}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* ── Payment Alert popup (auto-shown on mount if payment pending) ── */}
// //       {alertSub && (
// //         <AlertMentorFetcher
// //           sub={alertSub}
// //           onReady={(mentor) => setAlertMentor(mentor)}
// //         />
// //       )}
// //       {alertSub && alertMentor !== undefined && (
// //         <PaymentAlert
// //           sub={alertSub}
// //           mentor={alertMentor}
// //           onPay={handlePay}
// //           onDismiss={() => { setAlertSub(null); setAlertMentor(null); }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // /* ─── Helper: fetch mentor for alert without conditional hook ──── */
// // const AlertMentorFetcher = ({ sub, onReady }) => {
// //   const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);
// //   useEffect(() => {
// //     if (mentor !== undefined) onReady(mentor);
// //   }, [mentor]);
// //   return null;
// // };

// // export default Subscriptionplan;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
// import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";

// /* ─── helpers ──────────────────────────────────────────────────── */
// const fmt = (iso) =>
//   iso
//     ? new Date(iso).toLocaleDateString("en-IN", {
//         day: "2-digit", month: "short", year: "numeric",
//       })
//     : "—";

// const planLabel = (t) =>
//   ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
//     t?.replace(/_/g, " ") || "—");

// /* ─── Payment Alert (Jio/Airtel style full-screen interrupt) ───── */
// const PaymentAlert = ({ sub, mentor, onPay, onDismiss }) => {
//   const [closing, setClosing] = useState(false);

//   const close = () => {
//     setClosing(true);
//     setTimeout(onDismiss, 320);
//   };

//   return (
//     <div
//       onClick={close}
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,8,20,0.82)",
//         backdropFilter: "blur(8px) saturate(1.4)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: 20,
//         animation: closing
//           ? "alertFadeOut 0.32s ease forwards"
//           : "alertFadeIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
//       }}
//     >
//       <style>{`
//         @keyframes alertFadeIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
//         @keyframes alertFadeOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.94)} }
//         @keyframes pulseRing    { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.14);opacity:0} }
//         @keyframes badgePop     { from{transform:scale(0) rotate(-12deg)} to{transform:scale(1) rotate(0)} }
//         @keyframes slideUp      { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
//       `}</style>

//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%", maxWidth: 380,
//           background: "#fff",
//           borderRadius: 24,
//           overflow: "hidden",
//           boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
//         }}
//       >
//         {/* ── Top alert band ── */}
//         <div style={{
//           background: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 100%)",
//           padding: "28px 24px 22px",
//           textAlign: "center",
//           position: "relative",
//           overflow: "hidden",
//         }}>



//           <p style={{
//             fontSize: 11, fontWeight: 800, letterSpacing: 1.4,
//             textTransform: "uppercase", color: "rgba(255,255,255,0.75)",
//             marginBottom: 6, position: "relative", zIndex: 1,
//           }}>
//             Action Required
//           </p>
//           <h2 style={{
//             fontSize: 20, fontWeight: 900, color: "#fff",
//             letterSpacing: "-0.4px", lineHeight: 1.25,
//             position: "relative", zIndex: 1,
//           }}>
//             Payment Pending
//           </h2>
//         </div>

//         {/* ── Body ── */}
//         <div style={{ padding: "20px 24px 24px" }}>
//           {/* plan summary pill */}
//           <div style={{
//             background: "#f8fafc",
//             border: "1px solid #e8f0fe",
//             borderRadius: 14, padding: "12px 16px",
//             marginBottom: 20,
//             animation: "slideUp 0.4s ease 0.15s both",
//           }}>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//               <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.8 }}>
//                 Subscription Plan
//               </span>
//               <span style={{
//                 fontSize: 9, fontWeight: 800, color: "#0098cc",
//                 background: "#e0f2fe", borderRadius: 20, padding: "2px 8px",
//                 textTransform: "uppercase", letterSpacing: 0.5,
//               }}>
//                 {planLabel(sub.plan_type)}
//               </span>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
//               <div>
//                 <p style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>
//                   {mentor?.fullName || "Your Mentor"} · {sub.total_sessions} sessions
//                 </p>
//                 <p style={{ fontSize: 10, color: "#94a3b8" }}>
//                   Expires {fmt(sub.effective_end_date)}
//                 </p>
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <p style={{ fontSize: 9, color: "#94a3b8", marginBottom: 1 }}>Amount</p>
//                 <p style={{ fontSize: 22, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.5px" }}>
//                   ₹{sub.amount?.toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <p style={{
//             fontSize: 12, color: "#64748b", lineHeight: 1.65,
//             marginBottom: 20, textAlign: "center",
//             animation: "slideUp 0.4s ease 0.22s both",
//           }}>
//             Your subscription is active but payment hasn't been confirmed yet. Complete now to avoid interruption.
//           </p>

//           {/* CTA buttons */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "slideUp 0.4s ease 0.28s both" }}>
//             <button
//               onClick={() => { onPay(sub, mentor); close(); }}
//               style={{
//                 width: "100%", padding: "15px",
//                 background: "linear-gradient(135deg, #0098cc, #005f8a)",
//                 color: "#fff", border: "none", borderRadius: 14,
//                 fontSize: 14, fontWeight: 800,
//                 cursor: "pointer", letterSpacing: "-0.1px",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                 boxShadow: "0 8px 24px rgba(0,152,204,0.38)",
//                 transition: "transform 0.15s, box-shadow 0.15s",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,152,204,0.48)"; }}
//               onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,152,204,0.38)"; }}
//             >
//               <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h.01M11 15h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//               </svg>
//               Pay ₹{sub.amount?.toLocaleString("en-IN")} Now
//             </button>

//             <button
//               onClick={close}
//               style={{
//                 width: "100%", padding: "12px",
//                 background: "transparent", color: "#94a3b8",
//                 border: "1px solid #e2e8f0", borderRadius: 12,
//                 fontSize: 12, fontWeight: 600, cursor: "pointer",
//               }}
//             >
//               Remind me later
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Single subscription card ──────────────────────────────────── */
// const SubscriptionCard = ({ sub, i, onPay, navigate }) => {
//   const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

//   const isApproved = sub.payment_status?.toLowerCase()?.trim() === "approved";
//   const isPaid = sub.payment_done;
//   const isActive = sub.status === "active";

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: 20,
//         overflow: "hidden",
//         border: "1px solid #e8f1f8",
//         boxShadow: "0 4px 24px rgba(0,80,140,0.07)",
//         animation: `slideUp 0.38s ease ${i * 0.08}s both`,
//         display: "flex", flexDirection: "column",
//         transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s ease",
//       }}
//       onMouseEnter={e => {
//         e.currentTarget.style.transform = "translateY(-4px)";
//         e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,80,140,0.14)";
//       }}
//       onMouseLeave={e => {
//         e.currentTarget.style.transform = "none";
//         e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,80,140,0.07)";
//       }}
//     >
//       {/* Card top stripe */}
//       <div style={{
//         background: isActive
//           ? "linear-gradient(135deg, #0098cc 0%, #005f8a 100%)"
//           : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
//         padding: "18px 20px 16px",
//         position: "relative", overflow: "hidden",
//       }}>
//         <div style={{
//           position: "absolute", top: -30, right: -30,
//           width: 120, height: 120, borderRadius: "50%",
//           background: "rgba(255,255,255,0.07)", pointerEvents: "none",
//         }} />

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
//           <div>
//             <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.52)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
//               Mentorship Plan
//             </p>
//             <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.3px" }}>
//               {planLabel(sub.plan_type)}
//             </h3>
//             {mentor?.fullName && (
//               <p style={{ fontSize: 11, color: "rgba(255,255,255,0.58)", marginTop: 3 }}>
//                 with {mentor.fullName}
//               </p>
//             )}
//           </div>

//           {/* Status pill */}
//           <span style={{
//             fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 20,
//             background: isActive ? "rgba(16,185,129,0.2)" : "rgba(100,116,139,0.3)",
//             color: isActive ? "#6ee7b7" : "#cbd5e1",
//             textTransform: "uppercase", letterSpacing: 0.6,
//             display: "flex", alignItems: "center", gap: 4,
//             whiteSpace: "nowrap", flexShrink: 0,
//           }}>
//             <span style={{
//               width: 5, height: 5, borderRadius: "50%",
//               background: isActive ? "#10b981" : "#94a3b8",
//             }} />
//             {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
//           </span>
//         </div>

//         {/* Amount */}
//         <div style={{ marginTop: 14, position: "relative" }}>
//           <p style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Amount</p>
//           <p style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
//             ₹{sub.amount?.toLocaleString("en-IN")}
//           </p>
//         </div>
//       </div>

//       {/* Card body */}
//       <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>

//         {/* Info grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
//           {[
//             ["Sessions", `${sub.total_sessions}`],
//             ["Started", fmt(sub.subscribed_at)],
//             ["Expires", fmt(sub.effective_end_date)],
//           ].map(([label, value]) => (
//             <div key={label} style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 10px", border: "1px solid #f1f5f9" }}>
//               <p style={{ fontSize: 8, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3 }}>
//                 {label}
//               </p>
//               <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>{value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Payment status row */}
//         <div style={{
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           padding: "10px 14px",
//           background: isApproved
//             ? (isPaid ? "#f0fdf4" : "#fffbeb")
//             : "#fff5f5",
//           borderRadius: 12,
//           border: `1px solid ${isApproved ? (isPaid ? "#bbf7d0" : "#fde68a") : "#fecaca"}`,
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//             {isApproved ? (
//               isPaid ? (
//                 <>
//                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="2.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>Payment Confirmed</span>
//                 </>
//               ) : (
//                 <>
//                   <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth="2.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//                   </svg>
//                   <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706" }}>Payment Pending</span>
//                 </>
//               )
//             ) : (
//               <>
//                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth="2.5">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>Pending Approval</span>
//               </>
//             )}
//           </div>

//           {/* Pay button — only if approved + not paid */}
//           {isApproved && !isPaid && (
//             <button
//               onClick={() => onPay(sub, mentor)}
//               style={{
//                 background: "linear-gradient(90deg, #0098cc, #005f8a)",
//                 color: "#fff", border: "none", borderRadius: 8,
//                 padding: "6px 14px", fontSize: 10, fontWeight: 800,
//                 cursor: "pointer", letterSpacing: 0.3,
//                 boxShadow: "0 4px 12px rgba(0,152,204,0.3)",
//               }}
//             >
//               Pay Now
//             </button>
//           )}
//         </div>

//         {/* Mentee type */}
//         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//           <span style={{
//             fontSize: 9, fontWeight: 700, color: "#0098cc",
//             background: "#e0f2fe", borderRadius: 20, padding: "3px 10px",
//             textTransform: "capitalize", letterSpacing: 0.5,
//           }}>
//             {sub.mentee_status || "mentee"}
//           </span>
//           <span style={{ fontSize: 10, color: "#94a3b8" }}>
//             Subscribed {fmt(sub.subscribed_at)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Main Component ────────────────────────────────────────────── */
// const Subscriptionplan = () => {
//   const navigate = useNavigate();
//   const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");

//   const { data: res, isLoading, isError } =
//     useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

//   // Handle both shapes: array directly, or { success, data: [] }
//   const subs = Array.isArray(res)
//     ? res
//     : Array.isArray(res?.data)
//       ? res.data
//       : [];

//   // ── Find first subscription needing payment → show popup on mount
//   const [alertSub, setAlertSub] = useState(null);
//   const [alertMentor, setAlertMentor] = useState(null);

//   // We use a helper inner component to fetch mentor for the alert sub
//   const pendingPaymentSub = subs.find(
//     (s) => s.payment_status === "approved" && !s.payment_done
//   );

//   useEffect(() => {
//     if (pendingPaymentSub) {
//       // Small delay so page renders first (Jio/Airtel style — appears ~500ms after load)
//       const t = setTimeout(() => setAlertSub(pendingPaymentSub), 600);
//       return () => clearTimeout(t);
//     }
//   }, [pendingPaymentSub?._id]);

//   const handlePay = (sub, mentor) => {
//     const planMonthsMap = { one_month: 1, three_months: 3, six_months: 6 };
//     navigate("/payment", {
//       state: {
//         subscription_id: sub._id,
//         mentorId: sub.mentor_id,
//         mentorName: mentor?.fullName || "",
//         mentorRole: mentor?.currentRole || "",
//         menteeId: sub.mentee_id,
//         menteeName: userData.name,
//         planMonths: planMonthsMap[sub.plan_type],
//         totalSessions: sub.total_sessions,
//         paymentType: "subcription",
//         basePrice: sub.amount,
//         createdBy: sub.mentee_id,
//       },
//     });
//   };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#f0f6fb",
//       fontFamily: `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
//       padding: "32px 20px 72px",
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800;9..40,900&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         @keyframes slideUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }
//         @keyframes pulseRing { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5} 50%{transform:translate(-50%,-50%) scale(1.18);opacity:0} }
//         @keyframes alertFadeIn  { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
//         @keyframes alertFadeOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.94)} }
//         @keyframes badgePop  { from{transform:scale(0) rotate(-12deg)} to{transform:scale(1) rotate(0)} }
//         @keyframes shimmer   { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
//         .subs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
//         @media(max-width:480px){.subs-grid{grid-template-columns:1fr;}}
//         @media(min-width:1100px){.subs-grid{grid-template-columns:repeat(3,1fr);}}
//         .skeleton { background:linear-gradient(90deg,#d9e9f3 25%,#c5dcea 50%,#d9e9f3 75%); background-size:800px 100%; animation:shimmer 1.4s infinite linear; border-radius:20px; }
//       `}</style>

//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         {/* Header */}
//         <div style={{ marginBottom: 28, animation: "slideUp 0.35s ease both" }}>
//           <h1 style={{
//             fontSize: "clamp(20px,4vw,26px)", fontWeight: 900,
//             color: "#0f172a", letterSpacing: "-0.5px",
//           }}>
//             My Subscriptions
//           </h1>
//           <p style={{ fontSize: 13, color: "#64748b", marginTop: 5 }}>
//             Your active and past mentorship plans
//           </p>
//         </div>

//         {/* Error / not logged in */}
//         {(!menteeId || isError) && (
//           <div style={{
//             background: "#fff5f5", borderRadius: 16, padding: "28px 24px",
//             textAlign: "center", border: "1px solid #fecaca",
//             maxWidth: 380, margin: "0 auto", animation: "slideUp 0.35s ease both",
//           }}>
//             <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
//               {!menteeId ? "Please log in to view subscriptions." : "Failed to load subscriptions."}
//             </p>
//           </div>
//         )}

//         {/* Skeleton */}
//         {menteeId && !isError && isLoading && (
//           <div className="subs-grid">
//             {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 280 }} />)}
//           </div>
//         )}

//         {/* Empty */}
//         {menteeId && !isError && !isLoading && subs.length === 0 && (
//           <div style={{
//             background: "#fff", borderRadius: 20, padding: "52px 32px",
//             textAlign: "center", border: "1px dashed #b0d8ee",
//             maxWidth: 400, margin: "0 auto", animation: "slideUp 0.35s ease both",
//           }}>
//             <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="1.5" style={{ margin: "0 auto 14px", display: "block" }}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
//             </svg>
//             <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>No Subscriptions Yet</h3>
//             <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
//               Browse mentors and pick a plan to get started.
//             </p>
//           </div>
//         )}

//         {/* Cards */}
//         {menteeId && !isError && !isLoading && subs.length > 0 && (
//           <div className="subs-grid">
//             {subs.map((sub, i) => (
//               <SubscriptionCard
//                 key={sub._id}
//                 sub={sub}
//                 i={i}
//                 onPay={handlePay}
//                 navigate={navigate}
//               />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── Payment Alert popup (auto-shown on mount if payment pending) ── */}
//       {alertSub && (
//         <AlertMentorFetcher
//           sub={alertSub}
//           onReady={(mentor) => setAlertMentor(mentor)}
//         />
//       )}
//       {alertSub && alertMentor !== undefined && (
//         <PaymentAlert
//           sub={alertSub}
//           mentor={alertMentor}
//           onPay={handlePay}
//           onDismiss={() => { setAlertSub(null); setAlertMentor(null); }}
//         />
//       )}
//     </div>
//   );
// };

// /* ─── Helper: fetch mentor for alert without conditional hook ──── */
// const AlertMentorFetcher = ({ sub, onReady }) => {
//   const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);
//   useEffect(() => {
//     if (mentor !== undefined) onReady(mentor);
//   }, [mentor]);
//   return null;
// };

// export default Subscriptionplan;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
// import { useFetchMentorByIdQuery } from "../../topMentors/Mentorsectionapislice";

// /* ─── 3 colors only ─────────────────────────────────────────────── */
// const C = {
//     bg: "#ffffff",
//     card: "#0098cc",
//     btn: "#1a1a2e",
// };

// /* ─── Helpers ───────────────────────────────────────────────────── */
// const fmt = (iso) =>
//     iso
//         ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//         : "—";

// const planLabel = (t) =>
// ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
//     t?.replace(/_/g, " ") || "—");

// /* ─── Payment Alert (Jio / Airtel style interrupt) ──────────────── */
// const PaymentAlert = ({ sub, mentor, onPay, onDismiss }) => {
//     const [closing, setClosing] = useState(false);

//     const close = () => {
//         setClosing(true);
//         setTimeout(onDismiss, 300);
//     };

//     return (
//         <div
//             onClick={close}
//             style={{
//                 position: "fixed", inset: 0, zIndex: 9999,
//                 background: "rgba(26,26,46,0.78)",
//                 backdropFilter: "blur(6px)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 padding: 20,
//                 animation: closing ? "pFadeOut 0.3s ease forwards" : "pFadeIn 0.32s cubic-bezier(0.22,1,0.36,1) forwards",
//             }}
//         >
//             <div
//                 onClick={(e) => e.stopPropagation()}
//                 style={{
//                     width: "100%", maxWidth: 370,
//                     background: C.bg,
//                     borderRadius: 24,
//                     overflow: "hidden",
//                     boxShadow: "0 32px 80px rgba(26,26,46,0.5)",
//                 }}
//             >
//                 {/* Top band */}
//                 <div style={{
//                     background: C.card,
//                     padding: "28px 24px 24px",
//                     textAlign: "center",
//                     position: "relative", overflow: "hidden",
//                 }}>
//                     {[70, 100, 132].map((s, i) => (
//                         <div key={i} style={{
//                             position: "absolute", top: "50%", left: "50%",
//                             width: s, height: s, borderRadius: "50%",
//                             border: "1.5px solid rgba(255,255,255,0.22)",
//                             transform: "translate(-50%,-50%)",
//                             animation: `pRing 2.2s ease ${i * 0.45}s infinite`,
//                             pointerEvents: "none",
//                         }} />
//                     ))}

//                     <div style={{
//                         width: 54, height: 54, borderRadius: "50%",
//                         background: "rgba(255,255,255,0.18)",
//                         margin: "0 auto 16px",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         position: "relative", zIndex: 1,
//                         animation: "pPop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
//                     }}>
//                         <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h.01M11 15h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//                         </svg>
//                     </div>

//                     <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 6, position: "relative", zIndex: 1 }}>
//                         Action Required
//                     </p>
//                     <h2 style={{ fontSize: 21, fontWeight: 900, color: "#fff", letterSpacing: "-0.5px", position: "relative", zIndex: 1 }}>
//                         Complete Your Payment
//                     </h2>
//                 </div>

//                 {/* Body */}
//                 <div style={{ padding: "20px 22px 24px" }}>
//                     {/* Summary box */}
//                     <div style={{
//                         border: `1.5px solid ${C.card}`,
//                         borderRadius: 14, padding: "13px 15px", marginBottom: 18,
//                         animation: "pUp 0.36s ease 0.12s both",
//                     }}>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//                             <span style={{ fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 0.8 }}>
//                                 Subscription Plan
//                             </span>
//                             <span style={{ fontSize: 9, fontWeight: 800, color: "#fff", background: C.card, borderRadius: 20, padding: "3px 10px", textTransform: "uppercase" }}>
//                                 {planLabel(sub.plan_type)}
//                             </span>
//                         </div>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
//                             <div>
//                                 <p style={{ fontSize: 12, color: C.btn, fontWeight: 700, marginBottom: 3 }}>
//                                     {mentor?.fullName || "Your Mentor"}
//                                 </p>
//                                 <p style={{ fontSize: 10, color: "#aaa" }}>
//                                     {sub.total_sessions} sessions · Expires {fmt(sub.effective_end_date)}
//                                 </p>
//                             </div>
//                             <div style={{ textAlign: "right" }}>
//                                 <p style={{ fontSize: 9, color: "#bbb", marginBottom: 2 }}>Due</p>
//                                 <p style={{ fontSize: 24, fontWeight: 900, color: C.btn, letterSpacing: "-1px", lineHeight: 1 }}>
//                                     ₹{sub.amount?.toLocaleString("en-IN")}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <p style={{ fontSize: 12, color: "#888", lineHeight: 1.65, marginBottom: 18, textAlign: "center", animation: "pUp 0.36s ease 0.2s both" }}>
//                         Your plan is active but payment is pending. Complete it now to keep uninterrupted access.
//                     </p>

//                     <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "pUp 0.36s ease 0.26s both" }}>
//                         <button
//                             onClick={() => { onPay(sub, mentor); close(); }}
//                             style={{
//                                 width: "100%", padding: "15px",
//                                 background: C.btn, color: "#fff",
//                                 border: "none", borderRadius: 13,
//                                 fontSize: 14, fontWeight: 800, cursor: "pointer",
//                                 display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                                 boxShadow: "0 8px 24px rgba(26,26,46,0.28)",
//                                 transition: "opacity 0.15s, transform 0.15s",
//                             }}
//                             onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
//                             onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "none"; }}
//                         >
//                             <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h.01M11 15h2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//                             </svg>
//                             Pay ₹{sub.amount?.toLocaleString("en-IN")} Now
//                         </button>

//                         <button
//                             onClick={close}
//                             style={{
//                                 width: "100%", padding: "13px",
//                                 background: "transparent", color: "#bbb",
//                                 border: "1.5px solid #e8e8e8", borderRadius: 12,
//                                 fontSize: 12, fontWeight: 600, cursor: "pointer",
//                                 transition: "border-color 0.15s, color 0.15s",
//                             }}
//                             onMouseEnter={e => { e.currentTarget.style.borderColor = C.card; e.currentTarget.style.color = C.card; }}
//                             onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.color = "#bbb"; }}
//                         >
//                             Remind me later
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// /* ─── Subscription Card ─────────────────────────────────────────── */
// const SubscriptionCard = ({ sub, i, onPay }) => {
//     const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);

//     const isApproved = sub.payment_status?.toLowerCase()?.trim() === "approved";
//     const isPaid = sub.payment_done;
//     const isActive = sub.status === "active";

//     return (
//         <div
//             style={{
//                 background: C.bg,
//                 borderRadius: 20, overflow: "hidden",
//                 border: `1.5px solid ${C.card}28`,
//                 boxShadow: `0 4px 20px ${C.card}18`,
//                 display: "flex", flexDirection: "column",
//                 animation: `pSlide 0.36s ease ${i * 0.08}s both`,
//                 transition: "transform 0.24s cubic-bezier(0.23,1,0.32,1), box-shadow 0.24s",
//             }}
//             onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 20px 48px ${C.card}30`; }}
//             onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 20px ${C.card}18`; }}
//         >
//             {/* Card header — card color */}
//             <div style={{ background: C.card, padding: "20px 20px 18px", position: "relative", overflow: "hidden" }}>
//                 <div style={{ position: "absolute", top: -36, right: -36, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
//                 <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, position: "relative" }}>
//                     <div>
//                         <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.52)", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>
//                             Mentorship Plan
//                         </p>
//                         <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1 }}>
//                             {planLabel(sub.plan_type)}
//                         </h3>
//                         {mentor?.fullName && (
//                             <p style={{ fontSize: 11, color: "rgba(255,255,255,0.52)", marginTop: 4 }}>
//                                 with {mentor.fullName}
//                             </p>
//                         )}
//                     </div>

//                     <span style={{
//                         fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 20,
//                         background: "rgba(255,255,255,0.18)", color: "#fff",
//                         textTransform: "uppercase", letterSpacing: 0.6,
//                         display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
//                     }}>
//                         <span style={{ width: 5, height: 5, borderRadius: "50%", background: isActive ? "#7fff9a" : "rgba(255,255,255,0.5)" }} />
//                         {isActive ? "Active" : sub.status}
//                     </span>
//                 </div>

//                 <div style={{ position: "relative" }}>
//                     <p style={{ fontSize: 8, color: "rgba(255,255,255,0.42)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Amount</p>
//                     <p style={{ fontSize: 30, fontWeight: 900, color: "#fff", letterSpacing: "-1.2px", lineHeight: 1 }}>
//                         ₹{sub.amount?.toLocaleString("en-IN")}
//                     </p>
//                 </div>
//             </div>

//             {/* Card body */}
//             <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
//                 {/* Info grid */}
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
//                     {[["Sessions", `${sub.total_sessions}`], ["Started", fmt(sub.subscribed_at)], ["Expires", fmt(sub.effective_end_date)]].map(([label, value]) => (
//                         <div key={label} style={{
//                             background: `${C.card}0d`, borderRadius: 10, padding: "8px 10px",
//                             border: `1px solid ${C.card}1e`,
//                         }}>
//                             <p style={{ fontSize: 8, fontWeight: 700, color: C.card, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3, opacity: 0.75 }}>
//                                 {label}
//                             </p>
//                             <p style={{ fontSize: 11, fontWeight: 700, color: C.btn }}>{value}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Payment status */}
//                 <div style={{
//                     display: "flex", alignItems: "center", justifyContent: "space-between",
//                     padding: "10px 13px",
//                     background: isApproved && !isPaid ? `${C.card}12` : `${C.btn}08`,
//                     border: `1.5px solid ${isApproved && !isPaid ? C.card : C.btn}22`,
//                     borderRadius: 12,
//                 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//                         {isApproved ? (
//                             <>
//                                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.card} strokeWidth="2.5">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span style={{ fontSize: 11, fontWeight: 700, color: C.card }}>Payment Confirmed</span>
//                             </>
//                         ) : isApproved ? (
//                             <>
//                                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.card} strokeWidth="2.5">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
//                                 </svg>
//                                 <span style={{ fontSize: 11, fontWeight: 700, color: C.card }}>Payment Pending</span>
//                             </>
//                         ) : (
//                             <>
//                                 <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={C.btn} strokeWidth="2.5">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <span style={{ fontSize: 11, fontWeight: 700, color: C.btn, opacity: 0.55 }}>Pending Approval</span>
//                             </>
//                         )}
//                     </div>

//                     {!isApproved && (
//                         <button
//                             onClick={() => onPay(sub, mentor)}
//                             style={{
//                                 background: C.btn, color: "#fff", border: "none",
//                                 borderRadius: 8, padding: "6px 14px",
//                                 fontSize: 10, fontWeight: 800, cursor: "pointer",
//                                 boxShadow: "0 4px 12px rgba(26,26,46,0.22)",
//                                 transition: "opacity 0.15s",
//                             }}
//                             onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
//                             onMouseLeave={e => e.currentTarget.style.opacity = "1"}
//                         >
//                             Pay Now
//                         </button>
//                     )}
//                 </div>

//                 {/* Mentee badge */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                     <span style={{
//                         fontSize: 9, fontWeight: 800, color: "#fff",
//                         background: C.btn, borderRadius: 20, padding: "3px 10px",
//                         textTransform: "capitalize", letterSpacing: 0.5,
//                     }}>
//                         {sub.mentee_status || "mentee"}
//                     </span>
//                     <span style={{ fontSize: 10, color: "#bbb" }}>
//                         Subscribed {fmt(sub.subscribed_at)}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// /* ─── Main ──────────────────────────────────────────────────────── */
// const Subscriptionplan = () => {
//     const navigate = useNavigate();
//     const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
//     const userData = JSON.parse(localStorage.getItem("userData") || "{}");

//     const { data: res, isLoading, isError } =
//         useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

//     const subs = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];

//     const [alertSub, setAlertSub] = useState(null);
//     const [alertMentor, setAlertMentor] = useState(undefined);

//     const pendingSub = subs.find(
//         (s) => s.payment_status?.toLowerCase()?.trim() === "approved" && !s.payment_done
//     );

//     // useEffect(() => {
//     //     if (pendingSub) {
//     //         const t = setTimeout(() => setAlertSub(pendingSub), 600);
//     //         return () => clearTimeout(t);
//     //     }
//     // }, [pendingSub?._id]);

//     const handlePay = (sub, mentor) => {
//         const months = { one_month: 1, three_months: 3, six_months: 6 };
//         navigate("/payment", {
//             state: {
//                 subscription_id: sub._id,
//                 mentorId: sub.mentor_id,
//                 mentorName: mentor?.fullName || "",
//                 mentorRole: mentor?.currentRole || "",
//                 menteeId: sub.mentee_id,
//                 menteeName: userData.name,
//                 planMonths: months[sub.plan_type],
//                 totalSessions: sub.total_sessions,
//                 paymentType: "subcription",
//                 basePrice: sub.amount,
//                 createdBy: sub.mentee_id,
//             },
//         });
//     };

//     return (
//         <div style={{
//             minHeight: "100vh", background: C.bg,
//             fontFamily: `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
//             padding: "32px 20px 72px",
//         }}>
//             <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
//         *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
//         @keyframes pSlide   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
//         @keyframes pFadeIn  { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
//         @keyframes pFadeOut { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.95)} }
//         @keyframes pRing    { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5} 50%{transform:translate(-50%,-50%) scale(1.22);opacity:0} }
//         @keyframes pPop     { from{transform:scale(0) rotate(-10deg)} to{transform:scale(1) rotate(0)} }
//         @keyframes pUp      { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
//         @keyframes shimmer  { 0%{background-position:-600px 0} 100%{background-position:600px 0} }
//         .subs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
//         @media(max-width:480px){ .subs-grid{ grid-template-columns:1fr; } }
//         @media(min-width:1100px){ .subs-grid{ grid-template-columns:repeat(3,1fr); } }
//         .sk { background:linear-gradient(90deg,#e4f5fb 25%,#cceaf5 50%,#e4f5fb 75%); background-size:800px 100%; animation:shimmer 1.4s infinite linear; border-radius:20px; }
//       `}</style>

//             <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//                 {/* Header */}
//                 <div style={{ marginBottom: 28, animation: "pSlide 0.34s ease both" }}>
//                     <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 900, color: C.btn, letterSpacing: "-0.5px" }}>
//                         My Subscriptions
//                     </h1>
//                     <p style={{ fontSize: 13, color: "#aaa", marginTop: 5 }}>Your active and past mentorship plans</p>
//                 </div>

//                 {/* Error */}
//                 {(!menteeId || isError) && (
//                     <div style={{
//                         background: `${C.card}10`, borderRadius: 16, padding: "28px 24px",
//                         textAlign: "center", border: `1px solid ${C.card}30`,
//                         maxWidth: 380, margin: "0 auto",
//                     }}>
//                         <p style={{ fontSize: 13, color: C.card, fontWeight: 600 }}>
//                             {!menteeId ? "Please log in to view subscriptions." : "Failed to load subscriptions."}
//                         </p>
//                     </div>
//                 )}

//                 {/* Skeleton */}
//                 {menteeId && !isError && isLoading && (
//                     <div className="subs-grid">
//                         {[1, 2, 3].map((i) => <div key={i} className="sk" style={{ height: 290 }} />)}
//                     </div>
//                 )}

//                 {/* Empty */}
//                 {menteeId && !isError && !isLoading && subs.length === 0 && (
//                     <div style={{
//                         background: C.bg, borderRadius: 20, padding: "52px 32px",
//                         textAlign: "center", border: `1.5px dashed ${C.card}55`,
//                         maxWidth: 400, margin: "0 auto", animation: "pSlide 0.34s ease both",
//                     }}>
//                         <div style={{
//                             width: 52, height: 52, borderRadius: "50%",
//                             background: `${C.card}12`, border: `1.5px solid ${C.card}30`,
//                             display: "flex", alignItems: "center", justifyContent: "center",
//                             margin: "0 auto 16px",
//                         }}>
//                             <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke={C.card} strokeWidth="1.8">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
//                             </svg>
//                         </div>
//                         <h3 style={{ fontSize: 16, fontWeight: 800, color: C.btn, marginBottom: 6 }}>No Subscriptions Yet</h3>
//                         <p style={{ fontSize: 13, color: "#bbb", lineHeight: 1.7 }}>Browse mentors and pick a plan to get started.</p>
//                     </div>
//                 )}

//                 {/* Cards */}
//                 {menteeId && !isError && !isLoading && subs.length > 0 && (
//                     <div className="subs-grid">
//                         {subs.map((sub, i) => (
//                             <SubscriptionCard key={sub._id} sub={sub} i={i} onPay={handlePay} />
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Fetch mentor for alert */}
//             {alertSub && (
//                 <AlertMentorFetcher sub={alertSub} onReady={(m) => setAlertMentor(m)} />
//             )}

//             {/* Alert popup */}
//             {alertSub && alertMentor !== undefined && (
//                 <PaymentAlert
//                     sub={alertSub}
//                     mentor={alertMentor}
//                     onPay={handlePay}
//                     onDismiss={() => { setAlertSub(null); setAlertMentor(undefined); }}
//                 />
//             )}
//         </div>
//     );
// };

// /* ─── Helper: mentor fetch without conditional hook ─────────────── */
// const AlertMentorFetcher = ({ sub, onReady }) => {
//     const { data: mentor } = useFetchMentorByIdQuery(sub.mentor_id);
//     useEffect(() => { if (mentor !== undefined) onReady(mentor); }, [mentor]);
//     return null;
// };

// export default Subscriptionplan;


