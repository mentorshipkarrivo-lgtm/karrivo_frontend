

import { useState, useEffect, useCallback } from "react";
import {
  useGetMyPricingQuery,
  useSaveOrUpdatePricingMutation,
  useGetSubscribersByMentorQuery,
  useGetCommissionTiersQuery,
} from "./Mentorpricingapislice";

const PRICE_OPTIONS = [
  2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000,
  27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000,
];

const TIER_LABELS = {
  "1_to_5": "1–5 subscribers",
  "6_to_20": "6–20 subscribers",
  "21_plus": "21+ subscribers",
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

const fmtINR = (v) =>
  v != null && v !== ""
    ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v)
    : "—";

const resolveTier = (count, tiers) => {
  if (!tiers?.length) return null;
  const n = Number(count) || 0;
  const name = n <= 5 ? "1_to_5" : n <= 20 ? "6_to_20" : "21_plus";
  return tiers.find((t) => t.tier_name === name) || null;
};

// SVG icons
const Icon = {
  Check: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Close: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Users: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Warn: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  Info: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
    </svg>
  ),
  Chevron: () => (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  ),
};

const MyPricing = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id || null;

  const [plans, setPlans] = useState(EMPTY_PLANS);
  const [fullPlansData, setFullPlansData] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null);
  const [saved, setSaved] = useState(false);
  // per-field mode: { one_month_experienced: 'dropdown', ... }
  const [modes, setModes] = useState({});
  const [customVals, setCustomVals] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const { data, isLoading, isError } = useGetMyPricingQuery(mentorId, { skip: !mentorId });
  const [saveOrUpdate, { isLoading: saving }] = useSaveOrUpdatePricingMutation();
  const { data: subscribersData } = useGetSubscribersByMentorQuery(mentorId, { skip: !mentorId });
  const { data: tiersData, isLoading: tiersLoading } = useGetCommissionTiersQuery();

  const subscriberCount = subscribersData?.data?.length ?? subscribersData?.count ?? 0;
  const tiers = tiersData?.data || [];
  const activeTier = resolveTier(subscriberCount, tiers);

  useEffect(() => {
    if (data?.plans?.plans) {
      const bp = data.plans.plans;
      setFullPlansData(bp);
      setPlans({
        one_month: { experienced: bp.one_month?.experienced ?? "", freshers: bp.one_month?.freshers ?? "" },
        three_months: { experienced: bp.three_months?.experienced ?? "", freshers: bp.three_months?.freshers ?? "" },
        six_months: { experienced: bp.six_months?.experienced ?? "", freshers: bp.six_months?.freshers ?? "" },
      });
      setSaved(true);
    }
  }, [data]);

  const showToast = useCallback((type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const getMode = (planKey, tier) => modes[`${planKey}_${tier}`] || "dropdown";
  const setMode = (planKey, tier, m) => setModes((prev) => ({ ...prev, [`${planKey}_${tier}`]: m }));
  const getCustomVal = (planKey, tier) => customVals[`${planKey}_${tier}`] || "";
  const setCustomVal = (planKey, tier, v) => setCustomVals((prev) => ({ ...prev, [`${planKey}_${tier}`]: v }));
  const getError = (planKey, tier) => fieldErrors[`${planKey}_${tier}`] || "";
  const setError = (planKey, tier, e) => setFieldErrors((prev) => ({ ...prev, [`${planKey}_${tier}`]: e }));

  const handleDropdown = (planKey, tier, val) => {
    if (saved) return;
    setPlans((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: Number(val) } }));
  };

  const handleCustomChange = (planKey, tier, raw) => {
    if (saved) return;
    const clean = raw.replace(/[^0-9]/g, "");
    setCustomVal(planKey, tier, clean);
    setError(planKey, tier, "");
    const num = Number(clean);
    if (clean && num < 500) setError(planKey, tier, "Minimum ₹500");
    else if (clean && num > 200000) setError(planKey, tier, "Maximum ₹2,00,000");
    else if (clean) setPlans((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: num } }));
  };

  const handleCustomBlur = (planKey, tier) => {
    if (saved) return;
    const v = getCustomVal(planKey, tier);
    if (!v || Number(v) < 500) setError(planKey, tier, "Enter valid amount (min ₹500)");
  };

  const switchFieldMode = (planKey, tier, newMode) => {
    if (saved) return;
    setMode(planKey, tier, newMode);
    setError(planKey, tier, "");
    if (newMode === "dropdown") {
      setCustomVal(planKey, tier, "");
      const cur = plans[planKey][tier];
      if (!PRICE_OPTIONS.includes(Number(cur))) {
        setPlans((prev) => ({ ...prev, [planKey]: { ...prev[planKey], [tier]: "" } }));
      }
    } else {
      const cur = plans[planKey][tier];
      setCustomVal(planKey, tier, cur ? String(cur) : "");
    }
  };

  const handleSave = async () => {
    if (!mentorId) return showToast("error", "Session expired. Please log in again.");
    for (const plan of PLANS) {
      const exp = Number(plans[plan.key].experienced) || 0;
      const fres = Number(plans[plan.key].freshers) || 0;
      if (!exp || !fres) return showToast("error", `Fill both prices for ${plan.label}`);
      if (fres >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
    }
    try {
      const sanitized = Object.fromEntries(
        Object.entries(plans).map(([k, v]) => [k, { experienced: Number(v.experienced) || 0, freshers: Number(v.freshers) || 0 }])
      );
      const result = await saveOrUpdate({ mentorId, plans: sanitized }).unwrap();
      if (result?.plans?.plans) setFullPlansData(result.plans.plans);
      setSaved(true);
      showToast("success", "Pricing saved successfully!");
    } catch {
      showToast("error", "Failed to save. Please try again.");
    }
  };

  // Guard states
  if (!mentorId) return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-red-500 text-xs font-semibold">Session expired.</p>
        <p className="text-gray-400 text-[11px] mt-1">Please log in again to manage pricing.</p>
      </div>
    </div>
  );

  if (isLoading) return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#0098cc] rounded-full animate-spin" />
        <p className="text-gray-400 text-[11px]">Loading your pricing...</p>
      </div>
    </div>
  );

  // Modal content
  const renderModal = () => {
    if (!modalPlan) return null;
    const plan = PLANS.find((p) => p.key === modalPlan);
    const bd = fullPlansData?.[modalPlan];
    const exp = bd?.breakdown?.experienced;
    const fre = bd?.breakdown?.freshers;
    const hasBreakdown = exp && exp.totalPrice > 0;
    const platformPct = exp?.platformPct ?? 0;
    const tierName = data?.plans?.commissionTierName || activeTier?.tier_name;

    return (
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm "
        onClick={() => setModalPlan(null)}
      >
        <div
          className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl border border-gray-200 shadow-xl flex flex-col overflow-hidden"
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-start justify-between  border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-gray-900 text-sm font-semibold">{plan.label}</h2>
                <span className="text-[9px] bg-[#0098cc]/10 text-[#0098cc] font-semibold px-2 py-0.5 rounded-full">
                  {plan.sublabel}
                </span>
              </div>
              {tierName && (
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                    {TIER_LABELS[tierName] || tierName}
                  </span>
                  <span className="text-[9px] text-gray-400">Platform {platformPct}%</span>
                  <span className="text-[9px] text-gray-300">·</span>
                  <span className="text-[9px] text-[#0098cc] font-semibold">You keep ~{100 - platformPct}%</span>
                  <span className="text-[9px] text-gray-300">·</span>
                  <span className="text-[9px] text-gray-400">
                    {data?.plans?.subscriberCountAtSave ?? subscriberCount} subscriber{(data?.plans?.subscriberCountAtSave ?? subscriberCount) !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setModalPlan(null)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
            >
              <Icon.Close />
            </button>
          </div>

          {/* Modal body */}
          <div className="overflow-y-auto flex-1 p-5">
            {!hasBreakdown ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <Icon.Info />
                </div>
                <p className="text-gray-400 text-xs text-center max-w-xs">
                  Save your pricing to generate a full earnings breakdown.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[{ label: "Experienced", data: exp }, { label: "Freshers", data: fre }].map(({ label, data: d }) => (
                  <div key={label} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-white border-b border-gray-100">
                      <span className="text-[#0098cc] text-[8px] font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <p className="text-gray-400 text-[8px] uppercase tracking-widest font-semibold mb-1">Mentee Pays</p>
                        <p className="text-gray-900 text-base font-bold leading-none">₹{fmtINR(d.totalPrice)}</p>
                        {plan.months > 1 && (
                          <p className="text-gray-400 text-[9px] mt-0.5">₹{fmtINR(Math.round(d.totalPrice / plan.months))}/session</p>
                        )}
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div className="flex flex-col gap-1.5">
                        <p className="text-gray-400 text-[8px] uppercase tracking-widest font-semibold">Deductions</p>
                        {[
                          { label: `Platform (${d.platformPct}%)`, val: d.platformFee },
                          { label: "CGST (9%)", val: d.cgst },
                          { label: "SGST (9%)", val: d.sgst },
                        ].map(({ label: dl, val }) => (
                          <div key={dl} className="flex justify-between items-center">
                            <span className="text-gray-400 text-[9px]">{dl}</span>
                            <span className="text-red-400 text-[9px] font-semibold">-₹{fmtINR(val)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-1.5 border-t border-gray-200 mt-0.5">
                          <span className="text-gray-500 text-[9px] font-semibold">Total</span>
                          <span className="text-red-500 text-[9px] font-bold">-₹{fmtINR(d.totalDeducted)}</span>
                        </div>
                      </div>
                      <div className="h-px bg-gray-200" />
                      <div className="bg-[#0098cc]/8 border border-[#0098cc]/20 rounded-xl p-3">
                        <p className="text-gray-400 text-[8px] uppercase tracking-widest font-semibold mb-1.5">You Receive</p>
                        <p className="text-[#0098cc] text-base font-bold leading-none">₹{fmtINR(d.mentorReceive)}</p>
                        {plan.months > 1 && (
                          <p className="text-[#0098cc]/60 text-[9px] font-semibold mt-0.5">₹{fmtINR(d.perMonthReceive)}/session</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-5 py-4 border-t border-gray-100">
            <button
              onClick={() => setModalPlan(null)}
              className="w-full bg-[#1a1a2e] hover:bg-[#16213e] text-white text-xs font-semibold py-3 rounded-xl transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto ">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">
          <div className="flex flex-col gap-2.5">
            <div>
              <h1 className="text-gray-900 text-xl font-bold tracking-tight">My Pricing</h1>
              {userData.name && <p className="text-gray-400 text-xs mt-0.5">{userData.name}</p>}
            </div>

            {tiersLoading ? (
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg w-fit border border-gray-200">
                <div className="w-3 h-3 border-2 border-gray-200 border-t-[#0098cc] rounded-full animate-spin" />
                <span className="text-gray-400 text-[10px]">Loading tier...</span>
              </div>
            ) : activeTier ? (
              <div className="flex items-center gap-2 bg-[#0098cc]/8 border border-[#0098cc]/20 px-3 py-1.5 rounded-xl w-fit">
                <Icon.Users />
                <span className="text-[#0098cc] text-[10px] font-semibold">
                  {subscriberCount} subscriber{subscriberCount !== 1 ? "s" : ""}
                </span>
                <span className="text-[#0098cc]/30 text-[9px]">·</span>
                <span className="text-[#0098cc]/70 text-[10px]">
                  {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name}
                </span>
              </div>
            ) : null}
          </div>

          <div className="sm:pt-1">
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`flex items-center gap-2 bg-[#1a1a2e] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors
                ${saving || saved ? "opacity-40 cursor-not-allowed" : "hover:bg-[#16213e] cursor-pointer"}`}
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Icon.Check />
                  Save Pricing
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info Banner */}
        {(isError || !fullPlansData) && (
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 mb-6">
            <span className="text-gray-400 mt-0.5 shrink-0"><Icon.Info /></span>
            <div>
              <p className="text-gray-700 text-xs font-medium">No pricing set yet</p>
              <p className="text-gray-400 text-[10px] mt-0.5">
                Fill in your prices below and click <strong className="text-gray-700">Save Pricing</strong> to publish.
              </p>
            </div>
          </div>
        )}

        {/* Plan Cards */}
        <div className="flex flex-col gap-4">
          {PLANS.map((plan) => {
            const s = plans[plan.key];
            const savedData = fullPlansData?.[plan.key];
            const hasValues = s.experienced !== "" || s.freshers !== "";
            const hasBreakdown = savedData?.breakdown?.experienced?.mentorReceive > 0;
            const bd = savedData?.breakdown;
            const fresWarn = hasValues && s.freshers !== "" && s.experienced !== "" && Number(s.freshers) >= Number(s.experienced);

            return (
              <div
                key={plan.key}
                className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 text-xs font-semibold">{plan.label}</span>
                        {hasValues && saved && (
                          <span className="flex items-center gap-1 text-[9px] text-green-600 font-semibold bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-gray-400 text-[9px]">{plan.sublabel}</span>
                    </div>
                  </div>
                  {hasBreakdown && (
                    <button
                      onClick={() => setModalPlan(plan.key)}
                      className="text-[10px] font-semibold text-[#0098cc] bg-[#0098cc]/8 hover:bg-[#0098cc]/15 border border-[#0098cc]/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View Details →
                    </button>
                  )}
                </div>

                {/* Price Fields */}
                <div className="flex flex-col sm:flex-row gap-4 p-5">
                  {["experienced", "freshers"].map((tier, idx) => {
                    const mode = getMode(plan.key, tier);
                    const value = s[tier];
                    const err = getError(plan.key, tier);
                    const label = tier === "experienced" ? "Experienced" : "Freshers";
                    const isCustom = mode === "custom";
                    const displayValue = value !== "" && value != null ? Number(value) : "";

                    return (
                      <>
                        {idx === 1 && <div className="hidden sm:block w-px bg-gray-100 self-stretch" />}
                        <div key={tier} className="flex-1 min-w-0 flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-gray-500 text-[10px] font-semibold tracking-wide uppercase">{label}</label>
                            <div className="flex rounded-lg overflow-hidden border border-gray-200">
                              {["dropdown", "custom"].map((m) => (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => switchFieldMode(plan.key, tier, m)}
                                  disabled={saved}
                                  className={`text-[9px] px-2.5 py-1 font-semibold capitalize transition-colors
                                    ${saved ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                                    ${mode === m ? "bg-[#1a1a2e] text-white" : "bg-white text-gray-400 hover:text-gray-600"}`}
                                >
                                  {m === "dropdown" ? "Select" : "Custom"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className={`flex items-center h-11 rounded-xl px-3.5 gap-2 border transition-colors
                            ${saved ? "bg-gray-50 border-gray-100 cursor-not-allowed"
                              : err ? "bg-white border-red-300 ring-1 ring-red-100"
                                : isCustom ? "bg-white border-[#0098cc]/40 ring-1 ring-[#0098cc]/10"
                                  : "bg-white border-gray-200 hover:border-gray-300"}`}
                          >
                            <span className="text-[#0098cc] text-sm font-bold shrink-0">₹</span>
                            {isCustom ? (
                              <>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  placeholder="Enter amount"
                                  value={getCustomVal(plan.key, tier)}
                                  onChange={(e) => handleCustomChange(plan.key, tier, e.target.value)}
                                  onBlur={() => handleCustomBlur(plan.key, tier)}
                                  disabled={saved}
                                  className={`flex-1 bg-transparent border-none outline-none text-xs font-semibold placeholder:text-gray-300
                                    ${saved ? "text-gray-300 cursor-not-allowed" : "text-gray-900"}`}
                                />
                                <span className="text-gray-300 text-[9px] font-medium shrink-0">/session</span>
                              </>
                            ) : (
                              <>
                                <select
                                  value={displayValue}
                                  onChange={(e) => handleDropdown(plan.key, tier, e.target.value)}
                                  disabled={saved}
                                  className={`flex-1 bg-transparent border-none outline-none text-xs font-semibold appearance-none
                                    ${saved ? "text-gray-300 cursor-not-allowed" : "text-gray-900 cursor-pointer"}`}
                                >
                                  <option value="" disabled className="bg-white text-gray-400">Choose price</option>
                                  {PRICE_OPTIONS.map((p) => (
                                    <option key={p} value={p} className="bg-white text-gray-900">
                                      {new Intl.NumberFormat("en-IN").format(p)} / session
                                    </option>
                                  ))}
                                </select>
                                <span className="text-gray-300 shrink-0"><Icon.Chevron /></span>
                              </>
                            )}
                          </div>

                          {err && (
                            <p className="text-red-400 text-[9px] font-medium flex items-center gap-1">
                              <Icon.Warn />
                              {err}
                            </p>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>

                {fresWarn && (
                  <div className="mx-5 mb-4 flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
                    <span className="text-amber-500 shrink-0"><Icon.Warn /></span>
                    <span className="text-amber-600 text-[10px] font-medium">Freshers price must be less than Experienced</span>
                  </div>
                )}

                {hasBreakdown && (
                  <div className="flex items-center justify-between gap-3 mx-5 mb-5 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl">
                    <div>
                      <p className="text-gray-400 text-[8px] uppercase tracking-widest font-semibold mb-1.5">You receive / month</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="text-[10px] text-gray-400">
                          Exp:&nbsp;<strong className="text-[#0098cc] text-sm font-bold">₹{fmtINR(bd.experienced.perMonthReceive)}</strong>
                        </span>
                        <span className="text-gray-200">|</span>
                        <span className="text-[10px] text-gray-400">
                          Fresh:&nbsp;<strong className="text-[#0098cc] text-sm font-bold">₹{fmtINR(bd.freshers.perMonthReceive)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeTier && (
          <p className="mt-6 text-center text-[9px] text-gray-300 font-medium">
            Commission tier: {TIER_LABELS[activeTier.tier_name] || activeTier.tier_name} · Breakdown calculated on save
          </p>
        )}
      </div>

      {/* Modal */}
      {renderModal()}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-xl z-50 whitespace-nowrap transition-all duration-300
          ${toast.type === "success" ? "bg-[#1a1a2e]" : "bg-red-500"}`}
        >
          {toast.type === "success" ? <Icon.Check /> : <Icon.Close />}
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MyPricing;






