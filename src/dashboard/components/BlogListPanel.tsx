import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteClassicBlogPost,
  getAllClassicBlogPostsForAdmin,
  updateClassicBlogPost,
} from '../../api/classicBlogApi';
import type { ClassicBlogPost } from '../../types/classicBlog';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_BASE = API_BASE_URL.replace(/\/+$/, '');

const resolveImageUrl = (value: string | null) => {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/\\/g, '/');
  const uploadsPathMatch = normalized.match(/\/uploads\/[^"'?\s)]+(?:\?[^"'\s)]*)?/);

  if (uploadsPathMatch?.[0]) {
    return `${API_BASE}${uploadsPathMatch[0]}`;
  }

  if (normalized.startsWith('/')) {
    return `${API_BASE}${normalized}`;
  }

  try {
    const parsed = new URL(normalized);
    if (parsed.pathname) {
      return `${API_BASE}${parsed.pathname}${parsed.search || ''}`;
    }
    return normalized;
  } catch (_error) {
    return normalized;
  }
};

const BlogListPanel = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<ClassicBlogPost | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editStatus, setEditStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [editFeaturedImageFile, setEditFeaturedImageFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const postsQuery = useQuery({
    queryKey: ['dashboard', 'blogs'],
    queryFn: () => getAllClassicBlogPostsForAdmin(1, 50),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deleteClassicBlogPost(postId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Blog post deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'blogs'] });
      queryClient.invalidateQueries({ queryKey: ['classic-blog', 'posts'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateClassicBlogPost(editing!.id, {
        title: editTitle,
        excerpt: editExcerpt,
        content: editContent,
        status: editStatus,
        featured_image_file: editFeaturedImageFile,
        published_at:
          editStatus === 'published'
            ? editing?.published_at || new Date().toISOString().slice(0, 19).replace('T', ' ')
            : undefined,
      }),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Blog post updated successfully.');
      setErrorMessage('');
      setEditing(null);
      setEditTitle('');
      setEditExcerpt('');
      setEditContent('');
      setEditStatus('draft');
      setEditFeaturedImageFile(null);
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'blogs'] });
      queryClient.invalidateQueries({ queryKey: ['classic-blog', 'posts'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const beginEdit = (post: ClassicBlogPost) => {
    setSuccessMessage('');
    setErrorMessage('');
    setEditing(post);
    setEditTitle(post.title);
    setEditExcerpt(post.excerpt || '');
    setEditContent(post.content || '');
    setEditStatus(post.status);
    setEditFeaturedImageFile(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditTitle('');
    setEditExcerpt('');
    setEditContent('');
    setEditStatus('draft');
    setEditFeaturedImageFile(null);
  };

  const onUpdateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!editing || !editTitle.trim()) {
      return;
    }
    await updateMutation.mutateAsync();
  };

  const formatDate = (value: string | null) => {
    if (!value) {
      return 'Unpublished';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (postsQuery.isLoading) {
    return <p>Loading blog list...</p>;
  }

  if (postsQuery.isError) {
    return <p className="admin-form-error">Unable to load blog list.</p>;
  }

  const items = postsQuery.data?.items || [];
  const editPreviewImage = resolveImageUrl(editing?.featured_image_url || null);

  return (
    <div className="admin-blog-list-wrap">
      {editing && (
        <form className="admin-blog-form" onSubmit={onUpdateSubmit} style={{ marginBottom: 20 }}>
          <h3 className="admin-subtitle">Edit Blog: {editing.title}</h3>
          <div className="admin-form-group">
            <label>Title</label>
            <input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Excerpt</label>
            <textarea
              rows={3}
              value={editExcerpt}
              onChange={(event) => setEditExcerpt(event.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Content</label>
            <textarea
              rows={8}
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Status</label>
            <select
              value={editStatus}
              onChange={(event) =>
                setEditStatus(event.target.value as 'draft' | 'published' | 'archived')
              }
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="archived">archived</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Featured Image (optional replacement)</label>
            {editPreviewImage && (
              <img
                src={editPreviewImage}
                alt={editing.title}
                className="admin-thumb"
                style={{ marginBottom: 8 }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setEditFeaturedImageFile(event.target.files?.[0] || null)}
            />
            <small style={{ color: '#5f6782', display: 'block' }}>
              Spec: 1000x600. Leave empty to keep current featured image.
            </small>
          </div>
          <div className="admin-actions-inline">
            <button type="submit" className="admin-login-btn" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" className="admin-menu-toggle" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
          {updateMutation.isError && (
            <p className="admin-form-error">{errorMessage || (updateMutation.error as Error).message}</p>
          )}
        </form>
      )}

      {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      {errorMessage && !editing && <p className="admin-form-error">{errorMessage}</p>}

      {items.length === 0 ? (
        <p>No blog posts found yet.</p>
      ) : (
        <div className="admin-blog-table-wrap">
          <table className="admin-blog-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Published</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((post) => (
                <tr key={post.id}>
                  <td>
                    {resolveImageUrl(post.featured_image_url) ? (
                      <img
                        className="admin-thumb"
                        src={resolveImageUrl(post.featured_image_url) as string}
                        alt={post.title}
                      />
                    ) : (
                      <span style={{ color: '#7b849e' }}>No image</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-blog-title-cell">
                      <strong>{post.title}</strong>
                      <span>/{post.slug}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status-chip status-${post.status}`}>{post.status}</span>
                  </td>
                  <td>{formatDate(post.published_at)}</td>
                  <td>{post.author.display_name}</td>
                  <td>
                    <div className="admin-actions-inline">
                      <button
                        type="button"
                        className="admin-menu-toggle"
                        onClick={() => beginEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-danger-btn"
                        onClick={() => deleteMutation.mutate(post.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BlogListPanel;
