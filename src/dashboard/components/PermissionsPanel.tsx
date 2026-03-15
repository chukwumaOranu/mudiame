import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assignPermissionsToUser,
  createAdminPermission,
  deleteAdminPermission,
  getAdminPermissions,
  getAdminUsers,
  updateAdminPermission,
} from '../../api/adminApi';
import type { AdminPermission } from '../../types/admin';

const PermissionsPanel = () => {
  const queryClient = useQueryClient();

  const permissionsQuery = useQuery({
    queryKey: ['dashboard', 'permissions'],
    queryFn: getAdminPermissions,
  });

  const usersQuery = useQuery({
    queryKey: ['dashboard', 'users'],
    queryFn: getAdminUsers,
  });

  const [editing, setEditing] = useState<AdminPermission | null>(null);
  const [permissionName, setPermissionName] = useState('');
  const [permissionKey, setPermissionKey] = useState('');
  const [description, setDescription] = useState('');

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createMutation = useMutation({
    mutationFn: () =>
      createAdminPermission({
        permission_name: permissionName,
        permission_key: permissionKey,
        description,
      }),
    onSuccess: (data) => {
      setPermissionName('');
      setPermissionKey('');
      setDescription('');
      setSuccessMessage(data.message || 'Permission created successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'permissions'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updateAdminPermission(editing!.id, {
        permission_name: permissionName,
        permission_key: permissionKey,
        description,
      }),
    onSuccess: (data) => {
      setEditing(null);
      setPermissionName('');
      setPermissionKey('');
      setDescription('');
      setSuccessMessage(data.message || 'Permission updated successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'permissions'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const deleteMutation = useMutation({
    mutationFn: (permissionId: number) => deleteAdminPermission(permissionId),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Permission deleted successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'permissions'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const assignMutation = useMutation({
    mutationFn: () => assignPermissionsToUser(selectedUserId as number, selectedPermissionIds),
    onSuccess: (data) => {
      setSuccessMessage(data.message || 'Permissions assigned successfully.');
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'users'] });
    },
    onError: (error) => setErrorMessage((error as Error).message),
  });

  const onPermissionSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!permissionName.trim()) {
      return;
    }

    if (editing) {
      await updateMutation.mutateAsync();
      return;
    }

    await createMutation.mutateAsync();
  };

  const onAssignSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!selectedUserId) {
      return;
    }
    await assignMutation.mutateAsync();
  };

  const permissions = permissionsQuery.data?.items || [];
  const users = usersQuery.data?.items || [];

  return (
    <div>
      <form className="admin-blog-form" onSubmit={onPermissionSubmit}>
        <div className="admin-blog-grid-two">
          <div className="admin-form-group">
            <label>Permission Name</label>
            <input value={permissionName} onChange={(e) => setPermissionName(e.target.value)} />
          </div>
          <div className="admin-form-group">
            <label>Permission Key (optional)</label>
            <input value={permissionKey} onChange={(e) => setPermissionKey(e.target.value)} placeholder="blog.create" />
          </div>
        </div>

        <div className="admin-form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>

        <div className="admin-actions-inline">
          <button type="submit" className="admin-login-btn" disabled={createMutation.isPending || updateMutation.isPending}>
            {editing ? 'Update Permission' : 'Create Permission'}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => {
                setEditing(null);
                setPermissionName('');
                setPermissionKey('');
                setDescription('');
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
        {errorMessage && <p className="admin-form-error">{errorMessage}</p>}
        {successMessage && <p className="admin-success-msg">{successMessage}</p>}
      </form>

      <div className="admin-section-content">
        <form className="admin-blog-form" onSubmit={onAssignSubmit}>
          <h3 className="admin-subtitle">Assign Permissions to User</h3>
          <div className="admin-blog-grid-two">
            <div className="admin-form-group">
              <label>User</label>
              <select
                value={selectedUserId || ''}
                onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Select user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} (@{user.username})
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Permissions</label>
              <select
                multiple
                value={selectedPermissionIds.map(String)}
                onChange={(e) =>
                  setSelectedPermissionIds(Array.from(e.target.selectedOptions).map((opt) => Number(opt.value)))
                }
                className="admin-multi-select"
              >
                {permissions.map((permission) => (
                  <option key={permission.id} value={permission.id}>
                    {permission.permission_key}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="admin-login-btn" disabled={assignMutation.isPending || !selectedUserId}>
            {assignMutation.isPending ? 'Assigning...' : 'Assign Permissions'}
          </button>
        </form>
      </div>

      <div className="admin-section-content">
        {permissions.length > 0 && (
          <div className="admin-blog-table-wrap">
            <table className="admin-blog-table">
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Key</th>
                  <th>Assigned Users</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr key={permission.id}>
                    <td>{permission.permission_name}</td>
                    <td>{permission.permission_key}</td>
                    <td>{permission.user_count}</td>
                    <td>
                      <div className="admin-actions-inline">
                        <button
                          type="button"
                          className="admin-menu-toggle"
                          onClick={() => {
                            setEditing(permission);
                            setPermissionName(permission.permission_name);
                            setPermissionKey(permission.permission_key);
                            setDescription(permission.description || '');
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-danger-btn"
                          onClick={() => deleteMutation.mutate(permission.id)}
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

export default PermissionsPanel;
