// packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");
const { protect } = require("./authentication/protect");

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
app.use(morgan("dev"));

// server static files

// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", productRoutes);

app.use("/api", userRoutes);

app.use("/api", orderRoutes);

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
