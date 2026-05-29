


import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does Karrivo match me with the right mentor?",
      answer: "Karrivo uses advanced matching techniques based on your career goals, industry, and skill gaps. We analyze your profile and connect you with mentors who have relevant experience and a proven track record in your desired field."
    },
    {
      question: "Can I export my session notes and data?",
      answer: "Yes! You can export your session notes and progress data in various formats including PDF and CSV. This gives you complete control over your mentorship journey records."
    },
    {
      question: "How is the monthly session limit calculated?",
      answer: "The monthly limit is based on the number of sessions booked during your billing cycle. Each completed session counts toward the limit, and it resets at the start of each new billing period."
    },
    {
      question: "What happens when I reach my monthly session limit?",
      answer: "When you reach your monthly limit, we'll notify you via email. You can continue to message your mentor, but you'll need to upgrade your plan to book additional sessions for that billing period."
    },
    {
      question: "Which payment options are available?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support UPI and PayPal. All payments are processed securely through our payment provider."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately, and we'll prorate any differences in your billing."
    },
    {
      question: "Do you have a referral program?",
      answer: "Yes, we offer a competitive referral program! You can earn credits by referring new users to Karrivo. Sign up through your dashboard to get your unique referral link and start earning."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen w-full py-20 px-4 sm:px-6 lg:px-12"
      style={{ backgroundColor: '#1a1a1a' }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Find answers to commonly asked questions about Long Term Mentorship
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex items-center justify-between"
                  style={{
                    padding: '20px 28px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      color: '#ffffff',
                      fontSize: '15px',
                      fontWeight: '400',
                      lineHeight: '1.5',
                      paddingRight: '2rem',
                    }}
                  >
                    {faq.question}
                  </span>
                  {/* + / x icon */}
                  <span
                    style={{
                      color: '#9ca3af',
                      fontSize: '22px',
                      fontWeight: '300',
                      flexShrink: 0,
                      lineHeight: 1,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      display: 'inline-block',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? '400px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      padding: '0 28px 20px 28px',
                      color: '#9ca3af',
                      fontSize: '14px',
                      lineHeight: '1.75',
                      borderTop: '1px solid #3a3a3a',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}








