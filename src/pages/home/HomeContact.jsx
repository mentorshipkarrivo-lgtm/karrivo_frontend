import React, { useState, useEffect } from 'react';
import { useSubmitContactFormMutation } from './contact/Contactapislice';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // RTK Query mutation hook
  const [submitContactForm, { isLoading, isSuccess, isError, error, data }] = useSubmitContactFormMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      // Submit form using RTK Query mutation
      await submitContactForm(formData).unwrap();

      // Clear form on success
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err) {
      // Error is handled by RTK Query
      console.error('Failed to submit form:', err);
    }
  };

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        // You can dispatch a reset action here if needed
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12" style={{ backgroundColor: '#062117' }}>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left Side - Contact Form */}
        <div className="w-full">
          {/* Success Message */}
          {isSuccess && data && (
            <div className="mb-6 p-5 rounded-lg bg-green-900 text-green-200 flex items-start gap-3 text-base">
              <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{data?.message || 'Thank you! We will get back to you soon.'}</span>
            </div>
          )}

          {/* Error Message */}
          {isError && (
            <div className="mb-6 p-5 rounded-lg bg-red-900 text-red-200 flex items-start gap-3 text-base">
              <svg className="w-6 h-6 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error?.data?.message || 'Failed to submit form. Please try again later.'}</span>
            </div>
          )}

          <div className="space-y-8">
            {/* Name Input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent border-b-2 border-gray-600 text-white text-lg py-4 focus:outline-none focus:border-[#0098cc] placeholder-gray-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-transparent border-b-2 border-gray-600 text-white text-lg py-4 focus:outline-none focus:border-[#0098cc] placeholder-gray-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Share your thoughts"
                className="w-full bg-transparent border-b-2 border-gray-600 text-white text-lg py-4 focus:outline-none focus:border-[#0098cc] resize-none placeholder-gray-500 transition-colors"
                disabled={isLoading}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-white text-black font-semibold text-lg py-4 px-8 rounded hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-10"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                'SHARE YOUR FEEDBACK'
              )}
            </button>
          </div>
        </div>

        {/* Right Side - Contact Us Heading */}
        <div className="text-white">
          <div className="mb-10">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif mb-2">
              Contact
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif relative inline-block">
              Us
              <span 
                className="absolute bottom-3 left-0 h-1.5 rounded-full"
                style={{ 
                  width: '100%',
                  backgroundColor: '#0098cc'
                }}
              ></span>
            </h1>
          </div>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-md">
            It's very important for us to keep in touch with you, so we are always ready to answer any question that interests you. Shoot!
          </p>
        </div>

      </div>
    </div>
  );
}