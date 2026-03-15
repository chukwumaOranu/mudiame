import { useAuthStore } from '../store/authStore';
import type { PortfolioListResponse } from '../types/portfolio';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
};

const authHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    Authorization: `Bearer ${token || ''}`,
  };
};

export const getPortfolioItems = async (
  page = 1,
  pageSize = 24,
  options?: { category?: string }
): Promise<PortfolioListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (options?.category) {
    params.set('category', options.category);
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/items?${params.toString()}`);
  return parseJson<PortfolioListResponse>(response);
};

export const getAdminPortfolioItems = async (
  page = 1,
  pageSize = 100,
  options?: { category?: string }
): Promise<PortfolioListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (options?.category) {
    params.set('category', options.category);
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/admin/items?${params.toString()}`, {
    headers: authHeaders(),
  });

  return parseJson<PortfolioListResponse>(response);
};

export type CreatePortfolioPayload = {
  title: string;
  slug?: string;
  description?: string;
  category: string;
  status?: 'active' | 'inactive';
  sort_order?: number;
  is_featured?: boolean;
  image_url?: string;
  image_file?: File | null;
  image_files?: File[];
};

export const createPortfolioItem = async (
  payload: CreatePortfolioPayload
): Promise<{ message: string; ids: number[]; created_count: number }> => {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('category', payload.category);
  if (payload.slug) formData.append('slug', payload.slug);
  if (payload.description) formData.append('description', payload.description);
  if (payload.status) formData.append('status', payload.status);
  if (payload.sort_order !== undefined) formData.append('sort_order', String(payload.sort_order));
  if (payload.is_featured !== undefined) formData.append('is_featured', String(payload.is_featured));
  if (payload.image_url) formData.append('image_url', payload.image_url);
  if (payload.image_file) formData.append('image_file', payload.image_file);
  if (payload.image_files?.length) {
    payload.image_files.forEach((file) => {
      formData.append('image_files', file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  return parseJson<{ message: string; ids: number[]; created_count: number }>(response);
};

export const updatePortfolioItem = async (
  itemId: number,
  payload: Partial<CreatePortfolioPayload>
): Promise<{ message: string }> => {
  const formData = new FormData();
  if (payload.title !== undefined) formData.append('title', payload.title);
  if (payload.category !== undefined) formData.append('category', payload.category);
  if (payload.slug !== undefined) formData.append('slug', payload.slug);
  if (payload.description !== undefined) formData.append('description', payload.description);
  if (payload.status !== undefined) formData.append('status', payload.status);
  if (payload.sort_order !== undefined) formData.append('sort_order', String(payload.sort_order));
  if (payload.is_featured !== undefined) formData.append('is_featured', String(payload.is_featured));
  if (payload.image_url !== undefined) formData.append('image_url', payload.image_url);
  if (payload.image_file) formData.append('image_file', payload.image_file);

  const response = await fetch(`${API_BASE_URL}/api/portfolio/items/${itemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  return parseJson<{ message: string }>(response);
};

export const deletePortfolioItem = async (itemId: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });

  return parseJson<{ message: string }>(response);
};
