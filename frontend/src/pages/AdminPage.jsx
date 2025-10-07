import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/products"; // Use your utility
import axios from "axios";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";

// Delete confirmation inline modal
function DeleteConfirmation({ product, onCancel, onConfirm, loading, error }) {
  if (!product) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p>
          Are you sure you want to delete <strong>{product.name}</strong>?
        </p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      }
      setLoadingOrders(false);
    }
    async function getProducts() {
      const result = await fetchProducts();
      setProducts(Array.isArray(result) ? result : []);
      setLoadingProducts(false);
    }
    fetchOrders();
    getProducts();
  }, []);

  // Refresh products list after update
  const refreshProducts = async () => {
    setLoadingProducts(true);
    const result = await fetchProducts();
    setProducts(Array.isArray(result) ? result : []);
    setLoadingProducts(false);
  };

  // Refresh orders after status update
  const refreshOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`);
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setOrders([]);
    }
    setLoadingOrders(false);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setShowEditModal(false);
  };

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  // DELETE: Show confirmation modal
  const handleAskDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteError("");
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeletingProduct(true);
    setDeleteError("");
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${productToDelete._id || productToDelete.id}`);
      setProductToDelete(null);
      await refreshProducts();
    } catch (err) {
      setDeleteError("Failed to delete product.");
    }
    setDeletingProduct(false);
  };

  // Order status toggle
  const toggleOrderStatus = async (orderId) => {
    try {
      const order = orders.find(o => o._id === orderId || o.id === orderId);
      if (!order) return alert("Order not found!");
      const updatedStatus = !order.fulfilled;
      await axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, { fulfilled: updatedStatus });
      await refreshOrders();
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  if (loadingOrders || loadingProducts) {
    return <div className="text-center py-8 text-xl">Loading admin data...</div>;
  }

  const safeProducts = Array.isArray(products) ? products : [];
  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {safeOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
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
              {safeOrders.map(order => (
                <tr key={order._id || order.id}>
                  <td className="border border-gray-300 px-3 py-1">{order.name}</td>
                  <td className="border border-gray-300 px-3 py-1">{order.email}</td>
                  <td className="border border-gray-300 px-3 py-1">{order.phone}</td>
                  <td className="border border-gray-300 px-3 py-1">{order.product_name || order.product_id}</td>
                  <td className="border border-gray-300 px-3 py-1">{order.comments}</td>
                  <td className="border border-gray-300 px-3 py-1">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-3 py-1">{order.fulfilled ? "Fulfilled" : "Pending"}</td>
                  <td className="border border-gray-300 px-3 py-1">
                    <button
                      onClick={() => toggleOrderStatus(order._id || order.id)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products</h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Product
          </button>
        </div>
        {safeProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul className="space-y-4">
            {safeProducts.map(product => (
              <li
                key={product._id || product.id}
                className="p-3 rounded-2xl bg-white shadow hover:shadow-lg transition-all flex items-center"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded-xl bg-gray-100 mr-6"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-gray-600 mb-1">{product.description}</p>
                  <p className="font-bold text-blue-600 mb-1">${product.price}</p>
                </div>
                <div className="space-x-2 flex">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700"
                    onClick={() => handleAskDeleteProduct(product)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <EditProductModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        product={selectedProduct}
        onSave={refreshProducts}
      />
      <AddProductModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        onSave={refreshProducts}
      />
      <DeleteConfirmation
        product={productToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        loading={deletingProduct}
        error={deleteError}
      />
    </div>
  );
}

export default AdminPage;
