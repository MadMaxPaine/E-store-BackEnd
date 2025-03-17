const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // Виправлено помилку в назві змінної

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

module.exports = User;
