// src/pages/SalePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiStar,
  FiEye,
  FiHeart,
  FiClock,
  FiZap,
  FiFilter,
  FiGrid,
  FiList,
  FiChevronDown,
  FiTag,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { useCart } from "../pages/CartContext";
import products from "../Products";

const SalePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("discount");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Create sale products with discounts
  const saleProducts = products
    .map((product) => ({
      ...product,
      originalPrice: Math.round(product.price * (1.2 + Math.random() * 0.4)),
      discount: Math.floor(30 + Math.random() * 50),
      soldCount: Math.floor(Math.random() * 100) + 10,
      dealEnds: new Date(Date.now() + Math.random() * 72 * 60 * 60 * 1000),
    }))
    .filter((product) => product.discount >= 25)
    .sort((a, b) => b.discount - a.discount);

  // Categories for filter
  const categories = [...new Set(products.map((p) => p.category))];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      saleProducts.forEach((product) => {
        const now = new Date();
        const difference = product.dealEnds - now;

        if (difference > 0) {
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          newTimeLeft[product.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[product.id] = "Expired";
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [saleProducts]);

  // Filter and sort products
  const filteredProducts = saleProducts
    .filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "discount":
          return b.discount - a.discount;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
      setNotificationProduct(product.name);
      setShowCartNotification(true);
      setTimeout(() => setShowCartNotification(false), 3000);
    }
  };

  const handleBuyNow = (product, e) => {
    e?.stopPropagation();
    if (product.stock > 0) {
      addToCart(product, 1);
      navigate("/cart");
    }
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getDiscountColor = (discount) => {
    if (discount >= 60) return "from-red-500 to-pink-600";
    if (discount >= 50) return "from-orange-500 to-red-500";
    if (discount >= 40) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-teal-500";
  };

  const calculateSavings = (product) => {
    return product.originalPrice - product.price;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Notification */}
      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center gap-2">
            <FiShoppingCart size={20} />
            <span>"{notificationProduct}" added to cart!</span>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <FiZap className="animate-pulse" />
              <span className="font-bold text-lg">MEGA SALE EVENT</span>
              <FiZap className="animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                HUGE SALE
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-bold mb-8 opacity-90">
              Up to <span className="text-yellow-300">70% OFF</span> on Premium
              Products
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                ⚡ Limited Time Offers
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                🚚 Free Shipping
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                ✅ 30-Day Returns
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center py-4 text-sm text-gray-700">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {filteredProducts.length} Products on Sale
              </span>
              <span className="flex items-center gap-2">
                <FiTrendingUp className="text-green-500" />
                Average{" "}
                {Math.round(
                  saleProducts.reduce((acc, p) => acc + p.discount, 0) /
                    saleProducts.length
                )}
                % OFF
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-orange-600 font-semibold">
                🎉{" "}
                {Math.round(
                  saleProducts.reduce((acc, p) => acc + p.soldCount, 0)
                )}
                + Sold Today
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          {/* Filter Toggle for Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200"
          >
            <FiFilter />
            Filters
            <FiChevronDown
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* View Controls */}
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
              >
                <FiList size={18} />
              </button>
            </div>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 bg-white rounded-2xl shadow-lg border border-gray-200 h-fit p-6`}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹5000</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categories
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Discount
              </label>
              <div className="space-y-1">
                {[">70%", "60-70%", "50-60%", "40-50%", "30-40%", "25-30%"].map(
                  (range) => (
                    <div
                      key={range}
                      className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      <div className="w-3 h-3 border-2 border-gray-300 rounded"></div>
                      <span>{range} OFF</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    timeLeft={timeLeft[product.id]}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    onHover={setHoveredProduct}
                    hovered={hoveredProduct === product.id}
                    navigate={navigate}
                    getDiscountColor={getDiscountColor}
                    calculateSavings={calculateSavings}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductListCard
                    key={product.id}
                    product={product}
                    timeLeft={timeLeft[product.id]}
                    onAddToCart={handleAddToCart}
                    onBuyNow={handleBuyNow}
                    getDiscountColor={getDiscountColor}
                    calculateSavings={calculateSavings}
                  />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <FiTag className="mx-auto text-6xl text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters to see more products.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 5000]);
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component for Grid View
const ProductCard = ({
  product,
  timeLeft,
  onAddToCart,
  onBuyNow,
  onHover,
  hovered,
  navigate,
  getDiscountColor,
  calculateSavings,
}) => {
  const isExpired = timeLeft === "Expired";

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-300"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div
          className={`px-4 py-2 rounded-lg text-white shadow-lg bg-gradient-to-r ${getDiscountColor(
            product.discount
          )}`}
        >
          <div className="text-center font-bold">{product.discount}% OFF</div>
        </div>
      </div>

      {/* Timer Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            isExpired ? "bg-gray-500" : "bg-blue-500"
          }`}
        >
          <div className="flex items-center gap-1">
            <FiClock size={12} />
            {timeLeft || "24h 00m"}
          </div>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Actions */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={(e) => onAddToCart(product, e)}
            disabled={product.stock === 0 || isExpired}
            className="p-3 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={20} />
          </button>

          <button
            onClick={(e) => onBuyNow(product, e)}
            disabled={product.stock === 0 || isExpired}
            className="p-3 bg-white text-gray-900 rounded-lg shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <FiEye size={20} />
          </button>
        </div>

        {/* Expired Overlay */}
        {isExpired && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
              <div className="font-bold">DEAL ENDED</div>
            </div>
          </div>
        )}

        {/* Sold Count */}
        <div className="absolute bottom-3 left-3">
          <div className="px-2 py-1 bg-black/70 text-white text-xs rounded-full backdrop-blur-sm">
            🔥 {product.soldCount} sold
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">
          {product.category}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`text-sm ${
                  i < product.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

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

        <div className="flex gap-2">
          <button
            onClick={(e) => onAddToCart(product, e)}
            disabled={product.stock === 0 || isExpired}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => onBuyNow(product, e)}
            disabled={product.stock === 0 || isExpired}
            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Product List Card Component for List View
const ProductListCard = ({
  product,
  timeLeft,
  onAddToCart,
  onBuyNow,
  getDiscountColor,
  calculateSavings,
}) => {
  const isExpired = timeLeft === "Expired";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex gap-6">
        <div className="relative flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover rounded-lg"
          />
          <div
            className={`absolute top-2 left-2 px-3 py-1 rounded text-xs font-bold text-white bg-gradient-to-r ${getDiscountColor(
              product.discount
            )}`}
          >
            {product.discount}% OFF
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-sm text-gray-500 uppercase font-semibold">
                {product.category}
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                isExpired ? "bg-gray-500" : "bg-blue-500"
              }`}
            >
              <div className="flex items-center gap-1">
                <FiClock size={12} />
                {timeLeft || "24h 00m"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-sm ${
                    i < product.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews} reviews)
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">
              🔥 {product.soldCount} sold
            </span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through block">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm font-semibold">
                Save ₹{calculateSavings(product).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={(e) => onAddToCart(product, e)}
                disabled={product.stock === 0 || isExpired}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={(e) => onBuyNow(product, e)}
                disabled={product.stock === 0 || isExpired}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
