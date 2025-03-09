const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String, },
    userRole: { type: String, },
    phoneNumber: { type: Number, unique: true },
    lastOtp: { type: Number,  unique: true },
    otpExpiryDate: { type: Date, unique: false },
});

userSchema.pre('save' , async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
  

  