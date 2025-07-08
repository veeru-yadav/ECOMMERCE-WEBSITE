import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-4 w-100">
        <h2>Welcome to Admin Dashboard</h2>
        <p>Use the sidebar to manage products and orders.</p>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
