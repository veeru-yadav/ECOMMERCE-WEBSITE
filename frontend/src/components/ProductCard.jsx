import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text fw-bold">₹{product.price}</p>
        <button className="btn btn-primary w-100" onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
