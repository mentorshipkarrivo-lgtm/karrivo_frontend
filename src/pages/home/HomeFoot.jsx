

// import React from "react";
// import { Facebook, Linkedin, Youtube } from "lucide-react";

// export default function FooterLinks() {
//   const columns = [
//     {
//       title: "Platform",
//       links: ["Browse Mentors", "Book a Session", "Become a Mentor", "Mentorship for Teams", "Testimonials"],
//     },
//     {
//       title: "Resources",
//       links: ["Newsletter", "Books", "Perks", "Templates", "Career Paths", "Blog"],
//     },
//     {
//       title: "Company",
//       links: ["Case Studies", "Partner Program", "Code of Conduct", "Privacy Policy", "DMCA"],
//     },
//     {
//       title: "Explore",
//       links: ["Companies", "Fractional Executives", "Services & Training", "Part-Time Experts"],
//     },
//     {
//       title: "Support",
//       links: ["FAQ", "Contact"],
//     },
//   ];

//   return (
//     <footer style={{ backgroundColor: "#f5f5f0", color: "#1a1a1a" }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>

//         {/* Top Row: Brand + Social */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
//           {/* Brand */}
//           <div>
//             <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px", color: "#1a1a1a" }}>
//               Karrivo
//             </h2>
//             <p style={{ fontSize: "13px", color: "#6b7280", maxWidth: "360px", lineHeight: "1.6" }}>
//               Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
//             </p>
//             <a
//               href="mailto:wecare.karrivo@gmail.com"
//               style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px", display: "inline-block" }}
//             >
//               wecare.karrivo@gmail.com
//             </a>
//           </div>

//           {/* Social Icons */}
//           <div style={{ display: "flex", gap: "10px" }}>
//             {[
//               { icon: <Youtube size={16} />, href: "#" },
//               { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/karrivo/" },
//               { icon: <Facebook size={16} />, href: "https://www.facebook.com/profile.php?id=61570709791237" }].map((s, i) => (
//                 <a
//                   key={i}
//                   href={s.href}
//                   style={{
//                     width: "36px", height: "36px", borderRadius: "50%",
//                     border: "1px solid #d1d5db", display: "flex",
//                     alignItems: "center", justifyContent: "center",
//                     color: "#6b7280", textDecoration: "none", backgroundColor: "#fff",
//                   }}
//                 >
//                   {s.icon}
//                 </a>
//               ))}
//           </div>
//         </div>

//         {/* Divider */}
//         <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "2rem" }} />

//         {/* Links Grid */}
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
//           {columns.map((col) => (
//             <div key={col.title}>
//               <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "1rem", color: "#1a1a1a" }}>
//                 {col.title}
//               </h3>
//               <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
//                 {col.links.map((link) => (
//                   <li key={link}>

//                     <a href="#"
//                       style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}
//                       onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
//                       onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
//                     >
//                       {link}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "1.5rem" }} />

//         {/* Bottom Bar */}
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
//           <div>
//             <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
//               © 2026 Karrivo. All Rights Reserved.
//             </p>
//             <p style={{ fontSize: "12px", color: "#9ca3af" }}>
//               Karrivo Technologies Private Limited
//             </p>
//           </div>
//           <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
//             <a href="mailto:wecare.karrivo@gmail.com" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>
//               wecare.karrivo@gmail.com
//             </a>
//             <a href="#" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Privacy Policy</a>
//             <a href="#" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>DMCA</a>
//           </div>
//         </div>

//         {/* Crafted by */}
//         <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "1.5rem" }}>
//           Crafted with <span style={{ color: "#ef4444" }}>❤</span> by{" "}
//           <span style={{ color: "#0098cc" }}>Naveen Reddy</span>
//         </p>

//       </div >
//     </footer >
//   );
// }



import React from "react";
import { Facebook, Linkedin, Youtube } from "lucide-react";

export default function FooterLinks() {
  const columns = [
    {
      title: "Platform",
      links: [
        "Browse Mentors",
        "Book a Session",
        "Become a Mentor",
        "Mentorship for Teams",
        "Testimonials",
      ],
    },
    {
      title: "Resources",
      links: [
        "Newsletter",
        "Books",
        "Perks",
        "Templates",
        "Career Paths",
        "Blog",
      ],
    },
    {
      title: "Company",
      links: [
        "Case Studies",
        "Partner Program",
        "Code of Conduct",
        "Privacy Policy",
        "DMCA",
      ],
    },
    {
      title: "Explore",
      links: [
        "Companies",
        "Fractional Executives",
        "Services & Training",
        "Part-Time Experts",
      ],
    },
    {
      title: "Support",
      links: ["FAQ", "Contact"],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#f5f5f0",
        color: "#1a1a1a",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.2rem",
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ flex: "1", minWidth: "250px" }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#1a1a1a",
              }}
            >
              Karrivo
            </h2>

            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                maxWidth: "360px",
                lineHeight: "1.6",
              }}
            >
              Your trusted source to find highly-vetted mentors &
              industry professionals to move your career ahead.
            </p>

            <a
              href="mailto:wecare.karrivo@gmail.com"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginTop: "10px",
                display: "inline-block",
                textDecoration: "none",
              }}
            >
              wecare.karrivo@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <Youtube size={16} />,
                href: "#",
              },
              {
                icon: <Linkedin size={16} />,
                href: "https://www.linkedin.com/company/karrivo/",
              },
              {
                icon: <Facebook size={16} />,
                href:
                  "https://www.facebook.com/profile.php?id=61570709791237",
              },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            marginBottom: "2rem",
          }}
        />

        {/* Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                  color: "#1a1a1a",
                }}
              >
                {col.title}
              </h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1a1a1a")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6b7280")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              © 2026 Karrivo. All Rights Reserved.
            </p>

            <p
              style={{
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              Karrivo Technologies Private Limited
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:wecare.karrivo@gmail.com"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              wecare.karrivo@gmail.com
            </a>

            <a
              href="#"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </a>

            <a
              href="#"
              style={{
                fontSize: "13px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              DMCA
            </a>
          </div>
        </div>

        {/* Crafted By */}
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "1.5rem",
            lineHeight: "1.6",
          }}
        >
          Crafted with{" "}
          <span style={{ color: "#ef4444" }}>❤</span> by{" "}
          <span style={{ color: "#0098cc" }}>
            Naveen Reddy
          </span>
        </p>
      </div>
    </footer>
  );
}







