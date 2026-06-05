

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Check, X, Copy, Upload, Shield, CheckCircle,
  Lock, ChevronRight, AlertCircle, QrCode, Link2, Loader2, ArrowLeft, Tag, Trash2
} from 'lucide-react';
import { useFetchMentorByIdQuery, useCreateSubscriptionMutation } from '../../topMentors/Mentorsectionapislice';
import { useSubmitPaymentMutation } from '../../menteeDashboard/pages/payment/Paymentsecapislice';
import { storage } from '../../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Cookies from 'js-cookie';
import useToast from '../../../global/Tostify';
import Loader from '../../../global/Loader';

// ── Design tokens ───────────────────────────────────────────
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
const SUCCESS = '#10b981';
const SUCCESS_L = 'rgba(16,185,129,0.10)';

// ── Plan metadata ───────────────────────────────────────────
const PLAN_META = {
  1: {
    label: '1 Month Plan', badge: null, featured: false,
    tabSub: '1 Month Plan',
    description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
    features: ['Direct 1-on-1 sessions', 'Personalised roadmap', 'Chat support between sessions', 'Progress check-in reports'],
  },
  3: {
    label: 'Professional Plan', badge: null, featured: true,
    tabSub: '3 Month Plan',
    description: 'Ideal for growing professionals looking to build deep skills and get structured guidance.',
    features: ['All 1-Month Plan features', 'Weekly structured milestones', 'Mock interviews (2 sessions)', 'Priority scheduling', 'Community access'],
  },
  6: {
    label: 'Business Plan', badge: 'Most Popular', featured: false,
    tabSub: '6 Month plan',
    description: 'For serious career transformation needing advanced tools and full mentor support.',
    features: ['All Professional Plan features', 'Unlimited mock interviews', 'Job referral support', 'Dedicated mentor hotline', 'Live project collaboration', 'Multi-channel support', 'Phone & Email support'],
  },
};

const KEY_TO_MONTHS = { one_month: 1, three_months: 3, six_months: 6 };
const MONTHS_TO_KEY = { 1: 'one_month', 3: 'three_months', 6: 'six_months' };

const UPI_PRIMARY = 'karrivo2024@upi';
const UPI_SECONDARY = 'example.174327728615@sbi';

function normalizePlans(plans, currentStatus = '') {
  if (!plans || Object.keys(plans).length === 0) return [];

  // Map currentStatus to pricing key
  const priceKey = currentStatus?.toLowerCase() === 'experienced' ? 'experienced' : 'freshers';

  return Object.entries(plans)
    .map(([key, value]) => {
      const months = KEY_TO_MONTHS[key];
      const meta = PLAN_META[months];
      if (!meta || !value) return null;

      const totalPrice = value[priceKey] ?? 0;
      const breakdown = value.breakdown?.[priceKey];

      // Derive sessionsPerWeek & perSession from hourlyRate if not available
      // Using rough estimates: 4 sessions/month standard
      const totalSessions = months * 4;
      const sessionsPerWeek = 1;
      const perSession = totalSessions > 0 ? Math.round(totalPrice / totalSessions) : 0;

      return {
        ...meta,
        key: `${months}Month`,
        months,
        sessionsPerWeek,
        totalSessions,
        perSession,
        totalPrice,
        breakdown, // available if you want to show fee breakdown
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.months - b.months);
}


export default function MentorLTMPlans() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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

  console.log(mentor, "mentorss");
  // ── Plan UI state ────────────────────────────────────────────
  const [selected, setSelected] = useState(null);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const [showPayment, setShowPayment] = useState(false);

  // ── Payment form state ───────────────────────────────────────
  const [payTab, setPayTab] = useState('qr');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [screenshotName, setScreenshotName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [copiedP, setCopiedP] = useState(false);
  const [copiedS, setCopiedS] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // ── Coupon state ─────────────────────────────────────────────
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showCouponList, setShowCouponList] = useState(false);

  const payPanelRef = useRef(null);

  // ── Load coupons from location state ──────────────────────────
  useEffect(() => {
    if (location.state?.availableCoupons) {
      setAvailableCoupons(location.state.availableCoupons);
      if (location.state.appliedCoupon) {
        const found = location.state.availableCoupons.find(
          c => c.couponId === location.state.appliedCoupon.couponId
        );
        if (found) setAppliedCoupon(found);
      }
    }
  }, [location.state]);

  // ── Helpers ──────────────────────────────────────────────────
  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setScreenshotName(file.name);
    setUploading(true);
    setUploadError('');
    setScreenshotUrl('');
    try {
      const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setScreenshotUrl(url);
    } catch {
      setUploadError('Upload failed. Please try again.');
      setScreenshotName('');
    } finally {
      setUploading(false);
    }
  };

  // ── Coupon logic ─────────────────────────────────────────────
  const getDiscountedPrice = (amount) => {
    if (!appliedCoupon) return amount;
    return Math.floor(amount - (amount * appliedCoupon.discountValue) / 100);
  };

  const getDiscountAmount = (amount) => {
    if (!appliedCoupon) return 0;
    return Math.ceil(amount * appliedCoupon.discountValue / 100);
  };

  const isCouponValidForPlan = (coupon) => {
    if (!paymentPlan) return false;
    return coupon.appliesForDuration?.includes(paymentPlan.months) ?? false;
  };

  const handleApplyCoupon = (couponCode) => {
    const code = couponCode.trim().toUpperCase();
    const found = availableCoupons.find(c => c.couponCode === code && c.isActive);

    if (!found) {
      setCouponError('Coupon not found or inactive.');
      return;
    }

    if (!isCouponValidForPlan(found)) {
      setCouponError(`This coupon is not valid for the ${paymentPlan.months}-month plan.`);
      return;
    }

    setAppliedCoupon(found);
    setCouponInput('');
    setCouponError('');
    setShowCouponList(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
  };

  // ── Select plan → create subscription → show payment ────────
  const handleGetStarted = async (e, plan, sessionId = null) => {
    e.stopPropagation();
    if (!storedUser?._id || !storedUser?.token) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }


    const isMentor = storedUser?.role === "mentor" || storedUser?.userType === "mentor";
    if (isMentor) {
      toast.error("Access Denied", "Mentors cannot purchase subscriptions.");
      return;
    }


    setSelected(plan.key);
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
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
      setBookingId(result?.booking_id);
      setPaymentPlan(plan);
      setSelectedSessionId(sessionId);
      setShowPayment(true);
    } catch (err) {
      toast.error('Subscription failed', err?.data?.message || 'Please try again.');
    }
  };

  // ── Confirm payment ──────────────────────────────────────────
  const handleConfirmPayment = async () => {
    if (!screenshotUrl) {
      setUploadError('Please upload your payment screenshot.');
      return;
    }
    if (!transactionId.trim()) {
      setUploadError('Please enter your Transaction / UTR ID.');
      return;
    }
    setUploadError('');

    const finalAmount = getDiscountedPrice(paymentPlan.totalPrice);

    try {
      await submitPayment({
        subscription_id: subscriptionId,
        typeBooking: "planBooking",
        mentorId: mentor._id,
        booking_id: bookingId,
        menteeId: storedUser._id,
        mentorName: mentor.fullName,
        menteeName: storedUser.name,
        paymentAmount: finalAmount,
        originalAmount: paymentPlan.totalPrice,
        discountAmount: getDiscountAmount(paymentPlan.totalPrice),
        appliedCoupon: appliedCoupon ? {
          couponCode: appliedCoupon.couponCode,
          discountPercentage: appliedCoupon.discountValue,
        } : null,
        paymentType: 'subcription',
        transactionId: transactionId.trim(),
        screenshotUrl,
        transactionDate: new Date().toISOString(),
        createdBy: storedUser._id,
      }).unwrap();
    } catch {
      /* shown via payError */
    }
  };

  // ── Loading / error ──────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <X size={32} color="#d9534f" style={{ display: 'block', margin: '0 auto 12px' }} />
          <p style={{ color: MUTED, margin: '0 0 16px' }}>Failed to load plans.</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              fontFamily: FONT,
              background: ACCENT_L,
              border: `1px solid ${BORDER_HI}`,
              borderRadius: 8,
              padding: '9px 20px',
              color: ACCENT,
              cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  const PLANS = normalizePlans(mentor[0]?.pricing, currentStatus);

  console.log(mentor.pricing, "dataee")
  console.log(mentor.pricing, PLANS, "OPLADD")
  const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

  // ── Success screen ───────────────────────────────────────────
  if (isSuccess) {
    return (
      <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: FONT }}>
        <div style={{ background: CREAM, borderRadius: '20px', padding: 'clamp(24px, 5vw, 40px)', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(45,45,45,0.18)' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: ACCENT_L, border: `1px solid ${ACCENT_B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle size={28} color={ACCENT} />
          </div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: 800, margin: '0 0 8px' }}>Payment Submitted!</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(12px, 3vw, 13px)', margin: '0 0 20px', lineHeight: 1.7 }}>
            Your <strong style={{ color: '#fff' }}>{paymentPlan?.months}-month mentorship</strong> with <strong style={{ color: '#fff' }}>{mentor.fullName}</strong> is being activated.
          </p>
          {payResponse?.data && (
            <div style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 12, padding: '14px', marginBottom: '20px', textAlign: 'left' }}>
              {[
                { label: 'Status', value: payResponse.data.paymentStatus },
                { label: 'Transaction ID', value: payResponse.data.transactionId },
                { label: 'Final Amount', value: `₹${(payResponse.data.paymentAmount ?? payResponse.data.originalAmount)?.toLocaleString('en-IN')}` },
                payResponse.data.discountAmount > 0 && { label: 'Discount', value: `- ₹${payResponse.data.discountAmount?.toLocaleString('en-IN')} (${appliedCoupon?.discountValue}%)` },
              ].filter(Boolean).map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 'clamp(10px, 2vw, 11px)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: r.label === 'Discount' ? SUCCESS : '#fff' }}>{r.value}</span>
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize: 'clamp(10px, 2vw, 11px)', color: 'rgba(255,255,255,0.45)', margin: '0 0 20px' }}>Verification & activation within 2 hours.</p>
          <button
            onClick={() => navigate('/mentee/bookings')}
            style={{
              width: '100%',
              background: ACCENT,
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '13px',
              fontWeight: 700,
              fontSize: 'clamp(12px, 3vw, 14px)',
              cursor: 'pointer',
              fontFamily: FONT,
            }}
          >
            See Your Bookings →
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ──────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        .ltm-card {
          transition: transform 0.32s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important;
        }
        .ltm-tab {
          transition: background 0.22s ease, color 0.2s ease !important;
        }
        .ltm-cta {
          transition: opacity 0.2s, transform 0.18s, background 0.2s, color 0.2s !important;
        }
        .ltm-cta:hover {
          opacity: 0.85 !important;
          transform: translateY(-1px) !important;
        }
        .ltm-input {
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ltm-input:focus {
          border-color: ${ACCENT} !important;
          box-shadow: 0 0 0 3px ${ACCENT_L} !important;
        }
        .pay-tab-btn {
          transition: background 0.2s, color 0.2s;
          border: none;
          cursor: pointer;
        }
        .upload-label {
          transition: border-color 0.2s, background 0.2s;
        }
        .coupon-list {
          animation: slideDown 0.2s ease-out;
        }

        /* Layout */
        .ltm-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: ${BG};
          font-family: ${FONT};
        }

        .ltm-hero {
          text-align: center;
          padding: clamp(24px, 4vw, 32px) clamp(16px, 4vw, 20px);
          animation: fadeUp 0.5s ease both;
          flex-shrink: 0;
        }

        .ltm-tabs-row {
          display: flex;
          max-width: 620px;
          margin: 0 auto clamp(16px, 3vw, 24px);
          background: #faf6f0;
          border-radius: 14px;
          border: 1px solid ${BORDER};
          padding: 4px;
          gap: 3px;
          flex-wrap: wrap;
        }

        .ltm-outer {
          display: flex;
          gap: clamp(16px, 3vw, 24px);
          align-items: flex-start;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(12px, 4vw, 24px) clamp(20px, 4vw, 40px);
          flex: 1;
          width: 100%;
          min-height: 0;
        }

        .ltm-plans-col {
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 100%;
        }

        .ltm-cards {
          display: flex;
          flex-direction: row;
          gap: clamp(12px, 3vw, 20px);
          align-items: stretch;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
        }

        .ltm-payment-col {
          flex: 1 1 auto;
          min-width: 0;
          max-width: 520px;
          width: 100%;
          animation: slideInRight 0.38s cubic-bezier(0.23, 1, 0.32, 1) both;
          height: fit-content;
        }

        /* Payment form - NO SCROLLING */
        .payment-form-card {
          background: ${CARD_BG};
          border: 1.5px solid ${BORDER_HI};
          border-radius: 22px;
          box-shadow: 0 20px 60px rgba(45,45,45,0.12), 0 4px 16px rgba(45,45,45,0.06);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 100%;
        }

        .payment-header {
          background: ${CREAM};
          padding: clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px);
          flex-shrink: 0;
        }

        .payment-body {
          padding: clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px);
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }

        .payment-footer {
          padding: clamp(12px, 3vw, 16px) clamp(14px, 3vw, 24px);
          background: ${CARD_BG};
          border-top: 1.5px solid ${BORDER_HI};
          flex-shrink: 0;
        }

        /* Mobile - Stack vertically */
        @media (max-width: 1024px) {
          .ltm-outer {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: clamp(12px, 3vw, 20px) !important;
          }

          .ltm-plans-col {
            width: 100% !important;
          }

          .ltm-cards {
            width: 100% !important;
          }

          .ltm-payment-col {
            max-width: 100% !important;
            animation: fadeIn 0.3s ease both !important;
          }

          .ltm-card {
            flex: 1 1 calc(50% - 6px) !important;
            min-width: 240px !important;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .ltm-card {
            flex: 1 1 calc(50% - 6px) !important;
            min-width: 160px !important;
          }

          .ltm-tabs-row {
            max-width: 100% !important;
          }

          .ltm-outer {
            padding: 0 clamp(12px, 3vw, 16px) clamp(20px, 3vw, 40px) !important;
          }

          .payment-body {
            max-height: 50vh !important;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .ltm-outer {
            padding: 0 12px clamp(20px, 4vw, 30px) !important;
            gap: 12px !important;
          }

          .ltm-card {
            flex: 1 1 100% !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          .ltm-cards {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .ltm-tabs-row {
            gap: 4px !important;
            padding: 2px !important;
          }

          .ltm-payment-col {
            width: 100% !important;
          }

          .ltm-hero {
            padding: clamp(16px, 3vw, 24px) clamp(12px, 3vw, 16px) clamp(12px, 3vw, 20px) !important;
          }

          .payment-body {
            max-height: 55vh !important;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .ltm-outer {
            padding: 0 8px clamp(20px, 4vw, 30px) !important;
          }

          .ltm-hero {
            padding: 12px 8px 16px !important;
          }

          .payment-header {
            padding: 12px 14px !important;
          }

          .payment-body {
            padding: 12px 14px !important;
            max-height: 60vh !important;
          }

          .payment-footer {
            padding: 10px 14px !important;
          }
        }
      `}</style>

      <div className="ltm-container">
        {/* ── Hero ── */}
        <div className="ltm-hero">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: `1px solid ${BORDER_HI}`, borderRadius: 20, padding: '4px 16px', marginBottom: 'clamp(10px, 2vw, 16px)' }}>
            <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: MUTED, fontWeight: 600, letterSpacing: '0.5px' }}>LTM Membership</span>
          </div>
          <h1 style={{ fontSize: 'clamp(18px, 4vw, 38px)', fontWeight: 800, color: CREAM, lineHeight: 1.2, margin: '0 0 clamp(6px, 2vw, 12px)', letterSpacing: '-0.4px' }}>
            Find the Perfect Plan to Elevate Your Mentorship Journey
          </h1>
          <p style={{ fontSize: 'clamp(12px, 3vw, 14px)', color: MUTED, maxWidth: 460, margin: '0 auto', lineHeight: 1.6 }}>
            Connect with <strong style={{ color: CREAM }}>{mentor.fullName}</strong> — flexible guidance for every stage.
          </p>
          {currentStatus && (
            <div style={{ marginTop: 'clamp(6px, 1.5vw, 10px)' }}>
              <span style={{ fontSize: 'clamp(9px, 2vw, 11px)', fontWeight: 700, padding: '3px 12px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT, letterSpacing: '0.4px', textTransform: 'capitalize' }}>
                {currentStatus} pricing
              </span>
            </div>
          )}
        </div>

        {/* ── Tab selector - HIDDEN when payment is shown ── */}
        {PLANS.length > 1 && !showPayment && (
          <div className="ltm-tabs-row" style={{ maxWidth: PLANS.length === 2 ? 460 : 620 }}>
            {PLANS.map(plan => {
              const isActive = effectiveSelected === plan.key;
              return (
                <button
                  key={plan.key}
                  className="ltm-tab pay-tab-btn"
                  onClick={() => {
                    setSelected(plan.key);
                    setShowPayment(false);
                    setUploadError('');
                    setTransactionId('');
                    setScreenshotUrl('');
                    setScreenshotName('');
                    setSelectedSessionId(null);
                  }}
                  style={{
                    flex: 1,
                    position: 'relative',
                    padding: 'clamp(9px, 1.5vw, 12px) clamp(8px, 1.5vw, 10px)',
                    borderRadius: 10,
                    cursor: 'pointer',
                    background: isActive ? ACCENT : 'transparent',
                    fontFamily: FONT,
                    textAlign: 'center',
                    minWidth: '70px',
                  }}
                >
                  {plan.badge && (
                    <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: ACCENT, color: '#fff', fontSize: 'clamp(7px, 2vw, 10px)', fontWeight: 800, padding: '2px 10px', borderRadius: 20, whiteSpace: 'nowrap', letterSpacing: '0.4px' }}>
                      {plan.badge}
                    </span>
                  )}
                  <div style={{ fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 700, marginBottom: 2, color: isActive ? '#fff' : MUTED }}>
                    {plan.months}m
                  </div>
                  <div style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: isActive ? 'rgba(255,255,255,0.7)' : MUTED2 }}>
                    {plan.tabSub}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Main two-column layout ── */}
        <div className="ltm-outer">
          {/* ── LEFT / PLANS COLUMN ── */}
          {!showPayment && (
            <div className="ltm-plans-col">
              <div className="ltm-cards">
                {PLANS.map(plan => {
                  const isSelected = effectiveSelected === plan.key;
                  const borderColor = isSelected ? ACCENT : plan.featured ? BORDER_HI : BORDER;
                  const shadow = isSelected
                    ? `0 20px 56px rgba(127,169,166,0.18), 0 0 0 1.5px ${ACCENT}`
                    : plan.featured
                      ? `0 10px 40px rgba(0,0,0,0.08), 0 0 0 1px ${BORDER_HI}`
                      : '0 2px 8px rgba(0,0,0,0.04)';
                  const cardBg = plan.featured ? (isSelected ? '#f0f7f6' : CARD_FEAT) : isSelected ? '#f3f9f8' : CARD_BG;
                  const lift =
                    PLANS.length === 1
                      ? 'none'
                      : plan.featured
                        ? isSelected
                          ? 'translateY(-16px) scale(1.01)'
                          : 'translateY(-10px)'
                        : isSelected
                          ? 'translateY(-6px) scale(1.01)'
                          : 'translateY(0)';

                  return (
                    <div
                      key={plan.key}
                      className="ltm-card"
                      onClick={() => setSelected(plan.key)}
                      style={{
                        position: 'relative',
                        flex: PLANS.length === 1 ? '0 0 360px' : '1 1 220px',
                        maxWidth: plan.featured ? '300px' : PLANS.length === 1 ? '360px' : '270px',
                        minWidth: 'clamp(180px, 35vw, 260px)',
                        cursor: 'pointer',
                        borderRadius: 16,
                        border: `1.5px solid ${borderColor}`,
                        background: cardBg,
                        boxShadow: shadow,
                        transform: lift,
                        padding: `clamp(14px, 2.5vw, ${plan.featured ? 28 : 22}px) clamp(12px, 2.5vw, ${plan.featured ? 20 : 18}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {plan.badge && (
                        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: ACCENT, color: '#fff', fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 800, padding: '3px 14px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 5, letterSpacing: '0.5px' }}>
                          {plan.badge}
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', fontWeight: 600, color: MUTED, margin: 0 }}>
                          {plan.label}
                        </p>
                        <span style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT }}>
                          {plan.months}mo
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 2 }}>
                        <span style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, lineHeight: 1, color: CREAM }}>
                          ₹{plan.totalPrice.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: MUTED2, paddingBottom: 2 }}>
                          / {plan.months}month                        </span>
                      </div>

                      {/*                      
                      <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', color: MUTED2, margin: '0 0 12px' }}>
                        {plan.sessionsPerWeek}s/week
                      </p> */}

                      <div style={{ height: 1, background: BORDER, margin: '0 0 12px' }} />

                      <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: MUTED, lineHeight: 1.5, margin: '0 0 12px' }}>
                        {plan.description}
                      </p>

                      {/* ✅ BUTTON DIRECTLY SHOWS PAYMENT FORM */}
                      <button
                        className="ltm-cta"
                        onClick={e => handleGetStarted(e, plan, plan.sessionId || null)}
                        disabled={isSubscribing}
                        style={{
                          width: '100%',
                          padding: 'clamp(8px, 1.5vw, 10px)',
                          borderRadius: 50,
                          border: `1.5px solid ${ACCENT}`,
                          background: isSelected ? ACCENT : 'transparent',
                          color: isSelected ? '#fff' : ACCENT,
                          fontSize: 'clamp(11px, 1.5vw, 12px)',
                          fontWeight: 700,
                          cursor: isSubscribing ? 'not-allowed' : 'pointer',
                          marginBottom: 12,
                          fontFamily: FONT,
                          opacity: isSubscribing ? 0.6 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                        }}
                      >
                        {isSubscribing && effectiveSelected === plan.key ? (
                          <>
                            <Loader2 size={12} className="animate-spin" /> Processing…
                          </>
                        ) : (
                          <>
                            Get started <ChevronRight size={12} />
                          </>
                        )}
                      </button>

                      <p style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 8px' }}>
                        What's included
                      </p>

                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                        {plan.features.slice(0, 4).map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                            <div style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                              <Check size={7} color={ACCENT} strokeWidth={3} />
                            </div>
                            <span style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: MUTED, lineHeight: 1.3 }}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {isSelected && (
                        <div style={{ marginTop: 10, textAlign: 'center', fontSize: 'clamp(9px, 1.5vw, 10px)', fontWeight: 700, color: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                          <Check size={10} strokeWidth={3} /> Selected
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── RIGHT / PAYMENT COLUMN - SHOWS WHEN PLAN SELECTED ── */}
          {showPayment && paymentPlan && (
            <div ref={payPanelRef} className="ltm-payment-col">
              {/* ✅ Back link - goes back to plans */}
              <button
                onClick={() => {
                  setShowPayment(false);
                  setUploadError('');
                  setTransactionId('');
                  setScreenshotUrl('');
                  setScreenshotName('');
                  setSelectedSessionId(null);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: MUTED,
                  fontSize: 'clamp(11px, 2vw, 12px)',
                  fontWeight: 600,
                  fontFamily: FONT,
                  marginBottom: 14,
                  padding: 0,
                  letterSpacing: '0.1px',
                }}
              >
                <ArrowLeft size={14} /> Back to Plans
              </button>

              {/* Panel card - NO SCROLLING */}
              <div className="payment-form-card">
                {/* ── Header strip ── */}
                <div className="payment-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#fff', flexShrink: 0, letterSpacing: '-0.5px' }}>
                      {mentor.fullName?.[0]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#fff', fontWeight: 700, fontSize: 'clamp(12px, 2vw, 14px)', margin: '0 0 2px', lineHeight: 1.2 }}>
                        {mentor.fullName}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(10px, 1.5vw, 11px)', margin: 0 }}>
                        {mentor.currentRole}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(18px, 3vw, 24px)', margin: 0, lineHeight: 1, letterSpacing: '-0.5px' }}>
                        ₹{getDiscountedPrice(paymentPlan.totalPrice).toLocaleString('en-IN')}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(9px, 1.5vw, 10px)', margin: '2px 0 0' }}>
                        {paymentPlan.months}m · {paymentPlan.totalSessions}s
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {[
                      `${paymentPlan.label}`,
                      `${paymentPlan.sessionsPerWeek} sessions/week`,
                      `₹${paymentPlan.perSession.toLocaleString('en-IN')}/session`,
                    ].map(t => (
                      <span key={t} style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)', letterSpacing: '0.2px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Body - SCROLLABLE ONLY THIS SECTION ── */}
                <div className="payment-body">
                  {/* ══ COUPON SECTION ══ */}
                  <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1.5px solid ${BORDER_HI}` }}>
                    <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Tag size={12} /> Apply Coupon Code
                    </p>

                    {!appliedCoupon ? (
                      <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                          <input
                            className="ltm-input"
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value);
                              setCouponError('');
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') handleApplyCoupon(couponInput);
                            }}
                            style={{
                              flex: 1,
                              background: '#faf9f7',
                              border: `1.5px solid ${BORDER_HI}`,
                              borderRadius: 10,
                              padding: 'clamp(8px, 1.5vw, 10px) clamp(10px, 1.5vw, 12px)',
                              fontSize: 'clamp(11px, 1.5vw, 12px)',
                              fontWeight: 600,
                              color: CREAM,
                              caretColor: ACCENT,
                              fontFamily: FONT,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                            }}
                          />
                          <button
                            onClick={() => handleApplyCoupon(couponInput)}
                            disabled={!couponInput.trim()}
                            style={{
                              padding: 'clamp(8px, 1.5vw, 10px) clamp(12px, 1.5vw, 16px)',
                              borderRadius: 10,
                              border: 'none',
                              background: couponInput.trim() ? ACCENT : MUTED2,
                              color: '#fff',
                              fontSize: 'clamp(11px, 1.5vw, 12px)',
                              fontWeight: 700,
                              cursor: couponInput.trim() ? 'pointer' : 'not-allowed',
                              fontFamily: FONT,
                              transition: 'all 0.2s',
                            }}
                          >
                            Apply
                          </button>
                        </div>

                        {couponError && (
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 8, padding: '8px 10px', marginBottom: 8 }}>
                            <X size={11} color="#dc3545" style={{ flexShrink: 0 }} />
                            <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: '#dc3545', margin: 0, fontWeight: 600 }}>
                              {couponError}
                            </p>
                          </div>
                        )}

                        {/* Available coupons list */}
                        {availableCoupons.length > 0 && (
                          <>
                            <button
                              onClick={() => setShowCouponList(!showCouponList)}
                              style={{
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                color: ACCENT,
                                fontSize: 'clamp(10px, 1.5vw, 11px)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                padding: '4px 0',
                                fontFamily: FONT,
                                textAlign: 'left',
                                letterSpacing: '0.1px',
                              }}
                            >
                              {showCouponList ? '▼ Hide available coupons' : '▶ Show available coupons'}
                            </button>

                            {showCouponList && (
                              <div className="coupon-list" style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {availableCoupons
                                  .filter(c => c.isActive)
                                  .map(coupon => {
                                    const isValid = isCouponValidForPlan(coupon);
                                    return (
                                      <button
                                        key={coupon.couponId}
                                        onClick={() => {
                                          if (isValid) handleApplyCoupon(coupon.couponCode);
                                        }}
                                        disabled={!isValid}
                                        style={{
                                          background: isValid ? SUCCESS_L : 'rgba(0,0,0,0.02)',
                                          border: `1.5px solid ${isValid ? SUCCESS : BORDER_HI}`,
                                          borderRadius: 10,
                                          padding: '10px 12px',
                                          cursor: isValid ? 'pointer' : 'not-allowed',
                                          opacity: isValid ? 1 : 0.5,
                                          transition: 'all 0.2s',
                                          fontFamily: FONT,
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                          <div style={{ textAlign: 'left' }}>
                                            <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: CREAM, margin: 0, letterSpacing: '0.5px' }}>
                                              {coupon.couponCode}
                                            </p>
                                            <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', color: MUTED2, margin: '2px 0 0', fontWeight: 600 }}>
                                              {coupon.discountValue}% off
                                              {!isValid && ' (Not for this plan)'}
                                            </p>
                                          </div>
                                          {isValid && <Check size={14} color={SUCCESS} strokeWidth={3} />}
                                        </div>
                                      </button>
                                    );
                                  })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div style={{ background: SUCCESS_L, border: `1.5px solid ${SUCCESS}`, borderRadius: 10, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: SUCCESS, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={14} color="#fff" strokeWidth={3} />
                          </div>
                          <div style={{ textAlign: 'left' }}>
                            <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: CREAM, margin: 0 }}>
                              {appliedCoupon.couponCode}
                            </p>
                            <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: SUCCESS, margin: '2px 0 0', fontWeight: 600 }}>
                              {appliedCoupon.discountValue}% discount applied
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: SUCCESS,
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ══ PRICING BREAKDOWN ══ */}
                  {appliedCoupon && (
                    <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1.5px solid ${BORDER_HI}` }}>
                      <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 10px' }}>
                        Price Breakdown
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: MUTED, fontWeight: 600 }}>
                            Original Price
                          </span>
                          <span style={{ fontSize: 'clamp(11px, 1.5vw, 12px)', color: CREAM, fontWeight: 700 }}>
                            ₹{paymentPlan.totalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: MUTED, fontWeight: 600 }}>
                            Discount ({appliedCoupon.discountValue}%)
                          </span>
                          <span style={{ fontSize: 'clamp(11px, 1.5vw, 12px)', color: SUCCESS, fontWeight: 700 }}>
                            - ₹{getDiscountAmount(paymentPlan.totalPrice).toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div style={{ height: 1, background: BORDER, margin: '6px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 700, color: CREAM }}>
                            Final Price
                          </span>
                          <span style={{ fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 800, color: SUCCESS, letterSpacing: '-0.5px' }}>
                            ₹{getDiscountedPrice(paymentPlan.totalPrice).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Section label */}
                  <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 12px' }}>
                    Choose payment method
                  </p>

                  {/* ── Method tabs ── */}
                  <div style={{ display: 'flex', background: '#f0ede8', borderRadius: 12, padding: 3, gap: 3, marginBottom: 16 }}>
                    {[
                      { id: 'qr', Icon: QrCode, label: 'Scan QR' },
                      { id: 'upi', Icon: Link2, label: 'UPI ID' },
                    ].map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        className="pay-tab-btn"
                        onClick={() => setPayTab(id)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 5,
                          padding: 'clamp(8px, 1.5vw, 10px) clamp(8px, 1.5vw, 12px)',
                          borderRadius: 8,
                          fontFamily: FONT,
                          background: payTab === id ? CREAM : 'transparent',
                          color: payTab === id ? '#fff' : MUTED,
                          fontSize: 'clamp(11px, 1.5vw, 12px)',
                          fontWeight: 700,
                          letterSpacing: '0.1px',
                        }}
                      >
                        <Icon size={13} />{label}
                      </button>
                    ))}
                  </div>

                  {/* ── QR panel ── */}
                  {payTab === 'qr' && (
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ background: '#fff', border: `1.5px solid ${BORDER_HI}`, borderRadius: 14, padding: 10, marginBottom: 10, boxShadow: '0 4px 16px rgba(45,45,45,0.06)' }}>
                        <img
                          src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                          alt="UPI QR Code"
                          style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block', maxWidth: '120px' }}
                        />
                      </div>
                      <p style={{ fontSize: 'clamp(11px, 1.5vw, 12px)', fontWeight: 700, color: CREAM, margin: '0 0 6px' }}>
                        Scan with any UPI app
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                        {['PhonePe', 'GPay', 'Paytm', 'BHIM'].map(a => (
                          <span key={a} style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: ACCENT_L, border: `1px solid ${BORDER_HI}`, color: ACCENT_D }}>
                            {a}
                          </span>
                        ))}
                      </div>
                      <div style={{ background: ACCENT_L, border: `1px solid ${BORDER_HI}`, borderRadius: 10, padding: '10px 12px' }}>
                        <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: MUTED, margin: 0, lineHeight: 1.5 }}>
                          Send exactly <strong style={{ color: CREAM }}>₹{getDiscountedPrice(paymentPlan.totalPrice).toLocaleString('en-IN')}</strong>. Wrong amounts delay activation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── UPI ID panel ── */}
                  {payTab === 'upi' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
                      {[
                        { label: 'Primary UPI', val: UPI_PRIMARY, copied: copiedP, setter: setCopiedP },
                        { label: 'Secondary UPI', val: UPI_SECONDARY, copied: copiedS, setter: setCopiedS },
                      ].map(row => (
                        <div key={row.label} style={{ background: '#faf9f7', border: `1.5px solid ${BORDER_HI}`, borderRadius: 12, padding: '10px 12px' }}>
                          <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 6px' }}>
                            {row.label}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ flex: 1, minWidth: 0, fontSize: 'clamp(11px, 1.5vw, 13px)', fontWeight: 700, color: CREAM, wordBreak: 'break-all', letterSpacing: '0.2px' }}>
                              {row.val}
                            </span>
                            <button
                              onClick={() => copyText(row.val, row.setter)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 'clamp(9px, 1.5vw, 10px)',
                                fontWeight: 700,
                                padding: '6px 12px',
                                borderRadius: 8,
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: FONT,
                                background: row.copied ? ACCENT : CREAM,
                                color: '#fff',
                                flexShrink: 0,
                                transition: 'background 0.2s',
                              }}
                            >
                              {row.copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ── Divider ── */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0', opacity: 0.5 }}>
                    <div style={{ flex: 1, height: 1, background: BORDER_HI }} />
                    <span style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, whiteSpace: 'nowrap' }}>
                      Upload Proof
                    </span>
                    <div style={{ flex: 1, height: 1, background: BORDER_HI }} />
                  </div>

                  {/* ── Screenshot upload ── */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 6px' }}>
                      Payment Screenshot <span style={{ color: ACCENT, fontWeight: 800 }}>*</span>
                    </p>
                    <label
                      className="upload-label"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        border: `2px ${screenshotUrl ? 'solid' : 'dashed'} ${screenshotUrl ? ACCENT : BORDER_HI}`,
                        borderRadius: 14,
                        padding: 'clamp(12px, 3vw, 20px)',
                        cursor: 'pointer',
                        background: screenshotUrl ? ACCENT_L : '#faf9f7',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input type="file" accept=".jpg,.jpeg,.png,.jfif" style={{ display: 'none' }} disabled={uploading} onChange={e => handleFileUpload(e.target.files[0])} />
                      {uploading ? (
                        <>
                          <Loader2 size={16} color={ACCENT} className="animate-spin" />
                          <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: CREAM, margin: 0 }}>
                            Uploading…
                          </p>
                        </>
                      ) : screenshotUrl ? (
                        <>
                          <Check size={16} color={ACCENT_D} strokeWidth={2.5} />
                          <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: CREAM, margin: 0 }}>
                            Screenshot uploaded ✓
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload size={16} color={ACCENT} />
                          <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: CREAM, margin: 0 }}>
                            Upload screenshot
                          </p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* ── UTR input ── */}
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: MUTED2, margin: '0 0 6px' }}>
                      UTR ID <span style={{ color: ACCENT, fontWeight: 800 }}>*</span>
                    </p>
                    <input
                      className="ltm-input"
                      style={{
                        width: '100%',
                        background: '#faf9f7',
                        border: `1.5px solid ${BORDER_HI}`,
                        borderRadius: 10,
                        padding: 'clamp(9px, 1.5vw, 11px) clamp(10px, 1.5vw, 12px)',
                        fontSize: 'clamp(12px, 1.5vw, 13px)',
                        fontWeight: 700,
                        color: CREAM,
                        caretColor: ACCENT,
                        fontFamily: FONT,
                        letterSpacing: '0.5px',
                      }}
                      placeholder="T2312XXXXXXX"
                      value={transactionId}
                      onChange={e => {
                        setTransactionId(e.target.value.toUpperCase());
                        setUploadError('');
                      }}
                    />
                    <p style={{ fontSize: 'clamp(8px, 1.5vw, 9px)', color: MUTED2, margin: '3px 0 0', paddingLeft: 2 }}>
                      From your UPI app payment history
                    </p>
                  </div>

                  {/* ── Errors ── */}
                  {uploadError && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                      <X size={12} color="#dc3545" style={{ flexShrink: 0 }} />
                      <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: '#dc3545', margin: 0, fontWeight: 600 }}>
                        {uploadError}
                      </p>
                    </div>
                  )}
                  {payError && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: 'rgba(220,53,69,0.06)', border: '1.5px solid rgba(220,53,69,0.2)', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
                      <X size={12} color="#dc3545" style={{ flexShrink: 0, marginTop: 1 }} />
                      <div>
                        <p style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', fontWeight: 700, color: '#dc3545', margin: '0 0 2px' }}>
                          Submission failed
                        </p>
                        <p style={{ fontSize: 'clamp(9px, 1.5vw, 10px)', color: MUTED, margin: 0 }}>
                          {payErrorData?.data?.message || 'Please try again.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Sticky footer ── */}
                <div className="payment-footer">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 'clamp(10px, 1.5vw, 11px)', color: MUTED2, fontWeight: 600 }}>
                      Total
                    </span>
                    <span style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 800, color: CREAM, letterSpacing: '-0.5px' }}>
                      ₹{getDiscountedPrice(paymentPlan.totalPrice).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    className="ltm-cta"
                    onClick={handleConfirmPayment}
                    disabled={uploading || isSubmitting}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 7,
                      padding: 'clamp(10px, 1.5vw, 13px)',
                      borderRadius: 50,
                      border: 'none',
                      fontFamily: FONT,
                      background: uploading || isSubmitting ? ACCENT_M : ACCENT,
                      color: uploading || isSubmitting ? ACCENT_D : '#fff',
                      fontSize: 'clamp(11px, 1.5vw, 13px)',
                      fontWeight: 700,
                      letterSpacing: '0.2px',
                      cursor: uploading || isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: uploading || isSubmitting ? 'none' : '0 10px 28px rgba(127,169,166,0.35)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Submitting…
                      </>
                    ) : uploading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Uploading…
                      </>
                    ) : (
                      <>
                        <Lock size={13} /> Confirm & Pay <ChevronRight size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {PLANS.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'clamp(20px, 4vw, 30px) clamp(16px, 4vw, 20px)', color: MUTED, fontFamily: FONT }}>
            <p>No plans available for this mentor yet.</p>
          </div>
        )}
      </div>
    </>
  );
}




