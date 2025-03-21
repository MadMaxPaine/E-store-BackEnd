const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Device = sequelize.define('device', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 price: { type: DataTypes.INTEGER, allowNull: false },
 rating: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
 img: { type: DataTypes.STRING, allowNull: false },
});
module.exports = Device;