import { Routes, Route } from 'react-router-dom';
import AddProduct from './pages/Admin/AddProduct';
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
       <Route path="/admin/add-product" element={<AddProduct />} />
       <Route path="/products" element={<Products />} />
       <Route path="/order-success" element={<OrderSuccess />} />
       <Route path="/my-orders" element={<PrivateRoute><UserOrders /></PrivateRoute>} />
       <Route path="/order/:orderId" element={<PrivateRoute><OrderDetails /></PrivateRoute>} />
       
      </Routes>
    </div>

    </>
  );
}

export default App;
