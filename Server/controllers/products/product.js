const ProductCategory = require('../../models/productCategory');
const Product = require('../../models/product');

const getProductsList = async (req, res) => {
    try {
        const categoriesWithProducts = await ProductCategory.find().lean();

        const result = await Promise.all(
            categoriesWithProducts.map(async (category) => {
                const products = await Product.find({ category_id: category._id });
                return {
                    category: category.name,
                    id: category._id,
                    products: products.map(product => ({
                        id:product._id,
                        name: product.name,
                        imageUrl: product.imageUrl,
                        price: product.price,
                        discount: product.discount,
                    })),
                };
            })
        );

        res.status(200).json(result); 
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { category, price, name, imageUrl, discount } = req.body;

        let categoryRecord = await ProductCategory.findOne({ name: category });
        
        if (!categoryRecord) {
            categoryRecord = await ProductCategory.create({ name: category });
        }

        const newProduct = await Product.create({
            category_id: categoryRecord._id,
            name: name,
            imageUrl,
            price,
            discount,
        });

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (err) {
        console.error('Error adding new product:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getProductsList, addNewProduct };
