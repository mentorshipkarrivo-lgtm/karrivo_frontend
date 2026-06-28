

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
  .ghost-btn:hover { background: #f8fafc !important; }
  .spin-icon { animation: spin 0.8s linear infinite; }
  .subs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; align-items: start; }
  @media (max-width: 640px) {
    .subs-grid { grid-template-columns: 1fr; }
  }
`;

const fmt = (iso) =>
    iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const money = (n) =>
    `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const planLabel = (t) =>
({ one_month: "1 Month", three_months: "3 Months", six_months: "6 Months" }[t] ||
    t?.replace(/_/g, " ") || "—");

const displayValue = (val) => {
    if (val === null || val === undefined || val === "") return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
};

const REFUND_COLUMNS = [
    { key: "plan_type", label: "Plan", render: (v) => planLabel(v) },
    { key: "status", label: "Status" },
    { key: "total_sessions", label: "Total Sessions" },
    { key: "completed_sessions", label: "Completed" },
    { key: "remaining_sessions", label: "Remaining" },
    { key: "total_amount", label: "Total Paid", render: (v) => money(v) },
    { key: "per_session_amount", label: "Per Session", render: (v) => money(v) },
    { key: "refund_amount", label: "Refund Amount", render: (v) => money(v) },
    { key: "cancellation_reason", label: "Reason" },
    { key: "transaction_id", label: "Transaction ID" },
    {
        key: "receipt_url", label: "Receipt",
        render: (v) => v ? (
            <a href={v} target="_blank" rel="noopener noreferrer"
                style={{ color: C.blue, fontWeight: 700, textDecoration: "underline" }}>
                View Receipt
            </a>
        ) : null,
    },
    { key: "createdAt", label: "Requested On", render: (v) => fmt(v) },
];

const btnBase = {
    flex: 1,
    border: "none",
    borderRadius: 8,
    padding: "10px 0",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: FONT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "all 0.2s",
};

const btnGhost = {
    ...btnBase,
    background: C.white,
    color: C.text,
    border: `1px solid ${C.border}`,
};

const btnDark = {
    ...btnBase,
    background: C.dark,
    color: C.white,
};

const btnDanger = (enabled) => ({
    ...btnBase,
    background: enabled ? C.danger : "#f1f5f9",
    color: enabled ? C.white : C.muted,
    cursor: enabled ? "pointer" : "not-allowed",
});

const btnDangerOutline = {
    ...btnBase,
    background: C.white,
    color: C.danger,
    border: `1px solid #fecaca`,
};

const tile = (highlight) => ({
    borderRadius: 8,
    padding: "10px 12px",
    background: highlight ? "#f0f9ff" : "#f8fafc",
    border: `1px solid ${highlight ? "#bae6fd" : C.border}`,
});

const tileLabel = (highlight) => ({
    fontSize: 9, fontWeight: 700, color: highlight ? C.blue : C.muted,
    letterSpacing: "0.08em", margin: "0 0 3px", fontFamily: FONT,
});

const tileValue = {
    fontSize: 13, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT, lineHeight: 1.3,
};

const Modal = ({ onClose, maxWidth = 440, headerBg = C.dark, headerIcon, title, subtitle, children, footer }) => (
    <div
        onClick={onClose}
        style={{
            position: "fixed", inset: 0, zIndex: 60, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
            padding: 16, animation: "fadeIn 0.15s ease",
        }}
    >
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
                width: "100%", maxWidth, background: C.white, borderRadius: 16,
                boxShadow: "0 20px 60px rgba(0,0,0,0.18)", overflow: "hidden",
                animation: "slideUp 0.2s ease", fontFamily: FONT,
                maxHeight: "90vh", display: "flex", flexDirection: "column",
            }}
        >
            <div style={{
                background: headerBg, padding: "16px 20px", flexShrink: 0,
                position: "sticky", top: 0, zIndex: 1,
            }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                        {headerIcon}
                        <div>
                            {subtitle && (
                                <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.18em", margin: "0 0 3px", fontFamily: FONT }}>
                                    {subtitle}
                                </p>
                            )}
                            <h2 style={{ fontSize: 16, fontWeight: 700, color: C.white, margin: 0, fontFamily: FONT }}>
                                {title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                            background: "rgba(255,255,255,0.15)", border: "none",
                            color: C.white, display: "flex", alignItems: "center",
                            justifyContent: "center", cursor: "pointer",
                        }}
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
                {children}
            </div>

            {footer && (
                <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
                    {footer}
                </div>
            )}
        </div>
    </div>
);

const InfoRow = ({ label, value, bold = true, color = C.text }) => (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: bold ? 700 : 500, color, fontFamily: FONT }}>{value}</span>
    </div>
);

const InfoGrid = ({ items, cols = 2 }) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
        {items.map(([label, value, highlight]) => (
            <div key={label} style={tile(highlight)}>
                <p style={tileLabel(highlight)}>{label}</p>
                <p style={tileValue}>{value}</p>
            </div>
        ))}
    </div>
);

// ── Refund Table — called separately, not per card ────────────────────────────
const RefundTable = ({ subscriptionId }) => {
    const { data: refund, isLoading, isError } = useGetRefundBySubscriptionIdQuery(subscriptionId);

    if (isLoading) return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", justifyContent: "center", border: `1px solid ${C.border}`, borderRadius: 10, background: C.white, fontFamily: FONT }}>
            <Loader2 size={14} className="spin-icon" style={{ color: C.muted }} />
            <span style={{ fontSize: 12, color: C.muted, fontFamily: FONT }}>Loading refund details…</span>
        </div>
    );

    if (isError || !refund) return (
        <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: C.muted, fontFamily: FONT, display: "flex", alignItems: "center", gap: 6 }}>
            <AlertCircle size={13} />
            No refund record found for this subscription.
        </div>
    );

    return (
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", fontFamily: FONT, background: C.white, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
            <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontFamily: FONT }}>Refund Details</span>
            </div>
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT }}>
                    <thead>
                        <tr style={{ background: C.dark }}>
                            <th style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: C.white, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>S.No</th>
                            {REFUND_COLUMNS.map((col) => (
                                <th key={col.key} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 700, color: C.white, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "12px 16px", fontSize: 13, color: C.text, fontWeight: 700, whiteSpace: "nowrap" }}>1</td>
                            {REFUND_COLUMNS.map((col) => {
                                const raw = refund[col.key];
                                const value = col.render ? col.render(raw) : displayValue(raw);
                                const isEmpty = value === null || value === undefined || value === "";
                                return (
                                    <td key={col.key} style={{ padding: "12px 16px", fontSize: 13, color: C.text, fontWeight: 700, whiteSpace: "nowrap" }}>
                                        {isEmpty ? "" : value}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ padding: "10px 16px", fontSize: 11, color: C.muted, fontFamily: FONT, borderTop: `1px solid ${C.border}` }}>
                Showing <b style={{ color: C.text }}>1</b> refund record
            </div>
        </div>
    );
};

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

const SubscriptionCard = ({ sub, i, onView, onPay, onCancel }) => {
    const canCancel = sub.status !== "cancelled";
    const isCancelled = sub.status === "cancelled";
    const statusDot = isCancelled ? "#f87171" : sub.status === "active" ? "#4ade80" : "#38bdf8";

    return (
        <div className="sub-card" style={{
            background: "#0a1a22",
            borderRadius: 20,
            border: `1px solid ${isCancelled ? "rgba(248,113,113,0.3)" : "rgba(255,255,255,0.08)"}`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: FONT,
            animationDelay: `${i * 70}ms`,
        }}>
            <div style={{ padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255)", fontFamily: FONT }}>
                            {planLabel(sub.plan_type)} Plan
                        </span>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, color: "#4ade80", display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, color: "#ffffff", display: "inline-flex", alignItems: "center", gap: 5 }}> status: </span> {isCancelled ? "Cancelled" : sub.status === "active" ? "Active" : sub.status === "onprocess" ? "On Process" : sub.status === "expired" ? "Expired" : "Pending"}
                    </span>
                </div>

                <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", fontFamily: FONT, letterSpacing: "-0.02em" }}>
                        {money(sub.amount)}
                    </span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255)", margin: "0 0 20px", fontFamily: FONT }}>
                    {sub.total_sessions} session{sub.total_sessions !== 1 ? "s" : ""} included
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: sub.is_extended ? 14 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255)", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6 }}>
                            <CalendarDays size={13} style={{ color: "#ffffff" }} /> Expires
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff", fontFamily: FONT }}>{fmt(sub.effective_end_date)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 12, color: "rgba(255,255,255)", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6 }}>
                            <CreditCard size={13} style={{ color: "rgba(255,255,255)" }} /> Payment
                        </span>
                        <DarkPaymentLabel done={sub.payment_done} status={sub.payment_status} subStatus={sub.status} />
                    </div>
                </div>

                {sub.is_extended && (
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "#4ade80", fontFamily: FONT, marginTop: 4 }}>
                        <CalendarClock size={12} style={{ flexShrink: 0 }} />
                        Extended {sub.extended_days} day{sub.extended_days > 1 ? "s" : ""} due to mentor leave
                    </div>
                )}
            </div>

            {/* Payment pending strip — hide for cancelled */}
            {
                sub.payment_status === "pending" && sub.status !== "cancelled" && (
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "12px 24px", background: "rgba(251,191,36,0.08)", borderTop: "1px solid rgba(251,191,36,0.2)",
                    }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#fbbf24", fontFamily: FONT, display: "flex", alignItems: "center", gap: 6 }}>
                            <AlertCircle size={13} /> Payment pending
                        </span>
                        <button className="pay-btn" onClick={() => onPay(sub)} style={{
                            background: "#0098cc", color: "#ffffff", border: "none", borderRadius: 8,
                            padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                        }}>
                            Pay Now
                        </button>
                    </div>
                )
            }

            <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "auto" }}>
                <button
                    className="ghost-btn-dark"
                    onClick={() => onView(sub)}
                    style={{
                        flex: 1, background: "transparent", color: "#ffffff", border: "none",
                        padding: "13px 0", fontSize: 13, fontWeight: 600, cursor: "pointer",
                        fontFamily: FONT, borderRight: canCancel ? "1px solid rgba(255,255,255,0.08)" : "none",
                        transition: "background 0.15s",
                    }}
                >
                    View Details
                </button>
                {canCancel && (
                    <button
                        className="cancel-btn-dark"
                        onClick={() => onCancel(sub)}
                        style={{
                            flex: 1, background: "transparent", color: "#f87171", border: "none",
                            padding: "13px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                            transition: "background 0.15s",
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div >
    );
};

const DarkPaymentLabel = ({ done, status, subStatus }) => {
    if (subStatus === "cancelled") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#f87171", fontFamily: FONT }}><XCircle size={13} />Cancelled</span>;
    if (done) return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#4ade80", fontFamily: FONT }}><CheckCircle2 size={13} />Paid</span>;
    if (status === "onprocess") return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#38bdf8", fontFamily: FONT }}><Clock size={13} />Processing</span>;
    return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.45)", fontFamily: FONT }}><Clock size={13} />Pending</span>;
};

const SkeletonCard = () => (
    <div style={{ borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden", background: C.white }}>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[40, 70, 50, 90, 60].map((w, idx) => (
                <div key={idx} style={{ height: idx === 1 ? 28 : 12, borderRadius: 6, background: "#f1f5f9", width: `${w}%`, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
        </div>
    </div>
);

const ViewDetailsModal = ({ sub, onClose, onPay, onCancelRequest }) => (
    <Modal
        onClose={onClose}
        maxWidth={440}
        subtitle="Subscription Details"
        title={`${planLabel(sub.plan_type)} Plan`}
        footer={
            <div style={{ display: "flex", gap: 8 }}>
                {sub.payment_status === "pending" && sub.status !== "cancelled" && (
                    <button className="pay-btn" onClick={() => onPay(sub)} style={btnDark}>
                        Pay Now
                    </button>
                )}
                {sub.status !== "cancelled" && (
                    <button onClick={() => onCancelRequest(sub)} style={btnDangerOutline}>
                        Cancel Plan
                    </button>
                )}
                <button onClick={onClose} style={btnDark}>
                    Close
                </button>
            </div>
        }
    >
        {sub.mentor_name && (
            <div style={{ marginBottom: 14, fontSize: 12, color: C.sub, fontFamily: FONT }}>
                <b style={{ color: C.text }}>Mentor:</b> {sub.mentor_name}{sub.mentor_role ? ` · ${sub.mentor_role}` : ""}
            </div>
        )}

        {sub.status === "cancelled" && (
            <div style={{ marginBottom: 14, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <XCircle size={13} style={{ color: C.danger }} />
                    <p style={{ fontSize: 12, fontWeight: 700, color: C.danger, margin: 0, fontFamily: FONT }}>Cancelled on {fmt(sub.cancelled_at)}</p>
                </div>
                <p style={{ fontSize: 11, color: "#991b1b", margin: 0, fontFamily: FONT }}>
                    Refund: {money(sub.refund_amount)} · {sub.sessions_completed_at_cancellation} sessions used
                </p>
            </div>
        )}

        {sub.is_extended && (
            <div style={{ marginBottom: 14, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                    <TrendingUp size={13} style={{ color: "#16a34a" }} />
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#15803d", margin: 0, fontFamily: FONT }}>Extended · {sub.extended_days} Days</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {sub.extensions?.map((ext, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.sub, fontFamily: FONT }}>
                            <CalendarDays size={10} style={{ color: "#16a34a" }} />
                            +{ext.added_days}d · {fmt(ext.unavailable_from)} – {fmt(ext.unavailable_to)}
                        </div>
                    ))}
                </div>
            </div>
        )}

        <InfoGrid items={[
            ["Sessions", `${sub.total_sessions}`, false],
            ["Amount", money(sub.amount), false],
            ["Start", fmt(sub.subscribed_at), false],
            ["Original End", fmt(sub.subscription_end_date), false],
            ["Extra Days", `+${sub.extended_days || 0}`, false],
            ["Effective End", fmt(sub.effective_end_date), true],
        ]} />
    </Modal>
);

const CancelModal = ({ sub, onClose, onConfirmed, showToast }) => {
    const [step, setStep] = useState("policy");
    const [reason, setReason] = useState("");
    const [agreed, setAgreed] = useState(false);

    const { data: preview, isLoading, isError } = useGetRefundPreviewQuery(sub._id);
    const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();

    const p = preview;
    const isUnpaid = isError || !p;

    const handleConfirm = async () => {
        try {
            const res = await cancelSubscription({
                subscription_id: sub._id,
                mentee_id: sub.mentee_id,
                cancellation_reason: reason || "Cancelled before payment",
            }).unwrap();
            onConfirmed();
            onClose();
            if (res?.data?.refund_amount > 0) {
                showToast(`Subscription cancelled · Refund ${money(res.data.refund_amount)} will be processed`);
            } else {
                showToast("Subscription cancelled successfully");
            }
        } catch (err) {
            alert(err?.data?.message || "Failed to cancel subscription");
        }
    };

    const headerIcon = <ShieldAlert size={18} style={{ color: C.white }} />;

    return (
        <Modal onClose={onClose} maxWidth={420} headerBg={C.danger} headerIcon={headerIcon} title="Cancel Subscription">
            {isLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "28px 0", justifyContent: "center" }}>
                    <Loader2 size={16} className="spin-icon" style={{ color: C.muted }} />
                    <span style={{ fontSize: 13, color: C.muted, fontFamily: FONT }}>Loading plan details…</span>
                </div>
            )}

            {step === "policy" && !isLoading && (
                <>
                    {/* Non-active — simple cancel */}
                    {sub.status !== "active" ? (
                        <>
                            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <AlertTriangle size={15} style={{ color: "#d97706", flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#92400e", fontFamily: FONT }}>Payment Pending</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#b45309", margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
                                    Your payment for this subscription is still pending. Cancelling it will permanently remove this subscription with <b>no refund needed</b>.
                                </p>
                            </div>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", marginBottom: 16 }}>
                                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                                    style={{ marginTop: 2, accentColor: C.danger, width: 14, height: 14, flexShrink: 0 }} />
                                <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT, lineHeight: 1.5 }}>
                                    I understand this will <b style={{ color: C.text }}>permanently cancel</b> this subscription and it cannot be undone.
                                </span>
                            </label>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={onClose} style={btnGhost}>Keep Plan</button>
                                <button onClick={handleConfirm} disabled={!agreed || isCancelling} style={btnDanger(agreed && !isCancelling)}>
                                    {isCancelling && <Loader2 size={13} className="spin-icon" />}
                                    {isCancelling ? "Cancelling…" : "Cancel Subscription"}
                                </button>
                            </div>
                        </>
                    ) : isUnpaid ? (
                        /* Active but no payment */
                        <>
                            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <AlertTriangle size={15} style={{ color: "#d97706", flexShrink: 0 }} />
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#92400e", fontFamily: FONT }}>No Payment Made</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#b45309", margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
                                    This subscription hasn't been paid yet. Cancelling it will permanently remove it with <b>no refund needed</b>.
                                </p>
                            </div>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", marginBottom: 16 }}>
                                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                                    style={{ marginTop: 2, accentColor: C.danger, width: 14, height: 14, flexShrink: 0 }} />
                                <span style={{ fontSize: 12, color: C.sub, fontFamily: FONT, lineHeight: 1.5 }}>
                                    I understand this will <b style={{ color: C.text }}>permanently cancel</b> this subscription and it cannot be undone.
                                </span>
                            </label>
                            <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={onClose} style={btnGhost}>Keep Plan</button>
                                <button onClick={handleConfirm} disabled={!agreed || isCancelling} style={btnDanger(agreed && !isCancelling)}>
                                    {isCancelling && <Loader2 size={13} className="spin-icon" />}
                                    {isCancelling ? "Cancelling…" : "Cancel Subscription"}
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Active + paid — full refund flow */
                        <>
                            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                                {[["Current Plan", planLabel(p.plan_type)], ["Expiry", fmt(p.subscription_end_date)]].map(([lbl, val]) => (
                                    <div key={lbl} style={{ flex: 1, ...tile(false) }}>
                                        <p style={tileLabel(false)}>{lbl}</p>
                                        <p style={tileValue}>{val}</p>
                                    </div>
                                ))}
                            </div>

                            <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", margin: "0 0 8px", fontFamily: FONT }}>REFUND POLICY</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
                                {[{ tier: "full", label: "Within 3 days", pct: "100% refund", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" }].map(row => {
                                    const active = p.refund_policy_tier === row.tier;
                                    return (
                                        <div key={row.tier} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 8, border: `1px solid ${active ? row.border : C.border}`, background: active ? row.bg : "#fafafa" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? row.color : C.border, flexShrink: 0 }} />
                                                <span style={{ fontSize: 12, color: active ? row.color : C.muted, fontWeight: active ? 700 : 500, fontFamily: FONT }}>{row.label}</span>
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: active ? row.color : C.muted, fontFamily: FONT }}>{row.pct}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
                                <InfoRow label="Days subscribed" value={`${p.days_since_subscribed} day${p.days_since_subscribed !== 1 ? "s" : ""}`} />
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
                                <button onClick={onClose} style={btnGhost}>Keep Plan</button>
                                <button onClick={() => setStep("confirm")} disabled={!agreed} style={btnDanger(agreed)}>
                                    Continue →
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}

            {step === "confirm" && p && (
                <>
                    <InfoGrid cols={2} items={[
                        ["Total Sessions", p.total_sessions, false],
                        ["Completed", p.completed_sessions, false],
                        ["Remaining", p.remaining_sessions, false],
                        ["Per Session", money(p.per_session_amount), false],
                    ]} />

                    <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "12px 14px", margin: "14px 0" }}>
                        <InfoRow label="Total Paid" value={money(p.total_amount)} />
                        <InfoRow label={`Used (${p.completed_sessions} sessions)`} value={`− ${money(p.used_amount)}`} />
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
                        <button onClick={() => setStep("policy")} style={btnGhost}>← Back</button>
                        <button onClick={handleConfirm} disabled={isCancelling} style={{ ...btnDanger(true), opacity: isCancelling ? 0.7 : 1, cursor: isCancelling ? "not-allowed" : "pointer" }}>
                            {isCancelling && <Loader2 size={13} className="spin-icon" />}
                            Confirm Cancel
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
};

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const Subscriptionplan = () => {
    const menteeId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
    const { data: subs = [], isLoading, isError, error, refetch } =
        useGetSubscriptionsByMenteeIdQuery(menteeId, { skip: !menteeId });

    const [selected, setSelected] = useState(null);
    const [cancelTarget, setCancelTarget] = useState(null);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

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

    const handleView = (sub) => setSelected(sub);
    const handleCancelClick = (sub) => setCancelTarget(sub);
    const handleCancelRequestFromModal = (sub) => { setSelected(null); setCancelTarget(sub); };

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
                        <div className="subs-grid">
                            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {menteeId && !isError && !isLoading && !subs.length && (
                        <div style={{ background: C.white, borderRadius: 14, padding: "20px 24px", maxWidth: 420, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#F5F7FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Inbox size={24} style={{ color: C.border }} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0, fontFamily: FONT }}>No Subscriptions Found</h3>
                                <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0", fontFamily: FONT, lineHeight: 1.5 }}>
                                    Browse mentors and choose a subscription plan to get started.
                                </p>
                            </div>
                        </div>
                    )}

                    {menteeId && !isError && !isLoading && subs.length > 0 && (
                        <>
                            <div className="subs-grid">
                                {subs.map((sub, i) => (
                                    <SubscriptionCard key={sub._id} sub={sub} i={i}
                                        onPay={handleCompletePayment} onView={handleView} onCancel={handleCancelClick} />
                                ))}
                            </div>

                            {/* Refund table — shown separately below all cards, not per card */}
                            <div style={{ marginTop: 28 }}>
                                <h2 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: "0 0 14px", fontFamily: FONT }}>
                                    Refund Records
                                </h2>
                                <RefundTable subscriptionId={subs[0]._id} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {selected && (
                <ViewDetailsModal
                    sub={selected}
                    onClose={() => setSelected(null)}
                    onPay={handleCompletePayment}
                    onCancelRequest={handleCancelRequestFromModal}
                />
            )}

            {cancelTarget && (
                <CancelModal
                    sub={cancelTarget}
                    onClose={() => setCancelTarget(null)}
                    onConfirmed={refetch}
                    showToast={showToast}
                />
            )}

            {/* Toast */}
            {toast && (
                <div style={{
                    position: "fixed", bottom: 20, right: 20, zIndex: 200,
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "10px 16px", background: "#fff", borderRadius: 10,
                    boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
                    border: `1px solid ${toast.type === "success" ? "#bbf7d0" : "#fecaca"}`,
                    fontSize: 12, fontWeight: 600, fontFamily: FONT,
                    color: toast.type === "success" ? "#16a34a" : "#dc2626",
                    animation: "fadeIn 0.2s ease",
                }}>
                    {toast.type === "success"
                        ? <CheckCircle2 size={13} />
                        : <AlertTriangle size={13} />}
                    {toast.msg}
                </div>
            )}
        </>
    );
};

export default Subscriptionplan;



