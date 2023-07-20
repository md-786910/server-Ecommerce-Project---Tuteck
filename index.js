// packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");
const { protect } = require("./authentication/protect");
const apicache = require("apicache");

const app = express();

// config
config();

// PORT
const PORT = process.env.PORT || 5000;

// connection
require("./models");

// ---------------------Routes--------------
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const cartRoutes = require("./routes/cart.routes");

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

// server static files

//caching all routes for 5 minutes
// app.use(cache("5 minutes"));

// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

// product

// user
app.use("/api/user", userRoutes);

// for product listing
app.use("/api/product", cache("5 minutes"), productRouter);

// product - orders + cart
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
