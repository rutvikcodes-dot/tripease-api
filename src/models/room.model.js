import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Room = sequelize.define("Room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerNight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  amenities: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  sizeSqft: {
    type: DataTypes.INTEGER,
  },

  maxGuests: {
    type: DataTypes.INTEGER,
  },

  bedType: {
    type: DataTypes.STRING,
  },

  viewType: {
    type: DataTypes.STRING,
  },
  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Hotels",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Room.associate = (models) => {
  Room.belongsTo(models.Hotel, { foreignKey: "hotelId", as: "hotel" });
  Room.hasMany(models.Booking, { foreignKey: "roomId", as: "bookings" });
};

export default Room;
