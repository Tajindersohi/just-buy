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
                    imageUrl: category.imageUrl,
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

        res.status(200).json({data:result,success:true,message:"Product fetched successfully"}); 
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const { categoryId, price, productName, imageUrl, discount } = req.body;
        const newProduct = await Product.create({
            category_id:categoryId ,
            name: productName,
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
        res.status(500).json({ message: err });
    }
};

const addNewCategory = async (req, res) => {
    try {
        const { category, imageUrl } = req.body;
        let categoryRecord = await ProductCategory.create({ name: category, imageUrl: imageUrl });
        res.status(201).json({
            message: 'Category created successfully',
            product: categoryRecord,
        });
    } catch (err) {
        console.error('Error adding new product:', err);
        res.status(500).json({ message: err });
    }
};

module.exports = { getProductsList, addNewProduct, addNewCategory };
