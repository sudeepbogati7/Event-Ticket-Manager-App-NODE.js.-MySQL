const { DataTypes } = require('sequelize');
const { LIMIT_WORKER_THREADS } = require('sqlite3');

module.exports = (sequelize) => {
    const Organizer = sequelize.define('Organizer', {
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
    });
    console.log("Organizer model : ", Organizer === sequelize.models.Organizer);

    return Organizer;
};
