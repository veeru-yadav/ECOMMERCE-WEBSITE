//const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
//const OrderItem = require('../models/OrderItemModel');
//const Product = require('../models/ProductModel');
const { Order, OrderItem, Product } = require('../models'); //require('../models/index.js')


exports.placeOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.findAll({ where: { userId }, include: [{ model: Product, as: 'Product' }] });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Your cart is empty.' });
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.quantity * item.Product.price,
      0
    );

    const order = await Order.create({ userId, totalAmount });

    // Save order items
    const orderItemPromises = cartItems.map(item =>
      OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      })
    );
    await Promise.all(orderItemPromises);

    // Clear cart
    await Cart.destroy({ where: { userId } });

    res.json({ message: '✅ Order placed successfully', orderId: order.id });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ error: '❌ Failed to place order' });
  }
};

exports.getOrderDetails = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({
      where: { id: orderId, userId },
      include: [
        {
          model: OrderItem,
          as: 'items', // <- this alias should match the one in OrderModel association
          include: [
            {
              model: Product,
              as: 'product' // <- this alias should match the one in OrderItemModel
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error('Fetch order failed:', err);
    res.status(500).json({ error: '❌ Failed to fetch order details' });
  }
};



exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: '❌ Failed to fetch user orders' });
  }
};

exports.cancelOrder = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ where: { id: orderId, userId } });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ error: 'Order is already cancelled' });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ message: '✅ Order cancelled successfully' });
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ error: '❌ Failed to cancel order' });
  }
};

