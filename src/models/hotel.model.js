import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amenities: {
    type: DataTypes.JSONB,
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

Hotel.associate = (models) => {
  Hotel.hasMany(models.Room, { foreignKey: 'hotelId', as: 'rooms' });
  Hotel.belongsTo(models.City, { foreignKey: "cityId", as: "city", });
};

export default Hotel;
