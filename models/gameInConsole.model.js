const { db, DataTypes } =  require('../utils/database.util');

// Creating our game in console model
const GameinConsole = db.define('gameInConsole', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    }
});

module.exports = { GameinConsole };