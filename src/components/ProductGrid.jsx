// src/components/ProductGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiStar } from "react-icons/fi";
import products from "../Products"; // ✅ adjust path if needed

function ProductGrid() {
  const navigate = useNavigate();

  // Handle add to cart
  const handleAddToCart = (product) => {
    alert(`${product.name} added to cart 🛒`);
  };

  // Handle buy now
  const handleBuyNow = (product) => {
    navigate(`/checkout/${product.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition relative"
          >
            {/* Product Image */}
            <div
              className="cursor-pointer overflow-hidden"
              onClick={() => navigate(`/product/${product.id}`)}
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
                onClick={() => navigate(`/product/${product.id}`)}
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 transition"
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
                      i < product.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <p className="text-lg font-bold text-indigo-600 mt-3">
                ${product.price}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                >
                  <FiShoppingCart className="text-gray-700" />
                </button>
              </div>

              {/* Stock Info */}
              <p
                className={`mt-2 text-xs ${
                  product.stock > 5 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 5
                  ? `In stock (${product.stock} left)`
                  : `Only ${product.stock} left`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
