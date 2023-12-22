const { Sequelize } = require("sequelize");
const config = require("./config/config");

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
