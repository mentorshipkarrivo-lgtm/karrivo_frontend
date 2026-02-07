import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // ✅ Handle successful Google login
    const handleGoogleSuccess = async (credentialResponse) => {
        console.log("✅ Google login success:", credentialResponse);

        if (!credentialResponse?.credential) {
            console.error("❌ No Google credential received");
            alert("Google authentication failed. Please try again.");
            return;
        }

        setLoading(true);

        try {
            // Send Google token to backend
            const response = await fetch('https://us-central1-karrivo-f64dd.cloudfunctions.net/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential })
            });

            const data = await response.json();
            console.log("🔹 Backend response:", data);

            if (!response.ok || !data.success) {
                throw new Error(data?.message || "Backend authentication failed");
            }

            // Store token and user info
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            console.log("✅ User stored in localStorage");

            // Role-based navigation
            const role = data?.user?.role;
            switch (role) {
                case 2:
                    navigate('/mentor/dashboard', { replace: true });
                    break;
                case 1:
                    navigate('/mentee/dashboard', { replace: true });
                    break;
                default:
                    navigate('/dashboard', { replace: true });
            }

        } catch (error) {
            console.error('❌ Google login error:', error.message || error);
            alert(error.message || 'Google login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle failed Google login
    const handleGoogleError = () => {
        console.error('❌ Google Login Failed');
        alert('Google login failed. Please try again.');
    };

    return (
        <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="signin_with"
                shape="pill"
                width="100%"
                disabled={loading}
            />

            {loading && (
                <p style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic' }}>
                    Signing in with Google...
                </p>
            )}
        </div>
    );
};

export default GoogleSignIn;
