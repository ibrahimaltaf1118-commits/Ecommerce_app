import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingBag,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

import { fetchAllOrders, dispatchOrder } from "../../store/slices/orderSlice";
import ConfirmPackingButton from "./ConfirmPackingButton";

// --- Helper Components ---
const StatusBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  let colorClass = "";
  switch (status) {
    case "delivered":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "shipped":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "processing":
    case "confirmed":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "cancelled":
      colorClass = "bg-red-100 text-red-800";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800";
      break;
  }
  return (
    <span className={`${baseStyle} ${colorClass}`}>{status.toUpperCase()}</span>
  );
};

const PaymentBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-semibold rounded-full";
  let colorClass = "";
  switch (status) {
    case "paid":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "pending":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    default:
      colorClass = "bg-red-100 text-red-800";
      break;
  }
  return (
    <span className={`${baseStyle} ${colorClass}`}>{status.toUpperCase()}</span>
  );
};

// --- Main Component ---
const Orders = () => {
  const dispatch = useDispatch();

  // ✨ FIX: Simplified destructuring from Redux state
  const { orders, loading, totalPages, total } = useSelector(
    (state) => state.orders
  );

  // --- Component State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewOrder, setViewOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  // ✨ FIX: Added state for better UX on actions (e.g., dispatch)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Data Fetching Effect ---
  useEffect(() => {
    dispatch(
      fetchAllOrders({
        page: currentPage,
        limit: itemsPerPage,
        status: statusFilter === "all" ? undefined : statusFilter,
        search: searchTerm,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
      })
    );
  }, [
    dispatch,
    currentPage,
    itemsPerPage,
    statusFilter,
    searchTerm,
    sortConfig,
  ]);

  // --- Handlers ---
  const handleDispatchOrder = async (orderId) => {
    if (!orderId) return;
    setIsSubmitting(true); // Disable button
    const resultAction = await dispatch(dispatchOrder(orderId));
    setIsSubmitting(false); // Re-enable button

    if (dispatchOrder.fulfilled.match(resultAction)) {
      setViewOrder(resultAction.payload);
    } else {
      alert(`Error: ${resultAction.payload || "Could not dispatch order"}`);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }, []);

  // --- Derived Data ---
  const orderStats = {
    total: total,
    pending: orders.filter((o) => o.status === "pending").length, // Note: This is only for the current page
    revenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    average:
      orders.length > 0
        ? orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0) /
          orders.length
        : 0,
  };

  const totalItems = total;

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Order Management
      </h1>

      {/* ✨ FIX: Stats Cards UI Completed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {orderStats.total}
            </p>
          </div>
          <FiShoppingBag size={28} className="text-blue-500" />
        </div>
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Revenue (Page)</p>
            <p className="text-2xl font-bold text-gray-900">
              ${orderStats.revenue.toFixed(2)}
            </p>
          </div>
          <FiDollarSign size={28} className="text-green-500" />
        </div>
      </div>

      {/* ✨ FIX: Filters and Actions UI Completed */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex w-full md:w-auto space-x-2">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search Orders..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative w-full md:w-40">
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
          <FiDownload className="mr-2" /> Export
        </button>
      </div>

      {/* ✨ FIX: Table Headers Added */}
      <div className="shadow-lg rounded-xl overflow-x-auto bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.user ? order.user.name : "Guest"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                  ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <PaymentBadge status={order.paymentStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => setViewOrder(order)}
                    className="text-blue-600 hover:text-blue-900 p-1"
                  >
                    <FiEye size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-green-700 p-1">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-red-700 p-1">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && !loading && (
          <div className="text-center py-10 text-gray-500">
            No orders found.
          </div>
        )}
      </div>

      {/* ✨ FIX: Pagination UI Completed */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            Showing {itemsPerPage * (currentPage - 1) + 1} to{" "}
            {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems}{" "}
            results
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* --- ORDER DETAIL MODAL --- */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">
                Order Details - {viewOrder.orderNumber}
              </h3>
              <button
                onClick={() => setViewOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiChevronDown size={20} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-3">Items Purchased:</h4>
              <ul className="space-y-2 border-b pb-4 mb-4">
                {viewOrder.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold text-right">
                Total: ${viewOrder.totalAmount.toFixed(2)}
              </p>

              <ConfirmPackingButton
                order={viewOrder}
                setViewOrder={setViewOrder}
              />

              {/* ✨ FIX: Button now uses isSubmitting state for better UX */}
              {viewOrder.status === "processing" && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDispatchOrder(viewOrder._id)}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors disabled:bg-purple-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Dispatching..." : "Dispatch Order"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
