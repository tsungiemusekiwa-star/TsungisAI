import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      console.log('User is authenticated, redirecting to dashboard');
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleAuthSuccess = () => {
    console.log('Authentication successful, redirecting to dashboard');
    navigate('/', { replace: true });
  };

  const switchToSignup = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  const switchToForgotPassword = () => {
    setAuthMode('forgot');
  };

  // Show loading if auth is being checked or user is authenticated (redirecting)
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="card p-8 text-center">
          <div className="animate-spin icon-lg mx-auto mb-4 text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
          </div>
          <p className="text-muted-foreground">
            {user ? 'Redirecting to dashboard...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        {authMode === 'login' && (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={switchToSignup}
            onForgotPassword={switchToForgotPassword}
          />
        )}
        {authMode === 'signup' && (
          <SignupForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
        {authMode === 'forgot' && (
          <ForgotPasswordForm
            onBack={switchToLogin}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;