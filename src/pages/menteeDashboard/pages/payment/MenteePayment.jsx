


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
    bookingNumber
  } = location.state || {};
  console.log(subscription_id,
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
    bookingNumber, "location.state")

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

  // ── Color palette (3 colors only) ──
  // white:  #ffffff  — page bg, component bg, text on dark
  // card:   #81a8a6  — card/panel backgrounds, muted teal
  // navy:   #0d1f2d  — buttons, left panel, active states, strong text

  const white = "#ffffff";
  const card = "#81a8a6";
  const navy = "#0d1f2d";

  // Derived alphas — all from the three base colors
  const cardLight = "rgba(129,168,166,0.18)";
  const cardMid = "rgba(129,168,166,0.35)";
  const cardBorder = "rgba(129,168,166,0.4)";
  const navyDim = "rgba(13,31,45,0.5)";
  const navyFaint = "rgba(13,31,45,0.35)";
  const footerBg = "rgba(129,168,166,0.1)";

  // aliases to keep JSX readable
  const bg = white;
  const teal = navy;        // buttons use navy
  const dark = navy;
  const tealLight = cardLight;
  const tealMid = cardMid;
  const tealBorder = cardBorder;
  const tealStrong = "rgba(129,168,166,0.6)";
  const darkDim = navyDim;
  const darkFaint = navyFaint;
  const bgDark = footerBg;

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
        bookingNumber,
        transactionDate: new Date().toISOString(),
        createdBy,
        ...(isSessionBooking && { paymentType: "bookingsession" }),
      }).unwrap();
    } catch {
      // error shown via isError
    }
  };

  /* ── Guard ── */
  if (!location.state || !basePrice) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: bg }}>
        <div className="text-center px-6">
          <p className="text-sm mb-4" style={{ color: darkDim }}>No plan selected. Please go back.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80"
            style={{ background: navy, color: white, border: `1px solid ${cardBorder}` }}
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: bg }}>
        <div className="rounded-2xl p-8 sm:p-10 max-w-sm w-full text-center" style={{ background: navy, border: `1px solid ${cardBorder}`, boxShadow: "0 25px 60px rgba(13,31,45,0.2)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: white }}>
            <CheckCircle size={30} color={navy} />
          </div>
          <h2 className="text-xl font-extrabold mb-2" style={{ color: white }}>Payment Submitted!</h2>
          <p className="text-sm mb-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {isSessionBooking ? (
              <>Your session with <span className="font-bold" style={{ color: white }}>{mentorName}</span> is being confirmed.</>
            ) : (
              <>Your <span className="font-bold" style={{ color: white }}>{planMonths}-month mentorship</span> with{" "}
                <span className="font-bold" style={{ color: white }}>{mentorName}</span> is being activated.</>
            )}
          </p>

          {responseData?.data && (
            <div className="rounded-xl p-3 mt-4 mb-4 text-left space-y-2" style={{ background: "rgba(129,168,166,0.15)", border: `1px solid rgba(129,168,166,0.25)` }}>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: white }}>Payment Details</p>
              {[
                { label: "Status", value: responseData.data.paymentStatus, isStatus: true },
                { label: "Transaction ID", value: responseData.data.transactionId },
                { label: "Amount Paid", value: `₹${responseData.data.paymentAmount?.toLocaleString("en-IN")}` },
                { label: "Mentor", value: responseData.data.mentorName },
                { label: "Mentee", value: responseData.data.menteeName },
              ].map(item => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                  {item.isStatus ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: white, background: "rgba(129,168,166,0.2)" }}>
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-xs font-bold" style={{ color: white }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            {responseData?.message || "Verification and activation within 2 hours."}
          </p>
          <button
            onClick={() => navigate("/mentee/bookings")}
            className="w-full font-bold py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
            style={{ background: white, color: navy }}
          >
            See Your Bookings →
          </button>
        </div>
      </div>
    );
  }

  /* ── Main UI ── */
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4" style={{ background: bg }}>
      <div
        className="w-full max-w-[860px] flex flex-col lg:flex-row rounded-2xl overflow-hidden lg:max-h-[680px]"
        style={{ background: white, border: `1px solid ${cardBorder}`, boxShadow: "0 25px 80px rgba(13,31,45,0.12)" }}
      >

        <div
          className="w-full lg:w-64 shrink-0 flex flex-col p-5"
          style={{ background: navy, borderRight: `1px solid rgba(129,168,166,0.2)` }}
        >

          {/* Mentor */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0"
              style={{ background: card, color: navy }}
            >
              {mentorName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm leading-tight truncate" style={{ color: white }}>{mentorName}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{mentorRole}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Total Amount</p>
            <p className="text-3xl font-extrabold tracking-tight leading-none" style={{ color: white }}>
              ₹{total?.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Plan card */}
          <div className="rounded-xl p-3 mb-4 space-y-2" style={{ background: "rgba(129,168,166,0.15)", border: `1px solid rgba(129,168,166,0.25)` }}>
            <div className="flex justify-between items-center">
              <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Mentee</span>
              <span className="text-[11px] font-bold truncate max-w-[120px]" style={{ color: white }}>{menteeName}</span>
            </div>
            {isSessionBooking ? (
              <>
                {[
                  { label: "Date", value: bookingDetails?.date },
                  { label: "Time", value: bookingDetails?.time },
                  { label: "Type", value: bookingDetails?.sessionType },
                ].map(r => (
                  <div key={r.label} className="flex justify-between items-center">
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>{r.label}</span>
                    <span className="text-[11px] font-bold" style={{ color: white }}>{r.value}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Duration</span>
                  <span className="text-[11px] font-bold" style={{ color: white }}>{planMonths} Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>Sessions</span>
                  <span className="text-[11px] font-bold" style={{ color: white }}>{totalSessions}</span>
                </div>
              </>
            )}
            <div className="pt-2 flex justify-between items-center" style={{ borderTop: `1px solid rgba(129,168,166,0.25)` }}>
              <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                {isSessionBooking ? "Session fee" : "Plan price"}
              </span>
              <span className="text-sm font-extrabold" style={{ color: white }}>
                ₹{basePrice?.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div className="hidden sm:block flex-1 min-h-0 overflow-hidden">
            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>How it works</p>
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
                    style={{ background: "rgba(129,168,166,0.25)", color: white }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold leading-tight" style={{ color: white }}>{s.t}</p>
                    <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.5)" }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-1.5 pt-3 mt-3" style={{ borderTop: `1px solid rgba(129,168,166,0.2)` }}>
            <Shield size={10} style={{ color: "rgba(255,255,255,0.45)" }} className="shrink-0" />
            <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.45)" }}>Secured by Karrivo</span>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: white }}>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 pt-5 pb-2 space-y-3">

            {/* Title */}
            <div>
              <p className="text-base font-extrabold tracking-tight" style={{ color: dark }}>Complete your payment</p>
              <p className="text-[11px] mt-0.5" style={{ color: darkDim }}>
                Pay via UPI · ₹{total?.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl p-1 gap-1" style={{ background: card }}>
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
                      ? { background: navy, color: white, border: `1px solid rgba(13,31,45,0.3)` }
                      : { color: white, background: "transparent", border: "1px solid transparent" }
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
                <div className="rounded-2xl p-3" style={{ background: card, border: `1px solid ${cardBorder}` }}>
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
                      style={{ color: navy, background: cardLight, border: `1px solid ${cardBorder}` }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="w-full rounded-xl px-3 py-2 flex gap-2 items-start" style={{ background: cardLight, border: `1px solid ${cardBorder}` }}>
                  <AlertCircle size={12} style={{ color: navy }} className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: navyDim }}>
                    Pay exactly <span className="font-bold" style={{ color: navy }}>₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation by 48h.
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
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: navyFaint }}>{row.label}</p>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: card, border: `1px solid ${cardBorder}` }}>
                      <span className="text-xs font-semibold flex-1 break-all" style={{ color: navy }}>{row.val}</span>
                      <button
                        onClick={() => copy(row.val, row.setter)}
                        className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 transition-all"
                        style={
                          row.copied
                            ? { background: navy, color: white }
                            : { background: "rgba(255,255,255,0.35)", color: navy, border: `1px solid rgba(13,31,45,0.2)` }
                        }
                      >
                        {row.copied ? <Check size={9} /> : <Copy size={9} />}
                        {row.copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl px-3 py-2.5 flex gap-2 items-start" style={{ background: cardLight, border: `1px solid ${cardBorder}` }}>
                  <AlertCircle size={12} style={{ color: navy }} className="mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: navyDim }}>
                    Pay exactly <span className="font-bold" style={{ color: navy }}>₹{total?.toLocaleString("en-IN")}</span> — wrong amounts delay activation.
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px" style={{ background: cardBorder }} />
              <span className="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: navyFaint }}>After Payment</span>
              <div className="flex-1 h-px" style={{ background: cardBorder }} />
            </div>

            {/* Upload */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: navyFaint }}>
                Payment Screenshot <span style={{ color: navy }}>*</span>
              </p>
              <label
                className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-4 cursor-pointer transition-all"
                style={
                  uploading
                    ? { borderColor: card, background: cardLight }
                    : screenshotUrl
                      ? { borderColor: navy, background: cardLight, borderStyle: "solid" }
                      : { borderColor: cardBorder, background: card + "18" }
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
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: cardMid }}>
                      <Upload size={13} style={{ color: navy }} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: navy }}>Uploading...</p>
                  </>
                ) : screenshotUrl ? (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: cardMid }}>
                      <Check size={14} style={{ color: navy }} />
                    </div>
                    <p className="text-xs font-bold" style={{ color: navy }}>Uploaded successfully</p>
                    <p className="text-[10px] max-w-[200px] truncate" style={{ color: navyFaint }}>{screenshotName}</p>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: cardLight }}>
                      <Upload size={13} style={{ color: navy }} />
                    </div>
                    <p className="text-xs font-semibold" style={{ color: navy }}>Click to upload screenshot</p>
                    <p className="text-[10px]" style={{ color: navyFaint }}>JPG, PNG up to 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* UTR */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: navyFaint }}>
                Transaction / UTR ID <span style={{ color: navy }}>*</span>
              </p>
              <input
                className="w-full rounded-xl px-3 py-2.5 text-xs font-semibold outline-none transition-all"
                style={{
                  background: white,
                  border: `1px solid ${cardBorder}`,
                  color: navy,
                  caretColor: navy,
                }}
                onFocus={e => { e.target.style.borderColor = navy; e.target.style.boxShadow = `0 0 0 3px ${cardLight}`; }}
                onBlur={e => { e.target.style.borderColor = cardBorder; e.target.style.boxShadow = "none"; }}
                placeholder="e.g. T2312XXXXXXX"
                value={transactionId}
                onChange={e => { setTransactionId(e.target.value.toUpperCase()); setUploadError(""); }}
              />
              <p className="text-[9px] mt-1" style={{ color: navyFaint }}>Find this in your UPI app under payment history</p>
            </div>

            {/* Discount */}
            {/* <div className="flex gap-2">
              <input
                className="flex-1 rounded-xl px-3 py-2.5 text-xs outline-none transition-all"
                style={{ background: white, border: `1px solid ${cardBorder}`, color: navy, caretColor: navy }}
                onFocus={e => { e.target.style.borderColor = navy; e.target.style.boxShadow = `0 0 0 3px ${cardLight}`; }}
                onBlur={e => { e.target.style.borderColor = cardBorder; e.target.style.boxShadow = "none"; }}
                placeholder="Discount code (optional)"
                value={discountCode}
                onChange={e => setDiscountCode(e.target.value.toUpperCase())}
              />
              <button
                className="text-xs font-bold px-4 rounded-xl transition-opacity hover:opacity-80"
                style={{ background: navy, color: white }}
              >
                Apply
              </button>
            </div> */}

            {/* Upload error */}
            {uploadError && (
              <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "rgba(220,53,69,0.08)", border: `1px solid rgba(220,53,69,0.2)` }}>
                <X size={12} style={{ color: "#dc3545" }} className="shrink-0" />
                <p className="text-xs font-medium" style={{ color: "#dc3545" }}>{uploadError}</p>
              </div>
            )}

            {/* API error */}
            {isError && (
              <div className="flex items-start gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(220,53,69,0.08)", border: `1px solid rgba(220,53,69,0.2)` }}>
                <X size={12} style={{ color: "#dc3545" }} className="shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold" style={{ color: "#dc3545" }}>Submission failed</p>
                  <p className="text-[11px] mt-0.5" style={{ color: darkDim }}>
                    {error?.data?.message || "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 sm:px-5 py-3 space-y-2 shrink-0" style={{ background: white, borderTop: `1px solid ${cardBorder}` }}>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px]" style={{ color: navyFaint }}>
                <Lock size={10} />
                <span>Secure payment</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[11px]" style={{ color: navyFaint }}>Total:</span>
                <span className="text-base font-extrabold tracking-tight" style={{ color: navy }}>
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
                  ? { background: cardMid, color: navyFaint, cursor: "not-allowed" }
                  : { background: navy, color: white, boxShadow: "0 8px 24px rgba(13,31,45,0.25)" }
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
                  <Icon size={10} style={{ color: navyFaint }} />
                  <span className="text-[9px] font-medium" style={{ color: navyFaint }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





