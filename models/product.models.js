module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // price: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // qty: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   defaultValue: 0,
      // },
      // image: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   defaultValue: "https://via.placeholder.com/150",
      //   validate: {
      //     isUrl: true,
      //   },
      // },
    },
    {
      timestamps: true,
    }
  );
  return Product;
};
