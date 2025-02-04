const productUser = require('../../models/productUser');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const handleLogin = async (req,res) => {
    try {
        console.log("reqreq",req.body);
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        const token = jwt.sign({id: user._id}, 'your_secret_token',{expiresIn: '1h'});
        res.json({token:token, user:user})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const createUser = async (req,res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const user = new User({ email, password });
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

    let user = await productUser.findOne({ phoneNumber, lastOtp: otp });

    if (!user) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    let otpExpiryTime = new Date(user.otpExpiryDate);
    otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10); 

    if (currentTime > otpExpiryTime) {
      return res.status(401).json({ message: 'OTP Expired' });
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_token', { expiresIn: '1h' });
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

    let user = await productUser.findOneAndUpdate(
      { phoneNumber }, 
      { lastOtp, otpExpiryDate },
      { new: true, upsert: true, projection: { phoneNumber: 1, lastOtp: 1 } }
    );
    res.json({success:true,sent:true, message:"Please enter a verification code"});
  } catch (error) {
    res.status(500).json({success:false, message: error.message });
  }
};


module.exports = {handleLogin, createUser, handleLoginWithOtp, sentLoginOtp}