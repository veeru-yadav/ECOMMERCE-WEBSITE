import React from 'react';
import { useCart } from '../context/CartContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/order';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.Product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
  try {
    const res = await placeOrder(token);
    navigate('/order-success', { state: { orderId: res.orderId } });
  } catch (err) {
    console.error('Checkout error:', err);
    alert('❌ Failed to place order. Please try again.');
  }
};



  if (cartItems.length === 0) {
    return <div className="container mt-5 text-center"><h3>Your cart is empty 🛒</h3></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="card mb-3 shadow-sm p-3">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img src={item.Product.image} alt={item.Product.name} className="img-fluid rounded" />
            </div>
            <div className="col-md-6">
              <h5>{item.Product.name}</h5>
              <p>{item.Product.description}</p>
              <p><strong>₹{item.Product.price}</strong></p>
              <p>Qty: {item.quantity}</p>
            </div>

            <div className="col-md-4 text-end">
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.Product.id)}
              >
                Remove
              </button>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() =>
                updateQuantity(item.Product.id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() =>
                updateQuantity(item.Product.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

        </div>
      ))}

      <div className="text-end mt-4">
        <h4>Total: ₹{total.toFixed(2)}</h4>
        <button className="btn btn-primary mt-2" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
