import React, { useState } from "react";
import { useGetMenteeMyPaymentsQuery } from "./menteepaymentsapislice";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getMenteeId = () => JSON.parse(localStorage.getItem("userData") || "{}")?._id;

const fmtCurrency = (amt, cur = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amt);

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const fmtDateTime = (d) => d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const STATUS = {
  Approved: { bg: "#dcfce7", text: "#16a34a", dot: "#22c55e" },
  Pending:  { bg: "#fef9c3", text: "#ca8a04", dot: "#eab308" },
  Rejected: { bg: "#fee2e2", text: "#dc2626", dot: "#ef4444" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Badge = ({ status }) => {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
};

const Modal = ({ url, onClose }) => !url ? null : (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", maxWidth: 480, width: "100%", boxShadow: "0 25px 60px rgba(37,99,235,0.18)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontWeight: 700, color: "#1e3a8a", fontSize: 14 }}>Payment Screenshot</span>
        <button onClick={onClose} style={{ background: "#eff6ff", border: "none", borderRadius: 8, width: 30, height: 30, cursor: "pointer", color: "#2563eb", fontSize: 18, fontWeight: 700 }}>×</button>
      </div>
      <img src={url} alt="Receipt" style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain", background: "#f8fafc" }} />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const MenteePayments = () => {
  const menteeId = getMenteeId();
  const { data: payments = [], isLoading, isError, error, refetch } = useGetMenteeMyPaymentsQuery(menteeId, { skip: !menteeId });
  const [modalUrl, setModalUrl] = useState(null);

  const totalApproved = payments.filter(p => p.paymentStatus === "Approved").reduce((s, p) => s + (p.paymentAmount || 0), 0);

  const th = { padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.07em", background: "#eff6ff", borderBottom: "2px solid #bfdbfe", whiteSpace: "nowrap" };
  const td = { padding: "13px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 13, color: "#334155", verticalAlign: "middle" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .pm-tbl { display:block } .pm-cards { display:none }
        @media(max-width:768px){ .pm-tbl{display:none!important} .pm-cards{display:grid!important} }

      `}</style>

      <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'DM Sans',sans-serif", padding: "28px 20px 48px" }}>

        {/* Header */}
        <div style={{ maxWidth: 1100, margin: "0 auto 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(20px,4vw,26px)", fontWeight: 800, color: "#1e3a8a", fontFamily: "'Sora',sans-serif", letterSpacing: "-0.02em" }}>My Payments</h1>
            <p style={{ margin: "5px 0 0", color: "#64748b", fontSize: 13 }}>Track all your session payment records</p>
          </div>
          {!isLoading && payments.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Total Paid", val: fmtCurrency(totalApproved), bg: "#eff6ff", border: "#bfdbfe", lc: "#2563eb", vc: "#1e3a8a" },
                { label: "Transactions", val: payments.length, bg: "#f0fdf4", border: "#bbf7d0", lc: "#16a34a", vc: "#15803d" },
              ].map(({ label, val, bg, border, lc, vc }) => (
                <div key={label} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 12, padding: "9px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: lc, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: vc, fontFamily: "'Sora',sans-serif", marginTop: 2 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Loading skeletons */}
          {isLoading && (
            <>
              <div className="pm-tbl" style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #bfdbfe", overflow: "hidden" }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ padding: "14px 16px", borderBottom: "1px solid #e2e8f0", display: "flex", gap: 14 }}>
                    {[100,80,100,70,60].map((w,j) => <div key={j} style={{ height: 13, borderRadius: 6, background: "#e2e8f0", width: w, animation: "pulse 1.5s ease-in-out infinite" }} />)}
                  </div>
                ))}
              </div>
              <div className="pm-cards" style={{ gridTemplateColumns: "1fr", gap: 14 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #e2e8f0", overflow: "hidden" }}>
                    <div style={{ background: "#eff6ff", height: 68 }} />
                    <div style={{ padding: 16 }}>
                      {[1,2,3].map(j => <div key={j} style={{ height: 13, background: "#e2e8f0", borderRadius: 6, marginBottom: 11, width: j===3?"60%":"100%", animation: "pulse 1.5s ease-in-out infinite" }} />)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Error */}
          {isError && (
            <div style={{ textAlign: "center", padding: "56px 20px", background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 14 }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>⚠️</div>
              <p style={{ color: "#dc2626", fontWeight: 700, margin: "0 0 4px" }}>Failed to load payments</p>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 18px" }}>{error?.message || "Something went wrong."}</p>
              <button onClick={refetch} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 9, padding: "9px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Try Again</button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && payments.length === 0 && (
            <div style={{ textAlign: "center", padding: "72px 20px", background: "#f8faff", border: "1.5px dashed #bfdbfe", borderRadius: 18 }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>💳</div>
              <p style={{ fontWeight: 800, fontSize: 17, color: "#1e3a8a", margin: "0 0 6px", fontFamily: "'Sora',sans-serif" }}>No payments yet</p>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Your completed payment records will appear here.</p>
            </div>
          )}

          {/* Desktop Table */}
          {!isLoading && !isError && payments.length > 0 && (
            <div className="pm-tbl" style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #bfdbfe", overflow: "hidden", boxShadow: "0 4px 20px rgba(37,99,235,.07)", animation: "fadeUp .4s ease" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
                  <thead>
                    <tr>{["Mentor","Transaction ID","Date","Amount","Status","Created On","Receipt"].map(h => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {payments.map((p, i) => (
                      <tr key={p._id} style={{ background: i % 2 === 0 ? "#fff" : "#f8faff" }}>
                        <td style={td}><span style={{ fontWeight: 700, color: "#1e3a8a", fontFamily: "'Sora',sans-serif" }}>{p.mentorName || "—"}</span></td>
                        <td style={td}><span style={{ background: "#eff6ff", color: "#2563eb", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, fontFamily: "monospace" }}>{p.transactionId || "—"}</span></td>
                        <td style={td}>{fmtDate(p.transactionDate)}</td>
                        <td style={td}><span style={{ fontWeight: 700, color: "#2563eb", fontFamily: "'Sora',sans-serif" }}>{fmtCurrency(p.paymentAmount, p.currency)}</span></td>
                        <td style={td}><Badge status={p.paymentStatus} /></td>
                        <td style={td}><span style={{ color: "#94a3b8", fontSize: 12 }}>{fmtDateTime(p.createdOn)}</span></td>
                        <td style={td}>
                          {p.screenshotUrl
                            ? <button onClick={() => setModalUrl(p.screenshotUrl)} style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", border: "none", borderRadius: 7, padding: "5px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(37,99,235,.25)" }}>View</button>
                            : <span style={{ color: "#cbd5e1", fontSize: 12 }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mobile Cards */}
          {!isLoading && !isError && payments.length > 0 && (
            <div className="pm-cards" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14, animation: "fadeUp .4s ease" }}>
              {payments.map(p => (
                <div key={p._id} style={{ background: "#fff", borderRadius: 14, border: "1.5px solid #bfdbfe", overflow: "hidden", boxShadow: "0 4px 18px rgba(37,99,235,.08)" }}>
                  <div style={{ background: "linear-gradient(135deg,#2563eb,#1d4ed8)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "rgba(255,255,255,.65)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Mentor</div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Sora',sans-serif", marginTop: 2 }}>{p.mentorName || "—"}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "rgba(255,255,255,.65)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Amount</div>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: 19, fontFamily: "'Sora',sans-serif", marginTop: 2 }}>{fmtCurrency(p.paymentAmount, p.currency)}</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                      {[
                        ["Transaction ID", <span style={{ fontFamily: "monospace", color: "#2563eb", fontWeight: 600, fontSize: 11, background: "#eff6ff", padding: "2px 7px", borderRadius: 4 }}>{p.transactionId || "—"}</span>],
                        ["Status", <Badge status={p.paymentStatus} />],
                        ["Txn Date", fmtDate(p.transactionDate)],
                        ["Created On", fmtDate(p.createdOn)],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 12, color: "#334155" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    {p.remarks && (
                      <div style={{ background: "#f8faff", borderRadius: 7, padding: "9px 11px", marginBottom: 12 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Remarks</div>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: "#475569" }}>{p.remarks}</p>
                      </div>
                    )}
                    {p.screenshotUrl && (
                      <button onClick={() => setModalUrl(p.screenshotUrl)} style={{ width: "100%", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", color: "#fff", border: "none", borderRadius: 9, padding: 10, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 3px 10px rgba(37,99,235,.28)" }}>
                        View Payment Screenshot
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal url={modalUrl} onClose={() => setModalUrl(null)} />
    </>
  );
};

export default MenteePayments;