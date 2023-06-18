module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      priceGST: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: [
          "PENDING",
          "PAID",
          "PROCESSING",
          "DISPATCHED",
          "SHIPPING",
          "DELIVERED",
        ],
        defaultValue: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  );
  return Order;
};
