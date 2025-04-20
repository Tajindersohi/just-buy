import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from '../models/product.js';
import ProductCategory from '../models/productCategory.js';
import { getImage } from '../utils/unsplash.js';

const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb://localhost:27017';

const categories = [
  { name: 'Fruits & Vegetables', query: 'fresh fruits vegetables' },
  { name: 'Dairy & Bakery', query: 'milk cheese bread' }
];

const subcategories = {
  'Fruits & Vegetables': [
    { name: 'Fresh Fruits', query: 'apples bananas' },
    { name: 'Leafy Greens', query: 'spinach lettuce' },
    { name: 'Root Vegetables', query: 'carrots potatoes' }
  ],
  'Dairy & Bakery': [
    { name: 'Milk & Yogurt', query: 'milk yogurt' },
    { name: 'Cheese & Butter', query: 'cheese butter' },
    { name: 'Breads & Pastries', query: 'bread pastry' }
  ]
};

const productsBySubcategory = {
  'Fresh Fruits': ['Apple', 'Banana', 'Grapes'],
  'Leafy Greens': ['Spinach', 'Lettuce', 'Kale'],
  'Root Vegetables': ['Carrot', 'Potato', 'Beetroot'],
  'Milk & Yogurt': ['Full Cream Milk', 'Greek Yogurt', 'Low Fat Milk'],
  'Cheese & Butter': ['Cheddar Cheese', 'Butter', 'Cottage Cheese'],
  'Breads & Pastries': ['Whole Wheat Bread', 'Croissant', 'Bagel']
};

const getRandomPrice = () => parseFloat((Math.random() * 10 + 5).toFixed(2));
const getRandomDiscount = () => Math.floor(Math.random() * 25);

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await Product.deleteMany({});
    await ProductCategory.deleteMany({});
    console.log('🧹 Old data cleared');

    const categoryDocs = {};
    for (const cat of categories) {
      const imageUrl = await getImage(cat.query);
      const doc = await ProductCategory.create({
        name: cat.name,
        imageUrl,
        parentCategory: null
      });
      categoryDocs[cat.name] = doc;
    }

    console.log('📁 Categories seeded');

    const subCategoryDocs = {};
    for (const [parentName, subs] of Object.entries(subcategories)) {
      for (const sub of subs) {
        const imageUrl = await getImage(sub.query);
        const doc = await ProductCategory.create({
          name: sub.name,
          imageUrl,
          parentCategory: categoryDocs[parentName]._id
        });
        subCategoryDocs[sub.name] = doc;
      }
    }

    console.log('📁 Subcategories seeded');

    const products = [];

    for (const [subName, productNames] of Object.entries(productsBySubcategory)) {
      const subCat = subCategoryDocs[subName];

      for (const prodName of productNames) {
        const imageUrl = await getImage(prodName);
        products.push({
          name: prodName,
          imageUrl,
          price: getRandomPrice(),
          discount: getRandomDiscount(),
          category_id: subCat._id
        });
      }
    }

    await Product.insertMany(products);
    console.log('🛒 Products seeded');

    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ Seeder failed:', error);
    await mongoose.disconnect();
  }
};

seedData();
