import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Why should I trust your mentors?",
      answer: "Our mentors are carefully vetted professionals with proven track records in their fields. They have real-world experience and are passionate about helping others succeed. Each mentor goes through a rigorous selection process to ensure they can provide valuable guidance and support."
    },
    {
      question: "Why are so many mentors doing this for free?",
      answer: "Many of our mentors are motivated by the desire to give back to their communities and help the next generation of professionals. They remember the challenges they faced early in their careers and want to make the journey easier for others. Additionally, mentoring helps them stay connected with emerging trends and fresh perspectives."
    },
    {
      question: "Are calls really unlimited?",
      answer: "Yes! With our premium plans, you have unlimited access to schedule calls with your mentor. However, we recommend being respectful of your mentor's time and scheduling sessions that are productive and well-prepared to get the most value from each interaction."
    },
    {
      question: "How does your pricing work?",
      answer: "We offer flexible pricing tiers to suit different needs. Our basic plan includes limited monthly sessions, while premium plans offer unlimited calls and additional features. You can choose monthly or annual billing, with discounts available for long-term commitments. Check our pricing page for detailed information."
    },
    {
      question: "Why should I pick GrowthMentor over something like Perplexity.ai or ChatGPT?",
      answer: "While AI tools are great for information, they can't replace the personalized guidance, emotional support, and real-world experience that human mentors provide. Our mentors offer tailored advice based on your specific situation, can share war stories, make introductions, and provide accountability that AI simply cannot match."
    },
    {
      question: "Can I get a refund if I decide it's not a right fit?",
      answer: "Absolutely! We offer a satisfaction guarantee. If you're not happy with the service within the first 30 days, we'll provide a full refund, no questions asked. We want to make sure GrowthMentor is the right fit for your growth journey."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#062117' }}>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-10 lg:p-12" style={{ backgroundColor: '#1a3a32' }}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 lg:mb-12">
            Frequently asked questions
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{ backgroundColor: '#0d2620' }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 sm:px-6 lg:px-7 py-4 sm:py-5 text-left flex items-start justify-between text-white transition-all duration-200 group"
                >
                  <span className="font-medium text-base sm:text-lg pr-4 sm:pr-8 leading-relaxed group-hover:opacity-80">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 mt-0.5 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: '#0098cc' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}