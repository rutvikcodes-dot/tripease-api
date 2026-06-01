
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const City = sequelize.define("City", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  country: {
    type: DataTypes.STRING,
    defaultValue: "India",
  },
});

City.associate = (models) => {
  City.hasMany(models.Hotel, {
    foreignKey: "cityId",
    as: "hotels",
  });
};

export default City;