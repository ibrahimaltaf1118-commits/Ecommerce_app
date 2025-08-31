/// components/product/ProductGridSection.jsx
import { useState, useEffect } from 'react';
import { FiHeart, FiShoppingCart, FiStar, FiFilter } from 'react-icons/fi';
import { useCart } from "../pages/CartContext";
// import { useCart } from '../../context/CartContext';

const ProductGrid = () => {
  // const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOption, setSortOption] = useState('featured');
    const { addToCart } = useCart();


  // Simulate API fetch with real-time data
  useEffect(() => {
    const fetchProducts = async () => {
      // Replace with your actual API call
      const mockProducts = [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 2,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 3,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 4,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 4,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 6,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
           {
          id: 7,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          category: 'electronics',
          rating: 4.8,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          isNew: true,
          stock: 15
        },
        // Add 7 more realistic products......
      ];

      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Real-time filtering
  useEffect(() => {
    let result = [...products];
    
    // Category filter
    if (activeFilter !== 'all') {
      result = result.filter(p => p.category === activeFilter);
    }
    
    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [activeFilter, sortOption, products]);

  // Real-time stock indicator
  const getStockIndicator = (stock) => {
    if (stock > 10) return 'In Stock';
    if (stock > 0) return `Only ${stock} Left`;
    return 'Out of Stock';
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header with Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          
          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <select 
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <FiFilter className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="flex space-x-1 bg-white p-1 rounded-lg border border-gray-200">
              {['all', 'electronics', 'clothing', 'home'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1 text-sm rounded-md capitalize ${activeFilter === category ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-48 w-full"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group">
                {/* Product Image with Badges */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.stock <= 5 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Selling Fast
                      </span>
                    )}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                    <FiHeart className="text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    <span className="text-sm text-gray-500">{product.rating.toFixed(1)} <FiStar className="inline text-yellow-400" /></span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {getStockIndicator(product.stock)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg transition ${product.stock > 0 
                      ? 'bg-red-400 hover:bg-red-700 hover:text-amber-100 text-black' 
                      : 'bg-red-500 text-gray-500 cursor-not-allowed'}`}
                  >
                    <FiShoppingCart />
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;