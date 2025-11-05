import express from 'express';
import MemberRegistration from '../models/MemberRegistration.js';

const router = express.Router();

// Get all member registrations (admin only) with pagination and search
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    let query = {};

    // Add search functionality
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const totalRegistrations = await MemberRegistration.countDocuments(query);
    const totalPages = Math.ceil(totalRegistrations / limit);

    const registrations = await MemberRegistration.find(query)
      .populate('plan', 'name price billingCycle')
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: registrations,
      pagination: {
        currentPage: page,
        totalPages,
        totalRegistrations,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching member registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch member registrations',
    });
  }
});

// Create new member registration
router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, plan } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !plan) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if email already exists
    const existingRegistration = await MemberRegistration.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const registration = new MemberRegistration({
      name,
      email,
      mobile,
      plan,
    });

    await registration.save();

    const populatedRegistration = await MemberRegistration.findById(registration._id)
      .populate('plan', 'name price billingCycle');

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: populatedRegistration,
    });
  } catch (error) {
    console.error('Error creating member registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit registration',
    });
  }
});

// Update registration status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const registration = await MemberRegistration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('plan', 'name price billingCycle');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.json({
      success: true,
      message: 'Registration status updated',
      data: registration,
    });
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update registration status',
    });
  }
});

// Delete registration (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const registration = await MemberRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
    });
  }
});

export default router;