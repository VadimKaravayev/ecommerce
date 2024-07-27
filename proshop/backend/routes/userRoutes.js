import express from 'express';
import {
  getUsers,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/users

router.route('/').get(getUsers).post(registerUser);
router.route('/logout').post(logoutUser);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
