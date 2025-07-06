import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterOverlay from '../components/FilterOverlay';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    subcategories: [],
    sort: ''
  });

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

  useEffect(() => {
    applySearchAndFilter();
  }, [searchTerm, products, activeFilters]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
  };

  const applySearchAndFilter = () => {
    let result = [...products];

    //  Search (space-separated substrings)
    if (searchTerm) {
      const keywords = searchTerm.split(' ');
      result = result.filter(product =>
        keywords.every(kw => product.name.toLowerCase().includes(kw))
      );
    }

    //  Category filter
    if (activeFilters.categories.length) {
      result = result.filter(product =>
        activeFilters.categories.some(cat =>
          product.category.toLowerCase().includes(cat.toLowerCase())
        )
      );
    }

    //  Subcategory filter (match in product.name)
    if (activeFilters.subcategories.length) {
      result = result.filter(product =>
        activeFilters.subcategories.some(sub =>
          product.name.toLowerCase().includes(sub.toLowerCase())
        )
      );
    }

    //  Sort
    if (activeFilters.sort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sort === 'Newest First') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(result);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button
          className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700"
          onClick={() => setShowFilter(true)}
        >
          Open Filter
        </button>
      </div>

      {showFilter && (
        <FilterOverlay
          onClose={() => setShowFilter(false)}
          onApply={handleApplyFilters}
        />
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
            <ProductCard product={product} />
          </div>
          ))}
        </div>
      )}
    </div>
  );
};



export default Products;
