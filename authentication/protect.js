const { verifyToken } = require("./jwt");

const protect = async (req, res, next) => {
  const Model = req.model;

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let token = req.headers.authorization.split("Bearer ")[1];

  if (!token) {
    return res.status(401).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await Model.findById(payload.id);
    //   .populate({ path: "subjects", select: "-addedBy -__v" })
    //   .populate({ path: "languages", select: "name" })
    //   .select("-password -identities")
    //   .lean()
    //   .exec();

    req.user = user;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).end();
  }
};

module.exports = { protect };
