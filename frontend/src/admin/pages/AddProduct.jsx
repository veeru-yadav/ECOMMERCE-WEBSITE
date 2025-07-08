import React, { useState } from 'react';
import { addProduct } from '../../api/productApi';
import { useAuth } from '../../context/AuthContext';

const AddProduct = () => {
  const { token } = useAuth();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));//set preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', formData.category);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const config = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        }
      };

      await addProduct(data, config);
      setMessage('✅ Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: ''
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Add product error:', error);
      setMessage('❌ Failed to add product');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Add Product</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <label className="form-label">Image</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
          {imagePreview && (
            <div className="mt-3">
              <p>Preview:</p>
              <img src={imagePreview} alt="Preview" width="150" className="img-thumbnail" />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="god">God</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
