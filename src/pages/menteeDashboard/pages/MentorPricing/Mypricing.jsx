


import { useState, useEffect, useCallback } from "react";
import {
  useGetMyPricingQuery,
  useSaveOrUpdatePricingMutation,
  useGetCommissionTiersQuery,

  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useCreateCouponMutation
} from "./Mentorpricingapislice";

// ─── Static config ────────────────────────────────────────────────────────────
const PRICE_OPTIONS = {
  one_month: {
    experienced: [10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000],
    freshers: [7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000],
  },
  three_months: {
    experienced: [7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000],
    freshers: [5000, 7500, 10000, 12500],
  },
  six_months: {
    experienced: [5000, 7500, 10000, 12500],
    freshers: [2500, 5000, 7500, 10000],
  },
};

const PLANS = [
  { key: "one_month", label: "1 Month", sublabel: "LTM Plan", months: 1 },
  { key: "three_months", label: "3 Months", sublabel: "LTM Plan", months: 3 },
  { key: "six_months", label: "6 Months", sublabel: "LTM Plan", months: 6 },
];

const EMPTY_PLANS = {
  one_month: { experienced: "", freshers: "" },
  three_months: { experienced: "", freshers: "" },
  six_months: { experienced: "", freshers: "" },
};

const EMPTY_BREAKDOWNS = {
  one_month: { experienced: null, freshers: null },
  three_months: { experienced: null, freshers: null },
  six_months: { experienced: null, freshers: null },
};

// Map tier_name → human-readable label and subscriber range
const TIER_META = {
  "1_to_5": { label: "Starter", range: "1 – 5 subscribers", color: "blue" },
  "6_to_20": { label: "Growing", range: "6 – 20 subscribers", color: "violet" },
  "21_plus": { label: "Established", range: "21+ subscribers", color: "green" },
};

// Resolve tier name from subscriber count (mirrors backend logic)
const resolveTierName = (count) => {
  if (count <= 5) return "1_to_5";
  if (count <= 20) return "6_to_20";
  return "21_plus";
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtINR = (v) =>
  v != null && v !== ""
    ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v)
    : "—";

const fmtDate = (d) => {
  if (!d) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(d));
};

// ─── Tier Banner ──────────────────────────────────────────────────────────────
/**
 * Shows the mentor's current commission tier, subscriber count, and
 * the commission % that applies per plan duration — all from API data.
 *
 * tierDoc  : the matching object from tiersData.data  (e.g. { tier_name, commission: { one_month, three_months, six_months } })
 * subCount : subscriberCountAtSave from the pricing document
 * isEditing: hides the banner while the form is in edit mode (avoids confusion)
 */
const TierBanner = ({ tierDoc, subCount, isEditing }) => {
  if (!tierDoc || isEditing) return null;

  const meta = TIER_META[tierDoc.tier_name] || { label: tierDoc.tier_name, range: "", color: "gray" };

  const colorMap = {
    blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
    violet: { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
    green: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
    gray: { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", badge: "bg-gray-100 text-gray-700", dot: "bg-gray-400" },
  };
  const c = colorMap[meta.color];

  const rates = [
    { label: "1 Month", pct: tierDoc.commission?.one_month },
    { label: "3 Months", pct: tierDoc.commission?.three_months },
    { label: "6 Months", pct: tierDoc.commission?.six_months },
  ];

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3 mb-5`}>
      {/* Top row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-bold text-[#1a1a2e]`}>
            Commission Tier: {meta.label}
          </p>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-[#1a1a2e]`}>
            {meta.range}
          </span>
        </div>
        <p className="text-[11px] text-gray-400">
          {subCount === 0
            ? "No active subscribers yet"
            : `${subCount} active subscriber${subCount !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Commission rates per plan */}
      <div className="flex items-center gap-3 mt-2.5 flex-wrap">
        <p className="text-[11px] text-gray-500 font-medium shrink-0">Platform commission:</p>
        {rates.map(({ label, pct }) => (
          <span key={label} className="flex items-center gap-1 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
            <span className="font-semibold text-gray-800">{pct}%</span>
            <span className="text-gray-400">{label}</span>
          </span>
        ))}
        <p className="text-[10px] text-gray-400 ml-auto">
          + 9% CGST + 9% SGST on total amount
        </p>
      </div>
    </div>
  );
};




const CouponModal = ({ onClose, mentorId }) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const { data: couponData, refetch } = useGetAllCouponsQuery();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const [durations, setDurations] = useState({ one: false, three: false, six: false });
  const [startDate, setStartDate] = useState("");
  const [expiry, setExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getSelectedDuration = () => {
    const selected = [];
    if (durations.one) selected.push(1);
    if (durations.three) selected.push(3);
    if (durations.six) selected.push(6);
    return selected;
  };

  const resetForm = () => {
    setCode("");
    setDiscount(10);
    setStartDate("");
    setExpiry(false);
    setExpiryDate("");
    setEditingId(null);
    setDurations({ one: false, three: false, six: false });
  };

  const handleSubmit = async () => {
    try {
      const totalCoupons = couponData?.data?.length || 0;

      if (!editingId && totalCoupons >= 3) {
        alert("You can only create a maximum of 3 coupons");
        return;
      }

      if (
        !code ||
        !discount ||
        !startDate ||
        getSelectedDuration().length === 0 ||
        (expiry && !expiryDate)
      ) {
        alert("Please fill all required fields");
        return;
      }

      const payload = {
        mentorId,
        couponCode: code,
        discountValue: Number(discount),
        appliesForDuration: getSelectedDuration(),
        startDate,
        expiryDate: expiry ? expiryDate : undefined,
      };

      if (editingId) {
        await updateCoupon({ couponId: editingId, ...payload }).unwrap();
        alert("Coupon updated successfully");
      } else {
        await createCoupon(payload).unwrap();
        alert("Coupon created successfully");
      }

      resetForm();
      refetch();
    } catch (error) {
      alert(error?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setCode(coupon.couponCode);
    setDiscount(coupon.discountValue);
    setStartDate(coupon.startDate?.split("T")[0] || "");

    if (coupon.expiryDate) {
      setExpiry(true);
      setExpiryDate(coupon.expiryDate.split("T")[0]);
    } else {
      setExpiry(false);
      setExpiryDate("");
    }

    setDurations({
      one: coupon.appliesForDuration?.includes(1) || false,
      three: coupon.appliesForDuration?.includes(3) || false,
      six: coupon.appliesForDuration?.includes(6) || false,
    });

    // On mobile, scroll the form panel into view
    document.getElementById("coupon-form-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (couponId) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await deleteCoupon(couponId).unwrap();
      alert("Coupon deleted successfully");
      if (editingId === couponId) resetForm();
      refetch();
    } catch (error) {
      alert(error?.data?.message || "Delete failed");
    }
  };

  const coupons = couponData?.data || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      {/*
        Modal wrapper:
        - On mobile (< sm): single column, scrollable
        - On sm+: side-by-side row when coupons panel is open
        - max-h-[90vh] prevents overflow past viewport
      */}
      <div
        className={[
          "relative bg-white rounded-2xl shadow-2xl overflow-hidden",
          "w-full flex",
          "transition-all duration-300 ease-in-out",
          showCoupons
            ? "max-w-2xl flex-col sm:flex-row"
            : "max-w-sm flex-col",
          "max-h-[90vh]",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── FORM PANEL ── */}
        <div
          id="coupon-form-top"
          className={[
            "flex flex-col gap-3 overflow-y-auto",
            "p-5",
            // When side panel is open on sm+, fix form width; otherwise full width
            showCoupons ? "sm:w-72 sm:flex-shrink-0 sm:border-r sm:border-gray-100" : "w-full",
          ].join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-gray-900 text-[15px] font-semibold">
              {editingId ? "Update coupon code" : "Create a new coupon code"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Coupon Code */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Coupon code
            </label>
            <input
              type="text"
              placeholder="eg: ROHAN30"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] transition-all"
            />
          </div>

          {/* Discount */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Discount (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] transition-all pr-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">%</span>
            </div>
          </div>

          {/* Duration checkboxes */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Applies for duration
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { key: "one", label: "1 month" },
                { key: "three", label: "3 months" },
                { key: "six", label: "6 months" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={durations[key]}
                    onChange={() => setDurations((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="w-4 h-4 rounded accent-[#1a1a2e] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] transition-all"
            />
          </div>

          {/* Expiry Toggle */}
          <div className="flex items-center justify-between py-0.5">
            <label className="text-sm text-gray-700">Set expiry date</label>
            <button
              type="button"
              role="switch"
              aria-checked={expiry}
              onClick={() => setExpiry(!expiry)}
              className={[
                "relative w-10 h-[22px] rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/30",
                expiry ? "bg-[#1a1a2e]" : "bg-gray-200",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute top-[3px] left-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200",
                  expiry ? "translate-x-[18px]" : "translate-x-0",
                ].join(" ")}
              />
            </button>
          </div>

          {/* Expiry Date — animated reveal */}
          <div
            className={[
              "overflow-hidden transition-all duration-200",
              expiry ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]/20 focus:border-[#1a1a2e] transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 border border-gray-200 text-red-500 font-medium text-sm py-2.5 rounded-xl hover:bg-red-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-[#1a1a2e] text-white font-medium text-sm py-2.5 rounded-xl hover:bg-[#2d2d4e] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {editingId ? "Update code" : isLoading ? "Saving…" : "Create code"}
            </button>
          </div>

          {/* View/hide toggle button */}
          <button
            type="button"
            onClick={() => setShowCoupons(!showCoupons)}
            className="w-full border border-[#1a1a2e] text-[#1a1a2e] font-medium text-sm py-2.5 rounded-xl hover:bg-[#1a1a2e]/5 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${showCoupons ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showCoupons ? "Hide coupons" : `View coupons created${coupons.length ? ` (${coupons.length})` : ""}`}
          </button>
        </div>

        {/* ── COUPON SIDE / BOTTOM PANEL ── */}
        {showCoupons && (
          <div className="flex flex-col overflow-hidden flex-1 sm:min-w-0">
            {/* Sticky header inside the panel */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/80 flex-shrink-0">
              <span className="text-sm font-semibold text-gray-800">Your coupons</span>
              <span className="text-xs text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">
                {coupons.length} / 3
              </span>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-3">
              {coupons.length > 0 ? (
                coupons.map((coupon) => (
                  <div
                    key={coupon._id}
                    className={[
                      "rounded-xl border p-3.5 transition-all",
                      editingId === coupon._id
                        ? "border-[#1a1a2e] bg-[#1a1a2e]/[0.03] ring-2 ring-[#1a1a2e]/10"
                        : "border-gray-200 bg-white hover:border-gray-300",
                    ].join(" ")}
                  >
                    {/* Code + discount badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-mono font-semibold text-sm text-gray-900 tracking-widest">
                        {coupon.couponCode}
                      </span>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                        {coupon.discountValue}% off
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1 mb-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {coupon.appliesForDuration?.join(", ")} month{coupon.appliesForDuration?.length > 1 ? "s" : ""}
                      </p>
                      {coupon.expiryDate ? (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Expires {coupon.expiryDate.split("T")[0]}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">No expiry</p>
                      )}
                    </div>

                    {/* Edit / Delete */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(coupon)}
                        className="flex-1 text-xs font-medium py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(coupon._id)}
                        className="flex-1 text-xs font-medium py-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l-4-4m0 0l4-4m-4 4h16m-4 4l4-4m0 0l-4-4" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">No coupons created yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



const DetailsModal = ({ plan, breakdowns, onClose }) => {
  if (!plan) return null;

  const p = PLANS.find((x) => x.key === plan);
  const tabs = ["1 Month", "3 Months", "6 Months"];
  const [activeTab, setActiveTab] = useState(p.label);

  const activeKey =
    activeTab === "1 Month" ? "one_month"
      : activeTab === "3 Months" ? "three_months"
        : "six_months";

  const activePlan = PLANS.find((x) => x.key === activeKey);

  // Read straight from stored breakdown — no math here
  const bd = breakdowns[activeKey];
  const exp = bd?.experienced;   // { totalPrice, platformFee, platformPct, cgst, sgst, totalDeducted, mentorReceive, perMonthReceive }
  const fre = bd?.freshers;
  const noData = !exp || !fre;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <p className="text-gray-900 text-sm font-bold">
            Final Payout Breakdown — {activePlan.label} LTM
          </p>
          <p className="text-[#1a1a2e] text-xs mt-0.5">
            All figures are calculated by the server based on your commission tier at the time of saving.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-5 flex rounded-xl border border-gray-200 overflow-hidden mb-4 bg-gray-50">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 text-xs font-semibold py-2 transition-colors cursor-pointer
                ${activeTab === t
                  ? "bg-white text-gray-900 shadow-sm rounded-xl"
                  : "text-gray-400 hover:text-gray-600"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Breakdown table */}
        <div className="px-5 pb-5">
          {noData ? (
            <p className="text-center text-gray-400 text-xs py-8">
              No breakdown data available for this plan.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr>
                  <td className="pb-3 w-[46%]" />
                  <td className="pb-3 text-center">
                    <span className="bg-pink-50 text-pink-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Experienced
                    </span>
                  </td>
                  <td className="pb-3 text-center">
                    <span className="bg-purple-50 text-purple-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Freshers
                    </span>
                  </td>
                </tr>
              </thead>
              <tbody>

                {/* ── Mentee pays ── */}
                <tr className="border-t border-gray-100">
                  <td className="py-2.5 text-gray-600 text-xs">
                    Mentee pays ({activePlan.months}mo total):
                  </td>
                  <td className="py-2.5 text-center text-gray-800 text-xs font-semibold">
                    ₹{fmtINR(exp.totalPrice)}
                  </td>
                  <td className="py-2.5 text-center text-gray-800 text-xs font-semibold">
                    ₹{fmtINR(fre.totalPrice)}
                  </td>
                </tr>

                {/* ── Platform fee ── */}
                <tr className="border-t border-gray-100">
                  <td className="py-2.5 text-gray-600 text-xs">
                    Platform fee ({exp.platformPct}%):
                  </td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(exp.platformFee)}
                  </td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(fre.platformFee)}
                  </td>
                </tr>

                {/* ── CGST ── */}
                <tr className="border-t border-gray-100">
                  <td className="py-2.5 text-gray-600 text-xs">CGST (9%):</td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(exp.cgst)}
                  </td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(fre.cgst)}
                  </td>
                </tr>

                {/* ── SGST ── */}
                <tr className="border-t border-gray-100">
                  <td className="py-2.5 text-gray-600 text-xs">SGST (9%):</td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(exp.sgst)}
                  </td>
                  <td className="py-2.5 text-center text-red-400 text-xs">
                    − ₹{fmtINR(fre.sgst)}
                  </td>
                </tr>

                {/* ── Total deducted sub-total ── */}
                <tr className="border-t border-dashed border-gray-200 bg-gray-50/70">
                  <td className="py-2 text-gray-400 text-[11px] italic pl-1">Total deducted:</td>
                  <td className="py-2 text-center text-gray-500 text-[11px]">
                    − ₹{fmtINR(exp.totalDeducted)}
                  </td>
                  <td className="py-2 text-center text-gray-500 text-[11px]">
                    − ₹{fmtINR(fre.totalDeducted)}
                  </td>
                </tr>

                {/* ── Final payout ── */}
                <tr className="border-t-2 border-gray-200">
                  <td className="py-3 text-gray-700 text-sm font-bold">You receive:</td>
                  <td className="py-3 text-center">
                    <p className="text-green-600 text-base font-bold">
                      ₹{fmtINR(exp.mentorReceive)}
                    </p>
                    {activePlan.months > 1 && (
                      <p className="text-green-400 text-[10px] mt-0.5">
                        (₹{fmtINR(exp.perMonthReceive)}/mo)
                      </p>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <p className="text-green-600 text-base font-bold">
                      ₹{fmtINR(fre.mentorReceive)}
                    </p>
                    {activePlan.months > 1 && (
                      <p className="text-green-400 text-[10px] mt-0.5">
                        (₹{fmtINR(fre.perMonthReceive)}/mo)
                      </p>
                    )}
                  </td>
                </tr>

              </tbody>
            </table>
          )}
        </div>

        <div className="px-5 pb-5">
          <button onClick={onClose}
            className="w-full bg-[#1a1a2e] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#16213e] transition-colors cursor-pointer">
            I Understood
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Pricing Not Set Empty State ──────────────────────────────────────────────
const PricingNotSetState = ({ onStartSetup }) => (
  <div className="w-full min-h-screen bg-white p-6 font-sans">
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-gray-900 text-lg font-bold mb-8">My Pricing</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Pricing</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            You haven't set your pricing yet. Set up your rates for different mentoring plans to start earning.
          </p>
        </div>
        <div>
          <p className="text-gray-800 text-sm font-semibold mb-4">You'll be able to set pricing for:</p>
          <ul className="space-y-4 text-sm text-gray-700">
            <li><strong>1 Month Plan</strong> — Different rates for experienced mentors and freshers</li>
            <li><strong>3 Months Plan</strong> — Offer discounted rates for longer commitments</li>
            <li><strong>6 Months Plan</strong> — Best rates for long-term mentoring relationships</li>
          </ul>
        </div>
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Freshers pricing should always be lower than experienced pricing.
        </p>
        <div className="pt-4">
          <button onClick={onStartSetup}
            className="bg-[#1a1a2e] text-white font-medium px-5 py-2 rounded-md hover:bg-[#16213e] transition text-sm">
            Start Setting Pricing
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const MyPricing = () => {
  const [plans, setPlans] = useState(EMPTY_PLANS);
  const [breakdowns, setBreakdowns] = useState(EMPTY_BREAKDOWNS);
  const [subCount, setSubCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id;

  // ─── Queries ───────────────────────────────────────────────────────────────
  const {
    data: pricingData,
    isLoading: pricingLoading,
    error: pricingError,
    refetch: refetchPricing,
  } = useGetMyPricingQuery(mentorId, { skip: !mentorId });

  const {
    data: tiersData,
    isLoading: tiersLoading,
    error: tiersError,
  } = useGetCommissionTiersQuery();

  const [saveOrUpdatePricing, { isLoading: savingPricing }] = useSaveOrUpdatePricingMutation();

  // ─── Derive current tier doc from tiersData + subCount ────────────────────
  // tiersData.data = [{ tier_name, commission: { one_month, three_months, six_months }, ... }]
  const currentTierName = resolveTierName(subCount);
  const currentTierDoc = tiersData?.data?.find((t) => t.tier_name === currentTierName) ?? null;

  // ─── Load saved pricing ────────────────────────────────────────────────────
  useEffect(() => {
    if (!pricingData) return;

    /**
     * Response shape:
     *   { success, plans: <MentorPricingDocument> }
     *
     * Document shape:
     *   {
     *     plans: {
     *       one_month:    { experienced, freshers, breakdown: { experienced: {...}, freshers: {...} } },
     *       three_months: { ... },
     *       six_months:   { ... },
     *     },
     *     subscriberCountAtSave: 0,
     *     updatedAtDate: "...",
     *     updatedAt: "...",
     *   }
     */
    const doc = pricingData?.plans;          // MentorPricingDocument
    const planDoc = doc?.plans;                  // nested plans object

    const hasPricing =
      planDoc?.one_month?.experienced && planDoc?.one_month?.freshers &&
      planDoc?.three_months?.experienced && planDoc?.three_months?.freshers &&
      planDoc?.six_months?.experienced && planDoc?.six_months?.freshers;

    if (hasPricing) {
      // ── Prices (for dropdowns) ──
      setPlans({
        one_month: { experienced: planDoc.one_month.experienced, freshers: planDoc.one_month.freshers },
        three_months: { experienced: planDoc.three_months.experienced, freshers: planDoc.three_months.freshers },
        six_months: { experienced: planDoc.six_months.experienced, freshers: planDoc.six_months.freshers },
      });

      // ── Breakdowns — straight from API, no recalculation ──
      setBreakdowns({
        one_month: planDoc.one_month.breakdown ?? { experienced: null, freshers: null },
        three_months: planDoc.three_months.breakdown ?? { experienced: null, freshers: null },
        six_months: planDoc.six_months.breakdown ?? { experienced: null, freshers: null },
      });

      // ── Subscriber count saved at the time of last save ──
      setSubCount(doc?.subscriberCountAtSave ?? 0);

      setSaved(true);
      setIsEditingNew(false);
      setLastUpdated(doc?.updatedAtDate ?? doc?.updatedAt ?? null);
    } else {
      setPlans(EMPTY_PLANS);
      setBreakdowns(EMPTY_BREAKDOWNS);
      setSubCount(0);
      setSaved(false);
      setIsEditingNew(false);
      setLastUpdated(null);
    }
  }, [pricingData]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const showToast = useCallback((type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleDropdown = (planKey, tier, val) => {
    if (saved && !isEditingNew) return;
    setPlans((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: Number(val) } }));
  };

  const handleSave = async () => {
    // Client-side validation only — no price calculations
    for (const plan of PLANS) {
      const exp = Number(plans[plan.key].experienced) || 0;
      const fre = Number(plans[plan.key].freshers) || 0;
      if (!exp || !fre) return showToast("error", `Fill both prices for ${plan.label}`);
      if (fre >= exp) return showToast("error", `${plan.label}: Freshers price must be less than Experienced`);
    }

    setSaving(true);
    try {
      const result = await saveOrUpdatePricing({
        mentorId,
        plans: {
          one_month: { experienced: Number(plans.one_month.experienced), freshers: Number(plans.one_month.freshers) },
          three_months: { experienced: Number(plans.three_months.experienced), freshers: Number(plans.three_months.freshers) },
          six_months: { experienced: Number(plans.six_months.experienced), freshers: Number(plans.six_months.freshers) },
        },
      }).unwrap();

      /**
       * Save response: { success, message, plans: <MentorPricingDocument> }
       * Pull fresh breakdown + meta immediately from the save response
       * so UI updates without needing to wait for refetch.
       */
      const savedDoc = result?.plans;
      const savedPlan = savedDoc?.plans;

      if (savedPlan) {
        setBreakdowns({
          one_month: savedPlan.one_month?.breakdown ?? { experienced: null, freshers: null },
          three_months: savedPlan.three_months?.breakdown ?? { experienced: null, freshers: null },
          six_months: savedPlan.six_months?.breakdown ?? { experienced: null, freshers: null },
        });
        setSubCount(savedDoc?.subscriberCountAtSave ?? 0);
      }
      if (savedDoc?.updatedAtDate ?? savedDoc?.updatedAt) {
        setLastUpdated(savedDoc.updatedAtDate ?? savedDoc.updatedAt);
      }

      setSaving(false);
      setSaved(true);
      setIsEditingNew(false);
      showToast("success", "Pricing saved successfully! 🎉");
      refetchPricing();
    } catch (error) {
      setSaving(false);
      showToast("error", error?.data?.message || "Failed to save pricing. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditingNew(false);
    const planDoc = pricingData?.plans?.plans;
    if (planDoc?.one_month?.experienced) {
      setPlans({
        one_month: { experienced: planDoc.one_month.experienced, freshers: planDoc.one_month.freshers },
        three_months: { experienced: planDoc.three_months.experienced, freshers: planDoc.three_months.freshers },
        six_months: { experienced: planDoc.six_months.experienced, freshers: planDoc.six_months.freshers },
      });
      setSaved(true);
    } else {
      setPlans(EMPTY_PLANS);
      setSaved(false);
    }
  };

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (pricingLoading || tiersLoading) {
    return (
      <div className="w-full min-h-screen bg-white p-4 sm:p-6 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1a2e]" />
          <p className="text-gray-600 mt-2">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  // ─── Error (ignore 400 = "Pricing not set yet") ───────────────────────────
  const realPricingError = pricingError?.status !== 400 ? pricingError : null;
  if (realPricingError || tiersError) {
    return (
      <div className="w-full min-h-screen bg-white p-4 sm:p-6 font-sans flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Error loading pricing data</p>
          <p className="text-gray-600 text-sm mt-1">
            {realPricingError?.data?.message || tiersError?.data?.message || "Please try again later"}
          </p>
          <button onClick={() => refetchPricing()}
            className="mt-4 bg-[#1a1a2e] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#16213e]">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ─── Empty state ───────────────────────────────────────────────────────────
  if (
    !isEditingNew && !saved &&
    (!plans.one_month.experienced || !plans.three_months.experienced || !plans.six_months.experienced)
  ) {
    return <PricingNotSetState onStartSetup={() => setIsEditingNew(true)} />;
  }

  const isLocked = saved && !isEditingNew;

  // ─── Main UI ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen bg-white p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-gray-900 text-lg font-bold">My Pricing</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowCoupon(true)}
              className="text-xs font-semibold border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              + Create Coupon
            </button>
            <button
              onClick={isLocked ? () => setIsEditingNew(true) : handleSave}
              disabled={saving || savingPricing}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer
                ${saving || savingPricing
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : isLocked
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-[#1a1a2e] text-white hover:bg-[#16213e]"}`}>
              {saving || savingPricing ? "Saving…" : isLocked ? "Edit" : "Save"}
            </button>
          </div>
        </div>

        {/* Last updated */}
        {lastUpdated && isLocked ? (
          <p className="text-[11px] text-gray-400 mb-4">Last updated: {fmtDate(lastUpdated)}</p>
        ) : (
          <div className="mb-4" />
        )}

        {/* ── Tier Banner — shown only in view mode (not while editing) ── */}
        <TierBanner
          tierDoc={currentTierDoc}
          subCount={subCount}
          isEditing={!isLocked}
        />

        {/* ── Plan cards ── */}
        <div className="flex flex-col gap-3">
          {PLANS.map((plan) => {
            const s = plans[plan.key];
            const exp = Number(s.experienced) || 0;
            const fre = Number(s.freshers) || 0;
            const hasValues = exp > 0 && fre > 0;
            const fresWarn = hasValues && fre >= exp;
            const opts = PRICE_OPTIONS[plan.key];

            // Read perMonthReceive directly from API breakdown — no frontend math
            const bdExp = breakdowns[plan.key]?.experienced;
            const bdFre = breakdowns[plan.key]?.freshers;
            const expReceive = bdExp?.perMonthReceive ?? null;
            const freReceive = bdFre?.perMonthReceive ?? null;

            return (
              <div key={plan.key} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

                {/* Card header */}
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2">
                  <span className="text-gray-800 text-sm font-bold">{plan.label}</span>
                  <span className="text-gray-400 text-xs">{plan.sublabel}</span>
                  {hasValues && saved && !fresWarn && isLocked && (
                    <span className="ml-auto flex items-center gap-1 text-[9px] text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Active
                    </span>
                  )}
                </div>

                {/* Price selectors */}
                <div className="flex flex-col sm:flex-row">
                  {["experienced", "freshers"].map((tier, idx) => {
                    const label = tier === "experienced" ? "For Experienced" : "For Freshers";
                    const value = s[tier];
                    const tierOpts = opts[tier];

                    return (
                      <div key={tier}
                        className={`flex-1 px-5 py-4 ${idx === 0 ? "sm:border-r border-b sm:border-b-0 border-gray-100" : ""}`}>
                        <p className="text-gray-500 text-xs mb-2">{label}</p>
                        <div className={`relative flex items-center border rounded-lg px-3 h-11
                          ${isLocked ? "bg-gray-50 border-gray-100" : "bg-white border-gray-300 hover:border-gray-400"}`}>
                          <span className="text-gray-500 text-sm shrink-0">₹</span>
                          <select
                            value={value}
                            onChange={(e) => handleDropdown(plan.key, tier, e.target.value)}
                            disabled={isLocked}
                            className={`flex-1 bg-transparent border-none outline-none text-sm font-semibold appearance-none pl-1
                              ${isLocked ? "text-gray-500 cursor-not-allowed" : "text-gray-900 cursor-pointer"}`}>
                            <option value="" disabled className="text-gray-400">Select price</option>
                            {tierOpts.map((p) => (
                              <option key={p} value={p} className="text-gray-900">
                                ₹{new Intl.NumberFormat("en-IN").format(p)}/month
                              </option>
                            ))}
                          </select>
                          {!isLocked && (
                            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Fresher price warning */}
                {fresWarn && (
                  <div className="mx-5 mb-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-600 text-xs font-medium">
                    ⚠ Freshers price must be less than Experienced
                  </div>
                )}

                {/* Earnings row — perMonthReceive from API breakdown */}
                {hasValues && saved && !fresWarn && isLocked && (
                  <div className="mx-5 mb-4 flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                    <p className="text-gray-500 text-xs">
                      You receive per month:&nbsp;
                      <strong className="text-gray-700">
                        {expReceive != null ? `₹${fmtINR(expReceive)}` : "—"}
                      </strong>
                      <span className="text-gray-400"> (Experienced)</span>
                      &nbsp;|&nbsp;
                      <strong className="text-gray-700">
                        {freReceive != null ? `₹${fmtINR(freReceive)}` : "—"}
                      </strong>
                      <span className="text-gray-400"> (Freshers)</span>
                    </p>
                    <button onClick={() => setModalPlan(plan.key)}
                      className="text-blue-500 text-xs font-semibold hover:underline shrink-0 ml-3 cursor-pointer">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Footer (edit mode only) ── */}
        {!isLocked && (
          <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button onClick={handleCancel}
              className="border border-gray-300 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving || savingPricing}
              className={`text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer
                ${saving || savingPricing
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#1a1a2e] text-white hover:bg-[#16213e]"}`}>
              {saving || savingPricing ? "Saving…" : "Save Pricing"}
            </button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {modalPlan && (
        <DetailsModal
          plan={modalPlan}
          breakdowns={breakdowns}
          onClose={() => setModalPlan(null)}
        />
      )}

      {/* Coupon Modal */}
      {showCoupon && (
        <CouponModal
          onClose={() => setShowCoupon(false)}
          mentorId={mentorId}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-xl z-50 whitespace-nowrap
          ${toast.type === "success" ? "bg-[#1a1a2e]" : "bg-red-500"}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MyPricing;


