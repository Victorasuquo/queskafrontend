import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { STORAGE_KEYS } from "@/lib/api/config";
import queskaLogo from "@/assets/queska-logo.png";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { updateUser, refreshUser } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get("code");
            const accessToken = searchParams.get("access_token");
            const refreshToken = searchParams.get("refresh_token");
            const errorParam = searchParams.get("error");

            if (errorParam) {
                setError("Google authentication was cancelled or failed.");
                setTimeout(() => navigate("/login?error=auth_cancelled"), 2000);
                return;
            }

            // Case 1: Backend redirected with tokens directly in URL
            if (accessToken) {
                try {
                    // Store tokens
                    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
                    if (refreshToken) {
                        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
                    }

                    // Fetch user data and update context
                    await refreshUser();

                    // Redirect to dashboard
                    navigate("/dashboard?welcome=true");
                    return;
                } catch (err) {
                    console.error("Failed to fetch user after OAuth:", err);
                    setError("Authentication failed. Please try again.");
                    setTimeout(() => navigate("/login?error=auth_failed"), 2000);
                    return;
                }
            }

            // Case 2: Google redirected with code (frontend exchanges code)
            if (code) {
                try {
                    const data = await authService.handleGoogleCallback(code);

                    // Update auth context with user data
                    updateUser(data.user);

                    // Redirect to dashboard
                    if (data.is_new_user) {
                        navigate("/dashboard?welcome=true");
                    } else {
                        navigate("/dashboard");
                    }
                    return;
                } catch (err) {
                    console.error("Google auth error:", err);
                    setError("Authentication failed. Please try again.");
                    setTimeout(() => navigate("/login?error=auth_failed"), 2000);
                    return;
                }
            }

            // No code or token received
            setError("No authorization data received.");
            setTimeout(() => navigate("/login?error=no_code"), 2000);
        };

        handleCallback();
    }, [searchParams, navigate, updateUser, refreshUser]);

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            {/* Logo */}
            <div className="mb-8">
                <img src={queskaLogo} alt="Queska" className="h-12 w-auto" />
            </div>

            {error ? (
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <p className="text-red-500 font-medium">{error}</p>
                    <p className="text-muted-foreground text-sm mt-2">
                        Redirecting to login...
                    </p>
                </div>
            ) : (
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-foreground font-medium">Completing sign in...</p>
                    <p className="text-muted-foreground text-sm mt-2">
                        Please wait while we verify your account
                    </p>
                </div>
            )}
        </div>
    );
};

export default GoogleCallback;
