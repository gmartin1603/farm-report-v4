import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from './config';
import type { User } from '@/types/user';

export const authService = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(result.user);
  },

  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(result.user);
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return mapFirebaseUser(result.user);
  },

  // Sign out
  signOut: async () => {
    await signOut(auth);
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? mapFirebaseUser(firebaseUser) : null;
      callback(user);
    });
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? mapFirebaseUser(firebaseUser) : null;
  },
};

// Helper function to map Firebase user to our User type
const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
});