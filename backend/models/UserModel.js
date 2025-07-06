const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'  // for future admin/user roles
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: '/assets/default-user.png'
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;

