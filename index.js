// packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");
const apicache = require("apicache");

const app = express();
// config
config({ path: "./config.env" });

// protect
const { protect } = require("./authentication/protect");

// PORT
const PORT = process.env.PORT || 5000;

// connection
require("./models");

// ---------------------Routes--------------
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");
const productGetRoutes = require("./routes/product.routes");
const addressGetRoutes = require("./routes/address.routes");

const productRouter = require("./api/productApi");

// Model
const db = require("./models");

const userModel = (req, res, next) => {
  req.model = db.user;
  next();
};

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(morgan("dev"));

//configure apicache
const cache = apicache.middleware;

// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

// user
app.use("/api/user", userRoutes);

// for product listing  -  AMAZON Scrapper api
app.use("/api/product", cache("5 minutes"), productRouter);

// product - orders + cart
app.use("/api/order", userModel, protect, orderRoutes);
app.use("/api/address", userModel, protect, addressGetRoutes);
app.use("/api/cart", userModel, protect, cartRoutes);

// product management by admin route
app.use("/api/prod/admin", productGetRoutes);

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
