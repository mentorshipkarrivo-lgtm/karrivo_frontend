

import React, { useState, useRef, useEffect } from 'react';
import {
    Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle,
    Camera, Trash2, Circle, Edit, Loader2, AlertCircle, ChevronRight,
    AlertTriangle, FileText, MapPin, Briefcase, GraduationCap, User
} from 'lucide-react';
import {
    useManageUserProfileQuery,
    useSaveUserProfileMutation,
    useUploadProfilePhotoMutation,
    useDeleteProfilePhotoMutation
} from "./Profilesecapislice";
import { CiEdit } from "react-icons/ci";
import Cookies from "js-cookie";
import Loader from '../../../../global/Loader';

// ── DOMAIN OPTIONS (from image) ───────────────────────────────────────────────
const DOMAIN_OPTIONS = [
    "Software Development",
    "Data Science & AI",
    "Cybersecurity",
    "Cloud Computing",
    "Networking & Infrastructure",
    "Database Management",
    "UI/UX & Product Design",
    "Enterprise Applications",
    "Microservices & DevOps",
    "Blockchain & FinTech",
    "Testing & Quality Assurance",
    "IT Service Management",
    "Business Intelligence",
    "IoT (Internet of Things)",
];

const TARGET_COMPANY_OPTIONS = [
    "Service-Based Companies",
    "Consulting Firms",
    "Product-Based Companies",
    "Startups & Scaleups",
    "Core Engineering & R&D",
    "Financial & Banking IT",
    "FAANG & MAANG",
];

// ── MAPPERS ──────────────────────────────────────────────────────────────────
const mapEducation = (val = '') => {
    const map = {
        bachelors: "Bachelor's Degree", bachelor: "Bachelor's Degree",
        masters: "Master's Degree", master: "Master's Degree",
        phd: "PhD", diploma: "Diploma",
        highschool: "High School", 'high school': "High School", other: "Other",
    };
    return map[val.toLowerCase()] || val;
};

const mapStatus = (val = '') => {
    const map = {
        fresher: 'Fresher', student: 'Student',
        employed: 'Working Professional', unemployed: 'Job Seeker',
    };
    return map[val.toLowerCase()] || val;
};

// ── TAG PILL ─────────────────────────────────────────────────────────────────
const TagPill = ({ label, onRemove, color = 'blue' }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        orange: 'bg-orange-50 text-orange-700 border-orange-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200',
        green: 'bg-green-50 text-green-700 border-green-200',
    };
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
            {label}
            {onRemove && (
                <button onClick={onRemove} className="ml-0.5 hover:opacity-70 transition-opacity leading-none text-base">×</button>
            )}
        </span>
    );
};

// ── TAG INPUT ROW (free text) ─────────────────────────────────────────────────
const TagInputRow = ({ placeholder, value, onChange, onAdd, color }) => (
    <div className="flex gap-2 mt-2">
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
            placeholder={placeholder}
            className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
        />
        <button
            type="button"
            onClick={onAdd}
            className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex-shrink-0"
        >
            Add
        </button>
    </div>
);

// ── DROPDOWN TAG SELECTOR ─────────────────────────────────────────────────────
const DropdownTagSelector = ({ options, selected, onAdd, placeholder, allowOther = false }) => {
    const [val, setVal] = useState('');
    const [customVal, setCustomVal] = useState('');
    const available = options.filter(o => !selected.includes(o));
    const isOther = val === '__other__';

    const handleAdd = () => {
        const finalVal = isOther ? customVal.trim() : val;
        if (finalVal && !selected.includes(finalVal)) {
            onAdd(finalVal);
            setVal('');
            setCustomVal('');
        }
    };

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-2">
                <select
                    value={val}
                    onChange={e => { setVal(e.target.value); setCustomVal(''); }}
                    className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-white"
                >
                    <option value="">{placeholder || 'Select an option'}</option>
                    {available.map(o => <option key={o} value={o}>{o}</option>)}
                    {allowOther && <option value="__other__">Other (specify below)</option>}
                </select>
                {!isOther && (
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!val}
                        className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
                    >
                        Add
                    </button>
                )}
            </div>
            {/* Custom text input when Other is selected */}
            {isOther && (
                <div className="flex gap-2">
                    <input
                        value={customVal}
                        onChange={e => setCustomVal(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                        placeholder="Type your custom option..."
                        className="flex-1 min-w-0 px-3 py-2 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-orange-50/40"
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!customVal.trim()}
                        className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

// ── FORM FIELD ────────────────────────────────────────────────────────────────
const FormField = ({ label, required, children, hint, error }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children}
        {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
        {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
);

// ── EDIT MODAL ────────────────────────────────────────────────────────────────
const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving }) => {
    const [currentSection, setCurrentSection] = useState(section);
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', city: '', country: '', linkedinUrl: '',
        domain: '', role: '', yearsOfExperience: '', currentCompany: '',
        previousCompanies: [], skills: [], about: '', availability: '',
        highestEducation: '', schoolCollegeName: '', mainGoals: '',
        targetDomains: [], targetCompanies: [], prepTimeline: '', mentorHelp: '', resumeDriveLink: '',
    });
    const [inputValues, setInputValues] = useState({ skill: '', previousCompany: '', customDomain: '', customTargetDomain: '' });
    const [errors, setErrors] = useState({});
    const [driveLinkError, setDriveLinkError] = useState('');

    useEffect(() => { setCurrentSection(section); }, [section]);

    useEffect(() => {
        if (isOpen && profileData) {
            setFormData({
                fullName: profileData.fullName || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
                city: profileData.city || '',
                country: profileData.country || '',
                linkedinUrl: profileData.linkedinUrl || '',
                domain: profileData.domain || '',
                role: profileData.role || '',
                yearsOfExperience: profileData.yearsOfExperience != null ? profileData.yearsOfExperience : '',
                currentCompany: profileData.currentCompany || '',
                previousCompanies: Array.isArray(profileData.previousCompanies) ? profileData.previousCompanies : [],
                skills: Array.isArray(profileData.skills) ? profileData.skills : [],
                about: profileData.about || '',
                availability: profileData.availability || '',
                highestEducation: profileData.highestEducation || '',
                schoolCollegeName: profileData.schoolCollegeName || '',
                mainGoals: profileData.goals || '',
                targetDomains: Array.isArray(profileData.targetDomains) ? profileData.targetDomains : [],
                targetCompanies: Array.isArray(profileData.targetCompanies) ? profileData.targetCompanies : [],
                prepTimeline: profileData.prepTimeline || '',
                mentorHelp: profileData.expectations || '',
                resumeDriveLink: profileData.resumeDriveLink || '',
            });
            setErrors({});
            setDriveLinkError('');
        }
    }, [isOpen, profileData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        if (name === 'resumeDriveLink') setDriveLinkError('');
    };

    const validateDriveLink = (url) =>
        !url || [/drive\.google\.com/, /docs\.google\.com/].some(p => p.test(url));

    // ── Validators ────────────────────────────────────────────────────────────
    const validateAbout = () => {
        const errs = {};
        if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
        if (!formData.email.trim()) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email address.';
        if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
        else if (!/^[+]?[\d\s\-().]{7,20}$/.test(formData.phone)) errs.phone = 'Enter a valid phone number.';
        if (formData.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\//.test(formData.linkedinUrl))
            errs.linkedinUrl = 'Enter a valid LinkedIn URL.';
        return errs;
    };

    const validateExperience = () => {
        const errs = {};
        if (!formData.domain || !formData.domain.trim()) errs.domain = 'Please select or enter a domain.';
        if (!formData.role.trim()) errs.role = 'Current role is required.';
        if (formData.yearsOfExperience === '' || formData.yearsOfExperience === null || formData.yearsOfExperience === undefined)
            errs.yearsOfExperience = 'Years of experience is required.';
        else if (Number(formData.yearsOfExperience) < 0) errs.yearsOfExperience = 'Cannot be negative.';
        if (!formData.highestEducation) errs.highestEducation = 'Please select education level.';
        return errs;
    };

    const validateResume = () => {
        const errs = {};
        if (formData.resumeDriveLink && !validateDriveLink(formData.resumeDriveLink)) {
            errs.resumeDriveLink = 'Please enter a valid Google Drive link.';
            setDriveLinkError('Please enter a valid Google Drive link.');
        }
        return errs;
    };

    const validateGoals = () => {
        const errs = {};
        if (!formData.mainGoals) errs.mainGoals = 'Please select your main goal.';
        if (formData.targetDomains.length === 0) errs.targetDomains = 'Add at least one target domain.';
        if (formData.targetCompanies.length === 0) errs.targetCompanies = 'Add at least one target company.';
        if (!formData.mentorHelp.trim()) errs.mentorHelp = 'Please describe what mentor support you need.';
        return errs;
    };

    const addItem = (type, value) => {
        const v = (value !== undefined ? value : inputValues[type])?.trim();
        if (!v) return;
        const keyMap = { skill: 'skills', previousCompany: 'previousCompanies' };
        setFormData(prev => ({ ...prev, [keyMap[type]]: [...prev[keyMap[type]], v] }));
        setInputValues(prev => ({ ...prev, [type]: '' }));
    };

    const addTagItem = (key, value) => {
        if (!value) return;
        setFormData(prev => ({ ...prev, [key]: [...prev[key], value] }));
        if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
    };

    const removeItem = (key, index) => {
        setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
    };

    const prepareDataForSection = () => {
        if (currentSection === 'about') {
            return { fullName: formData.fullName, email: formData.email, phone: formData.phone, city: formData.city, country: formData.country, linkedinUrl: formData.linkedinUrl };
        } else if (currentSection === 'experience') {
            return { domain: formData.domain, role: formData.role, yearsOfExperience: formData.yearsOfExperience, currentCompany: formData.currentCompany, previousCompanies: formData.previousCompanies, skills: formData.skills, about: formData.about, availability: formData.availability, highestEducation: formData.highestEducation, schoolCollegeName: formData.schoolCollegeName };
        } else if (currentSection === 'resume') {
            return { resumeDriveLink: formData.resumeDriveLink };
        } else if (currentSection === 'goals') {
            return { goals: formData.mainGoals, targetDomains: formData.targetDomains, targetCompanies: formData.targetCompanies, prepTimeline: formData.prepTimeline, expectations: formData.mentorHelp };
        }
        return {};
    };

    const runValidation = () => {
        let errs = {};
        if (currentSection === 'about') errs = validateAbout();
        else if (currentSection === 'experience') errs = validateExperience();
        else if (currentSection === 'resume') errs = validateResume();
        else if (currentSection === 'goals') errs = validateGoals();
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSave = async (shouldClose = true) => {
        if (!runValidation()) return;
        try { await onSave(prepareDataForSection(), shouldClose); } catch (e) { console.error(e); }
    };

    const handleSaveAndContinue = async () => {
        if (!runValidation()) return;
        const order = ['about', 'experience', 'resume', 'goals'];
        const idx = order.indexOf(currentSection);
        try {
            await onSave(prepareDataForSection(), false);
            if (idx < order.length - 1) {
                setCurrentSection(order[idx + 1]);
                setErrors({});
            }
        } catch (e) { console.error(e); }
    };

    const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition";
    const inputErrClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`;
    const selectClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'}`;

    const navItems = [
        { id: 'about', label: 'About', icon: <User size={15} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
        { id: 'resume', label: 'Resume', icon: <FileText size={15} /> },
        { id: 'goals', label: 'Goals', icon: <Target size={15} /> },
    ];

    const renderAboutSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required error={errors.fullName}>
                    <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                        placeholder="Enter your full name" className={inputErrClass('fullName')} />
                </FormField>
                <FormField label="Email" required error={errors.email}>
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                        placeholder="your.email@example.com" className={inputErrClass('email')} />
                </FormField>
                <FormField label="Phone" required error={errors.phone}>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        placeholder="+91 1234567890" className={inputErrClass('phone')} />
                </FormField>
                <FormField label="LinkedIn URL" error={errors.linkedinUrl}>
                    <input name="linkedinUrl" type="url" value={formData.linkedinUrl} onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile" className={inputErrClass('linkedinUrl')} />
                </FormField>
                <FormField label="City">
                    <input name="city" type="text" value={formData.city} onChange={handleChange}
                        placeholder="Enter city" className={inputClass} />
                </FormField>
                <FormField label="Country">
                    <input name="country" type="text" value={formData.country} onChange={handleChange}
                        placeholder="Enter country" className={inputClass} />
                </FormField>
            </div>
        </div>
    );

    const renderExperienceSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Professional Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Domain - dropdown with Other + custom */}
                <FormField label="Domain" required error={errors.domain}>
                    <select
                        value={DOMAIN_OPTIONS.includes(formData.domain) || formData.domain === '' ? formData.domain : '__other__'}
                        onChange={e => {
                            const v = e.target.value;
                            if (v === '__other__') {
                                setFormData(prev => ({ ...prev, domain: inputValues.customDomain || '' }));
                            } else {
                                setFormData(prev => ({ ...prev, domain: v }));
                                setInputValues(prev => ({ ...prev, customDomain: '' }));
                            }
                            if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
                        }}
                        className={selectClass('domain')}
                    >
                        <option value="">Select a domain</option>
                        {DOMAIN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        <option value="__other__">Other (specify below)</option>
                    </select>
                    {/* Custom input when Other is picked */}
                    {!DOMAIN_OPTIONS.includes(formData.domain) && (
                        <input
                            value={formData.domain}
                            onChange={e => {
                                setFormData(prev => ({ ...prev, domain: e.target.value }));
                                if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
                            }}
                            placeholder="Describe your domain..."
                            className="mt-2 w-full px-3 py-2 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none bg-orange-50/40"
                        />
                    )}
                </FormField>

                <FormField label="Current Role" required error={errors.role}>
                    <input name="role" value={formData.role} onChange={handleChange}
                        placeholder="e.g., Frontend Developer" className={inputErrClass('role')} />
                </FormField>

                <FormField label="Years of Experience" required hint="Enter 0 if you're a student or fresher" error={errors.yearsOfExperience}>
                    <input name="yearsOfExperience" type="number" min="0" value={formData.yearsOfExperience}
                        onChange={handleChange} placeholder="e.g., 3" className={inputErrClass('yearsOfExperience')} />
                </FormField>

                <FormField label="Current Company">
                    <input name="currentCompany" value={formData.currentCompany} onChange={handleChange}
                        placeholder="e.g., Infosys" className={inputClass} />
                </FormField>

                <FormField label="Highest Education" required error={errors.highestEducation}>
                    <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className={selectClass('highestEducation')}>
                        <option value="">Select education level</option>
                        {["High School", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(o => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                </FormField>

                <FormField label="School / College Name">
                    <input name="schoolCollegeName" value={formData.schoolCollegeName} onChange={handleChange}
                        placeholder="e.g., IIT Bombay" className={inputClass} />
                </FormField>
            </div>

            <FormField label="Skills">
                <TagInputRow
                    placeholder="Add a skill (e.g., React, Python)"
                    value={inputValues.skill}
                    onChange={v => setInputValues(p => ({ ...p, skill: v }))}
                    onAdd={() => addItem('skill')}
                />
                {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => removeItem('skills', i)} color="blue" />)}
                    </div>
                )}
            </FormField>

            <FormField label="Previous Companies">
                <TagInputRow
                    placeholder="Add a previous company"
                    value={inputValues.previousCompany}
                    onChange={v => setInputValues(p => ({ ...p, previousCompany: v }))}
                    onAdd={() => addItem('previousCompany')}
                />
                {formData.previousCompanies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.previousCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('previousCompanies', i)} color="orange" />)}
                    </div>
                )}
            </FormField>

            <FormField label="About You">
                <textarea name="about" value={formData.about} onChange={handleChange} rows={3}
                    placeholder="Brief description about yourself..." className={`${inputClass} resize-none`} />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Availability">
                    <input name="availability" value={formData.availability} onChange={handleChange}
                        placeholder="e.g., Weekends, Evenings" className={inputClass} />
                </FormField>
            </div>
        </div>
    );

    const renderResumeSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Resume & Documents</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800 space-y-1">
                <p className="font-semibold mb-2">How to get your Google Drive resume link:</p>
                {[
                    "Upload your resume (PDF/DOC) to Google Drive",
                    'Right-click the file → "Get link"',
                    'Set access to "Anyone with the link"',
                    "Copy the link and paste it below",
                ].map((step, i) => (
                    <p key={i} className="flex gap-2"><span className="font-bold text-orange-500">{i + 1}.</span>{step}</p>
                ))}
            </div>
            <FormField label="Google Drive Resume Link" error={errors.resumeDriveLink}>
                <input
                    name="resumeDriveLink" type="url" value={formData.resumeDriveLink}
                    onChange={handleChange} placeholder="https://drive.google.com/file/d/..."
                    className={inputErrClass('resumeDriveLink')}
                />
            </FormField>
            <p className="text-xs text-gray-400">Your resume link will be shared with mentors when you apply for mentorship programs.</p>
            {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
                <a href={formData.resumeDriveLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium">
                    <FileText size={16} /> Preview Resume →
                </a>
            )}
        </div>
    );

    const renderGoalsSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Career Goals & Expectations</h3>

            <FormField label="Main Goals" required error={errors.mainGoals}>
                <select name="mainGoals" value={formData.mainGoals} onChange={handleChange} className={selectClass('mainGoals')}>
                    <option value="">Select your main goal</option>
                    {[
                        "Employed, looking to switch to another company",
                        "Unemployed, looking for a job",
                        "Student, preparing for placements",
                        "Career transition", "Skill development", "Interview preparation",
                    ].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </FormField>

            {/* Target Domains — dropdown from DOMAIN_OPTIONS with Other */}
            {/* <FormField label="Target Domains" required error={errors.targetDomains}>
                <DropdownTagSelector
                    options={DOMAIN_OPTIONS}
                    selected={formData.targetDomains}
                    onAdd={(v) => addTagItem('targetDomains', v)}
                    placeholder="Select a target domain"
                    allowOther={true}
                />
                {formData.targetDomains.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.targetDomains.map((d, i) => <TagPill key={i} label={d} onRemove={() => removeItem('targetDomains', i)} color="purple" />)}
                    </div>
                )}
            </FormField> */}

            {/* Target Companies — dropdown */}
            <FormField label="Target Companies" required error={errors.targetCompanies}>
                <DropdownTagSelector
                    options={TARGET_COMPANY_OPTIONS}
                    selected={formData.targetCompanies}
                    onAdd={(v) => addTagItem('targetCompanies', v)}
                    placeholder="Select a company type"
                    allowOther={true}
                />
                {formData.targetCompanies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.targetCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('targetCompanies', i)} color="green" />)}
                    </div>
                )}
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Preparation Timeline">
                    <select name="prepTimeline" value={formData.prepTimeline} onChange={handleChange} className={selectClass('prepTimeline')}>
                        <option value="">Select timeline</option>
                        {["1 month", "3 months", ">=6 months", "None"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </FormField>
            </div>

            <FormField label="How do you want your Mentor to help?" required hint="Be specific about what kind of support you're looking for." error={errors.mentorHelp}>
                <textarea
                    name="mentorHelp" value={formData.mentorHelp} onChange={handleChange}
                    rows={4} placeholder="Describe the support you're looking for from a mentor..."
                    className={`${errors.mentorHelp ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-orange-400'} w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition resize-none`}
                />
            </FormField>
        </div>
    );

    const renderContent = () => {
        switch (currentSection) {
            case 'about': return renderAboutSection();
            case 'experience': return renderExperienceSection();
            case 'resume': return renderResumeSection();
            case 'goals': return renderGoalsSection();
            default: return renderAboutSection();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <div className="bg-white w-full sm:rounded-xl sm:max-w-3xl max-h-screen sm:max-h-[92vh] flex flex-col shadow-2xl sm:my-4">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <CiEdit className="text-orange-500 text-xl" /> Edit Profile
                    </h2>
                    <button onClick={onClose} disabled={isSaving} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0 flex-col sm:flex-row">
                    {/* Sidebar nav */}
                    <div className="sm:w-48 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50/60 sm:rounded-bl-xl">
                        <nav className="flex sm:flex-col gap-1 p-3 overflow-x-auto sm:overflow-x-visible">
                            {navItems.map(({ id, label, icon }) => (
                                <button
                                    key={id} type="button"
                                    onClick={() => { setCurrentSection(id); setErrors({}); }}
                                    className={`flex items-center gap-2 flex-shrink-0 sm:flex-shrink px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${currentSection === id
                                            ? 'bg-orange-500 text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
                                >
                                    {icon}
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-5">
                        {renderContent()}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/60 flex-shrink-0 sm:rounded-b-xl">
                    <button
                        type="button" onClick={onClose} disabled={isSaving}
                        className="px-5 py-2.5 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 text-center"
                    >
                        Cancel
                    </button>
                    <div className="flex gap-3">
                        <button
                            type="button" onClick={() => handleSave(true)} disabled={isSaving}
                            className="flex-1 sm:flex-none px-5 py-2.5 text-sm border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSaving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : 'Save'}
                        </button>
                        {currentSection !== 'goals' && (
                            <button
                                type="button" onClick={handleSaveAndContinue} disabled={isSaving}
                                className="flex-1 sm:flex-none px-5 py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSaving
                                    ? <><Loader2 size={14} className="animate-spin" />Saving...</>
                                    : <>Save & Continue <ChevronRight size={14} /></>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ── PENDING DETAILS CARD ───────────────────────────────────────────────────────
const PendingDetailsCard = ({ profile, onEditProfile, onEditGoals }) => {
    const pendingItems = [];
    if (!profile.phone) pendingItems.push({ label: 'Phone number', action: onEditProfile });
    if (!profile.city || !profile.country) pendingItems.push({ label: 'Location (city & country)', action: onEditProfile });
    if (!profile.linkedinUrl) pendingItems.push({ label: 'LinkedIn URL', action: onEditProfile });
    if (!profile.domain) pendingItems.push({ label: 'Professional domain', action: onEditProfile });
    if (profile.yearsOfExperience == null) pendingItems.push({ label: 'Years of experience', action: onEditProfile });
    if (!profile.highestEducation) pendingItems.push({ label: 'Education level', action: onEditProfile });
    if (!profile.schoolCollegeName) pendingItems.push({ label: 'Institution name', action: onEditProfile });
    if (!profile.resumeDriveLink) pendingItems.push({ label: 'Resume (Google Drive link)', action: onEditProfile });
    if (!profile.goals) pendingItems.push({ label: 'Main career goal', action: onEditGoals });
    if (!profile.expectations) pendingItems.push({ label: 'Mentor expectations', action: onEditGoals });

    if (pendingItems.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
            <div className="bg-orange-50 px-5 py-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500 flex-shrink-0" size={18} />
                <h3 className="text-sm font-bold text-gray-800 flex-1">Pending Details</h3>
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingItems.length}</span>
            </div>
            <div className="px-5 py-3">
                <p className="text-xs text-gray-500 mb-3">Complete these to improve your visibility with mentors.</p>
                <ul className="divide-y divide-gray-50">
                    {pendingItems.map((item, index) => (
                        <li key={index}>
                            <button onClick={item.action} className="w-full flex items-center gap-3 py-2.5 text-left group">
                                <span className="w-2 h-2 rounded-full bg-orange-300 flex-shrink-0" />
                                <span className="text-sm text-gray-600 flex-1 group-hover:text-orange-600 transition-colors">{item.label}</span>
                                <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// ── INFO ROW ──────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, children }) => (
    <div className="flex items-center gap-2 text-gray-600 text-sm min-w-0">
        <span className="flex-shrink-0 text-gray-400">{icon}</span>
        <span className="truncate">{children}</span>
    </div>
);

// ── SECTION CARD ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-50">
            <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>}
            </div>
            <button
                onClick={onEdit} disabled={isSaving}
                className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Edit size={14} />}
                {isSaving ? 'Saving...' : editLabel}
            </button>
        </div>
        <div className="px-6 py-5">
            {children || (emptyState && (
                <div className="text-center py-8">
                    <p className="text-gray-400 text-sm mb-3">{emptyState.message}</p>
                    <button onClick={onEdit} className="text-orange-500 hover:text-orange-600 font-medium text-sm">{emptyState.cta}</button>
                </div>
            ))}
        </div>
    </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const MentorshipProfile = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingGoals, setIsEditingGoals] = useState(false);
    const [editSection, setEditSection] = useState('about');
    const fileInputRef = useRef(null);

    const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();
    const [deletePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();

    const userData = JSON.parse(Cookies.get("userData") || "{}");
    const useremail = JSON.parse(localStorage.getItem("userData") || "{}");

    const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(useremail.username);
    const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

    const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;

    useEffect(() => {
        if (profileData === null && apiResponse?.message === "Profile not found") {
            setEditSection('about');
            setIsEditingProfile(true);
        }
    }, [profileData, apiResponse]);

    const handleEditProfile = (section = 'about') => {
        setEditSection(section);
        setIsEditingProfile(true);
    };
    const handleEditGoals = () => { setEditSection('goals'); setIsEditingGoals(true); };
    const handleCloseModal = () => { setIsEditingProfile(false); setIsEditingGoals(false); };

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert("File size should be less than 5MB"); return; }
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) { alert("Please upload a valid image (JPG, PNG, or WEBP)"); return; }
        try {
            await uploadPhoto({ userId: userData.username, file }).unwrap();
            await refetch();
        } catch { alert("Failed to upload photo. Please try again."); }
    };

    const handlePhotoRemove = async () => {
        if (!confirm("Are you sure you want to remove your profile photo?")) return;
        try {
            await deletePhoto(userData.username).unwrap();
            await refetch();
        } catch { alert("Failed to remove photo. Please try again."); }
    };

    const handleSave = async (updatedData, shouldClose = true) => {
        try {
            await saveProfile({ userId: useremail.username, ...updatedData }).unwrap();
            await refetch();
            if (shouldClose) setTimeout(handleCloseModal, 200);
        } catch { alert("Failed to save profile. Please try again."); }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center"><Loader /></div>
        </div>
    );

    if (isError && apiResponse?.message !== "Profile not found") return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-sm w-full text-center">
                <AlertCircle className="text-red-400 h-12 w-12 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Couldn't Load Profile</h2>
                <p className="text-gray-500 text-sm mb-5">{error?.data?.message || "Please try again."}</p>
                <button onClick={() => refetch()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium">Retry</button>
            </div>
        </div>
    );

    // ── Build unified profile object ─────────────────────────────────────────
    const profile = {
        fullName: profileData?.fullName || userData?.name || '',
        email: profileData?.email || useremail?.email || '',
        phone: profileData?.phone || useremail?.phone || '',
        city: profileData?.city || (userData?.address !== 'N/A' ? userData?.address : '') || '',
        country: profileData?.country || '',
        state: profileData?.state || '',
        highestEducation: profileData?.highestEducation || (userData?.education ? mapEducation(userData.education) : ''),
        role: profileData?.role || (() => {
            if (userData?.role === 1) return 'Mentee';
            if (userData?.role === 2) return 'Mentor';
            if (userData?.status) return mapStatus(userData.status);
            return '';
        })(),
        yearsOfExperience: (profileData?.yearsOfExperience != null)
            ? profileData.yearsOfExperience
            : (['fresher', 'student'].includes(userData?.status?.toLowerCase()) ? 0 : null),
        domain: profileData?.domain || '',
        linkedinUrl: profileData?.linkedinUrl || '',
        skills: Array.isArray(profileData?.skills) ? profileData.skills : [],
        about: profileData?.about || '',
        goals: profileData?.goals || '',
        expectations: profileData?.expectations || '',
        availability: profileData?.availability || '',
        target: profileData?.target || '',
        currentCompany: profileData?.currentCompany || '',
        previousCompanies: Array.isArray(profileData?.previousCompanies) ? profileData.previousCompanies : [],
        schoolCollegeName: profileData?.schoolCollegeName || '',
        targetDomains: Array.isArray(profileData?.targetDomains) ? profileData.targetDomains : [],
        targetCompanies: Array.isArray(profileData?.targetCompanies) ? profileData.targetCompanies : [],
        prepTimeline: profileData?.prepTimeline || '',
        resumeDriveLink: profileData?.resumeDriveLink || '',
        profilePhotoUrl: profileData?.profilePhotoUrl || '',
    };

    const completionFields = [
        profile.fullName,
        profile.email,
        profile.phone,
        profile.city && profile.country,
        profile.linkedinUrl,
        profile.domain,
        profile.yearsOfExperience != null,
        profile.highestEducation,
        profile.schoolCollegeName,
        profile.resumeDriveLink,
        profile.goals,
        profile.expectations,
    ];
    const completionPercentage = Math.round(completionFields.filter(Boolean).length / completionFields.length * 100);

    const completionSteps = [
        { label: "Basic Information", completed: !!(profile.fullName && profile.email && profile.phone) },
        { label: "Experience & Domain", completed: !!(profile.yearsOfExperience != null && profile.domain) },
        { label: "Resume & LinkedIn", completed: !!(profile.linkedinUrl || profile.resumeDriveLink) },
        { label: "Goals & Expectations", completed: !!(profile.goals && profile.expectations) },
    ];

    const isNewProfile = profileData === null;
    const avatarSrc = profile.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || userData?.name || 'User'}`;

    const detailItems = [
        profile.city || profile.country ? { label: 'Location', value: [profile.city, profile.country].filter(Boolean).join(', '), icon: <MapPin size={15} /> } : null,
        profile.domain ? { label: 'Domain', value: profile.domain, icon: <Briefcase size={15} /> } : null,
        profile.yearsOfExperience != null ? { label: 'Experience', value: `${profile.yearsOfExperience} ${profile.yearsOfExperience === 1 ? 'year' : 'years'}`, icon: <Briefcase size={15} /> } : null,
        profile.currentCompany ? { label: 'Current Company', value: profile.currentCompany, icon: <Briefcase size={15} /> } : null,
        profile.highestEducation ? { label: 'Education', value: profile.highestEducation, icon: <GraduationCap size={15} /> } : null,
        profile.schoolCollegeName ? { label: 'Institution', value: profile.schoolCollegeName, icon: <GraduationCap size={15} /> } : null,
        profile.availability ? { label: 'Availability', value: profile.availability, icon: <User size={15} /> } : null,
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                {isNewProfile && (
                    <div className="bg-gradient-to-r from-orange-500 to-amber-400 rounded-xl p-6 mb-6 text-white">
                        <h2 className="text-xl font-bold mb-1">Welcome! Let's set up your profile 👋</h2>
                        <p className="text-white/85 text-sm">Complete your profile to get matched with the best mentors for your goals.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

                    {/* ── LEFT / MAIN COLUMN ────────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Profile Identity Card */}
                        <SectionCard
                            title="My Profile"
                            subtitle="Your profile is shared with mentors. Keep it updated."
                            onEdit={() => handleEditProfile('about')}
                            editLabel="Edit Profile"
                            isSaving={isSaving}
                        >
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                                <div className="relative group flex-shrink-0">
                                    <img
                                        src={avatarSrc}
                                        alt="Profile"
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 object-cover bg-gray-100"
                                    />
                                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading || isDeleting}
                                            title="Change photo"
                                            className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                                        >
                                            {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                                        </button>
                                        {profile.profilePhotoUrl && (
                                            <button
                                                onClick={handlePhotoRemove}
                                                disabled={isUploading || isDeleting}
                                                title="Remove photo"
                                                className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors"
                                            >
                                                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                            </button>
                                        )}
                                    </div>
                                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handlePhotoUpload} className="hidden" />
                                </div>

                                <div className="flex-1 min-w-0 space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-xl font-bold text-gray-900 truncate">
                                            {profile.fullName || <span className="text-gray-400 italic font-normal text-base">No name added</span>}
                                        </h3>
                                        {profile.role && (
                                            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{profile.role}</span>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                                        {profile.email && <InfoRow icon={<Mail size={14} />}>{profile.email}</InfoRow>}
                                        {profile.phone && <InfoRow icon={<Phone size={14} />}>{profile.phone}</InfoRow>}
                                        {(profile.city || profile.country) && (
                                            <InfoRow icon={<MapPin size={14} />}>{[profile.city, profile.country].filter(Boolean).join(', ')}</InfoRow>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {profile.linkedinUrl && (
                                            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
                                                <Linkedin size={14} /> LinkedIn
                                            </a>
                                        )}
                                        {profile.resumeDriveLink ? (
                                            <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 font-medium">
                                                <FileText size={14} /> View Resume
                                            </a>
                                        ) : !isNewProfile && (
                                            <button
                                                onClick={() => handleEditProfile('resume')}
                                                className="inline-flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600"
                                            >
                                                <Plus size={13} /> Add Resume
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(profile.target || profile.domain) && (
                                <div className="mt-5 pt-5 border-t border-gray-100 flex items-start gap-3">
                                    <Target className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Target: </span>
                                        {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
                                    </p>
                                </div>
                            )}
                        </SectionCard>

                        {/* Goals & Expectations Card */}
                        <SectionCard
                            title="Goals & Expectations"
                            subtitle="What you'd like to achieve through Long Term Mentorship."
                            onEdit={handleEditGoals}
                            editLabel="Edit Goals"
                            isSaving={isSaving}
                            emptyState={(!profile.goals && !profile.expectations) ? { message: 'No goals or expectations set yet.', cta: 'Add Your Goals →' } : null}
                        >
                            {(profile.goals || profile.expectations) && (
                                <div className="space-y-5">
                                    {profile.goals && (
                                        <div className="flex items-start gap-3">
                                            <Target className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                                            <div className="text-sm text-gray-700">
                                                <span className="font-semibold text-gray-900 block mb-0.5">Main Goal</span>
                                                {profile.goals}
                                            </div>
                                        </div>
                                    )}
                                    {profile.expectations && (
                                        <div className="flex items-start gap-3">
                                            <Heart className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
                                            <div className="text-sm text-gray-700">
                                                <span className="font-semibold text-gray-900 block mb-0.5">Mentor Support</span>
                                                {profile.expectations}
                                            </div>
                                        </div>
                                    )}
                                    {(profile.targetDomains?.length > 0 || profile.targetCompanies?.length > 0) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                                            {/* {profile.targetDomains?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Domains</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {profile.targetDomains.map((d, i) => <TagPill key={i} label={d} color="purple" />)}
                                                    </div>
                                                </div>
                                            )} */}
                                            {profile.targetCompanies?.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Companies</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {profile.targetCompanies.map((c, i) => <TagPill key={i} label={c} color="green" />)}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </SectionCard>

                        {/* Additional Details Card */}
                        <SectionCard
                            title="Additional Details"
                            onEdit={() => handleEditProfile('experience')}
                            editLabel="Edit"
                            isSaving={isSaving}
                            emptyState={detailItems.length === 0 && !profile.skills?.length && !profile.about ? {
                                message: 'No additional details added yet.',
                                cta: 'Complete Your Profile →'
                            } : null}
                        >
                            {(detailItems.length > 0 || profile.skills?.length > 0 || profile.about) && (
                                <div className="space-y-5">
                                    {detailItems.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {detailItems.map((item, i) => (
                                                <div key={i}>
                                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                                                    <p className="text-sm text-gray-900 font-medium">{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {profile.skills?.length > 0 && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills</p>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.skills.map((s, i) => <TagPill key={i} label={s} color="blue" />)}
                                            </div>
                                        </div>
                                    )}
                                    {profile.about && (
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">About</p>
                                            <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    {/* ── RIGHT SIDEBAR ───────────────────────────────────────────── */}
                    <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Profile Completion</h3>
                                <span className={`text-xl font-bold ${completionPercentage === 100 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {completionPercentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-5 overflow-hidden">
                                <div
                                    className={`h-2 rounded-full transition-all duration-700 ${completionPercentage === 100 ? 'bg-green-400' : 'bg-gradient-to-r from-orange-500 to-amber-300'}`}
                                    style={{ width: `${completionPercentage}%` }}
                                />
                            </div>
                            <div className="space-y-3">
                                {completionSteps.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {step.completed
                                            ? <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                                            : <Circle className="text-gray-200 flex-shrink-0" size={18} />}
                                        <span className={`text-sm ${step.completed ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {completionPercentage < 100 ? (
                                <button
                                    onClick={() => handleEditProfile('about')}
                                    className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                                >
                                    Complete Your Profile
                                </button>
                            ) : (
                                <div className="mt-5 flex items-center justify-center gap-2 text-green-600 py-2">
                                    <CheckCircle size={20} />
                                    <span className="font-semibold text-sm">Profile Complete!</span>
                                </div>
                            )}
                        </div>

                        {!isNewProfile && completionPercentage < 100 && (
                            <PendingDetailsCard
                                profile={profile}
                                onEditProfile={() => handleEditProfile('about')}
                                onEditGoals={handleEditGoals}
                            />
                        )}
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditingProfile || isEditingGoals}
                onClose={handleCloseModal}
                section={editSection}
                profileData={profile}
                onSave={handleSave}
                isSaving={isSaving}
            />
        </div>
    );
};

export default MentorshipProfile;










