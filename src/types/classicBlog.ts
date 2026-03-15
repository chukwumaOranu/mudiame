export type ClassicBlogCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  is_active?: boolean;
  post_count?: number;
};

export type ClassicBlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  status: 'draft' | 'published' | 'archived';
  author: {
    id: number;
    display_name: string;
    slug: string;
    avatar_url: string | null;
  };
  metrics: {
    comment_count: number;
    view_count: number;
    share_count: number;
  };
  categories: ClassicBlogCategory[];
  created_at: string;
  updated_at: string;
};

export type ClassicBlogListResponse = {
  items: ClassicBlogPost[];
  page: number;
  pageSize: number;
  total: number;
};
