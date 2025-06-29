const productUser = require('../../models/productUser');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs"); // If you're using bcrypt

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      $or: [{ userRole: 'admin' }, { isRootAdmin: true }]
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.userRole, isRootAdmin: user.isRootAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const { email, password, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userRole = 'admin';
    const user = new User({ email, password, userRole, phoneNumber });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: err.message });
  }
};


const handleLoginWithOtp = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    let currentTime = new Date();

    let user = await User.findOne({ phoneNumber, lastOtp: otp });

    if (!user) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    let otpExpiryTime = new Date(user.otpExpiryDate);
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); 

    if (currentTime > otpExpiryTime) {
      return res.status(401).json({ message: 'OTP Expired' });
    }

    const token = jwt.sign(
      { id: user._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, user ,message:"Login Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sentLoginOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    let minNum = 100000;
    let maxNum = 999999;
    // const lastOtp = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    const lastOtp = 123456;
    let otpExpiryDate = new Date();
    const userRole = 'user';
    let user = await User.findOneAndUpdate(
      { phoneNumber }, 
      { lastOtp, otpExpiryDate, userRole },
      { new: true, upsert: true, projection: { phoneNumber: 1, lastOtp: 1 } }
    );
    res.json({success:true,sent:true, message:"Please enter a verification code"});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};

const handleGetMe = async (req, res) => {
  try {
     const user = await User.findById(req.user.id).select('-password'); 
     if (!user) {
         return res.status(404).json({ message: 'User not found' });
     }
     res.json({ user, message: "User fetched successfully" });
    } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
};

module.exports = {handleLogin, createUser, handleLoginWithOtp, sentLoginOtp, handleGetMe}