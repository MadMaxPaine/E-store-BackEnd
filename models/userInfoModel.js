const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const UserInfo = sequelize.define("user_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  secondName: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING, allowNull: false },
});

module.exports = UserInfo;
