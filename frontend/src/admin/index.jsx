import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import DeleteProduct from './pages/DeleteProduct';
import Orders from './pages/Orders';
import { useAuth } from '../context/AuthContext';

const AdminRoutes = () => {
  const { user } = useAuth();
  
  //You can prevent the component from rendering until the user is fetched:
  if (user === null) return <p>Loading...{user}</p>;

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />; // redirect non-admins
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/edit-product" element={<DeleteProduct />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AdminRoutes;
