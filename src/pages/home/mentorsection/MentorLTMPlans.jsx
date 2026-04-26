

// // import React, { useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { Check, X } from 'lucide-react';
// // import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
// // import Cookies from "js-cookie";
// // import useToast from '../../../global/Tostify';
// // import Loader from '../../../global/Loader';

// // // ── Design tokens ──────────────────────────────────────────────
// // const BG = '#F6F2ED';   // soft beige (page background)
// // const CREAM = '#2d2d2d';   // dark text (primary text)
// // const CARD_BG = '#ffffff';   // white for cards
// // const CARD_FEAT = '#fafaf8';   // off-white for featured cards
// // const BORDER = 'rgba(162,196,193,0.15)';
// // const BORDER_HI = 'rgba(162,196,193,0.35)';
// // const MUTED = 'rgba(45,45,45,0.65)';
// // const MUTED2 = 'rgba(45,45,45,0.45)';
// // const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
// // const ACCENT = '#7fa9a6'; // sage green

// // const PLAN_META = {
// //   1: {
// //     label: '1 Month Plan',
// //     badge: null,
// //     featured: false,
// //     tabSub: 'No discount & EMI',
// //     description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
// //     features: [
// //       'Direct 1-on-1 sessions',
// //       'Personalised roadmap',
// //       // 'Session recordings',
// //       'Chat support between sessions',
// //       'Progress check-in reports',
// //     ],
// //   },
// //   3: {
// //     label: 'Professional Plan',
// //     badge: null,
// //     featured: true,
// //     tabSub: '6 Months EMI available',
// //     description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
// //     features: [
// //       'All 1-Month Plan features',
// //       'Weekly structured milestones',
// //       // 'Resume & LinkedIn review',
// //       'Mock interviews (2 sessions)',
// //       'Priority scheduling',
// //       'Community access',
// //     ],
// //   },
// //   6: {
// //     label: 'Business Plan',
// //     badge: 'Most Popular',
// //     featured: false,
// //     tabSub: 'Lowest per-month rate',
// //     description: 'For serious career transformation needing advanced tools and full mentor support.',
// //     features: [
// //       'All Professional Plan features',
// //       'Unlimited mock interviews',
// //       'Job referral support',
// //       'Dedicated mentor hotline',
// //       'Live project collaboration',
// //       'Multi-channel support',
// //       'Phone & Email support',
// //     ],
// //   },
// // };

// // const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
// // const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

// // function normalizePlans(formattedPlans = {}) {
// //   if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];
// //   return Object.entries(formattedPlans)
// //     .map(([key, value]) => {
// //       const months = KEY_TO_MONTHS[key];
// //       const meta = PLAN_META[months];
// //       if (!meta || !value) return null;
// //       return {
// //         ...meta,
// //         key: `${months}Month`,
// //         months,
// //         sessionsPerWeek: value.sessionsPerWeek ?? 0,
// //         totalSessions: value.totalSessions ?? 0,
// //         perSession: value.perSession ?? 0,
// //         totalPrice: value.totalAmount ?? 0,
// //       };
// //     })
// //     .filter(Boolean)
// //     .sort((a, b) => a.months - b.months);
// // }

// // const MentorLTMPlans = () => {
// //   const { mentorId } = useParams();
// //   const navigate = useNavigate();
// //   const [selected, setSelected] = useState(null);
// //   const toast = useToast(); // ← Add this line


// //   const cookieData = Cookies.get("profileData");
// //   const userData = cookieData ? JSON.parse(cookieData) : null;
// //   const currentStatus = userData?.profile?.currentStatus;

// //   const { data: mentor, isLoading, isError } =
// //     useFetchMentorByIdQuery({ mentorId, currentStatus });
// //   const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();

// //   const mentors = mentor;

// //   if (isLoading) return (
// //     <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //       <Loader />
// //     </div>
// //   );

// //   if (isError || !mentors) return (
// //     <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
// //       <div style={{ textAlign: 'center' }}>
// //         <X size={32} color="#d9534f" style={{ display: 'block', margin: '0 auto 12px' }} />
// //         <p style={{ color: MUTED, margin: '0 0 16px' }}>Failed to load plans.</p>
// //         <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(162,196,193,0.1)', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '9px 20px', color: ACCENT, cursor: 'pointer' }}>
// //           Go Back
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   const PLANS = normalizePlans(mentors?.pricing?.formattedPlans);
// //   const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

// //   const handleGetStarted = async (e, plan) => {
// //     e.stopPropagation();
// //     const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
// //     try {
// //       const result = await createSubscription({
// //         mentor_id: mentors._id,
// //         mentee_id: storedUser._id,
// //         plan_type: MONTHS_TO_KEY[plan.months],
// //         mentee_status: currentStatus,
// //         amount: plan.totalPrice,
// //         payment_status: 'pending',
// //         payment_done: false,
// //         payment_id: null,
// //         paymentType: 'subcription',
// //         total_sessions: plan.totalSessions,
// //       }).unwrap();
// //       toast.success(
// //         'Subscription created!',
// //         `${plan.label} selected. Redirecting to payment...`,
// //         3000
// //       );

// //       navigate('/payment', {
// //         state: {
// //           subscription_id: result?.data?._id,
// //           mentorId: mentors._id,
// //           mentorName: mentors.fullName,
// //           mentorRole: mentors.currentRole,
// //           menteeId: storedUser._id,
// //           menteeName: storedUser.name,
// //           planMonths: plan.months,
// //           paymentType: 'subcription',
// //           totalSessions: plan.totalSessions,
// //           perSession: plan.perSession,
// //           basePrice: plan.totalPrice,
// //           createdBy: storedUser._id,
// //         },
// //       });
// //     } catch (err) {
// //       console.error('Subscription creation failed:', err.data.message);
// //       toast.error(
// //         'Subscription failed',
// //         err.data.message
// //       );
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

// //         @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
// //         @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

// //         * { box-sizing: border-box; }

// //         .ltm-card {
// //           transition: transform 0.32s cubic-bezier(0.23,1,0.32,1),
// //                       box-shadow 0.3s ease,
// //                       border-color 0.25s ease,
// //                       background 0.25s ease !important;
// //         }
// //         .ltm-tab { transition: background 0.22s ease, color 0.2s ease !important; }
// //         .ltm-cta { transition: opacity 0.2s, transform 0.18s, background 0.2s, color 0.2s !important; }
// //         .ltm-cta:hover { opacity: 0.85 !important; transform: translateY(-1px) !important; }

// //         @media (max-width: 640px) {
// //           .ltm-hero  { padding: 32px 16px 32px !important; }
// //           .ltm-tabs  { margin: 0 12px 28px !important; max-width: unset !important; }
// //           .ltm-cards {
// //             padding: 0 12px 60px !important;
// //             flex-direction: column !important;
// //             align-items: stretch !important;
// //           }
// //           .ltm-card  {
// //             transform: none !important;
// //             max-width: 100% !important;
// //             width: 100% !important;
// //             flex: unset !important;
// //             min-width: unset !important;
// //           }
// //         }

// //         @media (min-width: 641px) and (max-width: 960px) {
// //           .ltm-cards { gap: 14px !important; padding: 0 16px 60px !important; }
// //           .ltm-card  { flex: 1 1 240px !important; }
// //         }
// //       `}</style>

// //       <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT }}>

// //         {/* ── Hero ── */}
// //         <div className="ltm-hero" style={{ textAlign: 'center', padding: '44px 20px 48px', animation: 'fadeUp 0.5s ease both' }}>

// //           <div style={{
// //             display: 'inline-flex', alignItems: 'center', gap: 6,
// //             border: `1px solid ${BORDER_HI}`, borderRadius: 20,
// //             padding: '4px 16px', marginBottom: 22,
// //           }}>
// //             <span style={{ fontSize: 12, color: MUTED, fontWeight: 600, letterSpacing: '0.5px' }}>LTM Membership</span>
// //           </div>

// //           <h1 style={{
// //             fontSize: 'clamp(22px,4vw,42px)', fontWeight: 800,
// //             color: CREAM, lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.4px',
// //           }}>
// //             Find the Perfect Plan to Elevate<br />Your Mentorship Journey
// //           </h1>

// //           <p style={{ fontSize: 15, color: MUTED, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
// //             Connect with{' '}
// //             <strong style={{ color: CREAM }}>{mentors.fullName}</strong>
// //             {' '}— flexible guidance for every stage.
// //           </p>

// //           {currentStatus && (
// //             <div style={{ marginTop: 14 }}>
// //               <span style={{
// //                 fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20,
// //                 background: 'rgba(162,196,193,0.1)',
// //                 border: `1px solid ${BORDER_HI}`,
// //                 color: ACCENT, letterSpacing: '0.4px', textTransform: 'capitalize',
// //               }}>
// //                 {currentStatus} pricing
// //               </span>
// //             </div>
// //           )}

// //           <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
// //             {PLANS.map(p => (
// //               <span key={p.key} style={{
// //                 fontSize: 11, fontWeight: 700, padding: '3px 13px', borderRadius: 20,
// //                 background: 'rgba(162,196,193,0.08)',
// //                 border: `1px solid ${BORDER}`,
// //                 color: MUTED, letterSpacing: '0.3px',
// //               }}>
// //                 {p.months} {p.months === 1 ? 'Month' : 'Months'} available
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         {/* ── Tab selector ── */}
// //         {PLANS.length > 1 && (
// //           <div className="ltm-tabs" style={{
// //             display: 'flex',
// //             maxWidth: PLANS.length === 2 ? 460 : 620,
// //             margin: '0 auto 40px',
// //             background: '#faf6f0',
// //             borderRadius: 14,
// //             border: `1px solid ${BORDER}`,
// //             padding: 4, gap: 3,
// //           }}>
// //             {PLANS.map(plan => {
// //               const isActive = effectiveSelected === plan.key;
// //               return (
// //                 <button
// //                   key={plan.key}
// //                   className="ltm-tab"
// //                   onClick={() => setSelected(plan.key)}
// //                   style={{
// //                     flex: 1, position: 'relative', padding: '13px 10px', borderRadius: 10,
// //                     border: 'none', cursor: 'pointer',
// //                     background: isActive ? ACCENT : 'transparent',
// //                     fontFamily: FONT, textAlign: 'center',
// //                   }}
// //                 >
// //                   {plan.badge && (
// //                     <span style={{
// //                       position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// //                       background: ACCENT, color: '#ffffff',
// //                       fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
// //                       whiteSpace: 'nowrap', letterSpacing: '0.4px',
// //                     }}>{plan.badge}</span>
// //                   )}
// //                   <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: isActive ? '#ffffff' : MUTED }}>
// //                     {plan.months} {plan.months === 1 ? 'month' : 'months'}
// //                   </div>
// //                   <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.7)' : MUTED2 }}>
// //                     {plan.tabSub}
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {/* ── Cards ── */}
// //         <div
// //           className="ltm-cards"
// //           style={{
// //             display: 'flex', flexWrap: 'wrap', gap: 16,
// //             justifyContent: 'center', alignItems: 'flex-end',
// //             maxWidth: PLANS.length === 1 ? 420 : 1080,
// //             margin: '0 auto',
// //             padding: '0 20px 80px',
// //             animation: 'fadeIn 0.4s ease both',
// //           }}
// //         >
// //           {PLANS.map(plan => {
// //             const isSelected = effectiveSelected === plan.key;
// //             const perSession = plan.perSession ?? 0;

// //             const borderColor = isSelected ? ACCENT : plan.featured ? BORDER_HI : BORDER;

// //             const shadow = isSelected
// //               ? `0 20px 56px rgba(162,196,193,0.15), 0 0 0 1.5px ${ACCENT}`
// //               : plan.featured
// //                 ? `0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px ${BORDER_HI}`
// //                 : '0 2px 8px rgba(0,0,0,0.04)';

// //             const cardBg = plan.featured
// //               ? isSelected ? '#f0f7f6' : CARD_FEAT
// //               : isSelected ? '#f5faf9' : CARD_BG;

// //             const lift = PLANS.length === 1
// //               ? 'none'
// //               : plan.featured
// //                 ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
// //                 : isSelected ? 'translateY(-10px) scale(1.01)' : 'translateY(0)';

// //             return (
// //               <div
// //                 key={plan.key}
// //                 className="ltm-card"
// //                 onClick={() => setSelected(plan.key)}
// //                 style={{
// //                   position: 'relative',
// //                   flex: PLANS.length === 1 ? '0 0 380px' : '1 1 280px',
// //                   maxWidth: plan.featured ? 348 : (PLANS.length === 1 ? 380 : 312),
// //                   minWidth: 260,
// //                   cursor: 'pointer',
// //                   borderRadius: 18,
// //                   border: `1.5px solid ${borderColor}`,
// //                   background: cardBg,
// //                   boxShadow: shadow,
// //                   transform: lift,
// //                   padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
// //                   display: 'flex',
// //                   flexDirection: 'column',
// //                 }}
// //               >
// //                 {plan.badge && (
// //                   <div style={{
// //                     position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// //                     background: ACCENT, color: '#ffffff',
// //                     fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20,
// //                     whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px',
// //                   }}>{plan.badge}</div>
// //                 )}

// //                 {/* Label + pill */}
// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
// //                   <p style={{ fontSize: 13, fontWeight: 600, color: MUTED, margin: 0 }}>{plan.label}</p>
// //                   <span style={{
// //                     fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 20,
// //                     background: 'rgba(162,196,193,0.08)',
// //                     border: `1px solid ${BORDER}`,
// //                     color: MUTED,
// //                   }}>
// //                     {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
// //                   </span>
// //                 </div>

// //                 {/* Total price */}
// //                 <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
// //                   <span style={{ fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1, color: CREAM }}>
// //                     ₹{plan.totalPrice.toLocaleString('en-IN')}
// //                   </span>
// //                   <span style={{ fontSize: 12, color: MUTED2, paddingBottom: 4 }}>/total</span>
// //                 </div>

// //                 {/* Per session */}
// //                 <p style={{ fontSize: 12, color: MUTED, margin: '0 0 4px' }}>
// //                   ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
// //                 </p>

// //                 {/* Sessions per week */}
// //                 <p style={{ fontSize: 11, color: MUTED2, margin: '0 0 16px' }}>
// //                   {plan.sessionsPerWeek} session{plan.sessionsPerWeek !== 1 ? 's' : ''}/week
// //                 </p>

// //                 <div style={{ height: 1, background: BORDER, margin: '0 0 16px' }} />

// //                 <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: '0 0 20px' }}>
// //                   {plan.description}
// //                 </p>

// //                 {/* CTA */}
// //                 <button
// //                   className="ltm-cta"
// //                   onClick={(e) => handleGetStarted(e, plan)}
// //                   disabled={isSubscribing}
// //                   style={{
// //                     width: '100%', padding: '12px', borderRadius: 50,
// //                     border: `1.5px solid ${ACCENT}`,
// //                     background: isSelected ? ACCENT : 'transparent',
// //                     color: isSelected ? '#ffffff' : ACCENT,
// //                     fontSize: 14, fontWeight: 700,
// //                     cursor: isSubscribing ? 'not-allowed' : 'pointer',
// //                     marginBottom: 22, fontFamily: FONT,
// //                     opacity: isSubscribing ? 0.6 : 1,
// //                   }}
// //                 >
// //                   {isSubscribing ? 'Processing…' : 'Get started →'}
// //                 </button>

// //                 {/* Features heading */}
// //                 <p style={{
// //                   fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
// //                   textTransform: 'uppercase', color: MUTED2, margin: '0 0 12px',
// //                 }}>
// //                   What's included
// //                 </p>

// //                 <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
// //                   {plan.features.map((feat, i) => (
// //                     <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
// //                       <div style={{
// //                         width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
// //                         background: 'rgba(162,196,193,0.1)',
// //                         border: `1px solid ${BORDER_HI}`,
// //                         display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                       }}>
// //                         <Check size={8} color={ACCENT} strokeWidth={3} />
// //                       </div>
// //                       <span style={{ fontSize: 12, color: MUTED }}>{feat}</span>
// //                     </li>
// //                   ))}
// //                 </ul>

// //                 {isSelected && (
// //                   <div style={{
// //                     marginTop: 18, textAlign: 'center', fontSize: 12, fontWeight: 700,
// //                     color: ACCENT,
// //                     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
// //                   }}>
// //                     <Check size={12} strokeWidth={3} /> Selected
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {PLANS.length === 0 && (
// //           <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: MUTED, fontFamily: FONT }}>
// //             <p>No plans available for this mentor yet.</p>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default MentorLTMPlans;

// import React, { useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Check, X, Copy, Upload, Shield, CheckCircle,
//   Lock, ChevronRight, AlertCircle, QrCode, Link2, Loader2, ArrowLeft
// } from 'lucide-react';
// import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
// import { useSubmitPaymentMutation } from '../../menteeDashboard/pages/payment/Paymentsecapislice'; 
// import { storage } from '../../../../firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import Cookies from 'js-cookie';
// import useToast from '../../../global/Tostify';
// import Loader from '../../../global/Loader';

// // ── Color tokens ─────────────────────────────────────────────
// const WHITE = '#ffffff';
// const CARD = '#81a8a6';   // muted teal — cards / tabs bg
// const NAVY = '#0d1f2d';   // dark navy — buttons / left panel / text

// const CARD_L = 'rgba(129,168,166,0.14)';
// const CARD_M = 'rgba(129,168,166,0.28)';
// const CARD_B = 'rgba(129,168,166,0.38)';
// const NAVY_D = 'rgba(13,31,45,0.50)';
// const NAVY_F = 'rgba(13,31,45,0.35)';
// const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// // ── Plan metadata ─────────────────────────────────────────────
// const PLAN_META = {
//   1: {
//     label: '1 Month Plan', badge: null, featured: false,
//     tabSub: 'Get started', description: 'Perfect for focused 1-on-1 mentorship.',
//     features: ['Direct 1-on-1 sessions', 'Personalised roadmap', 'Chat support between sessions', 'Progress check-in reports'],
//   },
//   3: {
//     label: 'Professional Plan', badge: null, featured: true,
//     tabSub: '6-month EMI available', description: 'Structured guidance for growing professionals.',
//     features: ['All 1-Month features', 'Weekly milestones', 'Mock interviews (2 sessions)', 'Priority scheduling', 'Community access'],
//   },
//   6: {
//     label: 'Business Plan', badge: 'Most Popular', featured: false,
//     tabSub: 'Lowest per-month rate', description: 'Full support for serious career transformation.',
//     features: ['All Professional features', 'Unlimited mock interviews', 'Job referral support', 'Dedicated hotline', 'Live project collaboration', 'Multi-channel support'],
//   },
// };

// const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
// const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

// function normalizePlans(formattedPlans = {}) {
//   if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];
//   return Object.entries(formattedPlans)
//     .map(([key, value]) => {
//       const months = KEY_TO_MONTHS[key];
//       const meta = PLAN_META[months];
//       if (!meta || !value) return null;
//       return { ...meta, key: `${months}Month`, months, sessionsPerWeek: value.sessionsPerWeek ?? 0, totalSessions: value.totalSessions ?? 0, perSession: value.perSession ?? 0, totalPrice: value.totalAmount ?? 0 };
//     })
//     .filter(Boolean)
//     .sort((a, b) => a.months - b.months);
// }

// // ── UPI constants ─────────────────────────────────────────────
// const UPI_PRIMARY = 'karrivo2024@upi';
// const UPI_SECONDARY = 'example.174327728615@sbi';

// export default function MentorLTMPlans() {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();
//   const toast = useToast();

//   // ── Auth / user ──────────────────────────────────────────────
//   const cookieData = Cookies.get('profileData');
//   const userData = cookieData ? JSON.parse(cookieData) : null;
//   const currentStatus = userData?.profile?.currentStatus;
//   const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

//   // ── Queries / mutations ──────────────────────────────────────
//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery({ mentorId, currentStatus });
//   const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();
//   const [submitPayment, { isLoading: isSubmitting, isSuccess, isError: payError, error: payErrorData, data: payResponse }] = useSubmitPaymentMutation();

//   // ── Plan selection ───────────────────────────────────────────
//   const [selectedPlanKey, setSelectedPlanKey] = useState(null);
//   const [paymentPlan, setPaymentPlan] = useState(null);   // plan pushed to payment
//   const [subscriptionId, setSubscriptionId] = useState(null);
//   const [showPayment, setShowPayment] = useState(false);

//   // ── Payment form state ───────────────────────────────────────
//   const [payTab, setPayTab] = useState('qr');   // 'qr' | 'upi'
//   const [transactionId, setTransactionId] = useState('');
//   const [screenshotUrl, setScreenshotUrl] = useState('');
//   const [screenshotName, setScreenshotName] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState('');
//   const [discountCode, setDiscountCode] = useState('');
//   const [copiedP, setCopiedP] = useState(false);
//   const [copiedS, setCopiedS] = useState(false);

//   const payPanelRef = useRef(null);

//   // ── Helpers ──────────────────────────────────────────────────
//   const copyText = (text, setter) => {
//     navigator.clipboard.writeText(text);
//     setter(true);
//     setTimeout(() => setter(false), 2000);
//   };

//   const handleFileUpload = async (file) => {
//     if (!file) return;
//     setScreenshotName(file.name);
//     setUploading(true); setUploadError(''); setScreenshotUrl('');
//     try {
//       const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
//       await uploadBytes(storageRef, file);
//       const url = await getDownloadURL(storageRef);
//       setScreenshotUrl(url);
//     } catch {
//       setUploadError('Upload failed. Please try again.');
//       setScreenshotName('');
//     } finally { setUploading(false); }
//   };

//   // ── Select plan → create subscription → reveal payment ──────
//   const handleSelectPlan = async (plan) => {
//     setSelectedPlanKey(plan.key);
//     try {
//       const result = await createSubscription({
//         mentor_id: mentor._id,
//         mentee_id: storedUser._id,
//         plan_type: MONTHS_TO_KEY[plan.months],
//         mentee_status: currentStatus,
//         amount: plan.totalPrice,
//         payment_status: 'pending',
//         payment_done: false,
//         payment_id: null,
//         paymentType: 'subcription',
//         total_sessions: plan.totalSessions,
//       }).unwrap();

//       setSubscriptionId(result?.data?._id);
//       setPaymentPlan(plan);
//       setShowPayment(true);

//       // scroll payment panel into view on mobile
//       setTimeout(() => payPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
//     } catch (err) {
//       toast.error('Subscription failed', err?.data?.message || 'Please try again.');
//     }
//   };

//   // ── Submit payment ───────────────────────────────────────────
//   const handleConfirmPayment = async () => {
//     if (!screenshotUrl) { setUploadError('Please upload your payment screenshot.'); return; }
//     if (!transactionId.trim()) { setUploadError('Please enter your Transaction / UTR ID.'); return; }
//     setUploadError('');
//     try {
//       await submitPayment({
//         subscription_id: subscriptionId,
//         mentorId: mentor._id,
//         menteeId: storedUser._id,
//         mentorName: mentor.fullName,
//         menteeName: storedUser.name,
//         paymentAmount: paymentPlan.totalPrice,
//         paymentType: 'subcription',
//         transactionId: transactionId.trim(),
//         screenshotUrl,
//         transactionDate: new Date().toISOString(),
//         createdBy: storedUser._id,
//       }).unwrap();
//     } catch { /* shown via payError */ }
//   };

//   // ── Loading / error states ───────────────────────────────────
//   if (isLoading) return (
//     <div style={{ minHeight: '100vh', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <Loader />
//     </div>
//   );
//   if (isError || !mentor) return (
//     <div style={{ minHeight: '100vh', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
//       <div style={{ textAlign: 'center' }}>
//         <X size={32} color={CARD} style={{ display: 'block', margin: '0 auto 12px' }} />
//         <p style={{ color: NAVY_D, margin: '0 0 16px' }}>Failed to load plans.</p>
//         <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 8, padding: '9px 20px', color: NAVY, cursor: 'pointer', fontWeight: 600 }}>
//           Go Back
//         </button>
//       </div>
//     </div>
//   );

//   const PLANS = normalizePlans(mentor?.pricing?.formattedPlans);
//   const effectiveSelected = selectedPlanKey ?? (PLANS.length === 1 ? PLANS[0].key : null);

//   // ── Success screen ───────────────────────────────────────────
//   if (isSuccess) return (
//     <div style={{ minHeight: '100vh', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: FONT }}>
//       <div style={{ background: NAVY, borderRadius: 20, padding: '40px 32px', maxWidth: 360, width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(13,31,45,0.2)' }}>
//         <div style={{ width: 60, height: 60, borderRadius: '50%', background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
//           <CheckCircle size={28} color={NAVY} />
//         </div>
//         <h2 style={{ color: WHITE, fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Payment Submitted!</h2>
//         <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '0 0 20px', lineHeight: 1.7 }}>
//           Your <strong style={{ color: WHITE }}>{paymentPlan?.months}-month mentorship</strong> with <strong style={{ color: WHITE }}>{mentor.fullName}</strong> is being activated.
//         </p>
//         {payResponse?.data && (
//           <div style={{ background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: 'left' }}>
//             {[
//               { label: 'Status', value: payResponse.data.paymentStatus },
//               { label: 'Transaction ID', value: payResponse.data.transactionId },
//               { label: 'Amount', value: `₹${payResponse.data.paymentAmount?.toLocaleString('en-IN')}` },
//             ].map(r => (
//               <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//                 <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>{r.label}</span>
//                 <span style={{ fontSize: 11, fontWeight: 700, color: WHITE }}>{r.value}</span>
//               </div>
//             ))}
//           </div>
//         )}
//         <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: '0 0 20px' }}>Verification & activation within 2 hours.</p>
//         <button onClick={() => navigate('/mentee/bookings')} style={{ width: '100%', background: WHITE, color: NAVY, border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: FONT }}>
//           See Your Bookings →
//         </button>
//       </div>
//     </div>
//   );

//   // ── Main render ──────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         * { box-sizing: border-box; }

//         @keyframes slideInLeft  { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
//         @keyframes slideInRight { from { opacity:0; transform:translateX(32px);  } to { opacity:1; transform:translateX(0); } }
//         @keyframes fadeUp       { from { opacity:0; transform:translateY(16px);  } to { opacity:1; transform:translateY(0); } }

//         .plan-card {
//           transition: transform 0.28s cubic-bezier(0.23,1,0.32,1), box-shadow 0.28s ease, border-color 0.2s ease, background 0.2s ease;
//           cursor: pointer;
//         }
//         .plan-card:hover { transform: translateY(-4px) !important; }

//         .pay-tab-btn { transition: background 0.2s, color 0.2s; border: none; cursor: pointer; }
//         .cta-btn     { transition: opacity 0.18s, transform 0.18s; }
//         .cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }
//         .upload-label { transition: border-color 0.2s, background 0.2s; }

//         .payment-panel { animation: slideInRight 0.38s cubic-bezier(0.23,1,0.32,1) both; }

//         .ltm-input {
//           outline: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .ltm-input:focus {
//           border-color: ${NAVY} !important;
//           box-shadow: 0 0 0 3px ${CARD_L} !important;
//         }

//         @media (max-width: 900px) {
//           .ltm-layout { flex-direction: column !important; }
//           .ltm-left   { width: 100% !important; border-right: none !important; border-bottom: 1px solid ${CARD_B} !important; }
//           .payment-panel { animation: slideInLeft 0.38s cubic-bezier(0.23,1,0.32,1) both !important; }
//         }
//       `}</style>

//       <div style={{ minHeight: '100vh', background: WHITE, fontFamily: FONT }}>

//         {/* ── Hero ─────────────────────────────────────────── */}
//         <div style={{ textAlign: 'center', padding: '36px 20px 32px', animation: 'fadeUp 0.45s ease both' }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid ${CARD_B}`, borderRadius: 20, padding: '4px 16px', marginBottom: 16 }}>
//             <span style={{ fontSize: 11, color: NAVY_D, fontWeight: 700, letterSpacing: '0.5px' }}>LTM Membership</span>
//           </div>
//           <h1 style={{ fontSize: 'clamp(20px,3.5vw,38px)', fontWeight: 800, color: NAVY, lineHeight: 1.2, margin: '0 0 12px', letterSpacing: '-0.3px' }}>
//             Elevate Your Mentorship Journey
//           </h1>
//           <p style={{ fontSize: 14, color: NAVY_D, maxWidth: 420, margin: '0 auto', lineHeight: 1.75 }}>
//             Connect with <strong style={{ color: NAVY }}>{mentor.fullName}</strong> — choose a plan and pay instantly.
//           </p>
//         </div>

//         {/* ── Main layout ───────────────────────────────────── */}
//         <div className="ltm-layout" style={{ display: 'flex', alignItems: 'flex-start', maxWidth: 1100, margin: '0 auto', padding: '0 16px 60px', gap: 0 }}>

//           {/* ── LEFT: Plan selector ───────────────────────── */}
//           <div className="ltm-left" style={{ width: showPayment ? '45%' : '100%', transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1)', borderRight: showPayment ? `1px solid ${CARD_B}` : 'none', paddingRight: showPayment ? 24 : 0 }}>

//             {/* Tab row */}
//             {PLANS.length > 1 && (
//               <div style={{ display: 'flex', background: CARD, borderRadius: 12, padding: 4, gap: 3, marginBottom: 20 }}>
//                 {PLANS.map(plan => {
//                   const isAct = effectiveSelected === plan.key;
//                   return (
//                     <button
//                       key={plan.key}
//                       className="pay-tab-btn"
//                       onClick={() => { setSelectedPlanKey(plan.key); setShowPayment(false); }}
//                       style={{ flex: 1, padding: '11px 8px', borderRadius: 9, fontFamily: FONT, background: isAct ? NAVY : 'transparent', textAlign: 'center' }}
//                     >
//                       {plan.badge && (
//                         <div style={{ fontSize: 9, fontWeight: 800, color: isAct ? WHITE : NAVY, background: isAct ? 'rgba(255,255,255,0.18)' : 'rgba(13,31,45,0.1)', borderRadius: 20, padding: '1px 8px', marginBottom: 3, display: 'inline-block' }}>{plan.badge}</div>
//                       )}
//                       <div style={{ fontSize: 13, fontWeight: 700, color: isAct ? WHITE : NAVY }}>{plan.months} {plan.months === 1 ? 'month' : 'months'}</div>
//                       <div style={{ fontSize: 10, color: isAct ? 'rgba(255,255,255,0.65)' : NAVY_D, marginTop: 2 }}>{plan.tabSub}</div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Plan cards */}
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {PLANS.map(plan => {
//                 const isSelected = effectiveSelected === plan.key;
//                 return (
//                   <div
//                     key={plan.key}
//                     className="plan-card"
//                     onClick={() => setSelectedPlanKey(plan.key)}
//                     style={{
//                       border: `1.5px solid ${isSelected ? NAVY : CARD_B}`,
//                       borderRadius: 14,
//                       background: isSelected ? CARD_L : WHITE,
//                       padding: '18px 18px 14px',
//                       boxShadow: isSelected ? `0 8px 28px rgba(13,31,45,0.12), 0 0 0 1.5px ${NAVY}` : '0 2px 8px rgba(0,0,0,0.04)',
//                       transform: isSelected ? 'translateY(-3px)' : 'translateY(0)',
//                     }}
//                   >
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
//                       <div>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
//                           <p style={{ fontSize: 12, fontWeight: 700, color: NAVY_D, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{plan.label}</p>
//                           {plan.badge && (
//                             <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 20, background: NAVY, color: WHITE, letterSpacing: '0.4px' }}>{plan.badge}</span>
//                           )}
//                         </div>
//                         <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
//                           <span style={{ fontSize: 28, fontWeight: 800, color: NAVY, lineHeight: 1 }}>₹{plan.totalPrice.toLocaleString('en-IN')}</span>
//                           <span style={{ fontSize: 11, color: NAVY_F }}>/total</span>
//                         </div>
//                         <p style={{ fontSize: 11, color: NAVY_D, margin: '3px 0 0' }}>₹{plan.perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions · {plan.sessionsPerWeek}/week</p>
//                       </div>
//                       <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSelected ? NAVY : CARD_B}`, background: isSelected ? NAVY : WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
//                         {isSelected && <Check size={11} color={WHITE} strokeWidth={3} />}
//                       </div>
//                     </div>

//                     <p style={{ fontSize: 12, color: NAVY_D, margin: '8px 0 10px', lineHeight: 1.6 }}>{plan.description}</p>

//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
//                       {plan.features.slice(0, 4).map((f, i) => (
//                         <span key={i} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 20, background: CARD_L, border: `1px solid ${CARD_B}`, color: NAVY, fontWeight: 600 }}>{f}</span>
//                       ))}
//                     </div>

//                     <button
//                       className="cta-btn"
//                       onClick={(e) => { e.stopPropagation(); handleSelectPlan(plan); }}
//                       disabled={isSubscribing}
//                       style={{
//                         width: '100%', padding: '11px', borderRadius: 50,
//                         background: isSelected ? NAVY : 'transparent',
//                         border: `1.5px solid ${NAVY}`,
//                         color: isSelected ? WHITE : NAVY,
//                         fontSize: 13, fontWeight: 700, cursor: isSubscribing ? 'not-allowed' : 'pointer',
//                         fontFamily: FONT, opacity: isSubscribing ? 0.6 : 1,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//                       }}
//                     >
//                       {isSubscribing ? <><Loader2 size={13} className="animate-spin" /> Processing…</> : <>Pay ₹{plan.totalPrice.toLocaleString('en-IN')} <ChevronRight size={14} /></>}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* ── RIGHT: Payment panel (slides in) ─────────── */}
//           {showPayment && paymentPlan && (
//             <div
//               ref={payPanelRef}
//               className="payment-panel"
//               style={{ flex: 1, paddingLeft: 28, minWidth: 0 }}
//             >
//               {/* Back link */}
//               <button
//                 onClick={() => { setShowPayment(false); setUploadError(''); setTransactionId(''); setScreenshotUrl(''); setScreenshotName(''); }}
//                 style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: NAVY_D, fontSize: 12, fontWeight: 600, fontFamily: FONT, marginBottom: 16, padding: 0 }}
//               >
//                 <ArrowLeft size={14} /> Change plan
//               </button>

//               {/* Panel card */}
//               <div style={{ background: WHITE, border: `1px solid ${CARD_B}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 12px 40px rgba(13,31,45,0.1)' }}>

//                 {/* Header strip */}
//                 <div style={{ background: NAVY, padding: '18px 20px' }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                     <div style={{ width: 36, height: 36, borderRadius: '50%', background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: NAVY, flexShrink: 0 }}>
//                       {mentor.fullName?.[0]}
//                     </div>
//                     <div>
//                       <p style={{ color: WHITE, fontWeight: 700, fontSize: 14, margin: 0 }}>{mentor.fullName}</p>
//                       <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, margin: 0 }}>{mentor.currentRole}</p>
//                     </div>
//                     <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
//                       <p style={{ color: WHITE, fontWeight: 800, fontSize: 22, margin: 0, lineHeight: 1 }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</p>
//                       <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, margin: '2px 0 0' }}>{paymentPlan.months} months · {paymentPlan.totalSessions} sessions</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div style={{ padding: '18px 20px', overflowY: 'auto', maxHeight: 'calc(100vh - 260px)' }}>

//                   {/* Pay method label */}
//                   <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>Complete your payment</p>

//                   {/* ── Method tabs ── */}
//                   <div style={{ display: 'flex', background: CARD, borderRadius: 10, padding: 3, gap: 3, marginBottom: 16 }}>
//                     {[
//                       { id: 'qr', Icon: QrCode, label: 'Scan QR' },
//                       { id: 'upi', Icon: Link2, label: 'UPI ID' },
//                     ].map(({ id, Icon, label }) => (
//                       <button
//                         key={id}
//                         className="pay-tab-btn"
//                         onClick={() => setPayTab(id)}
//                         style={{
//                           flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
//                           padding: '9px', borderRadius: 8, fontFamily: FONT,
//                           background: payTab === id ? NAVY : 'transparent',
//                           color: payTab === id ? WHITE : NAVY,
//                           fontSize: 12, fontWeight: 700,
//                         }}
//                       >
//                         <Icon size={13} />{label}
//                       </button>
//                     ))}
//                   </div>

//                   {/* ── QR panel ── */}
//                   {payTab === 'qr' && (
//                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 16 }}>
//                       <div style={{ background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 14, padding: 12 }}>
//                         <img
//                           src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
//                           alt="UPI QR Code"
//                           style={{ width: 120, height: 120, borderRadius: 8, display: 'block' }}
//                         />
//                       </div>
//                       <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
//                         {['PhonePe', 'Google Pay', 'Paytm', 'BHIM'].map(a => (
//                           <span key={a} style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: CARD_L, border: `1px solid ${CARD_B}`, color: NAVY }}>{a}</span>
//                         ))}
//                       </div>
//                       <div style={{ width: '100%', background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
//                         <AlertCircle size={13} color={NAVY} style={{ flexShrink: 0, marginTop: 1 }} />
//                         <p style={{ fontSize: 11, color: NAVY_D, margin: 0, lineHeight: 1.6 }}>
//                           Pay exactly <strong style={{ color: NAVY }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</strong> — wrong amounts delay activation by 48h.
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* ── UPI ID panel ── */}
//                   {payTab === 'upi' && (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
//                       {[
//                         { label: 'Primary UPI ID', val: UPI_PRIMARY, copied: copiedP, setter: setCopiedP },
//                         { label: 'Secondary UPI ID', val: UPI_SECONDARY, copied: copiedS, setter: setCopiedS },
//                       ].map(row => (
//                         <div key={row.label}>
//                           <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY_F, margin: '0 0 5px' }}>{row.label}</p>
//                           <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 10, padding: '9px 12px' }}>
//                             <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: NAVY, wordBreak: 'break-all' }}>{row.val}</span>
//                             <button
//                               onClick={() => copyText(row.val, row.setter)}
//                               style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: FONT, background: row.copied ? NAVY : 'rgba(13,31,45,0.1)', color: row.copied ? WHITE : NAVY, flexShrink: 0, transition: 'background 0.2s, color 0.2s' }}
//                             >
//                               {row.copied ? <><Check size={9} /> Copied</> : <><Copy size={9} /> Copy</>}
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                       <div style={{ background: CARD_L, border: `1px solid ${CARD_B}`, borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
//                         <AlertCircle size={13} color={NAVY} style={{ flexShrink: 0, marginTop: 1 }} />
//                         <p style={{ fontSize: 11, color: NAVY_D, margin: 0, lineHeight: 1.6 }}>
//                           Pay exactly <strong style={{ color: NAVY }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</strong> — wrong amounts delay activation.
//                         </p>
//                       </div>
//                     </div>
//                   )}

//                   {/* ── Divider ── */}
//                   <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 16px' }}>
//                     <div style={{ flex: 1, height: 1, background: CARD_B }} />
//                     <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: NAVY_F }}>After Payment</span>
//                     <div style={{ flex: 1, height: 1, background: CARD_B }} />
//                   </div>

//                   {/* ── Screenshot upload ── */}
//                   <div style={{ marginBottom: 12 }}>
//                     <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY_F, margin: '0 0 6px' }}>
//                       Payment Screenshot <span style={{ color: NAVY }}>*</span>
//                     </p>
//                     <label
//                       className="upload-label"
//                       style={{
//                         display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
//                         border: `2px dashed ${screenshotUrl ? NAVY : CARD_B}`,
//                         borderStyle: screenshotUrl ? 'solid' : 'dashed',
//                         borderRadius: 12, padding: '20px 12px', cursor: 'pointer',
//                         background: screenshotUrl ? CARD_L : uploading ? CARD_L : WHITE,
//                       }}
//                     >
//                       <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: 'none' }} disabled={uploading} onChange={e => handleFileUpload(e.target.files[0])} />
//                       {uploading ? (
//                         <>
//                           <div style={{ width: 30, height: 30, borderRadius: '50%', background: CARD_M, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={13} color={NAVY} /></div>
//                           <p style={{ fontSize: 12, fontWeight: 600, color: NAVY, margin: 0 }}>Uploading…</p>
//                         </>
//                       ) : screenshotUrl ? (
//                         <>
//                           <div style={{ width: 30, height: 30, borderRadius: '50%', background: CARD_M, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={14} color={NAVY} /></div>
//                           <p style={{ fontSize: 12, fontWeight: 700, color: NAVY, margin: 0 }}>Uploaded ✓</p>
//                           <p style={{ fontSize: 10, color: NAVY_F, margin: 0, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{screenshotName}</p>
//                         </>
//                       ) : (
//                         <>
//                           <div style={{ width: 30, height: 30, borderRadius: '50%', background: CARD_L, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={13} color={NAVY} /></div>
//                           <p style={{ fontSize: 12, fontWeight: 600, color: NAVY, margin: 0 }}>Click to upload screenshot</p>
//                           <p style={{ fontSize: 10, color: NAVY_F, margin: 0 }}>JPG, PNG up to 5MB</p>
//                         </>
//                       )}
//                     </label>
//                   </div>

//                   {/* ── UTR input ── */}
//                   <div style={{ marginBottom: 10 }}>
//                     <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: NAVY_F, margin: '0 0 6px' }}>
//                       Transaction / UTR ID <span style={{ color: NAVY }}>*</span>
//                     </p>
//                     <input
//                       className="ltm-input"
//                       style={{ width: '100%', background: WHITE, border: `1px solid ${CARD_B}`, borderRadius: 10, padding: '10px 12px', fontSize: 12, fontWeight: 600, color: NAVY, caretColor: NAVY, fontFamily: FONT }}
//                       placeholder="e.g. T2312XXXXXXX"
//                       value={transactionId}
//                       onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(''); }}
//                     />
//                     <p style={{ fontSize: 9, color: NAVY_F, margin: '4px 0 0' }}>Find this in your UPI app under payment history</p>
//                   </div>

//                   {/* ── Discount ── */}
//                   <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
//                     <input
//                       className="ltm-input"
//                       style={{ flex: 1, background: WHITE, border: `1px solid ${CARD_B}`, borderRadius: 10, padding: '10px 12px', fontSize: 12, color: NAVY, caretColor: NAVY, fontFamily: FONT }}
//                       placeholder="Discount code (optional)"
//                       value={discountCode}
//                       onChange={e => setDiscountCode(e.target.value.toUpperCase())}
//                     />
//                     <button style={{ background: NAVY, color: WHITE, border: 'none', borderRadius: 10, padding: '0 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: FONT }}>Apply</button>
//                   </div>

//                   {/* ── Errors ── */}
//                   {uploadError && (
//                     <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(220,53,69,0.07)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 10, padding: '9px 12px', marginBottom: 10 }}>
//                       <X size={12} color="#dc3545" style={{ flexShrink: 0 }} />
//                       <p style={{ fontSize: 11, color: '#dc3545', margin: 0 }}>{uploadError}</p>
//                     </div>
//                   )}
//                   {payError && (
//                     <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: 'rgba(220,53,69,0.07)', border: '1px solid rgba(220,53,69,0.2)', borderRadius: 10, padding: '9px 12px', marginBottom: 10 }}>
//                       <X size={12} color="#dc3545" style={{ flexShrink: 0, marginTop: 1 }} />
//                       <div>
//                         <p style={{ fontSize: 11, fontWeight: 700, color: '#dc3545', margin: '0 0 2px' }}>Submission failed</p>
//                         <p style={{ fontSize: 10, color: NAVY_D, margin: 0 }}>{payErrorData?.data?.message || 'Something went wrong.'}</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* ── Sticky footer ── */}
//                 <div style={{ padding: '14px 20px', background: WHITE, borderTop: `1px solid ${CARD_B}` }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: NAVY_F }}>
//                       <Lock size={10} />Secure payment
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
//                       <span style={{ fontSize: 11, color: NAVY_F }}>Total:</span>
//                       <span style={{ fontSize: 18, fontWeight: 800, color: NAVY }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</span>
//                     </div>
//                   </div>

//                   <button
//                     className="cta-btn"
//                     onClick={handleConfirmPayment}
//                     disabled={uploading || isSubmitting}
//                     style={{
//                       width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
//                       padding: '13px', borderRadius: 50, border: 'none', fontFamily: FONT,
//                       background: uploading || isSubmitting ? CARD_M : NAVY,
//                       color: uploading || isSubmitting ? NAVY_F : WHITE,
//                       fontSize: 13, fontWeight: 700,
//                       cursor: uploading || isSubmitting ? 'not-allowed' : 'pointer',
//                       boxShadow: uploading || isSubmitting ? 'none' : '0 8px 20px rgba(13,31,45,0.22)',
//                     }}
//                   >
//                     {isSubmitting ? <><Loader2 size={14} className="animate-spin" /> Submitting…</>
//                       : uploading ? 'Uploading screenshot…'
//                         : <><Lock size={13} /> Pay ₹{paymentPlan.totalPrice.toLocaleString('en-IN')} · Confirm <ChevronRight size={14} /></>}
//                   </button>

//                   <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10 }}>
//                     {[{ Icon: Shield, label: 'Secure Upload' }, { Icon: CheckCircle, label: '2hr Activation' }, { Icon: Lock, label: '100% Safe' }].map(({ Icon, label }) => (
//                       <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//                         <Icon size={9} color={NAVY_F} />
//                         <span style={{ fontSize: 9, color: NAVY_F, fontWeight: 600 }}>{label}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {PLANS.length === 0 && (
//           <p style={{ textAlign: 'center', color: NAVY_D, padding: '40px 20px', fontFamily: FONT }}>No plans available for this mentor yet.</p>
//         )}
//       </div>
//     </>
//   );
// }


import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Check, X, Copy, Upload, Shield, CheckCircle,
  Lock, ChevronRight, AlertCircle, QrCode, Link2, Loader2, ArrowLeft
} from 'lucide-react';
import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
import { useSubmitPaymentMutation } from '../../menteeDashboard/pages/payment/Paymentsecapislice';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';
import useToast from '../../../global/Tostify';
import Loader from '../../../global/Loader';

// ── Design tokens (Code 2 palette) ───────────────────────────
const BG = '#F6F2ED';
const CREAM = '#2d2d2d';
const CARD_BG = '#ffffff';
const CARD_FEAT = '#fafaf8';
const BORDER = 'rgba(162,196,193,0.15)';
const BORDER_HI = 'rgba(162,196,193,0.35)';
const MUTED = 'rgba(45,45,45,0.65)';
const MUTED2 = 'rgba(45,45,45,0.45)';
const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
const ACCENT = '#7fa9a6';
const ACCENT_D = '#5d8f8b';
const ACCENT_L = 'rgba(127,169,166,0.10)';
const ACCENT_M = 'rgba(127,169,166,0.22)';
const ACCENT_B = 'rgba(127,169,166,0.32)';

// ── Plan metadata ─────────────────────────────────────────────
const PLAN_META = {
  1: {
    label: '1 Month Plan', badge: null, featured: false,
    tabSub: 'No discount & EMI',
    description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
    features: ['Direct 1-on-1 sessions', 'Personalised roadmap', 'Chat support between sessions', 'Progress check-in reports'],
  },
  3: {
    label: 'Professional Plan', badge: null, featured: true,
    tabSub: '6 Months EMI available',
    description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
    features: ['All 1-Month Plan features', 'Weekly structured milestones', 'Mock interviews (2 sessions)', 'Priority scheduling', 'Community access'],
  },
  6: {
    label: 'Business Plan', badge: 'Most Popular', featured: false,
    tabSub: 'Lowest per-month rate',
    description: 'For serious career transformation needing advanced tools and full mentor support.',
    features: ['All Professional Plan features', 'Unlimited mock interviews', 'Job referral support', 'Dedicated mentor hotline', 'Live project collaboration', 'Multi-channel support', 'Phone & Email support'],
  },
};

const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

const UPI_PRIMARY = 'karrivo2024@upi';
const UPI_SECONDARY = 'example.174327728615@sbi';

function normalizePlans(formattedPlans = {}) {
  if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];
  return Object.entries(formattedPlans)
    .map(([key, value]) => {
      const months = KEY_TO_MONTHS[key];
      const meta = PLAN_META[months];
      if (!meta || !value) return null;
      return {
        ...meta, key: `${months}Month`, months,
        sessionsPerWeek: value.sessionsPerWeek ?? 0,
        totalSessions: value.totalSessions ?? 0,
        perSession: value.perSession ?? 0,
        totalPrice: value.totalAmount ?? 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.months - b.months);
}

export default function MentorLTMPlans() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // ── Auth ─────────────────────────────────────────────────────
  const cookieData = Cookies.get('profileData');
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;
  const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

  // ── API ──────────────────────────────────────────────────────
  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery({ mentorId, currentStatus });
  const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();
  const [submitPayment, { isLoading: isSubmitting, isSuccess, isError: payError, error: payErrorData, data: payResponse }] = useSubmitPaymentMutation();

  // ── Plan UI state ────────────────────────────────────────────
  const [selected, setSelected] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  // ── Payment form state ───────────────────────────────────────
  const [payTab, setPayTab] = useState('qr');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [copiedP, setCopiedP] = useState(false);
  const [copiedS, setCopiedS] = useState(false);

  const payPanelRef = useRef(null);

  // ── Helpers ──────────────────────────────────────────────────
  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setScreenshotName(file.name);
    setUploading(true); setUploadError(''); setScreenshotUrl('');
    try {
      const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setScreenshotUrl(url);
    } catch {
      setUploadError('Upload failed. Please try again.');
      setScreenshotName('');
    } finally { setUploading(false); }
  };

  // ── Select plan → create subscription → show payment ────────
  const handleGetStarted = async (e, plan) => {
    e.stopPropagation();
    setSelected(plan.key);
    try {
      const result = await createSubscription({
        mentor_id: mentor._id,
        mentee_id: storedUser._id,
        plan_type: MONTHS_TO_KEY[plan.months],
        mentee_status: currentStatus,
        amount: plan.totalPrice,
        payment_status: 'pending',
        payment_done: false,
        payment_id: null,
        paymentType: 'subcription',
        total_sessions: plan.totalSessions,
      }).unwrap();

      setSubscriptionId(result?.data?._id);
      setPaymentPlan(plan);
      setShowPayment(true);

      setTimeout(() => payPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      toast.error('Subscription failed', err?.data?.message || 'Please try again.');
    }
  };

  // ── Confirm payment ──────────────────────────────────────────
  const handleConfirmPayment = async () => {
    if (!screenshotUrl) { setUploadError('Please upload your payment screenshot.'); return; }
    if (!transactionId.trim()) { setUploadError('Please enter your Transaction / UTR ID.'); return; }
    setUploadError('');
    try {
      await submitPayment({
        subscription_id: subscriptionId,
        mentorId: mentor._id,
        menteeId: storedUser._id,
        mentorName: mentor.fullName,
        menteeName: storedUser.name,
        paymentAmount: paymentPlan.totalPrice,
        paymentType: 'subcription',
        transactionId: transactionId.trim(),
        screenshotUrl,
        transactionDate: new Date().toISOString(),
        createdBy: storedUser._id,
      }).unwrap();
    } catch { /* shown via payError */ }
  };

  // ── Loading / error ──────────────────────────────────────────
  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </div>
  );

  if (isError || !mentor) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ textAlign: 'center' }}>
        <X size={32} color="#d9534f" style={{ display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: MUTED, margin: '0 0 16px' }}>Failed to load plans.</p>
        <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, borderRadius: 8, padding: '9px 20px', color: ACCENT, cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    </div>
  );

  const PLANS = normalizePlans(mentor?.pricing?.formattedPlans);
  const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

  // ── Success screen ───────────────────────────────────────────
  if (isSuccess) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: FONT }}>
      <div style={{ background: CREAM, borderRadius: 20, padding: '40px 32px', maxWidth: 360, width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(45,45,45,0.18)' }}>
        <div style={{ width: 60, height: 60, borderRadius: '50%', background: ACCENT_L, border: `1px solid ${ACCENT_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={28} color={ACCENT} />
        </div>
        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Payment Submitted!</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, margin: '0 0 20px', lineHeight: 1.7 }}>
          Your <strong style={{ color: '#fff' }}>{paymentPlan?.months}-month mentorship</strong> with <strong style={{ color: '#fff' }}>{mentor.fullName}</strong> is being activated.
        </p>
        {payResponse?.data && (
          <div style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 12, padding: 14, marginBottom: 20, textAlign: 'left' }}>
            {[
              { label: 'Status', value: payResponse.data.paymentStatus },
              { label: 'Transaction ID', value: payResponse.data.transactionId },
              { label: 'Amount', value: `₹${payResponse.data.paymentAmount?.toLocaleString('en-IN')}` },
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{r.value}</span>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: '0 0 20px' }}>Verification & activation within 2 hours.</p>
        <button onClick={() => navigate('/mentee/bookings')} style={{ width: '100%', background: ACCENT, color: '#fff', border: 'none', borderRadius: 12, padding: '13px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: FONT }}>
          See Your Bookings →
        </button>
      </div>
    </div>
  );

  // ── Main render ──────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp        { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn        { from { opacity:0; } to { opacity:1; } }
        @keyframes slideInRight  { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }

        * { box-sizing: border-box; }

        .ltm-card { transition: transform 0.32s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important; }
        .ltm-tab  { transition: background 0.22s ease, color 0.2s ease !important; }
        .ltm-cta  { transition: opacity 0.2s, transform 0.18s, background 0.2s, color 0.2s !important; }
        .ltm-cta:hover { opacity: 0.85 !important; transform: translateY(-1px) !important; }
        .ltm-input { outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .ltm-input:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px ${ACCENT_L} !important; }
        .pay-tab-btn { transition: background 0.2s, color 0.2s; border: none; cursor: pointer; }
        .upload-label { transition: border-color 0.2s, background 0.2s; }

        /* ── Layout ── */
        .ltm-outer {
          display: flex;
          gap: 30px;
          align-items: flex-start;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .ltm-cards {
  display: flex;
  flex-direction: row;      /* 👈 important */
  gap: 20px;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;          /* 👈 allows responsive wrap */
}
        .ltm-plans-col {
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .ltm-payment-col {
          flex: 1 1 0;
          min-width: 0;
          max-width: 500px;
          animation: slideInRight 0.38s cubic-bezier(0.23,1,0.32,1) both;
        }
        .ltm-cards-multi {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          align-items: flex-end;
          animation: fadeIn 0.4s ease both;
        }
        .ltm-tabs-row { display: flex; max-width: 620px; margin: 0 auto 36px; background: #faf6f0; border-radius: 14px; border: 1px solid ${BORDER}; padding: 4px; gap: 3px; }
        @media (max-width: 1280px) {
          .ltm-outer { gap: 24px; padding: 0 20px 80px; }
        }
        @media (max-width: 960px) {
          .ltm-outer        { flex-direction: column !important; align-items: stretch !important; gap: 28px !important; }
          .ltm-plans-col    { justify-content: center !important; }
          .ltm-payment-col  { max-width: 100% !important; animation: fadeIn 0.3s ease both !important; }
          .ltm-card         { flex: 1 1 260px !important; }
          .ltm-cards-multi  { gap: 12px !important; }
        }
        @media (max-width: 640px) {
          .ltm-outer        { padding: 0 14px 60px !important; gap: 20px !important; }
          .ltm-card         { max-width: 100% !important; width: 100% !important; }
          .ltm-cards-multi  { flex-direction: column !important; align-items: stretch !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', padding: '44px 20px 40px', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid ${BORDER_HI}`, borderRadius: 20, padding: '4px 16px', marginBottom: 22 }}>
            <span style={{ fontSize: 12, color: MUTED, fontWeight: 600, letterSpacing: '0.5px' }}>LTM Membership</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px,4vw,42px)', fontWeight: 800, color: CREAM, lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.4px' }}>
            Find the Perfect Plan to Elevate<br />Your Mentorship Journey
          </h1>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            Connect with <strong style={{ color: CREAM }}>{mentor.fullName}</strong> — flexible guidance for every stage.
          </p>
          {currentStatus && (
            <div style={{ marginTop: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT, letterSpacing: '0.4px', textTransform: 'capitalize' }}>
                {currentStatus} pricing
              </span>
            </div>
          )}
        </div>

        {/* ── Tab selector ── */}
        {PLANS.length > 1 && !showPayment && (
          <div className="ltm-tabs-row" style={{ maxWidth: PLANS.length === 2 ? 460 : 620 }}>
            {PLANS.map(plan => {
              const isActive = effectiveSelected === plan.key;
              return (
                <button
                  key={plan.key}
                  className="ltm-tab pay-tab-btn"
                  onClick={() => { setSelected(plan.key); setShowPayment(false); setUploadError(''); setTransactionId(''); setScreenshotUrl(''); setScreenshotName(''); }}
                  style={{ flex: 1, position: 'relative', padding: '13px 10px', borderRadius: 10, cursor: 'pointer', background: isActive ? ACCENT : 'transparent', fontFamily: FONT, textAlign: 'center' }}
                >
                  {plan.badge && (
                    <span style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: ACCENT, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.4px' }}>{plan.badge}</span>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: isActive ? '#fff' : MUTED }}>{plan.months} {plan.months === 1 ? 'month' : 'months'}</div>
                  <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.7)' : MUTED2 }}>{plan.tabSub}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Main two-column layout ── */}
        <div className="ltm-outer">

          {/* ── LEFT / PLANS COLUMN ── */}
          <div className="ltm-plans-col">
            <div className="ltm-cards">
              {(showPayment ? PLANS.filter(p => p.key === effectiveSelected) : PLANS).map(plan => {
                const isSelected = effectiveSelected === plan.key;
                const borderColor = isSelected ? ACCENT : plan.featured ? BORDER_HI : BORDER;
                const shadow = isSelected
                  ? `0 20px 56px rgba(127,169,166,0.18), 0 0 0 1.5px ${ACCENT}`
                  : plan.featured
                    ? `0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px ${BORDER_HI}`
                    : '0 2px 8px rgba(0,0,0,0.04)';
                const cardBg = plan.featured
                  ? isSelected ? '#f0f7f6' : CARD_FEAT
                  : isSelected ? '#f3f9f8' : CARD_BG;
                const lift = PLANS.length === 1
                  ? 'none'
                  : plan.featured
                    ? isSelected ? 'translateY(-18px) scale(1.02)' : 'translateY(-12px)'
                    : isSelected ? 'translateY(-8px) scale(1.01)' : 'translateY(0)';

                return (
                  <div
                    key={plan.key}
                    className="ltm-card"
                    onClick={() => setSelected(plan.key)}
                    style={{
                      position: 'relative',
                      flex: PLANS.length === 1 ? '0 0 380px' : '1 1 240px',
                      maxWidth: plan.featured ? 310 : (PLANS.length === 1 ? 380 : 285),
                      minWidth: 230,
                      cursor: 'pointer',
                      borderRadius: 18,
                      border: `1.5px solid ${borderColor}`,
                      background: cardBg,
                      boxShadow: shadow,
                      transform: lift,
                      padding: plan.featured ? '30px 22px 22px' : '24px 20px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {plan.badge && (
                      <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: ACCENT, color: '#fff', fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px' }}>{plan.badge}</div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: MUTED, margin: 0 }}>{plan.label}</p>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 9px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT }}>
                        {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 3 }}>
                      <span style={{ fontSize: plan.featured ? 44 : 36, fontWeight: 800, lineHeight: 1, color: CREAM }}>₹{plan.totalPrice.toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: 11, color: MUTED2, paddingBottom: 3 }}>/total</span>
                    </div>

                    <p style={{ fontSize: 11, color: MUTED, margin: '0 0 2px' }}>₹{plan.perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions</p>
                    <p style={{ fontSize: 10, color: MUTED2, margin: '0 0 14px' }}>{plan.sessionsPerWeek} session{plan.sessionsPerWeek !== 1 ? 's' : ''}/week</p>

                    <div style={{ height: 1, background: BORDER, margin: '0 0 14px' }} />

                    <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, margin: '0 0 16px' }}>{plan.description}</p>

                    <button
                      className="ltm-cta"
                      onClick={(e) => handleGetStarted(e, plan)}
                      disabled={isSubscribing}
                      style={{
                        width: '100%', padding: '11px', borderRadius: 50,
                        border: `1.5px solid ${ACCENT}`,
                        background: isSelected ? ACCENT : 'transparent',
                        color: isSelected ? '#fff' : ACCENT,
                        fontSize: 13, fontWeight: 700,
                        cursor: isSubscribing ? 'not-allowed' : 'pointer',
                        marginBottom: 18, fontFamily: FONT,
                        opacity: isSubscribing ? 0.6 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}
                    >
                      {isSubscribing && effectiveSelected === plan.key
                        ? <><Loader2 size={13} className="animate-spin" /> Processing…</>
                        : <>Get started <ChevronRight size={13} /></>}
                    </button>

                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px' }}>What's included</p>

                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                      {plan.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 15, height: 15, borderRadius: '50%', flexShrink: 0, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={8} color={ACCENT} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: 11, color: MUTED }}>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {isSelected && (
                      <div style={{ marginTop: 14, textAlign: 'center', fontSize: 11, fontWeight: 700, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <Check size={11} strokeWidth={3} /> Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT / PAYMENT COLUMN ── */}
          {showPayment && paymentPlan && (
            <div ref={payPanelRef} className="ltm-payment-col">

              {/* Back link */}
              <button
                onClick={() => { setShowPayment(false); setUploadError(''); setTransactionId(''); setScreenshotUrl(''); setScreenshotName(''); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: MUTED, fontSize: 13, fontWeight: 600, fontFamily: FONT, marginBottom: 20, padding: 0, letterSpacing: '0.1px' }}
              >
                <ArrowLeft size={15} /> Change plan
              </button>

              {/* Panel card */}
              <div style={{ background: CARD_BG, border: `1.5px solid ${BORDER_HI}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 20px 60px rgba(45,45,45,0.12), 0 4px 16px rgba(45,45,45,0.06)' }}>

                {/* ── Header strip ── */}
                <div style={{ background: CREAM, padding: '22px 28px 20px' }}>
                  {/* Top row: avatar + name + amount */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff', flexShrink: 0, letterSpacing: '-0.5px' }}>
                      {mentor.fullName?.[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, margin: '0 0 2px', lineHeight: 1.2 }}>{mentor.fullName}</p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>{mentor.currentRole}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: '#fff', fontWeight: 800, fontSize: 26, margin: 0, lineHeight: 1, letterSpacing: '-0.5px' }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</p>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, margin: '3px 0 0' }}>{paymentPlan.months} months · {paymentPlan.totalSessions} sessions</p>
                    </div>
                  </div>
                  {/* Plan summary pills */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[
                      `${paymentPlan.label}`,
                      `${paymentPlan.sessionsPerWeek} sessions/week`,
                      `₹${paymentPlan.perSession.toLocaleString('en-IN')}/session`,
                    ].map(t => (
                      <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)', letterSpacing: '0.2px' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* ── Scrollable body ── */}
                <div style={{ padding: '24px 28px 0', overflowY: 'auto', maxHeight: 'calc(100vh - 320px)' }}>

                  {/* Section label */}
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 14px' }}>Choose payment method</p>

                  {/* ── Method tabs ── */}
                  <div style={{ display: 'flex', background: '#f0ede8', borderRadius: 12, padding: 4, gap: 4, marginBottom: 20 }}>
                    {[{ id: 'qr', Icon: QrCode, label: 'Scan QR Code' }, { id: 'upi', Icon: Link2, label: 'UPI ID' }].map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        className="pay-tab-btn"
                        onClick={() => setPayTab(id)}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '11px 14px', borderRadius: 9, fontFamily: FONT, background: payTab === id ? CREAM : 'transparent', color: payTab === id ? '#fff' : MUTED, fontSize: 13, fontWeight: 700, letterSpacing: '0.1px' }}
                      >
                        <Icon size={14} />{label}
                      </button>
                    ))}
                  </div>

                  {/* ── QR panel ── */}
                  {payTab === 'qr' && (
                    <div style={{ display: 'flex', gap: 20, marginBottom: 20, alignItems: 'flex-start' }}>
                      {/* QR image */}
                      <div style={{ background: '#fff', border: `1.5px solid ${BORDER_HI}`, borderRadius: 16, padding: 14, flexShrink: 0, boxShadow: '0 4px 16px rgba(45,45,45,0.06)' }}>
                        <img
                          src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="UPI QR Code"
                          style={{ width: 150, height: 150, borderRadius: 8, display: 'block' }}
                        />
                      </div>
                      {/* Right side info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: CREAM, margin: '0 0 8px' }}>Scan with any UPI app</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                          {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(a => (
                            <span key={a} style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT_D }}>{a}</span>
                          ))}
                        </div>
                        <div style={{ background: ACCENT_L, border: `1px solid ${BORDER_HI}`, borderRadius: 12, padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                            <AlertCircle size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 1 }} />
                            <div>
                              <p style={{ fontSize: 12, fontWeight: 700, color: CREAM, margin: '0 0 3px' }}>Pay exact amount</p>
                              <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                                Send exactly <strong style={{ color: CREAM }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</strong>.<br />Wrong amounts delay activation by 48h.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── UPI ID panel ── */}
                  {payTab === 'upi' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                      {[
                        { label: 'Primary UPI ID', val: UPI_PRIMARY, copied: copiedP, setter: setCopiedP },
                        { label: 'Secondary UPI ID', val: UPI_SECONDARY, copied: copiedS, setter: setCopiedS },
                      ].map(row => (
                        <div key={row.label} style={{ background: '#faf9f7', border: `1.5px solid ${BORDER_HI}`, borderRadius: 14, padding: '14px 16px' }}>
                          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 8px' }}>{row.label}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: CREAM, wordBreak: 'break-all', letterSpacing: '0.2px' }}>{row.val}</span>
                            <button
                              onClick={() => copyText(row.val, row.setter)}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, padding: '7px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: FONT, background: row.copied ? ACCENT : CREAM, color: '#fff', flexShrink: 0, transition: 'background 0.2s' }}
                            >
                              {row.copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                            </button>
                          </div>
                        </div>
                      ))}
                      <div style={{ background: ACCENT_L, border: `1px solid ${BORDER_HI}`, borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <AlertCircle size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.6 }}>
                          Pay exactly <strong style={{ color: CREAM }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</strong> — wrong amounts delay activation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── Divider ── */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0 20px' }}>
                    <div style={{ flex: 1, height: 1, background: BORDER_HI }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: MUTED2, whiteSpace: 'nowrap' }}>After Payment</span>
                    <div style={{ flex: 1, height: 1, background: BORDER_HI }} />
                  </div>

                  {/* ── Screenshot upload ── */}
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 8px' }}>
                      Payment Screenshot <span style={{ color: ACCENT, fontWeight: 800 }}>*</span>
                    </p>
                    <label
                      className="upload-label"
                      style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                        border: `2px ${screenshotUrl ? 'solid' : 'dashed'} ${screenshotUrl ? ACCENT : BORDER_HI}`,
                        borderRadius: 16, padding: '28px 16px', cursor: 'pointer',
                        background: screenshotUrl ? ACCENT_L : uploading ? '#faf9f7' : '#faf9f7',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: 'none' }} disabled={uploading} onChange={e => handleFileUpload(e.target.files[0])} />
                      {uploading ? (
                        <>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT_L, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 size={18} color={ACCENT} className="animate-spin" /></div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: CREAM, margin: 0 }}>Uploading…</p>
                          <p style={{ fontSize: 11, color: MUTED2, margin: 0 }}>Please wait</p>
                        </>
                      ) : screenshotUrl ? (
                        <>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT_M, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={18} color={ACCENT_D} strokeWidth={2.5} /></div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: CREAM, margin: 0 }}>Screenshot uploaded ✓</p>
                          <p style={{ fontSize: 11, color: MUTED2, margin: 0, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{screenshotName}</p>
                          <p style={{ fontSize: 10, color: ACCENT_D, margin: 0, fontWeight: 600 }}>Click to replace</p>
                        </>
                      ) : (
                        <>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT_L, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={18} color={ACCENT} /></div>
                          <p style={{ fontSize: 13, fontWeight: 700, color: CREAM, margin: 0 }}>Upload payment screenshot</p>
                          <p style={{ fontSize: 11, color: MUTED2, margin: 0 }}>JPG, PNG · Max 5MB</p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* ── UTR input ── */}
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 8px' }}>
                      Transaction / UTR ID <span style={{ color: ACCENT, fontWeight: 800 }}>*</span>
                    </p>
                    <input
                      className="ltm-input"
                      style={{ width: '100%', background: '#faf9f7', border: `1.5px solid ${BORDER_HI}`, borderRadius: 12, padding: '13px 16px', fontSize: 14, fontWeight: 700, color: CREAM, caretColor: ACCENT, fontFamily: FONT, letterSpacing: '0.5px' }}
                      placeholder="e.g. T2312XXXXXXX"
                      value={transactionId}
                      onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(''); }}
                    />
                    <p style={{ fontSize: 10, color: MUTED2, margin: '5px 0 0', paddingLeft: 2 }}>Find this in your UPI app under payment history</p>
                  </div>

                  {/* ── Discount ── */}
                  <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                    <input
                      className="ltm-input"
                      style={{ flex: 1, background: '#faf9f7', border: `1.5px solid ${BORDER_HI}`, borderRadius: 12, padding: '13px 16px', fontSize: 13, fontWeight: 600, color: CREAM, caretColor: ACCENT, fontFamily: FONT }}
                      placeholder="Discount code (optional)"
                      value={discountCode}
                      onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                    />
                    <button style={{ background: CREAM, color: '#fff', border: 'none', borderRadius: 12, padding: '0 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: FONT, flexShrink: 0, letterSpacing: '0.2px' }}>Apply</button>
                  </div>

                  {/* ── Errors ── */}
                  {uploadError && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
                      <X size={14} color="#dc3545" style={{ flexShrink: 0 }} />
                      <p style={{ fontSize: 12, color: '#dc3545', margin: 0, fontWeight: 600 }}>{uploadError}</p>
                    </div>
                  )}
                  {payError && (
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 12, padding: '12px 14px', marginBottom: 12 }}>
                      <X size={14} color="#dc3545" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: '#dc3545', margin: '0 0 3px' }}>Submission failed</p>
                        <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>{payErrorData?.data?.message || 'Something went wrong. Please try again.'}</p>
                      </div>
                    </div>
                  )}

                  {/* bottom spacing so content clears sticky footer */}
                  <div style={{ height: 24 }} />
                </div>

                {/* ── Sticky footer ── */}
                <div style={{ padding: '18px 28px 20px', background: CARD_BG, borderTop: `1.5px solid ${BORDER_HI}` }}>
                  {/* Total row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Lock size={12} color={MUTED2} />
                      <span style={{ fontSize: 12, color: MUTED2, fontWeight: 600 }}>Secure payment</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                      <span style={{ fontSize: 12, color: MUTED2, fontWeight: 600 }}>Total</span>
                      <span style={{ fontSize: 24, fontWeight: 800, color: CREAM, letterSpacing: '-0.5px' }}>₹{paymentPlan.totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* CTA button */}
                  <button
                    className="ltm-cta"
                    onClick={handleConfirmPayment}
                    disabled={uploading || isSubmitting}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                      padding: '15px', borderRadius: 50, border: 'none', fontFamily: FONT,
                      background: uploading || isSubmitting ? ACCENT_M : ACCENT,
                      color: uploading || isSubmitting ? ACCENT_D : '#fff',
                      fontSize: 14, fontWeight: 700, letterSpacing: '0.2px',
                      cursor: uploading || isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: uploading || isSubmitting ? 'none' : '0 10px 28px rgba(127,169,166,0.35)',
                    }}
                  >
                    {isSubmitting
                      ? <><Loader2 size={16} className="animate-spin" /> Submitting payment…</>
                      : uploading
                        ? <><Loader2 size={16} className="animate-spin" /> Uploading screenshot…</>
                        : <><Lock size={14} /> Confirm & Pay ₹{paymentPlan.totalPrice.toLocaleString('en-IN')} <ChevronRight size={15} /></>}
                  </button>

                  {/* Trust badges */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14 }}>
                    {[{ Icon: Shield, label: 'Secure Upload' }, { Icon: CheckCircle, label: '2hr Activation' }, { Icon: Lock, label: '100% Safe' }].map(({ Icon, label }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Icon size={11} color={MUTED2} />
                        <span style={{ fontSize: 10, color: MUTED2, fontWeight: 600 }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {PLANS.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: MUTED, fontFamily: FONT }}>
            <p>No plans available for this mentor yet.</p>
          </div>
        )}
      </div>
    </>
  );
}