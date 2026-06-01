import dotenv from 'dotenv';
dotenv.config();

const config = {
  APP_PORT: process.env.APP_PORT,
  DB: {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
  },
};

export default config;
