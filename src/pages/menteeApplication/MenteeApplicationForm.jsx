

// MenteeApplicationForm - Professional Version
import React, { useState, useEffect } from 'react';
import { Check, User, Briefcase, GraduationCap, Target, CheckCircle2, Mail, Phone, MapPin, Calendar, Linkedin, Github, Award, FileText, Video, Sparkles } from 'lucide-react';
import { useSubmitMenteeApplicationMutation } from './menteeApplicationapislice'

const MenteeApplicationForm = () => {
    // Load current step from localStorage
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem('menteeFormStep');
        return saved ? parseInt(saved) : 1;
    });

    const [errors, setErrors] = useState({});
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [submissionResponse, setSubmissionResponse] = useState(null);

    // Load form data from localStorage on mount
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('menteeFormData');
        return saved ? JSON.parse(saved) : {
            fullName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            location: '',
            motivationStatement: '',
            areasOfInterest: '',
            mentoringStyle: '',
            linkedinUrl: '',
            githubUrl: '',
            alternativeEmail: '',
            highestDegree: '',
            fieldOfStudy: '',
            schoolName: '',
            additionalCourses: '',
            currentRole: '',
            customRole: '',
            companyName: '',
            yearsOfExperience: '',
            currentSkills: '',
            resumeLink: '',
            introVideoLink: '',
            whyMentor: '',
            greatestAchievement: '',
            featuredArticle: '',
            agreeToTerms: false,
            consentToShare: false
        };
    });

    const suggestedInterests = [
        'Web Development',
        'App Development',
        'UI/UX Design',
        'Leadership',
        'Project Management',
        'AI & ML',
        'Blockchain',
        'Career Guidance',
        'Data Science',
        'Cloud Computing',
        'DevOps',
        'Product Strategy'
    ];

    const suggestedRoles = [
        'Full Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Software Engineer',
        'Data Scientist',
        'Data Analyst',
        'DevOps Engineer',
        'Mobile App Developer',
        'UI/UX Designer',
        'Product Manager',
        'Project Manager',
        'Business Analyst',
        'Marketing Manager',
        'Digital Marketing Specialist',
        'Content Writer',
        'Graphic Designer',
        'Sales Manager',
        'HR Manager',
        'Financial Analyst',
        'Consultant',
        'Entrepreneur',
        'Student',
        'Recent Graduate',
        'Career Changer',
        'Other'
    ];

    // Load areas of interest from localStorage
    const [areasOfInterest, setAreasOfInterest] = useState(() => {
        const saved = localStorage.getItem('menteeAreasOfInterest');
        return saved ? JSON.parse(saved) : [];
    });

    const addInterest = (interest) => {
        if (!areasOfInterest.includes(interest)) {
            const updated = [...areasOfInterest, interest];
            setAreasOfInterest(updated);
            localStorage.setItem('menteeAreasOfInterest', JSON.stringify(updated));
        }
    };

    const removeInterest = (interest) => {
        const updated = areasOfInterest.filter(i => i !== interest);
        setAreasOfInterest(updated);
        localStorage.setItem('menteeAreasOfInterest', JSON.stringify(updated));
    };

    // RTK Query Mutation Hook
    const [submitApplication, { isLoading, isSuccess, isError, error: submitError }] = useSubmitMenteeApplicationMutation();

    const steps = [
        { number: 1, name: 'Personal Info', icon: User, description: 'Basic information' },
        { number: 2, name: 'Goals & Interests', icon: Target, description: 'Your aspirations' },
        { number: 3, name: 'Education', icon: GraduationCap, description: 'Academic background' },
        { number: 4, name: 'Experience', icon: Briefcase, description: 'Professional details' }
    ];

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('menteeFormData', JSON.stringify(formData));
    }, [formData]);

    // Save current step to localStorage
    useEffect(() => {
        localStorage.setItem('menteeFormStep', currentStep.toString());
    }, [currentStep]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle success response
    useEffect(() => {
        if (isSuccess) {
            setSubmissionResponse({
                applicationId: 'APP' + Date.now(),
                submittedAt: new Date().toISOString(),
                name: formData.fullName,
                email: formData.email
            });

            setShowSuccessScreen(true);

            // Clear localStorage
            localStorage.removeItem('menteeFormData');
            localStorage.removeItem('menteeFormStep');
            localStorage.removeItem('menteeAreasOfInterest');
        }
    }, [isSuccess, formData.fullName, formData.email]);

    const validateSection = (section) => {
        const newErrors = {};

        if (section === 1) {
            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Full name is required';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
                newErrors.phone = 'Please enter a valid phone number';
            }

            if (!formData.motivationStatement.trim()) {
                newErrors.motivationStatement = 'Motivation statement is required';
            } else if (formData.motivationStatement.trim().length < 50) {
                newErrors.motivationStatement = 'Please provide at least 50 characters';
            }
        }

        if (section === 2) {
            if (areasOfInterest.length === 0) {
                newErrors.areasOfInterest = 'Please select at least one area of interest';
            }

            if (formData.linkedinUrl && !formData.linkedinUrl.startsWith('https://www.linkedin.com/')) {
                newErrors.linkedinUrl = 'LinkedIn URL must start with https://www.linkedin.com/';
            }

            if (formData.githubUrl && !formData.githubUrl.startsWith('https://github.com/')) {
                newErrors.githubUrl = 'GitHub URL must start with https://github.com/';
            }

            if (formData.alternativeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.alternativeEmail)) {
                newErrors.alternativeEmail = 'Please enter a valid email address';
            }
        }

        if (section === 3) {
            if (!formData.highestDegree.trim()) {
                newErrors.highestDegree = 'Highest degree is required';
            }

            if (!formData.fieldOfStudy.trim()) {
                newErrors.fieldOfStudy = 'Field of study is required';
            }

            if (!formData.schoolName.trim()) {
                newErrors.schoolName = 'School/University name is required';
            }
        }

        if (section === 4) {
            if (!formData.currentRole.trim()) {
                newErrors.currentRole = 'Current role is required';
            }

            if (formData.currentRole === 'Other' && !formData.customRole.trim()) {
                newErrors.customRole = 'Please specify your role';
            }

            if (!formData.companyName.trim()) {
                newErrors.companyName = 'Company name is required';
            }

            if (formData.yearsOfExperience && isNaN(parseFloat(formData.yearsOfExperience))) {
                newErrors.yearsOfExperience = 'Please enter a valid number';
            }

            if (formData.resumeLink && !/^https?:\/\/.+/.test(formData.resumeLink)) {
                newErrors.resumeLink = 'Please enter a valid URL (starting with http:// or https://)';
            }

            if (formData.introVideoLink && !/^https?:\/\/.+/.test(formData.introVideoLink)) {
                newErrors.introVideoLink = 'Please enter a valid URL (starting with http:// or https://)';
            }

            if (formData.featuredArticle && !/^https?:\/\/.+/.test(formData.featuredArticle)) {
                newErrors.featuredArticle = 'Please enter a valid URL (starting with http:// or https://)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateSection(currentStep)) {
            if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle form submission with RTK Query
    const handleSubmit = async () => {
        if (validateSection(4)) {
            try {
                const submissionData = {
                    ...formData,
                    areasOfInterest: areasOfInterest.join(', ')
                };

                const result = await submitApplication(submissionData).unwrap();
                console.log('Application submitted successfully:', result);
            } catch (err) {
                console.error('Failed to submit application:', err);
            }
        }
    };

    // Handle error response
    useEffect(() => {
        if (isError) {
            const errorMessage = submitError?.data?.message || 'Failed to submit application. Please try again.';
            alert('❌ ' + errorMessage);
        }
    }, [isError, submitError]);

    const renderInput = (label, name, type = 'text', required = false, placeholder = '', icon = null) => (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                />
            </div>
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const renderTextarea = (label, name, required = false, placeholder = '', rows = 4) => (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required }
            </label>
            <textarea
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                rows={rows}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed resize-none ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
            />
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const renderSelect = (label, name, options, required = false, placeholder = "Select an option") => (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label} {required }
            </label>
            <select
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none bg-white ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const SuccessScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-24">
            <div className="max-w-md w-full">
                {/* Success Card */}
                <div className="bg-white rounded-xl p-6 text-center relative overflow-hidden">
                    {/* Decorative background */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

                    {/* Success Icon */}
                    <div className="mb-4 flex justify-center">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2} />
                                </div>
                            </div>
                            <div className="absolute inset-0 w-20 h-20 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Application Submitted!
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Your mentor application has been successfully submitted. We'll review it and get back to you soon.
                    </p>

                    {/* Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left border border-gray-200 text-sm">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <span className="text-gray-600 font-medium">Application ID</span>
                                <span className="font-mono font-bold text-emerald-600">
                                    {submissionResponse?.applicationId}
                                </span>
                            </div>

                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <span className="text-gray-600 font-medium">Applicant Name</span>
                                <span className="font-semibold text-gray-800">{submissionResponse?.name}</span>
                            </div>

                            <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                                <span className="text-gray-600 font-medium">Email</span>
                                <span className="font-medium text-gray-800 truncate max-w-[180px]">
                                    {submissionResponse?.email}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Submitted On</span>
                                <span className="font-semibold text-gray-800 text-sm">
                                    {new Date(submissionResponse?.submittedAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Email Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-4 text-xs flex items-center justify-center gap-1">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <p className="text-blue-800">
                            Confirmation email sent to <strong>{submissionResponse?.email}</strong>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                setShowSuccessScreen(false);
                                setCurrentStep(1);
                                setFormData({
                                    fullName: '',
                                    email: '',
                                    phone: '',
                                    dateOfBirth: '',
                                    location: '',
                                    motivationStatement: '',
                                    areasOfInterest: '',
                                    mentoringStyle: '',
                                    linkedinUrl: '',
                                    githubUrl: '',
                                    alternativeEmail: '',
                                    highestDegree: '',
                                    fieldOfStudy: '',
                                    schoolName: '',
                                    additionalCourses: '',
                                    currentRole: '',
                                    customRole: '',
                                    companyName: '',
                                    yearsOfExperience: '',
                                    currentSkills: '',
                                    resumeLink: '',
                                    introVideoLink: '',
                                    whyMentor: '',
                                    greatestAchievement: '',
                                    featuredArticle: '',
                                    agreeToTerms: false,
                                    consentToShare: false
                                });
                                setAreasOfInterest([]);
                            }}
                            className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all"
                        >
                            Submit Another Application
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );


    return (
        <>
            {showSuccessScreen ? (
                <SuccessScreen />
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 pt-24 px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">

                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#062117] to-[#0098cc] bg-clip-text text-transparent">
                                        Mentor Application
                                    </h1>
                                    <p className="text-gray-600 text-sm mt-1">Join our mentorship program and accelerate your growth</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-100">
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isCompleted = currentStep > step.number;
                                    const isCurrent = currentStep === step.number;

                                    return (
                                        <React.Fragment key={step.number}>
                                            <div className="flex flex-col items-center flex-1">
                                                <div
                                                    className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold transition-all ${isCompleted
                                                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-105'
                                                        : isCurrent
                                                            ? 'bg-gradient-to-br from-[#0098cc] to-[#062117] text-white scale-110 ring-4 ring-blue-100'
                                                            : 'bg-gray-100 text-gray-400'
                                                        }`}
                                                >
                                                    {isCompleted ? <Check size={24} strokeWidth={3} /> : <Icon size={24} />}
                                                </div>
                                                <div className="text-center mt-3">
                                                    <div className={`text-sm font-bold ${isCurrent ? 'text-[#062117]' : isCompleted ? 'text-emerald-600' : 'text-gray-500'}`}>
                                                        {step.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
                                                </div>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`flex-1 h-2 mx-4 rounded-full transition-all ${isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gray-200'
                                                    }`} />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="bg-white rounded-2xl p-10 flex flex-col items-center">
                                    <div className="relative">
                                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"></div>
                                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#0098cc] border-t-transparent absolute top-0"></div>
                                    </div>
                                    <p className="mt-6 text-gray-700 font-semibold text-lg">Submitting your application...</p>
                                    <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
                                </div>
                            </div>
                        )}

                        {/* Form Content */}
                        <div className="bg-white rounded-2xl p-10 border border-gray-100">
                            {/* Section 1: Personal Info */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <User className="w-7 h-7 text-[#0098cc]" />
                                            Personal Information
                                        </h2>
                                        <p className="text-gray-600 text-sm">Tell us about yourself</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            {renderInput('Full Name', 'fullName', 'text', true, 'Enter your full name', <User size={18} />)}
                                        </div>
                                        {renderInput('Email Address', 'email', 'email', true, 'your.email@example.com', <Mail size={18} />)}
                                        {renderInput('Phone Number', 'phone', 'tel', false, '+1 (555) 000-0000', <Phone size={18} />)}
                                        {renderInput('Date of Birth', 'dateOfBirth', 'date', false, '', <Calendar size={18} />)}
                                        <div className="md:col-span-2">
                                            {renderInput('Location', 'location', 'text', false, 'City, Country', <MapPin size={18} />)}
                                        </div>
                                        <div className="md:col-span-2">
                                            {renderTextarea(
                                                'Motivation Statement',
                                                'motivationStatement',
                                                true,
                                                'Tell us why you want a mentor and what you hope to achieve through this mentorship program... (Minimum 50 characters)',
                                                5
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 2: Goals & Interests */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <Target className="w-7 h-7 text-[#0098cc]" />
                                            Goals & Interests
                                        </h2>
                                        <p className="text-gray-600 text-sm">What areas do you want to grow in?</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Areas of Interest */}
                                        <div className="mb-2">
                                            <label className="block mb-3 font-semibold text-gray-700 text-sm">
                                                Areas of Interest / Skills to Develop <span className="text-red-500">*</span>
                                            </label>

                                            {/* Selected Interests */}
                                            {areasOfInterest.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200">
                                                    {areasOfInterest.map((interest) => (
                                                        <span
                                                            key={interest}
                                                            className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all"
                                                        >
                                                            {interest}
                                                            <button
                                                                type="button"
                                                                onClick={() => removeInterest(interest)}
                                                                className="hover:bg-white hover:text-teal-600 rounded-full w-5 h-5 flex items-center justify-center transition-all"
                                                            >
                                                                ✕
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Suggestions */}
                                            <div className="mb-4">
                                                <p className="text-xs text-gray-600 mb-3 font-medium">Popular suggestions:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {suggestedInterests
                                                        .filter((interest) => !areasOfInterest.includes(interest))
                                                        .map((interest) => (
                                                            <button
                                                                key={interest}
                                                                type="button"
                                                                onClick={() => addInterest(interest)}
                                                                className="border-2 border-teal-300 text-teal-700 px-4 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 hover:text-white hover:border-transparent transition-all font-medium"
                                                            >
                                                                + {interest}
                                                            </button>
                                                        ))}
                                                </div>
                                            </div>

                                            {/* Custom Input */}
                                            <input
                                                type="text"
                                                placeholder="Type a custom interest and press Enter..."
                                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all hover:border-gray-300"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        e.preventDefault();
                                                        addInterest(e.target.value.trim());
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                            {errors.areasOfInterest && (
                                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                                    {errors.areasOfInterest}
                                                </p>
                                            )}
                                        </div>

                                        {/* Mentoring Style */}
                                        {renderSelect(
                                            'Preferred Mentoring Style',
                                            'mentoringStyle',
                                            ['One-on-One', 'Group Sessions', 'Online', ' Any'],
                                            false,
                                            'Select your preferred style'
                                        )}

                                        {/* Social Links */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {renderInput('LinkedIn Profile', 'linkedinUrl', 'url', false, 'https://linkedin.com/in/yourprofile', <Linkedin size={18} />)}
                                            {renderInput('GitHub Profile', 'githubUrl', 'url', false, 'https://github.com/yourusername', <Github size={18} />)}
                                        </div>

                                        {/* Alternative Email */}
                                        {renderInput('Alternative Email (Optional)', 'alternativeEmail', 'email', false, 'alternative@example.com', <Mail size={18} />)}
                                    </div>
                                </div>
                            )}

                            {/* Section 3: Education */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <GraduationCap className="w-7 h-7 text-[#0098cc]" />
                                            Education Background
                                        </h2>
                                        <p className="text-gray-600 text-sm">Share your academic journey</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            {renderInput('Highest Degree / Certification', 'highestDegree', 'text', true, 'e.g., Bachelor of Science, MBA, Professional Certificate')}
                                        </div>
                                        {renderInput('Field of Study / Major', 'fieldOfStudy', 'text', true, 'e.g., Computer Science, Business Administration')}
                                        {renderInput('School / University Name', 'schoolName', 'text', true, 'e.g., Stanford University, MIT')}
                                        <div className="md:col-span-2">
                                            {renderTextarea(
                                                'Additional Courses / Certifications',
                                                'additionalCourses',
                                                false,
                                                'List any additional courses, certifications, bootcamps, or training programs you\'ve completed...',
                                                4
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Section 4: Experience */}
                            {currentStep === 4 && (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                            <Briefcase className="w-7 h-7 text-[#0098cc]" />
                                            Professional Experience
                                        </h2>
                                        <p className="text-gray-600 text-sm">Tell us about your career path</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Current Role with Dropdown */}
                                        <div className="md:col-span-2 mb-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Current Role / Job Title
                                            </label>
                                            <select
                                                name="currentRole"
                                                value={formData.currentRole || ''}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none bg-white ${errors.currentRole ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select your current role</option>
                                                {suggestedRoles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                            {errors.currentRole && (
                                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                                    {errors.currentRole}
                                                </p>
                                            )}

                                            {/* Custom Role Input */}
                                            {formData.currentRole === 'Other' && (
                                                <div className="mt-4">
                                                    <input
                                                        type="text"
                                                        name="customRole"
                                                        value={formData.customRole || ''}
                                                        onChange={handleInputChange}
                                                        placeholder="Please specify your role"
                                                        disabled={isLoading}
                                                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0098cc] focus:border-transparent transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${errors.customRole ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    />
                                                    {errors.customRole && (
                                                        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                                            <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                                                            {errors.customRole}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {renderInput('Company / Organization Name', 'companyName', 'text', true, 'e.g., Google, Microsoft, Acme Corp')}
                                        {renderInput('Years of Experience', 'yearsOfExperience', 'text', false, 'e.g., 3 or 3.5')}

                                        <div className="md:col-span-2">
                                            {renderTextarea(
                                                'Current Skills & Strengths',
                                                'currentSkills',
                                                false,
                                                'Describe your key skills, technical expertise, and professional strengths...',
                                                4
                                            )}
                                        </div>

                                        {renderInput('Resume / Portfolio Link', 'resumeLink', 'url', false, 'https://yourportfolio.com or Google Drive link', <FileText size={18} />)}
                                        {renderInput('Introduction Video', 'introVideoLink', 'url', false, 'https://youtube.com/... or Loom link', <Video size={18} />)}

                                        <div className="md:col-span-2">
                                            {renderTextarea(
                                                'Why do you want to become a mentor?',
                                                'whyMentor',
                                                false,
                                                'Share your motivations and what you hope to gain from this mentorship experience...',
                                                4
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            {renderTextarea(
                                                'Greatest Achievement So Far',
                                                'greatestAchievement',
                                                false,
                                                'Tell us about your proudest professional or personal achievement...',
                                                4
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            {renderInput('Featured Article / Podcast / Interview', 'featuredArticle', 'url', false, 'Link to any publications or media featuring you', <Award size={18} />)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-10 pt-8 border-t-2 border-gray-100">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 1 || isLoading}
                                    className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${currentStep === 1 || isLoading
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    ← Back
                                </button>

                                {currentStep < 4 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-gradient-to-r from-[#0098cc] to-[#062117] text-white rounded-xl font-semibold hover:from-[#0080b3] hover:to-[#051b14] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 flex items-center gap-2"
                                    >
                                        Next →
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 flex items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenteeApplicationForm;