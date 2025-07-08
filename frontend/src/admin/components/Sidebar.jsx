import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-primary text-white" style={{ minHeight: '100vh', width: '210px' }}>
      <h4>Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/add-product">Add Product</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/edit-product">Edit Product</Link></li>
        <li className="nav-item"><Link className="nav-link text-white" to="/admin/orders">Orders</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
