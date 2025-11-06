import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import AboutContent from '../models/AboutContent.js';

const router = express.Router();

// Get about page content (public)
router.get('/', async (req, res) => {
  try {
    let aboutContent = await AboutContent.findOne();

    // If no content exists, return default structure
    if (!aboutContent) {
      aboutContent = {
        mission: 'To provide authentic Thai massage and holistic wellness experiences that promote healing, relaxation, and well-being for our community.',
        timeline: [
          { year: '2008', event: 'Velora Thai Spa opens its doors' },
          { year: '2012', event: 'Expanded to second location' },
          { year: '2015', event: 'Introduced membership program' },
          { year: '2020', event: 'Launched online booking system' },
        ],
        values: [
          { icon: 'Heart', title: 'Authenticity', description: 'Traditional Thai healing techniques' },
          { icon: 'Users', title: 'Expertise', description: 'Certified and experienced therapists' },
          { icon: 'Shield', title: 'Safety', description: 'Highest hygiene and safety standards' },
          { icon: 'Award', title: 'Quality', description: 'Premium service excellence' },
        ],
        awards: [
          { title: 'Best Spa 2023', description: 'Local business excellence award', year: '2023' },
          { title: 'Customer Choice Award', description: 'Highest rated wellness center', year: '2022' },
        ],
        gallery: [],
      };
    }

    res.json({
      success: true,
      data: aboutContent,
    });
  } catch (error) {
    console.error('Get about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update about page content (admin only)
router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const aboutData = req.body;

    const aboutContent = await AboutContent.findOneAndUpdate(
      {}, // Empty filter to match any document
      aboutData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'About page content updated successfully',
      data: aboutContent,
    });
  } catch (error) {
    console.error('Update about content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;