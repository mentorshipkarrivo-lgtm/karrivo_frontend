import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetSubscriptionsByMenteeIdQuery,
    useGetRefundPreviewQuery,
    useCancelSubscriptionMutation,
    useGetRefundBySubscriptionIdQuery,
} from "./subcriptionsplanapislice";
import {
    AlertTriangle, Inbox, CalendarClock, CheckCircle2,
    Clock, X, CreditCard, CalendarDays, TrendingUp, AlertCircle,
    XCircle, Loader2, ShieldAlert, RefreshCw, BadgeCheck, Ban,
} from "lucide-react";

const C = {
    dark: "#1a1a2e",
    blue: "#0091c3",
    white: "#ffffff",
    border: "#e2e8f0",
    muted: "#94a3b8",
    text: "#1a1a2e",
    sub: "#475569",
    bg: "#ffffff",
    danger: "#dc2626",
};

const FONT = "'DM Sans', 'Segoe UI', sans-serif";

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.35} }
  @keyframes spin    { to{transform:rotate(360deg)} }
  .sub-card { transition: transform 0.18s ease, box-shadow 0.18s ease; }
  .sub-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
  .pay-btn:hover  { opacity: 0.88; transform: scale(1.02); }
  .cancel-btn:hover { background: #fee2e2 !important; }
  .spin-icon { animation: spin 0.8s linear infinite; }
`;

const fmt = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const money = (n) =>
    `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const planLabel = (t) =>
({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
    t?.replace(/_/g, " ") || "—");

// Pretty-print any value coming back from the API for table display
const displayValue = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
};

// Turn a snake_case key into a readable label, e.g. "refund_amount" -> "Refund Amount"
const labelize = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

// ── Refund status config ──────────────────────────────────────────────────────
const REFUND_STATUS = {
    pending: { color: "#b45309", bg: "#fffbeb", border: "#fde68a", label: "Pending", icon: Clock },
    processing: { color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe", label: "Processing", icon: RefreshCw },
    completed: { color: "#15803d", bg: "#f0fdf4", border: "#bbf7d0", label: "Refunded", icon: BadgeCheck },
    failed: { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", label: "Failed", icon: Ban },
};

// ── Refund Table — sits right after a subscription card, calls the API on mount ──
// Renders the refund document as ONE ROW with key fields as columns
// (Session History style), not one row per field.
const REFUND_COLUMNS = [
    { key: "plan_type", label: "Plan", render: (v) => planLabel(v) },
    { key: "status", label: "Status", render: (v) => v },
    { key: "total_sessions", label: "Total Sessions" },
    { key: "completed_sessions", label: "Completed" },
    { key: "remaining_sessions", label: "Remaining" },
    { key: "total_amount", label: "Total Paid", render: (v) => money(v) },
    { key: "per_session_amount", label: "Per Session", render: (v) => money(v) },
    { key: "refund_amount", label: "Refund Amount", render: (v) => money(v) },
    { key: "cancellation_reason", label: "Reason" },
    { key: "transaction_id", label: "Transaction ID" },
    {
        key: "receipt_url",
        label: "Receipt",
        render: (v) =>
            v ? (
                <a
                    href={v}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: C.blue, fontWeight: 700, textDecoration: "underline" }}
                >
                    View Receipt
                </a>
            ) : null,
    },
    { key: "createdAt", label: "Requested On", render: (v) => fmt(v) },
];

const RefundTable = ({ subscriptionId }) => {
    const { data: refund, isLoading, isError } = useGetRefundBySubscriptionIdQuery(subscriptionId);

    if (isLoading) {
        return (
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 14px", justifyContent: "center",
                border: `1px solid ${C.border}`, borderRadius: 10,
                background: C.white, fontFamily: FONT,
            }}>
                <Loader2 size={14} className="spin-icon" style={{ color: C.muted }} />
                <span style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>Loading refund details…</span>
            </div>
        );
    }

    if (isError || !refund) {
        return (
            <div style={{
                background: "#f8fafc", border: `1px solid ${C.border}`,
                borderRadius: 10, padding: "10px 14px",
                fontSize: 12, color: C.muted, fontFamily: FONT,
                display: "flex", alignItems: "center", gap: 6,
            }}>
                <AlertCircle size={13} />
                No refund record found for this subscription.
            </div>
        );
    }

    const rs = REFUND_STATUS[refund.status] || REFUND_STATUS.pending;

    return (
        <div style={{
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            overflow: "hidden",
            fontFamily: FONT,
            background: C.white,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}>
            {/* Title row */}
            <div style={{
                padding: "14px 16px", display: "flex", alignItems: "center",
                justifyContent: "space-between", gap: 10, flexWrap: "wrap",
            }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: FONT }}>
                    Refund Details
                </span>

            </div>

            {/* Dark header bar + single data row, horizontally scrollable */}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
                    <thead>
                        <tr style={{ background: C.dark }}>
                            <th style={{
                                textAlign: "left", padding: "10px 16px", fontSize: 11,
                                fontWeight: 700, color: C.white, letterSpacing: "0.03em",
                                whiteSpace: "nowrap",
                            }}>S.No</th>
                            {REFUND_COLUMNS.map((col) => (
                                <th key={col.key} style={{
                                    textAlign: "left", padding: "10px 16px", fontSize: 11,
                                    fontWeight: 700, color: C.white, letterSpacing: "0.03em",
                                    whiteSpace: "nowrap",
                                }}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{
                                padding: "12px 16px", fontSize: 13, color: C.text,
                                fontWeight: 700, whiteSpace: "nowrap",
                            }}>1</td>
                            {REFUND_COLUMNS.map((col) => {
                                const raw = refund[col.key];
                                const value = col.render ? col.render(raw) : displayValue(raw);
                                const isEmpty = value === null || value === undefined || value === "";
                                return (
                                    <td key={col.key} style={{
                                        padding: "12px 16px", fontSize: 13, color: C.text,
                                        fontWeight: 700, whiteSpace: "nowrap",
                                    }}>{isEmpty ? "—" : value}</td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div style={{ padding: "10px 16px", fontSize: 11, color: C.muted, fontFamily: FONT, borderTop: `1px solid ${C.border}` }}>
                Showing <b style={{ color: C.text }}>1</b> refund record
            </div>
        </div>
    );
};

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        active: { color: "#16a34a", dot: "#16a34a", label: "Active" },
        expired: { color: "#dc2626", dot: "#dc2626", label: "Expired" },
        cancelled: { color: C.danger, dot: C.danger, label: "Cancelled" },
        onprocess: { color: C.blue, dot: C.blue, label: "On Process" },
        pending: { color: C.text, dot: C.muted, label: "Pending" },
    };
    const m = map[status] ?? { color: C.muted, dot: C.muted, label: status || "—" };
    return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, fontFamily: FONT, color: m.color }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
            {m.label}
        </span>
    );
};

const PaymentLabel = ({ done, status, subStatus }) => {
    if (subStatus === "cancelled") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.danger, fontFamily: FONT }}><XCircle size={13} />Cancelled</span>;
    if (done) return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}><CheckCircle2 size={13} />Paid</span>;
    if (status === "onprocess") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.blue, fontFamily: FONT }}><Clock size={13} />Processing</span>;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: C.muted, fontFamily: FONT }}><Clock size={13} />Pending</span>;
};

// ── Subscription Card ─────────────────────────────────────────────────────────
const SubscriptionCard = ({ sub, i, onView, onPay, onCancel }) => {
    const canCancel = sub.status === "active" && sub.payment_done;
    return (
        <div className="sub-card" style={{
            background: C.white, borderRadius: 12, border: `1px solid ${C.border}`,
            overflow: "hidden", display: "flex", flexDirection: "column",
            fontFamily: FONT, animationDelay: `${i * 70}ms`,
        }}>
            <div style={{ height: 3, background: sub.status === "cancelled" ? C.danger : C.dark, flexShrink: 0 }} />
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>

                {/* Icon + status row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 7, background: C.dark,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                        <CreditCard size={13} style={{ color: C.white }} />
                    </div>
                    <StatusBadge status={sub.status} />
                </div>

                {/* Mentor */}
                {sub.mentor_name && (
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                        <span style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", fontFamily: FONT, flexShrink: 0 }}>MENTOR</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: FONT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {sub.mentor_name}{sub.mentor_role ? ` · ${sub.mentor_role}` : ""}
                        </span>
                    </div>
                )}

                {/* Amount */}
                <div>
                    <p style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", margin: "0 0 2px", fontFamily: FONT }}>PLAN AMOUNT</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: 0, fontFamily: FONT, lineHeight: 1.1 }}>{money(sub.amount)}</p>
                </div>

                {/* Quick facts grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
                    {[["Plan", planLabel(sub.plan_type)], ["Sessions", sub.total_sessions], ["Expires", fmt(sub.effective_end_date)]].map(([lbl, val]) => (
                        <div key={lbl} style={{ background: "#f8fafc", borderRadius: 7, padding: "6px 8px", border: `1px solid ${C.border}` }}>
                            <p style={{ fontSize: 7, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", margin: "0 0 2px", fontFamily: FONT }}>{lbl}</p>
                            <p style={{ fontSize: 10, fontWeight: 700, color: C.text, margin: 0, wordBreak: "break-word", fontFamily: FONT, lineHeight: 1.25 }}>{val}</p>
                        </div>
                    ))}
                </div>

                {/* Extended notice */}
                {sub.is_extended && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, padding: "6px 10px" }}>
                        <CalendarClock size={11} style={{ color: "#16a34a", flexShrink: 0 }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#15803d", fontFamily: FONT, lineHeight: 1.3 }}>
                            Extended {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} (mentor leave)
                        </span>
                    </div>
                )}

                {/* Footer */}
                <div style={{ marginTop: "auto", paddingTop: 10, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    {sub.status !== "cancelled" ? (
                        <PaymentLabel done={sub.payment_done} status={sub.payment_status} subStatus={sub.status} />
                    ) : <span />}
                    <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                        {canCancel && (
                            <button className="cancel-btn" onClick={() => onCancel(sub)} style={{
                                background: "#fff", color: C.danger, border: `1px solid #fecaca`,
                                borderRadius: 7, padding: "6px 10px", fontSize: 11,
                                fontWeight: 700, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
                            }}>Cancel</button>
                        )}
                        <button className="pay-btn" onClick={() => onView(sub)} style={{
                            background: C.dark, color: C.white, border: "none", borderRadius: 7,
                            padding: "6px 12px", fontSize: 11, fontWeight: 700,
                            cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
                        }}>View Details</button>
                    </div>
                </div>

                {/* Payment incomplete — placed last so the most relevant action stays close to the buttons */}
                {sub.payment_status === "pending" && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: 8, flexWrap: "wrap", border: `1px solid ${C.border}`,
                        borderRadius: 7, padding: "8px 10px", background: "#fafbfc",
                    }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: C.text, fontFamily: FONT }}>
                            <AlertCircle size={11} style={{ color: C.blue }} />
                            Payment Incomplete
                        </span>
                        <button className="pay-btn" onClick={() => onPay(sub)} style={{
                            background: C.dark, color: C.white, border: "none", borderRadius: 7,
                            padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer",
                            fontFamily: FONT, transition: "all 0.2s", whiteSpace: "nowrap",
                        }}>Pay Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", background: C.white }}>
        <div style={{ height: 3, background: C.border }} />
        <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
            {[80, 120, 60, 40].map((w, i) => (
                <div key={i} style={{ height: i === 1 ? 22 : 10, borderRadius: 6, background: "#f1f5f9", width: `${w}%`, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
        </div>
    </div>
);

// ── Cancel Modal ──────────────────────────────────────────────────────────────
const CancelModal = ({ sub, onClose, onConfirmed }) => {
    const [step, setStep] = useState("policy");
    const [reason, setReason] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [done, setDone] = useState(null);

    const { data: preview, isLoading, isError } = useGetRefundPreviewQuery(sub._id);
    const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();

    const p = preview;

    const handleConfirm = async () => {
        try {
            const res = await cancelSubscription({
                subscription_id: sub._id,
                mentee_id: sub.mentee_id,
                cancellation_reason: reason,
            }).unwrap();
            setDone(res.data);
            setStep("done");
        } catch (err) {
            alert(err?.data?.message || "Failed to cancel subscription");
        }
    };

    return (
        <div onClick={onClose} style={{
            position: "fixed", inset: 0, zIndex: 60,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
            padding: 16, animation: "fadeIn 0.15s ease",
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                width: "100%", maxWidth: 420, background: C.white,
                borderRadius: 14, border: `1px solid ${C.border}`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                overflow: "hidden", animation: "slideUp 0.2s ease", fontFamily: FONT,
            }}>
                {/* Header */}
                <div style={{
                    background: step === "done" ? "#16a34a" : C.danger,
                    padding: "16px 18px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {step === "done" ? <CheckCircle2 size={18} style={{ color: C.white }} /> : <ShieldAlert size={18} style={{ color: C.white }} />}
                        <h2 style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: 0, fontFamily: FONT }}>
                            {step === "done" ? "Subscription Cancelled" : "Cancel Subscription"}
                        </h2>
                    </div>
                    <button onClick={onClose} style={{
                        width: 28, height: 28, borderRadius: 7,
                        background: "rgba(255,255,255,0.15)", border: "none",
                        color: C.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    }}><X size={13} /></button>
                </div>

                <div style={{ padding: "18px" }}>
                    {isLoading && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "28px 0", justifyContent: "center" }}>
                            <Loader2 size={16} className="spin-icon" style={{ color: C.muted }} />
                            <span style={{ fontSize: 13, color: C.muted, fontFamily: FONT }}>Loading plan details…</span>
                        </div>
                    )}
                    {isError && <p style={{ fontSize: 13, color: C.danger, fontFamily: FONT }}>Could not load plan details. Please try again.</p>}

                    {/* STEP 1 — Policy */}
                    {step === "policy" && p && !isLoading && (
                        <>
                            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                                {[["Current Plan", planLabel(p.plan_type)], ["Expiry", fmt(p.subscription_end_date)]].map(([lbl, val]) => (
                                    <div key={lbl} style={{ flex: 1, background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px" }}>
                                        <p style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", margin: "0 0 2px", fontFamily: FONT }}>{lbl}</p>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>{val}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", margin: "0 0 8px", fontFamily: FONT }}>REFUND POLICY</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                                {[
                                    { tier: "full", label: "Within 3 days", pct: "100% refund", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
                                    { tier: "half", label: "4–15 days", pct: "50% refund", color: "#b45309", bg: "#fffbeb", border: "#fde68a" },
                                    { tier: "none", label: "After 15 days", pct: "No refund", color: C.danger, bg: "#fef2f2", border: "#fecaca" },
                                ].map(row => {
                                    const active = p.refund_policy_tier === row.tier;
                                    return (
                                        <div key={row.tier} style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            padding: "9px 12px", borderRadius: 8,
                                            border: `1px solid ${active ? row.border : C.border}`,
                                            background: active ? row.bg : "#fafafa",
                                        }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? row.color : C.border, flexShrink: 0 }} />
                                                <span style={{ fontSize: 12, color: active ? row.color : C.muted, fontWeight: active ? 700 : 500, fontFamily: FONT }}>{row.label}</span>
                                                {active && (
                                                    <span style={{ fontSize: 9, fontWeight: 700, background: row.color, color: "#fff", borderRadius: 4, padding: "1px 5px", letterSpacing: "0.04em", fontFamily: FONT }}>
                                                        YOU ARE HERE
                                                    </span>
                                                )}
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: active ? row.color : C.muted, fontFamily: FONT }}>{row.pct}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                                {[
                                    ["Days subscribed", `${p.days_since_subscribed} day${p.days_since_subscribed !== 1 ? "s" : ""}`],
                                    ["Refund eligible", `${p.refund_percentage}%`],
                                ].map(([lbl, val]) => (
                                    <div key={lbl} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT }}>{lbl}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: FONT }}>{val}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: "1px solid #fed7aa", margin: "8px 0" }} />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", fontFamily: FONT }}>Your Refund</span>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: "#9a3412", fontFamily: FONT }}>{money(p.refund_amount)}</span>
                                </div>
                            </div>

                            <label style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", marginBottom: 16 }}>
                                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                                    style={{ marginTop: 2, accentColor: C.danger, width: 14, height: 14, flexShrink: 0 }} />
                                <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT, lineHeight: 1.5 }}>
                                    I have read and agree to the refund policy. I understand this action is <b style={{ color: C.text }}>irreversible</b> and all remaining sessions will be cancelled.
                                </span>
                            </label>

                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={onClose} style={{ flex: 1, background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
                                    Keep Plan
                                </button>
                                <button onClick={() => setStep("confirm")} disabled={!agreed} style={{
                                    flex: 1, background: agreed ? C.danger : "#f1f5f9",
                                    color: agreed ? C.white : C.muted, border: "none", borderRadius: 8,
                                    padding: "10px 0", fontSize: 13, fontWeight: 700,
                                    cursor: agreed ? "pointer" : "not-allowed", fontFamily: FONT, transition: "all 0.2s",
                                }}>Continue →</button>
                            </div>
                        </>
                    )}

                    {/* STEP 2 — Confirm */}
                    {step === "confirm" && p && (
                        <>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                                {[["Total Sessions", p.total_sessions], ["Completed", p.completed_sessions], ["Remaining", p.remaining_sessions], ["Per Session", money(p.per_session_amount)]].map(([lbl, val]) => (
                                    <div key={lbl} style={{ background: "#f8fafc", borderRadius: 8, padding: "9px 11px", border: `1px solid ${C.border}` }}>
                                        <p style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", margin: "0 0 3px", fontFamily: FONT }}>{lbl}</p>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>{val}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                                {[["Total Paid", money(p.total_amount)], [`Used (${p.completed_sessions} sessions)`, `− ${money(p.used_amount)}`]].map(([lbl, val]) => (
                                    <div key={lbl} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT }}>{lbl}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: FONT }}>{val}</span>
                                    </div>
                                ))}
                                <div style={{ borderTop: "1px solid #fed7aa", margin: "8px 0" }} />
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#9a3412", fontFamily: FONT }}>Refund Amount</span>
                                    <span style={{ fontSize: 16, fontWeight: 800, color: "#9a3412", fontFamily: FONT }}>{money(p.refund_amount)}</span>
                                </div>
                            </div>

                            <p style={{ fontSize: 11, color: C.muted, fontFamily: FONT, marginBottom: 6 }}>⚠️ This will permanently cancel all remaining sessions.</p>

                            <textarea value={reason} onChange={e => setReason(e.target.value)}
                                placeholder="Reason for cancellation (optional)"
                                style={{ width: "100%", minHeight: 56, resize: "vertical", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", fontSize: 12, fontFamily: FONT, marginBottom: 14, outline: "none" }} />

                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => setStep("policy")} style={{ flex: 1, background: C.white, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>← Back</button>
                                <button onClick={handleConfirm} disabled={isCancelling} style={{
                                    flex: 1, background: C.danger, color: C.white, border: "none", borderRadius: 8,
                                    padding: "10px 0", fontSize: 13, fontWeight: 700,
                                    cursor: isCancelling ? "not-allowed" : "pointer", fontFamily: FONT,
                                    opacity: isCancelling ? 0.7 : 1,
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                }}>
                                    {isCancelling && <Loader2 size={13} className="spin-icon" />}
                                    Confirm Cancel
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 — Done */}
                    {step === "done" && done && (
                        <>
                            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px", textAlign: "center", marginBottom: 14 }}>
                                <p style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, letterSpacing: "0.06em", margin: "0 0 4px", fontFamily: FONT }}>REFUND AMOUNT</p>
                                <p style={{ fontSize: 26, fontWeight: 800, color: "#15803d", margin: 0, fontFamily: FONT }}>{money(done.refund_amount)}</p>
                                <p style={{ fontSize: 11, color: C.muted, margin: "6px 0 0", fontFamily: FONT }}>
                                    {done.completed_sessions} of {done.total_sessions} sessions used · {done.refund_percentage}% policy applied
                                </p>
                            </div>
                            <button onClick={() => { onConfirmed(); onClose(); }} style={{
                                width: "100%", background: C.dark, color: C.white, border: "none",
                                borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700,
                                cursor: "pointer", fontFamily: FONT,
                            }}>Done</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error, refetch } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);
    const [cancelTarget, setCancelTarget] = useState(null);
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

    const handleView = (sub) => setSelected({ ...sub, mentorName: sub.mentor_name || "", mentorRole: sub.mentor_role || "" });
    const handleCancelClick = (sub) => setCancelTarget(sub);

    return (
        <>
            <style>{GLOBAL_CSS}</style>

            <div style={{ minHeight: "100vh", background: C.bg, padding: "clamp(16px, 4vw, 28px)", fontFamily: FONT }}>
                <div style={{ maxWidth: 1000, margin: "0 auto" }}>
                    <div style={{ marginBottom: 20 }}>
                        <h1 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 700, color: C.text, margin: "0 0 3px", fontFamily: FONT }}>Subscription Plan</h1>
                        <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT }}>
                            {isLoading ? "Loading…" : `${subs.length} subscription${subs.length !== 1 ? "s" : ""}`}
                        </p>
                    </div>

                    {(!menteeId || isError) && (
                        <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 12, padding: "28px 20px", textAlign: "center", maxWidth: 360, margin: "0 auto" }}>
                            <AlertTriangle size={26} style={{ color: "#dc2626", marginBottom: 10 }} />
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#dc2626", margin: 0, fontFamily: FONT }}>
                                {!menteeId ? "Please log in again." : error?.data?.message || "Failed to load subscriptions."}
                            </p>
                        </div>
                    )}

                    {menteeId && !isError && isLoading && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {menteeId && !isError && !isLoading && !subs.length && (
                        <div style={{ background: C.white, border: `1px dashed ${C.border}`, borderRadius: 14, padding: "56px 20px", textAlign: "center", maxWidth: 360, margin: "0 auto" }}>
                            <Inbox size={32} style={{ color: C.border, marginBottom: 14 }} />
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 6px", fontFamily: FONT }}>No Subscriptions Yet</h3>
                            <p style={{ fontSize: 13, color: C.muted, margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>Browse mentors and pick a plan to get started.</p>
                        </div>
                    )}

                    {menteeId && !isError && !isLoading && subs.length > 0 && (
                        <>
                            {/* Subscription cards — multi-column grid, card-sized */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, alignItems: "start" }}>
                                {subs.map((sub, i) => (
                                    <SubscriptionCard key={sub._id} sub={sub} i={i}
                                        onPay={handleCompletePayment} onView={handleView} onCancel={handleCancelClick} />
                                ))}
                            </div>

                            {/* Refund tables — full-width, stacked below all cards (not boxed into the card grid) */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
                                {subs.map((sub) => (
                                    <RefundTable key={sub._id} subscriptionId={sub._id} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── View Details Modal — no refund details here anymore ── */}
            {selected && (
                <div onClick={() => setSelected(null)} style={{
                    position: "fixed", inset: 0, zIndex: 50,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
                    padding: 16, animation: "fadeIn 0.15s ease",
                }}>
                    <div onClick={e => e.stopPropagation()} style={{
                        width: "100%", maxWidth: 440, background: C.white,
                        borderRadius: 14,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
                        overflow: "hidden", animation: "slideUp 0.2s ease", fontFamily: FONT,
                        maxHeight: "90vh", overflowY: "auto",
                    }}>
                        {/* Modal header */}
                        <div style={{ background: C.dark, padding: "16px 18px", position: "sticky", top: 0, zIndex: 1 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                <div>
                                    <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", margin: "0 0 4px", fontFamily: FONT }}>
                                        Subscription Details
                                    </p>
                                    <h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: "0 0 3px", fontFamily: FONT }}>
                                        {planLabel(selected.plan_type)} Plan
                                    </h2>
                                 
                                </div>
                                <button onClick={() => setSelected(null)} style={{
                                    width: 30, height: 30, borderRadius: 7,

                                    color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                                }}><X size={24} /></button>
                            </div>
                        </div>

                        <div style={{ padding: "16px 18px" }}>


                            {selected.mentor_name && (
                                <div style={{ marginBottom: 14, fontSize: 12, color: C.sub, fontFamily: FONT }}>
                                    <b style={{ color: C.text }}>Mentor:</b> {selected.mentor_name}{selected.mentor_role ? ` · ${selected.mentor_role}` : ""}
                                </div>
                            )}

                            {/* Cancelled info */}
                            {selected.status === "cancelled" && (
                                <div style={{ marginBottom: 14, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                                        <XCircle size={13} style={{ color: C.danger }} />
                                        <p style={{ fontSize: 12, fontWeight: 700, color: C.danger, margin: 0, fontFamily: FONT }}>
                                            Cancelled on {fmt(selected.cancelled_at)}
                                        </p>
                                    </div>
                                    <p style={{ fontSize: 11, color: "#991b1b", margin: 0, fontFamily: FONT }}>
                                        Refund: {money(selected.refund_amount)} · {selected.sessions_completed_at_cancellation} sessions used
                                    </p>
                                </div>
                            )}

                            {selected.is_extended && (
                                <div style={{ marginBottom: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                                        <TrendingUp size={13} style={{ color: "#16a34a" }} />
                                        <p style={{ fontSize: 12, fontWeight: 600, color: "#15803d", margin: 0, fontFamily: FONT }}>Extended · {selected.extended_days} Days</p>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                        {selected.extensions?.map((ext, i) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.sub, fontFamily: FONT }}>
                                                <CalendarDays size={10} style={{ color: "#16a34a" }} />
                                                +{ext.added_days}d · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Subscription detail grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                {[
                                    ["Sessions", `${selected.total_sessions}`, false],
                                    ["Amount", money(selected.amount), false],
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
                                        <p style={{ fontSize: 9, fontWeight: 700, color: highlight ? C.blue : C.muted, letterSpacing: "0.08em", margin: "0 0 3px", fontFamily: FONT }}>{label}</p>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT, lineHeight: 1.3 }}>{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                                {selected.payment_status === "pending" && (
                                    <button className="pay-btn" onClick={() => handleCompletePayment(selected)} style={{
                                        flex: 1, background: C.dark, color: C.white, border: "none", borderRadius: 8,
                                        padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT, transition: "all 0.2s",
                                    }}>Pay Now</button>
                                )}
                                {selected.status === "active" && selected.payment_done && (
                                    <button onClick={() => { setSelected(null); setCancelTarget(selected); }} style={{
                                        flex: 1, background: C.white, color: C.danger, border: `1px solid #fecaca`,
                                        borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
                                    }}>Cancel Plan</button>
                                )}
                                <button onClick={() => setSelected(null)} style={{
                                    flex: 1, background: C.dark, color: C.white, border: `1px solid ${C.dark}`,
                                    borderRadius: 8, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
                                }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Cancel Modal ── */}
            {cancelTarget && (
                <CancelModal sub={cancelTarget} onClose={() => setCancelTarget(null)} onConfirmed={refetch} />
            )}
        </>
    );
};

export default Subscriptionplan;