


import React, { useState } from "react";
import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";

const fmt = (iso) =>
    iso
        ? new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "—";

const planLabel = (type) => {
    const map = {
        one_month: "1 Month",
        three_months: "3 Months",
        six_months: "6 Months",
    };
    return map[type] || type?.replace(/_/g, " ") || "—";
};

const statusStyle = (s) =>
    s === "active"
        ? { bg: "#ecfdf5", text: "#059669", dot: "#10b981" }
        : s === "expired"
            ? { bg: "#fef2f2", text: "#dc2626", dot: "#ef4444" }
            : { bg: "#fffbeb", text: "#d97706", dot: "#f59e0b" };

// ─────────────────────────────────────────────
// Chip SVG (credit-card chip)
// ─────────────────────────────────────────────
const ChipSVG = () => (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
        <rect x="0.5" y="0.5" width="43" height="33" rx="5.5" fill="#e0f4fc" stroke="#b3e0f7" />
        <rect x="14" y="0.5" width="16" height="33" fill="#c8eaf9" />
        <rect x="0.5" y="11" width="43" height="12" fill="#c8eaf9" />
        <rect x="14" y="11" width="16" height="12" fill="#aad9f5" />
    </svg>
);

// ─────────────────────────────────────────────
// Circular progress ring
// ─────────────────────────────────────────────
const Ring = ({ pct, size = 52, stroke = 4, color = "#0098cc" }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e0f4fc" strokeWidth={stroke} />
            <circle
                cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={color} strokeWidth={stroke}
                strokeDasharray={circ}
                strokeDashoffset={circ * (1 - Math.min(100, Math.max(0, pct)) / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
            />
        </svg>
    );
};

// ─────────────────────────────────────────────
// Detail Modal
// ─────────────────────────────────────────────
const DetailModal = ({ sub, onClose }) => {
    const sc = statusStyle(sub.status);
    const payColor = sub.payment_done
        ? { bg: "#ecfdf5", text: "#059669" }
        : { bg: "#fffbeb", text: "#d97706" };

    const startDate = new Date(sub.subscribed_at);
    const endDate = new Date(sub.subscription_end_date);
    const now = new Date();
    const progress = Math.min(100, Math.max(0, Math.round(((now - startDate) / (endDate - startDate)) * 100)));
    const daysLeft = Math.max(0, Math.ceil((endDate - now) / 86400000));

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0,
                background: "rgba(0,10,20,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000, backdropFilter: "blur(4px)", padding: 16,
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(14px) scale(0.97)}to{opacity:1;transform:none}}`}</style>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff", borderRadius: 16, width: "100%", maxWidth: 420,
                    boxShadow: "0 24px 60px rgba(0,152,204,0.15),0 4px 16px rgba(0,0,0,0.07)",
                    overflow: "hidden", animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
            >
                {/* Header */}
                <div style={{
                    background: "linear-gradient(135deg,#0098cc 0%,#005f8a 100%)",
                    padding: "14px 18px 13px", position: "relative", overflow: "hidden",
                }}>
                    <div style={{ position: "absolute", top: -24, right: -24, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                        <div>
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 3 }}>
                                Subscription Details
                            </span>
                            <h2 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: 0 }}>
                                {planLabel(sub.plan_type)} Plan
                            </h2>
                            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", margin: "2px 0 0" }}>
                                ID: {sub._id?.slice(-8).toUpperCase()}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 7,
                                width: 26, height: 26, cursor: "pointer", color: "#fff",
                                fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        >×</button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "14px 18px 18px" }}>

                    {/* Status pills */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: sc.bg, color: sc.text, display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                            {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: payColor.bg, color: payColor.text }}>
                            {sub.payment_done ? "✓ Payment Done" : "⏳ Payment Pending"}
                        </span>
                    </div>

                    {/* Progress ring */}
                    <div style={{ background: "#f0f9ff", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <Ring pct={progress} size={42} stroke={3} />
                            <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#0098cc" }}>
                                {progress}%
                            </span>
                        </div>
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", margin: "0 0 1px" }}>Plan Progress</p>
                            <p style={{ fontSize: 10, color: "#64748b", margin: 0 }}>
                                {daysLeft} days left · {fmt(sub.subscribed_at)} → {fmt(sub.subscription_end_date)}
                            </p>
                        </div>
                    </div>

                    {/* Info grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
                        {[
                            { label: "Total Sessions", value: `${sub.total_sessions} sessions` },
                            { label: "Plan Amount", value: `₹${sub.amount?.toLocaleString("en-IN")}` },
                            { label: "Payment ID", value: sub.payment_id?.toUpperCase() },
                            { label: "Payment Status", value: sub.payment_status?.replace(/_/g, " ") },
                            { label: "Start Date", value: fmt(sub.subscribed_at) },
                            { label: "End Date", value: fmt(sub.subscription_end_date) },
                        ].map((item, i) => (
                            <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: "7px 10px", border: "1px solid #f1f5f9" }}>
                                <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 2px" }}>{item.label}</p>
                                <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", margin: 0, textTransform: "capitalize" }}>{item.value}</p>
                            </div>
                        ))}
                    </div>

             

                    {/* Close */}
                    <button
                        onClick={onClose}
                        style={{
                            width: "100%",
                            background: "linear-gradient(135deg,#0098cc,#005f8a)",
                            color: "#fff", border: "none", borderRadius: 8,
                            padding: "9px", fontSize: 13, fontWeight: 700,
                            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                            boxShadow: "0 3px 10px rgba(0,152,204,0.28)",
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// Subscription Card (credit-card style)
// ─────────────────────────────────────────────
const SubscriptionCard = ({ sub, onView, index }) => {
    const sc = statusStyle(sub.status);

    return (
        <div
            style={{
                width: 340, borderRadius: 20,
                background: "linear-gradient(135deg,#0098cc 0%,#005f8a 55%,#003d5c 100%)",
                padding: "22px 24px 20px",
                boxShadow: "0 20px 50px rgba(0,152,204,0.32),0 4px 16px rgba(0,0,0,0.12)",
                position: "relative", overflow: "hidden",
                fontFamily: "'DM Sans', sans-serif",
                transition: "transform 0.28s ease, box-shadow 0.28s ease",
                animation: `fadeUp 0.4s ease ${index * 0.1}s both`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 30px 64px rgba(0,152,204,0.42),0 6px 20px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,152,204,0.32),0 4px 16px rgba(0,0,0,0.12)";
            }}
        >
            {/* Decorative orbs */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -30, left: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

            {/* Chip + status */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, position: "relative" }}>
                <ChipSVG />
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 11px", borderRadius: 20, background: sc.bg, color: sc.text, display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                    {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
                </span>
            </div>

            {/* Amount */}
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 4px" }}>
                Plan Amount
            </p>
            <p style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
                ₹{sub.amount?.toLocaleString("en-IN")}
            </p>

            {/* Details row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative" }}>
                <div>
                    <p style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 3px" }}>Plan</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{planLabel(sub.plan_type)}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 3px" }}>Sessions</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{sub.total_sessions}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 3px" }}>Expires</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{fmt(sub.subscription_end_date)}</p>
                </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", margin: "16px 0 14px" }} />

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: sub.payment_done ? "#86efac" : "#fde68a", display: "flex", alignItems: "center", gap: 5 }}>
                    {sub.payment_done ? "✓ Payment Done" : "⏳ Payment Pending"}
                </span>
                <button
                    onClick={onView}
                    style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        borderRadius: 8, padding: "6px 16px",
                        fontSize: 12, fontWeight: 700, color: "#fff",
                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                        backdropFilter: "blur(4px)",
                        transition: "background 0.18s, transform 0.15s",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.26)"; e.target.style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.15)"; e.target.style.transform = "scale(1)"; }}
                >
                    View Details →
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// Loading skeleton
// ─────────────────────────────────────────────
const SkeletonCard = () => (
    <div style={{
        width: 340, height: 218, borderRadius: 20,
        background: "linear-gradient(90deg,#d1e9f5 25%,#bdd9ec 50%,#d1e9f5 75%)",
        backgroundSize: "800px 100%",
        animation: "shimmer 1.4s infinite linear",
    }} />
);

// ─────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────
const EmptyState = () => (
    <div style={{
        background: "#fff", borderRadius: 20,
        padding: "64px 40px", textAlign: "center",
        border: "1px dashed #bce0f0",
        maxWidth: 440, margin: "0 auto",
    }}>
        <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#e0f4fc", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", fontSize: 32,
        }}>📭</div>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1e293b", margin: "0 0 8px" }}>
            No Subscriptions Yet
        </h3>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            You haven't subscribed to any mentorship plan yet.<br />
            Browse mentors and pick a plan to get started.
        </p>
    </div>
);

// ─────────────────────────────────────────────
// Error state
// ─────────────────────────────────────────────
const ErrorState = ({ message }) => (
    <div style={{
        background: "#fff5f5", borderRadius: 16,
        padding: "32px", textAlign: "center",
        border: "1px solid #fecaca", maxWidth: 400, margin: "0 auto",
    }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#dc2626", margin: "0 0 6px" }}>Failed to load</h3>
        <p style={{ fontSize: 12, color: "#ef4444", margin: 0 }}>{message || "Something went wrong. Please try again."}</p>
    </div>
);

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const Subscriptionplan = () => {
    // Get mentee_id from localStorage (adjust to your auth pattern)
    const userdata = JSON.parse(localStorage.getItem("userData"));

    const menteeId = userdata?._id;

    console.log(menteeId, userdata, "menteeId");

    const { data: subs = [], isLoading, isError, error, refetch } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);

    return (
        <div style={{ minHeight: "100vh", background: "#f0f6fa", fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
      `}</style>


            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px" }}>

                {/* Title */}
                <div style={{ marginBottom: 32, animation: "fadeUp 0.4s ease both" }}>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                        Subscription Plans
                    </h1>
                    <p style={{ fontSize: 13, color: "#64748b" }}>
                        Your active and past mentorship subscriptions
                    </p>
                </div>

                {/* ── States ── */}
                {!menteeId ? (
                    <ErrorState message="Mentee ID not found. Please log in again." />
                ) : isLoading ? (
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                    </div>
                ) : isError ? (
                    <ErrorState message={error?.data?.message || error?.error || "Failed to fetch subscriptions."} />
                ) : subs.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {/* ── Cards ── */}
                        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                            {subs.map((sub, i) => (
                                <SubscriptionCard
                                    key={sub._id}
                                    sub={sub}
                                    index={i}
                                    onView={() => setSelected(sub)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* ── Detail modal ── */}
            {selected && <DetailModal sub={selected} onClose={() => setSelected(null)} />}
        </div>
    );
};

export default Subscriptionplan;