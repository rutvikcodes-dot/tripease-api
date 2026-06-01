import authRoutes from '../modules/auth/auth.route.js';
import hotelRoutes from '../modules/hotel/hotel.route.js';
import cityRoutes from '../modules/city/city.routes.js';
import bookingRoutes from '../modules/booking/booking.route.js';

export const registerRoutes = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/hotels', hotelRoutes);
  app.use('/api/cities', cityRoutes);
  app.use('/api/bookings', bookingRoutes);
};
