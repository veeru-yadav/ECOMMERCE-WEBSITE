//import axios from 'axios';
import API from '../services/api';
export const addProduct = async (productData) => {
  return await API.post('/products', productData);
};

export const getProducts = async () => {
  return await API.get('/products');
};
