import API from '../services/api';

export const placeOrder = async (token) => {
  const res = await API.post('/order', {}, {
    headers: { Authorization: token }
  });
  return res.data;
};

export const getOrderDetails = async (orderId, token) => {
  const res = await API.get(`/order/${orderId}`, {
    headers: { Authorization: token }
  });
  return res.data;
};

export const getUserOrders = async (token) => {
  const res = await API.get('/my-orders', {
    headers: { Authorization: token }
  });
  return res.data;
};

export const cancelOrder = async (orderId, token) => {
  const res = await API.patch(`/cancel/${orderId}`, null, {
    headers: { Authorization: token }
  });
  return res.data;
};
