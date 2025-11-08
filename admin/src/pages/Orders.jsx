import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/getadminOrders`);
      setOrders(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put("http://localhost:4000/api/order/updateorderstatus", {
        orderid: orderId,
        status: newStatus,
      });

      // update state locally for instant UI feedback
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status");
    }
  };

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-200 bg-white shadow-md rounded-lg text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="px-2 sm:px-4 py-2 border border-gray-200">Parcel</th>
                <th className="px-2 sm:px-4 py-2 border border-gray-200">Customer</th>
                <th className="px-2 sm:px-4 py-2 border border-gray-200">No. of Items</th>
                <th className="px-2 sm:px-4 py-2 border border-gray-200">Total Bill</th>
                <th className="px-2 sm:px-4 py-2 border border-gray-200">Status</th>
                <th className="px-2 sm:px-4 py-2 border border-gray-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-2 sm:px-4 py-2 border border-gray-200 text-center">
                    <img
                      src={assets.parcel_icon}
                      alt="parcel icon"
                      className="w-5 h-5 sm:w-8 sm:h-8 mx-auto"
                    />
                  </td>

                  <td className="px-2 sm:px-4 py-2 border border-gray-200">
                    <p className="font-semibold text-xs sm:text-sm">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-snug">
                      {order.address?.street}, {order.address?.city},{" "}
                      {order.address?.state}, {order.address?.pincode}
                    </p>
                    <div className="mt-1">
                      <p className="font-medium text-[11px] sm:text-xs">🛒 Items:</p>
                      <ul className="list-disc list-inside text-[11px] sm:text-xs text-gray-700">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>

                  <td className="px-2 sm:px-4 py-2 border border-gray-200 text-center">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </td>

                  <td className="px-2 sm:px-4 py-2 border border-gray-200 font-semibold text-center">
                    ₹{order.amount}
                  </td>

                  <td className="px-2 sm:px-4 py-2 border border-gray-200">
                    <select
                      value={order.status}
                      className="border border-gray-300 px-2 py-1 rounded text-xs sm:text-sm w-full"
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Food is under process">Food is under process</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>

                  <td className="px-2 sm:px-4 py-2 border border-gray-200 text-[10px] sm:text-xs">
                    {new Date(order.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={fetchOrders}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold 
          px-4 sm:px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 
          transition-all duration-300 ease-in-out transform hover:scale-105 text-xs sm:text-sm"
        >
          🔄 Refresh Orders
        </button>
      </div>
    </div>
  );
};

export default Orders;
