import AdminProfileBadge from "./AdminProfileBadge";
import type { AuthUser } from "../../types/auth";
import { IMAGE } from "../../constent/theme";

type AdminTopbarProps = {
  onToggleMenu: () => void;
  menuOpen: boolean;
  user: AuthUser | null;
  onLogout: () => void;
  isLoggingOut: boolean;
};

const AdminTopbar = ({
  onToggleMenu,
  menuOpen,
  user,
  onLogout,
  isLoggingOut,
}: AdminTopbarProps) => {
  return (
    <div className="admin-topbar">
      <div className="admin-topbar-inner">
        <div className="admin-brand">
          <img src={IMAGE.logoBlack} alt="Mudiame" className="admin-brand-logo" />
        </div>
        <div className="admin-topbar-actions">
          <AdminProfileBadge user={user} />
          <button
            type="button"
            className="admin-menu-toggle"
            onClick={onToggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="admin-menu"
          >
            {menuOpen ? "Hide Menu" : "Show Menu"}
          </button>
          <button
            type="button"
            className="admin-logout-btn"
            onClick={onLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Signing Out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
