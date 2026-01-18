import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { getIcon } from '../navigation/NavIcons';
import { sidebarItems } from '@/data/navigation.data';
import UserProfileSection from '../user/UserProfileSection';
import NewLogo from "@/assets/logo-new.png";
import CompanyName from "@/assets/company-name.png";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className = '' }: AppSidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();

  const sidebarClass = `
    flex flex-col bg-card border-r border shadow-card
    ${className}
  `.trim();

  return (
    <div className={sidebarClass} style={{
      width: '256px',
      minWidth: '256px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden', // important
    }}>

      {/* Header */}
      <div
        className="border-b border"
        style={{
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '16px',
          gap: '42px',
        }}
      >
        {/* Logo */}
        <div
          style={{ width: '32px', height: '32px'}}
        >
          <img src={NewLogo} style={{ width: '32px', height: '32px'  }} />
        </div>

        {/* Name */}
        <div
          className={theme === 'dark' ? 'text-primary' : ''}
          style={{ fontSize: '18px', fontWeight: '800', color: theme === 'dark' ? undefined : '#45256D' }}
        >
          Tsungi's AI
        </div>

        {/* Theme Changer */}
        {/* <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-lg hover:bg-muted transition-all"
            style={{ width: '36px', height: '36px' }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {getIcon(theme === 'light' ? 'moon' : 'sun')}
          </button> */}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 space-y-2 p-4"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;

          const linkClass = `
      group flex items-center gap-3 rounded-xl px-3 py-2 text-xs transition-all no-underline
      ${isActive
              ? 'bg-primary text-primary-foreground shadow-card'
              : 'text-foreground hover:bg-muted'}
    `.trim();

          return (
            <Link
              key={item.href}
              to={item.href}
              className={linkClass}
              style={{ textDecoration: 'none' }}
            >
              {getIcon(item.icon)}
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div
                  className={`text-xs opacity-70 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}
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
      <div style={{ flexShrink: 0 }}>
        <UserProfileSection />
      </div>
    </div>
  );
}