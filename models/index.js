const { Sequelize, DataTypes } = require("sequelize");
const productModel = require("./product.models");
// this is my credential for database (mysql)

// # creating connection
const sequelize = new Sequelize("ws1", "root", "root", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// # creating instane for models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// creating models
db.product = productModel(sequelize, DataTypes);

// sequelize property
db.sequelize.sync({ force: true });

module.exports = db;
