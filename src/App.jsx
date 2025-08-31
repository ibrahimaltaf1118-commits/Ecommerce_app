import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Productlist from './pages/Productlist'
import Home from './pages/Home'
import ProductDetails from './components/ProductDetails'
import  Cart  from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './Auth/Login'
import Whatsapp from './components/Whatsapp'
import Footer from './components/Footer'

 
function App() {
  return (
    <>
     <Navbar /> {/* Appears on every page */}
            
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Productlist />} />
           <Route path="/cart" element={<Cart />} />
         <Route path="/productDetails/" element={<ProductDetails />}/>
          <Route path="/login" element={<Login />}/>
        {/* <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
         {/* <Route path="/CartContext" element={<CartContext />} /> */}
        {/* <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
      {/* <Footer /> Appears on every page */}
 <Whatsapp phone="923001234567" message="Hi, I need more info!" />
 <Footer/>
    </>
  )
}

export default App
