const permissionCatalog = [
  {
    feature: 'users',
    label: 'Users',
    permissions: [
      { key: 'users.read', name: 'View Users', description: 'Can view user records.' },
      { key: 'users.create', name: 'Create Users', description: 'Can create new users.' },
      { key: 'users.update', name: 'Update Users', description: 'Can update user details and role.' },
      { key: 'users.delete', name: 'Delete Users', description: 'Can delete users.' },
    ],
  },
  {
    feature: 'permissions',
    label: 'Permissions',
    permissions: [
      { key: 'permissions.read', name: 'View Permissions', description: 'Can view permission records.' },
      { key: 'permissions.create', name: 'Create Permissions', description: 'Can create new permissions.' },
      { key: 'permissions.update', name: 'Update Permissions', description: 'Can update permissions.' },
      { key: 'permissions.delete', name: 'Delete Permissions', description: 'Can delete permissions.' },
      { key: 'permissions.assign', name: 'Assign Permissions', description: 'Can assign permissions to users.' },
    ],
  },
  {
    feature: 'blogs',
    label: 'Blogs',
    permissions: [
      { key: 'blogs.create', name: 'Create Blogs', description: 'Can create blog posts.' },
      { key: 'blogs.update', name: 'Update Blogs', description: 'Can update blog posts.' },
      { key: 'blogs.delete', name: 'Delete Blogs', description: 'Can delete blog posts.' },
    ],
  },
  {
    feature: 'categories',
    label: 'Categories',
    permissions: [
      { key: 'categories.create', name: 'Create Categories', description: 'Can create categories.' },
      { key: 'categories.update', name: 'Update Categories', description: 'Can update categories.' },
      { key: 'categories.delete', name: 'Delete Categories', description: 'Can delete categories.' },
    ],
  },
  {
    feature: 'portfolio',
    label: 'Portfolio',
    permissions: [
      { key: 'portfolio.read', name: 'View Portfolio', description: 'Can view portfolio records in dashboard.' },
      { key: 'portfolio.create', name: 'Create Portfolio', description: 'Can create portfolio items.' },
      { key: 'portfolio.update', name: 'Update Portfolio', description: 'Can update portfolio items.' },
      { key: 'portfolio.delete', name: 'Delete Portfolio', description: 'Can delete portfolio items.' },
    ],
  },
  {
    feature: 'footer-gallery',
    label: 'Footer Gallery',
    permissions: [
      { key: 'footer-gallery.read', name: 'View Footer Gallery', description: 'Can view footer gallery records in dashboard.' },
      { key: 'footer-gallery.create', name: 'Create Footer Gallery', description: 'Can create footer gallery items.' },
      { key: 'footer-gallery.update', name: 'Update Footer Gallery', description: 'Can update footer gallery items.' },
      { key: 'footer-gallery.delete', name: 'Delete Footer Gallery', description: 'Can delete footer gallery items.' },
    ],
  },
  {
    feature: 'bookings',
    label: 'Bookings',
    permissions: [
      { key: 'bookings.read', name: 'View Bookings', description: 'Can view booking records in dashboard.' },
      { key: 'bookings.update', name: 'Update Bookings', description: 'Can update booking status and notes.' },
      { key: 'bookings.delete', name: 'Delete Bookings', description: 'Can delete booking records.' },
    ],
  },
];

const flattenPermissionCatalog = () =>
  permissionCatalog.flatMap((group) =>
    group.permissions.map((permission) => ({
      feature: group.feature,
      feature_label: group.label,
      permission_key: permission.key,
      permission_name: permission.name,
      description: permission.description,
    }))
  );

module.exports = {
  permissionCatalog,
  flattenPermissionCatalog,
};
