// // // import { useState, useEffect, useRef } from "react";

// // // const menteeData = {
// // //     name: "Adrian Villalobos",
// // //     role: "Full Stack Developer",
// // //     avatar: "AV",
// // //     level: "Rising Star",
// // //     score: 87,
// // //     department: "Engineering",
// // //     joinDate: "Jan 2024",
// // //     mentor: "Brian Villalobos",
// // // };

// // // const attendanceData = {
// // //     total: 120,
// // //     present: 65,
// // //     late: 21,
// // //     permission: 2,
// // //     absent: 11,
// // //     punctualityRate: 89,
// // // };

// // // const taskData = [
// // //     { name: "UI Redesign", status: "Completed", due: "Mar 10", rating: 5 },
// // //     { name: "API Integration", status: "Completed", due: "Mar 15", rating: 4 },
// // //     { name: "Bug Fixes Sprint", status: "In Progress", due: "Mar 28", rating: null },
// // //     { name: "Documentation", status: "Pending", due: "Apr 02", rating: null },
// // //     { name: "Code Review", status: "Completed", due: "Mar 20", rating: 5 },
// // // ];

// // // const performanceHistory = [
// // //     { month: "Oct", score: 72 },
// // //     { month: "Nov", score: 75 },
// // //     { month: "Dec", score: 78 },
// // //     { month: "Jan", score: 80 },
// // //     { month: "Feb", score: 84 },
// // //     { month: "Mar", score: 87 },
// // // ];

// // // const talentPoolStatus = {
// // //     eligible: true,
// // //     poolDate: "Mar 2024",
// // //     matches: 3,
// // //     referrals: 1,
// // //     hiringOutcome: "Interview Scheduled",
// // // };

// // // const clockInData = [
// // //     { name: "Daniel Estella", role: "iOS Developer", in: "08:30 AM", out: "05:00 PM", hrs: "8:30", status: "on-time" },
// // //     { name: "Douglas Martin", role: "Project Manager", in: "09:10 AM", out: "06:15 PM", hrs: "9:05", status: "late" },
// // //     { name: "Brian Villalobos", role: "Full Stack Dev", in: "08:45 AM", out: "05:30 PM", hrs: "8:45", status: "on-time" },
// // // ];

// // // // SVG Pie / Donut Chart
// // // function DonutChart({ segments, size = 160, thickness = 28, label, sublabel }) {
// // //     const r = (size - thickness) / 2;
// // //     const cx = size / 2;
// // //     const cy = size / 2;
// // //     const circ = 2 * Math.PI * r;

// // //     let cumulative = 0;
// // //     const total = segments.reduce((s, d) => s + d.value, 0);

// // //     const slices = segments.map((seg) => {
// // //         const pct = seg.value / total;
// // //         const dash = pct * circ;
// // //         const offset = cumulative * circ;
// // //         cumulative += pct;
// // //         return { ...seg, dash, offset };
// // //     });

// // //     return (
// // //         <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
// // //             <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
// // //                 <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f0f4f8" strokeWidth={thickness} />
// // //                 {slices.map((s, i) => (
// // //                     <circle
// // //                         key={i}
// // //                         cx={cx} cy={cy} r={r}
// // //                         fill="none"
// // //                         stroke={s.color}
// // //                         strokeWidth={thickness}
// // //                         strokeDasharray={`${s.dash} ${circ - s.dash}`}
// // //                         strokeDashoffset={-s.offset}
// // //                         strokeLinecap="butt"
// // //                     />
// // //                 ))}
// // //             </svg>
// // //             <div style={{
// // //                 position: "absolute", inset: 0,
// // //                 display: "flex", flexDirection: "column",
// // //                 alignItems: "center", justifyContent: "center",
// // //                 gap: 2
// // //             }}>
// // //                 {label && <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>{label}</span>}
// // //                 {sublabel && <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{sublabel}</span>}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // function StarRating({ rating }) {
// // //     return (
// // //         <span style={{ letterSpacing: 1, fontSize: 12 }}>
// // //             {[1, 2, 3, 4, 5].map(s => (
// // //                 <span key={s} style={{ color: s <= rating ? "#f59e0b" : "#e2e8f0" }}>★</span>
// // //             ))}
// // //         </span>
// // //     );
// // // }

// // // function StatusBadge({ status }) {
// // //     const map = {
// // //         "Completed": { bg: "#dcfce7", color: "#16a34a" },
// // //         "In Progress": { bg: "#dbeafe", color: "#2563eb" },
// // //         "Pending": { bg: "#f1f5f9", color: "#94a3b8" },
// // //     };
// // //     const s = map[status] || map["Pending"];
// // //     return (
// // //         <span style={{
// // //             background: s.bg, color: s.color,
// // //             fontSize: 11, fontWeight: 600,
// // //             padding: "2px 10px", borderRadius: 99,
// // //             letterSpacing: 0.3
// // //         }}>{status}</span>
// // //     );
// // // }

// // // // Mini line sparkline
// // // function Sparkline({ data }) {
// // //     const max = Math.max(...data.map(d => d.score));
// // //     const min = Math.min(...data.map(d => d.score)) - 5;
// // //     const w = 220, h = 56;
// // //     const pts = data.map((d, i) => {
// // //         const x = (i / (data.length - 1)) * w;
// // //         const y = h - ((d.score - min) / (max - min + 2)) * h;
// // //         return `${x},${y}`;
// // //     }).join(" ");

// // //     const lastX = w;
// // //     const lastY = h - ((data[data.length - 1].score - min) / (max - min + 2)) * h;

// // //     return (
// // //         <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
// // //             <defs>
// // //                 <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
// // //                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
// // //                     <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
// // //                 </linearGradient>
// // //             </defs>
// // //             <polygon
// // //                 points={`0,${h} ${pts} ${w},${h}`}
// // //                 fill="url(#sg)"
// // //             />
// // //             <polyline
// // //                 points={pts}
// // //                 fill="none"
// // //                 stroke="#3b82f6"
// // //                 strokeWidth="2.5"
// // //                 strokeLinecap="round"
// // //                 strokeLinejoin="round"
// // //             />
// // //             <circle cx={lastX} cy={lastY} r="4" fill="#3b82f6" />
// // //         </svg>
// // //     );
// // // }

// // // export default function Dashboard() {
// // //     const [tab, setTab] = useState("overview");

// // //     const attendSegments = [
// // //         { label: "Present", value: attendanceData.present, color: "#3b82f6" },
// // //         { label: "Late", value: attendanceData.late, color: "#f59e0b" },
// // //         { label: "Permission", value: attendanceData.permission, color: "#a78bfa" },
// // //         { label: "Absent", value: attendanceData.absent, color: "#f87171" },
// // //     ];

// // //     const taskSegments = [
// // //         { label: "Completed", value: 3, color: "#22c55e" },
// // //         { label: "In Progress", value: 1, color: "#3b82f6" },
// // //         { label: "Pending", value: 1, color: "#e2e8f0" },
// // //     ];

// // //     const perfSegments = [
// // //         { label: "Score", value: 87, color: "#3b82f6" },
// // //         { label: "Gap", value: 13, color: "#e2e8f0" },
// // //     ];

// // //     return (
// // //         <div style={{
// // //             fontFamily: "'DM Sans', 'Outfit', sans-serif",
// // //             background: "#f8fafc",
// // //             minHeight: "100vh",
// // //             padding: "0",
// // //         }}>
// // //             <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

// // //             <div style={{ maxWidth: 1300, margin: "0 auto", padding: "28px 24px" }}>

// // //                 {/* Profile Row */}
// // //                 <div style={{
// // //                     display: "flex", alignItems: "center",
// // //                     justifyContent: "space-between",
// // //                     flexWrap: "wrap", gap: 16,
// // //                     borderBottom: "1px solid #e8edf3",
// // //                     paddingBottom: 24, marginBottom: 32
// // //                 }}>
// // //                     <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
// // //                         {/* <div style={{
// // //                             width: 52, height: 52, borderRadius: 14,
// // //                             background: "linear-gradient(135deg,#2563eb,#60a5fa)",
// // //                             display: "flex", alignItems: "center", justifyContent: "center",
// // //                             color: "#fff", fontWeight: 800, fontSize: 16,
// // //                             letterSpacing: 1
// // //                         }}>{menteeData.avatar}</div> */}
// // //                         <div>
// // //                             <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
// // //                                 <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.4px" }}>
// // //                                     {menteeData.name}
// // //                                 </span>
// // //                                 <span style={{
// // //                                     background: "#eff6ff", color: "#2563eb",
// // //                                     fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 99
// // //                                 }}>{menteeData.level}</span>
// // //                                 <span style={{
// // //                                     background: "#f1f5f9", color: "#64748b",
// // //                                     fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 99
// // //                                 }}>{menteeData.department}</span>
// // //                             </div>
// // //                             <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
// // //                                 {menteeData.role} &nbsp;·&nbsp; Joined {menteeData.joinDate} &nbsp;·&nbsp; Mentor: <span style={{ color: "#2563eb", fontWeight: 600 }}>{menteeData.mentor}</span>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
// // //                         {[
// // //                             { label: "Attendance", val: "95%" },
// // //                             { label: "Punctuality", val: "89%" },
// // //                             { label: "Tasks Done", val: "82%" },
// // //                             { label: "Avg Rating", val: "4.7★" },
// // //                         ].map(m => (
// // //                             <div key={m.label} style={{ textAlign: "center" }}>
// // //                                 <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>{m.val}</div>
// // //                                 <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{m.label}</div>
// // //                             </div>
// // //                         ))}
// // //                     </div>
// // //                 </div>

// // //                 {/* Charts Row */}
// // //                 <div style={{
// // //                     display: "grid",
// // //                     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
// // //                     gap: 40,
// // //                     marginBottom: 40,
// // //                     alignItems: "start"
// // //                 }}>

// // //                     {/* Performance Score donut */}
// // //                     <div>
// // //                         <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Performance Score</div>
// // //                         <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
// // //                             <DonutChart segments={perfSegments} size={140} thickness={20} label="87" sublabel="/ 100" />
// // //                             <div style={{ flex: 1 }}>
// // //                                 <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
// // //                                     <span style={{ color: "#22c55e", fontWeight: 700 }}>↑ +15 pts</span> over 6 months
// // //                                 </div>
// // //                                 <div style={{ marginTop: 10 }}>
// // //                                     <Sparkline data={performanceHistory} />
// // //                                     <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
// // //                                         {performanceHistory.map(d => (
// // //                                             <span key={d.month} style={{ fontSize: 10, color: "#cbd5e1" }}>{d.month}</span>
// // //                                         ))}
// // //                                     </div>
// // //                                 </div>
// // //                                 <div style={{
// // //                                     marginTop: 10, fontSize: 11, fontWeight: 600,
// // //                                     color: "#22c55e", background: "#dcfce7",
// // //                                     display: "inline-block", padding: "3px 10px", borderRadius: 99
// // //                                 }}>✓ Eligible for Talent Pool</div>
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Attendance donut */}
// // //                     <div>
// // //                         <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Attendance Breakdown</div>
// // //                         <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
// // //                             <DonutChart segments={attendSegments} size={140} thickness={22} label={attendanceData.total} sublabel="Total Days" />
// // //                             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
// // //                                 {attendSegments.map(s => (
// // //                                     <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //                                         <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0, display: "inline-block" }} />
// // //                                         <span style={{ fontSize: 12, color: "#64748b", flex: 1 }}>{s.label}</span>
// // //                                         <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{s.value}</span>
// // //                                         <span style={{ fontSize: 11, color: "#94a3b8", width: 32, textAlign: "right" }}>
// // //                                             {Math.round(s.value / attendanceData.total * 100)}%
// // //                                         </span>
// // //                                     </div>
// // //                                 ))}
// // //                             </div>
// // //                         </div>
// // //                     </div>

// // //                     {/* Task donut */}
// // //                     <div>
// // //                         <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>Task Completion</div>
// // //                         <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
// // //                             <DonutChart segments={taskSegments} size={140} thickness={22} label="3/5" sublabel="Done" />
// // //                             <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
// // //                                 {taskSegments.map(s => (
// // //                                     <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //                                         <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0, display: "inline-block" }} />
// // //                                         <span style={{ fontSize: 12, color: "#64748b", flex: 1 }}>{s.label}</span>
// // //                                         <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{s.value}</span>
// // //                                     </div>
// // //                                 ))}
// // //                                 <div style={{
// // //                                     marginTop: 6, fontSize: 12, color: "#64748b",
// // //                                     borderTop: "1px solid #f1f5f9", paddingTop: 8
// // //                                 }}>Avg rating: <span style={{ fontWeight: 700, color: "#f59e0b" }}>4.7 ★</span></div>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* Divider */}
// // //                 <div style={{ borderTop: "1px solid #e8edf3", marginBottom: 32 }} />

// // //                 {/* Tasks Table */}
// // //                 {/* <div style={{ marginBottom: 36 }}>
// // //                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
// // //                         <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Task Completion & Ratings</span>
// // //                         <span style={{ fontSize: 12, color: "#2563eb", cursor: "pointer", fontWeight: 600 }}>View all →</span>
// // //                     </div>
// // //                     <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //                         <thead>
// // //                             <tr style={{ borderBottom: "1px solid #e8edf3" }}>
// // //                                 {["Task Name", "Status", "Due Date", "Rating"].map(h => (
// // //                                     <th key={h} style={{
// // //                                         textAlign: "left", fontSize: 11, fontWeight: 700,
// // //                                         color: "#94a3b8", letterSpacing: 0.8,
// // //                                         textTransform: "uppercase", padding: "0 12px 10px 0"
// // //                                     }}>{h}</th>
// // //                                 ))}
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {taskData.map((t, i) => (
// // //                                 <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
// // //                                     <td style={{ padding: "12px 12px 12px 0", fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{t.name}</td>
// // //                                     <td style={{ padding: "12px 12px 12px 0" }}><StatusBadge status={t.status} /></td>
// // //                                     <td style={{ padding: "12px 12px 12px 0", fontSize: 12, color: "#64748b", fontFamily: "DM Mono, monospace" }}>{t.due}</td>
// // //                                     <td style={{ padding: "12px 0" }}>
// // //                                         {t.rating ? <StarRating rating={t.rating} /> : <span style={{ fontSize: 12, color: "#cbd5e1" }}>—</span>}
// // //                                     </td>
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>
// // //                 </div> */}

// // //                 {/* Divider */}
// // //                 <div style={{ borderTop: "1px solid #e8edf3", marginBottom: 32 }} />



// // //                 {/* Divider */}
// // //                 <div style={{ borderTop: "1px solid #e8edf3", marginBottom: 32 }} />

// // //                 {/* Bottom two-col */}
// // //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, marginBottom: 36 }}>

// // //                     {/* Performance Engine */}
// // //                     <div>
// // //                         <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Performance Engine</div>
// // //                         <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
// // //                             {[
// // //                                 { step: "System Tracks", detail: "Attendance · Punctuality · Tasks · Ratings", done: true },
// // //                                 { step: "Engine Runs", detail: "Weighted algorithm processes all inputs", done: true },
// // //                                 { step: "Score & Level", detail: "87 / 100 · Rising Star", done: true },
// // //                                 { step: "Stored in Profile", detail: "Saved to mentee performance profile", done: true },
// // //                                 { step: "Eligibility Check", detail: "Threshold: 75+ · Status: Eligible", done: true },
// // //                             ].map((s, i, arr) => (
// // //                                 <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
// // //                                     {/* timeline line */}
// // //                                     {i < arr.length - 1 && (
// // //                                         <div style={{
// // //                                             position: "absolute", left: 9, top: 24,
// // //                                             width: 2, height: "calc(100% - 4px)",
// // //                                             background: s.done ? "#bfdbfe" : "#e8edf3"
// // //                                         }} />
// // //                                     )}
// // //                                     <div style={{
// // //                                         width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
// // //                                         background: s.done ? "#2563eb" : "#e8edf3",
// // //                                         display: "flex", alignItems: "center", justifyContent: "center",
// // //                                         fontSize: 10, color: "#fff", fontWeight: 800, marginTop: 2,
// // //                                         zIndex: 1
// // //                                     }}>{s.done ? "✓" : i + 1}</div>
// // //                                     <div style={{ paddingBottom: 20 }}>
// // //                                         <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.step}</div>
// // //                                         <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.detail}</div>
// // //                                     </div>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                     </div>

// // //                     {/* Talent Pool */}
// // //                     <div>
// // //                         <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Talent Pool & Hiring</div>

// // //                         <div style={{ display: "flex", gap: 32, marginBottom: 20 }}>
// // //                             {[
// // //                                 { label: "Matches", val: 3 },
// // //                                 { label: "Referrals", val: 1 },
// // //                                 { label: "Outcomes", val: 1 },
// // //                             ].map(s => (
// // //                                 <div key={s.label}>
// // //                                     <div style={{ fontSize: 24, fontWeight: 800, color: "#0f172a" }}>{s.val}</div>
// // //                                     <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{s.label}</div>
// // //                                 </div>
// // //                             ))}
// // //                         </div>

// // //                         <div style={{ marginBottom: 16 }}>
// // //                             <span style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", background: "#eff6ff", padding: "4px 12px", borderRadius: 99 }}>
// // //                                 ✓ Added to Talent Pool &nbsp;·&nbsp; {talentPoolStatus.poolDate}
// // //                             </span>
// // //                         </div>

// // //                         <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
// // //                             Latest: <span style={{ fontWeight: 700, color: "#0f172a" }}>{talentPoolStatus.hiringOutcome}</span>
// // //                             <span style={{ marginLeft: 8, fontSize: 11, background: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>Active</span>
// // //                         </div>

// // //                         <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// // //                             {[
// // //                                 "Top Performer Identified",
// // //                                 "Added to Talent Pool",
// // //                                 "Matched to Companies (3)",
// // //                                 "Referred to Company",
// // //                                 "Track Hiring Outcomes",
// // //                             ].map((s, i) => (
// // //                                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
// // //                                     <div style={{
// // //                                         width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
// // //                                         background: i < 4 ? "#2563eb" : "#f1f5f9",
// // //                                         display: "flex", alignItems: "center", justifyContent: "center",
// // //                                         fontSize: 9, color: i < 4 ? "#fff" : "#94a3b8", fontWeight: 800
// // //                                     }}>{i < 4 ? "✓" : "○"}</div>
// // //                                     <span style={{ fontSize: 13, color: i < 4 ? "#0f172a" : "#94a3b8", fontWeight: i < 4 ? 500 : 400 }}>{s}</span>
// // //                                 </div>
// // //                             ))}
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 {/* Divider */}
// // //                 <div style={{ borderTop: "1px solid #e8edf3", marginBottom: 24 }} />



// // //                 <div style={{ textAlign: "center", fontSize: 11, color: "#cbd5e1", paddingTop: 16 }}>
// // //                     Mentee Performance Tracker · Powered by Performance Engine
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // import { useState } from "react";

// // const mentee = {
// //     name: "Adrian Villalobos", role: "Full Stack Developer",
// //     avatar: "AV", level: "Rising Star", score: 87,
// //     department: "Engineering", joinDate: "Jan 2024", mentor: "Brian Villalobos",
// // };
// // const attendance = { total: 120, present: 65, late: 21, permission: 2, absent: 11 };
// // const punctuality = { onTime: 89, late: 11 };
// // const tasks = [
// //     { name: "UI Redesign", status: "Completed", due: "Mar 10", rating: 5 },
// //     { name: "API Integration", status: "Completed", due: "Mar 15", rating: 4 },
// //     { name: "Bug Fixes Sprint", status: "In Progress", due: "Mar 28", rating: null },
// //     { name: "Documentation", status: "Pending", due: "Apr 02", rating: null },
// //     { name: "Code Review", status: "Completed", due: "Mar 20", rating: 5 },
// // ];
// // const ratings = { avg: 4.7, count: 3 };
// // const scoreHistory = [
// //     { month: "Oct", score: 72 }, { month: "Nov", score: 75 },
// //     { month: "Dec", score: 78 }, { month: "Jan", score: 80 },
// //     { month: "Feb", score: 84 }, { month: "Mar", score: 87 },
// // ];
// // const talent = { threshold: 75, poolDate: "Mar 2024", matches: 3, referrals: 1, outcome: "Interview Scheduled" };
// // const clockIn = [
// //     { name: "Daniel Estella", role: "iOS Developer", in: "08:30 AM", out: "05:00 PM", hrs: "8:30", status: "on-time" },
// //     { name: "Douglas Martin", role: "Project Manager", in: "09:10 AM", out: "06:15 PM", hrs: "9:05", status: "late" },
// //     { name: "Brian Villalobos", role: "Full Stack Dev", in: "08:45 AM", out: "05:30 PM", hrs: "8:45", status: "on-time" },
// // ];

// // // ── helpers ──────────────────────────────────────────────────────────

// // function DonutChart({ segs, size = 120, thick = 20, label, sub }) {
// //     const r = (size - thick) / 2;
// //     const circ = 2 * Math.PI * r;
// //     const total = segs.reduce((a, s) => a + s.v, 0);
// //     let cum = 0;
// //     return (
// //         <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
// //             <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
// //                 <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f4f8" strokeWidth={thick} />
// //                 {segs.map((s, i) => {
// //                     const dash = (s.v / total) * circ;
// //                     const off = -(cum / total) * circ;
// //                     cum += s.v;
// //                     return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
// //                         stroke={s.c} strokeWidth={thick}
// //                         strokeDasharray={`${dash} ${circ - dash}`}
// //                         strokeDashoffset={off} strokeLinecap="butt" />;
// //                 })}
// //             </svg>
// //             <div style={{
// //                 position: "absolute", inset: 0, display: "flex", flexDirection: "column",
// //                 alignItems: "center", justifyContent: "center"
// //             }}>
// //                 {label && <span style={{ fontSize: size < 100 ? 14 : 20, fontWeight: 800, color: "#0f172a" }}>{label}</span>}
// //                 {sub && <span style={{ fontSize: 10, color: "#94a3b8" }}>{sub}</span>}
// //             </div>
// //         </div>
// //     );
// // }

// // function Sparkline({ data }) {
// //     const w = 180, h = 40;
// //     const max = Math.max(...data.map(d => d.score));
// //     const min = Math.min(...data.map(d => d.score)) - 4;
// //     const pts = data.map((d, i) =>
// //         `${(i / (data.length - 1)) * w},${h - ((d.score - min) / (max - min + 2)) * h}`
// //     ).join(" ");
// //     const lx = w;
// //     const ly = h - ((data[data.length - 1].score - min) / (max - min + 2)) * h;
// //     return (
// //         <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
// //             <defs>
// //                 <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.13" />
// //                     <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
// //                 </linearGradient>
// //             </defs>
// //             <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sg)" />
// //             <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="2"
// //                 strokeLinecap="round" strokeLinejoin="round" />
// //             <circle cx={lx} cy={ly} r="3.5" fill="#3b82f6" />
// //         </svg>
// //     );
// // }

// // function Stars({ n }) {
// //     return (
// //         <span style={{ fontSize: 13, letterSpacing: 1.5 }}>
// //             {[1, 2, 3, 4, 5].map(i =>
// //                 <span key={i} style={{ color: i <= n ? "#f59e0b" : "#e2e8f0" }}>★</span>
// //             )}
// //         </span>
// //     );
// // }

// // const SectionLabel = ({ children }) => (
// //     <div style={{
// //         fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 1.2,
// //         textTransform: "uppercase", marginBottom: 18
// //     }}>{children}</div>
// // );

// // const Divider = () => (
// //     <div style={{ height: 1, background: "#f1f5f9", margin: "36px 0" }} />
// // );

// // const Tag = ({ children, bg = "#eff6ff", color = "#2563eb" }) => (
// //     <span style={{
// //         fontSize: 11, fontWeight: 700, background: bg, color,
// //         padding: "2px 10px", borderRadius: 99
// //     }}>{children}</span>
// // );

// // // ── main ──────────────────────────────────────────────────────────────

// // export default function Dashboard() {
// //     const [activeNav, setActiveNav] = useState("overview");

// //     const attendSegs = [
// //         { v: attendance.present, c: "#3b82f6" },
// //         { v: attendance.late, c: "#f59e0b" },
// //         { v: attendance.permission, c: "#a78bfa" },
// //         { v: attendance.absent, c: "#f87171" },
// //     ];
// //     const punctSegs = [
// //         { v: punctuality.onTime, c: "#22c55e" },
// //         { v: punctuality.late, c: "#f87171" },
// //     ];
// //     const taskSegs = [
// //         { v: 3, c: "#22c55e" },
// //         { v: 1, c: "#3b82f6" },
// //         { v: 1, c: "#e2e8f0" },
// //     ];
// //     const scoreSegs = [
// //         { v: mentee.score, c: "#3b82f6" },
// //         { v: 100 - mentee.score, c: "#e2e8f0" },
// //     ];
// //     const ratingSegs = [
// //         { v: ratings.avg, c: "#f59e0b" },
// //         { v: 5 - ratings.avg, c: "#f1f5f9" },
// //     ];

// //     const navItems = ["overview", "attendance", "tasks", "talent"];

// //     return (
// //         <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
// //             <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

// //             {/* ── NAV ── */}
// //             <div style={{
// //                 background: "#fff", borderBottom: "1px solid #eef2f7",
// //                 padding: "0 40px", display: "flex", alignItems: "center",
// //                 justifyContent: "space-between", height: 54,
// //                 position: "sticky", top: 0, zIndex: 20
// //             }}>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
// //                     <span style={{ fontWeight: 800, fontSize: 14, color: "#0f172a", letterSpacing: "-0.3px" }}>
// //                         Performance Tracker
// //                     </span>
// //                     <div style={{ display: "flex", gap: 0 }}>
// //                         {navItems.map(n => (
// //                             <button key={n} onClick={() => setActiveNav(n)} style={{
// //                                 background: "none", border: "none", cursor: "pointer",
// //                                 fontSize: 13, fontWeight: 600, textTransform: "capitalize",
// //                                 color: activeNav === n ? "#2563eb" : "#64748b",
// //                                 borderBottom: activeNav === n ? "2px solid #2563eb" : "2px solid transparent",
// //                                 padding: "0 16px", height: 54, transition: "color 0.15s",
// //                             }}>{n}</button>
// //                         ))}
// //                     </div>
// //                 </div>
// //                 <div style={{ display: "flex", gap: 8 }}>
// //                     <button style={{
// //                         background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0",
// //                         borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer"
// //                     }}>
// //                         + Schedule
// //                     </button>
// //                     <button style={{
// //                         background: "#2563eb", color: "#fff", border: "none",
// //                         borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer"
// //                     }}>
// //                         Add Request
// //                     </button>
// //                 </div>
// //             </div>

// //             <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px 80px" }}>

// //                 {/* ── PROFILE HEADER ── */}
// //                 <div style={{
// //                     display: "flex", alignItems: "flex-start",
// //                     justifyContent: "space-between", flexWrap: "wrap", gap: 24, marginBottom: 40
// //                 }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
// //                         <div style={{
// //                             width: 56, height: 56, borderRadius: 14,
// //                             background: "linear-gradient(135deg,#2563eb,#60a5fa)",
// //                             display: "flex", alignItems: "center", justifyContent: "center",
// //                             color: "#fff", fontWeight: 800, fontSize: 17, flexShrink: 0
// //                         }}>
// //                             {mentee.avatar}
// //                         </div>
// //                         <div>
// //                             <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
// //                                 <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
// //                                     {mentee.name}
// //                                 </span>
// //                                 <Tag>{mentee.level}</Tag>
// //                                 <Tag bg="#f1f5f9" color="#64748b">{mentee.department}</Tag>
// //                             </div>
// //                             <div style={{ fontSize: 13, color: "#94a3b8" }}>
// //                                 {mentee.role} &nbsp;·&nbsp; Joined {mentee.joinDate} &nbsp;·&nbsp;
// //                                 Mentor: <span style={{ color: "#2563eb", fontWeight: 600 }}>{mentee.mentor}</span>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Quick stats */}
// //                     <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
// //                         {[
// //                             { label: "Attendance", value: `${Math.round(attendance.present / attendance.total * 100)}%` },
// //                             { label: "Punctuality", value: `${punctuality.onTime}%` },
// //                             { label: "Tasks Done", value: "60%" },
// //                             { label: "Avg Rating", value: "4.7★" },
// //                         ].map(s => (
// //                             <div key={s.label} style={{ textAlign: "center" }}>
// //                                 <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>{s.value}</div>
// //                                 <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginTop: 1 }}>{s.label}</div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* ── PERFORMANCE SCORE + HISTORY ── */}
// //                 <SectionLabel>Performance Score</SectionLabel>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", marginBottom: 0 }}>
// //                     <DonutChart segs={scoreSegs} size={140} thick={22} label={mentee.score} sub="/ 100" />
// //                     <div style={{ flex: 1, minWidth: 200 }}>
// //                         <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
// //                             <span style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}>{mentee.score}</span>
// //                             <span style={{ fontSize: 14, color: "#94a3b8" }}>/100</span>
// //                             <Tag>{mentee.level}</Tag>
// //                             <Tag bg="#dcfce7" color="#16a34a">✓ Talent Pool Eligible</Tag>
// //                         </div>
// //                         <div style={{ fontSize: 13, color: "#22c55e", fontWeight: 600, marginBottom: 14 }}>↑ +15 pts over 6 months</div>
// //                         <Sparkline data={scoreHistory} />
// //                         <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3, width: 180 }}>
// //                             {scoreHistory.map(d => <span key={d.month} style={{ fontSize: 9, color: "#cbd5e1" }}>{d.month}</span>)}
// //                         </div>
// //                     </div>

// //                     {/* Engine weights */}
// //                     <div style={{ borderLeft: "1px solid #f1f5f9", paddingLeft: 40 }}>
// //                         <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 14 }}>ENGINE INPUTS</div>
// //                         {[
// //                             { label: "Attendance", pct: Math.round(attendance.present / attendance.total * 100), weight: "30%", c: "#3b82f6" },
// //                             { label: "Punctuality", pct: punctuality.onTime, weight: "25%", c: "#22c55e" },
// //                             { label: "Tasks", pct: 60, weight: "25%", c: "#a78bfa" },
// //                             { label: "Ratings", pct: Math.round(ratings.avg / 5 * 100), weight: "20%", c: "#f59e0b" },
// //                         ].map(m => (
// //                             <div key={m.label} style={{ marginBottom: 10 }}>
// //                                 <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //                                     <span style={{ fontSize: 12, color: "#64748b" }}>{m.label} <span style={{ color: "#cbd5e1", fontSize: 10 }}>({m.weight})</span></span>
// //                                     <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{m.pct}%</span>
// //                                 </div>
// //                                 <div style={{ height: 5, background: "#f1f5f9", borderRadius: 99, width: 160, overflow: "hidden" }}>
// //                                     <div style={{ height: "100%", width: `${m.pct}%`, background: m.c, borderRadius: 99 }} />
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <Divider />

// //                 {/* ── ATTENDANCE + PUNCTUALITY ── */}
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56 }}>

// //                     <div>
// //                         <SectionLabel>Attendance</SectionLabel>
// //                         <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
// //                             <DonutChart segs={attendSegs} size={130} thick={20} label={attendance.total} sub="Days" />
// //                             <div style={{ flex: 1 }}>
// //                                 {[
// //                                     { label: "Present", v: attendance.present, pct: Math.round(attendance.present / attendance.total * 100), c: "#3b82f6" },
// //                                     { label: "Late", v: attendance.late, pct: Math.round(attendance.late / attendance.total * 100), c: "#f59e0b" },
// //                                     { label: "Permission", v: attendance.permission, pct: Math.round(attendance.permission / attendance.total * 100), c: "#a78bfa" },
// //                                     { label: "Absent", v: attendance.absent, pct: Math.round(attendance.absent / attendance.total * 100), c: "#f87171" },
// //                                 ].map(row => (
// //                                     <div key={row.label} style={{ marginBottom: 9 }}>
// //                                         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
// //                                             <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //                                                 <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.c, flexShrink: 0, display: "inline-block" }} />
// //                                                 <span style={{ fontSize: 12, color: "#64748b" }}>{row.label}</span>
// //                                             </div>
// //                                             <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{row.v} <span style={{ color: "#94a3b8", fontWeight: 400 }}>({row.pct}%)</span></span>
// //                                         </div>
// //                                         <div style={{ height: 4, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
// //                                             <div style={{ height: "100%", width: `${row.pct}%`, background: row.c, borderRadius: 99 }} />
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <SectionLabel>Punctuality</SectionLabel>
// //                         <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
// //                             <DonutChart segs={punctSegs} size={130} thick={20} label={`${punctuality.onTime}%`} sub="On-Time" />
// //                             <div style={{ flex: 1 }}>
// //                                 {[
// //                                     { label: "On Time", v: `${punctuality.onTime}%`, c: "#22c55e" },
// //                                     { label: "Late", v: `${punctuality.late}%`, c: "#f87171" },
// //                                 ].map(row => (
// //                                     <div key={row.label} style={{ marginBottom: 12 }}>
// //                                         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
// //                                             <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //                                                 <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.c, flexShrink: 0, display: "inline-block" }} />
// //                                                 <span style={{ fontSize: 12, color: "#64748b" }}>{row.label}</span>
// //                                             </div>
// //                                             <span style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{row.v}</span>
// //                                         </div>
// //                                         <div style={{ height: 4, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
// //                                             <div style={{ height: "100%", width: row.v, background: row.c, borderRadius: 99 }} />
// //                                         </div>
// //                                     </div>
// //                                 ))}

// //                                 {/* Clock in table */}
// //                                 <div style={{ marginTop: 16 }}>
// //                                     <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10 }}>TODAY — CLOCK IN/OUT</div>
// //                                     {clockIn.map((c, i) => (
// //                                         <div key={i} style={{
// //                                             display: "flex", alignItems: "center", gap: 10,
// //                                             paddingBottom: 8, borderBottom: i < clockIn.length - 1 ? "1px solid #f8fafc" : "none",
// //                                             marginBottom: i < clockIn.length - 1 ? 8 : 0
// //                                         }}>
// //                                             <div style={{
// //                                                 width: 28, height: 28, borderRadius: 7, flexShrink: 0,
// //                                                 background: "linear-gradient(135deg,#2563eb,#60a5fa)",
// //                                                 display: "flex", alignItems: "center", justifyContent: "center",
// //                                                 color: "#fff", fontSize: 9, fontWeight: 800
// //                                             }}>
// //                                                 {c.name.split(" ").map(n => n[0]).join("")}
// //                                             </div>
// //                                             <div style={{ flex: 1, minWidth: 0 }}>
// //                                                 <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
// //                                                 <div style={{ fontSize: 10, color: "#94a3b8" }}>{c.in} → {c.out}</div>
// //                                             </div>
// //                                             <span style={{
// //                                                 fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, flexShrink: 0,
// //                                                 background: c.status === "late" ? "#fef2f2" : "#dcfce7",
// //                                                 color: c.status === "late" ? "#ef4444" : "#16a34a"
// //                                             }}>
// //                                                 {c.status === "late" ? "Late" : "On Time"}
// //                                             </span>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>

// //                 </div>

// //                 <Divider />

// //                 {/* ── TASKS + RATINGS ── */}
// //                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 56 }}>

// //                     <div>
// //                         <SectionLabel>Task Completion</SectionLabel>
// //                         <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
// //                             <DonutChart segs={taskSegs} size={100} thick={16} label="3/5" sub="Done" />
// //                             <div style={{ flex: 1, overflowX: "auto" }}>
// //                                 <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //                                     <thead>
// //                                         <tr>
// //                                             {["Task", "Status", "Due", "Rating"].map(h => (
// //                                                 <th key={h} style={{
// //                                                     textAlign: "left", fontSize: 10, fontWeight: 700,
// //                                                     color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase",
// //                                                     paddingBottom: 8, paddingRight: 10
// //                                                 }}>{h}</th>
// //                                             ))}
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {tasks.map((t, i) => {
// //                                             const sc = t.status === "Completed" ? { bg: "#dcfce7", c: "#16a34a" }
// //                                                 : t.status === "In Progress" ? { bg: "#dbeafe", c: "#2563eb" }
// //                                                     : { bg: "#f1f5f9", c: "#94a3b8" };
// //                                             return (
// //                                                 <tr key={i} style={{ borderTop: "1px solid #f8fafc" }}>
// //                                                     <td style={{ padding: "8px 10px 8px 0", fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{t.name}</td>
// //                                                     <td style={{ padding: "8px 10px 8px 0" }}>
// //                                                         <span style={{
// //                                                             fontSize: 10, fontWeight: 700, padding: "2px 7px",
// //                                                             borderRadius: 99, background: sc.bg, color: sc.c, whiteSpace: "nowrap"
// //                                                         }}>{t.status}</span>
// //                                                     </td>
// //                                                     <td style={{
// //                                                         padding: "8px 10px 8px 0", fontSize: 11, color: "#94a3b8",
// //                                                         fontFamily: "DM Mono,monospace", whiteSpace: "nowrap"
// //                                                     }}>{t.due}</td>
// //                                                     <td style={{ padding: "8px 0" }}>
// //                                                         {t.rating ? <Stars n={t.rating} /> : <span style={{ fontSize: 11, color: "#e2e8f0" }}>—</span>}
// //                                                     </td>
// //                                                 </tr>
// //                                             );
// //                                         })}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div>
// //                         <SectionLabel>Ratings</SectionLabel>
// //                         <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
// //                             <DonutChart segs={ratingSegs} size={100} thick={16} label={ratings.avg} sub="/ 5" />
// //                             <div style={{ flex: 1 }}>
// //                                 <div style={{ marginBottom: 8 }}><Stars n={Math.round(ratings.avg)} /></div>
// //                                 <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
// //                                     Average across <strong style={{ color: "#0f172a" }}>{ratings.count} tasks</strong>
// //                                 </div>
// //                                 <div style={{ fontSize: 12, color: "#94a3b8" }}>2 tasks pending rating</div>
// //                                 <div style={{ marginTop: 16 }}>
// //                                     {[
// //                                         { label: "5 stars", count: 2, c: "#f59e0b" },
// //                                         { label: "4 stars", count: 1, c: "#fbbf24" },
// //                                         { label: "3 stars", count: 0, c: "#fde68a" },
// //                                     ].map(r => (
// //                                         <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
// //                                             <span style={{ fontSize: 11, color: "#94a3b8", width: 46 }}>{r.label}</span>
// //                                             <div style={{ flex: 1, height: 5, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
// //                                                 <div style={{ height: "100%", width: `${(r.count / ratings.count) * 100}%`, background: r.c, borderRadius: 99 }} />
// //                                             </div>
// //                                             <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a", width: 12 }}>{r.count}</span>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>

// //                 </div>

// //                 <Divider />

// //                 {/* ── ELIGIBILITY + TALENT POOL ── */}
// //                 <SectionLabel>Talent Pool & Hiring</SectionLabel>
// //                 <div style={{ display: "flex", alignItems: "flex-start", gap: 56, flexWrap: "wrap" }}>

// //                     {/* eligibility */}
// //                     <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
// //                         <DonutChart
// //                             segs={[{ v: mentee.score, c: "#22c55e" }, { v: 100 - mentee.score, c: "#f0fdf4" }]}
// //                             size={110} thick={18} label="✓" sub="Eligible" />
// //                         <div>
// //                             <div style={{ fontSize: 13, color: "#64748b", marginBottom: 10, lineHeight: 1.8 }}>
// //                                 Score <strong style={{ color: "#0f172a" }}>{mentee.score}</strong> exceeds threshold of{" "}
// //                                 <strong style={{ color: "#0f172a" }}>{talent.threshold}</strong>
// //                             </div>
// //                             <Tag bg="#dcfce7" color="#16a34a">✓ Eligible for Talent Pool</Tag>
// //                             <div style={{ marginTop: 10 }}>
// //                                 <Tag>Added · {talent.poolDate}</Tag>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* stats */}
// //                     <div style={{ display: "flex", gap: 40 }}>
// //                         {[
// //                             { label: "Company Matches", v: talent.matches, c: "#3b82f6" },
// //                             { label: "Referrals Sent", v: talent.referrals, c: "#a78bfa" },
// //                             { label: "Hiring Outcomes", v: 1, c: "#22c55e" },
// //                         ].map(s => (
// //                             <div key={s.label}>
// //                                 <div style={{ fontSize: 28, fontWeight: 800, color: s.c, letterSpacing: "-1px" }}>{s.v}</div>
// //                                 <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{s.label}</div>
// //                             </div>
// //                         ))}
// //                     </div>

// //                     {/* outcome + pipeline */}
// //                     <div style={{ flex: 1, minWidth: 240 }}>
// //                         <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
// //                             Latest outcome:{" "}
// //                             <strong style={{ color: "#0f172a" }}>{talent.outcome}</strong>
// //                             <span style={{
// //                                 marginLeft: 8, fontSize: 11, background: "#dcfce7", color: "#16a34a",
// //                                 padding: "2px 9px", borderRadius: 99, fontWeight: 700
// //                             }}>Active</span>
// //                         </div>
// //                         {[
// //                             { l: "Top Performer Identified", done: true },
// //                             { l: "Added to Talent Pool", done: true },
// //                             { l: `Matched to ${talent.matches} Companies`, done: true },
// //                             { l: "Referred to Company", done: true },
// //                             { l: "Track Hiring Outcomes", done: false },
// //                         ].map((s, i) => (
// //                             <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
// //                                 <div style={{
// //                                     width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
// //                                     background: s.done ? "#2563eb" : "#f1f5f9",
// //                                     display: "flex", alignItems: "center", justifyContent: "center",
// //                                     fontSize: 8, fontWeight: 900, color: s.done ? "#fff" : "#94a3b8"
// //                                 }}>
// //                                     {s.done ? "✓" : "·"}
// //                                 </div>
// //                                 <span style={{
// //                                     fontSize: 12, color: s.done ? "#0f172a" : "#94a3b8",
// //                                     fontWeight: s.done ? 500 : 400
// //                                 }}>{s.l}</span>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 <div style={{ marginTop: 56, textAlign: "center", fontSize: 11, color: "#e2e8f0" }}>
// //                     Mentee Performance Tracker · Powered by Performance Engine
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// import { useState } from "react";

// /* ─── DATA ─────────────────────────────────────────────────── */
// const mentee = { name: "Adrian Villalobos", role: "Full Stack Developer", avatar: "AV", level: "Rising Star", score: 87, department: "Engineering", joinDate: "Jan 2024", mentor: "Brian Villalobos" };
// const attendance = { total: 120, present: 65, late: 21, permission: 2, absent: 11 };
// const punctuality = { onTime: 89, late: 11 };
// const tasks = [
//     { name: "UI Redesign", status: "Completed", due: "Mar 10", rating: 5 },
//     { name: "API Integration", status: "Completed", due: "Mar 15", rating: 4 },
//     { name: "Bug Fixes Sprint", status: "In Progress", due: "Mar 28", rating: null },
//     { name: "Documentation", status: "Pending", due: "Apr 02", rating: null },
//     { name: "Code Review", status: "Completed", due: "Mar 20", rating: 5 },
// ];
// const scoreHistory = [
//     { month: "Oct", score: 72 }, { month: "Nov", score: 75 }, { month: "Dec", score: 78 },
//     { month: "Jan", score: 80 }, { month: "Feb", score: 84 }, { month: "Mar", score: 87 },
// ];
// const talent = { threshold: 75, poolDate: "Mar 2024", matches: 3, referrals: 1, outcome: "Interview Scheduled" };
// const clockIn = [
//     { name: "Daniel Estella", role: "iOS Developer", in: "08:30", out: "05:00", status: "on-time" },
//     { name: "Douglas Martin", role: "Project Manager", in: "09:10", out: "06:15", status: "late" },
//     { name: "Brian Villalobos", role: "Full Stack Dev", in: "08:45", out: "05:30", status: "on-time" },
//     { name: "Sara Kim", role: "QA Engineer", in: "08:55", out: "05:45", status: "on-time" },
// ];
// const todos = [
//     { task: "Add Holidays", done: true },
//     { task: "Add Meeting to Client", done: false },
//     { task: "Chat with Adrian", done: false },
//     { task: "Management Call", done: true },
//     { task: "Add Payroll", done: false },
//     { task: "Add Policy for Increment", done: false },
// ];
// const messages = [
//     { name: "Sarah Miller", msg: "Reviewed your last PR, great work!", time: "2m", avatar: "SM", c: "#6366f1" },
//     { name: "Tom Clarke", msg: "Can we reschedule tomorrow's sync?", time: "14m", avatar: "TC", c: "#f59e0b" },
//     { name: "Priya Nair", msg: "Documentation draft looks solid.", time: "1h", avatar: "PN", c: "#22c55e" },
//     { name: "James Ford", msg: "Sprint retro notes are shared.", time: "3h", avatar: "JF", c: "#3b82f6" },
// ];
// const barData = [42, 67, 53, 78, 62, 87, 74, 91, 58, 83, 69, 95];
// const barLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// /* ─── SMALL COMPONENTS ──────────────────────────────────────── */
// const css = {
//     card: { background: "#fff", borderRadius: 10, padding: "16px 18px", border: "1px solid #eef2f7" },
// };

// function Tag({ children, bg = "#eff6ff", color = "#2563eb", size = 10 }) {
//     return <span style={{ fontSize: size, fontWeight: 700, background: bg, color, padding: "2px 9px", borderRadius: 99 }}>{children}</span>;
// }

// function Avatar({ initials, color = "#2563eb", size = 30 }) {
//     return (
//         <div style={{
//             width: size, height: size, borderRadius: size / 3, flexShrink: 0,
//             background: `linear-gradient(135deg,${color},${color}aa)`,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             color: "#fff", fontSize: size * 0.3, fontWeight: 800
//         }}>
//             {initials}
//         </div>
//     );
// }

// function Stars({ n }) {
//     return <span style={{ fontSize: 11, letterSpacing: 1 }}>
//         {[1, 2, 3, 4, 5].map(i => <span key={i} style={{ color: i <= n ? "#f59e0b" : "#e2e8f0" }}>★</span>)}
//     </span>;
// }

// function DonutChart({ segs, size = 100, thick = 16, label, sub }) {
//     const r = (size - thick) / 2, circ = 2 * Math.PI * r;
//     const total = segs.reduce((a, s) => a + s.v, 0);
//     let cum = 0;
//     return (
//         <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
//             <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//                 <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f0f4f8" strokeWidth={thick} />
//                 {segs.map((s, i) => {
//                     const dash = (s.v / total) * circ, off = -(cum / total) * circ; cum += s.v;
//                     return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
//                         stroke={s.c} strokeWidth={thick}
//                         strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={off} strokeLinecap="butt" />;
//                 })}
//             </svg>
//             <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//                 {label && <span style={{ fontSize: size < 80 ? 13 : 17, fontWeight: 800, color: "#0f172a" }}>{label}</span>}
//                 {sub && <span style={{ fontSize: 9, color: "#94a3b8" }}>{sub}</span>}
//             </div>
//         </div>
//     );
// }

// function GaugeChart({ value = 87, size = 140 }) {
//     const r = 52, cx = size / 2, cy = size * 0.62;
//     const startAngle = -210, endAngle = 30;
//     const range = endAngle - startAngle;
//     const angle = startAngle + (value / 100) * range;
//     const toRad = a => a * Math.PI / 180;
//     const arc = (a1, a2, r2) => {
//         const x1 = cx + r2 * Math.cos(toRad(a1)), y1 = cy + r2 * Math.sin(toRad(a1));
//         const x2 = cx + r2 * Math.cos(toRad(a2)), y2 = cy + r2 * Math.sin(toRad(a2));
//         const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
//         return `M ${x1} ${y1} A ${r2} ${r2} 0 ${large} 1 ${x2} ${y2}`;
//     };
//     const nx = cx + r * 0.72 * Math.cos(toRad(angle)), ny = cy + r * 0.72 * Math.sin(toRad(angle));
//     const zones = [
//         { from: -210, to: -110, c: "#f87171" },
//         { from: -110, to: -10, c: "#f59e0b" },
//         { from: -10, to: 30, c: "#22c55e" },
//     ];
//     return (
//         <svg width={size} height={size * 0.72} viewBox={`0 0 ${size} ${size * 0.72}`}>
//             <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="#f0f4f8" strokeWidth={18} />
//             {zones.map((z, i) => (
//                 <path key={i} d={arc(z.from, z.to, r + 10)} fill="none" stroke={z.c} strokeWidth={16}
//                     strokeLinecap="round" style={{ opacity: 0.9 }} />
//             ))}
//             <circle cx={cx} cy={cy} r={6} fill="#1e293b" />
//             <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1e293b" strokeWidth={2.5} strokeLinecap="round" />
//             <text x={cx} y={cy + 26} textAnchor="middle" fontSize="18" fontWeight="800" fill="#0f172a">{value}</text>
//             <text x={cx} y={cy + 38} textAnchor="middle" fontSize="9" fill="#94a3b8">/100</text>
//         </svg>
//     );
// }

// function Sparkline({ data, w = 80, h = 28, color = "#3b82f6" }) {
//     const vals = data.map(d => d.score);
//     const max = Math.max(...vals), min = Math.min(...vals) - 2;
//     const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / (max - min + 1)) * h}`).join(" ");
//     return (
//         <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
//             <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//     );
// }

// function BarChart({ data, labels, color = "#3b82f6", h = 80 }) {
//     const max = Math.max(...data);
//     return (
//         <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: h }}>
//             {data.map((v, i) => (
//                 <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
//                     <div style={{
//                         width: "100%", background: `${color}22`, borderRadius: "3px 3px 0 0",
//                         height: Math.round((v / max) * h * 0.85),
//                         position: "relative", overflow: "hidden"
//                     }}>
//                         <div style={{
//                             position: "absolute", bottom: 0, left: 0, right: 0,
//                             height: `${(v / max) * 100}%`, background: color, borderRadius: "3px 3px 0 0",
//                             opacity: 0.85
//                         }} />
//                     </div>
//                     <span style={{ fontSize: 8, color: "#94a3b8" }}>{labels[i]}</span>
//                 </div>
//             ))}
//         </div>
//     );
// }

// /* ─── MAIN ──────────────────────────────────────────────────── */
// export default function Dashboard() {
//     const [nav, setNav] = useState("dashboard");

//     const attendSegs = [
//         { v: attendance.present, c: "#3b82f6" }, { v: attendance.late, c: "#f59e0b" },
//         { v: attendance.permission, c: "#a78bfa" }, { v: attendance.absent, c: "#f87171" },
//     ];
//     const taskSegs = [{ v: 3, c: "#22c55e" }, { v: 1, c: "#3b82f6" }, { v: 1, c: "#e2e8f0" }];
//     const scoreSegs = [{ v: mentee.score, c: "#3b82f6" }, { v: 100 - mentee.score, c: "#e2e8f0" }];

//     const statCards = [
//         { label: "Total Employees", value: "1,284", sub: "↑ 3.2% this month", c: "#3b82f6", icon: "👥" },
//         { label: "Present Today", value: "1,102", sub: "↑ 1.4% vs yesterday", c: "#22c55e", icon: "✅" },
//         { label: "On Leave", value: "48", sub: "↓ 5 less than last week", c: "#f59e0b", icon: "🏖" },
//         { label: "New Hires", value: "12", sub: "This month", c: "#a78bfa", icon: "🎉" },
//         { label: "Performance Avg", value: "87/100", sub: "↑ +4 pts", c: "#3b82f6", icon: "📊" },
//         { label: "Tasks Completed", value: "82%", sub: "3 of 5 this sprint", c: "#22c55e", icon: "📋" },
//         { label: "Talent Pool", value: "3", sub: "Active matches", c: "#f59e0b", icon: "🏆" },
//         { label: "Avg Rating", value: "4.7★", sub: "Across 3 tasks", c: "#a78bfa", icon: "⭐" },
//     ];

//     const sidebarItems = ["Dashboard", "Employees", "Attendance", "Tasks", "Talent Pool", "Reports", "Settings"];

//     return (
//         <div style={{ display: "flex", fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#f4f6fb", minHeight: "100vh", fontSize: 13 }}>
//             <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

//             {/* ── MAIN ── */}
//             <div style={{ flex: 1, overflow: "auto" }}>

//                 <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>


//                     {/* ── ROW 2: Employee Stats | Attendance Overview | Source Chart | Team ── */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 1fr 1.2fr", gap: 12 }}>

//                         {/* Employee Stats */}
//                         <div style={{ ...css.card }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Employee Stats</div>
//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                                 {[
//                                     { l: "Total", v: "1,284", c: "#3b82f6" },
//                                     { l: "Active", v: "1,102", c: "#22c55e" },
//                                     { l: "On Leave", v: "48", c: "#f59e0b" },
//                                     { l: "Resigned", v: "12", c: "#f87171" },
//                                 ].map(s => (
//                                     <div key={s.l} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
//                                         <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
//                                         <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>{s.l}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Attendance Overview */}
//                         <div style={{ ...css.card }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Attendance Overview</div>
//                             <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//                                 <DonutChart segs={attendSegs} size={100} thick={16} label={attendance.total} sub="Total" />
//                                 <div style={{ flex: 1 }}>
//                                     {[
//                                         { l: "Present", v: attendance.present, c: "#3b82f6" },
//                                         { l: "Late", v: attendance.late, c: "#f59e0b" },
//                                         { l: "Permission", v: attendance.permission, c: "#a78bfa" },
//                                         { l: "Absent", v: attendance.absent, c: "#f87171" },
//                                     ].map(r => (
//                                         <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
//                                             <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.c, flexShrink: 0, display: "inline-block" }} />
//                                             <span style={{ fontSize: 11, color: "#64748b", flex: 1 }}>{r.l}</span>
//                                             <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{r.v}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Source / Eligibility */}
//                         <div style={{ ...css.card }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 12, textTransform: "uppercase" }}>Eligibility Check</div>
//                             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                                 <DonutChart
//                                     segs={[{ v: mentee.score, c: "#22c55e" }, { v: 100 - mentee.score, c: "#f0fdf4" }]}
//                                     size={90} thick={14} label="✓" sub="Eligible" />
//                                 <div style={{ marginTop: 8, textAlign: "center" }}>
//                                     <div style={{ fontSize: 11, color: "#64748b" }}>Score <strong style={{ color: "#0f172a" }}>{mentee.score}</strong> vs threshold <strong style={{ color: "#0f172a" }}>{talent.threshold}</strong></div>
//                                     <Tag bg="#dcfce7" color="#16a34a" size={10}>✓ Talent Pool</Tag>
//                                 </div>
//                             </div>
//                         </div>


//                         {/* Punctuality donut */}
//                         <div style={{ ...css.card, display: "flex", flexDirection: "column", alignItems: "center" }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase", width: "100%" }}>Punctuality</div>
//                             <DonutChart
//                                 segs={[{ v: punctuality.onTime, c: "#22c55e" }, { v: punctuality.late, c: "#f87171" }]}
//                                 size={100} thick={16} label={`${punctuality.onTime}%`} sub="On-Time" />
//                             <div style={{ marginTop: 10, width: "100%" }}>
//                                 {[
//                                     { l: "On Time", v: `${punctuality.onTime}%`, c: "#22c55e" },
//                                     { l: "Late", v: `${punctuality.late}%`, c: "#f87171" },
//                                 ].map(r => (
//                                     <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
//                                         <span style={{ width: 7, height: 7, borderRadius: "50%", background: r.c, flexShrink: 0, display: "inline-block" }} />
//                                         <span style={{ fontSize: 11, color: "#64748b", flex: 1 }}>{r.l}</span>
//                                         <span style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{r.v}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* ── ROW 3: Mentee Profile | Clock In | Tasks | Messages ── */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr 1.5fr 1fr", gap: 12 }}>

//                         {/* Mentee profile + score */}
//                         <div style={{ ...css.card, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 }}>
//                             <Avatar initials="AV" color="#2563eb" size={48} />
//                             <div>
//                                 <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a" }}>{mentee.name}</div>
//                                 <div style={{ fontSize: 10, color: "#94a3b8" }}>{mentee.role}</div>
//                             </div>
//                             <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
//                                 <Tag>{mentee.level}</Tag>
//                                 <Tag bg="#f1f5f9" color="#64748b">{mentee.department}</Tag>
//                             </div>
//                             <div style={{ fontSize: 10, color: "#94a3b8" }}>Mentor: <span style={{ color: "#2563eb", fontWeight: 600 }}>{mentee.mentor}</span></div>
//                             <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
//                                 {[{ l: "Score", v: `${mentee.score}/100` }, { l: "Joined", v: mentee.joinDate }].map(f => (
//                                     <div key={f.l}>
//                                         <div style={{ fontSize: 12, fontWeight: 800, color: "#0f172a" }}>{f.v}</div>
//                                         <div style={{ fontSize: 9, color: "#94a3b8" }}>{f.l}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>



//                     </div>

//                     {/* ── ROW 4: Performance Gauge | Bar Chart | Talent Pool ── */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1.2fr", gap: 12 }}>

//                         {/* Gauge */}
//                         <div style={{ ...css.card, display: "flex", flexDirection: "column", alignItems: "center" }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 6, textTransform: "uppercase", width: "100%" }}>Performance Score</div>
//                             <GaugeChart value={mentee.score} size={160} />
//                             <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
//                                 {[{ l: "Low", c: "#f87171" }, { l: "Mid", c: "#f59e0b" }, { l: "High", c: "#22c55e" }].map(z => (
//                                     <div key={z.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                                         <span style={{ width: 7, height: 7, borderRadius: "50%", background: z.c, display: "inline-block" }} />
//                                         <span style={{ fontSize: 9, color: "#94a3b8" }}>{z.l}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div style={{ marginTop: 10, textAlign: "center" }}>
//                                 <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e" }}>↑ +15 pts — Rising Star</div>
//                                 <div style={{ fontSize: 9, color: "#94a3b8" }}>Trend over 6 months</div>
//                             </div>
//                         </div>

//                         {/* Monthly Bar Chart */}
//                         <div style={{ ...css.card }}>
//                             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
//                                 <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, textTransform: "uppercase" }}>Monthly Score Trend</span>
//                                 <div style={{ display: "flex", gap: 8 }}>
//                                     {[{ l: "Score", c: "#3b82f6" }, { l: "Target", c: "#22c55e" }].map(k => (
//                                         <div key={k.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
//                                             <span style={{ width: 8, height: 8, borderRadius: 2, background: k.c, display: "inline-block" }} />
//                                             <span style={{ fontSize: 9, color: "#94a3b8" }}>{k.l}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <BarChart data={barData} labels={barLabels} color="#3b82f6" h={90} />
//                         </div>

//                         {/* Talent Pool */}
//                         <div style={{ ...css.card }}>
//                             <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.8, marginBottom: 10, textTransform: "uppercase" }}>Talent Pool</div>
//                             <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
//                                 {[
//                                     { l: "Matches", v: talent.matches, c: "#3b82f6" },
//                                     { l: "Referrals", v: talent.referrals, c: "#a78bfa" },
//                                     { l: "Outcomes", v: 1, c: "#22c55e" },
//                                 ].map(s => (
//                                     <div key={s.l}>
//                                         <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
//                                         <div style={{ fontSize: 9, color: "#94a3b8" }}>{s.l}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div style={{ fontSize: 10, color: "#64748b", marginBottom: 10 }}>
//                                 Latest: <strong style={{ color: "#0f172a" }}>{talent.outcome}</strong>{" "}
//                                 <Tag bg="#dcfce7" color="#16a34a" size={9}>Active</Tag>
//                             </div>
//                             {[
//                                 { l: "Top Performer Identified", done: true },
//                                 { l: "Added to Talent Pool", done: true },
//                                 { l: `Matched (${talent.matches})`, done: true },
//                                 { l: "Referred", done: true },
//                                 { l: "Track Outcomes", done: false },
//                             ].map((s, i) => (
//                                 <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
//                                     <div style={{
//                                         width: 13, height: 13, borderRadius: "50%", flexShrink: 0,
//                                         background: s.done ? "#2563eb" : "#f1f5f9",
//                                         display: "flex", alignItems: "center", justifyContent: "center",
//                                         fontSize: 7, fontWeight: 900, color: s.done ? "#fff" : "#94a3b8"
//                                     }}>
//                                         {s.done ? "✓" : "·"}
//                                     </div>
//                                     <span style={{ fontSize: 10, color: s.done ? "#0f172a" : "#94a3b8", fontWeight: s.done ? 500 : 400 }}>{s.l}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     );
// }
// Dashboard.jsx
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