import mongoose from 'mongoose';

const aboutContentSchema = new mongoose.Schema({
  mission: {
    type: String,
    required: true,
  },
  timeline: [{
    year: { type: String, required: true },
    event: { type: String, required: true },
  }],
  values: [{
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  }],
  awards: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: String, required: true },
  }],
  gallery: [{
    type: String, // Cloudinary URLs
  }],
}, {
  timestamps: true,
});

export default mongoose.models.AboutContent || mongoose.model('AboutContent', aboutContentSchema);