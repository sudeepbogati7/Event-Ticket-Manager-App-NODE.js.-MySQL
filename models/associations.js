const sequelize = require("../config/connection");

module.exports = (sequelize) => {
  //   console.log("user from association.js : ", sequelize.models.User);
  //   console.log("event from association.js : ", sequelize.models.Event);
  //   console.log("Organizer from association.js : ", sequelize.models.Organizer);
  //   console.log("ticket from association.js : ", sequelize.models.Ticket);

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
    foreignKey: "Tickets_ibfk_2",
    onDelete: "SET NULL",
  });
  sequelize.models.Ticket.belongsTo(sequelize.models.Event, {
    foreignKey: "Tickets_ibfk_1",
    onDelete: "CASCADE",
  });

  // // user association
  sequelize.models.User.hasMany(sequelize.models.Ticket, {
    foreignKey: "Tickets_ibfk_2",
    onDelete: "SET NULL",
  });
  //organizers association
  sequelize.models.Organizer.hasMany(sequelize.models.Event, {
    foreignKey: "Events_ibfk_1",
    onDelete: "CASCADE",
  });
};
