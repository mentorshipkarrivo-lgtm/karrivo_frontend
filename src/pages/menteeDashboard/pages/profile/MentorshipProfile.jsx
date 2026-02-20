// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle, Camera,
//     Trash2, Circle, Edit, Loader2, AlertCircle
// } from 'lucide-react';
// import {
//     useManageUserProfileQuery, useSaveUserProfileMutation, useUploadProfilePhotoMutation,
//     useDeleteProfilePhotoMutation
// } from "./Profilesecapislice"
// import { CiEdit, } from "react-icons/ci";




// const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving }) => {
//     const [currentSection, setCurrentSection] = useState(section);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         city: '',
//         country: '',
//         linkedinUrl: '',
//         domain: '',
//         role: '',
//         yearsOfExperience: '',
//         currentCompany: '',
//         previousCompanies: [],
//         skills: [],
//         about: '',
//         availability: '',
//         timezone: '',
//         highestEducation: '',
//         schoolCollegeName: '',
//         mainGoals: '',
//         targetDomains: [],
//         targetCompanies: [],
//         prepTimeline: '',
//         mentorHelp: '',
//     });

//     const [inputValues, setInputValues] = useState({
//         skill: '',
//         domain: '',
//         company: '',
//         previousCompany: ''
//     });

//     useEffect(() => {
//         setCurrentSection(section);
//     }, [section]);

//     useEffect(() => {
//         if (isOpen && profileData) {
//             setFormData({
//                 fullName: profileData.fullName || '',
//                 email: profileData.email || '',
//                 phone: profileData.phone || '',
//                 city: profileData.city || '',
//                 country: profileData.country || '',
//                 linkedinUrl: profileData.linkedinUrl || '',
//                 domain: profileData.domain || '',
//                 role: profileData.role || '',
//                 yearsOfExperience: profileData.yearsOfExperience !== null && profileData.yearsOfExperience !== undefined ? profileData.yearsOfExperience : '',
//                 currentCompany: profileData.currentCompany || '',
//                 previousCompanies: Array.isArray(profileData.previousCompanies) ? profileData.previousCompanies : [],
//                 skills: Array.isArray(profileData.skills) ? profileData.skills : [],
//                 about: profileData.about || '',
//                 availability: profileData.availability || '',
//                 timezone: profileData.timezone || '',
//                 highestEducation: profileData.highestEducation || '',
//                 schoolCollegeName: profileData.schoolCollegeName || '',
//                 mainGoals: profileData.goals || '',
//                 targetDomains: Array.isArray(profileData.targetDomains) ? profileData.targetDomains : [],
//                 targetCompanies: Array.isArray(profileData.targetCompanies) ? profileData.targetCompanies : [],
//                 prepTimeline: profileData.prepTimeline || '',
//                 mentorHelp: profileData.expectations || '',
//             });
//         }
//     }, [isOpen, profileData]);

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleInputChange = (field, value) => {
//         setInputValues(prev => ({ ...prev, [field]: value }));
//     };

//     const addItem = (type) => {
//         const value = inputValues[type]?.trim();
//         if (value) {
//             if (type === 'skill') {
//                 setFormData(prev => ({ ...prev, skills: [...prev.skills, value] }));
//             } else if (type === 'domain') {
//                 setFormData(prev => ({ ...prev, targetDomains: [...prev.targetDomains, value] }));
//             } else if (type === 'company') {
//                 setFormData(prev => ({ ...prev, targetCompanies: [...prev.targetCompanies, value] }));
//             } else if (type === 'previousCompany') {
//                 setFormData(prev => ({ ...prev, previousCompanies: [...prev.previousCompanies, value] }));
//             }
//             setInputValues(prev => ({ ...prev, [type]: '' }));
//         }
//     };

//     const removeItem = (type, index) => {
//         if (type === 'skill') {
//             setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
//         } else if (type === 'domain') {
//             setFormData(prev => ({ ...prev, targetDomains: prev.targetDomains.filter((_, i) => i !== index) }));
//         } else if (type === 'company') {
//             setFormData(prev => ({ ...prev, targetCompanies: prev.targetCompanies.filter((_, i) => i !== index) }));
//         } else if (type === 'previousCompany') {
//             setFormData(prev => ({ ...prev, previousCompanies: prev.previousCompanies.filter((_, i) => i !== index) }));
//         }
//     };

//     const prepareDataForSection = () => {
//         let dataToSave = {};

//         if (currentSection === 'about') {
//             dataToSave = {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 city: formData.city,
//                 country: formData.country,
//                 linkedinUrl: formData.linkedinUrl,
//             };
//         } else if (currentSection === 'experience') {
//             dataToSave = {
//                 domain: formData.domain,
//                 role: formData.role,
//                 yearsOfExperience: formData.yearsOfExperience,
//                 currentCompany: formData.currentCompany,
//                 previousCompanies: formData.previousCompanies,
//                 skills: formData.skills,
//                 about: formData.about,
//                 availability: formData.availability,
//                 timezone: formData.timezone,
//                 highestEducation: formData.highestEducation,
//                 schoolCollegeName: formData.schoolCollegeName,
//             };
//         } else if (currentSection === 'goals') {
//             dataToSave = {
//                 goals: formData.mainGoals,
//                 targetDomains: formData.targetDomains,
//                 targetCompanies: formData.targetCompanies,
//                 prepTimeline: formData.prepTimeline,
//                 expectations: formData.mentorHelp,
//             };
//         }

//         return dataToSave;
//     };

//     // Modified handleSave - now accepts a parameter to control modal closing
//     const handleSave = async (shouldCloseModal = true) => {
//         try {
//             const dataToSave = prepareDataForSection();
//             await onSave(dataToSave, shouldCloseModal);
//         } catch (error) {
//             console.error("Error saving:", error);
//         }
//     };

//     const handleSaveAndContinue = async () => {
//         const sectionOrder = ['about', 'experience', 'resume', 'goals'];
//         const currentIndex = sectionOrder.indexOf(currentSection);

//         try {
//             const dataToSave = prepareDataForSection();
//             // Save without closing modal
//             await onSave(dataToSave, false);

//             // Move to next section after successful save
//             if (currentIndex < sectionOrder.length - 1) {
//                 setCurrentSection(sectionOrder[currentIndex + 1]);
//             }
//         } catch (error) {
//             console.error("Error saving:", error);
//         }
//     };

//     const renderAboutSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter your full name"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="your.email@example.com"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="+91 1234567890"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         LinkedIn URL
//                     </label>
//                     <input
//                         type="url"
//                         name="linkedinUrl"
//                         value={formData.linkedinUrl}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="https://linkedin.com/in/yourprofile"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         City
//                     </label>
//                     <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter city"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Country
//                     </label>
//                     <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter country"
//                     />
//                 </div>
//             </div>
//         </div>
//     );

//     const renderExperienceSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Professional Experience</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Domain <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="domain"
//                         value={formData.domain}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Web Development, Data Science"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Current Role <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Software Developer, Student"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Years of Experience <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="number"
//                         name="yearsOfExperience"
//                         value={formData.yearsOfExperience}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="0"
//                         min="0"
//                         step="0.5"
//                         required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Enter 0 if you're a student or fresher</p>
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Current Company
//                     </label>
//                     <input
//                         type="text"
//                         name="currentCompany"
//                         value={formData.currentCompany}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Google, Amazon, or 'Student'"
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Highest Level of Education Achieved <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         name="highestEducation"
//                         value={formData.highestEducation}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                         required
//                     >
//                         <option value="">Select education level</option>
//                         <option value="High School">High School</option>
//                         <option value="Diploma">Diploma</option>
//                         <option value="Bachelor's Degree">Bachelor's Degree</option>
//                         <option value="Master's Degree">Master's Degree</option>
//                         <option value="PhD">PhD</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Name of School/College <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="schoolCollegeName"
//                         value={formData.schoolCollegeName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Indian Institute of Technology, Delhi"
//                         required
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Skills
//                     </label>
//                     <div className="flex gap-2 mb-2">
//                         <input
//                             type="text"
//                             value={inputValues.skill}
//                             onChange={(e) => handleInputChange('skill', e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skill'))}
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                             placeholder="Add a skill (e.g., React, Node.js, Python)"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => addItem('skill')}
//                             className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1.5 flex-shrink-0"
//                         >
//                             <Plus size={16} />
//                             Add
//                         </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.skills.map((skill, index) => (
//                             <span
//                                 key={index}
//                                 className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5"
//                             >
//                                 {skill}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeItem('skill', index)}
//                                     className="hover:text-blue-900 text-base"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const renderResumeSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Resume & Documents</h3>
//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Resume Upload
//                 </label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
//                     <div className="mb-3">
//                         <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                             <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                         </svg>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-1">Upload your resume</p>
//                     <p className="text-xs text-gray-500 mb-3">PDF, DOC, or DOCX (Max 5MB)</p>
//                     <input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         className="hidden"
//                         id="resume-upload"
//                         onChange={(e) => {
//                             console.log('File selected:', e.target.files[0]);
//                         }}
//                     />
//                     <label
//                         htmlFor="resume-upload"
//                         className="inline-block px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors"
//                     >
//                         Choose File
//                     </label>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                     Your resume will be shared with mentors when you apply for mentorship programs.
//                 </p>
//             </div>
//         </div>
//     );

//     const renderGoalsSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Career Goals & Expectations</h3>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Main Goals <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                     name="mainGoals"
//                     value={formData.mainGoals}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                     required
//                 >
//                     <option value="">Select your main goal</option>
//                     <option value="Employed, looking to switch to another company">Employed, looking to switch to another company</option>
//                     <option value="Unemployed, looking for a job">Unemployed, looking for a job</option>
//                     <option value="Student, preparing for placements">Student, preparing for placements</option>
//                     <option value="Career transition">Career transition</option>
//                     <option value="Skill development">Skill development</option>
//                     <option value="Interview preparation">Interview preparation</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Target Domains <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                     <input
//                         type="text"
//                         value={inputValues.domain}
//                         onChange={(e) => handleInputChange('domain', e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('domain'))}
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Frontend Developer, Backend Developer, Data Scientist"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => addItem('domain')}
//                         className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
//                     >
//                         <Plus size={16} />
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     {formData.targetDomains.map((domain, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
//                         >
//                             {domain}
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem('domain', index)}
//                                 className="hover:text-purple-900 text-base"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Target Companies <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                     <input
//                         type="text"
//                         value={inputValues.company}
//                         onChange={(e) => handleInputChange('company', e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('company'))}
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., MAANG, Startups, Product Based Companies"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => addItem('company')}
//                         className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
//                     >
//                         <Plus size={16} />
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     {formData.targetCompanies.map((company, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
//                         >
//                             {company}
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem('company', index)}
//                                 className="hover:text-green-900 text-base"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Expected Preparation Timeline
//                 </label>
//                 <select
//                     name="prepTimeline"
//                     value={formData.prepTimeline}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                 >
//                     <option value="">Select timeline</option>
//                     <option value="Upto 1 month">Up to 1 month</option>
//                     <option value="1-3 months">1-3 months</option>
//                     <option value="3-6 months">3-6 months</option>
//                     <option value="6-12 months">6-12 months</option>
//                     <option value="12+ months">12+ months</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     How do you want your Mentor to help in your Long Term Mentorship? <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     name="mentorHelp"
//                     value={formData.mentorHelp}
//                     onChange={handleChange}
//                     rows={5}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
//                     placeholder="Describe your expectations from the mentor. For example:&#10;- Help with interview preparation&#10;- Career guidance and roadmap planning&#10;- Technical skill development&#10;- Resume and portfolio review&#10;- Mock interviews&#10;- Networking and industry insights"
//                     required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                     Be specific about what kind of support you're looking for from your mentor.
//                 </p>
//             </div>
//         </div>
//     );

//     const renderContent = () => {
//         switch (currentSection) {
//             case 'about':
//                 return renderAboutSection();
//             case 'experience':
//                 return renderExperienceSection();
//             case 'resume':
//                 return renderResumeSection();
//             case 'goals':
//                 return renderGoalsSection();
//             default:
//                 return renderAboutSection();
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
//             <div className="bg-white rounded-lg w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-none flex flex-col">
//                 <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
//                         <span className="text-xl sm:text-2xl"><CiEdit /></span>
//                         <span className="hidden xs:inline">Edit Profile</span>
//                         <span className="xs:hidden">Edit</span>
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         disabled={isSaving}
//                         className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
//                     >
//                         <X size={18} className="sm:w-5 sm:h-5" />
//                     </button>
//                 </div>

//                 <div className="flex flex-col lg:flex-row">
//                     <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
//                         <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-3 space-x-2 lg:space-x-0 lg:space-y-1.5">
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentSection('about')}
//                                 className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === 'about'
//                                     ? 'bg-[#ea580c] text-white font-medium'
//                                     : 'text-gray-600 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 About
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentSection('experience')}
//                                 className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === 'experience'
//                                     ? 'bg-[#ea580c] text-white font-medium'
//                                     : 'text-gray-600 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 <span className="hidden sm:inline">Experience & Education</span>
//                                 <span className="sm:hidden">Experience</span>
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentSection('resume')}
//                                 className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === 'resume'
//                                     ? 'bg-[#ea580c] text-white font-medium'
//                                     : 'text-gray-600 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 Resume
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setCurrentSection('goals')}
//                                 className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === 'goals'
//                                     ? 'bg-[#ea580c] text-white font-medium'
//                                     : 'text-gray-600 hover:bg-gray-200'
//                                     }`}
//                             >
//                                 <span className="hidden sm:inline">Goals & Expectations</span>
//                                 <span className="sm:hidden">Goals</span>
//                             </button>
//                         </nav>
//                     </div>

//                     <div className="flex-1 p-4 sm:p-5 max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-16rem)] overflow-y-auto">
//                         {renderContent()}
//                     </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         disabled={isSaving}
//                         className="w-full sm:w-32 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Cancel
//                     </button>

//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <button
//                             type="button"
//                             onClick={() => handleSave(true)}
//                             disabled={isSaving}
//                             className="w-full sm:w-32 px-4 py-2 text-sm border border-[#ea580c] text-[#ea580c] rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {isSaving ? (
//                                 <>
//                                     <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#ea580c] border-t-transparent"></div>
//                                     Saving...
//                                 </>
//                             ) : (
//                                 'Save'
//                             )}
//                         </button>

//                         {currentSection !== 'goals' && (
//                             <button
//                                 type="button"
//                                 onClick={handleSaveAndContinue}
//                                 disabled={isSaving}
//                                 className="w-full sm:w-40 px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                             >
//                                 {isSaving ? (
//                                     <>
//                                         <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
//                                         Saving...
//                                     </>
//                                 ) : (
//                                     <>
//                                         Save & Continue
//                                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </>
//                                 )}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const MentorshipProfile = () => {
//     const [isEditingProfile, setIsEditingProfile] = useState(false);
//     const [isEditingGoals, setIsEditingGoals] = useState(false);
//     const [editSection, setEditSection] = useState('about');
//     const fileInputRef = useRef(null);
//     const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();
//     const [deletePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();


//     const userData = JSON.parse(localStorage.getItem("userData"));

//     const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(userData.username);
//     const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

//     const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;

//     useEffect(() => {
//         if (profileData === null && apiResponse?.message === "Profile not found") {
//             setEditSection('about');
//             setIsEditingProfile(true);
//         }
//     }, [profileData, apiResponse]);

//     const handleEditProfile = () => {
//         setEditSection('about');
//         setIsEditingProfile(true);
//     };

//     const handlePhotoUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         // Validate file size (max 5MB)
//         if (file.size > 5 * 1024 * 1024) {
//             alert("File size should be less than 5MB");
//             return;
//         }

//         // Validate file type
//         const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//         if (!validTypes.includes(file.type)) {
//             alert("Please upload a valid image (JPG, PNG, or WEBP)");
//             return;
//         }

//         try {
//             await uploadPhoto({ userId: userData.username, file }).unwrap();
//             await refetch();
//         } catch (error) {
//             alert("Failed to upload photo. Please try again.");
//         }
//     };

//     const handlePhotoRemove = async () => {
//         if (!confirm("Are you sure you want to remove your profile photo?")) return;

//         try {
//             await deletePhoto(userData.username).unwrap();
//             await refetch();
//         } catch (error) {
//             alert("Failed to remove photo. Please try again.");
//         }
//     };

//     const handleEditGoals = () => {
//         setEditSection('goals');
//         setIsEditingGoals(true);
//     };

//     const handleCloseModal = () => {
//         setIsEditingProfile(false);
//         setIsEditingGoals(false);
//     };

//     // Modified handleSave to accept shouldCloseModal parameter
//     const handleSave = async (updatedData, shouldCloseModal = true) => {
//         try {
//             const dataToSave = {
//                 userId: userData.username,
//                 ...updatedData
//             };

//             console.log('💾 Saving profile data:', dataToSave);

//             const result = await saveProfile(dataToSave).unwrap();

//             await refetch();

//             // Only close modal if requested (when clicking "Save" button)
//             if (shouldCloseModal) {
//                 setTimeout(() => {
//                     handleCloseModal();
//                 }, 200);
//             }

//         } catch (err) {
//             alert("Failed to save profile. Please try again.");
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
//                     <p className="text-gray-600">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError && apiResponse?.message !== "Profile not found") {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
//                     <AlertCircle className="text-[#c2410c] h-16 w-16 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
//                     <p className="text-gray-600 mb-4">
//                         {error?.data?.message || "Failed to load profile data. Please try again."}
//                     </p>
//                     <button
//                         onClick={() => refetch()}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
//                     >
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const profile = profileData || {
//         fullName: userData?.name || '',
//         email: userData?.email || '',
//         phone: userData?.phone || '',
//         city: userData?.city !== 'N/A' ? userData.city : '',
//         country: userData?.country !== 'N/A' ? userData.country : '',
//         state: userData?.state !== 'N/A' ? userData.state : '',
//         role: userData?.role === 1 ? 'Mentee' : userData?.role === 2 ? 'Mentor' : '',
//         domain: '',
//         yearsOfExperience: null,
//         linkedinUrl: '',
//         skills: [],
//         about: '',
//         goals: '',
//         expectations: '',
//         availability: '',
//         timezone: '',
//         target: '',
//         currentCompany: '',
//         previousCompanies: [],
//         highestEducation: '',
//         schoolCollegeName: '',
//         targetDomains: [],
//         targetCompanies: [],
//         prepTimeline: ''
//     };

//     const calculateCompletion = () => {
//         const fields = [
//             profile.fullName,
//             profile.email,
//             profile.phone,
//             profile.city,
//             profile.country,
//             profile.domain,
//             profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined,
//             profile.linkedinUrl,
//             profile.skills?.length > 0,
//             profile.about,
//             profile.goals,
//             profile.expectations,
//             profile.availability,
//             profile.highestEducation,
//             profile.schoolCollegeName,
//         ];
//         const completed = fields.filter(Boolean).length;
//         return Math.round((completed / fields.length) * 100);
//     };

//     const completionPercentage = calculateCompletion();

//     const completionSteps = [
//         {
//             label: "Provide Basic Information",
//             completed: !!(profile.fullName && profile.email && profile.phone)
//         },
//         {
//             label: "Tell us your Experience",
//             completed: !!(profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined && profile.domain)
//         },
//         {
//             label: "Upload your resume and linkedin",
//             completed: !!profile.linkedinUrl
//         },
//         {
//             label: "Tell us your Goals and Expectations",
//             completed: !!(profile.goals && profile.expectations)
//         }
//     ];

//     const isNewProfile = profileData === null;

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//             {isNewProfile && (
//                 <div className="max-w-7xl mx-auto mb-6">
//                     <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-sm p-6 text-white">
//                         <h2 className="text-2xl font-bold mb-2">Welcome to Your Profile! 👋</h2>
//                         <p className="text-white/90">
//                             Let's get started by completing your profile. This information will help us match you with the best mentors.
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 <div className="lg:col-span-2 space-y-6">
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                             <div>
//                                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
//                                 <p className="text-gray-500 mt-1">
//                                     Your Profile has integral data about you, which is shared with the mentors as well.
//                                     Please keep all your information updated.
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={handleEditProfile}
//                                 disabled={isSaving}
//                                 className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSaving ? (
//                                     <>
//                                         <Loader2 size={16} className="animate-spin" />
//                                         Saving...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Edit size={16} />
//                                         Edit Profile
//                                     </>
//                                 )}
//                             </button>
//                         </div>

//                         <div className="flex flex-col sm:flex-row items-start gap-6">
//                             <div className="relative group">
//                                 <img
//                                     src={
//                                         profile.profilePhotoUrl ||
//                                         `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || userData?.name || 'User'}`
//                                     }
//                                     alt="Profile"
//                                     className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
//                                 />

//                                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button
//                                         onClick={() => fileInputRef.current?.click()}
//                                         disabled={isUploading || isDeleting}
//                                         className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
//                                         title="Change photo"
//                                     >
//                                         {isUploading ? (
//                                             <Loader2 size={20} className="animate-spin" />
//                                         ) : (
//                                             <Camera size={20} />
//                                         )}
//                                     </button>

//                                     {profile.profilePhotoUrl && (
//                                         <button
//                                             onClick={handlePhotoRemove}
//                                             disabled={isUploading || isDeleting}
//                                             className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors ml-2"
//                                             title="Remove photo"
//                                         >
//                                             {isDeleting ? (
//                                                 <Loader2 size={20} className="animate-spin" />
//                                             ) : (
//                                                 <Trash2 size={20} />
//                                             )}
//                                         </button>
//                                     )}
//                                 </div>

//                                 <input
//                                     ref={fileInputRef}
//                                     type="file"
//                                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                                     onChange={handlePhotoUpload}
//                                     className="hidden"
//                                 />
//                             </div>
//                             <div className="flex-1 w-full">
//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
//                                     <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
//                                         {profile.fullName || "Complete your profile"}
//                                     </h2>
//                                     {profile.role && (
//                                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
//                                             {profile.role}
//                                         </span>
//                                     )}
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm flex-wrap">
//                                     {profile.phone && (
//                                         <div className="flex items-center gap-2">
//                                             <Phone size={16} className="flex-shrink-0" />
//                                             <span>{profile.phone}</span>
//                                         </div>
//                                     )}
//                                     {profile.email && (
//                                         <div className="flex items-center gap-2">
//                                             <Mail size={16} className="flex-shrink-0" />
//                                             <span className="break-all">{profile.email}</span>
//                                         </div>
//                                     )}
//                                     {profile.linkedinUrl && (
//                                         <a
//                                             href={profile.linkedinUrl}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
//                                         >
//                                             <Linkedin size={16} className="flex-shrink-0" />
//                                             <span>LinkedIn</span>
//                                         </a>
//                                     )}
//                                     {!isNewProfile && (
//                                         <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-fit">
//                                             <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                             </svg>
//                                             <span>View Resume</span>
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {(profile.target || profile.domain) && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <div className="flex items-start gap-3">
//                                     <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
//                                     <div>
//                                         <span className="font-semibold text-gray-900">Target : </span>
//                                         <span className="text-gray-700">
//                                             {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                             <div>
//                                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Goals & Expectations</h2>
//                                 <p className="text-gray-500 mt-1">
//                                     Things you would like to achieve through Long Term Mentorship
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={handleEditGoals}
//                                 disabled={isSaving}
//                                 className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 <Edit size={16} />
//                                 Edit Goals
//                             </button>
//                         </div>

//                         <div className="space-y-6">
//                             {profile.goals ? (
//                                 <div className="flex items-start gap-3">
//                                     <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
//                                     <div>
//                                         <span className="font-semibold text-gray-900">Main Goal : </span>
//                                         <span className="text-gray-700">{profile.goals}</span>
//                                     </div>
//                                 </div>
//                             ) : null}

//                             {profile.expectations ? (
//                                 <div className="flex items-start gap-3">
//                                     <Heart className="text-red-500 mt-1 flex-shrink-0" size={20} />
//                                     <div>
//                                         <span className="font-semibold text-gray-900">How you want your mentor to help in LTM : </span>
//                                         <span className="text-gray-700">{profile.expectations}</span>
//                                     </div>
//                                 </div>
//                             ) : null}

//                             {!profile.goals && !profile.expectations && (
//                                 <div className="text-center py-8">
//                                     <p className="text-gray-500 mb-4">No goals or expectations set yet.</p>
//                                     <button
//                                         onClick={handleEditGoals}
//                                         className="text-orange-500 hover:text-orange-600 font-medium"
//                                     >
//                                         Add Your Goals →
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {(profile.city || profile.country) && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//                                     <p className="text-gray-900">
//                                         {[profile.city, profile.country].filter(Boolean).join(', ')}
//                                     </p>
//                                 </div>
//                             )}

//                             {profile.domain && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
//                                     <p className="text-gray-900">{profile.domain}</p>
//                                 </div>
//                             )}

//                             {profile.yearsOfExperience !== undefined && profile.yearsOfExperience !== null && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
//                                     <p className="text-gray-900">{profile.yearsOfExperience} {profile.yearsOfExperience === 1 ? 'year' : 'years'}</p>
//                                 </div>
//                             )}

//                             {profile.currentCompany && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Current Company</label>
//                                     <p className="text-gray-900">{profile.currentCompany}</p>
//                                 </div>
//                             )}

//                             {profile.highestEducation && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
//                                     <p className="text-gray-900">{profile.highestEducation}</p>
//                                 </div>
//                             )}

//                             {profile.schoolCollegeName && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
//                                     <p className="text-gray-900">{profile.schoolCollegeName}</p>
//                                 </div>
//                             )}

//                             {profile.availability && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
//                                     <p className="text-gray-900">{profile.availability}</p>
//                                 </div>
//                             )}

//                             {profile.timezone && (
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
//                                     <p className="text-gray-900">{profile.timezone}</p>
//                                 </div>
//                             )}

//                             {profile.skills && profile.skills.length > 0 && (
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
//                                     <div className="flex flex-wrap gap-2">
//                                         {profile.skills.map((skill, index) => (
//                                             <span
//                                                 key={index}
//                                                 className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
//                                             >
//                                                 {skill}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {profile.about && (
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">About</label>
//                                     <p className="text-gray-900 leading-relaxed">{profile.about}</p>
//                                 </div>
//                             )}

//                             {!profile.city && !profile.country && !profile.domain &&
//                                 (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) &&
//                                 !profile.availability && !profile.timezone &&
//                                 (!profile.skills || profile.skills.length === 0) && !profile.about && (
//                                     <div className="md:col-span-2 text-center py-8">
//                                         <p className="text-gray-500 mb-4">No additional details added yet.</p>
//                                         <button
//                                             onClick={handleEditProfile}
//                                             className="text-orange-500 hover:text-orange-600 font-medium"
//                                         >
//                                             Complete Your Profile →
//                                         </button>
//                                     </div>
//                                 )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="lg:col-span-1">
//                     <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//                         <div className="mb-6">
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-lg font-bold text-gray-900">Profile Completion</h3>
//                                 <span className="text-lg font-bold text-orange-500">{completionPercentage}%</span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                 <div
//                                     className="bg-gradient-to-r from-orange-500 to-yellow-300 h-2.5 rounded-full transition-all duration-300"
//                                     style={{ width: `${completionPercentage}%` }}
//                                 ></div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             {completionSteps.map((step, index) => (
//                                 <div key={index} className="flex items-start gap-3">
//                                     {step.completed ? (
//                                         <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
//                                     ) : (
//                                         <Circle className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
//                                     )}
//                                     <span className={`text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
//                                         {step.label}
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>

//                         {completionPercentage < 100 && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <button
//                                     onClick={handleEditProfile}
//                                     className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
//                                 >
//                                     Complete Your Profile
//                                 </button>
//                             </div>
//                         )}

//                         {completionPercentage === 100 && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <div className="flex items-center justify-center gap-2 text-green-600">
//                                     <CheckCircle size={24} />
//                                     <span className="font-semibold">Profile Complete!</span>
//                                 </div>
//                             </div>
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
//             />
//         </div>
//     );
// };

// export default MentorshipProfile;




// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle, Camera,
//     Trash2, Circle, Edit, Loader2, AlertCircle, Link, ChevronRight, AlertTriangle
// } from 'lucide-react';
// import {
//     useManageUserProfileQuery, useSaveUserProfileMutation, useUploadProfilePhotoMutation,
//     useDeleteProfilePhotoMutation
// } from "./Profilesecapislice"
// import { CiEdit, } from "react-icons/ci";
// import Cookies from "js-cookie";



// const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving }) => {
//     const [currentSection, setCurrentSection] = useState(section);
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         city: '',
//         country: '',
//         linkedinUrl: '',
//         domain: '',
//         role: '',
//         yearsOfExperience: '',
//         currentCompany: '',
//         previousCompanies: [],
//         skills: [],
//         about: '',
//         availability: '',
//         timezone: '',
//         highestEducation: '',
//         schoolCollegeName: '',
//         mainGoals: '',
//         targetDomains: [],
//         targetCompanies: [],
//         prepTimeline: '',
//         mentorHelp: '',
//         resumeDriveLink: '',
//     });

//     const [inputValues, setInputValues] = useState({
//         skill: '',
//         domain: '',
//         company: '',
//         previousCompany: ''
//     });

//     const [driveLinkError, setDriveLinkError] = useState('');

//     useEffect(() => {
//         setCurrentSection(section);
//     }, [section]);

//     useEffect(() => {
//         if (isOpen && profileData) {
//             setFormData({
//                 fullName: profileData.fullName || '',
//                 email: profileData.email || '',
//                 phone: profileData.phone || '',
//                 city: profileData.city || '',
//                 country: profileData.country || '',
//                 linkedinUrl: profileData.linkedinUrl || '',
//                 domain: profileData.domain || '',
//                 role: profileData.role || '',
//                 yearsOfExperience: profileData.yearsOfExperience !== null && profileData.yearsOfExperience !== undefined ? profileData.yearsOfExperience : '',
//                 currentCompany: profileData.currentCompany || '',
//                 previousCompanies: Array.isArray(profileData.previousCompanies) ? profileData.previousCompanies : [],
//                 skills: Array.isArray(profileData.skills) ? profileData.skills : [],
//                 about: profileData.about || '',
//                 availability: profileData.availability || '',
//                 timezone: profileData.timezone || '',
//                 highestEducation: profileData.highestEducation || '',
//                 schoolCollegeName: profileData.schoolCollegeName || '',
//                 mainGoals: profileData.goals || '',
//                 targetDomains: Array.isArray(profileData.targetDomains) ? profileData.targetDomains : [],
//                 targetCompanies: Array.isArray(profileData.targetCompanies) ? profileData.targetCompanies : [],
//                 prepTimeline: profileData.prepTimeline || '',
//                 mentorHelp: profileData.expectations || '',
//                 resumeDriveLink: profileData.resumeDriveLink || '',
//             });
//         }
//     }, [isOpen, profileData]);

//     if (!isOpen) return null;

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (name === 'resumeDriveLink') setDriveLinkError('');
//     };

//     const handleInputChange = (field, value) => {
//         setInputValues(prev => ({ ...prev, [field]: value }));
//     };

//     const validateDriveLink = (url) => {
//         if (!url) return true;
//         const drivePatterns = [
//             /drive\.google\.com/,
//             /docs\.google\.com/,
//         ];
//         return drivePatterns.some(p => p.test(url));
//     };

//     const addItem = (type) => {
//         const value = inputValues[type]?.trim();
//         if (value) {
//             if (type === 'skill') {
//                 setFormData(prev => ({ ...prev, skills: [...prev.skills, value] }));
//             } else if (type === 'domain') {
//                 setFormData(prev => ({ ...prev, targetDomains: [...prev.targetDomains, value] }));
//             } else if (type === 'company') {
//                 setFormData(prev => ({ ...prev, targetCompanies: [...prev.targetCompanies, value] }));
//             } else if (type === 'previousCompany') {
//                 setFormData(prev => ({ ...prev, previousCompanies: [...prev.previousCompanies, value] }));
//             }
//             setInputValues(prev => ({ ...prev, [type]: '' }));
//         }
//     };

//     const removeItem = (type, index) => {
//         if (type === 'skill') {
//             setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
//         } else if (type === 'domain') {
//             setFormData(prev => ({ ...prev, targetDomains: prev.targetDomains.filter((_, i) => i !== index) }));
//         } else if (type === 'company') {
//             setFormData(prev => ({ ...prev, targetCompanies: prev.targetCompanies.filter((_, i) => i !== index) }));
//         } else if (type === 'previousCompany') {
//             setFormData(prev => ({ ...prev, previousCompanies: prev.previousCompanies.filter((_, i) => i !== index) }));
//         }
//     };

//     const prepareDataForSection = () => {
//         let dataToSave = {};

//         if (currentSection === 'about') {
//             dataToSave = {
//                 fullName: formData.fullName,
//                 email: formData.email,
//                 phone: formData.phone,
//                 city: formData.city,
//                 country: formData.country,
//                 linkedinUrl: formData.linkedinUrl,
//             };
//         } else if (currentSection === 'experience') {
//             dataToSave = {
//                 domain: formData.domain,
//                 role: formData.role,
//                 yearsOfExperience: formData.yearsOfExperience,
//                 currentCompany: formData.currentCompany,
//                 previousCompanies: formData.previousCompanies,
//                 skills: formData.skills,
//                 about: formData.about,
//                 availability: formData.availability,
//                 timezone: formData.timezone,
//                 highestEducation: formData.highestEducation,
//                 schoolCollegeName: formData.schoolCollegeName,
//             };
//         } else if (currentSection === 'resume') {
//             if (formData.resumeDriveLink && !validateDriveLink(formData.resumeDriveLink)) {
//                 setDriveLinkError('Please enter a valid Google Drive link.');
//                 throw new Error('Invalid Google Drive link');
//             }
//             dataToSave = {
//                 resumeDriveLink: formData.resumeDriveLink,
//             };
//         } else if (currentSection === 'goals') {
//             dataToSave = {
//                 goals: formData.mainGoals,
//                 targetDomains: formData.targetDomains,
//                 targetCompanies: formData.targetCompanies,
//                 prepTimeline: formData.prepTimeline,
//                 expectations: formData.mentorHelp,
//             };
//         }

//         return dataToSave;
//     };

//     const handleSave = async (shouldCloseModal = true) => {
//         try {
//             const dataToSave = prepareDataForSection();
//             await onSave(dataToSave, shouldCloseModal);
//         } catch (error) {
//             console.error("Error saving:", error);
//         }
//     };

//     const handleSaveAndContinue = async () => {
//         const sectionOrder = ['about', 'experience', 'resume', 'goals'];
//         const currentIndex = sectionOrder.indexOf(currentSection);

//         try {
//             const dataToSave = prepareDataForSection();
//             await onSave(dataToSave, false);

//             if (currentIndex < sectionOrder.length - 1) {
//                 setCurrentSection(sectionOrder[currentIndex + 1]);
//             }
//         } catch (error) {
//             console.error("Error saving:", error);
//         }
//     };

//     const renderAboutSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter your full name"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="your.email@example.com"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Phone <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="+91 1234567890"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         LinkedIn URL
//                     </label>
//                     <input
//                         type="url"
//                         name="linkedinUrl"
//                         value={formData.linkedinUrl}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="https://linkedin.com/in/yourprofile"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         City
//                     </label>
//                     <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter city"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Country
//                     </label>
//                     <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="Enter country"
//                     />
//                 </div>
//             </div>
//         </div>
//     );

//     const renderExperienceSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Professional Experience</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Domain <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="domain"
//                         value={formData.domain}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Web Development, Data Science"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Current Role <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Software Developer, Student"
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Years of Experience <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="number"
//                         name="yearsOfExperience"
//                         value={formData.yearsOfExperience}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="0"
//                         min="0"
//                         step="0.5"
//                         required
//                     />
//                     <p className="text-xs text-gray-500 mt-1">Enter 0 if you're a student or fresher</p>
//                 </div>

//                 <div>
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Current Company
//                     </label>
//                     <input
//                         type="text"
//                         name="currentCompany"
//                         value={formData.currentCompany}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Google, Amazon, or 'Student'"
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Highest Level of Education Achieved <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                         name="highestEducation"
//                         value={formData.highestEducation}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                         required
//                     >
//                         <option value="">Select education level</option>
//                         <option value="High School">High School</option>
//                         <option value="Diploma">Diploma</option>
//                         <option value="Bachelor's Degree">Bachelor's Degree</option>
//                         <option value="Master's Degree">Master's Degree</option>
//                         <option value="PhD">PhD</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Name of School/College <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                         type="text"
//                         name="schoolCollegeName"
//                         value={formData.schoolCollegeName}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Indian Institute of Technology, Delhi"
//                         required
//                     />
//                 </div>

//                 <div className="md:col-span-2">
//                     <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                         Skills
//                     </label>
//                     <div className="flex gap-2 mb-2">
//                         <input
//                             type="text"
//                             value={inputValues.skill}
//                             onChange={(e) => handleInputChange('skill', e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skill'))}
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                             placeholder="Add a skill (e.g., React, Node.js, Python)"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => addItem('skill')}
//                             className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1.5 flex-shrink-0"
//                         >
//                             <Plus size={16} />
//                             Add
//                         </button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {formData.skills.map((skill, index) => (
//                             <span
//                                 key={index}
//                                 className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5"
//                             >
//                                 {skill}
//                                 <button
//                                     type="button"
//                                     onClick={() => removeItem('skill', index)}
//                                     className="hover:text-blue-900 text-base"
//                                 >
//                                     ×
//                                 </button>
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     // ── RESUME SECTION: Google Drive link instead of file upload ──
//     const renderResumeSection = () => (
//         <div className="space-y-5">
//             <h3 className="text-base font-semibold text-gray-900 mb-1">Resume & Documents</h3>

//             {/* How-to banner */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
//                 <div className="flex-shrink-0 mt-0.5">
//                     <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                             d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
//                     </svg>
//                 </div>
//                 <div className="text-xs text-blue-700 space-y-1.5">
//                     <p className="font-semibold text-blue-800">How to get your Google Drive resume link:</p>
//                     <ol className="list-decimal list-inside space-y-1">
//                         <li>Upload your resume (PDF/DOC) to <span className="font-medium">Google Drive</span></li>
//                         <li>Right-click the file → <span className="font-medium">"Get link"</span></li>
//                         <li>Set access to <span className="font-medium">"Anyone with the link"</span></li>
//                         <li>Copy the link and paste it below</li>
//                     </ol>
//                 </div>
//             </div>

//             {/* Google Drive link input */}
//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Google Drive Resume Link
//                 </label>
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg className="w-4 h-4 text-gray-400" viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
//                             <path d="M43.65 25L29.9 1.2C28.55.4 27 0 25.45 0c-1.55 0-3.1.4-4.5 1.2L6.6 11.15c1.4.8 2.55 1.9 3.35 3.3L27.5 43.5 43.65 25z" fill="#00AC47" />
//                             <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.65 9.5 8.1 14.3z" fill="#EA4335" />
//                             <path d="M43.65 25L57.4 1.2C56 .4 54.45 0 52.9 0H34.4c-1.55 0-3.1.4-4.5 1.2L43.65 25z" fill="#00832D" />
//                             <path d="M59.8 53H27.5L13.75 76.8c1.4.8 2.95 1.2 4.5 1.2h50.8c1.55 0 3.1-.4 4.5-1.2L59.8 53z" fill="#2684FC" />
//                             <path d="M73.4 14.5c-.8-1.4-1.95-2.5-3.3-3.3L55.8 1.2c-1.4-.8-2.95-1.2-4.5-1.2h-.9L43.65 25l16.15 28H87.3c0-1.55-.4-3.1-1.2-4.5L73.4 14.5z" fill="#FFBA00" />
//                         </svg>
//                     </div>
//                     <input
//                         type="url"
//                         name="resumeDriveLink"
//                         value={formData.resumeDriveLink}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${driveLinkError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
//                         placeholder="https://drive.google.com/file/d/..."
//                     />
//                 </div>
//                 {driveLinkError && (
//                     <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
//                         <AlertCircle size={12} /> {driveLinkError}
//                     </p>
//                 )}
//                 <p className="text-xs text-gray-500 mt-1.5">
//                     Your resume link will be shared with mentors when you apply for mentorship programs.
//                 </p>
//             </div>

//             {/* Preview button if link exists */}
//             {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
//                 <a
//                     href={formData.resumeDriveLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
//                 >
//                     <Link size={14} />
//                     Preview Resume
//                 </a>
//             )}
//         </div>
//     );

//     const renderGoalsSection = () => (
//         <div className="space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-3">Career Goals & Expectations</h3>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Main Goals <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                     name="mainGoals"
//                     value={formData.mainGoals}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                     required
//                 >
//                     <option value="">Select your main goal</option>
//                     <option value="Employed, looking to switch to another company">Employed, looking to switch to another company</option>
//                     <option value="Unemployed, looking for a job">Unemployed, looking for a job</option>
//                     <option value="Student, preparing for placements">Student, preparing for placements</option>
//                     <option value="Career transition">Career transition</option>
//                     <option value="Skill development">Skill development</option>
//                     <option value="Interview preparation">Interview preparation</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Target Domains <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                     <input
//                         type="text"
//                         value={inputValues.domain}
//                         onChange={(e) => handleInputChange('domain', e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('domain'))}
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., Frontend Developer, Backend Developer, Data Scientist"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => addItem('domain')}
//                         className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
//                     >
//                         <Plus size={16} />
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     {formData.targetDomains.map((domain, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
//                         >
//                             {domain}
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem('domain', index)}
//                                 className="hover:text-purple-900 text-base"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Target Companies <span className="text-red-500">*</span>
//                 </label>
//                 <div className="flex gap-2 mb-2">
//                     <input
//                         type="text"
//                         value={inputValues.company}
//                         onChange={(e) => handleInputChange('company', e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('company'))}
//                         className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                         placeholder="e.g., MAANG, Startups, Product Based Companies"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => addItem('company')}
//                         className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"
//                     >
//                         <Plus size={16} />
//                     </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                     {formData.targetCompanies.map((company, index) => (
//                         <span
//                             key={index}
//                             className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1.5"
//                         >
//                             {company}
//                             <button
//                                 type="button"
//                                 onClick={() => removeItem('company', index)}
//                                 className="hover:text-green-900 text-base"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     Expected Preparation Timeline
//                 </label>
//                 <select
//                     name="prepTimeline"
//                     value={formData.prepTimeline}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//                 >
//                     <option value="">Select timeline</option>
//                     <option value="Upto 1 month">Up to 1 month</option>
//                     <option value="1-3 months">1-3 months</option>
//                     <option value="3-6 months">3-6 months</option>
//                     <option value="6-12 months">6-12 months</option>
//                     <option value="12+ months">12+ months</option>
//                 </select>
//             </div>

//             <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1.5">
//                     How do you want your Mentor to help in your Long Term Mentorship? <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     name="mentorHelp"
//                     value={formData.mentorHelp}
//                     onChange={handleChange}
//                     rows={5}
//                     className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
//                     placeholder="Describe your expectations from the mentor. For example:&#10;- Help with interview preparation&#10;- Career guidance and roadmap planning&#10;- Technical skill development&#10;- Resume and portfolio review&#10;- Mock interviews&#10;- Networking and industry insights"
//                     required
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                     Be specific about what kind of support you're looking for from your mentor.
//                 </p>
//             </div>
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
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
//             <div className="bg-white rounded-lg w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-none flex flex-col">
//                 <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
//                     <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
//                         <span className="text-xl sm:text-2xl"><CiEdit /></span>
//                         <span className="hidden xs:inline">Edit Profile</span>
//                         <span className="xs:hidden">Edit</span>
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         disabled={isSaving}
//                         className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
//                     >
//                         <X size={18} className="sm:w-5 sm:h-5" />
//                     </button>
//                 </div>

//                 <div className="flex flex-col lg:flex-row">
//                     <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
//                         <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-3 space-x-2 lg:space-x-0 lg:space-y-1.5">
//                             {['about', 'experience', 'resume', 'goals'].map((sec) => {
//                                 const labels = { about: 'About', experience: 'Experience & Education', resume: 'Resume', goals: 'Goals & Expectations' };
//                                 const shortLabels = { about: 'About', experience: 'Experience', resume: 'Resume', goals: 'Goals' };
//                                 return (
//                                     <button
//                                         key={sec}
//                                         type="button"
//                                         onClick={() => setCurrentSection(sec)}
//                                         className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === sec
//                                             ? 'bg-[#ea580c] text-white font-medium'
//                                             : 'text-gray-600 hover:bg-gray-200'
//                                             }`}
//                                     >
//                                         <span className="hidden sm:inline">{labels[sec]}</span>
//                                         <span className="sm:hidden">{shortLabels[sec]}</span>
//                                     </button>
//                                 );
//                             })}
//                         </nav>
//                     </div>

//                     <div className="flex-1 p-4 sm:p-5 max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-16rem)] overflow-y-auto">
//                         {renderContent()}
//                     </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         disabled={isSaving}
//                         className="w-full sm:w-32 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         Cancel
//                     </button>

//                     <div className="flex flex-col sm:flex-row gap-3">
//                         <button
//                             type="button"
//                             onClick={() => handleSave(true)}
//                             disabled={isSaving}
//                             className="w-full sm:w-32 px-4 py-2 text-sm border border-[#ea580c] text-[#ea580c] rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {isSaving ? (
//                                 <>
//                                     <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#ea580c] border-t-transparent"></div>
//                                     Saving...
//                                 </>
//                             ) : 'Save'}
//                         </button>

//                         {currentSection !== 'goals' && (
//                             <button
//                                 type="button"
//                                 onClick={handleSaveAndContinue}
//                                 disabled={isSaving}
//                                 className="w-full sm:w-40 px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                             >
//                                 {isSaving ? (
//                                     <>
//                                         <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>
//                                         Saving...
//                                     </>
//                                 ) : (
//                                     <>
//                                         Save & Continue
//                                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </>
//                                 )}
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // ── PENDING DETAILS CARD ──────────────────────────────────────────────────────
// const PendingDetailsCard = ({ profile, onEditProfile, onEditGoals }) => {
//     const pendingItems = [];

//     if (!profile.phone) pendingItems.push({ label: 'Phone number', section: 'about', action: onEditProfile });
//     if (!profile.city || !profile.country) pendingItems.push({ label: 'Location (city & country)', section: 'about', action: onEditProfile });
//     if (!profile.linkedinUrl) pendingItems.push({ label: 'LinkedIn URL', section: 'about', action: onEditProfile });
//     if (!profile.domain) pendingItems.push({ label: 'Professional domain', section: 'experience', action: onEditProfile });
//     if (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) pendingItems.push({ label: 'Years of experience', section: 'experience', action: onEditProfile });
//     if (!profile.highestEducation) pendingItems.push({ label: 'Education level', section: 'experience', action: onEditProfile });
//     if (!profile.schoolCollegeName) pendingItems.push({ label: 'Institution name', section: 'experience', action: onEditProfile });
//     // if (!profile.skills || profile.skills.length === 0) pendingItems.push({ label: 'Skills', section: 'experience', action: onEditProfile });
//     if (!profile.resumeDriveLink) pendingItems.push({ label: 'Resume (Google Drive link)', section: 'resume', action: onEditProfile });
//     if (!profile.goals) pendingItems.push({ label: 'Main career goal', section: 'goals', action: onEditGoals });
//     if (!profile.expectations) pendingItems.push({ label: 'Mentor expectations', section: 'goals', action: onEditGoals });
//     // if (!profile.availability) pendingItems.push({ label: 'Availability', section: 'experience', action: onEditProfile });

//     if (pendingItems.length === 0) return null;

//     return (
//         <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-orange-400">
//             <div className="flex items-center gap-2 mb-4">
//                 <AlertTriangle className="text-orange-500 flex-shrink-0" size={18} />
//                 <h3 className="text-base font-bold text-gray-900">Pending Details</h3>
//                 <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
//                     {pendingItems.length} missing
//                 </span>
//             </div>
//             <p className="text-xs text-gray-500 mb-3">Complete these to improve your profile visibility with mentors.</p>
//             <ul className="space-y-2">
//                 {pendingItems.map((item, index) => (
//                     <li key={index}>
//                         <button
//                             onClick={item.action}
//                             className="w-full flex items-center gap-2.5 text-left group"
//                         >
//                             <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-orange-300 bg-orange-50 flex items-center justify-center">
//                                 <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
//                             </span>
//                             <span className="text-sm text-gray-600 flex-1 group-hover:text-orange-600 transition-colors">
//                                 {item.label}
//                             </span>
//                             <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0" />
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };


// // ── MAIN COMPONENT ────────────────────────────────────────────────────────────
// const MentorshipProfile = () => {
//     const [isEditingProfile, setIsEditingProfile] = useState(false);
//     const [isEditingGoals, setIsEditingGoals] = useState(false);
//     const [editSection, setEditSection] = useState('about');
//     const fileInputRef = useRef(null);
//     const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();
//     const [deletePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();

//     const userData = JSON.parse(Cookies.get("userData") || "{}");

//     console.log(userData,"userData");
//     const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(userData.username);
//     const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

//     const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;

//     useEffect(() => {
//         if (profileData === null && apiResponse?.message === "Profile not found") {
//             setEditSection('about');
//             setIsEditingProfile(true);
//         }
//     }, [profileData, apiResponse]);

//     const handleEditProfile = () => {
//         setEditSection('about');
//         setIsEditingProfile(true);
//     };

//     const handlePhotoUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
//         if (file.size > 5 * 1024 * 1024) { alert("File size should be less than 5MB"); return; }
//         const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//         if (!validTypes.includes(file.type)) { alert("Please upload a valid image (JPG, PNG, or WEBP)"); return; }
//         try {
//             await uploadPhoto({ userId: userData.username, file }).unwrap();
//             await refetch();
//         } catch (error) {
//             alert("Failed to upload photo. Please try again.");
//         }
//     };

//     const handlePhotoRemove = async () => {
//         if (!confirm("Are you sure you want to remove your profile photo?")) return;
//         try {
//             await deletePhoto(userData.username).unwrap();
//             await refetch();
//         } catch (error) {
//             alert("Failed to remove photo. Please try again.");
//         }
//     };

//     const handleEditGoals = () => {
//         setEditSection('goals');
//         setIsEditingGoals(true);
//     };

//     const handleCloseModal = () => {
//         setIsEditingProfile(false);
//         setIsEditingGoals(false);
//     };

//     const handleSave = async (updatedData, shouldCloseModal = true) => {
//         try {
//             const dataToSave = { userId: userData.username, ...updatedData };
//             await saveProfile(dataToSave).unwrap();
//             await refetch();
//             if (shouldCloseModal) {
//                 setTimeout(() => handleCloseModal(), 200);
//             }
//         } catch (err) {
//             alert("Failed to save profile. Please try again.");
//         }
//     };

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
//                     <p className="text-gray-600">Loading profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError && apiResponse?.message !== "Profile not found") {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//                 <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
//                     <AlertCircle className="text-[#c2410c] h-16 w-16 mx-auto mb-4" />
//                     <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
//                     <p className="text-gray-600 mb-4">
//                         {error?.data?.message || "Failed to load profile data. Please try again."}
//                     </p>
//                     <button onClick={() => refetch()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
//                         Retry
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const profile = profileData || {
//         fullName: userData?.name || '',
//         email: userData?.email || '',
//         phone: userData?.phone || '',
//         city: userData?.city !== 'N/A' ? userData.city : '',
//         country: userData?.country !== 'N/A' ? userData.country : '',
//         state: userData?.state !== 'N/A' ? userData.state : '',
//         role: userData?.role === 1 ? 'Mentee' : userData?.role === 2 ? 'Mentor' : '',
//         domain: '',
//         yearsOfExperience: null,
//         linkedinUrl: '',
//         skills: [],
//         about: '',
//         goals: '',
//         expectations: '',
//         availability: '',
//         timezone: '',
//         target: '',
//         currentCompany: '',
//         previousCompanies: [],
//         highestEducation: '',
//         schoolCollegeName: '',
//         targetDomains: [],
//         targetCompanies: [],
//         prepTimeline: '',
//         resumeDriveLink: '',
//     };

//     const calculateCompletion = () => {
//         const fields = [
//             profile.fullName,
//             profile.email,
//             profile.phone,
//             profile.city,
//             profile.country,
//             profile.domain,
//             profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined,
//             profile.linkedinUrl,
//             // profile.skills?.length > 0,
//             profile.about,
//             profile.goals,
//             profile.expectations,
//             // profile.availability,
//             profile.highestEducation,
//             profile.schoolCollegeName,
//         ];
//         const completed = fields.filter(Boolean).length;
//         return Math.round((completed / fields.length) * 100);
//     };

//     const completionPercentage = calculateCompletion();

//     const completionSteps = [
//         { label: "Provide Basic Information", completed: !!(profile.fullName && profile.email && profile.phone) },
//         { label: "Tell us your Experience", completed: !!(profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined && profile.domain) },
//         { label: "Upload your resume and linkedin", completed: !!profile.linkedinUrl },
//         { label: "Tell us your Goals and Expectations", completed: !!(profile.goals && profile.expectations) }
//     ];

//     const isNewProfile = profileData === null;

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
//             {isNewProfile && (
//                 <div className="max-w-7xl mx-auto mb-6">
//                     <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-sm p-6 text-white">
//                         <h2 className="text-2xl font-bold mb-2">Welcome to Your Profile! 👋</h2>
//                         <p className="text-white/90">
//                             Let's get started by completing your profile. This information will help us match you with the best mentors.
//                         </p>
//                     </div>
//                 </div>
//             )}

//             <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* ── LEFT / MAIN COLUMN ── */}
//                 <div className="lg:col-span-2 space-y-6">
//                     {/* Profile Card */}
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                             <div>
//                                 <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
//                                 <p className="text-gray-500 mt-1">
//                                     Your Profile has integral data about you, which is shared with the mentors as well.
//                                     Please keep all your information updated.
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={handleEditProfile}
//                                 disabled={isSaving}
//                                 className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {isSaving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : <><Edit size={16} />Edit Profile</>}
//                             </button>
//                         </div>

//                         <div className="flex flex-col sm:flex-row items-start gap-6">
//                             <div className="relative group">
//                                 <img
//                                     src={profile.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || userData?.name || 'User'}`}
//                                     alt="Profile"
//                                     className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover"
//                                 />
//                                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button onClick={() => fileInputRef.current?.click()} disabled={isUploading || isDeleting} className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors" title="Change photo">
//                                         {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
//                                     </button>
//                                     {profile.profilePhotoUrl && (
//                                         <button onClick={handlePhotoRemove} disabled={isUploading || isDeleting} className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors ml-2" title="Remove photo">
//                                             {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
//                                         </button>
//                                     )}
//                                 </div>
//                                 <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handlePhotoUpload} className="hidden" />
//                             </div>

//                             <div className="flex-1 w-full">
//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
//                                     <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{profile.fullName || "Complete your profile"}</h2>
//                                     {profile.role && (
//                                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">{profile.role}</span>
//                                     )}
//                                 </div>

//                                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm flex-wrap">
//                                     {profile.phone && <div className="flex items-center gap-2"><Phone size={16} className="flex-shrink-0" /><span>{profile.phone}</span></div>}
//                                     {profile.email && <div className="flex items-center gap-2"><Mail size={16} className="flex-shrink-0" /><span className="break-all">{profile.email}</span></div>}
//                                     {profile.linkedinUrl && (
//                                         <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
//                                             <Linkedin size={16} className="flex-shrink-0" /><span>LinkedIn</span>
//                                         </a>
//                                     )}
//                                     {/* Resume link button */}
//                                     {profile.resumeDriveLink ? (
//                                         <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 w-fit">
//                                             <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                             </svg>
//                                             <span>View Resume</span>
//                                         </a>
//                                     ) : !isNewProfile && (
//                                         <button onClick={() => { setEditSection('resume'); setIsEditingProfile(true); }} className="flex items-center gap-2 text-orange-500 hover:text-orange-600 w-fit text-xs">
//                                             <Plus size={14} /><span>Add Resume</span>
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {(profile.target || profile.domain) && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <div className="flex items-start gap-3">
//                                     <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
//                                     <div>
//                                         <span className="font-semibold text-gray-900">Target : </span>
//                                         <span className="text-gray-700">{profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Goals Card */}
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
//                             <div>
//                                 <h2 className="text-xl md:text-2xl font-bold text-gray-900">Goals & Expectations</h2>
//                                 <p className="text-gray-500 mt-1">Things you would like to achieve through Long Term Mentorship</p>
//                             </div>
//                             <button onClick={handleEditGoals} disabled={isSaving} className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
//                                 <Edit size={16} />Edit Goals
//                             </button>
//                         </div>

//                         <div className="space-y-6">
//                             {profile.goals && (
//                                 <div className="flex items-start gap-3">
//                                     <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
//                                     <div><span className="font-semibold text-gray-900">Main Goal : </span><span className="text-gray-700">{profile.goals}</span></div>
//                                 </div>
//                             )}
//                             {profile.expectations && (
//                                 <div className="flex items-start gap-3">
//                                     <Heart className="text-red-500 mt-1 flex-shrink-0" size={20} />
//                                     <div><span className="font-semibold text-gray-900">How you want your mentor to help in LTM : </span><span className="text-gray-700">{profile.expectations}</span></div>
//                                 </div>
//                             )}
//                             {!profile.goals && !profile.expectations && (
//                                 <div className="text-center py-8">
//                                     <p className="text-gray-500 mb-4">No goals or expectations set yet.</p>
//                                     <button onClick={handleEditGoals} className="text-orange-500 hover:text-orange-600 font-medium">Add Your Goals →</button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Additional Details Card */}
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {(profile.city || profile.country) && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Location</label><p className="text-gray-900">{[profile.city, profile.country].filter(Boolean).join(', ')}</p></div>
//                             )}
//                             {profile.domain && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label><p className="text-gray-900">{profile.domain}</p></div>
//                             )}
//                             {profile.yearsOfExperience !== undefined && profile.yearsOfExperience !== null && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label><p className="text-gray-900">{profile.yearsOfExperience} {profile.yearsOfExperience === 1 ? 'year' : 'years'}</p></div>
//                             )}
//                             {profile.currentCompany && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Current Company</label><p className="text-gray-900">{profile.currentCompany}</p></div>
//                             )}
//                             {profile.highestEducation && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Education</label><p className="text-gray-900">{profile.highestEducation}</p></div>
//                             )}
//                             {profile.schoolCollegeName && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label><p className="text-gray-900">{profile.schoolCollegeName}</p></div>
//                             )}
//                             {profile.availability && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label><p className="text-gray-900">{profile.availability}</p></div>
//                             )}
//                             {profile.timezone && (
//                                 <div><label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label><p className="text-gray-900">{profile.timezone}</p></div>
//                             )}
//                             {profile.skills && profile.skills.length > 0 && (
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
//                                     <div className="flex flex-wrap gap-2">
//                                         {profile.skills.map((skill, index) => (
//                                             <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{skill}</span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                             {profile.about && (
//                                 <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">About</label><p className="text-gray-900 leading-relaxed">{profile.about}</p></div>
//                             )}
//                             {!profile.city && !profile.country && !profile.domain &&
//                                 (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) &&
//                                 !profile.availability && !profile.timezone &&
//                                 (!profile.skills || profile.skills.length === 0) && !profile.about && (
//                                     <div className="md:col-span-2 text-center py-8">
//                                         <p className="text-gray-500 mb-4">No additional details added yet.</p>
//                                         <button onClick={handleEditProfile} className="text-orange-500 hover:text-orange-600 font-medium">Complete Your Profile →</button>
//                                     </div>
//                                 )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* ── RIGHT SIDEBAR ── */}
//                 <div className="lg:col-span-1 space-y-5">
//                     {/* Progress Card */}
//                     <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
//                         <div className="mb-6">
//                             <div className="flex justify-between items-center mb-2">
//                                 <h3 className="text-lg font-bold text-gray-900">Profile Completion</h3>
//                                 <span className="text-lg font-bold text-orange-500">{completionPercentage}%</span>
//                             </div>
//                             <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                 <div
//                                     className="bg-gradient-to-r from-orange-500 to-yellow-300 h-2.5 rounded-full transition-all duration-500"
//                                     style={{ width: `${completionPercentage}%` }}
//                                 ></div>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             {completionSteps.map((step, index) => (
//                                 <div key={index} className="flex items-start gap-3">
//                                     {step.completed
//                                         ? <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
//                                         : <Circle className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
//                                     }
//                                     <span className={`text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{step.label}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         {completionPercentage < 100 && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <button onClick={handleEditProfile} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
//                                     Complete Your Profile
//                                 </button>
//                             </div>
//                         )}

//                         {completionPercentage === 100 && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <div className="flex items-center justify-center gap-2 text-green-600">
//                                     <CheckCircle size={24} />
//                                     <span className="font-semibold">Profile Complete!</span>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Pending Details Card — shown only when profile is partially filled */}
//                     {!isNewProfile && completionPercentage < 100 && (
//                         <PendingDetailsCard
//                             profile={profile}
//                             onEditProfile={handleEditProfile}
//                             onEditGoals={handleEditGoals}
//                         />
//                     )}
//                 </div>
//             </div>

//             <EditProfileModal
//                 isOpen={isEditingProfile || isEditingGoals}
//                 onClose={handleCloseModal}
//                 section={editSection}
//                 profileData={profile}
//                 onSave={handleSave}
//                 isSaving={isSaving}
//             />
//         </div>
//     );
// };

// export default MentorshipProfile;



import React, { useState, useRef, useEffect } from 'react';
import {
    Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle, Camera,
    Trash2, Circle, Edit, Loader2, AlertCircle, Link, ChevronRight, AlertTriangle
} from 'lucide-react';
import {
    useManageUserProfileQuery, useSaveUserProfileMutation, useUploadProfilePhotoMutation,
    useDeleteProfilePhotoMutation
} from "./Profilesecapislice"
import { CiEdit, } from "react-icons/ci";
import Cookies from "js-cookie";


// ── MAPPERS ───────────────────────────────────────────────────────────────────

// Cookie stores e.g. "bachelors" → map to the <select> option value
const mapEducation = (val = '') => {
    const map = {
        'bachelors': "Bachelor's Degree",
        'bachelor': "Bachelor's Degree",
        'masters': "Master's Degree",
        'master': "Master's Degree",
        'phd': "PhD",
        'diploma': "Diploma",
        'highschool': "High School",
        'high school': "High School",
        'other': "Other",
    };
    return map[val.toLowerCase()] || val;
};

// Cookie "status" → human-readable role label
const mapStatus = (val = '') => {
    const map = {
        'fresher': 'Fresher',
        'student': 'Student',
        'employed': 'Working Professional',
        'unemployed': 'Job Seeker',
    };
    return map[val.toLowerCase()] || val;
};


// ── EDIT MODAL ────────────────────────────────────────────────────────────────
const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving }) => {
    const [currentSection, setCurrentSection] = useState(section);
    const [formData, setFormData] = useState({
        fullName: '', email: '', phone: '', city: '', country: '',
        linkedinUrl: '', domain: '', role: '', yearsOfExperience: '',
        currentCompany: '', previousCompanies: [], skills: [], about: '',
        availability: '', timezone: '', highestEducation: '',
        schoolCollegeName: '', mainGoals: '', targetDomains: [],
        targetCompanies: [], prepTimeline: '', mentorHelp: '', resumeDriveLink: '',
    });
    const [inputValues, setInputValues] = useState({ skill: '', domain: '', company: '', previousCompany: '' });
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
                yearsOfExperience: profileData.yearsOfExperience !== null && profileData.yearsOfExperience !== undefined ? profileData.yearsOfExperience : '',
                currentCompany: profileData.currentCompany || '',
                previousCompanies: Array.isArray(profileData.previousCompanies) ? profileData.previousCompanies : [],
                skills: Array.isArray(profileData.skills) ? profileData.skills : [],
                about: profileData.about || '',
                availability: profileData.availability || '',
                timezone: profileData.timezone || '',
                highestEducation: profileData.highestEducation || '',
                schoolCollegeName: profileData.schoolCollegeName || '',
                mainGoals: profileData.goals || '',
                targetDomains: Array.isArray(profileData.targetDomains) ? profileData.targetDomains : [],
                targetCompanies: Array.isArray(profileData.targetCompanies) ? profileData.targetCompanies : [],
                prepTimeline: profileData.prepTimeline || '',
                mentorHelp: profileData.expectations || '',
                resumeDriveLink: profileData.resumeDriveLink || '',
            });
        }
    }, [isOpen, profileData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'resumeDriveLink') setDriveLinkError('');
    };

    const handleInputChange = (field, value) => setInputValues(prev => ({ ...prev, [field]: value }));

    const validateDriveLink = (url) => !url || [/drive\.google\.com/, /docs\.google\.com/].some(p => p.test(url));

    const addItem = (type) => {
        const value = inputValues[type]?.trim();
        if (!value) return;
        const keyMap = { skill: 'skills', domain: 'targetDomains', company: 'targetCompanies', previousCompany: 'previousCompanies' };
        setFormData(prev => ({ ...prev, [keyMap[type]]: [...prev[keyMap[type]], value] }));
        setInputValues(prev => ({ ...prev, [type]: '' }));
    };

    const removeItem = (type, index) => {
        const keyMap = { skill: 'skills', domain: 'targetDomains', company: 'targetCompanies', previousCompany: 'previousCompanies' };
        setFormData(prev => ({ ...prev, [keyMap[type]]: prev[keyMap[type]].filter((_, i) => i !== index) }));
    };

    const prepareDataForSection = () => {
        if (currentSection === 'about') {
            return { fullName: formData.fullName, email: formData.email, phone: formData.phone, city: formData.city, country: formData.country, linkedinUrl: formData.linkedinUrl };
        } else if (currentSection === 'experience') {
            return { domain: formData.domain, role: formData.role, yearsOfExperience: formData.yearsOfExperience, currentCompany: formData.currentCompany, previousCompanies: formData.previousCompanies, skills: formData.skills, about: formData.about, availability: formData.availability, timezone: formData.timezone, highestEducation: formData.highestEducation, schoolCollegeName: formData.schoolCollegeName };
        } else if (currentSection === 'resume') {
            if (formData.resumeDriveLink && !validateDriveLink(formData.resumeDriveLink)) {
                setDriveLinkError('Please enter a valid Google Drive link.');
                throw new Error('Invalid Google Drive link');
            }
            return { resumeDriveLink: formData.resumeDriveLink };
        } else if (currentSection === 'goals') {
            return { goals: formData.mainGoals, targetDomains: formData.targetDomains, targetCompanies: formData.targetCompanies, prepTimeline: formData.prepTimeline, expectations: formData.mentorHelp };
        }
        return {};
    };

    const handleSave = async (shouldCloseModal = true) => {
        try { await onSave(prepareDataForSection(), shouldCloseModal); }
        catch (error) { console.error("Error saving:", error); }
    };

    const handleSaveAndContinue = async () => {
        const order = ['about', 'experience', 'resume', 'goals'];
        const idx = order.indexOf(currentSection);
        try {
            await onSave(prepareDataForSection(), false);
            if (idx < order.length - 1) setCurrentSection(order[idx + 1]);
        } catch (error) { console.error("Error saving:", error); }
    };

    const renderAboutSection = () => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name', required: true },
                    { label: 'Email', name: 'email', type: 'email', placeholder: 'your.email@example.com', required: true },
                    { label: 'Phone', name: 'phone', type: 'tel', placeholder: '+91 1234567890', required: true },
                    { label: 'LinkedIn URL', name: 'linkedinUrl', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
                    { label: 'City', name: 'city', type: 'text', placeholder: 'Enter city' },
                    { label: 'Country', name: 'country', type: 'text', placeholder: 'Enter country' },
                ].map(({ label, name, type, placeholder, required }) => (
                    <div key={name}>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}{required && <span className="text-red-500"> *</span>}</label>
                        <input type={type} name={name} value={formData[name]} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder={placeholder} />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderExperienceSection = () => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Professional Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Domain <span className="text-red-500">*</span></label>
                    <input type="text" name="domain" value={formData.domain} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., Web Development, Data Science" required />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Current Role <span className="text-red-500">*</span></label>
                    <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., Software Developer, Student" required />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Years of Experience <span className="text-red-500">*</span></label>
                    <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="0" min="0" step="0.5" required />
                    <p className="text-xs text-gray-500 mt-1">Enter 0 if you're a student or fresher</p>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Current Company</label>
                    <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., Google, Amazon, or 'Student'" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Highest Level of Education Achieved <span className="text-red-500">*</span></label>
                    <select name="highestEducation" value={formData.highestEducation} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" required>
                        <option value="">Select education level</option>
                        <option value="High School">High School</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Name of School/College <span className="text-red-500">*</span></label>
                    <input type="text" name="schoolCollegeName" value={formData.schoolCollegeName} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., Indian Institute of Technology, Delhi" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Skills</label>
                    <div className="flex gap-2 mb-2">
                        <input type="text" value={inputValues.skill} onChange={(e) => handleInputChange('skill', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skill'))} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Add a skill (e.g., React, Node.js, Python)" />
                        <button type="button" onClick={() => addItem('skill')} className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1.5 flex-shrink-0"><Plus size={16} />Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                                {skill}<button type="button" onClick={() => removeItem('skill', index)} className="hover:text-blue-900 text-base">×</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderResumeSection = () => (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Resume & Documents</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" /></svg>
                </div>
                <div className="text-xs text-blue-700 space-y-1.5">
                    <p className="font-semibold text-blue-800">How to get your Google Drive resume link:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Upload your resume (PDF/DOC) to <span className="font-medium">Google Drive</span></li>
                        <li>Right-click the file → <span className="font-medium">"Get link"</span></li>
                        <li>Set access to <span className="font-medium">"Anyone with the link"</span></li>
                        <li>Copy the link and paste it below</li>
                    </ol>
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Google Drive Resume Link</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" /><path d="M43.65 25L29.9 1.2C28.55.4 27 0 25.45 0c-1.55 0-3.1.4-4.5 1.2L6.6 11.15c1.4.8 2.55 1.9 3.35 3.3L27.5 43.5 43.65 25z" fill="#00AC47" /><path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.65 9.5 8.1 14.3z" fill="#EA4335" /><path d="M43.65 25L57.4 1.2C56 .4 54.45 0 52.9 0H34.4c-1.55 0-3.1.4-4.5 1.2L43.65 25z" fill="#00832D" /><path d="M59.8 53H27.5L13.75 76.8c1.4.8 2.95 1.2 4.5 1.2h50.8c1.55 0 3.1-.4 4.5-1.2L59.8 53z" fill="#2684FC" /><path d="M73.4 14.5c-.8-1.4-1.95-2.5-3.3-3.3L55.8 1.2c-1.4-.8-2.95-1.2-4.5-1.2h-.9L43.65 25l16.15 28H87.3c0-1.55-.4-3.1-1.2-4.5L73.4 14.5z" fill="#FFBA00" />
                        </svg>
                    </div>
                    <input type="url" name="resumeDriveLink" value={formData.resumeDriveLink} onChange={handleChange} className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${driveLinkError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} placeholder="https://drive.google.com/file/d/..." />
                </div>
                {driveLinkError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={12} /> {driveLinkError}</p>}
                <p className="text-xs text-gray-500 mt-1.5">Your resume link will be shared with mentors when you apply for mentorship programs.</p>
            </div>
            {formData.resumeDriveLink && validateDriveLink(formData.resumeDriveLink) && (
                <a href={formData.resumeDriveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"><Link size={14} />Preview Resume</a>
            )}
        </div>
    );

    const renderGoalsSection = () => (
        <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Career Goals & Expectations</h3>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Main Goals <span className="text-red-500">*</span></label>
                <select name="mainGoals" value={formData.mainGoals} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" required>
                    <option value="">Select your main goal</option>
                    <option value="Employed, looking to switch to another company">Employed, looking to switch to another company</option>
                    <option value="Unemployed, looking for a job">Unemployed, looking for a job</option>
                    <option value="Student, preparing for placements">Student, preparing for placements</option>
                    <option value="Career transition">Career transition</option>
                    <option value="Skill development">Skill development</option>
                    <option value="Interview preparation">Interview preparation</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Domains <span className="text-red-500">*</span></label>
                <div className="flex gap-2 mb-2">
                    <input type="text" value={inputValues.domain} onChange={(e) => handleInputChange('domain', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('domain'))} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., Frontend Developer, Data Scientist" />
                    <button type="button" onClick={() => addItem('domain')} className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"><Plus size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.targetDomains.map((d, i) => <span key={i} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium flex items-center gap-1.5">{d}<button type="button" onClick={() => removeItem('domain', i)} className="hover:text-purple-900 text-base">×</button></span>)}
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Target Companies <span className="text-red-500">*</span></label>
                <div className="flex gap-2 mb-2">
                    <input type="text" value={inputValues.company} onChange={(e) => handleInputChange('company', e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('company'))} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g., MAANG, Startups, Product Based Companies" />
                    <button type="button" onClick={() => addItem('company')} className="px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors flex-shrink-0"><Plus size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.targetCompanies.map((c, i) => <span key={i} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1.5">{c}<button type="button" onClick={() => removeItem('company', i)} className="hover:text-green-900 text-base">×</button></span>)}
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Expected Preparation Timeline</label>
                <select name="prepTimeline" value={formData.prepTimeline} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                    <option value="">Select timeline</option>
                    <option value="Upto 1 month">Up to 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                </select>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">How do you want your Mentor to help in your Long Term Mentorship? <span className="text-red-500">*</span></label>
                <textarea name="mentorHelp" value={formData.mentorHelp} onChange={handleChange} rows={5} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none" placeholder="Describe your expectations from the mentor." required />
                <p className="text-xs text-gray-500 mt-1">Be specific about what kind of support you're looking for from your mentor.</p>
            </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-none flex flex-col">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-xl sm:text-2xl"><CiEdit /></span>
                        <span className="hidden xs:inline">Edit Profile</span>
                        <span className="xs:hidden">Edit</span>
                    </h2>
                    <button onClick={onClose} disabled={isSaving} className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"><X size={18} /></button>
                </div>
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
                        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-3 space-x-2 lg:space-x-0 lg:space-y-1.5">
                            {['about', 'experience', 'resume', 'goals'].map((sec) => {
                                const labels = { about: 'About', experience: 'Experience & Education', resume: 'Resume', goals: 'Goals & Expectations' };
                                const shortLabels = { about: 'About', experience: 'Experience', resume: 'Resume', goals: 'Goals' };
                                return (
                                    <button key={sec} type="button" onClick={() => setCurrentSection(sec)} className={`flex-shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-lg transition-colors text-xs lg:text-sm ${currentSection === sec ? 'bg-[#ea580c] text-white font-medium' : 'text-gray-600 hover:bg-gray-200'}`}>
                                        <span className="hidden sm:inline">{labels[sec]}</span>
                                        <span className="sm:hidden">{shortLabels[sec]}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex-1 p-4 sm:p-5 max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-16rem)] overflow-y-auto">{renderContent()}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                    <button type="button" onClick={onClose} disabled={isSaving} className="w-full sm:w-32 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Cancel</button>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button type="button" onClick={() => handleSave(true)} disabled={isSaving} className="w-full sm:w-32 px-4 py-2 text-sm border border-[#ea580c] text-[#ea580c] rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {isSaving ? <><div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#ea580c] border-t-transparent"></div>Saving...</> : 'Save'}
                        </button>
                        {currentSection !== 'goals' && (
                            <button type="button" onClick={handleSaveAndContinue} disabled={isSaving} className="w-full sm:w-40 px-4 py-2 text-sm bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isSaving ? <><div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent"></div>Saving...</> : <>Save & Continue<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></>}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// ── PENDING DETAILS CARD ──────────────────────────────────────────────────────
const PendingDetailsCard = ({ profile, onEditProfile, onEditGoals }) => {
    const pendingItems = [];
    if (!profile.phone) pendingItems.push({ label: 'Phone number', action: onEditProfile });
    if (!profile.city || !profile.country) pendingItems.push({ label: 'Location (city & country)', action: onEditProfile });
    if (!profile.linkedinUrl) pendingItems.push({ label: 'LinkedIn URL', action: onEditProfile });
    if (!profile.domain) pendingItems.push({ label: 'Professional domain', action: onEditProfile });
    if (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) pendingItems.push({ label: 'Years of experience', action: onEditProfile });
    if (!profile.highestEducation) pendingItems.push({ label: 'Education level', action: onEditProfile });
    if (!profile.schoolCollegeName) pendingItems.push({ label: 'Institution name', action: onEditProfile });
    if (!profile.resumeDriveLink) pendingItems.push({ label: 'Resume (Google Drive link)', action: onEditProfile });
    if (!profile.goals) pendingItems.push({ label: 'Main career goal', action: onEditGoals });
    if (!profile.expectations) pendingItems.push({ label: 'Mentor expectations', action: onEditGoals });
    if (pendingItems.length === 0) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-orange-400">
            <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-orange-500 flex-shrink-0" size={18} />
                <h3 className="text-base font-bold text-gray-900">Pending Details</h3>
                <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">{pendingItems.length} missing</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Complete these to improve your profile visibility with mentors.</p>
            <ul className="space-y-2">
                {pendingItems.map((item, index) => (
                    <li key={index}>
                        <button onClick={item.action} className="w-full flex items-center gap-2.5 text-left group">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-orange-300 bg-orange-50 flex items-center justify-center"><span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span></span>
                            <span className="text-sm text-gray-600 flex-1 group-hover:text-orange-600 transition-colors">{item.label}</span>
                            <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const MentorshipProfile = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingGoals, setIsEditingGoals] = useState(false);
    const [editSection, setEditSection] = useState('about');
    const fileInputRef = useRef(null);

    const [uploadPhoto, { isLoading: isUploading }] = useUploadProfilePhotoMutation();
    const [deletePhoto, { isLoading: isDeleting }] = useDeleteProfilePhotoMutation();

    // ── Get userData from cookie ──────────────────────────────────────────────
    const userData = JSON.parse(Cookies.get("userData") || "{}");

    const useremail = JSON.parse(localStorage.getItem("userData") || "{}");

    console.log(useremail,"useremail")

    const { data: apiResponse, isLoading, isError, error, refetch } = useManageUserProfileQuery(userData.username);
    const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

    const profileData = apiResponse?.profile || apiResponse?.data || apiResponse;

    useEffect(() => {
        if (profileData === null && apiResponse?.message === "Profile not found") {
            setEditSection('about');
            setIsEditingProfile(true);
        }
    }, [profileData, apiResponse]);

    const handleEditProfile = () => { setEditSection('about'); setIsEditingProfile(true); };
    const handleEditGoals = () => { setEditSection('goals'); setIsEditingGoals(true); };
    const handleCloseModal = () => { setIsEditingProfile(false); setIsEditingGoals(false); };

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { alert("File size should be less than 5MB"); return; }
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) { alert("Please upload a valid image (JPG, PNG, or WEBP)"); return; }
        try { await uploadPhoto({ userId: userData.username, file }).unwrap(); await refetch(); }
        catch { alert("Failed to upload photo. Please try again."); }
    };

    const handlePhotoRemove = async () => {
        if (!confirm("Are you sure you want to remove your profile photo?")) return;
        try { await deletePhoto(userData.username).unwrap(); await refetch(); }
        catch { alert("Failed to remove photo. Please try again."); }
    };

    const handleSave = async (updatedData, shouldCloseModal = true) => {
        try {
            await saveProfile({ userId: userData.username, ...updatedData }).unwrap();
            await refetch();
            if (shouldCloseModal) setTimeout(() => handleCloseModal(), 200);
        } catch { alert("Failed to save profile. Please try again."); }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center"><Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" /><p className="text-gray-600">Loading profile...</p></div>
        </div>
    );

    if (isError && apiResponse?.message !== "Profile not found") return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
                <AlertCircle className="text-[#c2410c] h-16 w-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
                <p className="text-gray-600 mb-4">{error?.data?.message || "Failed to load profile data. Please try again."}</p>
                <button onClick={() => refetch()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">Retry</button>
            </div>
        </div>
    );

    // ── Build profile ─────────────────────────────────────────────────────────
    // If the API returned a real profile use it directly.
    // Otherwise (new user) seed fields from the cookie so the modal opens
    // already pre-filled with everything we already know about them.
    // const profile = profileData || {
    //     // ── directly available from cookie ───────────────────────────────────
    //     fullName: userData?.name || '',
    //     email: userData?.email || '',
    //     phone: userData?.phone || '',

    //     // "address" from cookie → seed city so user just needs to refine it
    //     city: (userData?.address && userData.address !== 'N/A') ? userData.address : '',
    //     country: (userData?.country && userData.country !== 'N/A') ? userData.country : '',
    //     state: (userData?.state && userData.state !== 'N/A') ? userData.state : '',

    //     // "education": cookie stores raw value like "bachelors" → map to select option
    //     highestEducation: userData?.education ? mapEducation(userData.education) : '',

    //     // "status": derive a human-readable role
    //     role: (() => {
    //         if (userData?.role === 1) return 'Mentee';
    //         if (userData?.role === 2) return 'Mentor';
    //         if (userData?.status) return mapStatus(userData.status);
    //         return '';
    //     })(),

    //     // freshers/students default years of experience to 0
    //     yearsOfExperience: (userData?.status &&
    //         ['fresher', 'student'].includes(userData.status.toLowerCase())) ? 0 : null,

    //     // ── not in cookie — user must fill ───────────────────────────────────
    //     domain: '',
    //     linkedinUrl: '',
    //     skills: [],
    //     about: '',
    //     goals: '',
    //     expectations: '',
    //     availability: '',
    //     timezone: '',
    //     target: '',
    //     currentCompany: '',
    //     previousCompanies: [],
    //     schoolCollegeName: '',
    //     targetDomains: [],
    //     targetCompanies: [],
    //     prepTimeline: '',
    //     resumeDriveLink: '',
    // };


    const profile = {
        // API value first → cookie as fallback → empty string
        fullName: profileData?.fullName || userData?.name || '',
        email: profileData?.email || useremail?.email || '',
        phone: profileData?.phone || useremail?.phone || '',

        // cookie "address" seeds the City field
        city: profileData?.city || (userData?.address !== 'N/A' ? userData?.address : '') || '',
        country: profileData?.country || '',
        state: profileData?.state || '',

        // "bachelors" → "Bachelor's Degree"
        highestEducation: profileData?.highestEducation || (userData?.education ? mapEducation(userData.education) : ''),

        // derive role from cookie status
        role: profileData?.role || (() => {
            if (userData?.role === 1) return 'Mentee';
            if (userData?.role === 2) return 'Mentor';
            if (userData?.status) return mapStatus(userData.status);
            return '';
        })(),

        // freshers auto-get 0 years experience
        yearsOfExperience: (profileData?.yearsOfExperience !== null && profileData?.yearsOfExperience !== undefined)
            ? profileData.yearsOfExperience
            : (['fresher', 'student'].includes(userData?.status?.toLowerCase()) ? 0 : null),

        // rest only come from API
        domain: profileData?.domain || '',
        linkedinUrl: profileData?.linkedinUrl || '',
        skills: Array.isArray(profileData?.skills) ? profileData.skills : [],
        about: profileData?.about || '',
        goals: profileData?.goals || '',
        expectations: profileData?.expectations || '',
        availability: profileData?.availability || '',
        timezone: profileData?.timezone || '',
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

    const calculateCompletion = () => {
        const fields = [
            profile.fullName, profile.email, profile.phone, profile.city, profile.country,
            profile.domain, profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined,
            profile.linkedinUrl, profile.about, profile.goals, profile.expectations,
            profile.highestEducation, profile.schoolCollegeName,
        ];
        return Math.round(fields.filter(Boolean).length / fields.length * 100);
    };

    const completionPercentage = calculateCompletion();
    const completionSteps = [
        { label: "Provide Basic Information", completed: !!(profile.fullName && profile.email && profile.phone) },
        { label: "Tell us your Experience", completed: !!(profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined && profile.domain) },
        { label: "Upload your resume and linkedin", completed: !!profile.linkedinUrl },
        { label: "Tell us your Goals and Expectations", completed: !!(profile.goals && profile.expectations) },
    ];
    const isNewProfile = profileData === null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            {isNewProfile && (
                <div className="max-w-7xl mx-auto mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-sm p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Welcome to Your Profile! 👋</h2>
                        <p className="text-white/90">Let's get started by completing your profile. This information will help us match you with the best mentors.</p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
                                <p className="text-gray-500 mt-1">Your Profile has integral data about you, which is shared with the mentors as well. Please keep all your information updated.</p>
                            </div>
                            <button onClick={handleEditProfile} disabled={isSaving} className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSaving ? <><Loader2 size={16} className="animate-spin" />Saving...</> : <><Edit size={16} />Edit Profile</>}
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <div className="relative group">
                                <img src={profile.profilePhotoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || userData?.name || 'User'}`} alt="Profile" className="w-20 h-20 rounded-full border-4 border-gray-100 object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => fileInputRef.current?.click()} disabled={isUploading || isDeleting} className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors" title="Change photo">
                                        {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
                                    </button>
                                    {profile.profilePhotoUrl && (
                                        <button onClick={handlePhotoRemove} disabled={isUploading || isDeleting} className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors ml-2" title="Remove photo">
                                            {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
                                        </button>
                                    )}
                                </div>
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handlePhotoUpload} className="hidden" />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{profile.fullName || "Complete your profile"}</h2>
                                    {profile.role && <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">{profile.role}</span>}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm flex-wrap">
                                    {profile.phone && <div className="flex items-center gap-2"><Phone size={16} className="flex-shrink-0" /><span>{profile.phone}</span></div>}
                                    {profile.email && <div className="flex items-center gap-2"><Mail size={16} className="flex-shrink-0" /><span className="break-all">{profile.email}</span></div>}
                                    {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700"><Linkedin size={16} className="flex-shrink-0" /><span>LinkedIn</span></a>}
                                    {profile.resumeDriveLink ? (
                                        <a href={profile.resumeDriveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 w-fit">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            <span>View Resume</span>
                                        </a>
                                    ) : !isNewProfile && (
                                        <button onClick={() => { setEditSection('resume'); setIsEditingProfile(true); }} className="flex items-center gap-2 text-orange-500 hover:text-orange-600 w-fit text-xs"><Plus size={14} /><span>Add Resume</span></button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {(profile.target || profile.domain) && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                    <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <div><span className="font-semibold text-gray-900">Target : </span><span className="text-gray-700">{profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}</span></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Goals Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div><h2 className="text-xl md:text-2xl font-bold text-gray-900">Goals & Expectations</h2><p className="text-gray-500 mt-1">Things you would like to achieve through Long Term Mentorship</p></div>
                            <button onClick={handleEditGoals} disabled={isSaving} className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"><Edit size={16} />Edit Goals</button>
                        </div>
                        <div className="space-y-6">
                            {profile.goals && <div className="flex items-start gap-3"><Target className="text-orange-500 mt-1 flex-shrink-0" size={20} /><div><span className="font-semibold text-gray-900">Main Goal : </span><span className="text-gray-700">{profile.goals}</span></div></div>}
                            {profile.expectations && <div className="flex items-start gap-3"><Heart className="text-red-500 mt-1 flex-shrink-0" size={20} /><div><span className="font-semibold text-gray-900">How you want your mentor to help in LTM : </span><span className="text-gray-700">{profile.expectations}</span></div></div>}
                            {!profile.goals && !profile.expectations && (
                                <div className="text-center py-8"><p className="text-gray-500 mb-4">No goals or expectations set yet.</p><button onClick={handleEditGoals} className="text-orange-500 hover:text-orange-600 font-medium">Add Your Goals →</button></div>
                            )}
                        </div>
                    </div>

                    {/* Additional Details Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(profile.city || profile.country) && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Location</label><p className="text-gray-900">{[profile.city, profile.country].filter(Boolean).join(', ')}</p></div>}
                            {profile.domain && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label><p className="text-gray-900">{profile.domain}</p></div>}
                            {profile.yearsOfExperience !== undefined && profile.yearsOfExperience !== null && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label><p className="text-gray-900">{profile.yearsOfExperience} {profile.yearsOfExperience === 1 ? 'year' : 'years'}</p></div>}
                            {profile.currentCompany && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Current Company</label><p className="text-gray-900">{profile.currentCompany}</p></div>}
                            {profile.highestEducation && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Education</label><p className="text-gray-900">{profile.highestEducation}</p></div>}
                            {profile.schoolCollegeName && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label><p className="text-gray-900">{profile.schoolCollegeName}</p></div>}
                            {profile.availability && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label><p className="text-gray-900">{profile.availability}</p></div>}
                            {profile.timezone && <div><label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label><p className="text-gray-900">{profile.timezone}</p></div>}
                            {profile.skills && profile.skills.length > 0 && (
                                <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                                    <div className="flex flex-wrap gap-2">{profile.skills.map((s, i) => <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{s}</span>)}</div>
                                </div>
                            )}
                            {profile.about && <div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">About</label><p className="text-gray-900 leading-relaxed">{profile.about}</p></div>}
                            {!profile.city && !profile.country && !profile.domain && (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) && !profile.availability && !profile.timezone && (!profile.skills || profile.skills.length === 0) && !profile.about && (
                                <div className="md:col-span-2 text-center py-8"><p className="text-gray-500 mb-4">No additional details added yet.</p><button onClick={handleEditProfile} className="text-orange-500 hover:text-orange-600 font-medium">Complete Your Profile →</button></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-5">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-gray-900">Profile Completion</h3>
                                <span className="text-lg font-bold text-orange-500">{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-orange-500 to-yellow-300 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {completionSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    {step.completed ? <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} /> : <Circle className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />}
                                    <span className={`text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{step.label}</span>
                                </div>
                            ))}
                        </div>
                        {completionPercentage < 100 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button onClick={handleEditProfile} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">Complete Your Profile</button>
                            </div>
                        )}
                        {completionPercentage === 100 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center gap-2 text-green-600"><CheckCircle size={24} /><span className="font-semibold">Profile Complete!</span></div>
                            </div>
                        )}
                    </div>
                    {!isNewProfile && completionPercentage < 100 && (
                        <PendingDetailsCard profile={profile} onEditProfile={handleEditProfile} onEditGoals={handleEditGoals} />
                    )}
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