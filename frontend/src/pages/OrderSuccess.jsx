import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">✅ Order Placed Successfully!</h2>
      {orderId && <p>Your Order ID: <strong>{orderId}</strong></p>}
      <p>Thank you for shopping with us!</p>
    </div>
  );
};

export default OrderSuccess;
