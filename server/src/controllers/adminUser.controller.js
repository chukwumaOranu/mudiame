const { validationResult } = require('express-validator');
const { listUsers, createUser, updateUser, deleteUser } = require('../models/adminUser.model');

const listAdminUsers = async (_req, res) => {
  try {
    const items = await listUsers();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch users.', error: error.message });
  }
};

const createAdminUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  try {
    const userId = await createUser(req.body);
    return res.status(201).json({ message: 'User created successfully.', id: userId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Username, email, or phone already exists.' });
    }
    return res.status(500).json({ message: 'Unable to create user.', error: error.message });
  }
};

const updateAdminUser = async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user id.' });
  }

  try {
    const updated = await updateUser(userId, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Username, email, or phone already exists.' });
    }
    return res.status(500).json({ message: 'Unable to update user.', error: error.message });
  }
};

const deleteAdminUser = async (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user id.' });
  }

  try {
    const removed = await deleteUser(userId);
    if (!removed) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete user.', error: error.message });
  }
};

module.exports = {
  listAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
};
