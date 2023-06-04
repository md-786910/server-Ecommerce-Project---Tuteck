const SECRETS = {
  jwt: process.env.JWT_SECRET_KEY,
  jwtExp: "100d",
};

module.exports = { SECRETS };
