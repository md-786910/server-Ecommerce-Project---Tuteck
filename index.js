// packages
const express = require("express");
const { config } = require("dotenv");

// connection
require("./models");

const app = express();

// config
config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server static files
// #

// Routing
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("app is running " + PORT);
});
