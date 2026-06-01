import sequelize from '../config/db.js';
import User from './user.model.js';
import Hotel from './hotel.model.js';
import Room from './room.model.js';
import Booking from './booking.model.js';
import City from './city.model.js';

const db = {
  sequelize,
  User,
  Hotel,
  Room,
  Booking,
  City
};

Object.values(db).forEach((model) => {
  if (model?.associate) {
    model.associate(db);
  }
});

export default db;
