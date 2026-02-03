import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function FooterLinks() {
  return (
    <footer className="bg-[#062117] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Brand Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Karrivo</h2>
          <p className="text-gray-400 max-w-md mb-6">
            Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
          </p>
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Contact</h3>
            <a href="mailto:contact@karrivo.com" className="text-gray-400 hover:text-white">
              contact@karrivo.com
            </a>
          </div>
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Platform Column */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Browse Mentors</a></li>
              <li><a href="#" className="hover:text-white">Book a Session</a></li>
              <li><a href="#" className="hover:text-white">Become a Mentor</a></li>
              <li><a href="#" className="hover:text-white">Mentorship for Teams</a></li>
              <li><a href="#" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Newsletter</a></li>
              <li><a href="#" className="hover:text-white">Books</a></li>
              <li><a href="#" className="hover:text-white">Perks</a></li>
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">Career Paths</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
              <li><a href="#" className="hover:text-white">Partner Program</a></li>
              <li><a href="#" className="hover:text-white">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">DMCA</a></li>
            </ul>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Companies</a></li>
              <li><a href="#" className="hover:text-white">Fractional Executives</a></li>
              <li><a href="#" className="hover:text-white">Services & Training</a></li>
              <li><a href="#" className="hover:text-white">Part-Time Experts</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Karrivo All Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Crafted with <span className="text-red-500">❤</span> by{" "}
              <span className="text-[#0098cc]">Naveen Reddy</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}