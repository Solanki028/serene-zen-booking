import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  longDesc: {
    type: String,
  },
  benefits: [{
    type: String,
  }],
  durations: [{
    minutes: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  images: [{
    type: String, // Cloudinary URLs
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  contraindications: {
    type: String,
  },
  faqs: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
  }],
}, {
  timestamps: true,
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);