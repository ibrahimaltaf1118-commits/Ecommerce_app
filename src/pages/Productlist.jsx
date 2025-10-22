import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  ArrowRight,
  ShoppingBag,
  Plus,
  Check,
} from "react-feather";
import Products from "../Products.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";

const Productlist = ({
  products = [],
  isLoading = false,
  title = "Featured Products",
  showViewAll = true,
}) => {
  const displayedProducts = products.length ? products : Products;
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    console.log("Added to cart:", product.name);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Premium Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our carefully curated selection of premium products
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <span>Explore All Products</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// Clean Product Card with Dark Theme
const ProductCard = ({ product, onBuyNow, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [secondaryImageLoaded, setSecondaryImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Get secondary image
  const secondaryImage = product.secondaryImage || product.image;

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);
    await onAddToCart(product, e);
    setIsAddingToCart(false);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onBuyNow(product.id);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  };

  const discount = calculateDiscount();

  return (
    <div
      className="group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-800 hover:border-yellow-400/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-green-400">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-red-400">
            -{discount}%
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg border border-yellow-400">
            Best Seller
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-20 p-2.5 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-gray-700 transition-colors border border-gray-700"
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          className={
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-500"
          }
        />
      </button>

      {/* Product Image with Simple Swap */}
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-800">
          {/* Loading State */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 animate-pulse"></div>
          )}

          {/* Main Image */}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            } ${imageLoaded ? "block" : "hidden"}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Secondary Image on Hover */}
          <img
            src={secondaryImage}
            alt={`${product.name} - Alternate view`}
            className={`w-full h-full object-cover transition-opacity duration-500 absolute inset-0 ${
              isHovered ? "opacity-100" : "opacity-0"
            } ${secondaryImageLoaded ? "block" : "hidden"}`}
            loading="lazy"
            onLoad={() => setSecondaryImageLoaded(true)}
          />
        </div>
      </Link>

      {/* Product Info - Clean and Minimal */}
      <div className="p-6">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-white mb-3 hover:text-yellow-400 transition-colors line-clamp-2 leading-tight text-lg">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm font-medium">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Clean Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCartClick}
            disabled={isAddingToCart || addedToCart}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              addedToCart
                ? "bg-green-500 text-white hover:bg-green-600 border border-green-400"
                : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 hover:from-yellow-600 hover:to-yellow-700 border border-yellow-500"
            } ${isAddingToCart ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </>
            ) : addedToCart ? (
              <>
                <Check size={18} />
                Added
              </>
            ) : (
              <>
                <Plus size={18} />
                Add to Cart
              </>
            )}
          </button>

          <button
            onClick={handleBuyNowClick}
            className="flex-1 bg-transparent border-2 border-yellow-400 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Buy Now
          </button>
        </div>

        {/* Stock Status - Minimal */}
        {product.stock && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Available: {product.stock} units</span>
              <span>{Math.round((product.stock / 100) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Loading Skeleton with Dark Theme
const SkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-800 animate-pulse"
      >
        <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-12 bg-gray-700 rounded-xl flex-1"></div>
            <div className="h-12 bg-gray-700 rounded-xl flex-1"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default Productlist;
