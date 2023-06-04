const express = require("express");
const router = express.Router();
const { getProduct, addProduct } = require("../controllers/product.controller");

router.route("/product").get(getProduct).post(addProduct);

module.exports = router;
