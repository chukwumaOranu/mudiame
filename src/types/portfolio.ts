export type PortfolioItem = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image_url: string;
  category: string;
  status: 'active' | 'inactive';
  sort_order: number;
  is_featured: boolean;
  created_by: number | null;
  created_at: string;
  updated_at: string;
};

export type PortfolioListResponse = {
  items: PortfolioItem[];
  categories: string[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};
