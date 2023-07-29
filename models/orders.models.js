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
      address: {
        type: DataTypes.JSON,
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
      order_id: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      method: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      vpa: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      contact: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      upi_transaction_id: {
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
