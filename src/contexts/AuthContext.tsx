// Authentication Context
// Global authentication state management with React Context

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService, clearTokens } from '@/lib/api';
import type { User, LoginCredentials, RegisterData, AuthResponse, RegisterResponse } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    register: (data: RegisterData) => Promise<RegisterResponse>;
    logout: () => Promise<void>;
    updateUser: (user: User) => void;
    clearError: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                // Try to get user from localStorage first for immediate UI
                const storedUser = authService.getStoredUser();
                if (storedUser) {
                    setUser(storedUser);
                }

                // If we have a token, verify it's still valid
                if (authService.isAuthenticated()) {
                    try {
                        const currentUser = await authService.getCurrentUser();
                        setUser(currentUser);
                        // Update stored user with fresh data
                        localStorage.setItem('queska_user', JSON.stringify(currentUser));
                    } catch {
                        // Token is invalid, clear everything
                        clearTokens();
                        setUser(null);
                    }
                }
            } catch {
                // Silent fail on init
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Listen for auth events from API client
    useEffect(() => {
        const handleLogout = () => {
            setUser(null);
        };

        const handleForbidden = () => {
            setError('You do not have permission to perform this action.');
        };

        window.addEventListener('auth:logout', handleLogout);
        window.addEventListener('auth:forbidden', handleForbidden);

        return () => {
            window.removeEventListener('auth:logout', handleLogout);
            window.removeEventListener('auth:forbidden', handleForbidden);
        };
    }, []);

    const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            setUser(response.user);
            return response;
        } catch (err) {
            const message = err instanceof Error ? err.message :
                (err as { message?: string })?.message || 'Login failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: RegisterData): Promise<RegisterResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.register(data);
            // Note: Registration doesn't log in the user automatically
            // User needs to verify email first
            return response;
        } catch (err) {
            const message = err instanceof Error ? err.message :
                (err as { message?: string })?.message || 'Registration failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        try {
            await authService.logout();
        } finally {
            setUser(null);
            setIsLoading(false);
        }
    }, []);

    const updateUser = useCallback((updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('queska_user', JSON.stringify(updatedUser));
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const refreshUser = useCallback(async () => {
        if (!authService.isAuthenticated()) return;

        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            localStorage.setItem('queska_user', JSON.stringify(currentUser));
        } catch {
            // Token might be invalid
            clearTokens();
            setUser(null);
        }
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        clearError,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    redirectTo: string = '/login'
) => {
    return function WithAuthComponent(props: P) {
        const { isAuthenticated, isLoading } = useAuth();

        useEffect(() => {
            if (!isLoading && !isAuthenticated) {
                window.location.href = redirectTo;
            }
        }, [isLoading, isAuthenticated]);

        if (isLoading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            );
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};
