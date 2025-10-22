import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import Bestseller from "../components/Bestseller";
import Newarrivals from "../components/Newarrivals";
import Specialoffer from "../components/Specialoffer";
import abbg from "../assets/ab3-bg.png";
import banner2 from "../assets/banner2.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import ab3 from "../assets/ab3-bg.png";
const Home = () => {
  return (
    <>
      {/* Luxury Hero Section - Dark Theme */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden min-h-screen flex items-center">
        {/* Luxury Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent"></div>
          <img
            src={banner2}
            alt="ABfragnance Luxury Perfumes"
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute right-10% top-20% z-10 hidden xl:block">
          <div className="relative w-48 h-64 transform rotate-12 animate-float">
            <img
              src={abbg}
              alt="Luxury Perfume"
              className="w-full h-full object-contain drop-shadow-2xl opacity-5"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Floating Accent Elements */}
        <div className="absolute top-1/4 left-10% w-8 h-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-20% w-12 h-12 bg-yellow-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        {/* Mobile Optimized Banner */}
        <div className="lg:hidden absolute inset-0 z-0">
          <img
            src={banner4}
            alt="ABfragnance Mobile"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20 lg:py-28">
          <div className="max-w-2xl lg:max-w-2xl">
            {/* Luxury Brand Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-light tracking-widest text-yellow-400 uppercase">
                Since 2018 • Pakistan
              </span>
            </div>

            {/* Brand Name */}
            <div className="mb-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-2 leading-none tracking-tight">
                AB
                <span className="font-serif italic text-yellow-400">
                  fragnance
                </span>
              </h1>
              <div className="w-20 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 my-4"></div>
            </div>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl font-light mb-8 text-yellow-300 leading-relaxed max-w-xl">
              Where memories find their scent
            </p>

            {/* Description */}
            <p className="text-lg mb-12 text-gray-300 leading-relaxed max-w-2xl font-light">
              Crafted with passion in the heart of Pakistan, ABfragnance
              embodies the art of French perfumery. Each bottle tells a story,
              each scent captures a moment in time.
            </p>

            {/* Luxury Stats */}
            <div className="flex flex-wrap gap-12 mb-12">
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 font-serif group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <div className="text-gray-400 text-sm tracking-widest uppercase mt-1">
                  Unique Scents
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl md:text-4xl font-light text-yellow-400 font-serif group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
                <div className="text-gray-400 text-sm tracking-widest uppercase mt-1">
                  Years
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/products"
                className="group relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-10 py-4 rounded-xl text-center font-semibold text-lg tracking-widest uppercase transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-4 border border-yellow-500"
              >
                <span>Explore Collections</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                to="/newarrivals"
                className="group border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-10 py-4 rounded-xl text-center font-semibold text-lg tracking-widest uppercase transition-all duration-500 transform hover:scale-105 flex items-center justify-center gap-4 backdrop-blur-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Find Your Scent</span>
              </Link>
            </div>

            {/* Luxury Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-3 group">
                <div className="w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
                Handcrafted in France
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
                Natural Ingredients
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-3 h-3 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform"></div>
                Sustainable Packaging
              </div>
            </div>
          </div>
        </div>

        {/* Luxury Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-yellow-400 tracking-widest uppercase font-light">
              Discover More
            </span>
            <div>
              <img className="w-18 h-23" src={ab3} alt="" />
            </div>
            {/* <div className=" border border-yellow-400 rounded-full flex justify-center">
              <div className=" bg-yellow-400  mt-2">ab</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Signature Collections
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Curated{" "}
              <span className="font-serif italic text-yellow-400">
                Masterpieces
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Discover our exclusive collections, each telling a unique story
              through the art of fragrance
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Customer Favorites
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Most{" "}
              <span className="font-serif italic text-yellow-400">
                Cherished
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Our timeless classics loved by fragrance enthusiasts worldwide
            </p>
          </div>
          <Bestseller />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Latest Creations
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              New{" "}
              <span className="font-serif italic text-yellow-400">Elixirs</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Fresh from our perfumer's laboratory, discover the latest
              creations
            </p>
          </div>
          <Newarrivals />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Limited Time
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Exclusive{" "}
              <span className="font-serif italic text-yellow-400">Offers</span>
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
              Limited time opportunities to experience luxury at exceptional
              value
            </p>
          </div>
          <Specialoffer />
        </div>
      </section>

      {/* Luxury Experience Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                  Our Heritage
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                The Art of{" "}
                <span className="font-serif italic text-yellow-400">
                  French Perfumery
                </span>
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6"></div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed font-light">
                For over two decades, ABfragnance has been crafting exceptional
                fragrances that capture the essence of French elegance. Each
                scent is a journey through carefully selected ingredients from
                around the world.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    100% Natural Essential Oils
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    Eco-Conscious Packaging
                  </span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-yellow-400 text-sm">✓</span>
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    Cruelty Free & Vegan
                  </span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={banner5}
                  alt="Perfume Making Process"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
              <div className="absolute -inset-4 bg-yellow-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Join Our World
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Enter the{" "}
              <span className="font-serif italic text-yellow-400">
                ABfragnance
              </span>{" "}
              Universe
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-gray-400 mb-8 text-lg font-light">
              Be the first to discover new scents, exclusive offers, and the
              stories behind our creations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your elegant email"
                className="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-light backdrop-blur-sm"
              />
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-8 py-4 rounded-xl font-semibold tracking-widest uppercase transition-all duration-300 transform hover:scale-105 border border-yellow-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Home;
