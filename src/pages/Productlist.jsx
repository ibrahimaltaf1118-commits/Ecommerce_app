import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ArrowRight } from "react-feather";

const Productlist = ({ products = [], isLoading = false }) => {
  // Sample data if no products passed (for demo)
  const demoProducts = [
    {
      id: 32,
      name: "Wireless Noise-Canceling Headphones",
      price: 1990000.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true,
    },
    // Add more demo products as needed
  ];

  const displayedProducts = products.length ? products : demoProducts;

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Grid Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
        <Link
          to="/products"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View all <ArrowRight size={18} className="ml-1" />
        </Link>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

// Modern Product Card Component
const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
        {product.discount && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          className={
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }
        />
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-indigo-600 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-gray-500 text-xs ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Link
            to={`/product/${product.id}`}
            className="mt-2 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Buy Now
          </Link>
          <button className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="20.5" r="1" />
              <circle cx="18" cy="20.5" r="1" />
              <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-gray-100 rounded-xl overflow-hidden animate-pulse"
      >
        <div className="aspect-square bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Productlist;
