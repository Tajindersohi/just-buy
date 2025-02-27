// routes/index.js
const express = require('express');
const productRoutes = require('./product'); // Ensure correct path to product.js
const adminRoutes = require('./admin'); // Ensure correct path to auth.js
const { handleLoginWithOtp, sentLoginOtp } = require('../controllers/auth/auth');
const { uploadImage } = require('../controllers/upload/upload');
const { upload } = require('../middlewares/upload');

const router = express.Router();

// Correctly use .use for middleware-like routing
router.use("/category", productRoutes);
router.use("/admin", adminRoutes);
router.use("/login", handleLoginWithOtp)
router.use("/sent-otp", sentLoginOtp)


module.exports = router;
