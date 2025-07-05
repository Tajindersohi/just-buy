const express = require('express');
const router = express.Router();
const { getHome, getCategoryProducts, getCategories } = require('../controllers/home/home');

// Home data (nested categories, subcategories, and summary)
router.get("/", getHome);

// Get products for a specific category (parent or sub)
router.get("/category/:id", getCategoryProducts);
router.get("/categories", getCategories);

module.exports = router;
