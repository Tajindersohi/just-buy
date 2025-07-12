const Razorpay = require("razorpay");

class RazorpayService {
  constructor() {
    this.instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

    createOrder(amount) {
    const amountInPaise = Math.round(amount * 100); // Ensures integer
    return this.instance.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
    });
    }


  verifyPaymentSignature(body) {
    const crypto = require("crypto");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    return generated_signature === razorpay_signature;
  }
}

module.exports = new RazorpayService();
