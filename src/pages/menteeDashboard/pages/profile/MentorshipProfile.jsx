// import React, { useState, useRef, useEffect, useCallback } from 'react';

// import {
//     Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle,
//     Camera, Trash2, Circle, Edit, Loader2, AlertCircle, ChevronRight,
//     AlertTriangle, FileText, MapPin, Briefcase, GraduationCap, User
// } from 'lucide-react';
// import {
//     useManageUserProfileQuery,
//     useSaveUserProfileMutation,
// } from "./Profilesecapislice";
// import { CiEdit } from "react-icons/ci";
// import Cookies from "js-cookie";
// import Loader from '../../../../global/Loader';
// import { storage } from "../../../../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// // ── DOMAIN OPTIONS ───────────────────────────────────────────────────────────
// const DOMAIN_OPTIONS = [
//     "Software Development",
//     "Data Science & AI",
//     "Cybersecurity",
//     "Cloud Computing",
//     "Networking & Infrastructure",
//     "Database Management",
//     "UI/UX & Product Design",
//     "Enterprise Applications",
//     "Microservices & DevOps",
//     "Blockchain & FinTech",
//     "Testing & Quality Assurance",
//     "IT Service Management",
//     "Business Intelligence",
//     "IoT (Internet of Things)",
// ];

// const TARGET_COMPANY_OPTIONS = [
//     "Service-Based Companies",
//     "Consulting Firms",
//     "Product-Based Companies",
//     "Startups & Scaleups",
//     "Core Engineering & R&D",
//     "Financial & Banking IT",
//     "FAANG & MAANG",
// ];

// // ── MAPPERS ──────────────────────────────────────────────────────────────────
// const mapEducation = (val = '') => {
//     const map = {
//         bachelors: "Bachelor's Degree", bachelor: "Bachelor's Degree",
//         masters: "Master's Degree", master: "Master's Degree",
//         phd: "PhD", diploma: "Diploma",
//         highschool: "High School", 'high school': "High School", other: "Other",
//     };
//     return map[val.toLowerCase()] || val;
// };

// const mapStatus = (val = '') => {
//     const map = {
//         fresher: 'Fresher', student: 'Student',
//         employed: 'Working Professional', unemployed: 'Job Seeker',
//     };
//     return map[val.toLowerCase()] || val;
// };

// // ── TAG PILL ─────────────────────────────────────────────────────────────────
// const TagPill = ({ label, onRemove, color = 'blue' }) => {
//     const colors = {
//         blue: 'bg-blue-50 text-blue-700 border-blue-200',
//         indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
//         purple: 'bg-purple-50 text-purple-700 border-purple-200',
//         green: 'bg-green-50 text-green-700 border-green-200',
//     };
//     return (
//         <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
//             {label}
//             {onRemove && (
//                 <button onClick={onRemove} className="ml-0.5 hover:opacity-70 transition-opacity leading-none text-base">×</button>
//             )}
//         </span>
//     );
// };

// // ── TAG INPUT ROW ─────────────────────────────────────────────────────────────
// const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
//     <div className="flex gap-2 mt-2">
//         <input
//             value={value}
//             onChange={e => onChange(e.target.value)}
//             onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
//             placeholder={placeholder}
//             className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//         />
//         <button
//             type="button"
//             onClick={onAdd}
//             className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0"
//         >
//             Add
//         </button>
//     </div>
// );

// // ── DROPDOWN TAG SELECTOR ─────────────────────────────────────────────────────
// const DropdownTagSelector = ({ options, selected, onAdd, placeholder, allowOther = false }) => {
//     const [val, setVal] = useState('');
//     const [customVal, setCustomVal] = useState('');
//     const available = options.filter(o => !selected.includes(o));
//     const isOther = val === '__other__';

//     const handleAdd = () => {
//         const finalVal = isOther ? customVal.trim() : val;
//         if (finalVal && !selected.includes(finalVal)) {
//             onAdd(finalVal);
//             setVal('');
//             setCustomVal('');
//         }
//     };

//     return (
//         <div className="mt-2 space-y-2">
//             <div className="flex gap-2">
//                 <select
//                     value={val}
//                     onChange={e => { setVal(e.target.value); setCustomVal(''); }}
//                     className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition"
//                 >
//                     <option value="">{placeholder || 'Select an option'}</option>
//                     {available.map(o => <option key={o} value={o}>{o}</option>)}
//                     {allowOther && <option value="__other__">Other (specify below)</option>}
//                 </select>
//                 {!isOther && (
//                     <button
//                         type="button"
//                         onClick={handleAdd}
//                         disabled={!val}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
//                     >
//                         Add
//                     </button>
//                 )}
//             </div>
//             {isOther && (
//                 <div className="flex gap-2">
//                     <input
//                         value={customVal}
//                         onChange={e => setCustomVal(e.target.value)}
//                         onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
//                         placeholder="Type your custom option..."
//                         className="flex-1 min-w-0 px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-blue-50/40 transition"
//                         autoFocus
//                     />
//                     <button
//                         type="button"
//                         onClick={handleAdd}
//                         disabled={!customVal.trim()}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
//                     >
//                         Add
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// // ── FORM FIELD ────────────────────────────────────────────────────────────────
// const FormField = ({ label, required, children, hint, error }) => (
//     <div className="flex flex-col gap-1">
//         <label className="text-sm font-semibold text-gray-800">
//             {label}{required && <span className="text-red-500 ml-0.5">*</span>}
//         </label>
//         {children}
//         {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
//         {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
//     </div>
// );

// // ── PROFILE PHOTO UPLOAD ──────────────────────────────────────────────────────
// const MAX_MB = 5;
// const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// const ProfilePhotoUpload = ({ currentUrl = '', onUpload, userId = 'user' }) => {
//     const [progress, setProgress] = useState(0);
//     const [status, setStatus] = useState('idle');
//     const [errMsg, setErrMsg] = useState('');
//     const [preview, setPreview] = useState(currentUrl);
//     const [dragging, setDragging] = useState(false);
//     const inputRef = useRef(null);

//     useEffect(() => { setPreview(currentUrl); }, [currentUrl]);

//     const handleFile = useCallback((file) => {
//         if (!file) return;
//         if (!ALLOWED_TYPES.includes(file.type)) { setErrMsg('Only JPG, PNG, WebP allowed.'); setStatus('error'); return; }
//         if (file.size > MAX_MB * 1024 * 1024) { setErrMsg(`Max ${MAX_MB}MB allowed.`); setStatus('error'); return; }

//         setPreview(URL.createObjectURL(file));
//         setStatus('uploading'); setProgress(0); setErrMsg('');

//         const ext = file.name.split('.').pop();
//         const task = uploadBytesResumable(
//             ref(storage, `profilePhotos/${userId}/${Date.now()}.${ext}`),
//             file
//         );

//         task.on('state_changed',
//             snap => setProgress(Math.round(snap.bytesTransferred / snap.totalBytes * 100)),
//             () => { setErrMsg('Upload failed. Try again.'); setStatus('error'); setPreview(currentUrl); },
//             async () => {
//                 try {
//                     const url = await getDownloadURL(task.snapshot.ref);
//                     setPreview(url); setStatus('done'); onUpload?.(url);
//                 } catch { setErrMsg('Could not get download URL.'); setStatus('error'); }
//             }
//         );
//     }, [userId, currentUrl, onUpload]);

//     const onDrop = useCallback(e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }, [handleFile]);
//     const onDragOver = e => { e.preventDefault(); setDragging(true); };
//     const onDragLeave = () => setDragging(false);

//     const clear = (e) => {
//         e?.stopPropagation();
//         setPreview(''); setStatus('idle'); setProgress(0); setErrMsg('');
//         onUpload?.('');
//         if (inputRef.current) inputRef.current.value = '';
//     };

//     const isUploading = status === 'uploading';
//     const isDone = status === 'done';
//     const isError = status === 'error';

//     return (
//         <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-gray-800">Profile Photo</label>
//             <div
//                 onDrop={onDrop}
//                 onDragOver={onDragOver}
//                 onDragLeave={onDragLeave}
//                 onClick={() => !isUploading && inputRef.current?.click()}
//                 className={`w-full rounded-xl border-2 border-dashed cursor-pointer transition-colors
//                     ${dragging ? 'border-blue-400 bg-blue-50/40' : ''}
//                     ${isError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-blue-400 bg-gray-50/40'}`}
//             >
//                 <input
//                     ref={inputRef}
//                     type="file"
//                     accept={ALLOWED_TYPES.join(',')}
//                     className="hidden"
//                     onChange={e => handleFile(e.target.files?.[0])}
//                 />

//                 {preview ? (
//                     <div className="flex items-center gap-4 p-4">
//                         <div className="relative flex-shrink-0">
//                             <img
//                                 src={preview}
//                                 alt="preview"
//                                 className={`w-16 h-16 rounded-full object-cover border-2 ${isDone ? 'border-green-500' : 'border-gray-200'}`}
//                                 onError={e => e.target.style.display = 'none'}
//                             />
//                             {isDone && (
//                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
//                                     <CheckCircle size={10} className="text-white" />
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                             {isUploading ? (
//                                 <>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <Loader2 size={13} className="animate-spin text-blue-600" />
//                                         <span className="text-sm font-medium text-gray-600">Uploading… {progress}%</span>
//                                     </div>
//                                     <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                                         <div className="h-1.5 bg-blue-600 rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
//                                     </div>
//                                 </>
//                             ) : isDone ? (
//                                 <><p className="text-sm font-semibold text-green-600">Photo uploaded!</p><p className="text-xs text-gray-400">Click to replace</p></>
//                             ) : (
//                                 <><p className="text-sm font-medium text-gray-600">Photo ready</p><p className="text-xs text-gray-400">Click to replace</p></>
//                             )}
//                         </div>
//                         {/* {!isUploading && (
//                             <button type="button" onClick={clear} className="flex-shrink-0 p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors">
//                                 <X size={13} />
//                             </button>
//                         )} */}
//                     </div>
//                 ) : (
//                     <div className="text-center py-6 px-4">
//                         <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-3">
//                             <Camera size={18} className="text-blue-600" />
//                         </div>
//                         <p className="text-sm font-semibold text-gray-700 mb-0.5">
//                             {dragging ? 'Drop to upload' : 'Upload Profile Photo'}
//                         </p>
//                         <p className="text-xs text-gray-400">Drag & drop or click · JPG PNG WebP · Max {MAX_MB}MB</p>
//                     </div>
//                 )}
//             </div>
//             {isError && errMsg && (
//                 <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errMsg}</p>
//             )}
//         </div>
//     );
// };
// // ── EDIT MODAL ────────────────────────────────────────────────────────────────
// const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving, userId, onPhotoUpload }) => {
//     const [currentSection, setCurrentSection] = useState(section);
//     const [formData, setFormData] = useState({
//         fullName: '', email: '', phone: '', city: '', country: '', linkedinUrl: '',
//         domain: '', role: '', yearsOfExperience: '', currentCompany: '',
//         previousCompanies: [], skills: [], about: '', availability: '',
//         highestEducation: '', schoolCollegeName: '', mainGoals: '',
//         targetDomains: [], targetCompanies: [], prepTimeline: '', mentorHelp: '',
//         resumeDriveLink: '', profilePhotoUrl: '',
//     });
//     const [inputValues, setInputValues] = useState({ skill: '', previousCompany: '', customDomain: '', customTargetDomain: '' });
//     const [errors, setErrors] = useState({});
//     const [driveLinkError, setDriveLinkError] = useState('');
//     const charCount = (text) => text.trim().length;

//     useEffect(() => { setCurrentSection(section); }, [section]);

//     useEffect(() => {
//         const isFresher = (profileData?.currentStatus || '').toLowerCase() === 'fresher';

//         if (isOpen && profileData) {
//             setFormData({
//                 fullName: profileData.fullName || '',
//                 email: profileData.email || '',
//                 phone: String(profileData.phone || ''),
//                 city: profileData.city || '',
//                 country: profileData.country || '',
//                 linkedinUrl: profileData.linkedinUrl || '',
//                 domain: profileData.domain || '',
//                 role: profileData.role || '',
//                 yearsOfExperience: isFresher ? 0 : (profileData.yearsOfExperience != null ? profileData.yearsOfExperience : ''),
//                 currentCompany: profileData.currentCompany || '',
//                 previousCompanies: Array.isArray(profileData.previousCompanies) ? profileData.previousCompanies : [],
//                 skills: Array.isArray(profileData.skills) ? profileData.skills : [],
//                 about: profileData.about || '',
//                 availability: profileData.availability || '',
//                 highestEducation: profileData.highestEducation || '',
//                 schoolCollegeName: profileData.schoolCollegeName || '',
//                 mainGoals: profileData.goals || '',
//                 targetDomains: Array.isArray(profileData.targetDomains) ? profileData.targetDomains : [],
//                 targetCompanies: Array.isArray(profileData.targetCompanies) ? profileData.targetCompanies : [],
//                 prepTimeline: profileData.prepTimeline || '',
//                 mentorHelp: profileData.expectations || '',
//                 resumeDriveLink: profileData.resumeDriveLink || '',
//                 profilePhotoUrl: profileData.profilePhotoUrl || '',
//             });
//             setErrors({});
//             setDriveLinkError('');
//         }
//     }, [isOpen, profileData]);

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//         if (name === 'resumeDriveLink') setDriveLinkError('');
//     };

//     const validateDriveLink = (url) =>
//         !url || [/drive\.google\.com/, /docs\.google\.com/].some(p => p.test(url));

//     const validateAbout = () => {
//         const errs = {};
//         const name = String(formData.fullName || '').trim();
//         const email = String(formData.email || '').trim();
//         const phone = String(formData.phone || '').trim();
//         const linkedin = String(formData.linkedinUrl || '').trim();

//         if (!name) errs.fullName = 'Full name is required.';
//         if (!email) errs.email = 'Email is required.';
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email address.';
//         if (!phone) errs.phone = 'Phone number is required.';
//         else if (!/^[+]?[\d\s\-().]{7,20}$/.test(phone)) errs.phone = 'Enter a valid phone number.';
//         if (linkedin && !/^https?:\/\/(www\.)?linkedin\.com\//.test(linkedin))
//             errs.linkedinUrl = 'Enter a valid LinkedIn URL.';
//         return errs;
//     };

//     const validateExperience = () => {
//         const errs = {};
//         if (!formData.domain || !formData.domain.trim()) errs.domain = 'Please select or enter a domain.';
//         if (!formData.role.trim()) errs.role = 'Current role is required.';
//         if (formData.yearsOfExperience === '' || formData.yearsOfExperience === null || formData.yearsOfExperience === undefined)
//             errs.yearsOfExperience = 'Years of experience is required.';
//         else if (Number(formData.yearsOfExperience) < 0) errs.yearsOfExperience = 'Cannot be negative.';
//         if (!formData.highestEducation) errs.highestEducation = 'Please select education level.';
//         return errs;
//     };

//     const validateResume = () => {
//         const errs = {};
//         if (formData.resumeDriveLink && !validateDriveLink(formData.resumeDriveLink)) {
//             errs.resumeDriveLink = 'Please enter a valid Google Drive link.';
//             setDriveLinkError('Please enter a valid Google Drive link.');
//         }
//         return errs;
//     };

//     const validateGoals = () => {
//         const errs = {};
//         if (!formData.mainGoals) errs.mainGoals = 'Please select your main goal.';
//         if (formData.targetCompanies.length === 0) errs.targetCompanies = 'Add at least one target company.';
//         if (!formData.mentorHelp.trim()) errs.mentorHelp = 'Please describe what mentor support you need.';
//         return errs;
//     };

//     const addItem = (type, value) => {
//         const v = (value !== undefined ? value : inputValues[type])?.trim();
//         if (!v) return;
//         const keyMap = { skill: 'skills', previousCompany: 'previousCompanies' };
//         setFormData(prev => ({ ...prev, [keyMap[type]]: [...prev[keyMap[type]], v] }));
//         setInputValues(prev => ({ ...prev, [type]: '' }));
//     };

//     const addTagItem = (key, value) => {
//         if (!value) return;
//         setFormData(prev => ({ ...prev, [key]: [...prev[key], value] }));
//         if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
//     };

//     const removeItem = (key, index) => {
//         setFormData(prev => ({ ...prev, [key]: prev[key].filter((_, i) => i !== index) }));
//     };

//     const prepareDataForSection = () => {
//         if (currentSection === 'about') {
//             return {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 city: formData.city,
//                 country: formData.country,
//                 linkedinUrl: formData.linkedinUrl,
//                 profilePhotoUrl: formData.profilePhotoUrl,
//             };
//         } else if (currentSection === 'experience') {
//             return {
//                 domain: formData.domain,
//                 role: formData.role,
//                 yearsOfExperience: formData.yearsOfExperience,
//                 currentCompany: formData.currentCompany,
//                 previousCompanies: formData.previousCompanies,
//                 skills: formData.skills,
//                 about: formData.about,
//                 availability: formData.availability,
//                 highestEducation: formData.highestEducation,
//                 schoolCollegeName: formData.schoolCollegeName,
//             };
//         } else if (currentSection === 'resume') {
//             return { resumeDriveLink: formData.resumeDriveLink };
//         } else if (currentSection === 'goals') {
//             return {
//                 goals: formData.mainGoals,
//                 targetDomains: formData.targetDomains,
//                 targetCompanies: formData.targetCompanies,
//                 prepTimeline: formData.prepTimeline,
//                 expectations: formData.mentorHelp,
//             };
//         }
//         return {};
//     };

//     const runValidation = () => {
//         let errs = {};
//         if (currentSection === 'about') errs = validateAbout();
//         else if (currentSection === 'experience') errs = validateExperience();
//         else if (currentSection === 'resume') errs = validateResume();
//         else if (currentSection === 'goals') errs = validateGoals();
//         setErrors(errs);
//         return Object.keys(errs).length === 0;
//     };

//     const handleSave = async (shouldClose = true) => {
//         if (!runValidation()) return;
//         try { await onSave(prepareDataForSection(), shouldClose); } catch (e) { console.error(e); }
//     };

//     const handleSaveAndContinue = async () => {
//         if (!runValidation()) return;
//         const order = ['about', 'experience', 'resume', 'goals'];
//         const idx = order.indexOf(currentSection);
//         try {
//             await onSave(prepareDataForSection(), false);
//             if (idx < order.length - 1) {
//                 setCurrentSection(order[idx + 1]);
//                 setErrors({});
//             }
//         } catch (e) { console.error(e); }
//     };

//     const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition";
//     const inputErrClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'}`;
//     const selectClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'}`;

//     const navItems = [
//         { id: 'about', label: 'About', icon: <User size={15} /> },
//         { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
//         { id: 'resume', label: 'Resume', icon: <FileText size={15} /> },
//         { id: 'goals', label: 'Goals', icon: <Target size={15} /> },
//     ];

//     const renderAboutSection = () => (
//         <div className="space-y-5">
//             <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Basic Information</h3>

//             <ProfilePhotoUpload
//                 currentUrl={formData.profilePhotoUrl || ''}
//                 onUpload={async url => {
//                     setFormData(prev => ({ ...prev, profilePhotoUrl: url }));
//                     onPhotoUpload?.(url);
//                     if (url) {
//                         await onSave({ profilePhotoUrl: url }, false);
//                     }
//                 }}
//                 userId={userId}
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <FormField label="Full Name" required error={errors.fullName}>
//                     <input name="fullName" type="text" value={formData.fullName} onChange={handleChange}
//                         placeholder="Enter your full name" className={inputErrClass('fullName')} />
//                 </FormField>
//                 <FormField label="Email" required error={errors.email}>
//                     <input name="email" type="email" value={formData.email} onChange={handleChange}
//                         placeholder="your.email@example.com" className={inputErrClass('email')} />
//                 </FormField>
//                 <FormField label="Phone" required error={errors.phone}>
//                     <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
//                         placeholder="+91 1234567890" className={inputErrClass('phone')} />
//                 </FormField>
//                 <FormField label="LinkedIn URL" error={errors.linkedinUrl}>
//                     <input name="linkedinUrl" type="url" value={formData.linkedinUrl} onChange={handleChange}
//                         placeholder="https://linkedin.com/in/yourprofile" className={inputErrClass('linkedinUrl')} />
//                 </FormField>
//                 <FormField label="City">
//                     <input name="city" type="text" value={formData.city} onChange={handleChange}
//                         placeholder="Enter city" className={inputClass} />
//                 </FormField>
//                 <FormField label="Country">
//                     <input name="country" type="text" value={formData.country} onChange={handleChange}
//                         placeholder="Enter country" className={inputClass} />
//                 </FormField>
//             </div>
//         </div>
//     );

//     const renderExperienceSection = () => {
//         const isFresher = (profileData?.currentStatus || '').toLowerCase() === 'fresher';

//         return (
//             <div className="space-y-5">
//                 <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Professional Experience</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <FormField label="Domain" required error={errors.domain}>
//                         <select
//                             value={DOMAIN_OPTIONS.includes(formData.domain) || formData.domain === '' ? formData.domain : '__other__'}
//                             onChange={e => {
//                                 const v = e.target.value;
//                                 if (v === '__other__') {
//                                     setFormData(prev => ({ ...prev, domain: inputValues.customDomain || '' }));
//                                 } else {
//                                     setFormData(prev => ({ ...prev, domain: v }));
//                                     setInputValues(prev => ({ ...prev, customDomain: '' }));
//                                 }
//                                 if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
//                             }}
//                             className={selectClass('domain')}
//                         >
//                             <option value="">Select a domain</option>
//                             {DOMAIN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
//                             <option value="__other__">Other (specify below)</option>
//                         </select>
//                         {!DOMAIN_OPTIONS.includes(formData.domain) && formData.domain !== '' && (
//                             <input
//                                 value={formData.domain}
//                                 onChange={e => {
//                                     setFormData(prev => ({ ...prev, domain: e.target.value }));
//                                     if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
//                                 }}
//                                 placeholder="Describe your domain..."
//                                 className="mt-2 w-full px-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-blue-50/40 transition"
//                             />
//                         )}
//                     </FormField>

//                     <FormField label="Current Role" required error={errors.role}>
//                         <input name="role" value={formData.role} onChange={handleChange}
//                             placeholder="e.g., Frontend Developer" className={inputErrClass('role')} />
//                     </FormField>

//                     <FormField
//                         label="Years of Experience"
//                         required
//                         hint={isFresher ? undefined : "Enter 0 if you're a student or fresher"}
//                         error={errors.yearsOfExperience}
//                     >
//                         {isFresher ? (
//                             <div>
//                                 <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-blue-200 bg-blue-50">
//                                     <CheckCircle size={14} className="text-blue-600 flex-shrink-0" />
//                                     <span className="text-sm font-semibold text-blue-800">0 years</span>
//                                     <span className="ml-auto text-xs text-white px-2 py-0.5 rounded-full font-medium">Fresher</span>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                                     <AlertCircle size={11} />Auto-filled as 0 because your profile status is Fresher.
//                                 </p>
//                                 <input type="hidden" name="yearsOfExperience" value={0} />
//                             </div>
//                         ) : (
//                             <input
//                                 name="yearsOfExperience"
//                                 type="number"
//                                 min="0"
//                                 value={formData.yearsOfExperience}
//                                 onChange={handleChange}
//                                 placeholder="e.g., 3"
//                                 className={inputErrClass('yearsOfExperience')}
//                             />
//                         )}
//                     </FormField>

//                     {!isFresher && (
//                         <FormField label="Current Company">
//                             <input name="currentCompany" value={formData.currentCompany} onChange={handleChange}
//                                 placeholder="e.g., Infosys" className={inputClass} />
//                         </FormField>
//                     )}
//                     <FormField label="Highest Education" required error={errors.highestEducation}>
//                         <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className={selectClass('highestEducation')}>
//                             <option value="">Select education level</option>
//                             {["High School", "Diploma", "Bachelors Degree", "Masters Degree", "PhD", "Other"].map(o => (
//                                 <option key={o} value={o}>{o}</option>
//                             ))}
//                         </select>
//                     </FormField>

//                     <FormField label="School / College Name">
//                         <input name="schoolCollegeName" value={formData.schoolCollegeName} onChange={handleChange}
//                             placeholder="e.g., IIT Bombay" className={inputClass} />
//                     </FormField>
//                 </div>

//                 <FormField label="Skills">
//                     <TagInputRow
//                         placeholder="Add a skill (e.g., React, Python)"
//                         value={inputValues.skill}
//                         onChange={v => setInputValues(p => ({ ...p, skill: v }))}
//                         onAdd={() => addItem('skill')}
//                     />
//                     {formData.skills.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mt-2">
//                             {formData.skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => removeItem('skills', i)} color="blue" />)}
//                         </div>
//                     )}
//                 </FormField>

//                 {!isFresher && (
//                     <FormField label="Previous Companies">
//                         <TagInputRow
//                             placeholder="Add a previous company"
//                             value={inputValues.previousCompany}
//                             onChange={v => setInputValues(p => ({ ...p, previousCompany: v }))}
//                             onAdd={() => addItem('previousCompany')}
//                         />
//                         {formData.previousCompanies.length > 0 && (
//                             <div className="flex flex-wrap gap-2 mt-2">
//                                 {formData.previousCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('previousCompanies', i)} color="indigo" />)}
//                             </div>
//                         )}
//                     </FormField>
//                 )}

//                 <FormField label="About You">
//                     <textarea
//                         name="about"
//                         value={formData.about}
//                         onChange={(e) => { if (e.target.value.length <= 500) handleChange(e); }}
//                         rows={3}
//                         placeholder="Brief description about yourself..."
//                         className={`${inputClass} resize-none`}
//                     />
//                     <div className="flex justify-between mt-1">
//                         <span className={`text-xs ${charCount(formData.about) < 50 && formData.about ? 'text-red-500' : 'text-gray-500'}`}>
//                             {charCount(formData.about) < 50 && formData.about
//                                 ? `Minimum 50 characters required (${charCount(formData.about)}/50)` : ''}
//                         </span>
//                         <span className={`text-xs ${charCount(formData.about) > 450 ? 'text-blue-600' : 'text-gray-500'}`}>
//                             {charCount(formData.about)}/500
//                         </span>
//                     </div>
//                 </FormField>
//             </div>
//         );
//     };

//     const renderResumeSection = () => (
//         <div className="space-y-4">
//             <div>
//                 <h3 className="text-sm font-bold text-gray-800">Resume & Documents</h3>
//                 <p className="text-xs text-gray-500 mt-0.5">Share your resume with mentors for better guidance</p>
//             </div>

//             <div className="rounded-xl border border-blue-100 overflow-hidden">
//                 <div className="bg-blue-600 px-4 py-2 flex items-center gap-2">
//                     <FileText size={13} className="text-white flex-shrink-0" />
//                     <span className="text-xs font-bold text-white tracking-wide uppercase">How to get your Drive link</span>
//                 </div>
//                 <div className="bg-blue-50 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {[
//                         "Upload your resume (PDF/DOC) to Google Drive",
//                         'Right-click the file → "Get link"',
//                         'Set access to "Anyone with the link"',
//                         "Copy the link and paste it below",
//                     ].map((step, i) => (
//                         <div key={i} className="flex items-start gap-2">
//                             <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
//                             <p className="text-xs text-blue-900 leading-relaxed">{step}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <FormField label="Google Drive Resume Link" error={errors.resumeDriveLink}>
//                 <input
//                     name="resumeDriveLink" type="url" value={formData.resumeDriveLink}
//                     onChange={handleChange} placeholder="https://drive.google.com/file/d/..."
//                     className={inputErrClass('resumeDriveLink')}
//                 />
//             </FormField>

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                 <p className="text-[11px] text-gray-500 leading-relaxed">Your resume is only shared with mentors you connect with.</p>
//                 {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
//                     <a href={formData.resumeDriveLink} target="_blank" rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
//                         <FileText size={13} /> Preview Resume →
//                     </a>
//                 )}
//             </div>
//         </div>
//     );

//     const renderGoalsSection = () => (
//         <div className="space-y-5">
//             <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Career Goals & Expectations</h3>

//             <FormField label="Main Goals" required error={errors.mainGoals}>
//                 <select name="mainGoals" value={formData.mainGoals} onChange={handleChange} className={selectClass('mainGoals')}>
//                     <option value="">Select your main goal</option>
//                     {[
//                         "Employed, looking to switch to another company",
//                         "Unemployed, looking for a job",
//                         "Student, preparing for placements",
//                         "Career transition", "Skill development", "Interview preparation",
//                     ].map(o => <option key={o} value={o}>{o}</option>)}
//                 </select>
//             </FormField>

//             <FormField label="Target Companies" required error={errors.targetCompanies}>
//                 <DropdownTagSelector
//                     options={TARGET_COMPANY_OPTIONS}
//                     selected={formData.targetCompanies}
//                     onAdd={(v) => addTagItem('targetCompanies', v)}
//                     placeholder="Select a company type"
//                     allowOther={true}
//                 />
//                 {formData.targetCompanies.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-2">
//                         {formData.targetCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('targetCompanies', i)} color="green" />)}
//                     </div>
//                 )}
//             </FormField>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <FormField label="Preparation Timeline">
//                     <select name="prepTimeline" value={formData.prepTimeline} onChange={handleChange} className={selectClass('prepTimeline')}>
//                         <option value="">Select timeline</option>
//                         {["1 month", "3 months", ">=6 months", "None"].map(o => <option key={o} value={o}>{o}</option>)}
//                     </select>
//                 </FormField>
//             </div>

//             <FormField label="How do you want your Mentor to help?" required hint="Be specific about what kind of support you're looking for." error={errors.mentorHelp}>
//                 <textarea
//                     name="mentorHelp" value={formData.mentorHelp} onChange={handleChange}
//                     rows={4} placeholder="Describe the support you're looking for from a mentor..."
//                     className={`${errors.mentorHelp ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'} w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition resize-none`}
//                 />
//             </FormField>
//         </div>
//     );

//     const renderContent = () => {
//         switch (currentSection) {
//             case 'about': return renderAboutSection();
//             case 'experience': return renderExperienceSection();
//             case 'resume': return renderResumeSection();
//             case 'goals': return renderGoalsSection();
//             default: return renderAboutSection();
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
//             <div className="bg-white w-full sm:rounded-xl sm:max-w-3xl max-h-screen sm:max-h-[92vh] flex flex-col shadow-2xl sm:my-4">
//                 <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
//                     <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
//                         <CiEdit className="text-blue-600 text-xl" /> Edit Profile
//                     </h2>
//                     <button onClick={onClose} disabled={isSaving} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
//                         <X size={18} />
//                     </button>
//                 </div>

//                 <div className="flex flex-1 min-h-0 flex-col sm:flex-row sm:min-h-[450px]">                    <div className="sm:w-48 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50/40 sm:rounded-bl-xl">
//                     <nav className="flex sm:flex-col gap-1 p-3 overflow-x-auto sm:overflow-x-visible">
//                         {navItems.map(({ id, label, icon }) => (
//                             <button
//                                 key={id} type="button"
//                                 onClick={() => { setCurrentSection(id); setErrors({}); }}
//                                 className={`flex items-center gap-2 flex-shrink-0 sm:flex-shrink px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
//                                         ${currentSection === id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
//                             >
//                                 {icon}
//                                 <span>{label}</span>
//                             </button>
//                         ))}
//                     </nav>
//                 </div>

//                     <div className="flex-1 min-h-0 overflow-y-auto p-5">
//                         {renderContent()}
//                     </div>
//                 </div>

//                 <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 flex-shrink-0 sm:rounded-b-xl">
//                     <button
//                         type="button" onClick={onClose} disabled={isSaving}
//                         className="px-5 py-2.5 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 text-center"
//                     >
//                         Cancel
//                     </button>
//                     <div className="flex gap-3">
//                         <button
//                             type="button" onClick={() => handleSave(true)} disabled={isSaving}
//                             className="flex-1 sm:flex-none px-5 py-2.5 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                         >
//                             {isSaving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : 'Save'}
//                         </button>
//                         {currentSection !== 'goals' && (
//                             <button
//                                 type="button" onClick={handleSaveAndContinue} disabled={isSaving}
//                                 className="flex-1 sm:flex-none px-5 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                             >
//                                 {isSaving
//                                     ? <><Loader2 size={14} className="animate-spin" />Saving...</>
//                                     : <>Save & Continue <ChevronRight size={14} /></>}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ── PENDING DETAILS CARD ───────────────────────────────────────────────────────
// const PendingDetailsCard = ({ profile, onEditProfile, onEditGoals }) => {
//     const pendingItems = [];
//     if (!profile.phone) pendingItems.push({ label: 'Phone number', action: onEditProfile });
//     if (!profile.city || !profile.country) pendingItems.push({ label: 'Location (city & country)', action: onEditProfile });
//     if (!profile.linkedinUrl) pendingItems.push({ label: 'LinkedIn URL', action: onEditProfile });
//     if (!profile.domain) pendingItems.push({ label: 'Professional domain', action: onEditProfile });
//     if (profile.yearsOfExperience == null) pendingItems.push({ label: 'Years of experience', action: onEditProfile });
//     if (!profile.highestEducation) pendingItems.push({ label: 'Education level', action: onEditProfile });
//     if (!profile.schoolCollegeName) pendingItems.push({ label: 'Institution name', action: onEditProfile });
//     if (!profile.resumeDriveLink) pendingItems.push({ label: 'Resume (Google Drive link)', action: onEditProfile });
//     if (!profile.goals) pendingItems.push({ label: 'Main career goal', action: onEditGoals });
//     if (!profile.expectations) pendingItems.push({ label: 'Mentor expectations', action: onEditGoals });

//     if (pendingItems.length === 0) return null;

//     return (
//         <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
//             <div className="bg-blue-50 px-5 py-4 flex items-center gap-2">
//                 <AlertTriangle className="text-blue-600 flex-shrink-0" size={18} />
//                 <h3 className="text-sm font-bold text-gray-800 flex-1">Pending Details</h3>
//                 <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingItems.length}</span>
//             </div>
//             <div className="px-5 py-3">
//                 <p className="text-xs text-gray-500 mb-3">Complete these to improve your visibility with mentors.</p>
//                 <ul className="divide-y divide-gray-50">
//                     {pendingItems.map((item, index) => (
//                         <li key={index}>
//                             <button onClick={item.action} className="w-full flex items-center gap-3 py-2.5 text-left group">
//                                 <span className="w-2 h-2 rounded-full bg-blue-300 flex-shrink-0" />
//                                 <span className="text-sm text-gray-600 flex-1 group-hover:text-blue-600 transition-colors">{item.label}</span>
//                                 <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// // ── INFO ROW ──────────────────────────────────────────────────────────────────
// const InfoRow = ({ icon, children }) => (
//     <div className="flex items-center gap-2 text-gray-600 text-sm min-w-0">
//         <span className="flex-shrink-0 text-gray-400">{icon}</span>
//         <span className="truncate">{children}</span>
//     </div>
// );

// // ── SECTION CARD ──────────────────────────────────────────────────────────────
// const SectionCard = ({ title, subtitle, onEdit, editLabel = 'Edit', isSaving, children, emptyState }) => (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-50">
//             <div className="min-w-0">
//                 <h2 className="text-lg font-bold text-gray-900">{title}</h2>
//                 {subtitle && <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>}
//             </div>
//             <button
//                 onClick={onEdit} disabled={isSaving}
//                 className="flex-shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
//             >
//                 {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Edit size={14} />}
//                 {isSaving ? 'Saving...' : editLabel}
//             </button>
//         </div>
//         <div className="px-6 py-5">
//             {children || (emptyState && (
//                 <div className="text-center py-8">
//                     <p className="text-gray-400 text-sm mb-3">{emptyState.message}</p>
//                     <button onClick={onEdit} className="text-blue-600 hover:text-blue-700 font-medium text-sm">{emptyState.cta}</button>
//                 </div>
//             ))}
//         </div>
//     </div>
// );

// // ── MAIN COMPONENT ────────────────────────────────────────────────────────────
// const MentorshipProfile = () => {
//     const [isEditingProfile, setIsEditingProfile] = useState(false);
//     const [isEditingGoals, setIsEditingGoals] = useState(false);
//     const [editSection, setEditSection] = useState('about');
//     const [livePhotoUrl, setLivePhotoUrl] = useState('');

//     const userData = JSON.parse(Cookies.get("userData") || "{}");
//     const useremail = JSON.parse(localStorage.getItem("userData") || "{}");

//     const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(useremail._id);
//     const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

//     const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;
//     const googleUser = apiResponse?.googleUser || null;

//     useEffect(() => {
//         if (profileData === null && apiResponse?.message === "Profile not found") {
//             setEditSection('about');
//             setIsEditingProfile(true);
//         }
//     }, [profileData, apiResponse]);

//     const handleEditProfile = (section = 'about') => {
//         setEditSection(section);
//         setIsEditingProfile(true);
//     };
//     const handleEditGoals = () => { setEditSection('goals'); setIsEditingGoals(true); };
//     const handleCloseModal = () => { setIsEditingProfile(false); setIsEditingGoals(false); };

//     const handleSave = async (updatedData, shouldClose = true) => {
//         try {
//             await saveProfile({
//                 id: useremail._id,
//                 userId: useremail.username,
//                 ...updatedData
//             }).unwrap();
//             await refetch();
//             if (shouldClose) setTimeout(handleCloseModal, 200);
//         } catch {
//             if (shouldClose) alert("Failed to save profile. Please try again.");
//         }
//     };
//     if (isLoading) return (
//         <div className="min-h-screen bg-white flex items-center justify-center">
//             <div className="text-center"><Loader /></div>
//         </div>
//     );

//     if (isError && apiResponse?.message !== "Profile not found") return (
//         <div className="min-h-screen bg-white flex items-center justify-center p-4">
//             <div className="bg-white rounded-xl shadow-sm p-8 max-w-sm w-full text-center ">
//                 <AlertCircle className="text-red-400 h-12 w-12 mx-auto mb-4" />
//                 <h2 className="text-xl font-bold text-gray-900 mb-2">Couldn't Load Profile</h2>
//                 <p className="text-gray-500 text-sm mb-5">{error?.data?.message || "Please try again."}</p>
//             </div>
//         </div>
//     );

//     // ── Build unified profile object ─────────────────────────────────────────
//     const profile = {
//         fullName: profileData?.fullName || useremail?.name || '',
//         email: profileData?.email || useremail?.email || '',
//         phone: profileData?.phone || useremail?.phone || '',
//         city: profileData?.city || (userData?.address !== 'N/A' ? userData?.address : '') || '',
//         country: profileData?.country || '',
//         state: profileData?.state || '',
//         currentStatus: profileData?.currentStatus || '',
//         highestEducation: profileData?.highestEducation || (userData?.education ? mapEducation(userData.education) : ''),
//         role: profileData?.role || (() => {
//             if (userData?.role === 1) return 'Mentee';
//             if (userData?.role === 2) return 'Mentor';
//             if (userData?.status) return mapStatus(userData.status);
//             return '';
//         })(),
//         yearsOfExperience: (profileData?.yearsOfExperience != null)
//             ? profileData.yearsOfExperience
//             : ((profileData?.currentStatus || '').toLowerCase() === 'fresher' ? 0 : null),
//         domain: profileData?.domain || '',
//         linkedinUrl: profileData?.linkedinUrl || '',
//         skills: Array.isArray(profileData?.skills) ? profileData.skills : [],
//         about: profileData?.about || '',
//         goals: profileData?.goals || '',
//         expectations: profileData?.expectations || '',
//         availability: profileData?.availability || '',
//         target: profileData?.target || '',
//         currentCompany: profileData?.currentCompany || '',
//         previousCompanies: Array.isArray(profileData?.previousCompanies) ? profileData.previousCompanies : [],
//         schoolCollegeName: profileData?.schoolCollegeName || '',
//         targetDomains: Array.isArray(profileData?.targetDomains) ? profileData.targetDomains : [],
//         targetCompanies: Array.isArray(profileData?.targetCompanies) ? profileData.targetCompanies : [],
//         prepTimeline: profileData?.prepTimeline || '',
//         resumeDriveLink: profileData?.resumeDriveLink || '',
//         profilePhotoUrl: livePhotoUrl || profileData?.profilePhotoUrl || '',
//     };

//     const completionFields = [
//         profile.fullName,
//         profile.email,
//         profile.phone,
//         profile.city && profile.country,
//         profile.linkedinUrl,
//         profile.domain,
//         profile.yearsOfExperience != null,
//         profile.highestEducation,
//         profile.schoolCollegeName,
//         profile.resumeDriveLink,
//         profile.goals,
//         profile.expectations,
//     ];
//     const completionPercentage = Math.round(completionFields.filter(Boolean).length / completionFields.length * 100);

//     const completionSteps = [
//         { label: "Basic Information", completed: !!(profile.fullName && profile.email && profile.phone) },
//         { label: "Experience & Domain", completed: !!(profile.yearsOfExperience != null && profile.domain) },
//         { label: "Resume & LinkedIn", completed: !!(profile.linkedinUrl || profile.resumeDriveLink) },
//         { label: "Goals & Expectations", completed: !!(profile.goals && profile.expectations) },
//     ];

//     const isNewProfile = profileData === null;

//     const avatarSrc = profile.profilePhotoUrl || googleUser?.profile || '';
//     const initials = (profile.fullName || userData?.name || 'U')
//         .split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');

//     const detailItems = [
//         profile.city || profile.country ? { label: 'Location', value: [profile.city, profile.country].filter(Boolean).join(', '), icon: <MapPin size={15} /> } : null,
//         profile.domain ? { label: 'Domain', value: profile.domain, icon: <Briefcase size={15} /> } : null,
//         profile.yearsOfExperience != null ? { label: 'Experience', value: `${profile.yearsOfExperience} ${profile.yearsOfExperience === 1 ? 'year' : 'years'}`, icon: <Briefcase size={15} /> } : null,
//         profile.currentCompany ? { label: 'Current Company', value: profile.currentCompany, icon: <Briefcase size={15} /> } : null,
//         profile.highestEducation ? { label: 'Education', value: profile.highestEducation, icon: <GraduationCap size={15} /> } : null,
//         profile.schoolCollegeName ? { label: 'Institution', value: profile.schoolCollegeName, icon: <GraduationCap size={15} /> } : null,
//         profile.availability ? { label: 'Availability', value: profile.availability, icon: <User size={15} /> } : null,
//     ].filter(Boolean);

//     return (
//         <div className="min-h-screen bg-white">
//             <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

//                 {isNewProfile && (
//                     <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 mb-6 text-white">
//                         <h2 className="text-xl font-bold mb-1">Welcome! Let's set up your profile 👋</h2>
//                         <p className="text-white/90 text-sm">Complete your profile to get matched with the best mentors for your goals.</p>
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

//                     <div className="lg:col-span-2 space-y-5">

//                         <SectionCard
//                             title="My Profile"
//                             subtitle="Your profile is shared with mentors. Keep it updated."
//                             onEdit={() => handleEditProfile('about')}
//                             editLabel="Edit Profile"
//                             isSaving={isSaving}
//                         >
//                             <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">

//                                 <div className="relative flex-shrink-0">
//                                     {avatarSrc ? (
//                                         <img
//                                             src={avatarSrc}
//                                             alt="Profile"
//                                             className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 object-cover bg-gray-100"
//                                             onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
//                                         />
//                                     ) : null}
//                                     <div
//                                         className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 bg-blue-100 items-center justify-center"
//                                         style={{ display: avatarSrc ? 'none' : 'flex' }}
//                                     >
//                                         <span className="text-blue-700 font-bold text-xl sm:text-2xl">{initials}</span>
//                                     </div>

//                                     <button
//                                         onClick={() => handleEditProfile('about')}
//                                         title="Change photo"
//                                         className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-white text-white flex items-center justify-center shadow transition-colors"
//                                     >
//                                         <Camera size={13} />
//                                     </button>
//                                 </div>

//                                 <div className="flex-1 min-w-0 space-y-3">
//                                     <div className="flex flex-wrap items-center gap-2">
//                                         <h3 className="text-xl font-bold text-gray-900 truncate">
//                                             {profile.fullName || <span className="text-gray-400 italic font-normal text-base">No name added</span>}
//                                         </h3>
//                                         {profile.role && (
//                                             <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{profile.role}</span>
//                                         )}
//                                     </div>

//                                     <div className="flex flex-wrap gap-x-5 gap-y-2">
//                                         {profile.email && <InfoRow icon={<Mail size={14} />}>{profile.email}</InfoRow>}
//                                         {profile.phone && <InfoRow icon={<Phone size={14} />}>{profile.phone}</InfoRow>}
//                                         {(profile.city || profile.country) && (
//                                             <InfoRow icon={<MapPin size={14} />}>{[profile.city, profile.country].filter(Boolean).join(', ')}</InfoRow>
//                                         )}
//                                     </div>

//                                     <div className="flex flex-wrap gap-3">
//                                         {profile.linkedinUrl && (
//                                             <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
//                                                 className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
//                                                 <Linkedin size={14} /> LinkedIn
//                                             </a>
//                                         )}
//                                         {profile.resumeDriveLink ? (
//                                             <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer"
//                                                 className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
//                                                 <FileText size={14} /> View Resume
//                                             </a>
//                                         ) : !isNewProfile && (
//                                             <button
//                                                 onClick={() => handleEditProfile('resume')}
//                                                 className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
//                                             >
//                                                 <Plus size={13} /> Add Resume
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {(profile.target || profile.domain) && (
//                                 <div className="mt-5 pt-5 border-t border-gray-100 flex items-start gap-3">
//                                     <Target className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
//                                     <p className="text-sm text-gray-700">
//                                         <span className="font-semibold text-gray-900">Target: </span>
//                                         {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
//                                     </p>
//                                 </div>
//                             )}
//                         </SectionCard>

//                         <SectionCard
//                             title="Goals & Expectations"
//                             subtitle="What you'd like to achieve through Long Term Mentorship."
//                             onEdit={handleEditGoals}
//                             editLabel="Edit Goals"
//                             isSaving={isSaving}
//                             emptyState={(!profile.goals && !profile.expectations) ? { message: 'No goals or expectations set yet.', cta: 'Add Your Goals →' } : null}
//                         >
//                             {(profile.goals || profile.expectations) && (
//                                 <div className="space-y-5">
//                                     {profile.goals && (
//                                         <div className="flex items-start gap-3">
//                                             <Target className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
//                                             <div className="text-sm text-gray-700">
//                                                 <span className="font-semibold text-gray-900 block mb-0.5">Main Goal</span>
//                                                 {profile.goals}
//                                             </div>
//                                         </div>
//                                     )}
//                                     {profile.expectations && (
//                                         <div className="flex items-start gap-3">
//                                             <Heart className="text-red-400 flex-shrink-0 mt-0.5" size={18} />
//                                             <div className="text-sm text-gray-700">
//                                                 <span className="font-semibold text-gray-900 block mb-0.5">Mentor Support</span>
//                                                 {profile.expectations}
//                                             </div>
//                                         </div>
//                                     )}
//                                     {profile.targetCompanies?.length > 0 && (
//                                         <div className="pt-3 border-t border-gray-50">
//                                             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Companies</p>
//                                             <div className="flex flex-wrap gap-1.5">
//                                                 {profile.targetCompanies.map((c, i) => <TagPill key={i} label={c} color="green" />)}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </SectionCard>

//                         <SectionCard
//                             title="Additional Details"
//                             onEdit={() => handleEditProfile('experience')}
//                             editLabel="Edit"
//                             isSaving={isSaving}
//                             emptyState={detailItems.length === 0 && !profile.skills?.length && !profile.about ? {
//                                 message: 'No additional details added yet.',
//                                 cta: 'Complete Your Profile →'
//                             } : null}
//                         >
//                             {(detailItems.length > 0 || profile.skills?.length > 0 || profile.about) && (
//                                 <div className="space-y-5">
//                                     {detailItems.length > 0 && (
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                             {detailItems.map((item, i) => (
//                                                 <div key={i}>
//                                                     <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
//                                                     <p className="text-sm text-gray-900 font-medium">{item.value}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                     {profile.skills?.length > 0 && (
//                                         <div>
//                                             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Skills</p>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {profile.skills.map((s, i) => <TagPill key={i} label={s} color="blue" />)}
//                                             </div>
//                                         </div>
//                                     )}
//                                     {profile.about && (
//                                         <div>
//                                             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">About</p>
//                                             <p className="text-sm text-gray-700 leading-relaxed">{profile.about}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </SectionCard>
//                     </div>

//                     <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="font-bold text-gray-900">Profile Completion</h3>
//                                 <span className={`text-xl font-bold ${completionPercentage === 100 ? 'text-green-500' : 'text-blue-600'}`}>
//                                     {completionPercentage}%
//                                 </span>
//                             </div>
//                             <div className="w-full bg-gray-100 rounded-full h-2 mb-5 overflow-hidden">
//                                 <div
//                                     className={`h-2 rounded-full transition-all duration-700 ${completionPercentage === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
//                                     style={{ width: `${completionPercentage}%` }}
//                                 />
//                             </div>
//                             <div className="space-y-3">
//                                 {completionSteps.map((step, i) => (
//                                     <div key={i} className="flex items-center gap-3">
//                                         {step.completed
//                                             ? <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
//                                             : <Circle className="text-gray-200 flex-shrink-0" size={18} />}
//                                         <span className={`text-sm ${step.completed ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
//                                             {step.label}
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>
//                             {completionPercentage < 100 ? (
//                                 <button
//                                     onClick={() => handleEditProfile('about')}
//                                     className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
//                                 >
//                                     Complete Your Profile
//                                 </button>
//                             ) : (
//                                 <div className="mt-5 flex items-center justify-center gap-2 text-green-600 py-2">
//                                     <CheckCircle size={20} />
//                                     <span className="font-semibold text-sm">Profile Complete!</span>
//                                 </div>
//                             )}
//                         </div>

//                         {!isNewProfile && completionPercentage < 100 && (
//                             <PendingDetailsCard
//                                 profile={profile}
//                                 onEditProfile={() => handleEditProfile('about')}
//                                 onEditGoals={handleEditGoals}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <EditProfileModal
//                 isOpen={isEditingProfile || isEditingGoals}
//                 onClose={handleCloseModal}
//                 section={editSection}
//                 profileData={profile}
//                 onSave={handleSave}
//                 isSaving={isSaving}
//                 userId={useremail._id}
//                 onPhotoUpload={setLivePhotoUrl}
//             />
//         </div>
//     );
// };

// export default MentorshipProfile;

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

const COLORS = {
    primary: '#0098cc',
    primaryDark: '#007aa8',
    primaryLight: '#f0f8ff',
    error: '#ef4444',
    success: '#10b981',
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
        blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
        green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    };
    const style = variants[variant];
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${style.bg} ${style.text} ${style.border}`}>
            {label}
            {onRemove && (
                <button onClick={onRemove} className="ml-0.5 hover:opacity-70 transition-opacity leading-none text-base">×</button>
            )}
        </span>
    );
};

const FormField = ({ label, required, children, hint, error }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-800">
            {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
);

const InfoRow = ({ icon, children }) => (
    <div className="flex items-center gap-2 text-gray-600 text-sm min-w-0">
        <span className="flex-shrink-0 text-gray-400">{icon}</span>
        <span className="truncate">{children}</span>
    </div>
);

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
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">Profile Photo</label>
            <div
                onDrop={onDrop}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => !isUploading && inputRef.current?.click()}
                className={`w-full rounded-xl border-2 border-dashed cursor-pointer transition-colors
                    ${dragging ? 'border-blue-400 bg-blue-50/40' : ''}
                    ${isError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-blue-400 bg-gray-50/40'}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={ALLOWED_TYPES.join(',')}
                    className="hidden"
                    onChange={e => handleFile(e.target.files?.[0])}
                />

                {preview ? (
                    <div className="flex items-center gap-4 p-4">
                        <div className="relative flex-shrink-0">
                            <img
                                src={preview}
                                alt="preview"
                                className={`w-16 h-16 rounded-full object-cover border-2 ${isDone ? 'border-green-500' : 'border-gray-200'}`}
                                onError={e => e.target.style.display = 'none'}
                            />
                            {isDone && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                                    <CheckCircle size={10} className="text-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            {isUploading ? (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Loader2 size={13} className="animate-spin" style={{ color: COLORS.primary }} />
                                        <span className="text-sm font-medium text-gray-600">Uploading… {progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-1.5 rounded-full transition-all duration-200" style={{ width: `${progress}%`, backgroundColor: COLORS.primary }} />
                                    </div>
                                </>
                            ) : isDone ? (
                                <><p className="text-sm font-semibold text-green-600">Photo uploaded!</p><p className="text-xs text-gray-400">Click to replace</p></>
                            ) : (
                                <><p className="text-sm font-medium text-gray-600">Photo ready</p><p className="text-xs text-gray-400">Click to replace</p></>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 px-4">
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary }}>
                            <Camera size={18} style={{ color: COLORS.primary }} />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-0.5">
                            {dragging ? 'Drop to upload' : 'Upload Profile Photo'}
                        </p>
                        <p className="text-xs text-gray-400">Drag & drop or click · JPG PNG WebP · Max {MAX_MB}MB</p>
                    </div>
                )}
            </div>
            {isError && errMsg && (
                <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errMsg}</p>
            )}
        </div>
    );
};

// ── TAG INPUT ROW ─────────────────────────────────────────────────────────────
const TagInputRow = ({ placeholder, value, onChange, onAdd }) => (
    <div className="flex gap-2 mt-2">
        <input
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
            placeholder={placeholder}
            className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
            style={{ "--tw-ring-color": COLORS.primary }}
        />
        <button
            type="button"
            onClick={onAdd}
            className="px-3 py-2 text-white rounded-lg transition-colors text-sm font-medium flex-shrink-0"
            style={{ backgroundColor: COLORS.primary }}
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
                    className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none bg-white transition"
                    style={{ "--tw-ring-color": COLORS.primary }}
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
                        className="px-3 py-2 text-white rounded-lg transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        Add
                    </button>
                )}
            </div>
            {isOther && (
                <div className="flex gap-2">
                    <input
                        value={customVal}
                        onChange={e => setCustomVal(e.target.value)}
                        onKeyPress={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                        placeholder="Type your custom option..."
                        className="flex-1 min-w-0 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
                        style={{ borderColor: `${COLORS.primary}50`, backgroundColor: `${COLORS.primaryLight}40`, "--tw-ring-color": COLORS.primary }}
                        autoFocus
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!customVal.trim()}
                        className="px-3 py-2 text-white rounded-lg transition-colors text-sm font-medium flex-shrink-0 disabled:opacity-40"
                        style={{ backgroundColor: COLORS.primary }}
                    >
                        Add
                    </button>
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
            return {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                country: formData.country,
                linkedinUrl: formData.linkedinUrl,
                profilePhotoUrl: formData.profilePhotoUrl,
            };
        } else if (currentSection === 'experience') {
            return {
                domain: formData.domain,
                role: formData.role,
                yearsOfExperience: formData.yearsOfExperience,
                currentCompany: formData.currentCompany,
                previousCompanies: formData.previousCompanies,
                skills: formData.skills,
                about: formData.about,
                availability: formData.availability,
                highestEducation: formData.highestEducation,
                schoolCollegeName: formData.schoolCollegeName,
            };
        } else if (currentSection === 'resume') {
            return { resumeDriveLink: formData.resumeDriveLink };
        } else if (currentSection === 'goals') {
            return {
                goals: formData.mainGoals,
                targetDomains: formData.targetDomains,
                targetCompanies: formData.targetCompanies,
                prepTimeline: formData.prepTimeline,
                expectations: formData.mentorHelp,
            };
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

    const inputClass = "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent outline-none transition";
    const inputErrClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${errors[field] ? 'border-red-400' : 'border-gray-200'}`;
    const selectClass = (field) => `w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition bg-white ${errors[field] ? 'border-red-400' : 'border-gray-200'}`;

    const navItems = [
        { id: 'about', label: 'About', icon: <User size={15} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
        { id: 'resume', label: 'Resume', icon: <FileText size={15} /> },
        { id: 'goals', label: 'Goals', icon: <Target size={15} /> },
    ];

    const renderAboutSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Basic Information</h3>
            <ProfilePhotoUpload
                currentUrl={formData.profilePhotoUrl || ''}
                onUpload={async url => {
                    setFormData(prev => ({ ...prev, profilePhotoUrl: url }));
                    onPhotoUpload?.(url);
                    if (url) await onSave({ profilePhotoUrl: url }, false);
                }}
                userId={userId}
            />
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

    const renderExperienceSection = () => {
        const isFresher = (profileData?.currentStatus || '').toLowerCase() === 'fresher';
        return (
            <div className="space-y-5">
                <h3 className="text-base font-bold text-gray-800 pb-2 border-b border-gray-100">Professional Experience</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        {!DOMAIN_OPTIONS.includes(formData.domain) && formData.domain !== '' && (
                            <input
                                value={formData.domain}
                                onChange={e => {
                                    setFormData(prev => ({ ...prev, domain: e.target.value }));
                                    if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
                                }}
                                placeholder="Describe your domain..."
                                className="mt-2 w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition"
                                style={{ borderColor: `${COLORS.primary}50`, backgroundColor: `${COLORS.primaryLight}40`, "--tw-ring-color": COLORS.primary }}
                            />
                        )}
                    </FormField>

                    <FormField label="Current Role" required error={errors.role}>
                        <input name="role" value={formData.role} onChange={handleChange}
                            placeholder="e.g., Frontend Developer" className={inputErrClass('role')} />
                    </FormField>

                    <FormField
                        label="Years of Experience"
                        required
                        hint={isFresher ? undefined : "Enter 0 if you're a student or fresher"}
                        error={errors.yearsOfExperience}
                    >
                        {isFresher ? (
                            <div>
                                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border" style={{ borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight }}>
                                    <CheckCircle size={14} style={{ color: COLORS.primary }} className="flex-shrink-0" />
                                    <span className="text-sm font-semibold" style={{ color: COLORS.primary }}>0 years</span>
                                    <span className="ml-auto text-xs text-white px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: COLORS.primary }}>Fresher</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <AlertCircle size={11} />Auto-filled as 0 because your profile status is Fresher.
                                </p>
                                <input type="hidden" name="yearsOfExperience" value={0} />
                            </div>
                        ) : (
                            <input
                                name="yearsOfExperience"
                                type="number"
                                min="0"
                                value={formData.yearsOfExperience}
                                onChange={handleChange}
                                placeholder="e.g., 3"
                                className={inputErrClass('yearsOfExperience')}
                            />
                        )}
                    </FormField>

                    {!isFresher && (
                        <FormField label="Current Company">
                            <input name="currentCompany" value={formData.currentCompany} onChange={handleChange}
                                placeholder="e.g., Infosys" className={inputClass} />
                        </FormField>
                    )}
                    <FormField label="Highest Education" required error={errors.highestEducation}>
                        <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className={selectClass('highestEducation')}>
                            <option value="">Select education level</option>
                            {["High School", "Diploma", "Bachelors Degree", "Masters Degree", "PhD", "Other"].map(o => (
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
                            {formData.skills.map((s, i) => <TagPill key={i} label={s} onRemove={() => removeItem('skills', i)} variant="blue" />)}
                        </div>
                    )}
                </FormField>

                {!isFresher && (
                    <FormField label="Previous Companies">
                        <TagInputRow
                            placeholder="Add a previous company"
                            value={inputValues.previousCompany}
                            onChange={v => setInputValues(p => ({ ...p, previousCompany: v }))}
                            onAdd={() => addItem('previousCompany')}
                        />
                        {formData.previousCompanies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.previousCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('previousCompanies', i)} variant="indigo" />)}
                            </div>
                        )}
                    </FormField>
                )}

                <FormField label="About You">
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={(e) => { if (e.target.value.length <= 500) handleChange(e); }}
                        rows={3}
                        placeholder="Brief description about yourself..."
                        className={`${inputClass} resize-none`}
                    />
                    <div className="flex justify-between mt-1">
                        <span className={`text-xs ${formData.about.trim().length < 50 && formData.about ? 'text-red-500' : 'text-gray-500'}`}>
                            {formData.about.trim().length < 50 && formData.about
                                ? `Minimum 50 characters required (${formData.about.trim().length}/50)` : ''}
                        </span>
                        <span className={`text-xs ${formData.about.trim().length > 450 ? 'text-blue-600' : 'text-gray-500'}`}>
                            {formData.about.trim().length}/500
                        </span>
                    </div>
                </FormField>
            </div>
        );
    };

    const renderResumeSection = () => (
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-bold text-gray-800">Resume & Documents</h3>
                <p className="text-xs text-gray-500 mt-0.5">Share your resume with mentors for better guidance</p>
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ borderColor: COLORS.primary }}>
                <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.primary }}>
                    <FileText size={13} className="text-white flex-shrink-0" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">How to get your Drive link</span>
                </div>
                <div className="px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ backgroundColor: COLORS.primaryLight }}>
                    {[
                        "Upload your resume (PDF/DOC) to Google Drive",
                        'Right-click the file → "Get link"',
                        'Set access to "Anyone with the link"',
                        "Copy the link and paste it below",
                    ].map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: COLORS.primary }}>{i + 1}</span>
                            <p className="text-xs leading-relaxed" style={{ color: COLORS.primary }}>  {step}</p>
                        </div>
                    ))}
                </div>
            </div>

            <FormField label="Google Drive Resume Link" error={errors.resumeDriveLink}>
                <input
                    name="resumeDriveLink" type="url" value={formData.resumeDriveLink}
                    onChange={handleChange} placeholder="https://drive.google.com/file/d/..."
                    className={inputErrClass('resumeDriveLink')}
                />
            </FormField>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-[11px] text-gray-500 leading-relaxed">Your resume is only shared with mentors you connect with.</p>
                {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
                    <a href={formData.resumeDriveLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold border px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                        style={{ color: COLORS.primary, borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight }}>
                        <FileText size={13} /> Preview Resume →
                    </a>
                )}
            </div>
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
                        {formData.targetCompanies.map((c, i) => <TagPill key={i} label={c} onRemove={() => removeItem('targetCompanies', i)} variant="green" />)}
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
                    className={`${errors.mentorHelp ? 'border-red-400' : 'border-gray-200'} w-full px-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:border-transparent outline-none transition resize-none`}
                    style={{ "--tw-ring-color": COLORS.primary }}
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
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <CiEdit className="text-xl" style={{ color: COLORS.primary }} /> Edit Profile
                    </h2>
                    <button onClick={onClose} disabled={isSaving} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0 flex-col sm:flex-row sm:min-h-[450px]">
                    <div className="sm:w-48 flex-shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50/40 sm:rounded-bl-xl">
                        <nav className="flex sm:flex-col gap-1 p-3 overflow-x-auto sm:overflow-x-visible">
                            {navItems.map(({ id, label, icon }) => (
                                <button
                                    key={id} type="button"
                                    onClick={() => { setCurrentSection(id); setErrors({}); }}
                                    className={`flex items-center gap-2 flex-shrink-0 sm:flex-shrink px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                                        ${currentSection === id ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'}`}
                                    style={currentSection === id ? { backgroundColor: COLORS.primary } : {}}
                                >
                                    {icon}
                                    <span>{label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto p-5">
                        {renderContent()}
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 flex-shrink-0 sm:rounded-b-xl">
                    <button
                        type="button" onClick={onClose} disabled={isSaving}
                        className="px-5 py-2.5 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 text-center"
                    >
                        Cancel
                    </button>
                    <div className="flex gap-3">
                        <button
                            type="button" onClick={() => handleSave(true)} disabled={isSaving}
                            className="flex-1 sm:flex-none px-5 py-2.5 text-sm rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}
                        >
                            {isSaving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : 'Save'}
                        </button>
                        {currentSection !== 'goals' && (
                            <button
                                type="button" onClick={handleSaveAndContinue} disabled={isSaving}
                                className="flex-1 sm:flex-none px-5 py-2.5 text-sm text-white rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                style={{ backgroundColor: COLORS.primary }}
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
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: `${COLORS.primary}40` }}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ backgroundColor: COLORS.primaryLight }}>
                <AlertTriangle style={{ color: COLORS.primary }} className="flex-shrink-0" size={18} />
                <h3 className="text-sm font-bold text-gray-800 flex-1">Pending Details</h3>
                <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: COLORS.primary }}>{pendingItems.length}</span>
            </div>
            <div className="px-5 py-3">
                <p className="text-xs text-gray-500 mb-3">Complete these to improve your visibility with mentors.</p>
                <ul className="divide-y divide-gray-50">
                    {pendingItems.map((item, index) => (
                        <li key={index}>
                            <button onClick={item.action} className="w-full flex items-center gap-3 py-2.5 text-left group">
                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: `${COLORS.primary}60` }} />
                                <span className="text-sm text-gray-600 flex-1 group-hover:transition-colors" style={{ "--group-hover-color": COLORS.primary }}>{item.label}</span>
                                <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-50">
            <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>}
            </div>
            <button
                onClick={onEdit} disabled={isSaving}
                className="flex-shrink-0 flex items-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: COLORS.primary }}
            >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Edit size={14} />}
                {isSaving ? 'Saving...' : editLabel}
            </button>
        </div>
        <div className="px-6 py-5">
            {children || (emptyState && (
                <div className="text-center py-8">
                    <p className="text-gray-400 text-sm mb-3">{emptyState.message}</p>
                    <button onClick={onEdit} className="font-medium text-sm" style={{ color: COLORS.primary }}>{emptyState.cta}</button>
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

    const handleEditProfile = (section = 'about') => {
        setEditSection(section);
        setIsEditingProfile(true);
    };
    const handleEditGoals = () => { setEditSection('goals'); setIsEditingGoals(true); };
    const handleCloseModal = () => { setIsEditingProfile(false); setIsEditingGoals(false); };

    const handleSave = async (updatedData, shouldClose = true) => {
        try {
            await saveProfile({
                id: useremail._id,
                userId: useremail.username,
                ...updatedData
            }).unwrap();
            await refetch();
            if (shouldClose) setTimeout(handleCloseModal, 200);
        } catch {
            if (shouldClose) alert("Failed to save profile. Please try again.");
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center"><Loader /></div>
        </div>
    );

    if (isError && apiResponse?.message !== "Profile not found") return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-sm p-8 max-w-sm w-full text-center ">
                <AlertCircle className="text-red-400 h-12 w-12 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Couldn't Load Profile</h2>
                <p className="text-gray-500 text-sm mb-5">{error?.data?.message || "Please try again."}</p>
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
        yearsOfExperience: (profileData?.yearsOfExperience != null)
            ? profileData.yearsOfExperience
            : ((profileData?.currentStatus || '').toLowerCase() === 'fresher' ? 0 : null),
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
    const avatarSrc = profile.profilePhotoUrl || googleUser?.profile || '';
    const initials = (profile.fullName || userData?.name || 'U')
        .split(' ').slice(0, 2).map(w => w[0].toUpperCase()).join('');

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
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

                {isNewProfile && (
                    <div className="rounded-xl p-6 mb-6 text-white" style={{ background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)` }}>
                        <h2 className="text-xl font-bold mb-1">Welcome! Let's set up your profile 👋</h2>
                        <p className="text-white/90 text-sm">Complete your profile to get matched with the best mentors for your goals.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

                    <div className="lg:col-span-2 space-y-5">

                        <SectionCard
                            title="My Profile"
                            subtitle="Your profile is shared with mentors. Keep it updated."
                            onEdit={() => handleEditProfile('about')}
                            editLabel="Edit Profile"
                            isSaving={isSaving}
                        >
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">

                                <div className="relative flex-shrink-0">
                                    {avatarSrc ? (
                                        <img
                                            src={avatarSrc}
                                            alt="Profile"
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 object-cover bg-gray-100"
                                            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <div
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 items-center justify-center"
                                        style={{ display: avatarSrc ? 'none' : 'flex', backgroundColor: COLORS.primaryLight }}
                                    >
                                        <span className="font-bold text-xl sm:text-2xl" style={{ color: COLORS.primary }}>{initials}</span>
                                    </div>

                                    <button
                                        onClick={() => handleEditProfile('about')}
                                        title="Change photo"
                                        className="absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 border-white text-white flex items-center justify-center shadow transition-colors hover:opacity-90"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <Camera size={13} />
                                    </button>
                                </div>

                                <div className="flex-1 min-w-0 space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-xl font-bold text-gray-900 truncate">
                                            {profile.fullName || <span className="text-gray-400 italic font-normal text-base">No name added</span>}
                                        </h3>
                                        {profile.role && (
                                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full" style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primary }}>{profile.role}</span>
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
                                                className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: COLORS.primary }}>
                                                <Linkedin size={14} /> LinkedIn
                                            </a>
                                        )}
                                        {profile.resumeDriveLink ? (
                                            <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: COLORS.primary }}>
                                                <FileText size={14} /> View Resume
                                            </a>
                                        ) : !isNewProfile && (
                                            <button
                                                onClick={() => handleEditProfile('resume')}
                                                className="inline-flex items-center gap-1 text-xs" style={{ color: COLORS.primary }}
                                            >
                                                <Plus size={13} /> Add Resume
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {(profile.target || profile.domain) && (
                                <div className="mt-5 pt-5 border-t border-gray-100 flex items-start gap-3">
                                    <Target style={{ color: COLORS.primary }} className="flex-shrink-0 mt-0.5" size={18} />
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Target: </span>
                                        {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
                                    </p>
                                </div>
                            )}
                        </SectionCard>

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
                                            <Target style={{ color: COLORS.primary }} className="flex-shrink-0 mt-0.5" size={18} />
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
                                    {profile.targetCompanies?.length > 0 && (
                                        <div className="pt-3 border-t border-gray-50">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Target Companies</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {profile.targetCompanies.map((c, i) => <TagPill key={i} label={c} variant="green" />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </SectionCard>

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
                                                {profile.skills.map((s, i) => <TagPill key={i} label={s} variant="blue" />)}
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

                    <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-gray-900">Profile Completion</h3>
                                <span className="text-xl font-bold" style={{ color: completionPercentage === 100 ? '#10b981' : COLORS.primary }}>
                                    {completionPercentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-5 overflow-hidden">
                                <div
                                    className="h-2 rounded-full transition-all duration-700"
                                    style={{ width: `${completionPercentage}%`, backgroundColor: completionPercentage === 100 ? '#10b981' : COLORS.primary }}
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
                                    className="w-full mt-5 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-colors text-sm"
                                    style={{ backgroundColor: COLORS.primary }}
                                >
                                    Complete Your Profile
                                </button>
                            ) : (
                                <div className="mt-5 flex items-center justify-center gap-2 py-2" style={{ color: '#10b981' }}>
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
                userId={useremail._id}
                onPhotoUpload={setLivePhotoUrl}
            />
        </div>
    );
};

export default MentorshipProfile;

