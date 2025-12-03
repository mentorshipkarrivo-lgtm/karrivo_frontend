



// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, Loader2 } from 'lucide-react';
// import {
//   useRegisterMutation,    
//   useVerifyMutation,
//   useLoginMutation,
//   useOTPresentMutation
// } from "../ApiSliceComponent/RegisterApiSlice"

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [userType, setUserType] = useState('mentee');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // OTP states (signup only)
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     otp: ''
//   });

//   // RTK Query hooks
//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [login, { isLoading: isLoggingIn }] = useLoginMutation();
//   const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // prevent non-numeric characters in phone/otp
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
//       if (otpSent) {
//         // Resend OTP
//         const response = await resendOtp({
//           phone: phone,
//           email: formData.email,
//           countryCode: "+91"
//         }).unwrap();

//         console.log('OTP Resent:', response);
//         alert('OTP resent successfully!');
//       } else {
//         // Initial registration to send OTP
//         const response = await register({
//           name: formData.name,
//           email: formData.email,
//           phone: phone,
//           password: formData.password,
//           countryCode: "+91",
//           role: 2 // or based on userType
//         }).unwrap();

//         console.log('Registration response:', response);
//         setOtpSent(true);
//         setOtpVerified(false);
//         alert('OTP sent to your phone number!');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       alert(error?.data?.message || 'Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const otp = (formData.otp || '').trim();
//     if (otp.length !== 6) {
//       alert('Please enter a valid 6-digit OTP.');
//       return;
//     }

//     try {
//       const response = await verify({
//         email: formData.email,
//         otpType: "register",
//         otp:  Number(otp)
//       }).unwrap();

//       console.log('OTP Verified:', response);
//       setOtpVerified(true);
//       alert('Phone number verified successfully!');
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       alert(error?.data?.message || 'Invalid OTP. Please try again.');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!isLogin) {
//       // signup validations
//       if (!formData.name.trim()) return alert('Please enter your name.');
//       if (!formData.email.trim()) return alert('Please enter your email.');
//       if (!formData.phone.trim()) return alert('Please enter your phone.');
//       if (!otpVerified) return alert('Please verify your phone OTP.');
//       if (!formData.password) return alert('Please enter password.');
//       if (formData.password.length < 8) return alert('Password must be at least 8 characters.');
//       if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');

//       // If OTP is verified, registration is already complete
//       alert('Sign Up successful! You can now login.');

//       // Reset form and switch to login
//       setFormData({
//         name: '',
//         email: formData.email, // Keep email for convenience
//         phone: '',
//         password: '',
//         confirmPassword: '',
//         otp: ''
//       });
//       setOtpSent(false);
//       setOtpVerified(false);
//       setIsLogin(true);

//     } else {
//       // login validations
//       if (!formData.email.trim()) return alert('Please enter your email/username.');
//       if (!formData.password) return alert('Please enter password.');

//       try {
//         const response = await login({
//           email: formData.email,
//           password: formData.password,
//           role: userType // 'mentee' or 'mentor'
//         }).unwrap();

//         console.log('Login successful:', response);

//         // Store token if provided
//         if (response.token) {
//           localStorage.setItem('authToken', response.token);
//         }

//         // Store user data if provided
//         if (response.user) {
//           localStorage.setItem('userData', JSON.stringify(response.user));
//         }

//         alert('Login successful!');

//         // Redirect to dashboard or home page
//         // window.location.href = '/dashboard';

//       } catch (error) {
//         console.error('Login error:', error);
//         alert(error?.data?.message || 'Login failed. Please check your credentials.');
//       }
//     }
//   };

//   const isLoading = isRegistering || isVerifying || isLoggingIn || isResending;

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
//       {/* LEFT - Welcome Panel */}
//       <div className="w-full lg:w-1/3 bg-[#062117] text-white relative overflow-hidden min-h-[360px] lg:min-h-screen flex items-center justify-center p-8">
//         {/* decorative circles */}
//         <div className="absolute top-14 right-12 w-28 h-28 bg-white/10 rounded-full" />
//         <div className="absolute bottom-28 left-16 w-20 h-20 bg-white/8 rounded-full" />

//         <div className="z-10 text-center max-w-xs">
//           <div className="absolute top-6 left-6 text-white font-semibold text-lg">Karrivo.in</div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Welcome Back!</h1>
//           <p className="text-white/90 mb-6">
//             Keep connected with us — sign in to manage tasks, projects and collaborate.
//           </p>

//           <button
//             onClick={() => {
//               setOtpSent(false);
//               setOtpVerified(false);
//               setFormData({
//                 name: '',
//                 email: '',
//                 phone: '',
//                 password: '',
//                 confirmPassword: '',
//                 otp: ''
//               });
//               setIsLogin(!isLogin);
//             }}
//             className="px-8 py-2.5 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition"
//             disabled={isLoading}
//           >
//             {isLogin ? 'SIGN UP' : 'SIGN IN'}
//           </button>
//         </div>
//       </div>

//       {/* RIGHT - Form Panel */}
//       <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-12">
//         <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12">
//           <h2 className="text-2xl md:text-3xl font-bold text-[#062117] text-center mb-6">
//             {isLogin ? 'Log in' : 'Create Account'}
//           </h2>

//           {/* role toggle (login only) */}
//           {isLogin && (
//             <div className="flex border-b border-gray-200 mb-6">
//               <button
//                 onClick={() => setUserType('mentee')}
//                 className={`flex-1 pb-3 font-medium ${userType === 'mentee' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
//                 disabled={isLoading}
//               >
//                 I'm a mentee
//               </button>
//               <button
//                 onClick={() => setUserType('mentor')}
//                 className={`flex-1 pb-3 font-medium ${userType === 'mentor' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
//                 disabled={isLoading}
//               >
//                 I'm a mentor
//               </button>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Name - signup only */}
//             {!isLogin && (
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Full name"
//                   disabled={isLoading || otpSent}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                 />
//               </div>
//             )}

//             {/* Email */}
//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder={isLogin ? 'Email or username' : 'Email address'}
//                 disabled={isLoading || (!isLogin && otpSent)}
//                 className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//               />
//             </div>

//             {/* PHONE + SEND OTP (SIGNUP ONLY) */}
//             {!isLogin && (
//               <>
//                 <div className="relative">
//                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Phone number (10 digits)"
//                     inputMode="numeric"
//                     disabled={isLoading || otpSent}
//                     className="w-full pl-12 pr-28 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                   />

//                   {!otpSent ? (
//                     <button
//                       type="button"
//                       onClick={handleSendOTP}
//                       disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#008FC4] text-white text-xs sm:text-sm px-3 py-1.5 rounded-md hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//                     >
//                       {isRegistering ? <Loader2 size={14} className="animate-spin" /> : null}
//                       Send OTP
//                     </button>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={handleSendOTP}
//                       disabled={isResending}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-[#008FC4] border border-[#008FC4] text-xs sm:text-sm px-3 py-1.5 rounded-md hover:bg-[#f8feff] transition disabled:opacity-50 flex items-center gap-1"
//                     >
//                       {isResending ? <Loader2 size={14} className="animate-spin" /> : null}
//                       Resend
//                     </button>
//                   )}
//                 </div>

//                 {/* OTP input with inline Verify */}
//                 {otpSent && (
//                   <div className="relative">
//                     <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       name="otp"
//                       value={formData.otp}
//                       onChange={handleChange}
//                       placeholder="Enter 6-digit OTP"
//                       inputMode="numeric"
//                       disabled={isLoading || otpVerified}
//                       className="w-full pl-12 pr-28 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                     />

//                     <button
//                       type="button"
//                       onClick={handleVerifyOTP}
//                       disabled={isVerifying || otpVerified || !formData.otp}
//                       className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm px-3 py-1.5 rounded-md transition flex items-center gap-1 ${otpVerified
//                           ? 'bg-green-500 text-white'
//                           : 'bg-[#008FC4] text-white hover:bg-[#006f9e] disabled:opacity-50'
//                         }`}
//                     >
//                       {isVerifying ? <Loader2 size={14} className="animate-spin" /> : null}
//                       {otpVerified ? '✓ Verified' : 'Verify'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Password */}
//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 disabled={isLoading || (!isLogin && otpSent)}
//                 className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 disabled={isLoading}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {/* Confirm password (signup only) */}
//             {!isLogin && (
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                   disabled={isLoading || otpSent}
//                   className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                   disabled={isLoading}
//                 >
//                   {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             )}

//             {/* Submit */}
//             <div>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="w-full py-3 rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {isLoggingIn && <Loader2 size={18} className="animate-spin" />}
//                 {isLogin ? 'SIGN IN' : 'SIGN UP'}
//               </button>
//             </div>
//           </div>

//           {/* Footer: toggle & google sign-in (login only) */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500">
//               {isLogin ? "Don't have an account? " : 'Already have an account? '}
//               <button
//                 onClick={() => {
//                   setOtpSent(false);
//                   setOtpVerified(false);
//                   setFormData({
//                     name: '',
//                     email: '',
//                     phone: '',
//                     password: '',
//                     confirmPassword: '',
//                     otp: ''
//                   });
//                   setIsLogin(!isLogin);
//                 }}
//                 disabled={isLoading}
//                 className="text-[#008FC4] font-semibold ml-1 hover:underline disabled:opacity-50"
//               >
//                 {isLogin ? 'Sign Up' : 'Sign In'}
//               </button>
//             </p>

//             {isLogin && (
//               <>
//                 <div className="relative my-6">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-200" />
//                   </div>
//                   <div className="relative flex justify-center text-xs">
//                     <span className="px-3 bg-white text-gray-400">Or</span>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   disabled={isLoading}
//                   className="w-full inline-flex items-center justify-center gap-3 border border-gray-200 py-2.5 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
//                 >
//                   <svg className="w-4 h-4" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                   </svg>
//                   <span>Log in with Google</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, Loader2 } from 'lucide-react';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation
} from "../ApiSliceComponent/RegisterApiSlice"

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('mentee');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP states (signup only)
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // RTK Query hooks
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // prevent non-numeric characters in phone/otp
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
      // Initial registration to send OTP
      const response = await register({
        name: formData.name,
        email: formData.email,
        phone: phone,
        password: formData.password,
        countryCode: formData.countryCode,
        role: 2 // or based on userType
      }).unwrap();

      console.log('Registration response:', response);
      setOtpSent(true);
      alert('OTP sent to your phone number!');
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

  const handleSubmit = async () => {
    if (!isLogin) {
      // signup validations
      if (!formData.name.trim()) return alert('Please enter your name.');
      if (!formData.email.trim()) return alert('Please enter your email.');
      if (!formData.phone.trim()) return alert('Please enter your phone.');
      if (!formData.password) return alert('Please enter password.');
      if (formData.password.length < 8) return alert('Password must be at least 8 characters.');
      if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');
      if (!otpSent) return alert('Please send OTP first.');
      if (!formData.otp.trim()) return alert('Please enter OTP.');

      try {
        // Verify OTP first
        const verifyResponse = await verify({
          email: formData.email,
          otpType: "register",
          otp: Number(formData.otp)
        }).unwrap();

        console.log('OTP Verified:', verifyResponse);
        alert('Sign Up successful! You can now login.');

        // Reset form and switch to login
        setFormData({
          name: '',
          email: formData.email, // Keep email for convenience
          phone: '',
          countryCode: '+91',
          password: '',
          confirmPassword: '',
          otp: ''
        });
        setOtpSent(false);
        setIsLogin(true);

      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert(error?.data?.message || 'Invalid OTP. Please try again.');
      }

    } else {
      // login validations
      if (!formData.email.trim()) return alert('Please enter your email/username.');
      if (!formData.password) return alert('Please enter password.');

      try {
        const response = await login({
          email: formData.email,
          password: formData.password,
          role: userType // 'mentee' or 'mentor'
        }).unwrap();

        console.log('Login successful:', response);

        // Store token if provided
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }

        // Store user data if provided
        if (response.user) {
          localStorage.setItem('userData', JSON.stringify(response.user));
        }

        alert('Login successful!');

        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';

      } catch (error) {
        console.error('Login error:', error);
        alert(error?.data?.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const isLoading = isRegistering || isVerifying || isLoggingIn || isResending;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* LEFT - Welcome Panel */}
      <div className="w-full lg:w-1/3 bg-[#062117] text-white relative overflow-hidden min-h-[360px] lg:min-h-screen flex items-center justify-center p-8">
        {/* decorative circles */}
        <div className="absolute top-14 right-12 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute bottom-28 left-16 w-20 h-20 bg-white/8 rounded-full" />

        <div className="z-10 text-center max-w-xs">
          <div className="absolute top-6 left-6 text-white font-semibold text-lg">Karrivo.in</div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Welcome Back!</h1>
          <p className="text-white/90 mb-6">
            Keep connected with us — sign in to manage tasks, projects and collaborate.
          </p>

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
                otp: ''
              });
              setIsLogin(!isLogin);
            }}
            className="px-8 py-2.5 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition"
            disabled={isLoading}
          >
            {isLogin ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </div>
      </div>

      {/* RIGHT - Form Panel */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#062117] text-center mb-6">
            {isLogin ? 'Log in' : 'Create Account'}
          </h2>

          {/* role toggle (login only) */}
          {isLogin && (
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setUserType('mentee')}
                className={`flex-1 pb-3 font-medium ${userType === 'mentee' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
                disabled={isLoading}
              >
                I'm a mentee
              </button>
              <button
                onClick={() => setUserType('mentor')}
                className={`flex-1 pb-3 font-medium ${userType === 'mentor' ? 'text-[#062117] border-b-2 border-[#008FC4]' : 'text-gray-400'}`}
                disabled={isLoading}
              >
                I'm a mentor
              </button>
            </div>
          )}

          <div className="space-y-4">
            {/* Name - signup only */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={isLogin ? 'Email or username' : 'Email address'}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
              />
            </div>

            {/* PHONE WITH COUNTRY CODE (SIGNUP ONLY) */}
            {!isLogin && (
              <>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="px-3 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+86">+86</option>
                  </select>

                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone number (10 digits)"
                      inputMode="numeric"
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Send OTP Button */}
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password}
                    className="w-full bg-[#008FC4] text-white py-3 rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isRegistering ? <Loader2 size={18} className="animate-spin" /> : null}
                    Send OTP
                  </button>
                ) : null}

                {/* OTP input with Resend OTP button */}
                {otpSent && (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit OTP"
                        inputMode="numeric"
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={isResending}
                      className="px-6 py-3 rounded-lg bg-white text-[#008FC4] border border-[#008FC4] hover:bg-[#f8feff] transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                    >
                      {isResending ? <Loader2 size={18} className="animate-spin" /> : null}
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isLoading}
                className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm password (signup only) */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {/* Submit */}
            <div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {(isLoggingIn || isVerifying) && <Loader2 size={18} className="animate-spin" />}
                {isLogin ? 'SIGN IN' : 'SIGN UP'}
              </button>
            </div>
          </div>

          {/* Footer: toggle & google sign-in (login only) */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
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
                    otp: ''
                  });
                  setIsLogin(!isLogin);
                }}
                disabled={isLoading}
                className="text-[#008FC4] font-semibold ml-1 hover:underline disabled:opacity-50"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>

            {isLogin && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-400">Or</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-3 border border-gray-200 py-2.5 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Log in with Google</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;





