// routes/index.js
const express = require('express');
const productRoutes = require('./product'); // Ensure correct path to product.js
const authRoutes = require('./auth'); // Ensure correct path to auth.js

const router = express.Router();

// Correctly use .use for middleware-like routing
router.use("/products", productRoutes);
router.use("/auth", authRoutes);

module.exports = router;
