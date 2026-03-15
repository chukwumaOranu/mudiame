import { useMutation, useQuery } from '@tanstack/react-query';
import { getCurrentUserRequest, loginRequest, logoutRequest, registerRequest } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import type { AuthResponse, LoginPayload, RegisterPayload } from '../types/auth';
import type { AuthState } from '../store/authStore';

export const useLoginMutation = () => {
  const setSession = useAuthStore((state: AuthState) => state.setSession);

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
    onSuccess: (data: AuthResponse) => {
      setSession(data.token, data.user);
    },
  });
};

export const useRegisterMutation = () => {
  const setSession = useAuthStore((state: AuthState) => state.setSession);

  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => registerRequest(payload),
    onSuccess: (data: AuthResponse) => {
      setSession(data.token, data.user);
    },
  });
};

export const useCurrentUserQuery = (token: string | null) => {
  return useQuery({
    queryKey: ['auth', 'me', token],
    queryFn: () => getCurrentUserRequest(token as string),
    enabled: Boolean(token),
    retry: false,
  });
};

export const useLogoutMutation = () => {
  const token = useAuthStore((state: AuthState) => state.token);
  const clearSession = useAuthStore((state: AuthState) => state.clearSession);

  return useMutation({
    mutationFn: async () => {
      if (token) {
        await logoutRequest(token);
      }
      return true;
    },
    onSettled: () => {
      clearSession();
    },
  });
};
