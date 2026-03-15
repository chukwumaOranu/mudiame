export type AuthUser = {
  id: number;
  full_name: string;
  username: string;
  email: string;
  phone: string | null;
  status: string;
  is_email_verified: boolean;
  last_login_at: string | null;
  roles: string[];
};

export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  full_name: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  role?: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};
