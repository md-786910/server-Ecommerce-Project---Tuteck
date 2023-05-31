const { Sequalize, Op } = require("sequelize");
const db = require("../models/product.models");
const Product = db.product;

const getUsers = async (req, res) => {
  try {
    const findAllUser = await User.findAll();
    res.status(200).json(findAllUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const addUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await User.create({ firstName, lastName });
    res.status(200).json(user.toJSON());
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  addUser,
  getUsers,
};
