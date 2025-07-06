import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    shippingAddress: '',
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await API.get('/user/profile', {
        headers: { Authorization: token }
      });
      setUserData(res.data);
      setForm({
        name: res.data.name,
        email: res.data.email,
        password: '',
        shippingAddress: res.data.shippingAddress || ''
      });
      setPreview(`${import.meta.env.VITE_API_URL}${res.data.photo}`);
    };
    fetchUser();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    if (form.password) formData.append('password', form.password);
    formData.append('shippingAddress', form.shippingAddress);
    if (photo) formData.append('photo', photo);

    try {
      const res = await API.put('/user/profile', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('✅ Profile updated successfully!');
    } catch (err) {
      setMessage('❌ Update failed');
      console.error(err);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2>User Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="text-center mb-4">
        <img
          src={preview}
          alt="Profile"
          className="img-thumbnail"
          width={150}
          height={150}
        />
      </div>

      <div className="d-flex justify-content-around">
        <div >
          <Link className="btn btn-primary btn-sm ms-2" to="/my-orders">My Orders</Link>
        </div>
        <div >
          <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Profile Photo</label>
          <input type="file" className="form-control" onChange={handlePhotoChange} accept="image/*" />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password (Leave blank to keep unchanged)</label>
          <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <textarea className="form-control" name="shippingAddress" value={form.shippingAddress} onChange={handleChange} rows="2" />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button> {/*Go to the previous page*/}
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>

      <div className="mt-4">
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserProfile;
