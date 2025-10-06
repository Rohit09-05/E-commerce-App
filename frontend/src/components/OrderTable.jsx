import React from "react";

function OrderTable({ orders, onToggleStatus }) {
  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-600">No orders found.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-3 py-1">Name</th>
          <th className="border border-gray-300 px-3 py-1">Email</th>
          <th className="border border-gray-300 px-3 py-1">Phone</th>
          <th className="border border-gray-300 px-3 py-1">Product</th>
          <th className="border border-gray-300 px-3 py-1">Comments</th>
          <th className="border border-gray-300 px-3 py-1">Date</th>
          <th className="border border-gray-300 px-3 py-1">Status</th>
          <th className="border border-gray-300 px-3 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id || order.id}>
            <td className="border border-gray-300 px-3 py-1">{order.name}</td>
            <td className="border border-gray-300 px-3 py-1">{order.email}</td>
            <td className="border border-gray-300 px-3 py-1">{order.phone}</td>
            <td className="border border-gray-300 px-3 py-1">{order.product_name || order.product_id}</td>
            <td className="border border-gray-300 px-3 py-1">{order.comments}</td>
            <td className="border border-gray-300 px-3 py-1">{new Date(order.date).toLocaleDateString()}</td>
            <td className="border border-gray-300 px-3 py-1">
              {order.fulfilled ? "Fulfilled" : "Pending"}
            </td>
            <td className="border border-gray-300 px-3 py-1">
              <button
                onClick={() => onToggleStatus(order._id || order.id)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Toggle Status
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
