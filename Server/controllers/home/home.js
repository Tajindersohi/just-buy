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

const getHome = async (req, res) => {
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
        const  newCate = [...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree,...categoryTree];
        const allSubCategories = await Product.find({}).lean(); // Await the product query
        const result = {category : newCate, subCategory: allSubCategories }
        res.status(200).json({ data: result, success: true, message: "Categories fetched successfully" });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { getHome };
