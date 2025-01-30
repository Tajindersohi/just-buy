const mongoose = require('mongoose');

const productUserSchema = new mongoose.Schema({
    phoneNumber: { type: Number, required: true, unique: true },
    lastOtp: { type: Number, required: true, unique: true },
    otpExpiryDate: { type: Date, required: true, unique: false },
});

module.exports = mongoose.model('ProductUser', productUserSchema);
  

  