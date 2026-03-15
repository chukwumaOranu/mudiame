import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createClassicBlogCategory,
  deleteClassicBlogCategory,
  getClassicBlogCategories,
  updateClassicBlogCategory,
} from '../../api/classicBlogApi';
import type { ClassicBlogCategory } from '../../types/classicBlog';

const CategoriesPanel = () => {
  const queryClient = useQueryClient();
  const categoriesQuery = useQuery({
    queryKey: ['dashboard', 'categories'],
    queryFn: getClassicBlogCategories,
  });

  const [editing, setEditing] = useState<ClassicBlogCategory | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createMutation = useMutation({
    mutationFn: () => createClassicBlogCategory({ name, slug, description, is_active: true }),
    onSuccess: (data) => {
      setName('');
      setSlug('');
      setDescription('');
      setSuccessMessage(data.message || 'Category created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'categories'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateClassicBlogCategory(editing!.id, {
        name,
        slug,
        description,
      }),
    onSuccess: (data) => {
      setEditing(null);
      setName('');
      setSlug('');
      setDescription('');
      setSuccessMessage(data.message || 'Category updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'categories'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (categoryId: number) => deleteClassicBlogCategory(categoryId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Category deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'categories'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
    },
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!name.trim()) {
      return;
    }

    if (editing) {
      await updateMutation.mutateAsync();
      return;
    }

    await createMutation.mutateAsync();
  };

  const onEdit = (item: ClassicBlogCategory) => {
    setSuccessMessage('');
    setErrorMessage('');
    setEditing(item);
    setName(item.name);
    setSlug(item.slug || '');
    setDescription(item.description || '');
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const items = categoriesQuery.data?.items || [];

  return (
    <div className="admin-categories-wrap">
      <form className="admin-blog-form" onSubmit={onSubmit}>
        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label htmlFor="category-name">Category Name</label>
            <input
              id="category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Beauty Tips"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="category-slug">Slug (optional)</label>
            <input
              id="category-slug"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="beauty-tips"
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label htmlFor="category-description">Description (optional)</label>
          <textarea
            id="category-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
          />
        </div>

        <div className="admin-actions-inline">
          <button type="submit" className="admin-login-btn" disabled={isPending}>
            {editing ? 'Update Category' : 'Add Category'}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => {
                setEditing(null);
                setName('');
                setSlug('');
                setDescription('');
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {(createMutation.isError || updateMutation.isError) && (
          <p className="admin-form-error">{errorMessage || (createMutation.error as Error)?.message || (updateMutation.error as Error)?.message}</p>
        )}
        {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      </form>

      <div className="admin-section-content">
        {categoriesQuery.isLoading && <p>Loading categories...</p>}
        {categoriesQuery.isError && <p className="admin-form-error">Unable to load categories.</p>}

        {items.length > 0 && (
          <div className="admin-blog-table-wrap">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Posts</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.post_count || 0}</td>
                    <td>
                      <div className="admin-actions-inline">
                        <button type="button" className="admin-menu-toggle" onClick={() => onEdit(item)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-danger-btn"
                          onClick={() => deleteMutation.mutate(item.id)}
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
    </div>
  );
};

export default CategoriesPanel;
