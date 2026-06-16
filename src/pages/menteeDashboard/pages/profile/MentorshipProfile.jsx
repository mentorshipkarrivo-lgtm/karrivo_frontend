

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle,
    Camera, Trash2, Circle, Edit, Loader2, AlertCircle, ChevronRight,
    AlertTriangle, FileText, MapPin, Briefcase, GraduationCap, User
} from 'lucide-react';
import {
    useManageUserProfileQuery,
    useSaveUserProfileMutation,
} from "./Profilesecapislice";
import { CiEdit } from "react-icons/ci";
import Cookies from "js-cookie";
import Loader from '../../../../global/Loader';
import { storage } from "../../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const DOMAIN_OPTIONS = [
    "Software Development", "Data Science & AI", "Cybersecurity", "Cloud Computing",
    "Networking & Infrastructure", "Database Management", "UI/UX & Product Design",
    "Enterprise Applications", "Microservices & DevOps", "Blockchain & FinTech",
    "Testing & Quality Assurance", "IT Service Management", "Business Intelligence", "IoT (Internet of Things)",
];

const TARGET_COMPANY_OPTIONS = [
    "Service-Based Companies", "Consulting Firms", "Product-Based Companies",
    "Startups & Scaleups", "Core Engineering & R&D", "Financial & Banking IT", "FAANG & MAANG",
];

// ── COLOR SYSTEM (matches Code 2) ──────────────────────────────────────────────
const COLORS = {
    primary: '#1a1a2e',          // dark navy — main brand color
    accent: '#0091c3',           // cyan — interactive / highlight
    accentLight: '#e6f7fc',      // light cyan tint for backgrounds
    accentBorder: '#b3e4f5',     // cyan border tint
    muted: '#94a3b8',            // slate-400 — secondary text
    mutedBg: '#f1f5f9',          // slate-100 — subtle backgrounds
    border: '#e2e8f0',           // slate-200 — default borders
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    white: '#ffffff',
};

// ── UTILITIES ─────────────────────────────────────────────────────────────────
const mapEducation = (val = '') => {
    const map = {
        bachelors: "Bachelor's Degree", bachelor: "Bachelor's Degree",
        masters: "Master's Degree", master: "Master's Degree",
        phd: "PhD", diploma: "Diploma", highschool: "High School",
        'high school': "High School", other: "Other",
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

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────

const TagPill = ({ label, onRemove, variant = 'blue' }) => {
    const variants = {
        blue: { bg: COLORS.accentLight, text: COLORS.accent, border: COLORS.accentBorder },
        indigo: { bg: '#ede9fe', text: '#6d28d9', border: '#c4b5fd' },
        green: { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
        navy: { bg: '#f0f0f6', text: COLORS.primary, border: '#c7c7dc' },
    };
    const style = variants[variant] || variants.blue;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.2px',
            background: style.bg, color: style.text, border: `1px solid ${style.border}`,
        }}>
            {label}
            {onRemove && (
                <button onClick={onRemove} style={{
                    marginLeft: '2px', lineHeight: 1, fontSize: '14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: style.text, opacity: 0.7, padding: 0,
                }}>×</button>
            )}
        </span>
    );
};

const FormField = ({ label, required, children, hint, error }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: COLORS.primary, letterSpacing: '0.3px' }}>
            {label}{required && <span style={{ color: COLORS.error, marginLeft: '2px' }}>*</span>}
        </label>
        {children}
        {hint && !error && <p style={{ fontSize: '11px', color: COLORS.muted, margin: 0 }}>{hint}</p>}
        {error && (
            <p style={{ fontSize: '11px', color: COLORS.error, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={11} />{error}
            </p>
        )}
    </div>
);

const InfoRow = ({ icon, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: COLORS.muted, fontSize: '13px', minWidth: 0 }}>
        <span style={{ flexShrink: 0, color: COLORS.muted }}>{icon}</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
    </div>
);

// ── INPUT STYLES ──────────────────────────────────────────────────────────────
const inputStyle = (hasError = false) => ({
    width: '100%', padding: '10px 12px', fontSize: '13px', fontFamily: 'inherit',
    border: `1px solid ${hasError ? COLORS.error : COLORS.border}`,
    borderRadius: '6px', outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
    color: COLORS.primary, background: COLORS.white, boxSizing: 'border-box',
});

const selectStyle = (hasError = false) => ({
    ...inputStyle(hasError),
    background: COLORS.white, cursor: 'pointer',
});

// ── PROFILE PHOTO UPLOAD ──────────────────────────────────────────────────────
const MAX_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const ProfilePhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('idle');
    const [errMsg, setErrMsg] = useState('');
    const [preview, setPreview] = useState(currentUrl);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => { setPreview(currentUrl); }, [currentUrl]);

    const handleFile = useCallback((file) => {
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) { setErrMsg('Only JPG, PNG, WebP allowed.'); setStatus('error'); return; }
        if (file.size > MAX_MB * 1024 * 1024) { setErrMsg(`Max ${MAX_MB}MB allowed.`); setStatus('error'); return; }

        setPreview(URL.createObjectURL(file));
        setStatus('uploading'); setProgress(0); setErrMsg('');

        const ext = file.name.split('.').pop();
        const task = uploadBytesResumable(
            ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`),
            file
        );

        task.on('state_changed',
            snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
            () => { setErrMsg('Upload failed. Try again.'); setStatus('error'); setPreview(currentUrl); },
            async () => {
                try {
                    const url = await getDownloadURL(task.snapshot.ref);
                    setPreview(url); setStatus('done'); onUpload?.(url);
                } catch { setErrMsg('Could not get download URL.'); setStatus('error'); }
            }
        );
    }, [userId, currentUrl, onUpload]);

    const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }, [handleFile]);

    const isUploading = status === 'uploading';
    const isDone = status === 'done';
    const isError = status === 'error';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: COLORS.primary, letterSpacing: '0.3px' }}>Profile Photo</label>
            <div
                onDrop={onDrop}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => !isUploading && inputRef.current?.click()}
                style={{
                    width: '100%', borderRadius: '8px', cursor: isUploading ? 'default' : 'pointer',
                    border: `2px dashed ${isError ? COLORS.error : dragging ? COLORS.accent : COLORS.border}`,
                    background: dragging ? COLORS.accentLight : COLORS.mutedBg,
                    transition: 'border-color 0.15s, background 0.15s',
                }}
            >
                <input
                    ref={inputRef} type="file" accept={ALLOWED_TYPES.join(',')}
                    style={{ display: 'none' }}
                    onChange={e => handleFile(e.target.files?.[0])}
                />
                {preview ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px' }}>
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <img src={preview} alt="preview"
                                style={{
                                    width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover',
                                    border: `3px solid ${isDone ? COLORS.success : COLORS.border}`,
                                }}
                                onError={e => e.target.style.display = 'none'}
                            />
                            {isDone && (
                                <div style={{
                                    position: 'absolute', bottom: '-2px', right: '-2px',
                                    width: '18px', height: '18px', borderRadius: '50%',
                                    background: COLORS.success, border: `2px solid ${COLORS.white}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <CheckCircle size={10} color={COLORS.white} />
                                </div>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            {isUploading ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <Loader2 size={13} style={{ color: COLORS.accent, animation: 'spin 1s linear infinite' }} />
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: COLORS.primary }}>Uploading… {progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: COLORS.border, borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ height: '4px', borderRadius: '2px', background: COLORS.accent, width: `${progress}%`, transition: 'width 0.2s' }} />
                                    </div>
                                </>
                            ) : isDone ? (
                                <><p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.success, margin: 0 }}>Photo uploaded!</p><p style={{ fontSize: '11px', color: COLORS.muted, margin: '2px 0 0' }}>Click to replace</p></>
                            ) : (
                                <><p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.primary, margin: 0 }}>Photo ready</p><p style={{ fontSize: '11px', color: COLORS.muted, margin: '2px 0 0' }}>Click to replace</p></>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '8px',
                            background: COLORS.accentLight, border: `1px solid ${COLORS.accentBorder}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
                        }}>
                            <Camera size={18} color={COLORS.accent} />
                        </div>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.primary, margin: '0 0 2px' }}>
                            {dragging ? 'Drop to upload' : 'Upload Profile Photo'}
                        </p>
                        <p style={{ fontSize: '11px', color: COLORS.muted, margin: 0 }}>Drag & drop or click · JPG PNG WebP · Max {MAX_MB}MB</p>
                    </div>
                )}
            </div>
            {isError && errMsg && (
                <p style={{ fontSize: '11px', color: COLORS.error, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={11} />{errMsg}
                </p>
            )}
        </div>
    );
};

// ── TAG INPUT ROW ─────────────────────────────────────────────────────────────
const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
            placeholder={placeholder}
            style={{ ...inputStyle(), flex: 1, minWidth: 0 }}
        />
        <button type="button" onClick={onAdd} style={{
            padding: '0 14px', background: COLORS.primary, color: COLORS.white,
            border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
            cursor: 'pointer', flexShrink: 0, letterSpacing: '0.2px',
        }}>Add</button>
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
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <select value={val} onChange={e => { setVal(e.target.value); setCustomVal(''); }}
                    style={{ ...selectStyle(), flex: 1, minWidth: 0 }}>
                    <option value="">{placeholder || 'Select an option'}</option>
                    {available.map(o => <option key={o} value={o}>{o}</option>)}
                    {allowOther && <option value="__other__">Other (specify below)</option>}
                </select>
                {!isOther && (
                    <button type="button" onClick={handleAdd} disabled={!val} style={{
                        padding: '0 14px', background: val ? COLORS.primary : COLORS.muted,
                        color: COLORS.white, border: 'none', borderRadius: '6px',
                        fontSize: '13px', fontWeight: 600, cursor: val ? 'pointer' : 'not-allowed',
                        flexShrink: 0, opacity: val ? 1 : 0.5,
                    }}>Add</button>
                )}
            </div>
            {isOther && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input value={customVal} onChange={e => setCustomVal(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                        placeholder="Type your custom option..."
                        style={{ ...inputStyle(), flex: 1, minWidth: 0 }}
                        autoFocus
                    />
                    <button type="button" onClick={handleAdd} disabled={!customVal.trim()} style={{
                        padding: '0 14px', background: COLORS.primary, color: COLORS.white,
                        border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                        cursor: customVal.trim() ? 'pointer' : 'not-allowed', flexShrink: 0,
                        opacity: customVal.trim() ? 1 : 0.5,
                    }}>Add</button>
                </div>
            )}
        </div>
    );
};

// ── EDIT MODAL ────────────────────────────────────────────────────────────────
const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving, userId, onPhotoUpload }) => {
    const [currentSection, setCurrentSection] = useState(section);
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', city: '', country: '', linkedinUrl: '',
        domain: '', role: '', yearsOfExperience: '', currentCompany: '',
        previousCompanies: [], skills: [], about: '', availability: '',
        highestEducation: '', schoolCollegeName: '', mainGoals: '',
        targetDomains: [], targetCompanies: [], prepTimeline: '', mentorHelp: '',
        resumeDriveLink: '', profilePhotoUrl: '',
    });
    const [inputValues, setInputValues] = useState({ skill: '', previousCompany: '', customDomain: '', customTargetDomain: '' });
    const [errors, setErrors] = useState({});
    const [driveLinkError, setDriveLinkError] = useState('');

    useEffect(() => { setCurrentSection(section); }, [section]);

    useEffect(() => {
        const isFresher = (profileData?.currentStatus || '').toLowerCase() === 'fresher';
        if (isOpen && profileData) {
            setFormData({
                fullName: profileData.fullName || '',
                email: profileData.email || '',
                phone: String(profileData.phone || ''),
                city: profileData.city || '',
                country: profileData.country || '',
                linkedinUrl: profileData.linkedinUrl || '',
                domain: profileData.domain || '',
                role: profileData.role || '',
                yearsOfExperience: isFresher ? 0 : (profileData.yearsOfExperience != null ? profileData.yearsOfExperience : ''),
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
                profilePhotoUrl: profileData.profilePhotoUrl || '',
            });
            setErrors({});
            setDriveLinkError('');
        }
    }, [isOpen, profileData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
        if (name === 'resumeDriveLink') setDriveLinkError('');
    };

    const validateDriveLink = (url) =>
        !url || [/drive\.google\.com/, /docs\.google\.com/].some(p => p.test(url));

    const validateAbout = () => {
        const errs = {};
        const name = String(formData.fullName || '').trim();
        const email = String(formData.email || '').trim();
        const phone = String(formData.phone || '').trim();
        const linkedin = String(formData.linkedinUrl || '').trim();
        if (!name) errs.fullName = 'Full name is required.';
        if (!email) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
        if (!phone) errs.phone = 'Phone number is required.';
        else if (!/^[+]?[\d\s\-().]{7,20}$/.test(phone)) errs.phone = 'Enter a valid phone number.';
        if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//.test(linkedin))
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
            return { fullName: formData.fullName, email: formData.email, phone: formData.phone, city: formData.city, country: formData.country, linkedinUrl: formData.linkedinUrl, profilePhotoUrl: formData.profilePhotoUrl };
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
            if (idx < order.length - 1) { setCurrentSection(order[idx + 1]); setErrors({}); }
        } catch (e) { console.error(e); }
    };

    const navItems = [
        { id: 'about', label: 'About', icon: <User size={14} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
        { id: 'resume', label: 'Resume', icon: <FileText size={14} /> },
        { id: 'goals', label: 'Goals', icon: <Target size={14} /> },
    ];

    const renderAboutSection = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: COLORS.primary, paddingBottom: '12px', borderBottom: `1px solid ${COLORS.border}` }}>About</h3>
            <ProfilePhotoUpload
                currentUrl={formData.profilePhotoUrl || ''}
                onUpload={async url => {
                    setFormData(prev => ({ ...prev, profilePhotoUrl: url }));
                    onPhotoUpload?.(url);
                    if (url) {
                        try {
                            const stored = JSON.parse(localStorage.getItem('profileData') || '{}');
                            stored.profilePhotoUrl = url;
                            localStorage.setItem('profileData', JSON.stringify(stored));
                        } catch (e) { console.error(e); }
                    }
                    if (url) await onSave({ profilePhotoUrl: url }, false);
                }}
                userId={userId}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <FormField label="Full Name" required error={errors.fullName}>
                    <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
                        placeholder="Enter your full name" style={inputStyle(!!errors.fullName)} />
                </FormField>
                <FormField label="Email" required error={errors.email}>
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                        placeholder="your.email@example.com" style={inputStyle(!!errors.email)} />
                </FormField>
                <FormField label="Phone" required error={errors.phone}>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        placeholder="+91 1234567890" style={inputStyle(!!errors.phone)} />
                </FormField>
                <FormField label="LinkedIn URL" error={errors.linkedinUrl}>
                    <input name="linkedinUrl" type="url" value={formData.linkedinUrl} onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile" style={inputStyle(!!errors.linkedinUrl)} />
                </FormField>
                <FormField label="City">
                    <input name="city" type="text" value={formData.city} onChange={handleChange}
                        placeholder="Enter city" style={inputStyle()} />
                </FormField>
                <FormField label="Country">
                    <input name="country" type="text" value={formData.country} onChange={handleChange}
                        placeholder="Enter country" style={inputStyle()} />
                </FormField>
            </div>
        </div>
    );

    const renderExperienceSection = () => {
        const isFresher = (profileData?.currentStatus || '').toLowerCase() === 'fresher';
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: COLORS.primary, paddingBottom: '12px', borderBottom: `1px solid ${COLORS.border}` }}> Experience</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <FormField label="Domain" required error={errors.domain}>
                        <select
                            value={DOMAIN_OPTIONS.includes(formData.domain) || formData.domain === '' ? formData.domain : '__other__'}
                            onChange={e => {
                                const v = e.target.value;
                                if (v === '__other__') setFormData(prev => ({ ...prev, domain: inputValues.customDomain || '' }));
                                else { setFormData(prev => ({ ...prev, domain: v })); setInputValues(prev => ({ ...prev, customDomain: '' })); }
                                if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
                            }}
                            style={selectStyle(!!errors.domain)}
                        >
                            <option value="">Select a domain</option>
                            {DOMAIN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                            <option value="__other__">Other (specify below)</option>
                        </select>
                        {!DOMAIN_OPTIONS.includes(formData.domain) && formData.domain !== '' && (
                            <input value={formData.domain}
                                onChange={e => { setFormData(prev => ({ ...prev, domain: e.target.value })); if (errors.domain) setErrors(prev => ({ ...prev, domain: '' })); }}
                                placeholder="Describe your domain..."
                                style={{ ...inputStyle(), marginTop: '8px', background: COLORS.accentLight }} />
                        )}
                    </FormField>

                    <FormField label="Current Role" required error={errors.role}>
                        <input name="role" value={formData.role} onChange={handleChange}
                            placeholder="e.g., Frontend Developer" style={inputStyle(!!errors.role)} />
                    </FormField>

                    <FormField label="Years of Experience" required hint={isFresher ? undefined : "Enter 0 if you're a student or fresher"} error={errors.yearsOfExperience}>
                        {isFresher ? (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '6px', border: `1px solid ${COLORS.accentBorder}`, background: COLORS.accentLight }}>
                                    <CheckCircle size={14} color={COLORS.accent} />
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: COLORS.accent }}>0 years</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: COLORS.white, background: COLORS.accent, padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Fresher</span>
                                </div>
                                <p style={{ fontSize: '11px', color: COLORS.muted, margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <AlertCircle size={11} />Auto-filled as 0 because your profile status is Fresher.
                                </p>
                                <input type="hidden" name="yearsOfExperience" value={0} />
                            </div>
                        ) : (
                            <input name="yearsOfExperience" type="number" min="0"
                                value={formData.yearsOfExperience} onChange={handleChange}
                                placeholder="e.g., 3" style={inputStyle(!!errors.yearsOfExperience)} />
                        )}
                    </FormField>

                    {!isFresher && (
                        <FormField label="Current Company">
                            <input name="currentCompany" value={formData.currentCompany} onChange={handleChange}
                                placeholder="e.g., Infosys" style={inputStyle()} />
                        </FormField>
                    )}

                    <FormField label="Highest Education" required error={errors.highestEducation}>
                        <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} style={selectStyle(!!errors.highestEducation)}>
                            <option value="">Select education level</option>
                            {["High School", "Diploma", "Bachelors Degree", "Masters Degree", "PhD", "Other"].map(o => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField label="School / College Name">
                        <input name="schoolCollegeName" value={formData.schoolCollegeName} onChange={handleChange}
                            placeholder="e.g., IIT Bombay" style={inputStyle()} />
                    </FormField>
                </div>

                <FormField label="Skills">
                    <TagInputRow placeholder="Add a skill (e.g., React, Python)" value={inputValues.skill}
                        onChange={v => setInputValues(p => ({ ...p, skill: v }))} onAdd={() => addItem('skill')} />
                    {formData.skills.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                            {formData.skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => removeItem('skills', i)} variant="blue" />)}
                        </div>
                    )}
                </FormField>

                {!isFresher && (
                    <FormField label="Previous Companies">
                        <TagInputRow placeholder="Add a previous company" value={inputValues.previousCompany}
                            onChange={v => setInputValues(p => ({ ...p, previousCompany: v }))} onAdd={() => addItem('previousCompany')} />
                        {formData.previousCompanies.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                                {formData.previousCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('previousCompanies', i)} variant="indigo" />)}
                            </div>
                        )}
                    </FormField>
                )}

                <FormField label="About You">
                    <textarea name="about" value={formData.about}
                        onChange={e => { if (e.target.value.length <= 500) handleChange(e); }}
                        rows={3} placeholder="Brief description about yourself..."
                        style={{ ...inputStyle(), resize: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', color: formData.about.trim().length < 50 && formData.about ? COLORS.error : COLORS.muted }}>
                            {formData.about.trim().length < 50 && formData.about ? `Minimum 50 characters required (${formData.about.trim().length}/50)` : ''}
                        </span>
                        <span style={{ fontSize: '11px', color: formData.about.trim().length > 450 ? COLORS.accent : COLORS.muted }}>
                            {formData.about.trim().length}/500
                        </span>
                    </div>
                </FormField>
            </div>
        );
    };

    const renderResumeSection = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: COLORS.primary }}>Resume </h3>
                <p style={{ margin: 0, fontSize: '12px', color: COLORS.muted }}>Share your resume with mentors for better guidance</p>
            </div>

            <div style={{ borderRadius: '8px', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
                <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: COLORS.primary }}>
                    <FileText size={13} color={COLORS.white} />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS.white, letterSpacing: '0.6px',  }}>How to get your Drive link</span>
                </div>
                <div style={{ padding: '12px 16px', background: COLORS.accentLight, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                    {[
                        "Upload your resume (PDF/DOC) to Google Drive",
                        'Right-click the file → "Get link"',
                        'Set access to "Anyone with the link"',
                        "Copy the link and paste it below",
                    ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', background: COLORS.accent, color: COLORS.white, fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{i + 1}</span>
                            <p style={{ fontSize: '12px', lineHeight: 1.5, color: COLORS.accent, margin: 0 }}>{step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <FormField label="Google Drive Resume Link" error={errors.resumeDriveLink}>
                <input name="resumeDriveLink" type="url" value={formData.resumeDriveLink}
                    onChange={handleChange} placeholder="https://drive.google.com/file/d/..."
                    style={inputStyle(!!errors.resumeDriveLink)} />
            </FormField>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <p style={{ fontSize: '11px', color: COLORS.muted, margin: 0 }}>Your resume is only shared with mentors you connect with.</p>
                {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
                    <a href={formData.resumeDriveLink} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontSize: '12px', fontWeight: 600, color: COLORS.accent,
                        border: `1px solid ${COLORS.accentBorder}`, background: COLORS.accentLight,
                        padding: '6px 12px', borderRadius: '6px', textDecoration: 'none',
                    }}>
                        <FileText size={13} /> Preview Resume →
                    </a>
                )}
            </div>
        </div>
    );

    const renderGoalsSection = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: COLORS.primary, paddingBottom: '12px', borderBottom: `1px solid ${COLORS.border}` }}>Goals </h3>

            <FormField label="Main Goals" required error={errors.mainGoals}>
                <select name="mainGoals" value={formData.mainGoals} onChange={handleChange} style={selectStyle(!!errors.mainGoals)}>
                    <option value="">Select your main goal</option>
                    {["Employed, looking to switch to another company", "Unemployed, looking for a job", "Student, preparing for placements", "Career transition", "Skill development", "Interview preparation"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </FormField>

            <FormField label="Target Companies" required error={errors.targetCompanies}>
                <DropdownTagSelector options={TARGET_COMPANY_OPTIONS} selected={formData.targetCompanies}
                    onAdd={v => addTagItem('targetCompanies', v)} placeholder="Select a company type" allowOther={true} />
                {formData.targetCompanies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                        {formData.targetCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('targetCompanies', i)} variant="green" />)}
                    </div>
                )}
            </FormField>

            <FormField label="Preparation Timeline">
                <select name="prepTimeline" value={formData.prepTimeline} onChange={handleChange} style={selectStyle()}>
                    <option value="">Select timeline</option>
                    {["1 month", "3 months", ">=6 months", "None"].map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </FormField>

            <FormField label="How do you want your Mentor to help?" required hint="Be specific about what kind of support you're looking for." error={errors.mentorHelp}>
                <textarea name="mentorHelp" value={formData.mentorHelp} onChange={handleChange}
                    rows={4} placeholder="Describe the support you're looking for from a mentor..."
                    style={{ ...inputStyle(!!errors.mentorHelp), resize: 'none' }} />
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
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0', overflowY: 'auto',
        }}
            className="sm-modal-center"
        >
            <style>{`
                @media (min-width: 640px) {
                    .sm-modal-center { align-items: center !important; padding: 16px !important; }
                    .modal-inner { border-radius: 10px !important; max-height: 92vh !important; margin: 16px 0; }
                    .modal-nav { width: 180px !important; flex-direction: column !important; border-right: 1px solid ${COLORS.border} !important; border-bottom: none !important; overflow-x: visible !important; }
                    .modal-body { flex-direction: row !important; }
                    .modal-footer { flex-direction: row !important; }
                    .footer-actions { flex-direction: row !important; }
                    .grid-2col { grid-template-columns: repeat(2, 1fr) !important; }
                }
            `}</style>
            <div className="modal-inner" style={{
                background: COLORS.white, width: '100%', maxWidth: '780px',
                maxHeight: '100vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                borderRadius: '10px 10px 0 0',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
                    <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: COLORS.primary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CiEdit style={{ color: COLORS.accent, fontSize: '20px' }} /> Edit Profile
                    </h2>
                    <button onClick={onClose} disabled={isSaving} style={{
                        padding: '6px', borderRadius: '6px', border: 'none', background: 'none',
                        cursor: 'pointer', color: COLORS.muted, display: 'flex', alignItems: 'center',
                    }}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, minHeight: '400px' }}>
                    {/* Nav */}
                    <div className="modal-nav" style={{
                        flexShrink: 0, borderBottom: `1px solid ${COLORS.border}`,
                        background: COLORS.mutedBg, display: 'flex', flexDirection: 'row',
                        overflowX: 'auto',
                    }}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px' }}>
                            {navItems.map(({ id, label, icon }) => (
                                <button key={id} type="button"
                                    onClick={() => { setCurrentSection(id); setErrors({}); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                                        cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                                        transition: 'all 0.15s', letterSpacing: '0.2px',
                                        background: currentSection === id ? COLORS.primary : 'transparent',
                                        color: currentSection === id ? COLORS.white : COLORS.muted,
                                    }}
                                >
                                    {icon}<span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px' }}>
                        {renderContent()}
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer" style={{
                    display: 'flex', flexDirection: 'column-reverse', alignItems: 'stretch',
                    justifyContent: 'space-between', gap: '10px',
                    padding: '14px 20px', borderTop: `1px solid ${COLORS.border}`,
                    background: COLORS.mutedBg, flexShrink: 0,
                }}>
                    <button type="button" onClick={onClose} disabled={isSaving} style={{
                        padding: '10px 20px', fontSize: '13px', border: `1px solid ${COLORS.border}`,
                        color: COLORS.primary, background: COLORS.white, borderRadius: '6px',
                        cursor: 'pointer', fontWeight: 600, textAlign: 'center',
                    }}>Cancel</button>
                    <div className="footer-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button type="button" onClick={() => handleSave(true)} disabled={isSaving} style={{
                            padding: '10px 20px', fontSize: '13px', borderRadius: '6px',
                            border: `1px solid ${COLORS.accent}`, background: "#1a1a2e",
                            color: "#ffffff", cursor: 'pointer', fontWeight: 600,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                            opacity: isSaving ? 0.6 : 1,
                        }}>
                            {isSaving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />Saving...</> : 'Save'}
                        </button>
                        {currentSection !== 'goals' && (
                            <button type="button" onClick={handleSaveAndContinue} disabled={isSaving} style={{
                                padding: '10px 20px', fontSize: '13px', borderRadius: '6px',
                                border: 'none', background: COLORS.primary, color: COLORS.white,
                                cursor: 'pointer', fontWeight: 600, letterSpacing: '0.2px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                opacity: isSaving ? 0.6 : 1,
                            }}>
                                {isSaving ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />Saving...</> : <>Save & Continue <ChevronRight size={14} /></>}
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
        <div style={{ background: COLORS.white, borderRadius: '10px', border: `1px solid ${COLORS.border}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', background: COLORS.primary }}>
                <AlertTriangle size={16} color={COLORS.accent} />
                <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: COLORS.white, flex: 1 }}>Pending Details</h3>
                <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS.primary, background: COLORS.accent, padding: '2px 8px', borderRadius: '20px' }}>{pendingItems.length}</span>
            </div>
            <div style={{ padding: '12px 20px' }}>
                <p style={{ fontSize: '12px', color: COLORS.muted, margin: '0 0 10px' }}>Complete these to improve your visibility with mentors.</p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {pendingItems.map((item, index) => (
                        <li key={index} style={{ borderTop: index > 0 ? `1px solid ${COLORS.mutedBg}` : 'none' }}>
                            <button onClick={item.action} style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS.accent, flexShrink: 0 }} />
                                <span style={{ fontSize: '13px', color: '#475569', flex: 1 }}>{item.label}</span>
                                <ChevronRight size={14} color={COLORS.border} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// ── SECTION CARD ──────────────────────────────────────────────────────────────
const SectionCard = ({ title, subtitle, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
    <div style={{ background: COLORS.white, borderRadius: '10px', border: `1px solid ${COLORS.border}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', padding: '18px 24px', borderBottom: `1px solid ${COLORS.mutedBg}` }}>
            <div style={{ minWidth: 0 }}>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: COLORS.primary }}>{title}</h2>
                {subtitle && <p style={{ margin: '4px 0 0', fontSize: '13px', color: COLORS.muted, lineHeight: 1.5 }}>{subtitle}</p>}
            </div>
            <button onClick={onEdit} disabled={isSaving} style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', background: COLORS.primary, color: COLORS.white,
                border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '0.2px', opacity: isSaving ? 0.6 : 1,
            }}>
                {isSaving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Edit size={14} />}
                {isSaving ? 'Saving...' : editLabel}
            </button>
        </div>
        <div style={{ padding: '20px 24px' }}>
            {children || (emptyState && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <p style={{ color: COLORS.muted, fontSize: '13px', margin: '0 0 10px' }}>{emptyState.message}</p>
                    <button onClick={onEdit} style={{ fontSize: '13px', fontWeight: 600, color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer' }}>{emptyState.cta}</button>
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
    const [livePhotoUrl, setLivePhotoUrl] = useState('');

    const userData = JSON.parse(Cookies.get("userData") || "{}");
    const useremail = JSON.parse(localStorage.getItem("userData") || "{}");

    const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(useremail._id);
    const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

    const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;
    const googleUser = apiResponse?.googleUser || null;

    useEffect(() => {
        if (profileData === null && apiResponse?.message === "Profile not found") {
            setEditSection('about');
            setIsEditingProfile(true);
        }
    }, [profileData, apiResponse]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('profileData') || '{}');
            if (stored.profilePhotoUrl) setLivePhotoUrl(stored.profilePhotoUrl);
        } catch (e) { console.error(e); }
    }, []);

    const handleEditProfile = (section = 'about') => { setEditSection(section); setIsEditingProfile(true); };
    const handleEditGoals = () => { setEditSection('goals'); setIsEditingGoals(true); };
    const handleCloseModal = () => { setIsEditingProfile(false); setIsEditingGoals(false); };

    const handleSave = async (updatedData, shouldClose = true) => {
        try {
            await saveProfile({ id: useremail._id, userId: useremail.username, ...updatedData }).unwrap();
            if (updatedData.profilePhotoUrl) {
                try {
                    const stored = JSON.parse(localStorage.getItem('profileData') || '{}');
                    stored.profilePhotoUrl = updatedData.profilePhotoUrl;
                    localStorage.setItem('profileData', JSON.stringify(stored));
                } catch (e) { console.error(e); }
            }
            await refetch();
            if (shouldClose) setTimeout(handleCloseModal, 200);
        } catch {
            if (shouldClose) alert("Failed to save profile. Please try again.");
        }
    };

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: COLORS.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
        </div>
    );

    if (isError && apiResponse?.message !== "Profile not found") return (
        <div style={{ minHeight: '100vh', background: COLORS.white, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ background: COLORS.white, borderRadius: '10px', border: `1px solid ${COLORS.border}`, padding: '32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
                <AlertCircle size={48} color={COLORS.error} style={{ margin: '0 auto 16px' }} />
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: COLORS.primary, margin: '0 0 8px' }}>Couldn't Load Profile</h2>
                <p style={{ fontSize: '13px', color: COLORS.muted, margin: 0 }}>{error?.data?.message || "Please try again."}</p>
            </div>
        </div>
    );

    const profile = {
        fullName: profileData?.fullName || useremail?.name || '',
        email: profileData?.email || useremail?.email || '',
        phone: profileData?.phone || useremail?.phone || '',
        city: profileData?.city || (userData?.address !== 'N/A' ? userData?.address : '') || '',
        country: profileData?.country || '',
        state: profileData?.state || '',
        currentStatus: profileData?.currentStatus || '',
        highestEducation: profileData?.highestEducation || (userData?.education ? mapEducation(userData.education) : ''),
        role: profileData?.role || (() => {
            if (userData?.role === 1) return 'Mentee';
            if (userData?.role === 2) return 'Mentor';
            if (userData?.status) return mapStatus(userData.status);
            return '';
        })(),
        yearsOfExperience: (profileData?.yearsOfExperience != null) ? profileData.yearsOfExperience : ((profileData?.currentStatus || '').toLowerCase() === 'fresher' ? 0 : null),
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
        profilePhotoUrl: livePhotoUrl || profileData?.profilePhotoUrl || '',
    };

    const completionFields = [
        profile.fullName, profile.email, profile.phone,
        profile.city && profile.country, profile.linkedinUrl, profile.domain,
        profile.yearsOfExperience != null, profile.highestEducation,
        profile.schoolCollegeName, profile.resumeDriveLink, profile.goals, profile.expectations,
    ];
    const completionPercentage = Math.round(completionFields.filter(Boolean).length / completionFields.length * 100);

    const completionSteps = [
        { label: "Basic Information", completed: !!(profile.fullName && profile.email && profile.phone) },
        { label: "Experience & Domain", completed: !!(profile.yearsOfExperience != null && profile.domain) },
        { label: "Resume & LinkedIn", completed: !!(profile.linkedinUrl || profile.resumeDriveLink) },
        { label: "Goals & Expectations", completed: !!(profile.goals && profile.expectations) },
    ];

    const isNewProfile = profileData === null;
    const avatarSrc = profile.profilePhotoUrl || googleUser?.profile || '';
    const initials = (profile.fullName || userData?.name || 'U').split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');

    const detailItems = [
        profile.city || profile.country ? { label: 'Location', value: [profile.city, profile.country].filter(Boolean).join(', '), icon: <MapPin size={14} /> } : null,
        profile.domain ? { label: 'Domain', value: profile.domain, icon: <Briefcase size={14} /> } : null,
        profile.yearsOfExperience != null ? { label: 'Experience', value: `${profile.yearsOfExperience} ${profile.yearsOfExperience === 1 ? 'year' : 'years'}`, icon: <Briefcase size={14} /> } : null,
        profile.currentCompany ? { label: 'Current Company', value: profile.currentCompany, icon: <Briefcase size={14} /> } : null,
        profile.highestEducation ? { label: 'Education', value: profile.highestEducation, icon: <GraduationCap size={14} /> } : null,
        profile.schoolCollegeName ? { label: 'Institution', value: profile.schoolCollegeName, icon: <GraduationCap size={14} /> } : null,
        profile.availability ? { label: 'Availability', value: profile.availability, icon: <User size={14} /> } : null,
    ].filter(Boolean);

    return (
        <div style={{ minHeight: '100vh', background: COLORS.mutedBg, fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @media (min-width: 640px) {
                    .profile-grid { grid-template-columns: 1fr 1fr !important; }
                    .contact-row { flex-direction: row !important; }
                    .footer-actions { flex-direction: row !important; }
                }
                @media (min-width: 1024px) {
                    .main-grid { grid-template-columns: 1fr 300px !important; }
                }
                      ::-webkit-scrollbar { width: 0; height: 0; }
  * { scrollbar-width: none; -ms-overflow-style: none; }
            `}</style>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

                {isNewProfile && (
                    <div style={{
                        borderRadius: '10px', padding: '24px', marginBottom: '20px',
                        background: COLORS.primary, color: COLORS.white,
                    }}>
                        <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 700 }}>Welcome! Let's set up your profile 👋</h2>
                        <p style={{ margin: 0, fontSize: '13px', opacity: 0.85 }}>Complete your profile to get matched with the best mentors for your goals.</p>
                    </div>
                )}

                <div className="main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>

                    {/* Left column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Profile Card */}
                        <SectionCard title="My Profile" subtitle="Your profile is shared with mentors. Keep it updated."
                            onEdit={() => handleEditProfile('about')} editLabel="Edit Profile" isSaving={isSaving}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ position: 'relative', flexShrink: 0 }}>
                                        {avatarSrc ? (
                                            <img src={avatarSrc} alt="Profile"
                                                style={{ width: '80px', height: '80px', borderRadius: '50%', border: `3px solid ${COLORS.border}`, objectFit: 'cover' }}
                                                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }} />
                                        ) : null}
                                        <div style={{
                                            width: '80px', height: '80px', borderRadius: '50%',
                                            border: `3px solid ${COLORS.border}`,
                                            display: avatarSrc ? 'none' : 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            background: COLORS.primary,
                                        }}>
                                            <span style={{ fontWeight: 700, fontSize: '24px', color: COLORS.white }}>{initials}</span>
                                        </div>
                                        <button onClick={() => handleEditProfile('about')} title="Change photo" style={{
                                            position: 'absolute', bottom: 0, right: 0,
                                            width: '26px', height: '26px', borderRadius: '50%',
                                            background: COLORS.accent, border: `2px solid ${COLORS.white}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer',
                                        }}>
                                            <Camera size={12} color={COLORS.white} />
                                        </button>
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: COLORS.primary }}>
                                                {profile.fullName || <span style={{ color: COLORS.muted, fontStyle: 'italic', fontWeight: 400, fontSize: '16px' }}>No name added</span>}
                                            </h3>
                                            {profile.role && (
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: COLORS.accent, background: COLORS.accentLight, border: `1px solid ${COLORS.accentBorder}`, padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.3px' }}>{profile.role}</span>
                                            )}
                                        </div>

                                        <div className="contact-row" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                            {profile.email && <InfoRow icon={<Mail size={13} />}>{profile.email}</InfoRow>}
                                            {profile.phone && <InfoRow icon={<Phone size={13} />}>{profile.phone}</InfoRow>}
                                            {(profile.city || profile.country) && (
                                                <InfoRow icon={<MapPin size={13} />}>{[profile.city, profile.country].filter(Boolean).join(', ')}</InfoRow>
                                            )}
                                        </div>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                            {profile.linkedinUrl && (
                                                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: COLORS.accent, textDecoration: 'none' }}>
                                                    <Linkedin size={14} /> LinkedIn
                                                </a>
                                            )}
                                            {profile.resumeDriveLink ? (
                                                <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer"
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: COLORS.accent, textDecoration: 'none' }}>
                                                    <FileText size={14} /> View Resume
                                                </a>
                                            ) : !isNewProfile && (
                                                <button onClick={() => handleEditProfile('resume')}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: COLORS.accent, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
                                                    <Plus size={13} /> Add Resume
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {(profile.target || profile.domain) && (
                                    <div style={{ paddingTop: '16px', borderTop: `1px solid ${COLORS.mutedBg}`, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                        <Target size={16} color={COLORS.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                                            <span style={{ fontWeight: 700, color: COLORS.primary }}>Target: </span>
                                            {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </SectionCard>

                        {/* Goals Card */}
                        <SectionCard title="Goals & Expectations" subtitle="What you'd like to achieve through Long Term Mentorship."
                            onEdit={handleEditGoals} editLabel="Edit Goals" isSaving={isSaving}
                            emptyState={(!profile.goals && !profile.expectations) ? { message: 'No goals or expectations set yet.', cta: 'Add Your Goals →' } : null}>
                            {(profile.goals || profile.expectations) && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {profile.goals && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                            <Target size={16} color={COLORS.accent} style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <div style={{ fontSize: '13px', color: '#475569' }}>
                                                <span style={{ fontWeight: 700, color: COLORS.primary, display: 'block', marginBottom: '2px' }}>Main Goal</span>
                                                {profile.goals}
                                            </div>
                                        </div>
                                    )}
                                    {profile.expectations && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                            <Heart size={16} color={COLORS.error} style={{ flexShrink: 0, marginTop: '2px' }} />
                                            <div style={{ fontSize: '13px', color: '#475569' }}>
                                                <span style={{ fontWeight: 700, color: COLORS.primary, display: 'block', marginBottom: '2px' }}>Mentor Support</span>
                                                {profile.expectations}
                                            </div>
                                        </div>
                                    )}
                                    {profile.targetCompanies?.length > 0 && (
                                        <div style={{ paddingTop: '12px', borderTop: `1px solid ${COLORS.mutedBg}` }}>
                                            <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.muted,  letterSpacing: '0.6px', margin: '0 0 8px' }}>Target Companies</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {profile.targetCompanies.map((c, i) => <TagPill key={i} label={c} variant="green" />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </SectionCard>

                        {/* Additional Details Card */}
                        <SectionCard title="Additional Details" onEdit={() => handleEditProfile('experience')} editLabel="Edit" isSaving={isSaving}
                            emptyState={detailItems.length === 0 && !profile.skills?.length && !profile.about ? { message: 'No additional details added yet.', cta: 'Complete Your Profile →' } : null}>
                            {(detailItems.length > 0 || profile.skills?.length > 0 || profile.about) && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {detailItems.length > 0 && (
                                        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                                            {detailItems.map((item, i) => (
                                                <div key={i}>
                                                    <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.muted,  letterSpacing: '0.6px', margin: '0 0 4px' }}>{item.label}</p>
                                                    <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.primary, margin: 0 }}>{item.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {profile.skills?.length > 0 && (
                                        <div>
                                            <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.muted, letterSpacing: '0.6px', margin: '0 0 8px' }}>Skills</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                {profile.skills.map((s, i) => <TagPill key={i} label={s} variant="blue" />)}
                                            </div>
                                        </div>
                                    )}
                                    {profile.about && (
                                        <div>
                                            <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.muted, letterSpacing: '0.6px', margin: '0 0 6px' }}>About</p>
                                            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{profile.about}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </SectionCard>
                    </div>

                    {/* Right sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Completion Card */}
                        <div style={{ background: COLORS.white, borderRadius: '10px', border: `1px solid ${COLORS.border}`, padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: COLORS.primary }}>Profile Completion</h3>
                                <span style={{ fontSize: '22px', fontWeight: 700, color: completionPercentage === 100 ? COLORS.success : COLORS.accent }}>
                                    {completionPercentage}%
                                </span>
                            </div>
                            <div style={{ width: '100%', background: COLORS.mutedBg, borderRadius: '3px', height: '6px', marginBottom: '18px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '6px', borderRadius: '3px', transition: 'width 0.7s ease',
                                    width: `${completionPercentage}%`,
                                    background: completionPercentage === 100 ? COLORS.success : COLORS.accent,
                                }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {completionSteps.map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {step.completed
                                            ? <CheckCircle size={17} color={COLORS.success} style={{ flexShrink: 0 }} />
                                            : <Circle size={17} color={COLORS.border} style={{ flexShrink: 0 }} />}
                                        <span style={{ fontSize: '13px', color: step.completed ? COLORS.primary : COLORS.muted, fontWeight: step.completed ? 600 : 400 }}>
                                            {step.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {completionPercentage < 100 ? (
                                <button onClick={() => handleEditProfile('about')} style={{
                                    width: '100%', marginTop: '18px', padding: '10px', background: COLORS.primary,
                                    color: COLORS.white, border: 'none', borderRadius: '6px',
                                    fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.2px',
                                }}>
                                    Complete Your Profile
                                </button>
                            ) : (
                                <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: COLORS.success }}>
                                    <CheckCircle size={18} />
                                    <span style={{ fontWeight: 700, fontSize: '13px' }}>Profile Complete!</span>
                                </div>
                            )}
                        </div>

                        {!isNewProfile && completionPercentage < 100 && (
                            <PendingDetailsCard profile={profile}
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
                userId={useremail._id}
                onPhotoUpload={setLivePhotoUrl}
            />
        </div>
    );
};

export default MentorshipProfile;