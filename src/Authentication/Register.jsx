import React, { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Mail,Users, Lock, ArrowRight, Shield, User, Phone, Key, ChevronDown, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import Logo from "./Logo";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    otp: '',
    countryCode: '🇮🇳',
    countryPhoneCode: '+91',
    country: 'India'
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [fieldValidation, setFieldValidation] = useState({});

  // Enhanced country codes data
  const countryCodes = [
    { flag: '🇮🇳', country_code: '+91', country_name: 'India' },
    { flag: '🇺🇸', country_code: '+1', country_name: 'United States' },
    { flag: '🇬🇧', country_code: '+44', country_name: 'United Kingdom' },
    { flag: '🇨🇦', country_code: '+1', country_name: 'Canada' },
    { flag: '🇦🇺', country_code: '+61', country_name: 'Australia' },
    { flag: '🇩🇪', country_code: '+49', country_name: 'Germany' },
    { flag: '🇫🇷', country_code: '+33', country_name: 'France' },
    { flag: '🇯🇵', country_code: '+81', country_name: 'Japan' },
    { flag: '🇸🇬', country_code: '+65', country_name: 'Singapore' },
    { flag: '🇦🇪', country_code: '+971', country_name: 'UAE' }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  // Real-time validation
  const validateField = useCallback((name, value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|mil|info|co|io|me|biz|live|yahoo|gmail)$/i;
    const phoneRegex = /^\d+$/;

    switch (name) {
      case 'name':
        if (!value.trim()) return { isValid: false, message: 'Full name is required' };
        if (value.length < 3) return { isValid: false, message: 'Name must be at least 3 characters' };
        if (!/^[A-Za-z\s]+$/.test(value)) return { isValid: false, message: 'Name can only contain letters and spaces' };
        return { isValid: true, message: '' };


      case 'email':
        if (!value.trim()) return { isValid: false, message: 'Email is required' };
        if (!emailRegex.test(value.trim())) return { isValid: false, message: 'Please enter a valid email address' };
        return { isValid: true, message: '' };

      case 'phone':
        if (!value.trim()) return { isValid: false, message: 'Phone number is required' };
        if (!phoneRegex.test(value)) return { isValid: false, message: 'Phone number should contain only digits' };
        if (formData.countryPhoneCode === '+91' && value.length !== 10) return { isValid: false, message: 'Phone number must be 10 digits for India' };
        if (formData.countryPhoneCode !== '+91' && (value.length < 4 || value.length > 15)) return { isValid: false, message: 'Phone number must be between 4 to 15 digits' };
        return { isValid: true, message: '' };

      case 'password':
        if (!value) return { isValid: false, message: 'Password is required' };
        if (value.length < 8) return { isValid: false, message: 'Password must be at least 8 characters long' };
        if (!/(?=.*[a-z])/.test(value)) return { isValid: false, message: 'Password must contain at least one lowercase letter' };
        if (!/(?=.*[A-Z])/.test(value)) return { isValid: false, message: 'Password must contain at least one uppercase letter' };
        if (!/(?=.*\d)/.test(value)) return { isValid: false, message: 'Password must contain at least one number' };
        if (!/(?=.*[^A-Za-z0-9])/.test(value)) return { isValid: false, message: 'Password must contain at least one special character' };
        return { isValid: true, message: '' };


      case 'confirmPassword':
        if (!value) return { isValid: false, message: 'Please confirm your password' };
        if (formData.password !== value) return { isValid: false, message: 'Passwords do not match' };
        return { isValid: true, message: '' };
      case 'referralcode':
        if (!value.trim()) {
          return { isValid: true, message: '' };
        }
        if (!/^[A-Z]+$/.test(value)) {
          return { isValid: false, message: 'Referral code must contain only capital letters' };
        }
        return { isValid: true, message: '' };
      default:
        return { isValid: true, message: '' };
    }
  }, [formData.password, formData.countryPhoneCode]);

  const   handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const validation = validateField(name, value);
    setFieldValidation(prev => ({
      ...prev,
      [name]: validation
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountrySelect = (country) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.flag,
      countryPhoneCode: country.country_code,
      country: country.country_name,
      phone: ''
    }));
    setShowCountryDropdown(false);

    // Revalidate phone if it has content
    if (formData.phone) {
      const validation = validateField('phone', '');
      setFieldValidation(prev => ({
        ...prev,
        phone: validation
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach(field => {
      if (field !== 'referralCode' && field !== 'otp' && field !== 'countryCode' && field !== 'countryPhoneCode' && field !== 'country') {
        const validation = validateField(field, formData[field]);
        if (!validation.isValid) {
          newErrors[field] = validation.message;
        }
      }
    });

    if (otpSent && !formData.otp) {
      newErrors.otp = 'Please enter the OTP';
    }

    if (!agreeTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    const requiredFields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    const hasErrors = requiredFields.some(field => {
      const validation = validateField(field, formData[field]);
      return !validation.isValid;
    });

    if (hasErrors) {
      validate();
      return;
    }

    setOtpLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOtpSent(true);
      setTimer(120);
      setCanResend(false);
      // Show success notification instead of alert
      setFieldValidation(prev => ({
        ...prev,
        otpSent: { isValid: true, message: 'OTP sent successfully to your email!' }
      }));
    } catch (error) {
      console.error('Error sending OTP:', error);
      setFieldValidation(prev => ({
        ...prev,
        otpSent: { isValid: false, message: 'Failed to send OTP. Please try again.' }
      }));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration data:', formData);
      setFieldValidation(prev => ({
        ...prev,
        registration: { isValid: true, message: 'Registration successful! Welcome to JAIMAX!' }
      }));
    } catch (error) {
      console.error('Registration error:', error);
      setFieldValidation(prev => ({
        ...prev,
        registration: { isValid: false, message: 'Registration failed. Please try again.' }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleTermsChange = (e) => {
    const checked = e.target.checked;
    setAgreeTerms(checked);
    if (checked) {
      setShowTermsModal(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  const getFieldIcon = (fieldName) => {
    const validation = fieldValidation[fieldName];
    if (!validation) return null;

    return validation.isValid ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-400" />
    );
  };

  return (
    <div className="min-h-screen bg-[#094e54] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ backgroundColor: '#094e54' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ backgroundColor: '#094e54', animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-60 h-60 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ backgroundColor: '#0a5c64', animationDelay: '4s' }}></div>
      </div> */}

      <div className={`w-full max-w-6xl grid lg:grid-cols-2 gap-12 m-10 items-start transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-8 p-0"
          style={{ transform: 'translateX(-7rem) translateY(2rem)' }}>
          <h1 class="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mb-2 drop-shadow-lg">
            JAIMAX
          </h1>
          <div class="flex items-center justify-center gap-2 text-sky-200/90 text-base md:text-lg font-medium">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-sky-300" />
            <span>"Your Security, Our Priority – Join with Confidence"</span>
          </div>
          <Logo />
          {/* <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-2 rounded-full opacity-60 animate-pulse" style={{ background: 'linear-gradient(135deg, #094e54, #4ecdc4)', animationDelay: `${i * 0.5}s` }}></div>
            ))}
          </div> */}
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-lg" style={{ position: "relative", top: "-1rem" }}>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 shadow-2xl border border-white/20 hover:shadow-purple-500/20 transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-2">
              <h1 class="text-3xl font-bold text-gray-800 text-center mb-2">
                Sign In
              </h1>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                  <span className="text-red-400">*</span>
                  {getFieldIcon('name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-white/10 border ${errors.name ? 'border-red-400' :
                    fieldValidation.name?.isValid ? 'border-green-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  style={{ '--tw-ring-color': '#094e54' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #094e54'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  placeholder="Enter your full name"
                />
                {(errors.name || fieldValidation.name?.message) && (
                  <p className={`text-sm flex items-center gap-1 ${errors.name ? 'text-red-400' : fieldValidation.name?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    <span className={`w-1 h-1 rounded-full ${errors.name ? 'bg-red-400' : fieldValidation.name?.isValid ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    {errors.name || fieldValidation.name?.message}
                  </p>
                )}
              </div>

              {/* Phone Number with Country Code */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                  <span className="text-red-400">*</span>
                  {getFieldIcon('phone')}
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-xl hover:border-white/40 transition-all duration-200 backdrop-blur-sm min-w-[120px]"
                    >
                      <span className="text-lg">{formData.countryCode}</span>
                      <span className="font-medium text-gray-200">{formData.countryPhoneCode}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-80 bg-white/95 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                        {countryCodes.map((country, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-black/10 transition-colors duration-200 text-left text-gray-800"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="font-medium">{country.country_code}</span>
                            <span className="text-sm">{country.country_name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 bg-white/10 border ${errors.phone ? 'border-red-400' :
                      fieldValidation.phone?.isValid ? 'border-green-400' : 'border-white/20'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                    style={{ '--tw-ring-color': '#094e54' }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #094e54'}
                    onBlur={(e) => e.target.style.boxShadow = 'none'}
                    placeholder="Enter phone number"
                  />
                </div>
                {(errors.phone || fieldValidation.phone?.message) && (
                  <p className={`text-sm flex items-center gap-1 ${errors.phone ? 'text-red-400' : fieldValidation.phone?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    <span className={`w-1 h-1 rounded-full ${errors.phone ? 'bg-red-400' : fieldValidation.phone?.isValid ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    {errors.phone || fieldValidation.phone?.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                  <span className="text-red-400">*</span>
                  {getFieldIcon('email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-white/10 border ${errors.email ? 'border-red-400' :
                    fieldValidation.email?.isValid ? 'border-green-400' : 'border-white/20'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  style={{ '--tw-ring-color': '#094e54' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #094e54'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                  placeholder="Enter your email address"
                />
                {(errors.email || fieldValidation.email?.message) && (
                  <p className={`text-sm flex items-center gap-1 ${errors.email ? 'text-red-400' : fieldValidation.email?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    <span className={`w-1 h-1 rounded-full ${errors.email ? 'bg-red-400' : fieldValidation.email?.isValid ? 'bg-green-400' : 'bg-red-400'}`}></span>
                    {errors.email || fieldValidation.email?.message}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                    <span className="text-red-400">*</span>
                    {getFieldIcon('password')}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 pr-12 bg-white/10 border ${errors.password ? 'border-red-400' :
                        fieldValidation.password?.isValid ? 'border-green-400' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                      style={{ '--tw-ring-color': '#094e54' }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #094e54'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {(errors.password || fieldValidation.password?.message) && (
                    <p className={`text-sm flex items-center gap-1 ${errors.password ? 'text-red-400' : fieldValidation.password?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                      <span className={`w-1 h-1 rounded-full ${errors.password ? 'bg-red-400' : fieldValidation.password?.isValid ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      {errors.password || fieldValidation.password?.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm
                    <span className="text-red-400">*</span>
                    {getFieldIcon('confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 pr-12 bg-white/10 border ${errors.confirmPassword ? 'border-red-400' :
                        fieldValidation.confirmPassword?.isValid ? 'border-green-400' : 'border-white/20'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                      style={{ '--tw-ring-color': '#094e54' }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #094e54'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                      placeholder="Confirm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {(errors.confirmPassword || fieldValidation.confirmPassword?.message) && (
                    <p className={`text-sm flex items-center gap-1 ${errors.confirmPassword ? 'text-red-400' : fieldValidation.confirmPassword?.isValid ? 'text-green-400' : 'text-red-400'}`}>
                      <span className={`w-1 h-1 rounded-full ${errors.confirmPassword ? 'bg-red-400' : fieldValidation.confirmPassword?.isValid ? 'bg-green-400' : 'bg-red-400'}`}></span>
                      {errors.confirmPassword || fieldValidation.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>

              
            <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a545a] focus:border-transparent"
                      placeholder="Enter referral code (if any)"
                    />
                  </div>
                  {errors.referralCode && <p className="text-red-500 text-xs mt-1">{errors.referralCode}</p>}
                </div>

                {/* OTP Section */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Verification *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={otpSent && canResend ? handleResendOTP : handleSendOTP}
                      disabled={otpLoading || (otpSent && !canResend)}
                      className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[100px] ${
                        otpSent && !canResend
                          ? 'bg-[#20934a] text-white cursor-not-allowed'
                          : otpLoading
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-[#0a545a] text-white hover:bg-[#0a545a]/90'
                      }`}
                    >
                      {otpLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : otpSent && !canResend ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Sent</span>
                        </>
                      ) : otpSent && canResend ? (
                        'Resend'
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        maxLength="6"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a545a] focus:border-transparent text-center tracking-widest font-mono"
                        placeholder="000000"
                      />
                      {otpSent && !canResend && (
                        <div className="flex items-center justify-center mt-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Resend in {formatTime(timer)}
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                </div>

              {/* Terms & Conditions */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={handleTermsChange}
                    className="mt-1 w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-2 cursor-pointer"
                    style={{ accentColor: '#094e54' }}
                  />
                  <span className="text-sm text-gray-300">
                    I accept the{' '}
                    <span className="font-semibold transition-colors cursor-pointer" style={{ color: '#4ecdc4' }}>
                      Terms & Conditions
                    </span>{' '}
                    and{' '}
                    <span className="font-semibold transition-colors cursor-pointer" style={{ color: '#4ecdc4' }}>
                      Privacy Policy
                    </span>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading || !otpSent || !agreeTerms}
                className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 group ${loading || !otpSent || !agreeTerms
                  ? 'text-white cursor-not-allowed'
                  : 'text-white cursor-pointer'
                  }`}
                style={{
                  background: loading || !otpSent || !agreeTerms ? '#c5d82e' : 'linear-gradient(135deg,#c5d82e',
                  '--tw-ring-color': '#094e54'
                }}
                onMouseEnter={(e) => {
                  if (!loading && otpSent && agreeTerms) {
                    e.target.style.background = 'linear-gradient(135deg, #c5d82e, #c5d82e)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading && otpSent && agreeTerms) {
                    e.target.style.background = 'linear-gradient(135deg, #c5d82e, #c5d82e)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin bg-yellow"
                      style={{
                        background: 'linear-gradient(135deg,rgb(149, 161, 53),rgb(147, 235, 96))',
                        '--tw-ring-color': '#094e54'
                      }}
                    ></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-1 border-t border-white/10">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="font-semibold transition-colors cursor-pointer"
                    style={{ color: '#4ecdc4' }}
                    onClick={() => alert('Login functionality would go here')}
                    onMouseEnter={(e) => e.target.style.color = '#5dd5cd'}
                    onMouseLeave={(e) => e.target.style.color = '#4ecdc4'}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Mobile Branding */}
          <div className="lg:hidden text-center mt-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12 cursor-pointer hover:rotate-0 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #094e54, #0a5c64)' }}>
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Join <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #094e54, #4ecdc4)' }}>JAIMAX</span>
            </h1>
            <p className="text-gray-300 text-sm">Create your account and unlock possibilities</p>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h3>
              <div className="text-sm text-gray-600 mb-6 space-y-3">
                <h4 className="font-semibold text-gray-800">Welcome to JAIMAX</h4>
                <p>
                  Please read these Terms and Conditions carefully before using our services.
                  By accessing or using our services, you agree to comply with these Terms.
                </p>

                <h5 className="font-semibold text-gray-800">1. Account Security</h5>
                <p>
                  You are responsible for maintaining the security of your account credentials.
                  JAIMAX shall not be liable for any loss or damage arising from your failure
                  to maintain the security of your account or password.
                </p>

                <h5 className="font-semibold text-gray-800">2. Compliance and Conduct</h5>
                <p>
                  You agree not to disrupt or attempt to tamper with JAIMAX's services or servers.
                  Respect the privacy of others and refrain from disclosing personal information
                  without consent.
                </p>

                <h5 className="font-semibold text-gray-800">3. Financial Obligations</h5>
                <p>
                  Any excess deposits or withdrawals mistakenly made to your account must be
                  promptly returned. Failure to do so may result in legal action.
                </p>

                <h5 className="font-semibold text-gray-800">4. Privacy Policy</h5>
                <p>
                  We respect your privacy and are committed to protecting it through our
                  compliance with this Policy. We collect only the data necessary for each
                  specific purpose.
                </p>

                <h5 className="font-semibold text-gray-800">5. Contact Us</h5>
                <p>
                  If you have any questions regarding these Terms and Conditions, please
                  contact us at support@jaimax.com.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTermsModal(false);
                    setAgreeTerms(false);
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => {
                    setShowTermsModal(false);
                    setAgreeTerms(true);
                  }}
                  className="flex-1 py-3 px-4 text-white rounded-lg transition-colors"
                  style={{ background: 'linear-gradient(135deg, #094e54, #4ecdc4)' }}
                  onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #0a5c64, #5dd5cd)'}
                  onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, #094e54, #4ecdc4)'}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;



// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Eye, EyeOff, Shield, User, Mail, Phone, Key, Users, Check, TrendingUp, Quote } from 'lucide-react';

// // Single validation schema for all fields
// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, 'Name must be at least 2 characters')
//     .required('Name is required'),
//   phone: Yup.string()
//     .matches(/^\+?[\d\s-()]+$/, 'Invalid phone number')
//     .required('Phone is required'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
//     .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
//     .matches(/(?=.*\d)/, 'Password must contain at least one number')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm password is required'),
//   referralId: Yup.string()
//     .min(3, 'Referral ID must be at least 3 characters'),
//   otp: Yup.string()
//     .matches(/^\d{6}$/, 'OTP must be 6 digits')
//     .required('OTP is required'),
//   acceptTerms: Yup.boolean()
//     .oneOf([true], 'You must accept the terms and conditions')
//     .required('You must accept the terms and conditions')
// });

// const CryptoRegisterForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const initialValues = {
//     name: '',
//     phone: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     referralId: '',
//     otp: '',
//     acceptTerms: false
//   };

//   const handleSendOTP = (email) => {
//     if (email && validationSchema.fields.email.isValidSync(email)) {
//       setOtpSent(true);
//       alert('OTP sent to your email!');
//     } else {
//       alert('Please enter a valid email address first');
//     }
//   };

//   const handleSubmit = (values, { setSubmitting }) => {
//     console.log('Form submitted:', values);
//     alert('Registration completed successfully!');
//     setSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Section - JAIMAX Branding */}
//       <div 
//         className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden"
//         style={{ background: 'linear-gradient(135deg, #0a545a 0%, #20934a 100%)' }}
//       >
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
//           <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
//           <div className="absolute bottom-32 left-32 w-40 h-40 border border-white/20 rounded-full"></div>
//           <div className="absolute bottom-20 right-20 w-20 h-20 border border-white/20 rounded-full"></div>
//         </div>

//         {/* Content */}
//         <div className="text-center z-10">
//           {/* Logo/Brand */}
//           <div className="mb-8">
//             <TrendingUp className="w-16 h-16 text-white mx-auto mb-4" />
//             <h1 className="text-6xl font-bold text-white tracking-wide">
//               JAIMAX
//             </h1>
//             <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
//           </div>

//           {/* Quote */}
//           <div className="max-w-lg">
//             <Quote className="w-12 h-12 text-white/60 mx-auto mb-6" />
//             <blockquote className="text-2xl text-white/90 font-light leading-relaxed mb-6">
//               "The future of finance is decentralized. Join the revolution and take control of your financial destiny."
//             </blockquote>
//             <p className="text-white/70 text-lg">
//               Start your crypto journey today
//             </p>
//           </div>

//           {/* Features */}
//           <div className="mt-12 space-y-4">
//             <div className="flex items-center justify-center space-x-3 text-white/80">
//               <Shield className="w-5 h-5" />
//               <span>Bank-level security</span>
//             </div>
//             <div className="flex items-center justify-center space-x-3 text-white/80">
//               <TrendingUp className="w-5 h-5" />
//               <span>Real-time trading</span>
//             </div>
//             <div className="flex items-center justify-center space-x-3 text-white/80">
//               <Users className="w-5 h-5" />
//               <span>Global community</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Registration Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gray-50 overflow-y-auto">
//         <div className="w-full max-w-md my-4">
//           {/* Mobile Logo (visible only on small screens) */}
//           <div className="lg:hidden text-center mb-8">
//             <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#0a545a' }} />
//             <h1 className="text-4xl font-bold mb-2" style={{ color: '#0a545a' }}>
//               JAIMAX
//             </h1>
//             <p className="text-gray-600">Join the crypto revolution</p>
//           </div>

//           {/* Form Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
//             <p className="text-gray-600">Start your crypto trading journey</p>
//           </div>

//           {/* Form */}
//           <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values, isSubmitting }) => (
//                 <Form className="space-y-3">
//                   {/* Name Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Full Name *
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type="text"
//                         name="name"
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Enter your full name"
//                       />
//                     </div>
//                     <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Phone Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone Number *
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type="tel"
//                         name="phone"
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Enter your phone number"
//                       />
//                     </div>
//                     <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Email Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address *
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type="email"
//                         name="email"
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Enter your email"
//                       />
//                     </div>
//                     <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Password Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Password *
//                     </label>
//                     <div className="relative">
//                       <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Create a strong password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Confirm Password Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Confirm Password *
//                     </label>
//                     <div className="relative">
//                       <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Confirm your password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                       </button>
//                     </div>
//                     <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Referral ID Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Referral ID (Optional)
//                     </label>
//                     <div className="relative">
//                       <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                       <Field
//                         type="text"
//                         name="referralId"
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="Enter referral ID"
//                       />
//                     </div>
//                     <ErrorMessage name="referralId" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* OTP Section */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Verification *
//                     </label>
//                     <div className="flex space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => handleSendOTP(values.email)}
//                         disabled={otpSent}
//                         className={`px-3 py-2.5 rounded-lg font-medium transition-colors ${
//                           otpSent 
//                             ? 'bg-green-600 text-white cursor-not-allowed' 
//                             : 'text-white hover:opacity-90'
//                         }`}
//                         style={{ backgroundColor: otpSent ? '#059669' : '#0a545a' }}
//                       >
//                         {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//                       </button>
//                       <Field
//                         type="text"
//                         name="otp"
//                         maxLength="6"
//                         className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-center tracking-widest"
//                         style={{ focusRingColor: '#0a545a' }}
//                         placeholder="000000"
//                       />
//                     </div>
//                     <ErrorMessage name="otp" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Terms and Conditions */}
//                   <div>
//                     <label className="flex items-start space-x-3 cursor-pointer">
//                       <Field
//                         type="checkbox"
//                         name="acceptTerms"
//                         className="mt-1 w-5 h-5 rounded border-gray-300"
//                         style={{ accentColor: '#0a545a' }}
//                       />
//                       <span className="text-sm text-gray-600">
//                         I agree to the{' '}
//                         <a href="#" className="underline hover:no-underline" style={{ color: '#0a545a' }}>
//                           Terms and Conditions
//                         </a>{' '}
//                         and{' '}
//                         <a href="#" className="underline hover:no-underline" style={{ color: '#0a545a' }}>
//                           Privacy Policy
//                         </a>
//                       </span>
//                     </label>
//                     <ErrorMessage name="acceptTerms" component="p" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//                     style={{ backgroundColor: '#0a545a' }}
//                   >
//                     <Check className="w-5 h-5" />
//                     <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>

//           {/* Sign In Link */}
//           <div className="text-center mt-6">
//             <p className="text-gray-600">
//               Already have an account?{' '}
//               <a href="#" className="font-semibold underline hover:no-underline" style={{ color: '#0a545a' }}>
//                 Sign In
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CryptoRegisterForm;