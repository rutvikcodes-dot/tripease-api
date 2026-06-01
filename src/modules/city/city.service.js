import { Op } from "sequelize";
import db from "../../models/index.js";

const { City } = db;

export const searchCities = async (keyword) => {
  const cities = await City.findAll({
    where: {
      name: {
        [Op.iLike]: `%${keyword}%`,
      },
    },
    attributes: [
      "id",
      "name",
      "image",
      "country",
    ],

    order: [["name", "ASC"]],

    limit: 10,
  });

  return cities;
};

export const getCities = async () => {
  return await City.findAll({
    attributes: ["id", "name", "image"],
    order: [["name", "ASC"]],
  });
};