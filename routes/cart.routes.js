const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  CreateNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

//done
router.route("/order/new").post(CreateNewOrder);

//DONE
router.route("/orders").get(getAllOrders);
//DONE
router
  .route("/order/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;
