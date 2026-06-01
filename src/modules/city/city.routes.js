import express from 'express';
import { searchCities, getCities } from './city.controller.js';

const router = express.Router();

router.get('/search', searchCities);

router.get("/", getCities);

export default router;
