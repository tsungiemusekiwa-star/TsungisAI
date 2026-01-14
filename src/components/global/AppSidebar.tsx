import { useTheme } from '@/contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { getIcon } from '../navigation/NavIcons';
import { sidebarItems } from '@/data/navigation.data';
import UserProfileSection from '../user/UserProfileSection';




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
    <div className={sidebarClass} style={{
      width: '256px',
      minWidth: '256px',
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
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
      <nav className="flex-1 space-y-2 p-4" >
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;

          const linkClass = `
            group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all no-underline
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