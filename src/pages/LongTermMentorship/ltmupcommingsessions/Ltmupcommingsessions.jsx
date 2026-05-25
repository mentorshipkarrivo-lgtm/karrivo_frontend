



// // import { useState, useMemo, useEffect } from "react";
// // import {
// //   Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
// //   Loader2, X, BookOpen, ClipboardList, MessageSquare,
// //   ExternalLink, CheckCheck, Link2,
// // } from "lucide-react";
// // import {
// //   useGetSessionsByMenteeQuery,
// //   useUpdateByMenteeSessionMutation,
// // } from "./ltmupcommingsessionsapislice";

// // const fmtDate = (iso) =>
// //   iso
// //     ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
// //     : "—";

// // /* ── Shared form primitives ── */
// // function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
// //   return (
// //     <input
// //       type={type}
// //       value={value}
// //       onChange={onChange}
// //       placeholder={placeholder}
// //       readOnly={readOnly}
// //       className={`w-full text-sm rounded-lg px-3 py-2 border outline-none transition-colors
// //         ${readOnly
// //           ? "bg-slate-50 text-slate-400 border-slate-200 cursor-default"
// //           : "bg-white text-slate-800 border-slate-200 focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10"
// //         }`}
// //     />
// //   );
// // }

// // function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
// //   return (
// //     <textarea
// //       rows={rows}
// //       value={value}
// //       onChange={onChange}
// //       placeholder={placeholder}
// //       readOnly={readOnly}
// //       className={`w-full text-sm rounded-lg px-3 py-2 border outline-none resize-none leading-relaxed transition-colors
// //         ${readOnly
// //           ? "bg-slate-50 text-slate-400 border-slate-200 cursor-default"
// //           : "bg-white text-slate-800 border-slate-200 focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10"
// //         }`}
// //     />
// //   );
// // }

// // function FSel({ value, onChange, children }) {
// //   return (
// //     <select
// //       value={value}
// //       onChange={onChange}
// //       className="w-full text-sm rounded-lg px-3 py-2 border border-slate-200 bg-white text-slate-800 outline-none cursor-pointer focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10 appearance-none"
// //     >
// //       {children}
// //     </select>
// //   );
// // }

// // /* ── Star components ── */
// // function StarDisplay({ value, max = 5 }) {
// //   return (
// //     <div className="flex items-center gap-1">
// //       {Array.from({ length: max }).map((_, i) => (
// //         <span key={i} className={`text-base ${i < (value || 0) ? "text-amber-400" : "text-slate-200"}`}>★</span>
// //       ))}
// //       <span className="text-xs font-semibold text-slate-500 ml-1">{value || 0}/{max}</span>
// //     </div>
// //   );
// // }

// // function StarPicker({ value, onChange }) {
// //   const [hov, setHov] = useState(0);
// //   return (
// //     <div className="flex gap-1">
// //       {[1, 2, 3, 4, 5].map((n) => (
// //         <button
// //           key={n}
// //           type="button"
// //           onClick={() => onChange(n)}
// //           onMouseEnter={() => setHov(n)}
// //           onMouseLeave={() => setHov(0)}
// //           className={`text-2xl leading-none bg-transparent border-none cursor-pointer transition-colors p-0.5
// //             ${n <= (hov || value || 0) ? "text-amber-400" : "text-slate-200"}`}
// //         >
// //           ★
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // /* ── Session Modal ── */
// // function SessionModal({ session, onClose, onSave }) {
// //   const [saving, setSaving] = useState(false);
// //   const [tab, setTab] = useState("details");
// //   const [form, setForm] = useState({
// //     session_title: session.session_title || "",
// //     session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
// //     meeting_link: session.meeting_link || "",
// //     meeting_description: session.meeting_description || "",
// //     mentee_meeting_description: session.mentee_meeting_description || "",
// //     tasks_given: session.tasks_given || "",
// //     task_completed: session.task_completed || false,
// //     mentee_feedback: session.mentee_feedback || "",
// //     mentee_rating: session.mentee_rating || 0,
// //     status: session.status || "pending",
// //     task_submission: session.task_submission || "",
// //   });

// //   const set = (key) => (e) =>
// //     setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

// //   const handleSave = async () => {
// //     setSaving(true);
// //     await onSave(session._id, form);
// //     setSaving(false);
// //     onClose();
// //   };

// //   const TABS = [
// //     { id: "details", label: "Details", Icon: BookOpen },
// //     { id: "tasks", label: "Tasks", Icon: ClipboardList },
// //     { id: "feedback", label: "Feedback", Icon: MessageSquare },
// //   ];

// //   const num = String(session.session_number).padStart(2, "0");

// //   return (
// //     <>
// //       {/* Backdrop */}
// //       <div
// //         onClick={onClose}
// //         className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
// //       />

// //       {/* Modal */}
// //       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101]
// //         w-[min(680px,calc(100vw-32px))] max-h-[calc(100vh-48px)]
// //         bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">

// //         {/* Header */}
// //         <div className="px-6 pt-5 flex-shrink-0">
// //           <div className="flex items-center justify-between mb-4">
// //             <div className="flex items-center gap-3">
// //               <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
// //                 {num}
// //               </div>
// //               <div>
// //                 <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">
// //                   Session {session.session_number}
// //                 </p>
// //                 <h2 className="text-base font-bold text-slate-900">
// //                   {form.session_title || `Session ${session.session_number}`}
// //                 </h2>
// //               </div>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
// //             >
// //               <X size={14} />
// //             </button>
// //           </div>

// //           {/* Tabs */}
// //           <div className="flex border-b border-slate-200">
// //             {TABS.map(({ id, label, Icon }) => (
// //               <button
// //                 key={id}
// //                 onClick={() => setTab(id)}
// //                 className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors cursor-pointer bg-transparent
// //                   ${tab === id
// //                     ? "text-[#0098cc] border-[#0098cc]"
// //                     : "text-slate-400 border-transparent hover:text-slate-600"
// //                   }`}
// //               >
// //                 <Icon size={12} />{label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Body */}
// //         <div className="flex-1 overflow-y-auto px-6 py-5">

// //           {/* Details Tab */}
// //           {tab === "details" && (
// //             <div className="grid grid-cols-2 gap-4">
// //               {[
// //                 ["col-span-2", "Session Title",
// //                   <FInp value={form.session_title} onChange={set("session_title")} placeholder="e.g. Goal Setting" />],
// //                 ["col-span-1", "Date & Time",
// //                   <FInp type="datetime-local" value={form.session_date} onChange={set("session_date")} />],
// //                 ["col-span-1", "Status",
// //                   <FSel value={form.status} onChange={set("status")}>
// //                     <option value="pending">Pending</option>
// //                     <option value="completed">Completed</option>
// //                     <option value="cancelled">Cancelled</option>
// //                     <option value="missed">Missed</option>
// //                   </FSel>],
// //                 ["col-span-2", "Meeting Link",
// //                   <FInp value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://meet.google.com/…" />],
// //                 ["col-span-2", "Mentor's Description",
// //                   <FTxt value={form.meeting_description} rows={3} readOnly />],
// //                 ["col-span-2", "Your Description (Mentee)",
// //                   <FTxt value={form.mentee_meeting_description} onChange={set("mentee_meeting_description")} placeholder="Add your notes about this session…" rows={3} />],
// //               ].map(([colClass, lbl, child], i) => (
// //                 <div key={i} className={colClass}>
// //                   <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">{lbl}</label>
// //                   {child}
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Tasks Tab */}
// //           {tab === "tasks" && (
// //             <div className="flex flex-col gap-4">
// //               {session.tasks_given ? (
// //                 <div>
// //                   <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">Task by Mentor</label>
// //                   <FTxt value={form.tasks_given} rows={3} readOnly />
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center py-8 gap-2">
// //                   <ClipboardList size={28} className="text-slate-200" />
// //                   <p className="text-sm text-slate-400">No task assigned yet.</p>
// //                 </div>
// //               )}

// //               <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors
// //                 ${form.task_completed ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
// //                 <input
// //                   type="checkbox" id="tc" checked={form.task_completed} onChange={set("task_completed")}
// //                   className="w-4 h-4 accent-emerald-500 cursor-pointer"
// //                 />
// //                 <label htmlFor="tc" className={`text-sm cursor-pointer ${form.task_completed ? "text-emerald-600" : "text-slate-500"}`}>
// //                   {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
// //                 </label>
// //               </div>

// //               {session.tasks_given && (
// //                 <div className="border border-slate-200 rounded-xl overflow-hidden">
// //                   <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
// //                     <div className="flex items-center gap-2">
// //                       <ClipboardList size={13} className="text-slate-500" />
// //                       <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">Submit Task</span>
// //                     </div>
// //                     {session.task_submission && (
// //                       <div className="flex items-center gap-1.5">
// //                         <CheckCheck size={12} className="text-emerald-500" />
// //                         <span className="text-[11px] font-semibold text-emerald-600">Previously Submitted</span>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div className="px-4 py-3 flex flex-col gap-3">
// //                     <div className="relative">
// //                       <Link2 size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
// //                       <input
// //                         type="url" value={form.task_submission} onChange={set("task_submission")}
// //                         placeholder="Paste Google Drive or GitHub link…"
// //                         className="w-full text-xs rounded-lg pl-8 pr-3 py-2 border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10 transition-colors"
// //                       />
// //                     </div>
// //                     {form.task_submission && (
// //                       <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
// //                         <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
// //                         <a
// //                           href={form.task_submission} target="_blank" rel="noopener noreferrer"
// //                           className="text-xs text-emerald-700 no-underline flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
// //                         >
// //                           {form.task_submission}
// //                         </a>
// //                         <ExternalLink size={11} className="text-emerald-600" />
// //                       </div>
// //                     )}
// //                     <p className="text-[11px] text-slate-400 m-0">
// //                       Link will be saved when you click <strong>Save Changes</strong>.
// //                     </p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Feedback Tab */}
// //           {tab === "feedback" && (
// //             <div className="flex flex-col gap-5">
// //               <div>
// //                 <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1.5">Your Feedback</label>
// //                 <FTxt value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share your thoughts…" rows={4} />
// //               </div>
// //               <div>
// //                 <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-2">Rate Your Mentor</label>
// //                 <div className="flex items-center gap-3">
// //                   <StarPicker value={form.mentee_rating} onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))} />
// //                   <span className="text-xs text-slate-400">{form.mentee_rating > 0 ? `${form.mentee_rating}/5` : "Not rated"}</span>
// //                 </div>
// //               </div>
// //               {session.mentor_feedback && (
// //                 <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
// //                   <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">Mentor's Feedback</p>
// //                   <p className="text-sm text-slate-600 leading-relaxed m-0">{session.mentor_feedback}</p>
// //                   {session.mentor_rating > 0 && <div className="mt-2"><StarDisplay value={session.mentor_rating} /></div>}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div className="flex justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-slate-50 flex-shrink-0">
// //           <button
// //             onClick={onClose}
// //             className="px-5 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleSave}
// //             disabled={saving}
// //             className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white border-none transition-colors cursor-pointer
// //               ${saving ? "bg-[#1a1a2e]/60 cursor-not-allowed" : "bg-[#1a1a2e] hover:bg-[#16213e]"}`}
// //           >
// //             {saving ? <><Loader2 size={12} className="animate-spin" />Saving…</> : "Save Changes"}
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // /* ── Mobile Card ── */
// // function MobileCard({ session, onEdit }) {
// //   const num = String(session.session_number).padStart(2, "0");
// //   const taskSubmitted = !!session.task_submission;
// //   const hasTask = !!session.tasks_given;

// //   return (
// //     <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center gap-2">
// //           <span className="text-[11px] font-bold text-slate-400">#{num}</span>
// //           <span className="text-sm font-semibold text-slate-800">
// //             {session.session_title || `Session ${session.session_number}`}
// //           </span>
// //         </div>
// //         <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5 capitalize">
// //           {session.status}
// //         </span>
// //       </div>

// //       <div className="grid grid-cols-2 gap-x-4 gap-y-2">
// //         {[
// //           ["Date", fmtDate(session.session_date)],
// //           ["Task", hasTask ? (taskSubmitted ? "Submitted" : "Pending") : "—"],
// //           ["Rating", session.mentee_rating ? `${session.mentee_rating}/5` : "—"],
// //           ["Feedback", session.mentee_feedback
// //             ? session.mentee_feedback.slice(0, 40) + (session.mentee_feedback.length > 40 ? "…" : "")
// //             : "—"],
// //         ].map(([l, v]) => (
// //           <div key={l}>
// //             <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">{l}</div>
// //             <div className="text-xs text-slate-600">{v}</div>
// //           </div>
// //         ))}
// //       </div>

// //       <button
// //         onClick={() => onEdit(session)}
// //         className="self-start px-4 py-1.5 rounded-lg bg-[#1a1a2e] text-white text-xs font-semibold hover:bg-[#16213e] transition-colors cursor-pointer border-none"
// //       >
// //         View Details
// //       </button>
// //     </div>
// //   );
// // }

// // /* ── Toast ── */
// // function Toast({ toast }) {
// //   if (!toast) return null;
// //   const ok = toast.type === "success";
// //   return (
// //     <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium bg-white shadow-xl border
// //       ${ok ? "border-emerald-200 text-emerald-700" : "border-red-200 text-red-500"}`}>
// //       {ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
// //       {toast.msg}
// //     </div>
// //   );
// // }

// // /* ── Main Component ── */
// // export default function Ltmupcommingsessions() {
// //   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
// //   const { data: result, isLoading, isError } = useGetSessionsByMenteeQuery(userData?._id);
// //   const [updateSession] = useUpdateByMenteeSessionMutation();

// //   const [perPage, setPerPage] = useState(10);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [taskFilter, setTaskFilter] = useState("all");
// //   const [sortOrder, setSortOrder] = useState("newest");
// //   const [search, setSearch] = useState("");
// //   const [editSession, setEditSession] = useState(null);
// //   const [toast, setToast] = useState(null);

// //   const sessions = result?.data ?? [];
// //   const totalSessions = sessions.length;
// //   const tasksCompleted = sessions.filter((s) => s.task_completed).length;

// //   const displayed = useMemo(() => {
// //     let list = [...sessions];
// //     if (taskFilter === "done") list = list.filter((s) => s.task_completed);
// //     if (taskFilter === "pending") list = list.filter((s) => s.tasks_given && !s.task_completed);
// //     if (taskFilter === "none") list = list.filter((s) => !s.tasks_given);
// //     if (search.trim()) {
// //       const q = search.toLowerCase();
// //       list = list.filter((s) =>
// //         (s.session_title || "").toLowerCase().includes(q) ||
// //         (s.meeting_description || "").toLowerCase().includes(q)
// //       );
// //     }
// //     list.sort((a, b) => {
// //       const da = new Date(a.session_date || 0), db = new Date(b.session_date || 0);
// //       return sortOrder === "newest" ? db - da : da - db;
// //     });
// //     return list;
// //   }, [sessions, taskFilter, sortOrder, search]);

// //   useEffect(() => setCurrentPage(1), [taskFilter, sortOrder, search, perPage]);
// //   const totalPages = Math.ceil(displayed.length / perPage);
// //   const paginated = displayed.slice((currentPage - 1) * perPage, currentPage * perPage);

// //   const showToast = (msg, type = "success") => {
// //     setToast({ msg, type });
// //     setTimeout(() => setToast(null), 3500);
// //   };

// //   const handleSave = async (session_id, form) => {
// //     try {
// //       await updateSession({ session_id, ...form }).unwrap();
// //       showToast("Session updated.");
// //     } catch {
// //       showToast("Failed to update session.", "error");
// //     }
// //   };

// //   const selectCls = "text-sm rounded-lg px-3 py-2 border border-slate-200 bg-white text-slate-700 outline-none cursor-pointer focus:border-[#0098cc] appearance-none";

// //   return (
// //     <div className="min-h-screen bg-slate-50 font-sans">

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

// //         {/* Stat cards */}
// //         <div className="flex flex-wrap gap-4 mb-6">
// //           {[
// //             { Icon: Layers, label: "Total Sessions", value: totalSessions },
// //             { Icon: ClipboardCheck, label: "Tasks Completed", value: `${tasksCompleted}/${totalSessions}` },
// //           ].map(({ Icon, label, value }) => (
// //             <div
// //               key={label}
// //               className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4 flex-1 min-w-[160px]"
// //             >
// //               <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
// //                 <Icon size={18} className="text-[#0098cc]" />
// //               </div>
// //               <div>
// //                 <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">{label}</p>
// //                 <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Main panel */}
// //         <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

// //           {/* Panel header */}
// //           <div className="px-5 pt-5 border-b border-slate-200">
// //             <h2 className="text-base font-bold text-[#0098cc] mb-4">My Sessions</h2>

// //             {/* Toolbar */}
// //             <div className="flex flex-wrap items-center gap-2.5 pb-4">
// //               <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className={`${selectCls} w-20`}>
// //                 <option value={10}>10</option>
// //                 <option value={30}>30</option>
// //                 <option value={50}>50</option>
// //               </select>

// //               <div className="flex-1" />

// //               <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)} className={`${selectCls} w-36`}>
// //                 <option value="all">All Tasks</option>
// //                 <option value="done">Completed</option>
// //                 <option value="pending">Pending</option>
// //                 <option value="none">No Task</option>
// //               </select>

// //               <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={`${selectCls} w-36`}>
// //                 <option value="newest">Newest First</option>
// //                 <option value="oldest">Oldest First</option>
// //               </select>

// //               <div className="relative">
// //                 <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2}
// //                   className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
// //                 </svg>
// //                 <input
// //                   value={search} onChange={(e) => setSearch(e.target.value)}
// //                   placeholder="Search session…"
// //                   className="w-44 text-sm rounded-lg pl-9 pr-3 py-2 border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/10 transition-colors"
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Loading */}
// //           {isLoading && (
// //             <div className="flex flex-col items-center py-16 gap-3">
// //               <Loader2 size={24} className="text-slate-300 animate-spin" />
// //               <p className="text-sm text-slate-400">Loading sessions…</p>
// //             </div>
// //           )}

// //           {/* Error */}
// //           {isError && (
// //             <div className="flex items-center gap-2.5 m-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
// //               <AlertCircle size={14} className="text-red-500" />
// //               <p className="text-sm text-red-500 m-0">Failed to load sessions. Please refresh.</p>
// //             </div>
// //           )}

// //           {/* Empty */}
// //           {!isLoading && !isError && paginated.length === 0 && (
// //             <div className="flex flex-col items-center py-16 gap-2">
// //               <Layers size={26} className="text-slate-200" />
// //               <p className="text-sm text-slate-400">No sessions found.</p>
// //             </div>
// //           )}

// //           {/* Desktop table */}
// //           {!isLoading && !isError && paginated.length > 0 && (
// //             <div className="hidden md:block overflow-x-auto">
// //               <table className="w-full border-collapse">
// //                 <thead>
// //                   <tr>
// //                     {["S.No", "Session", "Date", "Description", "Tasks Given", "Task Status", "Rating", "Feedback"].map((h) => (
// //                       <th key={h}
// //                         className="px-4 py-3 text-[11px] font-bold text-slate-500 text-left whitespace-nowrap tracking-wider uppercase bg-slate-50 border-b border-slate-200">
// //                         {h}
// //                       </th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {paginated.map((session, i) => {
// //                     const taskSubmitted = !!session.task_submission;
// //                     const hasTask = !!session.tasks_given;
// //                     return (
// //                       <tr
// //                         key={session._id}
// //                         onClick={() => setEditSession(session)}
// //                         className="border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
// //                       >
// //                         <td className="px-4 py-3 text-sm text-slate-400">
// //                           {(currentPage - 1) * perPage + i + 1}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm font-semibold text-[#0098cc]">
// //                           {session.session_title || `Session ${session.session_number}`}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
// //                           {fmtDate(session.session_date)}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm max-w-[180px]">
// //                           <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[160px] text-slate-500">
// //                             {session.meeting_description || <span className="text-slate-300">—</span>}
// //                           </p>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm max-w-[160px]">
// //                           <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] text-slate-500">
// //                             {session.tasks_given || <span className="text-slate-300">—</span>}
// //                           </p>
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {hasTask ? (
// //                             <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 whitespace-nowrap border
// //                               ${taskSubmitted
// //                                 ? "text-emerald-700 bg-emerald-50 border-emerald-200"
// //                                 : "text-slate-500 bg-slate-50 border-slate-200"
// //                               }`}>
// //                               {taskSubmitted ? <><CheckCircle2 size={11} />Done</> : <><Circle size={11} />Pending</>}
// //                             </span>
// //                           ) : <span className="text-slate-300">—</span>}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm">
// //                           {session.mentee_rating > 0
// //                             ? <StarDisplay value={session.mentee_rating} />
// //                             : <span className="text-slate-300">—</span>}
// //                         </td>
// //                         <td className="px-4 py-3 text-sm max-w-[180px]">
// //                           <p className="m-0 overflow-hidden line-clamp-2 max-w-[160px] text-slate-500">
// //                             {session.mentee_feedback || <span className="text-slate-300">—</span>}
// //                           </p>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>

// //               {/* Pagination */}
// //               <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 flex-wrap gap-3">
// //                 <span className="text-sm text-slate-400">
// //                   Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, displayed.length)} of {displayed.length}
// //                 </span>
// //                 <div className="flex items-center gap-1.5">
// //                   <button
// //                     onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //                     disabled={currentPage === 1}
// //                     className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
// //                   >
// //                     ← Prev
// //                   </button>
// //                   {Array.from({ length: totalPages }, (_, i) => i + 1)
// //                     .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
// //                     .reduce((acc, p, idx, arr) => {
// //                       if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
// //                       acc.push(p);
// //                       return acc;
// //                     }, [])
// //                     .map((p, idx) =>
// //                       p === "..." ? (
// //                         <span key={`e-${idx}`} className="text-sm text-slate-400 px-1">…</span>
// //                       ) : (
// //                         <button
// //                           key={p}
// //                           onClick={() => setCurrentPage(p)}
// //                           className={`w-8 h-8 rounded-lg text-sm font-semibold border transition-colors cursor-pointer
// //                             ${currentPage === p
// //                               ? "bg-[#1a1a2e] text-white border-[#1a1a2e]"
// //                               : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
// //                             }`}
// //                         >
// //                           {p}
// //                         </button>
// //                       )
// //                     )}
// //                   <button
// //                     onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
// //                     disabled={currentPage === totalPages}
// //                     className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
// //                   >
// //                     Next →
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Mobile cards */}
// //           {!isLoading && !isError && paginated.length > 0 && (
// //             <div className="flex md:hidden flex-col gap-3 p-4">
// //               {paginated.map((session) => (
// //                 <MobileCard key={session._id} session={session} onEdit={setEditSession} />
// //               ))}
// //               {/* Mobile pagination */}
// //               <div className="flex items-center justify-between pt-2">
// //                 <button
// //                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
// //                   disabled={currentPage === 1}
// //                   className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1a1a2e] text-white hover:bg-[#16213e] disabled:opacity-40 disabled:cursor-not-allowed border-none cursor-pointer"
// //                 >
// //                   ← Prev
// //                 </button>
// //                 <span className="text-xs text-slate-400">{currentPage} / {totalPages}</span>
// //                 <button
// //                   onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
// //                   disabled={currentPage === totalPages}
// //                   className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1a1a2e] text-white hover:bg-[#16213e] disabled:opacity-40 disabled:cursor-not-allowed border-none cursor-pointer"
// //                 >
// //                   Next →
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {editSession && (
// //         <SessionModal
// //           session={editSession}
// //           onClose={() => setEditSession(null)}
// //           onSave={handleSave}
// //           onToast={showToast}
// //         />
// //       )}
// //       <Toast toast={toast} />
// //     </div>
// //   );
// // }




// import { useState, useMemo, useEffect } from "react";
// import {
//   Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
//   Loader2, X, BookOpen, ClipboardList, MessageSquare,
//   ExternalLink, CheckCheck, Link2, Search, ChevronLeft, ChevronRight,
// } from "lucide-react";
// import {
//   useGetSessionsByMenteeQuery,
//   useUpdateByMenteeSessionMutation,
// } from "./ltmupcommingsessionsapislice";

// const fmtDate = (iso) =>
//   iso
//     ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
//     : "—";

// /* ── Global scrollbar hide ── */
// const globalStyles = `
//   * { box-sizing: border-box; }
//   ::-webkit-scrollbar { width: 0px; height: 0px; }
//   * { scrollbar-width: none; -ms-overflow-style: none; }
// `;

// /* ── Shared form primitives ── */
// function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
//   return (
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "9px 12px",
//         border: "1.5px solid",
//         outline: "none",
//         transition: "border-color 0.15s",
//         background: readOnly ? "#f8fafc" : "#fff",
//         color: readOnly ? "#94a3b8" : "#1e293b",
//         borderColor: readOnly ? "#e2e8f0" : "#e2e8f0",
//         cursor: readOnly ? "default" : "text",
//         fontFamily: "inherit",
//       }}
//       onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
//       onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
//     />
//   );
// }

// function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
//   return (
//     <textarea
//       rows={rows}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "9px 12px",
//         border: "1.5px solid",
//         outline: "none",
//         resize: "none",
//         lineHeight: 1.6,
//         transition: "border-color 0.15s",
//         background: readOnly ? "#f8fafc" : "#fff",
//         color: readOnly ? "#94a3b8" : "#1e293b",
//         borderColor: "#e2e8f0",
//         cursor: readOnly ? "default" : "text",
//         fontFamily: "inherit",
//       }}
//       onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
//       onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
//     />
//   );
// }

// function FSel({ value, onChange, children }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       style={{
//         width: "100%",
//         fontSize: 13,
//         borderRadius: 10,
//         padding: "9px 12px",
//         border: "1.5px solid #e2e8f0",
//         background: "#fff",
//         color: "#1e293b",
//         outline: "none",
//         cursor: "pointer",
//         appearance: "none",
//         fontFamily: "inherit",
//       }}
//     >
//       {children}
//     </select>
//   );
// }

// /* ── Stars ── */
// function StarDisplay({ value, max = 5 }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
//       {Array.from({ length: max }).map((_, i) => (
//         <span key={i} style={{ fontSize: 14, color: i < (value || 0) ? "#f59e0b" : "#e2e8f0" }}>★</span>
//       ))}
//       <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginLeft: 4 }}>{value || 0}/{max}</span>
//     </div>
//   );
// }

// function StarPicker({ value, onChange }) {
//   const [hov, setHov] = useState(0);
//   return (
//     <div style={{ display: "flex", gap: 4 }}>
//       {[1, 2, 3, 4, 5].map((n) => (
//         <button
//           key={n}
//           type="button"
//           onClick={() => onChange(n)}
//           onMouseEnter={() => setHov(n)}
//           onMouseLeave={() => setHov(0)}
//           style={{
//             fontSize: 22,
//             lineHeight: 1,
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             padding: 2,
//             color: n <= (hov || value || 0) ? "#f59e0b" : "#e2e8f0",
//             transition: "color 0.1s",
//           }}
//         >★</button>
//       ))}
//     </div>
//   );
// }

// /* ── Status Badge ── */
// function StatusBadge({ status }) {
//   const map = {
//     pending:   { bg: "#eff9fd", color: "#0083b1", dot: "#0083b1", label: "Pending" },
//     completed: { bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a", label: "Completed" },
//     cancelled: { bg: "#fff5f5", color: "#dc2626", dot: "#dc2626", label: "Cancelled" },
//     missed:    { bg: "#fffbeb", color: "#d97706", dot: "#d97706", label: "Missed" },
//   };
//   const m = map[status] ?? { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8", label: status || "—" };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       background: m.bg, color: m.color,
//       fontSize: 11, fontWeight: 700,
//       padding: "3px 9px 3px 7px", borderRadius: 20,
//       whiteSpace: "nowrap",
//     }}>
//       <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
//       {m.label}
//     </span>
//   );
// }

// /* ── Session Modal ── */
// function SessionModal({ session, onClose, onSave }) {
//   const [saving, setSaving] = useState(false);
//   const [tab, setTab] = useState("details");
//   const [form, setForm] = useState({
//     session_title: session.session_title || "",
//     session_date: session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : "",
//     meeting_link: session.meeting_link || "",
//     meeting_description: session.meeting_description || "",
//     mentee_meeting_description: session.mentee_meeting_description || "",
//     tasks_given: session.tasks_given || "",
//     task_completed: session.task_completed || false,
//     mentee_feedback: session.mentee_feedback || "",
//     mentee_rating: session.mentee_rating || 0,
//     status: session.status || "pending",
//     task_submission: session.task_submission || "",
//   });

//   const set = (key) => (e) =>
//     setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

//   const handleSave = async () => {
//     setSaving(true);
//     await onSave(session._id, form);
//     setSaving(false);
//     onClose();
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     document.addEventListener("keydown", h);
//     return () => {
//       document.body.style.overflow = "";
//       document.removeEventListener("keydown", h);
//     };
//   }, [onClose]);

//   const TABS = [
//     { id: "details",  label: "Details",  Icon: BookOpen },
//     { id: "tasks",    label: "Tasks",    Icon: ClipboardList },
//     { id: "feedback", label: "Feedback", Icon: MessageSquare },
//   ];

//   const num = String(session.session_number).padStart(2, "0");

//   return (
//     <>
//       <style>{`
//         @keyframes modalIn { from { opacity:0; transform: translate(-50%,-48%) scale(0.97); } to { opacity:1; transform: translate(-50%,-50%) scale(1); } }
//         @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
//       `}</style>

//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         style={{
//           position: "fixed", inset: 0, zIndex: 100,
//           background: "rgba(15,23,42,0.45)",
//           backdropFilter: "blur(4px)",
//           animation: "fadeIn 0.18s ease",
//         }}
//       />

//       {/* Modal — fixed size, no overflow on viewport */}
//       <div style={{
//         position: "fixed",
//         top: "50%", left: "50%",
//         transform: "translate(-50%, -50%)",
//         zIndex: 101,
//         width: "min(600px, calc(100vw - 24px))",
//         height: "min(560px, calc(100vh - 40px))",
//         background: "#fff",
//         borderRadius: 20,
//         border: "1.5px solid #e2e8f0",
//         boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
//         display: "flex",
//         flexDirection: "column",
//         overflow: "hidden",
//         animation: "modalIn 0.22s ease",
//       }}>

//         {/* Header */}
//         <div style={{ padding: "16px 20px 0", flexShrink: 0 }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//               <div style={{
//                 width: 38, height: 38, borderRadius: 10,
//                 background: "#0098cc", color: "#fff",
//                 fontSize: 13, fontWeight: 800,
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 flexShrink: 0,
//               }}>{num}</div>
//               <div>
//                 <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 2px" }}>
//                   Session {session.session_number}
//                 </p>
//                 <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0, maxWidth: 340, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                   {form.session_title || `Session ${session.session_number}`}
//                 </h2>
//               </div>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
//               <StatusBadge status={form.status} />
//               <button
//                 onClick={onClose}
//                 style={{
//                   width: 32, height: 32, borderRadius: 8,
//                   background: "#f8fafc", border: "1.5px solid #e2e8f0",
//                   color: "#94a3b8", fontSize: 14,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   cursor: "pointer", transition: "all 0.15s",
//                 }}
//                 onMouseEnter={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
//                 onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#94a3b8"; }}
//               ><X size={13} /></button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div style={{ display: "flex", borderBottom: "1.5px solid #f1f5f9" }}>
//             {TABS.map(({ id, label, Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => setTab(id)}
//                 style={{
//                   display: "flex", alignItems: "center", gap: 5,
//                   padding: "8px 14px",
//                   fontSize: 11, fontWeight: 700,
//                   letterSpacing: "0.03em",
//                   border: "none",
//                   borderBottom: tab === id ? "2px solid #0098cc" : "2px solid transparent",
//                   marginBottom: -1.5,
//                   background: "transparent",
//                   color: tab === id ? "#0098cc" : "#94a3b8",
//                   cursor: "pointer",
//                   transition: "color 0.15s",
//                 }}
//               >
//                 <Icon size={11} />{label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Scrollable body */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>

//           {/* Details tab */}
//           {tab === "details" && (
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
//               {[
//                 [true,  "Session Title",
//                   <FInp value={form.session_title} onChange={set("session_title")} placeholder="e.g. Goal Setting" />],
//                 [false, "Date & Time",
//                   <FInp type="datetime-local" value={form.session_date} onChange={set("session_date")} />],
//                 [false, "Status",
//                   <FSel value={form.status} onChange={set("status")}>
//                     <option value="pending">Pending</option>
//                     <option value="completed">Completed</option>
//                     <option value="cancelled">Cancelled</option>
//                     <option value="missed">Missed</option>
//                   </FSel>],
//                 [true,  "Meeting Link",
//                   <FInp value={form.meeting_link} onChange={set("meeting_link")} placeholder="https://meet.google.com/…" />],
//                 [true,  "Mentor's Description",
//                   <FTxt value={form.meeting_description} rows={2} readOnly />],
//                 [true,  "Your Notes (Mentee)",
//                   <FTxt value={form.mentee_meeting_description} onChange={set("mentee_meeting_description")} placeholder="Add your notes…" rows={2} />],
//               ].map(([span2, lbl, child], i) => (
//                 <div key={i} style={{ gridColumn: span2 ? "1 / -1" : undefined }}>
//                   <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
//                     {lbl}
//                   </label>
//                   {child}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Tasks tab */}
//           {tab === "tasks" && (
//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {session.tasks_given ? (
//                 <div>
//                   <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
//                     Task by Mentor
//                   </label>
//                   <FTxt value={form.tasks_given} rows={3} readOnly />
//                 </div>
//               ) : (
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", gap: 8 }}>
//                   <ClipboardList size={26} style={{ color: "#e2e8f0" }} />
//                   <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>No task assigned yet.</p>
//                 </div>
//               )}

//               <div style={{
//                 display: "flex", alignItems: "center", gap: 12,
//                 padding: "12px 14px", borderRadius: 10,
//                 background: form.task_completed ? "#f0fdf4" : "#f8fafc",
//                 border: `1.5px solid ${form.task_completed ? "#bbf7d0" : "#e2e8f0"}`,
//                 transition: "all 0.2s",
//               }}>
//                 <input
//                   type="checkbox" id="tc" checked={form.task_completed} onChange={set("task_completed")}
//                   style={{ width: 16, height: 16, accentColor: "#16a34a", cursor: "pointer" }}
//                 />
//                 <label htmlFor="tc" style={{ fontSize: 13, cursor: "pointer", color: form.task_completed ? "#16a34a" : "#64748b", fontWeight: 600 }}>
//                   {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
//                 </label>
//               </div>

//               {session.tasks_given && (
//                 <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderBottom: "1.5px solid #e2e8f0" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                       <ClipboardList size={12} style={{ color: "#64748b" }} />
//                       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b" }}>Submit Task</span>
//                     </div>
//                     {session.task_submission && (
//                       <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
//                         <CheckCheck size={11} style={{ color: "#16a34a" }} />
//                         <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a" }}>Previously Submitted</span>
//                       </div>
//                     )}
//                   </div>
//                   <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
//                     <div style={{ position: "relative" }}>
//                       <Link2 size={12} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
//                       <input
//                         type="url" value={form.task_submission} onChange={set("task_submission")}
//                         placeholder="Paste Google Drive or GitHub link…"
//                         style={{ width: "100%", fontSize: 12, borderRadius: 9, paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1.5px solid #e2e8f0", background: "#fff", color: "#1e293b", outline: "none", fontFamily: "inherit" }}
//                         onFocus={(e) => { e.target.style.borderColor = "#0098cc"; }}
//                         onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; }}
//                       />
//                     </div>
//                     {form.task_submission && (
//                       <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 9 }}>
//                         <CheckCircle2 size={12} style={{ color: "#16a34a", flexShrink: 0 }} />
//                         <a href={form.task_submission} target="_blank" rel="noopener noreferrer"
//                           style={{ fontSize: 11, color: "#15803d", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "none" }}>
//                           {form.task_submission}
//                         </a>
//                         <ExternalLink size={11} style={{ color: "#16a34a", flexShrink: 0 }} />
//                       </div>
//                     )}
//                     <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
//                       Saved when you click <strong style={{ color: "#64748b" }}>Save Changes</strong>.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Feedback tab */}
//           {tab === "feedback" && (
//             <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//               <div>
//                 <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 }}>
//                   Your Feedback
//                 </label>
//                 <FTxt value={form.mentee_feedback} onChange={set("mentee_feedback")} placeholder="Share your thoughts…" rows={3} />
//               </div>
//               <div>
//                 <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
//                   Rate Your Mentor
//                 </label>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <StarPicker value={form.mentee_rating} onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))} />
//                   <span style={{ fontSize: 12, color: "#94a3b8" }}>{form.mentee_rating > 0 ? `${form.mentee_rating}/5` : "Not rated"}</span>
//                 </div>
//               </div>
//               {session.mentor_feedback && (
//                 <div style={{ padding: "12px 14px", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12 }}>
//                   <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Mentor's Feedback</p>
//                   <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{session.mentor_feedback}</p>
//                   {session.mentor_rating > 0 && <div style={{ marginTop: 10 }}><StarDisplay value={session.mentor_rating} /></div>}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{
//           display: "flex", justifyContent: "flex-end", gap: 8,
//           padding: "12px 20px",
//           borderTop: "1.5px solid #f1f5f9",
//           background: "#fafbfc",
//           flexShrink: 0,
//         }}>
//           <button
//             onClick={onClose}
//             style={{ padding: "8px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600, background: "#fff", border: "1.5px solid #e2e8f0", color: "#64748b", cursor: "pointer", transition: "background 0.15s" }}
//             onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
//             onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
//           >Cancel</button>
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             style={{
//               display: "flex", alignItems: "center", gap: 6,
//               padding: "8px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700,
//               background: saving ? "#94a3b8" : "#1a1a2e",
//               color: "#fff", border: "none", cursor: saving ? "not-allowed" : "pointer",
//               transition: "background 0.15s",
//             }}
//             onMouseEnter={(e) => { if (!saving) e.currentTarget.style.background = "#0f172a"; }}
//             onMouseLeave={(e) => { if (!saving) e.currentTarget.style.background = "#1a1a2e"; }}
//           >
//             {saving ? <><Loader2 size={12} className="animate-spin" />Saving…</> : "Save Changes"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// /* ── Toast ── */
// function Toast({ toast }) {
//   if (!toast) return null;
//   const ok = toast.type === "success";
//   return (
//     <div style={{
//       position: "fixed", bottom: 24, right: 24, zIndex: 200,
//       display: "flex", alignItems: "center", gap: 10,
//       padding: "12px 18px",
//       background: "#fff",
//       borderRadius: 12,
//       boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
//       border: `1.5px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
//       fontSize: 13, fontWeight: 600,
//       color: ok ? "#16a34a" : "#dc2626",
//       animation: "fadeIn 0.2s ease",
//       maxWidth: "calc(100vw - 48px)",
//     }}>
//       {ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
//       {toast.msg}
//     </div>
//   );
// }

// /* ── Skeleton rows ── */
// function SkeletonRows({ cols = 8, rows = 5 }) {
//   return Array.from({ length: rows }).map((_, i) => (
//     <tr key={i}>
//       {Array.from({ length: cols }).map((_, j) => (
//         <td key={j} style={{ padding: "14px 16px" }}>
//           <div style={{
//             height: 11, borderRadius: 6,
//             background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
//             backgroundSize: "200% 100%",
//             animation: "shimmer 1.4s infinite",
//             width: j === 0 ? 28 : j === 1 ? "70%" : "50%",
//           }} />
//         </td>
//       ))}
//     </tr>
//   ));
// }

// /* ── Mobile session card ── */
// function MobileCard({ session, onClick }) {
//   const [pressed, setPressed] = useState(false);
//   const taskSubmitted = !!session.task_submission;
//   const hasTask = !!session.tasks_given;
//   const num = String(session.session_number).padStart(2, "0");

//   return (
//     <div
//       onClick={() => onClick(session)}
//       onTouchStart={() => setPressed(true)}
//       onTouchEnd={() => setPressed(false)}
//       style={{
//         background: pressed ? "#f8fafc" : "#fff",
//         border: "1.5px solid #e9edf2",
//         borderRadius: 14,
//         padding: "14px 16px",
//         cursor: "pointer",
//         transition: "all 0.15s",
//         boxShadow: pressed ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
//       }}
//     >
//       {/* Top row */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
//           <div style={{
//             width: 34, height: 34, borderRadius: 9,
//             background: "#0098cc", color: "#fff",
//             fontSize: 12, fontWeight: 800,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             flexShrink: 0,
//           }}>{num}</div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//               {session.session_title || `Session ${session.session_number}`}
//             </p>
//             <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{fmtDate(session.session_date)}</p>
//           </div>
//         </div>
//         <StatusBadge status={session.status} />
//       </div>

//       {/* Info grid */}
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 12 }}>
//         {[
//           ["Task", hasTask ? (taskSubmitted ? "Submitted ✓" : "Pending") : "None"],
//           ["Rating", session.mentee_rating ? `${session.mentee_rating}/5 ★` : "—"],
//         ].map(([l, v]) => (
//           <div key={l}>
//             <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{l}</div>
//             <div style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{v}</div>
//           </div>
//         ))}
//         {session.mentee_feedback && (
//           <div style={{ gridColumn: "1 / -1" }}>
//             <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>Feedback</div>
//             <div style={{ fontSize: 12, color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//               {session.mentee_feedback}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* CTA */}
//       <div style={{ display: "flex", justifyContent: "flex-end" }}>
//         <span style={{ fontSize: 11, color: "#0098cc", fontWeight: 700 }}>View Details →</span>
//       </div>
//     </div>
//   );
// }

// /* ── Pagination ── */
// function Pagination({ current, total, perPage, onPage }) {
//   const totalPages = Math.ceil(total / perPage) || 1;
//   if (totalPages <= 1) return null;

//   const pages = [];
//   for (let i = 1; i <= totalPages; i++) {
//     if (i === 1 || i === totalPages || Math.abs(i - current) <= 1) pages.push(i);
//     else if (pages[pages.length - 1] !== "…") pages.push("…");
//   }

//   const btnBase = {
//     height: 32, minWidth: 32, borderRadius: 8, fontSize: 12, fontWeight: 600,
//     cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
//     transition: "all 0.15s", padding: "0 8px",
//   };

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 16px", borderTop: "1.5px solid #f1f5f9" }}>
//       <span style={{ fontSize: 12, color: "#94a3b8" }}>
//         {(current - 1) * perPage + 1}–{Math.min(current * perPage, total)} of {total}
//       </span>
//       <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
//         <button
//           onClick={() => onPage(current - 1)} disabled={current === 1}
//           style={{ ...btnBase, background: "#fff", border: "1.5px solid #e2e8f0", color: "#64748b", opacity: current === 1 ? 0.4 : 1 }}
//         ><ChevronLeft size={14} /></button>
//         {pages.map((p, i) => p === "…"
//           ? <span key={`e${i}`} style={{ color: "#94a3b8", fontSize: 12, padding: "0 4px" }}>…</span>
//           : <button
//               key={p} onClick={() => onPage(p)}
//               style={{ ...btnBase, background: p === current ? "#0098cc" : "#fff", border: `1.5px solid ${p === current ? "#0098cc" : "#e2e8f0"}`, color: p === current ? "#fff" : "#64748b" }}
//             >{p}</button>
//         )}
//         <button
//           onClick={() => onPage(current + 1)} disabled={current === totalPages}
//           style={{ ...btnBase, background: "#fff", border: "1.5px solid #e2e8f0", color: "#64748b", opacity: current === totalPages ? 0.4 : 1 }}
//         ><ChevronRight size={14} /></button>
//       </div>
//     </div>
//   );
// }

// /* ── Main Component ── */
// export default function Ltmupcommingsessions() {
//   const userData = JSON.parse(localStorage.getItem("userData") || "{}");
//   const { data: result, isLoading, isError } = useGetSessionsByMenteeQuery(userData?._id);
//   const [updateSession] = useUpdateByMenteeSessionMutation();

//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [taskFilter, setTaskFilter] = useState("all");
//   const [sortOrder, setSortOrder] = useState("newest");
//   const [search, setSearch] = useState("");
//   const [editSession, setEditSession] = useState(null);
//   const [toast, setToast] = useState(null);

//   const sessions = result?.data ?? [];
//   const totalSessions = sessions.length;
//   const tasksCompleted = sessions.filter((s) => s.task_completed).length;

//   const displayed = useMemo(() => {
//     let list = [...sessions];
//     if (taskFilter === "done")    list = list.filter((s) => s.task_completed);
//     if (taskFilter === "pending") list = list.filter((s) => s.tasks_given && !s.task_completed);
//     if (taskFilter === "none")    list = list.filter((s) => !s.tasks_given);
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       list = list.filter((s) =>
//         (s.session_title || "").toLowerCase().includes(q) ||
//         (s.meeting_description || "").toLowerCase().includes(q)
//       );
//     }
//     list.sort((a, b) => {
//       const da = new Date(a.session_date || 0), db = new Date(b.session_date || 0);
//       return sortOrder === "newest" ? db - da : da - db;
//     });
//     return list;
//   }, [sessions, taskFilter, sortOrder, search]);

//   useEffect(() => setCurrentPage(1), [taskFilter, sortOrder, search, perPage]);
//   const totalPages = Math.ceil(displayed.length / perPage);
//   const paginated = displayed.slice((currentPage - 1) * perPage, currentPage * perPage);

//   const showToast = (msg, type = "success") => {
//     setToast({ msg, type });
//     setTimeout(() => setToast(null), 3500);
//   };

//   const handleSave = async (session_id, form) => {
//     try {
//       await updateSession({ session_id, ...form }).unwrap();
//       showToast("Session updated.");
//     } catch {
//       showToast("Failed to update session.", "error");
//     }
//   };

//   return (
//     <>
//       <style>{`
//         ${globalStyles}
//         @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
//         @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         .spin { animation: spin 1s linear infinite; }

//         /* Responsive toolbar */
//         @media (max-width: 640px) {
//           .toolbar-row { flex-direction: column !important; align-items: stretch !important; }
//           .toolbar-row > * { width: 100% !important; }
//           .toolbar-search { width: 100% !important; }
//         }

//         /* Hide desktop table on mobile, show cards */
//         .desktop-table { display: block; }
//         .mobile-cards  { display: none; }
//         @media (max-width: 768px) {
//           .desktop-table { display: none; }
//           .mobile-cards  { display: flex; }
//         }
//       `}</style>

//       <div style={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         padding: "clamp(16px, 4vw, 28px)",
//         fontFamily: "'DM Sans','Segoe UI',sans-serif",
//       }}>
//         <div style={{ maxWidth: 1100, margin: "0 auto" }}>

//           {/* Header */}
//           <div style={{ marginBottom: 22 }}>
//             <h1 style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 800, color: "#1a1a2e", margin: 0, letterSpacing: "-0.02em" }}>
//               My Sessions
//             </h1>
//             <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
//               Track and manage all your mentoring sessions
//             </p>
//           </div>

//           {/* Stat cards */}
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
//             {[
//               { Icon: Layers,         label: "Total Sessions",   value: totalSessions,                    color: "#1a1a2e" },
//               { Icon: ClipboardCheck, label: "Tasks Completed",  value: `${tasksCompleted}/${totalSessions}`, color: "#16a34a" },
//             ].map(({ Icon, label, value, color }) => (
//               <div key={label} style={{
//                 display: "flex", alignItems: "center", gap: 14,
//                 background: "#fff", border: "1.5px solid #e9edf2",
//                 borderRadius: 14, padding: "14px 18px",
//               }}>
//                 <div style={{
//                   width: 40, height: 40, borderRadius: 11,
//                   background: "#eff9fd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                 }}>
//                   <Icon size={18} style={{ color: "#0098cc" }} />
//                 </div>
//                 <div>
//                   <p style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 3px" }}>{label}</p>
//                   <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0, lineHeight: 1.1 }}>{value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Main panel */}
//           <div style={{ background: "#fff", border: "1.5px solid #e9edf2", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>

//             {/* Panel header + toolbar */}
//             <div style={{ padding: "18px 16px 0", borderBottom: "1.5px solid #f1f5f9" }}>
//               <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0098cc", margin: "0 0 14px" }}>Sessions</h2>

//               {/* Toolbar */}
//               <div className="toolbar-row" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, paddingBottom: 14 }}>
//                 {/* Per page */}
//                 <select
//                   value={perPage}
//                   onChange={(e) => setPerPage(Number(e.target.value))}
//                   style={{ fontSize: 12, borderRadius: 8, padding: "7px 10px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#475569", outline: "none", cursor: "pointer", flexShrink: 0 }}
//                 >
//                   <option value={10}>10 / page</option>
//                   <option value={30}>30 / page</option>
//                   <option value={50}>50 / page</option>
//                 </select>

//                 <div style={{ flex: 1 }} />

//                 {/* Task filter */}
//                 <select
//                   value={taskFilter}
//                   onChange={(e) => setTaskFilter(e.target.value)}
//                   style={{ fontSize: 12, borderRadius: 8, padding: "7px 10px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#475569", outline: "none", cursor: "pointer", minWidth: 120 }}
//                 >
//                   <option value="all">All Tasks</option>
//                   <option value="done">Completed</option>
//                   <option value="pending">Pending</option>
//                   <option value="none">No Task</option>
//                 </select>

//                 {/* Sort */}
//                 <select
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   style={{ fontSize: 12, borderRadius: 8, padding: "7px 10px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#475569", outline: "none", cursor: "pointer", minWidth: 120 }}
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                 </select>

//                 {/* Search */}
//                 <div className="toolbar-search" style={{ position: "relative", flexShrink: 0 }}>
//                   <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }} />
//                   <input
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     placeholder="Search session…"
//                     style={{ width: 180, fontSize: 12, borderRadius: 8, paddingLeft: 30, paddingRight: 12, paddingTop: 7, paddingBottom: 7, border: "1.5px solid #e2e8f0", background: "#fff", color: "#1e293b", outline: "none", fontFamily: "inherit" }}
//                     onFocus={(e) => { e.target.style.borderColor = "#0098cc"; e.target.style.width = "210px"; }}
//                     onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; e.target.style.width = "180px"; }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Loading */}
//             {isLoading && (
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px", gap: 12 }}>
//                 <Loader2 size={24} style={{ color: "#cbd5e1" }} className="spin" />
//                 <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>Loading sessions…</p>
//               </div>
//             )}

//             {/* Error */}
//             {isError && (
//               <div style={{ display: "flex", alignItems: "center", gap: 10, margin: 16, padding: "12px 16px", background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 10 }}>
//                 <AlertCircle size={14} style={{ color: "#dc2626", flexShrink: 0 }} />
//                 <p style={{ fontSize: 13, color: "#dc2626", margin: 0 }}>Failed to load sessions. Please refresh.</p>
//               </div>
//             )}

//             {/* Empty */}
//             {!isLoading && !isError && paginated.length === 0 && (
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px", gap: 10 }}>
//                 <Layers size={28} style={{ color: "#e2e8f0" }} />
//                 <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>No sessions found.</p>
//               </div>
//             )}

//             {/* ── DESKTOP TABLE ── */}
//             {!isLoading && !isError && paginated.length > 0 && (
//               <div className="desktop-table" style={{ overflowX: "auto" }}>
//                 <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", minWidth: 700 }}>
//                   <colgroup>
//                     <col style={{ width: 44 }} />
//                     <col style={{ width: "20%" }} />
//                     <col style={{ width: 110 }} />
//                     <col />
//                     <col />
//                     <col style={{ width: 100 }} />
//                     <col style={{ width: 100 }} />
//                     <col style={{ width: 130 }} />
//                   </colgroup>
//                   <thead>
//                     <tr>
//                       {["#", "Session", "Date", "Description", "Task Given", "Task Status", "Rating", "Feedback"].map((h) => (
//                         <th key={h} style={{
//                           padding: "11px 16px", textAlign: "left",
//                           fontSize: 10, fontWeight: 700, color: "#94a3b8",
//                           textTransform: "uppercase", letterSpacing: "0.07em",
//                           background: "#fafbfc", borderBottom: "1.5px solid #f1f5f9",
//                           whiteSpace: "nowrap",
//                         }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {isLoading ? <SkeletonRows cols={8} rows={perPage} /> : paginated.map((session, i) => {
//                       const taskSubmitted = !!session.task_submission;
//                       const hasTask = !!session.tasks_given;
//                       return (
//                         <tr
//                           key={session._id}
//                           onClick={() => setEditSession(session)}
//                           style={{ borderBottom: "1px solid #f8fafc", cursor: "pointer", transition: "background 0.12s" }}
//                           onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fbff"; }}
//                           onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
//                         >
//                           <td style={{ padding: "13px 16px" }}>
//                             <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
//                               {(currentPage - 1) * perPage + i + 1}
//                             </span>
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                               <div style={{
//                                 width: 28, height: 28, borderRadius: 7,
//                                 background: "#0098cc", color: "#fff",
//                                 fontSize: 11, fontWeight: 800,
//                                 display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//                               }}>{session.session_number}</div>
//                               <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                 {session.session_title || `Session ${session.session_number}`}
//                               </span>
//                             </div>
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             <span style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>{fmtDate(session.session_date)}</span>
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                               {session.meeting_description || "—"}
//                             </p>
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                               {session.tasks_given || "—"}
//                             </p>
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             {hasTask ? (
//                               <span style={{
//                                 display: "inline-flex", alignItems: "center", gap: 5,
//                                 fontSize: 11, fontWeight: 700,
//                                 padding: "3px 9px 3px 7px", borderRadius: 20,
//                                 background: taskSubmitted ? "#f0fdf6" : "#f8fafc",
//                                 color: taskSubmitted ? "#16a34a" : "#64748b",
//                                 border: `1.5px solid ${taskSubmitted ? "#bbf7d0" : "#e2e8f0"}`,
//                                 whiteSpace: "nowrap",
//                               }}>
//                                 {taskSubmitted
//                                   ? <><CheckCircle2 size={10} />Done</>
//                                   : <><Circle size={10} />Pending</>}
//                               </span>
//                             ) : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             {session.mentee_rating > 0
//                               ? <StarDisplay value={session.mentee_rating} />
//                               : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
//                           </td>
//                           <td style={{ padding: "13px 16px" }}>
//                             <p style={{ margin: 0, fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                               {session.mentee_feedback || "—"}
//                             </p>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>

//                 <Pagination current={currentPage} total={displayed.length} perPage={perPage} onPage={setCurrentPage} />
//               </div>
//             )}

//             {/* ── MOBILE CARDS ── */}
//             {!isLoading && !isError && paginated.length > 0 && (
//               <div className="mobile-cards" style={{ flexDirection: "column", gap: 10, padding: "14px" }}>
//                 {paginated.map((session) => (
//                   <MobileCard key={session._id} session={session} onClick={setEditSession} />
//                 ))}

//                 {/* Mobile pagination */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, gap: 10 }}>
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 6,
//                       padding: "9px 16px", borderRadius: 9, fontSize: 12, fontWeight: 700,
//                       background: currentPage === 1 ? "#f1f5f9" : "#1a1a2e",
//                       color: currentPage === 1 ? "#94a3b8" : "#fff",
//                       border: "none", cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                     }}
//                   ><ChevronLeft size={14} />Prev</button>
//                   <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>
//                     {currentPage} / {totalPages || 1}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 6,
//                       padding: "9px 16px", borderRadius: 9, fontSize: 12, fontWeight: 700,
//                       background: currentPage === totalPages ? "#f1f5f9" : "#1a1a2e",
//                       color: currentPage === totalPages ? "#94a3b8" : "#fff",
//                       border: "none", cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//                     }}
//                   >Next<ChevronRight size={14} /></button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {editSession && (
//         <SessionModal
//           session={editSession}
//           onClose={() => setEditSession(null)}
//           onSave={handleSave}
//         />
//       )}
//       <Toast toast={toast} />
//     </>
//   );
// }


import { useState, useEffect } from "react";
import {
  Layers, ClipboardCheck, CheckCircle2, Circle, AlertCircle,
  Loader2, X, BookOpen, ClipboardList, MessageSquare,
  ExternalLink, CheckCheck, Link2, Search, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  useGetSessionsByMenteeQuery,
  useUpdateByMenteeSessionMutation,
  useSubmitTaskMutation,
} from "./ltmupcommingsessionsapislice";

// ── Constants ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;
const FONT = "'Cambria', 'Georgia', serif";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "—";

const getUserData = () => {
  try { return JSON.parse(localStorage.getItem("userData") || "{}"); }
  catch { return {}; }
};

// ── Global styles ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
  @keyframes shimmer   { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  .ltm-spin { animation: spin 1s linear infinite; }
`;

// ── Shared primitives ─────────────────────────────────────────────────────────

function Label({ children }) {
  return (
    <label style={{
      display: "block",
      fontSize: 10,
      fontWeight: 700,
      color: "#94a3b8",
      textTransform: "uppercase",
      letterSpacing: "0.09em",
      marginBottom: 6,
      fontFamily: FONT,
    }}>
      {children}
    </label>
  );
}

function FInp({ value, onChange, placeholder, type = "text", readOnly }) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{
        width: "100%",
        fontSize: 13,
        borderRadius: 10,
        padding: "10px 13px",
        border: "1.5px solid #e2e8f0",
        outline: "none",
        background: readOnly ? "#f8fafc" : "#fff",
        color: readOnly ? "#94a3b8" : "#1e293b",
        cursor: readOnly ? "default" : "text",
        fontFamily: FONT,
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
      onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
    />
  );
}

function FTxt({ value, onChange, placeholder, rows = 3, readOnly }) {
  return (
    <textarea
      rows={rows}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      style={{
        width: "100%",
        fontSize: 13,
        borderRadius: 10,
        padding: "10px 13px",
        border: "1.5px solid #e2e8f0",
        outline: "none",
        resize: "vertical",
        lineHeight: 1.65,
        background: readOnly ? "#f8fafc" : "#fff",
        color: readOnly ? "#64748b" : "#1e293b",
        cursor: readOnly ? "default" : "text",
        fontFamily: FONT,
        transition: "border-color 0.15s",
      }}
      onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#0098cc"; }}
      onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
    />
  );
}

function FSel({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        fontSize: 13,
        borderRadius: 10,
        padding: "10px 13px",
        border: "1.5px solid #e2e8f0",
        background: "#fff",
        color: "#1e293b",
        outline: "none",
        cursor: "pointer",
        fontFamily: FONT,
      }}
    >
      {children}
    </select>
  );
}

// ── Star components ───────────────────────────────────────────────────────────

function StarDisplay({ value, max = 5 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: 15, color: i < (value || 0) ? "#f59e0b" : "#e2e8f0" }}>★</span>
      ))}
      <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", marginLeft: 5, fontFamily: FONT }}>
        {value || 0}/{max}
      </span>
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHov(n)}
          onMouseLeave={() => setHov(0)}
          style={{
            fontSize: 24,
            lineHeight: 1,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 2,
            color: n <= (hov || value || 0) ? "#f59e0b" : "#e2e8f0",
            transition: "color 0.1s",
          }}
        >★</button>
      ))}
    </div>
  );
}

// ── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    pending:   { bg: "#eff9fd", color: "#0083b1", dot: "#0083b1", label: "Pending" },
    completed: { bg: "#f0fdf6", color: "#16a34a", dot: "#16a34a", label: "Completed" },
    cancelled: { bg: "#fff5f5", color: "#dc2626", dot: "#dc2626", label: "Cancelled" },
    missed:    { bg: "#fffbeb", color: "#d97706", dot: "#d97706", label: "Missed" },
  };
  const m = map[status] ?? { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8", label: status || "—" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: m.bg, color: m.color,
      fontSize: 11, fontWeight: 700, fontFamily: FONT,
      padding: "3px 10px 3px 7px", borderRadius: 20, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
      {m.label}
    </span>
  );
}

// ── Section divider used inside modal ────────────────────────────────────────

function ModalSection({ icon: Icon, title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 14,
        paddingBottom: 10,
        borderBottom: "1.5px solid #f1f5f9",
      }}>
        {Icon && <Icon size={13} style={{ color: "#0098cc", flexShrink: 0 }} />}
        <span style={{
          fontSize: 10, fontWeight: 800, color: "#0098cc",
          textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: FONT,
        }}>
          {title}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

// ── Session Modal ─────────────────────────────────────────────────────────────

function SessionModal({ session, menteeId, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("details");
  const [savedOk, setSavedOk] = useState(false);

  const [form, setForm] = useState({
    mentee_meeting_description: session.mentee_meeting_description || "",
    task_completed:             session.task_completed             || false,
    task_submission:            session.task_submission            || "",
    mentee_feedback:            session.mentee_feedback            || "",
    mentee_rating:              session.mentee_rating              || 0,
  });

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSave = async () => {
    setSaving(true);
    const ok = await onSave(session._id, menteeId, form);
    setSaving(false);
    if (ok) {
      setSavedOk(true);
      setTimeout(() => { setSavedOk(false); onClose(); }, 1200);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", h);
    };
  }, [onClose]);

  const TABS = [
    { id: "details",  label: "Details",  Icon: BookOpen },
    { id: "tasks",    label: "Tasks",    Icon: ClipboardList },
    { id: "feedback", label: "Feedback", Icon: MessageSquare },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15,23,42,0.5)",
          backdropFilter: "blur(5px)",
          animation: "fadeIn 0.18s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 101,
        width: "min(540px, calc(100vw - 24px))",
        maxHeight: "calc(100vh - 40px)",
        background: "#fff",
        borderRadius: 22,
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 24px 70px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "slideUp 0.22s ease",
        fontFamily: FONT,
      }}>

        {/* ── Header ── */}
        <div style={{ padding: "18px 22px 0", flexShrink: 0 }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: "#1a1a2e", color: "#fff",
                fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontFamily: FONT,
              }}>
                {String(session.session_number).padStart(2, "0")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#94a3b8",
                  margin: "0 0 3px", fontFamily: FONT,
                }}>
                  Session {session.session_number}
                </p>
                <h2 style={{
                  fontSize: 15, fontWeight: 700, color: "#0f172a",
                  margin: 0, fontFamily: FONT,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>
                  {session.session_title || `Session ${session.session_number}`}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <StatusBadge status={session.status} />
              <button
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "#f8fafc", border: "1.5px solid #e2e8f0",
                  color: "#94a3b8", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              ><X size={13} /></button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1.5px solid #f1f5f9" }}>
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 16px",
                  fontSize: 11, fontWeight: 700, fontFamily: FONT,
                  letterSpacing: "0.04em",
                  border: "none",
                  borderBottom: tab === id ? "2.5px solid #0098cc" : "2.5px solid transparent",
                  marginBottom: -1.5,
                  background: "transparent",
                  color: tab === id ? "#0098cc" : "#94a3b8",
                  cursor: "pointer", transition: "color 0.15s",
                }}
              >
                <Icon size={11} />{label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body (scrollable, single column) ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>

          {/* ══ DETAILS TAB ══ */}
          {tab === "details" && (
            <>
              {/* READ-ONLY info from mentor */}
              <ModalSection icon={BookOpen} title="Session Info">
                <Field label="Session Title">
                  <FInp value={session.session_title || `Session ${session.session_number}`} readOnly />
                </Field>
                <Field label="Date & Time">
                  <FInp
                    type="datetime-local"
                    value={session.session_date ? new Date(session.session_date).toISOString().slice(0, 16) : ""}
                    readOnly
                  />
                </Field>
                <Field label="Status">
                  <div style={{ display: "flex" }}>
                    <StatusBadge status={session.status} />
                  </div>
                </Field>
                {session.meeting_link && (
                  <Field label="Meeting Link">
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "10px 13px",
                      border: "1.5px solid #e2e8f0", borderRadius: 10,
                      background: "#f8fafc",
                    }}>
                      <Link2 size={12} style={{ color: "#94a3b8", flexShrink: 0 }} />
                      <a
                        href={session.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13, color: "#0098cc", flex: 1,
                          overflow: "hidden", textOverflow: "ellipsis",
                          whiteSpace: "nowrap", textDecoration: "none",
                          fontFamily: FONT,
                        }}
                      >
                        {session.meeting_link}
                      </a>
                      <ExternalLink size={11} style={{ color: "#0098cc", flexShrink: 0 }} />
                    </div>
                  </Field>
                )}
                <Field label="Mentor's Description">
                  <FTxt
                    value={session.meeting_description || "No description provided."}
                    rows={3}
                    readOnly
                  />
                </Field>
              </ModalSection>

              {/* EDITABLE by mentee */}
              <ModalSection icon={MessageSquare} title="Your Notes">
                <Field label="Your Notes / Meeting Description">
                  <FTxt
                    value={form.mentee_meeting_description}
                    onChange={set("mentee_meeting_description")}
                    placeholder="Add your own notes about this session…"
                    rows={4}
                  />
                </Field>
              </ModalSection>
            </>
          )}

          {/* ══ TASKS TAB ══ */}
          {tab === "tasks" && (
            <>
              <ModalSection icon={ClipboardList} title="Task Assigned">
                {session.tasks_given ? (
                  <Field label="Task by Mentor">
                    <FTxt value={session.tasks_given} rows={4} readOnly />
                  </Field>
                ) : (
                  <div style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", padding: "24px 0", gap: 8,
                  }}>
                    <ClipboardList size={28} style={{ color: "#e2e8f0" }} />
                    <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
                      No task assigned yet.
                    </p>
                  </div>
                )}
              </ModalSection>

              {session.tasks_given && (
                <>
                  <ModalSection icon={CheckCircle2} title="Task Completion">
                    <Field label="Mark Completion">
                      <label style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 14px",
                        border: `1.5px solid ${form.task_completed ? "#bbf7d0" : "#e2e8f0"}`,
                        borderRadius: 10,
                        background: form.task_completed ? "#f0fdf4" : "#f8fafc",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <input
                          type="checkbox"
                          checked={form.task_completed}
                          onChange={set("task_completed")}
                          style={{ width: 16, height: 16, accentColor: "#16a34a", cursor: "pointer" }}
                        />
                        <span style={{
                          fontSize: 13, fontFamily: FONT, fontWeight: 600,
                          color: form.task_completed ? "#16a34a" : "#64748b",
                        }}>
                          {form.task_completed ? "Task completed ✓" : "Mark task as completed"}
                        </span>
                      </label>
                    </Field>
                  </ModalSection>

                  <ModalSection icon={Link2} title="Submit Task">
                    <Field label="Submission Link">
                      <div style={{ position: "relative" }}>
                        <Link2 size={12} style={{
                          position: "absolute", left: 11,
                          top: "50%", transform: "translateY(-50%)",
                          color: "#94a3b8", pointerEvents: "none",
                        }} />
                        <input
                          type="url"
                          value={form.task_submission}
                          onChange={set("task_submission")}
                          placeholder="Paste Google Drive or GitHub link…"
                          style={{
                            width: "100%", fontSize: 13,
                            borderRadius: 10,
                            paddingLeft: 32, paddingRight: 13,
                            paddingTop: 10, paddingBottom: 10,
                            border: "1.5px solid #e2e8f0",
                            background: "#fff", color: "#1e293b",
                            outline: "none", fontFamily: FONT,
                          }}
                          onFocus={(e) => { e.target.style.borderColor = "#0098cc"; }}
                          onBlur={(e)  => { e.target.style.borderColor = "#e2e8f0"; }}
                        />
                      </div>
                    </Field>

                    {form.task_submission && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 13px",
                        background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                        borderRadius: 10,
                      }}>
                        <CheckCheck size={13} style={{ color: "#16a34a", flexShrink: 0 }} />
                        <a
                          href={form.task_submission}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 12, color: "#15803d", flex: 1,
                            overflow: "hidden", textOverflow: "ellipsis",
                            whiteSpace: "nowrap", textDecoration: "none",
                            fontFamily: FONT,
                          }}
                        >
                          {form.task_submission}
                        </a>
                        <ExternalLink size={11} style={{ color: "#16a34a", flexShrink: 0 }} />
                      </div>
                    )}

                    {session.task_submission && !form.task_submission && (
                      <p style={{
                        fontSize: 11, color: "#94a3b8", margin: 0, fontFamily: FONT,
                      }}>
                        Previously submitted: <em>{session.task_submission}</em>
                      </p>
                    )}
                  </ModalSection>
                </>
              )}
            </>
          )}

          {/* ══ FEEDBACK TAB ══ */}
          {tab === "feedback" && (
            <>
              {/* Mentee writes */}
              <ModalSection icon={MessageSquare} title="Your Feedback">
                <Field label="Feedback to Mentor">
                  <FTxt
                    value={form.mentee_feedback}
                    onChange={set("mentee_feedback")}
                    placeholder="Share your thoughts about the session…"
                    rows={4}
                  />
                </Field>
                <Field label="Rate Your Mentor">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <StarPicker
                      value={form.mentee_rating}
                      onChange={(v) => setForm((f) => ({ ...f, mentee_rating: v }))}
                    />
                    <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: FONT }}>
                      {form.mentee_rating > 0 ? `${form.mentee_rating} / 5` : "Not rated"}
                    </span>
                  </div>
                </Field>
              </ModalSection>

              {/* Mentor's feedback (read-only) */}
              {(session.mentor_feedback || session.mentor_rating > 0) && (
                <ModalSection icon={BookOpen} title="Mentor's Feedback">
                  {session.mentor_feedback && (
                    <Field label="Mentor Notes">
                      <FTxt value={session.mentor_feedback} rows={4} readOnly />
                    </Field>
                  )}
                  {session.mentor_rating > 0 && (
                    <Field label="Mentor Rating">
                      <div style={{ padding: "10px 0" }}>
                        <StarDisplay value={session.mentor_rating} />
                      </div>
                    </Field>
                  )}
                </ModalSection>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 8, padding: "14px 22px",
          borderTop: "1.5px solid #f1f5f9",
          background: "#fafbfc", flexShrink: 0,
        }}>
          {savedOk && (
            <span style={{ fontSize: 13, fontWeight: 600, color: "#16a34a", fontFamily: FONT }}>
              ✓ Saved successfully
            </span>
          )}
          {!savedOk && <span />}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={onClose}
              style={{
                padding: "9px 20px", borderRadius: 9,
                fontSize: 13, fontWeight: 600, fontFamily: FONT,
                background: "#fff", border: "1.5px solid #e2e8f0",
                color: "#64748b", cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "9px 22px", borderRadius: 9,
                fontSize: 13, fontWeight: 700, fontFamily: FONT,
                background: saving ? "#94a3b8" : "#1a1a2e",
                color: "#fff", border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
            >
              {saving
                ? <><Loader2 size={13} className="ltm-spin" /> Saving…</>
                : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ toast }) {
  if (!toast) return null;
  const ok = toast.type === "success";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 200,
      display: "flex", alignItems: "center", gap: 10,
      padding: "12px 18px", background: "#fff", borderRadius: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      border: `1.5px solid ${ok ? "#bbf7d0" : "#fecaca"}`,
      fontSize: 13, fontWeight: 600, fontFamily: FONT,
      color: ok ? "#16a34a" : "#dc2626",
      animation: "fadeIn 0.2s ease",
      maxWidth: "calc(100vw - 48px)",
    }}>
      {ok ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
      {toast.msg}
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonRows({ cols = 7, rows = PAGE_SIZE }) {
  return Array.from({ length: rows }).map((_, i) => (
    <tr key={i}>
      {Array.from({ length: cols }).map((_, j) => (
        <td key={j} style={{ padding: "14px 16px" }}>
          <div style={{
            height: 11, borderRadius: 6,
            background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
            width: j === 0 ? 28 : j === 1 ? "65%" : "45%",
          }} />
        </td>
      ))}
    </tr>
  ));
}

// ── Mobile Card ───────────────────────────────────────────────────────────────

function MobileCard({ session, onClick }) {
  const [pressed, setPressed] = useState(false);
  const hasTask     = !!session.tasks_given;
  const taskDone    = !!session.task_submission;

  return (
    <div
      onClick={() => onClick(session)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: pressed ? "#f8fafc" : "#fff",
        border: "1.5px solid #e9edf2", borderRadius: 14,
        padding: "14px 16px", cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: pressed ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
        fontFamily: FONT,
      }}
    >
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between", gap: 10, marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "#0098cc", color: "#fff",
            fontSize: 12, fontWeight: 700, fontFamily: FONT,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            {String(session.session_number).padStart(2, "0")}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 700, color: "#0f172a",
              margin: 0, fontFamily: FONT,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {session.session_title || `Session ${session.session_number}`}
            </p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0", fontFamily: FONT }}>
              {fmtDate(session.session_date)}
            </p>
          </div>
        </div>
        <StatusBadge status={session.status} />
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "8px 16px", marginBottom: 10,
      }}>
        {[
          ["Task", hasTask ? (taskDone ? "Submitted ✓" : "Pending") : "None"],
          ["Rating", session.mentee_rating ? `${session.mentee_rating}/5 ★` : "—"],
        ].map(([l, v]) => (
          <div key={l}>
            <div style={{
              fontSize: 9, fontWeight: 700, color: "#94a3b8",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 2, fontFamily: FONT,
            }}>{l}</div>
            <div style={{ fontSize: 12, color: "#475569", fontWeight: 500, fontFamily: FONT }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, color: "#0098cc", fontWeight: 700, fontFamily: FONT }}>
          View Details →
        </span>
      </div>
    </div>
  );
}

// ── Server-driven Pagination Bar ──────────────────────────────────────────────

function PaginationBar({ pagination, onPage }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages, total, pageSize } = pagination;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const btnBase = {
    height: 32, minWidth: 32, borderRadius: 8, fontSize: 12,
    fontWeight: 600, fontFamily: FONT,
    cursor: "pointer", display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    transition: "all 0.15s", padding: "0 8px", border: "1.5px solid #e2e8f0",
  };

  return (
    <div style={{
      display: "flex", flexWrap: "wrap",
      alignItems: "center", justifyContent: "space-between",
      gap: 10, padding: "12px 16px",
      borderTop: "1.5px solid #f1f5f9",
    }}>
      <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: FONT }}>
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
      </span>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <button
          onClick={() => onPage(page - 1)}
          disabled={!pagination.hasPrevPage}
          style={{
            ...btnBase,
            background: "#fff", color: "#64748b",
            opacity: pagination.hasPrevPage ? 1 : 0.4,
            cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
          }}
        ><ChevronLeft size={14} /></button>

        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e${i}`} style={{ color: "#94a3b8", fontSize: 12, padding: "0 4px" }}>…</span>
            : <button
                key={p}
                onClick={() => onPage(p)}
                style={{
                  ...btnBase,
                  background: p === page ? "#0098cc" : "#fff",
                  borderColor: p === page ? "#0098cc" : "#e2e8f0",
                  color: p === page ? "#fff" : "#64748b",
                }}
              >{p}</button>
        )}

        <button
          onClick={() => onPage(page + 1)}
          disabled={!pagination.hasNextPage}
          style={{
            ...btnBase,
            background: "#fff", color: "#64748b",
            opacity: pagination.hasNextPage ? 1 : 0.4,
            cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
          }}
        ><ChevronRight size={14} /></button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function Ltmupcommingsessions() {
  const userData = getUserData();
  const menteeId = userData?._id;

  // ── Pagination + filter state (drives API call) ──
  const [page, setPage]             = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  // ── Local UI state ──
  const [search, setSearch]         = useState("");
  const [sortOrder, setSortOrder]   = useState("asc");  // session_number asc from server
  const [editSession, setEditSession] = useState(null);
  const [toast, setToast]           = useState(null);

  const { data: result, isLoading, isError, isFetching } = useGetSessionsByMenteeQuery(
    { mentee_id: menteeId, page, pageSize: PAGE_SIZE, status: statusFilter },
    { skip: !menteeId }
  );

  const [updateSession] = useUpdateByMenteeSessionMutation();

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [statusFilter]);

  const sessions    = result?.data       ?? [];
  const pagination  = result?.pagination ?? null;

  // Client-side search filter (within current page results)
  const displayed = search.trim()
    ? sessions.filter((s) => {
        const q = search.toLowerCase();
        return (
          (s.session_title || "").toLowerCase().includes(q) ||
          (s.meeting_description || "").toLowerCase().includes(q)
        );
      })
    : sessions;

  const totalCount    = pagination?.total ?? 0;
  const tasksCompleted = sessions.filter((s) => s.task_completed).length;

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Save handler: sends only mentee-editable fields ──
  const handleSave = async (session_id, mentee_id, form) => {
    try {
      await updateSession({
        session_id,
        mentee_id,
        mentee_meeting_description: form.mentee_meeting_description,
        task_completed:             form.task_completed,
        task_submission:            form.task_submission,
        mentee_feedback:            form.mentee_feedback,
        mentee_rating:              form.mentee_rating,
      }).unwrap();
      showToast("Session updated successfully.");
      return true;
    } catch {
      showToast("Failed to update session.", "error");
      return false;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <div style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "clamp(16px, 4vw, 28px)",
        fontFamily: FONT,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: 22 }}>
            <h1 style={{
              fontSize: "clamp(18px, 4vw, 22px)",
              fontWeight: 800, color: "#1a1a2e",
              margin: 0, letterSpacing: "-0.02em", fontFamily: FONT,
            }}>
              My Sessions
            </h1>
            <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0", fontFamily: FONT }}>
              Track and manage all your mentoring sessions
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12, marginBottom: 20,
          }}>
            {[
              { Icon: Layers,         label: "Total Sessions",   value: totalCount,                       color: "#1a1a2e" },
              { Icon: ClipboardCheck, label: "Tasks Completed",  value: `${tasksCompleted}/${sessions.length}`, color: "#16a34a" },
            ].map(({ Icon, label, value, color }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#fff", border: "1.5px solid #e9edf2",
                borderRadius: 14, padding: "14px 18px",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 11,
                  background: "#eff9fd",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={18} style={{ color: "#0098cc" }} />
                </div>
                <div>
                  <p style={{
                    fontSize: 9, fontWeight: 700, color: "#94a3b8",
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    margin: "0 0 3px", fontFamily: FONT,
                  }}>{label}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color, margin: 0, lineHeight: 1.1, fontFamily: FONT }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Main panel ── */}
          <div style={{
            background: "#fff", border: "1.5px solid #e9edf2",
            borderRadius: 18, overflow: "hidden",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          }}>

            {/* Panel toolbar */}
            <div style={{
              padding: "16px 16px 14px",
              borderBottom: "1.5px solid #f1f5f9",
              display: "flex", flexWrap: "wrap",
              alignItems: "center", gap: 10,
            }}>
              <h2 style={{
                fontSize: 15, fontWeight: 700, color: "#0098cc",
                margin: 0, fontFamily: FONT, marginRight: 4,
              }}>
                Sessions
                {pagination && (
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8", marginLeft: 8 }}>
                    ({totalCount})
                  </span>
                )}
              </h2>

              <div style={{ flex: 1 }} />

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  fontSize: 12, borderRadius: 8, padding: "7px 10px",
                  border: "1.5px solid #e2e8f0", background: "#fff",
                  color: "#475569", outline: "none", cursor: "pointer",
                  minWidth: 120, fontFamily: FONT,
                }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="missed">Missed</option>
              </select>

              {/* Search (client-side within page) */}
              <div style={{ position: "relative" }}>
                <Search size={13} style={{
                  position: "absolute", left: 10,
                  top: "50%", transform: "translateY(-50%)",
                  color: "#94a3b8", pointerEvents: "none",
                }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search…"
                  style={{
                    width: 170, fontSize: 12, borderRadius: 8,
                    paddingLeft: 30, paddingRight: 12,
                    paddingTop: 7, paddingBottom: 7,
                    border: "1.5px solid #e2e8f0",
                    background: "#fff", color: "#1e293b",
                    outline: "none", fontFamily: FONT,
                    transition: "width 0.2s, border-color 0.15s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0098cc";
                    e.target.style.width = "200px";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.width = "170px";
                  }}
                />
              </div>

              {/* Fetching spinner */}
              {isFetching && !isLoading && (
                <Loader2 size={14} style={{ color: "#0098cc" }} className="ltm-spin" />
              )}
            </div>

            {/* Loading */}
            {isLoading && (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", padding: "60px 20px", gap: 12,
              }}>
                <Loader2 size={24} style={{ color: "#cbd5e1" }} className="ltm-spin" />
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
                  Loading sessions…
                </p>
              </div>
            )}

            {/* Error */}
            {isError && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                margin: 16, padding: "12px 16px",
                background: "#fff5f5", border: "1.5px solid #fecaca", borderRadius: 10,
              }}>
                <AlertCircle size={14} style={{ color: "#dc2626", flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "#dc2626", margin: 0, fontFamily: FONT }}>
                  Failed to load sessions. Please refresh.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && displayed.length === 0 && (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", padding: "60px 20px", gap: 10,
              }}>
                <Layers size={28} style={{ color: "#e2e8f0" }} />
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontFamily: FONT }}>
                  No sessions found.
                </p>
              </div>
            )}

            {/* ── DESKTOP TABLE ── */}
            {!isLoading && !isError && displayed.length > 0 && (
              <div style={{ overflowX: "auto" }} className="desktop-table">
                <table style={{
                  width: "100%", borderCollapse: "collapse",
                  tableLayout: "fixed", minWidth: 680,
                }}>
                  <colgroup>
                    <col style={{ width: 44 }} />
                    <col style={{ width: "22%" }} />
                    <col style={{ width: 110 }} />
                    <col />
                    <col style={{ width: 110 }} />
                    <col style={{ width: 100 }} />
                    <col style={{ width: 130 }} />
                  </colgroup>
                  <thead>
                    <tr>
                      {["#", "Session", "Date", "Description", "Task Status", "Rating", "Feedback"].map((h) => (
                        <th key={h} style={{
                          padding: "11px 16px", textAlign: "left",
                          fontSize: 9, fontWeight: 700, color: "#94a3b8",
                          textTransform: "uppercase", letterSpacing: "0.08em",
                          background: "#fafbfc", borderBottom: "1.5px solid #f1f5f9",
                          whiteSpace: "nowrap", fontFamily: FONT,
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isFetching
                      ? <SkeletonRows cols={7} rows={PAGE_SIZE} />
                      : displayed.map((session, i) => {
                          const hasTask  = !!session.tasks_given;
                          const taskDone = !!session.task_submission;
                          return (
                            <tr
                              key={session._id}
                              onClick={() => setEditSession(session)}
                              style={{
                                borderBottom: "1px solid #f8fafc",
                                cursor: "pointer", transition: "background 0.12s",
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fbff"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
                            >
                              <td style={{ padding: "13px 16px" }}>
                                <span style={{
                                  fontSize: 12, color: "#94a3b8",
                                  fontWeight: 600, fontFamily: FONT,
                                }}>
                                  {(page - 1) * PAGE_SIZE + i + 1}
                                </span>
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{
                                    width: 28, height: 28, borderRadius: 7,
                                    background: "#0098cc", color: "#fff",
                                    fontSize: 11, fontWeight: 700, fontFamily: FONT,
                                    display: "flex", alignItems: "center",
                                    justifyContent: "center", flexShrink: 0,
                                  }}>
                                    {session.session_number}
                                  </div>
                                  <span style={{
                                    fontSize: 13, fontWeight: 600, color: "#1a1a2e",
                                    overflow: "hidden", textOverflow: "ellipsis",
                                    whiteSpace: "nowrap", fontFamily: FONT,
                                  }}>
                                    {session.session_title || `Session ${session.session_number}`}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                <span style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", fontFamily: FONT }}>
                                  {fmtDate(session.session_date)}
                                </span>
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                <p style={{
                                  margin: 0, fontSize: 12, color: "#94a3b8",
                                  overflow: "hidden", textOverflow: "ellipsis",
                                  whiteSpace: "nowrap", fontFamily: FONT,
                                }}>
                                  {session.meeting_description || "—"}
                                </p>
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                {hasTask
                                  ? <span style={{
                                      display: "inline-flex", alignItems: "center", gap: 5,
                                      fontSize: 11, fontWeight: 700, fontFamily: FONT,
                                      padding: "3px 9px 3px 7px", borderRadius: 20,
                                      background: taskDone ? "#f0fdf6" : "#f8fafc",
                                      color: taskDone ? "#16a34a" : "#64748b",
                                      border: `1.5px solid ${taskDone ? "#bbf7d0" : "#e2e8f0"}`,
                                      whiteSpace: "nowrap",
                                    }}>
                                      {taskDone
                                        ? <><CheckCircle2 size={10} />Done</>
                                        : <><Circle size={10} />Pending</>}
                                    </span>
                                  : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                {session.mentee_rating > 0
                                  ? <StarDisplay value={session.mentee_rating} />
                                  : <span style={{ color: "#e2e8f0", fontSize: 13 }}>—</span>}
                              </td>
                              <td style={{ padding: "13px 16px" }}>
                                <p style={{
                                  margin: 0, fontSize: 12, color: "#94a3b8",
                                  overflow: "hidden", textOverflow: "ellipsis",
                                  whiteSpace: "nowrap", fontFamily: FONT,
                                }}>
                                  {session.mentee_feedback || "—"}
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>

                <PaginationBar pagination={pagination} onPage={setPage} />
              </div>
            )}

            {/* ── MOBILE CARDS ── */}
            {!isLoading && !isError && displayed.length > 0 && (
              <div className="mobile-cards" style={{
                flexDirection: "column", gap: 10, padding: "14px",
              }}>
                {displayed.map((session) => (
                  <MobileCard key={session._id} session={session} onClick={setEditSession} />
                ))}

                {/* Mobile pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", paddingTop: 8, gap: 10,
                  }}>
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!pagination.hasPrevPage}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 16px", borderRadius: 9,
                        fontSize: 12, fontWeight: 700, fontFamily: FONT,
                        background: pagination.hasPrevPage ? "#1a1a2e" : "#f1f5f9",
                        color: pagination.hasPrevPage ? "#fff" : "#94a3b8",
                        border: "none",
                        cursor: pagination.hasPrevPage ? "pointer" : "not-allowed",
                      }}
                    >
                      <ChevronLeft size={14} />Prev
                    </button>
                    <span style={{
                      fontSize: 12, color: "#94a3b8", fontWeight: 600, fontFamily: FONT,
                    }}>
                      {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={!pagination.hasNextPage}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "9px 16px", borderRadius: 9,
                        fontSize: 12, fontWeight: 700, fontFamily: FONT,
                        background: pagination.hasNextPage ? "#1a1a2e" : "#f1f5f9",
                        color: pagination.hasNextPage ? "#fff" : "#94a3b8",
                        border: "none",
                        cursor: pagination.hasNextPage ? "pointer" : "not-allowed",
                      }}
                    >
                      Next<ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {editSession && (
        <SessionModal
          session={editSession}
          menteeId={menteeId}
          onClose={() => setEditSession(null)}
          onSave={handleSave}
        />
      )}

      <Toast toast={toast} />

      {/* Responsive classes */}
      <style>{`
        .desktop-table { display: block; }
        .mobile-cards  { display: none;  }
        @media (max-width: 768px) {
          .desktop-table { display: none;  }
          .mobile-cards  { display: flex; }
        }
      `}</style>
    </>
  );
}


