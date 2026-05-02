// import React, { useEffect, useState, useMemo } from "react";
// import {
//   useGetMentorAvailabilityQuery,
//   useUpsertMentorAvailabilityMutation,
//   useGetMentorUnavailabilityQuery,
//   useAddMentorUnavailabilityMutation,
//   useDeleteMentorUnavailabilityMutation,
// } from "./mentorLtmAvialibilityapislice";
// import Loader from "../../../global/Loader";
// import {
//   Calendar, Clock, Ban, Plus, Trash2, Edit2, Save,
//   X, ChevronDown, AlertCircle, CheckCircle2, Info, AlertTriangle,
// } from "lucide-react";

// /* ─── Constants ──────────────────────────────────────────────── */
// const TIMEZONES = [
//   { label: "UTC+05:30 — Asia/Kolkata (IST)", value: "Asia/Kolkata" },
//   { label: "UTC+00:00 — Europe/London (GMT)", value: "Europe/London" },
//   { label: "UTC+01:00 — Europe/Paris (CET)", value: "Europe/Paris" },
//   { label: "UTC+04:00 — Asia/Dubai (GST)", value: "Asia/Dubai" },
//   { label: "UTC+05:00 — Asia/Karachi (PKT)", value: "Asia/Karachi" },
//   { label: "UTC+08:00 — Asia/Singapore (SGT)", value: "Asia/Singapore" },
//   { label: "UTC+09:00 — Asia/Tokyo (JST)", value: "Asia/Tokyo" },
//   { label: "UTC+10:00 — Australia/Sydney (AEST)", value: "Australia/Sydney" },
//   { label: "UTC-05:00 — America/New_York (EST)", value: "America/New_York" },
//   { label: "UTC-08:00 — America/Los_Angeles (PST)", value: "America/Los_Angeles" },
// ];

// const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// const DAY_IDX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4 };
// const TIMES = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
// const REASONS = ["Family Emergency", "Health Reason", "Personal Reason", "Work Reason", "Travel Plans", "Public Holiday", "Conference / Event", "Other"];
// const MONTH_OPTS = [{ v: 1, l: "1 Mo" }, { v: 3, l: "3 Mo" }, { v: 6, l: "6 Mo" }];

// /* ─── Helpers ─────────────────────────────────────────────────── */
// const toApiMonths = (set) => [...set].sort((a, b) => a - b);
// const fromApiMths = (arr) => new Set((Array.isArray(arr) ? arr : [arr]).map(Number));
// const fmtShort = (s) => s ? new Date(s).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—";
// const calcEnd = (start, m) => { if (!start || !m) return null; const d = new Date(start); d.setMonth(d.getMonth() + m); return d; };

// const activeBlock = (recs = [], day) => {
//   const idx = DAY_IDX[day];
//   const today = new Date(); today.setHours(0, 0, 0, 0);
//   return recs.find((u) => {
//     if (!u.daysOfWeek?.includes(idx)) return false;
//     const f = new Date(u.unavailableFrom); f.setHours(0, 0, 0, 0);
//     const t = new Date(u.unavailableTo); t.setHours(23, 59, 59, 999);
//     return today >= f && today <= t;
//   }) || null;
// };

// /**
//  * Returns all existing blocks that overlap [from, to].
//  * Overlap condition: existingFrom <= to AND existingTo >= from
//  */
// const findOverlaps = (recs, from, to) => {
//   if (!from || !to) return [];
//   const f = new Date(from);
//   const t = new Date(to);
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   return recs.filter((u) => {
//     const ut = new Date(u.unavailableTo);
//     ut.setHours(23, 59, 59, 999);

//     // ✅ Skip expired blocks — they're done, no conflict
//     if (ut < today) return false;

//     const uf = new Date(u.unavailableFrom);
//     return uf <= t && ut >= f;
//   });
// };

// /* ─── Shared classes ─────────────────────────────────────────── */
// const C = {
//   input: "w-full bg-[#020e08] border border-[#0d3a22] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#00c896] focus:ring-1 focus:ring-[#00c896]/30 transition appearance-none placeholder:text-[#234433]",
//   inputErr: "w-full bg-[#020e08] border border-[#5c1a22] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#f05060] focus:ring-1 focus:ring-[#f05060]/30 transition appearance-none placeholder:text-[#234433]",
//   primary: "inline-flex items-center gap-1.5 bg-[#00c896] hover:bg-[#00dba5] text-[#020e08] text-sm font-bold px-4 py-2 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed",
//   outline: "inline-flex items-center gap-1.5 border border-[#0d3a22] hover:border-[#1a5c38] text-[#4d9970] hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition",
//   danger: "inline-flex items-center gap-1.5 border border-[#5c1a22] hover:bg-[#f0506012] text-[#f05060] text-sm font-semibold px-3 py-1.5 rounded-lg transition",
//   label: "block text-[10px] font-bold tracking-widest uppercase text-[#00a878] mb-1.5",
// };

// /* ─── Sub-components ─────────────────────────────────────────── */
// const Toggle = ({ on, onChange }) => (
//   <button type="button" onClick={() => onChange(!on)}
//     className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#00c896]" : "bg-[#091a10] border border-[#0d3a22]"}`}>
//     <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
//   </button>
// );

// const Badge = ({ children, variant = "default" }) => {
//   const cls = {
//     default: "bg-[#0a1f12] border border-[#0d3a22] text-[#4d9970]",
//     active: "bg-[#1a0408] border border-[#5c1a22] text-[#f05060]",
//     upcoming: "bg-[#1a1200] border border-[#5c4200] text-[#f0b429]",
//     success: "bg-[#001a12] border border-[#005c3a] text-[#00c896]",
//   }[variant];
//   return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{children}</span>;
// };

// const Section = ({ title, icon: Icon, right, children }) => (
//   <div className="bg-[#040f08] border border-[#0d3a22] rounded-xl overflow-hidden mb-4">
//     <div className="flex items-center justify-between px-4 py-3 border-b border-[#0d3a22] bg-[#071510]">
//       <div className="flex items-center gap-2">
//         {Icon && <Icon size={13} className="text-[#00c896]" />}
//         <span className="text-xs font-bold text-white tracking-wide">{title}</span>
//       </div>
//       {right}
//     </div>
//     <div className="p-4">{children}</div>
//   </div>
// );

// const DeleteModal = ({ record, onConfirm, onCancel, busy }) => (
//   <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
//     <div className="bg-[#040f08] border border-[#5c1a22] rounded-xl w-full max-w-xs p-6 shadow-2xl">
//       <div className="flex gap-3 mb-4">
//         <div className="w-9 h-9 rounded-lg bg-[#f0506012] border border-[#5c1a22] flex items-center justify-center flex-shrink-0">
//           <Trash2 size={15} className="text-[#f05060]" />
//         </div>
//         <div>
//           <p className="font-bold text-white text-sm">Delete block?</p>
//           <p className="text-xs text-[#4d9970] mt-0.5">{record?.reason} · {fmtShort(record?.unavailableFrom)} – {fmtShort(record?.unavailableTo)}</p>
//         </div>
//       </div>
//       <p className="text-xs text-[#4d9970] mb-4 bg-[#1a120012] border border-[#5c420033] rounded-lg px-3 py-2">
//         <Info size={11} className="inline mr-1 text-[#f0b429]" />
//         Mentee subscriptions that were extended will <strong className="text-[#f0b429]">not</strong> be rolled back automatically.
//       </p>
//       <div className="flex gap-2">
//         <button onClick={onCancel} className={`${C.outline} flex-1 justify-center`}>Cancel</button>
//         <button onClick={onConfirm} disabled={busy}
//           className="flex-1 justify-center inline-flex items-center gap-1.5 bg-[#f05060] hover:brightness-110 text-white text-sm font-bold px-4 py-2 rounded-lg transition disabled:opacity-40">
//           {busy ? "Deleting…" : "Delete"}
//         </button>
//       </div>
//     </div>
//   </div>
// );

// /* ══════════════════════════════════════════════════════════════
//    MAIN
// ══════════════════════════════════════════════════════════════ */
// export default function MentorAvailability() {
//   const mentor_Id = JSON.parse(localStorage.getItem("userData") || "{}")?._id;
//   console.log(mentor_Id, 'mentor_Id')

//   const [tab, setTab] = useState("schedule");
//   const [editMode, setEditMode] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [delTarget, setDelTarget] = useState(null);
//   const [snapshot, setSnapshot] = useState(null);
//   const [toastMsg, setToastMsg] = useState(null);
//   const [daySlots, setDaySlots] = useState(ALL_DAYS.map((d) => ({ day: d, enabled: true, from: "09:00", to: "10:00" })));
//   const [spw, setSpw] = useState(1);
//   const [tz, setTz] = useState("Asia/Kolkata");
//   const [notes, setNotes] = useState("");
//   const [months, setMonths] = useState(new Set([1]));

//   const [form, setForm] = useState({
//     unavailableFrom: "", unavailableTo: "", daysOfWeek: [],
//     timeZone: "Asia/Kolkata", reason: "", customReason: "", notes: "",
//   });

//   const { data: availData, isLoading: loadA } = useGetMentorAvailabilityQuery(mentor_Id, { skip: !mentor_Id });
//   const { data: unavailData, isLoading: loadU } = useGetMentorUnavailabilityQuery(mentor_Id, { skip: !mentor_Id });
//   const [upsert, { isLoading: saving }] = useUpsertMentorAvailabilityMutation();
//   const [addBlock, { isLoading: addingBlock }] = useAddMentorUnavailabilityMutation();
//   const [delBlock, { isLoading: deletingBlock }] = useDeleteMentorUnavailabilityMutation();

//   const unavailRecs = unavailData?.data || [];
//   const enabledSlots = daySlots.filter((s) => s.enabled);
//   const apiMonths = toApiMonths(months);
//   const maxMonths = months.size === 3 ? 0 : Math.max(...months);
//   const subEndDate = maxMonths ? calcEnd(new Date(), maxMonths)?.toISOString().slice(0, 10) : "";

//   /* ── Load saved data ── */
//   useEffect(() => {
//     if (!availData?.success || !availData.data) return;
//     const d = availData.data;
//     const slots = ALL_DAYS.map((day) => {
//       const s = d.daySlots?.find((x) => x.day === day);
//       return s ? { day, enabled: true, from: s.from, to: s.to } : { day, enabled: false, from: "09:00", to: "10:00" };
//     });
//     setDaySlots(slots);
//     setSpw(d.availableDaysPerWeek || 1);
//     setTz(d.timeZone || "Asia/Kolkata");
//     setNotes(d.notes || "");
//     setMonths(fromApiMths(d.availableForMonths ?? 1));
//     setSaved(true); setEditMode(false);
//   }, [availData]);

//   /* ── Auto-compute affected days ── */
//   useEffect(() => {
//     const { unavailableFrom, unavailableTo } = form;
//     if (!unavailableFrom || !unavailableTo) { setForm((p) => ({ ...p, daysOfWeek: [] })); return; }
//     const idxs = enabledSlots.map((s) => DAY_IDX[s.day]);
//     const aff = new Set();
//     for (let d = new Date(unavailableFrom); d <= new Date(unavailableTo); d.setDate(d.getDate() + 1))
//       if (idxs.includes(d.getDay())) aff.add(d.getDay());
//     setForm((p) => ({ ...p, daysOfWeek: [...aff] }));
//   }, [form.unavailableFrom, form.unavailableTo]);

//   /* ── Overlap detection (derived, no state needed) ── */
//   const overlaps = useMemo(
//     () => findOverlaps(unavailRecs, form.unavailableFrom, form.unavailableTo),
//     [form.unavailableFrom, form.unavailableTo, unavailRecs]
//   );
//   const hasOverlap = overlaps.length > 0;

//   /* ── Date order error ── */
//   const dateOrderErr = form.unavailableFrom && form.unavailableTo && form.unavailableTo < form.unavailableFrom;

//   const showToast = (msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(null), 3500); };
//   const snap = () => ({ slots: [...daySlots], spw, tz, notes, months: new Set(months) });

//   const handleEdit = () => { setSnapshot(snap()); setEditMode(true); };
//   const handleCancel = () => {
//     if (snapshot) { setDaySlots(snapshot.slots); setSpw(snapshot.spw); setTz(snapshot.tz); setNotes(snapshot.notes); setMonths(snapshot.months); }
//     setEditMode(false);
//   };

//   const handleSave = async () => {
//     try {
//       await upsert({ mentor_Id, daySlots: enabledSlots.map(({ day, from, to }) => ({ day, from, to })), availableDaysPerWeek: spw, timeZone: tz, notes, availableForMonths: apiMonths }).unwrap();
//       setSaved(true); setEditMode(false); showToast("Schedule saved ✓");
//     } catch (e) { console.error(e); }
//   };

//   const handleAddBlock = async (e) => {
//     e.preventDefault();
//     if (hasOverlap || dateOrderErr) return; // extra guard
//     const reason = form.reason === "Other" ? (form.customReason.trim() || "Other") : form.reason;
//     try {
//       const res = await addBlock({ mentor_Id, ...form, reason }).unwrap();
//       setShowModal(false);
//       setForm({ unavailableFrom: "", unavailableTo: "", daysOfWeek: [], timeZone: tz, reason: "", customReason: "", notes: "" });
//       const count = res?.data?.subscriptionsExtended;
//       showToast(count ? `Block added. ${count} subscription(s) auto-extended ✓` : "Block added ✓");
//     } catch (e) { console.error(e); }
//   };

//   const handleDelete = async () => {
//     console.log(mentor_Id, "mentorId1w2e3r4")
//     try { await delBlock({ mentor_Id, unavailId: delTarget._id }).unwrap(); setDelTarget(null); showToast("Block removed"); }
//     catch (e) { console.error(e); }
//   };

//   if (loadA || loadU) return <Loader />;

//   const affectedDays = [...(form.daysOfWeek ?? [])].sort((a, b) => a - b).map((i) => ALL_DAYS[i]);
//   const submitDisabled = addingBlock || !affectedDays.length || !form.reason
//     || (form.reason === "Other" && !form.customReason.trim())
//     || hasOverlap || dateOrderErr;

//   const showView = saved && !editMode;

//   return (
//     <div className="min-h-screen bg-[#020e08] text-white">
//       <style>{`
//         input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(.5) sepia(1) hue-rotate(100deg); cursor: pointer; }
//         select option, .ds::-webkit-scrollbar { background:#071510; width:3px; }
//         .ds::-webkit-scrollbar-thumb { background:#0d3a22; border-radius:99px; }
//         @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
//         .fade-up { animation: fadeUp .2s ease both; }
//       `}</style>

//       {/* Toast */}
//       {toastMsg && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] bg-[#071510] border border-[#00c896] text-[#00c896] text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg fade-up flex items-center gap-2">
//           <CheckCircle2 size={13} />{toastMsg}
//         </div>
//       )}

//       {/* ── Nav ── */}
//       <div className="bg-[#040f08] border-b border-[#0d3a22] sticky top-0 z-20">
//         <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-13 gap-3 py-2">
//           <div className="flex gap-1">
//             {[
//               { key: "schedule", label: "Schedule", icon: Calendar },
//               { key: "unavailability", label: "Blocked Dates", icon: Ban },
//             ].map(({ key, label, icon: Icon }) => (
//               <button key={key} onClick={() => setTab(key)}
//                 className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${tab === key ? "bg-[#00c89614] border border-[#006a52] text-[#00c896]" : "text-[#4d9970] hover:text-white border border-transparent"}`}>
//                 <Icon size={12} />{label}
//                 {key === "unavailability" && unavailRecs.length > 0 && (
//                   <span className="text-[9px] bg-[#0a1f12] border border-[#0d3a22] px-1.5 py-0.5 rounded-full font-bold text-[#4d9970]">{unavailRecs.length}</span>
//                 )}
//               </button>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             {tab === "schedule" && showView && <button onClick={handleEdit} className={C.outline}><Edit2 size={12} />Edit</button>}
//             {tab === "schedule" && !showView && (
//               <>
//                 {editMode && <button onClick={handleCancel} className={C.outline}><X size={12} />Discard</button>}
//                 <button onClick={handleSave} disabled={saving} className={C.primary}>
//                   <Save size={12} />{saving ? "Saving…" : "Save"}
//                 </button>
//               </>
//             )}
//             {tab === "unavailability" && (
//               <button onClick={() => setShowModal(true)} className={C.primary}><Plus size={12} />Add Block</button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-5">

//         {/* ════ SCHEDULE TAB ════ */}
//         {tab === "schedule" && (
//           <>
//             {showView && (
//               <Section title="Your Schedule" icon={CheckCircle2}
//                 right={<span className="text-[10px] text-[#234433]">{tz.replace(/_/g, " ")}</span>}>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
//                   {ALL_DAYS.map((day) => {
//                     const slot = daySlots.find((s) => s.day === day);
//                     const block = slot?.enabled ? activeBlock(unavailRecs, day) : null;
//                     return (
//                       <div key={day} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs ${block ? "border-[#5c1a22] bg-[#f0506008]" : slot?.enabled ? "border-[#163d28] bg-[#071510]" : "border-dashed border-[#0d3a22] bg-[#020e08]"}`}>
//                         <span className={`font-mono font-bold w-7 text-[10px] uppercase ${block ? "text-[#f05060]" : slot?.enabled ? "text-[#00c896]" : "text-[#1a3d28]"}`}>{day}</span>
//                         {slot?.enabled && !block && <><Clock size={10} className="text-[#1a3d28]" /><span className="text-[#c8ffe0]">{slot.from}–{slot.to}</span>
//                         </>}
//                         {block && <span className="text-[#f05060]">Blocked → {fmtShort(block.unavailableTo)}</span>}
//                         {!slot?.enabled && <span className="text-[#1a3d28] italic">Rest</span>}
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-[#0d3a22] text-xs text-[#4d9970]">
//                   <span><strong className="text-[#00c896]">{spw}</strong> session{spw > 1 ? "s" : ""}/wk</span>
//                   <span className="text-[#1a3d28]">·</span>
//                   <span>Plans: <strong className="text-[#00c896]">{apiMonths.map((m) => `${m}mo`).join(", ")}</strong></span>
//                   {notes && <span className="italic text-[#1a3d28] w-full sm:w-auto">{notes}</span>}
//                 </div>
//               </Section>
//             )}

//             {!showView && (
//               <div className="fade-up">
//                 {editMode && (
//                   <div className="flex items-center gap-2 mb-4 bg-[#1a12001a] border border-[#5c420066] rounded-xl px-3.5 py-2.5 text-xs text-[#f0b429]">
//                     <AlertCircle size={13} className="flex-shrink-0" />Editing — unsaved changes won't be applied.
//                   </div>
//                 )}
//                 <Section title="Capacity & Timezone" icon={Clock}>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div>
//                       <label className={C.label}>Sessions / Week</label>
//                       <div className="flex gap-1.5">
//                         {[1, 2, 3, 4, 5].map((n) => (
//                           <button key={n} type="button" onClick={() => setSpw(n)}
//                             className={`flex-1 py-2 rounded-lg border text-xs font-bold transition ${spw === n ? "bg-[#00c89614] border-[#00c896] text-[#00c896]" : "bg-[#020e08] border-[#0d3a22] text-[#4d9970] hover:border-[#163d28]"}`}>
//                             {n}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <label className={C.label}>Available Plans</label>
//                       <div className="flex gap-1.5">
//                         {MONTH_OPTS.map(({ v, l }) => {
//                           const on = months.has(v);
//                           return (
//                             <button key={v} type="button" onClick={() => setMonths((p) => { const n = new Set(p); if (n.has(v)) { if (n.size > 1) n.delete(v); } else n.add(v); return n; })}
//                               className={`flex-1 py-2 rounded-lg border text-xs font-bold transition ${on ? "bg-[#00c89614] border-[#006a52] text-[#00c896]" : "bg-[#020e08] border-[#0d3a22] text-[#4d9970] hover:border-[#163d28]"}`}>
//                               {l}
//                             </button>
//                           );
//                         })}
//                       </div>
//                     </div>
//                     <div>
//                       <label className={C.label}>Timezone</label>
//                       <div className="relative">
//                         <select value={tz} onChange={(e) => setTz(e.target.value)} className={C.input}>
//                           {TIMEZONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
//                         </select>
//                         <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a3d28] pointer-events-none" />
//                       </div>
//                     </div>
//                   </div>
//                 </Section>

//                 <Section title="Weekly Schedule" icon={Calendar}
//                   right={<span className="text-[10px] text-[#1a3d28]">{enabledSlots.length}/5 active</span>}>
//                   <div className="space-y-2">
//                     {daySlots.map((slot, i) => (
//                       <div key={`${slot.day}-${i}`}
//                         className={`flex flex-wrap items-center gap-2.5 px-3 py-2.5 rounded-lg border transition ${slot.enabled ? "border-[#163d28] bg-[#071510]" : "border-dashed border-[#0d3a22] bg-[#020e08]"}`}>
//                         <Toggle on={slot.enabled} onChange={() => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, enabled: !s.enabled } : s))} />
//                         <span className={`text-[10px] font-mono font-bold w-7 uppercase ${slot.enabled ? "text-[#00c896]" : "text-[#1a3d28]"}`}>{slot.day}</span>
//                         {slot.enabled ? (
//                           <div className="flex flex-wrap items-center gap-2 flex-1">
//                             {[["from", "From"], ["to", "To"]].map(([f, lbl]) => (
//                               <div key={f} className="flex items-center gap-1">
//                                 <span className="text-[10px] text-[#1a3d28]">{lbl}</span>
//                                 <select value={slot[f]} onChange={(e) => setDaySlots((p) => p.map((s, idx) => idx === i ? { ...s, [f]: e.target.value } : s))}
//                                   className="bg-[#020e08] border border-[#0d3a22] text-[#00c896] rounded-lg px-2 py-1 text-[11px] font-mono font-bold outline-none focus:border-[#00c896] transition cursor-pointer">
//                                   {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
//                                 </select>
//                               </div>
//                             ))}
//                             <span className="text-[10px] text-[#1a3d28] font-mono ml-auto sm:ml-0">
//                               {Math.max(parseInt(slot.to) - parseInt(slot.from), 0)}h
//                             </span>
//                             <div className="ml-auto flex gap-1">
//                               <button type="button"
//                                 onClick={() => setDaySlots((p) => { const c = [...p]; c.splice(i + 1, 0, { ...slot }); return c; })}
//                                 className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#00c89614] border border-[#006a52] hover:bg-[#00c89624] transition">
//                                 <Plus size={10} className="text-[#00c896]" />
//                               </button>
//                               <button type="button" onClick={() => setDaySlots((p) => p.filter((_, idx) => idx !== i))}
//                                 className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#f0506012] border border-[#5c1a22] hover:bg-[#f0506022] transition">
//                                 <X size={10} className="text-[#f05060]" />
//                               </button>
//                             </div>
//                           </div>
//                         ) : <span className="text-xs text-[#1a3d28] italic">Rest day</span>}
//                       </div>
//                     ))}
//                   </div>
//                 </Section>

//                 <Section title="Notes for Learners" icon={Info}>
//                   <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
//                     placeholder="e.g. Come prepared with weekly goals…"
//                     className={`${C.input} resize-y leading-relaxed`} />
//                 </Section>

//                 <div className="flex justify-end gap-2">
//                   {editMode && <button onClick={handleCancel} className={C.outline}><X size={12} />Discard</button>}
//                   <button onClick={handleSave} disabled={saving} className={C.primary}>
//                     <Save size={12} />{saving ? "Saving…" : "Save Schedule"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* ════ BLOCKED DATES TAB ════ */}
//         {tab === "unavailability" && (
//           <>
//             <div className="flex items-start gap-2.5 mb-4 bg-[#001a1214] border border-[#0d3a22] rounded-xl px-4 py-3 text-xs text-[#4d9970]">
//               <Info size={13} className="text-[#00c896] flex-shrink-0 mt-0.5" />
//               <p>Blocking a date range  auto-extendsall affected mentee subscriptions by the exact working days lost — so they always get their full plan.</p>
//             </div>

//             {!unavailRecs.length ? (
//               <div className="bg-[#040f08] border border-dashed border-[#0d3a22] rounded-xl p-12 text-center">
//                 <CheckCircle2 size={28} className="text-[#00c896] mx-auto mb-3 opacity-30" />
//                 <p className="font-bold text-white text-sm">No blocked periods</p>
//                 <p className="text-xs text-[#4d9970] mt-1">All your days are open.</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {unavailRecs.map((u) => {
//                   const today = new Date(); today.setHours(0, 0, 0, 0);
//                   const from = new Date(u.unavailableFrom); from.setHours(0, 0, 0, 0);
//                   const to = new Date(u.unavailableTo); to.setHours(23, 59, 59, 999);
//                   const isActive = today >= from && today <= to;
//                   const isPast = new Date(u.unavailableTo) < new Date();
//                   const blocked = [...(u.daysOfWeek || [])].sort((a, b) => a - b).map((i) => ALL_DAYS[i]);
//                   const status = isActive ? "active" : isPast ? "default" : "upcoming";
//                   const statusLbl = isActive ? "Active" : isPast ? "Past" : "Upcoming";

//                   return (
//                     <div key={u._id} className={`bg-[#040f08] border rounded-xl overflow-hidden ${isPast ? "opacity-55" : ""} ${isActive ? "border-[#5c1a22]" : "border-[#0d3a22]"}`}>
//                       <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isActive ? "border-[#5c1a22] bg-[#f0506008]" : "border-[#0d3a22] bg-[#071510]"}`}>
//                         <div className="flex items-center gap-2.5 flex-wrap">
//                           <Badge variant={status}>{statusLbl}</Badge>
//                           <span className="text-[11px] text-[#234433] font-mono">{fmtShort(u.unavailableFrom)} → {fmtShort(u.unavailableTo)}</span>
//                         </div>
//                         <button onClick={() => setDelTarget(u)} className={C.danger}><Trash2 size={11} />Delete</button>
//                       </div>
//                       <div className="p-4">
//                         <p className="font-bold text-white text-sm mb-2">{u.reason}</p>
//                         {blocked.length > 0 && (
//                           <div className="flex flex-wrap gap-1.5">
//                             {blocked.map((d) => {
//                               const sl = enabledSlots.find((s) => s.day === d);
//                               return (
//                                 <span key={d} className="text-[11px] bg-[#f0506010] border border-[#5c1a22] text-[#f05060] font-mono px-2.5 py-1 rounded-lg">
//                                   {d}{sl ? ` ${sl.from}–${sl.to}` : ""}
//                                 </span>
//                               );
//                             })}
//                           </div>
//                         )}
//                         {u.notes && <p className="text-xs text-[#4d9970] italic mt-2">{u.notes}</p>}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* ════ ADD BLOCK MODAL ════ */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
//           <div className="bg-[#040f08] border border-[#0d3a22] rounded-xl shadow-2xl w-full max-w-md my-4 fade-up">
//             <div className="flex items-center justify-between px-5 py-4 border-b border-[#0d3a22]">
//               <div>
//                 <p className="font-bold text-white text-sm">Block a Date Range</p>
//                 <p className="text-xs text-[#4d9970] mt-0.5">Affected mentee plans will auto-extend</p>
//               </div>
//               <button onClick={() => setShowModal(false)} className="text-[#4d9970] hover:text-white transition"><X size={17} /></button>
//             </div>

//             <form onSubmit={handleAddBlock} className="p-5 space-y-4 ds overflow-y-auto max-h-[70vh]">

//               {/* ── Date range ── */}
//               <div className="grid grid-cols-2 gap-3">
//                 {[["unavailableFrom", "From"], ["unavailableTo", "To"]].map(([key, lbl]) => (
//                   <div key={key}>
//                     <label className={C.label}>{lbl} <span className="text-[#f05060]">*</span></label>
//                     <input type="date" required value={form[key]}
//                       min={new Date().toISOString().slice(0, 10)}
//                       onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
//                       className={hasOverlap || dateOrderErr ? C.inputErr : C.input} />
//                   </div>
//                 ))}
//               </div>

//               {/* ── Date order error ── */}
//               {dateOrderErr && (
//                 <div className="flex items-center gap-2 rounded-lg border border-[#5c4200] bg-[#1a12001a] px-3 py-2.5 text-xs text-[#f0b429]">
//                   <AlertCircle size={13} className="flex-shrink-0" />
//                   "To" date must be on or after "From" date.
//                 </div>
//               )}

//               {/* ── Overlap error ── */}
//               {!dateOrderErr && hasOverlap && (
//                 <div className="rounded-lg border border-[#5c1a22] bg-[#f0506008] px-3 py-3 text-xs space-y-2">
//                   <div className="flex items-center gap-2 text-[#f05060] font-bold">
//                     <AlertTriangle size={13} className="flex-shrink-0" />
//                     This range overlaps with {overlaps.length} existing block{overlaps.length > 1 ? "s" : ""} — choose different dates.
//                   </div>
//                   <div className="flex flex-col gap-1 pl-5">
//                     {overlaps.map((o) => (
//                       <span key={o._id} className="text-[#f05060] font-mono opacity-80">
//                         · {o.reason} &nbsp;({fmtShort(o.unavailableFrom)} – {fmtShort(o.unavailableTo)})
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* ── Affected days preview (only when no errors) ── */}
//               {form.unavailableFrom && form.unavailableTo && !dateOrderErr && !hasOverlap && (
//                 <div className={`rounded-lg p-3 border text-xs ${affectedDays.length ? "border-[#5c1a22] bg-[#f0506008]" : "border-[#5c4200] bg-[#1a120012]"}`}>
//                   {affectedDays.length ? (
//                     <>
//                       <p className="text-[#f05060] font-semibold mb-2">
//                         {affectedDays.length} working day{affectedDays.length > 1 ? "s" : ""} blocked — mentee plans extended by same amount:
//                       </p>
//                       <div className="flex flex-wrap gap-1.5">
//                         {affectedDays.map((d) => {
//                           const sl = enabledSlots.find((s) => s.day === d);
//                           return (
//                             <span key={d} className="bg-[#071510] border border-[#5c1a22] text-[#f05060] font-mono px-2 py-1 rounded">
//                               {d}{sl ? ` ${sl.from}–${sl.to}` : ""}
//                             </span>
//                           );
//                         })}
//                       </div>
//                     </>
//                   ) : (
//                     <p className="text-[#f0b429] flex items-center gap-1.5"><AlertCircle size={12} />No working days fall in this range — nothing will be blocked.</p>
//                   )}
//                 </div>
//               )}

//               {/* ── Reason ── */}
//               <div>
//                 <label className={C.label}>Reason <span className="text-[#f05060]">*</span></label>
//                 <div className="relative">
//                   <select required value={form.reason}
//                     onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value, customReason: "" }))}
//                     className={C.input}>
//                     <option value="" disabled>Select a reason…</option>
//                     {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
//                   </select>
//                   <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a3d28] pointer-events-none" />
//                 </div>
//                 {form.reason === "Other" && (
//                   <input type="text" required placeholder="Describe your reason…" value={form.customReason}
//                     onChange={(e) => setForm((p) => ({ ...p, customReason: e.target.value }))}
//                     className={`${C.input} mt-2`} />
//                 )}
//               </div>

//               {/* ── Timezone ── */}
//               <div>
//                 <label className={C.label}>Timezone <span className="text-[#f05060]">*</span></label>
//                 <div className="relative">
//                   <select required value={form.timeZone} onChange={(e) => setForm((p) => ({ ...p, timeZone: e.target.value }))} className={C.input}>
//                     {TIMEZONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
//                   </select>
//                   <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1a3d28] pointer-events-none" />
//                 </div>
//               </div>

//               {/* ── Notes ── */}
//               <div>
//                 <label className={C.label}>Notes <span className="text-[10px] font-normal normal-case tracking-normal text-[#1a3d28]">(optional)</span></label>
//                 <textarea rows={2} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
//                   placeholder="Context for learners…" className={`${C.input} resize-y`} />
//               </div>

//               <div className="flex gap-2 pt-1">
//                 <button type="button" onClick={() => setShowModal(false)} className={`${C.outline} flex-1 justify-center`}>Cancel</button>
//                 <button type="submit" disabled={submitDisabled} className={`${C.primary} flex-1 justify-center`}>
//                   {addingBlock ? "Saving…" : "Confirm Block"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ════ DELETE CONFIRM ════ */}
//       {delTarget && (
//         <DeleteModal record={delTarget} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} busy={deletingBlock} />
//       )}
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
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
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function MentorAvailability() {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const TIMES = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`);
  const MONTHS = [
    { value: 1, label: "1 Month" },
    { value: 3, label: "3 Months" },
    { value: 6, label: "6 Months" },
  ];

  const TIMEZONES = [
    "Asia/Kolkata",
    "Europe/London",
    "Asia/Dubai",
    "America/New_York",
  ];

  const [tab, setTab] = useState("schedule");
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [schedule, setSchedule] = useState(
    DAYS.map((day) => ({
      day,
      enabled: true,
      from: "09:00",
      to: "10:00",
    }))
  );

  const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [notes, setNotes] = useState("");
  const [plans, setPlans] = useState([1]);

  const enabledSlots = useMemo(
    () => schedule.filter((item) => item.enabled),
    [schedule]
  );

  const styles = {
    input:
      "w-full border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#0098cc]",

    primary:
      "bg-[#1a1a2e] hover:opacity-90 text-white px-4 py-2 rounded-xl font-semibold text-sm inline-flex items-center gap-2",

    outline:
      "border border-gray-300 bg-white text-gray-700 hover:border-[#0098cc] px-4 py-2 rounded-xl font-medium text-sm inline-flex items-center gap-2",

    card:
      "bg-white border border-gray-200 rounded-2xl shadow-sm",

    label:
      "text-xs font-semibold text-gray-500 mb-1 block",
  };

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
  };

  const handleTogglePlan = (value) => {
    setPlans((prev) =>
      prev.includes(value)
        ? prev.length > 1
          ? prev.filter((v) => v !== value)
          : prev
        : [...prev, value]
    );
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-700">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              Mentor Availability
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your weekly schedule and blocked dates
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setTab("schedule")}
              className={`${tab === "schedule" ? styles.primary : styles.outline}`}
            >
              <Calendar size={16} /> Schedule
            </button>

            <button
              onClick={() => setTab("blocked")}
              className={`${tab === "blocked" ? styles.primary : styles.outline}`}
            >
              <Ban size={16} /> Blocked Dates
            </button>
          </div>
        </div>

        {/* Schedule Tab */}
        {tab === "schedule" && (
          <div className="space-y-6">
            {/* Top Controls */}
            <div className={`${styles.card} p-6`}>
              <h2 className="font-semibold text-[#1a1a2e] mb-4">
                Capacity & Settings
              </h2>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className={styles.label}>Sessions Per Week</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSessionsPerWeek(num)}
                        className={`flex-1 py-2 rounded-xl border text-sm font-semibold ${
                          sessionsPerWeek === num
                            ? "bg-[#0098cc] text-white border-[#0098cc]"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={styles.label}>Available Plans</label>
                  <div className="flex gap-2">
                    {MONTHS.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleTogglePlan(item.value)}
                        className={`flex-1 py-2 rounded-xl border text-sm font-semibold ${
                          plans.includes(item.value)
                            ? "bg-[#0098cc] text-white border-[#0098cc]"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={styles.label}>Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={styles.input}
                  >
                    {TIMEZONES.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className={`${styles.card} p-6`}>
              <h2 className="font-semibold text-[#1a1a2e] mb-4">
                Weekly Schedule
              </h2>

              <div className="space-y-3">
                {schedule.map((slot, index) => (
                  <div
                    key={slot.day}
                    className="border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-4"
                  >
                    <div className="font-semibold text-[#0098cc] w-12">
                      {slot.day}
                    </div>

                    <input
                      type="time"
                      value={slot.from}
                      onChange={(e) => {
                        const updated = [...schedule];
                        updated[index].from = e.target.value;
                        setSchedule(updated);
                      }}
                      className={styles.input}
                    />

                    <input
                      type="time"
                      value={slot.to}
                      onChange={(e) => {
                        const updated = [...schedule];
                        updated[index].to = e.target.value;
                        setSchedule(updated);
                      }}
                      className={styles.input}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className={`${styles.card} p-6`}>
              <label className={styles.label}>Notes for Learners</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes for learners..."
                className={styles.input}
              />
            </div>

            {/* Save */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditMode(false)}
                className={styles.outline}
              >
                <X size={16} /> Cancel
              </button>

              <button onClick={handleSave} className={styles.primary}>
                <Save size={16} /> Save Schedule
              </button>
            </div>
          </div>
        )}

        {/* Blocked Dates */}
        {tab === "blocked" && (
          <div className={`${styles.card} p-8 text-center`}>
            <CheckCircle2 size={36} className="mx-auto text-[#0098cc]" />
            <h2 className="text-lg font-semibold text-[#1a1a2e] mt-4">
              No Blocked Dates
            </h2>
            <p className="text-gray-500 mt-2">
              Your availability is fully open right now.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className={`${styles.primary} mt-5`}
            >
              <Plus size={16} /> Add Block
            </button>
          </div>
        )}
      </div>
    </div>
  );
}










