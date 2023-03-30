const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    database: 'eduwork-cruds-v2',
    host: 'localhost',
    username: 'root',
    password: 'roots',
    dialect: 'mysql'
})

const call = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

call()

module.exports = sequelize;