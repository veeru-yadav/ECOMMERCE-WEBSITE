import React, { useEffect, useState } from 'react';
import { getUserOrders, cancelOrder } from '../api/order';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  const handleCancel = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await cancelOrder(orderId, token);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getUserOrders(token);
      setOrders(res);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {

    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="card mb-4 shadow-sm p-3">
            <Link to={`/order/${order.id}`}  className="text-dark text-decoration-none">
              <h5>Order #{order.id}</h5>
              <p>Total: ₹{order.totalAmount}</p>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

              <div className="mt-3">
                <h6>Items:</h6>
                {order.items.map(item => (
                  <div key={item.id} className="mb-2 border-bottom pb-2">
                    <strong>{item.product.name}</strong> — Qty: {item.quantity} — ₹{item.product.price}
                  </div>
                ))}
              </div>

              {order.status === 'Pending' && (
                <div className="text-end mt-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
