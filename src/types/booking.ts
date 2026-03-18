export type BookingPaymentMethod = 'pay_on_pickup' | 'card_payment';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type BookingRequestPayload = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  product_category: string;
  product_name: string;
  consultant_preference: string;
  preferred_date: string;
  start_time: string;
  finish_time: string;
  selected_slot?: string | null;
  payment_method: BookingPaymentMethod;
  customer_note?: string;
};

export type BookingRecord = BookingRequestPayload & {
  id: number;
  booking_reference: string;
  payment_status: 'unpaid' | 'pending' | 'initiated' | 'paid' | 'failed';
  payment_reference: string | null;
  payment_authorization_url: string | null;
  amount_ngn: number | null;
  status: BookingStatus;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type BookingCatalogItem = {
  id: number;
  category: string;
  name: string;
  amount_ngn: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
