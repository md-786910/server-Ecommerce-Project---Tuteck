const db = require("../models");
const { Op } = require("sequelize");
const Product = db.product;
const Review = db.reviews;
const Order = db.order;

//get all orders of loged in users

// Get all orders by admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(201).json({
      success: true,
      message: "fetch all Order successfully !",
      orders: orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//create  a new order
const CreateNewOrder = async (req, res) => {
  try {
    //orderNumber ,userId , productId
    const { orderNumber, userId, productId, itemsPrice, totalPrice } = req.body;
    const order = await Order.create({
      orderNumber,
      userId,
      productId,
      itemsPrice,
      totalPrice,
    });
    res.status(201).json({
      success: true,
      message: "Order Placed successfully !",
      order: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//get order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
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
    const order = await Order.findByPk(req.params.id);
    if (order) {
      const { orderNumber, userId, productId, itemsPrice, totalPrice } =
        req.body;

      await order.update({
        orderNumber,
        userId,
        productId,
        itemsPrice,
        totalPrice,
      });
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
    const order = await Order.findByPk(req.params.id);
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
module.exports = {
  getAllOrders,
  CreateNewOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
