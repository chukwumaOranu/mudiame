import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  BOOKING_PAYMENT_OPTIONS,
  createAdminBookingCatalogItem,
  createBookingRequest,
  getAdminBookingCatalog,
  getAdminBookings,
  updateAdminBookingCatalogItem,
  updateAdminBookingStatus,
} from '../../api/bookingApi';
import type { BookingCatalogItem, BookingPaymentMethod } from '../../types/booking';
import type { BookingStatus } from '../../types/booking';

const statusOptions: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled'];

const BookingsPanel = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<{
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    product_category: string;
    product_name: string;
    consultant_preference: string;
    preferred_date: string;
    start_time: string;
    finish_time: string;
    payment_method: BookingPaymentMethod;
    customer_note: string;
  }>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    product_category: '',
    product_name: '',
    consultant_preference: 'Any consultant',
    preferred_date: '',
    start_time: '09:00',
    finish_time: '18:00',
    payment_method: 'pay_on_pickup' as const,
    customer_note: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [catalogForm, setCatalogForm] = useState({
    category: '',
    name: '',
    amount_ngn: '',
    is_active: true,
    sort_order: '0',
  });
  const [catalogEditing, setCatalogEditing] = useState<BookingCatalogItem | null>(null);

  const bookingsQuery = useQuery({
    queryKey: ['dashboard', 'bookings'],
    queryFn: getAdminBookings,
  });
  const catalogQuery = useQuery({
    queryKey: ['dashboard', 'booking-catalog'],
    queryFn: getAdminBookingCatalog,
  });

  const productsForCategory = useMemo(
    () => (catalogQuery.data?.items || []).filter((item) => item.category === form.product_category && item.is_active),
    [catalogQuery.data?.items, form.product_category]
  );
  const categories = useMemo(
    () => Array.from(new Set((catalogQuery.data?.items || []).map((item) => item.category))),
    [catalogQuery.data?.items]
  );

  const createMutation = useMutation({
    mutationFn: () =>
      createBookingRequest({
        ...form,
        selected_slot: form.preferred_date ? `${form.preferred_date} ${form.start_time}:00` : null,
        customer_note: form.customer_note || undefined,
      }),
    onSuccess: (data) => {
      setForm({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        product_category: categories[0] || '',
        product_name: (catalogQuery.data?.items || []).find((item) => item.category === (categories[0] || '') && item.is_active)?.name || '',
        consultant_preference: 'Any consultant',
        preferred_date: '',
        start_time: '09:00',
        finish_time: '18:00',
        payment_method: 'pay_on_pickup',
        customer_note: '',
      });
      setSuccessMessage(data.message || 'Booking created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'bookings'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
      setSuccessMessage('');
    },
  });
  const createCatalogMutation = useMutation({
    mutationFn: () =>
      createAdminBookingCatalogItem({
        category: catalogForm.category,
        name: catalogForm.name,
        amount_ngn: Number(catalogForm.amount_ngn),
        is_active: catalogForm.is_active,
        sort_order: Number(catalogForm.sort_order || 0),
      }),
    onSuccess: (data) => {
      setCatalogForm({ category: '', name: '', amount_ngn: '', is_active: true, sort_order: '0' });
      setCatalogEditing(null);
      setSuccessMessage(data.message || 'Booking product created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'booking-catalog'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
      setSuccessMessage('');
    },
  });
  const updateCatalogMutation = useMutation({
    mutationFn: () =>
      updateAdminBookingCatalogItem(catalogEditing!.id, {
        category: catalogForm.category,
        name: catalogForm.name,
        amount_ngn: Number(catalogForm.amount_ngn),
        is_active: catalogForm.is_active,
        sort_order: Number(catalogForm.sort_order || 0),
      }),
    onSuccess: (data) => {
      setCatalogForm({ category: '', name: '', amount_ngn: '', is_active: true, sort_order: '0' });
      setCatalogEditing(null);
      setSuccessMessage(data.message || 'Booking product updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'booking-catalog'] });
    },
    onError: (error) => {
      setErrorMessage((error as Error).message);
      setSuccessMessage('');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: number; status: BookingStatus }) =>
      updateAdminBookingStatus(bookingId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'bookings'] });
    },
  });

  const items = bookingsQuery.data?.items || [];
  const catalogItems = catalogQuery.data?.items || [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    await createMutation.mutateAsync();
  };
  const handleCatalogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!catalogForm.category.trim() || !catalogForm.name.trim() || !catalogForm.amount_ngn.trim()) {
      return;
    }
    if (catalogEditing) {
      await updateCatalogMutation.mutateAsync();
      return;
    }
    await createCatalogMutation.mutateAsync();
  };

  const handleCategoryChange = (nextCategory: string) => {
    const nextProduct = (catalogQuery.data?.items || []).find((item) => item.category === nextCategory && item.is_active)?.name || '';

    setForm((previous) => ({
      ...previous,
      product_category: nextCategory,
      product_name: nextProduct,
    }));
  };

  const selectedCatalogProduct = catalogItems.find((item) => item.name === form.product_name);

  useEffect(() => {
    if (!catalogItems.length || form.product_name) {
      return;
    }
    const firstActive = catalogItems.find((item) => item.is_active);
    if (!firstActive) {
      return;
    }
    setForm((previous) => ({
      ...previous,
      product_category: firstActive.category,
      product_name: firstActive.name,
    }));
  }, [catalogItems, form.product_name]);

  return (
    <div className="admin-section-content">
      <form className="admin-blog-form" onSubmit={handleCatalogSubmit}>
        <h3 className="admin-subtitle">Manage Booking Products and Prices</h3>
        <div className="admin-bookings-grid">
          <div className="admin-form-group">
            <label htmlFor="catalog-category">Category</label>
            <input
              id="catalog-category"
              value={catalogForm.category}
              onChange={(event) => setCatalogForm((previous) => ({ ...previous, category: event.target.value }))}
              placeholder="Nails"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="catalog-name">Product name</label>
            <input
              id="catalog-name"
              value={catalogForm.name}
              onChange={(event) => setCatalogForm((previous) => ({ ...previous, name: event.target.value }))}
              placeholder="Gel Nail Polish"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="catalog-price">Price (NGN)</label>
            <input
              id="catalog-price"
              type="number"
              min="0"
              value={catalogForm.amount_ngn}
              onChange={(event) => setCatalogForm((previous) => ({ ...previous, amount_ngn: event.target.value }))}
              placeholder="7000"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="catalog-sort-order">Sort order</label>
            <input
              id="catalog-sort-order"
              type="number"
              value={catalogForm.sort_order}
              onChange={(event) => setCatalogForm((previous) => ({ ...previous, sort_order: event.target.value }))}
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="catalog-active">Status</label>
            <select
              id="catalog-active"
              value={catalogForm.is_active ? 'active' : 'inactive'}
              onChange={(event) =>
                setCatalogForm((previous) => ({ ...previous, is_active: event.target.value === 'active' }))
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="admin-actions-inline">
          <button type="submit" className="admin-login-btn" disabled={createCatalogMutation.isPending || updateCatalogMutation.isPending}>
            {catalogEditing ? 'Update Product' : 'Add Product'}
          </button>
          {catalogEditing && (
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => {
                setCatalogEditing(null);
                setCatalogForm({ category: '', name: '', amount_ngn: '', is_active: true, sort_order: '0' });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {catalogQuery.isLoading && <p>Loading booking products...</p>}
      {catalogQuery.isError && <p className="admin-form-error">Unable to load booking products.</p>}
      {catalogItems.length > 0 && (
        <div className="admin-blog-table-wrap" style={{ marginTop: '16px' }}>
          <table className="admin-blog-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Product</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalogItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.category}</td>
                  <td>{item.name}</td>
                  <td>NGN {item.amount_ngn.toLocaleString()}</td>
                  <td>{item.is_active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-menu-toggle"
                      onClick={() => {
                        setCatalogEditing(item);
                        setCatalogForm({
                          category: item.category,
                          name: item.name,
                          amount_ngn: String(item.amount_ngn),
                          is_active: item.is_active,
                          sort_order: String(item.sort_order),
                        });
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-section-content">
      <form className="admin-blog-form" onSubmit={handleSubmit}>
        <h3 className="admin-subtitle">Create Booking For Customer</h3>
        <div className="admin-bookings-grid">
          <div className="admin-form-group">
            <label htmlFor="booking-customer-name">Customer name</label>
            <input
              id="booking-customer-name"
              value={form.customer_name}
              onChange={(event) => setForm((previous) => ({ ...previous, customer_name: event.target.value }))}
              placeholder="Customer full name"
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-customer-phone">Phone</label>
            <input
              id="booking-customer-phone"
              value={form.customer_phone}
              onChange={(event) => setForm((previous) => ({ ...previous, customer_phone: event.target.value }))}
              placeholder="080..."
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-customer-email">Email</label>
            <input
              id="booking-customer-email"
              type="email"
              value={form.customer_email}
              onChange={(event) => setForm((previous) => ({ ...previous, customer_email: event.target.value }))}
              placeholder="customer@example.com"
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-category">Category</label>
            <select
              id="booking-category"
              value={form.product_category}
              onChange={(event) => handleCategoryChange(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-product">Product</label>
            <select
              id="booking-product"
              value={form.product_name}
              onChange={(event) => setForm((previous) => ({ ...previous, product_name: event.target.value }))}
            >
              {productsForCategory.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-consultant">Consultant</label>
            <input
              id="booking-consultant"
              value={form.consultant_preference}
              onChange={(event) =>
                setForm((previous) => ({ ...previous, consultant_preference: event.target.value }))
              }
              placeholder="Any consultant"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-date">Preferred date</label>
            <input
              id="booking-date"
              type="date"
              value={form.preferred_date}
              onChange={(event) => setForm((previous) => ({ ...previous, preferred_date: event.target.value }))}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-start-time">Start time</label>
            <input
              id="booking-start-time"
              type="time"
              value={form.start_time}
              onChange={(event) => setForm((previous) => ({ ...previous, start_time: event.target.value }))}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-finish-time">Finish time</label>
            <input
              id="booking-finish-time"
              type="time"
              value={form.finish_time}
              onChange={(event) => setForm((previous) => ({ ...previous, finish_time: event.target.value }))}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="booking-payment-method">Payment method</label>
            <select
              id="booking-payment-method"
              value={form.payment_method}
              onChange={(event) =>
                setForm((previous) => ({
                  ...previous,
                  payment_method: event.target.value as typeof form.payment_method,
                }))
              }
            >
              {BOOKING_PAYMENT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-form-group">
          <label htmlFor="booking-note">Note</label>
          <textarea
            id="booking-note"
            rows={3}
            value={form.customer_note}
            onChange={(event) => setForm((previous) => ({ ...previous, customer_note: event.target.value }))}
            placeholder="Optional booking note"
          />
        </div>

        <button type="submit" className="admin-login-btn" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Creating Booking...' : 'Create Booking'}
        </button>

        {selectedCatalogProduct && (
          <p className="admin-success-msg">
            {form.payment_method === 'card_payment'
              ? `Amount to pay now: NGN ${selectedCatalogProduct.amount_ngn.toLocaleString()}`
              : `Service price: NGN ${selectedCatalogProduct.amount_ngn.toLocaleString()}. Payment will be made after service.`}
          </p>
        )}

        {errorMessage && <p className="admin-form-error">{errorMessage}</p>}
        {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      </form>
      </div>

      {bookingsQuery.isLoading && <p>Loading bookings...</p>}
      {bookingsQuery.isError && (
        <p className="admin-form-error">
          {(bookingsQuery.error as Error).message || "Unable to load bookings."}
        </p>
      )}

      {items.length > 0 && (
        <div className="admin-blog-table-wrap">
          <table className="admin-blog-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.booking_reference}</td>
                  <td>
                    <div>{item.customer_name}</div>
                    <small>{item.customer_email}</small>
                  </td>
                  <td>{item.product_name}</td>
                  <td>{item.preferred_date}</td>
                  <td>
                    <div>{item.payment_method}</div>
                    <small>{item.payment_status}</small>
                  </td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(event) =>
                        updateMutation.mutate({
                          bookingId: item.id,
                          status: event.target.value as BookingStatus,
                        })
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!bookingsQuery.isLoading && !bookingsQuery.isError && items.length === 0 && <p>No bookings yet.</p>}
    </div>
  );
};

export default BookingsPanel;
