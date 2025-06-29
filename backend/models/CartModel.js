const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./ProductModel');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

Cart.belongsTo(Product, { foreignKey: 'productId', as: 'Product' });

module.exports = Cart;
