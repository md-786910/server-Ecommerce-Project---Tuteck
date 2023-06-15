const { Sequelize, DataTypes } = require("sequelize");
const productModel = require("./product.models");
const userModel = require("./users.models");
const reviewsModel = require("./reviews.product.models");

// # creating connection
// const SQL_PASSWORD = process.env.SQL_PASSWORD;
// const SQL_USERNAME = process.env.SQL_USERNAME;
// const SQL_DB = process.env.SQL_DB;
// const HOST_NAME = process.env.HOST_NAME;
const DB_URL = process.env.DB_URL;
const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// const sequelize = new Sequelize(SQL_DB, SQL_USERNAME, SQL_PASSWORD, {
//   host: HOST_NAME,
//   logging: false,
//   dialect: "postgres",
//   port: 5432,
// });

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
db.user = userModel(sequelize, DataTypes);
db.reviews = reviewsModel(sequelize, DataTypes);

// sequelize property
db.sequelize.sync({ force: true });

module.exports = db;
