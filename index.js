const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

//models :
const EventModel = require("./models/event");
const TicketModel = require("./models/ticket");
const config = require("./config/config");
const OrganizerModel = require("./models/organizer");
const UserModel = require('./models/user');
const bodyParser = require("body-parser");


const sequelize = new Sequelize(
  config.development.databse,
  config.development.username,
  config.development.password,
  {
    dialect: "mysql",
    host: "localhost",
    logging: false,
  }
);

const Event = EventModel(sequelize);
const Ticket = TicketModel(sequelize);
const Organizer = OrganizerModel(sequelize);
const User = UserModel(sequelize);


// associate the Ticket model ,
// -----------------------------------------------------------


//event associations
Event.belongsTo(sequelize.models.Organizer, {
  foreignKey: "organizerId",
  onDelete: "SET NULL",
});
Event.hasMany(sequelize.models.Ticket, {
  foreignKey: "eventId",
  onDelete: "SET NULL",
});


// ticket associations 
Ticket.belongsTo(sequelize.models.User, {
  foreignKey: 'userId',
  onDelete: 'SET NULL',
});
Ticket.belongsTo(sequelize.models.Event, {
  foreignKey: "eventId",
  onDelete: "CASCADE",
});


// user association
User.hasMany(sequelize.models.Ticket, {
  foreignKey: 'userId',
  onDelete: 'SET NULL',
});

// -----------------------------------------------------------


const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

//ticket-route 
const ticketController = require('./routes/ticket');
app.use('/', ticketController);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });





sequelize.sync({force:true}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
});


module.exports = {
  sequelize,
};