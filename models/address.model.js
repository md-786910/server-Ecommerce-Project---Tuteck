module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.JSON,
      },
    },
    {
      timestamps: true,
      strict: false,
    }
  );
  return Address;
};
