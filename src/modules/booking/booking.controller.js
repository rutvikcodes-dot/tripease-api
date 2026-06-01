import { asyncHandler } from "../../utils/asyncHandler.js";
import * as bookingService from "../booking/booking.service.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { body: bookingData } = req;

  const booking = await bookingService.createBooking(
    bookingData,
    req.user?.id || null
  );
  res.status(201).json({
    success: true,
    data: booking,
    message: "Booking created successfully",
  });
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const { user } = req;

  const bookings = await bookingService.getMyBookings(user.id);

  res.status(200).json({
    success: true,
    data: bookings,
  });
});
