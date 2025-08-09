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
const {upload,saveFileToGitHub} = require('../middlewares/uploadMiddleware');

router.get("/", getCategoryList);
router.post("/create-product", upload.single("media"),saveFileToGitHub, addNewProduct);
router.post("/update-product", upload.single("media"), saveFileToGitHub, updateProduct);
router.post("/create-category", upload.single("media"), saveFileToGitHub,addNewCategory);
router.post("/products", getCategoryProducts);
router.delete("/products/:id", deleteProduct);
router.delete("/:id", deleteCategory);
router.put("/:id", upload.single("media"), saveFileToGitHub, updateCategory);


module.exports = router;
