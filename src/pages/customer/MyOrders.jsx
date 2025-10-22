import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../../store/slices/orderSlice";
import { FiEye, FiClock, FiShoppingBag } from "react-icons/fi";

// --- Helper Component: Status Badge (Define this here or import it) ---
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
    case "pending":
    default:
      colorClass = "bg-gray-100 text-gray-800";
      break;
  }

  return (
    <span className={`${baseStyle} ${colorClass}`}>{status.toUpperCase()}</span>
  );
};
// --- End Helper Component ---

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use myOrders from the slice
  const { myOrders, loading, error } = useSelector((state) => state.orders);

  // Assuming you have an auth slice to check login status
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch orders if the user is logged in
    if (userInfo) {
      dispatch(fetchMyOrders());
    } else {
      // Optional: Redirect to login page if not logged in
      // navigate('/login');
    }
  }, [dispatch, userInfo]);

  const handleViewOrder = (orderId) => {
    // Navigate to the individual order detail page for tracking
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600">
        Error fetching orders: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FiShoppingBag className="mr-3 text-blue-600" size={28} />
        My Order History
      </h1>

      {myOrders.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <FiClock className="mx-auto text-gray-400 mb-3" size={40} />
          <p className="text-xl text-gray-600 font-medium">No orders found.</p>
          <p className="text-gray-500 mt-2">
            Start shopping to see your purchase history here!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-lg transition duration-200"
            >
              {/* Left Side: Info */}
              <div>
                <p className="font-semibold text-xl text-gray-900 mb-1">
                  Order # {order.orderNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Placed on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Center: Status & Total */}
              <div className="my-3 sm:my-0 sm:ml-4 flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-lg text-gray-800">
                    ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <StatusBadge status={order.status} />
                </div>
              </div>

              {/* Right Side: Action Button */}
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => handleViewOrder(order._id)}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiEye className="mr-2" size={18} /> View Details & Track
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
