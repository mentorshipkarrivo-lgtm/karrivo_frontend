


import { useState, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Founder, TechVenture",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    text: "This mentorship program completely transformed my career trajectory. The personalized approach made all the difference in my professional growth.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Co-founder, Bloom Studio",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    text: "I gained so much confidence through this experience. My mentor's expertise helped me land my dream job. The practical advice was exactly what I needed.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Founder, Barosi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    text: "Working with my mentor was an incredible journey. The structured guidance helped me identify my strengths and work on areas that needed improvement.",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Founder, AN Fashions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    text: "The mentorship I received was beyond my expectations. My mentor took genuine interest in my goals and provided actionable strategies that led to tangible results.",
  },
  {
    id: 5,
    name: "David Kumar",
    role: "Founder, Isadora Life",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    text: "As someone new to the industry, having a mentor made all the difference. The networking opportunities helped me overcome imposter syndrome.",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    role: "Co-founder, Spark Studio",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    text: "This program exceeded all my expectations. The personalized attention and industry insights I gained were invaluable for my career roadmap.",
  },
  {
    id: 7,
    name: "Robert Williams",
    role: "Founder, Nubtnut",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    text: "I'm grateful for the wisdom my mentor shared throughout this journey. The practical advice on leadership and technical skills has been transformative.",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    role: "Founder, Aura Collective",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop",
    text: "The mentorship helped me transition into a new field with confidence. My mentor's connections opened doors I didn't know existed.",
  },
  {
    id: 9,
    name: "James Taylor",
    role: "Co-founder, PeakPath",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop",
    text: "Having a mentor who genuinely cared about my growth was life-changing. Regular check-ins kept me motivated and focused on my career aspirations.",
  },
  {
    id: 10,
    name: "Maria Garcia",
    role: "Founder, Velour Labs",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    text: "This program provided exactly what I needed. Guidance on technical skills and soft skills helped me become a more well-rounded professional.",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "80px 0 100px",
        fontFamily: "'Georgia', serif",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');

        .testimonials-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: scrollLeft 40s linear infinite;
          align-items: flex-start;
          padding-bottom: 80px;
        }

        .testimonials-track.paused {
          animation-play-state: paused;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .flip-card {
          perspective: 1000px;
          width: 240px;
          height: 340px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .flip-card.card-up {
          margin-top: 0px;
          align-self: flex-start;
        }

        .flip-card.card-down {
          margin-top: 80px;
          align-self: flex-start;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 12px;
          overflow: hidden;
        }

        .flip-card-front {
          background: #111;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          background: #111;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px 24px;
        }

        .front-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          display: block;
        }

        .front-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px 16px;
          background: linear-gradient(transparent, rgba(0,0,0,0.85));
        }

        .quote-icon {
          font-size: 48px;
          line-height: 1;
          color: rgba(255,255,255,0.15);
          font-family: 'Playfair Display', serif;
          margin-bottom: 8px;
        }

        .back-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          font-weight: 300;
          margin-bottom: 20px;
        }

        .back-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2px;
        }

        .back-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .divider-line {
          width: 32px;
          height: 1px;
          background: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "56px", padding: "0 24px" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "16px",
          }}
        >
          Success Stories
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: "900",
            color: "#111",
            lineHeight: "1.1",
            marginBottom: "16px",
          }}
        >
          Grows with{" "}
          <span style={{ fontStyle: "italic", color: "#0098cc" }}>you!</span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#666",
            maxWidth: "460px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          Real experiences from professionals who achieved their goals with expert guidance.
        </p>

      </div>

      {/* Carousel */}
      <div
        style={{ overflow: "hidden", padding: "20px 0", minHeight: "500px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={`testimonials-track ${paused ? "paused" : ""}`}>
          {doubled.map((t, i) => (
            <div className={`flip-card ${i % 2 === 0 ? "card-up" : "card-down"}`} key={`${t.id}-${i}`}>
              <div className="flip-card-inner">
                {/* FRONT */}
                <div className="flip-card-front">
                  <img src={t.image} alt={t.name} className="front-img" />
                  <div className="front-overlay">
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: "#fff",
                        marginBottom: "2px",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.65)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* BACK */}
                <div className="flip-card-back">
                  <div className="quote-icon">"</div>
                  <p className="back-text">{t.text}</p>
                  <div className="divider-line" />
                  <p className="back-name">{t.name}</p>
                  <p className="back-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




