import React, { useEffect, useState } from "react";
import axios from "axios";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);      // for initial load
  const [reloading, setReloading] = useState(false); // for refresh button
  const [error, setError] = useState(null);

  const fetchOrders = async (isReload = false) => {
    try {
      if (isReload) setReloading(true);
      else setLoading(true);

      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      if (isReload) setReloading(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading your orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="min-h-[40vh] flex justify-center items-center"><p>No orders found.</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <p className="text-gray-600 text-sm">
                Order ID: <span className="font-mono">{order._id}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Date: {new Date(order.date).toLocaleString()}
              </p>
              <p className="font-semibold mt-2">
                Status: <span className="text-blue-600">{order.status}</span>
              </p>
              <p className="mt-1">Amount: ₹{order.amount}</p>

              <div className="mt-3">
                <h4 className="font-semibold">Items:</h4>
                <ul className="list-disc pl-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.quantity} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 text-sm text-gray-700">
                <h4 className="font-semibold">Delivery Address:</h4>
                <p>
                  {order.address.firstName} {order.address.lastName},{" "}
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.pincode},{" "}
                  {order.address.country}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>

              <button
                onClick={() => fetchOrders(true)}
                disabled={reloading}
                className={`bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold 
                  px-5 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-orange-600 
                  transition-all duration-300 ease-in-out transform hover:scale-105 
                  mx-7 my-2 ${reloading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {reloading ? "⏳ Refreshing..." : "🔄 Fetch Order Status Again"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Myorders;
