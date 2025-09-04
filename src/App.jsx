import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Productlist from "./pages/Productlist";
import Home from "./pages/Home";

import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Auth/Login";
import Whatsapp from "./components/Whatsapp";
import Footer from "./components/Footer";
import Privacypolicy from "./pages/Privacypolicy";
import Termspage from "./pages/Termspage";
import Shipping from "./pages/Shipping";
import Faqs from "./pages/Faqs";
import ProductDetails from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkoutpage";
function App() {
  return (
    <>
      <Navbar /> {/* Appears on every page */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/productDetails/" element={<ProductDetails />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/Privacypolicy" element={<Privacypolicy />} />
        <Route path="/terms" element={<Termspage />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />

        {/* <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
         {/* <Route path="/CartContext" element={<CartContext />} /> */}
        {/* <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
      {/* <Footer /> Appears on every page */}
      <Whatsapp phone="923001234567" message="Hi, I need more info!" />
      <Footer />
    </>
  );
}

export default App;
