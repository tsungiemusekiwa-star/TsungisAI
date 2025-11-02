import React, { useState } from 'react';
import { resetPassword } from '../../firebase/auth.js';

interface ForgotPasswordFormProps {
  onBack?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: resetError } = await resetPassword(email);

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card w-full max-w-md">
        <div className="card-header space-y-2">
          <h1 className="card-title text-2xl font-bold text-center gradient-text">
            Check Your Email
          </h1>
          <p className="card-description text-center">
            We've sent a password reset link to your email address
          </p>
        </div>
        <div className="card-content space-y-4">
          <div className="alert alert-success">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
            <span>Password reset email sent successfully!</span>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>. Check your email inbox and follow the instructions to reset your password.
            </p>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground font-medium">
                💡 Can't find the email? Check your spam/junk folder!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The email may take a few minutes to arrive.
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="btn btn-outline w-full"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-md">
      <div className="card-header space-y-2">
        <h1 className="card-title text-2xl font-bold text-center gradient-text">
          Reset Password
        </h1>
        <p className="card-description text-center">
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      <div className="card-content space-y-4">
        {error && (
          <div className="alert alert-destructive">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <svg
                className="icon-sm"
                style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--muted-foreground)' }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="input"
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin icon-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                </div>
                Sending Reset Email...
              </div>
            ) : (
              'Send Reset Email'
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="btn-ghost text-primary font-semibold"
            style={{ padding: '0', height: 'auto' }}
            onClick={onBack}
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};