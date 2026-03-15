import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTopbar from "../components/AdminTopbar";
import BlogListPanel from "../components/BlogListPanel";
import CategoriesPanel from "../components/CategoriesPanel";
import CreateBlogPanel from "../components/CreateBlogPanel";
import PermissionsPanel from "../components/PermissionsPanel";
import PortfolioPanel from "../components/PortfolioPanel";
import UsersPanel from "../components/UsersPanel";
import { useCurrentUserQuery, useLogoutMutation } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import type { AuthState } from "../../store/authStore";
import "../styles/dashboard.css";

type AdminView =
  | "overview"
  | "blogs"
  | "createBlog"
  | "categories"
  | "users"
  | "permissions"
  | "bookings"
  | "portfolio";

const menuItems: { key: AdminView; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "blogs", label: "Blogs (List of Blogs)" },
  { key: "createBlog", label: "Create Blog" },
  { key: "categories", label: "Add Categories" },
  { key: "users", label: "Users" },
  { key: "permissions", label: "Permissions" },
  { key: "bookings", label: "Bookings" },
  { key: "portfolio", label: "Portfolio" },
];

const OverviewWelcome = ({ userName }: { userName: string }) => (
  <div className="admin-overview-welcome">
    <div className="admin-overview-hero">
      <p className="admin-overview-kicker">Welcome Back</p>
      <h3>{userName}</h3>
      <p>
        Mudiame Lush is a vibrant Nigerian beauty brand redefining everyday
        glamour with quality, creativity, and confidence. Manage your content,
        products, and campaigns from this dashboard.
      </p>
    </div>
    <div className="admin-overview-grid">
      <div className="admin-overview-card">
        <h4>Signature Collection</h4>
        <p>
          Nail Polish, Lip Glosses, Eyeshadow Palettes, and Lip Pencils crafted
          for bold expression and effortless elegance.
        </p>
      </div>
      <div className="admin-overview-card">
        <h4>General Beauty Line</h4>
        <p>
          Face masks, foot masks, hair oils, body oils, and complete
          self-care essentials focused on quality and results.
        </p>
      </div>
      <div className="admin-overview-card">
        <h4>Quick Price Guide</h4>
        <p>
          Gel Polish: N7,000 | Lip Gloss: N4,000 | Eyeshadow Palette:
          N12,000 | Lip Pencil: N3,000
        </p>
      </div>
    </div>
  </div>
);

const AdminLandingPage = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state: AuthState) => state.token);
  const user = useAuthStore((state: AuthState) => state.user);
  const setUser = useAuthStore((state: AuthState) => state.setUser);
  const clearSession = useAuthStore((state: AuthState) => state.clearSession);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>("overview");
  const currentUserQuery = useCurrentUserQuery(token);
  const logoutMutation = useLogoutMutation();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (currentUserQuery.isError) {
      clearSession();
      navigate("/admin/login", { replace: true });
    }
  }, [currentUserQuery.isError, clearSession, navigate]);

  useEffect(() => {
    if (currentUserQuery.data?.user) {
      setUser(currentUserQuery.data.user);
    }
  }, [currentUserQuery.data, setUser]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate("/admin/login", { replace: true });
  };

  const handleSelectView = (view: AdminView) => {
    setActiveView(view);
    setMenuOpen(false);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "blogs":
        return {
          title: "Blogs",
          description:
            "This is your Blogs view. Add your blog table/list view here with search, filters, and publish status.",
          content: <BlogListPanel />,
        };
      case "createBlog":
        return {
          title: "Create Blog",
          description:
            "This is your Create Blog view. Add the post editor, category selector, image upload, and publish actions here.",
          content: <CreateBlogPanel />,
        };
      case "categories":
        return {
          title: "Categories",
          description:
            "Manage blog categories here. Create, update, and remove categories used in blog posts.",
          content: <CategoriesPanel />,
        };
      case "users":
        return {
          title: "Users",
          description:
            "Manage application users here. Create, update role/status, and remove users.",
          content: <UsersPanel />,
        };
      case "permissions":
        return {
          title: "Permissions",
          description:
            "Create permissions and assign them directly to users from this panel.",
          content: <PermissionsPanel />,
        };
      case "bookings":
        return {
          title: "Bookings",
          description:
            "This is your Bookings view. Add booking lists, customer details, and booking status management here.",
          content: null,
        };
      case "portfolio":
        return {
          title: "Portfolio",
          description:
            "Manage portfolio gallery items shown on the home page. Create, update, reorder, and delete images by category.",
          content: <PortfolioPanel />,
        };
      default:
        return {
          title: "Overview",
          description:
            "Your control center for Mudiame Lush operations and content.",
          content: <OverviewWelcome userName={user?.full_name || "Admin"} />,
        };
    }
  };

  const currentView = renderActiveView();

  if (!token || currentUserQuery.isLoading) {
    return (
      <div className="admin-shell">
        <div className="admin-main">
          <section className="admin-panel admin-view-panel">
            <h2>Loading dashboard...</h2>
            <p>Checking your login session.</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <AdminTopbar
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((previous) => !previous)}
        user={user}
        onLogout={handleLogout}
        isLoggingOut={logoutMutation.isPending}
      />
      <main className="admin-main">
        <section className="admin-panel admin-menu-panel">
          <h2>Dashboard Menu</h2>
          <p>Choose a section below. The selected view loads in the same page.</p>
          <div
            id="admin-menu"
            className={`admin-nav admin-main-nav ${menuOpen ? "open" : ""}`}
          >
            {menuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`admin-nav-btn ${
                  activeView === item.key ? "active" : ""
                }`}
                onClick={() => handleSelectView(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>
        <section className="admin-panel admin-view-panel">
          <h2>{currentView.title}</h2>
          <p>{currentView.description}</p>
          {currentView.content && (
            <div className="admin-section-content">{currentView.content}</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminLandingPage;
