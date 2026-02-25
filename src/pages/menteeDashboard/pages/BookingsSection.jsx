import React, { useState, useEffect } from "react";
import {
  Loader2, MapPin, Briefcase, Globe, Search, ChevronRight,
  Users, TrendingUp, Award, Star, Settings2, X, CheckCircle2,
  ArrowLeft, ArrowRight, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useGetMentorsListMutation } from "./Bookingsecapislice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../global/Loader";
// ─── helpers ──────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const parseAreas = (str = "") =>
  str.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100   text-pink-700",
  "bg-blue-100   text-blue-700",
  "bg-teal-100   text-teal-700",
];

const statusStyle = (status) =>
  status === "approved"
    ? "bg-green-100 text-green-700"
    : status === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-500";

const statusDot = (status) =>
  status === "approved"
    ? "bg-green-500"
    : status === "pending"
      ? "bg-yellow-500"
      : "bg-gray-400";

const menteeTypes = [
  "All Mentors", "Engineering Mentors", "Top Mentors", "Startup Mentors",
  "Product Mentors", "Marketing Mentors", "Leadership Mentors", "AI Mentors"
];

// ─── Edit Preferences Modal ───────────────────────────────────────────────────
function EditPreferencesModal({ isOpen, onClose, onUpdate, initialData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", dateOfBirth: "", address: "",
    status: "", education: "", menteeType: ""
  });

  // Pre-fill with existing data when modal opens
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


    localStorage.setItem('profileData', JSON.stringify(updated));

    // Update cookies
    const profileCookie = encodeURIComponent(JSON.stringify(updated));
    document.cookie = `profileData=${profileCookie}; path=/; max-age=31536000`;
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      try {
        const existing = JSON.parse(userDataCookie);
        const merged = { ...existing, ...updated };
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">

                <div>
                  <h2 className="text-white font-bold text-base">Update Preferences</h2>
                  <p className="text-indigo-200 text-xs mt-0.5">Refine your mentor recommendations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mt-5">
              {steps.map((step, i) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${currentStep > step.num
                      ? "bg-white text-indigo-600"
                      : currentStep === step.num
                        ? "bg-white text-indigo-600 ring-2 ring-white/40"
                        : "bg-white/20 text-white/60"
                      }`}>
                      {currentStep > step.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-xs font-medium ${currentStep >= step.num ? "text-white" : "text-white/50"}`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${currentStep > step.num ? "bg-white" : "bg-white/20"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      value={formData.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date of Birth *</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => set("dateOfBirth", e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => set("address", e.target.value)}
                      rows={2}
                      placeholder="Your address"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Current Status *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["fresher", "experienced"].map((s) => (
                        <button
                          key={s}
                          onClick={() => set("status", s)}
                          className={`p-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${formData.status === s
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                            }`}
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all bg-white"
                    >
                      <option value="">Select education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">What type of mentor do you want?</label>
                    <p className="text-xs text-gray-400 mb-3">This determines which mentors are recommended for you</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {menteeTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => set("menteeType", type)}
                        className={`p-2.5 rounded-xl border-2 text-left transition-all duration-200 ${formData.menteeType === type
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <span className={`text-xs font-semibold ${formData.menteeType === type ? "text-indigo-700" : "text-gray-700"}`}>
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
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={(currentStep === 1 && !ok1) || (currentStep === 2 && !ok2)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                disabled={!ok3}
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium shadow-md"
              >
                Update & Refresh
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MentorCard (mobile / tablet) ─────────────────────────────────────────────
function MentorCard({ mentor, index, onViewProfile, onBookSession }) {
  const areas = parseAreas(mentor.areasOfInterest);
  const initials = getInitials(mentor.fullName);
  const avatarCls = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const canBook = mentor.status === "approved" && mentor.isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md hover:border-indigo-200 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${avatarCls}`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{mentor.fullName}</p>
          <p className="text-xs text-indigo-600 font-medium truncate mt-0.5">{mentor.currentRole || "—"}</p>
          {mentor.companyName && <p className="text-xs text-gray-400 truncate">{mentor.companyName}</p>}
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${statusStyle(mentor.status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot(mentor.status)}`} />
          {mentor.status || "—"}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400">
        {mentor.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{mentor.location}</span>}
        {mentor.yearsOfExperience != null && <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{mentor.yearsOfExperience} yrs exp</span>}
        {mentor.languages?.length > 0 && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{mentor.languages.join(", ")}</span>}
        {mentor.hourlyRate != null && <span className="ml-auto text-sm font-bold text-gray-800">₹{mentor.hourlyRate}/hr</span>}
      </div>

      {areas.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {areas.slice(0, 4).map((a, i) => (
            <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{a}</span>
          ))}
          {areas.length > 4 && <span className="text-xs text-gray-400 self-center">+{areas.length - 4} more</span>}
        </div>
      )}

      {mentor.mentoringStyle && (
        <p className="text-xs text-gray-400">Style: <span className="text-gray-600 font-medium">{mentor.mentoringStyle}</span></p>
      )}

      <div className="flex gap-2 pt-1 border-t border-gray-100">
        <button onClick={() => onViewProfile(mentor)} className="flex-1 py-2 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          View Profile
        </button>
        {canBook ? (
          <button onClick={() => onBookSession(mentor)} className="flex-1 py-2 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1">
            Book Trial <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex-1 py-2 text-xs font-medium rounded-md bg-gray-100 text-gray-400 text-center cursor-not-allowed">Unavailable</div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingsSection() {
  const { mentorId } = useParams();
  const navigate = useNavigate();

  const [getMentors, { data, isLoading, isError }] = useGetMentorsListMutation();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchMentors = (type) => {
    getMentors({ menteeType: type || "All Mentors" });
  };

  // useEffect(() => {
  //   const cookieData = Cookies.get("userData");
  //   if (cookieData) {
  //     try {
  //       const parsed = JSON.parse(cookieData);
  //       setUserData(parsed);
  //       fetchMentors(parsed.menteeType);
  //     } catch {}
  //   }

  //   // Load existing profile data to pre-fill the form
  //   const profileCookieData = Cookies.get("profileData");
  //   if (profileCookieData) {
  //     try {
  //       const parsed = JSON.parse(decodeURIComponent(profileCookieData));
  //       setProfileData(parsed);
  //     } catch {}
  //   }
  // }, []);



  useEffect(() => {
    // Load profile data first
    const profileCookieData = Cookies.get("profileData");
    const profileLocalData = localStorage.getItem("profileData");
    const rawProfile = profileLocalData || (profileCookieData ? decodeURIComponent(profileCookieData) : null); let parsedProfile = null;
    if (profileCookieData) {
      try {
        parsedProfile = JSON.parse(decodeURIComponent(profileCookieData));
        setProfileData(parsedProfile);
      } catch { }
    }

    // Load user data
    const cookieData = Cookies.get("userData");
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setUserData(parsed);
      } catch { }
    }

    // ✅ Use menteeType from profileData first, fallback to userData
    const menteeType = parsedProfile?.menteeType || JSON.parse(cookieData || '{}')?.menteeType || "All Mentors";
    fetchMentors(menteeType);
  }, []);


  const handlePreferencesUpdate = (updated) => {
    setProfileData(updated);
    localStorage.setItem('profileData', JSON.stringify(updated)); // ✅ persist
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
    const matchSearch =
      !search ||
      m.fullName?.toLowerCase().includes(q) ||
      m.currentRole?.toLowerCase().includes(q) ||
      m.companyName?.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const approvedCount = mentorsList.filter((m) => m.status === "approved").length;
  const activeCount = mentorsList.filter((m) => m.isActive).length;

  const handleBookSession = (mentor) => {
    const isLoggedIn = !!localStorage.getItem("authToken");
    if (!isLoggedIn) navigate(`/login?mentorId=${mentor._id}`);
    else navigate(`/book-session?mentorId=${mentor._id}`);
  };

  const handleViewProfile = (mentor) => navigate(`/mentor-profile/${mentor._id}`);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-2 p-8">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-gray-800 font-semibold">Failed to load mentors</p>
          <p className="text-gray-400 text-sm">Please refresh and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1 h-5 rounded-full bg-indigo-600" />
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Mentor Discovery</p>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Recommended Mentors for You</h1>
            <p className="text-sm text-gray-500 mt-1">
              You still have free trial sessions available — Book now!
              {profileData?.menteeType && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100">
                  {profileData.menteeType}
                </span>
              )}
            </p>
          </div>

          {/* ── EDIT RECOMMENDED MENTORS BUTTON ── */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 hover:shadow-sm transition-all duration-200 group shrink-0"
          >
            <Settings2 className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            Edit Recommended Mentors
          </motion.button>
        </motion.div>

        {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { icon: Users, label: "Total Mentors", value: mentorsList.length, bg: "bg-indigo-50", icon_color: "text-indigo-600" },
            { icon: Award, label: "Approved", value: approvedCount, bg: "bg-green-50", icon_color: "text-green-600" },
            { icon: TrendingUp, label: "Currently Active", value: activeCount, bg: "bg-blue-50", icon_color: "text-blue-600" },
            // { icon: Star, label: "Filtered Results", value: filtered.length, bg: "bg-purple-50", icon_color: "text-purple-600" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.07 }}
              className="bg-white border border-gray-200 rounded-xl p-4 lg:p-5 flex items-center gap-4 hover:shadow-sm transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`w-5 h-5 ${s.icon_color}`} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider leading-none">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 leading-none">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── SEARCH + FILTERS ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role or company…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["all"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold capitalize transition-all border whitespace-nowrap ${filterStatus === f
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
              >
                {f === "all" ? "All Mentors" : f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── EMPTY STATE ──────────────────────────────────────────────────── */}
        <AnimatePresence>
          {filtered.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-indigo-300" />
              </div>
              <div className="text-center">
                <p className="text-gray-700 font-semibold">No mentors found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or update your preferences</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setSearch(""); setFilterStatus("all"); }}
                  className="text-xs text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                >
                  Clear filters
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                >
                  Update preferences
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filtered.length > 0 && (
          <>
            {/* Mobile / Tablet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {filtered.map((mentor, index) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  index={index}
                  onViewProfile={handleViewProfile}
                  onBookSession={handleBookSession}
                />
              ))}
            </div>

            {/* Desktop Table */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["Mentor", "Role & Company", "Experience", "Areas of Interest", "Style", "Rate", "Actions"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((mentor, index) => {
                      const areas = parseAreas(mentor.areasOfInterest);
                      const initials = getInitials(mentor.fullName);
                      const avatarCls = AVATAR_COLORS[index % AVATAR_COLORS.length];
                      const canBook = mentor.status === "approved" && mentor.isActive;

                      return (
                        <motion.tr
                          key={mentor._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-indigo-50/30 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${avatarCls}`}>
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-gray-900 text-sm truncate max-w-[140px] group-hover:text-indigo-700 transition-colors">
                                  {mentor.fullName}
                                </p>
                                {mentor.location && (
                                  <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                    <MapPin className="w-3 h-3 shrink-0" />{mentor.location}
                                  </p>
                                )}
                                {mentor.languages?.length > 0 && (
                                  <p className="flex items-center gap-1 text-xs text-gray-400">
                                    <Globe className="w-3 h-3 shrink-0" />{mentor.languages.join(", ")}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{mentor.currentRole || "—"}</p>
                            {mentor.companyName && <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[160px]">{mentor.companyName}</p>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">
                                {mentor.yearsOfExperience != null ? `${mentor.yearsOfExperience} yr${mentor.yearsOfExperience !== 1 ? "s" : ""}` : "—"}
                              </span>
                            </div>
                            {mentor.mentorCategory && <p className="text-xs text-gray-400 mt-0.5">{mentor.mentorCategory}</p>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                              {areas.length > 0 ? (
                                <>
                                  {areas.slice(0, 3).map((a, i) => (
                                    <span key={i} className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{a}</span>
                                  ))}
                                  {areas.length > 3 && <span className="text-xs text-gray-400 self-center">+{areas.length - 3} more</span>}
                                </>
                              ) : <span className="text-sm text-gray-400">—</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{mentor.mentoringStyle || "—"}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {mentor.hourlyRate != null ? (
                              <span className="text-sm font-semibold text-gray-800">₹{mentor.hourlyRate}<span className="text-gray-400 font-normal text-xs">/hr</span></span>
                            ) : <span className="text-gray-400">—</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleViewProfile(mentor)} className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors">
                                Profile
                              </button>
                              {canBook ? (
                                <button onClick={() => handleBookSession(mentor)} className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1">
                                  Book Trial <ChevronRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <span className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">Unavailable</span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Showing <span className="text-gray-700 font-semibold">{filtered.length}</span> of{" "}
                  <span className="text-gray-700 font-semibold">{mentorsList.length}</span> mentor{mentorsList.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-gray-400">Live data</span>
                </div>
              </div>
            </motion.div>

            <p className="lg:hidden text-xs text-gray-400 text-center">
              Showing {filtered.length} of {mentorsList.length} mentor{mentorsList.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </div>

      {/* ── EDIT PREFERENCES MODAL ── */}
      <EditPreferencesModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handlePreferencesUpdate}
        initialData={profileData}
      />
    </div>
  );
}




