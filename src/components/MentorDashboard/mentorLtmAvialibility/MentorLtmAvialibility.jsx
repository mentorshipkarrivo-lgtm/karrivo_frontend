


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
const calcEnd = (start, m) => {
  if (!start || !m) return null;
  const d = new Date(start);
  d.setMonth(d.getMonth() + m);
  return d;
};

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

/* ─── Sub-components ─────────────────────────────────────────── */
const Toggle = ({ on, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!on)}
    className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#0098cc]/40 ${on ? "bg-[#0098cc]" : "bg-slate-200"
      }`}
  >
    <span
      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${on ? "left-[18px]" : "left-0.5"
        }`}
    />
  </button>
);

const Badge = ({ children, variant = "default" }) => {
  const cls = {
    default: "bg-slate-100 border-slate-200 text-slate-500",
    active: "bg-red-50 border-red-200 text-red-500",
    upcoming: "bg-amber-50 border-amber-200 text-amber-600",
    success: "bg-sky-50 border-sky-200 text-[#0098cc]",
  }[variant];
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, icon: Icon, right }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-[#0098cc]" />}
      <span className="text-xs font-semibold text-slate-700 tracking-wide">{title}</span>
    </div>
    {right && <div>{right}</div>}
  </div>
);

const FormLabel = ({ children }) => (
  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#0098cc] mb-1.5">
    {children}
  </label>
);

const inputCls =
  "w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10 transition placeholder:text-slate-400 appearance-none";
const inputErrCls =
  "w-full bg-white border border-red-300 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/10 transition placeholder:text-slate-400 appearance-none";

const btnPrimary =
  "inline-flex items-center gap-1.5 bg-[#1a1a2e] hover:bg-[#2a2a45] text-white text-sm font-semibold px-4 py-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed";
const btnOutline =
  "inline-flex items-center gap-1.5 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg transition";
const btnDanger =
  "inline-flex items-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg transition";

const DeleteModal = ({ record, onConfirm, onCancel, busy }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white border border-red-200 rounded-xl w-full max-w-sm p-6 shadow-2xl">
      <div className="flex gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
          <Trash2 size={16} className="text-red-500" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">Delete this block?</p>
          <p className="text-xs text-slate-500 mt-0.5">
            {record?.reason} · {fmtShort(record?.unavailableFrom)} – {fmtShort(record?.unavailableTo)}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-4">
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
          className="flex-1 justify-center inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition disabled:opacity-40"
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

  const [tab, setTab] = useState("schedule");
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

  const { data: availData, isLoading: loadA } = useGetMentorAvailabilityQuery(mentor_Id, {
    skip: !mentor_Id,
  });
  const { data: unavailData, isLoading: loadU } = useGetMentorUnavailabilityQuery(mentor_Id, {
    skip: !mentor_Id,
  });
  const [upsert, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
  const [addBlock, { isLoading: addingBlock }] = useAddMentorUnavailabilityMutation();
  const [delBlock, { isLoading: deletingBlock }] = useDeleteMentorUnavailabilityMutation();

  const unavailRecs = unavailData?.data || [];
  const enabledSlots = daySlots.filter((s) => s.enabled);
  const apiMonths = toApiMonths(months);

  /* ── Load saved data ── */
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

  /* ── Auto-compute affected days ── */
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

  /* ── Overlap detection ── */
  const overlaps = useMemo(
    () => findOverlaps(unavailRecs, form.unavailableFrom, form.unavailableTo),
    [form.unavailableFrom, form.unavailableTo, unavailRecs]
  );
  const hasOverlap = overlaps.length > 0;
  const dateOrderErr =
    form.unavailableFrom &&
    form.unavailableTo &&
    form.unavailableTo < form.unavailableFrom;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };
  const snap = () => ({
    slots: [...daySlots],
    spw,
    tz,
    notes,
    months: new Set(months),
  });

  const handleEdit = () => {
    setSnapshot(snap());
    setEditMode(true);
  };
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
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddBlock = async (e) => {
    e.preventDefault();
    if (hasOverlap || dateOrderErr) return;
    const reason =
      form.reason === "Other" ? form.customReason.trim() || "Other" : form.reason;
    try {
      const res = await addBlock({ mentor_Id, ...form, reason }).unwrap();
      setShowModal(false);
      setForm({
        unavailableFrom: "",
        unavailableTo: "",
        daysOfWeek: [],
        timeZone: tz,
        reason: "",
        customReason: "",
        notes: "",
      });
      const count = res?.data?.subscriptionsExtended;
      showToast(
        count
          ? `Block added. ${count} subscription(s) auto-extended ✓`
          : "Block added ✓"
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      await delBlock({ mentor_Id, unavailId: delTarget._id }).unwrap();
      setDelTarget(null);
      showToast("Block removed");
    } catch (e) {
      console.error(e);
    }
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
    <div className="min-h-screen ">
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.4) sepia(1) hue-rotate(180deg) saturate(2);
          cursor: pointer;
        }
        select option { background: #fff; color: #1e293b; }
        .scroll-thin::-webkit-scrollbar { width: 3px; }
        .scroll-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-slide { animation: slideDown .2s ease both; }
        .anim-fade  { animation: fadeUp .2s ease both; }
      `}</style>

      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-white border border-[#0098cc]/30 text-[#0098cc] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg anim-fade">
          <CheckCircle2 size={14} />
          {toastMsg}
        </div>
      )}

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0098cc]/10 flex items-center justify-center">
                  <Calendar size={16} className="text-[#0098cc]" />
                </div>
                <h1 className="text-lg font-bold text-slate-900">Manage Availability</h1>
              </div>
              <p className="text-xs text-slate-500 mt-1 ml-10.5">
                Set your weekly schedule and block dates when you're unavailable
              </p>
            </div>

            {/* Header actions */}
            <div className="flex items-center gap-2">
              {tab === "schedule" && showView && (
                <button onClick={handleEdit} className={btnOutline}>
                  <Edit2 size={13} /> Edit
                </button>
              )}
              {tab === "schedule" && !showView && (
                <>
                  {editMode && (
                    <button onClick={handleCancel} className={btnOutline}>
                      <X size={13} /> Discard
                    </button>
                  )}
                  <button onClick={handleSave} disabled={saving} className={btnPrimary}>
                    <Save size={13} />
                    {saving ? "Saving…" : "Save"}
                  </button>
                </>
              )}
              {tab === "unavailability" && (
                <button onClick={() => setShowModal(true)} className={btnPrimary}>
                  <Plus size={13} /> Add Block
                </button>
              )}
            </div>
          </div>

          {/* ── Tab Bar ── */}
          <div className="flex gap-1 mt-4">
            {[
              { key: "schedule", label: "Schedule", icon: Calendar },
              { key: "unavailability", label: "Blocked Dates", icon: Ban },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition border ${tab === key
                  ? "bg-[#0098cc]/8 border-[#0098cc]/30 text-[#0098cc]"
                  : "text-slate-500 hover:text-slate-700 border-transparent hover:bg-slate-100"
                  }`}
              >
                <Icon size={12} />
                {label}
                {key === "unavailability" && unavailRecs.length > 0 && (
                  <span className="text-[9px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full font-bold text-slate-500">
                    {unavailRecs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-3xl mx-auto px-4 py-5">

        {/* ════ SCHEDULE TAB ════ */}
        {tab === "schedule" && (
          <>
            {/* ── View Mode ── */}
            {showView && (
              <div className="anim-slide">
                <Card>
                  <CardHeader
                    title="Weekly Schedule"
                    icon={Calendar}
                    right={
                      <span className="text-[10px] text-slate-400 font-medium">
                        {tz.replace(/_/g, " ")}
                      </span>
                    }
                  />
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {ALL_DAYS.map((day) => {
                        const slot = daySlots.find((s) => s.day === day);
                        const block = slot?.enabled ? activeBlock(unavailRecs, day) : null;
                        return (
                          <div
                            key={day}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs transition ${block
                              ? "border-red-200 bg-red-50"
                              : slot?.enabled
                                ? "border-slate-200 bg-white"
                                : "border-dashed border-slate-200 bg-slate-50/50"
                              }`}
                          >
                            <span
                              className={`font-mono font-bold text-[10px] uppercase w-7 flex-shrink-0 ${block
                                ? "text-red-500"
                                : slot?.enabled
                                  ? "text-[#0098cc]"
                                  : "text-slate-300"
                                }`}
                            >
                              {day}
                            </span>
                            {slot?.enabled && !block && (
                              <>
                                <Clock size={10} className="text-slate-300 flex-shrink-0" />
                                <span className="text-slate-700">
                                  {slot.from} – {slot.to}
                                </span>
                              </>
                            )}
                            {block && (
                              <span className="text-red-500 text-[11px]">
                                Blocked until {fmtShort(block.unavailableTo)}
                              </span>
                            )}
                            {!slot?.enabled && (
                              <span className="text-slate-400 italic text-[11px]">Rest day</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                      <span>
                        <strong className="text-[#0098cc] font-semibold">{spw}</strong>{" "}
                        session{spw > 1 ? "s" : ""}/week
                      </span>
                      <span className="text-slate-300">·</span>
                      <span>
                        Plans:{" "}
                        <strong className="text-[#0098cc] font-semibold">
                          {apiMonths.map((m) => `${m}mo`).join(", ")}
                        </strong>
                      </span>
                      {notes && (
                        <>
                          <span className="text-slate-300">·</span>
                          <span className="italic text-slate-400">{notes}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* ── Edit Mode ── */}
            {!showView && (
              <div className="anim-fade">
                {editMode && (
                  <div className="flex items-center gap-2 mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                    <AlertCircle size={13} className="flex-shrink-0 text-amber-500" />
                    Editing — unsaved changes won't be applied until you save.
                  </div>
                )}

                {/* Capacity & Timezone */}
                <Card>
                  <CardHeader title="Capacity & Timezone" icon={Clock} />
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Sessions per week */}
                    <div>
                      <FormLabel>Sessions / Week</FormLabel>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setSpw(n)}
                            className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition ${spw === n
                              ? "bg-[#0098cc]/10 border-[#0098cc]/40 text-[#0098cc]"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                              }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Available Plans */}
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
                                  if (n.has(v)) {
                                    if (n.size > 1) n.delete(v);
                                  } else {
                                    n.add(v);
                                  }
                                  return n;
                                })
                              }
                              className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition ${on
                                ? "bg-[#0098cc]/10 border-[#0098cc]/40 text-[#0098cc]"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                                }`}
                            >
                              {l}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timezone */}
                    <div>
                      <FormLabel>Timezone</FormLabel>
                      <div className="relative">
                        <select
                          value={tz}
                          onChange={(e) => setTz(e.target.value)}
                          className={inputCls}
                        >
                          {TIMEZONES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={13}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Weekly Schedule */}
                <Card>
                  <CardHeader
                    title="Weekly Schedule"
                    icon={Calendar}
                    right={
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          {enabledSlots.length} active
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setDaySlots((p) =>
                              p.map((s) => ({ ...s, enabled: !allEnabled }))
                            )
                          }
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition ${allEnabled
                            ? "bg-[#0098cc]/10 border-[#0098cc]/30 text-[#0098cc]"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                            }`}
                        >
                          {allEnabled ? "Deselect all" : "Select all"}
                        </button>
                      </div>
                    }
                  />
                  <div className="p-4 space-y-2">
                    {daySlots.map((slot, i) => (
                      <div
                        key={`${slot.day}-${i}`}
                        className={`flex flex-wrap items-center gap-2.5 px-3 py-2.5 rounded-lg border transition ${slot.enabled
                          ? "border-slate-200 bg-white"
                          : "border-dashed border-slate-200 bg-slate-50/60"
                          }`}
                      >
                        <Toggle
                          on={slot.enabled}
                          onChange={() =>
                            setDaySlots((p) =>
                              p.map((s, idx) =>
                                idx === i ? { ...s, enabled: !s.enabled } : s
                              )
                            )
                          }
                        />
                        <span
                          className={`text-[10px] font-mono font-bold uppercase w-7 ${slot.enabled ? "text-[#0098cc]" : "text-slate-300"
                            }`}
                        >
                          {slot.day}
                        </span>

                        {slot.enabled ? (
                          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                            {[
                              ["from", "From"],
                              ["to", "To"],
                            ].map(([f, lbl]) => (
                              <div key={f} className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400">{lbl}</span>
                                <select
                                  value={slot[f]}
                                  onChange={(e) =>
                                    setDaySlots((p) =>
                                      p.map((s, idx) =>
                                        idx === i ? { ...s, [f]: e.target.value } : s
                                      )
                                    )
                                  }
                                  className="bg-white border border-slate-200 text-[#0098cc] rounded-lg px-2 py-1 text-[11px] font-mono font-semibold outline-none focus:border-[#0098cc] transition cursor-pointer"
                                >
                                  {TIMES.map((t) => (
                                    <option key={t} value={t}>
                                      {t}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ))}
                            <span className="text-[10px] text-slate-400 font-mono ml-auto sm:ml-0">
                              {Math.max(parseInt(slot.to) - parseInt(slot.from), 0)}h
                            </span>
                            <div className="ml-auto flex gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  setDaySlots((p) => {
                                    const c = [...p];
                                    c.splice(i + 1, 0, { ...slot });
                                    return c;
                                  })
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#0098cc]/8 border border-[#0098cc]/20 hover:bg-[#0098cc]/15 transition"
                                title="Add slot"
                              >
                                <Plus size={11} className="text-[#0098cc]" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setDaySlots((p) => p.filter((_, idx) => idx !== i))
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 transition"
                                title="Remove slot"
                              >
                                <X size={11} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Rest day</span>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader title="Notes for Learners" icon={Info} />
                  <div className="p-4">
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Come prepared with weekly goals…"
                      className={`${inputCls} resize-y leading-relaxed`}
                    />
                  </div>
                </Card>

                <div className="flex justify-end gap-2 mt-1">
                  {editMode && (
                    <button onClick={handleCancel} className={btnOutline}>
                      <X size={13} /> Discard
                    </button>
                  )}
                  <button onClick={handleSave} disabled={saving} className={btnPrimary}>
                    <Save size={13} />
                    {saving ? "Saving…" : "Save Schedule"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ════ BLOCKED DATES TAB ════ */}
        {tab === "unavailability" && (
          <div className="anim-slide">
            <div className="flex items-start gap-2.5 mb-4 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-xs text-sky-700">
              <Info size={13} className="text-sky-500 flex-shrink-0 mt-0.5" />
              <p>
                Blocking a date range automatically extends all affected mentee subscriptions
                by the exact working days lost — so they always receive their full plan.
              </p>
            </div>

            {!unavailRecs.length ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-xl p-14 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#0098cc]/8 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={22} className="text-[#0098cc] opacity-50" />
                </div>
                <p className="font-semibold text-slate-800 text-sm">No blocked periods</p>
                <p className="text-xs text-slate-400 mt-1">All your days are currently open.</p>
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
                      className={`bg-white border rounded-xl overflow-hidden shadow-sm transition ${isPast ? "opacity-60" : ""
                        } ${isActive ? "border-red-200" : "border-slate-200"}`}
                    >
                      <div
                        className={`flex items-center justify-between px-4 py-2.5 border-b ${isActive
                          ? "border-red-200 bg-red-50"
                          : "border-slate-200 bg-slate-50"
                          }`}
                      >
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <Badge variant={status}>{statusLbl}</Badge>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {fmtShort(u.unavailableFrom)} → {fmtShort(u.unavailableTo)}
                          </span>
                        </div>
                        <button
                          onClick={() => setDelTarget(u)}
                          className={btnDanger}
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-slate-800 text-sm mb-2.5">
                          {u.reason}
                        </p>
                        {blocked.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {blocked.map((d) => {
                              const sl = enabledSlots.find((s) => s.day === d);
                              return (
                                <span
                                  key={d}
                                  className="text-[11px] bg-red-50 border border-red-200 text-red-500 font-mono px-2.5 py-1 rounded-lg"
                                >
                                  {d}
                                  {sl ? ` ${sl.from}–${sl.to}` : ""}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        {u.notes && (
                          <p className="text-xs text-slate-400 italic mt-2.5">{u.notes}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ════ ADD BLOCK MODAL ════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md my-4 anim-fade">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
              <div>
                <p className="font-semibold text-slate-900 text-sm">Block a Date Range</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Affected mentee plans will be auto-extended
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 transition p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={handleAddBlock}
              className="p-5 space-y-4 scroll-thin overflow-y-auto max-h-[70vh]"
            >
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["unavailableFrom", "From"],
                  ["unavailableTo", "To"],
                ].map(([key, lbl]) => (
                  <div key={key}>
                    <FormLabel>
                      {lbl} <span className="text-red-400">*</span>
                    </FormLabel>
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

              {/* Date order error */}
              {dateOrderErr && (
                <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                  <AlertCircle size={13} className="text-amber-500 flex-shrink-0" />
                  "To" date must be on or after "From" date.
                </div>
              )}

              {/* Overlap error */}
              {!dateOrderErr && hasOverlap && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <AlertTriangle size={13} className="flex-shrink-0" />
                    Overlaps with {overlaps.length} existing block
                    {overlaps.length > 1 ? "s" : ""} — choose different dates.
                  </div>
                  <div className="flex flex-col gap-1 pl-5">
                    {overlaps.map((o) => (
                      <span key={o._id} className="text-red-500 font-mono opacity-80">
                        · {o.reason} &nbsp;({fmtShort(o.unavailableFrom)} –{" "}
                        {fmtShort(o.unavailableTo)})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Affected days preview */}
              {form.unavailableFrom &&
                form.unavailableTo &&
                !dateOrderErr &&
                !hasOverlap && (
                  <div
                    className={`rounded-lg p-3 border text-xs ${affectedDays.length
                      ? "border-red-200 bg-red-50"
                      : "border-amber-200 bg-amber-50"
                      }`}
                  >
                    {affectedDays.length ? (
                      <>
                        <p className="text-red-600 font-semibold mb-2">
                          {affectedDays.length} working day
                          {affectedDays.length > 1 ? "s" : ""} blocked — mentee plans
                          extended by same amount:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {affectedDays.map((d) => {
                            const sl = enabledSlots.find((s) => s.day === d);
                            return (
                              <span
                                key={d}
                                className="bg-white border border-red-200 text-red-500 font-mono text-[11px] px-2 py-1 rounded-lg"
                              >
                                {d}
                                {sl ? ` ${sl.from}–${sl.to}` : ""}
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

              {/* Reason */}
              <div>
                <FormLabel>
                  Reason <span className="text-red-400">*</span>
                </FormLabel>
                <div className="relative">
                  <select
                    required
                    value={form.reason}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))
                    }
                    className={inputCls}
                  >
                    <option value="" disabled>
                      Select a reason…
                    </option>
                    {REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
                {form.reason === "Other" && (
                  <input
                    type="text"
                    required
                    placeholder="Describe your reason…"
                    value={form.customReason}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, customReason: e.target.value }))
                    }
                    className={`${inputCls} mt-2`}
                  />
                )}
              </div>

              {/* Timezone */}
              <div>
                <FormLabel>
                  Timezone <span className="text-red-400">*</span>
                </FormLabel>
                <div className="relative">
                  <select
                    required
                    value={form.timeZone}
                    onChange={(e) => setForm((p) => ({ ...p, timeZone: e.target.value }))}
                    className={inputCls}
                  >
                    {TIMEZONES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <FormLabel>
                  Notes{" "}
                  <span className="text-[10px] font-normal normal-case tracking-normal text-slate-400">
                    (optional)
                  </span>
                </FormLabel>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Context for learners…"
                  className={`${inputCls} resize-y`}
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`${btnOutline} flex-1 justify-center`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className={`${btnPrimary} flex-1 justify-center`}
                >
                  {addingBlock ? "Saving…" : "Confirm Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════ DELETE CONFIRM ════ */}
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

