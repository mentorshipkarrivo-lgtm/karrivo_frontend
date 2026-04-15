// // // import React, { useState } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { Check, X } from 'lucide-react';
// // // import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';

// // // const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// // // const PLAN_META = {
// // //   1: {
// // //     label: '1 Month Plan',
// // //     badge: null,
// // //     featured: false,
// // //     tabSub: 'No extra discount & EMI',
// // //     description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
// // //     btnBg: 'rgba(255,255,255,0.08)',
// // //     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
// // //     btnColor: '#fff',
// // //     features: [
// // //       'Direct 1-on-1 sessions',
// // //       'Personalised roadmap',
// // //       'Session recordings',
// // //       'Chat support between sessions',
// // //       'Progress check-in reports',
// // //     ],
// // //   },
// // //   3: {
// // //     label: 'Professional Plan',
// // //     badge: null,
// // //     featured: true,
// // //     tabSub: '6 Months EMI available',
// // //     description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
// // //     btnBg: 'linear-gradient(90deg,#d4a84b,#f0c96a)',
// // //     btnBorder: 'none',
// // //     btnColor: '#0a0a0a',
// // //     features: [
// // //       'All 1-Month Plan features',
// // //       'Weekly structured milestones',
// // //       'Resume & LinkedIn review',
// // //       'Mock interviews (2 sessions)',
// // //       'Priority scheduling',
// // //       'Community access',
// // //     ],
// // //   },
// // //   6: {
// // //     label: 'Business Plan',
// // //     badge: 'Most Popular',
// // //     featured: false,
// // //     tabSub: 'Lowest pricing per month',
// // //     description: 'For serious career transformation needing advanced tools and full mentors support.',
// // //     btnBg: 'rgba(255,255,255,0.08)',
// // //     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
// // //     btnColor: '#fff',
// // //     features: [
// // //       'All Professional Plan features',
// // //       'Unlimited mock interviews',
// // //       'Job referral support',
// // //       'Dedicated mentors hotline',
// // //       'Live project collaboration',
// // //       'Multi-channel support',
// // //       'Phone & Email support',
// // //     ],
// // //   },
// // // };

// // // function normalizePlans(apiPlans = {}, hourlyRate = 1500) {
// // //   const hasPlans = Object.keys(apiPlans).length > 0;

// // //   // If backend has real plans, use them
// // //   if (hasPlans) {
// // //     return Object.entries(apiPlans)
// // //       .map(([key, value]) => {
// // //         const months = value?.months ?? parseInt(key, 10);
// // //         const meta = PLAN_META[months];
// // //         if (!meta) return null;
// // //         return {
// // //           ...meta,
// // //           key: `${months}Month`,
// // //           months,
// // //           totalSessions: value?.totalSessions ?? 0,
// // //           totalPrice: value?.totalPrice ?? 0,
// // //         };
// // //       })
// // //       .filter(Boolean)
// // //       .sort((a, b) => a.months - b.months);
// // //   }

// // //   // Fallback: generate from hourlyRate
// // //   // Assume 4 sessions/month, slight discount for longer plans
// // //   const SESSION_DURATION_HRS = 0.5; // 30-min sessions
// // //   const sessionRate = Math.round(hourlyRate * SESSION_DURATION_HRS);

// // //   return [1, 3, 6].map((months) => {
// // //     const meta = PLAN_META[months];
// // //     const sessionsPerMonth = 4;
// // //     const totalSessions = months * sessionsPerMonth;
// // //     const discount = months === 1 ? 1 : months === 3 ? 0.9 : 0.8; // 0/10/20% off
// // //     const totalPrice = Math.round(sessionRate * totalSessions * discount);
// // //     return {
// // //       ...meta,
// // //       key: `${months}Month`,
// // //       months,
// // //       totalSessions,
// // //       totalPrice,
// // //     };
// // //   });
// // // }

// // // const MentorLTMPlans = () => {
// // //   const { mentorId } = useParams();
// // //   const navigate = useNavigate();
// // //   const [selected, setSelected] = useState(null);

// // //   const { data, isLoading, isError } = useFetchMentorByIdQuery(mentorId);
// // //   const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();

// // //   console.log(data,"data123456")

// // //   const mentors = data;

// // //   if (isLoading) return (
// // //     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// // //       <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#d4a84b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
// // //     </div>
// // //   );

// // //   if (isError || !mentors) return (
// // //     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
// // //       <div style={{ textAlign: 'center' }}>
// // //         <X size={32} color="#f87171" style={{ display: 'block', margin: '0 auto 12px' }} />
// // //         <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>Failed to load plans.</p>
// // //         <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 20px', color: '#fff', cursor: 'pointer' }}>Go Back</button>
// // //       </div>
// // //     </div>
// // //   );

// // // // inside MentorLTMPlans, replace the existing PLANS line:
// // // const PLANS = normalizePlans(mentors?.pricing?.plans, mentors?.hourlyRate);
// // //   const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);


// // //   const handleGetStarted = async (e, plan) => {
// // //     e.stopPropagation();

// // //     const userData = JSON.parse(localStorage.getItem('userData') || '{}');

// // //     const getCookie = (name) => {
// // //       const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
// // //       return match ? JSON.parse(decodeURIComponent(match.split('=')[1])) : {};
// // //     };
// // //     const profileData = getCookie('profileData');

// // //     const planTypeMap = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

// // //     try {
// // //       const result = await createSubscription({
// // //         mentor_id: mentors._id,
// // //         mentee_id: userData._id,
// // //         plan_type: planTypeMap[plan.months],
// // //         mentee_status: profileData.status,
// // //         amount: plan.totalPrice,
// // //         payment_status: 'pending',
// // //         payment_done: false,
// // //         payment_id: null,
// // //         paymentType: "subcription",
// // //         total_sessions: plan.totalSessions,
// // //       }).unwrap();

// // //       navigate('/payment', {
// // //         state: {
// // //           subscription_id: result?.data?._id,
// // //           mentorId: mentors._id,
// // //           mentorName: mentors.fullName,
// // //           mentorRole: mentors.currentRole,
// // //           menteeId: userData._id,
// // //           menteeName: userData.name,
// // //           planMonths: plan.months,
// // //           paymentType: "subcription",
// // //           totalSessions: plan.totalSessions,
// // //           basePrice: plan.totalPrice,
// // //           createdBy: userData._id,
// // //         },
// // //       });
// // //     } catch (err) {
// // //       console.error('Subscription creation failed:', err);
// // //       // Optionally show a toast/error message here
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
// // //         @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
// // //         @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
// // //         * { box-sizing: border-box; }
// // //         .ltm-card { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important; }
// // //         .ltm-tab  { transition: background 0.22s ease !important; }
// // //         .ltm-cta:hover { opacity: 0.82 !important; transform: translateY(-1px) !important; }
// // //         .ltm-cta  { transition: opacity 0.2s, transform 0.18s !important; }
// // //         .ltm-back:hover { background: rgba(255,255,255,0.09) !important; }
// // //         .ltm-back { transition: background 0.18s !important; }
// // //       `}</style>

// // //       <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: FONT }}>

// // //         {/* ── Hero ── */}
// // //         <div style={{ textAlign: 'center', padding: '44px 20px 50px', animation: 'fadeUp 0.5s ease both' }}>
// // //           <div style={{
// // //             display: 'inline-flex', alignItems: 'center', gap: 6,
// // //             border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
// // //             padding: '4px 14px', marginBottom: 22,
// // //           }}>
// // //             <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>LTM Membership</span>
// // //           </div>

// // //           <h1 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.4px' }}>
// // //             Find the Perfect Plan to Elevate<br />Your Mentorship Journey
// // //           </h1>

// // //           <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.36)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
// // //             Connect with{' '}
// // //             <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{mentors.fullName}</strong>
// // //             {' '}— flexible guidance for every stage.
// // //           </p>

// // //           <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
// // //             {PLANS.map(p => (
// // //               <span key={p.key} style={{
// // //                 fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20,
// // //                 background: 'rgba(212,168,75,0.1)', border: '1px solid rgba(212,168,75,0.22)',
// // //                 color: '#d4a84b', letterSpacing: '0.3px',
// // //               }}>
// // //                 {p.months} {p.months === 1 ? 'Month' : 'Months'} available
// // //               </span>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* ── Tab selector ── */}
// // //         {PLANS.length > 1 && (
// // //           <div style={{
// // //             display: 'flex',
// // //             maxWidth: PLANS.length === 2 ? 460 : 620,
// // //             margin: '0 auto 40px',
// // //             background: '#1a1a1a', borderRadius: 14,
// // //             border: '1px solid rgba(255,255,255,0.08)', padding: 4, gap: 3,
// // //           }}>
// // //             {PLANS.map(plan => {
// // //               const isActive = effectiveSelected === plan.key;
// // //               return (
// // //                 <button key={plan.key} className="ltm-tab" onClick={() => setSelected(plan.key)} style={{
// // //                   flex: 1, position: 'relative', padding: '14px 10px', borderRadius: 10,
// // //                   border: 'none', cursor: 'pointer',
// // //                   background: isActive ? '#fff' : 'transparent',
// // //                   fontFamily: FONT, textAlign: 'center',
// // //                 }}>
// // //                   {plan.badge && (
// // //                     <span style={{
// // //                       position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// // //                       background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
// // //                       fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
// // //                       whiteSpace: 'nowrap', letterSpacing: '0.4px',
// // //                     }}>{plan.badge}</span>
// // //                   )}
// // //                   <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
// // //                     {plan.months} {plan.months === 1 ? 'month' : 'months'}
// // //                   </div>
// // //                   <div style={{ fontSize: 11, color: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)' }}>
// // //                     {plan.tabSub}
// // //                   </div>
// // //                 </button>
// // //               );
// // //             })}
// // //           </div>
// // //         )}

// // //         {/* ── Cards ── */}
// // //         <div style={{
// // //           display: 'flex', flexWrap: 'wrap', gap: 16,
// // //           justifyContent: 'center', alignItems: 'flex-end',
// // //           maxWidth: PLANS.length === 1 ? 400 : 1060,
// // //           margin: '0 auto', padding: '0 20px 80px',
// // //           animation: 'fadeIn 0.4s ease both',
// // //         }}>
// // //           {PLANS.map(plan => {
// // //             const isSelected = effectiveSelected === plan.key;
// // //             const perSession = plan.totalSessions > 0 ? Math.round(plan.totalPrice / plan.totalSessions) : 0;

// // //             const borderColor = isSelected
// // //               ? plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)'
// // //               : plan.featured ? 'rgba(212,168,75,0.3)' : 'rgba(255,255,255,0.09)';

// // //             const shadow = isSelected
// // //               ? plan.featured
// // //                 ? '0 24px 64px rgba(212,168,75,0.28), 0 0 0 1px rgba(212,168,75,0.18)'
// // //                 : '0 20px 50px rgba(255,255,255,0.07)'
// // //               : plan.featured ? '0 10px 36px rgba(212,168,75,0.1)' : 'none';

// // //             const bg = plan.featured
// // //               ? isSelected ? '#1c1500' : '#121000'
// // //               : isSelected ? '#191919' : '#131313';

// // //             const lift = PLANS.length === 1 ? 'none'
// // //               : plan.featured
// // //                 ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
// // //                 : isSelected ? 'translateY(-10px) scale(1.02)' : 'translateY(0)';

// // //             return (
// // //               <div key={plan.key} className="ltm-card" onClick={() => setSelected(plan.key)} style={{
// // //                 position: 'relative',
// // //                 flex: PLANS.length === 1 ? '0 0 360px' : '1 1 280px',
// // //                 maxWidth: plan.featured ? 340 : (PLANS.length === 1 ? 360 : 308),
// // //                 minWidth: 260, cursor: 'pointer', borderRadius: 18,
// // //                 border: `1.5px solid ${borderColor}`, background: bg, boxShadow: shadow, transform: lift,
// // //                 padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
// // //                 display: 'flex', flexDirection: 'column',
// // //               }}>
// // //                 {plan.badge && (
// // //                   <div style={{
// // //                     position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// // //                     background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
// // //                     fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20,
// // //                     whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px',
// // //                   }}>{plan.badge}</div>
// // //                 )}

// // //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
// // //                   <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{plan.label}</p>
// // //                   <span style={{
// // //                     fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
// // //                     background: plan.featured ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.05)',
// // //                     border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.25)' : 'rgba(255,255,255,0.1)'}`,
// // //                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.3)',
// // //                   }}>
// // //                     {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
// // //                   </span>
// // //                 </div>

// // //                 <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
// // //                   <span style={{
// // //                     fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1,
// // //                     color: isSelected
// // //                       ? plan.featured ? '#f0c96a' : '#fff'
// // //                       : plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.82)',
// // //                   }}>
// // //                     ₹{plan.totalPrice.toLocaleString('en-IN')}
// // //                   </span>
// // //                   <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', paddingBottom: 4 }}>/total</span>
// // //                 </div>

// // //                 <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: '0 0 14px' }}>
// // //                   ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
// // //                 </p>

// // //                 <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 14px' }} />

// // //                 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: '0 0 20px' }}>
// // //                   {plan.description}
// // //                 </p>

// // //                 {/* ── Get Started → passes plan data dynamically ── */}
// // //                 <button className="ltm-cta" onClick={(e) => handleGetStarted(e, plan)} style={{
// // //                   width: '100%', padding: '12px', borderRadius: 50,
// // //                   border: plan.btnBorder, background: plan.btnBg, color: plan.btnColor,
// // //                   fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 22, fontFamily: FONT,
// // //                 }}>
// // //                   Get started →
// // //                 </button>

// // //                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', margin: '0 0 12px' }}>
// // //                   What's included
// // //                 </p>

// // //                 <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
// // //                   {plan.features.map((feat, i) => (
// // //                     <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
// // //                       <div style={{
// // //                         width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
// // //                         background: plan.featured ? 'rgba(212,168,75,0.14)' : 'rgba(255,255,255,0.05)',
// // //                         border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.28)' : 'rgba(255,255,255,0.1)'}`,
// // //                         display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //                       }}>
// // //                         <Check size={8} color={plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.4)'} strokeWidth={3} />
// // //                       </div>
// // //                       <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)' }}>{feat}</span>
// // //                     </li>
// // //                   ))}
// // //                 </ul>

// // //                 {isSelected && (
// // //                   <div style={{
// // //                     marginTop: 18, textAlign: 'center', fontSize: 12, fontWeight: 700,
// // //                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)',
// // //                     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
// // //                   }}>
// // //                     <Check size={12} strokeWidth={3} /> Selected
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             );
// // //           })}
// // //         </div>

// // //         {PLANS.length === 0 && (
// // //           <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: 'rgba(255,255,255,0.3)', fontFamily: FONT }}>
// // //             <p>No plans available for this mentors yet.</p>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default MentorLTMPlans;




// // import React, { useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { Check, X } from 'lucide-react';
// // import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
// // import Cookies from "js-cookie";
// // const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// // const PLAN_META = {
// //   1: {
// //     label: '1 Month Plan',
// //     badge: null,
// //     featured: false,
// //     tabSub: 'No extra discount & EMI',
// //     description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
// //     btnBg: 'rgba(255,255,255,0.08)',
// //     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
// //     btnColor: '#fff',
// //     features: [
// //       'Direct 1-on-1 sessions',
// //       'Personalised roadmap',
// //       'Session recordings',
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
// //     btnBg: 'linear-gradient(90deg,#d4a84b,#f0c96a)',
// //     btnBorder: 'none',
// //     btnColor: '#0a0a0a',
// //     features: [
// //       'All 1-Month Plan features',
// //       'Weekly structured milestones',
// //       'Resume & LinkedIn review',
// //       'Mock interviews (2 sessions)',
// //       'Priority scheduling',
// //       'Community access',
// //     ],
// //   },
// //   6: {
// //     label: 'Business Plan',
// //     badge: 'Most Popular',
// //     featured: false,
// //     tabSub: 'Lowest pricing per month',
// //     description: 'For serious career transformation needing advanced tools and full mentors support.',
// //     btnBg: 'rgba(255,255,255,0.08)',
// //     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
// //     btnColor: '#fff',
// //     features: [
// //       'All Professional Plan features',
// //       'Unlimited mock interviews',
// //       'Job referral support',
// //       'Dedicated mentors hotline',
// //       'Live project collaboration',
// //       'Multi-channel support',
// //       'Phone & Email support',
// //     ],
// //   },
// // };

// // function normalizePlans(formattedPlans = {}) {
// //   if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];

// //   const keyToMonths = {
// //     one_month: 1,
// //     three_months: 3,
// //     six_months: 6,
// //   };

// //   return Object.entries(formattedPlans)
// //     .map(([key, value]) => {
// //       const months = keyToMonths[key];
// //       const meta = PLAN_META[months];
// //       if (!meta || !value) return null;

// //       return {
// //         ...meta,
// //         key: `${months}Month`,
// //         months,
// //         sessionsPerWeek: value.sessionsPerWeek,
// //         totalSessions: value.totalSessions,
// //         perSession: value.perSession,       // already per session price from API
// //         totalPrice: value.totalAmount,      // total = perSession * totalSessions
// //       };
// //     })
// //     .filter(Boolean)
// //     .sort((a, b) => a.months - b.months);
// // }

// // const MentorLTMPlans = () => {
// //   const { mentorId } = useParams();
// //   const navigate = useNavigate();
// //   const [selected, setSelected] = useState(null);

// //   // const { data, isLoading, isError } = useFetchMentorByIdQuery(mentorId);



// //   const cookieData = Cookies.get("profileData");

// //   const userData = cookieData ? JSON.parse(cookieData) : null;

// //   const currentStatus = userData?.profile?.currentStatus;

// //   const { data: mentor, isLoading, isError } =
// //     useFetchMentorByIdQuery({ mentorId, currentStatus });




// //   const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();

// //   const mentors = mentor;
// //   console.log(mentors, "mentor1w2e3");

// //   if (isLoading) return (
// //     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //       <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#d4a84b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
// //     </div>
// //   );

// //   if (isError || !mentors) return (
// //     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
// //       <div style={{ textAlign: 'center' }}>
// //         <X size={32} color="#f87171" style={{ display: 'block', margin: '0 auto 12px' }} />
// //         <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>Failed to load plans.</p>
// //         <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 20px', color: '#fff', cursor: 'pointer' }}>Go Back</button>
// //       </div>
// //     </div>
// //   );

// //   // inside MentorLTMPlans, replace the existing PLANS line:
// //   const perSession = plan.perSession ?? 0;
// //   const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);


// //   const handleGetStarted = async (e, plan) => {
// //     e.stopPropagation();

// //     const userData = JSON.parse(localStorage.getItem('userData') || '{}');

// //     const getCookie = (name) => {
// //       const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
// //       return match ? JSON.parse(decodeURIComponent(match.split('=')[1])) : {};
// //     };
// //     const profileData = getCookie('profileData');

// //     const planTypeMap = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

// //     try {
// //       const result = await createSubscription({
// //         mentor_id: mentors._id,
// //         mentee_id: userData._id,
// //         plan_type: planTypeMap[plan.months],
// //         mentee_status: profileData.status,
// //         amount: plan.totalPrice,
// //         payment_status: 'pending',
// //         payment_done: false,
// //         payment_id: null,
// //         paymentType: "subcription",
// //         total_sessions: plan.totalSessions,
// //       }).unwrap();

// //       navigate('/payment', {
// //         state: {
// //           subscription_id: result?.data?._id,
// //           mentorId: mentors._id,
// //           mentorName: mentors.fullName,
// //           mentorRole: mentors.currentRole,
// //           menteeId: userData._id,
// //           menteeName: userData.name,
// //           planMonths: plan.months,
// //           paymentType: "subcription",
// //           totalSessions: plan.totalSessions,
// //           basePrice: plan.totalPrice,
// //           createdBy: userData._id,
// //         },
// //       });
// //     } catch (err) {
// //       console.error('Subscription creation failed:', err);
// //       // Optionally show a toast/error message here
// //     }
// //   };

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
// //         @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
// //         @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
// //         * { box-sizing: border-box; }
// //         .ltm-card { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important; }
// //         .ltm-tab  { transition: background 0.22s ease !important; }
// //         .ltm-cta:hover { opacity: 0.82 !important; transform: translateY(-1px) !important; }
// //         .ltm-cta  { transition: opacity 0.2s, transform 0.18s !important; }
// //         .ltm-back:hover { background: rgba(255,255,255,0.09) !important; }
// //         .ltm-back { transition: background 0.18s !important; }
// //       `}</style>

// //       <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: FONT }}>

// //         {/* ── Hero ── */}
// //         <div style={{ textAlign: 'center', padding: '44px 20px 50px', animation: 'fadeUp 0.5s ease both' }}>
// //           <div style={{
// //             display: 'inline-flex', alignItems: 'center', gap: 6,
// //             border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
// //             padding: '4px 14px', marginBottom: 22,
// //           }}>
// //             <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>LTM Membership</span>
// //           </div>

// //           <h1 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.4px' }}>
// //             Find the Perfect Plan to Elevate<br />Your Mentorship Journey
// //           </h1>

// //           <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.36)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
// //             Connect with{' '}
// //             <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{mentors.fullName}</strong>
// //             {' '}— flexible guidance for every stage.
// //           </p>

// //           <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
// //             {PLANS.map(p => (
// //               <span key={p.key} style={{
// //                 fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20,
// //                 background: 'rgba(212,168,75,0.1)', border: '1px solid rgba(212,168,75,0.22)',
// //                 color: '#d4a84b', letterSpacing: '0.3px',
// //               }}>
// //                 {p.months} {p.months === 1 ? 'Month' : 'Months'} available
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         {/* ── Tab selector ── */}
// //         {PLANS.length > 1 && (
// //           <div style={{
// //             display: 'flex',
// //             maxWidth: PLANS.length === 2 ? 460 : 620,
// //             margin: '0 auto 40px',
// //             background: '#1a1a1a', borderRadius: 14,
// //             border: '1px solid rgba(255,255,255,0.08)', padding: 4, gap: 3,
// //           }}>
// //             {PLANS.map(plan => {
// //               const isActive = effectiveSelected === plan.key;
// //               return (
// //                 <button key={plan.key} className="ltm-tab" onClick={() => setSelected(plan.key)} style={{
// //                   flex: 1, position: 'relative', padding: '14px 10px', borderRadius: 10,
// //                   border: 'none', cursor: 'pointer',
// //                   background: isActive ? '#fff' : 'transparent',
// //                   fontFamily: FONT, textAlign: 'center',
// //                 }}>
// //                   {plan.badge && (
// //                     <span style={{
// //                       position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// //                       background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
// //                       fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
// //                       whiteSpace: 'nowrap', letterSpacing: '0.4px',
// //                     }}>{plan.badge}</span>
// //                   )}
// //                   <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
// //                     {plan.months} {plan.months === 1 ? 'month' : 'months'}
// //                   </div>
// //                   <div style={{ fontSize: 11, color: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)' }}>
// //                     {plan.tabSub}
// //                   </div>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {/* ── Cards ── */}
// //         <div style={{
// //           display: 'flex', flexWrap: 'wrap', gap: 16,
// //           justifyContent: 'center', alignItems: 'flex-end',
// //           maxWidth: PLANS.length === 1 ? 400 : 1060,
// //           margin: '0 auto', padding: '0 20px 80px',
// //           animation: 'fadeIn 0.4s ease both',
// //         }}>
// //           {PLANS.map(plan => {
// //             const isSelected = effectiveSelected === plan.key;
// //             const perSession = plan.totalSessions > 0 ? Math.round(plan.totalPrice / plan.totalSessions) : 0;

// //             const borderColor = isSelected
// //               ? plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)'
// //               : plan.featured ? 'rgba(212,168,75,0.3)' : 'rgba(255,255,255,0.09)';

// //             const shadow = isSelected
// //               ? plan.featured
// //                 ? '0 24px 64px rgba(212,168,75,0.28), 0 0 0 1px rgba(212,168,75,0.18)'
// //                 : '0 20px 50px rgba(255,255,255,0.07)'
// //               : plan.featured ? '0 10px 36px rgba(212,168,75,0.1)' : 'none';

// //             const bg = plan.featured
// //               ? isSelected ? '#1c1500' : '#121000'
// //               : isSelected ? '#191919' : '#131313';

// //             const lift = PLANS.length === 1 ? 'none'
// //               : plan.featured
// //                 ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
// //                 : isSelected ? 'translateY(-10px) scale(1.02)' : 'translateY(0)';

// //             return (
// //               <div key={plan.key} className="ltm-card" onClick={() => setSelected(plan.key)} style={{
// //                 position: 'relative',
// //                 flex: PLANS.length === 1 ? '0 0 360px' : '1 1 280px',
// //                 maxWidth: plan.featured ? 340 : (PLANS.length === 1 ? 360 : 308),
// //                 minWidth: 260, cursor: 'pointer', borderRadius: 18,
// //                 border: `1.5px solid ${borderColor}`, background: bg, boxShadow: shadow, transform: lift,
// //                 padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
// //                 display: 'flex', flexDirection: 'column',
// //               }}>
// //                 {plan.badge && (
// //                   <div style={{
// //                     position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
// //                     background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
// //                     fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20,
// //                     whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px',
// //                   }}>{plan.badge}</div>
// //                 )}

// //                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
// //                   <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{plan.label}</p>
// //                   <span style={{
// //                     fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
// //                     background: plan.featured ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.05)',
// //                     border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.25)' : 'rgba(255,255,255,0.1)'}`,
// //                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.3)',
// //                   }}>
// //                     {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
// //                   </span>
// //                 </div>

// //                 <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
// //                   <span style={{
// //                     fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1,
// //                     color: isSelected
// //                       ? plan.featured ? '#f0c96a' : '#fff'
// //                       : plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.82)',
// //                   }}>
// //                     ₹{plan.totalPrice.toLocaleString('en-IN')}
// //                   </span>
// //                   <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', paddingBottom: 4 }}>/total</span>
// //                 </div>

// //                 <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: '0 0 14px' }}>
// //                   ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
// //                 </p>

// //                 <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 14px' }} />

// //                 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: '0 0 20px' }}>
// //                   {plan.description}
// //                 </p>

// //                 {/* ── Get Started → passes plan data dynamically ── */}
// //                 <button className="ltm-cta" onClick={(e) => handleGetStarted(e, plan)} style={{
// //                   width: '100%', padding: '12px', borderRadius: 50,
// //                   border: plan.btnBorder, background: plan.btnBg, color: plan.btnColor,
// //                   fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 22, fontFamily: FONT,
// //                 }}>
// //                   Get started →
// //                 </button>

// //                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', margin: '0 0 12px' }}>
// //                   What's included
// //                 </p>

// //                 <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
// //                   {plan.features.map((feat, i) => (
// //                     <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
// //                       <div style={{
// //                         width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
// //                         background: plan.featured ? 'rgba(212,168,75,0.14)' : 'rgba(255,255,255,0.05)',
// //                         border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.28)' : 'rgba(255,255,255,0.1)'}`,
// //                         display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                       }}>
// //                         <Check size={8} color={plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.4)'} strokeWidth={3} />
// //                       </div>
// //                       <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)' }}>{feat}</span>
// //                     </li>
// //                   ))}
// //                 </ul>

// //                 {isSelected && (
// //                   <div style={{
// //                     marginTop: 18, textAlign: 'center', fontSize: 12, fontWeight: 700,
// //                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)',
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
// //           <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: 'rgba(255,255,255,0.3)', fontFamily: FONT }}>
// //             <p>No plans available for this mentors yet.</p>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default MentorLTMPlans;

// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Check, X } from 'lucide-react';
// import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
// import Cookies from "js-cookie";

// const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// const PLAN_META = {
//   1: {
//     label: '1 Month Plan',
//     badge: null,
//     featured: false,
//     tabSub: 'No extra discount & EMI',
//     description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
//     btnBg: 'rgba(255,255,255,0.08)',
//     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
//     btnColor: '#fff',
//     features: [
//       'Direct 1-on-1 sessions',
//       'Personalised roadmap',
//       'Session recordings',
//       'Chat support between sessions',
//       'Progress check-in reports',
//     ],
//   },
//   3: {
//     label: 'Professional Plan',
//     badge: null,
//     featured: true,
//     tabSub: '6 Months EMI available',
//     description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
//     btnBg: 'linear-gradient(90deg,#d4a84b,#f0c96a)',
//     btnBorder: 'none',
//     btnColor: '#0a0a0a',
//     features: [
//       'All 1-Month Plan features',
//       'Weekly structured milestones',
//       'Resume & LinkedIn review',
//       'Mock interviews (2 sessions)',
//       'Priority scheduling',
//       'Community access',
//     ],
//   },
//   6: {
//     label: 'Business Plan',
//     badge: 'Most Popular',
//     featured: false,
//     tabSub: 'Lowest pricing per month',
//     description: 'For serious career transformation needing advanced tools and full mentor support.',
//     btnBg: 'rgba(255,255,255,0.08)',
//     btnBorder: '1.5px solid rgba(255,255,255,0.2)',
//     btnColor: '#fff',
//     features: [
//       'All Professional Plan features',
//       'Unlimited mock interviews',
//       'Job referral support',
//       'Dedicated mentor hotline',
//       'Live project collaboration',
//       'Multi-channel support',
//       'Phone & Email support',
//     ],
//   },
// };

// // Maps API plan keys to month numbers
// const KEY_TO_MONTHS = {
//   one_month: 1,
//   three_months: 3,
//   six_months: 6,
// };

// // Maps month numbers back to API plan keys
// const MONTHS_TO_KEY = {
//   1: 'one_month',
//   3: 'three_months',
//   6: 'six_months',
// };

// function normalizePlans(formattedPlans = {}) {
//   if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];

//   return Object.entries(formattedPlans)
//     .map(([key, value]) => {
//       const months = KEY_TO_MONTHS[key];
//       const meta = PLAN_META[months];
//       if (!meta || !value) return null;

//       return {
//         ...meta,
//         key: `${months}Month`,
//         months,
//         sessionsPerWeek: value.sessionsPerWeek ?? 0,
//         totalSessions: value.totalSessions ?? 0,
//         perSession: value.perSession ?? 0,       // direct from API — already per session price
//         totalPrice: value.totalAmount ?? 0,       // direct from API — perSession * totalSessions
//       };
//     })
//     .filter(Boolean)
//     .sort((a, b) => a.months - b.months);
// }

// const MentorLTMPlans = () => {
//   const { mentorId } = useParams();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(null);

//   const cookieData = Cookies.get("profileData");
//   const userData = cookieData ? JSON.parse(cookieData) : null;
//   const currentStatus = userData?.profile?.currentStatus;

//   const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery({ mentorId, currentStatus });
//   const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();

//   const mentors = mentor;

//   if (isLoading) return (
//     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#d4a84b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
//     </div>
//   );

//   if (isError || !mentors) return (
//     <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
//       <div style={{ textAlign: 'center' }}>
//         <X size={32} color="#f87171" style={{ display: 'block', margin: '0 auto 12px' }} />
//         <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>Failed to load plans.</p>
//         <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 20px', color: '#fff', cursor: 'pointer' }}>Go Back</button>
//       </div>
//     </div>
//   );

//   // Use API formattedPlans directly — no hardcoded fallback
//   const PLANS = normalizePlans(mentors?.pricing?.formattedPlans);
//   const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

//   const handleGetStarted = async (e, plan) => {
//     e.stopPropagation();

//     const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

//     const getCookie = (name) => {
//       const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
//       return match ? JSON.parse(decodeURIComponent(match.split('=')[1])) : {};
//     };
//     const profileData = getCookie('profileData');

//     try {
//       const result = await createSubscription({
//         mentor_id: mentors._id,
//         mentee_id: storedUser._id,
//         plan_type: MONTHS_TO_KEY[plan.months],   // one_month / three_months / six_months
//         mentee_status: currentStatus,             // fresher / experienced from cookie
//         amount: plan.totalPrice,
//         payment_status: 'pending',
//         payment_done: false,
//         payment_id: null,
//         paymentType: "subcription",
//         total_sessions: plan.totalSessions,
//       }).unwrap();

//       navigate('/payment', {
//         state: {
//           subscription_id: result?.data?._id,
//           mentorId: mentors._id,
//           mentorName: mentors.fullName,
//           mentorRole: mentors.currentRole,
//           menteeId: storedUser._id,
//           menteeName: storedUser.name,
//           planMonths: plan.months,
//           paymentType: "subcription",
//           totalSessions: plan.totalSessions,
//           perSession: plan.perSession,
//           basePrice: plan.totalPrice,
//           createdBy: storedUser._id,
//         },
//       });
//     } catch (err) {
//       console.error('Subscription creation failed:', err);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
//         @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
//         * { box-sizing: border-box; }
//         .ltm-card { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important; }
//         .ltm-tab  { transition: background 0.22s ease !important; }
//         .ltm-cta:hover { opacity: 0.82 !important; transform: translateY(-1px) !important; }
//         .ltm-cta  { transition: opacity 0.2s, transform 0.18s !important; }
//         .ltm-back:hover { background: rgba(255,255,255,0.09) !important; }
//         .ltm-back { transition: background 0.18s !important; }
//       `}</style>

//       <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: FONT }}>

//         {/* ── Hero ── */}
//         <div style={{ textAlign: 'center', padding: '44px 20px 50px', animation: 'fadeUp 0.5s ease both' }}>
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 6,
//             border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
//             padding: '4px 14px', marginBottom: 22,
//           }}>
//             <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>LTM Membership</span>
//           </div>

//           <h1 style={{ fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.4px' }}>
//             Find the Perfect Plan to Elevate<br />Your Mentorship Journey
//           </h1>

//           <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.36)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
//             Connect with{' '}
//             <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{mentors.fullName}</strong>
//             {' '}— flexible guidance for every stage.
//           </p>

//           {/* Show user type badge */}
//           {currentStatus && (
//             <div style={{ marginTop: 12 }}>
//               <span style={{
//                 fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20,
//                 background: currentStatus === 'experienced' ? 'rgba(99,102,241,0.12)' : 'rgba(212,168,75,0.1)',
//                 border: `1px solid ${currentStatus === 'experienced' ? 'rgba(99,102,241,0.3)' : 'rgba(212,168,75,0.22)'}`,
//                 color: currentStatus === 'experienced' ? '#818cf8' : '#d4a84b',
//                 letterSpacing: '0.3px', textTransform: 'capitalize',
//               }}>
//                 {currentStatus} pricing
//               </span>
//             </div>
//           )}

//           <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
//             {PLANS.map(p => (
//               <span key={p.key} style={{
//                 fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20,
//                 background: 'rgba(212,168,75,0.1)', border: '1px solid rgba(212,168,75,0.22)',
//                 color: '#d4a84b', letterSpacing: '0.3px',
//               }}>
//                 {p.months} {p.months === 1 ? 'Month' : 'Months'} available
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* ── Tab selector ── */}
//         {PLANS.length > 1 && (
//           <div style={{
//             display: 'flex',
//             maxWidth: PLANS.length === 2 ? 460 : 620,
//             margin: '0 auto 40px',
//             background: '#1a1a1a', borderRadius: 14,
//             border: '1px solid rgba(255,255,255,0.08)', padding: 4, gap: 3,
//           }}>
//             {PLANS.map(plan => {
//               const isActive = effectiveSelected === plan.key;
//               return (
//                 <button key={plan.key} className="ltm-tab" onClick={() => setSelected(plan.key)} style={{
//                   flex: 1, position: 'relative', padding: '14px 10px', borderRadius: 10,
//                   border: 'none', cursor: 'pointer',
//                   background: isActive ? '#fff' : 'transparent',
//                   fontFamily: FONT, textAlign: 'center',
//                 }}>
//                   {plan.badge && (
//                     <span style={{
//                       position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
//                       background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
//                       fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
//                       whiteSpace: 'nowrap', letterSpacing: '0.4px',
//                     }}>{plan.badge}</span>
//                   )}
//                   <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
//                     {plan.months} {plan.months === 1 ? 'month' : 'months'}
//                   </div>
//                   <div style={{ fontSize: 11, color: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)' }}>
//                     {plan.tabSub}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {/* ── Cards ── */}
//         <div style={{
//           display: 'flex', flexWrap: 'wrap', gap: 16,
//           justifyContent: 'center', alignItems: 'flex-end',
//           maxWidth: PLANS.length === 1 ? 400 : 1060,
//           margin: '0 auto', padding: '0 20px 80px',
//           animation: 'fadeIn 0.4s ease both',
//         }}>
//           {PLANS.map(plan => {
//             const isSelected = effectiveSelected === plan.key;

//             // Use perSession directly from API — no recalculation
//             const perSession = plan.perSession ?? 0;

//             const borderColor = isSelected
//               ? plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)'
//               : plan.featured ? 'rgba(212,168,75,0.3)' : 'rgba(255,255,255,0.09)';

//             const shadow = isSelected
//               ? plan.featured
//                 ? '0 24px 64px rgba(212,168,75,0.28), 0 0 0 1px rgba(212,168,75,0.18)'
//                 : '0 20px 50px rgba(255,255,255,0.07)'
//               : plan.featured ? '0 10px 36px rgba(212,168,75,0.1)' : 'none';

//             const bg = plan.featured
//               ? isSelected ? '#1c1500' : '#121000'
//               : isSelected ? '#191919' : '#131313';

//             const lift = PLANS.length === 1 ? 'none'
//               : plan.featured
//                 ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
//                 : isSelected ? 'translateY(-10px) scale(1.02)' : 'translateY(0)';

//             return (
//               <div key={plan.key} className="ltm-card" onClick={() => setSelected(plan.key)} style={{
//                 position: 'relative',
//                 flex: PLANS.length === 1 ? '0 0 360px' : '1 1 280px',
//                 maxWidth: plan.featured ? 340 : (PLANS.length === 1 ? 360 : 308),
//                 minWidth: 260, cursor: 'pointer', borderRadius: 18,
//                 border: `1.5px solid ${borderColor}`, background: bg, boxShadow: shadow, transform: lift,
//                 padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
//                 display: 'flex', flexDirection: 'column',
//               }}>
//                 {plan.badge && (
//                   <div style={{
//                     position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
//                     background: 'linear-gradient(90deg,#6366f1,#818cf8)', color: '#fff',
//                     fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20,
//                     whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px',
//                   }}>{plan.badge}</div>
//                 )}

//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
//                   <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{plan.label}</p>
//                   <span style={{
//                     fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
//                     background: plan.featured ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.05)',
//                     border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.25)' : 'rgba(255,255,255,0.1)'}`,
//                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.3)',
//                   }}>
//                     {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
//                   </span>
//                 </div>

//                 {/* Total price */}
//                 <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
//                   <span style={{
//                     fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1,
//                     color: isSelected
//                       ? plan.featured ? '#f0c96a' : '#fff'
//                       : plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.82)',
//                   }}>
//                     ₹{plan.totalPrice.toLocaleString('en-IN')}
//                   </span>
//                   <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', paddingBottom: 4 }}>/total</span>
//                 </div>

//                 {/* Per session + total sessions */}
//                 <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: '0 0 6px' }}>
//                   ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
//                 </p>

//                 {/* Sessions per week */}
//                 <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: '0 0 14px' }}>
//                   {plan.sessionsPerWeek} session{plan.sessionsPerWeek !== 1 ? 's' : ''}/week
//                 </p>

//                 <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 14px' }} />

//                 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: '0 0 20px' }}>
//                   {plan.description}
//                 </p>

//                 <button
//                   className="ltm-cta"
//                   onClick={(e) => handleGetStarted(e, plan)}
//                   disabled={isSubscribing}
//                   style={{
//                     width: '100%', padding: '12px', borderRadius: 50,
//                     border: plan.btnBorder, background: plan.btnBg, color: plan.btnColor,
//                     fontSize: 14, fontWeight: 700, cursor: isSubscribing ? 'not-allowed' : 'pointer',
//                     marginBottom: 22, fontFamily: FONT, opacity: isSubscribing ? 0.6 : 1,
//                   }}
//                 >
//                   {isSubscribing ? 'Processing...' : 'Get started →'}
//                 </button>

//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', margin: '0 0 12px' }}>
//                   What's included
//                 </p>

//                 <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
//                   {plan.features.map((feat, i) => (
//                     <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
//                       <div style={{
//                         width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
//                         background: plan.featured ? 'rgba(212,168,75,0.14)' : 'rgba(255,255,255,0.05)',
//                         border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.28)' : 'rgba(255,255,255,0.1)'}`,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       }}>
//                         <Check size={8} color={plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.4)'} strokeWidth={3} />
//                       </div>
//                       <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)' }}>{feat}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {isSelected && (
//                   <div style={{
//                     marginTop: 18, textAlign: 'center', fontSize: 12, fontWeight: 700,
//                     color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
//                   }}>
//                     <Check size={12} strokeWidth={3} /> Selected
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {PLANS.length === 0 && (
//           <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: 'rgba(255,255,255,0.3)', fontFamily: FONT }}>
//             <p>No plans available for this mentor yet.</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MentorLTMPlans;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
import Cookies from "js-cookie";
import useToast from '../../../global/Tostify';

// ── Design tokens ──────────────────────────────────────────────
const BG = '#0a211e';   // deep dark green (page background)
const CREAM = '#f4e8d4';   // warm cream (primary text + accents)
const CARD_BG = '#0f2b27';   // slightly lighter green for cards
const CARD_FEAT = '#122e29';   // featured card background
const BORDER = 'rgba(244,232,212,0.12)';
const BORDER_HI = 'rgba(244,232,212,0.35)';
const MUTED = 'rgba(244,232,212,0.38)';
const MUTED2 = 'rgba(244,232,212,0.22)';
const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

const PLAN_META = {
  1: {
    label: '1 Month Plan',
    badge: null,
    featured: false,
    tabSub: 'No discount & EMI',
    description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
    features: [
      'Direct 1-on-1 sessions',
      'Personalised roadmap',
      'Session recordings',
      'Chat support between sessions',
      'Progress check-in reports',
    ],
  },
  3: {
    label: 'Professional Plan',
    badge: null,
    featured: true,
    tabSub: '6 Months EMI available',
    description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
    features: [
      'All 1-Month Plan features',
      'Weekly structured milestones',
      'Resume & LinkedIn review',
      'Mock interviews (2 sessions)',
      'Priority scheduling',
      'Community access',
    ],
  },
  6: {
    label: 'Business Plan',
    badge: 'Most Popular',
    featured: false,
    tabSub: 'Lowest per-month rate',
    description: 'For serious career transformation needing advanced tools and full mentor support.',
    features: [
      'All Professional Plan features',
      'Unlimited mock interviews',
      'Job referral support',
      'Dedicated mentor hotline',
      'Live project collaboration',
      'Multi-channel support',
      'Phone & Email support',
    ],
  },
};

const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

function normalizePlans(formattedPlans = {}) {
  if (!formattedPlans || Object.keys(formattedPlans).length === 0) return [];
  return Object.entries(formattedPlans)
    .map(([key, value]) => {
      const months = KEY_TO_MONTHS[key];
      const meta = PLAN_META[months];
      if (!meta || !value) return null;
      return {
        ...meta,
        key: `${months}Month`,
        months,
        sessionsPerWeek: value.sessionsPerWeek ?? 0,
        totalSessions: value.totalSessions ?? 0,
        perSession: value.perSession ?? 0,
        totalPrice: value.totalAmount ?? 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.months - b.months);
}

const MentorLTMPlans = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const toast = useToast(); // ← Add this line


  const cookieData = Cookies.get("profileData");
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;

  const { data: mentor, isLoading, isError } =
    useFetchMentorByIdQuery({ mentorId, currentStatus });
  const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();

  const mentors = mentor;

  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 40, height: 40, border: `3px solid ${BORDER}`, borderTopColor: CREAM, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  if (isError || !mentors) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ textAlign: 'center' }}>
        <X size={32} color="#f87171" style={{ display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: MUTED, margin: '0 0 16px' }}>Failed to load plans.</p>
        <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(244,232,212,0.07)', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '9px 20px', color: CREAM, cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    </div>
  );

  const PLANS = normalizePlans(mentors?.pricing?.formattedPlans);
  const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

  const handleGetStarted = async (e, plan) => {
    e.stopPropagation();
    const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    try {
      const result = await createSubscription({
        mentor_id: mentors._id,
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
      toast.success(
        'Subscription created!',
        `${plan.label} selected. Redirecting to payment...`,
        3000
      );

      navigate('/payment', {
        state: {
          subscription_id: result?.data?._id,
          mentorId: mentors._id,
          mentorName: mentors.fullName,
          mentorRole: mentors.currentRole,
          menteeId: storedUser._id,
          menteeName: storedUser.name,
          planMonths: plan.months,
          paymentType: 'subcription',
          totalSessions: plan.totalSessions,
          perSession: plan.perSession,
          basePrice: plan.totalPrice,
          createdBy: storedUser._id,
        },
      });
    } catch (err) {
      console.error('Subscription creation failed:', err);
      toast.error(
        'Subscription failed',
        err?.message || 'Unable to create subscription. Please try again.'
      );
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        * { box-sizing: border-box; }

        .ltm-card {
          transition: transform 0.32s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.3s ease,
                      border-color 0.25s ease,
                      background 0.25s ease !important;
        }
        .ltm-tab { transition: background 0.22s ease, color 0.2s ease !important; }
        .ltm-cta { transition: opacity 0.2s, transform 0.18s, background 0.2s, color 0.2s !important; }
        .ltm-cta:hover { opacity: 0.85 !important; transform: translateY(-1px) !important; }

        @media (max-width: 640px) {
          .ltm-hero  { padding: 32px 16px 32px !important; }
          .ltm-tabs  { margin: 0 12px 28px !important; max-width: unset !important; }
          .ltm-cards {
            padding: 0 12px 60px !important;
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .ltm-card  {
            transform: none !important;
            max-width: 100% !important;
            width: 100% !important;
            flex: unset !important;
            min-width: unset !important;
          }
        }

        @media (min-width: 641px) and (max-width: 960px) {
          .ltm-cards { gap: 14px !important; padding: 0 16px 60px !important; }
          .ltm-card  { flex: 1 1 240px !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT }}>

        {/* ── Hero ── */}
        <div className="ltm-hero" style={{ textAlign: 'center', padding: '44px 20px 48px', animation: 'fadeUp 0.5s ease both' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: `1px solid ${BORDER_HI}`, borderRadius: 20,
            padding: '4px 16px', marginBottom: 22,
          }}>
            <span style={{ fontSize: 12, color: MUTED, fontWeight: 600, letterSpacing: '0.5px' }}>LTM Membership</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(22px,4vw,42px)', fontWeight: 800,
            color: CREAM, lineHeight: 1.2, margin: '0 0 14px', letterSpacing: '-0.4px',
          }}>
            Find the Perfect Plan to Elevate<br />Your Mentorship Journey
          </h1>

          <p style={{ fontSize: 15, color: MUTED, maxWidth: 460, margin: '0 auto', lineHeight: 1.75 }}>
            Connect with{' '}
            <strong style={{ color: CREAM }}>{mentors.fullName}</strong>
            {' '}— flexible guidance for every stage.
          </p>

          {currentStatus && (
            <div style={{ marginTop: 14 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '4px 14px', borderRadius: 20,
                background: 'rgba(244,232,212,0.08)',
                border: `1px solid ${BORDER_HI}`,
                color: CREAM, letterSpacing: '0.4px', textTransform: 'capitalize',
              }}>
                {currentStatus} pricing
              </span>
            </div>
          )}

          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {PLANS.map(p => (
              <span key={p.key} style={{
                fontSize: 11, fontWeight: 700, padding: '3px 13px', borderRadius: 20,
                background: 'rgba(244,232,212,0.06)',
                border: `1px solid ${BORDER}`,
                color: MUTED, letterSpacing: '0.3px',
              }}>
                {p.months} {p.months === 1 ? 'Month' : 'Months'} available
              </span>
            ))}
          </div>
        </div>

        {/* ── Tab selector ── */}
        {PLANS.length > 1 && (
          <div className="ltm-tabs" style={{
            display: 'flex',
            maxWidth: PLANS.length === 2 ? 460 : 620,
            margin: '0 auto 40px',
            background: '#0d2622',
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            padding: 4, gap: 3,
          }}>
            {PLANS.map(plan => {
              const isActive = effectiveSelected === plan.key;
              return (
                <button
                  key={plan.key}
                  className="ltm-tab"
                  onClick={() => setSelected(plan.key)}
                  style={{
                    flex: 1, position: 'relative', padding: '13px 10px', borderRadius: 10,
                    border: 'none', cursor: 'pointer',
                    background: isActive ? CREAM : 'transparent',
                    fontFamily: FONT, textAlign: 'center',
                  }}
                >
                  {plan.badge && (
                    <span style={{
                      position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                      background: CREAM, color: BG,
                      fontSize: 10, fontWeight: 800, padding: '3px 12px', borderRadius: 20,
                      whiteSpace: 'nowrap', letterSpacing: '0.4px',
                    }}>{plan.badge}</span>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 3, color: isActive ? BG : MUTED }}>
                    {plan.months} {plan.months === 1 ? 'month' : 'months'}
                  </div>
                  <div style={{ fontSize: 11, color: isActive ? 'rgba(10,33,30,0.5)' : MUTED2 }}>
                    {plan.tabSub}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Cards ── */}
        <div
          className="ltm-cards"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 16,
            justifyContent: 'center', alignItems: 'flex-end',
            maxWidth: PLANS.length === 1 ? 420 : 1080,
            margin: '0 auto',
            padding: '0 20px 80px',
            animation: 'fadeIn 0.4s ease both',
          }}
        >
          {PLANS.map(plan => {
            const isSelected = effectiveSelected === plan.key;
            const perSession = plan.perSession ?? 0;

            const borderColor = isSelected ? CREAM : plan.featured ? BORDER_HI : BORDER;

            const shadow = isSelected
              ? `0 20px 56px rgba(10,33,30,0.7), 0 0 0 1.5px ${CREAM}`
              : plan.featured
                ? `0 10px 40px rgba(10,33,30,0.4), 0 0 0 1px ${BORDER_HI}`
                : 'none';

            const cardBg = plan.featured
              ? isSelected ? '#163330' : CARD_FEAT
              : isSelected ? '#132b27' : CARD_BG;

            const lift = PLANS.length === 1
              ? 'none'
              : plan.featured
                ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
                : isSelected ? 'translateY(-10px) scale(1.01)' : 'translateY(0)';

            return (
              <div
                key={plan.key}
                className="ltm-card"
                onClick={() => setSelected(plan.key)}
                style={{
                  position: 'relative',
                  flex: PLANS.length === 1 ? '0 0 380px' : '1 1 280px',
                  maxWidth: plan.featured ? 348 : (PLANS.length === 1 ? 380 : 312),
                  minWidth: 260,
                  cursor: 'pointer',
                  borderRadius: 18,
                  border: `1.5px solid ${borderColor}`,
                  background: cardBg,
                  boxShadow: shadow,
                  transform: lift,
                  padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: CREAM, color: BG,
                    fontSize: 10, fontWeight: 800, padding: '4px 16px', borderRadius: 20,
                    whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px',
                  }}>{plan.badge}</div>
                )}

                {/* Label + pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: MUTED, margin: 0 }}>{plan.label}</p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 20,
                    background: 'rgba(244,232,212,0.08)',
                    border: `1px solid ${BORDER}`,
                    color: MUTED,
                  }}>
                    {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
                  </span>
                </div>

                {/* Total price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1, color: CREAM }}>
                    ₹{plan.totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: 12, color: MUTED2, paddingBottom: 4 }}>/total</span>
                </div>

                {/* Per session */}
                <p style={{ fontSize: 12, color: MUTED, margin: '0 0 4px' }}>
                  ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
                </p>

                {/* Sessions per week */}
                <p style={{ fontSize: 11, color: MUTED2, margin: '0 0 16px' }}>
                  {plan.sessionsPerWeek} session{plan.sessionsPerWeek !== 1 ? 's' : ''}/week
                </p>

                <div style={{ height: 1, background: BORDER, margin: '0 0 16px' }} />

                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: '0 0 20px' }}>
                  {plan.description}
                </p>

                {/* CTA */}
                <button
                  className="ltm-cta"
                  onClick={(e) => handleGetStarted(e, plan)}
                  disabled={isSubscribing}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 50,
                    border: `1.5px solid ${CREAM}`,
                    background: isSelected ? CREAM : 'transparent',
                    color: isSelected ? BG : CREAM,
                    fontSize: 14, fontWeight: 700,
                    cursor: isSubscribing ? 'not-allowed' : 'pointer',
                    marginBottom: 22, fontFamily: FONT,
                    opacity: isSubscribing ? 0.6 : 1,
                  }}
                >
                  {isSubscribing ? 'Processing…' : 'Get started →'}
                </button>

                {/* Features heading */}
                <p style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
                  textTransform: 'uppercase', color: MUTED2, margin: '0 0 12px',
                }}>
                  What's included
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                        background: 'rgba(244,232,212,0.07)',
                        border: `1px solid ${BORDER_HI}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={8} color={CREAM} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 12, color: MUTED }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {isSelected && (
                  <div style={{
                    marginTop: 18, textAlign: 'center', fontSize: 12, fontWeight: 700,
                    color: CREAM,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}>
                    <Check size={12} strokeWidth={3} /> Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {PLANS.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: MUTED, fontFamily: FONT }}>
            <p>No plans available for this mentor yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MentorLTMPlans;