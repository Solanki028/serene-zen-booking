import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const categories = [
  {
    name: "BODY MASSAGES",
    slug: "body-massages",
    description: "Traditional Thai body massage techniques for relaxation and wellness",
    order: 1,
    isActive: true,
  },
  {
    name: "BODY SCRUBS",
    slug: "body-scrubs",
    description: "Exfoliating body scrubs using natural ingredients",
    order: 2,
    isActive: true,
  },
  {
    name: "BODY MASQUES",
    slug: "body-masques",
    description: "Nutrient-rich body masks for skin nourishment",
    order: 3,
    isActive: true,
  },
  {
    name: "FACE REFRESHERS",
    slug: "face-refreshers",
    description: "Facial treatments for rejuvenation and skin health",
    order: 4,
    isActive: true,
  },
  {
    name: "FOOT THERAPIES",
    slug: "foot-therapies",
    description: "Specialized foot massage and reflexology treatments",
    order: 5,
    isActive: true,
  },
  {
    name: "HEAD MASSAGES",
    slug: "head-massages",
    description: "Traditional head massage for stress relief and mental clarity",
    order: 6,
    isActive: true,
  },
  {
    name: "MANICURE & PEDICURE",
    slug: "manicure-pedicure",
    description: "Professional nail care and hand/foot treatments",
    order: 7,
    isActive: true,
  },
];

async function seedCategories() {
  try {
    console.log('Seeding categories...');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Insert new categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Successfully seeded ${insertedCategories.length} categories`);

    // Log the inserted categories
    insertedCategories.forEach(category => {
      console.log(`- ${category.name} (${category.slug})`);
    });

    console.log('Category seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedCategories();