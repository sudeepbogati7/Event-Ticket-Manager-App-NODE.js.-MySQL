const express = require("express");
const app = express();
app.use(express.json());

const sequelize = require('./config/connection');


// models :
require("./models/event")(sequelize);
require("./models/ticket")(sequelize);
require("./models/organizer")(sequelize);
require('./models/user')(sequelize);





const bodyParser = require("body-parser");




// console.log("Event from index : ",EventModel(sequelize))
// console.log("Ticket from index : ",Ticket)
// console.log("Organizer from index : ",Organizer)


// associate the Ticket model ,
// -----------------------------------------------------------


// event associations
sequelize.models.Event.belongsTo(sequelize.models.Organizer, {
  foreignKey: "Events_ibfk_1",
  onDelete: "SET NULL",
});
sequelize.models.Event.hasMany(sequelize.models.Ticket, {
  foreignKey: "Tickets_ibfk_1",
  onDelete: "SET NULL",
});


// // ticket associations 
sequelize.models.Ticket.belongsTo(sequelize.models.User, {
  foreignKey: 'Tickets_ibfk_2',
  onDelete: 'SET NULL',
});
sequelize.models.Ticket.belongsTo(sequelize.models.Event, {
  foreignKey: "Tickets_ibfk_1",
  onDelete: "CASCADE",
});


// // user association
sequelize.models.User.hasMany(sequelize.models.Ticket, {
  foreignKey: 'Tickets_ibfk_2',
  onDelete: 'SET NULL',
});


//organizers association 
sequelize.models.Organizer.hasMany(sequelize.models.Event, {
  foreignKey: 'Events_ibfk_1',
  onDelete: 'CASCADE',
});

// -----------------------------------------------------------


const PORT = 3000 || process.env.PORT;

app.use(bodyParser.json());

//ticket-route 
const ticketController = require('./routes/ticket');
app.use('/', ticketController);

//Event-route : 
const eventController = require('./routes/event');
app.use('/', eventController);

//User - route
const userController = require('./routes/user');
app.use("/", userController);


// Organizer-route
const organizerController = require('./routes/organizer');
app.use("/", organizerController);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });





sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
  });
});