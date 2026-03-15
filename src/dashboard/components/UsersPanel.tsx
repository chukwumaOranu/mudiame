import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from '../../api/adminApi';
import type { AdminUser } from '../../types/admin';

const UsersPanel = () => {
  const queryClient = useQueryClient();
  const usersQuery = useQuery({
    queryKey: ['dashboard', 'users'],
    queryFn: getAdminUsers,
  });

  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [status, setStatus] = useState<'active' | 'inactive' | 'suspended'>('active');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createMutation = useMutation({
    mutationFn: () =>
      createAdminUser({
        full_name: fullName,
        username,
        email,
        phone,
        password,
        role,
      }),
    onSuccess: (data) => {
      setFullName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('customer');
      setSuccessMessage(data.message || 'User created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'users'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateAdminUser(editing!.id, {
        full_name: fullName,
        username,
        email,
        phone,
        role,
        status,
        ...(password ? { password } : {}),
      }),
    onSuccess: (data) => {
      setEditing(null);
      setFullName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('customer');
      setStatus('active');
      setSuccessMessage(data.message || 'User updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'users'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteAdminUser(userId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'User deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'users'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!fullName.trim() || !username.trim() || !email.trim()) {
      return;
    }

    if (editing) {
      await updateMutation.mutateAsync();
      return;
    }

    if (!password.trim()) {
      return;
    }

    await createMutation.mutateAsync();
  };

  const onEdit = (user: AdminUser) => {
    setSuccessMessage('');
    setErrorMessage('');
    setEditing(user);
    setFullName(user.full_name);
    setUsername(user.username);
    setEmail(user.email);
    setPhone(user.phone || '');
    setPassword('');
    setRole(user.roles[0] || 'customer');
    setStatus(user.status);
  };

  const items = usersQuery.data?.items || [];

  return (
    <div>
      <form className="admin-blog-form" onSubmit={onSubmit}>
        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Full Name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>

        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <div className="admin-form-group">
            <label>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>{editing ? 'New Password (optional)' : 'Password'}</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
          <div className="admin-form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">customer</option>
              <option value="admin">admin</option>
              <option value="editor">editor</option>
            </select>
          </div>
        </div>

        {editing && (
          <div className="admin-form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'suspended')}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="suspended">suspended</option>
            </select>
          </div>
        )}

        <div className="admin-actions-inline">
          <button type="submit" className="admin-login-btn" disabled={createMutation.isPending || updateMutation.isPending}>
            {editing ? 'Update User' : 'Create User'}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => {
                setEditing(null);
                setFullName('');
                setUsername('');
                setEmail('');
                setPhone('');
                setPassword('');
                setRole('customer');
                setStatus('active');
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {(createMutation.isError || updateMutation.isError) && (
          <p className="admin-form-error">{errorMessage || (createMutation.error as Error)?.message || (updateMutation.error as Error)?.message}</p>
        )}
        {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      </form>

      <div className="admin-section-content">
        {usersQuery.isLoading && <p>Loading users...</p>}
        {usersQuery.isError && <p className="admin-form-error">Unable to load users.</p>}

        {items.length > 0 && (
          <div className="admin-blog-table-wrap">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((user) => (
                  <tr key={user.id}>
                    <td>{user.full_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.roles[0] || 'customer'}</td>
                    <td>
                      <span className={`admin-status-chip status-${user.status}`}>{user.status}</span>
                    </td>
                    <td>
                      <div className="admin-actions-inline">
                        <button type="button" className="admin-menu-toggle" onClick={() => onEdit(user)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-danger-btn"
                          onClick={() => deleteMutation.mutate(user.id)}
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

export default UsersPanel;
