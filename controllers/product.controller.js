const db = require("../models");
const Product = db.product;

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const createprod = await Product.create({
      title: "product1",
      description: "product1",
    });
    res.status(201).json({
      data: createprod,
      status: true,
      message: "product added successfully",
    });
  } catch (error) {
    // console.log(error);

    res.status(401).json({ status: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(201).json({
      data: product,
      status: "success",
      message: "product fetch successfully",
    });
  } catch (error) {
    res.status(401).json({ status: false, message: error.message });
  }
};

module.exports = {
  getProduct,
  addProduct,
};
