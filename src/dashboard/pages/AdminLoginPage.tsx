import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/useAuth";
import "../styles/dashboard.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      return;
    }

    try {
      await loginMutation.mutateAsync({ identifier: identifier.trim(), password });
      navigate("/admin");
    } catch (_error) {
      // Error text is handled from mutation state.
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Sign in with your username/email and password.</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-identifier">Username or Email</label>
            <input
              id="admin-identifier"
              type="text"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Enter username or email"
              autoComplete="username"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="admin-login-btn">
            {loginMutation.isPending ? "Signing In..." : "Login"}
          </button>
          {loginMutation.isError && (
            <p className="admin-form-error">
              {(loginMutation.error as Error).message || "Unable to login."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
