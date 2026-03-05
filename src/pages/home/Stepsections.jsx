import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Find Your Ideal Mentor",
    description:
      "Browse from 600+ vested mentors and get to choose your ideal mentor according to your preferences and aspiration.",
    btnLabel: "Find Your Mentor",
    action: "find",
  },
  {
    id: 2,
    title: "Book a FREE Trial",
    description:
      "Connect with mentor and see how mentor will help you achieve your goal faster & avoid asking for referrals, etc.",
    btnLabel: "Book a FREE Trial",
    action: "book",
  },
  {
    id: 3,
    title: "Start 1:1 Long Term Mentorship",
    description:
      "Bravo!! Get started with your personalised mentorship in the right direction with a mentor of your choice.",
    btnLabel: "Start Preparing",
    action: "start",
  },
];

export default function StepsSection() {
  const handleButtonClick = (action) => {
    if (action === "find" || action === "start") {
      window.location.href = "/explore-mentors";
    } else if (action === "book") {
      const token = localStorage.getItem("token");
      if (token) {
        window.location.href = "/mentee/bookings";
      } else {
        window.location.href = "/login";
      }
    }
  };

  return (
    <section style={{ background: "#062117", padding: "60px 24px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

        <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
          Get Started in 3 Easy Steps
        </h2>

        <p style={{ color: "#a8d5c2", fontSize: "1rem", marginBottom: "48px" }}>
          Follow these three simple steps to get started with Long Term Mentorship
        </p>

        {/* Grid container */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid rgba(0,152,204,0.3)",
          alignItems: "stretch",
        }}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={{
                padding: "36px 28px",
                textAlign: "left",
                borderRight: index !== steps.length - 1 ? "1px solid rgba(0,152,204,0.3)" : "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Badge */}
              <div style={{
                width: "44px", height: "44px",
                borderRadius: "10px",
                background: "#0098cc",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: "1.1rem",
                marginBottom: "28px",
                flexShrink: 0,
              }}>
                {step.id}
              </div>

              {/* Title */}
              <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.15rem", margin: "0 0 12px 0" }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{ color: "#a8d5c2", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 28px 0", flexGrow: 1 }}>
                {step.description}
              </p>

              {/* Button */}
              <div>
                <button
                  onClick={() => handleButtonClick(step.action)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "10px 20px",
                    border: "1px solid rgba(0,152,204,0.5)",
                    borderRadius: "8px",
                    background: "transparent",
                    color: "#0098cc",
                    fontSize: "0.875rem", fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#0098cc";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#0098cc";
                  }}
                >
                  {step.btnLabel} →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


