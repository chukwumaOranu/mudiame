import { useAuthStore } from '../store/authStore';
import type {
  BookingCatalogItem,
  BookingPaymentMethod,
  BookingRecord,
  BookingRequestPayload,
  BookingStatus,
} from '../types/booking';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const parseJson = async <T>(response: Response): Promise<T> => {
  const data = (await response.json()) as T & { message?: string };
  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }
  return data;
};

const authHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    Authorization: `Bearer ${token || ''}`,
    'Content-Type': 'application/json',
  };
};

export const createBookingRequest = async (
  payload: BookingRequestPayload
): Promise<{
  message: string;
  booking: BookingRecord;
  payment: {
    required: boolean;
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
}> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseJson(response);
};

export const verifyBookingPayment = async (
  reference: string
): Promise<{
  message: string;
  booking: BookingRecord | null;
  payment: {
    status: BookingRecord["payment_status"] | "pending";
    reference: string;
    gateway_status: string | null;
  };
}> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/verify/${encodeURIComponent(reference)}`);
  return parseJson(response);
};

export const getAdminBookings = async (): Promise<{ items: BookingRecord[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/admin`, {
    headers: authHeaders(),
  });

  return parseJson<{ items: BookingRecord[] }>(response);
};

export const updateAdminBookingStatus = async (
  bookingId: number,
  payload: { status: BookingStatus; change_note?: string }
): Promise<{ message: string; booking: BookingRecord }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/admin/${bookingId}/status`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  return parseJson<{ message: string; booking: BookingRecord }>(response);
};

export const getPublicBookingOptions = async (): Promise<{ items: BookingCatalogItem[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/options`);
  return parseJson<{ items: BookingCatalogItem[] }>(response);
};

export const getAdminBookingCatalog = async (): Promise<{ items: BookingCatalogItem[] }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/admin/catalog`, {
    headers: authHeaders(),
  });
  return parseJson<{ items: BookingCatalogItem[] }>(response);
};

export const FALLBACK_BOOKING_OPTIONS: BookingCatalogItem[] = [
  {
    id: 1,
    category: 'Nails',
    name: 'Gel Nail Polish',
    amount_ngn: 7000,
    is_active: true,
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    category: 'Lips',
    name: 'Lip Gloss',
    amount_ngn: 4000,
    is_active: true,
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    category: 'Eyes',
    name: 'Eyeshadow Palette',
    amount_ngn: 12000,
    is_active: true,
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 4,
    category: 'Lips',
    name: 'Lip Pencil',
    amount_ngn: 3000,
    is_active: true,
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
  {
    id: 5,
    category: 'Self-Care',
    name: 'Face Mask',
    amount_ngn: 5000,
    is_active: true,
    sort_order: 5,
    created_at: '',
    updated_at: '',
  },
  {
    id: 6,
    category: 'Self-Care',
    name: 'Foot Mask',
    amount_ngn: 5000,
    is_active: true,
    sort_order: 6,
    created_at: '',
    updated_at: '',
  },
  {
    id: 7,
    category: 'Self-Care',
    name: 'Hair Oil',
    amount_ngn: 6500,
    is_active: true,
    sort_order: 7,
    created_at: '',
    updated_at: '',
  },
  {
    id: 8,
    category: 'Self-Care',
    name: 'Body Oil',
    amount_ngn: 6500,
    is_active: true,
    sort_order: 8,
    created_at: '',
    updated_at: '',
  },
];

export const createAdminBookingCatalogItem = async (payload: {
  category: string;
  name: string;
  amount_ngn: number;
  is_active?: boolean;
  sort_order?: number;
}): Promise<{ message: string; item: BookingCatalogItem }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/admin/catalog`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string; item: BookingCatalogItem }>(response);
};

export const updateAdminBookingCatalogItem = async (
  itemId: number,
  payload: Partial<{
    category: string;
    name: string;
    amount_ngn: number;
    is_active: boolean;
    sort_order: number;
  }>
): Promise<{ message: string; item: BookingCatalogItem }> => {
  const response = await fetch(`${API_BASE_URL}/api/bookings/admin/catalog/${itemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parseJson<{ message: string; item: BookingCatalogItem }>(response);
};

export const BOOKING_PAYMENT_OPTIONS: Array<{ value: BookingPaymentMethod; label: string }> = [
  { value: 'pay_on_pickup', label: 'Pay after service' },
  { value: 'card_payment', label: 'Card payment' },
];
