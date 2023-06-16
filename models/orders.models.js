module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
      "Order",
      {
        
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          userId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          productId:{
            type: DataTypes.STRING,
            allowNull: false,
         },
         itemsPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          taxPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
          },

          shippingAdress:{
           
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Burdwan",
             
         },
          orderStatus:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Processing",
          },
          deliveredAt:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Processing",
          },
          paidAt: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Processing",
          },
      
         },
  
      // reviews , user
      {
        timestamps: true,
      }
    );
    return Order;
  };
  
  
  
  
  
  