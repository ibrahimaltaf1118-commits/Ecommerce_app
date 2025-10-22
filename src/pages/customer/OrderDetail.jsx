import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
// NOTE: You must create this action in orderSlice.js
import {
  fetchOrderById,
  clearCurrentOrder,
} from "../../store/slices/orderSlice";
import {
  FiHome,
  FiArrowLeft,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";

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

const OrderDetail = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  // Assuming the fetchOrderById thunk updates state.orders.currentOrder
  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }

    // Clean up the order details when leaving the page
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600">
        <p>Error fetching order details: {error}</p>
        <Link
          to="/my-orders"
          className="mt-4 inline-flex items-center text-blue-600 hover:underline"
        >
          <FiArrowLeft className="mr-2" /> Back to My Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-10 text-gray-500">
        Order not found or still loading...
      </div>
    );
  }

  // Destructure for easier access
  const {
    orderNumber,
    totalAmount,
    createdAt,
    status,
    paymentMethod,
    shippingAddress,
    items,
  } = order;

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6">
      <Link
        to="/my-orders"
        className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6"
      >
        <FiArrowLeft className="mr-2" /> Back to My Orders
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Order #{orderNumber}
            </h1>
            <p className="text-gray-500 mt-1">
              Placed on:{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* 1. Tracking Status / Timeline (Conceptual) */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Order Tracking
          </h2>
          <div className="flex justify-between items-center text-center p-4 bg-blue-50 rounded-lg">
            <TrackingStep
              icon={FiPackage}
              label="Confirmed"
              active={status !== "pending"}
            />
            <TrackingLine active={status !== "pending"} />
            <TrackingStep
              icon={FiCheckCircle}
              label="Processed"
              active={
                status === "processing" ||
                status === "shipped" ||
                status === "delivered"
              }
            />
            <TrackingLine
              active={status === "shipped" || status === "delivered"}
            />
            <TrackingStep
              icon={FiTruck}
              label="Shipped"
              active={status === "shipped" || status === "delivered"}
            />
            <TrackingLine active={status === "delivered"} />
            <TrackingStep
              icon={FiHome}
              label="Delivered"
              active={status === "delivered"}
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Current Status: **{status.toUpperCase()}**
          </p>
          {/* Add tracking number logic here if available: */}
          {order.trackingNumber && (
            <p className="text-sm text-gray-600 mt-1">
              Tracking Number:{" "}
              <span className="font-mono text-blue-600">
                {order.trackingNumber}
              </span>
            </p>
          )}
        </div>

        {/* 2. Order Summary and Payment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Shipping To
            </h3>
            <p className="text-gray-600">
              {shippingAddress.firstName} {shippingAddress.lastName}
            </p>
            <p className="text-gray-600">{shippingAddress.street}</p>
            <p className="text-gray-600">
              {shippingAddress.city}, {shippingAddress.zipCode}
            </p>
            <p className="text-gray-600">{shippingAddress.country}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Payment
            </h3>
            <div className="flex items-center text-gray-600">
              <FiCreditCard className="mr-2" /> {paymentMethod}
            </div>
            <p className="mt-2">
              Payment Status:{" "}
              <StatusBadge status={order.paymentStatus || "paid"} />
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">Total</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">{items.length} items</p>
          </div>
        </div>

        {/* 3. Items List */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Items in Order
          </h2>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {/* Product Image (Assuming item.product.images[0] exists) */}
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    {/* You'd replace this with an actual image component */}
                    <img
                      src={item.product?.images?.[0] || "placeholder.jpg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name || item.product?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-lg text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Simple Tracking Step Component
const TrackingStep = ({ icon: Icon, label, active }) => (
  <div
    className={`flex flex-col items-center ${
      active ? "text-blue-600" : "text-gray-400"
    }`}
  >
    <Icon
      size={24}
      className={`mb-1 ${active ? "bg-blue-100 p-1 rounded-full" : ""}`}
    />
    <span className="text-xs font-medium mt-1">{label}</span>
  </div>
);

// Simple Tracking Line Component
const TrackingLine = ({ active }) => (
  <div
    className={`flex-1 h-0.5 mx-2 ${active ? "bg-blue-400" : "bg-gray-300"}`}
  ></div>
);

export default OrderDetail;
