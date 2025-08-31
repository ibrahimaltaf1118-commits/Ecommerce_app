import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogIn } from 'react-feather';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 shadow-sm sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Elite Pro
        </Link>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="hidden md:flex space-x-6">
  <Link to="/" className="relative text-white hover:text-amber-200 group">
    Home
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link to="/products" className="relative text-white hover:text-amber-200 group">
    Products
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link to="/about" className="relative text-white hover:text-amber-200 group">
    About
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
  </Link>
  <Link to="/contact" className="relative text-white hover:text-amber-200 group">
    Contact
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
  </Link>
</nav>


        {/* Cart + Login (hidden on mobile when menu is open) */}
        <div className={`flex items-center space-x-4 ${isMenuOpen ? 'hidden' : 'flex'}`}>
          <Link to="/cart" className="relative">
            <ShoppingCart className="text-white hover:text-indigo-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
       <Link to="/login" className="hidden sm:block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Login
          </Link>
          {/* Mobile Menu Button (hidden on desktop) */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only shows when clicked) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 py-1">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 py-1">Products</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 py-1">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 py-1">Contact</Link>
             <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-2">
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;