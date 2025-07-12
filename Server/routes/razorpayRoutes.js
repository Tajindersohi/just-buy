const express = require("express");
const router = express.Router();
const razorpayService = require("../services/razorpayService");
const Payment = require('../models/Payment')
const Cart = require('../models/Cart')

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpayService.createOrder(amount);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err); // ✅ This will show full details
    res.status(500).json({ error: "Order creation failed" });
  }
});

router.post("/verify", async (req, res) => {
  const isValid = razorpayService.verifyPaymentSignature(req.body);
  if (!isValid) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, products, amount } = req.body;
  const userId = req.user._id;
  try {
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      products,
      amount,
      status: "success"
    });

    await payment.save();

    // ✅ Clear the user's cart after successful payment
    await Cart.findOneAndUpdate({ userId }, { products: [] });

    res.json({ success: true, message: "Payment recorded and cart cleared" });
  } catch (err) {
    console.error("Payment save error:", err);
    res.status(500).json({ success: false, message: "Server error while saving payment" });
  }
});

module.exports = router;
