import express from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import Service from '../models/Service.js';

const router = express.Router();

// Get all services (public) - with category population
router.get('/', async (req, res) => {
  try {
    const services = await Service.find()
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Get services grouped by categories (public)
router.get('/grouped/categories', async (req, res) => {
  try {
    const services = await Service.find()
      .populate('category', 'name slug order description')
      .sort({ createdAt: -1 });

    // Group services by category
    const groupedServices = {};
    services.forEach(service => {
      if (!service.category) return; // Skip if category is null

      const categoryName = service.category.name;
      if (!groupedServices[categoryName]) {
        groupedServices[categoryName] = {
          category: service.category,
          services: []
        };
      }
      groupedServices[categoryName].services.push(service);
    });

    // Convert to array and sort by category order
    const result = Object.values(groupedServices).sort((a, b) => a.category.order - b.category.order);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get grouped services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Get featured services (public)
router.get('/featured', async (req, res) => {
  try {
    const services = await Service.find({ featured: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Get featured services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Get service by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }
    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Create service (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const serviceData = req.body;

    // Validate required fields
    const requiredFields = ['title', 'slug', 'category', 'shortDesc'];
    for (const field of requiredFields) {
      if (!serviceData[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // Check if slug already exists
    const existingService = await Service.findOne({ slug: serviceData.slug });
    if (existingService) {
      return res.status(400).json({
        success: false,
        message: 'Service with this slug already exists',
      });
    }

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Update service (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const serviceData = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      serviceData,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

export default router;