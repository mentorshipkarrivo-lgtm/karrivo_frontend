// MenteeApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { Check, User, Briefcase, GraduationCap } from 'lucide-react';
import { useSubmitMenteeApplicationMutation } from './menteeApplication.jsx';

const MenteeApplicationForm = () => {
    // Load current step from localStorage
    const [currentStep, setCurrentStep] = useState(() => {
        const saved = localStorage.getItem('menteeFormStep');
        return saved ? parseInt(saved) : 1;
    });


    const [errors, setErrors] = useState({});

    // ADD THESE TWO LINES:
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [submissionResponse, setSubmissionResponse] = useState(null);

    // RTK Query Mutation Hook
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
            mentoringFrequency: '',
            timeSlots: '',
            linkedinUrl: '',
            githubUrl: '',
            alternativeEmail: '',
            highestDegree: '',
            fieldOfStudy: '',
            schoolName: '',
            additionalCourses: '',
            currentRole: '',
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
        'Career Guidance'
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
        { number: 1, name: 'About You', icon: User },
        { number: 2, name: 'Profile', icon: User },
        { number: 3, name: 'Education', icon: GraduationCap },
        { number: 4, name: 'Experience', icon: Briefcase }
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
            // Store the response data
            setSubmissionResponse({
                applicationId: 'APP' + Date.now(),
                submittedAt: new Date().toISOString(),
                name: formData.fullName,
                email: formData.email
            });

            // Show success screen
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

            if (!formData.mentoringFrequency) {
                newErrors.mentoringFrequency = 'Mentoring frequency is required';
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

    // Handle success response
    useEffect(() => {
        if (isSuccess) {
            alert('✅ Application submitted successfully!');

            // Clear localStorage
            localStorage.removeItem('menteeFormData');
            localStorage.removeItem('menteeFormStep');
            localStorage.removeItem('menteeAreasOfInterest');

            // Reset form to initial state
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                location: '',
                motivationStatement: '',
                areasOfInterest: '',
                mentoringStyle: '',
                mentoringFrequency: '',
                timeSlots: '',
                timeSlotMorning: false,
                morningTime: '',
                timeSlotAfternoon: false,
                afternoonTime: '',
                timeSlotEvening: false,
                eveningTime: '',
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
                agreeToTerms: true,
                consentToShare: true
            });

            setAreasOfInterest([]);
            setCurrentStep(1);
        }
    }, [isSuccess]);

    // Handle error response
    useEffect(() => {
        if (isError) {
            const errorMessage = submitError?.data?.message || 'Failed to submit application. Please try again.';
            alert('❌ ' + errorMessage);
        }
    }, [isError, submitError]);

    const renderInput = (label, name, type = 'text', required = false, placeholder = '') => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] disabled:bg-gray-100 disabled:cursor-not-allowed ${errors[name] ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );

    const renderTextarea = (label, name, required = false, placeholder = '') => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                rows="4"
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] disabled:bg-gray-100 disabled:cursor-not-allowed ${errors[name] ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );

    const renderSelect = (label, name, options, required = false) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={formData[name] || ''}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] disabled:bg-gray-100 disabled:cursor-not-allowed ${errors[name] ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                <option value="">Select an option</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );

    const renderCheckbox = (label, name, required = false) => (
        <div className="mb-4">
            <label className="flex items-start">
                <input
                    type="checkbox"
                    name={name}
                    checked={formData[name] || false}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="mt-1 mr-2 h-4 w-4 text-[#062117] focus:ring-[#062117] border-gray-300 rounded disabled:cursor-not-allowed"
                />
                <span className="text-sm text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
            </label>
            {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
    );




    const SuccessScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
            <div className="max-w-[22rem] w-full">
                {/* Success Card */}
                <div className="bg-white rounded-xl shadow-lg p-5 text-center">
                    {/* Success Icon */}
                    <div className="mb-3 flex justify-center">
                        <div className="relative">
                            <div className="w-[72px] h-[72px] bg-green-100 rounded-full flex items-center justify-center">
                                <div className="w-[56px] h-[56px] bg-green-500 rounded-full flex items-center justify-center">
                                    <Check className="w-8 h-8 text-white stroke-[3]" />
                                </div>
                            </div>
                            <div className="absolute inset-0 w-[72px] h-[72px] bg-green-300 rounded-full animate-ping opacity-20"></div>
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                        Application Submitted!
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">
                        Your mentee application has been successfully submitted
                    </p>

                    {/* Details */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-3 text-left text-xs">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b">
                            <span className="text-gray-600">Application ID</span>
                            <span className="font-mono font-semibold text-[#062117]">
                                {submissionResponse?.applicationId}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-2 pb-2 border-b">
                            <span className="text-gray-600">Applicant</span>
                            <span className="font-medium text-gray-800">
                                {submissionResponse?.name}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mb-2 pb-2 border-b">
                            <span className="text-gray-600">Email</span>
                            <span className="font-medium text-gray-800 truncate max-w-[120px]">
                                {submissionResponse?.email}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Submitted</span>
                            <span className="font-medium text-gray-800">
                                {new Date(submissionResponse?.submittedAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Email Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-3">
                        <p className="text-[11px] text-blue-800">
                            📧 Confirmation sent to{" "}
                            <strong>{submissionResponse?.email}</strong>
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                setShowSuccessScreen(false);
                                setCurrentStep(1);
                            }}
                            className="w-full py-2 bg-[#062117] text-white rounded-md font-semibold text-sm hover:bg-[#0098cc] transition"
                        >
                            Submit Another Application
                        </button>

                        <button
                            onClick={() => (window.location.href = "/dashboard")}
                            className="w-full py-2 bg-white border border-[#062117] text-[#062117] rounded-md font-semibold text-sm hover:bg-gray-50 transition"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>

                <p className="text-center text-[11px] text-gray-600 mt-3">
                    Need help?{" "}
                    <a
                        href="mailto:support@mentorhub.com"
                        className="text-[#0098cc] hover:underline"
                    >
                        support@mentorhub.com
                    </a>
                </p>
            </div>
        </div>
    );



    return (

        <>
            <style>{`
            @keyframes scale {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            .animate-scale {
                animation: scale 2s ease-in-out infinite;
            }
        `}</style>

            {showSuccessScreen ? (
                <SuccessScreen />
            ) : <div className="min-h-screen bg-[#062117] py-8 pt-24 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center mb-2">
                            <div className="text-3xl font-bold text-[#062117]">MenteeHub</div>
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800">Mentee Application</h1>
                        <p className="text-gray-600 text-sm mt-1">Complete all sections to submit your application</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isCompleted = currentStep > step.number;
                                const isCurrent = currentStep === step.number;

                                return (
                                    <React.Fragment key={step.number}>
                                        <div className="flex flex-col items-center flex-1">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${isCompleted
                                                    ? 'bg-[#062117] text-white'
                                                    : isCurrent
                                                        ? 'bg-[#0098cc] text-white'
                                                        : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                            </div>
                                            <div className="text-xs mt-2 text-center font-medium">
                                                <div className={isCurrent ? 'text-[#062117]' : 'text-gray-600'}>
                                                    {step.name}
                                                </div>
                                            </div>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div
                                                className={`flex-1 h-1 mx-2 rounded transition-all ${isCompleted ? 'bg-[#062117]' : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    {/* Loading Overlay */}
                    {isLoading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 flex flex-col items-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0098cc]"></div>
                                <p className="mt-4 text-gray-700 font-semibold">Submitting your application...</p>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        {/* Section 1: About You */}
                        {currentStep === 1 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#062117] mb-6">About You</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        {renderInput('Full Name', 'fullName', 'text', true, 'Enter your full name')}
                                    </div>
                                    {renderInput('Email Address', 'email', 'email', true, 'your.email@example.com')}
                                    {renderInput('Phone Number', 'phone', 'tel', false, '+1 (555) 000-0000')}
                                    {renderInput('Date of Birth', 'dateOfBirth', 'date', false)}
                                    <div className="md:col-span-2">
                                        {renderInput('Location', 'location', 'text', false, 'City, Country')}
                                    </div>
                                    <div className="md:col-span-2">
                                        {renderTextarea('Motivation Statement', 'motivationStatement', true, 'Why do you want a mentor? What are your goals? (Minimum 50 characters)')}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section 2: Profile */}
                        {currentStep === 2 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#062117] mb-6">Your Profile</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Areas of Interest */}
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 font-medium text-gray-700">
                                            Areas of Interest / Skills to Develop <span className="text-red-500">*</span>
                                        </label>

                                        {/* Selected Interests */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {areasOfInterest.map((interest) => (
                                                <span
                                                    key={interest}
                                                    className="bg-[#1d8e85] text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                                                >
                                                    {interest}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeInterest(interest)}
                                                        className="hover:text-red-300"
                                                    >
                                                        ✕
                                                    </button>
                                                </span>
                                            ))}
                                        </div>

                                        {/* Suggestions */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {suggestedInterests
                                                .filter((interest) => !areasOfInterest.includes(interest))
                                                .map((interest) => (
                                                    <button
                                                        key={interest}
                                                        type="button"
                                                        onClick={() => addInterest(interest)}
                                                        className="border border-[#1d8e85] text-[#1d8e85] px-3 py-1 rounded-full text-sm hover:bg-[#1d8e85] hover:text-white transition"
                                                    >
                                                        + {interest}
                                                    </button>
                                                ))}
                                        </div>

                                        {/* Custom Input */}
                                        <input
                                            type="text"
                                            placeholder="Add custom interest & press Enter"
                                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1d8e85]"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    e.preventDefault();
                                                    addInterest(e.target.value.trim());
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        {errors.areasOfInterest && (
                                            <p className="text-red-500 text-xs mt-1">{errors.areasOfInterest}</p>
                                        )}
                                    </div>

                                    {/* Mentoring Style */}
                                    {renderSelect(
                                        'Preferred Mentoring Style',
                                        'mentoringStyle',
                                        ['One-on-One', 'Group', 'Online', 'In-Person', 'Any'],
                                        false
                                    )}

                                    {/* Mentorship Frequency */}
                                    {renderSelect(
                                        'Preferred Mentorship Frequency',
                                        'mentoringFrequency',
                                        ['Weekly', 'Bi-Weekly', 'Monthly', 'Any'],
                                        true
                                    )}

                                    {/* Preferred Time Slots */}
                                    <div className="md:col-span-2 mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Time Slots
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.timeSlotMorning || false}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                timeSlotMorning: e.target.checked
                                                            }));
                                                        }}
                                                        className="mr-2 h-4 w-4 text-[#062117] focus:ring-[#062117] border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm">Morning (6 AM - 12 PM)</span>
                                                </label>
                                                {formData.timeSlotMorning && (
                                                    <div className="ml-6">
                                                        <input
                                                            type="time"
                                                            name="morningTime"
                                                            value={formData.morningTime || ''}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] text-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.timeSlotAfternoon || false}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                timeSlotAfternoon: e.target.checked
                                                            }));
                                                        }}
                                                        className="mr-2 h-4 w-4 text-[#062117] focus:ring-[#062117] border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm">Afternoon (12 PM - 6 PM)</span>
                                                </label>
                                                {formData.timeSlotAfternoon && (
                                                    <div className="ml-6">
                                                        <input
                                                            type="time"
                                                            name="afternoonTime"
                                                            value={formData.afternoonTime || ''}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] text-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="flex items-center mb-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.timeSlotEvening || false}
                                                        onChange={(e) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                timeSlotEvening: e.target.checked
                                                            }));
                                                        }}
                                                        className="mr-2 h-4 w-4 text-[#062117] focus:ring-[#062117] border-gray-300 rounded"
                                                    />
                                                    <span className="text-sm">Evening (6 PM - 10 PM)</span>
                                                </label>
                                                {formData.timeSlotEvening && (
                                                    <div className="ml-6">
                                                        <input
                                                            type="time"
                                                            name="eveningTime"
                                                            value={formData.eveningTime || ''}
                                                            onChange={handleInputChange}
                                                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] text-sm"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* LinkedIn */}
                                    {renderInput(
                                        'LinkedIn URL',
                                        'linkedinUrl',
                                        'url',
                                        false,
                                        'https://linkedin.com/in/yourprofile'
                                    )}

                                    {/* GitHub */}
                                    {renderInput(
                                        'GitHub URL',
                                        'githubUrl',
                                        'url',
                                        false,
                                        'https://github.com/yourusername'
                                    )}

                                    {/* Alternative Email */}
                                    <div className="md:col-span-2">
                                        {renderInput(
                                            'Alternative Emai (Optional)',
                                            'alternativeEmail',
                                            'email',
                                            false,
                                            'alternative@example.com'
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section 3: Education */}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#062117] mb-6">Education Background</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        {renderInput('Highest Degree / Certification', 'highestDegree', 'text', true, 'e.g., Bachelor of Science, MBA')}
                                    </div>
                                    {renderInput('Field of Study / Major', 'fieldOfStudy', 'text', true, 'e.g., Computer Science, Business Administration')}
                                    {renderInput('School / University Name', 'schoolName', 'text', true, 'e.g., Stanford University')}
                                    <div className="md:col-span-2">
                                        {renderTextarea('Additional Courses / Certifications', 'additionalCourses', false, 'List any additional courses, certifications, or training programs')}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Section 4: Experience */}
                        {currentStep === 4 && (
                            <div>
                                <h2 className="text-xl font-semibold text-[#062117] mb-6">Professional Experience</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Current Role with Dropdown and Custom Input */}
                                    <div className="md:col-span-2 mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Role / Job Title <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="currentRole"
                                            value={formData.currentRole || ''}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.currentRole ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select your role</option>
                                            {suggestedRoles.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                        {errors.currentRole && <p className="text-red-500 text-xs mt-1">{errors.currentRole}</p>}

                                        {/* Show custom input if "Other" is selected */}
                                        {formData.currentRole === 'Other' && (
                                            <div className="mt-3">
                                                <input
                                                    type="text"
                                                    name="customRole"
                                                    value={formData.customRole || ''}
                                                    onChange={handleInputChange}
                                                    placeholder="Please specify your role"
                                                    disabled={isLoading}
                                                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#062117] disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.customRole ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                />
                                                {errors.customRole && <p className="text-red-500 text-xs mt-1">{errors.customRole}</p>}
                                            </div>
                                        )}
                                    </div>

                                    {renderInput('Company / Organization Name', 'companyName', 'text', true, 'e.g., Tech Corp')}
                                    {renderInput('Years of Experience', 'yearsOfExperience', 'text', false, 'e.g., 3 or 3.5')}
                                    <div className="md:col-span-2">
                                        {renderTextarea('Current Skills & Strengths', 'currentSkills', false, 'Describe your key skills and strengths')}
                                    </div>
                                    {renderInput('Resume / Portfolio Link', 'resumeLink', 'url', false, 'https://yourportfolio.com')}
                                    {renderInput('Introduction Video', 'introVideoLink', 'url', false, 'https://youtube.com/...')}
                                    <div className="md:col-span-2">
                                        {renderTextarea('Why do you want to become a mentee?', 'whyMentor', false, 'Internal use only - not publicly visible')}
                                    </div>
                                    <div className="md:col-span-2">
                                        {renderTextarea('Greatest Achievement so far', 'greatestAchievement', false, 'Internal use only - not publicly visible')}
                                    </div>
                                    <div className="md:col-span-2">
                                        {renderInput('Featured Article / Podcast / Interview', 'featuredArticle', 'url', false, 'https://...')}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1 || isLoading}
                                className={`px-6 py-2 rounded-md font-medium transition-all ${currentStep === 1 || isLoading
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Back
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    onClick={handleNext}
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-[#0098cc] text-white rounded-md font-medium hover:bg-[#062117] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="px-6 py-2 bg-[#062117] text-white rounded-md font-medium hover:bg-[#0098cc] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Application'
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>}
        </>

    );
};

export default MenteeApplicationForm;