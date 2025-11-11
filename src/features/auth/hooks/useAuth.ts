import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    user: store.user,
    loading: store.loading,
    error: store.error,
    signIn: store.signIn,
    signUp: store.signUp,
    signInWithGoogle: store.signInWithGoogle,
    signOut: store.signOut,
    clearError: store.clearError,
    isAuthenticated: !!store.user,
  };
};