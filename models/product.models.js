module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "30",
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      timestamps: true,
      strict: false,
    }
  );
  return Product;
};
