// src/components/admin/OrderModal.jsx
import React from "react";

const OrderModal = ({ order, onClose, onStatusUpdate }) => {
  if (!order) return null;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[order.status]
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <select
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Customer Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>
                  <strong>Name:</strong> {order.customer?.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.customer?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.customer?.phone}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Shipping Address
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p>{order.shippingAddress?.street}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}
                </p>
                <p>{order.shippingAddress?.zipCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
            <div className="border border-gray-200 rounded-lg">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        SKU: {item.product.sku}
                      </p>
                      {item.variant && (
                        <p className="text-sm text-gray-600">
                          Variant: {item.variant.size} / {item.variant.color}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal:</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Shipping:</span>
              <span>${order.shippingCost}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax:</span>
              <span>${order.tax}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span>Discount:</span>
                <span className="text-green-600">-${order.discount}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-lg">${order.totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
