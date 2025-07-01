
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Sequelize instance

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'products', // name in MySQL
  timestamps: true, // adds createdAt, updatedAt
});

module.exports = Product;
