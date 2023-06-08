// const {} =require("./product.models")
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        "Review",
        {

            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

        },

        // reviews , user
        {
            timestamps: true,
        }
    );
    return Review;
};


//   // Define the associations
// Reviews.belongsTo(Product);
// Reviews.belongsTo(User);













