const express = require('express');
const app = express();
const { Sequelize }  = require('sequelize');


//models : 
const EventModel = require('./models/event');
const TicketModel = require('./models/ticket');
const config = require('./config/config');

const sequelize = new Sequelize( config.development.databse,config.development.username, config.development.password , {
    dialect: 'mysql',
    host: 'localhost',
    logging : true,
});

const Event = EventModel(sequelize);
const Ticket = TicketModel(sequelize);

const PORT = 3000 || process.env.PORT;

app.use(express.json());


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
});




sequelize.sync().then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on : http://localhost:${PORT}`);
    });
});
