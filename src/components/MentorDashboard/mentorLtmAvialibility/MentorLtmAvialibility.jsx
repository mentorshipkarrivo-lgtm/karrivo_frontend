

import React, { useEffect, useState, useMemo } from "react";
import {
  useGetMentorAvailabilityQuery,
  useUpsertMentorAvailabilityMutation,
  useGetMentorUnavailabilityQuery,
  useAddMentorUnavailabilityMutation,
  useDeleteMentorUnavailabilityMutation,
} from "./mentorLtmAvialibilityapislice";
import Loader from "../../../global/Loader";
import {
  Calendar,
  Clock,
  Ban,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

/* ─── Constants ──────────────────────────────────────────────── */
const TIMEZONES = [
  { label: "UTC+05:30 — Asia/Kolkata (IST)", value: "Asia/Kolkata" },
  { label: "UTC+00:00 — Europe/London (GMT)", value: "Europe/London" },
  { label: "UTC+01:00 — Europe/Paris (CET)", value: "Europe/Paris" },
  { label: "UTC+04:00 — Asia/Dubai (GST)", value: "Asia/Dubai" },
  { label: "UTC+05:00 — Asia/Karachi (PKT)", value: "Asia/Karachi" },
  { label: "UTC+08:00 — Asia/Singapore (SGT)", value: "Asia/Singapore" },
  { label: "UTC+09:00 — Asia/Tokyo (JST)", value: "Asia/Tokyo" },
  { label: "UTC+10:00 — Australia/Sydney (AEST)", value: "Australia/Sydney" },
  { label: "UTC-05:00 — America/New_York (EST)", value: "America/New_York" },
  { label: "UTC-08:00 — America/Los_Angeles (PST)", value: "America/Los_Angeles" },
];

const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_IDX = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
const TIMES = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const REASONS = [
  "Family Emergency", "Health Reason", "Personal Reason", "Work Reason",
  "Travel Plans", "Public Holiday", "Conference / Event", "Other",
];
const MONTH_OPTS = [
  { v: 1, l: "1 mo" },
  { v: 3, l: "3 mo" },
  { v: 6, l: "6 mo" },
];

/* ─── Helpers ─────────────────────────────────────────────────── */
const toApiMonths = (set) => [...set].sort((a, b) => a - b);
const fromApiMths = (arr) => new Set((Array.isArray(arr) ? arr : [arr]).map(Number));
const fmtShort = (s) =>
  s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";

const activeBlock = (recs = [], day) => {
  const idx = DAY_IDX[day];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    recs.find((u) => {
      if (!u.daysOfWeek?.includes(idx)) return false;
      const f = new Date(u.unavailableFrom);
      f.setHours(0, 0, 0, 0);
      const t = new Date(u.unavailableTo);
      t.setHours(23, 59, 59, 999);
      return today >= f && today <= t;
    }) || null
  );
};

const findOverlaps = (recs, from, to) => {
  if (!from || !to) return [];
  const f = new Date(from);
  const t = new Date(to);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return recs.filter((u) => {
    const ut = new Date(u.unavailableTo);
    ut.setHours(23, 59, 59, 999);
    if (ut < today) return false;
    const uf = new Date(u.unavailableFrom);
    return uf <= t && ut >= f;
  });
};

/* ─── Shared class tokens ────────────────────────────────────── */
const inputCls =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-xs bg-white text-gray-600 outline-none focus:ring-2 focus:ring-[#0098cc] appearance-none";
const inputErrCls =
  "w-full border border-red-300 rounded-xl px-4 py-2.5 text-xs bg-white text-gray-600 outline-none focus:ring-2 focus:ring-red-300 appearance-none";
const btnPrimary =
  "inline-flex items-center gap-1.5 bg-[#1a1a2e] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed";
const btnOutline =
  "inline-flex items-center gap-1.5 border border-gray-300 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-medium bg-white hover:border-[#0098cc] transition";
const btnDanger =
  "inline-flex items-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-xl transition";

/* ─── Sub-components ─────────────────────────────────────────── */
const Toggle = ({ on, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!on)}
    className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0098cc]/30 ${on ? "bg-[#1a1a2e]" : "bg-gray-200"}`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${on ? "left-[18px]" : "left-0.5"}`}
    />
  </button>
);

const Badge = ({ children, variant = "default" }) => {
  const cls = {
    default: "bg-gray-100 border-gray-200 text-gray-400",
    active: "bg-red-50 border-red-200 text-red-500",
    upcoming: "bg-amber-50 border-amber-200 text-amber-600",
    success: "bg-[#0098cc]/10 border-[#0098cc]/30 text-[#0098cc]",
  }[variant];
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {children}
    </span>
  );
};

const SectionHeader = ({ title, icon: Icon, right }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={15} className="text-[#0098cc]" />}
      <span className="text-sm font-bold text-[#1a1a2e]">{title}</span>
    </div>
    {right && <div>{right}</div>}
  </div>
);

const FormLabel = ({ children }) => (
  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#1a1a2e] mb-1.5">
    {children}
  </label>
);

const DeleteModal = ({ record, onConfirm, onCancel, busy }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm border border-gray-200 p-6">
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
          <Trash2 size={16} className="text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-[#1a1a2e] text-sm">Delete this block?</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {record?.reason} · {fmtShort(record?.unavailableFrom)} – {fmtShort(record?.unavailableTo)}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4">
        <Info size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          Mentee subscriptions that were extended will{" "}
          <strong className="font-semibold">not</strong> be rolled back automatically.
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={onCancel} className={`${btnOutline} flex-1 justify-center`}>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={busy}
          className="flex-1 justify-center inline-flex items-center gap-1.5 bg-red-500 hover:opacity-90 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition disabled:opacity-40"
        >
          {busy ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function MentorAvailability() {
  const mentor_Id = JSON.parse(localStorage.getItem("userData") || "{}")?._id;

  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [delTarget, setDelTarget] = useState(null);
  const [snapshot, setSnapshot] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const [daySlots, setDaySlots] = useState(
    ALL_DAYS.map((d) => ({ day: d, enabled: true, from: "09:00", to: "10:00" }))
  );
  const [spw, setSpw] = useState(1);
  const [tz, setTz] = useState("Asia/Kolkata");
  const [notes, setNotes] = useState("");
  const [months, setMonths] = useState(new Set([1]));

  const [form, setForm] = useState({
    unavailableFrom: "",
    unavailableTo: "",
    daysOfWeek: [],
    timeZone: "Asia/Kolkata",
    reason: "",
    customReason: "",
    notes: "",
  });

  const { data: availData, isLoading: loadA } = useGetMentorAvailabilityQuery(mentor_Id, { skip: !mentor_Id });
  const { data: unavailData, isLoading: loadU } = useGetMentorUnavailabilityQuery(mentor_Id, { skip: !mentor_Id });
  const [upsert, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
  const [addBlock, { isLoading: addingBlock }] = useAddMentorUnavailabilityMutation();
  const [delBlock, { isLoading: deletingBlock }] = useDeleteMentorUnavailabilityMutation();

  const unavailRecs = unavailData?.data || [];
  const enabledSlots = daySlots.filter((s) => s.enabled);
  const apiMonths = toApiMonths(months);

  useEffect(() => {
    if (!availData?.success || !availData.data) return;
    const d = availData.data;
    const slots = ALL_DAYS.map((day) => {
      const s = d.daySlots?.find((x) => x.day === day);
      return s
        ? { day, enabled: true, from: s.from, to: s.to }
        : { day, enabled: false, from: "09:00", to: "10:00" };
    });
    setDaySlots(slots);
    setSpw(d.availableDaysPerWeek || 1);
    setTz(d.timeZone || "Asia/Kolkata");
    setNotes(d.notes || "");
    setMonths(fromApiMths(d.availableForMonths ?? 1));
    setSaved(true);
    setEditMode(false);
  }, [availData]);

  useEffect(() => {
    const { unavailableFrom, unavailableTo } = form;
    if (!unavailableFrom || !unavailableTo) {
      setForm((p) => ({ ...p, daysOfWeek: [] }));
      return;
    }
    const idxs = enabledSlots.map((s) => DAY_IDX[s.day]);
    const aff = new Set();
    for (
      let d = new Date(unavailableFrom);
      d <= new Date(unavailableTo);
      d.setDate(d.getDate() + 1)
    ) {
      const jsDay = d.getDay();
      if (idxs.includes(jsDay)) aff.add(jsDay);
    }
    setForm((p) => ({ ...p, daysOfWeek: [...aff] }));
  }, [form.unavailableFrom, form.unavailableTo]);

  const overlaps = useMemo(
    () => findOverlaps(unavailRecs, form.unavailableFrom, form.unavailableTo),
    [form.unavailableFrom, form.unavailableTo, unavailRecs]
  );
  const hasOverlap = overlaps.length > 0;
  const dateOrderErr =
    form.unavailableFrom && form.unavailableTo && form.unavailableTo < form.unavailableFrom;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const snap = () => ({ slots: [...daySlots], spw, tz, notes, months: new Set(months) });

  const handleEdit = () => { setSnapshot(snap()); setEditMode(true); };
  const handleCancel = () => {
    if (snapshot) {
      setDaySlots(snapshot.slots);
      setSpw(snapshot.spw);
      setTz(snapshot.tz);
      setNotes(snapshot.notes);
      setMonths(snapshot.months);
    }
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      await upsert({
        mentor_Id,
        daySlots: enabledSlots.map(({ day, from, to }) => ({ day, from, to })),
        availableDaysPerWeek: spw,
        timeZone: tz,
        notes,
        availableForMonths: apiMonths,
      }).unwrap();
      setSaved(true);
      setEditMode(false);
      showToast("Schedule saved ✓");
    } catch (e) { console.error(e); }
  };

  const handleAddBlock = async (e) => {
    e.preventDefault();
    if (hasOverlap || dateOrderErr) return;
    const reason = form.reason === "Other" ? form.customReason.trim() || "Other" : form.reason;
    try {
      const res = await addBlock({ mentor_Id, ...form, reason }).unwrap();
      setShowModal(false);
      setForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone: tz, reason: "", customReason: "", notes: "" });
      const count = res?.data?.subscriptionsExtended;
      showToast(count ? `Block added. ${count} subscription(s) auto-extended ✓` : "Block added ✓");
    } catch (e) { console.error(e); }
  };

  const handleDelete = async () => {
    // console.log(mentor_Id,delTarget._id,"deletedata")
    try {
      await delBlock({ mentor_Id}).unwrap();
      setDelTarget(null);
      showToast("Block removed");
    } catch (e) { console.error(e); }
  };

  if (loadA || loadU) return <Loader />;

  const affectedDays = [...(form.daysOfWeek ?? [])]
    .sort((a, b) => a - b)
    .map((i) => ALL_DAYS.find((d) => DAY_IDX[d] === i))
    .filter(Boolean);

  const submitDisabled =
    addingBlock ||
    !affectedDays.length ||
    !form.reason ||
    (form.reason === "Other" && !form.customReason.trim()) ||
    hasOverlap ||
    !!dateOrderErr;

  const showView = saved && !editMode;
  const allEnabled = daySlots.every((s) => s.enabled);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.15) sepia(0.3) hue-rotate(220deg) saturate(1.5);
          cursor: pointer;
        }
        select option { background: #fff; color: #1a1a2e; }
        .scroll-thin::-webkit-scrollbar { width: 3px; }
        .scroll-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
        .col-scroll::-webkit-scrollbar { width: 3px; }
        .col-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade { animation: fadeUp .2s ease both; }
      `}</style>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-[#1a1a2e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg anim-fade">
          <CheckCircle2 size={14} className="text-green-400" />
          {toastMsg}
        </div>
      )}

      {/* Page header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <Calendar size={20} className="text-[#0098cc]" />
              Availability
            </h1>
            <p className="text-gray-400 mt-1 text-xs">
              Manage your weekly schedule and blocked dates in one place
            </p>
          </div>
          <div className="flex items-center gap-2">
            {showView ? (
              <button onClick={handleEdit} className={btnOutline}>
                <Edit2 size={13} /> Edit Schedule
              </button>
            ) : (
              <>
                {editMode && (
                  <button onClick={handleCancel} className={btnOutline}>
                    <X size={13} /> Discard
                  </button>
                )}
                <button onClick={handleSave} disabled={saving} className={btnPrimary}>
                  <Save size={13} />
                  {saving ? "Saving…" : "Save Schedule"}
                </button>
              </>
            )}
            {/* <button onClick={() => setShowModal(true)} className={btnPrimary}>
              <Plus size={13} /> Block Dates
            </button> */}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex divide-x divide-gray-200" style={{ minHeight: "calc(100vh - 85px)" }}>

        {/* ── LEFT: Weekly Schedule ── */}
        <div className="w-1/2 p-6 overflow-y-auto col-scroll">

          {editMode && (
            <div className="flex items-center gap-2 mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
              <AlertCircle size={13} className="flex-shrink-0 text-amber-500" />
              Editing — save when done or discard to revert.
            </div>
          )}

          {/* ── VIEW MODE ── */}
          {/* ── VIEW MODE ── */}
          {showView && (
            <div className="anim-fade space-y-5">
              <div>
                <SectionHeader title="Capacity & Timezone" icon={Clock} />
                <div className="space-y-4">
                  <div>
                    <FormLabel>Availabe Days Per Week</FormLabel>    
                                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <div
                          key={n}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold text-center ${spw === n
                            ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                            : "bg-white border-gray-200 text-gray-300"
                            }`}
                        >
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FormLabel>Available Plans</FormLabel>
                    <div className="flex gap-1.5">
                      {MONTH_OPTS.map(({ v, l }) => {
                        const on = months.has(v);
                        return (
                          <div
                            key={v}
                            className={`flex-1 py-2 rounded-xl border text-xs font-semibold text-center ${on
                              ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                              : "bg-white border-gray-200 text-gray-300"
                              }`}
                          >
                            {l}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <FormLabel>Timezone</FormLabel>
                    <div className={`${inputCls} flex items-center cursor-default opacity-90`}>
                      {TIMEZONES.find((t) => t.value === tz)?.label || tz}
                    </div>
                  </div>
                </div>
              </div>

              {notes && (
                <div>
                  <SectionHeader title="Notes for Learners" icon={Info} />
                  <p className="text-xs text-gray-500 italic bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                    {notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── EDIT MODE ── */}
          {!showView && (
            <div className="anim-fade space-y-5">
              {/* Capacity & Timezone */}
              <div>
                <SectionHeader title="Capacity & Timezone" icon={Clock} />
                <div className="space-y-4">
                  <div>
                    <FormLabel>Select the days of the week you're available</FormLabel>                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setSpw(n)}
                          className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition ${spw === n
                            ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                            : "bg-white border-gray-300 text-gray-400 hover:border-[#0098cc] hover:text-[#0098cc]"
                            }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <FormLabel>Available Plans</FormLabel>
                    <div className="flex gap-1.5">
                      {MONTH_OPTS.map(({ v, l }) => {
                        const on = months.has(v);
                        return (
                          <button
                            key={v}
                            type="button"
                            onClick={() =>
                              setMonths((p) => {
                                const n = new Set(p);
                                if (n.has(v)) { if (n.size > 1) n.delete(v); } else { n.add(v); }
                                return n;
                              })
                            }
                            className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition ${on
                              ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                              : "bg-white border-gray-300 text-gray-400 hover:border-[#0098cc] hover:text-[#0098cc]"
                              }`}
                          >
                            {l}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <FormLabel>Timezone</FormLabel>
                    <div className="relative">
                      <select value={tz} onChange={(e) => setTz(e.target.value)} className={inputCls}>
                        {TIMEZONES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                      <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly days */}
              {/* <div>
                <SectionHeader
                  title="Weekly Days"
                  icon={Calendar}
                  right={
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{enabledSlots.length} active</span>
                      <button
                        type="button"
                        onClick={() => setDaySlots((p) => p.map((s) => ({ ...s, enabled: !allEnabled })))}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-xl border transition ${
                          allEnabled
                            ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                            : "bg-white border-gray-300 text-gray-400 hover:border-[#0098cc] hover:text-[#0098cc]"
                        }`}
                      >
                        {allEnabled ? "Deselect all" : "Select all"}
                      </button>
                    </div>
                  }
                />
                <div className="space-y-2">
                  {daySlots.map((slot, i) => (
                    <div
                      key={`${slot.day}-${i}`}
                      className={`flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-xl border transition ${
                        slot.enabled ? "border-gray-200 bg-white" : "border-dashed border-gray-200 bg-gray-50/60"
                      }`}
                    >
                      <Toggle
                        on={slot.enabled}
                        onChange={() =>
                          setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s))
                        }
                      />
                      <span className={`text-[10px] font-mono font-bold uppercase w-7 ${slot.enabled ? "text-[#1a1a2e]" : "text-gray-300"}`}>
                        {slot.day}
                      </span>

                      {slot.enabled ? (
                        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                          {[["from", "From"], ["to", "To"]].map(([f, lbl]) => (
                            <div key={f} className="flex items-center gap-1">
                              <span className="text-[10px] text-gray-400">{lbl}</span>
                              <select
                                value={slot[f]}
                                onChange={(e) =>
                                  setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, [f]: e.target.value } : s))
                                }
                                className="bg-white border border-gray-300 text-[#1a1a2e] rounded-lg px-2 py-1 text-[11px] font-mono font-semibold outline-none focus:ring-2 focus:ring-[#0098cc] transition cursor-pointer"
                              >
                                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                          ))}
                          <span className="text-[10px] text-gray-400 font-mono ml-auto">
                            {Math.max(parseInt(slot.to) - parseInt(slot.from), 0)}h
                          </span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setDaySlots((p) => { const c = [...p]; c.splice(i + 1, 0, { ...slot }); return c; })
                              }
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#0098cc]/10 border border-[#0098cc]/30 hover:bg-[#0098cc]/20 transition"
                            >
                              <Plus size={11} className="text-[#0098cc]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDaySlots((p) => p.filter((_, idx) => idx !== i))}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition"
                            >
                              <X size={11} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Rest day</span>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Notes */}
              <div>
                <SectionHeader title="Notes for Learners" icon={Info} />
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Come prepared with weekly goals…"
                  className={`${inputCls} resize-y leading-relaxed`}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Blocked Dates ── */}
        <div className="w-1/2 p-6 overflow-y-auto col-scroll bg-gray-50/40">
          <SectionHeader
            title="Blocked Dates"
            icon={Ban}
            right={
              unavailRecs.length > 0 && (
                <span className="text-[10px] bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full font-bold text-gray-400">
                  {unavailRecs.length}
                </span>
              )
            }
          />

          <div className="flex items-start gap-2 mb-4 bg-[#0098cc]/8 border border-[#0098cc]/25 rounded-xl px-3.5 py-3 text-xs text-[#1a1a2e]/70">
            <Info size={12} className="text-[#0098cc] flex-shrink-0 mt-0.5" />
            <p>Blocking a date range auto-extends affected mentee subscriptions by the exact working days lost.</p>
          </div>

          {!unavailRecs.length ? (
            <div className="border border-dashed border-gray-200 rounded-2xl p-12 text-center bg-white">
              <div className="w-10 h-10 rounded-xl bg-[#0098cc]/10 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={18} className="text-[#0098cc]/50" />
              </div>
              <p className="font-semibold text-gray-800 text-sm">No blocked periods</p>
              <p className="text-xs text-gray-400 mt-1">All your days are currently open.</p>
              <button onClick={() => setShowModal(true)} className={`${btnPrimary} mx-auto mt-4`}>
                <Plus size={13} /> Block a date range
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {unavailRecs.map((u) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const from = new Date(u.unavailableFrom);
                from.setHours(0, 0, 0, 0);
                const to = new Date(u.unavailableTo);
                to.setHours(23, 59, 59, 999);
                const isActive = today >= from && today <= to;
                const isPast = new Date(u.unavailableTo) < new Date();
                const blocked = [...(u.daysOfWeek || [])]
                  .sort((a, b) => a - b)
                  .map((i) => ALL_DAYS.find((d) => DAY_IDX[d] === i))
                  .filter(Boolean);
                const status = isActive ? "active" : isPast ? "default" : "upcoming";
                const statusLbl = isActive ? "Active" : isPast ? "Past" : "Upcoming";

                return (
                  <div
                    key={u._id}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition ${isPast ? "opacity-60" : ""
                      } ${isActive ? "border-red-200" : "border-gray-200"}`}
                  >
                    <div
                      className={`flex items-center justify-between px-4 py-2.5 border-b ${isActive ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <Badge variant={status}>{statusLbl}</Badge>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {fmtShort(u.unavailableFrom)} → {fmtShort(u.unavailableTo)}
                        </span>
                      </div>
                      <button onClick={() => setDelTarget(u)} className={btnDanger}>
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-800 text-sm mb-2.5">{u.reason}</p>
                      {blocked.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {blocked.map((d) => {
                            const sl = enabledSlots.find((s) => s.day === d);
                            return (
                              <span
                                key={d}
                                className="text-[11px] bg-red-50 border border-red-200 text-red-500 font-mono px-2.5 py-1 rounded-full"
                              >
                                {d}{sl ? ` ${sl.from}–${sl.to}` : ""}
                              </span>
                            );
                          })}
                        </div>
                      )}
                      {u.notes && <p className="text-xs text-gray-400 italic mt-2.5">{u.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── ADD BLOCK MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md border border-gray-200 my-4 anim-fade">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div>
                <p className="font-semibold text-[#1a1a2e] text-sm">Block a Date Range</p>
                <p className="text-xs text-gray-400 mt-0.5">Affected mentee plans will be auto-extended</p>
              </div>
              <button onClick={() => setShowModal(false)}>
                <X className="text-gray-500" size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBlock} className="p-6 space-y-4 scroll-thin overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-3">
                {[["unavailableFrom", "From"], ["unavailableTo", "To"]].map(([key, lbl]) => (
                  <div key={key}>
                    <FormLabel>{lbl} <span className="text-red-400">*</span></FormLabel>
                    <input
                      type="date"
                      required
                      value={form[key]}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                      className={hasOverlap || dateOrderErr ? inputErrCls : inputCls}
                    />
                  </div>
                ))}
              </div>

              {dateOrderErr && (
                <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                  <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                  "To" date must be on or after "From" date.
                </div>
              )}

              {!dateOrderErr && hasOverlap && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <AlertTriangle size={13} className="flex-shrink-0" />
                    Overlaps with {overlaps.length} existing block{overlaps.length > 1 ? "s" : ""} — choose different dates.
                  </div>
                  <div className="flex flex-col gap-1 pl-5">
                    {overlaps.map((o) => (
                      <span key={o._id} className="text-red-500 font-mono opacity-80">
                        · {o.reason} &nbsp;({fmtShort(o.unavailableFrom)} – {fmtShort(o.unavailableTo)})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {form.unavailableFrom && form.unavailableTo && !dateOrderErr && !hasOverlap && (
                <div className={`rounded-xl p-3 border text-xs ${affectedDays.length ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
                  {affectedDays.length ? (
                    <>
                      <p className="text-red-600 font-semibold mb-2">
                        {affectedDays.length} working day{affectedDays.length > 1 ? "s" : ""} blocked — mentee plans extended by same amount:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {affectedDays.map((d) => {
                          const sl = enabledSlots.find((s) => s.day === d);
                          return (
                            <span key={d} className="bg-white border border-red-200 text-red-500 font-mono text-[11px] px-2.5 py-1 rounded-full">
                              {d}{sl ? ` ${sl.from}–${sl.to}` : ""}
                            </span>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <p className="text-amber-700 flex items-center gap-1.5">
                      <AlertCircle size={12} />
                      No working days fall in this range — nothing will be blocked.
                    </p>
                  )}
                </div>
              )}

              <div>
                <FormLabel>Reason <span className="text-red-400">*</span></FormLabel>
                <div className="relative">
                  <select
                    required
                    value={form.reason}
                    onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))}
                    className={inputCls}
                  >
                    <option value="" disabled>Select a reason…</option>
                    {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {form.reason === "Other" && (
                  <input
                    type="text"
                    required
                    placeholder="Describe your reason…"
                    value={form.customReason}
                    onChange={(e) => setForm((p) => ({ ...p, customReason: e.target.value }))}
                    className={`${inputCls} mt-2`}
                  />
                )}
              </div>

              <div>
                <FormLabel>Timezone <span className="text-red-400">*</span></FormLabel>
                <div className="relative">
                  <select
                    required
                    value={form.timeZone}
                    onChange={(e) => setForm((p) => ({ ...p, timeZone: e.target.value }))}
                    className={inputCls}
                  >
                    {TIMEZONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <FormLabel>Notes <span className="text-[10px] font-normal normal-case tracking-normal text-gray-400">(optional)</span></FormLabel>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Context for learners…"
                  className={`${inputCls} resize-y`}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setShowModal(false)} className={`${btnOutline} flex-1 justify-center`}>
                  Cancel
                </button>
                <button type="submit" disabled={submitDisabled} className={`${btnPrimary} flex-1 justify-center`}>
                  {addingBlock ? "Saving…" : "Confirm Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delTarget && (
        <DeleteModal
          record={delTarget}
          onConfirm={handleDelete}
          onCancel={() => setDelTarget(null)}
          busy={deletingBlock}
        />
      )}
    </div>
  );
}








