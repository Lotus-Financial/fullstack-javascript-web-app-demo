import Sequelize from 'sequelize';

const { Sequelize } = Sequelize;

// Passing a connection URI
const sequelize = new Sequelize('', 'postgres', 'password', {
  dialect: 'postgres'
});

// try {
//   await sequelize.authenticate();
//   console.log('Connection to database has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

export default sequelize;
