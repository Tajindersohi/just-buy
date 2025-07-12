const Payment = require("../../models/Payment");

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await Payment.find({ userId, status: "success" })
      .populate("products.productId") // populate product details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
      message: "Orders fetched successfully"
    });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { getUserOrders };
