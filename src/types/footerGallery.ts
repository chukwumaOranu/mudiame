export type FooterGalleryItem = {
  id: number;
  title: string;
  image_url: string;
  thumbnail_url: string;
  status: 'active' | 'inactive';
  sort_order: number;
  created_by: number | null;
  created_at: string;
  updated_at: string;
};

export type FooterGalleryListResponse = {
  items: FooterGalleryItem[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    maxItems: number;
  };
};
