const jwt = require("jsonwebtoken");
const { SECRETS } = require("../config");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    "myjwtSecretrandomTransportExpirationFire",
    {
      expiresIn: SECRETS.jwtExp,
    }
  );
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      "myjwtSecretrandomTransportExpirationFire",
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      }
    );
  });

module.exports = {
  generateToken,
  verifyToken,
};
