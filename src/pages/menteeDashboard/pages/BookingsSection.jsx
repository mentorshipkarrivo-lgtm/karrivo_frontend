


import React, { useState, useEffect } from "react";
import {
  MapPin, Briefcase, Search,
  Users, TrendingUp, Award, Settings2, X, CheckCircle2,
  ArrowLeft, ArrowRight, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useGetMentorsListMutation } from "./Bookingsecapislice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../global/Loader";

// ── Google Fonts – Poppins ──────────────────────────────────────────────────
const poppinsLink = document.createElement("link");
poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
poppinsLink.rel = "stylesheet";
document.head.appendChild(poppinsLink);

const BLUE = "#3b82f6";
const BLUE_LIGHT = "#eff6ff";
const BLUE_BORDER = "#bfdbfe";
const FONT = "'Poppins', sans-serif";

const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseAreas = (str = "") =>
  str.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);

const menteeTypes = [
  "All Mentors", "Engineering Mentors", "Top Mentors", "Startup Mentors",
  "Product Mentors", "Marketing Mentors", "Leadership Mentors", "AI Mentors",
];

// ── Edit Preferences Modal ──────────────────────────────────────────────────
function EditPreferencesModal({ isOpen, onClose, onUpdate, initialData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", dateOfBirth: "", address: "", status: "", education: "", menteeType: "",
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        name: initialData.name || "",
        dateOfBirth: initialData.dateOfBirth || "",
        address: initialData.address || "",
        status: initialData.status || "",
        education: initialData.education || "",
        menteeType: initialData.menteeType || "",
      });
      setCurrentStep(1);
    }
  }, [isOpen, initialData]);

  const set = (f, v) => setFormData((p) => ({ ...p, [f]: v }));
  const ok1 = formData.name && formData.dateOfBirth && formData.address;
  const ok2 = formData.status && formData.education;
  const ok3 = formData.menteeType;

  const handleUpdate = () => {
    const updated = { ...formData, profileCompleted: true };
    localStorage.setItem("profileData", JSON.stringify(updated));
    document.cookie = `profileData=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=31536000`;
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      try {
        const merged = { ...JSON.parse(userDataCookie), ...updated };
        document.cookie = `userData=${encodeURIComponent(JSON.stringify(merged))}; path=/; max-age=86400`;
      } catch { }
    }
    onUpdate(updated);
    onClose();
  };

  const steps = [
    { num: 1, label: "Personal" },
    { num: 2, label: "Experience" },
    { num: 3, label: "Preference" },
  ];

  if (!isOpen) return null;

  const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none transition-all";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ fontFamily: FONT }}
      >
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <header className="px-6 py-5" style={{ background: BLUE }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-base">Update Preferences</h2>
                <p className="text-white/70 text-xs mt-0.5">Refine your mentor recommendations</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-5">
              {steps.map((step, i) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                      style={{
                        background: currentStep >= step.num ? "white" : "rgba(255,255,255,0.2)",
                        color: currentStep >= step.num ? BLUE : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {currentStep > step.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-xs font-medium ${currentStep >= step.num ? "text-white" : "text-white/50"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-0.5 rounded-full transition-all duration-500"
                      style={{ background: currentStep > step.num ? "white" : "rgba(255,255,255,0.2)" }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </header>

          {/* Body */}
          <div className="px-6 py-5">
            <AnimatePresence mode="wait">

              {/* Step 1 */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      value={formData.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Enter your full name"
                      className={inputCls}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)}
                      className={inputCls}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => set("address", e.target.value)}
                      rows={2}
                      placeholder="Your address"
                      className={`${inputCls} resize-none`}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Current Status *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["fresher", "experienced"].map((s) => (
                        <button
                          key={s}
                          onClick={() => set("status", s)}
                          className="p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                          style={{
                            borderColor: formData.status === s ? BLUE : "#e5e7eb",
                            background: formData.status === s ? BLUE_LIGHT : "white",
                            color: formData.status === s ? BLUE : "#4b5563",
                          }}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Highest Education *</label>
                    <select
                      value={formData.education}
                      onChange={(e) => set("education", e.target.value)}
                      className={`${inputCls} bg-white`}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    >
                      <option value="">Select education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelors Degree</option>
                      <option value="masters">Masters Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">What type of mentor do you want?</p>
                    <p className="text-xs text-gray-400 mb-3">This determines which mentors are recommended for you</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {menteeTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => set("menteeType", type)}
                        className="p-2.5 rounded-xl border-2 text-left transition-all duration-200"
                        style={{
                          borderColor: formData.menteeType === type ? BLUE : "#e5e7eb",
                          background: formData.menteeType === type ? BLUE_LIGHT : "white",
                        }}
                      >
                        <span className="text-xs font-semibold" style={{ color: formData.menteeType === type ? BLUE : "#374151" }}>
                          {type}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer */}
          <footer className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={(currentStep === 1 && !ok1) || (currentStep === 2 && !ok2)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                style={{ background: BLUE }}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                disabled={!ok3}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                style={{ background: BLUE }}
              >
                Update &amp; Refresh
              </button>
            )}
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Mentor Card ─────────────────────────────────────────────────────────────
function MentorCard({ mentor, index, onViewProfile, onBookSession }) {
  const areas = parseAreas(mentor.areasOfInterest || mentor.currentSkills || "");
  const initials = getInitials(mentor.fullName);
  const canBook = mentor.status === "approved" && mentor.isActive;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden flex"
      style={{
        fontFamily: FONT,
        width: "380px",
        maxWidth: "100%",
        minHeight: "180px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 4px rgba(59,130,246,0.06)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = BLUE;
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(59,130,246,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(59,130,246,0.06)";
      }}
    >
      {/* Left — content */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-800">
              {mentor.rating ? Number(mentor.rating).toFixed(2) : "5.00"}
            </span>
            {mentor.reviewCount != null && (
              <span className="text-xs text-gray-400">({mentor.reviewCount} reviews)</span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-1">
            {mentor.fullName || "Unknown Mentor"}
          </h3>

          {/* Role */}
          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
            {mentor.currentRole || "Mentor"}
            {mentor.yearsOfExperience ? ` · ${mentor.yearsOfExperience} yrs` : ""}
          </p>

          {/* Skill tags */}
          {areas.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {areas.slice(0, 3).map((a, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}
                >
                  {a}
                </span>
              ))}
              {areas.length > 3 && (
                <span className="text-[11px] text-gray-400 self-center">+{areas.length - 3}</span>
              )}
            </div>
          )}

          {/* Location */}
          {mentor.location && (
            <p className="flex items-center gap-1 text-xs text-gray-400 mt-2">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{mentor.location}</span>
            </p>
          )}
        </div>

        {/* Price + View Profile */}
        <div className="flex items-center justify-between mt-4 gap-2">
          {mentor.hourlyRate != null ? (
            <p className="text-sm font-semibold text-gray-900">
              &#8377;{mentor.hourlyRate}
              <span className="text-xs font-normal text-gray-400"> / session</span>
            </p>
          ) : (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
              style={{ background: BLUE_LIGHT, color: BLUE }}
            >
              {mentor.status || "—"}
            </span>
          )}

          <button
            onClick={() => onViewProfile(mentor)}
            className="px-4 py-1.5 rounded-lg text-white text-xs font-semibold transition-all whitespace-nowrap"
            style={{ background: BLUE, fontFamily: FONT }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = BLUE)}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Right — photo */}
      <div className="w-36 shrink-0 relative">
        {mentor.profileImage ? (
          <img
            src={mentor.profileImage}
            alt={mentor.fullName}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: BLUE_LIGHT }}>
            <span className="text-3xl font-bold" style={{ color: BLUE, fontFamily: FONT }}>{initials}</span>
          </div>
        )}

     
      </div>
    </motion.article>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function BookingsSection() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [getMentors, { data, isLoading, isError }] = useGetMentorsListMutation();
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const fetchMentors = (type) => getMentors({ menteeType: type || "All Mentors" });

  useEffect(() => {
    const profileCookieData = Cookies.get("profileData");
    let parsedProfile = null;
    if (profileCookieData) {
      try {
        parsedProfile = JSON.parse(decodeURIComponent(profileCookieData));
        setProfileData(parsedProfile);
      } catch { }
    }
    const cookieData = Cookies.get("userData");
    const menteeType =
      parsedProfile?.menteeType ||
      (cookieData ? JSON.parse(cookieData)?.menteeType : null) ||
      "All Mentors";
    fetchMentors(menteeType);
  }, []);

  const handlePreferencesUpdate = (updated) => {
    setProfileData(updated);
    localStorage.setItem("profileData", JSON.stringify(updated));
    fetchMentors(updated.menteeType);
  };

  const mentorsList = Array.isArray(data)
    ? data
    : Array.isArray(data?.mentors)
    ? data.mentors
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const filtered = mentorsList.filter((m) => {
    const q = search.toLowerCase();
    return (
      !search ||
      m.fullName?.toLowerCase().includes(q) ||
      m.currentRole?.toLowerCase().includes(q) ||
      m.companyName?.toLowerCase().includes(q)
    );
  });

  const approvedCount = mentorsList.filter((m) => m.status === "approved").length;
  const activeCount = mentorsList.filter((m) => m.isActive).length;

  const handleBookSession = (mentor) => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn) navigate(`/login?mentorId=${mentor._id}`);
    else navigate(`/book-session?mentorId=${mentor._id}`);
  };

  const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor._id}`);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center p-8 space-y-2" style={{ fontFamily: FONT }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto" style={{ background: BLUE_LIGHT }}>
            <TrendingUp className="w-6 h-6" style={{ color: BLUE }} />
          </div>
          <p className="text-gray-800 font-semibold">Failed to load mentors</p>
          <p className="text-gray-400 text-sm">Please refresh and try again.</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-white p-4 md:p-6 lg:p-8" style={{ fontFamily: FONT }}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-5 rounded-full" style={{ background: BLUE }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: BLUE }}>
                Mentor Discovery
              </p>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Recommended Mentors for You
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              You still have free trial sessions available &mdash; Book now!
              {profileData?.menteeType && (
                <span
                  className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: BLUE_LIGHT, color: BLUE, border: `1px solid ${BLUE_BORDER}` }}
                >
                  {profileData.menteeType}
                </span>
              )}
            </p>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-sm font-semibold text-gray-700 transition-all duration-200 shrink-0"
            style={{ border: "1px solid #e5e7eb", fontFamily: FONT }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = BLUE;
              e.currentTarget.style.color = BLUE;
              e.currentTarget.style.background = BLUE_LIGHT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.background = "white";
            }}
          >
            <Settings2 className="w-4 h-4" />
            Edit Recommended Mentors
          </button>
        </motion.div>

        {/* Stat Cards */}
        {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { icon: Users, label: "Total Mentors", value: mentorsList.length },
            { icon: Award, label: "Approved", value: approvedCount },
            { icon: TrendingUp, label: "Currently Active", value: activeCount },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.07 }}
              className="bg-white rounded-xl p-4 lg:p-5 flex items-center gap-4"
              style={{ border: "1px solid #e5e7eb" }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: BLUE_LIGHT }}>
                <s.icon className="w-5 h-5" style={{ color: BLUE }} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider leading-none text-gray-400">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 leading-none">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div> */}

   

        <AnimatePresence>
          {filtered.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: BLUE_LIGHT }}>
                <Briefcase className="w-7 h-7" style={{ color: BLUE }} />
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">No mentors found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or update your preferences</p>
              </div>
              <div className="flex gap-3 text-sm">
                <button onClick={() => setSearch("")} className="underline underline-offset-2" style={{ color: BLUE }}>
                  Clear filters
                </button>
                <span className="text-gray-300">|</span>
                <button onClick={() => setIsEditModalOpen(true)} className="underline underline-offset-2" style={{ color: BLUE }}>
                  Update preferences
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mentor Cards */}
        {filtered.length > 0 && (
          <section>
            <div className="flex flex-wrap gap-4">
              {filtered.map((mentor, index) => (
                <MentorCard
                  key={mentor._id || index}
                  mentor={mentor}
                  index={index}
                  onViewProfile={handleViewProfile}
                  onBookSession={handleBookSession}
                />
              ))}
            </div>
              {/* <p className="text-xs text-gray-400 text-center mt-4">
                Showing {filtered.length} of {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""}
              </p> */}
          </section>
        )}
      </div>

      <EditPreferencesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handlePreferencesUpdate}
        initialData={profileData}
      />
    </main>
  );
}



