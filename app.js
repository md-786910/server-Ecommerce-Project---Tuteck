const express = require("express");
const app = express();
const { config } = require("dotenv");
// config
config({ path: "./config.env" });


const ProductRouter = require("./routes/product.routes")
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/api/v1', ProductRouter);


module.exports = app;




