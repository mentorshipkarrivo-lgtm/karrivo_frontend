


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














