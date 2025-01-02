const User = require('../models/user');
const jwt = require('jsonwebtoken');
const handleLogin = async (req,res) => {
    try {
        console.log("reqreq",req.body);
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        // const isMatch = await User.comparePassword(password);
        // if(!isMatch){
        //     return res.status(401).json({message:'Invalid Credentials'});
        // }
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

module.exports = {handleLogin, createUser}