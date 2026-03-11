import React, { useState, useEffect } from 'react';
import { Check, User, Briefcase, GraduationCap, Target, CheckCircle2, Mail, Phone, MapPin, Calendar, Linkedin, Github, Award, FileText, Video } from 'lucide-react';
import { useSubmitMenteeApplicationMutation } from './menteeApplicationapislice'
import { useNavigate } from 'react-router-dom';
import Loader from '../../global/Loader';

const MENTOR_CATEGORIES = [
    "Engineering Mentors",
    "Startup Mentors",
    "Product Mentors",
    "Marketing Mentors",
    "Leadership Mentors",
    "Career Mentors",
    "AI Mentors"
];

const MenteeApplicationForm = () => {
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem('menteeFormStep');
        return saved ? parseInt(saved) : 1;
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [submissionResponse, setSubmissionResponse] = useState(null);
    const [currentSkills, setCurrentSkills] = useState(() => {
        const saved = localStorage.getItem('menteeCurrentSkills');
        return saved ? JSON.parse(saved) : [];
    });

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
            mentorCategory: '',
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
        'Web Development', 'App Development', 'UI/UX Design', 'Leadership',
        'Project Management', 'AI & ML', 'Blockchain', 'Career Guidance',
        'Data Science', 'Cloud Computing', 'DevOps', 'Product Strategy'
    ];

    const suggestedRoles = [
        'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
        'Software Engineer', 'Data Scientist', 'Data Analyst', 'DevOps Engineer',
        'Mobile App Developer', 'UI/UX Designer', 'Product Manager', 'Project Manager',
        'Business Analyst', 'Marketing Manager', 'Digital Marketing Specialist',
        'Content Writer', 'Graphic Designer', 'Sales Manager', 'HR Manager',
        'Financial Analyst', 'Consultant', 'Entrepreneur', 'Student',
        'Recent Graduate', 'Career Changer', 'Other'
    ];

    const [areasOfInterest, setAreasOfInterest] = useState(() => {
        const saved = localStorage.getItem('menteeAreasOfInterest');
        return saved ? JSON.parse(saved) : [];
    });


    const addSkill = (skill) => {
        if (!currentSkills.includes(skill)) {
            const updated = [...currentSkills, skill];
            setCurrentSkills(updated);
            localStorage.setItem('menteeCurrentSkills', JSON.stringify(updated));
        }
    };

    const removeSkill = (skill) => {
        const updated = currentSkills.filter(s => s !== skill);
        setCurrentSkills(updated);
        localStorage.setItem('menteeCurrentSkills', JSON.stringify(updated));
    };
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

    const [submitApplication, { isLoading, isSuccess, isError, error: submitError }] = useSubmitMenteeApplicationMutation();

    const steps = [
        { number: 1, name: 'Personal', icon: User },
        { number: 2, name: 'Goals', icon: Target },
        { number: 3, name: 'Education', icon: GraduationCap },
        { number: 4, name: 'Experience', icon: Briefcase }
    ];

    // Reset success screen on mount to prevent it showing again on navigation
    useEffect(() => {
        setShowSuccessScreen(false);
    }, []);

    useEffect(() => {
        localStorage.setItem('menteeFormData', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem('menteeFormStep', currentStep.toString());
    }, [currentStep]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setSubmissionResponse({
                applicationId: 'APP' + Date.now(),
                submittedAt: new Date().toISOString(),
                name: formData.fullName,
                email: formData.email
            });
            setShowSuccessScreen(true);
            localStorage.removeItem('menteeFormData');
            localStorage.removeItem('menteeFormStep');
            localStorage.removeItem('menteeAreasOfInterest');
        }
    }, [isSuccess, formData.fullName, formData.email]);

    const validateSection = (section) => {
        const newErrors = {};

        if (section === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
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
            if (areasOfInterest.length === 0) newErrors.areasOfInterest = 'Please select at least one area of interest';
            if (!formData.mentoringStyle?.trim()) newErrors.mentoringStyle = 'Please select a mentoring style';
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
            if (!formData.highestDegree.trim()) newErrors.highestDegree = 'Highest degree is required';
            if (!formData.fieldOfStudy.trim()) newErrors.fieldOfStudy = 'Field of study is required';
            if (!formData.schoolName.trim()) newErrors.schoolName = 'School/University name is required';
        }

        if (section === 4) {
            if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required';
            if (formData.currentRole === 'Other' && !formData.customRole.trim()) newErrors.customRole = 'Please specify your role';
            if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
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

    const handleSubmit = async () => {
        if (validateSection(4)) {
            try {
                const submissionData = {
                    ...formData,
                    areasOfInterest: areasOfInterest.join(', '),
                    currentSkills: currentSkills.join(', ')
                };
                const result = await submitApplication(submissionData).unwrap();
                navigate("/mentee/apply")
                console.log('Application submitted successfully:', result);
            } catch (err) {
                console.error('Failed to submit application:', err);
            }
        }
    };

    useEffect(() => {
        if (isError) {
            const errorMessage = submitError?.data?.message || 'Failed to submit application. Please try again.';
            alert('❌ ' + errorMessage);
        }
    }, [isError, submitError]);

    const renderInput = (label, name, type = 'text', required = false, placeholder = '', icon = null) => (
        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
                )}
                <input
                    type={type}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className={`w-full ${icon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] focus:border-[#0098cc] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                />
            </div>
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const renderTextarea = (label, name, required = false, placeholder = '', rows = 3) => (
        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                rows={rows}
                disabled={isLoading}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] focus:border-[#0098cc] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed resize-none ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            />
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const renderSelect = (label, name, options, required = false, placeholder = "Select an option") => (
        <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] focus:border-[#0098cc] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none bg-white ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
            >
                <option value="">{placeholder}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                    {errors[name]}
                </p>
            )}
        </div>
    );

    const SuccessScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-4 text-sm">Your application has been successfully submitted. We'll review it and get back to you soon.</p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left border border-gray-200 text-xs space-y-2">
                        {[
                            { label: 'Application ID', val: <span className="font-mono font-bold text-emerald-600">{submissionResponse?.applicationId}</span> },
                            { label: 'Name', val: submissionResponse?.name },
                            { label: 'Email', val: <span className="truncate max-w-[180px] inline-block">{submissionResponse?.email}</span> },
                            { label: 'Submitted', val: new Date(submissionResponse?.submittedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) },
                        ].map(({ label, val }, i, arr) => (
                            <div key={label} className={`flex justify-between items-center ${i < arr.length - 1 ? 'pb-1.5 border-b border-gray-200' : ''}`}>
                                <span className="text-gray-600 font-medium">{label}</span>
                                <span className="font-semibold text-gray-800">{val}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-4 text-xs flex items-center justify-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <p className="text-blue-800">Confirmation sent to <strong>{submissionResponse?.email}</strong></p>
                    </div>

                    {/* Go to Login Button */}
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-2 mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold text-sm hover:from-emerald-700 hover:to-teal-700 transition-all"
                    >
                        Go to Login
                    </button>

                    {/* Submit Another Application Button */}
                    <button
                        onClick={() => navigate('/mentee-apply')}
                        className="w-full py-2 border border-gray-300 text-gray-600 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {showSuccessScreen ? (
                <SuccessScreen />
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 pt-20 px-4">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <div className="bg-white rounded-xl p-5 mb-5 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <div>
                                    <h1 className="text-xl font-bold text-[#0098cc]">Mentor application</h1>
                                    <p className="text-gray-600 text-xs mt-0.5">Join our mentorship program</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="bg-white rounded-xl p-4 mb-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isCompleted = currentStep > step.number;
                                    const isCurrent = currentStep === step.number;
                                    return (
                                        <React.Fragment key={step.number}>
                                            <div className="flex flex-col items-center flex-1">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${isCompleted ? 'bg-[#0098cc] text-white' : isCurrent ? 'bg-[#0098cc] text-white ring-2 ring-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                                                    {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
                                                </div>
                                                <div className={`text-xs font-semibold mt-1.5 ${isCurrent || isCompleted ? 'text-[#0098cc]' : 'text-gray-500'}`}>
                                                    {step.name}
                                                </div>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${isCompleted ? 'bg-[#0098cc]' : 'bg-gray-200'}`} />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl p-8 flex flex-col items-center">
                                    <div className="relative">
                                        <Loader />
                                    </div>
                                    <p className="mt-4 text-gray-700 font-semibold">Submitting application...</p>
                                </div>
                            </div>
                        )}

                        {/* Form Content */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">

                            {/* Step 1: Personal Info */}
                            {currentStep === 1 && (
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            <User className="w-5 h-5 text-[#0098cc]" />
                                            Personal Information
                                        </h2>
                                        <p className="text-gray-600 text-xs">Tell us about yourself</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            {renderInput('Full Name', 'fullName', 'text', true, 'Enter your full name', <User size={16} />)}
                                        </div>
                                        {renderInput('Email Address', 'email', 'email', true, 'your.email@example.com', <Mail size={16} />)}
                                        {renderInput('Phone Number', 'phone', 'tel', false, '+1 (555) 000-0000', <Phone size={16} />)}
                                        {renderInput('Date of Birth', 'dateOfBirth', 'date', false, '', <Calendar size={16} />)}
                                        <div className="md:col-span-2">
                                            {renderInput('Location', 'location', 'text', false, 'City, Country', <MapPin size={16} />)}
                                        </div>
                                        <div className="md:col-span-2">
                                            {renderTextarea('Motivation Statement', 'motivationStatement', true, 'Tell us why you want a mentor and what you hope to achieve... (Min. 50 characters)', 4)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Goals & Interests */}
                            {currentStep === 2 && (
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-[#0098cc]" />
                                            Goals & Interests
                                        </h2>
                                        <p className="text-gray-600 text-xs">What areas do you want to grow in?</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Areas of Interest */}
                                        <div className="mb-2">
                                            <label className="block mb-2 font-semibold text-gray-700 text-xs">
                                                Areas of Interest <span className="text-red-500">*</span>
                                            </label>
                                            {areasOfInterest.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                    {areasOfInterest.map((interest) => (
                                                        <span key={interest} className="bg-[#0098cc] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium">
                                                            {interest}
                                                            <button type="button" onClick={() => removeInterest(interest)} className="hover:bg-white hover:text-[#0098cc] rounded-full w-4 h-4 flex items-center justify-center text-xs">✕</button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mb-3">
                                                <p className="text-xs text-gray-600 mb-2 font-medium">Suggestions:</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {suggestedInterests.filter(i => !areasOfInterest.includes(i)).map(interest => (
                                                        <button key={interest} type="button" onClick={() => addInterest(interest)}
                                                            className="border border-blue-300 text-[#0098cc] px-3 py-1 rounded-full text-xs hover:bg-[#0098cc] hover:text-white hover:border-transparent transition-all font-medium">
                                                            + {interest}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Type custom interest and press Enter..."
                                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] hover:border-gray-400"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        e.preventDefault();
                                                        addInterest(e.target.value.trim());
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                            {errors.areasOfInterest && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />{errors.areasOfInterest}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {renderSelect(
                                                'Preferred Mentoring Style',
                                                'mentoringStyle',
                                                ["1-on-1", "Group Session", "Webinar"],
                                                true,
                                                'Select your preferred style'
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {renderInput('LinkedIn Profile', 'linkedinUrl', 'url', false, 'https://linkedin.com/in/yourprofile', <Linkedin size={16} />)}
                                            {renderInput('GitHub Profile', 'githubUrl', 'url', false, 'https://github.com/yourusername', <Github size={16} />)}
                                        </div>

                                        {renderInput('Alternative Email', 'alternativeEmail', 'email', false, 'alternative@example.com', <Mail size={16} />)}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Education */}
                            {currentStep === 3 && (
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5 text-[#0098cc]" />
                                            Education Background
                                        </h2>
                                        <p className="text-gray-600 text-xs">Share your academic journey</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            {renderInput('Highest Degree / Certification', 'highestDegree', 'text', true, 'e.g., Bachelor of Science, MBA')}
                                        </div>
                                        {renderInput('Field of Study', 'fieldOfStudy', 'text', true, 'e.g., Computer Science')}
                                        {renderInput('School / University', 'schoolName', 'text', true, 'e.g., Stanford University')}
                                        <div className="md:col-span-2">
                                            {renderTextarea('Additional Courses / Certifications', 'additionalCourses', false, 'List any additional courses, certifications, or training programs...', 3)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Experience */}
                            {currentStep === 4 && (
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-[#0098cc]" />
                                            Professional Experience
                                        </h2>
                                        <p className="text-gray-600 text-xs">Tell us about your career</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2 mb-2">
                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                                Current Role <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                name="currentRole"
                                                value={formData.currentRole || ''}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] focus:border-[#0098cc] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none bg-white ${errors.currentRole ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                                            >
                                                <option value="">Select your current role</option>
                                                {suggestedRoles.map(role => <option key={role} value={role}>{role}</option>)}
                                            </select>
                                            {errors.currentRole && (
                                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />{errors.currentRole}
                                                </p>
                                            )}
                                            {formData.currentRole === 'Other' && (
                                                <div className="mt-3">
                                                    <input
                                                        type="text"
                                                        name="customRole"
                                                        value={formData.customRole || ''}
                                                        onChange={handleInputChange}
                                                        placeholder="Please specify your role"
                                                        disabled={isLoading}
                                                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] focus:border-[#0098cc] transition-all disabled:bg-gray-50 disabled:cursor-not-allowed ${errors.customRole ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-gray-400'}`}
                                                    />
                                                    {errors.customRole && (
                                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                                            <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />{errors.customRole}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {renderInput('Company / Organization', 'companyName', 'text', true, 'e.g., Google, Microsoft')}
                                        {renderInput('Years of Experience', 'yearsOfExperience', 'text', false, 'e.g., 3 or 3.5')}
                                        // REPLACE WITH THIS:
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                                Current Skills & Strengths
                                            </label>
                                            {currentSkills.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                    {currentSkills.map((skill) => (
                                                        <span key={skill} className="bg-[#0098cc] text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium">
                                                            {skill}
                                                            <button type="button" onClick={() => removeSkill(skill)}
                                                                className="hover:bg-white hover:text-[#0098cc] rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                                                ✕
                                                            </button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    id="skill-input"
                                                    placeholder="Type a skill and press Enter or click +"
                                                    disabled={isLoading}
                                                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0098cc] hover:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                                            e.preventDefault();
                                                            addSkill(e.target.value.trim());
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const input = document.getElementById('skill-input');
                                                        if (input && input.value.trim()) {
                                                            addSkill(input.value.trim());
                                                            input.value = '';
                                                        }
                                                    }}
                                                    disabled={isLoading}
                                                    className="px-4 py-2 bg-[#0098cc] text-white rounded-lg text-lg font-bold hover:bg-[#007ba8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        {renderInput('Resume / Portfolio Link', 'resumeLink', 'url', false, 'https://yourportfolio.com', <FileText size={16} />)}
                                        {renderInput('Introduction Video', 'introVideoLink', 'url', false, 'https://youtube.com/...', <Video size={16} />)}
                                        <div className="md:col-span-2">
                                            {renderTextarea('Why do you want a mentor?', 'whyMentor', false, 'Share your motivations and goals...', 3)}
                                        </div>
                                        <div className="md:col-span-2">
                                            {renderTextarea('Greatest Achievement', 'greatestAchievement', false, 'Tell us about your proudest achievement...', 3)}
                                        </div>
                                        <div className="md:col-span-2">
                                            {renderInput('Featured Article / Media', 'featuredArticle', 'url', false, 'Link to publications or media', <Award size={16} />)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between mt-6 pt-5 border-t border-gray-200">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 1 || isLoading}
                                    className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-1.5 ${currentStep === 1 || isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                    ← Back
                                </button>
                                {currentStep < 4 ? (
                                    <button onClick={handleNext} disabled={isLoading}
                                        className="px-5 py-2 bg-[#0098cc] text-white rounded-lg font-semibold text-sm hover:bg-[#007ba8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5">
                                        Next →
                                    </button>
                                ) : (
                                    <button onClick={handleSubmit} disabled={isLoading}
                                        className="px-5 py-2 bg-[#0098cc] text-white rounded-lg font-semibold text-sm hover:bg-[#007ba8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5">
                                        {isLoading ? (
                                            <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />Submitting...</>
                                        ) : (
                                            <><CheckCircle2 size={16} />Submit Application</>
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