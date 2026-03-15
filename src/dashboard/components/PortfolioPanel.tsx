import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createPortfolioItem,
  deletePortfolioItem,
  getAdminPortfolioItems,
  updatePortfolioItem,
} from '../../api/portfolioApi';
import type { PortfolioItem } from '../../types/portfolio';

const emptyForm = {
  title: '',
  category: '',
  description: '',
  status: 'active' as 'active' | 'inactive',
  sort_order: 0,
  is_featured: false,
  image_file: null as File | null,
  image_files: [] as File[],
};

const PortfolioPanel = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const portfolioQuery = useQuery({
    queryKey: ['dashboard', 'portfolio'],
    queryFn: () => getAdminPortfolioItems(1, 200),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createPortfolioItem({
        title: form.title,
        category: form.category,
        description: form.description,
        status: form.status,
        sort_order: form.sort_order,
        is_featured: form.is_featured,
        image_file: form.image_file,
        image_files: form.image_files,
      }),
    onSuccess: (data) => {
      setForm(emptyForm);
      setSuccessMessage(data.message || 'Portfolio item(s) created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updatePortfolioItem(editing!.id, {
        title: form.title,
        category: form.category,
        description: form.description,
        status: form.status,
        sort_order: form.sort_order,
        is_featured: form.is_featured,
        image_file: form.image_file,
      }),
    onSuccess: (data) => {
      setEditing(null);
      setForm(emptyForm);
      setSuccessMessage(data.message || 'Portfolio item updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => deletePortfolioItem(itemId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Portfolio item deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'portfolio'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!form.title.trim() || !form.category.trim()) {
      return;
    }

    if (!editing && !form.image_file && !form.image_files.length) {
      return;
    }

    if (editing) {
      await updateMutation.mutateAsync();
      return;
    }

    await createMutation.mutateAsync();
  };

  const beginEdit = (item: PortfolioItem) => {
    setSuccessMessage('');
    setErrorMessage('');
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      status: item.status,
      sort_order: item.sort_order,
      is_featured: item.is_featured,
      image_file: null,
      image_files: [],
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const items = portfolioQuery.data?.items || [];

  return (
    <div>
      <form className="admin-blog-form" onSubmit={onSubmit}>
        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Title</label>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <input
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              placeholder="Nails, Lips, Eyes..."
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>

        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>{editing ? 'Replace Image (optional)' : 'Images (one or many)'}</label>
            <input
              type="file"
              accept="image/*"
              multiple={!editing}
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                if (editing) {
                  setForm((prev) => ({ ...prev, image_file: files[0] || null, image_files: [] }));
                  return;
                }
                setForm((prev) => ({
                  ...prev,
                  image_file: files[0] || null,
                  image_files: files,
                }));
              }}
            />
            <small style={{ color: '#5f6782', display: 'block' }}>
              Portfolio image spec: 480x430. Uploaded image(s) are auto-cropped/resized to 480x430 WebP.
            </small>
            {!editing && form.image_files.length > 0 && (
              <small style={{ color: '#5f6782' }}>{form.image_files.length} file(s) selected</small>
            )}
          </div>
          <div className="admin-form-group">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, status: event.target.value as 'active' | 'inactive' }))
              }
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
        </div>

        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, sort_order: Number(event.target.value || 0) }))
              }
            />
          </div>
          <div className="admin-form-group">
            <label>Featured</label>
            <select
              value={String(form.is_featured)}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, is_featured: event.target.value === 'true' }))
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>

        <div className="admin-actions-inline">
          <button
            type="submit"
            className="admin-login-btn"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editing ? 'Update Portfolio Item' : 'Create Portfolio Item'}
          </button>
          {editing && (
            <button type="button" className="admin-menu-toggle" onClick={cancelEdit}>
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
        {portfolioQuery.isLoading && <p>Loading portfolio...</p>}
        {portfolioQuery.isError && <p className="admin-form-error">Unable to load portfolio items.</p>}

        {items.length > 0 && (
          <div className="admin-blog-table-wrap">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Sort</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img className="admin-thumb" src={item.image_url} alt={item.title} />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`admin-status-chip status-${item.status}`}>{item.status}</span>
                    </td>
                    <td>{item.sort_order}</td>
                    <td>
                      <div className="admin-actions-inline">
                        <button type="button" className="admin-menu-toggle" onClick={() => beginEdit(item)}>
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

export default PortfolioPanel;
