import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types/user';
import { authService } from '@/lib/firebase/auth';

interface AuthStore extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,

      signIn: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const user = await authService.signIn(email, password);
          set({ user, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to sign in';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      signUp: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const user = await authService.signUp(email, password);
          set({ user, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to sign up';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      signInWithGoogle: async () => {
        try {
          set({ loading: true, error: null });
          const user = await authService.signInWithGoogle();
          set({ user, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to sign in with Google';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      signOut: async () => {
        try {
          set({ loading: true, error: null });
          await authService.signOut();
          set({ user: null, loading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      setUser: (user: User | null) => {
        set({ user, loading: false });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      initialize: () => {
        // Listen to auth state changes
        authService.onAuthStateChanged((user) => {
          const { setUser } = get();
          setUser(user);
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);