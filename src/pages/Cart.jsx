// src/components/Cart.jsx
import React from "react";
import { useCart } from "../pages/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Shield,
  Truck,
  RefreshCw,
} from "react-feather";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemCount,
  } = useCart();
  const navigate = useNavigate();

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=500&q=80";
  };

  // Check if image URL is valid
  const isValidImageUrl = (url) => {
    if (!url) return false;
    if (url.startsWith("blob:")) return false;
    if (url.startsWith("file:")) return false;
    if (url.includes("undefined")) return false;
    if (url.includes("null")) return false;
    return true;
  };

  // Get safe image URL
  const getSafeImageUrl = (url) => {
    if (isValidImageUrl(url)) {
      return url;
    }
    return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=500&q=80";
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items to proceed to checkout.");
      return;
    }
    navigate("/checkout");
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const subtotal = cartTotal;
  const shipping = 0; // Free shipping
  const tax = cartTotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Continue Shopping</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Your{" "}
              <span className="font-serif italic text-amber-600">
                Shopping Cart
              </span>
            </h1>
            <p className="text-gray-600">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors group"
            >
              <RefreshCw size={18} />
              <span className="font-medium">Clear Cart</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-amber-500" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Discover our premium collection and find something special for
              yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/")}
                className="bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-3"
              >
                <ShoppingBag size={20} />
                Start Shopping
              </button>
              <button
                onClick={() => navigate("/products")}
                className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trust Badges */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Truck size={24} className="text-green-500 mb-2" />
                    <span className="font-semibold text-gray-900">
                      Free Shipping
                    </span>
                    <span className="text-sm text-gray-600">On all orders</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Shield size={24} className="text-blue-500 mb-2" />
                    <span className="font-semibold text-gray-900">
                      Secure Payment
                    </span>
                    <span className="text-sm text-gray-600">256-bit SSL</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw size={24} className="text-purple-500 mb-2" />
                    <span className="font-semibold text-gray-900">
                      Easy Returns
                    </span>
                    <span className="text-sm text-gray-600">30-day policy</span>
                  </div>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row p-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <img
                          src={getSafeImageUrl(item.image)}
                          alt={item.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover shadow-sm"
                          onError={handleImageError}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-amber-600 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                            <p className="text-amber-600 text-lg font-bold mb-3">
                              ${item.price.toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4">
                              <span className="text-gray-600 font-medium">
                                Quantity:
                              </span>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                  <Minus size={16} className="text-gray-600" />
                                </button>
                                <span className="text-lg font-semibold text-gray-900 min-w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                >
                                  <Plus size={16} className="text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Item Total & Remove */}
                          <div className="flex flex-col items-end gap-3 mt-4 sm:mt-0">
                            <div className="text-2xl font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors group"
                            >
                              <Trash2
                                size={18}
                                className="group-hover:scale-110 transition-transform"
                              />
                              <span className="font-medium">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg sticky top-8 border border-gray-100">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} items)
                      </span>
                      <span className="font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold text-gray-900">
                        ${tax.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-amber-600">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={20} />
                    Proceed to Checkout
                  </button>

                  {/* Security Badge */}
                  <div className="mt-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Shield size={16} className="text-green-500" />
                      <span>Secure checkout • 256-bit SSL encrypted</span>
                    </div>
                  </div>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => navigate("/products")}
                    className="w-full border-2 border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-300 mt-4 font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
