import type { AuthUser } from '../../types/auth';

type AdminProfileBadgeProps = {
  user: AuthUser | null;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

const AdminProfileBadge = ({ user }: AdminProfileBadgeProps) => {
  const displayName = user?.full_name || 'Admin User';
  const handle = user?.username ? `@${user.username}` : '@admin';
  const initials = getInitials(displayName || 'Admin User');

  return (
    <div className="admin-profile-badge" title={displayName}>
      <div className="admin-avatar">{initials}</div>
      <div className="admin-profile-meta">
        <span className="admin-profile-name">{displayName}</span>
        <span className="admin-profile-handle">{handle}</span>
      </div>
    </div>
  );
};

export default AdminProfileBadge;
