import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How do I find the right mentor?",
      answer:
        "You can browse mentor profiles based on expertise, industry, experience, and availability. Our platform helps match you with mentors aligned to your career goals."
    },
    {
      question: "Can I book a session with a mentor directly?",
      answer:
        "Yes. Once you find a suitable mentor, you can view their availability and book a one-on-one mentoring session directly through the platform."
    },
    {
      question: "Are all mentors verified?",
      answer:
        "Yes. Every mentor undergoes a verification process to ensure they have the necessary professional experience and expertise."
    },
    {
      question: "What types of mentorship are available?",
      answer:
        "We offer career guidance, technical mentoring, interview preparation, leadership coaching, startup mentoring, and skill development sessions."
    },
    {
      question: "Can I reschedule or cancel a session?",
      answer:
        "Yes. You can reschedule or cancel a session according to the mentor's cancellation policy shown during booking."
    },
    {
      question: "Can I become a mentor on the platform?",
      answer:
        "Absolutely. Professionals with relevant expertise can apply to become mentors by completing the mentor onboarding and verification process."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#0f0f10] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="font-bold text-white" style={{ fontSize: "clamp(22px, 4vw, 42px)" }}>
            Frequently{" "}
            <span className="text-[#0098cc]">Asked Questions</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full bg-transparent border-none cursor-pointer py-4 sm:py-5 md:py-6 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-white font-semibold leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className="shrink-0 text-white transition-transform duration-300"
                    size={18}
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease"
                  }}
                >
                  <p className="text-[#B5B5B5] text-sm sm:text-base md:text-lg leading-relaxed pb-4 sm:pb-5 md:pb-6 max-w-[95%]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}