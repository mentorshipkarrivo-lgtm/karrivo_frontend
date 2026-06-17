
// import { useState, useEffect, useCallback } from "react";
// import {
//   useGetMyPricingQuery,
//   useSaveOrUpdatePricingMutation,
//   useGetCommissionTiersQuery,
//   useGetAllCouponsQuery,
//   useDeleteCouponMutation,
//   useUpdateCouponMutation,
//   useCreateCouponMutation,
// } from "./Mentorpricingapislice";

// /* ─── Static config ─────────────────────────────────────────────────────────── */
// const SHARED_PRICE_OPTIONS = {
//   experienced: [5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000],
//   freshers: [2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000],
// };

// const PLANS = [
//   { key: "one_month", label: "1 Month", months: 1 },
//   { key: "three_months", label: "3 Months", months: 3 },
//   { key: "six_months", label: "6 Months", months: 6 },
// ];

// const EMPTY_PLANS = {
//   one_month: { experienced: "", freshers: "" },
//   three_months: { experienced: "", freshers: "" },
//   six_months: { experienced: "", freshers: "" },
// };

// const EMPTY_BREAKDOWNS = {
//   one_month: { experienced: null, freshers: null },
//   three_months: { experienced: null, freshers: null },
//   six_months: { experienced: null, freshers: null },
// };

// const TIER_META = {
//   "1_to_5": { label: "Starter", range: "1 – 5 subscribers", color: "#0091c3" },
//   "6_to_20": { label: "Growing", range: "6 – 20 subscribers", color: "#7c3aed" },
//   "21_plus": { label: "Established", range: "21+ subscribers", color: "#16a34a" },
// };

// const resolveTierName = (count) => {
//   if (count <= 5) return "1_to_5";
//   if (count <= 20) return "6_to_20";
//   return "21_plus";
// };

// /* ─── Helpers ───────────────────────────────────────────────────────────────── */
// const fmtINR = (v) =>
//   v != null && v !== ""
//     ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v)
//     : "—";

// const fmtDate = (d) => {
//   if (!d) return null;
//   return new Intl.DateTimeFormat("en-IN", {
//     day: "2-digit", month: "short", year: "numeric",
//     hour: "2-digit", minute: "2-digit", hour12: true,
//   }).format(new Date(d));
// };

// /* ─── Icons ──────────────────────────────────────────────────────────────────── */
// const IconX = ({ size = 16 }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );
// const IconChevron = ({ size = 14, style = {} }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={style}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//   </svg>
// );
// const IconCheck = ({ size = 14 }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//   </svg>
// );
// const IconCal = ({ size = 12 }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//   </svg>
// );
// const IconClock = ({ size = 12 }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//   </svg>
// );
// const IconTag = ({ size = 14 }) => (
//   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//   </svg>
// );

// /* ─── Styles (shared) ────────────────────────────────────────────────────────── */
// const F = "'DM Sans', 'Segoe UI', sans-serif";

// const btnPrimary = {
//   fontFamily: F,
//   background: "#1a1a2e",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   padding: "8px 18px",
//   fontSize: "13px",
//   fontWeight: 600,
//   cursor: "pointer",
//   display: "flex",
//   alignItems: "center",
//   gap: "6px",
//   transition: "opacity 0.15s",
// };

// const btnOutline = {
//   fontFamily: F,
//   background: "#fff",
//   color: "#1a1a2e",
//   border: "1px solid #e2e8f0",
//   borderRadius: "8px",
//   padding: "8px 18px",
//   fontSize: "13px",
//   fontWeight: 600,
//   cursor: "pointer",
//   display: "flex",
//   alignItems: "center",
//   gap: "6px",
//   transition: "background 0.15s",
// };

// /* ─── Toggle ─────────────────────────────────────────────────────────────────── */
// const Toggle = ({ on, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!on)}
//     style={{
//       width: 40, height: 22, borderRadius: 99,
//       background: on ? "#1a1a2e" : "#e2e8f0",
//       border: "none", cursor: "pointer", position: "relative",
//       transition: "background 0.2s", flexShrink: 0,
//     }}
//   >
//     <span style={{
//       position: "absolute", top: 3, left: on ? 19 : 3,
//       width: 16, height: 16, borderRadius: "50%",
//       background: "#fff", transition: "left 0.2s",
//       boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//     }} />
//   </button>
// );

// /* ─── Tier Banner ────────────────────────────────────────────────────────────── */
// const TierBanner = ({ tierDoc, subCount, isEditing }) => {
//   if (!tierDoc || isEditing) return null;
//   const meta = TIER_META[tierDoc.tier_name] || { label: tierDoc.tier_name, range: "", color: "#94a3b8" };
//   const rates = [
//     { label: "1 mo", pct: tierDoc.commission?.one_month },
//     { label: "3 mo", pct: tierDoc.commission?.three_months },
//     { label: "6 mo", pct: tierDoc.commission?.six_months },
//   ];

//   return (
//     <div style={{
//       border: "1px solid #e2e8f0", borderRadius: 12,
//       padding: "14px 18px", marginBottom: 18, background: "#fff",
//     }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color, display: "inline-block" }} />
//           <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>
//             Commission tier: <span style={{ color: meta.color }}>{meta.label}</span>
//           </p>
//           <span style={{
//             fontFamily: F, fontSize: 10, fontWeight: 600,
//             color: meta.color, border: `1px solid ${meta.color}30`,
//             background: `${meta.color}10`, padding: "2px 8px", borderRadius: 99,
//           }}>{meta.range}</span>
//         </div>
//         <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>
//           {subCount === 0 ? "No active subscribers yet" : `${subCount} active subscriber${subCount !== 1 ? "s" : ""}`}
//         </p>
//       </div>
//       <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//         <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, fontWeight: 500 }}>Platform fee:</p>
//         {rates.map(({ label, pct }) => (
//           <span key={label} style={{
//             fontFamily: F, fontSize: 11,
//             border: "1px solid #e2e8f0", borderRadius: 99,
//             padding: "2px 10px", color: "#475569", background: "#fff",
//           }}>
//             <b style={{ color: "#1a1a2e" }}>{pct}%</b> {label}
//           </span>
//         ))}
//         <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "0 0 0 auto" }}>+ 9% CGST + 9% SGST</p>
//       </div>
//     </div>
//   );
// };

// /* ─── Details Modal ──────────────────────────────────────────────────────────── */
// const DetailsModal = ({ plan, breakdowns, onClose }) => {
//   if (!plan) return null;
//   const [activeKey, setActiveKey] = useState(plan);
//   const activePlan = PLANS.find((x) => x.key === activeKey);
//   const bd = breakdowns[activeKey];
//   const exp = bd?.experienced;
//   const fre = bd?.freshers;
//   const noData = !exp || !fre;

//   const rows = [
//     { label: `Mentee pays (${activePlan.months}mo):`, expVal: exp?.totalPrice, freVal: fre?.totalPrice, negative: false },
//     { label: `Platform fee (${exp?.platformPct}%):`, expVal: exp?.platformFee, freVal: fre?.platformFee, negative: true },
//     { label: "CGST (9%):", expVal: exp?.cgst, freVal: fre?.cgst, negative: true },
//     { label: "SGST (9%):", expVal: exp?.sgst, freVal: fre?.sgst, negative: true },
//   ];

//   const thStyle = {
//     fontFamily: F, fontSize: 11, fontWeight: 700,
//     color: "#94a3b8", letterSpacing: "0.5px",
//     textTransform: "uppercase", padding: "8px 12px",
//     borderBottom: "1.5px solid #e9edf2", background: "#f8fafc", textAlign: "center",
//   };
//   const tdStyle = {
//     fontFamily: F, fontSize: 13, padding: "11px 12px",
//     borderBottom: "1px solid #f1f5f9", verticalAlign: "middle",
//   };

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 50,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)",
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           width: "100%", maxWidth: 500,
//           background: "#fff", borderRadius: 18,
//           border: "1.5px solid #e2e8f0",
//           boxShadow: "0 24px 70px rgba(0,0,0,0.11)",
//           overflow: "hidden", margin: "0 16px",
//         }}
//       >
//         {/* Header */}
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 22px 16px", borderBottom: "1px solid #f1f5f9" }}>
//           <div>
//             <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: "0 0 3px" }}>Payout breakdown</p>
//             <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>Server-calculated figures based on your tier</p>
//           </div>
//           <button
//             onClick={onClose}
//             style={{ width: 30, height: 30, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0 }}
//           >
//             <IconX size={24} />
//           </button>
//         </div>

//         {/* Plan tabs */}
//         <div style={{ display: "flex", margin: "16px 22px", background: "#f8fafc", border: "1.5px solid #e9edf2", borderRadius: 10, overflow: "hidden" }}>
//           {PLANS.map((pl) => (
//             <button
//               key={pl.key}
//               onClick={() => setActiveKey(pl.key)}
//               style={{
//                 flex: 1, fontFamily: F, fontSize: 12, fontWeight: 700,
//                 padding: "9px 0", border: "none", cursor: "pointer",
//                 background: activeKey === pl.key ? "#1a1a2e" : "transparent",
//                 color: activeKey === pl.key ? "#fff" : "#94a3b8",
//                 transition: "all 0.15s",
//               }}
//             >{pl.label}</button>
//           ))}
//         </div>

//         {/* Table */}
//         <div style={{ padding: "0 22px 20px" }}>
//           {noData ? (
//             <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "32px 0" }}>
//               No breakdown data for this plan.
//             </p>
//           ) : (
//             <div style={{ border: "1.5px solid #e9edf2", borderRadius: 12, overflow: "hidden" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th style={{ ...thStyle, textAlign: "left", width: "46%" }} />
//                     <th style={thStyle}>
//                       <span style={{ fontFamily: F, fontSize: 11, color: "#1a1a2e", fontWeight: 800 }}>Experienced</span>
//                     </th>
//                     <th style={thStyle}>
//                       <span style={{ fontFamily: F, fontSize: 11, color: "#64748b", fontWeight: 800 }}>Freshers</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rows.map(({ label, expVal, freVal, negative }) => (
//                     <tr key={label}>
//                       <td style={{ ...tdStyle, color: "#475569" }}>{label}</td>
//                       <td style={{ ...tdStyle, textAlign: "center", color: negative ? "#dc2626" : "#1a1a2e", fontWeight: negative ? 400 : 600 }}>
//                         {negative ? "− " : ""}₹{fmtINR(expVal)}
//                       </td>
//                       <td style={{ ...tdStyle, textAlign: "center", color: negative ? "#dc2626" : "#1a1a2e", fontWeight: negative ? 400 : 600 }}>
//                         {negative ? "− " : ""}₹{fmtINR(freVal)}
//                       </td>
//                     </tr>
//                   ))}

//                   <tr style={{ borderTop: "1px dashed #e2e8f0" }}>
//                     <td style={{ ...tdStyle, color: "#94a3b8", fontSize: 11, fontStyle: "italic" }}>Total deducted:</td>
//                     <td style={{ ...tdStyle, textAlign: "center", color: "#94a3b8", fontSize: 11 }}>− ₹{fmtINR(exp.totalDeducted)}</td>
//                     <td style={{ ...tdStyle, textAlign: "center", color: "#94a3b8", fontSize: 11 }}>− ₹{fmtINR(fre.totalDeducted)}</td>
//                   </tr>

//                   <tr style={{ borderTop: "2px solid #e9edf2", background: "#f8fafc" }}>
//                     <td style={{ ...tdStyle, color: "#1a1a2e", fontWeight: 800, fontSize: 14 }}>You receive:</td>
//                     <td style={{ ...tdStyle, textAlign: "center" }}>
//                       <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#16a34a", margin: 0 }}>₹{fmtINR(exp.mentorReceive)}</p>
//                       {activePlan.months > 1 && (
//                         <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "3px 0 0" }}>₹{fmtINR(exp.perMonthReceive)}/mo</p>
//                       )}
//                     </td>
//                     <td style={{ ...tdStyle, textAlign: "center" }}>
//                       <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#16a34a", margin: 0 }}>₹{fmtINR(fre.mentorReceive)}</p>
//                       {activePlan.months > 1 && (
//                         <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "3px 0 0" }}>₹{fmtINR(fre.perMonthReceive)}/mo</p>
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{ padding: "0 22px 20px" }}>
//           <button
//             onClick={onClose}
//             style={{ width: "100%", padding: "11px", borderRadius: 10, border: "none", background: "#1a1a2e", color: "#fff", fontFamily: F, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
//           >
//             Got it
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Coupon Modal ───────────────────────────────────────────────────────────── */
// const CouponModal = ({ onClose, mentorId }) => {
//   const [createCoupon, { isLoading: creating }] = useCreateCouponMutation();
//   const [updateCoupon] = useUpdateCouponMutation();
//   const [deleteCoupon] = useDeleteCouponMutation();
//   const { data: couponData, refetch } = useGetAllCouponsQuery();

//   const [code, setCode] = useState("");
//   const [discount, setDiscount] = useState(10);
//   const [durations, setDurations] = useState({ one: false, three: false, six: false });
//   const [startDate, setStartDate] = useState("");
//   const [expiry, setExpiry] = useState(false);
//   const [expiryDate, setExpiryDate] = useState("");
//   const [showList, setShowList] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formError, setFormError] = useState("");

//   const getSelectedDuration = () => {
//     const s = [];
//     if (durations.one) s.push(1);
//     if (durations.three) s.push(3);
//     if (durations.six) s.push(6);
//     return s;
//   };

//   const resetForm = () => {
//     setCode(""); setDiscount(10); setStartDate("");
//     setExpiry(false); setExpiryDate(""); setEditingId(null);
//     setDurations({ one: false, three: false, six: false });
//     setFormError("");
//   };

//   const handleSubmit = async () => {
//     setFormError("");
//     const totalCoupons = couponData?.data?.length || 0;
//     // if (!editingId && totalCoupons >= 3) return setFormError("Maximum 3 coupons allowed.");
//     if (!code || !discount || !startDate || getSelectedDuration().length === 0)
//       return setFormError("Please fill all required fields.");
//     if (expiry && !expiryDate) return setFormError("Please set an expiry date.");
//     const payload = {
//       mentorId, couponCode: code,
//       discountValue: Number(discount),
//       appliesForDuration: getSelectedDuration(),
//       startDate,
//       expiryDate: expiry ? expiryDate : undefined,
//     };
//     try {
//       if (editingId) {
//         await updateCoupon({ couponId: editingId, ...payload }).unwrap();
//       } else {
//         await createCoupon(payload).unwrap();
//       }
//       resetForm(); refetch();
//     } catch (error) {
//       setFormError(error?.data?.message || "Something went wrong.");
//     }
//   };

//   const handleEdit = (coupon) => {
//     setEditingId(coupon._id);
//     setCode(coupon.couponCode);
//     setDiscount(coupon.discountValue);
//     setStartDate(coupon.startDate?.split("T")[0] || "");
//     setExpiry(!!coupon.expiryDate);
//     setExpiryDate(coupon.expiryDate?.split("T")[0] || "");
//     setDurations({
//       one: coupon.appliesForDuration?.includes(1) || false,
//       three: coupon.appliesForDuration?.includes(3) || false,
//       six: coupon.appliesForDuration?.includes(6) || false,
//     });
//     setFormError("");
//     document.getElementById("coupon-form-top")?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleDelete = async (couponId) => {
//     if (!window.confirm("Delete this coupon?")) return;
//     try {
//       await deleteCoupon(couponId).unwrap();
//       if (editingId === couponId) resetForm();
//       refetch();
//     } catch (error) {
//       setFormError(error?.data?.message || "Delete failed.");
//     }
//   };

//   const coupons = couponData?.data || [];

//   const inputStyle = {
//     fontFamily: F, fontSize: 13, color: "#1a1a2e",
//     border: "1px solid #e2e8f0", borderRadius: 8,
//     padding: "9px 12px", width: "100%",
//     outline: "none", background: "#fff",
//     boxSizing: "border-box",
//   };
//   const labelStyle = {
//     fontFamily: F, fontSize: 10, fontWeight: 700,
//     color: "#94a3b8", letterSpacing: "0.6px",
//     textTransform: "uppercase", display: "block", marginBottom: 5,
//   };

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 50,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", padding: 16,
//       }}
//     >
//       <div
//         id="coupon-form-top"
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: "#fff", borderRadius: 16,
//           boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
//           width: "100%", maxWidth: showList ? 640 : 380,
//           maxHeight: "90vh", overflow: "hidden",
//           display: "flex", transition: "max-width 0.3s",
//         }}
//       >
//         {/* Form panel */}
//         <div style={{
//           width: showList ? 300 : "100%", flexShrink: 0,
//           display: "flex", flexDirection: "column", gap: 14,
//           overflowY: "auto", padding: 20,
//           borderRight: showList ? "1px solid #f1f5f9" : "none",
//         }}>
//           {/* Header */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <IconTag size={15} />
//               <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
//                 {editingId ? "Update coupon" : "Create coupon"}
//               </p>
//             </div>
//             <button onClick={onClose} style={{ ...btnOutline, padding: "6px", borderRadius: 8 }}>
//               <IconX size={15} />
//             </button>
//           </div>

//           {/* Error */}
//           {formError && (
//             <div style={{
//               fontFamily: F, fontSize: 12, color: "#dc2626",
//               background: "#fef2f2", border: "1px solid #fecaca",
//               borderRadius: 8, padding: "8px 12px",
//             }}>{formError}</div>
//           )}

//           {/* Code */}
//           <div>
//             <label style={labelStyle}>Coupon code</label>
//             <input
//               type="text" placeholder="e.g. ROHAN30" value={code}
//               onChange={(e) => setCode(e.target.value.toUpperCase())}
//               style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.1em" }}
//             />
//           </div>

//           {/* Discount */}
//           <div>
//             <label style={labelStyle}>Discount</label>
//             <div style={{ position: "relative" }}>
//               <input
//                 type="number" min={1} max={100} value={discount}
//                 onChange={(e) => setDiscount(e.target.value)}
//                 style={{ ...inputStyle, paddingRight: 30 }}
//               />
//               <span style={{
//                 position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
//                 fontFamily: F, fontSize: 13, color: "#94a3b8", pointerEvents: "none",
//               }}>%</span>
//             </div>
//           </div>

//           {/* Duration */}
//           <div>
//             <label style={labelStyle}>Applies for</label>
//             <div style={{ display: "flex", gap: 16 }}>
//               {[{ key: "one", label: "1 mo" }, { key: "three", label: "3 mo" }, { key: "six", label: "6 mo" }].map(({ key, label }) => (
//                 <label key={key} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: F, fontSize: 13, color: "#475569" }}>
//                   <input
//                     type="checkbox" checked={durations[key]}
//                     onChange={() => setDurations((p) => ({ ...p, [key]: !p[key] }))}
//                     style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#1a1a2e" }}
//                   />
//                   {label}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Start date */}
//           <div>
//             <label style={labelStyle}>Start date</label>
//             <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
//           </div>

//           {/* Expiry toggle */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <span style={{ fontFamily: F, fontSize: 13, color: "#475569" }}>Set expiry date</span>
//             <Toggle on={expiry} onChange={setExpiry} />
//           </div>

//           {/* Expiry date */}
//           {expiry && (
//             <div>
//               <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} style={inputStyle} />
//             </div>
//           )}

//           {/* Actions */}
//           <div style={{ display: "flex", gap: 8 }}>
//             <button onClick={resetForm} style={{ ...btnOutline, flex: 1, justifyContent: "center" }}>Reset</button>
//             <button onClick={handleSubmit} disabled={creating} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: creating ? 0.6 : 1 }}>
//               {editingId ? "Update" : creating ? "Saving…" : "Create"}
//             </button>
//           </div>

//           {/* Toggle list */}
//           <button
//             onClick={() => setShowList(!showList)}
//             style={{ ...btnOutline, justifyContent: "center", width: "100%" }}
//           >
//             <IconChevron style={{ transform: showList ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
//             {showList ? "Hide coupons" : `View coupons`}
//           </button>
//         </div>

//         {/* List panel */}
//         {showList && (
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
//             <div style={{
//               display: "flex", alignItems: "center", justifyContent: "space-between",
//               padding: "14px 18px", borderBottom: "1px solid #f1f5f9", background: "#fff",
//             }}>
//               <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>Your coupons</span>
//               <span style={{
//                 fontFamily: F, fontSize: 11, color: "#94a3b8",
//                 border: "1px solid #e2e8f0", borderRadius: 99, padding: "2px 10px",
//               }}>{coupons.length} / 3</span>
//             </div>
//             <div style={{ overflowY: "auto", flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
//               {coupons.length > 0 ? coupons.map((coupon) => (
//                 <div
//                   key={coupon._id}
//                   style={{
//                     border: `1px solid ${editingId === coupon._id ? "#1a1a2e" : "#e2e8f0"}`,
//                     borderRadius: 12, padding: 14, background: "#fff",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
//                     <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#1a1a2e", letterSpacing: "0.1em" }}>
//                       {coupon.couponCode}
//                     </span>
//                     <span style={{
//                       fontFamily: F, fontSize: 11, fontWeight: 600,
//                       color: "#16a34a", background: "#f0fdf4",
//                       border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 99,
//                     }}>{coupon.discountValue}% off</span>
//                   </div>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
//                     <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
//                       <IconCal /> {coupon.appliesForDuration?.join(", ")} month{coupon.appliesForDuration?.length > 1 ? "s" : ""}
//                     </p>
//                     <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
//                       <IconClock /> {coupon.expiryDate ? `Expires ${coupon.expiryDate.split("T")[0]}` : "No expiry"}
//                     </p>
//                   </div>
//                   <div style={{ display: "flex", gap: 8 }}>
//                     <button onClick={() => handleEdit(coupon)} style={{ ...btnOutline, flex: 1, justifyContent: "center", fontSize: 12, padding: "6px 0" }}>Edit</button>
//                     <button onClick={() => handleDelete(coupon._id)} style={{
//                       flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600,
//                       color: "#dc2626", background: "#fff",
//                       border: "1px solid #fecaca", borderRadius: 8,
//                       padding: "6px 0", cursor: "pointer", justifyContent: "center",
//                     }}>Delete</button>
//                   </div>
//                 </div>
//               )) : (
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 8 }}>
//                   <IconTag size={24} />
//                   <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: 0 }}>No coupons yet</p>
//                   <p style={{ fontFamily: F, fontSize: 11, color: "#cbd5e1", margin: 0 }}>Create your first coupon above</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* ─── Pricing Empty State ────────────────────────────────────────────────────── */
// const PricingEmptyState = ({ onStart }) => (
//   <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
//     <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
//       <div style={{
//         width: 56, height: 56, borderRadius: 16,
//         background: "#f8fafc", border: "1px solid #e2e8f0",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         margin: "0 auto 20px",
//       }}>
//         <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1a1a2e" strokeWidth={1.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       </div>
//       <h2 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>Set your pricing</h2>
//       <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 24px" }}>
//         You haven't set your pricing yet. Configure rates for 1, 3, and 6-month plans — for both experienced mentees and freshers.
//       </p>
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
//         {PLANS.map((pl) => (
//           <div key={pl.key} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
//             <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#1a1a2e", margin: "0 0 3px" }}>{pl.label}</p>
//             <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: 0 }}>LTM Plan</p>
//           </div>
//         ))}
//       </div>
//       <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: "0 0 20px" }}>
//         Freshers pricing must always be lower than experienced pricing
//       </p>
//       <button onClick={onStart} style={{ ...btnPrimary, width: "100%", justifyContent: "center", padding: "12px" }}>
//         Set up pricing
//       </button>
//     </div>
//   </div>
// );

// /* ─── Price Selector ─────────────────────────────────────────────────────────── */
// const PriceSelector = ({ tier, value, onChange, disabled }) => {
//   const options = SHARED_PRICE_OPTIONS[tier];
//   const label = tier === "experienced" ? "Experienced" : "Freshers";
//   const color = tier === "experienced" ? "#db2777" : "#7c3aed";

//   return (
//     <div style={{ flex: 1, padding: "14px 16px" }}>
//       <div style={{ marginBottom: 8 }}>
//         <span style={{
//           fontFamily: F, fontSize: 10, fontWeight: 700,
//           color, border: `1px solid ${color}30`,
//           background: `${color}10`, padding: "2px 8px", borderRadius: 99,
//         }}>{label}</span>
//       </div>
//       <div style={{
//         display: "flex", alignItems: "center",
//         border: `1px solid ${disabled ? "#f1f5f9" : "#e2e8f0"}`,
//         borderRadius: 8, padding: "0 12px", height: 40,
//         background: disabled ? "#fafafa" : "#fff",
//       }}>
//         <span style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", marginRight: 4 }}>₹</span>
//         <select
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           disabled={disabled}
//           style={{
//             fontFamily: F, flex: 1, border: "none", outline: "none",
//             fontSize: 13, fontWeight: 600, background: "transparent",
//             color: disabled ? "#94a3b8" : "#1a1a2e",
//             cursor: disabled ? "not-allowed" : "pointer",
//             appearance: "none",
//           }}
//         >
//           <option value="" disabled>Select price</option>
//           {options.map((p) => (
//             <option key={p} value={p}>{new Intl.NumberFormat("en-IN").format(p)}/month</option>
//           ))}
//         </select>
//         {!disabled && <IconChevron size={13} style={{ color: "#94a3b8", flexShrink: 0 }} />}
//       </div>
//     </div>
//   );
// };

// /* ─── Plan Card ──────────────────────────────────────────────────────────────── */
// const PlanCard = ({ plan, values, breakdowns, isLocked, onChange, onViewDetails }) => {
//   const exp = Number(values.experienced) || 0;
//   const fre = Number(values.freshers) || 0;
//   const hasValues = exp > 0 && fre > 0;
//   const fresWarn = hasValues && fre >= exp;
//   const bdExp = breakdowns[plan.key]?.experienced;
//   const bdFre = breakdowns[plan.key]?.freshers;
//   const expReceive = bdExp?.perMonthReceive ?? null;
//   const freReceive = bdFre?.perMonthReceive ?? null;

//   return (
//     <div style={{
//       background: "#fff",
//       border: `1px solid ${fresWarn ? "#fcd34d" : "#e2e8f0"}`,
//       borderRadius: 12, overflow: "hidden",
//     }}>
//       {/* Card header */}
//       <div style={{
//         padding: "12px 18px", borderBottom: "1px solid #f1f5f9",
//         display: "flex", alignItems: "center", gap: 10,
//       }}>
//         <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{plan.label}</span>
//         <span style={{ fontFamily: F, fontSize: 11, color: "#94a3b8" }}>LTM Plan</span>
//         {hasValues && isLocked && !fresWarn && (
//           <span style={{
//             fontFamily: F, fontSize: 10, fontWeight: 700,
//             color: "#16a34a", background: "#f0fdf4",
//             border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 99,
//             display: "flex", alignItems: "center", gap: 4, marginLeft: "auto",
//           }}>
//             <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
//             Active
//           </span>
//         )}
//       </div>

//       {/* Selectors */}
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <div style={{ flex: 1, borderRight: "1px solid #f1f5f9" }}>
//           <PriceSelector tier="experienced" value={values.experienced} onChange={(val) => onChange(plan.key, "experienced", val)} disabled={isLocked} />
//         </div>
//         <div style={{ flex: 1 }}>
//           <PriceSelector tier="freshers" value={values.freshers} onChange={(val) => onChange(plan.key, "freshers", val)} disabled={isLocked} />
//         </div>
//       </div>

//       {/* Fresher warning */}
//       {fresWarn && (
//         <div style={{
//           margin: "0 14px 12px", padding: "8px 12px",
//           background: "#fffbeb", border: "1px solid #fcd34d",
//           borderRadius: 8, fontFamily: F, fontSize: 12, color: "#92400e",
//           display: "flex", alignItems: "center", gap: 6,
//         }}>
//           ⚠ Freshers price must be less than the Experienced Price
//         </div>
//       )}

//       {/* Earnings row */}
//       {hasValues && isLocked && !fresWarn && (
//         <div style={{
//           margin: "0 14px 14px",
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           border: "1px solid #f1f5f9", borderRadius: 10, padding: "10px 14px",
//         }}>
//           <p style={{ fontFamily: F, fontSize: 12, color: "#475569", margin: 0 }}>
//             You receive / mo:{" "}
//             <b style={{ color: "#1a1a2e" }}>{expReceive != null ? `₹${fmtINR(expReceive)}` : "—"}</b>
//             <span style={{ color: "#e2e8f0", margin: "0 8px" }}>·</span>
//             <b style={{ color: "#1a1a2e" }}>{freReceive != null ? `₹${fmtINR(freReceive)}` : "—"}</b>
//           </p>
//           <button
//             onClick={() => onViewDetails(plan.key)}
//             style={{
//               fontFamily: F, fontSize: 12, fontWeight: 600,
//               color: "#0091c3", background: "none", border: "none",
//               cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
//             }}
//           >
//             Details
//             <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ─── Main Component ─────────────────────────────────────────────────────────── */
// const MyPricing = () => {
//   const [plans, setPlans] = useState(EMPTY_PLANS);
//   const [breakdowns, setBreakdowns] = useState(EMPTY_BREAKDOWNS);
//   const [subCount, setSubCount] = useState(0);
//   const [saved, setSaved] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [modalPlan, setModalPlan] = useState(null);
//   const [showCoupon, setShowCoupon] = useState(false);
//   const [isEditingNew, setIsEditingNew] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

//   const { data: pricingData, isLoading: pricingLoading, error: pricingError, refetch: refetchPricing } =
//     useGetMyPricingQuery(mentorId, { skip: !mentorId });
//   const { data: tiersData, isLoading: tiersLoading, error: tiersError } =
//     useGetCommissionTiersQuery();
//   const [saveOrUpdatePricing, { isLoading: savingPricing }] = useSaveOrUpdatePricingMutation();

//   const currentTierDoc = tiersData?.data?.find(
//     (t) => t.tier_name === resolveTierName(subCount)
//   ) ?? null;

//   useEffect(() => {
//     if (!pricingData) return;
//     const doc = pricingData?.plans;
//     const planDoc = doc?.plans;
//     const hasPricing =
//       planDoc?.one_month?.experienced && planDoc?.one_month?.freshers &&
//       planDoc?.three_months?.experienced && planDoc?.three_months?.freshers &&
//       planDoc?.six_months?.experienced && planDoc?.six_months?.freshers;

//     if (hasPricing) {
//       setPlans({
//         one_month: { experienced: planDoc.one_month.experienced, freshers: planDoc.one_month.freshers },
//         three_months: { experienced: planDoc.three_months.experienced, freshers: planDoc.three_months.freshers },
//         six_months: { experienced: planDoc.six_months.experienced, freshers: planDoc.six_months.freshers },
//       });
//       setBreakdowns({
//         one_month: planDoc.one_month.breakdown ?? { experienced: null, freshers: null },
//         three_months: planDoc.three_months.breakdown ?? { experienced: null, freshers: null },
//         six_months: planDoc.six_months.breakdown ?? { experienced: null, freshers: null },
//       });
//       setSubCount(doc?.subscriberCountAtSave ?? 0);
//       setSaved(true);
//       setIsEditingNew(false);
//       setLastUpdated(doc?.updatedAtDate ?? doc?.updatedAt ?? null);
//     } else {
//       setPlans(EMPTY_PLANS);
//       setBreakdowns(EMPTY_BREAKDOWNS);
//       setSubCount(0);
//       setSaved(false);
//       setIsEditingNew(false);
//       setLastUpdated(null);
//     }
//   }, [pricingData]);

//   const showToast = useCallback((type, msg) => {
//     setToast({ type, msg });
//     setTimeout(() => setToast(null), 3500);
//   }, []);

//   const handleDropdown = (planKey, tier, val) => {
//     if (saved && !isEditingNew) return;
//     setPlans((p) => ({ ...p, [planKey]: { ...p[planKey], [tier]: Number(val) } }));
//   };

//   const handleSave = async () => {
//     for (const plan of PLANS) {
//       const exp = Number(plans[plan.key].experienced) || 0;
//       const fre = Number(plans[plan.key].freshers) || 0;
//       if (!exp || !fre) return showToast("error", `Set both prices for ${plan.label}`);
//       if (fre >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
//     }
//     try {
//       const result = await saveOrUpdatePricing({
//         mentorId,
//         plans: {
//           one_month: { experienced: Number(plans.one_month.experienced), freshers: Number(plans.one_month.freshers) },
//           three_months: { experienced: Number(plans.three_months.experienced), freshers: Number(plans.three_months.freshers) },
//           six_months: { experienced: Number(plans.six_months.experienced), freshers: Number(plans.six_months.freshers) },
//         },
//       }).unwrap();

//       const savedDoc = result?.plans;
//       const savedPlan = savedDoc?.plans;
//       if (savedPlan) {
//         setBreakdowns({
//           one_month: savedPlan.one_month?.breakdown ?? { experienced: null, freshers: null },
//           three_months: savedPlan.three_months?.breakdown ?? { experienced: null, freshers: null },
//           six_months: savedPlan.six_months?.breakdown ?? { experienced: null, freshers: null },
//         });
//         setSubCount(savedDoc?.subscriberCountAtSave ?? 0);
//       }
//       if (savedDoc?.updatedAtDate || savedDoc?.updatedAt)
//         setLastUpdated(savedDoc.updatedAtDate ?? savedDoc.updatedAt);

//       setSaved(true);
//       setIsEditingNew(false);
//       showToast("success", "Pricing saved successfully!");
//       refetchPricing();
//     } catch (error) {
//       showToast("error", error?.data?.message || "Failed to save. Please try again.");
//     }
//   };

//   const handleCancel = () => {
//     setIsEditingNew(false);
//     const planDoc = pricingData?.plans?.plans;
//     if (planDoc?.one_month?.experienced) {
//       setPlans({
//         one_month: { experienced: planDoc.one_month.experienced, freshers: planDoc.one_month.freshers },
//         three_months: { experienced: planDoc.three_months.experienced, freshers: planDoc.three_months.freshers },
//         six_months: { experienced: planDoc.six_months.experienced, freshers: planDoc.six_months.freshers },
//       });
//       setSaved(true);
//     } else {
//       setPlans(EMPTY_PLANS);
//       setSaved(false);
//     }
//   };

//   if (pricingLoading || tiersLoading) {
//     return (
//       <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <div style={{ textAlign: "center" }}>
//           <div style={{
//             width: 32, height: 32, borderRadius: "50%",
//             border: "2px solid #e2e8f0", borderTopColor: "#1a1a2e",
//             animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
//           }} />
//           <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: 0 }}>Loading pricing…</p>
//         </div>
//       </div>
//     );
//   }

//   const realPricingError = pricingError?.status !== 400 ? pricingError : null;
//   if (realPricingError || tiersError) {
//     return (
//       <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
//         <div style={{ textAlign: "center", maxWidth: 340 }}>
//           <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Failed to load pricing</p>
//           <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: "0 0 16px" }}>
//             {realPricingError?.data?.message || tiersError?.data?.message || "Please try again"}
//           </p>
//           <button onClick={() => refetchPricing()} style={{ ...btnPrimary, justifyContent: "center", padding: "10px 24px" }}>
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!isEditingNew && !saved && (!plans.one_month.experienced || !plans.three_months.experienced || !plans.six_months.experienced)) {
//     return <PricingEmptyState onStart={() => setIsEditingNew(true)} />;
//   }

//   const isLocked = saved && !isEditingNew;

//   return (
//     <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh" }}>
//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//         input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
//         select option { background: #fff; color: #1a1a2e; }
//       `}</style>

//       {/* Page header */}
//       <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 24px" }}>
//         <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div>
//             <h1 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 3px" }}>Pricing</h1>
//             {lastUpdated && isLocked && (
//               <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>
//                 Last updated: {fmtDate(lastUpdated)}
//               </p>
//             )}
//           </div>
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <button onClick={() => setShowCoupon(true)} style={{ ...btnOutline, fontSize: 12 }}>
//               <IconTag size={13} /> Coupons
//             </button>
//             {isLocked ? (
//               <button onClick={() => setIsEditingNew(true)} style={{ ...btnOutline, fontSize: 12 }}>
//                 <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                 </svg>
//                 Edit
//               </button>
//             ) : (
//               <button onClick={handleSave} disabled={savingPricing} style={{ ...btnPrimary, fontSize: 12, opacity: savingPricing ? 0.6 : 1 }}>
//                 <IconCheck size={13} />
//                 {savingPricing ? "Saving…" : "Save"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 24px" }}>

//         <TierBanner tierDoc={currentTierDoc} subCount={subCount} isEditing={!isLocked} />

//         {/* Edit notice */}
//         {!isLocked && (
//           <div style={{
//             display: "flex", alignItems: "center", gap: 8,
//             background: "#fffbeb", border: "1px solid #fcd34d",
//             borderRadius: 10, padding: "10px 14px", marginBottom: 16,
//             fontFamily: F, fontSize: 12, color: "#92400e",
//           }}>
//             <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#d97706", flexShrink: 0 }}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             Editing — changes won't apply until you save.
//           </div>
//         )}

//         {/* Plan cards */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {PLANS.map((plan) => (
//             <PlanCard
//               key={plan.key}
//               plan={plan}
//               values={plans[plan.key]}
//               breakdowns={breakdowns}
//               isLocked={isLocked}
//               onChange={handleDropdown}
//               onViewDetails={setModalPlan}
//             />
//           ))}
//         </div>

//         {/* Footer actions */}
//         {!isLocked && (
//           <div style={{
//             display: "flex", alignItems: "center", justifyContent: "flex-end",
//             gap: 10, marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0",
//           }}>
//             <button onClick={handleCancel} style={{ ...btnOutline, padding: "10px 22px" }}>Cancel</button>
//             <button onClick={handleSave} disabled={savingPricing} style={{ ...btnPrimary, padding: "10px 22px", opacity: savingPricing ? 0.6 : 1 }}>
//               {savingPricing ? "Saving…" : "Save Pricing"}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {modalPlan && <DetailsModal plan={modalPlan} breakdowns={breakdowns} onClose={() => setModalPlan(null)} />}
//       {showCoupon && <CouponModal onClose={() => setShowCoupon(false)} mentorId={mentorId} />}

//       {/* Toast */}
//       {toast && (
//         <div style={{
//           position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
//           display: "flex", alignItems: "center", gap: 8,
//           background: toast.type === "success" ? "#1a1a2e" : "#dc2626",
//           color: "#fff", fontFamily: F, fontSize: 13, fontWeight: 600,
//           padding: "10px 20px", borderRadius: 99,
//           boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 100, whiteSpace: "nowrap",
//         }}>
//           {toast.type === "success" ? <IconCheck /> : <IconX size={14} />}
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPricing;

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

/* ─── Static config ─────────────────────────────────────────────────────────── */
const SHARED_PRICE_OPTIONS = {
  experienced: [5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000],
  freshers: [2500, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500, 25000, 27500, 30000, 32500, 35000],
};

const PLANS = [
  { key: "one_month", label: "1 Month", months: 1 },
  { key: "three_months", label: "3 Months", months: 3 },
  { key: "six_months", label: "6 Months", months: 6 },
];

// Empty plan selections (monthly prices the mentor picks from dropdowns)
const EMPTY_SELECTIONS = {
  one_month: { experienced: "", freshers: "" },
  three_months: { experienced: "", freshers: "" },
  six_months: { experienced: "", freshers: "" },
};

// Empty breakdowns — all fields come from API, never computed here
const EMPTY_BREAKDOWNS = {
  one_month: { experienced: null, freshers: null },
  three_months: { experienced: null, freshers: null },
  six_months: { experienced: null, freshers: null },
};

const TIER_META = {
  "1_to_5":  { label: "Starter",     range: "1 – 5 subscribers",  color: "#0091c3" },
  "6_to_20": { label: "Growing",     range: "6 – 20 subscribers",  color: "#7c3aed" },
  "21_plus": { label: "Established", range: "21+ subscribers",     color: "#16a34a" },
};

/* ─── Helpers ───────────────────────────────────────────────────────────────── */
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

/* ─── Icons ──────────────────────────────────────────────────────────────────── */
const F = "'DM Sans', 'Segoe UI', sans-serif";

const IconX = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IconChevron = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={style}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconCal = ({ size = 12 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const IconClock = ({ size = 12 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconTag = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
const btnPrimary = {
  fontFamily: F, background: "#1a1a2e", color: "#fff",
  border: "none", borderRadius: "8px", padding: "8px 18px",
  fontSize: "13px", fontWeight: 600, cursor: "pointer",
  display: "flex", alignItems: "center", gap: "6px", transition: "opacity 0.15s",
};
const btnOutline = {
  fontFamily: F, background: "#fff", color: "#1a1a2e",
  border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 18px",
  fontSize: "13px", fontWeight: 600, cursor: "pointer",
  display: "flex", alignItems: "center", gap: "6px", transition: "background 0.15s",
};

/* ─── Toggle ─────────────────────────────────────────────────────────────────── */
const Toggle = ({ on, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!on)}
    style={{
      width: 40, height: 22, borderRadius: 99,
      background: on ? "#1a1a2e" : "#e2e8f0",
      border: "none", cursor: "pointer", position: "relative",
      transition: "background 0.2s", flexShrink: 0,
    }}
  >
    <span style={{
      position: "absolute", top: 3, left: on ? 19 : 3,
      width: 16, height: 16, borderRadius: "50%",
      background: "#fff", transition: "left 0.2s",
      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    }} />
  </button>
);

/* ─── Tier Banner ────────────────────────────────────────────────────────────── */
// tierDoc comes directly from API — we only read, never compute
const TierBanner = ({ tierDoc, subCount, isEditing }) => {
  if (!tierDoc || isEditing) return null;

  const meta = TIER_META[tierDoc.tier_name] || { label: tierDoc.tier_name, range: "", color: "#94a3b8" };

  // Commission rates come directly from the API tier document
  const rates = [
    { label: "1 mo",  pct: tierDoc.commission?.one_month },
    { label: "3 mo",  pct: tierDoc.commission?.three_months },
    { label: "6 mo",  pct: tierDoc.commission?.six_months },
  ];

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "14px 18px", marginBottom: 18, background: "#fff" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: meta.color, display: "inline-block" }} />
          <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#1a1a2e", margin: 0 }}>
            Commission tier: <span style={{ color: meta.color }}>{meta.label}</span>
          </p>
          <span style={{
            fontFamily: F, fontSize: 10, fontWeight: 600,
            color: meta.color, border: `1px solid ${meta.color}30`,
            background: `${meta.color}10`, padding: "2px 8px", borderRadius: 99,
          }}>{meta.range}</span>
        </div>
        <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>
          {subCount === 0 ? "No active subscribers yet" : `${subCount} active subscriber${subCount !== 1 ? "s" : ""}`}
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, fontWeight: 500 }}>Platform fee:</p>
        {rates.map(({ label, pct }) => (
          <span key={label} style={{
            fontFamily: F, fontSize: 11,
            border: "1px solid #e2e8f0", borderRadius: 99,
            padding: "2px 10px", color: "#475569", background: "#fff",
          }}>
            <b style={{ color: "#1a1a2e" }}>{pct}%</b> {label}
          </span>
        ))}
        <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "0 0 0 auto" }}>+ 9% CGST + 9% SGST</p>
      </div>
    </div>
  );
};

/* ─── Details Modal ──────────────────────────────────────────────────────────── */
// All values shown here come directly from the API breakdown — no computation in this component
const DetailsModal = ({ plan, breakdowns, onClose }) => {
  if (!plan) return null;
  const [activeKey, setActiveKey] = useState(plan);
  const activePlan = PLANS.find((x) => x.key === activeKey);

  // Pull breakdown directly from API response
  const bd = breakdowns[activeKey];
  const exp = bd?.experienced;
  const fre = bd?.freshers;
  const noData = !exp || !fre;

  // Table rows — all values are API fields, nothing is computed here
  const rows = [
    { label: `Mentee pays (${activePlan.months}mo):`,           expVal: exp?.totalPrice,   freVal: fre?.totalPrice,   negative: false },
    { label: `Platform fee (${exp?.platformPct ?? "—"}%):`,     expVal: exp?.platformFee,  freVal: fre?.platformFee,  negative: true  },
    { label: "CGST (9%):",                                       expVal: exp?.cgst,         freVal: fre?.cgst,         negative: true  },
    { label: "SGST (9%):",                                       expVal: exp?.sgst,         freVal: fre?.sgst,         negative: true  },
  ];

  const thStyle = {
    fontFamily: F, fontSize: 11, fontWeight: 700,
    color: "#94a3b8", letterSpacing: "0.5px",
    textTransform: "uppercase", padding: "8px 12px",
    borderBottom: "1.5px solid #e9edf2", background: "#f8fafc", textAlign: "center",
  };
  const tdStyle = {
    fontFamily: F, fontSize: 13, padding: "11px 12px",
    borderBottom: "1px solid #f1f5f9", verticalAlign: "middle",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(15,23,42,0.4)", backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 500, background: "#fff",
          borderRadius: 18, border: "1.5px solid #e2e8f0",
          boxShadow: "0 24px 70px rgba(0,0,0,0.11)",
          overflow: "hidden", margin: "0 16px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 22px 16px", borderBottom: "1px solid #f1f5f9" }}>
          <div>
            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#1a1a2e", margin: "0 0 3px" }}>Payout breakdown</p>
            <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>Server-calculated figures based on your tier</p>
          </div>
          <button
            onClick={onClose}
            style={{ width: 30, height: 30, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0, border: "none" }}
          >
            <IconX size={24} />
          </button>
        </div>

        {/* Plan tabs */}
        <div style={{ display: "flex", margin: "16px 22px", background: "#f8fafc", border: "1.5px solid #e9edf2", borderRadius: 10, overflow: "hidden" }}>
          {PLANS.map((pl) => (
            <button
              key={pl.key}
              onClick={() => setActiveKey(pl.key)}
              style={{
                flex: 1, fontFamily: F, fontSize: 12, fontWeight: 700,
                padding: "9px 0", border: "none", cursor: "pointer",
                background: activeKey === pl.key ? "#1a1a2e" : "transparent",
                color: activeKey === pl.key ? "#fff" : "#94a3b8",
                transition: "all 0.15s",
              }}
            >{pl.label}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ padding: "0 22px 20px" }}>
          {noData ? (
            <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", textAlign: "center", padding: "32px 0" }}>
              No breakdown data for this plan.
            </p>
          ) : (
            <div style={{ border: "1.5px solid #e9edf2", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, textAlign: "left", width: "46%" }} />
                    <th style={thStyle}><span style={{ fontFamily: F, fontSize: 11, color: "#1a1a2e", fontWeight: 800 }}>Experienced</span></th>
                    <th style={thStyle}><span style={{ fontFamily: F, fontSize: 11, color: "#64748b", fontWeight: 800 }}>Freshers</span></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ label, expVal, freVal, negative }) => (
                    <tr key={label}>
                      <td style={{ ...tdStyle, color: "#475569" }}>{label}</td>
                      <td style={{ ...tdStyle, textAlign: "center", color: negative ? "#dc2626" : "#1a1a2e", fontWeight: negative ? 400 : 600 }}>
                        {negative ? "− " : ""}₹{fmtINR(expVal)}
                      </td>
                      <td style={{ ...tdStyle, textAlign: "center", color: negative ? "#dc2626" : "#1a1a2e", fontWeight: negative ? 400 : 600 }}>
                        {negative ? "− " : ""}₹{fmtINR(freVal)}
                      </td>
                    </tr>
                  ))}

                  {/* totalDeducted — from API */}
                  <tr style={{ borderTop: "1px dashed #e2e8f0" }}>
                    <td style={{ ...tdStyle, color: "#94a3b8", fontSize: 11, fontStyle: "italic" }}>Total deducted:</td>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#94a3b8", fontSize: 11 }}>− ₹{fmtINR(exp.totalDeducted)}</td>
                    <td style={{ ...tdStyle, textAlign: "center", color: "#94a3b8", fontSize: 11 }}>− ₹{fmtINR(fre.totalDeducted)}</td>
                  </tr>

                  {/* mentorReceive and perMonthReceive — from API */}
                  <tr style={{ borderTop: "2px solid #e9edf2", background: "#f8fafc" }}>
                    <td style={{ ...tdStyle, color: "#1a1a2e", fontWeight: 800, fontSize: 14 }}>You receive:</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#16a34a", margin: 0 }}>₹{fmtINR(exp.mentorReceive)}</p>
                      {activePlan.months > 1 && (
                        <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "3px 0 0" }}>₹{fmtINR(exp.perMonthReceive)}/mo</p>
                      )}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: "#16a34a", margin: 0 }}>₹{fmtINR(fre.mentorReceive)}</p>
                      {activePlan.months > 1 && (
                        <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: "3px 0 0" }}>₹{fmtINR(fre.perMonthReceive)}/mo</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "0 22px 20px" }}>
          <button
            onClick={onClose}
            style={{ width: "100%", padding: "11px", borderRadius: 10, border: "none", background: "#1a1a2e", color: "#fff", fontFamily: F, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Coupon Modal ───────────────────────────────────────────────────────────── */
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
      mentorId,
      couponCode: code,
      discountValue: Number(discount),
      appliesForDuration: getSelectedDuration(),
      startDate,
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
      one:   coupon.appliesForDuration?.includes(1) || false,
      three: coupon.appliesForDuration?.includes(3) || false,
      six:   coupon.appliesForDuration?.includes(6) || false,
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

  const inputStyle = {
    fontFamily: F, fontSize: 13, color: "#1a1a2e",
    border: "1px solid #e2e8f0", borderRadius: 8,
    padding: "9px 12px", width: "100%",
    outline: "none", background: "#fff", boxSizing: "border-box",
  };
  const labelStyle = {
    fontFamily: F, fontSize: 10, fontWeight: 700,
    color: "#94a3b8", letterSpacing: "0.6px",
    textTransform: "uppercase", display: "block", marginBottom: 5,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", padding: 16,
      }}
    >
      <div
        id="coupon-form-top"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          width: "100%", maxWidth: showList ? 640 : 380,
          maxHeight: "90vh", overflow: "hidden",
          display: "flex", transition: "max-width 0.3s",
        }}
      >
        {/* Form panel */}
        <div style={{
          width: showList ? 300 : "100%", flexShrink: 0,
          display: "flex", flexDirection: "column", gap: 14,
          overflowY: "auto", padding: 20,
          borderRight: showList ? "1px solid #f1f5f9" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconTag size={15} />
              <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
                {editingId ? "Update coupon" : "Create coupon"}
              </p>
            </div>
            <button onClick={onClose} style={{ ...btnOutline, padding: "6px", borderRadius: 8 }}>
              <IconX size={15} />
            </button>
          </div>

          {formError && (
            <div style={{ fontFamily: F, fontSize: 12, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px" }}>
              {formError}
            </div>
          )}

          <div>
            <label style={labelStyle}>Coupon code</label>
            <input
              type="text" placeholder="e.g. ROHAN30" value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              style={{ ...inputStyle, fontFamily: "monospace", letterSpacing: "0.1em" }}
            />
          </div>

          <div>
            <label style={labelStyle}>Discount</label>
            <div style={{ position: "relative" }}>
              <input
                type="number" min={1} max={100} value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                style={{ ...inputStyle, paddingRight: 30 }}
              />
              <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontFamily: F, fontSize: 13, color: "#94a3b8", pointerEvents: "none" }}>%</span>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Applies for</label>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ key: "one", label: "1 mo" }, { key: "three", label: "3 mo" }, { key: "six", label: "6 mo" }].map(({ key, label }) => (
                <label key={key} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: F, fontSize: 13, color: "#475569" }}>
                  <input
                    type="checkbox" checked={durations[key]}
                    onChange={() => setDurations((p) => ({ ...p, [key]: !p[key] }))}
                    style={{ width: 15, height: 15, cursor: "pointer", accentColor: "#1a1a2e" }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Start date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: F, fontSize: 13, color: "#475569" }}>Set expiry date</span>
            <Toggle on={expiry} onChange={setExpiry} />
          </div>

          {expiry && (
            <div>
              <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} style={inputStyle} />
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={resetForm} style={{ ...btnOutline, flex: 1, justifyContent: "center" }}>Reset</button>
            <button onClick={handleSubmit} disabled={creating} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: creating ? 0.6 : 1 }}>
              {editingId ? "Update" : creating ? "Saving…" : "Create"}
            </button>
          </div>

          <button onClick={() => setShowList(!showList)} style={{ ...btnOutline, justifyContent: "center", width: "100%" }}>
            <IconChevron style={{ transform: showList ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            {showList ? "Hide coupons" : "View coupons"}
          </button>
        </div>

        {/* List panel */}
        {showList && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid #f1f5f9", background: "#fff" }}>
              <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>Your coupons</span>
              <span style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", border: "1px solid #e2e8f0", borderRadius: 99, padding: "2px 10px" }}>
                {coupons.length} / 3
              </span>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              {coupons.length > 0 ? coupons.map((coupon) => (
                <div key={coupon._id} style={{ border: `1px solid ${editingId === coupon._id ? "#1a1a2e" : "#e2e8f0"}`, borderRadius: 12, padding: 14, background: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#1a1a2e", letterSpacing: "0.1em" }}>{coupon.couponCode}</span>
                    <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 99 }}>
                      {coupon.discountValue}% off
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
                    <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
                      <IconCal /> {coupon.appliesForDuration?.join(", ")} month{coupon.appliesForDuration?.length > 1 ? "s" : ""}
                    </p>
                    <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
                      <IconClock /> {coupon.expiryDate ? `Expires ${coupon.expiryDate.split("T")[0]}` : "No expiry"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleEdit(coupon)} style={{ ...btnOutline, flex: 1, justifyContent: "center", fontSize: 12, padding: "6px 0" }}>Edit</button>
                    <button onClick={() => handleDelete(coupon._id)} style={{ flex: 1, fontFamily: F, fontSize: 12, fontWeight: 600, color: "#dc2626", background: "#fff", border: "1px solid #fecaca", borderRadius: 8, padding: "6px 0", cursor: "pointer", justifyContent: "center" }}>Delete</button>
                  </div>
                </div>
              )) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 0", gap: 8 }}>
                  <IconTag size={24} />
                  <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: 0 }}>No coupons yet</p>
                  <p style={{ fontFamily: F, fontSize: 11, color: "#cbd5e1", margin: 0 }}>Create your first coupon above</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Pricing Empty State ────────────────────────────────────────────────────── */
const PricingEmptyState = ({ onStart }) => (
  <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
    <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#1a1a2e" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>Set your pricing</h2>
      <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 24px" }}>
        You haven't set your pricing yet. Configure monthly rates for 1, 3, and 6-month plans — for both experienced mentees and freshers.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {PLANS.map((pl) => (
          <div key={pl.key} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#1a1a2e", margin: "0 0 3px" }}>{pl.label}</p>
            <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: 0 }}>LTM Plan</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: "0 0 20px" }}>
        Freshers pricing must always be lower than experienced pricing
      </p>
      <button onClick={onStart} style={{ ...btnPrimary, width: "100%", justifyContent: "center", padding: "12px" }}>
        Set up pricing
      </button>
    </div>
  </div>
);

/* ─── Price Selector ─────────────────────────────────────────────────────────── */
const PriceSelector = ({ tier, value, onChange, disabled }) => {
  const options = SHARED_PRICE_OPTIONS[tier];
  const label = tier === "experienced" ? "Experienced" : "Freshers";
  const color = tier === "experienced" ? "#db2777" : "#7c3aed";

  return (
    <div style={{ flex: 1, padding: "14px 16px" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color, border: `1px solid ${color}30`, background: `${color}10`, padding: "2px 8px", borderRadius: 99 }}>
          {label}
        </span>
      </div>
      <div style={{
        display: "flex", alignItems: "center",
        border: `1px solid ${disabled ? "#f1f5f9" : "#e2e8f0"}`,
        borderRadius: 8, padding: "0 12px", height: 40,
        background: disabled ? "#fafafa" : "#fff",
      }}>
        <span style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", marginRight: 4 }}>₹</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            fontFamily: F, flex: 1, border: "none", outline: "none",
            fontSize: 13, fontWeight: 600, background: "transparent",
            color: disabled ? "#94a3b8" : "#1a1a2e",
            cursor: disabled ? "not-allowed" : "pointer",
            appearance: "none",
          }}
        >
          <option value="" disabled>Select price /month</option>
          {options.map((p) => (
            <option key={p} value={p}>{new Intl.NumberFormat("en-IN").format(p)}/month</option>
          ))}
        </select>
        {!disabled && <IconChevron size={13} style={{ color: "#94a3b8", flexShrink: 0 }} />}
      </div>
    </div>
  );
};

/* ─── Plan Card ──────────────────────────────────────────────────────────────── */
// perMonthReceive shown here comes directly from API breakdown — no frontend math
const PlanCard = ({ plan, selections, breakdowns, isLocked, onChange, onViewDetails }) => {
  const expSelected = Number(selections.experienced) || 0;
  const freSelected = Number(selections.freshers) || 0;
  const hasValues = expSelected > 0 && freSelected > 0;

  // Freshers warning: only basic UI guard — real validation is on the server
  const fresWarn = hasValues && freSelected >= expSelected;

  // These come directly from the API response stored in breakdowns state
  const bdExp = breakdowns[plan.key]?.experienced;
  const bdFre = breakdowns[plan.key]?.freshers;
  const expReceive = bdExp?.perMonthReceive ?? null;   // API field — no computation
  const freReceive = bdFre?.perMonthReceive ?? null;   // API field — no computation

  return (
    <div style={{ background: "#fff", border: `1px solid ${fresWarn ? "#fcd34d" : "#e2e8f0"}`, borderRadius: 12, overflow: "hidden" }}>
      {/* Card header */}
      <div style={{ padding: "12px 18px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{plan.label}</span>
        <span style={{ fontFamily: F, fontSize: 11, color: "#94a3b8" }}>LTM Plan</span>
        {hasValues && isLocked && !fresWarn && (
          <span style={{
            fontFamily: F, fontSize: 10, fontWeight: 700,
            color: "#16a34a", background: "#f0fdf4",
            border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 99,
            display: "flex", alignItems: "center", gap: 4, marginLeft: "auto",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
            Active
          </span>
        )}
      </div>

      {/* Selectors — values are monthly prices the mentor selects */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, borderRight: "1px solid #f1f5f9" }}>
          <PriceSelector
            tier="experienced"
            value={selections.experienced}
            onChange={(val) => onChange(plan.key, "experienced", val)}
            disabled={isLocked}
          />
        </div>
        <div style={{ flex: 1 }}>
          <PriceSelector
            tier="freshers"
            value={selections.freshers}
            onChange={(val) => onChange(plan.key, "freshers", val)}
            disabled={isLocked}
          />
        </div>
      </div>

      {/* Fresher warning */}
      {fresWarn && (
        <div style={{ margin: "0 14px 12px", padding: "8px 12px", background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, fontFamily: F, fontSize: 12, color: "#92400e", display: "flex", alignItems: "center", gap: 6 }}>
          ⚠ Freshers price must be less than the Experienced price
        </div>
      )}

      {/* Earnings row — all values from API breakdown, displayed only after save */}
      {hasValues && isLocked && !fresWarn && (
        <div style={{ margin: "0 14px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #f1f5f9", borderRadius: 10, padding: "10px 14px" }}>
          <p style={{ fontFamily: F, fontSize: 12, color: "#475569", margin: 0 }}>
            You receive / mo:{" "}
            <b style={{ color: "#1a1a2e" }}>{expReceive != null ? `₹${fmtINR(expReceive)}` : "—"}</b>
            <span style={{ color: "#e2e8f0", margin: "0 8px" }}>·</span>
            <b style={{ color: "#1a1a2e" }}>{freReceive != null ? `₹${fmtINR(freReceive)}` : "—"}</b>
          </p>
          <button
            onClick={() => onViewDetails(plan.key)}
            style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "#0091c3", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
          >
            Details
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const MyPricing = () => {
  // `selections` holds the monthly prices the mentor picks in dropdowns (pre-save only)
  const [selections, setSelections] = useState(EMPTY_SELECTIONS);
  // `breakdowns` holds the full server-computed breakdown for each plan, populated from API
  const [breakdowns, setBreakdowns] = useState(EMPTY_BREAKDOWNS);
  // `subCount` comes from the API response — not computed here
  const [subCount, setSubCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [modalPlan, setModalPlan] = useState(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  // tierName from API — used to look up the tierDoc for the banner
  const [savedTierName, setSavedTierName] = useState(null);

  const mentorId = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const { data: pricingData, isLoading: pricingLoading, error: pricingError, refetch: refetchPricing } =
    useGetMyPricingQuery(mentorId, { skip: !mentorId });
  const { data: tiersData, isLoading: tiersLoading, error: tiersError } =
    useGetCommissionTiersQuery();
  const [saveOrUpdatePricing, { isLoading: savingPricing }] = useSaveOrUpdatePricingMutation();

  // Resolve the tier document from API data using the saved tier name
  const currentTierDoc = tiersData?.data?.find(
    (t) => t.tier_name === savedTierName
  ) ?? null;

  useEffect(() => {
    if (!pricingData) return;

    const doc = pricingData?.plans;          // top-level document from DB
    const planDoc = doc?.plans;              // the enriched plans object

    const hasPricing =
      planDoc?.one_month?.monthlyPrice?.experienced &&
      planDoc?.one_month?.monthlyPrice?.freshers &&
      planDoc?.three_months?.monthlyPrice?.experienced &&
      planDoc?.three_months?.monthlyPrice?.freshers &&
      planDoc?.six_months?.monthlyPrice?.experienced &&
      planDoc?.six_months?.monthlyPrice?.freshers;

    if (hasPricing) {
      // Populate dropdown selections from the saved monthly prices (API field: monthlyPrice)
      setSelections({
        one_month:    { experienced: planDoc.one_month.monthlyPrice.experienced,    freshers: planDoc.one_month.monthlyPrice.freshers    },
        three_months: { experienced: planDoc.three_months.monthlyPrice.experienced, freshers: planDoc.three_months.monthlyPrice.freshers },
        six_months:   { experienced: planDoc.six_months.monthlyPrice.experienced,   freshers: planDoc.six_months.monthlyPrice.freshers   },
      });

      // Populate breakdowns directly from API — no computation
      setBreakdowns({
        one_month:    planDoc.one_month.breakdown    ?? { experienced: null, freshers: null },
        three_months: planDoc.three_months.breakdown ?? { experienced: null, freshers: null },
        six_months:   planDoc.six_months.breakdown   ?? { experienced: null, freshers: null },
      });

      // subCount and tier from API
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
    // UI-level guard before hitting the server
    for (const plan of PLANS) {
      const exp = Number(selections[plan.key].experienced) || 0;
      const fre = Number(selections[plan.key].freshers) || 0;
      if (!exp || !fre) return showToast("error", `Set both prices for ${plan.label}`);
      if (fre >= exp) return showToast("error", `${plan.label}: Freshers must be less than Experienced`);
    }

    try {
      const result = await saveOrUpdatePricing({
        mentorId,
        // Send monthly prices — server multiplies by months and computes all breakdowns
        plans: {
          one_month:    { experienced: Number(selections.one_month.experienced),    freshers: Number(selections.one_month.freshers)    },
          three_months: { experienced: Number(selections.three_months.experienced), freshers: Number(selections.three_months.freshers) },
          six_months:   { experienced: Number(selections.six_months.experienced),   freshers: Number(selections.six_months.freshers)   },
        },
      }).unwrap();

      // Update state from API response — never compute anything here
      const savedDoc  = result?.plans;
      const savedPlan = savedDoc?.plans;

      if (savedPlan) {
        setBreakdowns({
          one_month:    savedPlan.one_month?.breakdown    ?? { experienced: null, freshers: null },
          three_months: savedPlan.three_months?.breakdown ?? { experienced: null, freshers: null },
          six_months:   savedPlan.six_months?.breakdown   ?? { experienced: null, freshers: null },
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
      // Restore from last saved API data
      setSelections({
        one_month:    { experienced: planDoc.one_month.monthlyPrice.experienced,    freshers: planDoc.one_month.monthlyPrice.freshers    },
        three_months: { experienced: planDoc.three_months.monthlyPrice.experienced, freshers: planDoc.three_months.monthlyPrice.freshers },
        six_months:   { experienced: planDoc.six_months.monthlyPrice.experienced,   freshers: planDoc.six_months.monthlyPrice.freshers   },
      });
      setSaved(true);
    } else {
      setSelections(EMPTY_SELECTIONS);
      setSaved(false);
    }
  };

  if (pricingLoading || tiersLoading) {
    return (
      <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #e2e8f0", borderTopColor: "#1a1a2e", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: 0 }}>Loading pricing…</p>
        </div>
      </div>
    );
  }

  const realPricingError = pricingError?.status !== 400 ? pricingError : null;
  if (realPricingError || tiersError) {
    return (
      <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center", maxWidth: 340 }}>
          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: "0 0 6px" }}>Failed to load pricing</p>
          <p style={{ fontFamily: F, fontSize: 13, color: "#94a3b8", margin: "0 0 16px" }}>
            {realPricingError?.data?.message || tiersError?.data?.message || "Please try again"}
          </p>
          <button onClick={() => refetchPricing()} style={{ ...btnPrimary, justifyContent: "center", padding: "10px 24px" }}>Retry</button>
        </div>
      </div>
    );
  }

  if (!isEditingNew && !saved && (!selections.one_month.experienced || !selections.three_months.experienced || !selections.six_months.experienced)) {
    return <PricingEmptyState onStart={() => setIsEditingNew(true)} />;
  }

  const isLocked = saved && !isEditingNew;

  return (
    <div style={{ fontFamily: F, background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
        select option { background: #fff; color: #1a1a2e; }
      `}</style>

      {/* Page header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "16px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: F, fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 3px" }}>Pricing</h1>
            {lastUpdated && isLocked && (
              <p style={{ fontFamily: F, fontSize: 11, color: "#94a3b8", margin: 0 }}>
                Last updated: {fmtDate(lastUpdated)}
              </p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setShowCoupon(true)} style={{ ...btnOutline, fontSize: 12 }}>
              <IconTag size={13} /> Coupons
            </button>
            {isLocked ? (
              <button onClick={() => setIsEditingNew(true)} style={{ ...btnOutline, fontSize: 12 }}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            ) : (
              <button onClick={handleSave} disabled={savingPricing} style={{ ...btnPrimary, fontSize: 12, opacity: savingPricing ? 0.6 : 1 }}>
                <IconCheck size={13} />
                {savingPricing ? "Saving…" : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 24px" }}>

        {/* TierBanner reads commission rates directly from tierDoc (API) */}
        <TierBanner tierDoc={currentTierDoc} subCount={subCount} isEditing={!isLocked} />

        {/* Edit notice */}
        {!isLocked && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontFamily: F, fontSize: 12, color: "#92400e" }}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#d97706", flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Editing — changes won't apply until you save. All fee calculations are confirmed at save time.
          </div>
        )}

        {/* Plan cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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

        {/* Footer actions */}
        {!isLocked && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginTop: 20, paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
            <button onClick={handleCancel} style={{ ...btnOutline, padding: "10px 22px" }}>Cancel</button>
            <button onClick={handleSave} disabled={savingPricing} style={{ ...btnPrimary, padding: "10px 22px", opacity: savingPricing ? 0.6 : 1 }}>
              {savingPricing ? "Saving…" : "Save Pricing"}
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {modalPlan && <DetailsModal plan={modalPlan} breakdowns={breakdowns} onClose={() => setModalPlan(null)} />}
      {showCoupon && <CouponModal onClose={() => setShowCoupon(false)} mentorId={mentorId} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 8,
          background: toast.type === "success" ? "#1a1a2e" : "#dc2626",
          color: "#fff", fontFamily: F, fontSize: 13, fontWeight: 600,
          padding: "10px 20px", borderRadius: 99,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)", zIndex: 100, whiteSpace: "nowrap",
        }}>
          {toast.type === "success" ? <IconCheck /> : <IconX size={14} />}
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MyPricing;