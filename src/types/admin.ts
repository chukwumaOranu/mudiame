export type AdminUser = {
  id: number;
  full_name: string;
  username: string;
  email: string;
  phone: string | null;
  status: 'active' | 'inactive' | 'suspended';
  is_email_verified: boolean;
  last_login_at: string | null;
  created_at: string;
  roles: string[];
  direct_permissions: string[];
};

export type AdminPermission = {
  id: number;
  permission_key: string;
  permission_name: string;
  description: string | null;
  user_count: number;
};
