import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import JWT_SECRET from '../utils/getJwtSecrete.js';
import { jwtVerify } from 'jose';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const { jwtVerify } = await import('jose');
      const { payload } = await jwtVerify(token, JWT_SECRET);

      req.user = await User.findById(payload.userId)
        .select('-password')

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default  protect ;
