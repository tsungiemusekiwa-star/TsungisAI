import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const mobileNavItems = [
  {
    title: 'Audio',
    href: '/',
    icon: 'volume',
  },
  {
    title: 'Acronyms',
    href: '/acronyms',
    icon: 'lightbulb',
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: 'message',
  },
  {
    title: 'Study',
    href: '/study-buddy',
    icon: 'users',
  },
  {
    title: 'Upload',
    href: '/upload',
    icon: 'upload',
  },
  {
    title: 'Practice',
    href: '/practice',
    icon: 'book',
  },
  {
    title: 'Typing',
    href: '/typing-game',
    icon: 'keyboard',
  },
];

const getIcon = (iconName: string, isActive = false) => {
  const className = `icon-md transition-all ${isActive ? 'text-primary' : 'text-muted-foreground'}`;

  const icons = {
    volume: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
    lightbulb: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
      </svg>
    ),
    message: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,5 17,10"/>
        <line x1="12" y1="5" x2="12" y2="15"/>
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    keyboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="6" cy="12" r=".5"/>
        <circle cx="18" cy="12" r=".5"/>
        <path d="M9 16h6"/>
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md transition-all text-muted-foreground hover:text-destructive">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    )
  };
  return icons[iconName as keyof typeof icons] || null;
};

export function MobileBottomNav() {
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navStyle = {
    position: 'fixed' as const,
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: 50,
    backgroundColor: 'var(--background)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid var(--border)',
    display: 'none' // Hidden on desktop, show on mobile with CSS media query
  };

  return (
      <div className="mobile-bottom-nav" style={navStyle}>
        <div className="flex items-center justify-around py-2 px-2" style={{ maxWidth: '448px', margin: '0 auto' }}>
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.href;

            const linkClass = `
              flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all min-w-0 flex-1 no-underline
              ${isActive ? 'text-primary bg-primary' : 'text-muted-foreground hover:text-foreground'}
            `.trim();

            const linkStyle = {
              backgroundColor: isActive ? 'hsl(var(--primary) / 0.1)' : 'transparent'
            };

            return (
              <Link
                key={item.href}
                to={item.href}
                className={linkClass}
                style={linkStyle}
              >
                {getIcon(item.icon, isActive)}
                <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.title}
                </span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleSignOut}
            className="flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all min-w-0 flex-1 text-muted-foreground hover:text-destructive"
          >
            {getIcon('logout')}
            <span className="text-xs font-medium" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Logout
            </span>
          </button>
        </div>
      </div>
  );
}