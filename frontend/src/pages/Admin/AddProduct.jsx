import React, { useState } from 'react';
import { addProduct } from '../../api/productApi';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData);
      setMessage('✅ Product added successfully!');
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: ''
      });
    } catch (error) {
      console.error('Add product error:', error);
      setMessage('❌ Failed to add product');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add Product</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows="3" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
