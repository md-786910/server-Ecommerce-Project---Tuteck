// packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");

// config
config();

// connection
require("./models");

const app = express();

const PORT = process.env.PORT || 5000;

// express middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(morgan("dev"));

// server static files
// #

// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
