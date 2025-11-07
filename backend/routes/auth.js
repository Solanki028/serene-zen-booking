import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // ✅ NEW: set cookies (duplicate: one scoped to /cms, one to /)
    const isProd = process.env.NODE_ENV === 'production';
    const baseCookie = {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProd,
      maxAge: 24 * 60 * 60 * 1000, // 24h
    };

    // keep your CMS-scoped cookie
    res.cookie('cms_token', token, { ...baseCookie, path: '/cms' });
    // add a root-scoped cookie so requests to /api/* include it
    res.cookie('auth_token', token, { ...baseCookie, path: '/' });

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: { id: admin._id, email: admin.email },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token required',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id);

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }

      return res.json({
        success: true,
        data: {
          admin: { id: admin._id, email: admin.email },
        },
      });
    } catch {
      return res.status(401).json({
        success: false,
        message: 'Token expired or invalid',
      });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during token verification',
    });
  }
});

// Create initial admin (one-time setup)
router.post('/setup', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists',
      });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = new Admin({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await admin.save();

    return res.json({
      success: true,
      message: 'Admin created successfully',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;
