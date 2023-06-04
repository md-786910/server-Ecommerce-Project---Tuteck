const express = require("express")
const router = express.Router();
const { registerUser, getUsers } = require("../controllers/product.controller")


router.route("/register").post(registerUser);
router.route("/users").get(getUsers);


module.exports = router;


