const Order = require('./OrderModel');
const OrderItem = require('./OrderItemModel');
const Product = require('./ProductModel');

// Order → OrderItem (1:M)
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// OrderItem → Product (M:1)
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  Order,
  OrderItem,
  Product
};
