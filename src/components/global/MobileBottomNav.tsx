import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { coreMobileNavItems, otherFeatures } from '@/data/navigation.data';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import type { NavItem } from '@/types/navigation.types';
import { getIcon } from '../navigation/NavIcons';
import NavLink from '../navigation/NavLink';

export function MobileBottomNav() {
  const location = useLocation();
  const { signOut } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();
  const [navItems, setNavItems] = useState<NavItem[]>(coreMobileNavItems);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out');
    }
  };

  const toggleMenu = () => {
    if (!isExpanded) {
      // Expand: add otherFeatures
      setNavItems([...coreMobileNavItems, ...otherFeatures]);
      setIsExpanded(true);
    } else {
      // Collapse: remove otherFeatures, back to core items
      setNavItems([...coreMobileNavItems]);
      setIsExpanded(false);
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
    display: 'none',
    paddingTop: "6px",
    paddingBottom: "10px"
  };

  return (
    <div className="mobile-bottom-nav" style={navStyle}>

      {/* Close Button */}
      {isExpanded &&
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", paddingRight: "8px" }}>
          <button onClick={toggleMenu}
            className={'text-primary'}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '2px', padding: '6px', border: "none",
              backgroundColor: 'hsl(var(--primary) / 0.1)'
            }} > {getIcon('close')}
            <span style={{
              fontSize: '10px', fontWeight: '500', overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
              Close
            </span>
          </button>
        </div>
      }

      {/* Navigate Sub Heading */}
      {isExpanded && (
        <div className='p-4'>
          <h6 className='font-medium text-sm'>Navigate</h6>
        </div>
      )}

      {/* Main Nav - Core Features + Hamburger */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${isExpanded ? 5 : 6}, 1fr)`,
        gap: `4px ${isExpanded && '6px'}`,
      }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return <NavLink key={item.href} item={item} isActive={isActive} />;
        })}

        {/* Hamburger Menu Button */}
        {!isExpanded && (
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground"
            style={{
              minWidth: 0,
              flex: 1,
              transition: 'all 0.2s',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {getIcon('menu')}
            <span
              style={{
                fontSize: '10px',
                fontWeight: '500',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              More
            </span>
          </button>
        )}
      </div>

      {/* Second Actions Sub Heading */}
      {isExpanded && (
        <div className='p-4 flex justify-between items-center'>
          <h6 className='font-medium text-sm'>Actions</h6>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
        {isExpanded && (
          <>
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg transition-all text-muted-foreground"
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
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {getIcon(theme === 'light' ? 'moon' : 'sun')}
              <span style={{ fontSize: '10px', fontWeight: '500' }}>Theme</span>
            </button>

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
          </>
        )

        }
      </div>
    </div>
  );
}