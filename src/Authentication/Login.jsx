


import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation,
  useForgotMutation,
  useVerifyOtpMutation,
  useGoogleAuthMutation
} from "../ApiSliceComponent/RegisterApiSlice"
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleSignIn from './googleSignin';
import { showToast } from '../utils/Toastprovider';

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

  useEffect(() => {
    if (mentorId) {
      const storedMentorName = localStorage.getItem('selectedMentorName');
      if (storedMentorName) setMentorName(storedMentorName);
    }
  }, [mentorId]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");
    if (authToken) {
      if (mentorId) {
        navigate(`/book-session?mentorId=${mentorId}`, { replace: true });
      } else {
        if (userRole === "2") navigate('/mentor/dashboard', { replace: true });
        else if (userRole === "1") navigate('/mentee/bookings', { replace: true });
        else navigate('/dashboard', { replace: true });
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
  const [googleAuth] = useGoogleAuthMutation();
  const isLoading = isRegistering || isVerifying || isLoggingIn || isResending || isForgotLoading || isVerifyingOtp;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'phone' || name === 'otp') && value && /[^0-9]/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Enter key handler ──────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || isLoading) return;

    if (isForgotPassword) {
      if (!forgotOtpSent) {
        handleForgotPasswordSendOTP();
      } else {
        handleResetPassword();
      }
      return;
    }

    // Signup: if OTP not sent yet and all base fields filled, send OTP on Enter
    if (!isLogin && !otpSent) {
      const { name, email, phone, password, confirmPassword } = formData;
      if (name && email && phone && password && confirmPassword) {
        handleSendOTP();
      }
      return;
    }

    // Signup with OTP filled, or login — submit
    handleSubmit();
  };


  const handleGoogleSuccess = async (token) => {
    try {
      const response = await googleAuth(token).unwrap();
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('authToken', response.data.token);
      }
      if (response.data) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.name);
      }
      showToast.success('Google login successful!');
      if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
      else if (response.data.role === 2) navigate('/mentor/dashboard');
      else if (response.data.role === 1) navigate('/mentee/bookings');
      else navigate('/dashboard');
    } catch (error) {
      showToast.error(error?.data?.message || 'Google login failed.');
    }
  };

  const handleSendOTP = async () => {
    const phone = (formData.phone || '').trim();
    if (phone.length !== 10) {
      showToast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone,
        password: formData.password,
        countryCode: formData.countryCode,
        role: 1
      }).unwrap();
      setOtpSent(true);
      showToast.success('OTP sent to your email!');
    } catch (error) {
      showToast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    const phone = (formData.phone || '').trim();
    if (phone.length !== 10) {
      showToast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    try {
      await resendOtp({ phone, email: formData.email, countryCode: formData.countryCode }).unwrap();
      showToast.success('OTP resent successfully!');
    } catch (error) {
      showToast.error(error?.data?.message || 'Failed to resend OTP. Please try again.');
    }
  };

  const handleForgotPasswordSendOTP = async () => {
    if (!formData.email.trim()) {
      showToast.error('Please enter your email address.');
      return;
    }
    try {
      await forgotPassword({ email: formData.email }).unwrap();
      setForgotOtpSent(true);
      showToast.success('OTP sent to your email!');
    } catch (error) {
      showToast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
    }
  };
  const handleResetPassword = async () => {
    if (!formData.otp.trim()) { showToast.error('Please enter the OTP.'); return; }
    if (!formData.newPassword) { showToast.error('Please enter a new password.'); return; }
    if (formData.newPassword.length < 8) { showToast.error('Password must be at least 8 characters.'); return; }

    try {
      // Step 1: Verify OTP first (same as signup flow)
      await verify({
        email: formData.email,
        otpType: "forgotPassword",
        otp: Number(formData.otp)
      }).unwrap();

      // Step 2: If OTP valid, then reset password
      await verifyOtp({
        email: formData.email,
        otp: Number(formData.otp),
        password: formData.newPassword
      }).unwrap();

      showToast.success('Password reset successful! You can now login.');
      setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
      setForgotOtpSent(false);
      setIsForgotPassword(false);
      setIsLogin(true);

    } catch (error) {
      showToast.error(error?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!isLogin) {
      if (!formData.name.trim()) { showToast.error('Please enter your name.'); return; }
      if (!formData.email.trim()) { showToast.error('Please enter your email.'); return; }
      if (!formData.phone.trim()) { showToast.error('Please enter your phone.'); return; }
      if (!formData.password) { showToast.error('Please enter password.'); return; }
      if (formData.password.length < 8) { showToast.error('Password must be at least 8 characters.'); return; }
      if (formData.password !== formData.confirmPassword) { showToast.error('Passwords do not match.'); return; }
      if (!otpSent) { showToast.warning('Please send OTP first.'); return; }
      if (!formData.otp.trim()) { showToast.error('Please enter OTP.'); return; }

      try {
        await verify({ email: formData.email, otpType: "register", otp: Number(formData.otp) }).unwrap();
        showToast.success('Sign Up successful');

        try {
          const loginResponse = await login({ email: formData.email, password: formData.password, role: 1 }).unwrap();
          if (loginResponse.data?.token) {
            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('authToken', loginResponse.data.token);
          }
          if (loginResponse.data) {
            localStorage.setItem('userData', JSON.stringify(loginResponse.data));
            localStorage.setItem('userRole', loginResponse.data.role);
            localStorage.setItem('userName', loginResponse.data.name);
          }
          if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
          else if (loginResponse.data.role === 2) navigate('/mentor/dashboard');
          else if (loginResponse.data.role === 1) navigate('/mentee/bookings');
          else navigate('/dashboard');
        } catch {
          setFormData({ name: '', email: formData.email, phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
          setOtpSent(false);
          setIsLogin(true);
        }
      } catch (error) {
        showToast.error(error?.data?.message || 'Invalid OTP. Please try again.');
      }

    } else {
      try {
        const response = await login({ email: formData.email, password: formData.password, role: userType === 'mentee' ? 1 : 2 }).unwrap();
        if (response.data?.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('authToken', response.data.token);
        }
        if (response.data) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          localStorage.setItem('userRole', response.data.role);
          localStorage.setItem('userName', response.data.name);
        }
        showToast.success('Login successful!');
        if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
        else if (response.data.role === 2) navigate('/mentor/dashboard');
        else if (response.data.role === 1) navigate('/mentee/bookings');
        else navigate('/dashboard');
      } catch (error) {
        showToast.error(error?.data?.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const resetAndSwitch = (mode) => {
    setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
    setOtpSent(false);
    setForgotOtpSent(false);
    setIsForgotPassword(mode === 'forgot');
    setIsLogin(mode === 'login');
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* LEFT - Welcome Panel */}
      <div className="w-full lg:w-1/3 bg-[#0f0f10] text-white relative overflow-hidden h-1/3 lg:h-full flex items-center justify-center p-6 lg:p-8">
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
                setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
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
      <div className="w-full lg:w-2/3 h-2/3 lg:h-full overflow-y-auto bg-white">
        <div className="min-h-full flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-xl bg-white rounded-2xl p-6 lg:p-10 my-4 h-[560px] overflow-y-auto border border-gray-100">
            {mentorId && !isForgotPassword && (
              <div className="bg-[#0098cc]/10 border-l-4 border-[#0098cc] rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0098cc] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#062117] mb-0.5">📚 Complete your booking</p>
                    <p className="text-xs text-gray-600">
                      You're booking a session with{' '}
                      <span className="font-semibold text-[#062117]">{mentorName || 'your mentor'}</span>.
                      Please {isLogin ? 'sign in' : 'create an account'} to proceed
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Back button */}
            {isForgotPassword && (
              <button onClick={() => resetAndSwitch('login')} className="flex items-center gap-2 text-[#0098cc] mb-3 hover:underline text-sm" disabled={isLoading}>
                <ArrowLeft size={16} /> Back to Login
              </button>
            )}

            <h2 className="text-xl lg:text-2xl font-bold text-[#062117] text-center mb-4">
              {isForgotPassword ? 'Forgot Password' : (isLogin ? 'Log in' : 'Create Account As Mentee')}
            </h2>

            {/* Role toggle */}
            {isLogin && !isForgotPassword && (
              <div className="flex border-b border-gray-200 mb-4">
                <button onClick={() => setUserType('mentee')} disabled={isLoading}
                  className={`flex-1 pb-2 font-medium text-sm ${userType === 'mentee' ? 'text-[#062117] border-b-2 border-[#0098cc]' : 'text-gray-400'}`}>
                  I'm a mentee
                </button>
                <button onClick={() => setUserType('mentor')} disabled={isLoading}
                  className={`flex-1 pb-2 font-medium text-sm ${userType === 'mentor' ? 'text-[#062117] border-b-2 border-[#0098cc]' : 'text-gray-400'}`}>
                  I'm a mentor
                </button>
              </div>
            )}

            {/* ── FORGOT PASSWORD FORM ── */}
            {isForgotPassword ? (
              <div className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    name="email" type="email" value={formData.email}
                    onChange={handleChange} onKeyDown={handleKeyDown}
                    placeholder="Enter your email" disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50"
                  />
                </div>

                {!forgotOtpSent ? (
                  <button type="button" onClick={handleForgotPasswordSendOTP} disabled={isLoading || !formData.email}
                    className="w-full bg-[#0098cc] text-white py-2.5 text-sm rounded-lg hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isForgotLoading && <Loader2 size={16} className="animate-spin" />}
                    Send OTP
                  </button>
                ) : (
                  <>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="otp" value={formData.otp}
                        onChange={handleChange} onKeyDown={handleKeyDown}
                        placeholder="Enter 6-digit OTP" inputMode="numeric" disabled={isLoading}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        name="newPassword" type={showNewPassword ? 'text' : 'password'} value={formData.newPassword}
                        onChange={handleChange} onKeyDown={handleKeyDown}
                        placeholder="New Password (min 8 characters)" disabled={isLoading}
                        className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50"
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" disabled={isLoading}>
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <button type="button" onClick={handleResetPassword} disabled={isLoading}
                      className="w-full py-2.5 text-sm rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {isVerifyingOtp && <Loader2 size={16} className="animate-spin" />}
                      Reset Password
                    </button>
                    <button type="button" onClick={handleForgotPasswordSendOTP} disabled={isForgotLoading}
                      className="w-full text-[#0098cc] text-xs hover:underline disabled:opacity-50">
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* ── LOGIN / SIGNUP FORM ── */
              <div className="space-y-3">
                {/* Name */}
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input name="name" value={formData.name} onChange={handleChange} onKeyDown={handleKeyDown}
                      placeholder="Full name" disabled={isLoading}
                      className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                  </div>
                )}

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown}
                    placeholder={isLogin ? 'Email or username' : 'Email address'} disabled={isLoading}
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                </div>

                {/* Phone */}
                {!isLogin && (
                  <div className="flex gap-2">
                    <select name="countryCode" value={formData.countryCode} onChange={handleChange} disabled={isLoading}
                      className="px-2 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50">
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+61">+61</option>
                      <option value="+86">+86</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input name="phone" value={formData.phone} onChange={handleChange} onKeyDown={handleKeyDown}
                        placeholder="Phone number (10 digits)" inputMode="numeric" disabled={isLoading}
                        className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password}
                    onChange={handleChange} onKeyDown={handleKeyDown}
                    placeholder="Password" disabled={isLoading}
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" disabled={isLoading}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Forgot Password */}
                {isLogin && (
                  <div className="text-right">
                    <button type="button" onClick={() => resetAndSwitch('forgot')} disabled={isLoading}
                      className="text-xs text-[#0098cc] hover:underline disabled:opacity-50">
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Confirm Password */}
                {!isLogin && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword}
                      onChange={handleChange} onKeyDown={handleKeyDown}
                      placeholder="Confirm password" disabled={isLoading}
                      className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" disabled={isLoading}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                )}

                {/* OTP Section */}
                {!isLogin && (
                  <>
                    {!otpSent && (
                      <button type="button" onClick={handleSendOTP}
                        disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword}
                        className="w-full bg-[#0098cc] text-white py-2.5 text-sm rounded-lg hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isRegistering && <Loader2 size={16} className="animate-spin" />}
                        Send OTP
                      </button>
                    )}

                    {otpSent && (
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input name="otp" value={formData.otp} onChange={handleChange} onKeyDown={handleKeyDown}
                            placeholder="Enter 6-digit OTP" inputMode="numeric" disabled={isLoading}
                            className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-[#0098cc] focus:border-transparent outline-none disabled:opacity-50" />
                        </div>
                        <button type="button" onClick={handleResendOTP} disabled={isResending}
                          className="px-4 py-2.5 text-sm rounded-lg bg-white text-[#0098cc] border border-[#0098cc] hover:bg-[#f8feff] transition disabled:opacity-50 flex items-center gap-1 whitespace-nowrap">
                          {isResending && <Loader2 size={16} className="animate-spin" />}
                          Resend
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Submit */}
                <button type="button" onClick={handleSubmit} disabled={isLoading}
                  className="w-full py-2.5 text-sm rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {(isLoggingIn || isVerifying) && <Loader2 size={16} className="animate-spin" />}
                  {isLogin ? 'SIGN IN' : 'SIGN UP'}
                </button>


                {/* {userType === 'mentee' && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
                      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>or</span>
                      <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
                    </div>
                    <GoogleSignIn onSuccess={handleGoogleSuccess} />
                  </>
                )} */}
              </div>
            )}

            {/* Footer */}
            {!isForgotPassword && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {!isLogin ? 'Already have an account? ' : (userType === 'mentee' ? "Don't have an account? " : null)}
                  {(!isLogin || userType === 'mentee') && (
                    <button
                      onClick={() => {
                        setOtpSent(false);
                        setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
                        setIsLogin(!isLogin);
                      }}
                      disabled={isLoading}
                      className="text-[#0098cc] font-semibold ml-1 hover:underline disabled:opacity-50"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  )}
                </p>
                {isLogin && userType === 'mentor' && (
                  <div onClick={() => navigate('/mentee/apply')}
                    className="w-full py-2 rounded-full text-[#0098cc] font-semibold cursor-pointer hover:text-[#007aa8] flex items-center justify-center text-base">
                    <span className="text-gray-500 text-sm">
                      Want to become a Mentor?
                    </span>{" "}
                    <span className="text-base">
                      Register here
                    </span>
                  </div>
                )}
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
// import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2, ChevronDown } from 'lucide-react';
// import {
//   useRegisterMutation,
//   useVerifyMutation,
//   useLoginMutation,
//   useOTPresentMutation,
//   useForgotMutation,
//   useVerifyOtpMutation,
//   useGoogleAuthMutation
// } from "../ApiSliceComponent/RegisterApiSlice"
// import { useNavigate, useLocation } from 'react-router-dom';
// import GoogleSignIn from './googleSignin';
// import { showToast } from '../utils/Toastprovider';
// import KarrivoLogo from "../assets/karivoLogo.jpg"

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
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const searchParams = new URLSearchParams(location.search);
//   const mentorId = searchParams.get("mentorId");

//   useEffect(() => {
//     if (mentorId) {
//       const storedMentorName = localStorage.getItem('selectedMentorName');
//       if (storedMentorName) setMentorName(storedMentorName);
//     }
//   }, [mentorId]);

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     const userRole = localStorage.getItem("userRole");
//     if (authToken) {
//       if (mentorId) {
//         navigate(`/book-session?mentorId=${mentorId}`, { replace: true });
//       } else {
//         if (userRole === "2") navigate('/mentor/dashboard', { replace: true });
//         else if (userRole === "1") navigate('/mentee/bookings', { replace: true });
//         else navigate('/dashboard', { replace: true });
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
//   const [googleAuth] = useGoogleAuthMutation();
//   const isLoading = isRegistering || isVerifying || isLoggingIn || isResending || isForgotLoading || isVerifyingOtp;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if ((name === 'phone' || name === 'otp') && value && /[^0-9]/.test(value)) return;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key !== 'Enter' || isLoading) return;

//     if (isForgotPassword) {
//       if (!forgotOtpSent) {
//         handleForgotPasswordSendOTP();
//       } else {
//         handleResetPassword();
//       }
//       return;
//     }

//     if (!isLogin && !otpSent) {
//       const { name, email, phone, password, confirmPassword } = formData;
//       if (name && email && phone && password && confirmPassword) {
//         handleSendOTP();
//       }
//       return;
//     }

//     handleSubmit();
//   };

//   const handleGoogleSuccess = async (token) => {
//     try {
//       const response = await googleAuth(token).unwrap();
//       if (response.data?.token) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('authToken', response.data.token);
//       }
//       if (response.data) {
//         localStorage.setItem('userData', JSON.stringify(response.data));
//         localStorage.setItem('userRole', response.data.role);
//         localStorage.setItem('userName', response.data.name);
//       }
//       showToast.success('Google login successful!');
//       if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
//       else if (response.data.role === 2) navigate('/mentor/dashboard');
//       else if (response.data.role === 1) navigate('/mentee/bookings');
//       else navigate('/dashboard');
//     } catch (error) {
//       showToast.error(error?.data?.message || 'Google login failed.');
//     }
//   };

//   const handleSendOTP = async () => {
//     const phone = (formData.phone || '').trim();
//     if (phone.length !== 10) {
//       showToast.error('Please enter a valid 10-digit phone number.');
//       return;
//     }
//     try {
//       await register({
//         name: formData.name,
//         email: formData.email,
//         phone,
//         password: formData.password,
//         countryCode: formData.countryCode,
//         role: 1
//       }).unwrap();
//       setOtpSent(true);
//       showToast.success('OTP sent to your email!');
//     } catch (error) {
//       showToast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   const handleResendOTP = async () => {
//     const phone = (formData.phone || '').trim();
//     if (phone.length !== 10) {
//       showToast.error('Please enter a valid 10-digit phone number.');
//       return;
//     }
//     try {
//       await resendOtp({ phone, email: formData.email, countryCode: formData.countryCode }).unwrap();
//       showToast.success('OTP resent successfully!');
//     } catch (error) {
//       showToast.error(error?.data?.message || 'Failed to resend OTP. Please try again.');
//     }
//   };

//   const handleForgotPasswordSendOTP = async () => {
//     if (!formData.email.trim()) {
//       showToast.error('Please enter your email address.');
//       return;
//     }
//     try {
//       await forgotPassword({ email: formData.email }).unwrap();
//       setForgotOtpSent(true);
//       showToast.success('OTP sent to your email!');
//     } catch (error) {
//       showToast.error(error?.data?.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!formData.otp.trim()) { showToast.error('Please enter the OTP.'); return; }
//     if (!formData.newPassword) { showToast.error('Please enter a new password.'); return; }
//     if (formData.newPassword.length < 8) { showToast.error('Password must be at least 8 characters.'); return; }

//     try {
//       await verify({
//         email: formData.email,
//         otpType: "forgotPassword",
//         otp: Number(formData.otp)
//       }).unwrap();

//       await verifyOtp({
//         email: formData.email,
//         otp: Number(formData.otp),
//         password: formData.newPassword
//       }).unwrap();

//       showToast.success('Password reset successful! You can now login.');
//       setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
//       setForgotOtpSent(false);
//       setIsForgotPassword(false);
//       setIsLogin(true);

//     } catch (error) {
//       showToast.error(error?.data?.message || 'Invalid OTP. Please try again.');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!isLogin) {
//       if (!formData.name.trim()) { showToast.error('Please enter your name.'); return; }
//       if (!formData.email.trim()) { showToast.error('Please enter your email.'); return; }
//       if (!formData.phone.trim()) { showToast.error('Please enter your phone.'); return; }
//       if (!formData.password) { showToast.error('Please enter password.'); return; }
//       if (formData.password.length < 8) { showToast.error('Password must be at least 8 characters.'); return; }
//       if (formData.password !== formData.confirmPassword) { showToast.error('Passwords do not match.'); return; }
//       if (!otpSent) { showToast.warning('Please send OTP first.'); return; }
//       if (!formData.otp.trim()) { showToast.error('Please enter OTP.'); return; }

//       try {
//         await verify({ email: formData.email, otpType: "register", otp: Number(formData.otp) }).unwrap();
//         showToast.success('Sign Up successful');

//         try {
//           const loginResponse = await login({ email: formData.email, password: formData.password, role: 1 }).unwrap();
//           if (loginResponse.data?.token) {
//             localStorage.setItem('token', loginResponse.data.token);
//             localStorage.setItem('authToken', loginResponse.data.token);
//           }
//           if (loginResponse.data) {
//             localStorage.setItem('userData', JSON.stringify(loginResponse.data));
//             localStorage.setItem('userRole', loginResponse.data.role);
//             localStorage.setItem('userName', loginResponse.data.name);
//           }
//           if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
//           else if (loginResponse.data.role === 2) navigate('/mentor/dashboard');
//           else if (loginResponse.data.role === 1) navigate('/mentee/bookings');
//           else navigate('/dashboard');
//         } catch {
//           setFormData({ name: '', email: formData.email, phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
//           setOtpSent(false);
//           setIsLogin(true);
//         }
//       } catch (error) {
//         showToast.error(error?.data?.message || 'Invalid OTP. Please try again.');
//       }

//     } else {
//       try {
//         const response = await login({ email: formData.email, password: formData.password, role: userType === 'mentee' ? 1 : 2 }).unwrap();
//         if (response.data?.token) {
//           localStorage.setItem('token', response.data.token);
//           localStorage.setItem('authToken', response.data.token);
//         }
//         if (response.data) {
//           localStorage.setItem('userData', JSON.stringify(response.data));
//           localStorage.setItem('userRole', response.data.role);
//           localStorage.setItem('userName', response.data.name);
//         }
//         showToast.success('Login successful!');
//         if (mentorId) navigate(`/book-session?mentorId=${mentorId}`);
//         else if (response.data.role === 2) navigate('/mentor/dashboard');
//         else if (response.data.role === 1) navigate('/mentee/bookings');
//         else navigate('/dashboard');
//       } catch (error) {
//         showToast.error(error?.data?.message || 'Login failed. Please check your credentials.');
//       }
//     }
//   };

//   const resetAndSwitch = (mode) => {
//     setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
//     setOtpSent(false);
//     setForgotOtpSent(false);
//     setIsForgotPassword(mode === 'forgot');
//     setIsLogin(mode === 'login');
//   };

//   const toggleMode = () => {
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(prev => !prev);
//       setOtpSent(false);
//       setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
//       setTimeout(() => setIsTransitioning(false), 50);
//     }, 250);
//   };

//   const handleTabClick = (mode) => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setTimeout(() => {
//       setIsLogin(mode === 'login');
//       setOtpSent(false);
//       setIsForgotPassword(false);
//       setFormData({ name: '', email: '', phone: '', countryCode: '+91', password: '', confirmPassword: '', otp: '', newPassword: '' });
//       setTimeout(() => setIsTransitioning(false), 50);
//     }, 250);
//   };

//   /* ── Shared input class ── */
//   const inputCls = (hasError) =>
//     `w-full pl-10 pr-4 py-3 bg-white border rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none transition-all duration-200 text-sm ${hasError ? 'border-red-400 bg-red-50' : 'border-gray-300'}`;

//   /* ─────────────── LOGIN FORM ─────────────── */
//   const LoginForm = () => (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">Login</h1>
//         <p className="text-gray-500 text-sm">
//           {mentorId
//             ? `Sign in to book a session with ${mentorName || 'your mentor'}`
//             : 'Welcome back — enter your details to continue'}
//         </p>
//       </div>

//       {/* Role toggle */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           onClick={() => setUserType('mentee')}
//           disabled={isLoading}
//           className={`flex-1 pb-3 font-semibold text-sm transition-all duration-200 ${userType === 'mentee' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
//         >
//           I'm a Mentee
//         </button>
//         <button
//           onClick={() => setUserType('mentor')}
//           disabled={isLoading}
//           className={`flex-1 pb-3 font-semibold text-sm transition-all duration-200 ${userType === 'mentor' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
//         >
//           I'm a Mentor
//         </button>
//       </div>

//       <div className="space-y-5">
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your email"
//               autoComplete="off"
//               disabled={isLoading}
//               className={inputCls(false)}
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Password <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Lock className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your password"
//               autoComplete="off"
//               disabled={isLoading}
//               className={`${inputCls(false)} pr-12`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               disabled={isLoading}
//             >
//               {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
//             </button>
//           </div>
//         </div>

//         {/* Forgot password */}
//         <div className="text-right -mt-2">
//           <button
//             type="button"
//             onClick={() => { setIsForgotPassword(true); setIsLogin(true); }}
//             disabled={isLoading}
//             className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="w-full bg-[#1a1a1a] text-white py-3 px-4 rounded-full font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2 uppercase flex items-center justify-center gap-2"
//         >
//           {isLoggingIn && <Loader2 className="h-4 w-4 animate-spin" />}
//           {isLoggingIn ? 'Signing In...' : 'Login'}
//         </button>
//       </div>

//       {/* Footer */}
//       {userType === 'mentee' && (
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 mb-2 text-sm">Don't have an account?</p>
//           <button
//             onClick={toggleMode}
//             disabled={isLoading}
//             className="text-gray-900 hover:text-gray-700 font-semibold text-sm border-b border-gray-900 hover:border-gray-700 transition-colors"
//           >
//             Sign Up
//           </button>
//         </div>
//       )}

//       {isLogin && userType === 'mentor' && (
//         <div
//           onClick={() => navigate('/mentee/apply')}
//           className="mt-4 text-center cursor-pointer"
//         >
//           <span className="text-gray-500 text-sm">Want to become a Mentor? </span>
//           <span className="text-gray-900 font-semibold text-sm border-b border-gray-900">Register here</span>
//         </div>
//       )}
//     </div>
//   );

//   /* ─────────────── REGISTER FORM ─────────────── */
//   const RegisterForm = () => (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//       <div className="text-center mb-6">
//         {/* <h1 className="text-2xl font-bold text-gray-800 uppercase mb-1">Register</h1> */}
//         <p className="text-gray-500 text-sm">Create a new account to get started</p>
//       </div>

//       {mentorId && (
//         <div className="bg-gray-50 border-l-4 border-gray-900 rounded-lg  mb-5">
//           <div className="flex items-start gap-2">
//             <ShieldCheck className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
//             <p className="text-xs text-gray-600">
//               You're booking a session with{' '}
//               <span className="font-semibold text-gray-900">{mentorName || 'your mentor'}</span>.
//               Create an account to proceed.
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {/* Name */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <User className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Full Name"
//             disabled={isLoading}
//             className={inputCls(false)}
//           />
//         </div>

//         {/* Email */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Mail className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Email Address"
//             disabled={isLoading}
//             className={inputCls(false)}
//           />
//         </div>

//         {/* Phone */}
//         <div className="flex rounded-lg border border-gray-300 focus-within:border-gray-700 focus-within:ring-2 focus-within:ring-gray-700 transition-all duration-200 overflow-hidden">
//           <select
//             name="countryCode"
//             value={formData.countryCode}
//             onChange={handleChange}
//             disabled={isLoading}
//             className="bg-gray-50 py-3 px-3 text-sm border-r border-gray-200 outline-none focus:bg-gray-100 transition-colors"
//           >
//             <option value="+91">🇮🇳 +91</option>
//             <option value="+1">🇺🇸 +1</option>
//             <option value="+44">🇬🇧 +44</option>
//             <option value="+61">🇦🇺 +61</option>
//             <option value="+86">🇨🇳 +86</option>
//           </select>
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Phone className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Phone Number"
//               disabled={isLoading}
//               className="w-full pl-10 pr-3 py-3 text-sm border-0 bg-transparent outline-none"
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Password"
//             disabled={isLoading}
//             className={`${inputCls(false)} pr-12`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             disabled={isLoading}
//           >
//             {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
//           </button>
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Lock className="h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Confirm Password"
//             disabled={isLoading}
//             className={`${inputCls(false)} pr-12`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             disabled={isLoading}
//           >
//             {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
//           </button>
//         </div>

//         {/* OTP Section */}
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <ShieldCheck className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter 6-digit OTP"
//               inputMode="numeric"
//               maxLength="6"
//               disabled={isLoading || !otpSent}
//               className={`${inputCls(false)} ${!otpSent ? 'opacity-50 cursor-not-allowed' : ''}`}
//             />
//           </div>
//           {!otpSent ? (
//             <button
//               type="button"
//               onClick={handleSendOTP}
//               disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword}
//               className="px-4 py-3 text-sm rounded-lg font-medium whitespace-nowrap bg-[#1a1a1a] text-white hover:bg-gray-800 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 flex-shrink-0"
//             >
//               {isRegistering && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
//               Send OTP
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={handleResendOTP}
//               disabled={isResending}
//               className="px-4 py-3 text-sm rounded-lg font-medium whitespace-nowrap border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 disabled:opacity-40 flex items-center gap-1.5 flex-shrink-0"
//             >
//               {isResending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
//               Resend
//             </button>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isLoading || !otpSent || !formData.otp.trim()}
//           className="w-full bg-[#1a1a1a] text-white py-3 px-4 rounded-full font-semibold hover:bg-gray-800 focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-1 uppercase flex items-center justify-center gap-2"
//         >
//           {(isVerifying || isRegistering) && <Loader2 className="h-4 w-4 animate-spin" />}
//           {isVerifying ? 'Verifying OTP...' : 'Register'}
//         </button>
//       </div>

//       <div className="mt-6 text-center">
//         <p className="text-gray-500 text-sm mb-1">Already have an account?</p>
//         <button
//           onClick={toggleMode}
//           disabled={isLoading}
//           className="text-gray-900 hover:text-gray-700 font-semibold text-sm border-b border-gray-900 hover:border-gray-700 transition-colors"
//         >
//           Sign In
//         </button>
//       </div>
//     </div>
//   );

//   /* ─────────────── FORGOT PASSWORD FORM ─────────────── */
//   const ForgotForm = () => (
//     <div className={`w-full max-w-md transition-all duration-500 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//       <button
//         onClick={() => resetAndSwitch('login')}
//         className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 mb-6 text-sm transition-colors"
//         disabled={isLoading}
//       >
//         <ArrowLeft size={16} /> Back to Login
//       </button>

//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2 uppercase">Reset Password</h1>
//         <p className="text-gray-500 text-sm">Enter your email to receive a reset OTP</p>
//       </div>

//       <div className="space-y-5">
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Email <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Mail className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               placeholder="Enter your email"
//               disabled={isLoading}
//               className={inputCls(false)}
//             />
//           </div>
//         </div>

//         {!forgotOtpSent ? (
//           <button
//             type="button"
//             onClick={handleForgotPasswordSendOTP}
//             disabled={isLoading || !formData.email}
//             className="w-full bg-[#1a1a1a] text-white py-3 px-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase flex items-center justify-center gap-2"
//           >
//             {isForgotLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//             Send OTP
//           </button>
//         ) : (
//           <>
//             {/* OTP */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">OTP <span className="text-red-500">*</span></label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <ShieldCheck className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <input
//                   name="otp"
//                   value={formData.otp}
//                   onChange={handleChange}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Enter 6-digit OTP"
//                   inputMode="numeric"
//                   disabled={isLoading}
//                   className={inputCls(false)}
//                 />
//               </div>
//             </div>

//             {/* New Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password <span className="text-red-500">*</span></label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-4 w-4 text-gray-400" />
//                 </div>
//                 <input
//                   type={showNewPassword ? 'text' : 'password'}
//                   name="newPassword"
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   onKeyDown={handleKeyDown}
//                   placeholder="New password (min 8 characters)"
//                   disabled={isLoading}
//                   className={`${inputCls(false)} pr-12`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowNewPassword(!showNewPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   disabled={isLoading}
//                 >
//                   {showNewPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleResetPassword}
//               disabled={isLoading}
//               className="w-full bg-[#1a1a1a] text-white py-3 px-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg uppercase flex items-center justify-center gap-2"
//             >
//               {isVerifyingOtp && <Loader2 className="h-4 w-4 animate-spin" />}
//               Reset Password
//             </button>

//             <button
//               type="button"
//               onClick={handleForgotPasswordSendOTP}
//               disabled={isForgotLoading}
//               className="w-full text-gray-500 hover:text-gray-800 text-sm transition-colors"
//             >
//               Resend OTP
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );

//   /* ─────────────── BRANDED LEFT PANEL ─────────────── */
//   const BrandPanel = () => (
//     <div className="relative text-center text-white px-8 flex flex-col items-center justify-center h-full overflow-hidden">
     
//       {/* Brand mark */}
//       <div className="relative mb-6">
//         <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto">

//      <img src={KarrivoLogo} alt="" />
//         </div>
     
//       </div>

//       <div className="relative">
//         <h2 className={`text-4xl font-bold mb-4 transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//           {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//         </h2>
//         <p className={`text-white/75 text-base leading-relaxed max-w-xs mx-auto transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//           {isForgotPassword
//             ? 'Enter your email to receive an OTP and reset your password.'
//             : isLogin
//               ? 'Connect, learn, and grow — all from one Karrivo account.'
//               : 'The next-gen mentorship platform built for you. Register today.'}
//         </p>
//       </div>
//     </div>
//   );

//   /* ─────────────── MOBILE TAB NAV ─────────────── */
//   const MobileNav = () => (
//     <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1 shadow-xl border border-white/10">
//       <button
//         onClick={() => handleTabClick('login')}
//         disabled={isTransitioning}
//         className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all duration-500 ${isLogin && !isForgotPassword ? 'bg-white text-gray-900 shadow-lg' : 'text-white hover:bg-white/20'} ${isTransitioning ? 'opacity-50' : ''}`}
//       >
//         LOGIN
//       </button>
//       <button
//         onClick={() => handleTabClick('register')}
//         disabled={isTransitioning}
//         className={`flex-1 py-3 px-4 rounded-full text-sm font-bold transition-all duration-500 ${!isLogin && !isForgotPassword ? 'bg-white text-gray-900 shadow-lg' : 'text-white hover:bg-white/20'} ${isTransitioning ? 'opacity-50' : ''}`}
//       >
//         SIGN UP
//       </button>
//     </div>
//   );

//   /* ─────────────── DESKTOP TAB NAV ─────────────── */
//   const DesktopNav = () => (
//     <div className="absolute top-8 left-8 right-8 z-20">
//       <div className="flex rounded-full p-1.5 border border-white/10">
//         <button
//           onClick={() => handleTabClick('login')}
//           disabled={isTransitioning}
//           className={`flex-1 py-4 px-6 rounded-full font-bold transition-all duration-500 ${isLogin && !isForgotPassword ? 'bg-white text-gray-900 shadow-2xl scale-105' : 'text-white hover:bg-white/10'} ${isTransitioning ? 'opacity-50' : ''}`}
//         >
//           LOGIN
//         </button>
//         <button
//           onClick={() => handleTabClick('register')}
//           disabled={isTransitioning}
//           className={`flex-1 py-4 px-6 rounded-full font-bold transition-all duration-500 ${!isLogin && !isForgotPassword ? 'bg-white text-gray-900 shadow-2xl scale-105' : 'text-white hover:bg-white/10'} ${isTransitioning ? 'opacity-50' : ''}`}
//         >
//           SIGN UP
//         </button>
//       </div>
//     </div>
//   );

//   const currentForm = isForgotPassword ? <ForgotForm /> : isLogin ? <LoginForm /> : <RegisterForm />;

//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-gray-50">

//       {/* ── DESKTOP LAYOUT ── */}
//       <div className="hidden lg:flex w-full h-screen relative">

//         {/* Sliding brand panel */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-[#1a1a1a] transform transition-all duration-1000 ease-out ${isLogin || isForgotPassword ? 'left-0 translate-x-0' : 'left-1/2 translate-x-0'}`}
//         >
//           <DesktopNav />
//           <BrandPanel />
//         </div>

//         {/* Sliding form panel */}
//         <div
//           className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${isLogin || isForgotPassword ? 'right-0 translate-x-0' : 'right-1/2 translate-x-0'}`}
//         >
//           <div className="flex items-center justify-center w-full h-full p-12 overflow-y-auto">
//             <div className="w-full max-w-md">
//               {currentForm}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── MOBILE LAYOUT ── */}
//       <div className="lg:hidden w-full min-h-screen flex flex-col">

//         {/* Mobile header */}
//         <div className="bg-[#1a1a1a] relative overflow-hidden">
//           <div className="relative z-10 p-4">
//             <MobileNav />
//           </div>

//           <div className="relative z-10 py-8 text-center text-white">
//             <div className="mb-4 relative">
//               <div className="w-16 h-16 mx-auto rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
//                 <span className="text-xl font-bold">K</span>
//               </div>
//               <div className="absolute top-0 right-1/3 w-2.5 h-2.5 bg-white rounded-full animate-bounce delay-300 opacity-70"></div>
//             </div>

//             <h2 className={`text-2xl font-bold mb-2 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//               {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back!' : 'Join Us Today!'}
//             </h2>
//             <p className={`text-white/70 text-sm px-6 leading-relaxed transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
//               {isForgotPassword
//                 ? 'Enter your email to receive an OTP.'
//                 : isLogin
//                   ? 'Connect, learn, and grow — all in one place.'
//                   : 'Next-gen mentorship platform built for you.'}
//             </p>
//           </div>
//         </div>

//         {/* Mobile form */}
//         <div className="flex-1 bg-white p-6 overflow-y-auto">
//           <div className="w-full max-w-sm mx-auto">
//             {currentForm}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slide-in {
//           from { transform: translateX(100%); opacity: 0; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LoginPage;







