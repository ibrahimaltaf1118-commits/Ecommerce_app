// src/components/SpecialOffersSection.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar, FiEye, FiClock, FiZap } from "react-icons/fi";
import { useCart } from "../pages/CartContext";
import { productAPI } from "../Services/api";

const SpecialOffersSection = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState("");
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        setFetchedProducts(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Network Error. Please ensure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const specialOffers = useMemo(() => {
    if (!fetchedProducts || fetchedProducts.length === 0) return [];
    return fetchedProducts
      .map((product) => ({
        ...product,
        id: product._id, // Use MongoDB _id for deal tracking
        originalPrice: Math.round(product.price * 1.3), // 30% markup for display
        discount: 30 + Math.floor(Math.random() * 20), // Random 30-50% discount
        dealEnds: new Date(Date.now() + 24 * 60 * 60 * 1000), // Mock a 24h deal
      }))
      .filter((product) => product.discount >= 30)
      .slice(0, 3); // ✨ CHANGED: Showing 3 offers for a more premium feel
  }, [fetchedProducts]);

  useEffect(() => {
    if (specialOffers.length === 0) return;
    const timer = setInterval(() => {
      const newTimeLeft = {};
      specialOffers.forEach((product) => {
        const difference = product.dealEnds.getTime() - Date.now();
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          const pad = (num) => num.toString().padStart(2, "0");
          newTimeLeft[product.id] = `${pad(hours)}h ${pad(minutes)}m ${pad(
            seconds
          )}s`;
        } else {
          newTimeLeft[product.id] = "Expired";
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [specialOffers]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (product.stock > 0 && timeLeft[product.id] !== "Expired") {
      addToCart(product, 1);
      setNotificationProduct(product.name);
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 3000);
    }
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  const getDiscountColor = (discount) => {
    if (discount >= 50) return "bg-red-500";
    if (discount >= 40) return "bg-orange-500";
    return "bg-yellow-500";
  };

  const calculateSavings = (product) => {
    return product.originalPrice - product.price;
  };

  if (loading) {
    return (
      <div className="py-16 text-center bg-gradient-to-br from-orange-50 to-red-50">
        Loading offers...
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-16 text-center bg-gradient-to-br from-orange-50 to-red-50">
        {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <FiShoppingCart size={20} />
            <span>"{notificationProduct}" added to cart!</span>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-lg px-6 py-2 shadow-md mb-4">
            <FiZap className="text-orange-500" />
            {/* ✨ CHANGED: Text updated for perfume theme */}
            <span className="text-lg font-semibold text-gray-800">
              Limited Time Scents
            </span>
          </div>
          {/* ✨ CHANGED: Text updated for perfume theme */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Exclusive Fragrance Offers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss these amazing deals on our signature fragrances. Limited
            quantities available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialOffers.map((product) => {
            const timeDisplay = timeLeft[product.id] || "Calculating...";
            const isExpired = timeDisplay === "Expired";
            return (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <div
                      className={`px-4 py-2 rounded-lg text-white shadow-md font-bold text-lg ${getDiscountColor(
                        product.discount
                      )}`}
                    >
                      {product.discount}% OFF
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        isExpired ? "bg-gray-500" : "bg-blue-500"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <FiClock size={12} />
                        {timeDisplay}
                      </div>
                    </div>
                  </div>
                  {isExpired && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                        DEAL ENDED
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {/* ✨ CHANGED: Displaying Scent Family */}
                  <p className="text-sm text-gray-500 uppercase font-semibold mb-2">
                    {product.scentFamily || "Fragrance"}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  {/* ✨ CHANGED: Displaying Concentration */}
                  <p className="text-xs text-gray-400 mb-3">
                    {product.concentration}
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through block">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                      Save ₹{calculateSavings(product).toLocaleString()}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          product.stock > 10
                            ? "bg-green-500"
                            : product.stock > 5
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / 20) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0 || isExpired}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                      product.stock === 0 || isExpired
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {isExpired
                      ? "DEAL EXPIRED"
                      : product.stock === 0
                      ? "OUT OF STOCK"
                      : "ADD TO CART"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
