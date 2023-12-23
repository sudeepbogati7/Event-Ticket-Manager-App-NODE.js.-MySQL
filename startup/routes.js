module.exports = (app) => {
  //ticket-route
  const ticketController = require("../routes/ticket");
  app.use("/", ticketController);

  //Event-route :
  const eventController = require("../routes/event");
  app.use("/", eventController);

  //User - route
  const userController = require("../routes/user");
  app.use("/", userController);

  // Organizer-route
  const organizerController = require("../routes/organizer");
  app.use("/", organizerController);
};
