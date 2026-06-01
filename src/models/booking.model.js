import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  guestName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guestEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guestPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialRequest: {
    type: DataTypes.TEXT,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  taxes: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
});

Booking.associate = (models) => {
  Booking.belongsTo(models.Room, {
    foreignKey: "roomId",
    as: "room",
  });
  Booking.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default Booking;
