// import { useState } from "react";

// const steps = [
//   {
//     id: 1,
//     title: "Find Your Ideal Mentor",
//     description:
//       "Browse from 600+ vested mentors and get to choose your ideal mentor according to your preferences and aspiration.",
//     btnLabel: "Find Your Mentor",
//     action: "find",
//   },
//   {
//     id: 2,
//     title: "Book a FREE Trial",
//     description:
//       "Connect with mentor and see how mentor will help you achieve your goal faster & avoid asking for referrals, etc.",
//     btnLabel: "Book a FREE Trial",
//     action: "book",
//   },
//   {
//     id: 3,
//     title: "Start 1:1 Long Term Mentorship",
//     description:
//       "Bravo!! Get started with your personalised mentorship in the right direction with a mentor of your choice.",
//     btnLabel: "Start Preparing",
//     action: "start",
//   },
// ];

// export default function StepsSection() {
//   const handleButtonClick = (action) => {
//     if (action === "find" || action === "start") {
//       window.location.href = "/explore-mentors";
//     } else if (action === "book") {
//       const token = localStorage.getItem("token");
//       if (token) {
//         window.location.href = "/mentee/bookings";
//       } else {
//         window.location.href = "/login";
//       }
//     }
//   };

//   return (
//     <section style={{ background: "#062117", padding: "60px 24px", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
//       <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>

//         <h2 style={{ fontSize: "2.4rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
//           Get Started in 3 Easy Steps
//         </h2>

//         <p style={{ color: "#a8d5c2", fontSize: "1rem", marginBottom: "48px" }}>
//           Follow these three simple steps to get started with Long Term Mentorship
//         </p>

//         {/* Grid container */}
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           border: "1px solid rgba(0,152,204,0.3)",
//           alignItems: "stretch",
//         }}>
//           {steps.map((step, index) => (
//             <div
//               key={step.id}
//               style={{
//                 padding: "36px 28px",
//                 textAlign: "left",
//                 borderRight: index !== steps.length - 1 ? "1px solid rgba(0,152,204,0.3)" : "none",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               {/* Badge */}
//               <div style={{
//                 width: "44px", height: "44px",
//                 borderRadius: "10px",
//                 background: "#0098cc",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 color: "#fff", fontWeight: 700, fontSize: "1.1rem",
//                 marginBottom: "28px",
//                 flexShrink: 0,
//               }}>
//                 {step.id}
//               </div>

//               {/* Title */}
//               <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.15rem", margin: "0 0 12px 0" }}>
//                 {step.title}
//               </h3>

//               {/* Description */}
//               <p style={{ color: "#a8d5c2", fontSize: "0.9rem", lineHeight: 1.75, margin: "0 0 28px 0", flexGrow: 1 }}>
//                 {step.description}
//               </p>

//               {/* Button */}
//               <div>
//                 <button
//                   onClick={() => handleButtonClick(step.action)}
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: "8px",
//                     padding: "10px 20px",
//                     border: "1px solid rgba(0,152,204,0.5)",
//                     borderRadius: "8px",
//                     background: "transparent",
//                     color: "#0098cc",
//                     fontSize: "0.875rem", fontWeight: 600,
//                     cursor: "pointer",
//                     whiteSpace: "nowrap",
//                   }}
//                   onMouseEnter={e => {
//                     e.currentTarget.style.background = "#0098cc";
//                     e.currentTarget.style.color = "#fff";
//                   }}
//                   onMouseLeave={e => {
//                     e.currentTarget.style.background = "transparent";
//                     e.currentTarget.style.color = "#0098cc";
//                   }}
//                 >
//                   {step.btnLabel} →
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


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
    <section className="bg-[#062117] py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto text-center">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          Get Started in 3 Easy Steps
        </h2>

        <p className="text-[#a8d5c2] text-sm sm:text-base mb-10 sm:mb-12">
          Follow these three simple steps to get started with Long Term Mentorship
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-[#0098cc4d]">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={[
                "flex flex-col p-7 sm:p-8 text-left",
                // Right border: only between columns (not last in each row)
                "border-b border-[#0098cc4d]",
                // On lg: right border for first two, no bottom border
                index < 2
                  ? "lg:border-r lg:border-[#0098cc4d] lg:border-b-0"
                  : "lg:border-r-0 lg:border-b-0",
                // On sm: right border for odd index (left column)
                index % 2 === 0
                  ? "sm:border-r sm:border-[#0098cc4d]"
                  : "sm:border-r-0",
                // Last card: no bottom border on mobile
                index === steps.length - 1 ? "border-b-0" : "",
              ].join(" ")}
            >
              {/* Badge */}
              <div className="w-11 h-11 rounded-xl bg-[#0098cc] flex items-center justify-center text-white font-bold text-lg mb-7 shrink-0">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base sm:text-lg mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[#a8d5c2] text-sm leading-7 mb-7 flex-grow">
                {step.description}
              </p>

              {/* Button */}
              <div>
                <button
                  onClick={() => handleButtonClick(step.action)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0098cc80] rounded-lg bg-transparent text-[#0098cc] text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors duration-200 hover:bg-[#0098cc] hover:text-white w-full sm:w-auto justify-center sm:justify-start"
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