

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Copy, Check, Upload, Shield, CheckCircle,
  Lock, ChevronRight, AlertCircle, X, QrCode, Link2, Loader2,
} from "lucide-react";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSubmitPaymentMutation } from "./Paymentsecapislice";

/* ─── helpers ─── */
const fmt = (v) => v?.toLocaleString("en-IN");

export default function MenteePayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    subscription_id, session_id, mentorId, menteeId,
    mentorName, menteeName, mentorRole,
    planMonths, totalSessions, basePrice, createdBy,
    paymentType, bookingDetails, bookingNumber,
  } = location.state || {};
  console.log(mentorName, subscription_id, session_id, "mentorNameswdefrt")
  
  const isSessionBooking = paymentType === "bookingsession";
  const total = basePrice;

  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecond, setCopiedSecond] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("qr");

  const [submitPayment, { isLoading: isSubmitting, isSuccess, isError, error, data: responseData }] =
    useSubmitPaymentMutation();

  console.log(responseData, "responseData`12")
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
        subscription_id, session_id, mentorId, menteeId,
        mentorName, menteeName,
        paymentAmount: total, paymentType,
        transactionId: transactionId.trim(),
        screenshotUrl, bookingNumber,
        transactionDate: new Date().toISOString(),
        createdBy,
        ...(isSessionBooking && { paymentType: "bookingsession" }),
      }).unwrap();
    } catch { /* error shown via isError */ }
  };

  /* ── Guard ── */
  if (!location.state || !basePrice) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <p className="text-sm mb-4 text-slate-400">No plan selected. Please go back.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-bold px-5 py-2.5 rounded-xl bg-[#1a1a2e] text-white hover:opacity-80 transition-opacity"
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
      <div className="h-screen flex items-center justify-center bg-white p-4">
        <div className="rounded-2xl p-8 max-w-sm w-full text-center bg-[#1a1a2e] border border-slate-700">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={26} className="text-[#1a1a2e]" />
          </div>
          <h2 className="text-xl font-extrabold text-white mb-2">Payment Submitted!</h2>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            {isSessionBooking ? (
              <>Your session with <span className="font-bold text-white">{mentorName}</span> is being confirmed.</>
            ) : (
              <>Your <span className="font-bold text-white">{planMonths}-month mentorship</span> with{" "}
                <span className="font-bold text-white">{mentorName}</span> is being activated.</>
            )}
          </p>

          {responseData?.data && (
            <div className="rounded-xl p-3 mb-4 text-left space-y-2 bg-white/5 border border-white/10">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-2">Payment Details</p>
              {[
                ["Status", responseData.data.paymentStatus],
                ["Transaction ID", responseData.data.transactionId],
                ["Amount Paid", `₹${fmt(responseData.data.paymentAmount)}`],
                ["Mentor", responseData.data.mentorName],
                ["Mentee", responseData.data.menteeName],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs text-white/50">{label}</span>
                  <span className="text-xs font-bold text-white">{value}</span>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-white/40 mb-5">
            {responseData?.message || "Verification and activation within 2 hours."}
          </p>
          <button
            onClick={() => navigate("/mentee/bookings")}
            className="w-full font-bold py-3 rounded-xl text-sm bg-white text-[#1a1a2e] hover:opacity-90 transition-opacity"
          >
            See Your Bookings →
          </button>
        </div>
      </div>
    );
  }

  /* ── Main UI — fits in 100vh, no page scroll ── */
  return (
    <div className="h-screen flex items-center justify-center bg-white px-3 py-3">
      {/*
        Two-panel card: left = summary (fixed width), right = action (scrollable internally if needed)
        On mobile: stacked, each panel scrollable, contained in the viewport via overflow-hidden on wrapper
      */}
      <div className="w-full max-w-[820px] h-full max-h-[680px] flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-slate-200">

        {/* ══ LEFT PANEL ══ */}
        <div className="lg:w-60 shrink-0 flex flex-col bg-[#1a1a2e] p-4 overflow-hidden">

          {/* Mentor */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#0098cc]/20 border border-[#0098cc]/30 flex items-center justify-center font-extrabold text-sm text-[#0098cc] shrink-0">
              {mentorName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-white truncate leading-tight">{mentorName}</p>
              <p className="text-[10px] text-white/50 truncate">{mentorRole}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-3">
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Total Amount</p>
            <p className="text-2xl font-extrabold text-white tracking-tight leading-none">
              ₹{fmt(total)}
            </p>
          </div>

          {/* Plan card */}
          <div className="rounded-xl p-3 mb-3 space-y-1.5 bg-white/5 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white/50">Mentee</span>
              <span className="text-[10px] font-bold text-white truncate max-w-[110px]">{menteeName}</span>
            </div>

            {isSessionBooking ? (
              [["Date", bookingDetails?.date], ["Time", bookingDetails?.time], ["Type", bookingDetails?.sessionType]].map(([l, v]) => (
                <div key={l} className="flex justify-between items-center">
                  <span className="text-[10px] text-white/50">{l}</span>
                  <span className="text-[10px] font-bold text-white">{v}</span>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/50">Duration</span>
                  <span className="text-[10px] font-bold text-white">{planMonths} Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/50">Sessions</span>
                  <span className="text-[10px] font-bold text-white">{totalSessions}</span>
                </div>
              </>
            )}

            <div className="pt-1.5 flex justify-between items-center border-t border-white/10">
              <span className="text-[10px] text-white/50">{isSessionBooking ? "Session fee" : "Plan price"}</span>
              <span className="text-xs font-extrabold text-white">₹{fmt(basePrice)}</span>
            </div>
          </div>

          {/* Steps — hidden on small screens to save space */}
          <div className="hidden lg:block flex-1 overflow-hidden">
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-2">How it works</p>
            <div className="space-y-2">
              {[
                ["1", "Scan QR or copy UPI", "PhonePe, GPay, Paytm"],
                ["2", "Upload screenshot", "Capture confirmation"],
                ["3", "Enter UTR ID", "12-digit reference"],
                ["4", "Confirm & activate", "Ready in ~2 hours"],
              ].map(([n, t, d]) => (
                <div key={n} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-[8px] font-extrabold text-white">
                    {n}
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold text-white leading-tight">{t}</p>
                    <p className="text-[8px] text-white/40">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-1.5 pt-3 mt-auto border-t border-white/10">
            <Shield size={9} className="text-white/30 shrink-0" />
            <span className="text-[8px] text-white/30">Secured by Karrivo</span>
          </div>
        </div>

        {/* ══ RIGHT PANEL ══ */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-3 scrollbar-none">

            {/* Title */}
            <div>
              <p className="text-sm font-extrabold text-[#1a1a2e] tracking-tight">Complete your payment</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Pay via UPI · ₹{fmt(total)}</p>
            </div>

            {/* Tabs */}
            <div className="flex rounded-xl p-1 gap-1 bg-slate-100">
              {[
                { id: "qr", Icon: QrCode, label: "Scan QR" },
                { id: "upi", Icon: Link2, label: "UPI ID" },
              ].map(({ id, Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeTab === id
                    ? "bg-[#1a1a2e] text-white"
                    : "text-slate-500 hover:text-[#1a1a2e]"
                    }`}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </div>

            {/* QR Tab */}
            {activeTab === "qr" && (
              <div className="flex flex-col items-center gap-2.5">
                <div className="rounded-xl p-2.5 bg-slate-50 border border-slate-200">
                  <img
                    src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="UPI QR"
                    className="w-24 h-24 rounded-lg block"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap justify-center">
                  {["PhonePe", "Google Pay", "Paytm", "BHIM"].map((a) => (
                    <span
                      key={a}
                      className="text-[9px] font-semibold rounded-md px-2 py-0.5 bg-[#0098cc]/10 text-[#0098cc] border border-[#0098cc]/20"
                    >
                      {a}
                    </span>
                  ))}
                </div>

              </div>
            )}

            {/* UPI Tab */}
            {activeTab === "upi" && (
              <div className="space-y-2">
                {[
                  { label: "Primary UPI ID", val: upiId, copied: copiedPrimary, setter: setCopiedPrimary },
                  { label: "Secondary UPI ID", val: secondUpiId, copied: copiedSecond, setter: setCopiedSecond },
                ].map((row) => (
                  <div key={row.label}>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">{row.label}</p>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2 bg-slate-50 border border-slate-200">
                      <span className="text-[11px] font-semibold flex-1 break-all text-[#1a1a2e]">{row.val}</span>
                      <button
                        onClick={() => copy(row.val, row.setter)}
                        className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg shrink-0 transition-all ${row.copied
                          ? "bg-[#1a1a2e] text-white"
                          : "bg-white text-[#0098cc] border border-[#0098cc]/30 hover:bg-[#0098cc]/5"
                          }`}
                      >
                        {row.copied ? <Check size={9} /> : <Copy size={9} />}
                        {row.copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl px-3 py-2 flex gap-2 items-start bg-amber-50 border border-amber-200">
                  <AlertCircle size={11} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-amber-700 leading-relaxed">
                    Pay exactly <span className="font-bold">₹{fmt(total)}</span> — wrong amounts delay activation.
                  </p>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300 whitespace-nowrap">After Payment</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Upload */}
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Payment Screenshot <span className="text-[#0098cc]">*</span>
              </p>
              <label className={`flex flex-col items-center justify-center gap-1.5 border-2 border-dashed rounded-xl py-3 cursor-pointer transition-all ${screenshotUrl
                ? "border-[#0098cc] bg-[#0098cc]/5"
                : uploading
                  ? "border-slate-200 bg-slate-50"
                  : "border-slate-200 hover:border-[#0098cc]/40 hover:bg-[#0098cc]/5"
                }`}>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.jfif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                {uploading ? (
                  <>
                    <Loader2 size={16} className="text-slate-400 animate-spin" />
                    <p className="text-[10px] font-semibold text-slate-500">Uploading...</p>
                  </>
                ) : screenshotUrl ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-[#0098cc]/15 flex items-center justify-center">
                      <Check size={12} className="text-[#0098cc]" />
                    </div>
                    <p className="text-[10px] font-bold text-[#0098cc]">Uploaded successfully</p>
                    <p className="text-[9px] text-slate-400 max-w-[160px] truncate">{screenshotName}</p>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                      <Upload size={12} className="text-slate-400" />
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500">Click to upload screenshot</p>
                    <p className="text-[9px] text-slate-300">JPG, PNG up to 5MB</p>
                  </>
                )}
              </label>
            </div>

            {/* UTR */}
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Transaction / UTR ID <span className="text-[#0098cc]">*</span>
              </p>
              <input
                className="w-full rounded-xl px-3 py-2 text-xs font-semibold outline-none border border-slate-200 bg-white text-[#1a1a2e] focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10 transition-all placeholder:text-slate-300"
                placeholder="e.g. T2312XXXXXXX"
                value={transactionId}
                onChange={(e) => { setTransactionId(e.target.value.toUpperCase()); setUploadError(""); }}
              />
              <p className="text-[8px] mt-1 text-slate-300">Find this in your UPI app under payment history</p>
            </div>

            {/* Errors */}
            {uploadError && (
              <div className="flex items-center gap-2 rounded-xl px-3 py-2 bg-red-50 border border-red-200">
                <X size={11} className="text-red-500 shrink-0" />
                <p className="text-[10px] font-medium text-red-500">{uploadError}</p>
              </div>
            )}
            {isError && (
              <div className="flex items-start gap-2 rounded-xl px-3 py-2 bg-red-50 border border-red-200">
                <X size={11} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-red-500">Submission failed</p>
                  <p className="text-[9px] text-red-400 mt-0.5">
                    {error?.data?.message || "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer (always visible) ── */}
          <div className="px-4 py-3 bg-white border-t border-slate-100 shrink-0 space-y-2">

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <Lock size={9} />
                <span>Secure payment</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-400">Total:</span>
                <span className="text-base font-extrabold text-[#1a1a2e] tracking-tight">₹{fmt(total)}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={uploading || isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${uploading || isSubmitting
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-[#1a1a2e] text-white hover:opacity-80"
                }`}
            >
              {isSubmitting ? (
                <><Loader2 size={13} className="animate-spin" /> Submitting payment...</>
              ) : uploading ? (
                "Uploading screenshot..."
              ) : (
                <><Lock size={12} /> Pay ₹{fmt(total)} · Confirm <ChevronRight size={13} /></>
              )}
            </button>

            <div className="flex items-center justify-center gap-5">
              {[
                [Shield, "Secure Upload"],
                [CheckCircle, "2hr Activation"],
                [Lock, "100% Safe"],
              ].map(([Icon, label]) => (
                <div key={label} className="flex items-center gap-1">
                  <Icon size={9} className="text-slate-300" />
                  <span className="text-[8px] font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



