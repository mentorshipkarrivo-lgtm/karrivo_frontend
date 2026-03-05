import React, { useEffect, useState } from "react";
import {
  useGetMentorAvailabilityQuery,
  useUpsertMentorAvailabilityMutation,
  useGetMentorUnavailabilityQuery,
  useAddMentorUnavailabilityMutation,
  useDeleteMentorUnavailabilityMutation,
} from "./mentorLtmAvialibilityapislice";
import Loader from "../../../global/Loader";

const TIMEZONES = [
  { label: "UTC+05:30 — Asia/Kolkata (IST)",        value: "Asia/Kolkata"        },
  { label: "UTC+00:00 — Europe/London (GMT)",        value: "Europe/London"       },
  { label: "UTC+01:00 — Europe/Paris (CET)",         value: "Europe/Paris"        },
  { label: "UTC+02:00 — Europe/Helsinki (EET)",      value: "Europe/Helsinki"     },
  { label: "UTC+03:00 — Europe/Moscow (MSK)",        value: "Europe/Moscow"       },
  { label: "UTC+03:30 — Asia/Tehran (IRST)",         value: "Asia/Tehran"         },
  { label: "UTC+04:00 — Asia/Dubai (GST)",           value: "Asia/Dubai"          },
  { label: "UTC+04:30 — Asia/Kabul (AFT)",           value: "Asia/Kabul"          },
  { label: "UTC+05:00 — Asia/Karachi (PKT)",         value: "Asia/Karachi"        },
  { label: "UTC+05:45 — Asia/Kathmandu (NPT)",       value: "Asia/Kathmandu"      },
  { label: "UTC+06:00 — Asia/Dhaka (BST)",           value: "Asia/Dhaka"          },
  { label: "UTC+06:30 — Asia/Yangon (MMT)",          value: "Asia/Yangon"         },
  { label: "UTC+07:00 — Asia/Bangkok (ICT)",         value: "Asia/Bangkok"        },
  { label: "UTC+08:00 — Asia/Singapore (SGT)",       value: "Asia/Singapore"      },
  { label: "UTC+08:00 — Asia/Shanghai (CST)",        value: "Asia/Shanghai"       },
  { label: "UTC+09:00 — Asia/Tokyo (JST)",           value: "Asia/Tokyo"          },
  { label: "UTC+09:00 — Asia/Seoul (KST)",           value: "Asia/Seoul"          },
  { label: "UTC+09:30 — Australia/Darwin (ACST)",    value: "Australia/Darwin"    },
  { label: "UTC+10:00 — Australia/Sydney (AEST)",    value: "Australia/Sydney"    },
  { label: "UTC+12:00 — Pacific/Auckland (NZST)",    value: "Pacific/Auckland"    },
  { label: "UTC-03:00 — America/Sao_Paulo (BRT)",    value: "America/Sao_Paulo"   },
  { label: "UTC-04:00 — America/Halifax (ADT)",      value: "America/Halifax"     },
  { label: "UTC-05:00 — America/New_York (EST)",     value: "America/New_York"    },
  { label: "UTC-06:00 — America/Chicago (CST)",      value: "America/Chicago"     },
  { label: "UTC-07:00 — America/Denver (MST)",       value: "America/Denver"      },
  { label: "UTC-08:00 — America/Los_Angeles (PST)",  value: "America/Los_Angeles" },
  { label: "UTC-09:00 — America/Anchorage (AKST)",   value: "America/Anchorage"   },
  { label: "UTC-10:00 — Pacific/Honolulu (HST)",     value: "Pacific/Honolulu"    },
];

const ALL_DAYS     = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_TO_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const TIME_OPTIONS = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
const UNAVAIL_REASONS = [
  "Family Emergency", "Health Reason", "Personal Reason", "Work Reason",
  "Travel Plans", "Public Holiday", "Conference / Event", "Other",
];

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const getActiveUnavailForDay = (records = [], dayName) => {
  const dayIdx = DAY_TO_INDEX[dayName];
  const today  = new Date(); today.setHours(0, 0, 0, 0);
  return records.find((u) => {
    if (!u.daysOfWeek?.includes(dayIdx)) return false;
    const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
    const to   = new Date(u.unavailableTo);   to.setHours(23, 59, 59, 999);
    return today >= from && today <= to;
  }) || null;
};

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const C = {
  bg:         "#031610",
  surface:    "#041a13",
  surfaceAlt: "#062018",
  border:     "#0d3d2a",
  borderHover:"#0d5c3a",
  accent:     "#0098cc",
  accentDim:  "#006a90",
  green:      "#4a9e7a",
  greenDim:   "#2a6648",
  red:        "#dc2626",
  redDim:     "#7f1d1d",
  redBg:      "#1a0808",
  text:       "#e0f6ff",
  textMuted:  "#4a9e7a",
};

const FIELD = { background: C.bg, border: `1.5px solid ${C.border}`, color: C.text };

/* ─── Primitives ──────────────────────────────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    style={{ background: checked ? C.accent : "#1a3d30" }}
  >
    <span
      className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
      style={{ transform: checked ? "translateX(20px)" : "translateX(0)" }}
    />
  </button>
);

const Card = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-2xl p-5 sm:p-6 ${className}`}
    style={{ background: C.surface, border: `1.5px solid ${C.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.4)", ...style }}
  >
    {children}
  </div>
);

const FieldLabel = ({ children }) => (
  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: C.accent }}>
    {children}
  </label>
);

const Pill = ({ children, color = C.accent, bg = C.surfaceAlt }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold"
    style={{ background: bg, border: `1.5px solid ${color}`, color }}
  >
    {children}
  </span>
);

const Divider = () => (
  <div className="my-5 h-px w-full" style={{ background: C.border }} />
);

/* ─── DayChip ─────────────────────────────────────────────────────────────── */
const DayChip = ({ day, slot, blocked }) => {
  if (!slot) {
    return (
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ background: C.bg, border: `1.5px solid ${C.border}`, opacity: 0.45 }}
      >
        <span className="w-9 text-xs font-bold uppercase tracking-wide" style={{ color: C.greenDim }}>{day}</span>
        <span className="text-xs italic" style={{ color: C.greenDim }}>Off</span>
      </div>
    );
  }
  if (blocked) {
    return (
      <div
        className="relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3"
        style={{ background: C.redBg, border: `1.5px solid ${C.redDim}` }}
      >
        <span
          className="absolute right-0 top-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white"
          style={{ background: C.red, borderBottomLeftRadius: 8 }}
        >BLOCKED</span>
        <span className="w-9 flex-shrink-0 text-xs font-bold uppercase tracking-wide text-red-400">{day}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-red-400">Unavailable</p>
          <p className="truncate text-[11px] text-red-600">{blocked.reason}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3"
      style={{ background: C.bg, border: `1.5px solid ${C.borderHover}` }}
    >
      <span className="w-9 flex-shrink-0 text-xs font-bold uppercase tracking-wide" style={{ color: C.accent }}>{day}</span>
      <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full" style={{ background: C.border }}>
        <div
          className="absolute h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${C.accent}, #00c8ff)`,
            left:  `${(parseInt(slot.from) / 24) * 100}%`,
            width: `${Math.max(((parseInt(slot.to) - parseInt(slot.from)) / 24) * 100, 4)}%`,
          }}
        />
      </div>
      <span className="flex-shrink-0 whitespace-nowrap text-xs font-bold tabular-nums" style={{ color: C.accent }}>
        {slot.from}–{slot.to}
      </span>
    </div>
  );
};

/* ─── SectionHeader ───────────────────────────────────────────────────────── */
const SectionHeader = ({ icon, title, subtitle }) => (
  <div className="flex items-start gap-3 sm:gap-4">
    <div
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl"
      style={{ background: C.surfaceAlt }}
    >
      {icon}
    </div>
    <div className="min-w-0 flex-1 pt-0.5">
      <h2 className="text-lg font-extrabold text-white sm:text-xl">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm" style={{ color: C.textMuted }}>{subtitle}</p>}
    </div>
  </div>
);

/* ─── AvailabilityPreview ─────────────────────────────────────────────────── */
const AvailabilityPreview = ({ daySlots, sessionsPerWeek, availableForMonths, timeZone, notes, unavailRecords, onEdit }) => (
  <Card className="mb-6">
    {/* Top row: title + edit button */}
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ background: C.surfaceAlt }}
        >
          <div className="h-3 w-3 rounded-full" style={{ background: C.accent, boxShadow: `0 0 0 4px rgba(0,152,204,0.2)` }} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white sm:text-base">Current Availability</h3>
          <p className="text-xs" style={{ color: C.textMuted }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition hover:opacity-75 sm:text-sm"
        style={{ background: C.surfaceAlt, border: `1.5px solid ${C.accent}`, color: C.accent }}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Edit Schedule
      </button>
    </div>

    {/* Stat pills row */}
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Pill>{sessionsPerWeek} session{sessionsPerWeek > 1 ? "s" : ""}/wk</Pill>
      <Pill>{availableForMonths} month{availableForMonths > 1 ? "s" : ""}</Pill>
      <div className="flex items-center gap-1.5">
        <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
        <span className="text-xs font-medium" style={{ color: C.textMuted }}>{timeZone.replace(/_/g, " ")}</span>
      </div>
    </div>

    <Divider />

    {/* Day grid */}
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {ALL_DAYS.map((day) => {
        const slot    = daySlots.find((s) => s.day === day);
        const blocked = slot ? getActiveUnavailForDay(unavailRecords, day) : null;
        return <DayChip key={day} day={day} slot={slot} blocked={blocked} />;
      })}
    </div>

    {/* Legend */}
    <div className="mt-4 flex flex-wrap gap-4">
      {[[C.accent, "Available"], [C.red, "Blocked today"], [C.greenDim, "Off day"]].map(([c, l]) => (
        <div key={l} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: c }} />
          <span className="text-xs" style={{ color: C.textMuted }}>{l}</span>
        </div>
      ))}
    </div>

    {notes && (
      <div className="mt-4 rounded-xl px-4 py-3" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
        <p className="text-xs leading-relaxed sm:text-sm" style={{ color: C.textMuted }}>📝 {notes}</p>
      </div>
    )}
  </Card>
);

/* ─── DeleteConfirmModal ──────────────────────────────────────────────────── */
const DeleteConfirmModal = ({ record, onConfirm, onCancel, deleting }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    style={{ background: "rgba(3,22,16,0.9)" }}
    onClick={(e) => e.target === e.currentTarget && onCancel()}
  >
    <div
      className="w-full max-w-sm overflow-hidden rounded-2xl"
      style={{ background: C.surface, border: `1.5px solid ${C.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.7)" }}
    >
      <div className="p-6" style={{ background: C.bg }}>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: C.redBg }}>
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
          </svg>
        </div>
        <h3 className="mb-2 text-base font-bold text-white">Delete Unavailability?</h3>
        <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
          Removes the <strong className="text-red-400">{record?.reason}</strong> block (
          {fmtDate(record?.unavailableFrom)} – {fmtDate(record?.unavailableTo)}).
          Those sessions will become bookable again.
        </p>
      </div>
      <div className="flex gap-3 p-4">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl py-2.5 text-sm font-medium transition hover:opacity-75"
          style={{ background: C.surfaceAlt, border: `1.5px solid ${C.border}`, color: C.textMuted }}
        >Cancel</button>
        <button
          onClick={onConfirm}
          disabled={deleting}
          className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: C.red }}
        >{deleting ? "Deleting…" : "Yes, Delete"}</button>
      </div>
    </div>
  </div>
);

/* ════════════════════════ MAIN COMPONENT ═════════════════════════════════════ */
const MentorAvailability = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const mentorId = userData?._id;

  const [tab,              setTab]              = useState("ltm");
  const [hasSaved,         setHasSaved]         = useState(false);
  const [isEditMode,       setIsEditMode]       = useState(false);
  const [availableForMonths, setAvailableForMonths] = useState(1);
  const [sessionsPerWeek,  setSessionsPerWeek]  = useState(1);
  const [timeZone,         setTimeZone]         = useState("Asia/Kolkata");
  const [availNotes,       setAvailNotes]       = useState("");
  const [snapshot,         setSnapshot]         = useState(null);
  const [showModal,        setShowModal]        = useState(false);
  const [deleteTarget,     setDeleteTarget]     = useState(null);
  const [daySlots,         setDaySlots]         = useState(
    ALL_DAYS.map((d) => ({
      day: d, enabled: ["Mon","Tue","Wed","Thu","Fri"].includes(d),
      from: "09:00", to: "10:00",
    }))
  );
  const [unavailForm, setUnavailForm] = useState({
    unavailableFrom: "", unavailableTo: "",
    daysOfWeek: [], timeZone: "Asia/Kolkata",
    reason: "", customReason: "", notes: "",
  });

  const { data: availData,   isLoading: loadingAvail }         = useGetMentorAvailabilityQuery(mentorId);
  const [upsertAvailability, { isLoading: saving }]            = useUpsertMentorAvailabilityMutation();
  const { data: unavailData, isLoading: loadingUnavail }       = useGetMentorUnavailabilityQuery(mentorId);
  const [addUnavailability,  { isLoading: addingUnavail }]     = useAddMentorUnavailabilityMutation();
  const [deleteUnavailability, { isLoading: deletingUnavail }] = useDeleteMentorUnavailabilityMutation();

  useEffect(() => {
    if (availData?.success && availData.data) {
      const d = availData.data;
      const slots = ALL_DAYS.map((day) => {
        const s = d.daySlots?.find((x) => x.day === day);
        return s ? { day, enabled: true, from: s.from, to: s.to }
                 : { day, enabled: false, from: "09:00", to: "10:00" };
      });
      const spw = d.availableDaysPerWeek || 1;
      const tz  = d.timeZone             || "Asia/Kolkata";
      const nts = d.notes                || "";
      const afm = d.availableForMonths   || 1;
      setDaySlots(slots); setSessionsPerWeek(spw); setTimeZone(tz);
      setAvailNotes(nts); setAvailableForMonths(afm);
      setHasSaved(true); setIsEditMode(false);
      setSnapshot({ daySlots: slots, sessionsPerWeek: spw, timeZone: tz, availNotes: nts, availableForMonths: afm });
    }
  }, [availData]);

  useEffect(() => { setUnavailForm((p) => ({ ...p, timeZone })); }, [timeZone]);

  useEffect(() => {
    const { unavailableFrom, unavailableTo } = unavailForm;
    if (!unavailableFrom || !unavailableTo) { setUnavailForm((p) => ({ ...p, daysOfWeek: [] })); return; }
    const mentorIdxs = daySlots.filter((s) => s.enabled).map((s) => DAY_TO_INDEX[s.day]);
    const affected   = new Set();
    for (let d = new Date(unavailableFrom); d <= new Date(unavailableTo); d.setDate(d.getDate() + 1)) {
      if (mentorIdxs.includes(d.getDay())) affected.add(d.getDay());
    }
    setUnavailForm((p) => ({ ...p, daysOfWeek: [...affected] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unavailForm.unavailableFrom, unavailForm.unavailableTo, daySlots]);

  const toggleDay  = (i)       => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s));
  const updateSlot = (i, f, v) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s));

  const handleEdit   = () => {
    setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, availableForMonths });
    setIsEditMode(true);
  };
  const handleCancel = () => {
    if (snapshot) {
      setDaySlots(snapshot.daySlots); setSessionsPerWeek(snapshot.sessionsPerWeek);
      setTimeZone(snapshot.timeZone); setAvailNotes(snapshot.availNotes);
      setAvailableForMonths(snapshot.availableForMonths);
    }
    setIsEditMode(false);
  };
  const handleSave = async () => {
    try {
      const enabled = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
      await upsertAvailability({ mentorId, daySlots: enabled, availableDaysPerWeek: sessionsPerWeek, timeZone, notes: availNotes, availableForMonths }).unwrap();
      setHasSaved(true); setIsEditMode(false);
      setSnapshot({ daySlots: [...daySlots], sessionsPerWeek, timeZone, availNotes, availableForMonths });
    } catch (err) { console.error(err); }
  };

  const handleSubmitUnavailability = async (e) => {
    e.preventDefault();
    const finalReason = unavailForm.reason === "Other"
      ? (unavailForm.customReason.trim() || "Other") : unavailForm.reason;
    try {
      await addUnavailability({ mentorId, ...unavailForm, reason: finalReason }).unwrap();
      setShowModal(false);
      setUnavailForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone, reason: "", customReason: "", notes: "" });
    } catch (err) { console.error(err); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUnavailability({ mentorId, unavailId: deleteTarget._id }).unwrap();
      setDeleteTarget(null);
    } catch (err) { console.error(err); }
  };

  if (loadingAvail || loadingUnavail) return <Loader />;

  const previewSlots   = daySlots.filter((s) => s.enabled).map(({ day, from, to }) => ({ day, from, to }));
  const unavailRecords = unavailData?.data || [];
  const showPreviewOnly = hasSaved && !isEditMode;
  const affectedDayNames = [...(unavailForm.daysOfWeek || [])].sort((a, b) => a - b).map((i) => ALL_DAYS[i]);
  const submitDisabled   = addingUnavail || !affectedDayNames.length || !unavailForm.reason
    || (unavailForm.reason === "Other" && !unavailForm.customReason.trim());

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.text }}>

      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-40 flex"
        style={{ background: C.bg, borderBottom: `1.5px solid ${C.border}`, boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}
      >
        {[{ key: "ltm", label: "LTM Availability" }, { key: "unavailability", label: "Unavailability" }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex-1 py-4 text-sm font-bold transition-all duration-150 focus:outline-none sm:py-5 sm:text-base"
            style={{
              borderBottom: `3px solid ${tab === key ? C.accent : "transparent"}`,
              color:        tab === key ? C.accent : C.greenDim,
              background:   tab === key ? C.surface : "transparent",
            }}
          >{label}</button>
        ))}
      </div>

      {/* ════════ LTM TAB ════════════════════════════════════════════════════ */}
      {tab === "ltm" && (
        <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">

          {/* Page title */}
          <div className="mb-6">
            <SectionHeader
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              title="LTM Availability"
              subtitle="Configure your weekly schedule for long-term mentoring sessions."
            />
          </div>

          {/* Preview */}
          {showPreviewOnly && (
            <AvailabilityPreview
              daySlots={previewSlots}
              sessionsPerWeek={sessionsPerWeek}
              availableForMonths={availableForMonths}
              timeZone={timeZone}
              notes={availNotes}
              unavailRecords={unavailRecords}
              onEdit={handleEdit}
            />
          )}

          {/* Edit / Create ──────────────────────────────────────────────────── */}
          {!showPreviewOnly && (
            <div className="flex flex-col gap-4">

              {/* Editing banner */}
              {isEditMode && (
                <div
                  className="flex items-center gap-3 rounded-2xl px-4 py-3.5 sm:px-5"
                  style={{ background: "#1a1400", border: "1.5px solid #7a5c00" }}
                >
                  <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <p className="text-xs font-medium sm:text-sm" style={{ color: "#f59e0b" }}>
                    Editing mode — changes won't apply until you save.
                  </p>
                </div>
              )}

              {/* ── Card 1: Sessions + Timezone ──────────────────────────────── */}
              <Card>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  {/* Sessions per week */}
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Sessions / Week</FieldLabel>
                    <p className="text-xs" style={{ color: C.textMuted }}>How many LTM sessions per week?</p>
                    <select
                      value={sessionsPerWeek}
                      onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      style={FIELD}
                    >
                      {[1,2,3,4,5].map((n) => (
                        <option key={n} value={n}>{n} session{n > 1 ? "s" : ""}/week</option>
                      ))}
                    </select>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[1,2,3,4,5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setSessionsPerWeek(n)}
                          className="h-9 w-9 rounded-full text-xs font-bold transition-all"
                          style={{
                            border:     `2px solid ${sessionsPerWeek >= n ? C.accent : C.border}`,
                            background: sessionsPerWeek >= n ? C.surfaceAlt : C.bg,
                            color:      sessionsPerWeek >= n ? C.accent      : C.greenDim,
                          }}
                        >{n}</button>
                      ))}
                    </div>
                  </div>

                  {/* Timezone */}
                  <div className="flex flex-col gap-2">
                    <FieldLabel>Timezone</FieldLabel>
                    <p className="text-xs" style={{ color: C.textMuted }}>Bookings are shown in this zone.</p>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      style={FIELD}
                    >
                      {TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>{tz.label}</option>
                      ))}
                    </select>
                    <div
                      className="mt-1 inline-flex max-w-full items-center gap-2 self-start rounded-full px-3 py-1"
                      style={{ background: C.bg, border: `1.5px solid ${C.accent}` }}
                    >
                      <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: C.accent }} />
                      <span className="truncate text-xs font-semibold" style={{ color: C.accent }}>
                        {timeZone.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ── Card 2: Available For (months) ───────────────────────────── */}
              <Card>
                <div className="flex flex-col gap-2">
                  <FieldLabel>Available For</FieldLabel>
                  <p className="text-xs" style={{ color: C.textMuted }}>How long are you open to taking new learners?</p>
                  <select
                    value={availableForMonths}
                    onChange={(e) => setAvailableForMonths(Number(e.target.value))}
                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                    style={FIELD}
                  >
                    {[1,3,6].map((m) => (
                      <option key={m} value={m}>{m} month{m > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { m: 1, label: "1 mo",  desc: "Short term"  },
                      { m: 3, label: "3 mos", desc: "One quarter" },
                      { m: 6, label: "6 mos", desc: "Half year"   },
                    ].map(({ m, label, desc }) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setAvailableForMonths(m)}
                        className="flex flex-col items-center rounded-xl px-4 py-2.5 transition-all"
                        style={{
                          border:     `2px solid ${availableForMonths === m ? C.accent : C.border}`,
                          background: availableForMonths === m ? C.surfaceAlt : C.bg,
                          minWidth: 72,
                        }}
                      >
                        <span className="text-sm font-bold" style={{ color: availableForMonths === m ? C.accent : C.greenDim }}>{label}</span>
                        <span className="text-[10px]" style={{ color: availableForMonths === m ? C.accentDim : C.greenDim }}>{desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* ── Card 3: Day Slots ─────────────────────────────────────────── */}
              <Card className="overflow-hidden !p-0">
                <div className="border-b px-5 py-4" style={{ borderColor: C.border }}>
                  <h3 className="text-sm font-bold text-white">Weekly Schedule</h3>
                  <p className="mt-0.5 text-xs" style={{ color: C.textMuted }}>Toggle days and set your available hours</p>
                </div>
                <div>
                  {daySlots.map((slot, i) => (
                    <div key={`${slot.day}-${i}`}>
                      <div
                        className="flex flex-wrap items-center gap-3 px-5 py-3.5 sm:flex-nowrap"
                        style={{ background: slot.enabled ? C.surface : C.bg }}
                      >
                        {/* Toggle + day name */}
                        <div className="flex flex-shrink-0 items-center gap-3">
                          <Toggle checked={slot.enabled} onChange={() => toggleDay(i)} />
                          <span
                            className="w-9 text-sm font-bold"
                            style={{ color: slot.enabled ? C.accent : C.greenDim }}
                          >{slot.day}</span>
                        </div>

                        {slot.enabled ? (
                          <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-3">
                            {/* From / To */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium" style={{ color: C.textMuted }}>From</span>
                              <select
                                value={slot.from}
                                onChange={(e) => updateSlot(i, "from", e.target.value)}
                                className="rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                                style={{ ...FIELD, color: C.accent }}
                              >
                                {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium" style={{ color: C.textMuted }}>To</span>
                              <select
                                value={slot.to}
                                onChange={(e) => updateSlot(i, "to", e.target.value)}
                                className="rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                                style={{ ...FIELD, color: C.accent }}
                              >
                                {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                            {/* Add / Remove */}
                            <div className="ml-auto flex items-center gap-1.5">
                              <button
                                type="button"
                                title="Duplicate slot"
                                onClick={() =>
                                  setDaySlots((p) => {
                                    const c = [...p];
                                    c.splice(i + 1, 0, { day: slot.day, enabled: true, from: slot.from, to: slot.to });
                                    return c;
                                  })
                                }
                                className="rounded-lg p-1.5 transition hover:opacity-70"
                                style={{ background: C.surfaceAlt }}
                              >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke={C.accent} strokeWidth="1.6" />
                                  <path d="M12 8v8M8 12h8" stroke={C.accent} strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                title="Remove slot"
                                onClick={() => setDaySlots((p) => p.filter((_, idx) => idx !== i))}
                                className="rounded-lg p-1.5 transition hover:opacity-70"
                                style={{ background: C.redBg }}
                              >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke={C.red} strokeWidth="1.6" />
                                  <path d="M8 12h8" stroke={C.red} strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs italic" style={{ color: C.greenDim }}>Not available this day</span>
                        )}
                      </div>
                      {i < daySlots.length - 1 && (
                        <div className="mx-5 h-px" style={{ background: C.border }} />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* ── Card 4: Notes ─────────────────────────────────────────────── */}
              <Card>
                <FieldLabel>
                  Notes for learners{" "}
                  <span className="text-[10px] font-normal normal-case tracking-normal" style={{ color: C.greenDim }}>(optional)</span>
                </FieldLabel>
                <textarea
                  rows={3}
                  value={availNotes}
                  onChange={(e) => setAvailNotes(e.target.value)}
                  placeholder="e.g. I prefer sessions in the evening…"
                  className="mt-1.5 w-full resize-y rounded-xl px-4 py-3 text-sm focus:outline-none"
                  style={{ ...FIELD, lineHeight: 1.8 }}
                />
              </Card>

              {/* ── Action buttons ─────────────────────────────────────────────── */}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={isEditMode ? handleCancel : () => setTab("unavailability")}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:opacity-75"
                  style={{ background: C.surfaceAlt, border: `1.5px solid ${C.border}`, color: C.textMuted }}
                >
                  {isEditMode ? "Cancel" : "Close"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ background: C.accent }}
                >
                  {saving ? "Saving…" : "Save Availability"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════ UNAVAILABILITY TAB ══════════════════════════════════════════ */}
      {tab === "unavailability" && (
        <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">

          {/* Header */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <SectionHeader
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              }
              title="Unavailability"
              subtitle="Block date ranges — available days within are blocked automatically."
            />
            <button
              onClick={() => setShowModal(true)}
              className="flex flex-shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-80 sm:px-5"
              style={{ background: C.accent, boxShadow: `0 4px 16px rgba(0,152,204,0.35)` }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Add Block
            </button>
          </div>

          {/* Empty state */}
          {!unavailRecords.length ? (
            <Card className="py-16 text-center">
              <div className="mb-3 text-5xl">📅</div>
              <p className="mb-1 text-base font-bold text-white">No blocked periods</p>
              <p className="text-sm" style={{ color: C.textMuted }}>Add a date range when you won't be available.</p>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {unavailRecords.map((u) => {
                const blocked = (u.daysOfWeek || [])
                  .filter((idx) => previewSlots.some((s) => DAY_TO_INDEX[s.day] === idx))
                  .sort((a, b) => a - b)
                  .map((idx) => ALL_DAYS[idx]);

                return (
                  <div
                    key={u._id}
                    className="rounded-2xl p-5"
                    style={{ background: C.surface, border: `1.5px solid ${C.redDim}`, boxShadow: `0 4px 16px rgba(127,29,29,0.12)` }}
                  >
                    {/* Row 1: reason + badge + delete */}
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-red-400">{u.reason}</span>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-red-400"
                          style={{ background: C.redBg, border: `1px solid ${C.redDim}` }}
                        >BLOCKED</span>
                      </div>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        className="flex flex-shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:opacity-75"
                        style={{ background: C.redBg, border: `1.5px solid ${C.redDim}` }}
                      >
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                        </svg>
                        Delete
                      </button>
                    </div>

                    {/* Date range */}
                    <div className="mb-3 flex items-center gap-2">
                      <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-xs font-medium sm:text-sm" style={{ color: C.textMuted }}>
                        {fmtDate(u.unavailableFrom)}
                        <span className="mx-2" style={{ color: C.greenDim }}>→</span>
                        {fmtDate(u.unavailableTo)}
                      </span>
                    </div>

                    {/* Blocked day chips */}
                    {blocked.length > 0 && (
                      <div className={`flex flex-wrap gap-1.5 ${u.notes ? "mb-3" : ""}`}>
                        {blocked.map((d) => {
                          const sl = previewSlots.find((s) => s.day === d);
                          return (
                            <div
                              key={d}
                              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                              style={{ background: C.redBg, border: `1.5px solid ${C.redDim}` }}
                            >
                              <span className="text-xs font-bold text-red-400">{d}</span>
                              {sl && <span className="text-[10px] text-red-600">{sl.from}–{sl.to}</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {u.notes && (
                      <p className="text-xs italic sm:text-sm" style={{ color: C.textMuted }}>{u.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ════════ ADD UNAVAILABILITY MODAL ════════════════════════════════════ */}
      {showModal && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center overflow-y-auto p-0 backdrop-blur-sm sm:items-center sm:p-4"
          style={{ background: "rgba(3,22,16,0.9)" }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-2xl"
            style={{ background: C.surface, border: `1.5px solid ${C.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.7)" }}
          >
            {/* Modal header */}
            <div className="px-6 pt-6 pb-5 sm:px-7" style={{ background: C.bg }}>
              {/* Drag handle (mobile) */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full sm:hidden" style={{ background: C.border }} />
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: C.redBg }}
                  >
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white sm:text-base">Mark Unavailability</p>
                    <p className="text-xs" style={{ color: C.textMuted }}>Available days in this range will be blocked</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xl leading-none transition hover:text-white focus:outline-none"
                  style={{ background: C.surfaceAlt, color: C.greenDim }}
                >×</button>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full" style={{ background: C.redBg }}>
                <div className="h-full rounded-full transition-all" style={{ background: C.red, width: affectedDayNames.length ? "100%" : "40%" }} />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitUnavailability} className="flex flex-col gap-4 overflow-y-auto p-6 sm:p-7" style={{ maxHeight: "70vh" }}>

              {/* Date range */}
              <div className="grid grid-cols-2 gap-3">
                {[{ label: "From", key: "unavailableFrom" }, { label: "To", key: "unavailableTo" }].map(({ label, key }) => (
                  <div key={key}>
                    <FieldLabel>{label} <span className="text-red-400">*</span></FieldLabel>
                    <input
                      type="date"
                      required
                      value={unavailForm[key]}
                      onChange={(e) => setUnavailForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      style={FIELD}
                    />
                  </div>
                ))}
              </div>

              {/* Affected days preview */}
              {unavailForm.unavailableFrom && unavailForm.unavailableTo && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: affectedDayNames.length ? C.redBg  : C.bg,
                    border:     `1.5px solid ${affectedDayNames.length ? C.redDim : C.border}`,
                  }}
                >
                  <p className="mb-2 text-xs font-semibold sm:text-sm" style={{ color: affectedDayNames.length ? "#f87171" : C.textMuted }}>
                    {affectedDayNames.length ? "Sessions that will be blocked:" : "⚠️ No available days fall in this range"}
                  </p>
                  {affectedDayNames.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {affectedDayNames.map((d) => {
                        const sl = previewSlots.find((s) => s.day === d);
                        return (
                          <div
                            key={d}
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
                            style={{ background: C.surface, border: `1.5px solid ${C.redDim}` }}
                          >
                            <span className="text-xs font-bold text-red-400">{d}</span>
                            {sl && <span className="text-[10px] text-red-600">{sl.from}–{sl.to}</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Timezone */}
              <div>
                <FieldLabel>Timezone <span className="text-red-400">*</span></FieldLabel>
                <select
                  required
                  value={unavailForm.timeZone}
                  onChange={(e) => setUnavailForm((p) => ({ ...p, timeZone: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  style={FIELD}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              {/* Reason */}
              <div>
                <FieldLabel>Reason <span className="text-red-400">*</span></FieldLabel>
                <select
                  required
                  value={unavailForm.reason}
                  onChange={(e) => setUnavailForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))}
                  className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  style={{ ...FIELD, color: !unavailForm.reason ? C.greenDim : C.text }}
                >
                  <option value="" disabled>Select a reason…</option>
                  {UNAVAIL_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>

                {unavailForm.reason === "Other" && (
                  <div className="mt-3">
                    <label className="mb-1.5 block text-xs font-medium" style={{ color: C.textMuted }}>
                      Please specify <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Describe your reason…"
                      value={unavailForm.customReason}
                      onChange={(e) => setUnavailForm((p) => ({ ...p, customReason: e.target.value }))}
                      className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                      style={{ background: C.redBg, border: `1.5px solid ${C.redDim}`, color: C.text }}
                    />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <FieldLabel>
                  Notes{" "}
                  <span className="text-[10px] font-normal normal-case tracking-normal" style={{ color: C.greenDim }}>(optional)</span>
                </FieldLabel>
                <textarea
                  rows={3}
                  value={unavailForm.notes}
                  onChange={(e) => setUnavailForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Any extra context for your learners…"
                  className="w-full resize-y rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                  style={{ ...FIELD, lineHeight: 1.8 }}
                />
              </div>

              <button
                type="submit"
                disabled={submitDisabled}
                className="w-full rounded-xl py-3 text-sm font-bold tracking-wide text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 sm:py-3.5 sm:text-base"
                style={{ background: submitDisabled ? C.surfaceAlt : C.accent }}
              >
                {addingUnavail ? "Saving…" : "Confirm Unavailability"}
              </button>

              {!affectedDayNames.length && unavailForm.unavailableFrom && unavailForm.unavailableTo && (
                <p className="-mt-1 text-center text-xs sm:text-sm" style={{ color: C.textMuted }}>
                  Pick a range that includes at least one of your available days.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ════════ DELETE CONFIRM ══════════════════════════════════════════════ */}
      {deleteTarget && (
        <DeleteConfirmModal
          record={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          deleting={deletingUnavail}
        />
      )}
    </div>
  );
};

export default MentorAvailability;