import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from route
  const navigate = useNavigate();
  const { token } = useAuth();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setPreview(`${import.meta.env.VITE_API_URL}${res.data.image}`);
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    if (photo) formData.append('image', photo);

    try {
      await API.put(`/products/${id}`, formData, {
        headers: { Authorization: token,
          'Content-Type': 'multipart/form-data' 
        },
      });
      alert('Product updated successfully!');
      navigate('/admin/delete-product'); // redirect to product list
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update product');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Update Product</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3" value={product.description} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={product.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="god">God</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input type="file" className="form-control" onChange={handlePhotoChange} accept="image/*" />
          {preview && (
            <img src={preview} alt="preview" className="img-thumbnail mt-2" width={180} height={180} />
          )}
        </div>

        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
