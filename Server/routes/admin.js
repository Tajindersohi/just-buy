const express = require('express');
const router = express.Router();
const { handleLogin,createUser } = require('../controllers/auth/auth');

router.post("/login", handleLogin);
router.post("/register", createUser);

module.exports = router;
