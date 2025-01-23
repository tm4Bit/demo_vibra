import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vibra', 'user', 'secret', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
