import config from './env.js';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  config.DB.NAME,
  config.DB.USER,
  config.DB.PASSWORD,
  {
    host: config.DB.HOST,
    port: config.DB.PORT,
    dialect: 'postgres',
    logging: false
  }
);

export default sequelize;
