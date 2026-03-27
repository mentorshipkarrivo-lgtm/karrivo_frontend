import React, { useState } from "react";
import { useGetSubscriptionsByMenteeIdQuery } from "./subcriptionsplanapislice";
import {
    AlertTriangle, Inbox, CalendarClock, CheckCircle2,
    Clock, X, CreditCard, CalendarDays, TrendingUp,
} from "lucide-react";

const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const planLabel = (t) => ({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] || t?.replace(/_/g, " ") || "—");

const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error } = useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });
    const [selected, setSelected] = useState(null);

    const statusColor = (s) => s === "active" ? "#10b981" : s === "expired" ? "#ef4444" : "#f59e0b";

    return (
        <div style={{ minHeight: "100vh", background: "#f0f6fa", fontFamily: "'DM Sans', sans-serif", padding: "36px 24px" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes modalIn { from{opacity:0;transform:translateY(12px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>

            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <div style={{ marginBottom: 28, animation: "fadeUp .4s ease both" }}>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>Subscription Plans</h1>
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Your active and past mentorship subscriptions</p>
                </div>

                {/* ── States ── */}
                {!menteeId || isError ? (
                    <div style={{ background: "#fff5f5", borderRadius: 14, padding: 32, textAlign: "center", border: "1px solid #fecaca", maxWidth: 400, margin: "0 auto" }}>
                        <AlertTriangle size={28} color="#dc2626" style={{ margin: "0 auto 10px", display: "block" }} />
                        <p style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>{!menteeId ? "Please log in again." : error?.data?.message || "Failed to fetch."}</p>
                    </div>
                ) : isLoading ? (
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {[1, 2].map(i => (
                            <div key={i} style={{ width: 340, height: 210, borderRadius: 20, background: "linear-gradient(90deg,#d1e9f5 25%,#bdd9ec 50%,#d1e9f5 75%)", backgroundSize: "800px 100%", animation: "shimmer 1.4s infinite linear" }} />
                        ))}
                    </div>
                ) : !subs.length ? (
                    <div style={{ background: "#fff", borderRadius: 20, padding: "56px 40px", textAlign: "center", border: "1px dashed #bce0f0", maxWidth: 420, margin: "0 auto" }}>
                        <Inbox size={36} color="#94a3b8" style={{ margin: "0 auto 14px", display: "block" }} />
                        <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1e293b", marginBottom: 6 }}>No Subscriptions Yet</h3>
                        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>Browse mentors and pick a plan to get started.</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {subs.map((sub, i) => (
                            <div key={sub._id}
                                style={{ width: 340, borderRadius: 20, background: "linear-gradient(135deg,#0098cc,#005f8a 55%,#003d5c)", padding: "22px 24px 20px", boxShadow: "0 20px 50px rgba(0,152,204,0.28)", position: "relative", overflow: "hidden", animation: `fadeUp .4s ease ${i * 0.1}s both`, transition: "transform .25s,box-shadow .25s" }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 30px 64px rgba(0,152,204,0.4)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,152,204,0.28)"; }}
                            >
                                <div style={{ position: "absolute", top: -40, right: -40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

                                {/* Top row */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                                    <CreditCard size={30} color="rgba(255,255,255,0.65)" />
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: statusColor(sub.status) + "22", color: statusColor(sub.status), display: "flex", alignItems: "center", gap: 4 }}>
                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor(sub.status), display: "inline-block" }} />
                                        {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
                                    </span>
                                </div>

                                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Plan Amount</p>
                                <p style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-0.5px" }}>₹{sub.amount?.toLocaleString("en-IN")}</p>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                                    {[["Plan", planLabel(sub.plan_type)], ["Sessions", sub.total_sessions], ["Expires", fmt(sub.effective_end_date)]].map(([lbl, val]) => (
                                        <div key={lbl} style={{ textAlign: lbl === "Expires" ? "right" : lbl === "Sessions" ? "center" : "left" }}>
                                            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: .8, marginBottom: 3 }}>{lbl}</p>
                                            <p style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{val}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Extension badge */}
                                {sub.is_extended && (
                                    <div style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "5px 10px", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                                        <CalendarClock size={13} color="#86efac" />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "#86efac" }}>
                                            Extended by {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} due to mentor leave
                                        </span>
                                    </div>
                                )}

                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", margin: "4px 0 12px" }} />

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: sub.payment_done ? "#86efac" : "#fde68a", display: "flex", alignItems: "center", gap: 4 }}>
                                        {sub.payment_done
                                            ? <><CheckCircle2 size={12} color="#86efac" /> Paid</>
                                            : <><Clock size={12} color="#fde68a" /> Payment Pending</>}
                                    </span>
                                    <button onClick={() => setSelected(sub)}
                                        style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "5px 14px", fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", transition: "background .18s" }}
                                        onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.26)"}
                                        onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
                                    >View Details →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Modal ── */}
            {selected && (
                <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,10,20,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", padding: 16 }}>
                    <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 400, boxShadow: "0 24px 60px rgba(0,152,204,0.18)", overflow: "hidden", animation: "modalIn .25s cubic-bezier(0.34,1.56,0.64,1)" }}>

                        {/* Header */}
                        <div style={{ background: "linear-gradient(135deg,#0098cc,#005f8a)", padding: "14px 18px", position: "relative" }}>
                            <div style={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                                <div>
                                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>Subscription Details</span>
                                    <h2 style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginTop: 3 }}>{planLabel(selected.plan_type)} Plan</h2>
                                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>ID: {selected._id?.slice(-8).toUpperCase()}</p>
                                </div>
                                <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 7, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <X size={15} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "16px 18px 18px" }}>

                            {/* Status pills */}
                            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: statusColor(selected.status) + "18", color: statusColor(selected.status), display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor(selected.status), display: "inline-block" }} />
                                    {selected.status?.charAt(0).toUpperCase() + selected.status?.slice(1)}
                                </span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: selected.payment_done ? "#ecfdf5" : "#fffbeb", color: selected.payment_done ? "#059669" : "#d97706", display: "flex", alignItems: "center", gap: 4 }}>
                                    {selected.payment_done
                                        ? <><CheckCircle2 size={11} color="#059669" /> Payment Done</>
                                        : <><Clock size={11} color="#d97706" /> Pending</>}
                                </span>
                            </div>

                            {/* Extension info */}
                            {selected.is_extended && (
                                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 12px", marginBottom: 14 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                        <TrendingUp size={13} color="#059669" />
                                        <p style={{ fontSize: 11, fontWeight: 700, color: "#059669" }}>Plan Extended — {selected.extended_days} days added</p>
                                    </div>
                                    {selected.extensions?.map((ext, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                                            <CalendarDays size={10} color="#16a34a" />
                                            <p style={{ fontSize: 10, color: "#16a34a" }}>+{ext.added_days} day{ext.added_days > 1 ? "s" : ""} · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Info grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
                                {[
                                    ["Total Sessions", `${selected.total_sessions} sessions`],
                                    ["Amount", `₹${selected.amount?.toLocaleString("en-IN")}`],
                                    ["Start Date", fmt(selected.subscribed_at)],
                                    ["Original End", fmt(selected.subscription_end_date)],
                                    ["Extended Days", `+${selected.extended_days || 0} days`],
                                    ["Effective End", fmt(selected.effective_end_date)],
                                ].map(([label, value]) => (
                                    <div key={label} style={{ background: label === "Effective End" ? "#f0fdf4" : "#f8fafc", borderRadius: 8, padding: "7px 10px", border: `1px solid ${label === "Effective End" ? "#bbf7d0" : "#f1f5f9"}` }}>
                                        <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: .7, textTransform: "uppercase", color: label === "Effective End" ? "#059669" : "#94a3b8", marginBottom: 2 }}>{label}</p>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: label === "Effective End" ? "#059669" : "#1e293b" }}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => setSelected(null)} style={{ width: "100%", background: "linear-gradient(135deg,#0098cc,#005f8a)", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
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