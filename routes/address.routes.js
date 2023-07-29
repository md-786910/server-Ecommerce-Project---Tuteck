const express = require("express");
const {
  userAddress,
  getUserAddress,
} = require("../controllers/address.controller");
const router = express.Router();

//done
router.route("/create").post(userAddress);

//DONE
router.route("/getAddress").get(getUserAddress);

module.exports = router;
