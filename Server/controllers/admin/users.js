const User = require('../../models/user');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, phoneNumber, password, userRole } = req.body;
    const user = new User({ email, password, userRole, phoneNumber });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Don't allow empty password to overwrite existing one
    if (!updateData.password) {
      delete updateData.password;
    } else {
      // Optional: hash the password if you're using bcrypt
      // updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.isRootAdmin) {
      return res.status(403).json({ success: false, message: 'Cannot delete root admin' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { getAllUsers, createUser, updateUser, deleteUser };
