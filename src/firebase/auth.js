// Firebase Authentication service
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import app from './config.js';

// Initialize Firebase Auth
export const auth = getAuth(app);

// Sign up with email and password
export const signUp = async (email, password, fullName) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // Update user profile with full name
    await updateProfile(user, {
      displayName: fullName
    });

    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error) {
    return { error };
  }
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve({ user, error: null });
    });
  });
};

// Auth state change listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    return { error };
  }
};