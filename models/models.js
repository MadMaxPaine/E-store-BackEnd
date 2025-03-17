const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Models import
const User = require("./userModel");
const Basket = require("./basketModel");
const BasketDevice = require("./basketDeviceModel");
const Device = require("./deviceModel");
const Type = require("./typeModel");
const Brand = require("./brandModel");
const Rating = require("./ratingModel");
const DeviceInfo = require("./deviceInfoModel");
const TypeBrand = require("./typeBrandModel");
const Comment = require("./commentModel");
const UserInfo = require("./userInfoModel");
const Token = require("./tokenModel");
const Order = require("./orderModel");

// Establish connections

// 📌 Один користувач → один кошик
User.hasOne(Basket, { onDelete: "CASCADE" });
Basket.belongsTo(User);

// 📌 Один користувач → багато рейтингів
User.hasMany(Rating, { onDelete: "CASCADE" });
Rating.belongsTo(User);

// 📌 Один кошик → багато пристроїв через BasketDevice
Basket.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Basket);

// 📌 Один пристрій → один тип
Type.hasMany(Device);
Device.belongsTo(Type);

// 📌 Один бренд → багато пристроїв
Brand.hasMany(Device);
Device.belongsTo(Brand);

// 📌 Пристрій → багато BasketDevice
Device.hasMany(BasketDevice, { onDelete: "CASCADE" });
BasketDevice.belongsTo(Device);

// 📌 Пристрій має багато DeviceInfo
Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

// 📌 Між Type та Brand є зв'язок many-to-many
Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

// 📌 Коментарі
User.hasMany(Comment);
Comment.belongsTo(User);
Device.hasMany(Comment);
Comment.belongsTo(Device);

// 📌 Кожен користувач має одну інформацію про користувача
User.hasOne(UserInfo);
UserInfo.belongsTo(User);

// 📌 Користувач має багато токенів
User.hasMany(Token);
Token.belongsTo(User);

// 📌 Користувач має багато замовлень
User.hasMany(Order, { onDelete: "CASCADE" });
Order.belongsTo(User);

// 📌 Покращений зв’язок між кошиком та замовленням
Basket.belongsTo(Order, { foreignKey: 'orderId', onDelete: "SET NULL" });
Order.hasOne(Basket, { foreignKey: 'orderId' });

// 📌 Кошик може містити багато пристроїв через BasketDevice
Order.belongsToMany(Device, { through: BasketDevice });
Device.belongsToMany(Order, { through: BasketDevice });

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Brand,
  Type,
  Rating,
  TypeBrand,
  DeviceInfo,
  Token,
  UserInfo,
};
