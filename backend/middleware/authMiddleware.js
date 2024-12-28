const jwt = require('jsonwebtoken');
const { createError } = require('../utils/errorHandler');
const User = require('../models/User');

const validateToken = async (req, res, next) => {
  try {
    // Check for token in different possible locations
    const token = 
      req.headers.authorization?.split(' ')[1] || 
      req.params.token || 
      req.body.token;
    
    if (!token) {
      throw createError(401, 'No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw createError(404, 'User not found');
    }

    if (user.token !== token) {
      throw createError(401, 'Invalid or expired token');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(createError(401, 'Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(createError(401, 'Token expired'));
    } else {
      next(error);
    }
  }
};
module.exports = {
  validateToken
};

//optional
// const validateToken = async (req, res, next) => {
//   try {
//     const { token } = req.params;
    
//     if (!token) {
//       throw createError(401, 'No token provided');
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       throw createError(404, 'User not found');
//     }

//     if (user.token !== token) {
//       throw createError(401, 'Invalid or expired token');
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === 'JsonWebTokenError') {
//       next(createError(401, 'Invalid token'));
//     } else if (error.name === 'TokenExpiredError') {
//       next(createError(401, 'Token expired'));
//     } else {
//       next(error);
//     }
//   }
// };
