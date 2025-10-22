// src/components/BestSellersSection.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiStar,
  FiEye,
  FiHeart,
  FiAward,
} from "react-icons/fi";
import { useCart } from "../pages/CartContext";
import { productAPI } from "../Services/api";

// ✨ CHANGED: Icon color updated for the dark theme
const PerfumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8 text-amber-400"
  >
    <path d="M10 21h4" />
    <path d="M7 21a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2" />
    <path d="M12 14v-4" />
    <path d="M12 10a5 5 0 0 0-5-5V3h10v2a5 5 0 0 0-5 5Z" />
  </svg>
);

const BestSellersSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAllProducts();
        setProducts(response.data.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(
          `Failed to fetch products. Please ensure the backend is running.`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = products
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setNotificationProduct(product.name);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigate("/checkout");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Condensed loading/error states for brevity
  if (loading) {
    return (
      <div className="py-16 bg-black text-center text-white">Loading...</div>
    );
  }
  if (error) {
    return (
      <div className="py-16 bg-black text-center text-red-500">{error}</div>
    );
  }
  if (products.length === 0 && !loading) {
    return (
      <div className="py-16 bg-black text-center text-white">
        No products found.
      </div>
    );
  }

  return (
    // ✨ CHANGED: Main section background to black
    <section className="py-16 bg-black">
      {/* ✨ CHANGED: Notification styled for dark mode */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-2xl z-50 transition-transform duration-500 transform animate-fadeInOut border border-gray-700">
          <div className="flex items-center gap-2 font-semibold">
            <FiShoppingCart size={20} className="text-amber-400" />
            <span>"{notificationProduct}" added to cart!</span>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PerfumeIcon />
            {/* ✨ CHANGED: Title gradient to gold/amber */}
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Our Most Adored Scents
            </h2>
          </div>
          {/* ✨ CHANGED: Subtitle text color for dark background */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Experience the fragrances that captivate and enchant. Handpicked by
            our community.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            // ✨ CHANGED: Card background, border, and shadow for dark theme
            <div
              key={product._id}
              className="group relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-yellow-500/10 transition-all duration-500 overflow-hidden border border-gray-800 cursor-pointer flex flex-col"
              onClick={() => handleProductClick(product._id)}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1541698444453-542425a8d052?auto=format&fit=crop&w=500&q=80"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center gap-3">
                  {/* ✨ CHANGED: Hover button styles */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                    className="p-3 bg-gray-800/80 text-white rounded-full shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 hover:bg-amber-500 hover:text-black"
                  >
                    <FiEye size={18} />
                  </button>
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                {/* ✨ CHANGED: Text colors for dark mode */}
                <p className="text-sm text-gray-400 mb-1 capitalize">
                  {product.scentFamily || "Fragrance"}
                </p>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  {product.concentration}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <FiStar
                      className="text-yellow-400 fill-current"
                      size={16}
                    />
                    <span className="text-sm text-gray-300 font-medium">
                      {product.rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                {/* ✨ CHANGED: Button styles for dark mode */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => handleBuyNow(product, e)}
                    className="flex-1 bg-amber-500 text-black py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          {/* ✨ CHANGED: "View All" button style */}
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black rounded-full font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Explore All Fragrances
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
