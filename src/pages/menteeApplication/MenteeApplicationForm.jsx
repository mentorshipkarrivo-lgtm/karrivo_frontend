// MenteeApplicationForm.jsx
import React, { useState, useEffect } from 'react';
import { Check, User, Briefcase, GraduationCap } from 'lucide-react';
import { useSubmitMenteeApplicationMutation } from './menteeApplication';

const MenteeApplicationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Section 1: About You
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        location: '',
        motivationStatement: '',

        // Section 2: Profile
        areasOfInterest: '',
        mentoringStyle: '',
        mentoringFrequency: '',
        timeSlots: '',
        linkedinUrl: '',
        instagramUrl: '',
        alternativeEmail: '',

        // Section 3: Education
        highestDegree: '',
        fieldOfStudy: '',
        schoolName: '',
        additionalCourses: '',

        // Section 4: Experience
        currentRole: '',
        companyName: '',
        yearsOfExperience: '',
        currentSkills: '',
        resumeLink: '',
        introVideoLink: '',
        whyMentor: '',
        greatestAchievement: '',
        featuredArticle: '',

        // Terms
        agreeToTerms: false,
        consentToShare: false
    });

    const [errors, setErrors] = useState({});

    // ✅ RTK Query Mutation Hook
    const [submitApplication, { isLoading, isSuccess, isError, error: submitError }] = useSubmitMenteeApplicationMutation();

    const steps = [
        { number: 1, name: 'About You', icon: User },
        { number: 2, name: 'Profile', icon: User },
        { number: 3, name: 'Education', icon: GraduationCap },
        { number: 4, name: 'Experience', icon: Briefcase }
    ];

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

    const validateSection = (section) => {
        const newErrors = {};

        if (section === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
            if (!formData.motivationStatement.trim()) newErrors.motivationStatement = 'Motivation statement is required';
        }

        if (section === 2) {
            if (!formData.areasOfInterest.trim()) newErrors.areasOfInterest = 'Areas of interest are required';
            if (!formData.mentoringFrequency) newErrors.mentoringFrequency = 'Mentoring frequency is required';
        }

        if (section === 3) {
            if (!formData.highestDegree.trim()) newErrors.highestDegree = 'Highest degree is required';
        }

        if (section === 4) {
            if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required';
            if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
            if (!formData.consentToShare) newErrors.consentToShare = 'You must consent to share your profile';
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

    // ✅ Handle form submission with RTK Query
    const handleSubmit = async () => {
        if (validateSection(4)) {
            try {
                // Use RTK Query mutation - unwrap() returns the fulfilled value or throws error
                const result = await submitApplication(formData).unwrap();
                console.log('Application submitted successfully:', result);
            } catch (err) {
                console.error('Failed to submit application:', err);
            }
        }
    };

    // ✅ Handle success response
    useEffect(() => {
        if (isSuccess) {
            alert('✅ Application submitted successfully!');

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
                linkedinUrl: '',
                instagramUrl: '',
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
            });

            // Reset to first step
            setCurrentStep(1);

            // Optionally redirect to success page
            // window.location.href = '/success';
        }
    }, [isSuccess]);

    // ✅ Handle error response
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
                value={formData[name]}
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
                value={formData[name]}
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
                value={formData[name]}
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
                    checked={formData[name]}
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

    return (
        <div className="min-h-screen bg-[#062117] py-8 pt-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <div className="text-3xl font-bold text-[#062117]">MentorHub</div>
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

                {/* ✅ Loading Overlay */}
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
                                    {renderTextarea('Motivation Statement', 'motivationStatement', true, 'Why do you want a mentor? What are your goals?')}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Section 2: Profile */}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-xl font-semibold text-[#062117] mb-6">Your Profile</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    {renderTextarea('Areas of Interest / Skills to Develop', 'areasOfInterest', true, 'e.g., Web Development, Leadership, Project Management')}
                                </div>
                                {renderSelect('Preferred Mentoring Style', 'mentoringStyle', ['One-on-One', 'Group', 'Online', 'In-Person', 'Any'], false)}
                                {renderSelect('Preferred Mentorship Frequency', 'mentoringFrequency', ['Weekly', 'Bi-Weekly', 'Monthly', 'Any'], true)}
                                {renderSelect('Preferred Time Slots', 'timeSlots', ['Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Any'], false)}
                                {renderInput('LinkedIn URL', 'linkedinUrl', 'url', false, 'https://linkedin.com/in/yourprofile')}
                                {renderInput('Instagram URL', 'instagramUrl', 'url', false, 'https://instagram.com/yourprofile')}
                                <div className="md:col-span-2">
                                    {renderInput('Alternative Email', 'alternativeEmail', 'email', false, 'alternative@example.com')}
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
                                {renderInput('Field of Study / Major', 'fieldOfStudy', 'text', false, 'e.g., Computer Science, Business Administration')}
                                {renderInput('School / University Name', 'schoolName', 'text', false, 'e.g., Stanford University')}
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
                                <div className="md:col-span-2">
                                    {renderInput('Current Role / Job Title', 'currentRole', 'text', true, 'e.g., Software Engineer, Marketing Manager')}
                                </div>
                                {renderInput('Company / Organization Name', 'companyName', 'text', false, 'e.g., Tech Corp')}
                                {renderInput('Years of Experience', 'yearsOfExperience', 'text', false, 'e.g., 3 years')}
                                <div className="md:col-span-2">
                                    {renderTextarea('Current Skills & Strengths', 'currentSkills', false, 'Describe your key skills and strengths')}
                                </div>
                                {renderInput('Resume / Portfolio Link', 'resumeLink', 'url', false, 'https://yourportfolio.com')}
                                {renderInput('Introduction Video', 'introVideoLink', 'url', false, 'Video upload or link')}
                                <div className="md:col-span-2">
                                    {renderTextarea('Why do you want to become a mentee?', 'whyMentor', false, 'Internal use only - not publicly visible')}
                                </div>
                                <div className="md:col-span-2">
                                    {renderTextarea('Greatest Achievement so far', 'greatestAchievement', false, 'Internal use only - not publicly visible')}
                                </div>
                                <div className="md:col-span-2">
                                    {renderInput('Featured Article / Podcast / Interview', 'featuredArticle', 'url', false, 'Link or file upload')}
                                </div>
                            </div>

                            {/* Terms & Consent */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-[#062117] mb-4">Terms & Consent</h3>
                                {renderCheckbox('I agree to the Terms & Conditions', 'agreeToTerms', true)}
                                {renderCheckbox('I consent to share my profile with potential mentors', 'consentToShare', true)}
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
        </div>
    );
};

export default MenteeApplicationForm;