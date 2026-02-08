import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation,
  useForgotMutation,
  useVerifyOtpMutation
} from "../ApiSliceComponent/RegisterApiSlice"
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleSignIn from './googleSignin';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mentorName, setMentorName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const mentorId = searchParams.get("mentorId");

  // Get mentor name from localStorage
  useEffect(() => {
    if (mentorId) {
      const storedMentorName = localStorage.getItem('selectedMentorName');
      if (storedMentorName) {
        setMentorName(storedMentorName);
      }
    }
  }, [mentorId]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    
    if (authToken) {
      if (mentorId) {
        navigate(`/book-session?mentorId=${mentorId}`, { replace: true });
      } else {
        if (userRole === "2") {
          navigate('/mentor/dashboard', { replace: true });
        } else if (userRole === "1") {
          navigate('/mentee/dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    }
  }, [navigate, mentorId]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
    otp: '',
    newPassword: ''
  });

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

  const isLoading = isRegistering || isVerifying || isLoggingIn || isResending || isForgotLoading || isVerifyingOtp;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'otp') && value && /[^0-9]/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async () => {
    const phone = (formData.phone || '').trim();
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        phone: phone,
        password: formData.password,
        countryCode: formData.countryCode,
        role: 1
      }).unwrap();

      console.log('Registration response:', response);
      setOtpSent(true);
      alert('OTP sent to your email!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert(error?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    const phone = (formData.phone || '').trim();
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await resendOtp({
        phone: phone,
        email: formData.email,
        countryCode: formData.countryCode
      }).unwrap();

      console.log('OTP Resent:', response);
      alert('OTP resent successfully!');
    } catch (error) {
      console.error('Error resending OTP:', error);
      alert(error?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleForgotPasswordSendOTP = async () => {
    if (!formData.email.trim()) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const response = await forgotPassword({
        email: formData.email
      }).unwrap();

      console.log('Forgot password OTP sent:', response);
      setForgotOtpSent(true);
      alert('OTP sent to your email!');
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleResetPassword = async () => {
    if (!formData.otp.trim()) {
      alert('Please enter the OTP.');
      return;
    }
    if (!formData.newPassword) {
      alert('Please enter a new password.');
      return;
    }
    if (formData.newPassword.length < 8) {
      alert('Password must be at least 8 characters.');
      return;
    }

    try {
      const resetResponse = await verifyOtp({
        email: formData.email,
        otp: Number(formData.otp),
        password: formData.newPassword
      }).unwrap();

      console.log('Password reset successful:', resetResponse);
      alert('Password reset successful! You can now login with your new password.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        password: '',
        confirmPassword: '',
        otp: '',
        newPassword: ''
      });
      setForgotOtpSent(false);
      setIsForgotPassword(false);
      setIsLogin(true);

    } catch (error) {
      console.error('Error resetting password:', error);
      alert(error?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!isLogin) {
      if (!formData.name.trim()) return alert('Please enter your name.');
      if (!formData.email.trim()) return alert('Please enter your email.');
      if (!formData.phone.trim()) return alert('Please enter your phone.');
      if (!formData.password) return alert('Please enter password.');
      if (formData.password.length < 8) return alert('Password must be at least 8 characters.');
      if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');
      if (!otpSent) return alert('Please send OTP first.');
      if (!formData.otp.trim()) return alert('Please enter OTP.');

      try {
        const verifyResponse = await verify({
          email: formData.email,
          otpType: "register",
          otp: Number(formData.otp)
        }).unwrap();

        console.log('OTP Verified:', verifyResponse);
        alert('Sign Up successful! You can now login.');

        setFormData({
          name: '',
          email: formData.email,
          phone: '',
          countryCode: '+91',
          password: '',
          confirmPassword: '',
          otp: '',
          newPassword: ''
        });
        setOtpSent(false);
        setIsLogin(true);

      } catch (error) {
        console.error('Error verifying OTP:', error);
      }

    } else {
      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
          role: userType === 'mentee' ? 1 : 2
        }).unwrap();

        console.log('Login successful:', response);

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('authToken', response.data.token);
        }

        if (response.data) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('userName', response.data.name);
        }

        if (mentorId) {
          navigate(`/book-session?mentorId=${mentorId}`);
        } else {
          if (response.data.role === 2) {
            navigate('/mentor/dashboard');
          } else if (response.data.role === 1) {
            navigate('/mentee/dashboard');
          } else {
            navigate('/dashboard');
          }
        }

      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  const resetAndSwitch = (mode) => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      countryCode: '+91',
      password: '',
      confirmPassword: '',
      otp: '',
      newPassword: ''
    });
    setOtpSent(false);
    setForgotOtpSent(false);
    setIsForgotPassword(mode === 'forgot');
    setIsLogin(mode === 'login');
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-slate-50 overflow-hidden">
      {/* LEFT - Welcome Panel */}
      <div className="w-full lg:w-1/3 bg-[#062117] text-white relative overflow-hidden h-1/3 lg:h-full flex items-center justify-center p-6 lg:p-8">

        <div className="z-10 text-center max-w-xs">
          <div className="absolute top-4 lg:top-6 left-4 lg:left-6 text-white font-semibold text-base lg:text-lg">Karrivo.in</div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3">
            {isForgotPassword ? 'Reset Password' : 'Welcome Back!'}
          </h1>

          <p className="text-white/90 mb-4 text-sm lg:text-base">
            {isForgotPassword
              ? 'Enter your email to receive an OTP and reset your password.'
              : 'Keep connected with us — sign in to manage tasks, projects and collaborate.'}
          </p>

          {!isForgotPassword && (
            <button
              onClick={() => {
                setOtpSent(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  countryCode: '+91',
                  password: '',
                  confirmPassword: '',
                  otp: '',
                  newPassword: ''
                });
                setIsLogin(!isLogin);
              }}
              className="px-6 lg:px-8 py-2 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition text-sm lg:text-base"
              disabled={isLoading}
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT - Form Panel */}
      <div className="w-full lg:w-2/3 h-2/3 lg:h-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 lg:p-10 my-4">
            {/* Mentor booking message */}
            {mentorId && !isForgotPassword && (
              <div className="bg-[#0098cc]/10 border-l-4 border-[#0098cc] rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#0098cc]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#062117] mb-0.5">
                      📚 Complete your booking
                    </p>
                    <p className="text-xs text-gray-600">
                      You're booking a session with{' '}
                      <span className="font-semibold text-[#062117]">
                        {mentorName || 'your mentor'}
                      </span>
                      . Please {isLogin ? 'sign in' : 'create an account'} to proceed
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Back button */}
            {isForgotPassword && (
              <button
                onClick={() => resetAndSwitch('login')}
                className="flex items-center gap-2 text-[#008FC4] mb-3 hover:underline text-sm"
                disabled={isLoading}
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            )}

            <h2 className="text-xl lg:text-2xl font-bold text-[#062117] text-center mb-4">
              {isForgotPassword ? 'Forgot Password' : (isLogin ? 'Log in' : 'Create Account')}
            </h2>

            {/* Role toggle */}
            {isLogin && !isForgotPassword && (
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  onClick={() => setUserType('mentee')}
                  className={`flex-1 pb-2 font-medium text-sm ${userType === 'mentee' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
                  disabled={isLoading}
                >
                  I'm a mentee
                </button>
                <button
                  onClick={() => setUserType('mentor')}
                  className={`flex-1 pb-2 font-medium text-sm ${userType === 'mentor' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
                  disabled={isLoading}
                >
                  I'm a mentor
                </button>
              </div>
            )}

            {/* FORGOT PASSWORD FORM */}
            {isForgotPassword ? (
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                  />
                </div>

                {!forgotOtpSent ? (
                  <button
                    type="button"
                    onClick={handleForgotPasswordSendOTP}
                    disabled={isLoading || !formData.email}
                    className="w-full bg-[#008FC4] text-white py-2.5 text-sm rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isForgotLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit OTP"
                        inputMode="numeric"
                        disabled={isLoading}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="New Password (min 8 characters)"
                        disabled={isLoading}
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        disabled={isLoading}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetPassword}
                      disabled={isLoading}
                      className="w-full py-2.5 text-sm rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isVerifyingOtp && <Loader2 size={16} className="animate-spin" />}
                      Reset Password
                    </button>

                    <button
                      type="button"
                      onClick={handleForgotPasswordSendOTP}
                      disabled={isForgotLoading}
                      className="w-full text-[#008FC4] text-xs hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* LOGIN/SIGNUP FORM */
              <div className="space-y-3">
                {/* Name */}
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      disabled={isLoading}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                    />
                  </div>
                )}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={isLogin ? 'Email or username' : 'Email address'}
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                  />
                </div>

                {/* Phone */}
                {!isLogin && (
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="px-2 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+86">+86</option>
                    </select>

                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number (10 digits)"
                        inputMode="numeric"
                        disabled={isLoading}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    disabled={isLoading}
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Forgot Password */}
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => resetAndSwitch('forgot')}
                      disabled={isLoading}
                      className="text-xs text-[#008FC4] hover:underline disabled:opacity-50"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Confirm password */}
                {!isLogin && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      disabled={isLoading}
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                )}

                {/* OTP Section */}
                {!isLogin && (
                  <>
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword}
                        className="w-full bg-[#008FC4] text-white py-2.5 text-sm rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isRegistering ? <Loader2 size={16} className="animate-spin" /> : null}
                        Send OTP
                      </button>
                    ) : null}

                    {otpSent && (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="Enter 6-digit OTP"
                            inputMode="numeric"
                            disabled={isLoading}
                            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleResendOTP}
                          disabled={isResending}
                          className="px-4 py-2.5 text-sm rounded-lg bg-white text-[#008FC4] border border-[#008FC4] hover:bg-[#f8feff] transition disabled:opacity-50 flex items-center gap-1 whitespace-nowrap"
                        >
                          {isResending ? <Loader2 size={16} className="animate-spin" /> : null}
                          Resend
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Submit */}
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-2.5 text-sm rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {(isLoggingIn || isVerifying) && <Loader2 size={16} className="animate-spin" />}
                    {isLogin ? 'SIGN IN' : 'SIGN UP'}
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            {!isForgotPassword && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => {
                      setOtpSent(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        countryCode: '+91',
                        password: '',
                        confirmPassword: '',
                        otp: '',
                        newPassword: ''
                      });
                      setIsLogin(!isLogin);
                    }}
                    disabled={isLoading}
                    className="text-[#008FC4] font-semibold ml-1 hover:underline disabled:opacity-50"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>

                {!isLogin && (
                  <div
                    onClick={() => navigate('/mentee/apply')}
                    className="w-full py-2 rounded-full text-[#008FC4] font-semibold cursor-pointer hover:text-[#006f99] flex items-center justify-center text-sm"
                  >
                    Register as Mentor
                  </div>
                )}
{/* 
                {isLogin && (
                  <>
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-gray-400">Or</span>
                      </div>
                    </div>

                    <GoogleSignIn />
                  </>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
// import { useRegisterMutation, useVerifyMutation, useLoginMutation, useOTPresentMutation, useForgotMutation, useVerifyOtpMutation } from "../ApiSliceComponent/RegisterApiSlice"
// import { useNavigate, useLocation } from 'react-router-dom';
// import GoogleSignIn from './googleSignin';

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [userType, setUserType] = useState('mentee');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [forgotOtpSent, setForgotOtpSent] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [mentorName, setMentorName] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const mentorId = searchParams.get("mentorId");

//   // Get mentor name from localStorage
//   useEffect(() => {
//     if (mentorId) {
//       const storedMentorName = localStorage.getItem('selectedMentorName');
//       if (storedMentorName) {
//         setMentorName(storedMentorName);
//       }
//     }
//   }, [mentorId]);

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     const userRole = localStorage.getItem("userRole");

//     if (authToken) {
//       if (mentorId) {
//         navigate(`/book-session?mentorId=${mentorId}`, { replace: true });
//       } else {
//         if (userRole === "2") {
//           navigate('/mentor/dashboard', { replace: true });
//         } else if (userRole === "1") {
//           navigate('/mentee/dashboard', { replace: true });
//         } else {
//           navigate('/dashboard', { replace: true });
//         }
//       }
//     }
//   }, [navigate, mentorId]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     countryCode: '+91',
//     password: '',
//     confirmPassword: '',
//     otp: '',
//     newPassword: ''
//   });

//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [login, { isLoading: isLoggingIn }] = useLoginMutation();
//   const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();
//   const [forgotPassword, { isLoading: isForgotLoading }] = useForgotMutation();
//   const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();

//   const isLoading = isRegistering || isVerifying || isLoggingIn || isResending || isForgotLoading || isVerifyingOtp;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if ((name === 'phone' || name === 'otp') && value && /[^0-9]/.test(value)) return;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSendOTP = async () => {
//     const phone = (formData.phone || '').trim();
//     if (phone.length !== 10) {
//       alert('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       const response = await register({
//         name: formData.name,
//         email: formData.email,
//         phone: phone,
//         password: formData.password,
//         countryCode: formData.countryCode,
//         role: 1
//       }).unwrap();

//       console.log('Registration response:', response);
//       setOtpSent(true);
//       alert('OTP sent to your email!');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert(error?.data?.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   const handleResendOTP = async () => {
//     const phone = (formData.phone || '').trim();
//     if (phone.length !== 10) {
//       alert('Please enter a valid 10-digit phone number.');
//       return;
//     }

//     try {
//       const response = await resendOtp({
//         phone: phone,
//         email: formData.email,
//         countryCode: formData.countryCode
//       }).unwrap();

//       console.log('OTP Resent:', response);
//       alert('OTP resent successfully!');
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//       alert(error?.data?.message || 'Failed to resend OTP. Please try again.');
//     }
//   };

//   const handleForgotPasswordSendOTP = async () => {
//     if (!formData.email.trim()) {
//       alert('Please enter your email address.');
//       return;
//     }

//     try {
//       const response = await forgotPassword({ email: formData.email }).unwrap();
//       console.log('Forgot password OTP sent:', response);
//       setForgotOtpSent(true);
//       alert('OTP sent to your email!');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert(error?.data?.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!formData.otp.trim()) {
//       alert('Please enter the OTP.');
//       return;
//     }
//     if (!formData.newPassword) {
//       alert('Please enter a new password.');
//       return;
//     }
//     if (formData.newPassword.length < 8) {
//       alert('Password must be at least 8 characters.');
//       return;
//     }

//     try {
//       const resetResponse = await verifyOtp({
//         email: formData.email,
//         otp: Number(formData.otp),
//         password: formData.newPassword
//       }).unwrap();

//       console.log('Password reset successful:', resetResponse);
//       alert('Password reset successful! You can now login with your new password.');

//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         countryCode: '+91',
//         password: '',
//         confirmPassword: '',
//         otp: '',
//         newPassword: ''
//       });
//       setForgotOtpSent(false);
//       setIsForgotPassword(false);
//       setIsLogin(true);
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       alert(error?.data?.message || 'Failed to reset password. Please try again.');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!isLogin) {
//       // SIGNUP FLOW
//       if (!formData.name.trim()) return alert('Please enter your name.');
//       if (!formData.email.trim()) return alert('Please enter your email.');
//       if (!formData.phone.trim()) return alert('Please enter your phone.');
//       if (!formData.password) return alert('Please enter password.');
//       if (formData.password.length < 8) return alert('Password must be at least 8 characters.');
//       if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');
//       if (!otpSent) return alert('Please send OTP first.');
//       if (!formData.otp.trim()) return alert('Please enter OTP.');

//       try {
//         // Verify OTP
//         const verifyResponse = await verify({
//           email: formData.email,
//           otpType: "register",
//           otp: Number(formData.otp)
//         }).unwrap();

//         console.log('OTP Verified:', verifyResponse);
//         alert('Sign Up successful! Logging you in...');

//         // Auto-login after successful signup
//         const loginResponse = await login({
//           email: formData.email,
//           password: formData.password,
//           role: 1 // Always mentee for signup
//         }).unwrap();

//         console.log('Auto-login successful:', loginResponse);

//         // Store auth data
//         if (loginResponse.data && loginResponse.data.token) {
//           localStorage.setItem('token', loginResponse.data.token);
//           localStorage.setItem('authToken', loginResponse.data.token);
//         }

//         if (loginResponse.data) {
//           localStorage.setItem('userData', JSON.stringify(loginResponse.data));
//           localStorage.setItem('userRole', loginResponse.data.role);
//           localStorage.setItem('userName', loginResponse.data.name);
//         }

//         // Navigate based on context
//         if (mentorId) {
//           navigate(`/book-session?mentorId=${mentorId}`);
//         } else {
//           navigate('/mentee/dashboard');
//         }

//       } catch (error) {
//         console.error('Error during signup/login:', error);
//         alert(error?.data?.message || 'An error occurred. Please try logging in manually.');
        
//         // Reset form and switch to login on error
//         setFormData({
//           name: '',
//           email: formData.email,
//           phone: '',
//           countryCode: '+91',
//           password: '',
//           confirmPassword: '',
//           otp: '',
//           newPassword: ''
//         });
//         setOtpSent(false);
//         setIsLogin(true);
//       }
//     } else {
//       // LOGIN FLOW
//       try {
//         const response = await login({
//           email: formData.email,
//           password: formData.password,
//           role: userType === 'mentee' ? 1 : 2
//         }).unwrap();

//         console.log('Login successful:', response);

//         if (response.data && response.data.token) {
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('authToken', response.data.token);
//         }

//         if (response.data) {
//           localStorage.setItem('userData', JSON.stringify(response.data));
//           localStorage.setItem('userRole', response.data.role);
//           localStorage.setItem('userName', response.data.name);
//         }

//         if (mentorId) {
//           navigate(`/book-session?mentorId=${mentorId}`);
//         } else {
//           if (response.data.role === 2) {
//             navigate('/mentor/dashboard');
//           } else if (response.data.role === 1) {
//             navigate('/mentee/dashboard');
//           } else {
//             navigate('/dashboard');
//           }
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         alert(error?.data?.message || 'Login failed. Please check your credentials.');
//       }
//     }
//   };

//   const resetAndSwitch = (mode) => {
//     setFormData({
//       name: '',
//       email: '',
//       phone: '',
//       countryCode: '+91',
//       password: '',
//       confirmPassword: '',
//       otp: '',
//       newPassword: ''
//     });
//     setOtpSent(false);
//     setForgotOtpSent(false);
//     setIsForgotPassword(mode === 'forgot');
//     setIsLogin(mode === 'login');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
//         {/* LEFT - Welcome Panel */}
//         <div className="lg:w-1/2 bg-gradient-to-br from-[#008FC4] to-[#006f99] p-8 lg:p-12 flex flex-col justify-center text-white">
//           <div className="mb-8">
//             <h1 className="text-3xl lg:text-4xl font-bold mb-2">Karrivo.in</h1>
//           </div>

//           <h2 className="text-2xl lg:text-3xl font-bold mb-4">
//             {isForgotPassword ? 'Reset Password' : 'Welcome Back!'}
//           </h2>
//           <p className="text-sm lg:text-base mb-8 text-white/90">
//             {isForgotPassword
//               ? 'Enter your email to receive an OTP and reset your password.'
//               : 'Keep connected with us — sign in to manage tasks, projects and collaborate.'}
//           </p>

//           {!isForgotPassword && (
//             <button
//               onClick={() => {
//                 setOtpSent(false);
//                 setFormData({
//                   name: '',
//                   email: '',
//                   phone: '',
//                   countryCode: '+91',
//                   password: '',
//                   confirmPassword: '',
//                   otp: '',
//                   newPassword: ''
//                 });
//                 setIsLogin(!isLogin);
//               }}
//               className="px-6 lg:px-8 py-2 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition text-sm lg:text-base"
//               disabled={isLoading}
//             >
//               {isLogin ? 'SIGN UP' : 'SIGN IN'}
//             </button>
//           )}
//         </div>

//         {/* RIGHT - Form Panel */}
//         <div className="lg:w-1/2 p-8 lg:p-12">
//           {/* Mentor booking message */}
//           {mentorId && !isForgotPassword && (
//             <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 📚 <strong>Complete your booking</strong>
//                 <br />
//                 You're booking a session with{' '}
//                 <span className="font-semibold">{mentorName || 'your mentor'}</span>
//                 . Please {isLogin ? 'sign in' : 'create an account'} to proceed
//               </p>
//             </div>
//           )}

//           {/* Back button */}
//           {isForgotPassword && (
//             <button
//               onClick={() => resetAndSwitch('login')}
//               className="flex items-center gap-2 text-[#008FC4] mb-3 hover:underline text-sm"
//               disabled={isLoading}
//             >
//               <ArrowLeft size={16} />
//               Back to Login
//             </button>
//           )}

//           <h2 className="text-2xl lg:text-3xl font-bold text-[#062117] mb-6">
//             {isForgotPassword ? 'Forgot Password' : (isLogin ? 'Log in' : 'Create Account')}
//           </h2>

//           {/* Role toggle */}
//           {isLogin && !isForgotPassword && (
//             <div className="flex border-b mb-6">
//               <button
//                 onClick={() => setUserType('mentee')}
//                 className={`flex-1 pb-2 font-medium text-sm ${
//                   userType === 'mentee'
//                     ? 'text-[#062117] border-b-2 border-[#008FC4]'
//                     : 'text-gray-400'
//                 }`}
//                 disabled={isLoading}
//               >
//                 I'm a mentee
//               </button>
//               <button
//                 onClick={() => setUserType('mentor')}
//                 className={`flex-1 pb-2 font-medium text-sm ${
//                   userType === 'mentor'
//                     ? 'text-[#062117] border-b-2 border-[#008FC4]'
//                     : 'text-gray-400'
//                 }`}
//                 disabled={isLoading}
//               >
//                 I'm a mentor
//               </button>
//             </div>
//           )}

//           {/* FORGOT PASSWORD FORM */}
//           {isForgotPassword ? (
//             <div className="space-y-4">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                   disabled={isLoading || forgotOtpSent}
//                 />
//               </div>

//               {!forgotOtpSent ? (
//                 <button
//                   onClick={handleForgotPasswordSendOTP}
//                   disabled={isForgotLoading}
//                   className="w-full bg-[#008FC4] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006f99] transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
//                 >
//                   {isForgotLoading ? <Loader2 className="animate-spin" size={18} /> : null}
//                   Send OTP
//                 </button>
//               ) : (
//                 <>
//                   <div className="relative">
//                     <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       type="text"
//                       name="otp"
//                       placeholder="Enter OTP"
//                       value={formData.otp}
//                       onChange={handleChange}
//                       maxLength={6}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       type={showNewPassword ? 'text' : 'password'}
//                       name="newPassword"
//                       placeholder="New Password"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                       disabled={isLoading}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                       disabled={isLoading}
//                     >
//                       {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>

//                   <button
//                     onClick={handleResetPassword}
//                     disabled={isVerifyingOtp}
//                     className="w-full bg-[#008FC4] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006f99] transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
//                   >
//                     {isVerifyingOtp && <Loader2 className="animate-spin" size={18} />}
//                     Reset Password
//                   </button>

//                   <button
//                     onClick={handleForgotPasswordSendOTP}
//                     disabled={isForgotLoading}
//                     className="w-full text-[#008FC4] py-2 text-sm hover:underline disabled:opacity-50"
//                   >
//                     Resend OTP
//                   </button>
//                 </>
//               )}
//             </div>
//           ) : (
//             /* LOGIN/SIGNUP FORM */
//             <div className="space-y-4">
//               {/* Name */}
//               {!isLogin && (
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Full Name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                     disabled={isLoading}
//                   />
//                 </div>
//               )}

//               {/* Email */}
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                   disabled={isLoading || (!isLogin && otpSent)}
//                 />
//               </div>

//               {/* Phone */}
//               {!isLogin && (
//                 <div className="relative flex gap-2">
//                   <select
//                     name="countryCode"
//                     value={formData.countryCode}
//                     onChange={handleChange}
//                     className="w-24 px-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                     disabled={isLoading || otpSent}
//                   >
//                     <option value="+91">+91</option>
//                     <option value="+1">+1</option>
//                     <option value="+44">+44</option>
//                     <option value="+61">+61</option>
//                     <option value="+86">+86</option>
//                   </select>
//                   <div className="relative flex-1">
//                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="Phone Number"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       maxLength={10}
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                       disabled={isLoading || otpSent}
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Password */}
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>

//               {/* Forgot Password */}
//               {isLogin && (
//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => resetAndSwitch('forgot')}
//                     disabled={isLoading}
//                     className="text-xs text-[#008FC4] hover:underline disabled:opacity-50"
//                   >
//                     Forgot Password?
//                   </button>
//                 </div>
//               )}

//               {/* Confirm password */}
//               {!isLogin && (
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                     disabled={isLoading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                     disabled={isLoading}
//                   >
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               )}

//               {/* OTP Section */}
//               {!isLogin && (
//                 <>
//                   {!otpSent ? (
//                     <button
//                       onClick={handleSendOTP}
//                       disabled={isRegistering}
//                       className="w-full bg-[#008FC4] text-white py-2.5 rounded-lg font-semibold hover:bg-[#006f99] transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
//                     >
//                       {isRegistering ? <Loader2 className="animate-spin" size={18} /> : null}
//                       Send OTP
//                     </button>
//                   ) : null}

//                   {otpSent && (
//                     <div className="relative">
//                       <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                       <input
//                         type="text"
//                         name="otp"
//                         placeholder="Enter OTP"
//                         value={formData.otp}
//                         onChange={handleChange}
//                         maxLength={6}
//                         className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008FC4] focus:border-transparent outline-none text-sm"
//                         disabled={isLoading}
//                       />
//                     </div>
//                   )}

//                   {otpSent && (
//                     <button
//                       onClick={handleResendOTP}
//                       disabled={isResending}
//                       className="w-full text-[#008FC4] py-2 text-sm hover:underline flex items-center justify-center gap-2 disabled:opacity-50"
//                     >
//                       {isResending ? <Loader2 className="animate-spin" size={16} /> : null}
//                       Resend
//                     </button>
//                   )}
//                 </>
//               )}

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="w-full bg-[#008FC4] text-white py-3 rounded-lg font-semibold hover:bg-[#006f99] transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
//               >
//                 {(isLoggingIn || isVerifying) && <Loader2 className="animate-spin" size={18} />}
//                 {isLogin ? 'SIGN IN' : 'SIGN UP'}
//               </button>
//             </div>
//           )}

//           {/* Footer */}
//           {!isForgotPassword && (
//             <div className="mt-6 text-center">
//               <p className="text-xs text-gray-600">
//                 {isLogin ? "Don't have an account? " : 'Already have an account? '}
//                 <button
//                   onClick={() => {
//                     setOtpSent(false);
//                     setFormData({
//                       name: '',
//                       email: '',
//                       phone: '',
//                       countryCode: '+91',
//                       password: '',
//                       confirmPassword: '',
//                       otp: '',
//                       newPassword: ''
//                     });
//                     setIsLogin(!isLogin);
//                   }}
//                   disabled={isLoading}
//                   className="text-[#008FC4] font-semibold ml-1 hover:underline disabled:opacity-50"
//                 >
//                   {isLogin ? 'Sign Up' : 'Sign In'}
//                 </button>
//               </p>

//               {!isLogin && (
//                 <div className="mt-4">
//                   <button
//                     onClick={() => navigate('/mentee/apply')}
//                     className="w-full py-2 rounded-full text-[#008FC4] font-semibold cursor-pointer hover:text-[#006f99] flex items-center justify-center text-sm"
//                   >
//                     Register as Mentor
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;