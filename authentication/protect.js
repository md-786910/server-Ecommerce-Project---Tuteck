const { verifyToken } = require("./jwt");

const protect = async (req, res, next) => {
  const Model = req.model;
  // const Model = db.user;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "user not authenticated" });
  }
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "user not authenticated" });
  }
  try {
    const payload = await verifyToken(token);
    const user = await Model.findByPk(payload.id);
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "user not authenticated" });
  }
};

module.exports = { protect };
