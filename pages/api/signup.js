import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';

dbConnect();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    try {
      console.log('Searching for user with email:', email);
      const existingUser = await User.findOne({email});

      if (existingUser) {
        console.log('User already exists:', existingUser);
        return res.status(400).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error in /api/signup:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};