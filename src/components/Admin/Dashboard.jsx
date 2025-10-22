// src/components/admin/Dashboard.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { fetchDashboardData } from "../../store/slices/adminSlice";
import ProductModal from "./ProductModal";
import { createProduct, fetchProducts } from "../../store/slices/productSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add navigation
  const { dashboardData, loading } = useSelector((state) => state.admin);
  const { loading: productLoading } = useSelector((state) => state.products);

  // State for modal
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Handle product creation
  const handleSaveProduct = async (productData) => {
    try {
      await dispatch(createProduct(productData)).unwrap();
      // Refresh products and dashboard data
      dispatch(fetchProducts());
      dispatch(fetchDashboardData());
      setShowProductModal(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Failed to save product:", error);
      alert(`Failed to add product: ${error}`);
    }
  };

  // Handle Quick Actions
  const handleQuickAction = (action) => {
    switch (action) {
      case "add-product":
        setShowProductModal(true);
        break;
      case "view-reports":
        navigate("/admin/analytics");
        break;
      case "manage-users":
        navigate("/admin/customers");
        break;
      case "settings":
        navigate("/admin/settings");
        break;
      default:
        break;
    }
  };

  const stats = [
    {
      label: "Total Revenue",
      value: `$${dashboardData?.totalRevenue || 0}`,
      icon: "fas fa-dollar-sign",
      color: "green",
    },
    {
      label: "Total Orders",
      value: dashboardData?.totalOrders || 0,
      icon: "fas fa-shopping-cart",
      color: "blue",
    },
    {
      label: "Total Products",
      value: dashboardData?.totalProducts || 0,
      icon: "fas fa-box",
      color: "purple",
    },
    {
      label: "Total Customers",
      value: dashboardData?.totalCustomers || 0,
      icon: "fas fa-users",
      color: "orange",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center">
              <div
                className={`p-3 rounded-full ${
                  stat.color === "green"
                    ? "bg-green-100 text-green-600"
                    : stat.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : stat.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                <i className={stat.icon}></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {dashboardData?.recentOrders?.length > 0 ? (
              dashboardData.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <div>
                    <p className="font-medium">Order #{order.orderId}</p>
                    <p className="text-sm text-gray-600">
                      {order.customerName}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleQuickAction("add-product")}
              disabled={productLoading}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center disabled:opacity-50"
            >
              <i className="fas fa-plus text-blue-600 mb-2"></i>
              <p className="text-sm font-medium">
                {productLoading ? "Adding..." : "Add Product"}
              </p>
            </button>
            <button
              onClick={() => handleQuickAction("view-reports")}
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
            >
              <i className="fas fa-chart-bar text-green-600 mb-2"></i>
              <p className="text-sm font-medium">View Reports</p>
            </button>
            <button
              onClick={() => handleQuickAction("manage-users")}
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
            >
              <i className="fas fa-users text-purple-600 mb-2"></i>
              <p className="text-sm font-medium">Manage Users</p>
            </button>
            <button
              onClick={() => handleQuickAction("settings")}
              className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
            >
              <i className="fas fa-cog text-orange-600 mb-2"></i>
              <p className="text-sm font-medium">Settings</p>
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <ProductModal
          onClose={() => setShowProductModal(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default Dashboard;
