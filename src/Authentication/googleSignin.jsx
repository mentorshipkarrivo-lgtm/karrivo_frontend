import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../firebase"
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = ({ onSuccess }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // ✅ Get Firebase ID token
            const token = await result.user.getIdToken();

            // ✅ If parent passed onSuccess, hand token up
            if (onSuccess) {
                onSuccess(token);
                return;
            }

            // ✅ Fallback: call backend directly
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data?.message || "Login failed");

            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('userData', JSON.stringify(data.data));
            localStorage.setItem('userRole', data.data.role);
            localStorage.setItem('userName', data.data.name);

            if (data.data.role === 2) navigate('/mentor/dashboard', { replace: true });
            else if (data.data.role === 1) navigate('/mentee/bookings', { replace: true });
            else navigate('/dashboard', { replace: true });

        } catch (error) {
            console.error('❌ Google login error:', error);
            alert(error.message || 'Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 10, padding: '10px 0',
                    borderRadius: 99, border: '1px solid #e2e8f0',
                    background: loading ? '#f8fafc' : '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: 14, fontWeight: 600, color: '#1e293b',
                }}>
                <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.2-2.7-.4-4z" />
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z" />
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 4.9C9.7 39.6 16.4 44 24 44z" />
                    <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.2-4.5 5.5l6.2 5.2C40.7 35.3 44 30 44 24c0-1.3-.2-2.7-.4-4z" />
                </svg>
                {loading ? 'Signing in…' : 'Continue with Google'}
            </button>
        </div>
    );
};

export default GoogleSignIn;