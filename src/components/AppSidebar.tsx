import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const sidebarItems = [
  {
    title: 'Audio Learning',
    href: '/',
    icon: 'volume',
    description: 'Listen & Learn'
  },
  {
    title: 'Acronym Generator',
    href: '/acronyms',
    icon: 'lightbulb',
    description: 'Memory Aids'
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: 'message',
    description: 'Connect & Collaborate'
  },
  {
    title: 'Study Buddy',
    href: '/study-buddy',
    icon: 'users',
    description: 'Collaborative Learning'
  },
  {
    title: 'Upload Files',
    href: '/upload',
    icon: 'upload',
    description: 'Upload Audio Files'
  },
  {
    title: 'Practice Tests',
    href: '/practice',
    icon: 'book',
    description: 'Mock Exams'
  },
  {
    title: 'Typing Game',
    href: '/typing-game',
    icon: 'keyboard',
    description: 'Master Touch Typing'
  },
];

const getIcon = (iconName: string) => {
  const icons = {
    volume: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    ),
    lightbulb: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z"/>
      </svg>
    ),
    message: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,5 17,10"/>
        <line x1="12" y1="5" x2="12" y2="15"/>
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
      </svg>
    ),
    keyboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-md">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="6" cy="12" r=".5"/>
        <circle cx="18" cy="12" r=".5"/>
        <path d="M9 16h6"/>
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
    ),
    chevronRight: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm" style={{ opacity: 0.7 }}>
        <polyline points="9,18 15,12 9,6"/>
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    )
  };
  return icons[iconName as keyof typeof icons] || null;
};

const UserProfileSection = () => {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  return (
    <div className="p-4 border-t border">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="rounded-full flex items-center justify-center bg-primary text-primary-foreground font-semibold"
          style={{ width: '40px', height: '40px' }}
        >
          {initials}
        </div>
        <div className="flex-1" style={{ minWidth: '0' }}>
          <p className="text-sm font-medium text-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {profile.full_name}
          </p>
          <p className="text-xs text-muted-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {profile.email}
          </p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="btn btn-ghost w-full flex items-center justify-start gap-2"
      >
        {getIcon('logout')}
        Sign Out
      </button>
    </div>
  );
};

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className = '' }: AppSidebarProps) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const sidebarClass = `
    flex flex-col bg-card border-r border shadow-card
    ${className}
  `.trim();

  return (
    <div className={sidebarClass} style={{ width: '256px', minWidth: '256px', height: '100vh' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 border-b border" style={{ height: '64px' }}>
        <div className="flex items-center gap-3">
          <div
            className="bg-primary rounded-lg flex items-center justify-center shadow-card"
            style={{ width: '32px', height: '32px' }}
          >
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground">Tsungi's</span>
            <span className="font-bold text-primary">AI</span>
            <span className="text-lg">😊</span>
          </div>
        </div>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg hover:bg-muted transition-all"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {getIcon(theme === 'light' ? 'moon' : 'sun')}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;

          const linkClass = `
            group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all no-underline
            ${isActive
              ? 'bg-primary text-primary-foreground shadow-card'
              : 'text-foreground hover:bg-muted'
            }
          `.trim();

          const linkStyle = {
            color: isActive ? 'var(--primary-foreground)' : 'var(--foreground)',
            textDecoration: 'none'
          };

          return (
            <Link
              key={item.href}
              to={item.href}
              className={linkClass}
              style={linkStyle}
            >
              {getIcon(item.icon)}
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div
                  className={`text-xs opacity-70 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                  style={{
                    color: isActive ? 'var(--primary-foreground)' : 'var(--muted-foreground)'
                  }}
                >
                  {item.description}
                </div>
              </div>
              {isActive && getIcon('chevronRight')}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <UserProfileSection />
    </div>
  );
}