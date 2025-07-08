import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin/index';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import UserOrders from './pages/UserOrders';
import OrderDetails from './pages/OrderDetails';
import UserProfile from './pages/User/UserProfile';

function App() {
  return (
    <>
    
    <Navbar />
    <div className="container mt-4">
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/cart" element={ <PrivateRoute> <Cart /> </PrivateRoute> } />
       {/* More routes later */}
       
       <Route path="/products" element={<Products />} />
       <Route path="/order-success" element={<OrderSuccess />} />
       <Route path="/my-orders" element={<PrivateRoute><UserOrders /></PrivateRoute>} />
       <Route path="/order/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
       <Route path="/profile" element={<PrivateRoute> <UserProfile /> </PrivateRoute>} />
       <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>

    </>
  );
}

export default App;
