import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Sparkles } from 'lucide-react';
import { useFetchMentorByIdQuery } from '../../topMentors/Mentorsectionapislice';

const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

// Static plan metadata keyed by normalized month count
const PLAN_META = {
  1: {
    label: '1 Month Plan',
    badge: null,
    featured: false,
    tabSub: 'No extra discount & EMI',
    description: 'Perfect for getting started with focused 1-on-1 mentorship sessions.',
    btnBg: 'rgba(255,255,255,0.08)',
    btnBorder: '1.5px solid rgba(255,255,255,0.2)',
    btnColor: '#fff',
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
    btnBg: 'linear-gradient(90deg,#d4a84b,#f0c96a)',
    btnBorder: 'none',
    btnColor: '#0a0a0a',
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
    tabSub: 'Lowest pricing per month',
    description: 'For serious career transformation needing advanced tools and full mentor support.',
    btnBg: 'rgba(255,255,255,0.08)',
    btnBorder: '1.5px solid rgba(255,255,255,0.2)',
    btnColor: '#fff',
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

/**
 * Normalize the API's pricing.plans object into an array.
 * API keys can be "1Month", "3Month", "6Month", "oneMonth", "threeMonths", etc.
 * We extract the numeric month value and merge with static metadata.
 */
function normalizePlans(apiPlans = {}) {
  return Object.entries(apiPlans)
    .map(([key, value]) => {
      // extract leading digits → month count
      const months = value?.months ?? parseInt(key, 10);
      const meta = PLAN_META[months];
      if (!meta) return null;
      return {
        ...meta,
        key: `${months}Month`,
        months,
        totalSessions: value?.totalSessions ?? 0,
        totalPrice: value?.totalPrice ?? 0,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.months - b.months);
}

const MentorLTMPlans = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const { data, isLoading, isError } = useFetchMentorByIdQuery(mentorId);
  const mentor = data;

  /* ── Loading ── */
  if (isLoading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#d4a84b', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  /* ── Error ── */
  if (isError || !mentor) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ textAlign: 'center' }}>
        <X size={32} color="#f87171" style={{ display: 'block', margin: '0 auto 12px' }} />
        <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>Failed to load plans.</p>
        <button onClick={() => navigate(-1)} style={{ fontFamily: FONT, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 20px', color: '#fff', cursor: 'pointer' }}>Go Back</button>
      </div>
    </div>
  );

  // ── Build dynamic plan list from API ──
  const PLANS = normalizePlans(mentor?.pricing?.plans);

  // If only 1 plan exists, auto-select it
  const effectiveSelected = selected ?? (PLANS.length === 1 ? PLANS[0].key : null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        * { box-sizing: border-box; }
        .ltm-card { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.25s ease, background 0.25s ease !important; }
        .ltm-tab { transition: background 0.22s ease !important; }
        .ltm-cta:hover { opacity: 0.82 !important; transform: translateY(-1px) !important; }
        .ltm-cta { transition: opacity 0.2s, transform 0.18s !important; }
        .ltm-back:hover { background: rgba(255,255,255,0.09) !important; }
        .ltm-back { transition: background 0.18s !important; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: FONT }}>


        {/* ── Hero ── */}
        <div style={{ textAlign: 'center', padding: '44px 20px 50px', animation: 'fadeUp 0.5s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20,
            padding: '4px 14px', marginBottom: 22,
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>LTM Membership</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, color: '#fff',
            lineHeight: 1.18, margin: '0 0 14px', letterSpacing: '-0.4px',
          }}>
            Find the Perfect Plan to Elevate<br />Your Mentorship Journey
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.36)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Connect with{' '}
            <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{mentor.fullName}</strong>
            {' '}— flexible guidance for every stage. Choose a plan that fits your goals and timeline.
          </p>

          {/* Available months pill */}
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {PLANS.map(p => (
              <span key={p.key} style={{
                fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20,
                background: 'rgba(212,168,75,0.1)', border: '1px solid rgba(212,168,75,0.22)',
                color: '#d4a84b', letterSpacing: '0.3px',
              }}>
                {p.months} {p.months === 1 ? 'Month' : 'Months'} available
              </span>
            ))}
          </div>
        </div>

        {/* ── Tab selector — only render if 2+ plans ── */}
        {PLANS.length > 1 && (
          <div style={{
            display: 'flex',
            maxWidth: PLANS.length === 2 ? 460 : 620,
            margin: '0 auto 40px',
            background: '#1a1a1a',
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 4, gap: 3,
          }}>
            {PLANS.map(plan => {
              const isActive = effectiveSelected === plan.key;
              const tabLabel = `${plan.months} ${plan.months === 1 ? 'month' : 'months'}`;
              return (
                <button
                  key={plan.key}
                  className="ltm-tab"
                  onClick={() => setSelected(plan.key)}
                  style={{
                    flex: 1, position: 'relative',
                    padding: '14px 10px', borderRadius: 10,
                    border: 'none', cursor: 'pointer',
                    background: isActive ? '#fff' : 'transparent',
                    fontFamily: FONT, textAlign: 'center',
                  }}
                >
                  {plan.badge && (
                    <span style={{
                      position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                      background: 'linear-gradient(90deg,#6366f1,#818cf8)',
                      color: '#fff', fontSize: 10, fontWeight: 800,
                      padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
                      letterSpacing: '0.4px',
                    }}>
                      {plan.badge}
                    </span>
                  )}
                  <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
                    {tabLabel}
                  </div>
                  <div style={{ fontSize: 11, color: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.25)' }}>
                    {plan.tabSub}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ── Cards ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16,
          justifyContent: 'center', alignItems: 'flex-end',
          maxWidth: PLANS.length === 1 ? 400 : 1060,
          margin: '0 auto', padding: '0 20px 80px',
          animation: 'fadeIn 0.4s ease both',
        }}>
          {PLANS.map(plan => {
            const isSelected = effectiveSelected === plan.key;
            const perSession = plan.totalSessions > 0
              ? Math.round(plan.totalPrice / plan.totalSessions)
              : 0;

            const borderColor = isSelected
              ? plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)'
              : plan.featured ? 'rgba(212,168,75,0.3)' : 'rgba(255,255,255,0.09)';

            const shadow = isSelected
              ? plan.featured
                ? '0 24px 64px rgba(212,168,75,0.28), 0 0 0 1px rgba(212,168,75,0.18)'
                : '0 20px 50px rgba(255,255,255,0.07)'
              : plan.featured ? '0 10px 36px rgba(212,168,75,0.1)' : 'none';

            const bg = plan.featured
              ? isSelected ? '#1c1500' : '#121000'
              : isSelected ? '#191919' : '#131313';

            // Only lift/scale if multiple plans
            const lift = PLANS.length === 1
              ? 'none'
              : plan.featured
                ? isSelected ? 'translateY(-22px) scale(1.02)' : 'translateY(-14px)'
                : isSelected ? 'translateY(-10px) scale(1.02)' : 'translateY(0)';

            return (
              <div
                key={plan.key}
                className="ltm-card"
                onClick={() => setSelected(plan.key)}
                style={{
                  position: 'relative',
                  flex: PLANS.length === 1 ? '0 0 360px' : '1 1 280px',
                  maxWidth: plan.featured ? 340 : (PLANS.length === 1 ? 360 : 308),
                  minWidth: 260,
                  cursor: 'pointer',
                  borderRadius: 18,
                  border: `1.5px solid ${borderColor}`,
                  background: bg,
                  boxShadow: shadow,
                  transform: lift,
                  padding: plan.featured ? '32px 26px 26px' : '26px 22px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                    background: 'linear-gradient(90deg,#6366f1,#818cf8)',
                    color: '#fff', fontSize: 10, fontWeight: 800,
                    padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 5,
                    letterSpacing: '0.5px',
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan name */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                    {plan.label}
                  </p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 20,
                    background: plan.featured ? 'rgba(212,168,75,0.12)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.25)' : 'rgba(255,255,255,0.1)'}`,
                    color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.3)',
                  }}>
                    {plan.months} {plan.months === 1 ? 'mo' : 'mos'}
                  </span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span style={{
                    fontSize: plan.featured ? 50 : 42, fontWeight: 800, lineHeight: 1,
                    color: isSelected
                      ? plan.featured ? '#f0c96a' : '#fff'
                      : plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.82)',
                  }}>
                    ₹{plan.totalPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', paddingBottom: 4 }}>/total</span>
                </div>

                {/* Per session */}
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', margin: '0 0 14px' }}>
                  ₹{perSession.toLocaleString('en-IN')}/session · {plan.totalSessions} sessions
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 0 14px' }} />

                {/* Description */}
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, margin: '0 0 20px' }}>
                  {plan.description}
                </p>

                {/* CTA */}
                <button
                  className="ltm-cta"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/payment`);
                  }}
                  style={{
                    width: '100%', padding: '12px',
                    borderRadius: 50, border: plan.btnBorder,
                    background: plan.btnBg, color: plan.btnColor,
                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                    marginBottom: 22, fontFamily: FONT,
                  }}
                >
                  Get started →
                </button>

                {/* Features label */}
                <p style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '1.2px',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', margin: '0 0 12px',
                }}>
                  What's included
                </p>

                {/* Feature list */}
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                        background: plan.featured ? 'rgba(212,168,75,0.14)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${plan.featured ? 'rgba(212,168,75,0.28)' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={8} color={plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.4)'} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)' }}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Selected tick */}
                {isSelected && (
                  <div style={{
                    marginTop: 18, textAlign: 'center',
                    fontSize: 12, fontWeight: 700,
                    color: plan.featured ? '#d4a84b' : 'rgba(255,255,255,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  }}>
                    <Check size={12} strokeWidth={3} /> Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Empty state ── */}
        {PLANS.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px 80px', color: 'rgba(255,255,255,0.3)', fontFamily: FONT }}>
            <p>No plans available for this mentor yet.</p>
          </div>
        )}

      </div>
    </>
  );
};

export default MentorLTMPlans;