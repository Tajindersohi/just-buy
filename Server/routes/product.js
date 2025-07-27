const express = require('express');
const router = express.Router();
const {
    getCategoryList,
    addNewProduct,
    addNewCategory,
    getCategoryProducts,
    deleteProduct,
    updateProduct,
    deleteCategory,
    updateCategory
} = require('../controllers/products/product');
const upload = require('../middlewares/uploadMiddleware');

router.get("/", getCategoryList);
router.post("/create-product", upload.single("media"), addNewProduct);
router.post("/update-product", upload.single("media"), updateProduct);
router.post("/create-category", upload.single("media"),addNewCategory);
router.post("/products", getCategoryProducts);
router.delete("/products/:id", deleteProduct);
router.delete("/:id", deleteCategory);
router.put("/:id", upload.single("media"), updateCategory);


module.exports = router;
