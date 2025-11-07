import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import Setting from '../models/Setting.js';

const router = express.Router();

// Get all settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    const settingsObj = {};

    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });

    // existing default
    if (!settingsObj.service_page_hero_image) {
      settingsObj.service_page_hero_image = '/assets/service-traditional.jpg';
    }

    // ✅ NEW: sensible defaults for Gallery page hero (optional)
    if (!settingsObj.gallery_page_hero_image) {
      settingsObj.gallery_page_hero_image = ''; // no default image
    }
    if (!settingsObj.gallery_page_hero_title) {
      settingsObj.gallery_page_hero_title = 'Gallery';
    }
    if (!settingsObj.gallery_page_hero_subtitle) {
      settingsObj.gallery_page_hero_subtitle = 'Explore our ambience, rooms, and wellness experience.';
    }

    res.json({ success: true, data: settingsObj });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Get setting by key (public)
router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
    }

    res.json({
      success: true,
      data: {
        key: setting.key,
        value: setting.value,
      },
    });
  } catch (error) {
    console.error('Get setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update or create setting (admin only)
router.put('/:key', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Value is required',
      });
    }

    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Setting updated successfully',
      data: setting,
    });
  } catch (error) {
    console.error('Update setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Bulk update settings (admin only)
router.put('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const settingsData = req.body;
    const updatedSettings = [];

    for (const [key, value] of Object.entries(settingsData)) {
      // Skip empty values to avoid validation errors
      if (value === '' || value === null || value === undefined) {
        continue;
      }

      const setting = await Setting.findOneAndUpdate(
        { key },
        { value },
        { new: true, upsert: true, runValidators: true }
      );
      updatedSettings.push(setting);
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedSettings,
    });
  } catch (error) {
    console.error('Bulk update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Delete setting (admin only)
router.delete('/:key', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const setting = await Setting.findOneAndDelete({ key: req.params.key });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Setting not found',
      });
    }

    res.json({
      success: true,
      message: 'Setting deleted successfully',
    });
  } catch (error) {
    console.error('Delete setting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;