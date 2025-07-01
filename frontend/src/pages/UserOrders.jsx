import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api/order';
import { useAuth } from '../context/AuthContext';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders(token);
        setOrders(res);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

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
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
