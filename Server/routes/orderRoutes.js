const express = require("express");
const router = express.Router();
const { getUserOrders } = require("../controllers/orders/orderController");

// GET /api/orders/:userId
router.get("/", getUserOrders);

module.exports = router;
