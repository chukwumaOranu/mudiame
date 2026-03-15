import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/auth';

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser) => void;
  setUser: (user: AuthUser | null) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      setSession: (token: string, user: AuthUser) => set({ token, user }),
      setUser: (user: AuthUser | null) => set({ user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);
