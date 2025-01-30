const express = require('express');
const router = express.Router();
const {
    getProductsList,
    addNewProduct
} = require('../controllers/products/product')

router.get("/", getProductsList);
router.post("/add", addNewProduct);

module.exports = router;
