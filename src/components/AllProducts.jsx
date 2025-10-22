// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiFilter,
  FiChevronDown,
  FiSearch,
  FiX,
  FiStar,
  FiShoppingCart,
  FiEye,
} from "react-icons/fi";
import { useCart } from "../pages/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCart } = useCart();

  const { products, loading, error } = useSelector((state) => state.products);

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 500]); // ✨ CHANGED: Adjusted max price for perfumes
  const [selectedFamilies, setSelectedFamilies] = useState([]); // ✨ CHANGED: from categories to families
  const [selectedConcentrations, setSelectedConcentrations] = useState([]); // ✨ CHANGED: New filter
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(window.innerWidth > 1024); // Show by default on large screens

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // This helper function remains useful
  const getProductsArray = () => {
    if (!products) return [];
    if (Array.isArray(products)) return products;
    if (products.data && Array.isArray(products.data)) return products.data;
    if (products.products && Array.isArray(products.products))
      return products.products;
    if (typeof products === "object") return [products];
    return [];
  };

  const productsArray = getProductsArray();

  // ✨ CHANGED: Get unique values for new filters from product data
  const scentFamilies = [
    ...new Set(productsArray.map((p) => p?.scentFamily).filter(Boolean)),
  ];
  const concentrations = [
    ...new Set(productsArray.map((p) => p?.concentration).filter(Boolean)),
  ];

  const filteredProducts = productsArray
    .filter((product) => {
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      // ✨ CHANGED: Updated filter logic
      const matchesFamily =
        selectedFamilies.length === 0 ||
        selectedFamilies.includes(product.scentFamily);
      const matchesConcentration =
        selectedConcentrations.length === 0 ||
        selectedConcentrations.includes(product.concentration);
      const matchesSearch =
        searchTerm === "" ||
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesPrice && matchesFamily && matchesConcentration && matchesSearch
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name?.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  //==================================================================
  // ✨ PRODUCT CARD COMPONENT - HEAVILY MODIFIED
  //==================================================================
  const ProductCard = ({ product }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(
        {
          id: product._id || product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0],
          category: product.category, // Keep original category for cart logic if needed
        },
        1
      );
    };

    const handleQuickView = (e) => {
      e.stopPropagation();
      navigate(`/products/${product._id || product.id}`);
    };

    return (
      <div
        className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
          onClick={() => navigate(`/products/${product._id || product.id}`)}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
          )}
          <img
            src={
              product.image || product.images?.[0] || "/images/placeholder.jpg"
            }
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1541698444453-542425a8d052?auto=format&fit=crop&w=500&q=80";
            }}
          />
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            {product.isNew && <span className="badge bg-pink-500">New</span>}
            {product.onSale && <span className="badge bg-red-500">Sale</span>}
          </div>
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-3">
              <button
                onClick={handleQuickView}
                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Quick View"
              >
                <FiEye className="text-gray-700" size={18} />
              </button>
              <button
                onClick={handleAddToCart}
                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                title="Add to Cart"
              >
                <FiShoppingCart className="text-gray-700" size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          {/* Scent Family and Size */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>{product?.scentFamily || "Fragrance"}</span>
            {product?.size && <span>{product.size}ml</span>}
          </div>
          {/* Product Name */}
          <h3
            className="font-semibold text-gray-900 mb-2 hover:text-pink-600 transition-colors cursor-pointer line-clamp-2 flex-grow"
            onClick={() => navigate(`/products/${product._id || product.id}`)}
          >
            {product.name}
          </h3>
          {/* Concentration */}
          {product.concentration && (
            <p className="text-xs text-gray-400 mb-3">
              {product.concentration}
            </p>
          )}
          {/* Price and Rating */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice?.toFixed(2)}
                  </span>
                )}
            </div>
            {product.rating && (
              <div className="flex items-center gap-1">
                <FiStar className="text-yellow-400 fill-current" size={14} />
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
  //==================================================================
  // END OF PRODUCT CARD
  //==================================================================

  if (loading) {
    return <div>Loading...</div>;
  } // Simplified for brevity
  if (error) {
    return (
      <div>
        Error: {error}{" "}
        <button onClick={() => dispatch(fetchProducts())}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          {/* ✨ CHANGED: Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Fragrance Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of {productsArray.length} exquisite
            scents
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-2xl mx-auto">
          {/* ... Search bar JSX is fine, no changes needed ... */}
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a scent, brand, or note..." // ✨ CHANGED
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" // ✨ CHANGED
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          {/* ... Controls JSX is fine, no changes needed ... */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow border hover:bg-gray-50 transition-colors"
            >
              <FiFilter /> Filters
              <FiChevronDown
                className={`transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
            <span className="text-gray-600">
              Showing {filteredProducts.length} of {productsArray.length} scents
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg shadow border overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${
                  viewMode === "grid"
                    ? "bg-pink-500 text-white"
                    : "text-gray-600"
                }`}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${
                  viewMode === "list"
                    ? "bg-pink-500 text-white"
                    : "text-gray-600"
                }`}
              >
                <FiList size={18} />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border rounded-lg px-4 py-2 shadow focus:ring-2 focus:ring-pink-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* ✨ CHANGED: Filters Sidebar */}
          {showFilters && (
            <div className="w-full lg:w-64 bg-white rounded-lg shadow border h-fit p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => {
                    setSelectedFamilies([]);
                    setSelectedConcentrations([]);
                    setPriceRange([0, 500]);
                  }}
                  className="text-pink-600 text-sm font-medium hover:text-pink-700"
                >
                  Clear All
                </button>
              </div>

              {/* Scent Families Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Scent Family</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {scentFamilies.map((family) => (
                    <label
                      key={family}
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedFamilies.includes(family)}
                        onChange={() =>
                          setSelectedFamilies((prev) =>
                            prev.includes(family)
                              ? prev.filter((c) => c !== family)
                              : [...prev, family]
                          )
                        }
                        className="rounded text-pink-500"
                      />
                      <span className="text-gray-700">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concentration Filter */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Concentration</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {concentrations.map((conc) => (
                    <label
                      key={conc}
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedConcentrations.includes(conc)}
                        onChange={() =>
                          setSelectedConcentrations((prev) =>
                            prev.includes(conc)
                              ? prev.filter((c) => c !== conc)
                              : [...prev, conc]
                          )
                        }
                        className="rounded text-pink-500"
                      />
                      <span className="text-gray-700">{conc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          )}

          {/* Products Display */}
          <div className={`${showFilters ? "flex-1" : "w-full"}`}>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                {/* ... No products found JSX is fine, no changes needed ... */}
                No products found.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product?._id || product?.id || index}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* ... List view is fine, but you might want to update it later to use the new card details ... */}
                List view placeholder.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
