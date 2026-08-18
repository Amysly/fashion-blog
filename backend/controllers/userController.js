import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import bcrypt from "bcryptjs";
import  generateToken  from '../utils/generateToken.js  ';
import { jwtVerify } from 'jose';
import JWT_SECRET from '../utils/getJwtSecrete.js';

// @desc    Register a new user
// @route   POST /api/user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,role  } = req.body || {};

  if (!name || !email || !password || !role ) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role, 
  });

  //create Tokens
  const payload = { userId: user._id.toString() }
  const accessToken = await generateToken(payload, '15m');
  const refreshToken = await generateToken(payload, '30d');

  //Set refresh token in HTTP-Only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:'lax',
    maxAge: 30*24*60*60*1000 //30 days
  })
 
  res.status(201).json({
    accessToken,
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if ( !email || !password) {
    res.status(400);
    throw new Error('email and password are required');
  }

  const user = await User.findOne({email});

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { userId: user._id.toString() }
    const accessToken = await generateToken(payload, '10m');
    const refreshToken = await generateToken(payload, '30d');

    //Set refresh token in HTTP-Only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite:'lax',
      maxAge: 30*24*60*60*1000 //30 days
    })

res.status(200).json({
  accessToken,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});


//logout user
const logOut = asyncHandler(async (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:'lax'
  })
  res.status(200).json({message:'logged out successfully'})
})

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body || {};

  if (!name?.trim() || !email?.trim()) {
    res.status(400);
    throw new Error('Name and email are required');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailOwner = await User.findOne({ email: normalizedEmail });
  if (emailOwner && emailOwner.id !== req.user.id) {
    res.status(409);
    throw new Error('An account with this email already exists');
  }

  req.user.name = name.trim();
  req.user.email = normalizedEmail;
  await req.user.save();

  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

/*const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error('Current and new passwords are required');
  }
  if (newPassword.length < 6) {
    res.status(400);
    throw new Error('New password must be at least 6 characters');
  }

  const user = await User.findById(req.user.id);
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  user.password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

//Generate new access token from refresh token
//public(Needs valid refresh token in cookie)
*/

const refresh = asyncHandler(async (req,res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(204).end();
  }
  const { jwtVerify } = await import('jose');
  const {payload} = await jwtVerify(token, JWT_SECRET)
  const user = await User.findById(payload.userId)
  
  if (!user) {
    res.status(401);
    throw new Error('No user')
  }
  const newAccessToken = await generateToken({userId: user._id.toString()}, '10m')
  res.json({
    accessToken: newAccessToken,
    user:{
      id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
    } 
  })
})


export default {
    registerUser,
    login,
    logOut,
    updateProfile,
    //updatePassword,
     refresh
};
