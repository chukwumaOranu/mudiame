import type { ClassicBlogCategory, ClassicBlogListResponse, ClassicBlogPost } from '../types/classicBlog';
import { useAuthStore } from '../store/authStore';

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

export const getClassicBlogPosts = async (
  page = 1,
  pageSize = 6,
  status: 'published' | 'draft' | 'archived' = 'published'
): Promise<ClassicBlogListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    status,
  });

  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts?${params.toString()}`);
  return parseJson<ClassicBlogListResponse>(response);
};

export const getClassicBlogPostBySlug = async (slug: string): Promise<{ item: ClassicBlogPost }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts/${slug}`);
  return parseJson<{ item: ClassicBlogPost }>(response);
};

export type CreateClassicBlogPayload = {
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featured_image_url?: string;
  featured_image_file?: File | null;
  published_at?: string;
  status?: 'draft' | 'published' | 'archived';
  author?: {
    display_name: string;
    slug?: string;
  };
  categories?: Array<{ id?: number; name?: string; slug?: string }>;
};

export const getAllClassicBlogPostsForAdmin = async (
  page = 1,
  pageSize = 50
): Promise<ClassicBlogListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    includeDraft: 'true',
  });

  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts?${params.toString()}`);
  return parseJson<ClassicBlogListResponse>(response);
};

export const createClassicBlogPost = async (
  payload: CreateClassicBlogPayload
): Promise<{ message: string; id: number }> => {
  const formData = new FormData();
  formData.append('title', payload.title);
  if (payload.slug) formData.append('slug', payload.slug);
  if (payload.excerpt) formData.append('excerpt', payload.excerpt);
  if (payload.content) formData.append('content', payload.content);
  if (payload.featured_image_url) formData.append('featured_image_url', payload.featured_image_url);
  if (payload.published_at) formData.append('published_at', payload.published_at);
  if (payload.status) formData.append('status', payload.status);
  if (payload.author) formData.append('author', JSON.stringify(payload.author));
  if (payload.categories) formData.append('categories', JSON.stringify(payload.categories));
  if (payload.featured_image_file) formData.append('featured_image_file', payload.featured_image_file);

  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });

  return parseJson<{ message: string; id: number }>(response);
};

export const deleteClassicBlogPost = async (
  postId: number
): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });

  return parseJson<{ message: string }>(response);
};

export const updateClassicBlogPost = async (
  postId: number,
  payload: Partial<CreateClassicBlogPayload>
): Promise<{ message: string }> => {
  const formData = new FormData();
  if (payload.title !== undefined) formData.append('title', payload.title);
  if (payload.slug !== undefined) formData.append('slug', payload.slug);
  if (payload.excerpt !== undefined) formData.append('excerpt', payload.excerpt);
  if (payload.content !== undefined) formData.append('content', payload.content);
  if (payload.featured_image_url !== undefined) formData.append('featured_image_url', payload.featured_image_url);
  if (payload.published_at !== undefined) formData.append('published_at', payload.published_at);
  if (payload.status !== undefined) formData.append('status', payload.status);
  if (payload.categories !== undefined) formData.append('categories', JSON.stringify(payload.categories));
  if (payload.featured_image_file) formData.append('featured_image_file', payload.featured_image_file);

  const response = await fetch(`${API_BASE_URL}/api/classic-blog/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  });

  return parseJson<{ message: string }>(response);
};

export type ClassicBlogCategoryPayload = {
  name: string;
  slug?: string;
  description?: string;
  is_active?: boolean;
};

export const getClassicBlogCategories = async (): Promise<{ items: ClassicBlogCategory[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/categories`);
  return parseJson<{ items: ClassicBlogCategory[] }>(response);
};

export const createClassicBlogCategory = async (
  payload: ClassicBlogCategoryPayload
): Promise<{ message: string; item: ClassicBlogCategory }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/categories`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{ message: string; item: ClassicBlogCategory }>(response);
};

export const updateClassicBlogCategory = async (
  categoryId: number,
  payload: Partial<ClassicBlogCategoryPayload>
): Promise<{ message: string; item: ClassicBlogCategory }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{ message: string; item: ClassicBlogCategory }>(response);
};

export const deleteClassicBlogCategory = async (
  categoryId: number
): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/classic-blog/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/json',
    },
  });

  return parseJson<{ message: string }>(response);
};
