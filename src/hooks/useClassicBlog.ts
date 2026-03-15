import { useQuery } from '@tanstack/react-query';
import { getClassicBlogPostBySlug, getClassicBlogPosts } from '../api/classicBlogApi';

export const useClassicBlogPostsQuery = (page = 1, pageSize = 6) =>
  useQuery({
    queryKey: ['classic-blog', 'posts', page, pageSize],
    queryFn: () => getClassicBlogPosts(page, pageSize, 'published'),
  });

export const useClassicBlogPostQuery = (slug: string | null) =>
  useQuery({
    queryKey: ['classic-blog', 'post', slug],
    queryFn: () => getClassicBlogPostBySlug(slug as string),
    enabled: Boolean(slug),
  });
