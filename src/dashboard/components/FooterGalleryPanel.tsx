import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFooterGalleryItem,
  deleteFooterGalleryItem,
  getAdminFooterGalleryItems,
  updateFooterGalleryItem,
} from '../../api/footerGalleryApi';
import type { FooterGalleryItem } from '../../types/footerGallery';

const emptyForm = {
  title: '',
  status: 'active' as 'active' | 'inactive',
  sort_order: 0,
  image_file: null as File | null,
  image_files: [] as File[],
};

const FooterGalleryPanel = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<FooterGalleryItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const footerGalleryQuery = useQuery({
    queryKey: ['dashboard', 'footer-gallery'],
    queryFn: () => getAdminFooterGalleryItems(1, 16),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      createFooterGalleryItem({
        title: form.title,
        status: form.status,
        sort_order: form.sort_order,
        image_file: form.image_file,
        image_files: form.image_files,
      }),
    onSuccess: (data) => {
      setForm(emptyForm);
      setSuccessMessage(data.message || 'Footer gallery item(s) created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'footer-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['footer-gallery', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateFooterGalleryItem(editing!.id, {
        title: form.title,
        status: form.status,
        sort_order: form.sort_order,
        image_file: form.image_file,
      }),
    onSuccess: (data) => {
      setEditing(null);
      setForm(emptyForm);
      setSuccessMessage(data.message || 'Footer gallery item updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'footer-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['footer-gallery', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: number) => deleteFooterGalleryItem(itemId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Footer gallery item deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'footer-gallery'] });
      queryClient.invalidateQueries({ queryKey: ['footer-gallery', 'items'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!editing && !form.image_file && !form.image_files.length) {
      return;
    }

    if (editing) {
      await updateMutation.mutateAsync();
      return;
    }

    await createMutation.mutateAsync();
  };

  const beginEdit = (item: FooterGalleryItem) => {
    setSuccessMessage('');
    setErrorMessage('');
    setEditing(item);
    setForm({
      title: item.title,
      status: item.status,
      sort_order: item.sort_order,
      image_file: null,
      image_files: [],
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const items = footerGalleryQuery.data?.items || [];
  const maxItems = footerGalleryQuery.data?.pagination.maxItems || 16;
  const remainingSlots = Math.max(0, maxItems - items.length);

  return (
    <div>
      <form className="admin-blog-form" onSubmit={onSubmit}>
        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Title</label>
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Footer Gallery Image"
            />
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
            <label>{editing ? 'Replace Image (optional)' : `Images (up to ${remainingSlots} slot${remainingSlots === 1 ? '' : 's'} left)`}</label>
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
              One upload can add multiple footer images. The gallery is capped at {maxItems} total images.
            </small>
            {!editing && form.image_files.length > 0 && (
              <small style={{ color: '#5f6782' }}>{form.image_files.length} file(s) selected</small>
            )}
          </div>
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
        </div>

        <div className="admin-actions-inline">
          <button
            type="submit"
            className="admin-login-btn"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editing ? 'Update Footer Gallery Item' : 'Upload Footer Gallery Images'}
          </button>
          {editing && (
            <button type="button" className="admin-menu-toggle" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>

        {(createMutation.isError || updateMutation.isError) && (
          <p className="admin-form-error">
            {errorMessage || (createMutation.error as Error)?.message || (updateMutation.error as Error)?.message}
          </p>
        )}
        {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      </form>

      <div className="admin-section-content">
        {footerGalleryQuery.isLoading && <p>Loading footer gallery...</p>}
        {footerGalleryQuery.isError && <p className="admin-form-error">Unable to load footer gallery items.</p>}

        {items.length > 0 && (
          <div className="admin-blog-table-wrap">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Sort</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img className="admin-thumb" src={item.thumbnail_url || item.image_url} alt={item.title} />
                    </td>
                    <td>{item.title}</td>
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

export default FooterGalleryPanel;
