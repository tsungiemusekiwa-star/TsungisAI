import React from 'react';
import { AppSidebar } from './AppSidebar';
import { MobileBottomNav } from './MobileBottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <style>
        {`
          /* Desktop: Show sidebar, hide mobile nav */
          @media (min-width: 769px) {
            .desktop-sidebar {
              display: flex !important;
            }
            .mobile-bottom-nav {
              display: none !important;
            }
          }

          /* Mobile: Hide sidebar, show mobile nav */
          @media (max-width: 768px) {
            .desktop-sidebar {
              display: none !important;
            }
            .mobile-bottom-nav {
              display: block !important;
            }
          }
        `}
      </style>
      <div className="flex h-screen bg-background" style={{ overflow: 'hidden' }}>
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="desktop-sidebar">
          <AppSidebar />
        </div>

        {/* Main Content - Scrollable */}
        <main className="flex-1" style={{ width: 0, minWidth: 0, height: '100vh', overflow: 'hidden' }}>
          <div
            className="h-full p-4 md:p-6"
            style={{
              background: 'linear-gradient(135deg, var(--background) 0%, hsl(var(--secondary) / 0.5) 100%)',
              paddingBottom: '80px', // Space for mobile bottom nav
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            <div style={{ paddingBottom: '24px', maxWidth: '100%', width: '100%' }}>
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation - Hidden on desktop */}
        <MobileBottomNav />
      </div>
    </>
  );
}