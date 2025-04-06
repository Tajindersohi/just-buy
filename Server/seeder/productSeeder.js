import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Product from '../models/product.js';
import ProductCategory from '../models/productCategory.js';
import { getImage } from '../utils/unsplash.js';

const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb://localhost:27017';

const categoriesList = [
  'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat',
  'Seafood', 'Snacks', 'Beverages', 'Grains', 'Spices'
];

const subCategoryNames = [
  'Fresh', 'Organic', 'Imported', 'Frozen', 'Local',
  'Canned', 'Seasonal', 'Gluten-Free', 'Sugar-Free', 'Low-Fat',
  'Whole', 'Skimmed', 'Artisan', 'Sliced', 'Marinated',
  'Wild', 'Packaged', 'Bottled', 'Roasted', 'Ground'
];

const queryMap = {
  'Fruits': 'fresh fruits',
  'Dairy': 'milk cheese',
  'Bakery': 'bread pastry',
  'Meat': 'raw meat',
  'Snacks': 'chips cookies',
  'Vegetables': 'fresh vegetables',
  'Seafood': 'fish prawns',
  'Beverages': 'juice drinks',
  'Spices': 'masala herbs',
  'Grains': 'rice wheat'
};


const getRandomPrice = () => parseFloat((Math.random() * 20 + 5).toFixed(2));
const getRandomDiscount = () => Math.floor(Math.random() * 30);

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await Product.deleteMany({});
    await ProductCategory.deleteMany({});
    console.log('🧹 Old data cleared');

    const categoryDocs = await Promise.all(
      categoriesList.map(async name => {
        const query = queryMap[name] || name;
        const imageUrl = await getImage(query);
        return ProductCategory.create({
          name,
          imageUrl,
          parentCategory: null
        });
      })
    );
    console.log('📁 Categories seeded');

    const subCategoryDocs = [];
    for (let i = 0; i < categoryDocs.length; i++) {
      const parentCategory = categoryDocs[i];

      const subName1 = subCategoryNames[i * 2] || `SubCat${i * 2 + 1}`;
      const subName2 = subCategoryNames[i * 2 + 1] || `SubCat${i * 2 + 2}`;

      const imageUrl1 = await getImage(subName1);
      const imageUrl2 = await getImage(subName2);

      const sub1 = await ProductCategory.create({
        name: subName1,
        imageUrl: imageUrl1,
        parentCategory: parentCategory._id
      });

      const sub2 = await ProductCategory.create({
        name: subName2,
        imageUrl: imageUrl2,
        parentCategory: parentCategory._id
      });

      subCategoryDocs.push(sub1, sub2);
    }
    console.log('📁 Subcategories seeded');

    const products = [];
    let productCounter = 1;

    for (const subCat of subCategoryDocs) {
      for (let j = 0; j < 5; j++) {
        const productName = `Product ${productCounter}`;
        const imageUrl = await getImage(productName);

        products.push({
          name: productName,
          imageUrl,
          price: getRandomPrice(),
          discount: getRandomDiscount(),
          category_id: subCat._id
        });

        productCounter++;
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
