const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, '8a70442ec8ff5c234bd745157b69e9d82d8032fd53c1c9ea976cd7bdc113971f1a7e80d4c77eb1e1c7d53af94e202fc5b58e2d98076bcf2a598cc3fc0a00c5c'); 

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    req.user = user; // Attach the user to the request for further usage
    next(); // Proceed to the next middleware or the route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = isAuthenticated;
