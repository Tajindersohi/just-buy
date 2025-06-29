const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true },         
    password: { type: String },                                  
    userRole: { type: String },                                  
    phoneNumber: { type: Number, unique: true, sparse: true },   
    lastOtp: { type: Number, sparse: true },                     
    otpExpiryDate: { type: Date },                               
    isRootAdmin: { type: Boolean, default: false },
  },
  { timestamps: true } 
);

// Hash password before saving (only if password is set)
userSchema.pre('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
