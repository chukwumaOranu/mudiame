const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {
  getUserByIdentifier,
  getUserById,
  getUserByUsernameOrEmail,
  createUserWithRole,
  updateLastLoginAt,
} = require('../models/auth.model');

const toUserPayload = (userRow) => ({
  id: userRow.id,
  full_name: userRow.full_name,
  username: userRow.username,
  email: userRow.email,
  phone: userRow.phone,
  status: userRow.status,
  is_email_verified: Boolean(userRow.is_email_verified),
  last_login_at: userRow.last_login_at,
  roles: userRow.role_keys ? userRow.role_keys.split(',').filter(Boolean) : [],
});

const signAccessToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
    email: user.email,
    roles: user.roles,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'change-this-in-env', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

const register = async (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: validation.array() });
  }

  const { full_name, username, email, phone, password, role } = req.body;

  try {
    const existingUser = await getUserByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await createUserWithRole({
      fullName: full_name,
      username,
      email,
      phone,
      passwordHash,
      roleKey: role || 'customer',
    });

    const user = await getUserById(userId);
    if (!user) {
      return res.status(500).json({ message: 'User was created but could not be loaded.' });
    }

    const userPayload = toUserPayload(user);
    const token = signAccessToken(userPayload);

    return res.status(201).json({
      message: 'Registration successful.',
      token,
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to register user.', error: error.message });
  }
};

const login = async (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: validation.array() });
  }

  const { identifier, password } = req.body;

  try {
    const user = await getUserByIdentifier(identifier);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    await updateLastLoginAt(user.id);
    const refreshedUser = await getUserById(user.id);
    const userPayload = toUserPayload(refreshedUser || user);
    const token = signAccessToken(userPayload);

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: userPayload,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to login user.', error: error.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await getUserById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ user: toUserPayload(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch user profile.', error: error.message });
  }
};

const logout = async (_req, res) => {
  return res.status(200).json({ message: 'Logout successful.' });
};

module.exports = {
  register,
  login,
  me,
  logout,
};
