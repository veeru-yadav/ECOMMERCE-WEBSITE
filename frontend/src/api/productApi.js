
import API from '../services/api';


export const addProduct = async (productData, config) => {
  return await API.post('/products', productData, config);
};

export const getProducts = async () => {
  return await API.get('/products');
};
