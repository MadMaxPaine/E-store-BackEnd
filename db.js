const { Sequelize } = require("sequelize");
const cfg = require("./configs/config");

const sequelize = new Sequelize(cfg.database.name, cfg.database.user, cfg.database.password, {
  dialect: cfg.database.dialect, 
  host: cfg.database.host,
  port: cfg.database.port,
  logging: false, // Вимкнення логування запитів у консоль (можна включити для дебагу)
});

module.exports = sequelize;