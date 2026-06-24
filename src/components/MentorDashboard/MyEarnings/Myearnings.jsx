import React, { useState, useEffect } from "react";
import {
  useGetMentorEarningsQuery, useGetPayoutDetailsQuery,
  useSavePayoutDetailsMutation,
} from "./myearningsapislice";
import {
  DollarSign, Clock, AlertTriangle, Inbox,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  CreditCard, Check, Loader2, Gift, Star, X
} from "lucide-react";
import Loader from "../../../global/Loader";

/* ══════════════════════════════════════════════════
   SHARED CLASS TOKENS (matches MentorHelpSupport)
══════════════════════════════════════════════════ */
const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-xs bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#0098cc]";

const buttonPrimary =
  "bg-[#1a1a2e] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition";

const buttonSecondary =
  "border border-gray-300 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-medium bg-white hover:border-[#0098cc] transition";

/* ══════════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════════ */
const getPaymentStatusStyle = (status) => {
  switch (status) {
    case "Completed": return "bg-green-50 text-green-700 border border-green-200";
    case "Pending": return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "Failed": return "bg-red-50 text-red-700 border border-red-200";
    case "Free": return "bg-purple-50 text-purple-700 border border-purple-200";
    default: return "bg-gray-100 text-gray-500 border border-gray-200";
  }
};

/* ══════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════ */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0">
      <Icon size={18} color="#0098cc" strokeWidth={2} />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold mt-0.5" style={{ color: "#0098cc" }}>{value}</p>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════
   PAYOUT FORM HELPERS
══════════════════════════════════════════════════ */
const Field = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-600">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-0.5">{error}</p>}
  </div>
);

const PInput = (props) => <input className={inputClass} {...props} />;

const EMPTY_FORM = {
  upiId: "", confirmUpiId: "",
  accountHolderName: "", accountNumber: "", confirmAccountNo: "",
  ifscCode: "", bankName: "", branchName: "", accountType: "Savings",
  nameOnPancard: "", panNumber: "",
};

const maskAccount = (num) =>
  num ? `${"•".repeat(Math.max(0, num.length - 4))}${num.slice(-4)}` : "—";

/* ══════════════════════════════════════════════════
   PAYOUT DETAILS MODAL (matches MentorHelpSupport modal shell)
══════════════════════════════════════════════════ */
const PayoutDetailsPage = ({ userId, onClose }) => {
  const { data: fetchedData, isLoading: loadingDetails } =
    useGetPayoutDetailsQuery(userId);

  const [savePayoutDetails, { isLoading: saving }] =
    useSavePayoutDetailsMutation();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [upiEditing, setUpiEditing] = useState(false);
  const [bankEditing, setBankEditing] = useState(false);

  useEffect(() => {
    const pd = fetchedData?.payoutDetails;
    if (!pd) {
      setUpiEditing(true);
      setBankEditing(true);
      return;
    }
    setForm({
      upiId: pd.upiId || "",
      confirmUpiId: pd.upiId || "",
      accountHolderName: pd.bankDetails?.accountHolderName || "",
      accountNumber: pd.bankDetails?.accountNumber || "",
      confirmAccountNo: pd.bankDetails?.accountNumber || "",
      ifscCode: pd.bankDetails?.ifscCode || "",
      bankName: pd.bankDetails?.bankName || "",
      branchName: pd.bankDetails?.branchName || "",
      accountType: pd.bankDetails?.accountType || "Savings",
      nameOnPancard: pd.panDetails?.nameOnPancard || "",
      panNumber: pd.panDetails?.panNumber || "",
    });
    setUpiEditing(!pd.upiId);
    setBankEditing(!pd.bankDetails?.accountNumber);
  }, [fetchedData]);

  const set = (key) => (e) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: "" }));
    setSaved(false);
  };

  const validate = () => {
    const e = {};
    if (upiEditing && form.upiId.trim()) {
      if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(form.upiId.trim()))
        e.upiId = "Invalid UPI ID (e.g. name@upi)";
      if (!form.confirmUpiId.trim())
        e.confirmUpiId = "Please confirm your UPI ID";
      else if (form.upiId !== form.confirmUpiId)
        e.confirmUpiId = "UPI IDs do not match";
    }
    if (bankEditing && (form.accountHolderName.trim() || form.accountNumber.trim() || form.ifscCode.trim() || form.bankName.trim())) {
      if (!form.accountHolderName.trim()) e.accountHolderName = "Account holder name is required";
      if (!form.accountNumber.trim()) e.accountNumber = "Account number is required";
      if (!form.confirmAccountNo.trim()) e.confirmAccountNo = "Please confirm account number";
      else if (form.accountNumber !== form.confirmAccountNo) e.confirmAccountNo = "Account numbers do not match";
      if (!form.ifscCode.trim()) e.ifscCode = "IFSC code is required";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(form.ifscCode.trim())) e.ifscCode = "Invalid IFSC (e.g. HDFC0001234)";
      if (!form.bankName.trim()) e.bankName = "Bank name is required";
    }
    if (form.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(form.panNumber.trim()))
      e.panNumber = "Invalid PAN (e.g. ABCDE1234F)";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const payload = {
      userId,
      upiId: form.upiId.trim() || undefined,
      bankDetails: form.accountNumber.trim() ? {
        accountHolderName: form.accountHolderName.trim(),
        accountNumber: form.accountNumber.trim(),
        ifscCode: form.ifscCode.toUpperCase().trim(),
        bankName: form.bankName.trim(),
        branchName: form.branchName.trim() || undefined,
        accountType: form.accountType,
      } : undefined,
      panDetails: {
        nameOnPancard: form.nameOnPancard.trim() || undefined,
        panNumber: form.panNumber.toUpperCase().trim() || undefined,
      },
    };

    try {
      await savePayoutDetails(payload).unwrap();
      setSaved(true);
      if (form.upiId.trim()) setUpiEditing(false);
      if (form.accountNumber.trim()) setBankEditing(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setErrors({ global: err?.data?.message || "Failed to save. Please try again." });
    }
  };

  const anyEditing = upiEditing || bankEditing;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl border border-gray-200 max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-[#1a1a2e]">Payout Details</h2>
          <button onClick={onClose}>
            <X className="text-gray-500" size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {loadingDetails ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#0098cc]" />
            </div>
          ) : (
            <>
              {/* ══ UPI SECTION ══ */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase">UPI Details</p>
                  {!upiEditing && form.upiId && (
                    <button onClick={() => setUpiEditing(true)} className="text-[11px] font-semibold text-[#0098cc] hover:underline">
                      Edit
                    </button>
                  )}
                </div>
                <div className="px-4 py-4">
                  {!upiEditing && form.upiId ? (
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium">Saved UPI ID</p>
                      <p className="text-sm font-semibold text-gray-800">{form.upiId}</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="UPI ID" error={errors.upiId}>
                        <PInput value={form.upiId} onChange={set("upiId")} placeholder="e.g. name@upi" />
                      </Field>
                      <Field label="Confirm UPI ID" error={errors.confirmUpiId}>
                        <PInput value={form.confirmUpiId} onChange={set("confirmUpiId")} placeholder="Re-enter your UPI ID" />
                      </Field>
                    </div>
                  )}
                </div>
              </div>

              {/* ══ BANK SECTION ══ */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase">Bank Details</p>
                  {!bankEditing && form.accountNumber && (
                    <button onClick={() => setBankEditing(true)} className="text-[11px] font-semibold text-[#0098cc] hover:underline">
                      Edit
                    </button>
                  )}
                </div>
                <div className="px-4 py-4">
                  {!bankEditing && form.accountNumber ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Account Holder", value: form.accountHolderName },
                        { label: "Account Number", value: maskAccount(form.accountNumber) },
                        { label: "IFSC Code", value: form.ifscCode },
                        { label: "Bank Name", value: form.bankName },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-gray-50 rounded-lg px-3 py-2.5">
                          <p className="text-[10px] text-gray-400 font-medium mb-0.5">{label}</p>
                          <p className="text-xs font-semibold text-gray-800">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Account Holder Name" error={errors.accountHolderName}>
                        <PInput value={form.accountHolderName} onChange={set("accountHolderName")} placeholder="Full name as on bank account" />
                      </Field>
                      <Field label="Account Number" error={errors.accountNumber}>
                        <PInput value={form.accountNumber} onChange={set("accountNumber")} type="password" autoComplete="off" placeholder="Enter Bank Account Number" />
                      </Field>
                      <Field label="Confirm Account Number" error={errors.confirmAccountNo}>
                        <PInput value={form.confirmAccountNo} onChange={set("confirmAccountNo")} placeholder="Re-enter account number" />
                      </Field>
                      <Field label="IFSC Code" error={errors.ifscCode}>
                        <PInput
                          value={form.ifscCode}
                          onChange={(e) => {
                            setForm((p) => ({ ...p, ifscCode: e.target.value.toUpperCase() }));
                            setErrors((p) => ({ ...p, ifscCode: "" }));
                            setSaved(false);
                          }}
                          placeholder="e.g. HDFC0001234"
                          maxLength={11}
                        />
                      </Field>
                      <Field label="Bank Name" error={errors.bankName}>
                        <PInput value={form.bankName} onChange={set("bankName")} placeholder="e.g. HDFC Bank" />
                      </Field>
                    </div>
                  )}
                </div>
              </div>

              {errors.global && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
                  {errors.global}
                </p>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200">
          <button onClick={onClose} className={buttonSecondary}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving || saved || !anyEditing}
            className={`${buttonPrimary} flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
            style={saved ? { backgroundColor: "#16a34a" } : undefined}
          >
            {saving ? <><Loader2 size={14} className="animate-spin" />Saving…</>
              : saved ? <><Check size={14} strokeWidth={2.5} />Saved!</>
                : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MY EARNINGS  (main page)
══════════════════════════════════════════════════ */
const ROWS_OPTIONS = [5, 10, 20, 50];

const Myearnings = () => {
  const mentor_id = JSON.parse(localStorage.getItem("userData"))?._id;

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showPayoutPage, setShowPayoutPage] = useState(false);

  const { data: earningsData, isLoading, isFetching, error } =
    useGetMentorEarningsQuery(
      { mentor_id, page: currentPage, limit: rowsPerPage },
      { skip: !mentor_id }
    );

  const {
    bookings = [], pagination = {}, earningsSummary = {}, subscriptions = [],
  } = earningsData || {};

  const {
    totalSessionEarnings = 0, totalSubscriptionRevenue = 0,
    totalSubscriptionDiscount = 0, totalOverallRevenue = 0,
  } = earningsSummary;

  const { totalBookings = 0, totalPages = 1 } = pagination;

  const goTo = (p) => {
    const clamped = Math.max(1, Math.min(p, totalPages));
    if (clamped === currentPage) return;
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = () => {
    if (totalPages <= 1) return [1];
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) range.push(i);
    const pages = [1, ...range, totalPages].filter((v, i, a) => a.indexOf(v) === i && v > 0);
    const withEllipsis = [];
    pages.forEach((p, i) => {
      if (i > 0 && p - pages[i - 1] > 1) withEllipsis.push("…");
      withEllipsis.push(p);
    });
    return withEllipsis;
  };

  const rowStartIndex = (currentPage - 1) * rowsPerPage + 1;

  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center"><Loader /></div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="border border-gray-200 rounded-2xl p-10 max-w-sm text-center">
          <AlertTriangle size={36} strokeWidth={1.5} className="text-gray-300 mx-auto mb-3" />
          <p className="text-xs text-gray-400">{error?.data?.message || "Something went wrong. Please try again later."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`*::-webkit-scrollbar{display:none}*{scrollbar-width:none}`}</style>

      {showPayoutPage && (
        <PayoutDetailsPage userId={mentor_id} onClose={() => setShowPayoutPage(false)} />
      )}

      <div className="min-h-screen bg-white p-5 text-gray-700">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header — same pattern as MentorHelpSupport */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
                <Star size={22} className="text-[#0098cc]" fill="#0098cc" strokeWidth={0} />
                Earnings
              </h1>
              <p className="text-gray-500 mt-2 text-xs">
                Track and manage your mentoring payments
              </p>
            </div>

            <button onClick={() => setShowPayoutPage(true)} className={buttonPrimary}>
              <span className="flex items-center gap-2">
                <CreditCard size={15} />
                My Payouts
              </span>
            </button>
          </div>

          {/* ══ EARNINGS SUMMARY ══ */}
          <div>
            <h2 className="text-sm font-bold mb-4 text-[#1a1a2e]">Earnings Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <StatCard icon={DollarSign} label="Session Earnings" value={`₹${totalSessionEarnings.toLocaleString("en-IN")}`} />
              <StatCard icon={DollarSign} label="Subscription Revenue" value={`₹${totalSubscriptionRevenue.toLocaleString("en-IN")}`} />
              <StatCard icon={AlertTriangle} label="Total Discount" value={`₹${totalSubscriptionDiscount.toLocaleString("en-IN")}`} />
              <StatCard icon={Clock} label="Overall Revenue" value={`₹${totalOverallRevenue.toLocaleString("en-IN")}`} />
            </div>
          </div>

          {/* ══ SUBSCRIPTIONS ══ */}
          {subscriptions.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-sm font-bold text-[#1a1a2e]">
                  Active Subscriptions ({subscriptions.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      {["Mentee ID", "Plan Type", "Total Sessions", "Status", "Original Amount", "Discount", "You Receive", "Subscribed At"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => {
                      const { pricing, menteeId, planType, totalSessions, subscriptionStatus, subscribedAt } = sub;
                      return (
                        <tr key={sub.subscriptionId} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4 text-xs font-medium text-[#1a1a2e]">{menteeId || "—"}</td>
                          <td className="px-6 py-4 text-xs text-gray-500 capitalize">{planType?.replace("_", " ") || "—"}</td>
                          <td className="px-6 py-4 text-xs text-gray-700 font-medium">{totalSessions || "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${subscriptionStatus === "onprocess"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : subscriptionStatus === "completed"
                                  ? "bg-green-50 text-green-700 border border-green-200"
                                  : "bg-gray-100 text-gray-500 border border-gray-200"
                              }`}>
                              {subscriptionStatus === "onprocess" ? "In Process" : subscriptionStatus || "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-700 font-medium">₹{pricing?.originalAmount?.toLocaleString("en-IN") ?? "—"}</td>
                          <td className="px-6 py-4 text-xs text-red-600 font-medium">-₹{pricing?.totalDiscount?.toLocaleString("en-IN") ?? "—"}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-xs font-semibold" style={{ color: "#0098cc" }}>
                              ₹{pricing?.mentorReceives?.toLocaleString("en-IN") ?? "—"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {subscribedAt
                              ? new Date(subscribedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ SESSION BOOKINGS ══ */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-200">
              <h2 className="text-sm font-bold text-[#1a1a2e]">My Sessions</h2>
           
            </div>

            {isFetching && !isLoading && (
              <div className="flex items-center justify-center gap-2 py-2 bg-blue-50 border-b border-blue-100">
                <span className="text-[11px] text-blue-500 font-medium">Loading page {currentPage}…</span>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <Inbox size={38} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm font-medium">No Sessions Found</p>
                <p className="text-xs text-gray-400 mt-1">No sessions to display</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      {["S.No", "Topic", "Mentee", "Date", "Time Slot", "Amount", "Payment Status", "Transaction ID"].map((h) => (
                        <th key={h} className="text-left px-6 py-3 text-[11px] font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, idx) => {
                      const paymentStatus = booking.paymentDetails?.paymentStatus;
                      const globalIdx = rowStartIndex + idx;
                      const isFree = booking.isFreeSession;

                      return (
                        <tr key={booking.bookingId || idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4 text-xs text-gray-400">{globalIdx}</td>
                          <td className="px-6 py-4 text-xs text-[#1a1a2e] font-medium whitespace-nowrap">{booking.topic || "—"}</td>
                          <td className="px-6 py-4 text-xs text-gray-600 whitespace-nowrap">{booking.menteeName || "—"}</td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {booking.sessionDate
                              ? new Date(booking.sessionDate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
                              : "—"}
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                            {booking.startTime && booking.endTime ? `${booking.startTime} – ${booking.endTime}` : "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isFree ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                <Gift size={10} strokeWidth={2.5} />
                                Free
                              </span>
                            ) : (
                              <span className="text-xs font-semibold" style={{ color: "#0098cc" }}>
                                ₹{booking.paymentDetails?.paymentAmount?.toLocaleString("en-IN") ?? "—"}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isFree ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                <Gift size={10} strokeWidth={2.5} />
                                Free Session
                              </span>
                            ) : (
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusStyle(paymentStatus)}`}>
                                {paymentStatus || "—"}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                            {booking.paymentDetails?.transactionId || "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-gray-200">
                <p className="text-[11px] text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-600">{rowStartIndex}–{Math.min(currentPage * rowsPerPage, totalBookings)}</span>
                  {" "}of{" "}
                  <span className="font-semibold text-gray-600">{totalBookings}</span> results
                </p>
                <div className="flex items-center gap-1">
                  <button onClick={() => goTo(1)} disabled={currentPage === 1 || isFetching}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:border-[#0098cc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronsLeft size={13} strokeWidth={2} />
                  </button>
                  <button onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1 || isFetching}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:border-[#0098cc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft size={13} strokeWidth={2} />
                  </button>
                  {pageNumbers().map((p, i) =>
                    p === "…" ? (
                      <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-gray-300 text-xs">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goTo(p)}
                        disabled={isFetching}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold border transition-colors disabled:cursor-not-allowed"
                        style={p === currentPage
                          ? { backgroundColor: "#1a1a2e", color: "#ffffff", borderColor: "#1a1a2e" }
                          : { backgroundColor: "#ffffff", color: "#6b7280", borderColor: "#d1d5db" }}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages || isFetching}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:border-[#0098cc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight size={13} strokeWidth={2} />
                  </button>
                  <button onClick={() => goTo(totalPages)} disabled={currentPage === totalPages || isFetching}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:border-[#0098cc] disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <ChevronsRight size={13} strokeWidth={2} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Myearnings;