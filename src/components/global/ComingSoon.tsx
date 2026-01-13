import React from 'react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features?: string[];
  estimatedDate?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  icon,
  features = [],
  estimatedDate = "Soon"
}) => {
  const mainCardStyle = {
    background: 'var(--card)',
    boxShadow: 'var(--shadow-card)',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid var(--border)'
  };

  const iconContainerStyle = {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px auto',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--muted)',
    boxShadow: 'var(--shadow-neumorph-inset)'
  };

  const constructionIconStyle = {
    width: '64px',
    height: '64px',
    margin: '0 auto 24px auto',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--warning)',
    boxShadow: 'var(--shadow-neumorph-outset)'
  };

  const featureCardStyle = {
    padding: '16px',
    borderRadius: '16px',
    background: 'var(--muted)',
    boxShadow: 'var(--shadow-neumorph-inset)',
    border: '1px solid var(--border)'
  };

  const buttonStyle = {
    padding: '12px 32px',
    borderRadius: '16px',
    background: 'var(--gradient-primary)',
    boxShadow: 'var(--shadow-neumorph-outset)',
    border: 'none',
    color: 'var(--primary-foreground)',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px', background: 'var(--background)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }} className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div style={iconContainerStyle}>
            {icon}
          </div>

          <h1 className="text-4xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" style={{ lineHeight: '1.75' }}>
            {description}
          </p>

          <div className="flex justify-center mt-6">
            <div
              className="badge px-6 py-2 text-sm font-medium flex items-center gap-2"
              style={{
                background: 'linear-gradient(145deg, hsl(45, 93%, 58%), hsl(37, 92%, 50%))',
                color: 'white',
                borderRadius: '12px'
              }}
            >
              <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              Coming {estimatedDate}
            </div>
          </div>
        </div>

        {/* Under Construction Card */}
        <div style={mainCardStyle} className="text-center">
          <div style={constructionIconStyle}>
            <svg className="icon-lg text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20h20"/>
              <path d="M7 16v4"/>
              <path d="M12 16v4"/>
              <path d="M17 16v4"/>
              <path d="M2 16l20-10"/>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-4">
            Under Development
          </h2>
          <p className="text-muted-foreground text-lg mb-8" style={{ lineHeight: '1.75' }}>
            We're working hard to bring you this amazing feature. It will be part of the Tsungi's AI ecosystem soon!
          </p>

          {/* Features Preview */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <svg className="icon-md text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4"/>
                  <path d="M19 17v4"/>
                  <path d="M3 5h4"/>
                  <path d="M17 19h4"/>
                </svg>
                What to Expect
              </h3>
              <div className="grid gap-3 max-w-md mx-auto">
                {features.map((feature, index) => (
                  <div key={index} style={featureCardStyle} className="text-left">
                    <p className="text-foreground text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <Link to="/" style={buttonStyle}>
            <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Back to Audio Learning
          </Link>
        </div>
      </div>
    </div>
  );
};