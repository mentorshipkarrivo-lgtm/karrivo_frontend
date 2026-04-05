import React, { useState } from "react";
import { useGetMenteeMyPaymentsQuery } from "./menteepaymentsapislice";

const getMenteeId = () => JSON.parse(localStorage.getItem("userData") || "{}")?._id;

const fmtCurrency = (amt, cur = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amt);

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const fmtDateTime = (d) => d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

const STATUS = {
  Approved: { bg: "#dcfce7", text: "#16a34a", dot: "#22c55e" },
  Pending: { bg: "#fef9c3", text: "#ca8a04", dot: "#eab308" },
  Rejected: { bg: "#fee2e2", text: "#dc2626", dot: "#ef4444" },
};

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
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
    <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", maxWidth: 480, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontWeight: 700, color: "#1e293b", fontSize: 14 }}>Payment Screenshot</span>
        <button onClick={onClose} style={{ background: "#f1f5f9", border: "none", borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: "#64748b", fontSize: 16, fontWeight: 700 }}>×</button>
      </div>
      <img src={url} alt="Receipt" style={{ width: "100%", display: "block", maxHeight: "70vh", objectFit: "contain", background: "#f8fafc" }} />
    </div>
  </div>
);

const FONT = `'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

const MenteePayments = () => {
  const menteeId = getMenteeId();
  const { data: payments = [], isLoading, isError, error, refetch } = useGetMenteeMyPaymentsQuery(menteeId, { skip: !menteeId });
  const [modalUrl, setModalUrl] = useState(null);

  const totalApproved = payments.filter(p => p.paymentStatus === "Approved").reduce((s, p) => s + (p.paymentAmount || 0), 0);

  const th = {
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
    whiteSpace: "nowrap",
    textAlign: "left",
  };

  const td = {
    padding: "11px 14px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 13,
    color: "#334155",
    verticalAlign: "middle",
  };

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .pm-tbl { display:block } .pm-cards { display:none }
        @media(max-width:768px){ .pm-tbl{display:none!important} .pm-cards{display:grid!important} }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: FONT, padding: "28px 20px 48px" }}>

        {/* Header */}
        <div style={{ maxWidth: 1100, margin: "0 auto 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" }}>My Payments</h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>Track all your session payment records</p>
          </div>

          {!isLoading && payments.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Total Paid</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginTop: 2 }}>{fmtCurrency(totalApproved)}</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "8px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.07em" }}>Transactions</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginTop: 2 }}>{payments.length}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Loading */}
          {isLoading && (
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 14 }}>
                  {[120, 90, 100, 70, 60].map((w, j) => (
                    <div key={j} style={{ height: 12, borderRadius: 4, background: "#e2e8f0", width: w, animation: "pulse 1.5s ease-in-out infinite" }} />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div style={{ textAlign: "center", padding: "48px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10 }}>
              <p style={{ color: "#dc2626", fontWeight: 700, margin: "0 0 4px" }}>Failed to load payments</p>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 16px" }}>{error?.message || "Something went wrong."}</p>
              <button onClick={refetch} style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Try Again</button>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && payments.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10 }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 6px" }}>No payments yet</p>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Your completed payment records will appear here.</p>
            </div>
          )}

          {/* Desktop Table */}
          {!isLoading && !isError && payments.length > 0 && (
            <div className="pm-tbl" style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
                  <thead>
                    <tr>
                      {["Mentor", "Transaction ID", "Date", "Amount", "Status", "Created On", "Receipt"].map(h => (
                        <th key={h} style={th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p, i) => (
                      <tr key={p._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                        <td style={td}>
                          <span style={{ fontWeight: 700, color: "#0f172a" }}>{p.mentorName || "—"}</span>
                        </td>
                        <td style={td}>
                          <span style={{ background: "#f1f5f9", color: "#475569", fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, fontFamily: "monospace" }}>
                            {p.transactionId || "—"}
                          </span>
                        </td>
                        <td style={td}>{fmtDate(p.transactionDate)}</td>
                        <td style={td}>
                          <span style={{ fontWeight: 700, color: "#0f172a" }}>{fmtCurrency(p.paymentAmount, p.currency)}</span>
                        </td>
                        <td style={td}><Badge status={p.paymentStatus} /></td>
                        <td style={td}>
                          <span style={{ color: "#94a3b8", fontSize: 12 }}>{fmtDateTime(p.createdOn)}</span>
                        </td>
                        <td style={td}>
                          {p.screenshotUrl
                            ? <button onClick={() => setModalUrl(p.screenshotUrl)} style={{ background: "#0f172a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View</button>
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
            <div className="pm-cards" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 12 }}>
              {payments.map(p => (
                <div key={p._id} style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div style={{ background: "#f8fafc", padding: "12px 14px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{p.mentorName || "—"}</span>
                    <span style={{ fontWeight: 800, fontSize: 15, color: "#0f172a" }}>{fmtCurrency(p.paymentAmount, p.currency)}</span>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                      {[
                        ["Transaction ID", <span style={{ fontFamily: "monospace", color: "#475569", fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{p.transactionId || "—"}</span>],
                        ["Status", <Badge status={p.paymentStatus} />],
                        ["Txn Date", fmtDate(p.transactionDate)],
                        ["Created On", fmtDate(p.createdOn)],
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{label}</div>
                          <div style={{ fontSize: 12, color: "#334155" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    {p.remarks && (
                      <div style={{ background: "#f8fafc", borderRadius: 6, padding: "8px 10px", marginBottom: 10, border: "1px solid #f1f5f9" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Remarks</div>
                        <p style={{ margin: "3px 0 0", fontSize: 12, color: "#475569" }}>{p.remarks}</p>
                      </div>
                    )}
                    {p.screenshotUrl && (
                      <button onClick={() => setModalUrl(p.screenshotUrl)} style={{ width: "100%", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: 9, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
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