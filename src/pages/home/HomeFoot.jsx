import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

export default function FooterLinks() {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#041810] to-[#062117] py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Karrivo</h3>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted source to find highly-vetted mentors & industry professionals to move your career ahead.
            </p>
            
            <button className="text-white hover:text-[#4db8a8] font-semibold transition-colors duration-300">
              Contact
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#4db8a8] hover:to-[#5ac8d8] flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Browse Mentors
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Book a Session
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Become a Mentor
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Mentorship for Teams
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Books
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Perks
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Career Paths
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Partner Program
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  DMCA
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Fractional Executives
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Services & Training
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                  Part-Time Experts
                </a>
              </li>
            </ul>

            <div className="pt-6 space-y-4">
              <h4 className="text-lg font-bold bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] bg-clip-text text-transparent">
                Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-[#4db8a8] transition-colors duration-300 text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2025 Karrivo. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/50 hover:text-[#4db8a8] text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-white/50 hover:text-[#4db8a8] text-sm transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}