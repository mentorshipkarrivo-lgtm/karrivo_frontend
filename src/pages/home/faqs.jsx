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
    <div
      className="w-full min-h-screen py-16 px-5 md:px-10"
      style={{ background: "#0f0f10" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            style={{
              fontSize: "clamp(28px,4vw,42px)",
              fontWeight: 700,
              color: "#fff"
            }}
          >
            Frequently{" "}
            <span style={{ color: "#0090c1" }}>Asked Questions</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "22px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      textAlign: "left",
                      lineHeight: "1.5"
                    }}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    color="#fff"
                    style={{
                      transition: "0.3s",
                      transform: isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)"
                    }}
                  />
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "all 0.3s ease"
                  }}
                >
                  <p
                    style={{
                      color: "#B5B5B5",
                      fontSize: "14px",
                      lineHeight: "1.8",
                      paddingBottom: "20px",
                      maxWidth: "90%"
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-14">
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "14px",
              marginBottom: "22px"
            }}
          >
            Still have questions? We're here to help!
          </p>

          <button
            style={{
              background: "#0098cc",
              color: "#000",
              border: "none",
              borderRadius: "999px",
              padding: "12px 34px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}