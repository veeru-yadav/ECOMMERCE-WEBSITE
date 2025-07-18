import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import './index.css';
import './styles/custom.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductFilterProvider } from './context/ProductFilterContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ProductFilterProvider>
          <App />
        </ProductFilterProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
