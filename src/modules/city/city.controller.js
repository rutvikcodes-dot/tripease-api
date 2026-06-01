import { asyncHandler } from '../../utils/asyncHandler.js';
import AppError from '../../utils/appError.js';
import * as cityService from './city.service.js';

export const searchCities = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    throw new AppError('keyword is required', 400);
  }

  const cities = await cityService.searchCities(keyword);

  res.status(200).json({
    success: true,
    data: cities,
  });
});

export const getCities = asyncHandler(
  async (req, res) => {
    const cities =
      await cityService.getCities();

    res.status(200).json({
      success: true,
      data: cities,
    });
  }
);
