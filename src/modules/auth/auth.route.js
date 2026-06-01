import express from 'express';
import { jwtAuth } from '../../utils/middlewares/auth.middleware.js';
import {
  createUser,
  loginUser,
  logoutUser,
  getProfile,
} from './auth.controller.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', jwtAuth, getProfile);

export default router;
