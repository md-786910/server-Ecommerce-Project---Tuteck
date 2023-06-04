const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      mobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{10}$/i,
        },
      },
      //   tokens: [
      //     {
      //       type: DataTypes.STRING,
      //       allowNull: true,
      //     },
      //   ],
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

  User.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((err) => {
        throw new Error();
      });
  });

  return User;
};
