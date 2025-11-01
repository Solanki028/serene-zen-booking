import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// Get all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create testimonial (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const testimonialData = req.body;

    // Validate required fields
    const requiredFields = ['name', 'quote'];
    for (const field of requiredFields) {
      if (!testimonialData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const testimonial = new Testimonial(testimonialData);
    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update testimonial (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const testimonialData = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      testimonialData,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;