const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

class AuthService {
  async register(email, password, name) {
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const userData = {
      email,
      password: password,
      name
    };
    const user = await User.create(userData);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }
  async login(email, password) {
    const user = await User.login( email, password );
    if (!user) {
      throw new Error('User not found');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: token,
      user:user
    };

}

async googleLogin(payload) {
  const { email, displayName, photoURL,uid } = payload;

  if (!email) {
    throw new Error('Email is required');
  }

  // 🔍 Check existing user
  let user = await User.findByEmail(email);

  if (user) {
    // Update last login only
    await User.updateLastLogin(email);
    return user;
  }

  // 🆕 Create new user
  const newUser = {
    email,
    name: displayName || email, // Use displayName from payload
    photoUrl: photoURL, // Map photoURL to photoUrl
    googleId: uid, // Map uid to googleId
    provider: 'google',
    lastLogin: new Date(),
    createdAt: new Date()
  };

   const createdUser = await User.create(newUser);
  return createdUser;
};

}
module.exports = new AuthService();