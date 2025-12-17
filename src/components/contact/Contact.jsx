
  import React, { useState } from 'react';
  import { Mail, Phone, MapPin, Globe, Send, CheckCircle, X, Sparkles, Zap, Heart } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  const ContactPage = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;
      
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setShowThankYou(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 2000);
    };

    const FloatingIcon = ({ children, delay = 0 }) => (
      <div 
        className="absolute opacity-20 text-white animate-pulse"
        style={{
          animation: `float 6s ease-in-out infinite ${delay}s`,
          animationDelay: `${delay}s`
        }}
      >
        {children}
      </div>
    );

    const ThankYouModal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform ">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours!
            </p>
            <div className="flex space-x-2 justify-center mb-4">
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              <Sparkles className="w-5 h-5 text-yellow-500 animate-spin" />
              <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <button
              onClick={() =>navigate('/')}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Awesome!
            </button>
          </div>
          <button
            onClick={() => setShowThankYou(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );

    return (
      <>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(30, 150, 74, 0.3); }
            50% { box-shadow: 0 0 40px rgba(30, 150, 74, 0.6); }
          }
          .glow-animation {
            animation: glow 2s ease-in-out infinite;
          }
          .gradient-text {
            background: linear-gradient(135deg, #1e964a, #bace27);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>
        
        <div 
          className="min-h-screen py-12 px-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #195f64 0%, #bbcf28 50%, #1c994a 100%)'
          }}
        >


          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-white">
                Let's Connect! 
              </h1>
              <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                We'd love to hear from you! Drop us a message and we'll create something amazing together 
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                  <Mail className="w-8 h-8 mr-3 text-yellow-300" />
                  Get In Touch
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 group-hover:shadow-lg glow-animation">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Email Us</h3>
                      <p className="text-gray-200">office@jaimax.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 group-hover:shadow-lg glow-animation">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Call Us</h3>
                      <p className="text-gray-200">+91 6303008654</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-purple-600 group-hover:shadow-lg glow-animation">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Visit Us</h3>
                      <p className="text-gray-200">Vaishnavis Cynosure, Gachibowli<br />Hyderabad<br />500081</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 group-hover:shadow-lg glow-animation">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Website</h3>
                      <a href="https://jaimax.com" className="text-gray-200 hover:text-white transition-colors">
                        https://jaimax.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-400 to-indigo-600 group-hover:shadow-lg glow-animation">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Business Hours</h3>
                      <p className="text-gray-200">Mon-Fri 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  {/* <Send className="w-8 h-8 mr-3 text-green-600" /> */}
                  Send Message
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name 
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                        focusedField === 'name' ? 'border-green-400 ring-4 ring-green-100 shadow-lg' : 'border-gray-300'
                      } ${errors.name ? 'border-red-400' : ''}`}
                      placeholder="Your awesome name"
                    />
                    {errors.name && (
                      <div className="text-red-500 text-sm mt-1 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number 
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                        focusedField === 'phone' ? 'border-blue-400 ring-4 ring-blue-100 shadow-lg' : 'border-gray-300'
                      } ${errors.phone ? 'border-red-400' : ''}`}
                      placeholder="Your contact number"
                    />
                    {errors.phone && (
                      <div className="text-red-500 text-sm mt-1 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address 
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                        focusedField === 'email' ? 'border-purple-400 ring-4 ring-purple-100 shadow-lg' : 'border-gray-300'
                      } ${errors.email ? 'border-red-400' : ''}`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div className="text-red-500 text-sm mt-1 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message 
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      rows="5"
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 resize-none ${
                        focusedField === 'message' ? 'border-orange-400 ring-4 ring-orange-100 shadow-lg' : 'border-gray-300'
                      } ${errors.message ? 'border-red-400' : ''}`}
                      placeholder="Tell us about your amazing project..."
                    />
                    {errors.message && (
                      <div className="text-red-500 text-sm mt-1 flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        {errors.message}
                      </div>
                    )}
                  </div>


                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Magic...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showThankYou && <ThankYouModal />}
      </>
    );
  };

  export default ContactPage;