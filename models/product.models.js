module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      title: {
        type: DataTypes.STRING,
        defaultValue: "iweiouwe",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://via.placeholder.com/150",
        validate: {
          isUrl: true,
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Product;
};
