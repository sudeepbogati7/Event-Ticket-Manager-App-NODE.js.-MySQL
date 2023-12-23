const { Sequelize } = require("sequelize");
const config = require("./config");
const env = process.env.NODE_ENV || 'development'; // define environments 

const sequelize = new Sequelize(
  config.development.databse,
  config.development.username,
  config.development.password,
  {
    dialect: "mysql",
    host: "localhost",
    logging: console.log,
  }
);
module.exports = sequelize;
