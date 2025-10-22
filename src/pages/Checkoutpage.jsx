// src/pages/CheckoutPage.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Assuming orderAPI is configured for the backend POST /api/orders
import { orderAPI } from "../Services/api";
import { useCart } from "../pages/CartContext";
// Note: You should consider using Redux useDispatch/useSelector here
// if your entire application is built on Redux, but we'll keep CartContext for now.

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, clearCart, cartTotal } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    paymentMethod: "card",
    customerNotes: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- Image Handling Helpers (Kept as is) ---
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=500&q=80";
    e.target.alt = "Product image not available";
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    if (url.startsWith("blob:")) return false;
    if (url.startsWith("file:")) return false;
    if (url.includes("undefined")) return false;
    if (url.includes("null")) return false;
    return true;
  };

  const getSafeImageUrl = (url) => {
    if (isValidImageUrl(url)) {
      return url;
    }
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=500&q=80";
  };
  // -------------------------------------------

  // Handle order placement (CRITICAL LOGIC FIX)
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Prepare order items (to match the backend's 'orderItems' array)
      const orderItems = cart.map((item) => ({
        product: item.id || item._id, // Use the product ID
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        // image is optional in the backend model, but good for local debugging
        image: getSafeImageUrl(item.image),
      }));

      // 2. Prepare customer info (to match the backend's 'customer' object)
      const customerInfo = {
        name: formData.fullName,
        email: formData.email,
        // The backend model might not have 'phone', but including it here is fine
        phone: formData.phone,
      };

      // 3. Prepare shipping address (to match the backend's 'shippingAddress' object)
      const shippingDetails = {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      };

      // 4. Construct the final order data object with correct backend keys
      const orderData = {
        user: customerInfo,
        orderItems: orderItems, // 🚨 FIX: Renamed from 'items'
        totalPrice: cartTotal, // 🚨 FIX: Renamed from 'totalAmount'
        paymentMethod: formData.paymentMethod,
        shippingAddress: shippingDetails,
        customerNotes: formData.customerNotes,
      };

      console.log("Placing order with FINAL data:", orderData);

      // Send order to backend (POST /api/orders)
      const response = await orderAPI.createOrder(orderData);

      // Check if the backend returned the 'order' object on success
      if (response.data && response.data.order) {
        setOrderPlaced(true);
        clearCart();

        setTimeout(() => navigate("/order-success"), 3000);
      } else {
        setError(
          response.data.message ||
            "Failed to place order: Server response incomplete."
        );
      }
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order. Please check network and server logs."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- JSX Rendering (Kept as is) ---
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-yellow-600 mb-4">
            Please add items to your cart before checkout.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {!orderPlaced ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.id || item._id}-${index}`}
                  className="flex items-center gap-4 pb-4 border-b"
                >
                  <img
                    src={getSafeImageUrl(item.image)}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={handleImageError}
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-indigo-600">${item.price}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total:</span>
                <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handlePlaceOrder}
            className="bg-white shadow-md rounded-xl p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div>
              <label className="block mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+123456789"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 font-medium">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="State"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Postal Code *</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="12345"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Country"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Customer Notes</label>
              <textarea
                name="customerNotes"
                value={formData.customerNotes}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Any special instructions..."
                rows="3"
              />
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="card">Credit Card</option>
              <option value="cash">Cash on Delivery</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white font-semibold`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-green-50 rounded-2xl p-10 shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-3xl font-bold text-green-700">
            Order Placed Successfully 🎉
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Thank you for your purchase! Your order has been received.
          </p>
          <p className="text-gray-500 mt-1">
            You will receive a confirmation email shortly.
          </p>
          <p className="text-gray-400 mt-4">Redirecting to home page...</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
