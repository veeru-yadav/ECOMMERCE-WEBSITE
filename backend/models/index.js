const Order = require('./OrderModel');
const OrderItem = require('./OrderItemModel');
const Product = require('./ProductModel');
const User = require('./UserModel');
const Cart = require('./CartModel');

// Order → OrderItem (1:M)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE', as: 'order' });

// OrderItem → Product (M:1)
OrderItem.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });

// Product → Cart (1:M)
Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

// Order → User (M:1)
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  Order,
  OrderItem,
  Product,
  User,
  Cart
};
