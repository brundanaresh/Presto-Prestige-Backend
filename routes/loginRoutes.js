const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
        const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error in /api/login:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
