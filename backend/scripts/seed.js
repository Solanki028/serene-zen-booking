import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Import models
import Admin from '../models/Admin.js';
import Service from '../models/Service.js';
import Membership from '../models/Membership.js';
import Testimonial from '../models/Testimonial.js';
import Setting from '../models/Setting.js';
import HomepageContent from '../models/HomepageContent.js';
import AboutContent from '../models/AboutContent.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed data
const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Create admin user
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const admin = new Admin({
        email: 'admin@aromathai.com',
        password: hashedPassword,
      });
      await admin.save();
      console.log('✓ Admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Seed services
    const servicesExist = await Service.find();
    if (servicesExist.length === 0) {
      const services = [
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
      ];

      await Service.insertMany(services);
      console.log('✓ Services seeded');
    } else {
      console.log('✓ Services already exist');
    }

    // Seed memberships
    const membershipsExist = await Membership.find();
    if (membershipsExist.length === 0) {
      const memberships = [
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
      ];

      await Membership.insertMany(memberships);
      console.log('✓ Memberships seeded');
    } else {
      console.log('✓ Memberships already exist');
    }

    // Seed testimonials
    const testimonialsExist = await Testimonial.find();
    if (testimonialsExist.length === 0) {
      const testimonials = [
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
      ];

      await Testimonial.insertMany(testimonials);
      console.log('✓ Testimonials seeded');
    } else {
      console.log('✓ Testimonials already exist');
    }

    // Seed settings
    const settingsExist = await Setting.find();
    if (settingsExist.length === 0) {
      const settings = [
        { key: 'contact_phone', value: '+1 (234) 567-890' },
        { key: 'contact_email', value: 'info@aromathai.com' },
        { key: 'business_hours', value: 'Mon-Fri: 10AM-9PM, Sat-Sun: 9AM-10PM' },
        { key: 'booking_url', value: 'https://aromathaispa.zenoti.com' },
        { key: 'address', value: '123 Wellness Street, Downtown District' },
        { key: 'whatsapp', value: '+1234567890' },
      ];

      await Setting.insertMany(settings);
      console.log('✓ Settings seeded');
    } else {
      console.log('✓ Settings already exist');
    }

    // Seed homepage content
    const homepageExists = await HomepageContent.findOne();
    if (!homepageExists) {
      const homepageContent = {
        heroHeadline: 'Authentic Thai Massage & Wellness',
        heroSubheadline: 'Experience the healing traditions of Thailand. Expert therapists, serene environment, personalized care since 2008.',
        heroImage: '/assets/hero-spa.jpg',
        trustBadges: [
          { icon: 'Award', title: 'Since 2008', description: '17 years of excellence' },
          { icon: 'Users', title: 'Expert Therapists', description: 'Certified Thai practitioners' },
          { icon: 'Shield', title: 'Highest Hygiene', description: 'Premium cleanliness standards' },
          { icon: 'Heart', title: 'Personalized Care', description: 'Tailored to your needs' },
        ],
        featuredServiceIds: [],
        membershipTeaser: {
          title: 'Wellness Made Affordable',
          description: 'Join our membership program and enjoy premium spa experiences at exceptional value',
          benefits: ['Priority booking', 'Exclusive discounts up to 30%', 'Complimentary add-ons', 'Rollover unused sessions'],
        },
        giftVoucherBanner: {
          title: 'Give the Gift of Wellness',
          description: 'Share the joy of relaxation with our customizable gift vouchers. Perfect for every occasion.',
        },
      };

      await HomepageContent.create(homepageContent);
      console.log('✓ Homepage content seeded');
    } else {
      console.log('✓ Homepage content already exists');
    }

    // Seed about content
    const aboutExists = await AboutContent.findOne();
    if (!aboutExists) {
      const aboutContent = {
        mission: 'To provide authentic Thai massage and holistic wellness experiences that promote healing, relaxation, and well-being for our community.',
        timeline: [
          { year: '2008', event: 'Aroma Thai Spa opens its doors' },
          { year: '2012', event: 'Expanded to second location' },
          { year: '2015', event: 'Introduced membership program' },
          { year: '2020', event: 'Launched online booking system' },
        ],
        values: [
          { icon: 'Heart', title: 'Authenticity', description: 'Traditional Thai healing techniques' },
          { icon: 'Users', title: 'Expertise', description: 'Certified and experienced therapists' },
          { icon: 'Shield', title: 'Safety', description: 'Highest hygiene and safety standards' },
          { icon: 'Award', title: 'Quality', description: 'Premium service excellence' },
        ],
        awards: [
          { title: 'Best Spa 2023', description: 'Local business excellence award', year: '2023' },
          { title: 'Customer Choice Award', description: 'Highest rated wellness center', year: '2022' },
        ],
        gallery: [],
      };

      await AboutContent.create(aboutContent);
      console.log('✓ About content seeded');
    } else {
      console.log('✓ About content already exists');
    }

    console.log('Database seeding completed successfully!');
    console.log('\nAdmin login credentials:');
    console.log('Email: admin@aromathai.com');
    console.log('Password: admin123');
    console.log('\n⚠️  Please change the default password after first login!');

  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  await seedData();
  await mongoose.connection.close();
  console.log('Database connection closed');
};

runSeeder();