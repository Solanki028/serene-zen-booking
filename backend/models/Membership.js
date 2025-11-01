import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['monthly', 'yearly', 'one-time'],
  },
  perks: [{
    type: String,
  }],
  terms: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Membership || mongoose.model('Membership', membershipSchema);