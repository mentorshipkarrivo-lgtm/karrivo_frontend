


import React, { useEffect, useState } from "react";
import karrivoLogo from "../assets/KarivoLogo.jpg";

const TIPS = [
    "Mentees give updates to their mentors on a daily basis to stay consistent",
    "Set clear goals with your mentor at the start of each session",
    "Ask for feedback regularly to accelerate your growth",
    "Consistency is more important than intensity in mentorship",
];

const Loader = () => {
    const [tipIndex, setTipIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setTipIndex((prev) => (prev + 1) % TIPS.length);
                setFade(true);
            }, 400);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                zIndex: 1000,
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            {/* Logo Image replaces the SVG icon */}
            <div
                style={{
                    marginBottom: "24px",
                    animation: "pulse 2s ease-in-out infinite",
                }}
            >
                <img
                    src={karrivoLogo}
                    alt="Karivo"
                    style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            </div>

            {/* Title */}
            <h2
                style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: "0 0 12px 0",
                    letterSpacing: "0.01em",
                }}
            >
                Level Up            </h2>

            {/* Tip Text — clean, no quotes or symbols */}
            <p
                style={{
                    fontSize: "14px",
                    color: "#6B7280",
                    maxWidth: "420px",
                    textAlign: "center",
                    lineHeight: "1.6",
                    padding: "0 24px",
                    margin: 0,
                    transition: "opacity 0.4s ease",
                    opacity: fade ? 1 : 0,
                }}
            >
                {TIPS[tipIndex]}
            </p>

            {/* Loading dots */}
            <div style={{ display: "flex", gap: "6px", marginTop: "32px" }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#3B4FE8",
                            animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Loader;