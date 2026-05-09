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
        padding: "60px 0",
        boxSizing: "border-box",
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        background: "#ffffff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        .mh-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
          width: 100%;
          max-width: 100%;
          padding: 0;
        }

        .mh-grid-container {
          width: 100%;
          display: flex;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .mh-tag {
          font-size: 12.5px;
          font-weight: 500;
          color: #00a6df;
          border: 1.5px solid #00a6df;
          border-radius: 999px;
          padding: 6px 16px;
          white-space: nowrap;
          display: inline-block;
        }

        .mh-circle-container {
          position: relative;
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .mh-circle-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #00a6df;
        }

        .mh-circle-image {
          width: 85%;
          height: 85%;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid white;
          box-shadow: 0 10px 40px rgba(0, 166, 223, 0.15);
        }

        .mh-circle-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mh-badge {
          position: absolute;
          bottom: 15px;
          right: 0;
          background: #00a6df;
          color: white;
          border-radius: 20px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0, 166, 223, 0.3);
          font-size: 12px;
          z-index: 10;
        }

        .mh-badge-text-small {
          font-size: 10px;
          opacity: 0.9;
        }

        .mh-badge-text-large {
          font-size: 12px;
          font-weight: 600;
        }

        .mh-content h1 {
          font-size: 44px;
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.1;
          margin: 0 0 20px 0;
        }

        .mh-content-highlight {
          color: #00a6df;
        }

        .mh-content-p {
          font-size: 15px;
          color: #1a1a2e;
          opacity: 0.7;
          line-height: 1.7;
          margin: 0 0 12px 0;
        }

        .mh-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .mh-left-wrapper {
          padding: 0 40px;
        }

        .mh-right-wrapper {
          padding: 0 40px;
        }

        /* Desktop (1200px+) */
        @media (min-width: 1201px) {
          .mh-grid {
            padding: 0 40px;
          }
        }

        /* Tablet (768px - 1200px) */
        @media (max-width: 1200px) {
          .mh-grid {
            gap: 40px;
            padding: 0 30px;
          }

          .mh-circle-container {
            max-width: 380px;
          }

          .mh-content h1 {
            font-size: 36px;
          }
        }

        /* Mobile Landscape & Small Tablets (600px - 768px) */
        @media (max-width: 768px) {
          .mh-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0;
            width: 100%;
          }

          .mh-left-wrapper {
            padding: 0;
            display: flex;
            justify-content: center;
          }

          .mh-right-wrapper {
            padding: 0;
          }

          .mh-circle-container {
            max-width: 320px;
          }

          .mh-content h1 {
            font-size: 28px;
            line-height: 1.2;
          }

          .mh-content-p {
            font-size: 14px;
          }

          .mh-tag {
            font-size: 11px;
            padding: 5px 12px;
          }
        }

        /* Small Mobile (480px - 600px) */
        @media (max-width: 600px) {
          .mh-grid {
            padding: 0;
            width: 100%;
          }

          .mh-left-wrapper {
            padding: 0;
            display: flex;
            justify-content: center;
          }

          .mh-right-wrapper {
            padding: 0;
          }

          .mh-circle-container {
            max-width: 280px;
          }

          .mh-content h1 {
            font-size: 24px;
          }

          .mh-content-p {
            font-size: 13px;
          }

          .mh-tag {
            font-size: 10px;
            padding: 4px 10px;
          }

          .mh-badge {
            padding: 6px 10px;
            font-size: 10px;
            bottom: 10px;
          }

          .mh-badge-text-small {
            font-size: 8px;
          }

          .mh-badge-text-large {
            font-size: 10px;
          }
        }

        /* Extra Small Mobile (< 480px) */
        @media (max-width: 480px) {
          .mh-grid {
            gap: 20px;
            padding: 0;
            width: 100%;
          }

          .mh-left-wrapper {
            padding: 0;
            display: flex;
            justify-content: center;
          }

          .mh-right-wrapper {
            padding: 0;
          }

          .mh-circle-container {
            max-width: 240px;
          }

          .mh-content h1 {
            font-size: 20px;
            margin-bottom: 15px;
          }

          .mh-content-p {
            font-size: 12px;
            margin-bottom: 10px;
          }

          .mh-tag {
            font-size: 9px;
            padding: 3px 8px;
          }

          .mh-tags-container {
            gap: 8px;
          }
        }
      `}</style>

      <div className="mh-grid">
        {/* LEFT IMAGE */}
        <div className="mh-left-wrapper" style={{ display: "flex", justifyContent: "center" }}>
          <div className="mh-circle-container">
            {/* Ring */}
            <div className="mh-circle-ring" />

            {/* Image */}
            <div className="mh-circle-image">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1200&fit=crop"
                alt="Mentorship collaboration"
                loading="lazy"
              />
            </div>

            {/* Badge */}
            <div className="mh-badge">
              <TrendingUp size={16} />
              <div>
                <div className="mh-badge-text-small">Career Growth</div>
                <div className="mh-badge-text-large">+10x Learning</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="mh-right-wrapper">
          <div className="mh-content">
            <h1>
              Accelerate Your{" "}
              <span className="mh-content-highlight">Growth</span>
            </h1>

            <p className="mh-content-p">
              Connect with industry experts who guide you through challenges,
              unlock skills, and accelerate your career growth.
            </p>

            <p className="mh-content-p">
              With personalized mentorship and curated learning paths, you gain
              confidence and stand out in your field.
            </p>

            {/* TAGS */}
            <div className="mh-tags-container">
              {tags.map((tag, i) => (
                <span className="mh-tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}