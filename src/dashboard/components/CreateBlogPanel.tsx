import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClassicBlogPost, getClassicBlogCategories } from '../../api/classicBlogApi';
import { useAuthStore, type AuthState } from '../../store/authStore';

const CreateBlogPanel = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state: AuthState) => state.user);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const categoriesQuery = useQuery({
    queryKey: ['dashboard', 'categories'],
    queryFn: getClassicBlogCategories,
  });

  const authorName = useMemo(() => user?.full_name || 'Mudiame Team', [user?.full_name]);

  const createMutation = useMutation({
    mutationFn: () =>
      createClassicBlogPost({
        title,
        excerpt,
        content,
        featured_image_file: featuredImageFile,
        status,
        published_at: status === 'published' ? new Date().toISOString().slice(0, 19).replace('T', ' ') : undefined,
        author: {
          display_name: authorName,
          slug: user?.username || undefined,
        },
        categories: selectedCategoryIds.map((id) => ({ id })),
      }),
    onSuccess: (data) => {
      setTitle('');
      setExcerpt('');
      setContent('');
      setFeaturedImageFile(null);
      setSelectedCategoryIds([]);
      setSuccessMessage(data.message || 'Blog post created successfully.');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'blogs'] });
      queryClient.invalidateQueries({ queryKey: ['classic-blog', 'posts'] });
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    if (!title.trim()) {
      return;
    }
    await createMutation.mutateAsync();
  };

  return (
    <form className="admin-blog-form" onSubmit={onSubmit}>
      <div className="admin-form-group">
        <label htmlFor="blog-title">Title</label>
        <input
          id="blog-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter blog title"
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="blog-excerpt">Excerpt</label>
        <textarea
          id="blog-excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          placeholder="Write a short excerpt"
          rows={3}
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="blog-content">Content</label>
        <textarea
          id="blog-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write full blog content"
          rows={8}
        />
      </div>

      <div className="admin-blog-grid-two">
        <div className="admin-form-group">
          <label htmlFor="blog-image">Featured Image Upload</label>
          <input
            id="blog-image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0] || null;
              setFeaturedImageFile(file);
            }}
          />
          <small style={{ color: '#5f6782', display: 'block' }}>
            Max size: 5MB. Required ratio: 1000x600. Uploaded image is auto-cropped/resized to 1000x600 WebP.
          </small>
          {featuredImageFile && (
            <small style={{ color: '#5f6782' }}>{featuredImageFile.name}</small>
          )}
        </div>

        <div className="admin-form-group">
          <label htmlFor="blog-status">Status</label>
          <select
            id="blog-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as 'draft' | 'published')}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="admin-form-group">
        <label htmlFor="blog-categories">Categories</label>
        <select
          id="blog-categories"
          multiple
          value={selectedCategoryIds.map(String)}
          onChange={(event) => {
            const values = Array.from(event.target.selectedOptions).map((option) =>
              Number(option.value)
            );
            setSelectedCategoryIds(values);
          }}
          className="admin-multi-select"
        >
          {(categoriesQuery.data?.items || []).map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <small style={{ color: '#5f6782' }}>Hold Ctrl/Cmd to select multiple categories.</small>
      </div>

      <button type="submit" className="admin-login-btn" disabled={createMutation.isPending}>
        {createMutation.isPending ? 'Publishing...' : 'Create Blog Post'}
      </button>

      {createMutation.isError && (
        <p className="admin-form-error">{(createMutation.error as Error).message}</p>
      )}
      {successMessage && <p className="admin-success-msg">{successMessage}</p>}
    </form>
  );
};

export default CreateBlogPanel;
