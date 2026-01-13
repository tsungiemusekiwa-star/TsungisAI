import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start animations after component mounts
    const timer1 = setTimeout(() => setShowContent(true), 100);

    // Complete splash screen after animations
    const timer2 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const splashStyle = {
    position: 'fixed' as const,
    inset: '0',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, hsl(260, 15%, 14%), hsl(260, 18%, 17%))',
    backgroundImage: `
      radial-gradient(circle at 20% 20%, hsla(285, 60%, 68%, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, hsla(275, 55%, 65%, 0.15) 0%, transparent 50%)
    `
  };

  const logoStyle = {
    width: '128px',
    height: '128px',
    margin: '0 auto 24px auto',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    background: 'linear-gradient(145deg, hsl(260, 20%, 12%), hsl(260, 15%, 16%))',
    boxShadow: '20px 20px 40px hsl(260, 20%, 8%), -20px -20px 40px hsl(260, 20%, 18%)'
  };

  const innerGlowStyle = {
    position: 'absolute' as const,
    inset: '8px',
    borderRadius: '16px',
    background: 'var(--gradient-primary)',
    boxShadow: 'inset 10px 10px 20px rgba(0,0,0,0.3), inset -10px -10px 20px rgba(255,255,255,0.1)',
    width: 'calc(100% - 16px)',
    height: 'calc(100% - 16px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <style>
        {`
          @keyframes bounce-delay {
            0%, 20%, 53%, 80%, 100% {
              transform: translate3d(0,0,0);
            }
            40%, 43% {
              transform: translate3d(0,-20px,0);
            }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes ping-slow {
            75%, 100% {
              transform: scale(2);
              opacity: 0;
            }
          }

          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }

          .animate-ping-slow {
            animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
          }

          .bounce-letter {
            display: inline-block;
            animation: bounce-delay 1.5s infinite;
          }
        `}
      </style>

      <div style={splashStyle}>
        {/* Animated background particles */}
        <div style={{ position: 'absolute', inset: '0', overflow: 'hidden' }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                opacity: 0.2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `pulse ${2 + Math.random() * 2}s infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div style={{ textAlign: 'center', zIndex: 10 }} className="space-y-8">
          {/* Logo container */}
          <div
            style={{
              transform: showContent ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(40px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 1s ease-out'
            }}
          >
            <div style={logoStyle}>
              <div style={innerGlowStyle}>
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: 'var(--primary-foreground)',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  T
                </span>
              </div>
            </div>
          </div>

          {/* App name with bouncing animation */}
          <div
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s ease-out 0.3s'
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {'Tsungi\'s'.split('').map((char, i) => (
                <span
                  key={i}
                  className="bounce-letter"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <span style={{ color: 'var(--primary)' }}>
                {' AI'.split('').map((char, i) => (
                  <span
                    key={i + 8}
                    className="bounce-letter"
                    style={{ animationDelay: `${(i + 8) * 0.1}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Smiling emoji with rotation animation */}
            <div className="text-6xl mb-6 animate-spin-slow">
              😊
            </div>

            <p className="text-xl text-muted-foreground font-medium">
              Smart Learning Assistant
            </p>
          </div>

          {/* Loading indicator */}
          <div
            style={{
              opacity: showContent ? 1 : 0,
              transform: showContent ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s ease-out 0.5s'
            }}
          >
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    animation: `pulse 1s infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4" style={{ animation: 'pulse 2s infinite' }}>
              Initializing AI Assistant...
            </p>
          </div>
        </div>

        {/* Ripple effect */}
        <div style={{ position: 'absolute', inset: '0', pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              style={{
                width: '384px',
                height: '384px',
                border: '1px solid hsla(var(--primary) / 0.2)',
                borderRadius: '50%'
              }}
              className="animate-ping-slow"
            />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '256px',
                height: '256px',
                border: '1px solid hsla(var(--accent) / 0.2)',
                borderRadius: '50%',
                animationDelay: '0.5s'
              }}
              className="animate-ping-slow"
            />
          </div>
        </div>
      </div>
    </>
  );
};