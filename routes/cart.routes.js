const express = require("express");
const router = express.Router();

const {
  CreateNewCart,
  getAllCart,
  getCartById,
  updateCartById,
  deleteCartById,
} = require("../controllers/cart.controller");

//done
router.route("/add").post(CreateNewCart);

//DONE
router.route("/getAll").get(getAllCart);
//DONE
router
  .route("/cartAction/:id")
  .get(getCartById)
  .put(updateCartById)
  .delete(deleteCartById);

module.exports = router;
