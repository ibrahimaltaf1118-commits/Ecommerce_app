// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaShippingFast,
  FaHeadset,
  FaAward,
  FaShieldAlt,
  FaTiktok,
} from "react-icons/fa";
import { BiLogoTiktok } from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300">
      {/* Trust Badges */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <FaShippingFast className="text-yellow-400" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-400">Over Rs.3000</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <FaHeadset className="text-yellow-400" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">24/7 Support</p>
                <p className="text-xs text-gray-400">Expert Help</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <FaAward className="text-yellow-400" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Premium Quality
                </p>
                <p className="text-xs text-gray-400">Guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20">
                <FaShieldAlt className="text-yellow-400" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-400">Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + About - KEPT ORIGINAL CONTENT */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              abfragrance.pk
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your one-stop shop for the best products at unbeatable prices.
              Fast delivery and excellent customer service guaranteed.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/14KyaX3SGty/?mibextid=wwXIfr"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-gray-700"
              >
                <FaFacebook
                  className="text-gray-400 group-hover:text-white"
                  size={16}
                />
              </a>
              <a
                href="https://www.instagram.com/ab.fragrance1?igsh=cXFzM2llbmIwMmdw&utm_source=qr"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-950 rounded-full flex items-center justify-center transition-all duration-300 group border border-gray-700"
              >
                <FaInstagram
                  className="text-gray-400 group-hover:text-white"
                  size={16}
                />
              </a>
              <a
                href="http://www.tiktok.com/@abfragrance01"
                className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 group border border-gray-700"
              >
                <BiLogoTiktok
                  className="text-gray-400 group-hover:text-white"
                  size={16}
                />
              </a>
            </div>
          </div>

          {/* Quick Links - KEPT ORIGINAL LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Quick Links
              <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/product"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service - KEPT ORIGINAL LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Customer Service
              <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faqs"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  FAQ's
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/privacypolicy"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter - ENHANCED STYLING */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Newsletter
              <div className="w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-2"></div>
            </h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:scale-95 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar - KEPT ORIGINAL CONTENT */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} abfragrance. All rights reserved.
            </p>

            {/* Social Links - ENHANCED STYLING */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-8 h-8 bg-blue-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-gray-700"
              >
                <FaFacebook className="text-gray-40" size={14} />
              </a>
              <a
                href="https://www.instagram.com/ab.fragrance1?igsh=cXFzM2llbmIwMmdw&utm_source=qr"
                className="w-8 h-8 bg-red-400 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 group border border-gray-700"
              >
                <FaInstagram
                  className="text-red-600 group-hover:text-white"
                  size={14}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
