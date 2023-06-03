const { Sequelize, DataTypes } = require("sequelize");
const productModel = require("./product.models");
// this is my credential for database (mysql)

// # creating connection
const SQL_PASSWORD = process.env.SQL_PASSWORD;
const SQL_USERNAME = process.env.SQL_USERNAME;
const SQL_DB = process.env.SQL_DB;

const sequelize = new Sequelize(SQL_DB, SQL_USERNAME, SQL_PASSWORD, {
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
