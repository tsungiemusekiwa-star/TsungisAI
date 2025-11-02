import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getCurrentUser, onAuthStateChange, signOut } from '../firebase/auth.js';
import { initializeCometChat, syncFirebaseUserToCometChat, logoutCometChatUser } from '../utils/cometchat';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  study_level: string;
  study_progress: any;
  preferences: any;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cometChatInitialized, setCometChatInitialized] = useState(false);

  const loadUserProfile = async (firebaseUser: any) => {
    try {
      // Create a basic profile from Firebase user data
      const basicProfile: UserProfile = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        full_name: firebaseUser.displayName || '',
        study_level: 'CA1',
        study_progress: {},
        preferences: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setProfile(basicProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user);
    }
  };

  const handleSignOut = async () => {
    try {
      // Logout from CometChat first
      await logoutCometChatUser();
      // Then logout from Firebase
      await signOut();
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Initialize CometChat on app load
  useEffect(() => {
    const initChat = async () => {
      try {
        await initializeCometChat();
        setCometChatInitialized(true);
      } catch (error) {
        console.error('Failed to initialize CometChat:', error);
      }
    };

    initChat();
  }, []);

  // Sync Firebase Auth with CometChat
  useEffect(() => {
    // Listen for auth changes - this handles both initial load and subsequent changes
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email || 'no user');
      setUser(firebaseUser);

      if (firebaseUser) {
        await loadUserProfile(firebaseUser);

        // Sync user to CometChat after initialization
        if (cometChatInitialized) {
          try {
            await syncFirebaseUserToCometChat({
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName
            });
          } catch (error) {
            console.error('Failed to sync user to CometChat:', error);
          }
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [cometChatInitialized]);

  const value = {
    user,
    profile,
    loading,
    signOut: handleSignOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};