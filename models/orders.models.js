module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      orderId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      userOrder: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },

      totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalQty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      GST: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      priceGST: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      razorpay_order_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      razorpay_payment_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      status: {
        type: DataTypes.STRING,
        // enum: [
        //   "PENDING",
        //   "PAID",
        //   "PROCESSING",
        //   "DISPATCHED",
        //   "SHIPPING",
        //   "DELIVERED",
        // ],
        validate: {
          isIn: [
            [
              "PENDING",
              "PAID",
              "PROCESSING",
              "DISPATCHED",
              "SHIPPING",
              "DELIVERED",
            ],
          ],
        },
        defaultValue: "PENDING",
      },
    },
    {
      timestamps: true,
      strict: false,
    }
  );
  return Order;
};
