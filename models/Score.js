const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

// Modelo para armazenar as pontuações
const Score = sequelize.define('scores', {
  player: { type: DataTypes.STRING, allowNull: false },
  points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  ipAddress: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isIP: true
    }
  }
});

module.exports = Score;