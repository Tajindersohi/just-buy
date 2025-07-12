const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amount: Number, // In paise
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

  // ✅ Status of payment
  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success"
  },

  // ✅ Order lifecycle status
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
    default: "Processing"
  },

  // ✅ Optional delivery info
  deliveryDate: {
    type: Date,
    default: null
  },

  address: {
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    phone: String,
    type: {
      type: String,
      enum: ["Home", "Office", "Hotel", "Other"],
      default: "Home"
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
