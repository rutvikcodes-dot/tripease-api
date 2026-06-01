import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../booking/booking.controller.js";
import { jwtAuth, optionalJwtAuth } from '../../utils/middlewares/auth.middleware.js';

const router = express.Router();

router.post("/", optionalJwtAuth, createBooking);
router.get("/my-bookings", jwtAuth, getMyBookings);

export default router;
