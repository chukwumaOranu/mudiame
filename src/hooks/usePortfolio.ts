import { useQuery } from '@tanstack/react-query';
import { getPortfolioItems } from '../api/portfolioApi';

export const usePortfolioItemsQuery = (page = 1, pageSize = 24, category?: string) =>
  useQuery({
    queryKey: ['portfolio', 'items', page, pageSize, category || 'all'],
    queryFn: () => getPortfolioItems(page, pageSize, { category }),
  });
