const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./userModel'); 
const Order = require('./orderModel'); 

const Basket = sequelize.define('basket', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  status: { 
    type: DataTypes.ENUM('open', 'completed', 'abandoned'),
    allowNull: false,
    defaultValue: 'open',
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Використовуємо модель замість назви таблиці
      key: 'id',
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  orderId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Order, // Використовуємо модель замість назви таблиці
      key: 'id',
    },
    onDelete: "SET NULL", // Якщо видалити замовлення, то orderId буде NULL
    onUpdate: "CASCADE",
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Basket;
