import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordMatched = await user.matchPassword(password);
  console.log(user);
  if (user && isPasswordMatched) {
    generateToken(res, user._id);
    resWithUser(res, user);
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400);
    throw new Error(`Email: ${email} is already in use`);
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  });

  if (createdUser) {
    generateToken(res, createdUser._id);
    resWithUser(res, createdUser);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'logged out successfully' });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    resWithUser(res, user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    ['name', 'email', 'password'].forEach((prop) => {
      const propVal = req.body[prop];
      if (propVal) {
        user[prop] = propVal;
      }
    });
    const updatedUser = await user.save();
    resWithUser(res, updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

export const getUserById = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

export const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

export const updateUser = asyncHandler(async (req, res) => {});

function resWithUser(res, user) {
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
