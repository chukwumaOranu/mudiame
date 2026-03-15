import type { AdminPermission, AdminUser } from '../types/admin';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const authHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    Authorization: `Bearer ${token || ''}`,
    'Content-Type': 'application/json',
  };
};

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
};

export const getAdminUsers = async (): Promise<{ items: AdminUser[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    headers: authHeaders(),
  });
  return parseJson<{ items: AdminUser[] }>(response);
};

export const createAdminUser = async (payload: {
  full_name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string; id: number }>(response);
};

export const updateAdminUser = async (userId: number, payload: Record<string, unknown>) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string }>(response);
};

export const deleteAdminUser = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return parseJson<{ message: string }>(response);
};

export const getAdminPermissions = async (): Promise<{ items: AdminPermission[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/admin/permissions`, {
    headers: authHeaders(),
  });
  return parseJson<{ items: AdminPermission[] }>(response);
};

export const createAdminPermission = async (payload: {
  permission_name: string;
  permission_key?: string;
  description?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/permissions`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string; id: number }>(response);
};

export const updateAdminPermission = async (
  permissionId: number,
  payload: { permission_name?: string; permission_key?: string; description?: string }
) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/permissions/${permissionId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string }>(response);
};

export const deleteAdminPermission = async (permissionId: number) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/permissions/${permissionId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return parseJson<{ message: string }>(response);
};

export const assignPermissionsToUser = async (userId: number, permission_ids: number[]) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/permissions/assign/${userId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ permission_ids }),
  });
  return parseJson<{ message: string }>(response);
};
