const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TypeBrand = sequelize.define('typeBrand', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

module.exports = TypeBrand;