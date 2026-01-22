const Product = require('../../models/product');

// Utility to calculate discounted cost
const calculateCost = (product, count) => {
  const discountedPrice = product.price - (product.discount * product.price) / 100;
  return discountedPrice * count;
};

// GET /api/cart/products
const getCartProducts = async (req, res) => {
  try {
    const cartItems = req.body; // [{ _id, count }]
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: "Invalid cart format" });
    }

    const ids = cartItems.map(item => item._id);
    const products = await Product.find({ _id: { $in: ids } });

    let total_cost = 0;

    const result = products.map(product => {
      const cartMatch = cartItems.find(item => item._id === product._id.toString());
      const count = cartMatch?.count || 1;
      const cost = calculateCost(product, count);
      total_cost += cost;

      return {
        ...product.toObject(),
        count,
        cost: parseFloat(cost.toFixed(2))
      };
    });

    const response = {
      items: result,
      total_cost: parseFloat(total_cost.toFixed(2)),
      delivery_charges: 0,
      handling_charges: 10
    };

    res.status(200).json({ data: response, success: true, message: "Cart fetched successfully" });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Utility function (optional export)
function getProductsTotal(products = []) {
  return products.reduce((total, product) => {
    const cost = calculateCost(product, product.count || 1);
    return total + cost;
  }, 0);
}

module.exports = { getCartProducts, getProductsTotal };
