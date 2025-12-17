import React, { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Thank you for contacting Karrivo! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#062117' }}>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="text-white">
          <h1 className="text-6xl font-bold mb-2">Let's get</h1>
          <h1 className="text-6xl font-bold mb-12">in touch</h1>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Don't be afraid to say hello with us!</h2>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-400 mb-1">Phone:</p>
              <p className="text-lg">+91 98765 43210</p>
              <p className="text-lg">+91 87654 32109</p>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Email:</p>
              <p className="text-lg">hello@karrivo.com</p>
              <p className="text-lg">support@karrivo.com</p>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Office:</p>
              <p className="text-lg">Karrivo Technologies Pvt Ltd</p>
              <p className="text-lg">HSR Layout, Sector 2,</p>
              <p className="text-lg">Bangalore, Karnataka 560102</p>
              <p className="text-lg">India</p>
              <a href="#" className="inline-flex items-center gap-2 mt-2 hover:underline" style={{ color: '#0098cc' }}>
                See on Google Map
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 13L13 3M13 3H3M13 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>


          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <svg width="40" height="2" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" />
              </svg>
              <p className="text-gray-400">
                Great! We're excited to hear from you and<br />
                let's start something special together.<br />
                Call us for any inquiry.
              </p>
            </div>
          </div>

          <div className="bg-black p-8 rounded-lg">
            <h3 className="text-white text-2xl font-semibold mb-6">Contact Us</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 placeholder-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-2 block">Tell us about your interest</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your message here..."
                  className="w-full bg-transparent border-b border-gray-700 text-white py-2 focus:outline-none focus:border-gray-500 resize-none placeholder-gray-600"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded font-semibold text-black transition-all duration-300 hover:opacity-90 mt-6"
                style={{ backgroundColor: '#0098cc' }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}