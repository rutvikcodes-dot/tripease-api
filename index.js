import app from './src/app.js';
import sequelize from './src/config/db.js';
import config from './src/config/env.js';
import './src/models/index.js';



const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');

    await sequelize.sync({ alter: true });
    console.log('Tables synced');

    app.listen(config.APP_PORT, () => {
      console.log(
        `Server running on http://localhost:${config.APP_PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
