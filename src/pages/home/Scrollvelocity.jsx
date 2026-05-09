// import React from "react";
import { TrendingUp } from "lucide-react";

export default function MentorHero() {
  const tags = [
    "1-on-1 Sessions",
    "Career Roadmaps",
    "Peer Community",
    "Live Workshops",
  ];

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 40px",
        boxSizing: "border-box",
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        background: "#ffffff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        .mh-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          width: 100%;
          max-width: 1100px;
        }

        .mh-tag {
          font-size: 12.5px;
          font-weight: 500;
          color: #00a6df;
          border: 1.5px solid #00a6df;
          border-radius: 999px;
          padding: 6px 16px;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .mh-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>

      <div className="mh-grid">

        {/* LEFT IMAGE */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>

          {/* Circle wrapper */}
          <div
            style={{
              position: "relative",
              width: 450,
              height: 450,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            {/* Ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid #00a6df",
              }}
            />

            {/* Image */}
            <div
              style={{
                width: 380,
                height: 380,
                borderRadius: "50%",
                overflow: "hidden",
                border: "6px solid white",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1200&fit=crop"
                alt="Mentorship"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: 15,
                right: 0,
                background: "#00a6df",
                color: "white",
                borderRadius: 20,
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <TrendingUp size={16} />
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontSize: 10, opacity: 0.8 }}>
                  Career Growth
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>
                  +10x Learning
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#1a1a2e",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Accelerate Your{" "}
            <span style={{ color: "#00a6df" }}>Growth</span>
          </h1>

          <p style={{ fontSize: 15, color: "#1a1a2e", opacity: 0.7, lineHeight: 1.7, marginBottom: 12 }}>
            Connect with industry experts who guide you through challenges, unlock skills, and accelerate your career growth.
          </p>

          <p style={{ fontSize: 15, color: "#1a1a2e", opacity: 0.7, lineHeight: 1.7, marginBottom: 20 }}>
            With personalized mentorship and curated learning paths, you gain confidence and stand out in your field.
          </p>

          {/* TAGS */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {tags.map((tag, i) => (
              <span className="mh-tag" key={i}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}