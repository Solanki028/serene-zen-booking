import mongoose from 'mongoose';

const homepageContentSchema = new mongoose.Schema({
  heroHeadline: {
    type: String,
    required: true,
  },
  heroSubheadline: {
    type: String,
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  trustBadges: [{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  }],
  featuredServiceIds: [{
    type: String, // Service IDs
  }],
  membershipTeaser: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
  },
  giftVoucherBanner: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
}, {
  timestamps: true,
});

export default mongoose.models.HomepageContent || mongoose.model('HomepageContent', homepageContentSchema);