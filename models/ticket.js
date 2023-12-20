const { DataTypes } = require('sequelize');
const { v4 : uuidv4 } = require('uuid'); 

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket',{
        ticket_id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull : false,
            primaryKey : true,
        },
        price : {
            type : DataTypes.DECIMAL(10,2),
            allowNull : false, 
        }
    }); 

    return Ticket;
};