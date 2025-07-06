const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Update profile details (name, email, password, address, photo)
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, email, password, shippingAddress } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Step 1: If a new file is uploaded and there's an old one, delete old photo
    if (req.file) {
      if (user.photo && user.photo !== '/assets/default-user.png') {
        const oldImagePath = path.join(__dirname, '..', 'public', user.photo);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Failed to delete old photo:', err.message);
          } else {
            console.log('Old photo deleted:', oldImagePath);
          }
        });

        user.photo = `/assets/${req.file.filename}`; // Save new photo path
      }
    }
    else{
        user.photo = user.photo;
    }

    // Step 2: Update other fields (if provided)
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.shippingAddress = shippingAddress || user.shippingAddress;
    
    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
