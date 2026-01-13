import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { coreMobileNavItems, otherFeatures } from '@/data/navigation.data';
import { Link, useLocation } from 'react-router-dom';

const getIcon = (iconName: string, isActive = false) => {
  const iconStyle = {
    width: '16px',
    height: '16px',
    transition: 'all 0.2s'
  };
  const className = `transition-all ${isActive ? 'text-primary' : 'text-muted-foreground'}`;

  const icons = {
    volume: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
    lightbulb: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M9 21H15M12 17L12 21M12 3a6 6 0 0 1 6 6c0 3-2 5.5-2 8H8c0-2.5-2-5-2-8a6 6 0 0 1 6-6Z" />
      </svg>
    ),
    message: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    upload: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7,10 12,5 17,10" />
        <line x1="12" y1="5" x2="12" y2="15" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    keyboard: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="6" cy="12" r=".5" />
        <circle cx="18" cy="12" r=".5" />
        <path d="M9 16h6" />
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={iconStyle} className="transition-all text-muted-foreground">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    notes: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <path d="M9 2h6a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2-2z" />
        <path d="M9 6h6" />
        <path d="M9 10h6" />
        <path d="M9 14h4" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} style={iconStyle}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    )
  };
  return icons[iconName as keyof typeof icons] || null;
};

const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => {
  const linkStyle = {
    backgroundColor: isActive ? 'hsl(var(--primary) / 0.1)' : 'transparent',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2px',
    padding: '6px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    minWidth: '0',
    flex: '1',
    textDecoration: 'none'
  };

  const textStyle = {
    fontSize: '10px',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  };

  return (
    <Link to={item.href} className={isActive ? 'text-primary' : 'text-muted-foreground'} style={linkStyle}>
      {getIcon(item.icon, isActive)}
      <span 
        className={isActive ? 'text-primary' : 'text-muted-foreground'} 
        style={textStyle}
      >
        {item.title}
      </span>
    </Link>
  );
};

export function MobileBottomNav() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
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

  const expandedSectionStyle = {
    maxHeight: isExpanded ? '200px' : '0',
    opacity: isExpanded ? 1 : 0,
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out'
  };

  return (
    <div className="mobile-bottom-nav" style={navStyle}>
      {/* Main Nav - Core Features + Hamburger */}
      <div className="flex items-center justify-around py-2 px-2" style={{ maxWidth: '448px', margin: '0 auto' }}>
        {coreMobileNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavLink key={item.href} item={item} isActive={isActive} />;
        })}

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className={isExpanded ? 'text-primary' : 'text-muted-foreground'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            minWidth: '0',
            flex: '1',
            backgroundColor: isExpanded ? 'hsl(var(--primary) / 0.1)' : 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {getIcon(isExpanded ? 'close' : 'menu', isExpanded)}
          <span style={{ fontSize: '10px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {isExpanded ? 'Close' : 'More'}
          </span>
        </button>
      </div>

      {/* Expanded Section - Other Features */}
      <div style={expandedSectionStyle}>
        <div style={{ maxWidth: '448px', margin: '0 auto', padding: '8px', }}>
          {/* Other Features + Logout Grid (4 columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
            {otherFeatures.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '6px',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    backgroundColor: isActive ? 'hsl(var(--primary) / 0.1)' : 'transparent'
                  }}
                  onClick={() => setIsExpanded(false)}
                >
                  {getIcon(item.icon, isActive)}
                  <span 
                    className={isActive ? 'text-primary' : 'text-muted-foreground'}
                    style={{
                      fontSize: '10px',
                      fontWeight: '500',
                      textAlign: 'center'
                    }}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}

            {/* Logout Button - Same size as others */}
            <button
              onClick={handleSignOut}
              className="text-muted-foreground"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                padding: '6px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {getIcon('logout')}
              <span style={{ fontSize: '10px', fontWeight: '500' }}>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}