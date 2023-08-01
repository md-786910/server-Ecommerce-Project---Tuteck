const jwt = require("jsonwebtoken");
const { SECRETS } = require("../config");

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, "myjwtSecretrandomTransportExpirationFire", {
    expiresIn: SECRETS.jwtExp,
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      "myjwtSecretrandomTransportExpirationFire",
      (err, payload) => {
        if (err)
          return res.status(401).json({ message: "user not authenticated" });
        resolve(payload);
      }
    );
  });

module.exports = {
  generateToken,
  verifyToken,
};
