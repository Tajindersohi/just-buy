const Product = require('../../models/product');

const getCartProducts = async (req, res) => {
  try {
    const cartItems = req.body;

    const ids = cartItems.map(item => item.id);

    const products = await Product.find({ _id: { $in: ids } });

    const result = products.map(product => {
      const match = cartItems.find(item => item.id === product._id.toString());
      return {
        ...product.toObject(),
        count: match?.count || 1
      };
    });

    res.status(200).json({ data: result, success: true, message: "Cart fetched successfully" });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getCartProducts };
