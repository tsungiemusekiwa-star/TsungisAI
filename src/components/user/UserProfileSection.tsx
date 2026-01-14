import { useAuth } from "@/contexts/AuthContext";
import { getIcon } from "../navigation/NavIcons";

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
        <div className="p-3 border-t border">
            <div className="flex items-center gap-3 mb-3">
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
            <button
                onClick={handleSignOut}
                className="btn btn-ghost w-full flex items-center justify-start gap-2 text-xs"
            >
                {getIcon('logout')}
                Sign Out
            </button>
        </div>
    );
};

export default UserProfileSection;