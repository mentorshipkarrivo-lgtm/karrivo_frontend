// import React from "react";
// import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

// export default function FooterLinks() {
//   return (
//     <footer className="bg-[#0d2620] text-white">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {/* Brand Section */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold mb-4">Karrivo</h2>
//           <p className="text-gray-400 max-w-md mb-6">
//             Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
//           </p>
//           <div className="mb-6">
//             <h3 className="text-sm font-semibold mb-2">Contact</h3>
//             <a href="wecare.karrivo@gmail.com " className="text-gray-400 hover:text-white">
//               wecare.karrivo@gmail.com            </a>
//           </div>
//           {/* Social Icons */}
//           <div className="flex gap-4">
//             <a href="https://www.facebook.com/profile.php?id=61570709791237" className="text-gray-400 hover:text-white">
//               <Facebook size={20} />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <Instagram size={20} />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <Twitter size={20} />
//             </a>
//             <a href="https://www.linkedin.com/company/karrivo/" className="text-gray-400 hover:text-white">
//               <Linkedin size={20} />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white">
//               <Youtube size={20} />
//             </a>
//           </div>
//         </div>

//         {/* Links Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
//           {/* Platform Column */}
//           <div>
//             <h3 className="font-semibold mb-4">Platform</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">Browse Mentors</a></li>
//               <li><a href="#" className="hover:text-white">Book a Session</a></li>
//               <li><a href="#" className="hover:text-white">Become a Mentor</a></li>
//               <li><a href="#" className="hover:text-white">Mentorship for Teams</a></li>
//               <li><a href="#" className="hover:text-white">Testimonials</a></li>
//             </ul>
//           </div>

//           {/* Resources Column */}
//           <div>
//             <h3 className="font-semibold mb-4">Resources</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">Newsletter</a></li>
//               <li><a href="#" className="hover:text-white">Books</a></li>
//               <li><a href="#" className="hover:text-white">Perks</a></li>
//               <li><a href="#" className="hover:text-white">Templates</a></li>
//               <li><a href="#" className="hover:text-white">Career Paths</a></li>
//               <li><a href="#" className="hover:text-white">Blog</a></li>
//             </ul>
//           </div>

//           {/* Company Column */}
//           <div>
//             <h3 className="font-semibold mb-4">Company</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">Case Studies</a></li>
//               <li><a href="#" className="hover:text-white">Partner Program</a></li>
//               <li><a href="#" className="hover:text-white">Code of Conduct</a></li>
//               <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-white">DMCA</a></li>
//             </ul>
//           </div>

//           {/* Explore Column */}
//           <div>
//             <h3 className="font-semibold mb-4">Explore</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">Companies</a></li>
//               <li><a href="#" className="hover:text-white">Fractional Executives</a></li>
//               <li><a href="#" className="hover:text-white">Services & Training</a></li>
//               <li><a href="#" className="hover:text-white">Part-Time Experts</a></li>
//             </ul>
//           </div>

//           {/* Support Column */}
//           <div>
//             <h3 className="font-semibold mb-4">Support</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li><a href="#" className="hover:text-white">FAQ</a></li>
//               <li><a href="#" className="hover:text-white">Contact</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-800 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-400 text-sm">
//               © 2026 Karrivo All Rights Reserved.
//             </p>
//             <p className="text-gray-400 text-sm">
//               Crafted with <span className="text-red-500">❤</span> by{" "}
//               <span className="text-[#0098cc]">Naveen Reddy</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from "react";
import { Facebook, Linkedin, Youtube } from "lucide-react";

export default function FooterLinks() {
  const columns = [
    {
      title: "Platform",
      links: ["Browse Mentors", "Book a Session", "Become a Mentor", "Mentorship for Teams", "Testimonials"],
    },
    {
      title: "Resources",
      links: ["Newsletter", "Books", "Perks", "Templates", "Career Paths", "Blog"],
    },
    {
      title: "Company",
      links: ["Case Studies", "Partner Program", "Code of Conduct", "Privacy Policy", "DMCA"],
    },
    {
      title: "Explore",
      links: ["Companies", "Fractional Executives", "Services & Training", "Part-Time Experts"],
    },
    {
      title: "Support",
      links: ["FAQ", "Contact"],
    },
  ];

  return (
    <footer style={{ backgroundColor: "#f5f5f0", color: "#1a1a1a" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>

        {/* Top Row: Brand + Social */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          {/* Brand */}
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px", color: "#1a1a1a" }}>
              Karrivo
            </h2>
            <p style={{ fontSize: "13px", color: "#6b7280", maxWidth: "360px", lineHeight: "1.6" }}>
              Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
            </p>
            <a
              href="mailto:wecare.karrivo@gmail.com"
              style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px", display: "inline-block" }}
            >
              wecare.karrivo@gmail.com
            </a>
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { icon: <Youtube size={16} />, href: "#" },
              { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/company/karrivo/" },
              { icon: <Facebook size={16} />, href: "https://www.facebook.com/profile.php?id=61570709791237" }].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "1px solid #d1d5db", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "#6b7280", textDecoration: "none", backgroundColor: "#fff",
                  }}
                >
                  {s.icon}
                </a>
              ))}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "2rem" }} />

        {/* Links Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "1rem", color: "#1a1a1a" }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {col.links.map((link) => (
                  <li key={link}>

                    <a href="#"
                      style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
                      onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
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
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "1.5rem" }} />

        {/* Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>
              © 2026 Karrivo. All Rights Reserved.
            </p>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              Karrivo Technologies Private Limited
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <a href="mailto:wecare.karrivo@gmail.com" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>
              wecare.karrivo@gmail.com
            </a>
            <a href="#" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>DMCA</a>
          </div>
        </div>

        {/* Crafted by */}
        <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "1.5rem" }}>
          Crafted with <span style={{ color: "#ef4444" }}>❤</span> by{" "}
          <span style={{ color: "#0098cc" }}>Naveen Reddy</span>
        </p>

      </div >
    </footer >
  );
}











