const express = require('express');
const router = express.Router();
const {
    getProductsList,
    addNewProduct,
    addNewCategory
} = require('../controllers/products/product')

router.get("/", getProductsList);
router.post("/create-product", addNewProduct);
router.post("/create-category", addNewCategory);

module.exports = router;
