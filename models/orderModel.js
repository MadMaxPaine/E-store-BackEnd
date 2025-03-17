const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel"); // Імпорт моделі User

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { 
      model: User,
      key: "id" 
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
      isIn: [["pending", "processing", "shipped", "delivered", "canceled"]],
    },
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "credit_card",
    validate: {
      isIn: [["credit_card", "paypal", "bank_transfer", "cash_on_delivery"]],
    },
  },
  shippingAddress: {
    type: DataTypes.JSONB, // Використовуємо JSONB для PostgreSQL
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Order;
