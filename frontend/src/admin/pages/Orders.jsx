import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  const fetchAllOrders = async () => {
    try {
      const res = await API.get('/admin/orders', {
        headers: { Authorization: token }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(
        `/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: token } }
      );
      fetchAllOrders(); // Refresh list after update
    } catch (error) {
      console.error('Failed to update status:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className='d-flex justify-content-between'>
        <h2 className="mb-4">All Orders</h2>
        <BackButton className="float-end" />
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order.id}>
                  <td>{i + 1}</td>
                  <td>
                    <strong>{order.user?.name}</strong>
                    <br />
                    <small>{order.user?.email}</small>
                  </td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item.id}>
                        - {item.product?.name} x {item.quantity}
                        <br />
                      </div>
                    ))}
                  </td>
                  <td>₹ {order.totalAmount}</td>
                  <td>
                    <select
                      value={order.status}
                      className="form-select"
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
