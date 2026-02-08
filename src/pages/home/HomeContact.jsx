// import React, { useState, useEffect } from 'react';
// import { useSubmitContactFormMutation } from './contact/Contactapislice';

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: ''
//   });

//   // RTK Query mutation hook
//   const [submitContactForm, { isLoading, isSuccess, isError, error, data }] = useSubmitContactFormMutation();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       // Submit form using RTK Query mutation
//       await submitContactForm(formData).unwrap();

//       // Clear form on success
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         subject: '',
//         message: ''
//       });
//     } catch (err) {
//       // Error is handled by RTK Query
//       console.error('Failed to submit form:', err);
//     }
//   };

//   // Auto-clear success message after 5 seconds
//   useEffect(() => {
//     if (isSuccess) {
//       const timer = setTimeout(() => {
//         // You can dispatch a reset action here if needed
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [isSuccess]);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#062117' }}>
//       <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
//         {/* Left Side */}
//         <div className="text-white">
//           <h1 className="text-6xl font-bold mb-2">Let's get</h1>
//           <h1 className="text-6xl font-bold mb-12">in touch</h1>

//           <div className="mb-12">
//             <h2 className="text-2xl font-semibold mb-6">Don't be afraid to say hello with us!</h2>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <p className="text-gray-400 mb-1">Phone:</p>
//               <p className="text-lg">+91 12345 67890</p>

//             </div>

//             <div>
//               <p className="text-gray-400 mb-1">Email:</p>
//               <p className="text-lg">wecare.karrivo@gmail.com</p>
//             </div>

//             <div>
//               <p className="text-gray-400 mb-1">Office:</p>
//               <p className="text-lg">Karrivo Technologies Pvt Ltd</p>
//               <p className="text-lg">HSR Layout, Sector 2,</p>
//               <p className="text-lg">Hyderabad , Telangana 500074</p>
//               <p className="text-lg">India</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Contact Form */}
//         <div>
//           <div className="mb-8">
//             <div className="flex items-center gap-4 mb-4">
//               <svg width="40" height="2" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <line x1="0" y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" />
//               </svg>
//               <p className="text-gray-400">
//                 Great! We're excited to hear from you and<br />
//                 let's start something special together.<br />
//                 Call us for any inquiry.
//               </p>
//             </div>
//           </div>

//           <div className="bg-black p-8 rounded-lg">
//             <h3 className="text-white text-2xl font-semibold mb-6">Contact Us</h3>

//             {/* Success Message */}
//             {isSuccess && data && (
//               <div className="mb-4 p-4 rounded bg-green-900 text-green-200 flex items-start gap-2">
//                 <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 <span>{data?.message || 'Thank you for contacting Karrivo! We will get back to you soon.'}</span>
//               </div>
//             )}

//             {/* Error Message */}
//             {isError && (
//               <div className="mb-4 p-4 rounded bg-red-900 text-red-200 flex items-start gap-2">
//                 <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//                 <span>{error?.data?.message || 'Failed to submit form. Please try again later.'}</span>
//               </div>
//             )}

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-400 text-sm mb-2 block">Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Your name"
//                     className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-400 text-sm mb-2 block">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="your@email.com"
//                     className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-400 text-sm mb-2 block">Phone *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+91 XXXXX XXXXX"
//                     className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-gray-400 text-sm mb-2 block">Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     placeholder="Subject"
//                     className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="text-gray-400 text-sm mb-2 block">Tell us about your interest</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows="4"
//                   placeholder="Your message here..."
//                   className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 resize-none placeholder-gray-600"
//                   disabled={isLoading}
//                 ></textarea>
//               </div>

//              <button
//   onClick={handleSubmit}
//   disabled={isLoading}
//   className="
//     w-full
//     bg-[#0098cc] text-white font-semibold
//     px-5 sm:px-6 md:px-8
//     py-2.5 sm:py-3 md:py-3.5
//     rounded-full
//     transition-all duration-300
//     hover:shadow-lg hover:scale-105
//     whitespace-nowrap
//     text-xs sm:text-sm md:text-base
//     mt-6
//     disabled:opacity-50 disabled:cursor-not-allowed
//     flex items-center justify-center gap-2
//   "
// >
//   {isLoading ? (
//     <>
//       <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//         <circle
//           className="opacity-25"
//           cx="12"
//           cy="12"
//           r="10"
//           stroke="currentColor"
//           strokeWidth="4"
//           fill="none"
//         />
//         <path
//           className="opacity-75"
//           fill="currentColor"
//           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//         />
//       </svg>
//       <span>Sending...</span>
//     </>
//   ) : (
//     'Send Message'
//   )}
// </button>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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