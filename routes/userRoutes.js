const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, '8a70442ec8ff5c234bd745157b69e9d82d8032fd53c1c9ea976cd7bdc113971f1a7e80d4c77eb1e1c7d53af94e202fc5b58e2d98076bcf2a598cc3fc0a00c5c', { expiresIn: '1h' });

    // Send the token as a response
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
