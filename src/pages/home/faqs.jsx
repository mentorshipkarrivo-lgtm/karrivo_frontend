// import React, { useState } from 'react';

// export default function FAQAccordion() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "Why should I trust your mentors?",
//       answer: "Our mentors are carefully vetted professionals with proven track records in their fields. They have real-world experience and are passionate about helping others succeed. Each mentor goes through a rigorous selection process to ensure they can provide valuable guidance and support."
//     },
//     {
//       question: "Why are so many mentors doing this for free?",
//       answer: "Many of our mentors are motivated by the desire to give back to their communities and help the next generation of professionals. They remember the challenges they faced early in their careers and want to make the journey easier for others. Additionally, mentoring helps them stay connected with emerging trends and fresh perspectives."
//     },
//     {
//       question: "Are calls really unlimited?",
//       answer: "Yes! With our premium plans, you have unlimited access to schedule calls with your mentor. However, we recommend being respectful of your mentor's time and scheduling sessions that are productive and well-prepared to get the most value from each interaction."
//     },
//     {
//       question: "How does your pricing work?",
//       answer: "We offer flexible pricing tiers to suit different needs. Our basic plan includes limited monthly sessions, while premium plans offer unlimited calls and additional features. You can choose monthly or annual billing, with discounts available for long-term commitments. Check our pricing page for detailed information."
//     },
//     {
//       question: "Why should I pick GrowthMentor over something like Perplexity.ai or ChatGPT?",
//       answer: "While AI tools are great for information, they can't replace the personalized guidance, emotional support, and real-world experience that human mentors provide. Our mentors offer tailored advice based on your specific situation, can share war stories, make introductions, and provide accountability that AI simply cannot match."
//     },
//     {
//       question: "Can I get a refund if I decide it's not a right fit?",
//       answer: "Absolutely! We offer a satisfaction guarantee. If you're not happy with the service within the first 30 days, we'll provide a full refund, no questions asked. We want to make sure GrowthMentor is the right fit for your growth journey."
//     }
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#062117' }}>
//       <div className="max-w-7xl mx-auto">
//         <div className="rounded-3xl p-8 sm:p-10 lg:p-12" style={{ backgroundColor: '#1a3a32' }}>
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
//             Frequently asked questions
//           </h2>
          
//           <div className="space-y-3">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="rounded-xl overflow-hidden transition-all duration-300"
//                 style={{ backgroundColor: '#0d2620' }}
//               >
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className="w-full px-5 sm:px-6 lg:px-7 py-4 sm:py-5 text-left flex items-start justify-between text-white transition-all duration-200 group"
//                 >
//                   <span className="font-medium text-base sm:text-lg pr-4 sm:pr-8 leading-relaxed group-hover:opacity-80">
//                     {faq.question}
//                   </span>
//                   <svg
//                     className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 mt-0.5 ${
//                       openIndex === index ? 'rotate-180' : ''
//                     }`}
//                     style={{ color: '#0098cc' }}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>
                
//                 <div
//                   className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                     openIndex === index ? 'max-h-96' : 'max-h-0'
//                   }`}
//                 >
//                   <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base leading-relaxed">
//                     {faq.answer}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';

// export default function FAQAccordion() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "How does Pirsch anonymize visitor data?",
//       answer: "Pirsch uses advanced anonymization techniques to ensure visitor privacy. We hash IP addresses and don't store any personally identifiable information, making it impossible to track individual users while still providing valuable analytics insights."
//     },
//     {
//       question: "Can I export my data?",
//       answer: "Yes! You can export your analytics data in various formats including CSV and JSON. This gives you complete control over your data and allows you to perform additional analysis or integrate with other tools."
//     },
//     {
//       question: "How is the monthly limit calculated?",
//       answer: "The monthly limit is based on the number of page views recorded during your billing cycle. We count each unique page view, and the limit resets at the start of each new billing period."
//     },
//     {
//       question: "What happens when I reach my monthly page view limit?",
//       answer: "When you reach your monthly limit, we'll notify you via email. Your analytics will continue to work, but you'll need to upgrade your plan to access additional page views for that billing period."
//     },
//     {
//       question: "Which payment options are available?",
//       answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal for your convenience. All payments are processed securely through our payment provider."
//     },
//     {
//       question: "Can I upgrade or downgrade my plan?",
//       answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any differences in your billing."
//     },
//     {
//       question: "Do you have an affiliate program?",
//       answer: "Yes, we offer a competitive affiliate program! You can earn commission by referring new customers to Pirsch. Sign up through your dashboard to get your unique referral link and start earning."
//     }
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#062117' }}>
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-gray-400 text-sm sm:text-base">
//             If you can't find an answer here, check out the{' '}
//             <a href="#" className="text-white hover:underline">community forum</a>, reach out on{' '}
//             <a href="#" className="text-white hover:underline">Twitter</a>, or write to{' '}
//             <a href="#" className="text-white hover:underline">support@plausible.io</a>
//           </p>
//         </div>
        
//         {/* FAQ Items */}
//         <div className="space-y-2">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="rounded-lg overflow-hidden transition-all duration-200"
//               style={{ backgroundColor: '#0d2620' }}
//             >
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="w-full px-6 py-5 text-left flex items-center justify-between text-white hover:opacity-90 transition-opacity duration-200"
//               >
//                 <span className="font-medium text-base sm:text-lg pr-8">
//                   {faq.question}
//                 </span>
//                 <svg
//                   className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
//                   style={{ 
//                     color: '#0098cc',
//                     transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
//                   }}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//                 </svg>
//               </button>
              
//               <div
//                 className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                   openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                 }`}
//               >
//                 <div className="px-6 pb-6 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-gray-700/30 pt-4">
//                   {faq.answer}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Pirsch anonymize visitor data?",
      answer: "Pirsch uses advanced anonymization techniques to ensure visitor privacy. We hash IP addresses and don't store any personally identifiable information, making it impossible to track individual users while still providing valuable analytics insights."
    },
    {
      question: "Can I export my data?",
      answer: "Yes! You can export your analytics data in various formats including CSV and JSON. This gives you complete control over your data and allows you to perform additional analysis or integrate with other tools."
    },
    {
      question: "How is the monthly limit calculated?",
      answer: "The monthly limit is based on the number of page views recorded during your billing cycle. We count each unique page view, and the limit resets at the start of each new billing period."
    },
    {
      question: "What happens when I reach my monthly page view limit?",
      answer: "When you reach your monthly limit, we'll notify you via email. Your analytics will continue to work, but you'll need to upgrade your plan to access additional page views for that billing period."
    },
    {
      question: "Which payment options are available?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support PayPal for your convenience. All payments are processed securely through our payment provider."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any differences in your billing."
    },
    {
      question: "Do you have an affiliate program?",
      answer: "Yes, we offer a competitive affiliate program! You can earn commission by referring new customers to Pirsch. Sign up through your dashboard to get your unique referral link and start earning."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <div className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-12 xl:px-16" style={{ backgroundColor: '#062117' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
            If you can't find an answer here, check out the{' '}
            <a href="#" className="text-white hover:underline">community forum</a>, reach out on{' '}
            <a href="#" className="text-white hover:underline">Twitter</a>, or write to{' '}
            <a href="#" className="text-white hover:underline">support@plausible.io</a>
          </p>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{ backgroundColor: '#0d2620' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between text-white hover:opacity-90 transition-opacity duration-200"
              >
                <span className="font-medium text-base sm:text-lg lg:text-xl pr-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {faq.question}
                </span>
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-200"
                  style={{ 
                    color: '#0098cc',
                    transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed border-t border-gray-700/30 pt-4 sm:pt-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}