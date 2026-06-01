import { Router } from 'express';
import {
  getAllHotels,
  getHotelById,
  searchHotelOffers,
} from './hotel.controller.js';

const router = Router();

//Public routes
router.get('/search', searchHotelOffers);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);

export default router;
