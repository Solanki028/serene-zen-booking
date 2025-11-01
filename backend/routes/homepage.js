import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import HomepageContent from '../models/HomepageContent.js';

const router = express.Router();

// Get homepage content (public)
router.get('/', async (req, res) => {
  try {
    let homepageContent = await HomepageContent.findOne();

    // If no content exists, return default structure
    if (!homepageContent) {
      homepageContent = {
        heroHeadline: 'Authentic Thai Massage & Wellness',
        heroSubheadline: 'Experience the healing traditions of Thailand. Expert therapists, serene environment, personalized care since 2008.',
        heroImage: '/assets/hero-spa.jpg',
        trustBadges: [
          { icon: 'Award', title: 'Since 2008', description: '17 years of excellence' },
          { icon: 'Users', title: 'Expert Therapists', description: 'Certified Thai practitioners' },
          { icon: 'Shield', title: 'Highest Hygiene', description: 'Premium cleanliness standards' },
          { icon: 'Heart', title: 'Personalized Care', description: 'Tailored to your needs' },
        ],
        featuredServiceIds: [],
        membershipTeaser: {
          title: 'Wellness Made Affordable',
          description: 'Join our membership program and enjoy premium spa experiences at exceptional value',
          benefits: ['Priority booking', 'Exclusive discounts up to 30%', 'Complimentary add-ons', 'Rollover unused sessions'],
        },
        giftVoucherBanner: {
          title: 'Give the Gift of Wellness',
          description: 'Share the joy of relaxation with our customizable gift vouchers. Perfect for every occasion.',
        },
      };
    }

    res.json({
      success: true,
      data: homepageContent,
    });
  } catch (error) {
    console.error('Get homepage content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update homepage content (admin only)
router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const homepageData = req.body;

    const homepageContent = await HomepageContent.findOneAndUpdate(
      {}, // Empty filter to match any document
      homepageData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Homepage content updated successfully',
      data: homepageContent,
    });
  } catch (error) {
    console.error('Update homepage content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;