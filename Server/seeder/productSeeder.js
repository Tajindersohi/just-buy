import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Product from '../models/product.js';
import ProductCategory from '../models/productCategory.js';

const MONGO_URI = process.env.CONNECTION_STRING || 'mongodb://localhost:27017';

// Define categories with subcategories
const categories = [
  {
    name: 'Fruits & Vegetables',
    subcategories: [
      'Fresh Fruits', 'Fresh Vegetables', 'Exotic Fruits', 'Exotic Vegetables',
      'Organic Produce', 'Leafy Greens', 'Sprouts', 'Seasonal Fruits',
      'Cut & Peeled Fruits', 'Salad Packs', 'Root Vegetables', 'Herbs',
      'Fruit Combos', 'Vegetable Combos', 'Mushrooms', 'Berries',
      'Bananas', 'Apples', 'Oranges', 'Grapes',
      'Watermelon & Melons', 'Mangoes', 'Papaya', 'Pineapple',
      'Coconut & Tender Coconut', 'Onions', 'Potatoes', 'Tomatoes',
      'Chillies & Peppers', 'Cucumber', 'Lemon', 'Beans',
      'Carrots', 'Cauliflower', 'Cabbage', 'Broccoli',
      'Garlic', 'Ginger', 'Zucchini', 'Pumpkin'
    ]
  },
  {
    name: 'Dairy & Bakery',
    subcategories: [
      'Milk', 'Toned Milk', 'Full Cream Milk', 'Flavored Milk',
      'Curd', 'Paneer', 'Cheese Slices', 'Cheese Blocks',
      'Butter', 'Salted Butter', 'Unsalted Butter', 'Margarine',
      'Ghee', 'Fresh Cream', 'Whipping Cream', 'Buttermilk',
      'Lassi', 'Yogurt', 'Greek Yogurt', 'Probiotic Drinks',
      'Bread - White', 'Bread - Brown', 'Bread - Multigrain', 'Bread - Garlic',
      'Pav & Buns', 'Cakes', 'Pastries', 'Donuts',
      'Croissants', 'Muffins', 'Rusk', 'Khari',
      'Cookies', 'Bagels', 'Pizza Base', 'Kulcha',
      'Naan', 'Tortilla Wraps', 'Pita Bread', 'Sourdough Bread'
    ]
  },
  {
    name: 'Beverages',
    subcategories: [
      'Packaged Water', 'Mineral Water', 'Sparkling Water', 'Flavored Water',
      'Soft Drinks', 'Cola Drinks', 'Lemon Drinks', 'Orange Drinks',
      'Energy Drinks', 'Sports Drinks', 'Electrolyte Drinks', 'Health Drinks',
      'Fruit Juices - Apple', 'Fruit Juices - Orange', 'Fruit Juices - Mixed', 'Mango Juices',
      'Cold Pressed Juices', 'Coconut Water', 'Herbal Juices', 'Aloe Vera Juice',
      'Tea - Green', 'Tea - Black', 'Tea - Herbal', 'Tea Bags',
      'Coffee - Instant', 'Coffee - Ground', 'Coffee - Beans', 'Cold Coffee',
      'Hot Chocolate', 'Milk Shakes', 'Smoothies', 'Mocktails',
      'Protein Shakes', 'Kombucha', 'Iced Tea', 'Detox Water',
      'Caffeine Free Drinks', 'Sugar Free Drinks', 'Tonics & Mixers', 'Syrups'
    ]
  },
  {
    name: 'Snacks & Branded Foods',
    subcategories: [
      'Potato Chips', 'Nachos', 'Popcorn', 'Kurkure',
      'Namkeen - Mixture', 'Namkeen - Sev', 'Namkeen - Bhujia', 'Namkeen - Chivda',
      'Biscuits - Cream', 'Biscuits - Digestive', 'Biscuits - Marie', 'Biscuits - Glucose',
      'Cookies - Chocolate', 'Cookies - Butter', 'Cookies - Oatmeal', 'Cookies - Coconut',
      'Chocolates - Dark', 'Chocolates - Milk', 'Chocolates - White', 'Chocolates - Premium',
      'Candy', 'Toffees', 'Lollipops', 'Gummies',
      'Instant Noodles', 'Cup Noodles', 'Instant Pasta', 'Mac & Cheese',
      'Breakfast Cereals', 'Corn Flakes', 'Oats', 'Granola',
      'Energy Bars', 'Protein Bars', 'Peanut Butter', 'Jam',
      'Honey', 'Nutella', 'Muesli', 'Trail Mix'
    ]
  },
  {
    name: 'Staples',
    subcategories: [
      'Rice - Basmati', 'Rice - Sona Masoori', 'Rice - Brown', 'Rice - Red',
      'Wheat Flour', 'Multigrain Flour', 'Maida', 'Sooji',
      'Pulses - Toor Dal', 'Pulses - Moong Dal', 'Pulses - Masoor Dal', 'Pulses - Chana Dal',
      'Whole Pulses', 'Kabuli Chana', 'Rajma', 'Green Gram',
      'Cooking Oils - Sunflower', 'Cooking Oils - Mustard', 'Cooking Oils - Groundnut', 'Cooking Oils - Olive',
      'Sugar - White', 'Sugar - Brown', 'Jaggery', 'Honey',
      'Salt - Iodised', 'Salt - Rock', 'Salt - Himalayan', 'Black Salt',
      'Spices - Turmeric', 'Spices - Chilli', 'Spices - Coriander', 'Spices - Garam Masala',
      'Whole Spices - Cloves', 'Whole Spices - Cardamom', 'Whole Spices - Cinnamon', 'Whole Spices - Black Pepper',
      'Dry Fruits - Almonds', 'Dry Fruits - Cashews', 'Dry Fruits - Raisins', 'Dry Fruits - Dates'
    ]
  },
  {
    name: 'Personal Care',
    subcategories: [
      'Bathing Soaps', 'Body Wash', 'Hand Wash', 'Sanitizers',
      'Shampoo', 'Hair Conditioner', 'Hair Oil', 'Hair Serum',
      'Toothpaste', 'Toothbrush', 'Mouthwash', 'Dental Floss',
      'Face Wash', 'Face Cream', 'Sunscreen', 'Moisturizers',
      'Deodorants', 'Perfumes', 'Talcum Powder', 'Lip Care',
      'Shaving Cream', 'Razors', 'After Shave', 'Beard Oil',
      'Body Lotion', 'Body Butter', 'Hand Cream', 'Foot Cream',
      'Baby Soap', 'Baby Shampoo', 'Baby Lotion', 'Baby Powder',
      'Feminine Hygiene - Sanitary Pads', 'Feminine Hygiene - Tampons', 'Feminine Hygiene - Menstrual Cups', 'Panty Liners'
    ]
  },
  { 
    name: 'Fruits & Vegetables', 
    subcategories: [
      'Fresh Fruits', 'Fresh Vegetables', 'Herbs & Seasonings', 'Organic Produce',
      'Exotic Fruits', 'Exotic Vegetables', 'Leafy Greens', 'Sprouts',
      'Cut & Peeled Vegetables', 'Frozen Vegetables'
    ] 
  },
  { 
    name: 'Dairy & Bakery', 
    subcategories: [
      'Milk', 'Flavored Milk', 'Curd & Yogurt', 'Paneer', 'Cheese', 'Butter & Margarine',
      'Cream', 'Ghee', 'Bread', 'Cakes & Pastries', 'Buns & Pav', 'Bakery Snacks',
      'Rusk & Khari'
    ] 
  },
  { 
    name: 'Beverages', 
    subcategories: [
      'Soft Drinks', 'Fruit Juices', 'Energy Drinks', 'Sports Drinks', 'Coconut Water',
      'Iced Tea', 'Lassi & Buttermilk', 'Soda & Mixers', 'Packaged Water',
      'Cold Pressed Juices'
    ] 
  },
  { 
    name: 'Snacks & Branded Foods', 
    subcategories: [
      'Chips & Namkeen', 'Popcorn', 'Nachos', 'Biscuits & Cookies', 'Chocolates',
      'Candy & Gum', 'Cakes & Muffins', 'Snack Bars', 'Ready-to-Eat Meals',
      'Instant Noodles', 'Pasta & Vermicelli', 'Breakfast Cereals'
    ] 
  },
  { 
    name: 'Staples', 
    subcategories: [
      'Atta & Flour', 'Rice & Rice Products', 'Pulses & Dal', 'Sugar', 'Salt',
      'Edible Oils', 'Ghee & Vanaspati', 'Dry Fruits', 'Spices & Masala',
      'Rava & Sooji', 'Poha & Flattened Rice', 'Organic Staples'
    ] 
  },
  { 
    name: 'Personal Care', 
    subcategories: [
      'Soaps', 'Body Wash', 'Shampoo', 'Conditioner', 'Hair Oil', 'Hair Styling',
      'Toothpaste', 'Toothbrushes', 'Mouthwash', 'Face Wash', 'Face Creams',
      'Body Lotion', 'Deodorants', 'Perfumes', 'Lip Care', 'Shaving Needs'
    ] 
  },
  { 
    name: 'Household Essentials', 
    subcategories: [
      'Detergent Powder', 'Liquid Detergent', 'Fabric Conditioner', 'Dishwash Bar',
      'Dishwash Liquid', 'Bathroom Cleaners', 'Floor Cleaners', 'Glass Cleaners',
      'Air Fresheners', 'Mops & Brushes', 'Garbage Bags', 'Insect Killers'
    ] 
  },
  { 
    name: 'Baby Care', 
    subcategories: [
      'Baby Diapers', 'Wipes', 'Baby Shampoo', 'Baby Soap', 'Baby Cream & Lotion',
      'Baby Powder', 'Baby Food', 'Infant Formula', 'Feeding Bottles',
      'Pacifiers & Teethers', 'Baby Oil', 'Baby Health Care'
    ] 
  },
  { 
    name: 'Breakfast & Dairy', 
    subcategories: [
      'Butter & Cheese', 'Milk', 'Yogurt', 'Paneer', 'Eggs', 'Breakfast Cereal',
      'Oats', 'Muesli', 'Granola', 'Pancake Mix', 'Honey & Spreads', 'Peanut Butter'
    ] 
  },
  { 
    name: 'Meat, Fish & Eggs', 
    subcategories: [
      'Fresh Chicken', 'Mutton', 'Fish & Seafood', 'Eggs', 'Cold Cuts & Sausages',
      'Frozen Meat', 'Marinated Meat', 'Ready-to-Cook Meat', 'Boneless Cuts',
      'Prawns & Shrimps'
    ] 
  },
  { 
    name: 'Frozen Foods', 
    subcategories: [
      'Frozen Vegetables', 'Frozen Snacks', 'French Fries', 'Frozen Parathas',
      'Frozen Momos', 'Frozen Samosa', 'Frozen Nuggets', 'Frozen Pizzas',
      'Frozen Ice Cream', 'Frozen Breads'
    ] 
  },
  { 
    name: 'Ice Creams & Desserts', 
    subcategories: [
      'Family Packs', 'Choco Bars', 'Cones', 'Cups', 'Kulfi', 'Sugar-Free Ice Creams',
      'Frozen Yogurt', 'Brownies', 'Pastries', 'Indian Sweets'
    ] 
  },
  { 
    name: 'Biscuits & Cookies', 
    subcategories: [
      'Marie & Digestive', 'Glucose Biscuits', 'Cream Biscuits', 'Cookies',
      'Healthy Biscuits', 'Crackers', 'Salted Biscuits', 'Digestive Bars'
    ] 
  },
  { 
    name: 'Chocolates & Sweets', 
    subcategories: [
      'Milk Chocolates', 'Dark Chocolates', 'White Chocolates', 'Gift Packs',
      'Candies', 'Toffees', 'Indian Mithai', 'Sugar-Free Chocolates'
    ] 
  },
  { 
    name: 'Organic & Healthy Living', 
    subcategories: [
      'Organic Fruits & Veggies', 'Organic Staples', 'Organic Spices',
      'Cold Pressed Oils', 'Superfoods', 'Gluten-Free Products', 'Vegan Products',
      'Sugar Substitutes', 'Organic Snacks'
    ] 
  },
  { 
    name: 'Pet Care', 
    subcategories: [
      'Dog Food', 'Cat Food', 'Fish Food', 'Bird Food', 'Pet Treats',
      'Pet Grooming', 'Pet Toys', 'Pet Accessories'
    ] 
  },
  { 
    name: 'Cleaning & Hygiene', 
    subcategories: [
      'Toilet Cleaners', 'Floor Cleaners', 'Kitchen Cleaners', 'Glass Cleaners',
      'Hand Wash', 'Hand Sanitizers', 'Air Fresheners', 'Disinfectants'
    ] 
  },
  { 
    name: 'Beauty & Cosmetics', 
    subcategories: [
      'Makeup', 'Lipstick', 'Foundation', 'Compact & Powder', 'Kajal & Eyeliner',
      'Nail Polish', 'Perfumes', 'Skin Care', 'Face Masks', 'Serums'
    ] 
  },
  { 
    name: 'Stationery & Office', 
    subcategories: [
      'Notebooks', 'Pens', 'Pencils', 'Markers', 'Files & Folders',
      'Desk Organizers', 'Sticky Notes', 'Envelopes', 'Art Supplies',
      'School Supplies'
    ] 
  },
  { 
    name: 'Electronics & Accessories', 
    subcategories: [
      'Mobile Accessories', 'Chargers', 'Cables', 'Earphones', 'Headphones',
      'Power Banks', 'Smart Watches', 'Computer Accessories', 'Keyboards',
      'Mouse', 'USB Drives'
    ] 
  },
  { 
    name: 'Kitchen & Dining', 
    subcategories: [
      'Cookware', 'Pressure Cookers', 'Non-stick Pans', 'Gas Stoves',
      'Kitchen Tools', 'Storage Containers', 'Dinner Sets', 'Cutlery',
      'Glassware', 'Water Bottles'
    ] 
  },
  { 
    name: 'Home & Living', 
    subcategories: [
      'Bedsheets', 'Pillows', 'Blankets', 'Towels', 'Doormats', 'Curtains',
      'Cushions', 'Carpets', 'Laundry Bags', 'Decor Items'
    ] 
  },
  { 
    name: 'Health & Nutrition', 
    subcategories: [
      'Vitamins', 'Supplements', 'Protein Powders', 'Health Drinks',
      'Ayurvedic Products', 'Herbal Teas', 'Immunity Boosters'
    ] 
  },
  { 
    name: 'Medicines & OTC', 
    subcategories: [
      'Pain Relief', 'Cough & Cold', 'Digestive Health', 'Skin Treatment',
      'Fever Medicines', 'Vitamins & Minerals', 'Ayurvedic Medicines'
    ] 
  },
  { 
    name: 'Pooja Needs', 
    subcategories: [
      'Incense Sticks', 'Diyas', 'Camphor', 'Pooja Thalis', 'Holy Books',
      'God Idols', 'Sacred Threads', 'Pooja Oil'
    ] 
  },
  { 
    name: 'Sports & Fitness', 
    subcategories: [
      'Yoga Mats', 'Dumbbells', 'Resistance Bands', 'Skipping Ropes',
      'Sports Shoes', 'Sportswear', 'Cricket Equipment', 'Football Gear'
    ] 
  },
  { 
    name: 'Travel & Luggage', 
    subcategories: [
      'Trolley Bags', 'Backpacks', 'Duffel Bags', 'Travel Accessories',
      'Wallets', 'Laptop Bags', 'Rucksacks', 'Suit Covers'
    ] 
  },
  { 
    name: 'Automotive', 
    subcategories: [
      'Car Accessories', 'Bike Accessories', 'Car Care', 'Helmets',
      'Tyres & Tubes', 'Car Perfumes', 'Seat Covers', 'Lubricants'
    ] 
  },
  { 
    name: 'Home Appliances', 
    subcategories: [
      'Irons', 'Fans', 'Heaters', 'Vacuum Cleaners', 'Mixers & Grinders',
      'Juicers', 'Water Purifiers', 'Air Purifiers', 'Microwave Ovens'
    ] 
  },
  { 
    name: 'Lighting & Electricals', 
    subcategories: [
      'LED Bulbs', 'Tube Lights', 'Extension Cords', 'Switches',
      'Power Strips', 'Night Lamps', 'Rechargeable Lights', 'Inverters'
    ] 
  },
  { 
    name: 'Gardening', 
    subcategories: [
      'Seeds', 'Plants', 'Pots & Planters', 'Soil & Fertilizers',
      'Gardening Tools', 'Plant Care', 'Indoor Plants', 'Artificial Plants'
    ] 
  },
  { 
    name: 'Gourmet & World Foods', 
    subcategories: [
      'Olives & Pickles', 'Pasta & Sauces', 'Spreads & Dips',
      'Imported Snacks', 'Exotic Sauces', 'Gourmet Oils', 'International Beverages'
    ] 
  },
  { 
    name: 'Ready to Cook & Eat', 
    subcategories: [
      'Instant Noodles', 'Instant Pasta', 'Ready Meals', 'Frozen Snacks',
      'Soup Mixes', 'Canned Food', 'Instant Mixes'
    ] 
  },
  { 
    name: 'Pickles & Chutneys', 
    subcategories: [
      'Mango Pickle', 'Lime Pickle', 'Mixed Pickle', 'Garlic Pickle',
      'Chilli Pickle', 'South Indian Pickles', 'Chutney Powders', 'Sauces'
    ] 
  },
  { 
    name: 'Pasta, Sauces & Noodles', 
    subcategories: [
      'Instant Noodles', 'Hakka Noodles', 'Spaghetti', 'Macaroni',
      'Lasagna Sheets', 'Pasta Sauces', 'Chinese Sauces', 'Seasoning Mixes'
    ] 
  },
  { 
    name: 'Cooking Essentials', 
    subcategories: [
      'Salt & Sugar', 'Flours', 'Rice & Grains', 'Spices & Herbs',
      'Cooking Oils', 'Vinegar', 'Baking Needs', 'Instant Mixes'
    ] 
  },
  { 
    name: 'Gifting & Festive Needs', 
    subcategories: [
      'Gift Hampers', 'Sweets Boxes', 'Dry Fruit Packs', 'Festival Decor',
      'Gift Cards', 'Personalized Gifts', 'Gift Wrapping'
    ] 
  },
  { 
    name: 'Women’s Care', 
    subcategories: [
      'Sanitary Pads', 'Tampons', 'Menstrual Cups', 'Intimate Wash',
      'Maternity Care', 'Hair Removal', 'Women’s Supplements'
    ] 
  },
  { 
    name: 'Men’s Grooming', 
    subcategories: [
      'Shaving Cream', 'Razors & Blades', 'Beard Care', 'Deodorants',
      'Hair Styling', 'Face Wash', 'Men’s Perfumes'
    ] 
  },
];

const fetchProductsFromAPI = async (keyword, limit = 15) => {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
    keyword
  )}&json=1&page_size=${limit}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.products.map((p) => ({
    name: p.product_name || keyword,
    imageUrl: p.image_url || 'https://via.placeholder.com/150',
  }));
};

const getRandomPrice = () => parseFloat((Math.random() * 50 + 10).toFixed(2));
const getRandomDiscount = () => Math.floor(Math.random() * 30);

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await Product.deleteMany({});
    await ProductCategory.deleteMany({});
    console.log('🧹 Old data cleared');

    for (const cat of categories) {
      // Create parent category
      const parentCategory = await ProductCategory.create({
        name: cat.name,
        imageUrl : 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzM0ODN8MHwxfHNlYXJjaHwxfHxQb3RhdG98ZW58MHwwfHx8MTc0NjI4OTY3Nnww&ixlib=rb-4.0.3&q=80&w=400',
        parentCategory: null,
      });

      // Create subcategories under the parent
      for (const sub of cat.subcategories) {
        const subCategory = await ProductCategory.create({
          name: sub,
          imageUrl : 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzM0ODN8MHwxfHNlYXJjaHwxfHxQb3RhdG98ZW58MHwwfHx8MTc0NjI4OTY3Nnww&ixlib=rb-4.0.3&q=80&w=400',
          parentCategory: parentCategory._id,
        });

        // Fetch products for this subcategory
        const products = await fetchProductsFromAPI(sub, 20);

        const uniqueProducts = [];
        const seenNames = new Set();

        for (const prod of products) {
          if (!seenNames.has(prod.name)) {
            seenNames.add(prod.name);
            uniqueProducts.push({
              name: prod.name,
              imageUrl: prod.imageUrl,
              price: getRandomPrice(),
              discount: getRandomDiscount(),
              category_id: subCategory._id, // ✅ store under subcategory
            });
          }
        }

        if (uniqueProducts.length) {
          await Product.insertMany(uniqueProducts);
          console.log(`🛒 ${sub} seeded with ${uniqueProducts.length} products`);
        }
      }
    }

    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ Seeder failed:', error);
    await mongoose.disconnect();
  }
};

seedData();
