import type { AuthResponse, LoginPayload, RegisterPayload, AuthUser } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    const message = (data as { message?: string }).message || 'Request failed.';
    throw new Error(message);
  }
  return data;
};

export const loginRequest = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson<AuthResponse>(response);
};

export const registerRequest = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson<AuthResponse>(response);
};

export const getCurrentUserRequest = async (token: string): Promise<{ user: AuthUser }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseJson<{ user: AuthUser }>(response);
};

export const logoutRequest = async (token: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return parseJson<{ message: string }>(response);
};
