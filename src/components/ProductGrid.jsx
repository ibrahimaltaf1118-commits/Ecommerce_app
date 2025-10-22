// src/components/ProductGrid.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../pages/CartContext";
// 🔑 KEY FIX: Import the API functions from your api.js file
import { productAPI } from "../Services/api";

function ProductGrid() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- STATE VARIABLES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState("");

  // --- DATA FETCHING FUNCTION ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🔑 KEY FIX: Use the productAPI helper, which handles the base URL
      const response = await productAPI.getAllProducts();

      // Axios response structure: response.data is the JSON body from the server.
      // Your server response structure: { success: true, count: X, data: [...] }
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Axios Fetch Error:", err);
      // Axios errors often have a response object with a specific status
      const errorMessage = err.response
        ? `Server Error: ${err.response.status} - ${
            err.response.data.message || "Check backend console."
          }`
        : "Network Error. Is the backend running on port 5000?";

      setError(errorMessage);
      setLoading(false);
    }
  };

  // Run fetchProducts on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- HANDLER FUNCTIONS ---
  const handleAddToCart = (product) => {
    if (product && product.stock > 0) {
      addToCart(product, 1);
      setNotificationProduct(product.name);
      setShowCartNotification(true);

      setTimeout(() => {
        setShowCartNotification(false);
        setNotificationProduct("");
      }, 3000);
    }
  };

  const handleBuyNow = (product) => {
    if (product.stock > 0) {
      addToCart(product, 1);
      // Use the MongoDB _id
      navigate(`/checkout/${product._id}`);
    }
  };

  // --- RENDERING LOGIC ---
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center gap-2">
            <FiShoppingCart size={20} />
            <span>"{notificationProduct}" added to cart!</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Featured Products
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-lg text-indigo-600">
            <div className="w-8 h-8 border-4 border-t-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading products...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 text-lg bg-red-100 border border-red-400 p-4 rounded-lg max-w-lg mx-auto">
            🚨 **Error Loading Products:** {error}
          </div>
        )}

        {/* Empty Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-600 text-lg">
            No products found. Please ensure your MongoDB is populated.
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition relative"
              >
                {/* Product Image */}
                <div
                  className="cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/product/${product._id}`)} // Use product._id
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col">
                  {/* Title */}
                  <h2
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 transition line-clamp-2"
                  >
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">{product.category}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${
                          i < (product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-bold text-indigo-600 mt-3">
                    ₹{product.price.toLocaleString()}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleBuyNow(product)}
                      disabled={product.stock === 0}
                      className={`flex-1 px-4 py-2 text-sm rounded-full transition ${
                        product.stock === 0
                          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Buy Now"}
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
                        product.stock === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <FiShoppingCart />
                    </button>
                  </div>

                  {/* Stock Info */}
                  <p
                    className={`mt-2 text-xs font-medium ${
                      product.stock === 0
                        ? "text-red-600"
                        : product.stock > 5
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {product.stock === 0
                      ? "Out of stock"
                      : product.stock > 5
                      ? `In stock (${product.stock} left)`
                      : `Only ${product.stock} left`}
                  </p>
                </div>

                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductGrid;
