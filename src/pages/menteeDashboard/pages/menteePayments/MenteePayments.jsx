import React, { useState } from "react";
import { useGetMenteeMyPaymentsQuery } from "./menteepaymentsapislice";

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  dark: "#1a1a2e",
  blue: "#0091c3",
  white: "#ffffff",
  border: "#e2e8f0",
  muted: "#94a3b8",
  text: "#1a1a2e",
  sub: "#475569",
  bg: "#ffffff",
  rowHov: "#f8fafc",
};

const FONT = "'DM Sans', 'Segoe UI', sans-serif";

// ── Global CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp{ from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  .pm-tbl   { display: block; }
  .pm-cards { display: none;  }
  @media(max-width:768px){
    .pm-tbl   { display: none  !important; }
    .pm-cards { display: grid  !important; }
  }
  table tr:last-child td { border-bottom: none; }
`;

// ── Helpers ───────────────────────────────────────────────────────────────────
const getMenteeId = () => JSON.parse(localStorage.getItem("userData") || "{}")?._id;

const fmtCurrency = (amt, cur = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amt);

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const fmtDateTime = (d) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

// ── Status badge (plain text + dot, matching Code 2 pattern) ─────────────────
const Badge = ({ status }) => {
  const map = {
    Approved: { color: "#16a34a", dot: "#16a34a" },
    Pending: { color: "#d97706", dot: "#d97706" },
    Rejected: { color: "#dc2626", dot: "#dc2626" },
  };
  const m = map[status] || map.Pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 12, fontWeight: 600, color: m.color, fontFamily: FONT,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
};

// ── Screenshot Modal ──────────────────────────────────────────────────────────
const Modal = ({ url, onClose }) => !url ? null : (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "fadeIn 0.15s ease",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: C.white, borderRadius: 14,
        overflow: "hidden", maxWidth: 480, width: "100%",
        border: `1px solid ${C.border}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.16)",
        animation: "slideUp 0.2s ease",
      }}
    >
      {/* Modal header */}
      <div style={{
        background: C.dark, padding: "14px 18px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: FONT }}>
          Payment Screenshot
        </span>
        <button
          onClick={onClose}
          style={{
            width: 28, height: 28, borderRadius: 7,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 16, fontWeight: 700, lineHeight: 1,
          }}
        >×</button>
      </div>
      <img
        src={url} alt="Receipt"
        style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain", background: "#f8fafc" }}
      />
    </div>
  </div>
);

// ── Shared table styles ───────────────────────────────────────────────────────
const thStyle = {
  padding: "11px 14px",
  fontSize: 11, fontWeight: 700,
  color: "#ffffff",
  letterSpacing: "0.6px",
  background: "#1a1a2e",
  borderBottom: `1px solid ${C.border}`,
  whiteSpace: "nowrap", textAlign: "left",
};

const tdStyle = {
  padding: "12px 14px",
  borderBottom: `1px solid #f1f5f9`,
  fontSize: 13, color: C.text,
  verticalAlign: "middle",
  background: C.white,
};

// ── Main Component ────────────────────────────────────────────────────────────
const MenteePayments = () => {
  const menteeId = getMenteeId();
  const { data: payments = [], isLoading, isError, error, refetch } =
    useGetMenteeMyPaymentsQuery(menteeId, { skip: !menteeId });
  const [modalUrl, setModalUrl] = useState(null);

  const totalApproved = payments
    .filter((p) => p.paymentStatus === "Approved")
    .reduce((s, p) => s + (p.paymentAmount || 0), 0);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{
        minHeight: "100vh", background: C.bg,
        fontFamily: FONT, padding: "clamp(16px,4vw,28px)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap",
            gap: 12, marginBottom: 20,
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(16px,4vw,20px)", fontWeight: 700, color: C.text, fontFamily: FONT }}>
                My Payments
              </h1>
              <p style={{ margin: "3px 0 0", color: C.muted, fontSize: 13, fontFamily: FONT }}>
                {isLoading ? "Loading…" : `${payments.length} transaction${payments.length !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* Stat chips */}
            {!isLoading && payments.length > 0 && (
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  ["Total Paid", fmtCurrency(totalApproved)],
                  ["Transactions", payments.length],
                ].map(([label, val]) => (
                  <div key={label} style={{
                    background: C.white, border: `1px solid ${C.border}`,
                    borderRadius: 10, padding: "8px 16px", textAlign: "center",
                  }}>
                    <div style={{
                      fontSize: 9, fontWeight: 700, color: C.muted,
                      letterSpacing: "0.08em", fontFamily: FONT,
                    }}>{label}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: C.text, marginTop: 3, fontFamily: FONT }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div style={{
              background: C.white, borderRadius: 10,
              border: `1px solid ${C.border}`, overflow: "hidden",
            }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  padding: "14px 16px", borderBottom: `1px solid #f1f5f9`,
                  display: "flex", gap: 14,
                }}>
                  {[120, 90, 80, 60, 60, 90, 50].map((w, j) => (
                    <div key={j} style={{
                      height: 11, borderRadius: 4, background: "#f1f5f9",
                      width: w, animation: "pulse 1.5s ease-in-out infinite",
                      flexShrink: 0,
                    }} />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div style={{
              textAlign: "center", padding: "48px 20px",
              background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
            }}>
              <p style={{ color: "#dc2626", fontWeight: 700, margin: "0 0 4px", fontFamily: FONT }}>
                Failed to load payments
              </p>
              <p style={{ color: C.muted, fontSize: 13, margin: "0 0 16px", fontFamily: FONT }}>
                {error?.message || "Something went wrong."}
              </p>
              <button
                onClick={refetch}
                style={{
                  background: C.dark, color: C.white,
                  border: "none", borderRadius: 8,
                  padding: "8px 20px", fontWeight: 700,
                  cursor: "pointer", fontSize: 13, fontFamily: FONT,
                }}
              >Try Again</button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && payments.length === 0 && (
            <div style={{
              textAlign: "center", padding: "64px 20px",
              background: C.white, border: `1px dashed ${C.border}`, borderRadius: 10,
            }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: C.text, margin: "0 0 6px", fontFamily: FONT }}>
                No payments yet
              </p>
              <p style={{ color: C.muted, fontSize: 13, margin: 0, fontFamily: FONT }}>
                Your completed payment records will appear here.
              </p>
            </div>
          )}

          {/* ── Desktop Table ── */}
          {!isLoading && !isError && payments.length > 0 && (
            <div className="pm-tbl" style={{
              background: C.white, borderRadius: 10,
              border: `1px solid ${C.border}`, overflow: "hidden",
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                  <thead style={{ background: C.dark }}>
                    <tr>
                      {["Mentee", "Transaction ID", "Date", "Amount", "Status", "Created On", "Receipt"].map((h) => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr
                        key={p._id}
                        onMouseEnter={(e) => { e.currentTarget.style.background = C.rowHov; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = C.white; }}
                        style={{ transition: "background 0.1s" }}
                      >
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 700, color: C.text, fontFamily: FONT }}>
                            {p.mentorName || "—"}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <span style={{
                            background: "#f8fafc", color: C.sub,
                            fontSize: 11, fontWeight: 600,
                            padding: "2px 7px", borderRadius: 4,
                            fontFamily: "monospace",
                            border: `1px solid ${C.border}`,
                          }}>
                            {p.transactionId || "—"}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, color: C.sub }}>
                          {fmtDate(p.transactionDate)}
                        </td>
                        <td style={tdStyle}>
                          <span style={{ fontWeight: 700, color: C.text, fontFamily: FONT }}>
                            {fmtCurrency(p.paymentAmount, p.currency)}
                          </span>
                        </td>
                        <td style={tdStyle}>
                          <Badge status={p.paymentStatus} />
                        </td>
                        <td style={{ ...tdStyle, color: C.muted, fontSize: 12 }}>
                          {fmtDateTime(p.createdOn)}
                        </td>
                        <td style={tdStyle}>
                          {p.screenshotUrl
                            ? <button
                              onClick={() => setModalUrl(p.screenshotUrl)}
                              style={{
                                background: C.dark, color: C.white,
                                border: "none", borderRadius: 6,
                                padding: "5px 14px", fontSize: 12,
                                fontWeight: 700, cursor: "pointer",
                                fontFamily: FONT, transition: "opacity 0.15s",
                              }}
                              onMouseEnter={(e) => { e.target.style.opacity = "0.85"; }}
                              onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
                            >View</button>
                            : <span style={{ color: C.border }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Mobile Cards ── */}
          {!isLoading && !isError && payments.length > 0 && (
            <div
              className="pm-cards"
              style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}
            >
              {payments.map((p) => (
                <div key={p._id} style={{
                  background: C.white, borderRadius: 10,
                  border: `1px solid ${C.border}`, overflow: "hidden",
                  fontFamily: FONT,
                }}>
                  {/* Card top accent */}
                  <div style={{ height: 3, background: C.dark }} />

                  {/* Card header */}
                  <div style={{
                    background: "#fafbfc", padding: "12px 14px",
                    borderBottom: `1px solid ${C.border}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: C.text, fontFamily: FONT }}>
                      {p.mentorName || "—"}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 15, color: C.text, fontFamily: FONT }}>
                      {fmtCurrency(p.paymentAmount, p.currency)}
                    </span>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: 10, marginBottom: 10,
                    }}>
                      {[
                        ["Transaction ID", (
                          <span style={{
                            fontFamily: "monospace", color: C.sub,
                            fontSize: 11, background: "#f8fafc",
                            padding: "2px 6px", borderRadius: 4,
                            border: `1px solid ${C.border}`,
                          }}>
                            {p.transactionId || "—"}
                          </span>
                        )],
                        ["Status", <Badge status={p.paymentStatus} />],
                        ["Txn Date", fmtDate(p.transactionDate)],
                        ["Created On", fmtDate(p.createdOn)],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div style={{
                            fontSize: 9, fontWeight: 700, color: C.muted,
                            letterSpacing: "0.08em",
                            marginBottom: 3, fontFamily: FONT,
                          }}>{label}</div>
                          <div style={{ fontSize: 12, color: C.sub, fontFamily: FONT }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {p.remarks && (
                      <div style={{
                        background: "#f8fafc", borderRadius: 7,
                        padding: "8px 10px", marginBottom: 10,
                        border: `1px solid ${C.border}`,
                      }}>
                        <div style={{
                          fontSize: 9, fontWeight: 700, color: C.muted,
                          letterSpacing: "0.08em",
                          fontFamily: FONT,
                        }}>Remarks</div>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: C.sub, fontFamily: FONT }}>
                          {p.remarks}
                        </p>
                      </div>
                    )}

                    {p.screenshotUrl && (
                      <button
                        onClick={() => setModalUrl(p.screenshotUrl)}
                        style={{
                          width: "100%", background: C.dark, color: C.white,
                          border: "none", borderRadius: 8, padding: 9,
                          fontSize: 12, fontWeight: 700, cursor: "pointer",
                          fontFamily: FONT, transition: "opacity 0.15s",
                        }}
                        onMouseEnter={(e) => { e.target.style.opacity = "0.85"; }}
                        onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
                      >
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