import User from '../models/user.js';
import jwt from '../utils/jwtUtils.js';

export const registerUser = async (req, res) => {
  const {email, username, password } = req.body;
  try {
    const user = await User.create({ username, password,email });
    res.status(201).json({ token: jwt.generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({ token: jwt.generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
