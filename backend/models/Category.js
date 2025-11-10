import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // Cloudinary URL for category image
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

 // Generate slug BEFORE validation so "required: true" passes
 categorySchema.pre('validate', function(next) {
   if (this.isModified('name') || !this.slug) {
     if (this.name) {
       this.slug = this.name
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, '-')
         .replace(/^-+|-+$/g, '');
     }
   }
   next();
 });
export default mongoose.models.Category || mongoose.model('Category', categorySchema);