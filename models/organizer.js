const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  const Organizer = sequelize.define("Organizer", {
    organizerId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  );

}
