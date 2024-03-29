const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  GetRegister,
} = require("../controllers/auth/user.controller");
const db = require("../models");

const userModel = (req, res, next) => {
  req.model = db.user;
  next();
};

router.post("/register", userModel, Register);
// router.get("/register", userModel, GetRegister);
router.post("/login", userModel, Login);
router.post("/forgotPassword", userModel, ForgotPassword);
router.post("/resetPassword", userModel, ResetPassword);

module.exports = router;
