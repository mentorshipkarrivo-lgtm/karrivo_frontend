// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Copy, Check, Upload, Shield, CheckCircle, Percent } from "lucide-react";

// const MenteePayment = () => {
//   const navigate = useNavigate();
//   const [copiedPrimary, setCopiedPrimary] = useState(false);
//   const [copiedSecond, setCopiedSecond] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [screenshotName, setScreenshotName] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [discountCode, setDiscountCode] = useState("");

//   const mentorName = "Rahul Sharma";
//   const mentorRole = "Product Manager @ Google";
//   const planMonths = 3;
//   const totalSessions = 12;
//   const basePrice = 14999;
//   const tax = 500;
//   const insurance = 1200;
//   const total = basePrice + tax + insurance;
//   const upiId = "karrivo2024@upi";
//   const secondUpiId = "example.174327728615@sbi";

//   const copy = (text, setter) => {
//     navigator.clipboard.writeText(text);
//     setter(true);
//     setTimeout(() => setter(false), 2000);
//   };

//   if (showSuccess) {
//     return (
//       <div style={{
//         height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
//         background: "#f0f4f8", fontFamily: "'DM Sans', sans-serif"
//       }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>
//         <div style={{
//           background: "#fff", borderRadius: 20, padding: "48px 40px",
//           maxWidth: 420, width: "90%", textAlign: "center",
//           boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
//         }}>
//           <div style={{
//             width: 68, height: 68, borderRadius: "50%",
//             background: "linear-gradient(135deg,#22c55e,#16a34a)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             margin: "0 auto 18px", boxShadow: "0 8px 24px rgba(34,197,94,0.3)"
//           }}>
//             <CheckCircle size={34} color="#fff" />
//           </div>
//           <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>Payment Confirmed!</h2>
//           <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28, lineHeight: 1.6 }}>
//             Your <strong>{planMonths}-month mentorship</strong> with {mentorName} is now active.
//           </p>
//           <button onClick={() => navigate("/")} style={{
//             background: "#0f172a", color: "#fff", border: "none",
//             borderRadius: 50, padding: "12px 32px", fontSize: 14, fontWeight: 700,
//             cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
//           }}>Go to Dashboard →</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       height: "100vh", overflow: "hidden",
//       background: "#eef1f6",
//       fontFamily: "'DM Sans', sans-serif",
//       display: "flex", flexDirection: "column",
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         .inp {
//           width: 100%; padding: 8px 11px; border: 1.5px solid #e2e8f0;
//           border-radius: 8px; font-size: 12px; font-family: 'DM Sans', sans-serif;
//           background: #fff; color: #1e293b; outline: none; transition: border-color 0.18s;
//         }
//         .inp:focus { border-color: #0098cc; box-shadow: 0 0 0 3px rgba(0,152,204,0.1); }
//         .card {
//           background: #fff; border-radius: 14px;
//           border: 1px solid #e2e8f0; box-shadow: 0 1px 6px rgba(0,0,0,0.04);
//         }
//         .lbl {
//           font-size: 9px; font-weight: 700; letter-spacing: 1.1px;
//           text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 10px;
//         }
//         .copy-btn {
//           position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
//           background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
//           width: 24px; height: 24px; display: flex; align-items: center;
//           justify-content: center; cursor: pointer; transition: all 0.15s;
//         }
//         .copy-btn:hover { background: #e0f2fe; border-color: #0098cc; }
//       `}</style>

//       {/* ── Top Bar ── */}
//       <div style={{
//         background: "#fff", borderBottom: "1px solid #e8edf3",
//         padding: "0 24px", height: 50, display: "flex", alignItems: "center",
//         justifyContent: "space-between", flexShrink: 0
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <button onClick={() => navigate(-1)} style={{
//             background: "#f1f5f9", border: "none", borderRadius: 8,
//             width: 30, height: 30, display: "flex", alignItems: "center",
//             justifyContent: "center", cursor: "pointer", color: "#475569"
//           }}>
//             <ArrowLeft size={14} />
//           </button>
//           <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Complete Payment</span>
//           <span style={{ fontSize: 11, color: "#94a3b8" }}>· Long-Term Mentorship · {mentorName}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
//           <Shield size={12} color="#22c55e" />
//           <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Secured Payment</span>
//         </div>
//       </div>

//       {/* ── Body: 3 columns ── */}
//       <div style={{
//         flex: 1, display: "flex", gap: 14, padding: "14px 24px",
//         overflow: "hidden", minHeight: 0
//       }}>

//         {/* ══ COL 1 — QR + Form (flex: 2.2) ══ */}
//         <div className="card" style={{ flex: 2.2, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
//           <span className="lbl">Scan to Pay</span>

//           {/* QR + UPI IDs side by side */}
//           <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
//             {/* Big QR */}
//             <div style={{
//               border: "1.5px solid #e8edf3", borderRadius: 12, padding: 8,
//               background: "#fafafa", flexShrink: 0
//             }}>
//               <img
//                 src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
//                 alt="QR"
//                 style={{ width: 148, height: 148, display: "block", borderRadius: 8 }}
//               />
//               <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 7, fontWeight: 500 }}>
//                 PhonePe · GPay · Paytm
//               </p>
//             </div>

//             {/* UPI IDs + OR */}
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
//                 <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
//                 <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 700 }}>OR USE UPI ID</span>
//                 <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
//               </div>

//               <div>
//                 <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Primary UPI ID</span>
//                 <div style={{ position: "relative" }}>
//                   <input className="inp" value={upiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
//                   <button className="copy-btn" onClick={() => copy(upiId, setCopiedPrimary)}>
//                     {copiedPrimary ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Secondary UPI ID</span>
//                 <div style={{ position: "relative" }}>
//                   <input className="inp" value={secondUpiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
//                   <button className="copy-btn" onClick={() => copy(secondUpiId, setCopiedSecond)}>
//                     {copiedSecond ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
//                   </button>
//                 </div>
//               </div>

//               <div style={{
//                 background: "#fffbeb", border: "1px solid #fde68a",
//                 borderRadius: 8, padding: "8px 11px"
//               }}>
//                 <p style={{ fontSize: 10, color: "#92400e", lineHeight: 1.55 }}>
//                   <strong>Pay exactly ₹{total.toLocaleString("en-IN")}</strong> — wrong amounts delay activation up to 48h.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

//           {/* Upload + Transaction side by side */}
//           <div style={{ display: "flex", gap: 12 }}>
//             <div style={{ flex: 1 }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Payment Screenshot</span>
//               <label style={{
//                 display: "flex", alignItems: "center", gap: 8,
//                 border: `1.5px dashed ${screenshotName ? "#86efac" : "#cbd5e1"}`,
//                 borderRadius: 9, padding: "9px 12px", cursor: "pointer",
//                 background: screenshotName ? "#f0fdf4" : "#fafbfc", transition: "all 0.2s",
//                 height: 40
//               }}>
//                 <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: "none" }}
//                   onChange={e => { if (e.target.files[0]) setScreenshotName(e.target.files[0].name); }} />
//                 <Upload size={13} color={screenshotName ? "#16a34a" : "#94a3b8"} />
//                 <span style={{ fontSize: 11, color: screenshotName ? "#15803d" : "#64748b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                   {screenshotName || "Upload screenshot"}
//                 </span>
//               </label>
//             </div>

//             <div style={{ flex: 1 }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Transaction / UTR ID</span>
//               <input
//                 className="inp"
//                 placeholder="e.g. T2312XXXXXXX"
//                 value={transactionId}
//                 onChange={e => setTransactionId(e.target.value.toUpperCase())}
//                 style={{ letterSpacing: "0.4px", height: 40 }}
//               />
//             </div>
//           </div>

//           {/* CTA */}
//           <button
//             onClick={() => setShowSuccess(true)}
//             style={{
//               width: "100%", background: "linear-gradient(135deg,#0098cc,#005f8a)",
//               color: "#fff", border: "none", borderRadius: 9,
//               padding: "11px", fontSize: 14, fontWeight: 700,
//               cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
//               boxShadow: "0 4px 14px rgba(0,152,204,0.3)", marginTop: "auto"
//             }}
//           >
//             Confirm Payment — ₹{total.toLocaleString("en-IN")}
//           </button>
//         </div>

//         {/* ══ COL 2 — Summary (flex: 2) ══ */}
//         <div className="card" style={{ flex: 2, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 11, minWidth: 0 }}>
//           <span className="lbl">Summary</span>
//           <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, marginTop: -4 }}>
//             Total includes plan fee, platform tax and session insurance.
//           </p>

//           {/* Mentor */}
//           <div style={{
//             display: "flex", alignItems: "center", gap: 10,
//             background: "#f8fafc", borderRadius: 10, padding: "9px 11px",
//             border: "1px solid #e8edf3"
//           }}>
//             <div style={{
//               width: 34, height: 34, borderRadius: "50%",
//               background: "linear-gradient(135deg,#0098cc,#005f8a)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0
//             }}>{mentorName[0]}</div>
//             <div style={{ minWidth: 0 }}>
//               <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{mentorName}</p>
//               <p style={{ fontSize: 10, color: "#64748b" }}>{mentorRole}</p>
//             </div>
//             <span style={{
//               marginLeft: "auto", fontSize: 9, fontWeight: 800,
//               background: "#1d4ed8", color: "#fff",
//               padding: "2px 8px", borderRadius: 20, letterSpacing: "0.4px", flexShrink: 0
//             }}>LTM</span>
//           </div>

//           {/* Plan */}
//           <div style={{
//             background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
//             borderRadius: 8, padding: "9px 12px",
//             display: "flex", justifyContent: "space-between", alignItems: "center",
//             border: "1px solid #bfdbfe"
//           }}>
//             <div>
//               <p style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8" }}>{planMonths} Month Plan</p>
//               <p style={{ fontSize: 10, color: "#3b82f6" }}>{totalSessions} sessions</p>
//             </div>
//             <p style={{ fontSize: 13, fontWeight: 800, color: "#1d4ed8" }}>₹{basePrice.toLocaleString("en-IN")}</p>
//           </div>

//           {/* Breakdown */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
//             {[
//               { label: "Shipping", val: `₹${basePrice.toLocaleString("en-IN")}` },
//               { label: "Tax", val: `₹${tax.toLocaleString("en-IN")}` },
//               { label: "Insurance", val: `₹${insurance.toLocaleString("en-IN")}` },
//             ].map((r, i) => (
//               <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, color: "#64748b" }}>{r.label}</span>
//                 <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{r.val}</span>
//               </div>
//             ))}
//           </div>

//           <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

//           {/* Discount */}
//           <div style={{ display: "flex", gap: 8 }}>
//             <div style={{ position: "relative", flex: 1 }}>
//               <Percent size={11} color="#94a3b8" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
//               <input className="inp" placeholder="Discount code" value={discountCode}
//                 onChange={e => setDiscountCode(e.target.value.toUpperCase())}
//                 style={{ paddingLeft: 25, fontSize: 11 }} />
//             </div>
//             <button style={{
//               background: "#0f172a", color: "#fff", border: "none",
//               borderRadius: 8, padding: "0 14px", fontSize: 11,
//               fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
//             }}>Apply</button>
//           </div>

//           {/* Total */}
//           <div style={{
//             background: "#0f172a", borderRadius: 10,
//             padding: "12px 16px", display: "flex",
//             justifyContent: "space-between", alignItems: "center", marginTop: "auto"
//           }}>
//             <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Total Due</span>
//             <span style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", letterSpacing: "-0.5px" }}>
//               ₹{total.toLocaleString("en-IN")}
//             </span>
//           </div>
//         </div>

//         {/* ══ COL 3 — How to Pay (flex: 1.3 — narrower) ══ */}
//         <div className="card" style={{ flex: 1.3, padding: "18px 16px", display: "flex", flexDirection: "column", minWidth: 0 }}>
//           <span className="lbl">How to Pay</span>
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
//             {[
//               { n: "01", color: "#0098cc", bg: "#e0f2fe", border: "#bae6fd", title: "Scan QR or Copy UPI", desc: "Use any UPI app. Tap scan QR or pay via UPI ID from the left panel." },
//               { n: "02", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", title: "Enter Exact Amount", desc: `Pay exactly ₹${total.toLocaleString("en-IN")}. Wrong amounts delay activation.` },
//               { n: "03", color: "#d97706", bg: "#fef3c7", border: "#fde68a", title: "Screenshot Confirmation", desc: "Capture confirmation showing Transaction ID and amount clearly." },
//               { n: "04", color: "#16a34a", bg: "#dcfce7", border: "#bbf7d0", title: "Upload & Confirm", desc: "Paste UTR ID, upload screenshot, hit Confirm. Activates in ~2 hours." },
//             ].map((s, i) => (
//               <div key={i} style={{
//                 flex: 1, background: "#fafbfc", borderRadius: 10,
//                 border: `1px solid ${s.border}`,
//                 padding: "10px 13px", display: "flex", gap: 11, alignItems: "flex-start",
//                 minHeight: 0
//               }}>
//                 <div style={{
//                   width: 26, height: 26, borderRadius: "50%",
//                   background: s.bg, color: s.color,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1
//                 }}>{s.n}</div>
//                 <div>
//                   <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{s.title}</p>
//                   <p style={{ fontSize: 10.5, color: "#64748b", lineHeight: 1.55 }}>{s.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MenteePayment;

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft, Copy, Check, Upload, Shield, CheckCircle, Percent } from "lucide-react";

// const MenteePayment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ── All data comes from MentorLTMPlans via router state ──
//   const {
//     mentorName,
//     mentorRole,
//     planMonths,
//     totalSessions,
//     basePrice,
//   } = location.state || {};

//   const tax = 500;
//   const insurance = 1200;
//   const total = basePrice 

//   const [copiedPrimary, setCopiedPrimary] = useState(false);
//   const [copiedSecond, setCopiedSecond] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [screenshotName, setScreenshotName] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [discountCode, setDiscountCode] = useState("");

//   const upiId = "karrivo2024@upi";
//   const secondUpiId = "example.174327728615@sbi";

//   const copy = (text, setter) => {
//     navigator.clipboard.writeText(text);
//     setter(true);
//     setTimeout(() => setter(false), 2000);
//   };

//   // ── Guard: if no state was passed, redirect back ──
//   if (!location.state || !basePrice) {
//     return (
//       <div style={{
//         height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
//         background: "#eef1f6", fontFamily: "'DM Sans', sans-serif"
//       }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>
//         <div style={{ textAlign: "center" }}>
//           <p style={{ color: "#64748b", marginBottom: 16, fontSize: 14 }}>
//             No plan selected. Please go back and choose a plan.
//           </p>
//           <button onClick={() => navigate(-1)} style={{
//             background: "#0f172a", color: "#fff", border: "none",
//             borderRadius: 50, padding: "10px 24px", fontSize: 13, fontWeight: 700,
//             cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
//           }}>← Go Back</button>
//         </div>
//       </div>
//     );
//   }

//   if (showSuccess) {
//     return (
//       <div style={{
//         height: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
//         background: "#f0f4f8", fontFamily: "'DM Sans', sans-serif"
//       }}>
//         <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');`}</style>
//         <div style={{
//           background: "#fff", borderRadius: 20, padding: "48px 40px",
//           maxWidth: 420, width: "90%", textAlign: "center",
//           boxShadow: "0 20px 60px rgba(0,0,0,0.1)"
//         }}>
//           <div style={{
//             width: 68, height: 68, borderRadius: "50%",
//             background: "linear-gradient(135deg,#22c55e,#16a34a)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             margin: "0 auto 18px", boxShadow: "0 8px 24px rgba(34,197,94,0.3)"
//           }}>
//             <CheckCircle size={34} color="#fff" />
//           </div>
//           <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
//             Payment Confirmed!
//           </h2>
//           <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28, lineHeight: 1.6 }}>
//             Your <strong>{planMonths}-month mentorship</strong> with {mentorName} is now active.
//           </p>
//           <button onClick={() => navigate("/")} style={{
//             background: "#0f172a", color: "#fff", border: "none",
//             borderRadius: 50, padding: "12px 32px", fontSize: 14, fontWeight: 700,
//             cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
//           }}>Go to Dashboard →</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       height: "100vh", overflow: "hidden",
//       background: "#eef1f6",
//       fontFamily: "'DM Sans', sans-serif",
//       display: "flex", flexDirection: "column",
//     }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         .inp {
//           width: 100%; padding: 8px 11px; border: 1.5px solid #e2e8f0;
//           border-radius: 8px; font-size: 12px; font-family: 'DM Sans', sans-serif;
//           background: #fff; color: #1e293b; outline: none; transition: border-color 0.18s;
//         }
//         .inp:focus { border-color: #0098cc; box-shadow: 0 0 0 3px rgba(0,152,204,0.1); }
//         .card {
//           background: #fff; border-radius: 14px;
//           border: 1px solid #e2e8f0; box-shadow: 0 1px 6px rgba(0,0,0,0.04);
//         }
//         .lbl {
//           font-size: 9px; font-weight: 700; letter-spacing: 1.1px;
//           text-transform: uppercase; color: #94a3b8; display: block; margin-bottom: 10px;
//         }
//         .copy-btn {
//           position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
//           background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;
//           width: 24px; height: 24px; display: flex; align-items: center;
//           justify-content: center; cursor: pointer; transition: all 0.15s;
//         }
//         .copy-btn:hover { background: #e0f2fe; border-color: #0098cc; }
//       `}</style>

//       {/* ── Top Bar ── */}
//       <div style={{
//         background: "#fff", borderBottom: "1px solid #e8edf3",
//         padding: "0 24px", height: 50, display: "flex", alignItems: "center",
//         justifyContent: "space-between", flexShrink: 0
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <button onClick={() => navigate(-1)} style={{
//             background: "#f1f5f9", border: "none", borderRadius: 8,
//             width: 30, height: 30, display: "flex", alignItems: "center",
//             justifyContent: "center", cursor: "pointer", color: "#475569"
//           }}>
//             <ArrowLeft size={14} />
//           </button>
//           <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Complete Payment</span>
//           <span style={{ fontSize: 11, color: "#94a3b8" }}>· Long-Term Mentorship · {mentorName}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
//           <Shield size={12} color="#22c55e" />
//           <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>Secured Payment</span>
//         </div>
//       </div>

//       {/* ── Body: 3 columns ── */}
//       <div style={{
//         flex: 1, display: "flex", gap: 14, padding: "14px 24px",
//         overflow: "hidden", minHeight: 0
//       }}>

//         {/* ══ COL 1 — QR + Form ══ */}
//         <div className="card" style={{ flex: 2.2, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
//           <span className="lbl">Scan to Pay</span>

//           <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
//             {/* QR */}
//             <div style={{
//               border: "1.5px solid #e8edf3", borderRadius: 12, padding: 8,
//               background: "#fafafa", flexShrink: 0
//             }}>
//               <img
//                 src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
//                 alt="QR"
//                 style={{ width: 148, height: 148, display: "block", borderRadius: 8 }}
//               />
//               <p style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 7, fontWeight: 500 }}>
//                 PhonePe · GPay · Paytm
//               </p>
//             </div>

//             {/* UPI IDs */}
//             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
//                 <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
//                 <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 700 }}>OR USE UPI ID</span>
//                 <div style={{ flex: 1, height: 1, background: "#f1f5f9" }} />
//               </div>

//               <div>
//                 <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Primary UPI ID</span>
//                 <div style={{ position: "relative" }}>
//                   <input className="inp" value={upiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
//                   <button className="copy-btn" onClick={() => copy(upiId, setCopiedPrimary)}>
//                     {copiedPrimary ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Secondary UPI ID</span>
//                 <div style={{ position: "relative" }}>
//                   <input className="inp" value={secondUpiId} readOnly style={{ paddingRight: 34, fontWeight: 600, background: "#f8fafc" }} />
//                   <button className="copy-btn" onClick={() => copy(secondUpiId, setCopiedSecond)}>
//                     {copiedSecond ? <Check size={10} color="#22c55e" /> : <Copy size={10} color="#64748b" />}
//                   </button>
//                 </div>
//               </div>

//               <div style={{
//                 background: "#fffbeb", border: "1px solid #fde68a",
//                 borderRadius: 8, padding: "8px 11px"
//               }}>
//                 <p style={{ fontSize: 10, color: "#92400e", lineHeight: 1.55 }}>
//                   <strong>Pay exactly ₹{total.toLocaleString("en-IN")}</strong> — wrong amounts delay activation up to 48h.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

//           {/* Upload + Transaction */}
//           <div style={{ display: "flex", gap: 12 }}>
//             <div style={{ flex: 1 }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Payment Screenshot</span>
//               <label style={{
//                 display: "flex", alignItems: "center", gap: 8,
//                 border: `1.5px dashed ${screenshotName ? "#86efac" : "#cbd5e1"}`,
//                 borderRadius: 9, padding: "9px 12px", cursor: "pointer",
//                 background: screenshotName ? "#f0fdf4" : "#fafbfc", transition: "all 0.2s",
//                 height: 40
//               }}>
//                 <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: "none" }}
//                   onChange={e => { if (e.target.files[0]) setScreenshotName(e.target.files[0].name); }} />
//                 <Upload size={13} color={screenshotName ? "#16a34a" : "#94a3b8"} />
//                 <span style={{ fontSize: 11, color: screenshotName ? "#15803d" : "#64748b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                   {screenshotName || "Upload screenshot"}
//                 </span>
//               </label>
//             </div>

//             <div style={{ flex: 1 }}>
//               <span style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.8px", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Transaction / UTR ID</span>
//               <input
//                 className="inp"
//                 placeholder="e.g. T2312XXXXXXX"
//                 value={transactionId}
//                 onChange={e => setTransactionId(e.target.value.toUpperCase())}
//                 style={{ letterSpacing: "0.4px", height: 40 }}
//               />
//             </div>
//           </div>

//           {/* CTA */}
//           <button
//             onClick={() => setShowSuccess(true)}
//             style={{
//               width: "100%", background: "linear-gradient(135deg,#0098cc,#005f8a)",
//               color: "#fff", border: "none", borderRadius: 9,
//               padding: "11px", fontSize: 14, fontWeight: 700,
//               cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
//               boxShadow: "0 4px 14px rgba(0,152,204,0.3)", marginTop: "auto"
//             }}
//           >
//             Confirm Payment — ₹{total.toLocaleString("en-IN")}
//           </button>
//         </div>

//         {/* ══ COL 2 — Summary ══ */}
//         <div className="card" style={{ flex: 2, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 11, minWidth: 0 }}>
//           <span className="lbl">Summary</span>
//           <p style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, marginTop: -4 }}>
//             Total includes plan fee, platform tax and session insurance.
//           </p>

//           {/* Mentor */}
//           <div style={{
//             display: "flex", alignItems: "center", gap: 10,
//             background: "#f8fafc", borderRadius: 10, padding: "9px 11px",
//             border: "1px solid #e8edf3"
//           }}>
//             <div style={{
//               width: 34, height: 34, borderRadius: "50%",
//               background: "linear-gradient(135deg,#0098cc,#005f8a)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0
//             }}>
//               {mentorName?.[0]}
//             </div>
//             <div style={{ minWidth: 0 }}>
//               <p style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>{mentorName}</p>
//               <p style={{ fontSize: 10, color: "#64748b" }}>{mentorRole}</p>
//             </div>
//             <span style={{
//               marginLeft: "auto", fontSize: 9, fontWeight: 800,
//               background: "#1d4ed8", color: "#fff",
//               padding: "2px 8px", borderRadius: 20, letterSpacing: "0.4px", flexShrink: 0
//             }}>LTM</span>
//           </div>

//           {/* Plan */}
//           <div style={{
//             background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
//             borderRadius: 8, padding: "9px 12px",
//             display: "flex", justifyContent: "space-between", alignItems: "center",
//             border: "1px solid #bfdbfe"
//           }}>
//             <div>
//               <p style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8" }}>{planMonths} Month Plan</p>
//               <p style={{ fontSize: 10, color: "#3b82f6" }}>{totalSessions} sessions</p>
//             </div>
//             <p style={{ fontSize: 13, fontWeight: 800, color: "#1d4ed8" }}>
//               ₹{basePrice?.toLocaleString("en-IN")}
//             </p>
//           </div>

//           {/* Breakdown */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
//             {[
//               { label: "Plan Price", val: `₹${basePrice?.toLocaleString("en-IN")}` },

//             ].map((r, i) => (
//               <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span style={{ fontSize: 12, color: "#64748b" }}>{r.label}</span>
//                 <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{r.val}</span>
//               </div>
//             ))}
//           </div>

//           <div style={{ borderTop: "1.5px solid #f1f5f9" }} />

//           {/* Discount */}
//           <div style={{ display: "flex", gap: 8 }}>
//             <div style={{ position: "relative", flex: 1 }}>
//               <Percent size={11} color="#94a3b8" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
//               <input className="inp" placeholder="Discount code" value={discountCode}
//                 onChange={e => setDiscountCode(e.target.value.toUpperCase())}
//                 style={{ paddingLeft: 25, fontSize: 11 }} />
//             </div>
//             <button style={{
//               background: "#0f172a", color: "#fff", border: "none",
//               borderRadius: 8, padding: "0 14px", fontSize: 11,
//               fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif"
//             }}>Apply</button>
//           </div>

//           {/* Total */}
//           <div style={{
//             background: "#0f172a", borderRadius: 10,
//             padding: "12px 16px", display: "flex",
//             justifyContent: "space-between", alignItems: "center", marginTop: "auto"
//           }}>
//             <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Total Due</span>
//             <span style={{ fontSize: 20, fontWeight: 800, color: "#38bdf8", letterSpacing: "-0.5px" }}>
//               ₹{total.toLocaleString("en-IN")}
//             </span>
//           </div>
//         </div>

//         {/* ══ COL 3 — How to Pay ══ */}
//         <div className="card" style={{ flex: 1.3, padding: "18px 16px", display: "flex", flexDirection: "column", minWidth: 0 }}>
//           <span className="lbl">How to Pay</span>
//           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
//             {[
//               { n: "01", color: "#0098cc", bg: "#e0f2fe", border: "#bae6fd", title: "Scan QR or Copy UPI", desc: "Use any UPI app. Tap scan QR or pay via UPI ID from the left panel." },
//               { n: "02", color: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe", title: "Enter Exact Amount", desc: `Pay exactly ₹${total.toLocaleString("en-IN")}. Wrong amounts delay activation.` },
//               { n: "03", color: "#d97706", bg: "#fef3c7", border: "#fde68a", title: "Screenshot Confirmation", desc: "Capture confirmation showing Transaction ID and amount clearly." },
//               { n: "04", color: "#16a34a", bg: "#dcfce7", border: "#bbf7d0", title: "Upload & Confirm", desc: "Paste UTR ID, upload screenshot, hit Confirm. Activates in ~2 hours." },
//             ].map((s, i) => (
//               <div key={i} style={{
//                 flex: 1, background: "#fafbfc", borderRadius: 10,
//                 border: `1px solid ${s.border}`,
//                 padding: "10px 13px", display: "flex", gap: 11, alignItems: "flex-start",
//                 minHeight: 0
//               }}>
//                 <div style={{
//                   width: 26, height: 26, borderRadius: "50%",
//                   background: s.bg, color: s.color,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1
//                 }}>{s.n}</div>
//                 <div>
//                   <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", marginBottom: 3 }}>{s.title}</p>
//                   <p style={{ fontSize: 10.5, color: "#64748b", lineHeight: 1.55 }}>{s.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MenteePayment;



// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Copy, Check, Upload, Shield, CheckCircle,
//   Lock, ChevronRight, AlertCircle, X, QrCode, Link2
// } from "lucide-react";
// import {storage}  from "../../../../../firebase"
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export default function MenteePayment() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { mentorName, mentorRole, planMonths, totalSessions, basePrice } = location.state || {};
//   const total = basePrice;

//   const [copiedPrimary, setCopiedPrimary] = useState(false);
//   const [copiedSecond,  setCopiedSecond]  = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [screenshotName, setScreenshotName] = useState("");
//   const [showSuccess, setShowSuccess]     = useState(false);
//   const [discountCode, setDiscountCode]   = useState("");
//   const [screenshotUrl, setScreenshotUrl] = useState("");
//   const [uploading, setUploading]         = useState(false);
//   const [uploadError, setUploadError]     = useState("");
//   const [activeTab, setActiveTab]         = useState("qr");

//   const upiId       = "karrivo2024@upi";
//   const secondUpiId = "example.174327728615@sbi";

//   const copy = (text, setter) => {
//     navigator.clipboard.writeText(text);
//     setter(true);
//     setTimeout(() => setter(false), 2000);
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setScreenshotName(file.name);
//     setUploading(true);
//     setUploadError("");
//     setScreenshotUrl("");
//     try {
//       const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
//       await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(storageRef);
//       setScreenshotUrl(url);
//     } catch (err) {
//       setUploadError("Upload failed. Please try again.");
//       setScreenshotName("");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleConfirm = () => {
//     if (!screenshotUrl)        { setUploadError("Please upload your payment screenshot."); return; }
//     if (!transactionId.trim()) { setUploadError("Please enter your Transaction / UTR ID."); return; }
//     setUploadError("");
//     setShowSuccess(true);
//   };

//   /* ── Guard ── */
//   if (!location.state || !basePrice) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-slate-100">
//         <div className="text-center px-6">
//           <p className="text-slate-500 text-sm mb-4">No plan selected. Please go back.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
//           >
//             ← Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Success ── */
//   if (showSuccess) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-slate-100">
//         <div className="bg-white rounded-2xl p-10 max-w-sm w-11/12 text-center shadow-xl">
//           <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
//             <CheckCircle size={30} color="#fff" />
//           </div>
//           <h2 className="text-xl font-extrabold text-slate-900 mb-2">Payment Submitted!</h2>
//           <p className="text-sm text-slate-500 mb-1 leading-relaxed">
//             Your <span className="font-bold text-slate-700">{planMonths}-month mentorship</span> with{" "}
//             <span className="font-bold text-slate-700">{mentorName}</span> is being activated.
//           </p>
//           <p className="text-xs text-slate-400 mb-7">Verification and activation within 2 hours.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm"
//           >
//             Go to Dashboard →
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ── Main ── */
//   return (
//     <div className="h-screen overflow-hidden bg-slate-200 flex items-center justify-center p-3">
//       <div className="w-full max-w-[820px] h-full max-h-[660px] flex rounded-2xl overflow-hidden shadow-2xl">

//         {/* ══ LEFT PANEL ══ */}
//         <div className="w-60 shrink-0 bg-[#0f172a] flex flex-col p-5 overflow-hidden">

//           {/* Mentor */}
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
//               {mentorName?.[0]}
//             </div>
//             <div className="min-w-0">
//               <p className="text-white font-bold text-sm leading-tight truncate">{mentorName}</p>
//               <p className="text-slate-400 text-[11px] truncate">{mentorRole}</p>
//             </div>
//           </div>

//           {/* Amount */}
//           <div className="mb-4">
//             <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Amount</p>
//             <p className="text-white text-3xl font-extrabold tracking-tight leading-none">
//               ₹{total?.toLocaleString("en-IN")}
//             </p>
//           </div>

//           {/* Plan card */}
//           <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-slate-400 text-[11px]">Duration</span>
//               <span className="text-white text-[11px] font-bold">{planMonths} Months</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-slate-400 text-[11px]">Sessions</span>
//               <span className="text-white text-[11px] font-bold">{totalSessions}</span>
//             </div>
//             <div className="border-t border-white/10 pt-2 flex justify-between items-center">
//               <span className="text-slate-300 text-xs font-semibold">Plan price</span>
//               <span className="text-white text-sm font-extrabold">₹{basePrice?.toLocaleString("en-IN")}</span>
//             </div>
//           </div>

//           {/* Steps */}
//           <div className="flex-1 min-h-0 overflow-hidden">
//             <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest mb-2">How it works</p>
//             <div className="space-y-2">
//               {[
//                 { color: "bg-indigo-500/20 text-indigo-400", n: "1", t: "Scan QR or copy UPI",  d: "PhonePe, GPay, Paytm" },
//                 { color: "bg-emerald-500/20 text-emerald-400", n: "2", t: "Upload screenshot",  d: "Capture confirmation" },
//                 { color: "bg-amber-500/20 text-amber-400",   n: "3", t: "Enter UTR ID",         d: "12-digit reference" },
//                 { color: "bg-pink-500/20 text-pink-400",     n: "4", t: "Confirm & activate",   d: "Ready in ~2 hours" },
//               ].map(s => (
//                 <div key={s.n} className="flex items-start gap-2">
//                   <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-extrabold ${s.color}`}>
//                     {s.n}
//                   </div>
//                   <div>
//                     <p className="text-white/80 text-[10px] font-semibold leading-tight">{s.t}</p>
//                     <p className="text-slate-500 text-[9px]">{s.d}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Trust */}
//           <div className="flex items-center gap-1.5 pt-3 border-t border-white/10 mt-3">
//             <Shield size={10} className="text-emerald-400 shrink-0" />
//             <span className="text-slate-500 text-[9px]">Secured by Karrivo</span>
//           </div>
//         </div>

//         {/* ══ RIGHT PANEL ══ */}
//         <div className="flex-1 bg-white flex flex-col overflow-hidden">

//           {/* Scrollable area */}
//           <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2 space-y-3">

//             {/* Title */}
//             <div>
//               <p className="text-base font-extrabold text-slate-900 tracking-tight">Complete your payment</p>
//               <p className="text-[11px] text-slate-400 mt-0.5">Pay via UPI · ₹{total?.toLocaleString("en-IN")}</p>
//             </div>

//             {/* Tabs */}
//             <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
//               {[
//                 { id: "qr",  Icon: QrCode, label: "Scan QR" },
//                 { id: "upi", Icon: Link2,  label: "UPI ID"  },
//               ].map(({ id, Icon, label }) => (
//                 <button
//                   key={id}
//                   onClick={() => setActiveTab(id)}
//                   className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
//                     activeTab === id
//                       ? "bg-white text-slate-900 shadow-sm"
//                       : "text-slate-400 hover:text-slate-600"
//                   }`}
//                 >
//                   <Icon size={12} />
//                   {label}
//                 </button>
//               ))}
//             </div>

//             {/* QR Tab */}
//             {activeTab === "qr" && (
//               <div className="flex flex-col items-center gap-3">
//                 <div className="border border-slate-200 rounded-2xl p-3 shadow-sm">
//                   <img
//                     src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
//                     alt="UPI QR"
//                     className="w-32 h-32 rounded-lg block"
//                   />
//                 </div>
//                 <div className="flex gap-1.5 flex-wrap justify-center">
//                   {["PhonePe", "Google Pay", "Paytm", "BHIM"].map(a => (
//                     <span key={a} className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-md px-2 py-1">
//                       {a}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex gap-2 items-start">
//                   <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
//                   <p className="text-[11px] text-amber-800 leading-relaxed">
//                     Pay exactly <span className="font-bold">₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation by 48h.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* UPI Tab */}
//             {activeTab === "upi" && (
//               <div className="space-y-2.5">
//                 {[
//                   { label: "Primary UPI ID",   val: upiId,       copied: copiedPrimary, setter: setCopiedPrimary },
//                   { label: "Secondary UPI ID", val: secondUpiId, copied: copiedSecond,  setter: setCopiedSecond },
//                 ].map(row => (
//                   <div key={row.label}>
//                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{row.label}</p>
//                     <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
//                       <span className="text-xs font-semibold text-slate-700 flex-1 break-all">{row.val}</span>
//                       <button
//                         onClick={() => copy(row.val, row.setter)}
//                         className="flex items-center gap-1 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0"
//                       >
//                         {row.copied ? <Check size={9} /> : <Copy size={9} />}
//                         {row.copied ? "Copied" : "Copy"}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex gap-2 items-start">
//                   <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
//                   <p className="text-[11px] text-amber-800 leading-relaxed">
//                     Pay exactly <span className="font-bold">₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Divider */}
//             <div className="flex items-center gap-2">
//               <div className="flex-1 h-px bg-slate-100" />
//               <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap">After Payment</span>
//               <div className="flex-1 h-px bg-slate-100" />
//             </div>

//             {/* Upload */}
//             <div>
//               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
//                 Payment Screenshot <span className="text-red-400">*</span>
//               </p>
//               <label className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-4 cursor-pointer transition-all ${
//                 uploading
//                   ? "border-blue-300 bg-blue-50 cursor-not-allowed"
//                   : screenshotUrl
//                     ? "border-emerald-400 bg-emerald-50 border-solid"
//                     : "border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50"
//               }`}>
//                 <input
//                   type="file"
//                   accept=".jpg,.jpeg,.png,.jfif"
//                   className="hidden"
//                   disabled={uploading}
//                   onChange={e => handleFileUpload(e.target.files[0])}
//                 />
//                 {uploading ? (
//                   <>
//                     <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
//                       <Upload size={13} className="text-blue-500" />
//                     </div>
//                     <p className="text-xs font-semibold text-blue-600">Uploading...</p>
//                   </>
//                 ) : screenshotUrl ? (
//                   <>
//                     <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
//                       <Check size={14} className="text-emerald-600" />
//                     </div>
//                     <p className="text-xs font-bold text-emerald-700">Uploaded successfully</p>
//                     <p className="text-[10px] text-emerald-500 max-w-[200px] truncate">{screenshotName}</p>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
//                       <Upload size={13} className="text-slate-400" />
//                     </div>
//                     <p className="text-xs font-semibold text-slate-600">Click to upload screenshot</p>
//                     <p className="text-[10px] text-slate-400">JPG, PNG up to 5MB</p>
//                   </>
//                 )}
//               </label>
//             </div>

//             {/* UTR */}
//             <div>
//               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
//                 Transaction / UTR ID <span className="text-red-400">*</span>
//               </p>
//               <input
//                 className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:font-normal placeholder:text-slate-400"
//                 placeholder="e.g. T2312XXXXXXX"
//                 value={transactionId}
//                 onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(""); }}
//               />
//               <p className="text-[9px] text-slate-400 mt-1">Find this in your UPI app under payment history</p>
//             </div>

//             {/* Discount */}
//             <div className="flex gap-2">
//               <input
//                 className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
//                 placeholder="Discount code (optional)"
//                 value={discountCode}
//                 onChange={e => setDiscountCode(e.target.value.toUpperCase())}
//               />
//               <button className="bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-4 rounded-xl hover:bg-slate-200 transition-all">
//                 Apply
//               </button>
//             </div>

//             {/* Error */}
//             {uploadError && (
//               <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
//                 <X size={12} className="text-red-500 shrink-0" />
//                 <p className="text-xs font-medium text-red-600">{uploadError}</p>
//               </div>
//             )}
//           </div>

//           {/* ── Sticky footer ── */}
//           <div className="border-t border-slate-100 px-5 py-3 bg-white space-y-2 shrink-0">

//             {/* Total row */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
//                 <Lock size={10} />
//                 <span>Secure payment</span>
//               </div>
//               <div className="flex items-baseline gap-1">
//                 <span className="text-[11px] text-slate-400">Total:</span>
//                 <span className="text-base font-extrabold text-slate-900 tracking-tight">
//                   ₹{total?.toLocaleString("en-IN")}
//                 </span>
//               </div>
//             </div>

//             {/* Confirm */}
//             <button
//               onClick={handleConfirm}
//               disabled={uploading}
//               className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
//                 uploading
//                   ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                   : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99] shadow-lg shadow-slate-900/20"
//               }`}
//             >
//               {uploading ? (
//                 "Uploading screenshot..."
//               ) : (
//                 <>
//                   <Lock size={13} />
//                   Pay ₹{total?.toLocaleString("en-IN")} · Confirm
//                   <ChevronRight size={14} />
//                 </>
//               )}
//             </button>

//             {/* Trust badges */}
//             <div className="flex items-center justify-center gap-5">
//               {[
//                 { Icon: Shield,      label: "Secure Upload"  },
//                 { Icon: CheckCircle, label: "2hr Activation" },
//                 { Icon: Lock,        label: "100% Safe"      },
//               ].map(({ Icon, label }) => (
//                 <div key={label} className="flex items-center gap-1">
//                   <Icon size={10} className="text-slate-300" />
//                   <span className="text-[9px] text-slate-400 font-medium">{label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Copy, Check, Upload, Shield, CheckCircle,
  Lock, ChevronRight, AlertCircle, X, QrCode, Link2, Loader2
} from "lucide-react";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSubmitPaymentMutation } from "./Paymentsecapislice";

export default function MenteePayment() {
  const navigate = useNavigate();
  const location = useLocation();

  // ── All fields passed from MentorLTMPlans ──
  const {
    subscription_id,
    session_id,
    mentorId,
    menteeId,
    mentorName,
    menteeName,
    mentorRole,
    planMonths,
    totalSessions,
    basePrice,
    createdBy,
  } = location.state || {};

  console.log(createdBy,"createdBy")

  const total = basePrice;

  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecond, setCopiedSecond] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("qr");

  const [submitPayment, {
    isLoading: isSubmitting,
    isSuccess,
    isError,
    error,
    data: responseData,
  }] = useSubmitPaymentMutation();

  const upiId = "karrivo2024@upi";
  const secondUpiId = "example.174327728615@sbi";

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  // ── Step 1: Upload screenshot to Firebase → get URL ──
  const handleFileUpload = async (file) => {
    if (!file) return;
    setScreenshotName(file.name);
    setUploading(true);
    setUploadError("");
    setScreenshotUrl("");
    try {
      const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setScreenshotUrl(url);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setScreenshotName("");
    } finally {
      setUploading(false);
    }
  };

  // ── Step 2: Send full payload to POST /payments/submit ──
  const handleConfirm = async () => {
    if (!screenshotUrl) { setUploadError("Please upload your payment screenshot."); return; }
    if (!transactionId.trim()) { setUploadError("Please enter your Transaction / UTR ID."); return; }
    setUploadError("");

    try {
      await submitPayment({
        subscription_id,
        session_id,                            // session booking id
        mentorId,                              // mentor's _id
        menteeId,                              // mentee's _id
        mentorName,                            // mentor full name
        menteeName,                            // mentee full name
        paymentAmount: total,                // basePrice from plan
        transactionId: transactionId.trim(), // user typed UTR
        screenshotUrl,                         // firebase URL
        transactionDate: new Date().toISOString(),
        createdBy,                             // mentee's _id
      }).unwrap();
    } catch {
      // error shown via isError
    }
  };

  /* ── Guard: no state passed ── */
  if (!location.state || !basePrice) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center px-6">
          <p className="text-slate-500 text-sm mb-4">No plan selected. Please go back.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-slate-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ── Success: API returned 201 ── */
  if (isSuccess) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white rounded-2xl p-10 max-w-sm w-11/12 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={30} color="#fff" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">Payment Submitted!</h2>
          <p className="text-sm text-slate-500 mb-1 leading-relaxed">
            Your <span className="font-bold text-slate-700">{planMonths}-month mentorship</span> with{" "}
            <span className="font-bold text-slate-700">{mentorName}</span> is being activated.
          </p>

          {/* Response from backend */}
          {responseData?.data && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-4 mb-4 text-left space-y-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Details</p>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Status</span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  {responseData.data.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Transaction ID</span>
                <span className="text-xs font-bold text-slate-800">{responseData.data.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Amount Paid</span>
                <span className="text-xs font-bold text-slate-800">
                  ₹{responseData.data.paymentAmount?.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Mentor</span>
                <span className="text-xs font-bold text-slate-800">{responseData.data.mentorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-500">Mentee</span>
                <span className="text-xs font-bold text-slate-800">{responseData.data.menteeName}</span>
              </div>
            </div>
          )}

          <p className="text-xs text-slate-400 mb-6">
            {responseData?.message || "Verification and activation within 2 hours."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-800 transition-colors"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="h-screen overflow-hidden bg-slate-200 flex items-center justify-center p-3">
      <div className="w-full max-w-[820px] h-full max-h-[660px] flex rounded-2xl overflow-hidden shadow-2xl">

        {/* ══ LEFT PANEL ══ */}
        <div className="w-60 shrink-0 bg-[#0f172a] flex flex-col p-5 overflow-hidden">

          {/* Mentor */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-extrabold text-sm shrink-0">
              {mentorName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">{mentorName}</p>
              <p className="text-slate-400 text-[11px] truncate">{mentorRole}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-1">Total Amount</p>
            <p className="text-white text-3xl font-extrabold tracking-tight leading-none">
              ₹{total?.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Plan card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Mentee</span>
              <span className="text-white text-[11px] font-bold truncate max-w-[110px]">{menteeName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Duration</span>
              <span className="text-white text-[11px] font-bold">{planMonths} Months</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[11px]">Sessions</span>
              <span className="text-white text-[11px] font-bold">{totalSessions}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between items-center">
              <span className="text-slate-300 text-xs font-semibold">Plan price</span>
              <span className="text-white text-sm font-extrabold">₹{basePrice?.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Steps */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest mb-2">How it works</p>
            <div className="space-y-2">
              {[
                { color: "bg-indigo-500/20 text-indigo-400", n: "1", t: "Scan QR or copy UPI", d: "PhonePe, GPay, Paytm" },
                { color: "bg-emerald-500/20 text-emerald-400", n: "2", t: "Upload screenshot", d: "Capture confirmation" },
                { color: "bg-amber-500/20 text-amber-400", n: "3", t: "Enter UTR ID", d: "12-digit reference" },
                { color: "bg-pink-500/20 text-pink-400", n: "4", t: "Confirm & activate", d: "Ready in ~2 hours" },
              ].map(s => (
                <div key={s.n} className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-extrabold ${s.color}`}>
                    {s.n}
                  </div>
                  <div>
                    <p className="text-white/80 text-[10px] font-semibold leading-tight">{s.t}</p>
                    <p className="text-slate-500 text-[9px]">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-1.5 pt-3 border-t border-white/10 mt-3">
            <Shield size={10} className="text-emerald-400 shrink-0" />
            <span className="text-slate-500 text-[9px]">Secured by Karrivo</span>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">

          {/* Scrollable area */}
          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-2 space-y-3">

            {/* Title */}
            <div>
              <p className="text-base font-extrabold text-slate-900 tracking-tight">Complete your payment</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Pay via UPI · ₹{total?.toLocaleString("en-IN")}</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
              {[
                { id: "qr", Icon: QrCode, label: "Scan QR" },
                { id: "upi", Icon: Link2, label: "UPI ID" },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* QR Tab */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center gap-3">
                <div className="border border-slate-200 rounded-2xl p-3 shadow-sm">
                  <img
                    src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="UPI QR"
                    className="w-32 h-32 rounded-lg block"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {["PhonePe", "Google Pay", "Paytm", "BHIM"].map(a => (
                    <span key={a} className="text-[10px] font-semibold text-slate-500 bg-slate-100 rounded-md px-2 py-1">{a}</span>
                  ))}
                </div>
                <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex gap-2 items-start">
                  <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Pay exactly <span className="font-bold">₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation by 48h.
                  </p>
                </div>
              </div>
            )}

            {/* UPI Tab */}
            {activeTab === "upi" && (
              <div className="space-y-2.5">
                {[
                  { label: "Primary UPI ID", val: upiId, copied: copiedPrimary, setter: setCopiedPrimary },
                  { label: "Secondary UPI ID", val: secondUpiId, copied: copiedSecond, setter: setCopiedSecond },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{row.label}</p>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                      <span className="text-xs font-semibold text-slate-700 flex-1 break-all">{row.val}</span>
                      <button
                        onClick={() => copy(row.val, row.setter)}
                        className="flex items-center gap-1 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 hover:bg-slate-700 transition-colors"
                      >
                        {row.copied ? <Check size={9} /> : <Copy size={9} />}
                        {row.copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex gap-2 items-start">
                  <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Pay exactly <span className="font-bold">₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation.
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap">After Payment</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Upload */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Payment Screenshot <span className="text-red-400">*</span>
              </p>
              <label className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-4 cursor-pointer transition-all ${uploading
                ? "border-blue-300 bg-blue-50 cursor-not-allowed"
                : screenshotUrl
                  ? "border-emerald-400 bg-emerald-50 border-solid"
                  : "border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50"
                }`}>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.jfif"
                  className="hidden"
                  disabled={uploading}
                  onChange={e => handleFileUpload(e.target.files[0])}
                />
                {uploading ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <Upload size={13} className="text-blue-500" />
                    </div>
                    <p className="text-xs font-semibold text-blue-600">Uploading to Firebase...</p>
                  </>
                ) : screenshotUrl ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check size={14} className="text-emerald-600" />
                    </div>
                    <p className="text-xs font-bold text-emerald-700">Uploaded successfully</p>
                    <p className="text-[10px] text-emerald-500 max-w-[200px] truncate">{screenshotName}</p>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                      <Upload size={13} className="text-slate-400" />
                    </div>
                    <p className="text-xs font-semibold text-slate-600">Click to upload screenshot</p>
                    <p className="text-[10px] text-slate-400">JPG, PNG up to 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* UTR */}
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                Transaction / UTR ID <span className="text-red-400">*</span>
              </p>
              <input
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:font-normal placeholder:text-slate-400"
                placeholder="e.g. T2312XXXXXXX"
                value={transactionId}
                onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(""); }}
              />
              <p className="text-[9px] text-slate-400 mt-1">Find this in your UPI app under payment history</p>
            </div>

            {/* Discount */}
            <div className="flex gap-2">
              <input
                className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                placeholder="Discount code (optional)"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value.toUpperCase())}
              />
              <button className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 rounded-xl hover:bg-slate-200 transition-colors">
                Apply
              </button>
            </div>

            {/* Field / upload error */}
            {uploadError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                <X size={12} className="text-red-500 shrink-0" />
                <p className="text-xs font-medium text-red-600">{uploadError}</p>
              </div>
            )}

            {/* API error from backend */}
            {isError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                <X size={12} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-600">Submission failed</p>
                  <p className="text-[11px] text-red-500 mt-0.5">
                    {error?.data?.message || "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky footer ── */}
          <div className="border-t border-slate-100 px-5 py-3 bg-white space-y-2 shrink-0">

            {/* Total row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Lock size={10} />
                <span>Secure payment</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px] text-slate-400">Total:</span>
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  ₹{total?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              disabled={uploading || isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${uploading || isSubmitting
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.99] shadow-lg shadow-slate-900/20"
                }`}
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Submitting payment...</>
              ) : uploading ? (
                "Uploading screenshot..."
              ) : (
                <><Lock size={13} /> Pay ₹{total?.toLocaleString("en-IN")} · Confirm <ChevronRight size={14} /></>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5">
              {[
                { Icon: Shield, label: "Secure Upload" },
                { Icon: CheckCircle, label: "2hr Activation" },
                { Icon: Lock, label: "100% Safe" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <Icon size={10} className="text-slate-300" />
                  <span className="text-[9px] text-slate-400 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}