const User = require('../models/User');
const { generateToken, sendMagicLink } = require('../utils/auth');
const { createError } = require('../utils/errorHandler');
const { validateEmail } = require('../utils/validators');

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!validateEmail(email)) {
      throw createError(400, 'Invalid email format');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, 'Email already registered');
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

const requestMagicLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, 'User not found');
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    await sendMagicLink(email, token);

    res.status(200).json({
      success: true,
      message: 'Magic link sent successfully',
      data:user
    });
  } catch (error) {
    next(error);
  }
};

const verifyMagicLink = async (req, res, next) => {
  try {
    const { user } = req;
    
    const sessionToken = generateToken(user._id, '7d');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: sessionToken
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  requestMagicLink,
  verifyMagicLink
};
