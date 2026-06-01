import * as authService from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import AppError from '../../utils/appError.js';
import { authCookieName, authCookieOptions } from './auth.cookie.js';

export const createUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    throw new AppError('All fields are required', 400);
  }

  const result = await authService.registerUser({ email, password, username });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('All fields are required', 400);
  }

  const result = await authService.loginUser({ email, password });

  res.cookie(authCookieName, result.token, authCookieOptions);

  res.status(200).json({
    success: true,
    message: 'Login successfully',
    data: {
      user: result.user,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie(authCookieName, authCookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logout successfully',
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const user = await authService.getProfile(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
