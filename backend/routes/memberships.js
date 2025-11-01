import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import Membership from '../models/Membership.js';

const router = express.Router();

// Get all memberships (public)
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ order: 1 });
    res.json({
      success: true,
      data: memberships,
    });
  } catch (error) {
    console.error('Get memberships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create membership (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const membershipData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'price', 'billingCycle'];
    for (const field of requiredFields) {
      if (!membershipData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const membership = new Membership(membershipData);
    await membership.save();

    res.status(201).json({
      success: true,
      message: 'Membership created successfully',
      data: membership,
    });
  } catch (error) {
    console.error('Create membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update membership (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const membershipData = req.body;

    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      membershipData,
      { new: true, runValidators: true }
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found',
      });
    }

    res.json({
      success: true,
      message: 'Membership updated successfully',
      data: membership,
    });
  } catch (error) {
    console.error('Update membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Delete membership (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership not found',
      });
    }

    res.json({
      success: true,
      message: 'Membership deleted successfully',
    });
  } catch (error) {
    console.error('Delete membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;