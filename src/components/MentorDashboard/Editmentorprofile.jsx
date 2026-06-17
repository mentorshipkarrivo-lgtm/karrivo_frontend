
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    User, Briefcase, MessageCircle, Users, Trophy,
    Camera, Upload, CheckCircle, Loader2, AlertCircle, X,
    Plus, Trash2, Clock, Calendar, Globe, Video, Target,
    Award, BadgeCheck, FileText, Eye, ChevronRight, Pencil,
    ArrowLeft, Building2, MapPin, CalendarDays
} from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────────
const F = `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
const MAX_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const NAV_ORDER = ["overview", "experience", "engagement", "mentorship", "achievements"];

const EXPERTISE_OPTIONS = [
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Full Stack Developer" },
    { value: "devops", label: "DevOps Engineer" },
    { value: "datascience", label: "Data Science" },
    { value: "ui-ux", label: "UI/UX Designer" },
    { value: "product", label: "Product Manager" },
];

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Self-employed"];

// ── Color tokens ───────────────────────────────────────────────────────────────
const T = {
    primary: "#0098cc",
    btn: "#1a1a2e",
    bg: "#ffffff",
    surface: "#f8f9fb",
    border: "#e8eaed",
    borderMed: "#d1d5db",
    textDark: "rgb(81, 87, 98)",
    textMid: "rgb(81, 87, 98)",
    textLight: "#9ca3af",
    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",
    successBg: "#f0fdf4",
    warningBg: "#fffbeb",
    errorBg: "#fef2f2",
    primaryBg: "#e8f6fc",
    primaryBd: "#bae3f5",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
};
const splitCSV = (str) => (str || "").split(",").map((s) => s.trim()).filter(Boolean);
const joinCSV = (arr) => arr.join(", ");
const slotCount = (s, e) => {
    const [sh, sm] = s.split(":").map(Number);
    const [eh, em] = e.split(":").map(Number);
    return Math.floor(((eh * 60 + em) - (sh * 60 + sm)) / 30);
};
const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};
const monthYear = (str) => {
    if (!str) return "";
    const [y, m] = str.split("-");
    if (!y || !m) return str;
    const d = new Date(parseInt(y), parseInt(m) - 1);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};
// Convert "HH:MM" (24h) into "h:mmam/pm"
const fmtTime12 = (t) => {
    const [h, m] = t.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")}${period}`;
};

// ── Profile completion ─────────────────────────────────────────────────────────
const calcCompletion = (fd) => {
    const fields = [
        fd?.fullName, fd?.currentRole, fd?.location, fd?.whyMentor,
        fd?.currentSkills, fd?.yearsOfExperience, fd?.hourlyRate,
        fd?.companyName, fd?.languages?.length, fd?.guidanceAreas?.length,
        fd?.certifications?.length, fd?.accomplishments?.length,
        fd?.profilePhoto, fd?.linkedinUrl,
    ];
    return Math.round((fields.filter((v) => v && v !== "" && v !== 0).length / fields.length) * 100);
};

// ── Shared styles ──────────────────────────────────────────────────────────────
const inp = (err) => ({
    fontFamily: F,
    width: "100%",
    padding: "9px 12px",
    boxSizing: "border-box",
    border: `1.5px solid ${err ? T.error : T.borderMed}`,
    borderRadius: 8,
    fontSize: 13,
    color: T.textDark,
    background: T.bg,
    outline: "none",
    lineHeight: 1.6,
});

const lbl = {
    fontFamily: F,
    fontSize: 12,
    fontWeight: 600,
    color: T.textMid,
    margin: "0 0 5px",
    display: "block",
};

const secHead = {
    fontFamily: F,
    fontSize: 12,
    fontWeight: 700,
    color: T.textDark,
    margin: "0 0 12px",
    display: "flex",
    alignItems: "center",
    gap: 6,
};

// ── Pill ───────────────────────────────────────────────────────────────────────
const PILL_PALETTES = {
    blue: { bg: T.primaryBg, bd: T.primaryBd, c: T.primary },
    amber: { bg: "#fef3c7", bd: "#fcd34d", c: "#b45309" },
    teal: { bg: "#f0fdf4", bd: "#86efac", c: "#15803d" },
    purple: { bg: "#f5f3ff", bd: "#c4b5fd", c: "#7c3aed" },
};

const Pill = ({ label, onRemove, col = "blue" }) => {
    const p = PILL_PALETTES[col] || PILL_PALETTES.blue;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px 4px 11px", borderRadius: 100,
            fontSize: 12, fontWeight: 500, background: p.bg,
            border: `1px solid ${p.bd}`, color: p.c, whiteSpace: "nowrap",
        }}>
            {label}
            {onRemove && (
                <button onClick={onRemove} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: p.c, fontSize: 14, lineHeight: 1, padding: 0,
                    opacity: 0.6, display: "flex", alignItems: "center",
                }}>×</button>
            )}
        </span>
    );
};

const TagRow = ({ placeholder, valKey, field, isArr, tagInputs, setTagInp, addArr, addCSV }) => (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
            value={tagInputs[valKey]}
            onChange={(e) => setTagInp(valKey, e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    isArr ? addArr(field, valKey) : addCSV(field, valKey);
                }
            }}
            placeholder={placeholder}
            style={{
                flex: 1, minWidth: 0, fontFamily: F, fontSize: 13, padding: "8px 11px",
                border: `1.5px solid ${T.borderMed}`, borderRadius: 7,
                color: T.textDark, background: T.bg, outline: "none", boxSizing: "border-box",
            }}
        />
        <button
            type="button"
            onClick={() => isArr ? addArr(field, valKey) : addCSV(field, valKey)}
            style={{
                padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7,
                border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                flexShrink: 0, fontFamily: F,
            }}
        >Add</button>
    </div>
);

const FieldErr = ({ msg }) => msg ? (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontFamily: F, fontSize: 11, color: T.error }}>
        <AlertCircle size={10} />{msg}
    </div>
) : null;

const CompletionBar = ({ pct }) => (
    <div style={{ padding: "14px 16px", borderTop: `1px solid ${T.border}`, background: T.surface }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: T.textLight }}>Profile Completion</span>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error }}>{pct}%</span>
        </div>
        <div style={{ height: 5, background: T.border, borderRadius: 100, overflow: "hidden" }}>
            <div style={{
                height: "100%", width: `${pct}%`,
                background: pct >= 80 ? T.success : pct >= 50 ? T.warning : T.error,
                borderRadius: 100, transition: "width .4s ease",
            }} />
        </div>
        {pct < 100 && (
            <p style={{ fontFamily: F, fontSize: 10, color: T.textLight, margin: "5px 0 0" }}>
                Complete your profile to get more bookings
            </p>
        )}
    </div>
);

// ── Experience Card ────────────────────────────────────────────────────────────
const ExperienceCard = ({ exp, onEdit, onDelete }) => (
    <div style={{
        background: T.bg, border: `1px solid ${T.border}`, borderRadius: 10,
        padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start",
    }}>
        <div style={{
            width: 38, height: 38, borderRadius: 8, background: T.surface,
            border: `1px solid ${T.border}`, display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
        }}>
            <Building2 size={18} color={T.primary} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: "0 0 2px" }}>
                {exp.designation || exp.currentRole || "Role"}
            </p>
            <p style={{ fontFamily: F, fontSize: 12, color: T.primary, fontWeight: 500, margin: "0 0 4px" }}>
                {exp.companyName || "Company"}
                {exp.employmentType ? ` · ${exp.employmentType}` : ""}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: F, fontSize: 11, color: T.textLight, display: "flex", alignItems: "center", gap: 3 }}>
                    <CalendarDays size={10} />
                    {monthYear(exp.startDate)} — {exp.currentlyWorking ? "Present" : monthYear(exp.endDate)}
                </span>
                {exp.location && (
                    <span style={{ fontFamily: F, fontSize: 11, color: T.textLight, display: "flex", alignItems: "center", gap: 3 }}>
                        <MapPin size={10} />{exp.location}
                    </span>
                )}
            </div>
            {exp.description && (
                <p style={{
                    fontFamily: F, fontSize: 12, color: T.textMid, margin: "8px 0 0",
                    lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                    {exp.description}
                </p>
            )}
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
                onClick={onEdit}
                style={{
                    background: T.primaryBg, border: `1px solid ${T.primaryBd}`, color: T.primary,
                    borderRadius: 6, padding: "5px 7px", cursor: "pointer", display: "flex", alignItems: "center",
                }}
            ><Pencil size={12} /></button>
            <button
                onClick={onDelete}
                style={{
                    background: T.errorBg, border: "1px solid #fca5a5", color: T.error,
                    borderRadius: 6, padding: "5px 7px", cursor: "pointer", display: "flex", alignItems: "center",
                }}
            ><Trash2 size={12} /></button>
        </div>
    </div>
);

// ── Experience Form ────────────────────────────────────────────────────────────
const ExperienceForm = ({ initial, onSave, onCancel }) => {
    const [form, setForm] = useState({
        designation: "",
        companyName: "",
        employmentType: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        ...initial,
    });
    const [errs, setErrs] = useState({});

    const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.designation?.trim()) e.designation = "Job title is required";
        if (!form.companyName?.trim()) e.companyName = "Company is required";
        if (!form.startDate) e.startDate = "Start date is required";
        setErrs(e);
        return !Object.keys(e).length;
    };

    const handleSave = () => {
        if (!validate()) return;
        onSave(form);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <button
                    onClick={onCancel}
                    style={{
                        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 7,
                        padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center",
                    }}
                ><ArrowLeft size={14} color={T.textMid} /></button>
                <h4 style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: 0 }}>
                    {initial?.designation ? "Edit Experience" : "Add Experience"}
                </h4>
            </div>

            <div>
                <span style={lbl}>Job Title *</span>
                <input
                    style={inp(errs.designation)}
                    value={form.designation}
                    onChange={(e) => { set("designation", e.target.value); if (errs.designation) setErrs((p) => ({ ...p, designation: "" })); }}
                    placeholder="e.g. Senior Full Stack Developer"
                />
                <FieldErr msg={errs.designation} />
            </div>

            <div className="em-grid-2col">
                <div>
                    <span style={lbl}>Company *</span>
                    <input
                        style={inp(errs.companyName)}
                        value={form.companyName}
                        onChange={(e) => { set("companyName", e.target.value); if (errs.companyName) setErrs((p) => ({ ...p, companyName: "" })); }}
                        placeholder="e.g. Adobe"
                    />
                    <FieldErr msg={errs.companyName} />
                </div>
                <div>
                    <span style={lbl}>Employment Type</span>
                    <select
                        value={form.employmentType}
                        onChange={(e) => set("employmentType", e.target.value)}
                        style={{ ...inp(), background: T.bg }}
                    >
                        <option value="">Select type</option>
                        {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <span style={lbl}>Location</span>
                <input
                    style={inp()}
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="e.g. Hyderabad, India"
                />
            </div>

            <div className="em-grid-2col">
                <div>
                    <span style={lbl}>Start Date *</span>
                    <input
                        type="month"
                        style={{ ...inp(errs.startDate), colorScheme: "light" }}
                        value={form.startDate}
                        onChange={(e) => { set("startDate", e.target.value); if (errs.startDate) setErrs((p) => ({ ...p, startDate: "" })); }}
                    />
                    <FieldErr msg={errs.startDate} />
                </div>
                <div style={{ opacity: form.currentlyWorking ? 0.4 : 1, pointerEvents: form.currentlyWorking ? "none" : "auto" }}>
                    <span style={lbl}>End Date</span>
                    <input
                        type="month"
                        style={{ ...inp(), colorScheme: "light" }}
                        value={form.endDate}
                        onChange={(e) => set("endDate", e.target.value)}
                        min={form.startDate}
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={() => { set("currentlyWorking", !form.currentlyWorking); if (!form.currentlyWorking) set("endDate", ""); }}
                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0, width: "fit-content" }}
            >
                <div style={{
                    width: 34, height: 18, borderRadius: 100, background: form.currentlyWorking ? T.primary : T.border,
                    position: "relative", transition: "background .2s", flexShrink: 0,
                }}>
                    <div style={{
                        position: "absolute", top: 2, left: form.currentlyWorking ? 16 : 2,
                        width: 14, height: 14, borderRadius: "50%", background: "#fff",
                        transition: "left .2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }} />
                </div>
                <span style={{ fontFamily: F, fontSize: 13, color: T.textMid, fontWeight: 500 }}>I currently work here</span>
            </button>

            <div>
                <span style={lbl}>About your role</span>
                <textarea
                    style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }}
                    rows={4}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                />
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 4 }}>
                <button
                    onClick={onCancel}
                    style={{
                        fontFamily: F, padding: "9px 18px", fontSize: 13, fontWeight: 600,
                        border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid,
                        background: T.bg, cursor: "pointer",
                    }}
                >Cancel</button>
                <button
                    onClick={handleSave}
                    style={{
                        fontFamily: F, padding: "9px 20px", fontSize: 13, fontWeight: 600,
                        border: "none", borderRadius: 8, color: "#fff", background: T.btn,
                        cursor: "pointer",
                    }}
                >Save Experience</button>
            </div>
        </div>
    );
};

// ── Availability Calendar (Calendly-style side-by-side) ────────────────────────
const AvailCalendar = ({ availability, onRemoveSlot }) => {
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    // Monday-first weeks (0=Mon..6=Sun)
    const firstDayRaw = new Date(year, month, 1).getDay();
    const firstDay = (firstDayRaw + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const availByDate = {};
    (availability || []).forEach((slot) => {
        const ds = new Date(slot.date).toISOString().split("T")[0];
        if (!availByDate[ds]) availByDate[ds] = [];
        availByDate[ds].push(slot);
    });

    const selectedDS = selectedDate ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}` : null;
    const selectedSlots = selectedDS
        ? (availByDate[selectedDS] || []).slice().sort((a, b) => a.startTime.localeCompare(b.startTime))
        : [];

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const selectedLabel = selectedDate
        ? new Date(`${selectedDS}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="avail-grid" style={{ display: "grid", gridTemplateColumns: selectedDate ? "1fr 220px" : "1fr", gap: 16, alignItems: "start" }}>

                {/* ── Calendar column ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
                    {/* Calendar header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <button onClick={prevMonth} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontFamily: F, fontSize: 13, color: T.textMid }}>‹</button>
                        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark }}>
                            {viewDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                        </span>
                        <button onClick={nextMonth} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontFamily: F, fontSize: 13, color: T.textMid }}>›</button>
                    </div>

                    {/* Day headers (Mon-first) */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                            <div key={d} style={{ textAlign: "center", fontFamily: F, fontSize: 11, fontWeight: 600, color: T.textLight, padding: "4px 0" }}>{d}</div>
                        ))}
                    </div>

                    {/* Days */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                            const slots = availByDate[ds] || [];
                            const hasSlots = slots.length > 0;
                            const hasBooked = slots.some((s) => s.isBooked);
                            const isSelected = selectedDate === day;
                            const isToday = new Date().toISOString().split("T")[0] === ds;

                            return (
                                <button
                                    key={day}
                                    onClick={() => { if (hasSlots) setSelectedDate(isSelected ? null : day); }}
                                    style={{
                                        position: "relative", textAlign: "center", padding: "6px 4px",
                                        borderRadius: hasSlots && !isSelected ? 100 : 8,
                                        border: isSelected ? `2px solid ${T.primary}` : isToday ? `1.5px solid ${T.borderMed}` : "1.5px solid transparent",
                                        background: isSelected ? T.primary : hasBooked ? T.warningBg : "transparent",
                                        cursor: hasSlots ? "pointer" : "default",
                                        fontFamily: F, fontSize: 12, fontWeight: isSelected || hasSlots ? 700 : 400,
                                        color: isSelected ? "#fff" : hasSlots ? T.primary : T.textLight,
                                    }}
                                >
                                    {day}
                                    {hasSlots && !isSelected && (
                                        <div style={{
                                            position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
                                            display: "flex", gap: 2,
                                        }}>
                                            <div style={{
                                                width: 4, height: 4, borderRadius: "50%",
                                                background: hasBooked ? T.warning : T.success,
                                            }} />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {[
                            { dot: T.success, label: "Available" },
                            { dot: T.warning, label: "Has bookings" },
                            { dot: T.primary, label: "Selected" },
                        ].map(({ dot, label }) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} />
                                <span style={{ fontFamily: F, fontSize: 11, color: T.textLight }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Slots column ── */}
                {selectedDate && (
                    <div style={{ display: "flex", flexDirection: "column", minWidth: 0, maxHeight: 320 }}>
                        <p style={{
                            fontFamily: F, fontSize: 12.5, fontWeight: 700, color: T.textDark,
                            margin: "0 0 10px", paddingBottom: 8, borderBottom: `1px solid ${T.border}`,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                            {selectedLabel}
                        </p>
                        <div className="avail-slot-scroll" style={{
                            display: "flex", flexDirection: "column", gap: 8,
                            overflowY: "auto", paddingRight: 6, maxHeight: 270,
                        }}>
                            {selectedSlots.length === 0 && (
                                <p style={{ fontFamily: F, fontSize: 12, color: T.textLight, margin: 0 }}>No slots for this day.</p>
                            )}
                            {selectedSlots.map((slot) => (
                                <div
                                    key={`${slot.startTime}`}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 6,
                                        width: "100%", boxSizing: "border-box",
                                        padding: "10px 12px", borderRadius: 8,
                                        background: slot.isBooked ? T.warningBg : T.bg,
                                        border: `1.5px solid ${slot.isBooked ? "#fcd34d" : T.primary}`,
                                    }}
                                >
                                    <span style={{
                                        fontFamily: F, fontSize: 13, fontWeight: 600, flex: 1,
                                        color: slot.isBooked ? T.warning : T.primary,
                                    }}>
                                        {fmtTime12(slot.startTime)}
                                    </span>
                                    <span style={{ fontFamily: F, fontSize: 10, color: T.textLight, flexShrink: 0 }}>
                                        {slot.isBooked ? "Booked" : "Free"}
                                    </span>
                                    {!slot.isBooked && (
                                        <button
                                            onClick={() => {
                                                const ds = new Date(slot.date).toISOString().split("T")[0];
                                                onRemoveSlot(ds, slot.startTime);
                                            }}
                                            style={{
                                                background: "none", border: "none", cursor: "pointer",
                                                color: T.error, display: "flex", alignItems: "center", padding: 0, flexShrink: 0,
                                            }}
                                        ><X size={12} /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Main Component ─────────────────────────────────────────────────────────────
function EditMentorProfile({ onClose, initialTab = "overview", getMentorDetails, updateMentorDetails, data, isLoading, isSaving, email }) {
    const [formData, setFormData] = useState({ availability: [] });
    const [modalTab, setModalTab] = useState(initialTab);
    const [modalErrors, setModalErrors] = useState({});
    const [tagInputs, setTagInputs] = useState({ skill: "", lang: "", guid: "", cert: "", accomp: "" });

    // Experience state
    const [experiences, setExperiences] = useState([]);
    const [showExpForm, setShowExpForm] = useState(false);
    const [editingExp, setEditingExp] = useState(null);
    const [editingExpIdx, setEditingExpIdx] = useState(null);

    // Availability states
    const [availDateFrom, setAvailDateFrom] = useState("");
    const [availDateTo, setAvailDateTo] = useState("");
    const [availWeekdays, setAvailWeekdays] = useState(true);
    const [availBlockStart, setAvailBlockStart] = useState("09:00");
    const [availBlockEnd, setAvailBlockEnd] = useState("12:00");
    const [availTimeBlocks, setAvailTimeBlocks] = useState([]);
    const [availErr, setAvailErr] = useState("");
    const [showAvailForm, setShowAvailForm] = useState(false);

    // Photo states
    const [photoProgress, setPhotoProgress] = useState(0);
    const [photoStatus, setPhotoStatus] = useState("idle");
    const [photoErrMsg, setPhotoErrMsg] = useState("");
    const [photoPreview, setPhotoPreview] = useState("");
    const [photoDragging, setPhotoDragging] = useState(false);
    const photoInputRef = useRef(null);
    const serverRef = useRef(null);

    // Mentorship states
    const [ltmMenteeLimit, setLtmMenteeLimit] = useState("3");
    const [sessionsFrequency, setSessionsFrequency] = useState("");
    const [mentorshipPitch, setMentorshipPitch] = useState("");
    const [primaryExpertise, setPrimaryExpertise] = useState("");
    const [primaryCustom, setPrimaryCustom] = useState(false);
    const [secondaryExpertise, setSecondaryExpertise] = useState([]);
    const [secondaryCustomInput, setSecondaryCustomInput] = useState("");
    const [personaFreshers, setPersonaFreshers] = useState(false);
    const [personaExperienced, setPersonaExperienced] = useState(false);
    const [trialDuration, setTrialDuration] = useState("");
    const [trialSessionFrequency, setTrialSessionFrequency] = useState("");
    const [trialMenteeLimit, setTrialMenteeLimit] = useState("1");

    useEffect(() => {
        if (data?.data) {
            serverRef.current = data.data;
            setFormData({ ...data.data });
            setExperiences(Array.isArray(data.data.experiences) ? data.data.experiences : []);
            setLtmMenteeLimit(data.data.ltmMenteeLimit || "3");
            setSessionsFrequency(data.data.sessionsFrequency || "");
            setMentorshipPitch(data.data.mentorshipPitch || "");
            const savedPrimary = data.data.primaryExpertise || "";
            const isPreset = EXPERTISE_OPTIONS.some((o) => o.value === savedPrimary);
            setPrimaryExpertise(savedPrimary);
            setPrimaryCustom(savedPrimary !== "" && !isPreset);
            setSecondaryExpertise(Array.isArray(data.data.secondaryExpertise) ? data.data.secondaryExpertise : data.data.secondaryExpertise ? [data.data.secondaryExpertise] : []);
            setPersonaFreshers(data.data.personaFreshers || false);
            setPersonaExperienced(data.data.personaExperienced || false);
            setTrialDuration(data.data.trialDuration || "");
            setTrialSessionFrequency(data.data.trialSessionFrequency || "");
            setTrialMenteeLimit(data.data.trialMenteeLimit || "1");
        }
    }, [data]);

    useEffect(() => {
        if (formData.profilePhoto && photoStatus === "idle") setPhotoPreview(formData.profilePhoto);
    }, [formData.profilePhoto]);

    useEffect(() => {
        if (initialTab) { setModalTab(initialTab); setModalErrors({}); }
    }, [initialTab]);

    const completion = calcCompletion(formData);
    const skills = splitCSV(formData.currentSkills);
    const langs = Array.isArray(formData.languages) ? formData.languages : [];
    const guidAreas = Array.isArray(formData.guidanceAreas) ? formData.guidanceAreas : [];
    const certs = Array.isArray(formData.certifications) ? formData.certifications : [];
    const accomps = Array.isArray(formData.accomplishments) ? formData.accomplishments : [];
    const availFlat = (formData.availability || [])
        .filter((s) => s.date)
        .map((s) => ({ ...s, ds: new Date(s.date).toISOString().split("T")[0] }))
        .sort((a, b) => new Date(a.ds) - new Date(b.ds));

    const set = (f, v) => setFormData((p) => ({ ...p, [f]: v }));
    const setTagInp = (k, v) => setTagInputs((p) => ({ ...p, [k]: v }));
    const addCSV = (field, key) => {
        const v = tagInputs[key].trim();
        if (!v) return;
        const arr = splitCSV(formData[field]);
        if (!arr.includes(v)) set(field, joinCSV([...arr, v]));
        setTagInp(key, "");
    };
    const rmCSV = (field, val) => set(field, joinCSV(splitCSV(formData[field]).filter((s) => s !== val)));
    const addArr = (field, key) => {
        const v = tagInputs[key].trim();
        if (!v) return;
        const arr = Array.isArray(formData[field]) ? formData[field] : [];
        if (!arr.includes(v)) set(field, [...arr, v]);
        setTagInp(key, "");
    };
    const rmArr = (field, val) => set(field, (Array.isArray(formData[field]) ? formData[field] : []).filter((x) => x !== val));
    const tagRowShared = { tagInputs, setTagInp, addArr, addCSV };

    const handleClose = () => {
        if (serverRef.current) setFormData({ ...serverRef.current });
        onClose?.();
    };

    const handleSave = async (shouldClose = true) => {
        try {
            const enriched = {
                ...formData,
                experiences,
                ltmMenteeLimit, sessionsFrequency, mentorshipPitch,
                primaryExpertise, secondaryExpertise,
                personaFreshers, personaExperienced,
                trialDuration, trialSessionFrequency, trialMenteeLimit,
                availability: (formData.availability || []).map((slot) => {
                    if (slot.day) return slot;
                    const ds = new Date(slot.date).toISOString().split("T")[0];
                    return { ...slot, day: new Date(ds + "T00:00:00").toLocaleDateString("en-US", { weekday: "long" }) };
                }),
            };
            await updateMentorDetails({ email, ...enriched }).unwrap();
            if (shouldClose) onClose?.();
            getMentorDetails(email);
        } catch { }
    };

    const validate = (tab) => {
        const e = {};
        if (tab === "overview") {
            if (!formData.fullName?.trim()) e.fullName = "Required.";
            if (!formData.currentRole?.trim()) e.role = "Required.";
        }
        if (tab === "experience") {
            if (!formData.yearsOfExperience) e.yoe = "Required.";
            if (!formData.hourlyRate) e.rate = "Required.";
        }
        setModalErrors(e);
        return !Object.keys(e).length;
    };

    const handleModalSave = async () => {
        if (!validate(modalTab)) return;
        await handleSave(true);
    };

    const handleModalNext = async () => {
        if (!validate(modalTab)) return;
        await handleSave(false);
        const idx = NAV_ORDER.indexOf(modalTab);
        if (idx < NAV_ORDER.length - 1) { setModalTab(NAV_ORDER[idx + 1]); setModalErrors({}); }
    };

    const handlePhotoFile = useCallback((file) => {
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) { setPhotoErrMsg("Only JPG, PNG, WebP or GIF."); setPhotoStatus("error"); return; }
        if (file.size > MAX_MB * 1024 * 1024) { setPhotoErrMsg(`Max ${MAX_MB} MB.`); setPhotoStatus("error"); return; }
        const reader = new FileReader();
        setPhotoStatus("uploading"); setPhotoProgress(0); setPhotoErrMsg("");
        reader.onprogress = (e) => { if (e.lengthComputable) setPhotoProgress(Math.round((e.loaded / e.total) * 100)); };
        reader.onload = (e) => {
            const base64 = e.target.result;
            setPhotoPreview(base64); setPhotoProgress(100); setPhotoStatus("done");
            set("profilePhoto", base64);
            try {
                const ud = JSON.parse(localStorage.getItem("userData") || "{}");
                ud.profilePhoto = base64;
                localStorage.setItem("userData", JSON.stringify(ud));
            } catch { }
        };
        reader.onerror = () => { setPhotoErrMsg("Failed to read file."); setPhotoStatus("error"); };
        reader.readAsDataURL(file);
    }, []);

    const clearPhoto = (e) => {
        e?.stopPropagation();
        setPhotoPreview(""); setPhotoStatus("idle"); setPhotoProgress(0); setPhotoErrMsg("");
        set("profilePhoto", "");
        if (photoInputRef.current) photoInputRef.current.value = "";
        try {
            const ud = JSON.parse(localStorage.getItem("userData") || "{}");
            delete ud.profilePhoto;
            localStorage.setItem("userData", JSON.stringify(ud));
        } catch { }
    };

    // Availability helpers
    const availChunkBlock = (start, end) => {
        const chunks = [];
        let [h, m] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        while (h * 60 + m < eh * 60 + em) {
            const s = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
            m += 30;
            if (m >= 60) { h++; m -= 60; }
            chunks.push({ startTime: s, endTime: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}` });
        }
        return chunks;
    };

    const availTotalDays = (() => {
        if (!availDateFrom || !availDateTo) return 0;
        let count = 0, cur = new Date(availDateFrom), to = new Date(availDateTo);
        while (cur <= to) {
            const d = cur.getDay();
            if (!availWeekdays || (d !== 0 && d !== 6)) count++;
            cur.setDate(cur.getDate() + 1);
        }
        return count;
    })();

    const availTotalSlots = availTotalDays * availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0);

    const availAddBlock = () => {
        setAvailErr("");
        const [sh, sm] = availBlockStart.split(":").map(Number);
        const [eh, em] = availBlockEnd.split(":").map(Number);
        if (sh * 60 + sm >= eh * 60 + em) { setAvailErr("End must be after start."); return; }
        if (slotCount(availBlockStart, availBlockEnd) < 1) { setAvailErr("Block must be ≥ 30 min."); return; }
        for (const b of availTimeBlocks) {
            const [bsh, bsm] = b.start.split(":").map(Number);
            const [beh, bem] = b.end.split(":").map(Number);
            if (sh * 60 + sm < beh * 60 + bem && eh * 60 + em > bsh * 60 + bsm) { setAvailErr(`Overlaps with ${b.start}–${b.end}`); return; }
        }
        setAvailTimeBlocks((p) => [...p, { start: availBlockStart, end: availBlockEnd }].sort((a, b) => a.start.localeCompare(b.start)));
        setAvailBlockStart("09:00"); setAvailBlockEnd("12:00");
    };

    const availGenerate = () => {
        setAvailErr("");
        if (!availDateFrom || !availDateTo) { setAvailErr("Select a date range."); return; }
        if (!availTimeBlocks.length) { setAvailErr("Add at least one time block."); return; }

        const coveredDates = new Set();
        let cur = new Date(availDateFrom), to = new Date(availDateTo);
        while (cur <= to) {
            const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0];
            if (!availWeekdays || (dow !== 0 && dow !== 6)) coveredDates.add(dateStr);
            cur.setDate(cur.getDate() + 1);
        }

        const conflictingBooked = (formData.availability || []).filter((s) => {
            if (!s.isBooked) return false;
            const ds = new Date(s.date).toISOString().split("T")[0];
            if (!coveredDates.has(ds)) return false;
            const [bh, bm] = s.startTime.split(":").map(Number);
            const bMins = bh * 60 + bm;
            return availTimeBlocks.some((block) => {
                const [sh, sm] = block.start.split(":").map(Number);
                const [eh, em] = block.end.split(":").map(Number);
                return bMins >= sh * 60 + sm && bMins < eh * 60 + em;
            });
        });

        if (conflictingBooked.length > 0) {
            const examples = conflictingBooked.slice(0, 3).map((s) => {
                const d = new Date(new Date(s.date).toISOString().split("T")[0] + "T00:00:00");
                return `${d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at ${s.startTime}`;
            });
            const more = conflictingBooked.length > 3 ? ` +${conflictingBooked.length - 3} more` : "";
            setAvailErr(`Cannot regenerate — ${conflictingBooked.length} booked slot(s) fall in this range: ${examples.join(", ")}${more}.`);
            return;
        }

        const newSlots = [];
        cur = new Date(availDateFrom); to = new Date(availDateTo);
        while (cur <= to) {
            const dow = cur.getDay(), dateStr = cur.toISOString().split("T")[0];
            if (!availWeekdays || (dow !== 0 && dow !== 6)) {
                for (const block of availTimeBlocks) {
                    for (const chunk of availChunkBlock(block.start, block.end)) {
                        newSlots.push({ date: dateStr, startTime: chunk.startTime, endTime: chunk.endTime, isBooked: false });
                    }
                }
            }
            cur.setDate(cur.getDate() + 1);
        }

        const seen = new Set();
        const unique = newSlots.filter((s) => {
            const k = `${s.date}_${s.startTime}`;
            if (seen.has(k)) return false;
            seen.add(k); return true;
        });

        setFormData((p) => ({ ...p, availability: [...(p.availability || []).filter((s) => s.isBooked), ...unique] }));
        setAvailDateFrom(""); setAvailDateTo(""); setAvailTimeBlocks([]);
        setAvailErr(""); setShowAvailForm(false);
    };

    const availRemoveSlot = (ds, startTime) => {
        const target = (formData.availability || []).find((s) => new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime);
        if (target?.isBooked) { setAvailErr(`Slot on ${ds} at ${startTime} is already booked and cannot be removed.`); return; }
        setFormData((p) => ({ ...p, availability: (p.availability || []).filter((s) => !(new Date(s.date).toISOString().split("T")[0] === ds && s.startTime === startTime)) }));
    };

    // Experience handlers
    const handleSaveExp = (expData) => {
        if (editingExpIdx !== null) {
            setExperiences((prev) => prev.map((e, i) => i === editingExpIdx ? expData : e));
        } else {
            setExperiences((prev) => [...prev, expData]);
        }
        setShowExpForm(false);
        setEditingExp(null);
        setEditingExpIdx(null);
    };

    const handleEditExp = (exp, idx) => {
        setEditingExp(exp);
        setEditingExpIdx(idx);
        setShowExpForm(true);
    };

    const handleDeleteExp = (idx) => {
        setExperiences((prev) => prev.filter((_, i) => i !== idx));
    };

    const inputSt = {
        fontFamily: F, fontSize: 13, width: "100%", boxSizing: "border-box",
        border: `1.5px solid ${T.borderMed}`, borderRadius: 7, padding: "8px 10px",
        color: T.textDark, background: T.bg, outline: "none", colorScheme: "light",
    };

    const modalNav = [
        { id: "overview", label: "Profile", icon: User },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "engagement", label: "Engagement", icon: MessageCircle },
        { id: "mentorship", label: "Mentorship", icon: Users },
        { id: "achievements", label: "Achievements", icon: Trophy },
    ];

    // Summary info for existing availability
    const availDates = [...new Set(availFlat.map((s) => s.ds))];
    const availFromDate = availDates[0];
    const availToDate = availDates[availDates.length - 1];

    return (
        <>
            <style>{`
        *,*::before,*::after{box-sizing:border-box}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
        .edit-modal input:focus,.edit-modal textarea:focus,.edit-modal select:focus{
          border-color:${T.primary}!important;outline:none;box-shadow:0 0 0 3px ${T.primaryBg}
        }
        .em-nav-btn.em-active:hover{background:#1a1a2e!important;color:#fff!important;}
        .em-nav-btn:not(.em-active):hover{background:${T.primaryBg}!important;color:${T.primary}!important;}
        .edit-modal ::-webkit-scrollbar{width:5px}
        .edit-modal ::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
        .edit-modal ::placeholder{color:${T.textLight}!important}
        .edit-modal input[type="time"]::-webkit-calendar-picker-indicator,
        .edit-modal input[type="date"]::-webkit-calendar-picker-indicator,
        .edit-modal input[type="month"]::-webkit-calendar-picker-indicator{opacity:.5;cursor:pointer}
        .modal-card{animation:fadeIn .2s ease}
        .em-overlay{padding:20px 60px;align-items:center}
        @media(max-width:640px){.em-overlay{padding:0!important;align-items:flex-end!important}}
        .em-card{border-radius:16px;max-width:860px;max-height:92vh}
        @media(max-width:640px){.em-card{max-width:100%!important;border-radius:20px 20px 0 0!important;max-height:96dvh!important;height:96dvh!important}}
        .em-body{display:flex;flex:1;min-height:0;overflow:hidden}
        @media(max-width:640px){.em-body{flex-direction:column}}
        .em-sidebar{background:${T.surface};border-right:1px solid ${T.border};width:180px;flex-shrink:0;display:flex;flex-direction:column}
        @media(max-width:640px){.em-sidebar{width:100%!important;border-right:none!important;border-bottom:1px solid ${T.border};flex-direction:row}}
        .em-nav{display:flex;flex-direction:column;gap:3px;padding:14px 10px;flex:1;overflow:auto}
        @media(max-width:640px){.em-nav{flex-direction:row!important;gap:0!important;padding:0!important;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none}}
        .em-nav::-webkit-scrollbar{display:none}
        .em-nav-btn{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:9px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .15s}
        @media(max-width:640px){.em-nav-btn{flex:1;justify-content:center;flex-direction:column;gap:4px!important;border-radius:0!important;padding:10px 6px!important;font-size:10px!important;border:none!important;border-bottom:2.5px solid transparent!important;background:transparent!important}
        .em-nav-btn.em-active{border-bottom-color:${T.primary}!important;color:${T.primary}!important;background:${T.primaryBg}!important}
        .em-nav-chevron{display:none!important}}
        .em-completion-bar{display:block}
        @media(max-width:640px){.em-completion-bar{display:none}}
        .em-content{flex:1;overflow:auto;padding:22px 24px}
        @media(max-width:640px){.em-content{padding:16px!important}}
        .em-grid-main{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
        .em-grid-edu{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}
        .em-grid-2col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .em-grid-date{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
        @media(max-width:640px){.em-grid-main,.em-grid-edu,.em-grid-2col{grid-template-columns:1fr!important;gap:12px!important}}
        @media(max-width:480px){.em-grid-date{grid-template-columns:1fr!important}}
        .em-time-row{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-end;margin-bottom:10px}
        @media(max-width:480px){.em-time-row>div{flex:1 1 40%;min-width:80px}}
        .em-footer{display:flex;gap:8px;padding:13px 20px;border-top:1px solid ${T.border};background:${T.surface};flex-shrink:0;justify-content:space-between;align-items:center;flex-wrap:wrap}
        .em-footer-actions{display:flex;gap:8px}
        @media(max-width:640px){.em-footer{padding:10px 14px!important}.em-cancel-btn{display:none!important}.em-footer-actions{width:100%}.em-footer-actions button{flex:1;justify-content:center}}
        .info-row{display:flex;gap:6px;align-items:flex-start;margin-bottom:6px}
        .info-label{font-family:${F};font-size:10px;font-weight:600;color:${T.textLight};min-width:80px}
        .info-value{font-family:${F};font-size:12px;color:${T.textDark};font-weight:500}
        .avail-grid{display:grid}
        @media(max-width:640px){.avail-grid{grid-template-columns:1fr!important}}
        .avail-slot-scroll::-webkit-scrollbar{width:5px}
        .avail-slot-scroll::-webkit-scrollbar-thumb{background:${T.borderMed};border-radius:4px}
      `}</style>

            <div className="edit-modal em-overlay" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", justifyContent: "center" }}>
                <div className="modal-card em-card" style={{ background: T.bg, width: "100%", display: "flex", flexDirection: "column", boxShadow: "0 32px 100px rgba(0,0,0,0.25)", border: `1px solid ${T.border}`, overflow: "hidden" }}>

                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${T.border}`, flexShrink: 0, background: T.surface }}>
                        <h2 style={{ fontFamily: F, fontSize: 14, fontWeight: 700, color: T.textDark, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                            <Pencil size={14} color={T.primary} /> Edit Profile
                        </h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                fontFamily: F, fontSize: 12, fontWeight: 700,
                                color: completion >= 80 ? T.success : completion >= 50 ? T.warning : T.error,
                                background: completion >= 80 ? T.successBg : completion >= 50 ? T.warningBg : T.errorBg,
                                border: `1px solid ${completion >= 80 ? "#86efac" : completion >= 50 ? "#fcd34d" : "#fca5a5"}`,
                                borderRadius: 20, padding: "3px 10px",
                            }}>{completion}% complete</div>
                            <button onClick={handleClose} disabled={isSaving} style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.textMid, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="em-body">
                        {/* Sidebar */}
                        <div className="em-sidebar">
                            <nav className="em-nav">
                                {modalNav.map(({ id, label, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => { setModalTab(id); setModalErrors({}); setShowExpForm(false); }}
                                        className={`em-nav-btn${modalTab === id ? " em-active" : ""}`}
                                        style={{
                                            background: modalTab === id ? T.btn : "transparent",
                                            color: modalTab === id ? "#fff" : T.textMid,
                                            border: `1px solid ${modalTab === id ? T.btn : "transparent"}`,
                                            fontFamily: F, fontSize: "15px",

                                        }}
                                    >
                                        <Icon size={14} />
                                        {label}
                                        <ChevronRight size={12} className="em-nav-chevron" style={{ marginLeft: "auto" }} />
                                    </button>
                                ))}
                            </nav>
                            <div className="em-completion-bar">
                                <CompletionBar pct={completion} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="em-content">

                            {/* ── Profile Tab ── */}
                            {modalTab === "overview" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>Basic Information</h3>

                                    {/* Photo */}
                                    <div>
                                        <span style={lbl}>Profile Photo</span>
                                        <div
                                            onDrop={(e) => { e.preventDefault(); setPhotoDragging(false); handlePhotoFile(e.dataTransfer.files?.[0]); }}
                                            onDragOver={(e) => { e.preventDefault(); setPhotoDragging(true); }}
                                            onDragLeave={() => setPhotoDragging(false)}
                                            onClick={() => photoStatus !== "uploading" && photoInputRef.current?.click()}
                                            style={{
                                                borderRadius: 10, border: `2px dashed ${photoDragging ? T.primary : photoStatus === "error" ? T.error : T.borderMed}`,
                                                background: photoDragging ? T.primaryBg : T.surface, display: "flex", alignItems: "center",
                                                justifyContent: "center", cursor: photoStatus === "uploading" ? "not-allowed" : "pointer",
                                                overflow: "hidden", minHeight: 70,
                                            }}
                                        >
                                            <input ref={photoInputRef} type="file" accept={ALLOWED_TYPES.join(",")} style={{ display: "none" }} onChange={(e) => handlePhotoFile(e.target.files?.[0])} />
                                            {photoPreview ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", width: "100%" }}>
                                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                                        <img src={photoPreview} alt="preview" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", border: `2px solid ${photoStatus === "done" ? T.success : T.borderMed}`, display: "block" }} onError={(e) => (e.target.style.display = "none")} />
                                                        {photoStatus === "done" && <div style={{ position: "absolute", bottom: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: T.success, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}><CheckCircle size={9} color="#fff" /></div>}
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        {photoStatus === "uploading" ? (
                                                            <><div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}><Loader2 size={11} color={T.primary} style={{ animation: "spin .9s linear infinite" }} /><span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 600 }}>Uploading… {photoProgress}%</span></div><div style={{ height: 3, background: T.border, borderRadius: 100, overflow: "hidden" }}><div style={{ height: "100%", width: `${photoProgress}%`, background: T.primary, borderRadius: 100, transition: "width .2s" }} /></div></>
                                                        ) : (
                                                            <><span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: photoStatus === "done" ? T.success : T.textMid }}>{photoStatus === "done" ? "Uploaded!" : ""}</span><p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "2px 0 0" }}>Click to replace</p></>
                                                        )}
                                                    </div>
                                                    {photoStatus !== "uploading" && <button type="button" onClick={clearPhoto} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 7, padding: 6, cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>}
                                                </div>
                                            ) : (
                                                <div style={{ textAlign: "center", padding: "18px" }}>
                                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                                                        {photoDragging ? <Upload size={16} color={T.primary} /> : <Camera size={16} color={T.primary} />}
                                                    </div>
                                                    <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textMid, margin: "0 0 3px" }}>{photoDragging ? "Drop to upload" : "Upload Profile Photo"}</p>
                                                    <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB} MB</p>
                                                </div>
                                            )}
                                        </div>
                                        {photoStatus === "error" && photoErrMsg && (
                                            <div style={{ display: "flex", alignItems: "center", gap: 5, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 7, padding: "7px 11px", fontFamily: F, fontSize: 11, color: T.error, marginTop: 6 }}>
                                                <AlertCircle size={12} style={{ flexShrink: 0 }} />{photoErrMsg}
                                            </div>
                                        )}
                                    </div>

                                    <div className="em-grid-main">
                                        <div><span style={lbl}>Full Name *</span><input style={inp(modalErrors.fullName)} value={formData.fullName || ""} onChange={(e) => { set("fullName", e.target.value); if (modalErrors.fullName) setModalErrors((p) => ({ ...p, fullName: "" })); }} placeholder="Your full name" /><FieldErr msg={modalErrors.fullName} /></div>
                                        <div><span style={lbl}>Professional Title *</span><input style={inp(modalErrors.role)} value={formData.currentRole || ""} onChange={(e) => { set("currentRole", e.target.value); if (modalErrors.role) setModalErrors((p) => ({ ...p, role: "" })); }} placeholder="e.g. Senior Engineer" /><FieldErr msg={modalErrors.role} /></div>
                                        <div><span style={lbl}>Location</span><input style={inp()} value={formData.location || ""} onChange={(e) => set("location", e.target.value)} placeholder="City, Country" /></div>
                                        <div><span style={lbl}>Phone</span><input style={inp()} value={formData.phone || ""} onChange={(e) => set("phone", e.target.value)} placeholder="+91 1234567890" /></div>
                                        <div><span style={lbl}>LinkedIn</span><input style={inp()} value={formData.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/…" /></div>
                                        <div><span style={lbl}>Mentoring Style</span><input style={inp()} value={formData.mentoringStyle || ""} onChange={(e) => set("mentoringStyle", e.target.value)} placeholder="e.g. Collaborative" /></div>
                                    </div>

                                    <div><span style={lbl}>Bio / About</span><textarea style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }} rows={3} value={formData.whyMentor || ""} onChange={(e) => set("whyMentor", e.target.value)} placeholder="Share your professional journey…" /></div>

                                    <div>
                                        <span style={lbl}>Specialisations / Domains</span>
                                        <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "0 0 4px" }}>e.g. Data Science, Cloud Computing</p>
                                        <TagRow placeholder="Add a specialisation…" valKey="skill" field="currentSkills" {...tagRowShared} />
                                        {skills.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{skills.map((s, i) => <Pill key={i} label={s} onRemove={() => rmCSV("currentSkills", s)} />)}</div>}
                                    </div>
                                </div>
                            )}

                            {/* ── Experience Tab ── */}
                            {modalTab === "experience" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>Experience</h3>

                                    {!showExpForm ? (
                                        <>
                                            {/* Professional Background fields */}
                                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                                <p style={secHead}><Briefcase size={12} color={T.primary} /> Professional Background</p>
                                                <div className="em-grid-main">
                                                    <div>
                                                        <span style={lbl}>Organisation</span>
                                                        <input style={inp()} value={formData.companyName || ""} onChange={(e) => set("companyName", e.target.value)} placeholder="e.g. Google" />
                                                    </div>
                                                    <div>
                                                        <span style={lbl}>Years of Experience *</span>
                                                        <input type="number" style={inp(modalErrors.yoe)} value={formData.yearsOfExperience || ""} onChange={(e) => { set("yearsOfExperience", e.target.value); if (modalErrors.yoe) setModalErrors((p) => ({ ...p, yoe: "" })); }} placeholder="e.g. 8" />
                                                        <FieldErr msg={modalErrors.yoe} />
                                                    </div>
                                                    <div>
                                                        <span style={lbl}>Hourly Rate (₹) *</span>
                                                        <input type="number" style={inp(modalErrors.rate)} value={formData.hourlyRate || ""} onChange={(e) => { set("hourlyRate", e.target.value); if (modalErrors.rate) setModalErrors((p) => ({ ...p, rate: "" })); }} placeholder="e.g. 1500" />
                                                        <FieldErr msg={modalErrors.rate} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Education */}
                                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px" }}>
                                                <p style={secHead}><Award size={12} color={T.primary} /> Educational Background</p>
                                                <div className="em-grid-edu">
                                                    <div>
                                                        <span style={lbl}>Highest Degree</span>
                                                        <select value={formData.highestDegree || ""} onChange={(e) => set("highestDegree", e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                            <option value="">Select degree</option>
                                                            {["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
                                                        </select>
                                                    </div>
                                                    <div><span style={lbl}>Field of Study</span><input style={inp()} value={formData.fieldOfStudy || ""} onChange={(e) => set("fieldOfStudy", e.target.value)} placeholder="e.g. Computer Science" /></div>
                                                    <div><span style={lbl}>Institution</span><input style={inp()} value={formData.schoolName || ""} onChange={(e) => set("schoolName", e.target.value)} placeholder="e.g. IIT Bombay" /></div>
                                                </div>
                                            </div>

                                            {/* Work Experience list */}
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                                    <p style={secHead}><Briefcase size={12} color={T.primary} /> Work Experience</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => { setEditingExp(null); setEditingExpIdx(null); setShowExpForm(true); }}
                                                        style={{
                                                            display: "flex", alignItems: "center", gap: 6,
                                                            padding: "7px 14px", background: T.btn, color: "#fff",
                                                            borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600,
                                                            cursor: "pointer", fontFamily: F,
                                                        }}
                                                    ><Plus size={13} /> Add Experience</button>
                                                </div>
                                                {experiences.length === 0 ? (
                                                    <div style={{ textAlign: "center", padding: "28px 16px", background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 10 }}>
                                                        <Briefcase size={28} color={T.textLight} style={{ marginBottom: 8 }} />
                                                        <p style={{ fontFamily: F, fontSize: 13, color: T.textLight, margin: 0 }}>No work experience added yet</p>
                                                        <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "4px 0 0" }}>Click "Add Experience" to get started</p>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                                        {experiences.map((exp, i) => (
                                                            <ExperienceCard
                                                                key={i}
                                                                exp={exp}
                                                                onEdit={() => handleEditExp(exp, i)}
                                                                onDelete={() => handleDeleteExp(i)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <ExperienceForm
                                            initial={editingExp}
                                            onSave={handleSaveExp}
                                            onCancel={() => { setShowExpForm(false); setEditingExp(null); setEditingExpIdx(null); }}
                                        />
                                    )}
                                </div>
                            )}

                            {/* ── Engagement Tab ── */}
                            {modalTab === "engagement" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>Engagement</h3>

                                    {/* Availability section */}
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                            <p style={secHead}><Calendar size={12} color={T.primary} /> Availability</p>
                                            <button
                                                type="button"
                                                onClick={() => setShowAvailForm((v) => !v)}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: 6,
                                                    padding: "6px 12px", background: showAvailForm ? T.surface : T.btn,
                                                    color: showAvailForm ? T.textMid : "#fff",
                                                    border: `1px solid ${showAvailForm ? T.border : T.btn}`,
                                                    borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F,
                                                }}
                                            >{showAvailForm ? "Hide Form" : <><Plus size={12} /> Add Slots</>}</button>
                                        </div>

                                        {/* Summary of existing availability */}
                                        {availDates.length > 0 && (
                                            <div style={{ background: T.primaryBg, border: `1px solid ${T.primaryBd}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
                                                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                                                    <div>
                                                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: T.textLight, margin: "0 0 2px" }}>Available from</p>
                                                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: 0 }}>
                                                            {fmtDate(availFromDate + "T00:00:00")}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: T.textLight, margin: "0 0 2px" }}>Available to</p>
                                                        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: T.textDark, margin: 0 }}>
                                                            {fmtDate(availToDate + "T00:00:00")}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: T.textLight, margin: "0 0 2px" }}>Total slots</p>
                                                        <div style={{ display: "flex", gap: 8 }}>
                                                            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.success }}>{availFlat.filter((s) => !s.isBooked).length} free</span>
                                                            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.warning }}>{availFlat.filter((s) => s.isBooked).length} booked</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Calendar view */}
                                        {availDates.length > 0 && (
                                            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
                                                <AvailCalendar availability={formData.availability} onRemoveSlot={availRemoveSlot} />
                                            </div>
                                        )}

                                        {/* Add slots form */}
                                        {showAvailForm && (
                                            <div style={{ background: T.surface, border: `1.5px dashed ${T.borderMed}`, borderRadius: 12, padding: "16px" }}>
                                                <p style={{ ...secHead, marginBottom: 12 }}><Calendar size={11} color={T.primary} /> Date Range</p>
                                                <div className="em-grid-date">
                                                    <div><span style={lbl}>From</span><input type="date" value={availDateFrom} min={tomorrow()} onChange={(e) => { setAvailDateFrom(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
                                                    <div><span style={lbl}>To</span><input type="date" value={availDateTo} min={availDateFrom || tomorrow()} onChange={(e) => { setAvailDateTo(e.target.value); setAvailErr(""); }} style={inputSt} /></div>
                                                </div>
                                                <button type="button" onClick={() => setAvailWeekdays((v) => !v)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "0 0 12px", marginBottom: 4 }}>
                                                    <div style={{ width: 34, height: 18, borderRadius: 100, background: availWeekdays ? T.primary : T.border, position: "relative", transition: "background .2s", flexShrink: 0 }}>
                                                        <div style={{ position: "absolute", top: 2, left: availWeekdays ? 16 : 2, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
                                                    </div>
                                                    <span style={{ fontFamily: F, fontSize: 12, color: T.textMid, fontWeight: 500 }}>Weekdays only (Mon–Fri)</span>
                                                </button>

                                                <p style={{ ...secHead, marginBottom: 10 }}><Clock size={11} color={T.primary} /> Time Blocks</p>
                                                <div className="em-time-row">
                                                    <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>Start</span><input type="time" value={availBlockStart} onChange={(e) => setAvailBlockStart(e.target.value)} style={inputSt} /></div>
                                                    <div style={{ flex: 1, minWidth: 90 }}><span style={lbl}>End</span><input type="time" value={availBlockEnd} onChange={(e) => setAvailBlockEnd(e.target.value)} style={inputSt} /></div>
                                                    {availBlockStart && availBlockEnd && slotCount(availBlockStart, availBlockEnd) > 0 && (
                                                        <div style={{ padding: "7px 10px", borderRadius: 7, background: T.successBg, border: "1px solid #86efac", fontFamily: F, fontSize: 11, color: T.success, fontWeight: 700, alignSelf: "flex-end", flexShrink: 0 }}>
                                                            {slotCount(availBlockStart, availBlockEnd)} slots
                                                        </div>
                                                    )}
                                                    <button type="button" onClick={availAddBlock} style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-end", flexShrink: 0, fontFamily: F }}>
                                                        <Plus size={13} /> Add Block
                                                    </button>
                                                </div>

                                                {availTimeBlocks.length > 0 ? (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                                                        {availTimeBlocks.map((b, i) => (
                                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, background: T.primaryBg, border: `1px solid ${T.primaryBd}` }}>
                                                                <Clock size={12} color={T.primary} style={{ flexShrink: 0 }} />
                                                                <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, flex: 1 }}>{b.start} — {b.end}</span>
                                                                <span style={{ fontFamily: F, fontSize: 11, color: T.success, fontWeight: 600, background: T.successBg, border: "1px solid #86efac", padding: "2px 8px", borderRadius: 20 }}>{slotCount(b.start, b.end)} × 30 min/day</span>
                                                                <button type="button" onClick={() => setAvailTimeBlocks((p) => p.filter((_, j) => j !== i))} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 6, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><X size={12} /></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div style={{ textAlign: "center", padding: 12, background: T.bg, border: `1px dashed ${T.border}`, borderRadius: 8, marginBottom: 12 }}>
                                                        <p style={{ fontFamily: F, fontSize: 11.5, color: T.textLight, margin: 0 }}>Add blocks above — e.g. 9:00–12:00</p>
                                                    </div>
                                                )}

                                                {availTimeBlocks.length > 0 && availDateFrom && availDateTo && (
                                                    <div style={{ padding: "12px 16px", borderRadius: 10, background: T.primaryBg, border: `1px solid ${T.primaryBd}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                                        <div>
                                                            <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: T.textDark, margin: "0 0 2px" }}>⚡ {availTotalSlots} slots will be generated</p>
                                                            <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: 0 }}>{availTotalDays} days × {availTimeBlocks.reduce((s, b) => s + slotCount(b.start, b.end), 0)} slots/day</p>
                                                        </div>
                                                        <button type="button" onClick={availGenerate} style={{ padding: "9px 18px", background: T.btn, color: "#fff", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, fontFamily: F }}>
                                                            <CheckCircle size={13} /> Generate
                                                        </button>
                                                    </div>
                                                )}

                                                {availErr && (
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: T.errorBg, border: "1px solid #fca5a5", borderRadius: 8, padding: "8px 12px", fontFamily: F, fontSize: 11.5, color: T.error, marginTop: 8 }}>
                                                        <AlertCircle size={12} style={{ flexShrink: 0 }} />{availErr}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    {/* Languages */}
                                    <div>
                                        <p style={secHead}><Globe size={12} color={T.primary} /> Languages</p>
                                        <TagRow placeholder="e.g. English, Hindi" valKey="lang" field="languages" isArr {...tagRowShared} />
                                        {langs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{langs.map((l, i) => <Pill key={i} label={l} col="amber" onRemove={() => rmArr("languages", l)} />)}</div>}
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    {/* Mentorship Format */}
                                    <div>
                                        <p style={secHead}><Video size={12} color={T.primary} /> Mentorship Format</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {["Online", "Group Sessions", "One-on-One"].map((fmt) => {
                                                const sel = splitCSV(formData.mentorshipFormat).includes(fmt);
                                                return (
                                                    <button key={fmt} type="button"
                                                        onClick={() => { const c = splitCSV(formData.mentorshipFormat); set("mentorshipFormat", joinCSV(sel ? c.filter((s) => s !== fmt) : [...c, fmt])); }}
                                                        style={{ fontFamily: F, fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 8, border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
                                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.primary : T.borderMed }} />{fmt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    {/* Guidance Areas */}
                                    <div>
                                        <p style={secHead}><Target size={12} color={T.primary} /> Areas of Guidance</p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                                            {["Career Prep", "Interview Coaching", "Technical Skills", "Soft Skills", "Leadership", "Resume Review", "Startup Guidance"].map((g) => {
                                                const sel = guidAreas.includes(g);
                                                return (
                                                    <button key={g} type="button"
                                                        onClick={() => set("guidanceAreas", sel ? guidAreas.filter((x) => x !== g) : [...guidAreas, g])}
                                                        style={{ fontFamily: F, fontSize: 13, fontWeight: 500, padding: "7px 12px", borderRadius: 8, border: `1.5px solid ${sel ? T.success : T.borderMed}`, background: sel ? T.successBg : T.bg, color: sel ? T.success : T.textMid, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.success : T.borderMed }} />{g}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <TagRow placeholder="Custom guidance area…" valKey="guid" field="guidanceAreas" isArr {...tagRowShared} />
                                        {guidAreas.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{guidAreas.map((g, i) => <Pill key={i} label={g} col="teal" onRemove={() => rmArr("guidanceAreas", g)} />)}</div>}
                                    </div>
                                </div>
                            )}

                            {/* ── Mentorship Tab ── */}
                            {modalTab === "mentorship" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>Mentorship Settings</h3>

                                    <div>
                                        <p style={secHead}><Users size={12} color={T.primary} /> Mentorship Delivery</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            <div>
                                                <span style={lbl}>Active Mentee Limit *</span>
                                                <select value={ltmMenteeLimit} onChange={(e) => setLtmMenteeLimit(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select limit</option>
                                                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n.toString()}>Max {n} mentees</option>)}
                                                </select>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>When this limit is reached, trials will auto-turn off</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Sessions Frequency *</span>
                                                <select value={sessionsFrequency} onChange={(e) => setSessionsFrequency(e.target.value)} style={{ ...inp(), background: T.bg }}>
                                                    <option value="">Select...</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="bi-weekly">Bi-weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="as-needed">As needed</option>
                                                </select>
                                            </div>

                                            <div>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                                                    <span style={lbl}>Mentorship Pitch *</span>
                                                    <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: T.textLight }}>{mentorshipPitch.length}/1000</span>
                                                </div>
                                                <textarea
                                                    style={{ ...inp(), resize: "vertical", lineHeight: 1.6 }}
                                                    rows={4}
                                                    value={mentorshipPitch}
                                                    onChange={(e) => setMentorshipPitch(e.target.value.slice(0, 1000))}
                                                    placeholder="Your mentorship pitch for mentees..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    <div>
                                        <p style={secHead}><Users size={12} color={T.primary} /> Mentee Preferences</p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                            <div>
                                                <span style={lbl}>Primary Expertise *</span>
                                                <select
                                                    value={primaryCustom ? "__custom__" : (EXPERTISE_OPTIONS.some((o) => o.value === primaryExpertise) ? primaryExpertise : "")}
                                                    onChange={(e) => {
                                                        if (e.target.value === "__custom__") { setPrimaryCustom(true); setPrimaryExpertise(""); }
                                                        else { setPrimaryCustom(false); setPrimaryExpertise(e.target.value); }
                                                    }}
                                                    style={{ ...inp(), background: T.bg }}
                                                >
                                                    <option value="">Select...</option>
                                                    {EXPERTISE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                                    <option value="__custom__">Other (custom)…</option>
                                                </select>
                                                {primaryCustom && (
                                                    <input style={{ ...inp(), marginTop: 8 }} value={primaryExpertise} onChange={(e) => setPrimaryExpertise(e.target.value)} placeholder="e.g. Blockchain Developer…" autoFocus />
                                                )}
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "6px 0 0" }}>Your primary domain — single selection only</p>
                                            </div>

                                            <div>
                                                <span style={lbl}>Secondary Expertise</span>
                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "0 0 8px" }}>Select multiple domains you can mentor in</p>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                                                    {EXPERTISE_OPTIONS.map((o) => {
                                                        const sel = secondaryExpertise.includes(o.value);
                                                        return (
                                                            <button key={o.value} type="button"
                                                                onClick={() => setSecondaryExpertise(sel ? secondaryExpertise.filter((x) => x !== o.value) : [...secondaryExpertise, o.value])}
                                                                style={{ fontFamily: F, fontSize: 13, fontWeight: 500, padding: "7px 13px", borderRadius: 8, cursor: "pointer", border: `1.5px solid ${sel ? T.primary : T.borderMed}`, background: sel ? T.primaryBg : T.bg, color: sel ? T.primary : T.textMid, display: "flex", alignItems: "center", gap: 6 }}>
                                                                <div style={{ width: 7, height: 7, borderRadius: "50%", background: sel ? T.primary : T.borderMed, flexShrink: 0 }} />
                                                                {o.label}
                                                                {sel && <span onClick={(e) => { e.stopPropagation(); setSecondaryExpertise(secondaryExpertise.filter((x) => x !== o.value)); }} style={{ marginLeft: 2, opacity: 0.6, fontSize: 14, lineHeight: 1 }}>×</span>}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                <div style={{ display: "flex", gap: 8 }}>
                                                    <input
                                                        style={{ flex: 1, fontFamily: F, fontSize: 13, padding: "8px 11px", border: `1.5px solid ${T.borderMed}`, borderRadius: 7, color: T.textDark, background: T.bg, outline: "none", boxSizing: "border-box" }}
                                                        value={secondaryCustomInput}
                                                        onChange={(e) => setSecondaryCustomInput(e.target.value)}
                                                        onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); const v = secondaryCustomInput.trim(); if (v && !secondaryExpertise.includes(v)) setSecondaryExpertise([...secondaryExpertise, v]); setSecondaryCustomInput(""); } }}
                                                        placeholder="Add  domain…"
                                                    />
                                                    <button type="button" onClick={() => { const v = secondaryCustomInput.trim(); if (v && !secondaryExpertise.includes(v)) setSecondaryExpertise([...secondaryExpertise, v]); setSecondaryCustomInput(""); }} style={{ padding: "8px 14px", background: T.btn, color: "#fff", borderRadius: 7, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F, flexShrink: 0 }}>Add</button>
                                                </div>
                                                {secondaryExpertise.filter((v) => !EXPERTISE_OPTIONS.some((o) => o.value === v)).length > 0 && (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                                                        {secondaryExpertise.filter((v) => !EXPERTISE_OPTIONS.some((o) => o.value === v)).map((v, i) => <Pill key={i} label={v} onRemove={() => setSecondaryExpertise(secondaryExpertise.filter((x) => x !== v))} />)}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <span style={lbl}>Persona *</span>
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                                    {[
                                                        { label: "Freshers", desc: "Mentees in college or seeking their first job.", state: personaFreshers, setter: setPersonaFreshers },
                                                        { label: "Experienced", desc: "Mentees aiming for career growth or domain change.", state: personaExperienced, setter: setPersonaExperienced },
                                                    ].map(({ label, desc, state, setter }) => (
                                                        <button key={label} type="button" onClick={() => setter(!state)} style={{ padding: 14, border: `2px solid ${state ? T.primary : T.borderMed}`, borderRadius: 10, background: state ? T.primaryBg : T.bg, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, transition: "all .15s" }}>
                                                            <input type="checkbox" checked={state} onChange={() => { }} style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0, marginTop: 2 }} />
                                                            <div style={{ textAlign: "left", flex: 1 }}>
                                                                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: T.textDark, margin: 0 }}>{label}</p>
                                                                <p style={{ fontFamily: F, fontSize: 11, color: T.textLight, margin: "4px 0 0" }}>{desc}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Achievements Tab ── */}
                            {modalTab === "achievements" && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <h3 style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: T.textDark, margin: 0, paddingBottom: 10, borderBottom: `1px solid ${T.border}` }}>Achievements & Credentials</h3>

                                    <div>
                                        <p style={secHead}><Trophy size={12} color={T.primary} /> Key Accomplishments</p>
                                        <TagRow placeholder="e.g. Led team that scaled to 1M users" valKey="accomp" field="accomplishments" isArr {...tagRowShared} />
                                        {accomps.length > 0 && (
                                            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
                                                {accomps.map((a, i) => (
                                                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9 }}>
                                                        <Trophy size={13} color={T.warning} style={{ flexShrink: 0, marginTop: 1 }} />
                                                        <span style={{ fontFamily: F, fontSize: 13, color: T.textMid, flex: 1, wordBreak: "break-word" }}>{a}</span>
                                                        <button onClick={() => rmArr("accomplishments", a)} style={{ background: T.errorBg, border: "1px solid #fca5a5", color: T.error, borderRadius: 5, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center", flexShrink: 0 }}><Trash2 size={11} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    <div>
                                        <p style={secHead}><BadgeCheck size={12} color={T.primary} /> Certifications</p>
                                        <TagRow placeholder="e.g. AWS Certified Solutions Architect" valKey="cert" field="certifications" isArr {...tagRowShared} />
                                        {certs.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>{certs.map((c, i) => <Pill key={i} label={c} col="purple" onRemove={() => rmArr("certifications", c)} />)}</div>}
                                    </div>

                                    <div style={{ height: 1, background: T.border }} />

                                    <div>
                                        <p style={secHead}><FileText size={12} color={T.primary} /> Portfolio / Media Links</p>
                                        <div style={{ background: T.warningBg, border: "1px solid #fcd34d", borderRadius: 10, padding: "12px 14px", fontFamily: F, fontSize: 12, color: T.textMid, marginBottom: 14, lineHeight: 1.7 }}>
                                            Upload to Google Drive → Right-click → "Get link" → "Anyone with the link" → paste below.
                                        </div>
                                        {[
                                            { label: "Portfolio", field: "portfolioLink", placeholder: "https://drive.google.com/…" },
                                            { label: "Intro Video", field: "videoLink", placeholder: "https://youtube.com/…" },
                                        ].map(({ label, field, placeholder }) => (
                                            <div key={field} style={{ marginBottom: 12 }}>
                                                <span style={lbl}>{label}</span>
                                                <input style={inp()} value={formData[field] || ""} onChange={(e) => set(field, e.target.value)} placeholder={placeholder} />
                                                {formData[field] && (
                                                    <a href={formData[field]} target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, fontSize: 11.5, color: T.primary, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 5, textDecoration: "none" }}>
                                                        <Eye size={11} /> Preview →
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="em-footer">
                        <button type="button" className="em-cancel-btn" onClick={handleClose} disabled={isSaving} style={{ fontFamily: F, padding: "9px 18px", fontSize: 13, fontWeight: 600, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer" }}>Cancel</button>
                        <div className="em-footer-actions">
                            <button type="button" onClick={handleModalSave} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 13, fontWeight: 600, border: `1px solid ${T.border}`, borderRadius: 8, color: T.textMid, background: T.bg, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
                                {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : "Save"}
                            </button>
                            {modalTab !== NAV_ORDER[NAV_ORDER.length - 1] && !showExpForm && (
                                <button type="button" onClick={handleModalNext} disabled={isSaving} style={{ fontFamily: F, display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 8, color: "#fff", background: T.btn, cursor: "pointer", opacity: isSaving ? 0.6 : 1 }}>
                                    {isSaving ? <><Loader2 size={12} style={{ animation: "spin .9s linear infinite" }} /> Saving…</> : <>Save & Continue <ChevronRight size={13} /></>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditMentorProfile;
