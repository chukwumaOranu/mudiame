import { useAuthStore } from '../store/authStore';
import type { FooterGalleryListResponse } from '../types/footerGallery';

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

export const getFooterGalleryItems = async (
  page = 1,
  pageSize = 16
): Promise<FooterGalleryListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await fetch(`${API_BASE_URL}/api/footer-gallery/items?${params.toString()}`);
  return parseJson<FooterGalleryListResponse>(response);
};

export const getAdminFooterGalleryItems = async (
  page = 1,
  pageSize = 16
): Promise<FooterGalleryListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await fetch(`${API_BASE_URL}/api/footer-gallery/admin/items?${params.toString()}`, {
    headers: authHeaders(),
  });

  return parseJson<FooterGalleryListResponse>(response);
};

export type CreateFooterGalleryPayload = {
  title?: string;
  status?: 'active' | 'inactive';
  sort_order?: number;
  image_file?: File | null;
  image_files?: File[];
};

export const createFooterGalleryItem = async (
  payload: CreateFooterGalleryPayload
): Promise<{ message: string; ids: number[]; created_count: number; max_items: number }> => {
  const formData = new FormData();
  if (payload.title) formData.append('title', payload.title);
  if (payload.status) formData.append('status', payload.status);
  if (payload.sort_order !== undefined) formData.append('sort_order', String(payload.sort_order));
  if (payload.image_file) formData.append('image_file', payload.image_file);
  if (payload.image_files?.length) {
    payload.image_files.forEach((file) => {
      formData.append('image_files', file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/api/footer-gallery/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  return parseJson<{ message: string; ids: number[]; created_count: number; max_items: number }>(response);
};

export const updateFooterGalleryItem = async (
  itemId: number,
  payload: Partial<CreateFooterGalleryPayload>
): Promise<{ message: string }> => {
  const formData = new FormData();
  if (payload.title !== undefined) formData.append('title', payload.title);
  if (payload.status !== undefined) formData.append('status', payload.status);
  if (payload.sort_order !== undefined) formData.append('sort_order', String(payload.sort_order));
  if (payload.image_file) formData.append('image_file', payload.image_file);

  const response = await fetch(`${API_BASE_URL}/api/footer-gallery/items/${itemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: formData,
  });

  return parseJson<{ message: string }>(response);
};

export const deleteFooterGalleryItem = async (itemId: number): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/footer-gallery/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });

  return parseJson<{ message: string }>(response);
};
