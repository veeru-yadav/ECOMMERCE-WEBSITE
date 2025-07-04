import React, { useEffect, useState } from 'react';
import { getOrderDetails } from '../api/order';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getOrderDetails(orderId, token);
        setOrder(res);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
      }
    };

    if (token) fetchDetails();
  }, [token, orderId]);

  if (!order) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Order Details: #{order.id}</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
      <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

      <div className="mt-4">
        <h5>Items:</h5>
        {order.items.map(item => (
          <div key={item.id} className="card p-3 mb-3 shadow-sm">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={`${import.meta.env.VITE_API_URL}${item.product.image}`} alt={item.product.name} className="img-fluid rounded" />
              </div>
              <div className="col-md-10">
                <h6>{item.product.name}</h6>
                <p>{item.product.description}</p>
                <p>Price: ₹{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
