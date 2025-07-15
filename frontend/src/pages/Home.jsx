import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kids, setKids] = useState([]);

  useEffect(() => {
    fetchHomeSections();
  }, []);

  const fetchHomeSections = async () => {
    try {
      const [featuredRes, menRes, womenRes, kidsRes] = await Promise.all([
        API.get('/products?limit=6&sort=newest'),
        API.get('/products?category=men&limit=4'),
        API.get('/products?category=women&limit=4'),
        API.get('/products?category=kids&limit=4'),
      ]);

      setFeatured(featuredRes.data);
      setMen(menRes.data);
      setWomen(womenRes.data);
      setKids(kidsRes.data);
    } catch (err) {
      console.error('Error loading homepage data:', err);
    }
  };

  const renderProductCard = (product) => (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
      <div className="card h-100 shadow-sm">
        <img
          src={`http://localhost:5000${product.image}`}
          className="card-img-top"
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.name}</h6>
          <p className="text-muted mb-1">₹{product.price}</p>
          <p className="card-text small">{product.description}</p>
          <Link to="/products" className="btn btn-sm btn-outline-primary mt-auto">View</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      {/* Hero Banner */}
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Veeru's Fashion Store 👕</h1>
          <p className="col-md-8 fs-4">
            Discover top styles for Men, Women & Kids. Quality clothing with affordable pricing. Start shopping now!
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Explore Products
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <h3 className="mb-4">✨ Featured Products</h3>
      <div className="row">
        {featured.map(renderProductCard)}
      </div>

      {/* Men */}
      <h3 className="mt-5 mb-4">👔 Men's Collection</h3>
      <div className="row">
        {men.map(renderProductCard)}
      </div>

      {/* Women */}
      <h3 className="mt-5 mb-4">👗 Women's Collection</h3>
      <div className="row">
        {women.map(renderProductCard)}
      </div>

      {/* Kids */}
      <h3 className="mt-5 mb-4">🧒 Kids' Collection</h3>
      <div className="row">
        {kids.map(renderProductCard)}
      </div>

      {/* Footer */}
      <footer className="mt-5 py-4 border-top text-center text-muted">
        © {new Date().getFullYear()} Veeru's Store. Built with ❤️ using MERN Stack.
      </footer>
    </div>
  );
};

export default Home;
