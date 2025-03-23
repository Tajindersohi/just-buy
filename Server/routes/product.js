const express = require('express');
const router = express.Router();
const {
    getCategoryList,
    addNewProduct,
    addNewCategory,
    getCategoryProducts,
    deleteProduct
} = require('../controllers/products/product');
const upload = require('../middlewares/uploadMiddleware');

router.get("/", getCategoryList);
router.post("/create-product", upload.single("media"), addNewProduct);
router.post("/create-category", upload.single("media"),addNewCategory);
router.post("/products", getCategoryProducts);
router.delete("/products/:id", deleteProduct);

module.exports = router;
