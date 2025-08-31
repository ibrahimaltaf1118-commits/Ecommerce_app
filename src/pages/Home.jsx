import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ProductDetails from '../components/ProductDetails';
import ZoomableImages from '../components/ZomableImages';
// import Productpage from './Productpage';

const Home = () => {
  return (
    <>
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image (Desktop) */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Fashion Collection"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Mobile Banner Image (Shows on small screens) */}
      <div className="lg:hidden w-full h-64 bg-gray-800 relative">
        <img
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Mobile Banner"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Content Overlay */}
      <div className="container mx-auto px-4 py-16 lg:py-28 relative z-10">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Summer Collection 2024
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Discover our exclusive range of products designed for comfort and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-center font-medium transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/sale"
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg text-center font-medium transition-colors"
            >
              View Sale
            </Link>
          </div>
        </div>
         
      </div>
    
    </section>
    <ProductGrid/>
    <ProductDetails/>
    <ZoomableImages/>
    {/* <Productpage/> */}
    </>
  );
};

export default Home;