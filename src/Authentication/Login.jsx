
// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
// import {
//   useRegisterMutation,
//   useVerifyMutation,
//   useLoginMutation,
//   useOTPresentMutation,
//   useForgotMutation
// } from "../ApiSliceComponent/RegisterApiSlice"
// import { useNavigate } from 'react-router-dom';
// import GoogleSignIn from './googleSignin';

// const LoginPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [userType, setUserType] = useState('mentee');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();
//   const [isForgotPassword, setIsForgotPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [forgotOtpSent, setForgotOtpSent] = useState(false);


//   // OTP states (signup only)
//   const [otpSent, setOtpSent] = useState(false);

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

//   // RTK Query hooks
//   const [register, { isLoading: isRegistering }] = useRegisterMutation();
//   const [verify, { isLoading: isVerifying }] = useVerifyMutation();
//   const [login, { isLoading: isLoggingIn }] = useLoginMutation();
//   const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();

//   const [forgotPassword, { isLoading: isForgotLoading }] = useForgotMutation();

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
//       // Initial registration to send OTP
//       const response = await register({
//         name: formData.name,
//         email: formData.email,
//         phone: phone,
//         password: formData.password,
//         countryCode: formData.countryCode,
//         role: 2 // or based on userType
//       }).unwrap();

//       console.log('Registration response:', response);
//       setOtpSent(true);
//       alert('OTP sent to your phone number!');
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

//   const handleSubmit = async () => {
//     if (!isLogin) {
//       // signup validations
//       if (!formData.name.trim()) return alert('Please enter your name.');
//       if (!formData.email.trim()) return alert('Please enter your email.');
//       if (!formData.phone.trim()) return alert('Please enter your phone.');
//       if (!formData.password) return alert('Please enter password.');
//       if (formData.password.length < 8) return alert('Password must be at least 8 characters.');
//       if (formData.password !== formData.confirmPassword) return alert('Passwords do not match.');
//       if (!otpSent) return alert('Please send OTP first.');
//       if (!formData.otp.trim()) return alert('Please enter OTP.');

//       try {
//         // Verify OTP first
//         const verifyResponse = await verify({
//           email: formData.email,
//           otpType: "register",
//           otp: Number(formData.otp)
//         }).unwrap();

//         console.log('OTP Verified:', verifyResponse);
//         alert('Sign Up successful! You can now login.');

//         // Reset form and switch to login
//         setFormData({
//           name: '',
//           email: formData.email, // Keep email for convenience
//           phone: '',
//           countryCode: '+91',
//           password: '',
//           confirmPassword: '',
//           otp: ''
//         });
//         setOtpSent(false);
//         setIsLogin(true);

//       } catch (error) {
//         console.error('Error verifying OTP:', error);
//         alert(error?.data?.message || 'Invalid OTP. Please try again.');
//       }

//     } else {
//       // login validations
//       if (!formData.email.trim()) return alert('Please enter your email/username.');
//       if (!formData.password) return alert('Please enter password.');

//       // try {
//       //   const response = await login({
//       //     email: formData.email,
//       //     password: formData.password,
//       //     role: userType // 'mentee' or 'mentor'
//       //   }).unwrap();

//       //   console.log('Login successful:', response);

//       //   // Store token if provided
//       //   if (response.token) {
//       //     localStorage.setItem('authToken', response.token);
//       //   }

//       //   // Store user data if provided
//       //   if (response.user) {
//       //     localStorage.setItem('userData', JSON.stringify(response.user));
//       //   }

//       //   alert('Login successful!');

//       //   // Redirect to dashboard or home page
//       //   // window.location.href = '/dashboard';

//       // } catch (error) {
//       //   console.error('Login error:', error);
//       //   alert(error?.data?.message || 'Login failed. Please check your credentials.');
//       // }



//       try {
//         const response = await login({
//           email: formData.email,
//           password: formData.password,
//           role: userType // 'mentee' or 'mentor'
//         }).unwrap();

//         console.log('Login successful:', response);


//         if (response.data && response.data.token) {
//           localStorage.setItem('token', response.data.token);
//         }
//         // Store token from response.data
//         if (response.data && response.data.token) {
//           localStorage.setItem('authToken', response.data.token);
//         }

//         // Store complete user data from response.data
//         if (response.data) {
//           localStorage.setItem('userData', JSON.stringify(response.data));
//           localStorage.setItem('userRole', response.data.role);
//           localStorage.setItem('userName', response.data.name);
//         }


//         console.log(response.data.role, "response.data.role")
//         alert('Login successful!');

//         // Navigate based on role
//         if (response.data.role === 2) {
//           // Role 2 = Mentor
//           navigate('/mentor/dashboard');
//         } else if (response.data.role === 1) {
//           // Role 1 = Mentee
//           navigate('/mentee/dashboard');
//         } else {
//           // Default fallback
//           navigate('/dashboard');
//         }

//       } catch (error) {
//         console.error('Login error:', error);
//         alert(error?.data?.message || 'Login failed. Please check your credentials.');
//       }
//     }
//   };


//   const handleForgotPasswordSendOTP = async () => {
//     if (!formData.email.trim()) {
//       alert('Please enter your email address.');
//       return;
//     }

//     try {
//       const response = await forgotPassword({
//         email: formData.email
//       }).unwrap();

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
//       const verifyResponse = await verify({
//         email: formData.email,
//         otpType: "forgotPassword",
//         otp: Number(formData.otp),
//         newPassword: formData.newPassword
//       }).unwrap();

//       console.log('Password reset successful:', verifyResponse);
//       alert('Password reset successful! You can now login with your new password.');

//       setFormData({
//         name: '',
//         email: formData.email,
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

//   const isLoading = isRegistering || isVerifying || isLoggingIn || isResending || isForgotLoading;

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
//       {/* LEFT - Welcome Panel */}
//       <div className="w-full lg:w-1/3 bg-[#062117] text-white relative overflow-hidden min-h-[360px] lg:min-h-screen flex items-center justify-center p-8">
//         {/* decorative circles */}
//         <div className="absolute top-14 right-12 w-28 h-28 bg-white/10 rounded-full" />
//         <div className="absolute bottom-28 left-16 w-20 h-20 bg-white/8 rounded-full" />

//         <div className="z-10 text-center max-w-xs">
//           <div className="absolute top-6 left-6 text-white font-semibold text-lg">Karrivo.in</div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
//             {isForgotPassword ? 'Reset Password' : 'Welcome Back!'}
//           </h1>

//           <p className="text-white/90 mb-6">
//             {isForgotPassword
//               ? 'Enter your email to receive an OTP and reset your password.'
//               : 'Keep connected with us — sign in to manage tasks, projects and collaborate.'}
//           </p>

//           {/* WRAP existing button with condition */}
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
//                   otp: ''
//                 });
//                 setIsLogin(!isLogin);
//               }}
//               className="px-8 py-2.5 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition"
//               disabled={isLoading}
//             >
//               {isLogin ? 'SIGN UP' : 'SIGN IN'}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* RIGHT - Form Panel */}
//       <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-12">
//         <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12">

//           {isForgotPassword && (
//             <button
//               onClick={() => resetAndSwitch('login')}
//               className="flex items-center gap-2 text-[#008FC4] mb-4 hover:underline"
//               disabled={isLoading}
//             >
//               <ArrowLeft size={18} />
//               Back to Login
//             </button>
//           )}

//           <h2 className="text-2xl md:text-3xl font-bold text-[#062117] text-center mb-6">
//             {isForgotPassword ? 'Forgot Password' : (isLogin ? 'Log in' : 'Create Account')}
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


//           {
//             isForgotPassword ? (
//               <div className="space-y-4">
//                 {/* Email */}
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Enter your email"
//                     disabled={isLoading}
//                     className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                   />
//                 </div>

//                 {!forgotOtpSent ? (
//                   <button
//                     type="button"
//                     onClick={handleForgotPasswordSendOTP}
//                     disabled={isLoading || !formData.email}
//                     className="w-full bg-[#008FC4] text-white py-3 rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {isForgotLoading ? <Loader2 size={18} className="animate-spin" /> : null}
//                     Send OTP
//                   </button>
//                 ) : (
//                   <>
//                     <div className="relative">
//                       <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                       <input
//                         name="otp"
//                         value={formData.otp}
//                         onChange={handleChange}
//                         placeholder="Enter 6-digit OTP"
//                         inputMode="numeric"
//                         disabled={isLoading}
//                         className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                       />
//                     </div>

//                     <div className="relative">
//                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                       <input
//                         name="newPassword"
//                         type={showNewPassword ? 'text' : 'password'}
//                         value={formData.newPassword}
//                         onChange={handleChange}
//                         placeholder="New Password (min 8 characters)"
//                         disabled={isLoading}
//                         className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowNewPassword(!showNewPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                         disabled={isLoading}
//                       >
//                         {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={handleResetPassword}
//                       disabled={isLoading}
//                       className="w-full py-3 rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {isVerifying && <Loader2 size={18} className="animate-spin" />}
//                       Reset Password
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleForgotPasswordSendOTP}
//                       disabled={isForgotLoading}
//                       className="w-full text-[#008FC4] text-sm hover:underline disabled:opacity-50"
//                     >
//                       Resend OTP
//                     </button>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {/* Name - signup only */}
//                 {!isLogin && (
//                   <div className="relative">
//                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Full name"
//                       disabled={isLoading}
//                       className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                     />
//                   </div>
//                 )}

//                 {/* Email */}
//                 <div className="relative">
//                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder={isLogin ? 'Email or username' : 'Email address'}
//                     disabled={isLoading}
//                     className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                   />
//                 </div>

//                 {/* PHONE WITH COUNTRY CODE (SIGNUP ONLY) */}
//                 {!isLogin && (
//                   <>
//                     <div className="flex gap-2">
//                       <select
//                         name="countryCode"
//                         value={formData.countryCode}
//                         onChange={handleChange}
//                         disabled={isLoading}
//                         className="px-3 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                       >
//                         <option value="+91">+91</option>
//                         <option value="+1">+1</option>
//                         <option value="+44">+44</option>
//                         <option value="+61">+61</option>
//                         <option value="+86">+86</option>
//                       </select>

//                       <div className="relative flex-1">
//                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                         <input
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleChange}
//                           placeholder="Phone number (10 digits)"
//                           inputMode="numeric"
//                           disabled={isLoading}
//                           className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                         />
//                       </div>
//                     </div>

//                     {/* Send OTP Button */}
//                     {!otpSent ? (
//                       <button
//                         type="button"
//                         onClick={handleSendOTP}
//                         disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.password}
//                         className="w-full bg-[#008FC4] text-white py-3 rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                       >
//                         {isRegistering ? <Loader2 size={18} className="animate-spin" /> : null}
//                         Send OTP
//                       </button>
//                     ) : null}

//                     {/* OTP input with Resend OTP button */}
//                     {otpSent && (
//                       <div className="flex gap-2">
//                         <div className="relative flex-1">
//                           <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                           <input
//                             name="otp"
//                             value={formData.otp}
//                             onChange={handleChange}
//                             placeholder="Enter 6-digit OTP"
//                             inputMode="numeric"
//                             disabled={isLoading}
//                             className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                           />
//                         </div>

//                         <button
//                           type="button"
//                           onClick={handleResendOTP}
//                           disabled={isResending}
//                           className="px-6 py-3 rounded-lg bg-white text-[#008FC4] border border-[#008FC4] hover:bg-[#f8feff] transition disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
//                         >
//                           {isResending ? <Loader2 size={18} className="animate-spin" /> : null}
//                           Resend OTP
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {/* Password */}
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                   <input
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="Password"
//                     disabled={isLoading}
//                     className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                     disabled={isLoading}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>





//                 {/* Confirm password (signup only) */}
//                 {!isLogin && (
//                   <div className="relative">
//                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                     <input
//                       name="confirmPassword"
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm password"
//                       disabled={isLoading}
//                       className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                       disabled={isLoading}
//                     >
//                       {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 )}

//                 {/* Submit */}
//                 <div>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={isLoading}
//                     className="w-full py-3 rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   >
//                     {(isLoggingIn || isVerifying) && <Loader2 size={18} className="animate-spin" />}
//                     {isLogin ? 'SIGN IN' : 'SIGN UP'}
//                   </button>
//                 </div>
//               </div>

//             )
//           }

//           {/* Footer: toggle & google sign-in (login only) */}

//           {
//             !isForgotPassword && (
//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-500">
//                   {isLogin ? "Don't have an account? " : 'Already have an account? '}
//                   <button
//                     onClick={() => {
//                       setOtpSent(false);
//                       setFormData({
//                         name: '',
//                         email: '',
//                         phone: '',
//                         countryCode: '+91',
//                         password: '',
//                         confirmPassword: '',
//                         otp: ''
//                       });
//                       setIsLogin(!isLogin);
//                     }}
//                     disabled={isLoading}
//                     className="text-[#008FC4] font-semibold ml-1 hover:underline disabled:opacity-50"
//                   >
//                     {isLogin ? 'Sign Up' : 'Sign In'}
//                   </button>
//                 </p>
//                 {!isLogin && (
//                   <div
//                     onClick={() => navigate('/mentee/apply')}
//                     className="w-full py-3 rounded-full text-[#008FC4] font-semibold cursor-pointer hover:text-[#006f99] flex items-center justify-center"
//                   >
//                     Register as Mentee
//                   </div>

//                 )}
//                 {isLogin && (
//                   <>
//                     <div className="relative my-6">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-200" />
//                       </div>
//                       <div className="relative flex justify-center text-xs">
//                         <span className="px-3 bg-white text-gray-400">Or</span>
//                       </div>
//                     </div>

//                     {/* Replace the entire button with just GoogleSignIn */}
//                     <GoogleSignIn />
//                   </>
//                 )}

//               </div>
//             )
//           }

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useOTPresentMutation,
  useForgotMutation,
  useVerifyOtpMutation
} from "../ApiSliceComponent/RegisterApiSlice"
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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

  // RTK Query hooks
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [resendOtp, { isLoading: isResending }] = useOTPresentMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation(); // Add this line


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
      alert(error?.data?.message || 'Failed to send OTP. Please try again.');
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
      // Send 'password' instead of 'newPassword'
      const resetResponse = await verifyOtp({
        email: formData.email,
        otp: Number(formData.otp),
        password: formData.newPassword  // ✅ Correct field name
      }).unwrap();


      console.log('Password reset successful:', resetResponse);
      alert('Password reset successful! You can now login with your new password.');

      // Reset form and navigate back to login
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
      // Signup validations
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
        alert(error?.data?.message || 'Invalid OTP. Please try again.');
      }

    } else {
      // Login validations
      // Login validations
      if (!formData.email.trim()) return alert('Please enter your email/username.');
      if (!formData.password) return alert('Please enter password.');

      try {
        // ✅ Send role as number (1 for mentee, 2 for mentor)
        const response = await login({
          email: formData.email,
          password: formData.password,
          role: userType === 'mentee' ? 1 : 2  // Convert to numeric role
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

        alert('Login successful!');

        // Navigate based on role
        if (response.data.role === 2) {
          navigate('/mentor/dashboard');
        } else if (response.data.role === 1) {
          navigate('/mentee/dashboard');
        } else {
          navigate('/dashboard');
        }

      } catch (error) {
        console.error('Login error:', error);
        alert(error?.data?.message || 'Login failed. Please check your credentials.');
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* LEFT - Welcome Panel */}
      <div className="w-full lg:w-1/3 bg-[#062117] text-white relative overflow-hidden min-h-[360px] lg:min-h-screen flex items-center justify-center p-8">
        <div className="absolute top-14 right-12 w-28 h-28 bg-white/10 rounded-full" />
        <div className="absolute bottom-28 left-16 w-20 h-20 bg-white/8 rounded-full" />

        <div className="z-10 text-center max-w-xs">
          <div className="absolute top-6 left-6 text-white font-semibold text-lg">Karrivo.in</div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            {isForgotPassword ? 'Reset Password' : 'Welcome Back!'}
          </h1>

          <p className="text-white/90 mb-6">
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
              className="px-8 py-2.5 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-[#008FC4] transition"
              disabled={isLoading}
            >
              {isLogin ? 'SIGN UP' : 'SIGN IN'}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT - Form Panel */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 md:p-12">
          {/* Back button for forgot password */}
          {isForgotPassword && (
            <button
              onClick={() => resetAndSwitch('login')}
              className="flex items-center gap-2 text-[#008FC4] mb-4 hover:underline"
              disabled={isLoading}
            >
              <ArrowLeft size={18} />
              Back to Login
            </button>
          )}

          <h2 className="text-2xl md:text-3xl font-bold text-[#062117] text-center mb-6">
            {isForgotPassword ? 'Forgot Password' : (isLogin ? 'Log in' : 'Create Account')}
          </h2>

          {/* Role toggle (login only) */}
          {isLogin && !isForgotPassword && (
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

          {/* FORGOT PASSWORD FORM */}
          {isForgotPassword ? (
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                />
              </div>

              {!forgotOtpSent ? (
                <button
                  type="button"
                  onClick={handleForgotPasswordSendOTP}
                  disabled={isLoading || !formData.email}
                  className="w-full bg-[#008FC4] text-white py-3 rounded-lg hover:bg-[#006f9e] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isForgotLoading ? <Loader2 size={18} className="animate-spin" /> : null}
                  Send OTP
                </button>
              ) : (
                <>
                  <div className="relative">
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

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="New Password (min 8 characters)"
                      disabled={isLoading}
                      className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#008FC4] outline-none disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      disabled={isLoading}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>


                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="w-full py-3 rounded-full bg-[#0098cc] text-white font-semibold hover:bg-[#007aa8] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isVerifyingOtp && <Loader2 size={18} className="animate-spin" />}
                    Reset Password
                  </button>


                  <button
                    type="button"
                    onClick={handleForgotPasswordSendOTP}
                    disabled={isForgotLoading}
                    className="w-full text-[#008FC4] text-sm hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </>
              )}
            </div>
          ) : (
            /* LOGIN/SIGNUP FORM */
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

              {/* Phone with country code (signup only) */}
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

              {/* Forgot Password Link (login only) */}
              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => resetAndSwitch('forgot')}
                    disabled={isLoading}
                    className="text-sm text-[#008FC4] hover:underline disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

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
          )}

          {/* Footer */}
          {!isForgotPassword && (
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
                  className="w-full py-3 rounded-full text-[#008FC4] font-semibold cursor-pointer hover:text-[#006f99] flex items-center justify-center"
                >
                  Register as Mentee
                </div>
              )}

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

                  <GoogleSignIn />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



