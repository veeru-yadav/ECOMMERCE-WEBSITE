import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api'; // ✅ use correct admin path if needed
import { useAuth } from '../../context/AuthContext';


const DeleteProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await API.delete(`/products/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      setProducts(products.filter((p) => p.id !== productId));
      setMessage('✅ Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('❌ Failed to delete product');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Delete Products</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="row">
        {products.length === 0 ? (
          <p className="text-center text-muted">No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  
                  <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={() => navigate(`/admin/update-product/${product.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                  
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeleteProduct;
