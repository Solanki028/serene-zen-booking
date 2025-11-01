import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import models
import HomepageContent from '../backend/models/HomepageContent.js';
import Service from '../backend/models/Service.js';
import Membership from '../backend/models/Membership.js';
import Testimonial from '../backend/models/Testimonial.js';
import Setting from '../backend/models/Setting.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for migration');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Current static content from components
const staticContent = {
  homepage: {
    heroHeadline: 'Authentic Thai Massage & Wellness',
    heroSubheadline: 'Experience the healing traditions of Thailand. Expert therapists, serene environment, personalized care since 2008.',
    heroImage: '/assets/hero-spa.jpg',
    trustBadges: [
      { icon: 'Award', title: 'Since 2008', description: '17 years of excellence' },
      { icon: 'Users', title: 'Expert Therapists', description: 'Certified Thai practitioners' },
      { icon: 'Shield', title: 'Highest Hygiene', description: 'Premium cleanliness standards' },
      { icon: 'Heart', title: 'Personalized Care', description: 'Tailored to your needs' },
    ],
    membershipTeaser: {
      title: 'Wellness Made Affordable',
      description: 'Join our membership program and enjoy premium spa experiences at exceptional value',
      benefits: ['Priority booking', 'Exclusive discounts up to 30%', 'Complimentary add-ons', 'Rollover unused sessions'],
    },
    giftVoucherBanner: {
      title: 'Give the Gift of Wellness',
      description: 'Share the joy of relaxation with our customizable gift vouchers. Perfect for every occasion.',
    },
  },

  services: [
    {
      title: 'Aromatherapy Massage',
      slug: 'aromatherapy-massage',
      category: 'Massage',
      shortDesc: 'Essential oils and gentle strokes for deep relaxation and stress relief.',
      longDesc: 'Experience the therapeutic benefits of aromatherapy combined with traditional massage techniques. Our certified therapists use premium essential oils to enhance your relaxation experience.',
      benefits: ['Deep relaxation', 'Stress relief', 'Improved sleep', 'Enhanced mood'],
      durations: [
        { minutes: 60, price: 120 },
        { minutes: 90, price: 160 },
        { minutes: 120, price: 200 },
      ],
      images: ['/assets/service-aromatherapy.jpg'],
      featured: true,
      contraindications: 'Not recommended during pregnancy or for individuals with allergies to essential oils.',
      faqs: [
        { question: 'What essential oils do you use?', answer: 'We use therapeutic-grade essential oils including lavender, eucalyptus, and chamomile.' },
        { question: 'Is aromatherapy safe for everyone?', answer: 'While generally safe, we recommend consulting with your healthcare provider if you have allergies or medical conditions.' },
      ],
    },
    {
      title: 'Foot Reflexology',
      slug: 'foot-reflexology',
      category: 'Body Care',
      shortDesc: 'Pressure point therapy targeting organs and systems through foot massage.',
      longDesc: 'Ancient healing technique that applies pressure to specific points on the feet to promote healing throughout the body.',
      benefits: ['Improved circulation', 'Reduced stress', 'Pain relief', 'Better sleep'],
      durations: [
        { minutes: 30, price: 60 },
        { minutes: 45, price: 80 },
        { minutes: 60, price: 100 },
      ],
      images: ['/assets/service-foot.jpg'],
      featured: true,
      contraindications: 'Not recommended for individuals with foot injuries, infections, or certain medical conditions.',
    },
    {
      title: 'Deep Tissue Massage',
      slug: 'deep-tissue-massage',
      category: 'Massage',
      shortDesc: 'Intensive muscle work to release chronic tension and knots.',
      longDesc: 'Targeted massage technique that focuses on realigning deeper layers of muscles and connective tissue.',
      benefits: ['Chronic pain relief', 'Improved mobility', 'Reduced inflammation', 'Enhanced recovery'],
      durations: [
        { minutes: 60, price: 130 },
        { minutes: 90, price: 180 },
        { minutes: 120, price: 230 },
      ],
      images: ['/assets/service-deep-tissue.jpg'],
      featured: true,
      contraindications: 'Not recommended for individuals with blood clots, fractures, or certain medical conditions.',
    },
    {
      title: 'Traditional Thai Massage',
      slug: 'traditional-thai-massage',
      category: 'Massage',
      shortDesc: 'Ancient stretching techniques combined with acupressure for full-body wellness.',
      longDesc: 'Authentic Thai massage combining yoga-like stretching, acupressure, and energy work for complete body balance.',
      benefits: ['Increased flexibility', 'Energy balance', 'Improved circulation', 'Mental clarity'],
      durations: [
        { minutes: 60, price: 110 },
        { minutes: 90, price: 150 },
        { minutes: 120, price: 190 },
      ],
      images: ['/assets/service-traditional.jpg'],
      featured: true,
      contraindications: 'Not recommended during pregnancy, for individuals with osteoporosis, or certain medical conditions.',
    },
  ],

  memberships: [
    {
      name: 'Bronze Membership',
      price: 99,
      billingCycle: 'monthly',
      perks: ['Priority booking', '10% discount on services', 'Free consultation'],
      terms: 'Cancel anytime. No long-term commitment.',
      order: 1,
    },
    {
      name: 'Silver Membership',
      price: 149,
      billingCycle: 'monthly',
      perks: ['Priority booking', '20% discount on services', 'Free monthly add-on', 'Birthday special treatment'],
      terms: 'Cancel anytime. No long-term commitment.',
      order: 2,
    },
    {
      name: 'Gold Membership',
      price: 199,
      billingCycle: 'monthly',
      perks: ['VIP booking priority', '30% discount on services', 'Free monthly massage', 'Complimentary upgrades', 'Dedicated therapist preference'],
      terms: 'Cancel anytime. No long-term commitment.',
      order: 3,
    },
  ],

  testimonials: [
    {
      name: 'Sarah Johnson',
      quote: 'The most authentic Thai massage I\'ve experienced outside of Thailand. The therapists are incredibly skilled.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      quote: 'I\'ve been a member for 3 years. The quality of service and value is unmatched. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      quote: 'The deep tissue massage worked wonders on my chronic back pain. Clean, professional, and caring staff.',
      rating: 5,
    },
    {
      name: 'David Thompson',
      quote: 'Absolutely love the foot reflexology treatment. It\'s become my weekly ritual for stress relief.',
      rating: 5,
    },
  ],

  settings: [
    { key: 'contact_phone', value: '+1 (234) 567-890' },
    { key: 'contact_email', value: 'info@aromathai.com' },
    { key: 'business_hours', value: 'Mon-Fri: 10AM-9PM, Sat-Sun: 9AM-10PM' },
    { key: 'booking_url', value: 'https://aromathaispa.zenoti.com' },
    { key: 'address', value: '123 Wellness Street, Downtown District' },
    { key: 'whatsapp', value: '+1234567890' },
  ],
};

// Migration function
const migrateContent = async () => {
  try {
    console.log('Starting content migration...');

    // Migrate homepage content
    const existingHomepage = await HomepageContent.findOne();
    if (!existingHomepage) {
      await HomepageContent.create(staticContent.homepage);
      console.log('✓ Homepage content migrated');
    } else {
      console.log('✓ Homepage content already exists');
    }

    // Migrate services
    const existingServices = await Service.find();
    if (existingServices.length === 0) {
      await Service.insertMany(staticContent.services);
      console.log('✓ Services migrated');
    } else {
      console.log('✓ Services already exist');
    }

    // Migrate memberships
    const existingMemberships = await Membership.find();
    if (existingMemberships.length === 0) {
      await Membership.insertMany(staticContent.memberships);
      console.log('✓ Memberships migrated');
    } else {
      console.log('✓ Memberships already exist');
    }

    // Migrate testimonials
    const existingTestimonials = await Testimonial.find();
    if (existingTestimonials.length === 0) {
      await Testimonial.insertMany(staticContent.testimonials);
      console.log('✓ Testimonials migrated');
    } else {
      console.log('✓ Testimonials already exist');
    }

    // Migrate settings
    const existingSettings = await Setting.find();
    if (existingSettings.length === 0) {
      await Setting.insertMany(staticContent.settings);
      console.log('✓ Settings migrated');
    } else {
      console.log('✓ Settings already exist');
    }

    console.log('Content migration completed successfully!');
    console.log('\nMigration Summary:');
    console.log('- Homepage content: Migrated');
    console.log('- Services: 4 services migrated');
    console.log('- Memberships: 3 membership plans migrated');
    console.log('- Testimonials: 4 testimonials migrated');
    console.log('- Settings: 6 settings migrated');

  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

// Run migration
const runMigration = async () => {
  await connectDB();
  await migrateContent();
  await mongoose.connection.close();
  console.log('Database connection closed');
};

runMigration();