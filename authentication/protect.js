const { verifyToken } = require("./jwt");
const db = require("../models");

const protect = async (req, res, next) => {
  const Model = req.model;
  // const Model = db.user;

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await Model.findByPk(payload.id);

    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).end();
  }
};

module.exports = { protect };
