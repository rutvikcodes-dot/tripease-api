import db from "../../models/index.js";
import { sendBookingConfirmation } from "../../common/providers/notification.provider.js";
const { Booking, Room, Hotel } = db;

export const createBooking = async (bookingData, userId) => {
  const {
    hotelId,
    roomId,
    guests,
    guestName,
    guestEmail,
    guestPhone,
    checkInDate,
    checkOutDate,
    totalPrice,
    paymentId,
    taxes,
    subtotal,
  } = bookingData;
  if (
    !roomId ||
    !guestName ||
    !guestEmail ||
    !guestPhone ||
    !checkInDate ||
    !checkOutDate ||
    !totalPrice
  ) {
    const error = new Error("Missing required booking details");
    error.statusCode = 400;
    throw error;
  }

  const hotel = await Hotel.findByPk(hotelId);
  const room = await Room.findByPk(roomId);

  if (!room || room.hotelId !== hotelId) {
    const error = new Error("Room not found");
    error.statusCode = 404;
    throw error;
  }

  const booking = await Booking.create({
    ...bookingData,
    userId: userId || null,
    status: "confirmed",
  });
  await sendBookingConfirmation({
    guestEmail,
    guestName,
    hotelName: hotel.name,
    roomName: room.type,
    guests,
    checkInDate,
    checkOutDate,
    subtotal,
    taxes,
    totalPrice,
    paymentId,
  });

  return booking;
};

export const getMyBookings = async (userId) => {
  return Booking.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            model: Hotel,
            as: "hotel",
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};
