import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { FiShoppingCart, FiStar, FiEye } from "react-icons/fi";
import { useCart } from "../pages/CartContext";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { products, loading } = useSelector((state) => state.products);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const filtered = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() ===
            categoryName.toLowerCase().replace(/-/g, " ")
      );
      setCategoryProducts(filtered);
      console.log(
        `🟡 Filtered ${filtered.length} products for category: ${categoryName}`
      );
    }
  }, [products, categoryName]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    if (product.stock > 0) {
      addToCart(
        {
          id: product._id || product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0],
          category: product.category,
        },
        1
      );
      alert(`${product.name} added to cart!`);
    }
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    navigate(`/product/${product._id || product.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const displayCategoryName = categoryName.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
            {displayCategoryName}
          </h1>
          <p className="text-lg text-gray-600">
            {categoryProducts.length} products found in {displayCategoryName}
          </p>
        </div>

        {/* Products Grid */}
        {categoryProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 mb-4">
              No products available in the {displayCategoryName} category.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product._id || product.id}`)
                }
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={
                      product.image ||
                      product.images?.[0] ||
                      "/images/placeholder.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => handleQuickView(product, e)}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Quick View"
                      >
                        <FiEye className="text-gray-700" size={18} />
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        title="Add to Cart"
                      >
                        <FiShoppingCart className="text-gray-700" size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price?.toFixed(2)}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <FiStar
                          className="text-yellow-400 fill-current"
                          size={14}
                        />
                        <span className="text-sm text-gray-600">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0}
                    className={`w-full py-2 rounded-lg font-semibold transition-colors text-sm ${
                      product.stock === 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
