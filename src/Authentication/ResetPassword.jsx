import React, { useState } from 'react';
import { Mail, ShieldCheck, Lock, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useForgotMutation, useVerifyOtpMutation } from '../ApiSliceComponent/RegisterApiSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/Toastprovider';

// ── Steps: 'email' → 'otp' → 'success' ──────────────────────
const STEPS = { EMAIL: 'email', OTP: 'otp', SUCCESS: 'success' };

const ResetPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.EMAIL);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [forgotPassword, { isLoading: isSending }] = useForgotMutation();
    const [verifyOtp, { isLoading: isResetting }] = useVerifyOtpMutation();

    const isLoading = isSending || isResetting;

    // ── Send OTP ───────────────────────────────────────────────
    const handleSendOTP = async () => {
        if (!email.trim()) { showToast.error('Please enter your email address.'); return; }
        try {
            await forgotPassword({ email: email.trim() }).unwrap();
            showToast.success('OTP sent to your email!');
            setStep(STEPS.OTP);
        } catch (err) {
            showToast.error(err?.data?.message || 'Failed to send OTP. Please try again.');
        }
    };

    // ── Resend OTP ─────────────────────────────────────────────
    const handleResendOTP = async () => {
        try {
            await forgotPassword({ email: email.trim() }).unwrap();
            showToast.success('OTP resent successfully!');
        } catch (err) {
            showToast.error(err?.data?.message || 'Failed to resend OTP.');
        }
    };

    // ── Reset Password ─────────────────────────────────────────
    const handleReset = async () => {
        if (!otp.trim()) { showToast.error('Please enter the OTP.'); return; }
        if (!newPassword) { showToast.error('Please enter a new password.'); return; }
        if (newPassword.length < 8) { showToast.error('Password must be at least 8 chars.'); return; }
        if (newPassword !== confirmPassword) { showToast.error('Passwords do not match.'); return; }

        try {
            await verifyOtp({ email, otp: Number(otp), password: newPassword }).unwrap();
            setStep(STEPS.SUCCESS);
        } catch (err) {
            showToast.error(err?.data?.message || 'Failed to reset password. Please try again.');
        }
    };

    // ── Enter key shortcuts ────────────────────────────────────
    const handleKeyDown = (e) => {
        if (e.key !== 'Enter' || isLoading) return;
        if (step === STEPS.EMAIL) handleSendOTP();
        if (step === STEPS.OTP) handleReset();
    };

    // ── Shared input className ─────────────────────────────────
    const inputCls =
        'w-full pl-10 pr-3 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:border-[#0098cc] focus:ring-2 focus:ring-[#0098cc]/20 outline-none transition disabled:opacity-50 placeholder:text-gray-400';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#031610] via-[#062117] to-[#031610] px-4 py-10">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Top accent bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#0098cc] to-[#00d4ff]" />

                    <div className="p-8 sm:p-10">

                        {/* ── Logo / Brand ────────────────────────────── */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg bg-[#062117] flex items-center justify-center">
                                <span className="text-white text-xs font-black">K</span>
                            </div>
                            <span className="text-[#062117] font-bold text-sm tracking-wide">Karrivo.in</span>
                        </div>

                        {/* ── STEP: EMAIL ─────────────────────────────── */}
                        {step === STEPS.EMAIL && (
                            <>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="flex items-center gap-1.5 text-[#0098cc] text-xs font-medium hover:underline mb-5"
                                >
                                    <ArrowLeft size={14} /> Back to Login
                                </button>

                                <h1 className="text-2xl font-extrabold text-[#062117] mb-1">Reset Password?</h1>
                                <p className="text-gray-500 text-sm mb-7">
                                    Enter your registered email and we'll send you a one-time password.
                                </p>

                                {/* Email input */}
                                <div className="relative mb-4">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter your email address"
                                        disabled={isLoading}
                                        className={inputCls}
                                        autoFocus
                                    />
                                </div>

                                <button
                                    onClick={handleSendOTP}
                                    disabled={isLoading || !email.trim()}
                                    className="w-full py-3 rounded-xl bg-[#0098cc] hover:bg-[#007aa8] text-white font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSending && <Loader2 size={16} className="animate-spin" />}
                                    Send OTP
                                </button>
                            </>
                        )}

                        {/* ── STEP: OTP + NEW PASSWORD ─────────────────── */}
                        {step === STEPS.OTP && (
                            <>
                                <button
                                    onClick={() => { setStep(STEPS.EMAIL); setOtp(''); setNewPassword(''); setConfirmPassword(''); }}
                                    className="flex items-center gap-1.5 text-[#0098cc] text-xs font-medium hover:underline mb-5"
                                    disabled={isLoading}
                                >
                                    <ArrowLeft size={14} /> Change Email
                                </button>

                                <h1 className="text-2xl font-extrabold text-[#062117] mb-1">Reset Password</h1>
                                <p className="text-gray-500 text-sm mb-1">
                                    We sent a 6-digit OTP to
                                </p>
                                <p className="text-[#0098cc] text-sm font-semibold mb-7 truncate">{email}</p>

                                {/* OTP input */}
                                <div className="relative mb-3">
                                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => { if (/^\d*$/.test(e.target.value)) setOtp(e.target.value); }}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter 6-digit OTP"
                                        disabled={isLoading}
                                        className={inputCls}
                                        autoFocus
                                    />
                                </div>

                                {/* New Password */}
                                <div className="relative mb-3">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type={showNew ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="New password (min 8 characters)"
                                        disabled={isLoading}
                                        className={`${inputCls} pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={isLoading}
                                    >
                                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {/* Confirm Password */}
                                <div className="relative mb-5">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Confirm new password"
                                        disabled={isLoading}
                                        className={`${inputCls} pr-10`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={isLoading}
                                    >
                                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                {/* Password match indicator */}
                                {confirmPassword && (
                                    <p className={`text-xs mb-4 -mt-3 ${newPassword === confirmPassword ? 'text-emerald-500' : 'text-red-400'}`}>
                                        {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                    </p>
                                )}

                                <button
                                    onClick={handleReset}
                                    disabled={isLoading}
                                    className="w-full py-3 rounded-xl bg-[#062117] hover:bg-[#0a3828] text-white font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3"
                                >
                                    {isResetting && <Loader2 size={16} className="animate-spin" />}
                                    Reset Password
                                </button>

                                <button
                                    onClick={handleResendOTP}
                                    disabled={isLoading}
                                    className="w-full text-center text-xs text-[#0098cc] hover:underline disabled:opacity-50"
                                >
                                    Didn't receive the OTP? Resend
                                </button>
                            </>
                        )}

                        {/* ── STEP: SUCCESS ────────────────────────────── */}
                        {step === STEPS.SUCCESS && (
                            <div className="flex flex-col items-center text-center py-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                                    <CheckCircle2 size={34} className="text-emerald-500" />
                                </div>
                                <h1 className="text-2xl font-extrabold text-[#062117] mb-2">Password Reset!</h1>
                                <p className="text-gray-500 text-sm mb-8">
                                    Your password has been successfully updated. You can now sign in with your new password.
                                </p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full py-3 rounded-xl bg-[#0098cc] hover:bg-[#007aa8] text-white font-semibold text-sm transition"
                                >
                                    Back to Login
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                {/* Bottom hint */}
                {step !== STEPS.SUCCESS && (
                    <p className="text-center text-white/40 text-xs mt-5">
                        Remember your password?{' '}
                        <button onClick={() => navigate('/login')} className="text-white/70 hover:text-white underline">
                            Sign in
                        </button>
                    </p>
                )}

            </div>
        </div>
    );
};

export default ResetPassword;