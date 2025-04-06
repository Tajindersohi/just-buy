const express = require('express');
const router = express.Router();
const { getCartProducts } = require('../controllers/home/cart');

router.post("/", getCartProducts);

module.exports = router;
