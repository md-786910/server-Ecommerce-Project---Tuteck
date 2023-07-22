const uuid = require("uuid").v4;
const Razorpay = require("razorpay");

const db = require("../models");
const Order = db.order;

const config = {
  key_id: "rzp_test_MgNn5wEsqPADa4",
  key_secret: "2e0TiXHTcHs252qDrcXUHOaQ",
};
const instance = new Razorpay({
  key_id: "rzp_test_MgNn5wEsqPADa4",
  key_secret: "2e0TiXHTcHs252qDrcXUHOaQ",
});

//get all orders of loged in users

// Get all orders by admin
const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "fetch all Order successfully !",
      orders: orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error.message);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//create  a new order
const CreateNewOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const newOrder = req.body.order;
    const orderId = uuid();

    const totalPrice = newOrder?.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);

    const totalQty = newOrder?.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    const GSTPrice = totalPrice + (totalPrice * 5) / 100;

    const orderCreate = await Order.create({
      userId: userId,
      userOrder: newOrder,
      orderId: orderId,
      totalPrice: totalPrice,
      totalQty: totalQty,
      GST: 5,
      priceGST: GSTPrice,
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully !",
      order: orderCreate,
    });
  } catch (error) {
    console.log("error", error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//get order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, orderId: req.params.id },
    });
    if (order) {
      res.status(201).json({
        success: true,
        order: order,
      });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update a order status by admin
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, orderId: req.params.id },
    });
    if (order) {
      const { status } = req.body;
      order.status = status;
      res.status(201).json({
        success: true,
        message: "Order Updated !",
        order: order,
      });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete Order by admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.user.id, orderId: req.params.id },
    });
    if (order) {
      await order.destroy();
      res.status(201).json({
        success: true,
        message: "Order Deleted !",
      });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ------------------------------

// create order with payment
// 1. check proper validation and initiate payment
const checkoutOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderProduct = await Order.findOne({
      where: {
        userId: req.user.id,
        orderId: orderId,
      },
    });

    const { priceGST, id } = orderProduct;

    const options = {
      amount: priceGST * 100,
      currency: "INR",
      receipt: `receipt${id}`,
      payment_capture: 0,
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        // console.log(err);
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

//2. pay order payment
const paymentCreateOrder = async (req, res) => {
  try {
    const { response } = req.body;

    const { orderId } = req.query;
    const orderProduct = await Orders.findOne({
      where: {
        userId: req.user.id,
        orderId: orderId,
      },
    });
    const { priceGST } = orderProduct;

    const url = `https://${config.key_id}:${config.key_secret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`;
    const { data: respOrder } = await axios.post(url, {
      amount: priceGST * 100,
      currency: "INR",
    });

    if (respOrder.status === "captured") {
      orderProduct.status = "PAID";

      orderProduct.razorpay_order_id = response.razorpay_order_id;
      orderProduct.razorpay_payment_id = response.razorpay_payment_id;

      await orderProduct.save();
      res.send(respOrder);
    } else {
      return res.status(500).send({
        message: "Payment Failed",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).send({
      message: "Something Went Wrong",
    });
  }
};

module.exports = {
  getAllOrders,
  CreateNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  checkoutOrder,
  paymentCreateOrder,
};
