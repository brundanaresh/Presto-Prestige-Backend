import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user._id }, '28a70442ec8ff5c234bd745157b69e9d82d8032fd53c1c9ea976cd7bdc113971f1a7e80d4c77eb1e1c7d53af94e202fc5b58e2d98076bcf2a598cc3fc0a00c5c', {
        expiresIn: '1h',
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
