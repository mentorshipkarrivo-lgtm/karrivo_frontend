import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Copy, Check, Upload, Shield, CheckCircle,
  Lock, ChevronRight, AlertCircle, X, QrCode, Link2, Loader2
} from "lucide-react";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSubmitPaymentMutation } from "./Paymentsecapislice";


export default function MenteePayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    subscription_id,
    session_id,
    mentorId,
    menteeId,
    mentorName,
    menteeName,
    mentorRole,
    planMonths,
    totalSessions,
    basePrice,
    createdBy,
    paymentType,
    bookingDetails,
  } = location.state || {};

  console.log(paymentType, "paymentTypeswe")

  const isSessionBooking = paymentType === "bookingsession";
  const total = basePrice;

  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecond, setCopiedSecond] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("qr");

  const [submitPayment, {
    isLoading: isSubmitting,
    isSuccess,
    isError,
    error,
    data: responseData,
  }] = useSubmitPaymentMutation();

  const upiId = "karrivo2024@upi";
  const secondUpiId = "example.174327728615@sbi";

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setScreenshotName(file.name);
    setUploading(true);
    setUploadError("");
    setScreenshotUrl("");
    try {
      const storageRef = ref(storage, `payment-screenshots/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setScreenshotUrl(url);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setScreenshotName("");
    } finally {
      setUploading(false);
    }
  };

  const handleConfirm = async () => {
    if (!screenshotUrl) { setUploadError("Please upload your payment screenshot."); return; }
    if (!transactionId.trim()) { setUploadError("Please enter your Transaction / UTR ID."); return; }
    setUploadError("");
    try {
      await submitPayment({
        subscription_id,
        session_id,
        mentorId,
        menteeId,
        mentorName,
        menteeName,
        paymentAmount: total,
        paymentType,
        transactionId: transactionId.trim(),
        screenshotUrl,
        transactionDate: new Date().toISOString(),
        createdBy,
        ...(isSessionBooking && { paymentType: "bookingsession" }),
      }).unwrap();
    } catch {
      // error shown via isError
    }
  };

  // Opacity variants of cream — all derived from #f4e8d4
  const cream = "#f4e8d4";
  const creamDim = "rgba(244,232,212,0.4)";
  const creamFaint = "rgba(244,232,212,0.15)";
  const creamGhost = "rgba(244,232,212,0.07)";
  const creamBorder = "rgba(244,232,212,0.1)";

  /* ── Guard ── */
  if (!location.state || !basePrice) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a211e" }}>
        <div className="text-center px-6">
          <p className="text-sm mb-4" style={{ color: creamDim }}>No plan selected. Please go back.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: "#0e2b27", color: cream, border: `1px solid ${creamBorder}` }}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#0a211e" }}>
        <div className="rounded-2xl p-8 sm:p-10 max-w-sm w-full text-center" style={{ background: "#0e2b27", border: `1px solid ${creamBorder}`, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: cream }}>
            <CheckCircle size={30} color="#0a211e" />
          </div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: cream }}>Payment Submitted!</h2>
          <p className="text-sm mb-1 leading-relaxed" style={{ color: creamDim }}>
            {isSessionBooking ? (
              <>Your session with <span className="font-bold" style={{ color: cream }}>{mentorName}</span> is being confirmed.</>
            ) : (
              <>Your <span className="font-bold" style={{ color: cream }}>{planMonths}-month mentorship</span> with{" "}
                <span className="font-bold" style={{ color: cream }}>{mentorName}</span> is being activated.</>
            )}
          </p>

          {responseData?.data && (
            <div className="rounded-xl p-3 mt-4 mb-4 text-left space-y-2" style={{ background: "#0a211e", border: `1px solid ${creamBorder}` }}>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: cream }}>Payment Details</p>
              {[
                { label: "Status", value: responseData.data.paymentStatus, isStatus: true },
                { label: "Transaction ID", value: responseData.data.transactionId },
                { label: "Amount Paid", value: `₹${responseData.data.paymentAmount?.toLocaleString("en-IN")}` },
                { label: "Mentor", value: responseData.data.mentorName },
                { label: "Mentee", value: responseData.data.menteeName },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-xs" style={{ color: creamDim }}>{item.label}</span>
                  {item.isStatus ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: cream, background: creamGhost }}>
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-xs font-bold" style={{ color: cream }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-xs mb-6" style={{ color: creamDim }}>
            {responseData?.message || "Verification and activation within 2 hours."}
          </p>
          <button
            onClick={() => navigate("/mentee/bookings")}
            className="w-full font-bold py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
            style={{ background: cream, color: "#0a211e" }}
          >
            See Your Bookings →
          </button>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4" style={{ background: "#0a211e" }}>
      <div
        className="w-full max-w-[860px] flex flex-col lg:flex-row rounded-2xl overflow-hidden lg:max-h-[680px]"
        style={{ background: "#0e2b27", border: `1px solid ${creamBorder}`, boxShadow: "0 25px 80px rgba(0,0,0,0.5)" }}
      >

        {/* ══ LEFT PANEL ══ */}
        <div
          className="w-full lg:w-64 shrink-0 flex flex-col p-5"
          style={{ background: "#0a211e", borderRight: `1px solid ${creamBorder}` }}
        >

          {/* Mentor */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0"
              style={{ background: cream, color: "#0a211e" }}
            >
              {mentorName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight truncate" style={{ color: cream }}>{mentorName}</p>
              <p className="text-[11px] truncate" style={{ color: creamDim }}>{mentorRole}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: creamDim }}>Total Amount</p>
            <p className="text-3xl font-extrabold tracking-tight leading-none" style={{ color: cream }}>
              ₹{total?.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Plan card */}
          <div className="rounded-xl p-3 mb-4 space-y-2" style={{ background: creamGhost, border: `1px solid ${creamBorder}` }}>
            <div className="flex justify-between items-center">
              <span className="text-[11px]" style={{ color: creamDim }}>Mentee</span>
              <span className="text-[11px] font-bold truncate max-w-[120px]" style={{ color: cream }}>{menteeName}</span>
            </div>
            {isSessionBooking ? (
              <>
                {[
                  { label: "Date", value: bookingDetails?.date },
                  { label: "Time", value: bookingDetails?.time },
                  { label: "Type", value: bookingDetails?.sessionType },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-center">
                    <span className="text-[11px]" style={{ color: creamDim }}>{r.label}</span>
                    <span className="text-[11px] font-bold" style={{ color: cream }}>{r.value}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: creamDim }}>Duration</span>
                  <span className="text-[11px] font-bold" style={{ color: cream }}>{planMonths} Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: creamDim }}>Sessions</span>
                  <span className="text-[11px] font-bold" style={{ color: cream }}>{totalSessions}</span>
                </div>
              </>
            )}
            <div className="pt-2 flex justify-between items-center" style={{ borderTop: `1px solid ${creamBorder}` }}>
              <span className="text-xs font-semibold" style={{ color: creamDim }}>
                {isSessionBooking ? "Session fee" : "Plan price"}
              </span>
              <span className="text-sm font-extrabold" style={{ color: cream }}>
                ₹{basePrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="hidden sm:block flex-1 min-h-0 overflow-hidden">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: creamDim }}>How it works</p>
            <div className="space-y-2">
              {[
                { n: "1", t: "Scan QR or copy UPI", d: "PhonePe, GPay, Paytm" },
                { n: "2", t: "Upload screenshot", d: "Capture confirmation" },
                { n: "3", t: "Enter UTR ID", d: "12-digit reference" },
                { n: "4", t: "Confirm & activate", d: "Ready in ~2 hours" },
              ].map(s => (
                <div key={s.n} className="flex items-start gap-2">
                  <div
                    className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[9px] font-extrabold"
                    style={{ background: creamFaint, color: cream }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold leading-tight" style={{ color: cream }}>{s.t}</p>
                    <p className="text-[9px]" style={{ color: creamDim }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-1.5 pt-3 mt-3" style={{ borderTop: `1px solid ${creamBorder}` }}>
            <Shield size={10} style={{ color: creamDim }} className="shrink-0" />
            <span className="text-[9px]" style={{ color: creamDim }}>Secured by Karrivo</span>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#0e2b27" }}>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 pt-5 pb-2 space-y-3">

            {/* Title */}
            <div>
              <p className="text-base font-extrabold tracking-tight" style={{ color: cream }}>Complete your payment</p>
              <p className="text-[11px] mt-0.5" style={{ color: creamDim }}>
                Pay via UPI · ₹{total?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl p-1 gap-1" style={{ background: "#0a211e" }}>
              {[
                { id: "qr", Icon: QrCode, label: "Scan QR" },
                { id: "upi", Icon: Link2, label: "UPI ID" },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all"
                  style={
                    activeTab === id
                      ? { background: "#0e2b27", color: cream, border: `1px solid ${creamBorder}` }
                      : { color: creamDim, background: "transparent", border: "1px solid transparent" }
                  }
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* QR Tab */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-2xl p-3" style={{ background: "#0a211e", border: `1px solid ${creamBorder}` }}>
                  <img
                    src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="UPI QR"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-lg block"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {["PhonePe", "Google Pay", "Paytm", "BHIM"].map(a => (
                    <span
                      key={a}
                      className="text-[10px] font-semibold rounded-md px-2 py-1"
                      style={{ color: creamDim, background: "#0a211e", border: `1px solid ${creamBorder}` }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="w-full rounded-xl px-3 py-2 flex gap-2 items-start" style={{ background: creamGhost, border: `1px solid ${creamBorder}` }}>
                  <AlertCircle size={12} style={{ color: cream }} className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: creamDim }}>
                    Pay exactly <span className="font-bold" style={{ color: cream }}>₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation by 48h.
                  </p>
                </div>
              </div>
            )}

            {/* UPI Tab */}
            {activeTab === "upi" && (
              <div className="space-y-2.5">
                {[
                  { label: "Primary UPI ID", val: upiId, copied: copiedPrimary, setter: setCopiedPrimary },
                  { label: "Secondary UPI ID", val: secondUpiId, copied: copiedSecond, setter: setCopiedSecond },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: creamDim }}>{row.label}</p>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "#0a211e", border: `1px solid ${creamBorder}` }}>
                      <span className="text-xs font-semibold flex-1 break-all" style={{ color: cream }}>{row.val}</span>
                      <button
                        onClick={() => copy(row.val, row.setter)}
                        className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 transition-all"
                        style={
                          row.copied
                            ? { background: cream, color: "#0a211e" }
                            : { background: creamFaint, color: cream, border: `1px solid ${creamBorder}` }
                        }
                      >
                        {row.copied ? <Check size={9} /> : <Copy size={9} />}
                        {row.copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl px-3 py-2.5 flex gap-2 items-start" style={{ background: creamGhost, border: `1px solid ${creamBorder}` }}>
                  <AlertCircle size={12} style={{ color: cream }} className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: creamDim }}>
                    Pay exactly <span className="font-bold" style={{ color: cream }}>₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation.
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: creamBorder }} />
              <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: creamDim }}>After Payment</span>
              <div className="flex-1 h-px" style={{ background: creamBorder }} />
            </div>

            {/* Upload */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: creamDim }}>
                Payment Screenshot <span style={{ color: cream }}>*</span>
              </p>
              <label
                className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-4 cursor-pointer transition-all"
                style={
                  uploading
                    ? { borderColor: creamDim, background: creamGhost }
                    : screenshotUrl
                      ? { borderColor: cream, background: creamGhost, borderStyle: "solid" }
                      : { borderColor: "rgba(244,232,212,0.12)", background: "#0a211e" }
                }
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.jfif"
                  className="hidden"
                  disabled={uploading}
                  onChange={e => handleFileUpload(e.target.files[0])}
                />
                {uploading ? (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: creamFaint }}>
                      <Upload size={13} style={{ color: cream }} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: cream }}>Uploading...</p>
                  </>
                ) : screenshotUrl ? (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: creamFaint }}>
                      <Check size={14} style={{ color: cream }} />
                    </div>
                    <p className="text-xs font-bold" style={{ color: cream }}>Uploaded successfully</p>
                    <p className="text-[10px] max-w-[200px] truncate" style={{ color: creamDim }}>{screenshotName}</p>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: creamFaint }}>
                      <Upload size={13} style={{ color: creamDim }} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: cream }}>Click to upload screenshot</p>
                    <p className="text-[10px]" style={{ color: creamDim }}>JPG, PNG up to 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* UTR */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: creamDim }}>
                Transaction / UTR ID <span style={{ color: cream }}>*</span>
              </p>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all"
                style={{
                  background: "#0a211e",
                  border: `1px solid ${creamBorder}`,
                  color: cream,
                  caretColor: cream,
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(244,232,212,0.3)"; e.target.style.boxShadow = "0 0 0 3px rgba(244,232,212,0.05)"; }}
                onBlur={e => { e.target.style.borderColor = creamBorder; e.target.style.boxShadow = "none"; }}
                placeholder="e.g. T2312XXXXXXX"
                value={transactionId}
                onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(""); }}
              />
              <p className="text-[9px] mt-1" style={{ color: creamDim }}>Find this in your UPI app under payment history</p>
            </div>

            {/* Discount */}
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
                style={{ background: "#0a211e", border: `1px solid ${creamBorder}`, color: cream, caretColor: cream }}
                onFocus={e => { e.target.style.borderColor = "rgba(244,232,212,0.3)"; e.target.style.boxShadow = "0 0 0 3px rgba(244,232,212,0.05)"; }}
                onBlur={e => { e.target.style.borderColor = creamBorder; e.target.style.boxShadow = "none"; }}
                placeholder="Discount code (optional)"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value.toUpperCase())}
              />
              <button
                className="text-xs font-bold px-4 rounded-xl transition-opacity hover:opacity-80"
                style={{ background: creamFaint, border: `1px solid ${creamBorder}`, color: cream }}
              >
                Apply
              </button>
            </div>

            {/* Upload error */}
            {uploadError && (
              <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: creamGhost, border: `1px solid ${creamBorder}` }}>
                <X size={12} style={{ color: cream }} className="shrink-0" />
                <p className="text-xs font-medium" style={{ color: cream }}>{uploadError}</p>
              </div>
            )}

            {/* API error */}
            {isError && (
              <div className="flex items-start gap-2 rounded-xl px-3 py-2.5" style={{ background: creamGhost, border: `1px solid ${creamBorder}` }}>
                <X size={12} style={{ color: cream }} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold" style={{ color: cream }}>Submission failed</p>
                  <p className="text-[11px] mt-0.5" style={{ color: creamDim }}>
                    {error?.data?.message || "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Sticky footer ── */}
          <div className="px-4 sm:px-5 py-3 space-y-2 shrink-0" style={{ background: "#0e2b27", borderTop: `1px solid ${creamBorder}` }}>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: creamDim }}>
                <Lock size={10} />
                <span>Secure payment</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px]" style={{ color: creamDim }}>Total:</span>
                <span className="text-base font-extrabold tracking-tight" style={{ color: cream }}>
                  ₹{total?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleConfirm}
              disabled={uploading || isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
              style={
                uploading || isSubmitting
                  ? { background: creamFaint, color: creamDim, cursor: "not-allowed" }
                  : { background: cream, color: "#0a211e", boxShadow: "0 8px 24px rgba(244,232,212,0.12)" }
              }
            >
              {isSubmitting ? (
                <><Loader2 size={14} className="animate-spin" /> Submitting payment...</>
              ) : uploading ? (
                "Uploading screenshot..."
              ) : (
                <><Lock size={13} /> Pay ₹{total?.toLocaleString("en-IN")} · Confirm <ChevronRight size={14} /></>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              {[
                { Icon: Shield, label: "Secure Upload" },
                { Icon: CheckCircle, label: "2hr Activation" },
                { Icon: Lock, label: "100% Safe" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-1">
                  <Icon size={10} style={{ color: creamDim }} />
                  <span className="text-[9px] font-medium" style={{ color: creamDim }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







