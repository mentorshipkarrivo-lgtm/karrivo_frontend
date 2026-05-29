


import React, { useState, useEffect } from 'react';
import {
  ChevronRight, WifiOff,   
  CalendarDays,
  CheckCircle,Loader2, CircleAlert, UserRound, TrendingUp, BarChart3, Activity
} from 'lucide-react';
import { useGetUserDetailsQuery, useGetMentorSessionBookingsQuery } from './MentorDashboardapislice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../global/Loader';

const C = {
  primary: '#0098cc',
  btn: '#1a1a2e',
  bg: '#ffffff',
  surface: '#f8f9fb',
  border: '#e8eaed',
  borderLight: '#f0f1f3',
  textDark: '#111318',
  textMid: '#6b7280',
  textLight: '#9ca3af',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const STATUS = {
  confirmed: { bg: '#ecfdf5', text: '#059669', dot: '#10b981' },
  completed: { bg: '#eff6ff', text: '#2563eb', dot: '#3b82f6' },
  cancelled: { bg: '#fff1f2', text: '#e11d48', dot: '#ef4444' },
  pending: { bg: '#fffbeb', text: '#d97706', dot: '#f59e0b' },
};

// Simple Line Chart Component
const LineChart = () => {
  return (
    <svg viewBox="0 0 200 80" style={{ width: '100%', height: 80 }}>
      <polyline
        points="10,60 30,45 50,50 70,30 90,40 110,25 130,35 150,20 170,30 190,15"
        fill="none"
        stroke={C.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Simple Bar Chart Component
const BarChart = ({ dataPoints = [6, 8, 5, 7, 9, 6, 8] }) => {
  const maxValue = 10;
  const barWidth = 24;
  const spacing = 4;

  return (
    <svg viewBox="0 0 180 80" style={{ width: '100%', height: 60 }}>
      {dataPoints.map((value, idx) => {
        const x = idx * (barWidth + spacing) + 10;
        const height = (value / maxValue) * 60;
        const y = 70 - height;

        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={barWidth}
            height={height}
            fill={idx % 2 === 0 ? C.primary : `${C.primary}40`}
            rx="2"
          />
        );
      })}
    </svg>
  );
};

export default function MentorDashboard() {
  const navigate = useNavigate();
  const [mentorId, setMentorId] = useState(null);
  const [mentorEmail, setMentorEmail] = useState(null);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('userData') || '{}');
      setMentorId(u?._id);
      setMentorEmail(u?.email);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const { data: userDetails, isLoading: detailsLoading, isError: detailsError, error } =
    useGetUserDetailsQuery(mentorId, { skip: !mentorId });
  const { data: sessionData, isLoading: sessionsLoading } =
    useGetMentorSessionBookingsQuery(mentorEmail, { skip: !mentorEmail });

  const user = userDetails?.data;
  const stats = sessionData?.data?.stats || {};
  const bookings = sessionData?.data?.bookings || [];

  useEffect(() => {
    if (user?.mentorId) {
      try {
        localStorage.setItem('mentorId', user.mentorId);
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = bookings.filter(b => b.status === 'confirmed' && new Date(b.sessionDate) >= today).length;
  const total = stats.total || 0;
  const completed = stats.completed || 0;
  const cancelled = stats.cancelled || 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const fmt = (d, short) =>
    !d
      ? '—'
      : new Date(d).toLocaleDateString('en-US', short ? { month: 'short', day: 'numeric', year: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' });

  if (detailsLoading)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );

  if (detailsError)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <CircleAlert size={36} style={{ color: C.error }} className="mx-auto mb-3 opacity-60" />
          <p style={{ color: C.textLight }}>{error?.data?.message || 'Failed to load dashboard'}</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div style={{ background: C.bg }} className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <UserRound size={36} style={{ color: C.textLight }} className="mx-auto mb-3 opacity-50" />
          <p style={{ color: C.textLight }}>No user data found</p>
        </div>
      </div>
    );

  const initials = (user?.name || 'M')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .stat-card:hover { transform: translateY(-2px); }
        .session-row:hover { background: #ffffff !important; }
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1a1a2e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* ── HEADER ── */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize:18, fontWeight: 700, color: C.textDark, letterSpacing: '-0.5px' }}>
            Mentor Dashboard
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: C.textLight }}>
            {todayDate}
          </p>
        </div>

        {/* ── TOP STATS CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            {
              label: "Total Sessions",
              value: sessionsLoading ? "—" : total,
              unit: "",
              icon: <BarChart3 size={20} />,
            },
            {
              label: "Upcoming",
              value: sessionsLoading ? "—" : upcoming,
              unit: "",
              icon: <CalendarDays size={20} />,
            },
            {
              label: "Completion Rate",
              value: `${completionRate}%`,
              unit: "",
              icon: <CheckCircle size={20} />,
            },
          ].map(({ label, value, unit, icon }, i) => (
            <div
              key={label}
              className="stat-card"
              style={{
                background: '#ffffff',
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div className="stat-icon" style={{ color: '#fff', fontSize: 20 }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 11, color: C.textLight, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {label}
                </p>
                <p style={{ margin: '8px 0 0', fontSize: 28, fontWeight: 700, color: C.textDark, fontFamily: "'DM Mono', monospace", letterSpacing: '-1px' }}>
                  {value}
                  <span style={{ fontSize: 14, color: C.textMid, fontWeight: 500, marginLeft: 4 }}>
                    {unit}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CHARTS SECTION ── */}
        {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Activity Hours
              </h3>
              <select
                style={{
                  fontSize: 12,
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  padding: '4px 8px',
                  background: '#ffffff',
                  color: C.textMid,
                  cursor: 'pointer',
                }}
              >
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div style={{ height: 100 }}>
              <BarChart dataPoints={[6, 8, 5, 7, 9, 6, 8]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
                <span key={day} style={{ fontSize: 11, color: C.textLight, fontWeight: 500 }}>
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '24px',
            }}
          >
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: C.textDark }}>
              Performance
            </h3>
            <div style={{ marginBottom: 24 }}>
              <LineChart />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Time spent', value: 28, unit: 'hrs', color: '#3b82f6' },
                { label: 'Session taken', value: 50, unit: 'hrs', color: '#10b981' },
                { label: 'Events passed', value: 10, unit: 'hrs', color: '#f59e0b' },
              ].map(({ label, value, unit, color }) => (
                <div
                  key={label}
                  style={{
                    padding: '12px',
                    background: '#f8f9fb',
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, color: C.textLight, fontWeight: 500 }}>
                    {label}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 700, color }}>
                    {value} <span style={{ fontSize: 11, color: C.textMid }}>{unit}</span>
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: '12px', background: '#f8f9fb', borderRadius: 8, textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: 12, color: C.textMid }}>
                Your productivity is <strong style={{ color: C.success }}>30%</strong> higher compared to last month
              </p>
            </div>
          </div>
        </div> */}

        {/* ── SESSIONS & PROFILE ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Session Bookings */}
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Session Bookings
              </h3>
            </div>

            {sessionsLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <Loader2 size={22} style={{ color: C.textLight }} className="animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px', color: C.textLight }}>
                <WifiOff size={26} style={{ margin: '0 auto 10px', opacity: 0.4, display: 'block' }} />
                <p style={{ margin: 0, fontSize: 13 }}>No sessions found</p>
              </div>
            ) : (
              <div>
                {bookings.slice(0, 5).map((b, idx) => {
                  const sc = STATUS[b.status] || STATUS.pending;
                  return (
                    <div
                      key={b._id}
                      className="session-row"
                      onClick={() => navigate(`/session/${b._id}`)}
                      style={{
                        padding: '16px 24px',
                        borderBottom: idx < Math.min(4, bookings.length - 1) ? `1px solid ${C.borderLight}` : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#ffffff',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.textDark }}>
                          {b.topic || 'Session'}
                        </p>
                        <p style={{ margin: '3px 0 0', fontSize: 11, color: C.textMid }}>
                          {b.menteeName}
                          <span style={{ color: C.textLight, margin: '0 5px' }}>·</span>
                          {fmt(b.sessionDate, true)}
                        </p>
                      </div>
                      <ChevronRight size={16} style={{ color: C.textLight, flexShrink: 0, marginLeft: 12 }} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div
            style={{
              background: '#ffffff',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px', borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.textDark }}>
                Profile Info
              </h3>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `${C.primary}15`,
                    color: C.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    fontFamily: "'DM Mono', monospace",
                    border: `2px solid ${C.primary}25`,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: C.textDark }}>
                    {user?.name || 'Mentor'}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: C.textMid }}>
                    {user?.email}
                  </p>
                  {user?.isActive && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.success, marginTop: 6, display: 'inline-block' }}>
                      ● Active
                    </span>
                  )}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 16 }}>
                {[
                  ['Member Since', fmt(user?.createdAt)],
                  ['Phone', user?.phone ? `+${user.countryCode} ${user.phone}` : '—'],
                  // ['Location', user?.city ? `${user.city}${user.country ? `, ${user.country}` : ''}` : '—'],
                  // ['Status', user?.isVerified ? '✓ Verified' : 'Pending'],
                ].map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <p style={{ margin: 0, fontSize: 10, color: C.textLight, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {label}
                    </p>
                    <p style={{ margin: '3px 0 0', fontSize: 12, color: C.textDark, fontWeight: 600 }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/mentor-profile')}
                style={{
                  marginTop: 16,
                  width: '100%',
                  padding: '10px 14px',
                  background: C.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={e => (e.target.style.opacity = '0.9')}
                onMouseOut={e => (e.target.style.opacity = '1')}
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





