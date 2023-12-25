const { Sequelize } = require("sequelize");
const config = require("./config");
const env = process.env.NODE_ENV || 'development'; // define environments 
const express = require('express');
const app = express();

const PORT = 3000 || process.env.PORT;

console.log(config[env])

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    dialect: "mysql",
    host: "localhost",
    logging: console.log,
  }
);
module.exports = sequelize;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`[${env}] connection has been established successfully.`);
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
});
