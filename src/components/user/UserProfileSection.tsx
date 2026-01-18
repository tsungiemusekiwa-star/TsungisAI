import { useState, useRef, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { getIcon } from "../navigation/NavIcons";
import { useTheme } from '@/contexts/ThemeContext';

const UserProfileSection = () => {
    const { user, profile, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { theme, setTheme } = useTheme();

    if (!user || !profile) return null;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node | null;
            if (containerRef.current && target && !containerRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsOpen(false);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const initials = profile.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
        : 'U';

    return (
        <div ref={containerRef}>
            {isOpen && (
                <div className="flex flex-col items-center text-sm text-foreground hover:bg-accent rounded-lg transition-colors" style={{ width: '90%', backgroundColor: 'var(--background)', border: '1px solid var(--border)', paddingLeft: '12px', paddingRight: "12px" }}>
                    <div
                        onClick={handleSignOut}
                        className="w-full flex items-center p-2 gap-4"
                        style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
                    >
                        {getIcon('logout')}
                        Sign out
                    </div>
                    <div
                        onClick={handleThemeToggle}
                        className="w-full flex items-center p-2 gap-4"
                        style={{ cursor: 'pointer' }}
                    >
                        {getIcon(theme === 'light' ? 'sun' : 'moon')}
                        Toggle Theme
                    </div>
                </div>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-6 p-3 border-t border"
                    style={{cursor: 'pointer'}}
                >
                <div
                    className="flex items-center gap-4 cursor-pointer hover:bg-accent rounded-lg p-2 -m-2 transition-colors"
                >
                    <div
                        className="rounded-full flex items-center justify-center bg-primary text-primary-foreground font-semibold"
                        style={{ width: '40px', height: '40px' }}
                    >
                        {initials}
                    </div>
                    <div className="flex-1" style={{ minWidth: '0' }}>
                        <p className="text-xs font-medium text-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {profile.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {profile.email}
                        </p>
                    </div>
                </div>
                <span>{getIcon('chevronRight')}</span>
            </div>
        </div>
    );
};

export default UserProfileSection;