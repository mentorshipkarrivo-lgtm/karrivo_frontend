// components/MyPricing.jsx

import { useState, useEffect } from "react";
import {
  useGetMyPricingQuery,
  useSaveOrUpdatePricingMutation,
} from "./Mentorpricingapislice";

const PRICE_OPTIONS = [
  1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500,
  10000, 11000, 12000, 13000, 14000, 15000,
];

const MENTOR_RECEIVE_RATE = 0.505;
const PLATFORM_FEE_RATE = 0.495;
const GST_RATE = 0.18;

const PLANS = [
  { key: "one_month", label: "1 Month LTM", months: 1 },
  { key: "three_months", label: "3 Months LTM", months: 3 },
  { key: "six_months", label: "6 Months LTM", months: 6 },
];

const EMPTY_PLANS = {
  one_month: { experienced: "", freshers: "" },
  three_months: { experienced: "", freshers: "" },
  six_months: { experienced: "", freshers: "" },
};

const formatINR = (val) =>
  val ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(val) : "0";

const monthlyReceive = (price, months) =>
  price ? Math.round((Number(price) * MENTOR_RECEIVE_RATE) / months) : 0;

// ── Plan Breakdown Modal ───────────────────────────────────────────────────────
const PlanModal = ({ plan, prices, onClose }) => {
  const totalMonths = plan.months;

  const breakdown = ["experienced", "freshers"].map((tier) => {
    const totalPrice = Number(prices[tier]) || 0;
    const perMonth = totalPrice / totalMonths;
    const platformFee = Math.round(totalPrice * PLATFORM_FEE_RATE);
    const gstOnFee = Math.round(platformFee * GST_RATE);
    const mentorReceive = Math.round(totalPrice * MENTOR_RECEIVE_RATE);
    const perMonthGet = Math.round(mentorReceive / totalMonths);

    return { tier, totalPrice, perMonth, platformFee, gstOnFee, mentorReceive, perMonthGet };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#040f09] border border-[#0c2418] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#0c2418]">
          <div>
            <h2 className="text-white text-base font-bold">{plan.label}</h2>
            <p className="text-[#4a7a5a] text-xs mt-0.5">Pricing breakdown per tier</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0c2418] hover:bg-[#153a25] text-[#7a9e8a] hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tier breakdowns */}
        <div className="p-5 flex flex-col gap-4">
          {breakdown.map(({ tier, totalPrice, perMonth, platformFee, gstOnFee, mentorReceive, perMonthGet }) => (
            <div key={tier} className="bg-[#020c06] border border-[#0c2418] rounded-xl overflow-hidden">
              {/* Tier label */}
              <div className="px-4 py-2.5 border-b border-[#0c2418] bg-[#040f09]">
                <span className="text-[#0098cc] text-xs font-bold uppercase tracking-widest">
                  {tier === "experienced" ? "Experienced" : "Freshers"}
                </span>
              </div>

              {/* Rows */}
              <div className="px-4 py-3 flex flex-col gap-2.5">
                <Row label="Mentee pays (total)" value={`₹${formatINR(totalPrice)}`} />
                <Row label={`Per month (÷${totalMonths})`} value={`₹${formatINR(Math.round(perMonth))}`} subtle />
                <Divider />
                <Row label="Platform fee (49.5%)" value={`- ₹${formatINR(platformFee)}`} negative />
                <Row label="GST on platform fee (18%)" value={`- ₹${formatINR(gstOnFee)}`} negative subtle />
                <Divider />
                <Row
                  label="You receive (total)"
                  value={`₹${formatINR(mentorReceive)}`}
                  highlight
                />
                <Row
                  label="You receive / month"
                  value={`₹${formatINR(perMonthGet)}`}
                  highlight
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full bg-[#0098cc] hover:bg-[#007aaa] text-white text-sm font-bold py-2.5 rounded-xl transition-colors duration-150 cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, negative, highlight, subtle }) => (
  <div className="flex items-center justify-between gap-2">
    <span className={`text-xs ${subtle ? "text-[#3a6a4a]" : "text-[#7a9e8a]"}`}>{label}</span>
    <span className={`text-xs font-semibold shrink-0 ${highlight ? "text-[#0098cc] text-sm font-bold" :
      negative ? "text-red-400" :
        subtle ? "text-[#4a7a5a]" :
          "text-white"
      }`}>
      {value}
    </span>
  </div>
);

const Divider = () => (
  <div className="border-t border-[#0c2418]" />
);

// ── Price Field ────────────────────────────────────────────────────────────────
const PriceField = ({ label, value, onChange, disabled }) => {
  const [mode, setMode] = useState("dropdown");
  const [customVal, setCustomVal] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (value && !PRICE_OPTIONS.includes(Number(value))) {
      setMode("custom");
      setCustomVal(String(value));
    }
  }, [value]);

  const handleCustomChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomVal(raw);
    setError("");
    const num = Number(raw);
    if (raw && num < 500) setError("Minimum ₹500");
    else if (raw && num > 200000) setError("Maximum ₹2,00,000");
    else if (raw) onChange(num);
  };

  const handleCustomBlur = () => {
    if (!customVal || Number(customVal) < 500)
      setError("Enter valid amount (min ₹500)");
  };

  const switchToCustom = () => {
    setMode("custom");
    setCustomVal(value ? String(value) : "");
    setError("");
  };

  const switchToDropdown = () => {
    setMode("dropdown");
    setCustomVal("");
    setError("");
    if (!value) onChange(PRICE_OPTIONS[0]);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between w-full">
        <span className="text-[#7a9e8a] text-xs font-medium">{label}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={switchToDropdown}
            className={`text-[10px] px-2.5 py-1 rounded-md border font-semibold transition-colors duration-150 ${mode === "dropdown"
              ? "bg-[#0098cc] border-[#0098cc] text-white"
              : "bg-transparent border-[#153a25] text-[#4a7a5a] hover:border-[#0098cc] hover:text-[#0098cc]"
              }`}>
            Select
          </button>
          <button type="button" onClick={switchToCustom}
            className={`text-[10px] px-2.5 py-1 rounded-md border font-semibold transition-colors duration-150 ${mode === "custom"
              ? "bg-[#0098cc] border-[#0098cc] text-white"
              : "bg-transparent border-[#153a25] text-[#4a7a5a] hover:border-[#0098cc] hover:text-[#0098cc]"
              }`}>
            Custom
          </button>
        </div>
      </div>

      {mode === "dropdown" ? (
        <div className="flex items-center w-full h-11 bg-[#020c06] border border-[#153a25] rounded-lg px-3 gap-1">
          <span className="text-[#0098cc] text-sm font-bold shrink-0">₹</span>
          <select
            value={value || PRICE_OPTIONS[0]}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium cursor-pointer appearance-none"
          >
            {PRICE_OPTIONS.map((p) => (
              <option key={p} value={p} className="bg-[#030f0a] text-white">
                {formatINR(p)}/month
              </option>
            ))}
          </select>
          <span className="text-[#4a7a5a] text-xs shrink-0 pointer-events-none">▾</span>
        </div>
      ) : (
        <div className={`flex items-center w-full h-11 bg-[#020c06] border rounded-lg px-3 gap-1 transition-colors duration-150 ${error ? "border-red-500" : "border-[#0098cc]"
          }`}>
          <span className="text-[#0098cc] text-sm font-bold shrink-0">₹</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter amount"
            value={customVal}
            onChange={handleCustomChange}
            onBlur={handleCustomBlur}
            disabled={disabled}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-sm font-medium placeholder-[#2a4a33]"
          />
          <span className="text-[#4a7a5a] text-[11px] shrink-0">/mo</span>
        </div>
      )}
      {error && <p className="text-red-400 text-[10px] leading-tight">{error}</p>}
    </div>
  );
};

// ── Plan Card ──────────────────────────────────────────────────────────────────
const PlanCard = ({ plan, prices, onChange, saving, onViewDetails }) => {
  const expMonthly = monthlyReceive(prices.experienced, plan.months);
  const freshMonthly = monthlyReceive(prices.freshers, plan.months);
  const hasData = prices.experienced || prices.freshers;

  return (
    <div className="w-full bg-[#040f09] border border-[#0c2418] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#0c2418]">
        <span className="text-white text-sm font-bold">{plan.label}</span>
        {hasData && (
          <span className="flex items-center gap-1.5 text-[11px] text-[#4a9e6a] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a9e6a] shrink-0" />
            Active
          </span>
        )}
      </div>

      {/* Fields */}
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <div className="flex-1 min-w-0">
          <PriceField
            label="For Experienced"
            value={prices.experienced}
            onChange={(val) => onChange(plan.key, "experienced", val)}
            disabled={saving}
          />
        </div>
        <div className="flex-1 min-w-0">
          <PriceField
            label="For Freshers"
            value={prices.freshers}
            onChange={(val) => onChange(plan.key, "freshers", val)}
            disabled={saving}
          />
        </div>
      </div>

      {/* Earnings strip */}
      {hasData && Number(prices.freshers) >= Number(prices.experienced) && (
        <div className="mx-5 mb-3 flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
          <svg className="w-3.5 h-3.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span className="text-red-400 text-xs font-medium">Freshers price must be less than Experienced price</span>
        </div>
      )}

      {hasData && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mx-5 mb-5 px-4 py-3 bg-[#020c06] border border-[#0c2418] rounded-xl">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#3a6a4a] uppercase tracking-widest font-semibold">
              You receive / month
            </span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
              <span className="text-xs text-[#7a9e8a]">
                Experienced:&nbsp;
                <strong className="text-[#0098cc] text-sm font-bold">₹{formatINR(expMonthly)}</strong>
              </span>
              <span className="hidden sm:inline text-[#0c2418]">|</span>
              <span className="text-xs text-[#7a9e8a]">
                Freshers:&nbsp;
                <strong className="text-[#0098cc] text-sm font-bold">₹{formatINR(freshMonthly)}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={() => onViewDetails(plan)}
            className="self-start sm:self-auto text-[#0098cc] text-xs font-semibold px-3 py-1.5 bg-[#0098cc]/10 hover:bg-[#0098cc]/20 border border-[#0098cc]/20 rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer shrink-0"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
const MyPricing = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id || null;

  const [plans, setPlans] = useState(EMPTY_PLANS);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null); // { plan, prices }

  const { data, isLoading, isError } = useGetMyPricingQuery(mentorId, { skip: !mentorId });
  const [saveOrUpdate, { isLoading: saving }] = useSaveOrUpdatePricingMutation();

  useEffect(() => {
    if (data?.plans) setPlans(data.plans);
  }, [data]);

  const handleChange = (planKey, tier, value) => {
    setPlans((prev) => ({
      ...prev,
      [planKey]: { ...prev[planKey], [tier]: value },
    }));
  };

  const handleSave = async () => {
    if (!mentorId) return showToast("error", "Session expired. Please log in again.");

    // Validate: experienced must be greater than freshers for every plan
    for (const plan of PLANS) {
      const exp = Number(plans[plan.key].experienced) || 0;
      const fres = Number(plans[plan.key].freshers) || 0;

      if (!exp || !fres) {
        return showToast("error", `Please fill both prices for ${plan.label}`);
      }
      if (fres >= exp) {
        return showToast("error", `${plan.label}: Freshers price must be less than Experienced price`);
      }
    }

    try {
      // Coerce all price values to numbers before sending
      const sanitizedPlans = Object.fromEntries(
        Object.entries(plans).map(([key, val]) => [
          key,
          {
            experienced: Number(val.experienced) || 0,
            freshers: Number(val.freshers) || 0,
          },
        ])
      );
      await saveOrUpdate({ mentorId, plans: sanitizedPlans }).unwrap();
      showToast("success", "Pricing saved successfully!");
    } catch {
      showToast("error", "Failed to save pricing. Please try again.");
    }
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleViewDetails = (plan) => {
    setModalPlan({ plan, prices: plans[plan.key] });
  };

  if (!mentorId) {
    return (
      <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-400 text-sm font-medium">Session expired.</p>
          <p className="text-[#4a7a5a] text-xs mt-1">Please log in again to manage pricing.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030f0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-[3px] border-[#0c2418] border-t-[#0098cc] rounded-full animate-spin" />
          <p className="text-[#4a7a5a] text-xs">Loading your pricing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030f0a]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-white text-xl font-bold">My Pricing</h1>
            <p className="text-[#4a7a5a] text-sm mt-1">{userData.name}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center justify-center gap-2 bg-[#0098cc] text-white text-sm font-bold px-6 py-2.5 rounded-xl w-full sm:w-auto transition-all duration-200 ${saving ? "opacity-60 cursor-not-allowed" : "hover:bg-[#007aaa] active:scale-95 cursor-pointer"
              }`}
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Info banner */}
        {isError && (
          <div className="flex items-start gap-3 bg-[#0098cc]/5 border border-[#0098cc]/15 rounded-xl px-4 py-3 mb-6">
            <svg className="w-4 h-4 text-[#0098cc] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
            <p className="text-[#7a9e8a] text-xs leading-relaxed">
              No pricing set yet. Fill in the fields and click{" "}
              <strong className="text-white font-semibold">Save Changes</strong> to publish.
            </p>
          </div>
        )}

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              prices={plans[plan.key]}
              onChange={handleChange}
              saving={saving}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-[#2a4a33]">
          Platform fee: 49.5% · Amounts shown are your estimated monthly earnings
        </p>
      </div>

      {/* Modal */}
      {modalPlan && (
        <PlanModal
          plan={modalPlan.plan}
          prices={modalPlan.prices}
          onClose={() => setModalPlan(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl z-50 whitespace-nowrap ${toast.type === "success" ? "bg-[#0098cc]" : "bg-red-600"
          }`}>
          {toast.type === "success" ? (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MyPricing;