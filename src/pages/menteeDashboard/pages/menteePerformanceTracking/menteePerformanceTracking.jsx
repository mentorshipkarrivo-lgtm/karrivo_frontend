
import { useGetMenteeAnalyticsQuery } from "./performanceTrackingapislice";

const MENTEE_ID = "69c2cc0862c041b958d92262";

/* ─── SMALL COMPONENTS ──────────────────────────────────────── */
const css = {
    card: {
        background: "#fff",
        borderRadius: 10,
        padding: "16px 18px",
        border: "1px solid #eef2f7",
    },
};

function Tag({ children, bg = "#eff6ff", color = "#2563eb", size = 10 }) {
    return (
        <span style={{ fontSize: size, fontWeight: 700, background: bg, color, padding: "2px 9px", borderRadius: 99 }}>
            {children}
        </span>
    );
}

function DonutChart({ segs, size = 100, thick = 16, label, sub }) {
    const r = (size - thick) / 2;
    const circ = 2 * Math.PI * r;
    const total = segs.reduce((a, s) => a + s.v, 0) || 1;
    let cum = 0;
    return (
        <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f4f8" strokeWidth={thick} />
                {segs.map((s, i) => {
                    const dash = (s.v / total) * circ;
                    const off = -(cum / total) * circ;
                    cum += s.v;
                    return (
                        <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
                            stroke={s.c} strokeWidth={thick}
                            strokeDasharray={`${dash} ${circ - dash}`}
                            strokeDashoffset={off} strokeLinecap="butt" />
                    );
                })}
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                {label && <span style={{ fontSize: size < 80 ? 13 : 17, fontWeight: 800, color: "#0f172a" }}>{label}</span>}
                {sub && <span style={{ fontSize: 9, color: "#94a3b8" }}>{sub}</span>}
            </div>
        </div>
    );
}

function GaugeChart({ value = 0, size = 140 }) {
    const r = 52, cx = size / 2, cy = size * 0.62;
    const startAngle = -210, endAngle = 30;
    const range = endAngle - startAngle;
    const clamped = Math.min(Math.max(value, 0), 100);
    const angle = startAngle + (clamped / 100) * range;
    const toRad = a => (a * Math.PI) / 180;
    const arc = (a1, a2, r2) => {
        const x1 = cx + r2 * Math.cos(toRad(a1)), y1 = cy + r2 * Math.sin(toRad(a1));
        const x2 = cx + r2 * Math.cos(toRad(a2)), y2 = cy + r2 * Math.sin(toRad(a2));
        const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
        return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2}`;
    };
    const nx = cx + r * 0.72 * Math.cos(toRad(angle));
    const ny = cy + r * 0.72 * Math.sin(toRad(angle));
    const zones = [
        { from: -210, to: -110, c: "#f87171" },
        { from: -110, to: -10, c: "#f59e0b" },
        { from: -10, to: 30, c: "#22c55e" },
    ];
    return (
        <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
            <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#f0f4f8" strokeWidth={18} />
            {zones.map((z, i) => (
                <path key={i} d={arc(z.from, z.to, r + 10)} fill="none" stroke={z.c}
                    strokeWidth={16} strokeLinecap="round" style={{ opacity: 0.9 }} />
            ))}
            <circle cx={cx} cy={cy} r={6} fill="#1e293b" />
            <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1e293b" strokeWidth={2.5} strokeLinecap="round" />
            <text x={cx} y={cy + 26} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f172a">
                {value.toFixed(1)}
            </text>
            <text x={cx} y={cy + 38} textAnchor="middle" fontSize="9" fill="#94a3b8">/100</text>
        </svg>
    );
}

/* ─── LOADING STATE ─────────────────────────────────────────── */
function LoadingState() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f4f6fb", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{
                    width: 40, height: 40, border: "3px solid #e2e8f0",
                    borderTop: "3px solid #3b82f6", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite", margin: "0 auto 12px"
                }} />
                <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>Loading analytics...</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}

/* ─── ERROR STATE ───────────────────────────────────────────── */
function ErrorState({ message, onRetry }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f4f6fb", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
            <div style={{ textAlign: "center", background: "#fff", padding: "32px 40px", borderRadius: 12, border: "1px solid #fee2e2", maxWidth: 400 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⚠️</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", marginBottom: 6 }}>Failed to load analytics</div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>{message}</div>
                <button onClick={onRetry} style={{
                    padding: "8px 20px", background: "#3b82f6", color: "#fff",
                    border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer"
                }}>
                    Retry
                </button>
            </div>
        </div>
    );
}

/* ─── MAIN DASHBOARD ────────────────────────────────────────── */
export default function Dashboard() {

    // ── RTK Query hook ──
    const { data, isLoading, isError, error, refetch } = useGetMenteeAnalyticsQuery(MENTEE_ID);

    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState message={error?.message || "Something went wrong"} onRetry={refetch} />;
    if (!data) return null;

    // ── Destructure raw API response fields (exactly as they come from the API) ──
    const {
        mentee_id,
        sessionStats,
        ratingStats,
        performance,
        eligibility,
        talentPool,
        lastSessionSnapshot,
    } = data;

    /* ── Derived values for UI ── */
    const score = performance?.score ?? 0;
    const grade = performance?.grade ?? "N/A";
    const gradeColor = grade === "Excellent" ? "#22c55e"
        : grade === "Good" ? "#3b82f6"
            : grade === "Average" ? "#f59e0b"
                : "#f87171";
    const scoreColor = score >= 75 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#f87171";

    const attendSegs = [
        { v: sessionStats?.attended || 0.001, c: "#3b82f6" },
        { v: sessionStats?.missed || 0.001, c: "#f87171" },
        { v: Math.max(0, (sessionStats?.total ?? 0) - (sessionStats?.attended ?? 0) - (sessionStats?.missed ?? 0)), c: "#e2e8f0" },
    ];

    const eligSegs = [
        { v: eligibility?.eligible ? 100 : score, c: eligibility?.eligible ? "#22c55e" : "#f87171" },
        { v: eligibility?.eligible ? 0 : Math.max(0, 100 - score), c: "#f0fdf4" },
    ];

    const formatDate = (iso) => {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    return (
        <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f4f6fb", minHeight: "100vh", fontSize: 13 }}>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

                {/* ── PAGE HEADER ── */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>Mentee Analytics</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>ID: {mentee_id}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: sessionStats?.isActive ? "#22c55e" : "#f87171", display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{sessionStats?.isActive ? "Active" : "Inactive"}</span>
                    </div>
                </div>

                {/* ── ROW 1: Session Stats | Attendance | Eligibility | Rating ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1.2fr", gap: 12 }}>

                    {/* Session Stats */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Session Stats</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            {[
                                { l: "Total", v: sessionStats?.total ?? 0, c: "#3b82f6" },
                                { l: "Attended", v: sessionStats?.attended ?? 0, c: "#22c55e" },
                                { l: "Missed", v: sessionStats?.missed ?? 0, c: "#f87171" },
                                { l: "Rate", v: sessionStats?.attendanceRate ?? "0%", c: "#f59e0b" },
                            ].map(s => (
                                <div key={s.l} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                                    <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
                                    <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attendance Donut */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Attendance Overview</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <DonutChart segs={attendSegs} size={100} thick={16} label={sessionStats?.total ?? 0} sub="Total" />
                            <div style={{ flex: 1 }}>
                                {[
                                    { l: "Attended", v: sessionStats?.attended ?? 0, c: "#3b82f6" },
                                    { l: "Missed", v: sessionStats?.missed ?? 0, c: "#f87171" },
                                    { l: "Remaining", v: Math.max(0, (sessionStats?.total ?? 0) - (sessionStats?.attended ?? 0) - (sessionStats?.missed ?? 0)), c: "#e2e8f0" },
                                ].map(r => (
                                    <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.c, flexShrink: 0, display: "inline-block" }} />
                                        <span style={{ fontSize: 11, color: "#64748b", flex: 1 }}>{r.l}</span>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{r.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Eligibility */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Eligibility</div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <DonutChart segs={eligSegs} size={90} thick={14}
                                label={eligibility?.eligible ? "✓" : "✗"}
                                sub={eligibility?.eligible ? "Eligible" : "Not Yet"} />
                            <div style={{ marginTop: 8, textAlign: "center" }}>
                                <Tag
                                    bg={eligibility?.eligible ? "#dcfce7" : "#fef2f2"}
                                    color={eligibility?.eligible ? "#16a34a" : "#dc2626"}
                                    size={10}>
                                    {eligibility?.eligible ? "✓ Eligible" : "✗ Not Eligible"}
                                </Tag>
                                {!eligibility?.eligible && (
                                    <div style={{ marginTop: 6 }}>
                                        {(eligibility?.reasons ?? []).map((r, i) => (
                                            <div key={i} style={{ fontSize: 9, color: "#f87171", marginBottom: 2 }}>• {r}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Rating Stats */}
                    <div style={{ ...css.card, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase", width: "100%" }}>Rating Stats</div>
                        <DonutChart
                            segs={[
                                { v: ratingStats?.averageRating ? ratingStats.averageRating : 0.001, c: "#f59e0b" },
                                { v: ratingStats?.averageRating ? 5 - ratingStats.averageRating : 5, c: "#e2e8f0" },
                            ]}
                            size={100} thick={16}
                            label={ratingStats?.averageRating ? ratingStats.averageRating.toFixed(1) : "—"}
                            sub="Avg Rating" />
                        <div style={{ marginTop: 10, width: "100%" }}>
                            {[
                                { l: "Avg Rating", v: ratingStats?.averageRating ? `${ratingStats.averageRating}/5` : "N/A" },
                                { l: "Last Session", v: ratingStats?.lastSessionRating ?? "N/A" },
                                { l: "Rated Sessions", v: ratingStats?.ratedSessionsCount ?? 0 },
                            ].map(r => (
                                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                    <span style={{ fontSize: 11, color: "#64748b" }}>{r.l}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{r.v}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── ROW 2: Performance Gauge | Talent Pool | Last Session ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1.2fr", gap: 12 }}>

                    {/* Performance Gauge */}
                    <div style={{ ...css.card, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase", width: "100%" }}>Performance Score</div>
                        <GaugeChart value={score} size={160} />
                        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                            {[{ l: "Low", c: "#f87171" }, { l: "Mid", c: "#f59e0b" }, { l: "High", c: "#22c55e" }].map(z => (
                                <div key={z.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: z.c, display: "inline-block" }} />
                                    <span style={{ fontSize: 9, color: "#94a3b8" }}>{z.l}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 10, textAlign: "center" }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: gradeColor }}>{grade}</div>
                            <div style={{ fontSize: 9, color: "#94a3b8" }}>Score: {score.toFixed(2)} / 100</div>
                        </div>
                    </div>

                    {/* Talent Pool */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>Talent Pool</div>
                        <div style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "center" }}>
                            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 16px", textAlign: "center" }}>
                                <div style={{ fontSize: 22, fontWeight: 800, color: talentPool?.canEnter ? "#22c55e" : "#f87171" }}>
                                    {talentPool?.canEnter ? "✓" : "✗"}
                                </div>
                                <div style={{ fontSize: 9, color: "#94a3b8" }}>Can Enter</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Tag
                                    bg={talentPool?.canEnter ? "#dcfce7" : "#fef2f2"}
                                    color={talentPool?.canEnter ? "#16a34a" : "#dc2626"}
                                    size={11}>
                                    {talentPool?.canEnter ? "Eligible for Talent Pool" : "Not Ready for Talent Pool"}
                                </Tag>
                            </div>
                        </div>

                        <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>Requirements:</div>
                            {(talentPool?.reasons ?? []).length > 0 ? (
                                (talentPool?.reasons ?? []).map((reason, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 6 }}>
                                        <div style={{
                                            width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                                            background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 8, fontWeight: 900, color: "#dc2626"
                                        }}>✗</div>
                                        <span style={{ fontSize: 10, color: "#64748b" }}>{reason}</span>
                                    </div>
                                ))
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 900, color: "#16a34a" }}>✓</div>
                                    <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>All requirements met!</span>
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span style={{ fontSize: 10, color: "#64748b" }}>Performance Progress</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: scoreColor }}>{score.toFixed(1)}% / 75%</span>
                            </div>
                            <div style={{ height: 6, background: "#f1f5f9", borderRadius: 99 }}>
                                <div style={{
                                    height: "100%", borderRadius: 99,
                                    width: `${Math.min((score / 75) * 100, 100)}%`,
                                    background: scoreColor,
                                    transition: "width 0.6s ease"
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Last Session Snapshot */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Last Session</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>Session Date</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{formatDate(lastSessionSnapshot?.session_date)}</div>
                            </div>
                            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>Days Since</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                                    {sessionStats?.daysSinceLastSession != null ? `${sessionStats.daysSinceLastSession} day(s)` : "—"}
                                </div>
                            </div>
                            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>Session Rating</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: lastSessionSnapshot?.rating ? "#f59e0b" : "#94a3b8" }}>
                                    {lastSessionSnapshot?.rating ? `${lastSessionSnapshot.rating} / 5` : "Not Rated"}
                                </div>
                            </div>
                            <div style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>Notes</div>
                                <div style={{ fontSize: 11, color: lastSessionSnapshot?.notes ? "#0f172a" : "#cbd5e1", fontStyle: lastSessionSnapshot?.notes ? "normal" : "italic" }}>
                                    {lastSessionSnapshot?.notes ?? "No notes available"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── ROW 3: Session Timeline | Eligibility Details ── */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12 }}>

                    {/* Session Timeline */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Session Timeline</div>
                        {[
                            { l: "First Session", v: formatDate(sessionStats?.firstSessionDate) },
                            { l: "Last Session", v: formatDate(sessionStats?.lastSessionDate) },
                            { l: "Days Since Last", v: sessionStats?.daysSinceLastSession != null ? `${sessionStats.daysSinceLastSession} days ago` : "—" },
                            { l: "Status", v: sessionStats?.isActive ? "Active" : "Inactive" },
                        ].map(item => (
                            <div key={item.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                                <span style={{ fontSize: 11, color: "#64748b" }}>{item.l}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{item.v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Eligibility Details */}
                    <div style={{ ...css.card }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Eligibility Details</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>Eligibility Reasons</div>
                                {(eligibility?.reasons ?? []).length > 0
                                    ? (eligibility?.reasons ?? []).map((r, i) => (
                                        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                                            <span style={{ color: "#f87171", fontSize: 10, flexShrink: 0 }}>✗</span>
                                            <span style={{ fontSize: 10, color: "#64748b" }}>{r}</span>
                                        </div>
                                    ))
                                    : <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>All criteria met ✓</div>
                                }
                            </div>
                            <div>
                                <div style={{ fontSize: 10, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>Talent Pool Reasons</div>
                                {(talentPool?.reasons ?? []).length > 0
                                    ? (talentPool?.reasons ?? []).map((r, i) => (
                                        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                                            <span style={{ color: "#f87171", fontSize: 10, flexShrink: 0 }}>✗</span>
                                            <span style={{ fontSize: 10, color: "#64748b" }}>{r}</span>
                                        </div>
                                    ))
                                    : <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>All criteria met ✓</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}