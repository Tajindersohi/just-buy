const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  mobile: { type: String, required: true },
  lat: { type: Number },
  lon: { type: Number },
  house: { type: String, required: true }, // newly used in frontend
  landmark: { type: String }, // optional
  type: {
    type: String,
    enum: ['Home', 'Work', 'Hotel', 'Other'],
    default: 'Home'
  },
  isDefault: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);
