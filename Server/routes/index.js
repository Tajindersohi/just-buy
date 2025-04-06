// routes/index.js
const express = require('express');
const productRoutes = require('./product'); // Ensure correct path to product.js
const cartRoutes = require('./cart'); // Ensure correct path to product.js
const adminRoutes = require('./admin'); // Ensure correct path to auth.js
const { handleLoginWithOtp, sentLoginOtp, handleGetMe } = require('../controllers/auth/auth');
// const { uploadImage } = require('../controllers/upload/upload');
// const { upload } = require('../middlewares/upload');
const { getHome } = require('../controllers/home/home');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Correctly use .use for middleware-like routing
router.use("/category", authMiddleware, productRoutes);
router.use("/cart", cartRoutes);
router.use("/admin", adminRoutes);
router.use("/login", handleLoginWithOtp)
router.use("/me", authMiddleware, handleGetMe )
router.use("/sent-otp", sentLoginOtp)
router.use("/home", getHome)


module.exports = router;
