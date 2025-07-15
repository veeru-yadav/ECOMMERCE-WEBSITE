const { Order, OrderItem, Product, User } = require('../models');

exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items', // must match alias in model/index.js
          include: [
            {
              model: Product,
              as: 'product' // must match alias in model/index.js
            }
          ]
        },
        {
          model: User,      // 👈 Include user
          as: 'user',       // 👈 Must match the alias used in your model association
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (err) {
    console.error('🔥 Error fetching admin orders:', err.message);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
