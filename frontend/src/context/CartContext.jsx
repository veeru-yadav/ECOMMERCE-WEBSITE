import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useAuth();

  // Set up axios config
  const config = {
    headers: {
      Authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  };

  // Fetch cart items when user logs in or token changes
  useEffect(() => {
    if (token) {
      API.get('/cart', config)
        .then(res => setCartItems(res.data))
        .catch(err => console.error('Error fetching cart:', err));
    } else {
      setCartItems([]);
    }
  }, [token]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      await API.post('/cart', { productId, quantity }, config);
      // Fetch latest cart
      const res = await API.get('/cart', config);
      setCartItems(res.data);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`, config);
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error('Remove from cart error:', err);
    }
  };

  // Update cart item quantity
 const updateQuantity = async (productId, quantity) => {
  try {
    await API.patch(`/cart/${productId}`, { quantity }, config);
    const res = await API.get('/cart', config); // Refresh cart
    setCartItems(res.data);
  } catch (err) {
    console.error('Update quantity error:', err);
  }
 };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
