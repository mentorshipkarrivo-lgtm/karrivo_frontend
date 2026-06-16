

import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Check, X, Copy, Upload, CheckCircle,
  Lock, ChevronRight, QrCode, Link2, Loader2, ArrowLeft, Tag, Trash2
} from 'lucide-react';
import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
import { useSubmitPaymentMutation } from '../../menteeDashboard/pages/payment/Paymentsecapislice';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';
import useToast from '../../../global/Tostify';
import Loader from '../../../global/Loader';

// ── Design tokens ──────────────────────────────────────────────────────────
const BG = '#ffffff';
const CREAM = '#1a1a1a';
const CARD_BG = '#ffffff';
const CARD_FEAT = '#fafafa';
const BORDER = 'rgba(0,0,0,0.08)';
const BORDER_HI = 'rgba(0,0,0,0.14)';
const MUTED = 'rgba(0,0,0,0.55)';
const MUTED2 = 'rgba(0,0,0,0.38)';
const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
const ACCENT_L = 'rgba(15,15,16,0.06)';
const SUCCESS = '#10b981';
const SUCCESS_L = 'rgba(16,185,129,0.10)';
const SUCCESS_B = 'rgba(16,185,129,0.30)';
const WARN = '#f59e0b';
const BTN_BG = '#0f0f10';
const BTN_TEXT = '#ffffff';

// ── Plan metadata ──────────────────────────────────────────────────────────
const PLAN_META = {
  1: {
    label: '1 Month Plan', badge: null, featured: false,
    tabSub: '1 Month',
    description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
    features: ['Direct 1-on-1 sessions', 'Personalised roadmap', 'Chat support between sessions', 'Progress check-in reports'],
  },
  3: {
    label: 'Professional Plan', badge: null, featured: true,
    tabSub: '3 Months',
    description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
    features: ['All 1-Month Plan features', 'Weekly structured milestones', 'Mock interviews (2 sessions)', 'Priority scheduling', 'Community access'],
  },
  6: {
    label: 'Business Plan', badge: 'Most Popular', featured: false,
    tabSub: '6 Months',
    description: 'For serious career transformation needing advanced tools and full mentor support.',
    features: ['All Professional Plan features', 'Unlimited mock interviews', 'Job referral support', 'Dedicated mentor hotline', 'Live project collaboration', 'Multi-channel support', 'Phone & Email support'],
  },
};

const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };
const UPI_PRIMARY = 'karrivo2024@upi';
const UPI_SECONDARY = 'example.174327728615@sbi';

// ── Helpers ────────────────────────────────────────────────────────────────
function normalizePlans(plans, currentStatus = '', sessionsByMonth = []) {
  if (!plans || !Object.keys(plans).length) return [];
  const priceKey = currentStatus?.toLowerCase() === 'experienced' ? 'experienced' : 'freshers';
  return Object.entries(plans)
    .map(([key, value]) => {
      const months = KEY_TO_MONTHS[key];
      const meta = PLAN_META[months];
      if (!meta || !value) return null;
      const totalPrice = value[priceKey] ?? 0;

      // ── use sessionsByMonth from API ──
      const sessionEntry = sessionsByMonth.find(s => s.months === months);
      const totalSessions = sessionEntry?.totalSessions ?? months * 4; // fallback

      const perSession = totalSessions > 0 ? Math.round(totalPrice / totalSessions) : 0;
      return { ...meta, key: `${months}Month`, months, sessionsPerWeek: 1, totalSessions, perSession, totalPrice };
    })
    .filter(Boolean)
    .sort((a, b) => a.months - b.months);
}

// ══════════════════════════════════════════════════════════════════════════
export default function MentorLTMPlans() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const cookieData = Cookies.get('profileData');
  const userData = cookieData ? JSON.parse(cookieData) : null;
  const currentStatus = userData?.profile?.currentStatus;
  const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

  const { data: mentor, isLoading, isError } = useFetchMentorByIdQuery({ mentorId, currentStatus });
  const [createSubscription, { isLoading: isSubscribing }] = useCreateSubscriptionMutation();
  const [submitPayment, { isLoading: isSubmitting, isSuccess, isError: payError, error: payErrorData, data: payResponse }] = useSubmitPaymentMutation();

  // ── UI state ──
  const [selected, setSelected] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [payTab, setPayTab] = useState('qr');

  // ── Payment form ──
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [copiedP, setCopiedP] = useState(false);
  const [copiedS, setCopiedS] = useState(false);

  // ── Coupon state ──
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCouponList, setShowCouponList] = useState(true);

  const payPanelRef = useRef(null);

  // ── Coupon loaders ──
  useEffect(() => {
    const fromState = location.state?.availableCoupons;
    if (fromState) setAvailableCoupons([fromState]);
  }, [location.state]);

  useEffect(() => {
    const fromMentor = mentor?.data?.availableCoupons;
    if (Array.isArray(fromMentor) && fromMentor.length > 0 && availableCoupons.length === 0)
      setAvailableCoupons(fromMentor);
  }, [mentor]);

  // ── Derived ──
  const activeCoupons = availableCoupons.filter(c => c.isActive);
  const getTotal = (plan) => plan ? plan.totalPrice : 0;
  const getDiscountAmount = (amount) => appliedCoupon ? Math.ceil(amount * appliedCoupon.discountValue / 100) : 0;
  const getDiscountedPrice = (amount) => appliedCoupon ? Math.floor(amount - getDiscountAmount(amount)) : amount;

  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError('');
    setScreenshotUrl('');
    try {
      const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      setScreenshotUrl(await getDownloadURL(storageRef));
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleApplyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    const found = availableCoupons.find(c => c.couponCode?.trim().toUpperCase() === trimmed && c.isActive);
    if (!found) { setCouponError('Invalid or inactive coupon code.'); return; }
    setAppliedCoupon(found);
    setCouponInput('');
    setCouponError('');
    setShowCouponList(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    setShowCouponList(true);
  };

  const resetPaymentForm = () => {
    setUploadError('');
    setTransactionId('');
    setScreenshotUrl('');
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    setShowCouponList(true);
  };

  const handleGetStarted = async (e, plan) => {
    console.log(plan, "plan")
    e.stopPropagation();
    if (!storedUser?._id || !storedUser?.token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    // Only role === 1 (mentee) is allowed to book
    if (storedUser?.role !== 1) {
      toast.error('Mentor cannot book a session with another mentor');
      return;
    }
    setSelected(plan.key);
    resetPaymentForm();
    try {
      const result = await createSubscription({
        mentor_id: mentor.data._id,
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
      setBookingId(result?.booking_id);
      setPaymentPlan(plan);
      setShowPayment(true);
    } catch (err) {
      toast.error('Subscription failed', err?.data?.message || 'Please try again.');
    }
  };

  const handleConfirmPayment = async () => {
    if (!screenshotUrl) { setUploadError('Please upload your payment screenshot.'); return; }
    if (!transactionId.trim()) { setUploadError('Please enter your Transaction / UTR ID.'); return; }
    setUploadError('');
    const finalAmount = getDiscountedPrice(getTotal(paymentPlan));
    try {
      await submitPayment({
        subscription_id: subscriptionId,
        typeBooking: 'planBooking',
        mentorId: mentor.data._id,
        booking_id: bookingId,
        menteeId: storedUser._id,
        mentorName: mentor.data.mentorDetails?.fullName || mentor.fullName,
        menteeName: storedUser.name,
        paymentAmount: finalAmount,
        originalAmount: getTotal(paymentPlan),
        discountAmount: getDiscountAmount(getTotal(paymentPlan)),
        appliedCoupon: appliedCoupon ? { couponCode: appliedCoupon.couponCode, discountPercentage: appliedCoupon.discountValue } : null,
        paymentType: 'subcription',
        transactionId: transactionId.trim(),
        screenshotUrl,
        transactionDate: new Date().toISOString(),
        createdBy: storedUser._id,
      }).unwrap();
    } catch { /* shown via payError */ }
  };

  const handleBackToPlans = () => { setShowPayment(false); resetPaymentForm(); };

  // ── Loading / Error screens ──
  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader />
    </div>
  );

  if (isError || !mentor) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ textAlign: 'center', padding: 24 }}>
        <X size={36} color="#d9534f" style={{ display: 'block', margin: '0 auto 14px' }} />
        <p style={{ color: MUTED, margin: '0 0 20px', fontSize: 17 }}>Failed to load plans.</p>
        <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, borderRadius: 10, padding: '12px 26px', color: CREAM, cursor: 'pointer', fontSize: 15, fontWeight: 700 }}>Go Back</button>
      </div>
    </div>
  );

  const PLANS = normalizePlans(
    mentor?.data?.pricing?.plans,
    currentStatus,
    mentor?.data?.pricing?.sessionsByMonth ?? []
  );
  console.log(PLANS, "PLANSHFBEJEV")

  const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);
  const mentorName = mentor?.data?.mentorDetails?.fullName || mentor?.fullName || '';
  const mentorRole = mentor?.data?.mentorDetails?.currentRole || mentor?.currentRole || '';
  if (isSuccess) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: FONT }}>
      <div style={{ background: '#fff', border: `1.5px solid ${BORDER_HI}`, borderRadius: 18, padding: 'clamp(22px,4vw,36px)', maxWidth: 360, width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: SUCCESS_L, border: `1.5px solid ${SUCCESS_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <CheckCircle size={26} color={SUCCESS} />
        </div>
        <h2 style={{ color: CREAM, fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Payment Submitted!</h2>
        <p style={{ color: MUTED, fontSize: 13, margin: '0 0 18px', lineHeight: 1.6 }}>
          Your <strong style={{ color: CREAM }}>{paymentPlan?.months}-month mentorship</strong> with <strong style={{ color: CREAM }}>{mentorName}</strong> is being activated.
        </p>
        {payResponse?.data && (
          <div style={{ background: '#fafafa', border: `1px solid ${BORDER_HI}`, borderRadius: 10, padding: '12px 14px', marginBottom: 16, textAlign: 'left' }}>
            {[
              { label: 'Status', value: payResponse.data.paymentStatus },
              { label: 'Transaction ID', value: payResponse.data.transactionId },
              { label: 'Final Amount', value: `₹${(payResponse.data.paymentAmount ?? payResponse.data.originalAmount)?.toLocaleString('en-IN')}` },
              payResponse.data.discountAmount > 0 && { label: 'Discount', value: `- ₹${payResponse.data.discountAmount?.toLocaleString('en-IN')} (${appliedCoupon?.discountValue}%)` },
            ].filter(Boolean).map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12 }}>
                <span style={{ color: MUTED2 }}>{r.label}</span>
                <span style={{ fontWeight: 700, color: r.label === 'Discount' ? SUCCESS : CREAM }}>{r.value}</span>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => navigate('/mentee/bookings')} style={{ width: '100%', background: BTN_BG, color: BTN_TEXT, border: 'none', borderRadius: 10, padding: '11px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FONT }}>
          See Your Bookings →
        </button>
      </div>
    </div>
  );

  // ── Main render ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp       { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn       { from { opacity:0; } to { opacity:1; } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
        .ltm-card  { transition: transform .32s cubic-bezier(.23,1,.32,1), box-shadow .3s ease, border-color .25s ease !important; }
        .ltm-cta   { transition: opacity .2s, transform .18s, background .2s !important; }
        .ltm-cta:hover:not(:disabled) { opacity: .85 !important; transform: translateY(-1px) !important; }
        .ltm-input { outline: none; transition: border-color .2s, box-shadow .2s; }
        .ltm-input:focus { border-color: ${BTN_BG} !important; box-shadow: 0 0 0 3px ${ACCENT_L} !important; }
        .pay-tab-btn { transition: background .2s, color .2s; border: none; cursor: pointer; }
        .coupon-row  { transition: box-shadow .18s ease, transform .18s ease; }
        .coupon-row:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.09) !important; transform: translateY(-1px) !important; }

        /* Layout shells */
        .ltm-container { min-height: 100vh; display: flex; flex-direction: column; background: ${BG}; font-family: ${FONT}; }
        .ltm-hero      { text-align: center; padding: clamp(32px,4vw,48px) clamp(16px,4vw,20px) clamp(24px,3vw,32px); animation: fadeUp .5s ease both; }
        .ltm-tabs-row  { display: flex; max-width: 660px; margin: 0 auto clamp(20px,3vw,28px); background: #f5f5f5; border-radius: 16px; border: 1px solid ${BORDER}; padding: 5px; gap: 4px; flex-wrap: wrap; }
        .ltm-outer     { display: flex; gap: clamp(16px,3vw,32px); align-items: flex-start; justify-content: center; max-width: 1320px; margin: 0 auto; padding: 0 clamp(12px,4vw,24px) clamp(28px,4vw,56px); flex: 1; width: 100%; }
        .ltm-plans-col { flex: 0 0 auto; display: flex; align-items: flex-start; justify-content: center; width: 100%; }
        .ltm-cards     { display: flex; flex-direction: row; gap: clamp(14px,3vw,22px); align-items: stretch; justify-content: center; flex-wrap: wrap; width: 100%; }

        /* Full-width payment wrapper */
        .ltm-payment-col { flex: 1 1 auto; min-width: 0; width: 100%; animation: slideInRight .38s cubic-bezier(.23,1,.32,1) both; }

        /* Payment card shell */
        .payment-card   { background: ${CARD_BG}; border: 1.5px solid ${BORDER_HI}; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.04); overflow: hidden; display: flex; flex-direction: column; }
        .payment-header { background: #fafafa; border-bottom: 1.5px solid ${BORDER_HI}; padding: clamp(18px,3vw,26px) clamp(20px,3vw,32px); flex-shrink: 0; }

        /* Two-column payment body */
        .payment-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          flex: 1;
          min-height: 0;
        }
        .payment-col-left  { padding: clamp(18px,3vw,28px) clamp(20px,3vw,32px); border-right: 1.5px solid ${BORDER_HI}; display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }
        .payment-col-right { padding: clamp(18px,3vw,28px) clamp(20px,3vw,32px); display: flex; flex-direction: column; gap: 20px; overflow-y: auto; }

        .payment-footer { padding: clamp(16px,3vw,22px) clamp(20px,3vw,32px); background: ${CARD_BG}; border-top: 1.5px solid ${BORDER_HI}; flex-shrink: 0; }

        @media(max-width:1024px){
          .ltm-outer     { flex-direction: column !important; align-items: stretch !important; }
          .ltm-plans-col { width: 100% !important; }
          .ltm-card      { flex: 1 1 calc(50% - 10px) !important; min-width: 240px !important; }
        }
        @media(max-width:768px){
          .payment-body-grid { grid-template-columns: 1fr !important; }
          .payment-col-left  { border-right: none !important; border-bottom: 1.5px solid ${BORDER_HI}; }
        }
        @media(max-width:640px){
          .ltm-card    { flex: 1 1 100% !important; max-width: 100% !important; }
          .ltm-cards   { flex-direction: column !important; }
        }
        @media(max-width:480px){
          .ltm-outer      { padding: 0 10px clamp(24px,4vw,32px) !important; }
          .ltm-hero       { padding: 20px 12px 18px !important; }
          .payment-header { padding: 16px 18px !important; }
          .payment-col-left, .payment-col-right { padding: 16px 18px !important; }
          .payment-footer { padding: 14px 18px !important; }
        }
      `}</style>

      <div className="ltm-container">

        {/* ── Hero ── */}
        <div className="ltm-hero">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid ${BORDER_HI}`, borderRadius: 24, padding: '6px 20px', marginBottom: 18 }}>
            <span style={{ fontSize: 13, color: MUTED, fontWeight: 700, letterSpacing: '0.7px', textTransform: 'uppercase' }}>LTM Membership</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, color: CREAM, lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.5px' }}>
            Find the Perfect Plan to Elevate Your Mentorship
          </h1>
          <p style={{ fontSize: 17, color: MUTED, maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Connect with <strong style={{ color: CREAM }}>{mentorName}</strong> — flexible guidance for every stage of your career.
          </p>
          {currentStatus && (
            <div style={{ marginTop: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 700, padding: '5px 16px', borderRadius: 24, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: CREAM, letterSpacing: '0.5px', textTransform: 'capitalize' }}>
                {currentStatus} pricing
              </span>
            </div>
          )}
        </div>

        {/* ── Plan tabs ── */}
        {PLANS.length > 1 && !showPayment && (
          <div className="ltm-tabs-row" style={{ maxWidth: PLANS.length === 2 ? 440 : 620 }}>
            {PLANS.map(plan => {
              const isActive = effectiveSelected === plan.key;
              return (
                <button
                  key={plan.key}
                  type="button"
                  className="pay-tab-btn"
                  onClick={() => { setSelected(plan.key); setShowPayment(false); resetPaymentForm(); }}
                  style={{ flex: 1, position: 'relative', padding: '12px 8px', borderRadius: 12, cursor: 'pointer', background: isActive ? BTN_BG : 'transparent', fontFamily: FONT, textAlign: 'center', minWidth: 80 }}
                >
                  {plan.badge && (
                    <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: BTN_BG, color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 11px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {plan.badge}
                    </span>
                  )}
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2, color: isActive ? '#fff' : MUTED }}>{plan.months}m</div>
                  <div style={{ fontSize: 12, color: isActive ? 'rgba(255,255,255,0.65)' : MUTED2 }}>{plan.tabSub}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Main layout ── */}
        <div className="ltm-outer">

          {/* ── Plan cards ── */}
          {!showPayment && (
            <div className="ltm-plans-col">
              <div className="ltm-cards">
                {PLANS.map(plan => {
                  const isSelected = effectiveSelected === plan.key;
                  const borderColor = isSelected ? CREAM : plan.featured ? BORDER_HI : BORDER;
                  const shadow = isSelected
                    ? `0 20px 56px rgba(0,0,0,0.10), 0 0 0 1.5px ${CREAM}`
                    : plan.featured
                      ? `0 10px 40px rgba(0,0,0,0.06), 0 0 0 1px ${BORDER_HI}`
                      : '0 2px 8px rgba(0,0,0,0.04)';
                  const lift = PLANS.length === 1 ? 'none'
                    : plan.featured ? (isSelected ? 'translateY(-16px) scale(1.01)' : 'translateY(-10px)')
                      : isSelected ? 'translateY(-6px) scale(1.01)' : 'none';

                  return (
                    <div
                      key={plan.key}
                      className="ltm-card"
                      onClick={() => setSelected(plan.key)}
                      style={{
                        position: 'relative',
                        flex: PLANS.length === 1 ? '0 0 380px' : '1 1 220px',
                        maxWidth: plan.featured ? 320 : PLANS.length === 1 ? 380 : 290,
                        minWidth: 'clamp(200px,30vw,250px)',
                        cursor: 'pointer',
                        borderRadius: 18,
                        border: `1.5px solid ${borderColor}`,
                        background: plan.featured ? (isSelected ? '#f7f7f7' : CARD_FEAT) : isSelected ? '#fafafa' : CARD_BG,
                        boxShadow: shadow,
                        transform: lift,
                        padding: `clamp(20px,2.5vw,${plan.featured ? 30 : 24}px) clamp(16px,2.5vw,${plan.featured ? 22 : 20}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {plan.badge && (
                        <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: BTN_BG, color: '#fff', fontSize: 11, fontWeight: 800, padding: '3px 15px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 5 }}>
                          {plan.badge}
                        </div>
                      )}

                      <p style={{ fontSize: 13, fontWeight: 700, color: MUTED, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{plan.label}</p>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 6 }}>
                        <span style={{ fontSize: 'clamp(30px,4vw,46px)', fontWeight: 800, lineHeight: 1, color: CREAM }}>
                          ₹{plan.totalPrice.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: 14, color: MUTED2, paddingBottom: 2 }}>/ {plan.months} month{plan.months > 1 ? 's' : ''}</span>
                      </div>

                      {/* <p style={{ fontSize: 13, color: MUTED2, margin: '0 0 12px' }}>
                        ₹{plan.perSession.toLocaleString('en-IN')} per session · {plan.totalSessions} sessions total
                      </p> */}

                      <div style={{ height: 1, background: BORDER, margin: '0 0 14px' }} />
                      <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: '0 0 16px' }}>{plan.description}</p>

                      <button
                        type="button"
                        className="ltm-cta"
                        onClick={e => handleGetStarted(e, plan)}
                        disabled={isSubscribing}
                        style={{ width: '100%', padding: '12px', borderRadius: 50, border: `1.5px solid ${BTN_BG}`, background: isSelected ? BTN_BG : 'transparent', color: isSelected ? '#fff' : CREAM, fontSize: 15, fontWeight: 700, cursor: isSubscribing ? 'not-allowed' : 'pointer', marginBottom: 16, fontFamily: FONT, opacity: isSubscribing ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                      >
                        {isSubscribing && effectiveSelected === plan.key
                          ? <><Loader2 size={15} className="animate-spin" /> Processing…</>
                          : <>Get started <ChevronRight size={15} /></>}
                      </button>

                      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px' }}>What's included</p>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                        {plan.features.slice(0, 4).map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <div style={{ width: 17, height: 17, borderRadius: '50%', flexShrink: 0, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                              <Check size={9} color={CREAM} strokeWidth={3} />
                            </div>
                            <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.45 }}>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {isSelected && (
                        <div style={{ marginTop: 14, textAlign: 'center', fontSize: 12, fontWeight: 700, color: CREAM, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                          <Check size={12} strokeWidth={3} /> Selected
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Payment Panel ── */}
          {showPayment && paymentPlan && (
            <div ref={payPanelRef} className="ltm-payment-col">

              <button
                type="button"
                onClick={handleBackToPlans}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: MUTED, fontSize: 13, fontWeight: 600, fontFamily: FONT, marginBottom: 12, padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Plans
              </button>

              <div className="payment-card">

                {/* ── Payment Header ── */}
                <div className="payment-header" style={{ padding: '12px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: BTN_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0 }}>
                      {mentorName?.[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: CREAM, fontWeight: 700, fontSize: 14, margin: '0 0 2px' }}>{mentorName}</p>
                      <p style={{ color: MUTED2, fontSize: 12, margin: 0 }}>{mentorRole}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: CREAM, fontWeight: 800, fontSize: 'clamp(18px,3vw,24px)', margin: 0, letterSpacing: '-0.5px' }}>
                        ₹{getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')}
                      </p>
                      {appliedCoupon && (
                        <p style={{ color: MUTED2, fontSize: 11, margin: '2px 0 0', textDecoration: 'line-through' }}>
                          ₹{getTotal(paymentPlan).toLocaleString('en-IN')}
                        </p>
                      )}
                      <p style={{ color: MUTED2, fontSize: 11, margin: '2px 0 0' }}>
                        {paymentPlan.months}m · {paymentPlan.totalSessions} sessions
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {[paymentPlan.label, `${paymentPlan.sessionsPerWeek} session/week`, `₹${paymentPlan.perSession.toLocaleString('en-IN')}/session`].map(t => (
                      <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: '#fff', color: MUTED, border: `1px solid ${BORDER_HI}` }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* ── Two-column body ── */}
                <div className="payment-body-grid">

                  {/* ════ LEFT COLUMN ════ */}
                  <div className="payment-col-left" style={{ gap: 14 }}>

                    {/* Coupon section */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Tag size={13} color={CREAM} />
                          <span style={{ fontSize: 13, fontWeight: 700, color: CREAM }}>Apply Coupon</span>
                          {activeCoupons.length > 0 && (
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: '#fff3cd', color: '#856404', border: '1px solid #ffc107' }}>
                              {activeCoupons.length} available
                            </span>
                          )}
                        </div>
                        {activeCoupons.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setShowCouponList(v => !v)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: BTN_BG, fontFamily: FONT, padding: '2px 0', textDecoration: 'underline' }}
                          >
                            {showCouponList ? 'Hide' : 'View all'}
                          </button>
                        )}
                      </div>

                      {/* Applied badge */}
                      {appliedCoupon ? (
                        <div style={{ background: SUCCESS_L, border: `1.5px solid ${SUCCESS_B}`, borderRadius: 10, padding: '9px 11px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Check size={15} color="#fff" strokeWidth={3} />
                            </div>
                            <div>
                              <p style={{ fontSize: 12, fontWeight: 800, color: CREAM, margin: 0, letterSpacing: '1.5px', fontFamily: 'monospace' }}>
                                {appliedCoupon.couponCode}
                              </p>
                              <p style={{ fontSize: 11, color: SUCCESS, margin: '2px 0 0', fontWeight: 600 }}>
                                {appliedCoupon.discountValue}% off · Save ₹{getDiscountAmount(getTotal(paymentPlan)).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.22)', borderRadius: 7, cursor: 'pointer', color: '#dc3545', padding: '5px 7px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                          <input
                            className="ltm-input"
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponInput}
                            onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleApplyCoupon(couponInput))}
                            style={{ flex: 1, background: '#fafafa', border: `1.5px solid ${BORDER_HI}`, borderRadius: 8, padding: '8px 11px', fontSize: 12, fontWeight: 600, color: CREAM, fontFamily: FONT, letterSpacing: '1.5px' }}
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon(couponInput)}
                            disabled={!couponInput.trim()}
                            style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: couponInput.trim() ? BTN_BG : 'rgba(0,0,0,0.10)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: couponInput.trim() ? 'pointer' : 'not-allowed', fontFamily: FONT, flexShrink: 0 }}
                          >
                            Apply
                          </button>
                        </div>
                      )}

                      {couponError && (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.18)', borderRadius: 7, padding: '7px 10px', marginBottom: 8 }}>
                          <X size={11} color="#dc3545" style={{ flexShrink: 0 }} />
                          <p style={{ fontSize: 11, color: '#dc3545', margin: 0, fontWeight: 600 }}>{couponError}</p>
                        </div>
                      )}

                      {/* Coupon list */}
                      {showCouponList && activeCoupons.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1.5px solid ${BORDER_HI}`, borderRadius: 10, overflow: 'hidden' }}>
                          {activeCoupons.map((coupon, idx) => {
                            const isApplied = appliedCoupon?.couponCode === coupon.couponCode;
                            const daysLeft = coupon.expiryDate ? Math.ceil((new Date(coupon.expiryDate) - new Date()) / 86400000) : null;
                            const expiryLabel = daysLeft === null ? null
                              : daysLeft <= 0 ? 'Expired'
                                : daysLeft === 1 ? 'Expires today'
                                  : `Expires in ${daysLeft} days`;
                            const isExpired = daysLeft !== null && daysLeft <= 0;

                            return (
                              <div
                                key={coupon.couponId || coupon._id || idx}
                                className={!isApplied && !isExpired ? 'coupon-row' : ''}
                                style={{ display: 'flex', alignItems: 'stretch', background: isApplied ? SUCCESS_L : '#fff', borderBottom: idx < activeCoupons.length - 1 ? `1px solid ${BORDER_HI}` : 'none', opacity: isExpired ? 0.5 : 1 }}
                              >
                                <div style={{ width: 52, flexShrink: 0, background: isApplied ? SUCCESS : isExpired ? '#aaa' : BTN_BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 4px', gap: 1 }}>
                                  <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{coupon.discountValue}%</span>
                                  <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>OFF</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: 14, flexShrink: 0 }}>
                                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f5f5f5', border: `1.5px solid ${BORDER_HI}`, marginTop: -4 }} />
                                  <div style={{ flex: 1, borderLeft: `1.5px dashed ${BORDER_HI}`, margin: '2px 0' }} />
                                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f5f5f5', border: `1.5px solid ${BORDER_HI}`, marginBottom: -4 }} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0, padding: '9px 10px 9px 5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: CREAM, margin: '0 0 3px', letterSpacing: '1.5px', fontFamily: 'monospace' }}>{coupon.couponCode}</p>
                                    <p style={{ fontSize: 11, color: SUCCESS, fontWeight: 600, margin: '0 0 3px' }}>
                                      Save ₹{Math.ceil(getTotal(paymentPlan) * coupon.discountValue / 100).toLocaleString('en-IN')}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 6px', alignItems: 'center' }}>
                                      {coupon.appliesForDuration?.length > 0 && (
                                        <span style={{ fontSize: 10, color: MUTED2, fontWeight: 500 }}>Valid for {coupon.appliesForDuration.join(', ')}m plans</span>
                                      )}
                                      {expiryLabel && (
                                        <span style={{ fontSize: 10, fontWeight: 600, color: isExpired ? '#dc3545' : daysLeft <= 3 ? WARN : MUTED2 }}>· {expiryLabel}</span>
                                      )}
                                    </div>
                                  </div>
                                  {isApplied ? (
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 9px', borderRadius: 20, background: SUCCESS, color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                                      <Check size={10} strokeWidth={3} /> Applied
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => !isExpired && handleApplyCoupon(coupon.couponCode)}
                                      disabled={isExpired}
                                      style={{ fontSize: 11, fontWeight: 700, padding: '5px 11px', borderRadius: 20, border: `1.5px solid ${BTN_BG}`, background: 'transparent', color: BTN_BG, cursor: isExpired ? 'not-allowed' : 'pointer', fontFamily: FONT, flexShrink: 0 }}
                                    >
                                      Apply
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {activeCoupons.length === 0 && (
                        <p style={{ fontSize: 12, color: MUTED2, margin: '8px 0 0', fontWeight: 500, textAlign: 'center' }}>No coupons available</p>
                      )}
                    </div>

                    {/* Price breakdown */}
                    {appliedCoupon && (
                      <div style={{ background: '#fafafa', border: `1.5px solid ${BORDER_HI}`, borderRadius: 10, padding: '12px 14px' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px' }}>Price Breakdown</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>Original Price</span>
                            <span style={{ fontSize: 12, color: CREAM, fontWeight: 700 }}>₹{getTotal(paymentPlan).toLocaleString('en-IN')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>Discount ({appliedCoupon.discountValue}%)</span>
                            <span style={{ fontSize: 12, color: SUCCESS, fontWeight: 700 }}>- ₹{getDiscountAmount(getTotal(paymentPlan)).toLocaleString('en-IN')}</span>
                          </div>
                          <div style={{ height: 1, background: BORDER }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: CREAM }}>Final Price</span>
                            <span style={{ fontSize: 16, fontWeight: 800, color: SUCCESS, letterSpacing: '-0.5px' }}>₹{getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment method */}
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 8px' }}>Payment Method</p>
                      <div style={{ display: 'flex', background: '#f0f0f0', borderRadius: 8, padding: 3, gap: 3, marginBottom: 10 }}>
                        {[{ id: 'qr', Icon: QrCode, label: 'Scan QR' }, { id: 'upi', Icon: Link2, label: 'UPI ID' }].map(({ id, Icon, label }) => (
                          <button
                            key={id}
                            type="button"
                            className="pay-tab-btn"
                            onClick={() => setPayTab(id)}
                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 8px', borderRadius: 6, fontFamily: FONT, background: payTab === id ? BTN_BG : 'transparent', color: payTab === id ? '#fff' : MUTED, fontSize: 11, fontWeight: 700 }}
                          >
                            <Icon size={11} />{label}
                          </button>
                        ))}
                      </div>

                      {payTab === 'qr' && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                            <div style={{ background: '#fff', border: `1.5px solid ${BORDER_HI}`, borderRadius: 10, padding: 7, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                              <img
                                src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                                alt="UPI QR Code"
                                style={{ width: 115, height: 115, objectFit: 'cover', borderRadius: 6, display: 'block' }}
                              />
                            </div>
                          </div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: CREAM, margin: '0 0 6px', textAlign: 'center' }}>Scan with any UPI app</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8, justifyContent: 'center' }}>
                            {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(a => (
                              <span key={a} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: CREAM }}>{a}</span>
                            ))}
                          </div>
                          <div style={{ background: '#fafafa', border: `1px solid ${BORDER_HI}`, borderRadius: 8, padding: '8px 11px' }}>
                            <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.5, textAlign: 'center' }}>
                              Send exactly <strong style={{ color: CREAM }}>₹{getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')}</strong>. Wrong amounts will delay activation.
                            </p>
                          </div>
                        </div>
                      )}

                      {payTab === 'upi' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                          {[
                            { label: 'Primary UPI', val: UPI_PRIMARY, copied: copiedP, setter: setCopiedP },
                            { label: 'Secondary UPI', val: UPI_SECONDARY, copied: copiedS, setter: setCopiedS },
                          ].map(row => (
                            <div key={row.label} style={{ background: '#fafafa', border: `1.5px solid ${BORDER_HI}`, borderRadius: 9, padding: '9px 11px' }}>
                              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 5px' }}>{row.label}</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                <span style={{ flex: 1, minWidth: 0, fontSize: 12, fontWeight: 700, color: CREAM, wordBreak: 'break-all' }}>{row.val}</span>
                                <button
                                  type="button"
                                  onClick={() => copyText(row.val, row.setter)}
                                  style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: FONT, background: row.copied ? SUCCESS : BTN_BG, color: '#fff', flexShrink: 0, transition: 'background 0.2s' }}
                                >
                                  {row.copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                                </button>
                              </div>
                            </div>
                          ))}
                          <div style={{ background: '#fafafa', border: `1px solid ${BORDER_HI}`, borderRadius: 8, padding: '8px 11px' }}>
                            <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.5 }}>
                              Pay exactly <strong style={{ color: CREAM }}>₹{getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')}</strong> to either UPI ID above.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ════ RIGHT COLUMN — Upload proof ════ */}
                  <div className="payment-col-right" style={{ gap: 14 }}>

                    {/* Upload header */}
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: CREAM, margin: '0 0 3px' }}>Upload Payment Proof</p>
                      <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.55 }}>
                        Upload a screenshot and enter your transaction ID after paying to confirm your booking.
                      </p>
                    </div>

                    {/* Screenshot upload */}
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 6px' }}>
                        Payment Screenshot <span style={{ color: CREAM }}>*</span>
                      </p>
                      <label style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                        border: `2px ${screenshotUrl ? 'solid' : 'dashed'} ${screenshotUrl ? SUCCESS : BORDER_HI}`,
                        borderRadius: 12, padding: '20px 16px', cursor: 'pointer',
                        background: screenshotUrl ? SUCCESS_L : '#fafafa', transition: 'all 0.2s',
                        minHeight: 140,
                      }}>
                        <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: 'none' }} disabled={uploading} onChange={e => handleFileUpload(e.target.files[0])} />
                        {uploading ? (
                          <>
                            <Loader2 size={22} color={CREAM} className="animate-spin" />
                            <p style={{ fontSize: 12, fontWeight: 600, color: CREAM, margin: 0 }}>Uploading…</p>
                            <p style={{ fontSize: 11, color: MUTED2, margin: 0 }}>Please wait</p>
                          </>
                        ) : screenshotUrl ? (
                          <>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={20} color="#fff" strokeWidth={3} />
                            </div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: CREAM, margin: 0 }}>Screenshot uploaded</p>
                            <p style={{ fontSize: 11, color: SUCCESS, margin: 0, fontWeight: 600 }}>Tap to replace</p>
                          </>
                        ) : (
                          <>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT_L, border: `1.5px solid ${BORDER_HI}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Upload size={18} color={CREAM} />
                            </div>
                            <p style={{ fontSize: 12, fontWeight: 700, color: CREAM, margin: 0 }}>Click to upload screenshot</p>
                            <p style={{ fontSize: 11, color: MUTED2, margin: 0 }}>JPG, PNG or JFIF · Max 10 MB</p>
                          </>
                        )}
                      </label>
                    </div>

                    {/* UTR input */}
                    <div>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 6px' }}>
                        UTR / Transaction ID <span style={{ color: CREAM }}>*</span>
                      </p>
                      <input
                        className="ltm-input"
                        style={{ width: '100%', background: '#fafafa', border: `1.5px solid ${BORDER_HI}`, borderRadius: 9, padding: '10px 12px', fontSize: 13, fontWeight: 600, color: CREAM, fontFamily: FONT, letterSpacing: '0.5px' }}
                        placeholder="T2312XXXXXXX"
                        value={transactionId}
                        onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(''); }}
                      />
                      <p style={{ fontSize: 11, color: MUTED2, margin: '4px 0 0', paddingLeft: 2 }}>Find this in your UPI app → Payment history</p>
                    </div>

                    {/* Steps guide */}
                    <div style={{ background: '#fafafa', border: `1.5px solid ${BORDER_HI}`, borderRadius: 10, padding: '12px 14px' }}>
                      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px' }}>Steps to complete</p>
                      {[
                        { n: '1', text: 'Scan the QR or copy a UPI ID from the left panel' },
                        { n: '2', text: `Pay exactly ₹${getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')} using your UPI app` },
                        { n: '3', text: 'Take a screenshot of the success screen' },
                        { n: '4', text: 'Upload screenshot & enter the Transaction / UTR ID above' },
                      ].map(s => (
                        <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 8 }}>
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: BTN_BG, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{s.n}</div>
                          <p style={{ fontSize: 11, color: MUTED, margin: 0, lineHeight: 1.5 }}>{s.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Errors */}
                    {uploadError && (
                      <div style={{ display: 'flex', gap: 7, alignItems: 'center', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 9, padding: '9px 12px' }}>
                        <X size={12} color="#dc3545" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: 12, color: '#dc3545', margin: 0, fontWeight: 600 }}>{uploadError}</p>
                      </div>
                    )}
                    {payError && (
                      <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 9, padding: '9px 12px' }}>
                        <X size={12} color="#dc3545" style={{ flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: '#dc3545', margin: '0 0 2px' }}>Submission failed</p>
                          <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>{payErrorData?.data?.message || 'Please try again.'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Payment Footer ── */}
                <div className="payment-footer" style={{ padding: '12px 18px', display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ width: '20%', minWidth: 160, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, color: MUTED2, fontWeight: 600 }}>Total</span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 800, color: CREAM, letterSpacing: '-0.5px' }}>
                          ₹{getDiscountedPrice(getTotal(paymentPlan)).toLocaleString('en-IN')}
                        </span>
                        {appliedCoupon && (
                          <p style={{ fontSize: 10, color: SUCCESS, fontWeight: 700, margin: '2px 0 0' }}>
                            Saved ₹{getDiscountAmount(getTotal(paymentPlan)).toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ltm-cta"
                      onClick={handleConfirmPayment}
                      disabled={uploading || isSubmitting}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, padding: '9px 12px', borderRadius: 50, border: 'none', fontFamily: FONT, background: uploading || isSubmitting ? 'rgba(0,0,0,0.10)' : BTN_BG, color: uploading || isSubmitting ? MUTED : '#fff', fontSize: 12, fontWeight: 700, letterSpacing: '0.2px', cursor: uploading || isSubmitting ? 'not-allowed' : 'pointer', boxShadow: uploading || isSubmitting ? 'none' : '0 6px 16px rgba(0,0,0,0.14)', whiteSpace: 'nowrap' }}
                    >
                      {isSubmitting ? <><Loader2 size={12} className="animate-spin" /> Submitting…</>
                        : uploading ? <><Loader2 size={12} className="animate-spin" /> Uploading…</>
                          : <><Lock size={11} /> Confirm & Pay <ChevronRight size={11} /></>}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {PLANS.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'clamp(28px,4vw,42px) 20px', color: MUTED, fontFamily: FONT, fontSize: 16 }}>
            No plans available for this mentor yet.
          </div>
        )}

      </div>
    </>
  );
}

