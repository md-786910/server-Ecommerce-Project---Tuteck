const db = require("../models");
const Cart = db.cart;

//get all orders of loged in users

// Get all orders by admin
const getAllCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const getAllCart = await Cart.findAll({ where: { userId: req.user.id } });
    res.status(201).json({
      success: true,
      message: "fetch all Order successfully !",
      cart: getAllCart,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//create  a new cart
const CreateNewCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const userId = req.user.id;
    const { productId, name, image, description, information, price, qty } =
      req.body;

    //check if product is already in cart
    const existProduct = await Cart.findOne({
      where: {
        userId,
        productId,
      },
    });
    if (existProduct) {
      // update qty only
      // existProduct.qty += 1;
      // existProduct.save();
      return res.status(201).json({
        success: true,
        message: "product already exist!",
      });
    } else {
      const cartNew = await Cart.create({
        userId,
        productId,
        name,
        image,
        description,
        information,
        price,
        qty,
      });

      return res.status(201).json({
        success: true,
        message: "cart created successfully !",
        cart: cartNew,
      });
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

//get order by id
const getCartById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }

    const cart = await Cart.findOne({
      where: { userId: req.user.id, id: req.params.id },
    });
    if (cart) {
      res.status(201).json({
        success: true,
        cart: cart,
      });
    } else {
      res.status(404).json({ error: "cart not found" });
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

const updateCartById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const cartData = await Cart.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });

    if (cartData) {
      const { qty } = req.body;

      cartData.qty += qty;
      await cartData.save();

      res.status(201).json({
        success: true,
        message: "cart Updated !",
        order: cartData,
      });
    } else {
      res.status(404).json({ error: "cart not found" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete Order by admin
const deleteCartById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        id: req.params.id,
      },
    });
    if (cart) {
      await cart.destroy();
      res.status(201).json({
        success: true,
        message: "cart Deleted !",
      });
    } else {
      res.status(404).json({ error: "cart not found" });
    }
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getAllCart,
  CreateNewCart,
  getCartById,
  updateCartById,
  deleteCartById,
};
