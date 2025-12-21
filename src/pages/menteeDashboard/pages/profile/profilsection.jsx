import React, { useState, useEffect } from 'react';
import { Mail, X, Plus, Phone, Linkedin, Target, Heart, CheckCircle, Circle, Edit, Loader2, AlertCircle } from 'lucide-react';
import { useManageUserProfileQuery, useSaveUserProfileMutation } from './profileApiSlice';
import { CiEdit } from "react-icons/ci";


const EditProfileModal = ({ isOpen, onClose, section, profileData, onSave, isSaving }) => {
    const [currentSection, setCurrentSection] = useState(section);
    const [formData, setFormData] = useState({
        // About fields
        fullName: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        linkedinUrl: '',

        // Experience fields
        domain: '',
        role: '',
        yearsOfExperience: '',
        currentCompany: '',
        previousCompanies: [],
        skills: [],
        about: '',
        availability: '',
        timezone: '',

        // Education fields
        highestEducation: '',
        schoolCollegeName: '',

        // Goals fields
        mainGoals: '',
        targetDomains: [],
        targetCompanies: [],
        prepTimeline: '',
        mentorHelp: '',
    });

    const [inputValues, setInputValues] = useState({
        skill: '',
        domain: '',
        company: '',
        previousCompany: ''
    });

    // Update current section when prop changes
    useEffect(() => {
        setCurrentSection(section);
    }, [section]);

    // Update form data whenever profileData changes
    useEffect(() => {
        if (profileData) {
            setFormData({
                // About
                fullName: profileData.fullName || '',
                email: profileData.email || '',
                phone: profileData.phone || '',
                city: profileData.city || '',
                country: profileData.country || '',
                linkedinUrl: profileData.linkedinUrl || '',

                // Experience
                domain: profileData.domain || '',
                role: profileData.role || '',
                yearsOfExperience: profileData.yearsOfExperience || '',
                currentCompany: profileData.currentCompany || '',
                previousCompanies: profileData.previousCompanies || [],
                skills: profileData.skills || [],
                about: profileData.about || '',
                availability: profileData.availability || '',
                timezone: profileData.timezone || '',

                // Education
                highestEducation: profileData.highestEducation || '',
                schoolCollegeName: profileData.schoolCollegeName || '',

                // Goals
                mainGoals: profileData.goals || '',
                targetDomains: profileData.targetDomains || [],
                targetCompanies: profileData.targetCompanies || [],
                prepTimeline: profileData.prepTimeline || '',
                mentorHelp: profileData.expectations || '',
            });
        }
    }, [profileData]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (field, value) => {
        setInputValues(prev => ({ ...prev, [field]: value }));
    };

    const addItem = (type) => {
        const value = inputValues[type]?.trim();
        if (value) {
            if (type === 'skill') {
                setFormData(prev => ({ ...prev, skills: [...prev.skills, value] }));
            } else if (type === 'domain') {
                setFormData(prev => ({ ...prev, targetDomains: [...prev.targetDomains, value] }));
            } else if (type === 'company') {
                setFormData(prev => ({ ...prev, targetCompanies: [...prev.targetCompanies, value] }));
            } else if (type === 'previousCompany') {
                setFormData(prev => ({ ...prev, previousCompanies: [...prev.previousCompanies, value] }));
            }
            setInputValues(prev => ({ ...prev, [type]: '' }));
        }
    };

    const removeItem = (type, index) => {
        if (type === 'skill') {
            setFormData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
        } else if (type === 'domain') {
            setFormData(prev => ({ ...prev, targetDomains: prev.targetDomains.filter((_, i) => i !== index) }));
        } else if (type === 'company') {
            setFormData(prev => ({ ...prev, targetCompanies: prev.targetCompanies.filter((_, i) => i !== index) }));
        } else if (type === 'previousCompany') {
            setFormData(prev => ({ ...prev, previousCompanies: prev.previousCompanies.filter((_, i) => i !== index) }));
        }
    };

    // Prepare data based on current section
    const prepareDataForSection = () => {
        let dataToSave = {};

        if (currentSection === 'about') {
            dataToSave = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                country: formData.country,
                linkedinUrl: formData.linkedinUrl,
            };
        } else if (currentSection === 'experience') {
            dataToSave = {
                domain: formData.domain,
                role: formData.role,
                yearsOfExperience: formData.yearsOfExperience,
                currentCompany: formData.currentCompany,
                previousCompanies: formData.previousCompanies,
                skills: formData.skills,
                about: formData.about,
                availability: formData.availability,
                timezone: formData.timezone,
                highestEducation: formData.highestEducation,
                schoolCollegeName: formData.schoolCollegeName,
            };
        } else if (currentSection === 'goals') {
            dataToSave = {
                goals: formData.mainGoals,
                targetDomains: formData.targetDomains,
                targetCompanies: formData.targetCompanies,
                prepTimeline: formData.prepTimeline,
                expectations: formData.mentorHelp,
            };
        } else if (currentSection === 'resume') {
            dataToSave = {
                // Add resume related fields
            };
        }

        return dataToSave;
    };

    // Handle save button click - save and close modal
    const handleSave = async () => {
        const dataToSave = prepareDataForSection();
        await onSave(dataToSave);
        onClose();
    };

    // Handle save and continue - save and go to next section
    const handleSaveAndContinue = async () => {
        const sectionOrder = ['about', 'experience', 'resume', 'goals'];
        const currentIndex = sectionOrder.indexOf(currentSection);

        // Save current section data
        const dataToSave = prepareDataForSection();
        await onSave(dataToSave);

        // Move to next section if not last
        if (currentIndex < sectionOrder.length - 1) {
            setCurrentSection(sectionOrder[currentIndex + 1]);
        } else {
            // Last section, close modal
            onClose();
        }
    };

    const renderAboutSection = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="your.email@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="+91 1234567890"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn URL
                    </label>
                    <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                    </label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter city"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Enter country"
                    />
                </div>
            </div>
        </div>
    );

    const renderExperienceSection = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Domain <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Web Development, Data Science"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Role <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Software Developer, Student"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="0"
                        min="0"
                        step="0.5"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter 0 if you're a student or fresher</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Company
                    </label>
                    <input
                        type="text"
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Google, Amazon, or 'Student'"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highest Level of Education Achieved <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="highestEducation"
                        value={formData.highestEducation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                        required
                    >
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name of School/College <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="schoolCollegeName"
                        value={formData.schoolCollegeName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Indian Institute of Technology, Delhi"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Skills
                    </label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={inputValues.skill}
                            onChange={(e) => handleInputChange('skill', e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('skill'))}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Add a skill (e.g., React, Node.js, Python)"
                        />
                        <button
                            type="button"
                            onClick={() => addItem('skill')}
                            className="px-6 py-3 bg-[#ea580c] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeItem('skill', index)}
                                    className="hover:text-blue-900 text-lg"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderResumeSection = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume & Documents</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p className="text-gray-600 mb-2">Upload your resume</p>
                    <p className="text-sm text-gray-500 mb-4">PDF, DOC, or DOCX (Max 5MB)</p>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                        onChange={(e) => {
                            console.log('File selected:', e.target.files[0]);
                        }}
                    />
                    <label
                        htmlFor="resume-upload"
                        className="inline-block px-6 py-3 bg-[#ea580c] text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                        Choose File
                    </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Your resume will be shared with mentors when you apply for mentorship programs.
                </p>
            </div>
        </div>
    );

    const renderGoalsSection = () => (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Goals & Expectations</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Goals <span className="text-red-500">*</span>
                </label>
                <select
                    name="mainGoals"
                    value={formData.mainGoals}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    required
                >
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Domains <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={inputValues.domain}
                        onChange={(e) => handleInputChange('domain', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('domain'))}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., Frontend Developer, Backend Developer, Data Scientist"
                    />
                    <button
                        type="button"
                        onClick={() => addItem('domain')}
                        className="px-6 py-3 bg-[#ea580c] text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.targetDomains.map((domain, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            {domain}
                            <button
                                type="button"
                                onClick={() => removeItem('domain', index)}
                                className="hover:text-purple-900 text-lg"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Companies <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={inputValues.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('company'))}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="e.g., MAANG, Startups, Product Based Companies"
                    />
                    <button
                        type="button"
                        onClick={() => addItem('company')}
                        className="px-6 py-3 bg-[#ea580c] text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.targetCompanies.map((company, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            {company}
                            <button
                                type="button"
                                onClick={() => removeItem('company', index)}
                                className="hover:text-green-900 text-lg"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Preparation Timeline
                </label>
                <select
                    name="prepTimeline"
                    value={formData.prepTimeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                    <option value="">Select timeline</option>
                    <option value="Upto 1 month">Up to 1 month</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="12+ months">12+ months</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    How do you want your Mentor to help in your Long Term Mentorship? <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="mentorHelp"
                    value={formData.mentorHelp}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                    placeholder="Describe your expectations from the mentor. For example:&#10;- Help with interview preparation&#10;- Career guidance and roadmap planning&#10;- Technical skill development&#10;- Resume and portfolio review&#10;- Mock interviews&#10;- Networking and industry insights"
                    required
                />
                <p className="text-xs text-gray-500 mt-1">
                    Be specific about what kind of support you're looking for from your mentor.
                </p>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (currentSection) {
            case 'about':
                return renderAboutSection();
            case 'experience':
                return renderExperienceSection();
            case 'resume':
                return renderResumeSection();
            case 'goals':
                return renderGoalsSection();
            default:
                return renderAboutSection();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-lg w-full max-w-4xl my-4 sm:my-8 max-h-[95vh] sm:max-h-none flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl"><CiEdit /></span>
                        <span className="hidden xs:inline">Edit Profile</span>
                        <span className="xs:hidden">Edit</span>
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                        <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Sidebar + Content */}
                <div className="flex flex-col lg:flex-row">
                    {/* Sidebar - Horizontal scroll on mobile, vertical on desktop */}
                    <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
                        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2">
                            <button
                                type="button"
                                onClick={() => setCurrentSection('about')}
                                className={`flex-shrink-0 whitespace-nowrap text-left px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${currentSection === 'about'
                                    ? 'bg-[#ea580c] text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                About
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentSection('experience')}
                                className={`flex-shrink-0 whitespace-nowrap text-left px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${currentSection === 'experience'
                                    ? 'bg-[#ea580c] text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="hidden sm:inline">Experience & Education</span>
                                <span className="sm:hidden">Experience</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentSection('resume')}
                                className={`flex-shrink-0 whitespace-nowrap text-left px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${currentSection === 'resume'
                                    ? 'bg-[#ea580c] text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                Resume
                            </button>
                            <button
                                type="button"
                                onClick={() => setCurrentSection('goals')}
                                className={`flex-shrink-0 whitespace-nowrap text-left px-4 py-2 rounded-lg transition-colors text-sm lg:text-base ${currentSection === 'goals'
                                    ? 'bg-[#ea580c] text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="hidden sm:inline">Goals & Expectations</span>
                                <span className="sm:hidden">Goals</span>
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 sm:p-6 max-h-[calc(100vh-20rem)] sm:max-h-[calc(100vh-16rem)] overflow-y-auto">
                        {renderContent()}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                    >
                        Cancel
                    </button>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-[#ea580c] text-[#ea580c] rounded-lg hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {isSaving ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#ea580c] border-t-transparent"></div>
                                    Saving...
                                </>
                            ) : (
                                'Save'
                            )}
                        </button>

                        {currentSection !== 'goals' && (
                            <button
                                type="button"
                                onClick={handleSaveAndContinue}
                                disabled={isSaving}
                                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#ea580c] text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Save & Continue
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


const MentorshipProfile = () => {
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingGoals, setIsEditingGoals] = useState(false);
    const [editSection, setEditSection] = useState('about');

    const userData = JSON.parse(localStorage.getItem("userData"));

    // Fetch profile data using single API call
    const { data: profileData, isLoading, isError, error, refetch } = useManageUserProfileQuery(userData.username);

    // Save/Update profile mutation
    const [saveProfile, { isLoading: isSaving }] = useSaveUserProfileMutation();

    // Check if profile is null and auto-open edit modal
    useEffect(() => {
        if (profileData?.data === null && profileData?.message === "Profile not found") {
            setEditSection('about');
            setIsEditingProfile(true);
        }
    }, [profileData]);

    const handleEditProfile = () => {
        setEditSection('about');
        setIsEditingProfile(true);
    };

    const handleEditGoals = () => {
        setEditSection('goals');
        setIsEditingGoals(true);
    };

    const handleCloseModal = () => {
        setIsEditingProfile(false);
        setIsEditingGoals(false);
    };

    const handleSave = async (updatedData) => {
        try {
            // Add username to the data being sent
            const dataToSave = {
                userId: userData.username,
                ...updatedData
            };

            // Save data to API
            await saveProfile(dataToSave).unwrap();

            // Refetch to get updated profile data
            await refetch();

            // Note: Modal closing is handled by the modal itself
        } catch (err) {
            console.error("Failed to save profile:", err);
            alert("Failed to save profile. Please try again.");
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Error state (not profile not found, but actual errors)
    if (isError && profileData?.message !== "Profile not found") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-500 h-16 w-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
                    <p className="text-gray-600 mb-4">
                        {error?.data?.message || "Failed to load profile data. Please try again."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Handle profile data - use API data if exists, otherwise use localStorage for first time
    const profile = profileData?.data || {
        fullName: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
        city: userData?.city !== 'N/A' ? userData.city : '',
        country: userData?.country !== 'N/A' ? userData.country : '',
        state: userData?.state !== 'N/A' ? userData.state : '',
        role: userData?.role === 1 ? 'Mentee' : userData?.role === 2 ? 'Mentor' : '',
        domain: '',
        yearsOfExperience: null,
        linkedinUrl: '',
        skills: [],
        about: '',
        goals: '',
        expectations: '',
        availability: '',
        timezone: '',
        target: '',
        currentCompany: '',
        previousCompanies: [],
        highestEducation: '',
        schoolCollegeName: '',
        targetDomains: [],
        targetCompanies: [],
        prepTimeline: ''
    };

    // Calculate profile completion dynamically
    const calculateCompletion = () => {
        const fields = [
            profile.fullName,
            profile.email,
            profile.phone,
            profile.city,
            profile.country,
            profile.domain,
            profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined,
            profile.linkedinUrl,
            profile.skills?.length > 0,
            profile.about,
            profile.goals,
            profile.expectations,
            profile.availability,
        ];
        const completed = fields.filter(Boolean).length;
        return Math.round((completed / fields.length) * 100);
    };

    const completionPercentage = calculateCompletion();

    const completionSteps = [
        {
            label: "Provide Basic Information",
            completed: !!(profile.fullName && profile.email && profile.phone)
        },
        {
            label: "Tell us your Experience",
            completed: !!(profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined && profile.domain)
        },
        {
            label: "Upload your resume and linkedin",
            completed: !!profile.linkedinUrl
        },
        {
            label: "Tell us your Goals and Expectations",
            completed: !!(profile.goals && profile.expectations)
        }
    ];

    // Show welcome message when profile doesn't exist
    const isNewProfile = profileData?.data === null;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            {isNewProfile && (
                <div className="max-w-7xl mx-auto mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg shadow-sm p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">Welcome to Your Profile! 👋</h2>
                        <p className="text-white/90">
                            Let's get started by completing your profile. This information will help us match you with the best mentors.
                        </p>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Header Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
                                <p className="text-gray-500 mt-1">
                                    Your Profile has integral data about you, which is shared with the mentors as well.
                                    Please keep all your information updated.
                                </p>
                            </div>
                            <button
                                onClick={handleEditProfile}
                                disabled={isSaving}
                                className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Edit size={16} />
                                        Edit Profile
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName || userData?.name || 'User'}`}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-4 border-gray-100"
                            />
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                        {profile.fullName || "Complete Your Profile"}
                                    </h2>
                                    {profile.role && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
                                            {profile.role}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm flex-wrap">
                                    {profile.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="flex-shrink-0" />
                                            <span>{profile.phone}</span>
                                        </div>
                                    )}
                                    {profile.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="flex-shrink-0" />
                                            <span className="break-all">{profile.email}</span>
                                        </div>
                                    )}
                                    {profile.linkedinUrl && (
                                        <a
                                            href={profile.linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Linkedin size={16} className="flex-shrink-0" />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                    {!isNewProfile && (
                                        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 w-fit">
                                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>View Resume</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Target Section */}
                        {(profile.target || profile.domain) && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-start gap-3">
                                    <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <span className="font-semibold text-gray-900">Target : </span>
                                        <span className="text-gray-700">
                                            {profile.target || `${profile.role || 'Professional'} in ${profile.domain}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Goals & Expectations Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Goals & Expectations</h2>
                                <p className="text-gray-500 mt-1">
                                    Things you would like to achieve through Long Term Mentorship
                                </p>
                            </div>
                            <button
                                onClick={handleEditGoals}
                                disabled={isSaving}
                                className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Edit size={16} />
                                Edit Goals
                            </button>
                        </div>

                        <div className="space-y-6">
                            {profile.goals ? (
                                <div className="flex items-start gap-3">
                                    <Target className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <span className="font-semibold text-gray-900">Main Goal : </span>
                                        <span className="text-gray-700">{profile.goals}</span>
                                    </div>
                                </div>
                            ) : null}

                            {profile.expectations ? (
                                <div className="flex items-start gap-3">
                                    <Heart className="text-red-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <span className="font-semibold text-gray-900">How you want your mentor to help in LTM : </span>
                                        <span className="text-gray-700">{profile.expectations}</span>
                                    </div>
                                </div>
                            ) : null}

                            {!profile.goals && !profile.expectations && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No goals or expectations set yet.</p>
                                    <button
                                        onClick={handleEditGoals}
                                        className="text-orange-500 hover:text-orange-600 font-medium"
                                    >
                                        Add Your Goals →
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Additional Details Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Additional Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(profile.city || profile.country) && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <p className="text-gray-900">
                                        {[profile.city, profile.country].filter(Boolean).join(', ')}
                                    </p>
                                </div>
                            )}

                            {profile.domain && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
                                    <p className="text-gray-900">{profile.domain}</p>
                                </div>
                            )}

                            {profile.yearsOfExperience !== undefined && profile.yearsOfExperience !== null && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                                    <p className="text-gray-900">{profile.yearsOfExperience} {profile.yearsOfExperience === 1 ? 'year' : 'years'}</p>
                                </div>
                            )}

                            {profile.availability && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                                    <p className="text-gray-900">{profile.availability}</p>
                                </div>
                            )}

                            {profile.timezone && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                                    <p className="text-gray-900">{profile.timezone}</p>
                                </div>
                            )}

                            {profile.skills && profile.skills.length > 0 && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {profile.about && (
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">About</label>
                                    <p className="text-gray-900 leading-relaxed">{profile.about}</p>
                                </div>
                            )}

                            {/* Show message if no additional details */}
                            {!profile.city && !profile.country && !profile.domain &&
                                (profile.yearsOfExperience === null || profile.yearsOfExperience === undefined) &&
                                !profile.availability && !profile.timezone &&
                                (!profile.skills || profile.skills.length === 0) && !profile.about && (
                                    <div className="md:col-span-2 text-center py-8">
                                        <p className="text-gray-500 mb-4">No additional details added yet.</p>
                                        <button
                                            onClick={handleEditProfile}
                                            className="text-orange-500 hover:text-orange-600 font-medium"
                                        >
                                            Complete Your Profile →
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                {/* Profile Completion Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-gray-900">Profile Completion</h3>
                                <span className="text-lg font-bold text-gray-900">{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-orange-500 to-yellow-300 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {completionSteps.map((step, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    {step.completed ? (
                                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                    ) : (
                                        <Circle className="text-gray-300 flex-shrink-0 mt-0.5" size={20} />
                                    )}
                                    <span className={`text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {completionPercentage < 100 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={handleEditProfile}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
                                >
                                    Complete Your Profile
                                </button>
                            </div>
                        )}

                        {completionPercentage === 100 && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center gap-2 text-green-600">
                                    <CheckCircle size={24} />
                                    <span className="font-semibold">Profile Complete!</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Modal */}
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