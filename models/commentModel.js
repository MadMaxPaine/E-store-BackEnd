const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('comment', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 parent_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: 0 },
 comment: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Comment;