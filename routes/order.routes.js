const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  CreateNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  checkoutOrder,
  paymentCreateOrder,
} = require("../controllers/order.controller");

//done
router.route("/create").post(CreateNewOrder);

//DONE
router.route("/AllOrder").get(getAllOrders);
//DONE
router
  .route("/actionOrder/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

// -----------------Payment|| Checkout-----------------------
router.post("/create/:orderId", checkoutOrder);
router.post("/capture/:paymentId", paymentCreateOrder);

module.exports = router;
