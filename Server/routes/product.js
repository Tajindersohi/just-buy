const express = require('express');
const router = express.Router();
const {
    getCategoryList,
    addNewProduct,
    addNewCategory,
    getCategoryProducts
} = require('../controllers/products/product')

router.get("/", getCategoryList);
router.post("/create-product", addNewProduct);
router.post("/create-category", addNewCategory);
router.post("/products", getCategoryProducts);

module.exports = router;
