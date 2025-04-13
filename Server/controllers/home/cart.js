const Product = require('../../models/product');

const getCartProducts = async (req, res) => {
  try {
    const cartItems = req.body;

    const ids = cartItems.map(item => item._id);

    const products = await Product.find({ _id: { $in: ids } });
    let total_cost = 0;

    const result = products.map(product => {
      const match = cartItems.find(item => item._id === product._id.toString());
      const cost =  (product.price - (product.discount * product.price) / 100) * (match?.count || 1);
      total_cost += cost;
      return {
        ...product.toObject(),
        count: match?.count || 1,
        cost:cost.toFixed(2)
      };
    });

    res.status(200).json({ data: {items : result, total_cost : total_cost.toFixed(2), delivery_charges: 0, handeling_charges : 0}, success: true, message: "Cart fetched successfully" });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

function getProductsTotal(products){
  products.map((product))
}

module.exports = { getCartProducts };
