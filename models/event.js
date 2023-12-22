const { DataTypes, Sequelize } = require("sequelize");
const organizerModel  = require("./organizer");

module.exports = (sequelize) => {
  const Organizer = organizerModel(sequelize);
  const Event = sequelize.define("Event", {
    eventId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 50], // max and min value
          msg: "Name must be between 3 and 50 characters long ",
        },
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    decription: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10], // of min length 10
          msg: "Description must be at least 10 char long ",
        },
      },
    },
    organizerId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  });
  // event associations
  // Event.belongsTo(Organizer, {
  //   foreignKey: "organizerId",
  //   onDelete: "SET NULL",
  // });
  // Event.hasMany(sequelize.models.Ticket, {
  //   foreignKey: "eventId",
  //   onDelete: "SET NULL",
  // });
};
