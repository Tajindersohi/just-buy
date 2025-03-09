const ProductCategory = require('../../models/productCategory');
const Product = require('../../models/product');

const getNestedCategories = (categories, parentId = null) => {
    return categories
    .filter(category => String(category.parentCategory?._id || '') === String(parentId || ''))
    .map(category => ({
            id: category._id,
            name: category.name,
            imageUrl: category.imageUrl,
            subcategories: getNestedCategories(categories, category._id),
            products: [], 
        }));
};

const getCategoryList = async (req, res) => {
    try {
        const categoriesWithProducts = await ProductCategory.find().populate('parentCategory').lean();

        const categoryIds = categoriesWithProducts.map(category => category._id);

        const products = await Product.find({ category_id: { $in: categoryIds } }).lean();
        const productMap = products.reduce((acc, product) => {
            const catId = product.category_id.toString();
            if (!acc[catId]) acc[catId] = [];
            acc[catId].push({
                id: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                discount: product.discount,
            });
            return acc;
        }, {});

        let categoryTree = getNestedCategories(categoriesWithProducts);
        const attachProductsToCategories = (categories) => {
            return categories.map(category => ({
                ...category,
                products: productMap[category.id] || [],
                subcategories: attachProductsToCategories(category.subcategories),
            }));
        };

        categoryTree = attachProductsToCategories(categoryTree);

        res.status(200).json({ data: categoryTree, success: true, message: "Categories fetched successfully" });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCategoryProducts = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const productsList = await Product.find({ category_id: id }).lean();
        
        if (!productsList.length) {
            return res.status(404).json({success:true, list: [], message: 'No products found for this category' });
        }

        res.status(200).json({
            message: 'Products fetched successfully',
            list: productsList,
            success:true
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({success: false, list:[], error:err, message: 'Internal Server Error' });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { categoryId, price, productName, discount } = JSON.parse(req.body.data);
        const imageUrl = req.file ? `${process.env.APP_URL}/uploads/${req.file.filename}` : null;
        const newProduct = await Product.create({
            category_id:categoryId ,
            name: productName,
            imageUrl,
            price,
            discount,
        });
        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (err) {
        console.error("Error adding new product:", err);
        res.status(500).json({ message: err.message });
    }
};

const addNewCategory = async (req, res) => {
    try {
        const { category, parentCategory } = JSON.parse(req.body.data);
        const imageUrl = req.file ? `${process.env.APP_URL}/uploads/${req.file.filename}` : null;
        let categoryRecord = await ProductCategory.create({ name: category, imageUrl: imageUrl, parentCategory: parentCategory});
        res.status(201).json({
            message: 'Category created successfully',
            product: categoryRecord,
        });
    } catch (err) {
        console.error('Error adding new product:', err);
        res.status(500).json({ message: err });
    }
};

module.exports = { getCategoryList, addNewProduct, addNewCategory, getCategoryProducts };
