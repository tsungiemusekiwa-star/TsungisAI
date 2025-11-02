// Firebase module type declarations

declare module '../firebase/auth.js' {
  import { User } from 'firebase/auth';

  export function signUp(email: string, password: string, fullName: string): Promise<{
    user: User | null;
    error: Error | null;
  }>;

  export function signIn(email: string, password: string): Promise<{
    user: User | null;
    error: Error | null;
  }>;

  export function signOut(): Promise<{ error: Error | null }>;

  export function getCurrentUser(): Promise<{ user: User | null; error: Error | null }>;

  export function onAuthStateChange(callback: (user: User | null) => void): () => void;

  export function resetPassword(email: string): Promise<{ error: Error | null }>;
}

declare module '../firebase/audioService.js' {
  export function getAudioUrl(filePath: string): Promise<string>;

  export function listAudioFiles(path: string): Promise<{
    data: any[] | null;
    error: Error | null;
  }>;

  export function uploadAudioFile(file: File, path: string): Promise<{
    data: any | null;
    error: Error | null;
  }>;
}