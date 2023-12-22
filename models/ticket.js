const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Ticket = sequelize.define(
    "Ticket",
    {
      ticketId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ticketNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        defaultValue: 199.99,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: (ticket, options) => {
          // Generate a unique ticket number using UUID
          ticket.ticketNumber = Math.floor(Math.random() * 1000)
        },
      },
    }
  );

  // Ticket.belongsTo(sequelize.models.Organizer, {
  //   foreignKey: "organizerId",
  //   onDelete: "SET NULL",
  // });
  // Ticket.belongsTo(sequelize.models.Event, {
  //   foreignKey: "eventId",
  //   onDelete: "CASCADE",
  // });

  console.log("Orgaizer from ticket mdel : ",sequelize.models.Organizer);
};
