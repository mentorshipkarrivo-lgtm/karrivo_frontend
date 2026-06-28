import { useState, useEffect, useCallback } from "react";
import {
  useGetMyPricingQuery,
  useSaveOrUpdatePricingMutation,
  useGetCommissionTiersQuery,
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  useCreateCouponMutation,
} from "./Mentorpricingapislice";
import {
  Wallet, Tag, Edit2, Check, ChevronDown, X,
  AlertTriangle, Calendar, Clock, Info
} from "lucide-react";
import Loader from "../../../../global/Loader";

/* ══════════════════════════════════════════════════
   SHARED CLASS TOKENS (matches Myearnings)
══════════════════════════════════════════════════ */
const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-xs bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#0098cc]";

const buttonPrimary =
  "bg-[#1a1a2e] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition";

const buttonSecondary =
  "border border-gray-300 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-medium bg-white hover:border-[#0098cc] transition";

/* ══════════════════════════════════════════════════
   STATIC CONFIG
══════════════════════════════════════════════════ */
const SHARED_PRICE_OPTIONS = {
  experienced: [5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000],
  freshers: [2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000],
};

const PLANS = [
  { key: "one_month", label: "1 Month", months: 1 },
  { key: "three_months", label: "3 Months", months: 3 },
  { key: "six_months", label: "6 Months", months: 6 },
];

const EMPTY_SELECTIONS = {
  one_month: { experienced: "", freshers: "" },
  three_months: { experienced: "", freshers: "" },
  six_months: { experienced: "", freshers: "" },
};

const EMPTY_BREAKDOWNS = {
  one_month: { experienced: null, freshers: null },
  three_months: { experienced: null, freshers: null },
  six_months: { experienced: null, freshers: null },
};

const TIER_META = {
  "1_to_5": { label: "Starter", range: "1 – 5 subscribers", color: "text-[#0091c3] bg-[#e6f6fb] border-[#b3e4f5]" },
  "6_to_20": { label: "Growing", range: "6 – 20 subscribers", color: "text-purple-700 bg-purple-50 border-purple-200" },
  "21_plus": { label: "Established", range: "21+ subscribers", color: "text-green-700 bg-green-50 border-green-200" },
};

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const fmtINR = (v) =>
  v != null && v !== "" && !isNaN(v)
    ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v)
    : "—";

const fmtDate = (d) => {
  if (!d) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(d));
};

/* ══════════════════════════════════════════════════
   TOGGLE
══════════════════════════════════════════════════ */
const Toggle = ({ on, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!on)}
    className={`relative w-10 h-5 rounded-full border-none cursor-pointer transition-colors duration-200 flex-shrink-0 ${on ? "bg-[#1a1a2e]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${on ? "left-5" : "left-0.5"}`}
    />
  </button>
);

/* ══════════════════════════════════════════════════
   FIELD HELPER (matches PayoutDetailsPage > Field)
══════════════════════════════════════════════════ */
const Field = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-600">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-0.5">{error}</p>}
  </div>
);

/* ══════════════════════════════════════════════════
   TIER BANNER
══════════════════════════════════════════════════ */
const TierBanner = ({ tierDoc, subCount, isEditing }) => {
  if (!tierDoc || isEditing) return null;
  const meta = TIER_META[tierDoc.tier_name] || { label: tierDoc.tier_name, range: "", color: "text-gray-500 bg-gray-100 border-gray-200" };
  const rates = [
    { label: "For 1 month", pct: tierDoc.commission?.one_month },
    { label: "For 3 mmnths", pct: tierDoc.commission?.three_months },
    { label: "For 6 months", pct: tierDoc.commission?.six_months },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1a1a2e] inline-block" />
          <p className="text-xs font-semibold text-[#1a1a2e]">
            Commission tier :- {" "}
            <span className={`px-2 py-0.5 rounded-sm border text-[11px] font-semibold `}>
              {meta.label} · {meta.range}
            </span>
          </p>
        </div>
        <p className="text-[11px] text-gray-400">
          {subCount === 0 ? "No active subscribers yet" : `${subCount} active subscriber${subCount !== 1 ? "s" : ""}`}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] text-gray-400 font-medium">Platform fee:</p>
        {rates.map(({ label, pct }) => (
          <span key={label} className="text-[11px] border border-gray-200 rounded-sm px-2.5 py-0.5 text-gray-500">
            <b className="text-[#1a1a2e]">{pct}%</b> {label}
          </span>
        ))}
        <p className="text-[10px] text-gray-400 ml-auto">+ 9% CGST + 9% SGST</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   DETAILS MODAL (matches PayoutDetailsPage modal shell)
══════════════════════════════════════════════════ */
const DetailsModal = ({ plan, breakdowns, onClose }) => {
  if (!plan) return null;
  const [activeKey, setActiveKey] = useState(plan);
  const activePlan = PLANS.find((x) => x.key === activeKey);

  const bd = breakdowns[activeKey];
  const exp = bd?.experienced;
  const fre = bd?.freshers;
  const noData = !exp || !fre;

  const rows = [
    { label: `Mentee pays (${activePlan.months}month):`, expVal: exp?.totalPrice, freVal: fre?.totalPrice, negative: false },
    { label: `Platform fee (${exp?.platformPct ?? "—"}%):`, expVal: exp?.platformFee, freVal: fre?.platformFee, negative: true },
    { label: "CGST (9%):", expVal: exp?.cgst, freVal: fre?.cgst, negative: true },
    { label: "SGST (9%):", expVal: exp?.sgst, freVal: fre?.sgst, negative: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-xl w-full max-w-lg border border-gray-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-[#1a1a2e]">Payout breakdown</h2>
            <p className="text-[12px] text-[#1a1a2e]  mt-0.5">
              Earnings are calculated automatically based on your subscription plan.
            </p>          </div>
          <button onClick={onClose}>
            <X className="text-gray-500" size={18} />
          </button>
        </div>

        {/* Plan tabs */}
        <div className="px-6 pt-4">
          <div className="flex bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            {PLANS.map((pl) => (
              <button
                key={pl.key}
                onClick={() => setActiveKey(pl.key)}
                className={`flex-1 text-xs font-semibold py-2.5 transition ${activeKey === pl.key
                  ? "bg-[#1a1a2e] text-white"
                  : "bg-transparent text-gray-400 hover:text-gray-600"
                  }`}
              >
                {pl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="p-6 overflow-y-auto flex-1">
          {noData ? (
            <p className="text-xs text-gray-400 text-center py-10">No breakdown data for this plan.</p>
          ) : (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase w-[46%]" />
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-[#1a1a2e] ">Experienced</th>
                    <th className="text-center px-4 py-3 text-[11px] font-semibold text-gray-500 ">Freshers</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ label, expVal, freVal, negative }) => (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-xs  text-[#1a1a2e] ">{label}</td>
                      <td className={`px-4 py-3 text-xs text-center font-${negative ? "normal" : "semibold"} ${negative ? "text-red-500" : "text-[#1a1a2e]"}`}>
                        {negative ? "− " : ""}₹{fmtINR(expVal)}
                      </td>
                      <td className={`px-4 py-3 text-xs text-center font-${negative ? "normal" : "semibold"} ${negative ? "text-red-500" : "text-[#1a1a2e]"}`}>
                        {negative ? "− " : ""}₹{fmtINR(freVal)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-dashed border-gray-200">
                    <td className="px-4 py-3 text-[11px] text-[#1a1a2e] italic">Total deducted:</td>
                    <td className="px-4 py-3 text-[11px] text-[#1a1a2e]text-center">− ₹{fmtINR(exp.totalDeducted)}</td>
                    <td className="px-4 py-3 text-[11px] text-[#1a1a2e] text-center">− ₹{fmtINR(fre.totalDeducted)}</td>
                  </tr>
                  <tr className="border-t-2 border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 text-sm font-bold text-[#1a1a2e]">You receive:</td>
                    <td className="px-4 py-3 text-center">
                      <p className="text-sm font-bold text-green-600">₹{fmtINR(exp.mentorReceive)}</p>
                      {activePlan.months > 1 && (
                        <p className="text-[10px] text-[#1a1a2e] mt-0.5">₹{fmtINR(exp.perMonthReceive)}/ month </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <p className="text-sm font-bold text-green-600">₹{fmtINR(fre.mentorReceive)}</p>
                      {activePlan.months > 1 && (
                        <p className="text-[10px] text-[#1a1a2e] mt-0.5">₹{fmtINR(fre.perMonthReceive)}/ month</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-200">
          <button onClick={onClose} className={`${buttonPrimary} w-full justify-center`}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   COUPON MODAL (matches modal shell)
══════════════════════════════════════════════════ */
const CouponModal = ({ onClose, mentorId }) => {
  const [createCoupon, { isLoading: creating }] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();
  const { data: couponData, refetch } = useGetAllCouponsQuery();

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const [durations, setDurations] = useState({ one: false, three: false, six: false });
  const [startDate, setStartDate] = useState("");
  const [expiry, setExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [showList, setShowList] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  const getSelectedDuration = () => {
    const s = [];
    if (durations.one) s.push(1);
    if (durations.three) s.push(3);
    if (durations.six) s.push(6);
    return s;
  };

  const resetForm = () => {
    setCode(""); setDiscount(10); setStartDate("");
    setExpiry(false); setExpiryDate(""); setEditingId(null);
    setDurations({ one: false, three: false, six: false });
    setFormError("");
  };

  const handleSubmit = async () => {
    setFormError("");
    if (!code || !discount || !startDate || getSelectedDuration().length === 0)
      return setFormError("Please fill all required fields.");
    if (expiry && !expiryDate) return setFormError("Please set an expiry date.");
    const payload = {
      mentorId, couponCode: code, discountValue: Number(discount),
      appliesForDuration: getSelectedDuration(), startDate,
      expiryDate: expiry ? expiryDate : undefined,
    };
    try {
      if (editingId) {
        await updateCoupon({ couponId: editingId, ...payload }).unwrap();
      } else {
        await createCoupon(payload).unwrap();
      }
      resetForm();
      refetch();
    } catch (error) {
      setFormError(error?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setCode(coupon.couponCode);
    setDiscount(coupon.discountValue);
    setStartDate(coupon.startDate?.split("T")[0] || "");
    setExpiry(!!coupon.expiryDate);
    setExpiryDate(coupon.expiryDate?.split("T")[0] || "");
    setDurations({
      one: coupon.appliesForDuration?.includes(1) || false,
      three: coupon.appliesForDuration?.includes(3) || false,
      six: coupon.appliesForDuration?.includes(6) || false,
    });
    setFormError("");
    document.getElementById("coupon-form-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (couponId) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await deleteCoupon(couponId).unwrap();
      if (editingId === couponId) resetForm();
      refetch();
    } catch (error) {
      setFormError(error?.data?.message || "Delete failed.");
    }
  };

  const coupons = couponData?.data || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        id="coupon-form-top"
        className={`bg-white rounded-3xl shadow-xl border border-gray-200 flex max-h-[90vh] overflow-hidden transition-all duration-300 ${showList ? "w-full max-w-2xl" : "w-full max-w-sm"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Form panel */}
        <div className={`flex flex-col gap-4 overflow-y-auto p-6 ${showList ? "w-72 flex-shrink-0 border-r border-gray-100" : "w-full"}`}>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag size={15} className="text-[#1a1a2e]" />
              <h2 className="text-lg font-bold text-[#1a1a2e]">
                {editingId ? "Update coupon" : "Create coupon"}
              </h2>
            </div>
            <button onClick={onClose} className={buttonSecondary + " !px-2.5 !py-2"}>
              <X size={15} />
            </button>
          </div>

          {formError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
              {formError}
            </p>
          )}

          <Field label="Coupon code" required>
            <input
              type="text"
              placeholder="e.g. ROHAN30"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className={inputClass + " font-mono tracking-widest"}
            />
          </Field>

          <Field label="Discount (%)" required>
            <div className="relative">
              <input
                type="number" min={1} max={100} value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className={inputClass + " pr-8"}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">%</span>
            </div>
          </Field>

          <Field label="Applies for" required>
            <div className="flex gap-4">
              {[{ key: "one", label: "1 mo" }, { key: "three", label: "3 mo" }, { key: "six", label: "6 mo" }].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={durations[key]}
                    onChange={() => setDurations((p) => ({ ...p, [key]: !p[key] }))}
                    className="w-3.5 h-3.5 cursor-pointer accent-[#1a1a2e]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Start date" required>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </Field>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Set expiry date</span>
            <Toggle on={expiry} onChange={setExpiry} />
          </div>

          {expiry && (
            <input
              type="date"
              value={expiryDate}
              min={startDate || new Date().toISOString().slice(0, 10)}
              onChange={(e) => setExpiryDate(e.target.value)}
              className={inputClass}
            />
          )}
          <div className="flex gap-2">
            <button onClick={resetForm} className={`${buttonSecondary} flex-1 justify-center`}>Reset</button>
            <button
              onClick={handleSubmit}
              disabled={creating}
              className={`${buttonPrimary} flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {editingId ? "Update" : creating ? "Saving…" : "Create"}
            </button>
          </div>

          <button
            onClick={() => setShowList(!showList)}
            className={`${buttonSecondary} w-full justify-center flex items-center gap-2`}
          >
            <ChevronDown size={13} className={`transition-transform ${showList ? "rotate-180" : ""}`} />
            {showList ? "Hide coupons" : "View coupons"}
          </button>
        </div>

        {/* List panel */}
        {showList && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="text-sm font-bold text-[#1a1a2e]">Your coupons</span>
              {/* <span className="text-[11px] text-gray-400 border border-gray-200 rounded-full px-2.5 py-0.5">
                {coupons.length} / 3
              </span> */}
            </div>
            <div className="overflow-y-auto flex-1 p-4 flex flex-col gap-3">
              {coupons.length > 0 ? coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className={`border rounded-xl p-4 bg-white ${editingId === coupon._id ? "border-[#1a1a2e]" : "border-gray-200"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#1a1a2e] tracking-widest">{coupon.couponCode}</span>
                    <span className="text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                      {coupon.discountValue}% off
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                      <Calendar size={11} /> Applicable For {coupon.appliesForDuration?.join("and ")} month{coupon.appliesForDuration?.length > 1 ? "s" : ""}
                    </p>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                      <Clock size={11} /> {coupon.expiryDate ? `Expires on ${coupon.expiryDate.split("T")[0]}` : "No expiry"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(coupon)} className={`${buttonSecondary} flex-1 justify-center !text-[11px] !py-1.5`}>Edit</button>
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="flex-1 text-[11px] font-semibold text-red-600 bg-white border border-red-200 rounded-xl py-1.5 cursor-pointer hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <Tag size={22} className="text-gray-300" />
                  <p className="text-xs text-gray-400">No coupons yet</p>
                  <p className="text-[11px] text-gray-300">Create your first coupon above</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   PRICING EMPTY STATE
══════════════════════════════════════════════════ */
const PricingEmptyState = ({ onStart }) => (
  <div className="min-h-screen bg-white flex items-center justify-center p-6">
    <div className="max-w-sm w-full text-center">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-5">
        <Wallet size={22} className="text-[#1a1a2e]" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">Set your pricing</h2>
      <p className="text-xs text-gray-400 leading-relaxed mb-6">
        You haven't set your pricing yet. Configure monthly rates for 1, 3, and 6-month plans — for both experienced mentees and freshers.
      </p>
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {PLANS.map((pl) => (
          <div key={pl.key} className="border border-gray-200 rounded-xl p-3 text-center">
            <p className="text-xs font-bold text-[#1a1a2e] mb-0.5">{pl.label}</p>
            <p className="text-[10px] text-gray-400">LTM Plan</p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 mb-5">Freshers pricing must always be lower than experienced pricing</p>
      <button onClick={onStart} className={`${buttonPrimary} w-full justify-center`}>
        Set up pricing
      </button>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   PRICE SELECTOR
══════════════════════════════════════════════════ */
const PriceSelector = ({ tier, value, onChange, disabled }) => {
  const options = SHARED_PRICE_OPTIONS[tier];
  const isExperienced = tier === "experienced";

  return (
    <div className="flex-1 p-4">
      <div className="mb-2">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${isExperienced
          ? "text-[#1a1a2e]  border-pink-200"
          : "text-[#1a1a2e]   border-purple-200"
          }`}>
          {isExperienced ? "Experienced" : "Freshers"}
        </span>
      </div>
      <div className={`flex items-center border rounded-xl px-3 h-10 ${disabled ? "bg-gray-50 border-gray-100" : "bg-white border-gray-300"}`}>
        <span className="text-xs text-gray-400 mr-1">₹</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`flex-1 border-none outline-none text-xs font-semibold bg-transparent ${disabled ? "text-gray-400 cursor-not-allowed" : "text-[#1a1a2e] cursor-pointer"} appearance-none`}
        >
          <option value="" disabled>Select price /month</option>
          {options.map((p) => (
            <option key={p} value={p}>{new Intl.NumberFormat("en-IN").format(p)}/month</option>
          ))}
        </select>
        {!disabled && <ChevronDown size={13} className="text-gray-400 flex-shrink-0" />}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   PLAN CARD  (matches session/subscription table cards)
══════════════════════════════════════════════════ */
const PlanCard = ({ plan, selections, breakdowns, isLocked, onChange, onViewDetails }) => {
  const expSelected = Number(selections.experienced) || 0;
  const freSelected = Number(selections.freshers) || 0;
  const hasValues = expSelected > 0 && freSelected > 0;
  const fresWarn = hasValues && freSelected >= expSelected;

  const bdExp = breakdowns[plan.key]?.experienced;
  const bdFre = breakdowns[plan.key]?.freshers;
  const expReceive = bdExp?.perMonthReceive ?? null;
  const freReceive = bdFre?.perMonthReceive ?? null;

  return (
    <div className={`bg-white border rounded-2xl shadow-sm overflow-hidden ${fresWarn ? "border-yellow-300" : "border-gray-200"}`}>
      {/* Card header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
        <span className="text-sm font-bold text-[#1a1a2e]">{plan.label}</span>
        <span className="text-[11px] text-gray-400">LTM Plan</span>
        {hasValues && isLocked && !fresWarn && (
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
            Active
          </span>
        )}
      </div>

      {/* Selectors */}
      <div className="flex">
        <div className="flex-1 border-r border-gray-100">
          <PriceSelector
            tier="experienced"
            value={selections.experienced}
            onChange={(val) => onChange(plan.key, "experienced", val)}
            disabled={isLocked}
          />
        </div>
        <div className="flex-1">
          <PriceSelector
            tier="freshers"
            value={selections.freshers}
            onChange={(val) => onChange(plan.key, "freshers", val)}
            disabled={isLocked}
          />
        </div>
      </div>

      {/* Freshers warning */}
      {fresWarn && (
        <div className="mx-4 mb-3 flex items-center gap-2 text-xs text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2.5">
          <AlertTriangle size={13} />
          Freshers price must be less than the Experienced price
        </div>
      )}

      {/* Earnings row */}
      {hasValues && isLocked && !fresWarn && (
        <div className="mx-4 mb-4 flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-500">
            You receive / month :{" "}
            <b className="text-[#1a1a2e]">For Experienced {expReceive != null ? `₹${fmtINR(expReceive)}` : ""}</b>
            <span className="text-[#1a1a2e] mx-2">/</span>
            <b className="text-[#1a1a2e]">For Freshers{freReceive != null ? `₹${fmtINR(freReceive)}` : ""}</b>
          </p>
          <button
            onClick={() => onViewDetails(plan.key)}
            className="flex items-center gap-1 text-xs font-semibold text-[#0098cc] hover:underline"
          >
            View  Details
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
const MyPricing = () => {
  const [selections, setSelections] = useState(EMPTY_SELECTIONS);
  const [breakdowns, setBreakdowns] = useState(EMPTY_BREAKDOWNS);
  const [subCount, setSubCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [savedTierName, setSavedTierName] = useState(null);

  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data: pricingData, isLoading: pricingLoading, error: pricingError, refetch: refetchPricing } =
    useGetMyPricingQuery(mentorId, { skip: !mentorId });
  const { data: tiersData, isLoading: tiersLoading, error: tiersError } =
    useGetCommissionTiersQuery();
  const [saveOrUpdatePricing, { isLoading: savingPricing }] = useSaveOrUpdatePricingMutation();

  const currentTierDoc = tiersData?.data?.find((t) => t.tier_name === savedTierName) ?? null;

  useEffect(() => {
    if (!pricingData) return;
    const doc = pricingData?.plans;
    const planDoc = doc?.plans;
    const hasPricing =
      planDoc?.one_month?.monthlyPrice?.experienced &&
      planDoc?.one_month?.monthlyPrice?.freshers &&
      planDoc?.three_months?.monthlyPrice?.experienced &&
      planDoc?.three_months?.monthlyPrice?.freshers &&
      planDoc?.six_months?.monthlyPrice?.experienced &&
      planDoc?.six_months?.monthlyPrice?.freshers;

    if (hasPricing) {
      setSelections({
        one_month: { experienced: planDoc.one_month.monthlyPrice.experienced, freshers: planDoc.one_month.monthlyPrice.freshers },
        three_months: { experienced: planDoc.three_months.monthlyPrice.experienced, freshers: planDoc.three_months.monthlyPrice.freshers },
        six_months: { experienced: planDoc.six_months.monthlyPrice.experienced, freshers: planDoc.six_months.monthlyPrice.freshers },
      });
      setBreakdowns({
        one_month: planDoc.one_month.breakdown ?? { experienced: null, freshers: null },
        three_months: planDoc.three_months.breakdown ?? { experienced: null, freshers: null },
        six_months: planDoc.six_months.breakdown ?? { experienced: null, freshers: null },
      });
      setSubCount(doc?.subscriberCountAtSave ?? 0);
      setSavedTierName(doc?.settingsName ?? null);
      setSaved(true);
      setIsEditingNew(false);
      setLastUpdated(doc?.updatedAtDate ?? doc?.updatedAt ?? null);
    } else {
      setSelections(EMPTY_SELECTIONS);
      setBreakdowns(EMPTY_BREAKDOWNS);
      setSubCount(0);
      setSavedTierName(null);
      setSaved(false);
      setIsEditingNew(false);
      setLastUpdated(null);
    }
  }, [pricingData]);

  const showToast = useCallback((type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleDropdown = (planKey, tier, val) => {
    if (saved && !isEditingNew) return;
    setSelections((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: Number(val) } }));
  };

  const handleSave = async () => {
    for (const plan of PLANS) {
      const exp = Number(selections[plan.key].experienced) || 0;
      const fre = Number(selections[plan.key].freshers) || 0;
      if (!exp || !fre) return showToast("error", `Set both prices for ${plan.label}`);
      if (fre >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
    }
    try {
      const result = await saveOrUpdatePricing({
        mentorId,
        plans: {
          one_month: { experienced: Number(selections.one_month.experienced), freshers: Number(selections.one_month.freshers) },
          three_months: { experienced: Number(selections.three_months.experienced), freshers: Number(selections.three_months.freshers) },
          six_months: { experienced: Number(selections.six_months.experienced), freshers: Number(selections.six_months.freshers) },
        },
      }).unwrap();

      const savedDoc = result?.plans;
      const savedPlan = savedDoc?.plans;
      if (savedPlan) {
        setBreakdowns({
          one_month: savedPlan.one_month?.breakdown ?? { experienced: null, freshers: null },
          three_months: savedPlan.three_months?.breakdown ?? { experienced: null, freshers: null },
          six_months: savedPlan.six_months?.breakdown ?? { experienced: null, freshers: null },
        });
        setSubCount(savedDoc?.subscriberCountAtSave ?? 0);
        setSavedTierName(savedDoc?.settingsName ?? null);
      }
      if (savedDoc?.updatedAtDate || savedDoc?.updatedAt) {
        setLastUpdated(savedDoc.updatedAtDate ?? savedDoc.updatedAt);
      }
      setSaved(true);
      setIsEditingNew(false);
      showToast("success", "Pricing saved successfully!");
      refetchPricing();
    } catch (error) {
      showToast("error", error?.data?.message || "Failed to save. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditingNew(false);
    const planDoc = pricingData?.plans?.plans;
    if (planDoc?.one_month?.monthlyPrice?.experienced) {
      setSelections({
        one_month: { experienced: planDoc.one_month.monthlyPrice.experienced, freshers: planDoc.one_month.monthlyPrice.freshers },
        three_months: { experienced: planDoc.three_months.monthlyPrice.experienced, freshers: planDoc.three_months.monthlyPrice.freshers },
        six_months: { experienced: planDoc.six_months.monthlyPrice.experienced, freshers: planDoc.six_months.monthlyPrice.freshers },
      });
      setSaved(true);
    } else {
      setSelections(EMPTY_SELECTIONS);
      setSaved(false);
    }
  };

  /* ── Loading ── */
  if (pricingLoading || tiersLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><Loader /></div>;
  }

  /* ── Error ── */
  const realPricingError = pricingError?.status !== 400 ? pricingError : null;
  if (realPricingError || tiersError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="border border-gray-200 rounded-2xl p-10 max-w-sm text-center">
          <AlertTriangle size={36} strokeWidth={1.5} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-bold text-[#1a1a2e] mb-2">Failed to load pricing</p>
          <p className="text-xs text-gray-400 mb-5">
            {realPricingError?.data?.message || tiersError?.data?.message || "Please try again"}
          </p>
          <button onClick={() => refetchPricing()} className={buttonPrimary}>Retry</button>
        </div>
      </div>
    );
  }

  /* ── Empty state ── */
  if (!isEditingNew && !saved && (!selections.one_month.experienced || !selections.three_months.experienced || !selections.six_months.experienced)) {
    return <PricingEmptyState onStart={() => setIsEditingNew(true)} />;
  }

  const isLocked = saved && !isEditingNew;

  return (
    <>
      <style>{`*::-webkit-scrollbar{display:none}*{scrollbar-width:none}`}</style>

      {/* Modals */}
      {modalPlan && <DetailsModal plan={modalPlan} breakdowns={breakdowns} onClose={() => setModalPlan(null)} />}
      {showCoupon && <CouponModal onClose={() => setShowCoupon(false)} mentorId={mentorId} />}

      <div className="min-h-screen bg-white p-5 text-gray-700">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── Header (matches Myearnings header pattern) ── */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
                <Wallet size={22} className="text-[#0098cc]" strokeWidth={2} />
                Pricing
              </h1>
              {lastUpdated && isLocked && (
                <p className="text-gray-500 mt-2 text-xs">Last updated: {fmtDate(lastUpdated)}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setShowCoupon(true)} className={buttonSecondary}>
                <span className="flex items-center gap-2">
                  <Tag size={15} />
                  Coupons
                </span>
              </button>
              {isLocked ? (
                <button onClick={() => setIsEditingNew(true)} className={buttonSecondary}>
                  <span className="flex items-center gap-2">
                    <Edit2 size={15} />
                    Edit
                  </span>
                </button>
              ) : (
                <>
                  {saved && (
                    <button onClick={handleCancel} className={buttonSecondary}>Cancel</button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={savingPricing}
                    className={`${buttonPrimary} flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    <Check size={15} />
                    {savingPricing ? "Saving…" : "Save"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── Tier banner ── */}
          <TierBanner tierDoc={currentTierDoc} subCount={subCount} isEditing={!isLocked} />

          {/* ── Edit notice ── */}
          {!isLocked && (
            <div className="flex items-center gap-2 text-xs text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <Info size={13} className="flex-shrink-0" />
              Editing — changes won't apply until you save. All fee calculations are confirmed at save time.
            </div>
          )}

          {/* ── Plan cards ── */}
          <div>
            <h2 className="text-sm font-bold mb-4 text-[#1a1a2e]">Subscription Plans</h2>
            <div className="flex flex-col gap-3">
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.key}
                  plan={plan}
                  selections={selections[plan.key]}
                  breakdowns={breakdowns}
                  isLocked={isLocked}
                  onChange={handleDropdown}
                  onViewDetails={setModalPlan}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Toast (matches Myearnings bottom toast pattern) ── */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg z-50 text-xs font-semibold text-white whitespace-nowrap ${toast.type === "success" ? "bg-[#1a1a2e]" : "bg-red-600"}`}>
          {toast.type === "success" ? <Check size={13} /> : <X size={13} />}
          {toast.msg}
        </div>
      )}
    </>
  );
};

export default MyPricing;