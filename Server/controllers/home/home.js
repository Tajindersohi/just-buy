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


const getParentCategoriesWithProducts = async () => {
    try {
        const categoriesWithProducts = await ProductCategory.aggregate([
            {
                $match: { parentCategory: null }
            },
            {
                $lookup: {
                    from: 'productcategories', // Ensure correct collection name
                    localField: '_id',
                    foreignField: 'parentCategory',
                    as: 'subcategories'
                }
            },
            {
                $addFields: {
                    subcategoryIds: {
                        $map: { input: "$subcategories", as: "sub", in: "$$sub._id" }
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'subcategoryIds',
                    foreignField: 'category_id', // Products are linked to subcategories
                    as: 'products'
                }
            },
            {
                $project: {
                    subcategoryIds: 0 
                }
            }
        ]);

        return categoriesWithProducts;
    } catch (error) {
        console.error("Error fetching categories with products:", error);
        throw error;
    }
};

const getProductSummary = async () => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: "$category_id",
                    totalProducts: { $sum: 1 },
                    avgPrice: { $avg: "$price" }
                }
            }
        ]);
        return result;
    } catch (error) {
        console.error(error);
    }
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
        const allSubCategories = await Product.find({}).lean(); 
        const parentCategoryWithProducts = await getParentCategoriesWithProducts();
        const productSummaries = await getProductSummary();
        const result = {category : categoryTree, subCategory: allSubCategories, parentCategoryWithProducts:parentCategoryWithProducts , productSummaries:productSummaries }
        res.status(200).json({ data: result, success: true, message: "Categories fetched successfully" });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = { getHome };
