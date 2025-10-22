import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  LogIn,
  ChevronDown,
  Clock,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categorySlice";
import ablogo from "../assets/ablogo.png";

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });
  const [showBanner, setShowBanner] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Fetching categories from public API", categories);
  }, [dispatch]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmOrder = () => {
    setShowOrderModal(true);
  };

  const proceedToPayment = () => {
    // Here you would integrate with your payment gateway
    alert("Redirecting to payment gateway...");
    setShowOrderModal(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner with Timer */}
      {showBanner && (
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 px-4 relative">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <Clock size={16} className="animate-pulse" />
              <span className="font-semibold">FLASH SALE ENDS IN:</span>
              <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full">
                <span className="font-bold text-lg">
                  {timeLeft.hours.toString().padStart(2, "0")}:
                  {timeLeft.minutes.toString().padStart(2, "0")}:
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">
                🎉 Extra 20% OFF on orders above Rs-5000
              </span>
              <button
                onClick={handleConfirmOrder}
                className="bg-white text-red-600 px-4 py-1 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors animate-pulse"
              >
                Confirm Order - Rs-200
              </button>

              <button
                onClick={() => setShowBanner(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini Banner */}
      <div className="bg-amber-500 text-black py-1 px-4 text-center text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2">
          <span>🚚 FREE Shipping on orders above Rs-3000</span>
          <span className="hidden sm:inline">•</span>
          <span>✅ 3-Day Easy Returns</span>
          <span className="hidden sm:inline">•</span>
          <span>🔒 Secure Payment</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-gray-900 shadow-lg sticky top-0 z-50 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={ablogo}
              alt="AB Fragrance Logo"
              className="w-14 h-14 object-contain rounded-full border-2 border-amber-400 shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            />
            <h1 className="text-2xl font-bold text-white">
              ab<span className="text-amber-400">fragrance</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="relative text-white hover:text-amber-200 group transition-colors duration-300"
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-amber-200 group transition-colors duration-300">
                Categories
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={`/category/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
                      onClick={() => setIsCategoriesOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/products"
              className="relative text-white hover:text-amber-200 group transition-colors duration-300"
            >
              All Products
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/sale"
              className="relative text-red-400 hover:text-red-300 group transition-colors duration-300 font-semibold"
            >
              🔥 Sale
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/newarrivals"
              className="relative text-green-400 hover:text-green-300 group transition-colors duration-300"
            >
              New Arrivals
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about"
              className="relative text-white hover:text-amber-200 group transition-colors duration-300"
            >
              About
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="relative text-white hover:text-amber-200 group transition-colors duration-300"
            >
              Contact
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          {/* Right Side Icons */}
          <div
            className={`flex items-center space-x-4 ${
              isMenuOpen ? "hidden" : "flex"
            }`}
          >
            {/* Quick Order Button for Mobile */}
            <button
              onClick={handleConfirmOrder}
              className="sm:hidden bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-red-600 transition-colors animate-pulse"
            >
              Rs-200
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-white hover:text-amber-200 transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors duration-300 font-semibold"
            >
              <LogIn size={16} />
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-amber-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-4 shadow-xl animate-slideDown">
            {/* Mobile Menu Header with Close Button */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="text-white hover:text-amber-200 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-amber-200 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              <div className="border-t border-gray-700 pt-2">
                <span className="text-gray-400 text-sm font-semibold">
                  SHOP
                </span>
              </div>

              <Link
                to="/products"
                className="text-white hover:text-amber-200 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                All Products
              </Link>

              <Link
                to="/sale"
                className="text-red-400 hover:text-red-300 py-2 font-semibold transition-colors"
                onClick={closeMobileMenu}
              >
                🔥 Sale
              </Link>

              <Link
                to="/new-arrivals"
                className="text-green-400 hover:text-green-300 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                New Arrivals
              </Link>

              <div className="border-t border-gray-700 pt-2">
                <span className="text-gray-400 text-sm font-semibold">
                  CATEGORIES
                </span>
              </div>

              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/category/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-white hover:text-amber-200 py-2 transition-colors pl-4"
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}

              <div className="border-t border-gray-700 pt-2">
                <span className="text-gray-400 text-sm font-semibold">
                  COMPANY
                </span>
              </div>

              <Link
                to="/about"
                className="text-white hover:text-amber-200 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-white hover:text-amber-200 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              {/* Quick Order Button in Mobile Menu */}
              <button
                onClick={() => {
                  handleConfirmOrder();
                  closeMobileMenu();
                }}
                className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold text-center mt-2 animate-pulse"
              >
                🚀 Quick Order - Rs-200
              </button>

              {/* Mobile Login Button */}
              <Link
                to="/login"
                className="bg-amber-500 text-white px-4 py-3 rounded-lg hover:bg-amber-600 transition-colors font-semibold text-center mt-2"
                onClick={closeMobileMenu}
              >
                <LogIn size={16} className="inline mr-2" />
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Order Confirmation Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="text-center">
              {/* Header */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">✓</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Confirm Your Order
              </h2>

              <p className="text-gray-600 mb-6">
                You're about to place a quick order for ₹200. This includes
                processing and service fees.
              </p>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold">₹150</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">₹50</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-green-600">₹200</span>
                </div>
              </div>

              {/* Features Included */}
              <div className="text-left mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What's included:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✅ Priority order processing</li>
                  <li>✅ Dedicated customer support</li>
                  <li>✅ Order tracking updates</li>
                  <li>✅ Quality assurance</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={proceedToPayment}
                  className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-lg"
                >
                  Pay Rs.200
                </button>
              </div>

              {/* Security Note */}
              <p className="text-xs text-gray-500 mt-4">
                🔒 Your payment is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
