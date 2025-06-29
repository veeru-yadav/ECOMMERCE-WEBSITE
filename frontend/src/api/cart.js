//import axios from 'axios';
import API from '../services/api';

export const fetchCart = async (token) => {
  const res = await API.get('/cart', {
    headers: { Authorization: `${token}` },
  });
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
