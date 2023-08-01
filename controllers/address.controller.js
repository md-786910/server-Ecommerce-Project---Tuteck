//-------------Add Address-------------
const db = require("../models");
const Address = db.address;

const userAddress = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const addressExist = await Address.findOne({
      where: { userId: req.user.id },
    });

    if (addressExist) {
      addressExist.address = req.body;
      await addressExist.save();
      return res.status(201).send({ message: "address updated successfully" });
    } else {
      const address = await Address.create({
        userId: req.user.id,
        address: req.body,
      });
      await address.save();
      return res.status(201).send({ message: "address added successfully" });
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: e.message, status: false });
  }
};
const getUserAddress = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "user not authorized" });
    }
    const user = await Address.findOne({
      where: { userId: req.user.id },
    });
    if (!user) {
      return res.status(400).send({ message: "user does'nt exist" });
    }
    return res
      .status(200)
      .send({ data: user.address, message: "get address successfully" });
  } catch (e) {
    console.log(e);
    return res.status(401).send({ message: e.message, status: false });
  }
};

module.exports = {
  userAddress,
  getUserAddress,
};
