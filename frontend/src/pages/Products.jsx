// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { useProductFilters } from '../context/ProductFilterContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { filters } = useProductFilters();
  const navigate = useNavigate();

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

  useEffect(() => {
    applySearchAndFilter();
  }, [searchTerm, products, filters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const applySearchAndFilter = () => {
    let result = [...products];

    // Search - match space-separated substrings
    if (searchTerm) {
      const keywords = searchTerm.split(' ');
      result = result.filter((product) =>
        keywords.every((kw) => product.name.toLowerCase().includes(kw))
      );
    }

    // Category filter
    if (filters.categories.length) {
      result = result.filter((product) =>
        filters.categories.some((cat) =>
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    // Subcategory filter (match in name)
    if (filters.subcategories?.length) {
      result = result.filter((product) =>
        filters.subcategories.some((sub) =>
          product.name.toLowerCase().includes(sub.toLowerCase())
        )
      );
    }

    // Sorting
    if (filters.sort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'Newest First') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(result);
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-100 w-md-50"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button
          className="btn btn-dark"
          onClick={() => navigate('/filter')}
        >
          Filter
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-muted">No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
