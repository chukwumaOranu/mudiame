import { useQuery } from '@tanstack/react-query';
import { getFooterGalleryItems } from '../api/footerGalleryApi';

export const useFooterGalleryItemsQuery = (page = 1, pageSize = 16) =>
  useQuery({
    queryKey: ['footer-gallery', 'items', page, pageSize],
    queryFn: () => getFooterGalleryItems(page, pageSize),
  });
