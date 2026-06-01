import * as hotelService from './hotel.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import AppError from '../../utils/appError.js';

export const getAllHotels = asyncHandler(async (req, res) => {

  const { query: filters } = req;

  const hotelsData = await hotelService.getAllHotels(filters);

  res.status(200).json({
    success: true,
    ...hotelsData,
  });
});

export const getHotelById = asyncHandler(async (req, res) => {
  const { params: {id} } = req;

  const hotel = await hotelService.getHotelById(id);

  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }

  res.status(200).json({
    success: true,
    data: hotel,
  });
});

export const searchHotelOffers = asyncHandler(async (req, res) => {
  const { cityCode, checkInDate, checkOutDate, adults } = req.query;
  const filters = { cityCode, checkInDate, checkOutDate, adults };

  if (!cityCode || !checkInDate || !checkOutDate || !adults) {
    throw new AppError(
      'cityCode, checkInDate, checkOutDate and adults are required',
      400
    );
  }

  const hotels = await hotelService.searchHotelOffers({ filters });

  res.status(200).json({
    success: true,
    count: hotels.length,
    data: hotels,
  });
});
