import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
        
        //console.log('Fetched products:', res.data); // 👈 Log whole product array

      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
