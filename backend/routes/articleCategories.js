import express from 'express';
import ArticleCategory from '../models/ArticleCategory.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all article categories
router.get('/', async (req, res) => {
  try {
    const categories = await ArticleCategory.find({ isActive: true }).sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching article categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all article categories (admin)
router.get('/admin', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const categories = await ArticleCategory.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching article categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single article category by ID or slug
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Try to find by slug first, then by ID if not found
    let category = await ArticleCategory.findOne({ slug: identifier });

    if (!category) {
      // If not found by slug, try by ID (only if it's a valid ObjectId)
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        category = await ArticleCategory.findById(identifier);
      }
    }

    if (!category) {
      return res.status(404).json({ message: 'Article category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error('Error fetching article category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create article category (admin only) - TEMPORARILY DISABLED AUTH FOR TESTING
router.post('/', async (req, res) => {
  try {
    const { name, description, image, order } = req.body;

    // Check if category already exists
    const existingCategory = await ArticleCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Article category already exists' });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingSlug = await ArticleCategory.findOne({ slug });
    if (existingSlug) {
      return res.status(400).json({ message: 'Article category with this slug already exists' });
    }

    const category = new ArticleCategory({
      name,
      slug,
      description,
      image,
      order: order || 0,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating article category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update article category (admin only) - TEMPORARILY DISABLED AUTH FOR TESTING
router.put('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    const { name, description, image, order, isActive } = req.body;

    // Find the category first by slug OR id
    let category = await ArticleCategory.findOne({ slug: identifier });
    if (!category) {
      // Only try to find by ID if it's a valid ObjectId format
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        category = await ArticleCategory.findById(identifier);
      }
    }

    if (!category) {
      return res.status(404).json({ message: 'Article category not found' });
    }

    // Generate new slug if name changed
    let slug = category.slug; // Keep existing slug by default
    if (name && name !== category.name) {
      slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Check if new slug already exists (but not for this same category)
      const existingSlug = await ArticleCategory.findOne({ slug, _id: { $ne: category._id } });
      if (existingSlug) {
        return res.status(400).json({ message: 'Article category with this slug already exists' });
      }
    }

    // Update the category
    category.name = name || category.name;
    category.slug = slug;
    category.description = description !== undefined ? description : category.description;
    category.image = image !== undefined ? image : category.image;
    category.order = order !== undefined ? order : category.order;
    category.isActive = isActive !== undefined ? isActive : category.isActive;

    await category.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating article category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete article category (admin only)
router.delete('/:identifier', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { identifier } = req.params;

    // Find and delete by slug
    const category = await ArticleCategory.findOneAndDelete({ slug: identifier });

    if (!category) {
      return res.status(404).json({ message: 'Article category not found' });
    }

    res.json({ message: 'Article category deleted successfully' });
  } catch (error) {
    console.error('Error deleting article category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update article category order (admin only)
router.put('/order/update', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { categories } = req.body; // Array of { id, order }

    for (const cat of categories) {
      await ArticleCategory.findByIdAndUpdate(cat.id, { order: cat.order });
    }

    res.json({ message: 'Article category order updated successfully' });
  } catch (error) {
    console.error('Error updating article category order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;