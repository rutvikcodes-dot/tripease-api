import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { ROLES } from '../constants/roles.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.CUSTOMER,
    },
  },
  { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

User.associate = (models) => {
  User.hasMany(models.Booking, { foreignKey: 'userId', as: 'bookings' });
};

export default User;
