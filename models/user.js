const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { Ticket } = require('./ticket');
console.log(Ticket)

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isOrganizer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  });
  return User; 
}
// // user association
// User.hasMany(sequelize.models.Ticket, {
//   foreignKey: 'userId',
//   onDelete: 'SET NULL',
// });


