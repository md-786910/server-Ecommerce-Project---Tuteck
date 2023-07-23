const { Sequelize, DataTypes } = require("sequelize");
const productModel = require("./product.models");
const userModel = require("./users.models");
const reviewsModel = require("./reviews.product.models");
const orderModel = require("./orders.models");
const cartModel = require("./cart.product.model");

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

// user related db
db.user = userModel(sequelize, DataTypes);

// product related db
db.product = productModel(sequelize, DataTypes);
db.cart = cartModel(sequelize, DataTypes);

// Define the one-to-one association
db.user.hasMany(db.cart, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.cart.belongsTo(db.user, {
  foreignKey: "userId",
});

db.order = orderModel(sequelize, DataTypes);
// Define the one-to-one association for order

db.user.hasMany(db.order, {
  foreignKey: "userId",
});
db.order.belongsTo(db.user, {
  foreignKey: "userId",
});

db.reviews = reviewsModel(sequelize, DataTypes);

// db.reviews = reviewsModel(sequelize, DataTypes);

// instantiate sequelize db
db.sequelize.sync({ force: true });

module.exports = db;
