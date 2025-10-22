import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Productlist from "./pages/Productlist";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./Auth/Login";
import Whatsapp from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import Privacypolicy from "./pages/Privacypolicy";
import Termspage from "./pages/Termspage";
import Shipping from "./pages/Shipping";
import Faqs from "./pages/Faqs";
import ProductDetails from "./pages/ProductDetail";
import CheckoutPage from "./pages/Checkoutpage";
import OrderSuccess from "./pages/OrderSuccess";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout.jsx";
import Newsale from "./pages/Newsale";
import { CartProvider } from "./pages/CartContext";
import Newarrivals from "./components/Newarrivals";
import AllProducts from "./components/AllProducts";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminCategories from "./pages/admin/Categories";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminCoupons from "./pages/admin/Coupons";
import AdminLogin from "./Auth/AdminLogin";
import MyOrders from "./pages/customer/MyOrders.jsx";
import OrderDetailPage from "./pages/customer/OrderDetail.jsx";

// Category Components
import CategoryProducts from "./pages/CategoryProducts";
import Register from "./Auth/Register.jsx";

// Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Use your actual token key
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Check if user is authenticated AND has admin role
  const isAdminAuthenticated = token && user.role === "admin";

  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Public Admin Route - Redirect to dashboard if already logged in
const PublicAdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isAdminAuthenticated = token && user.role === "admin";

  return isAdminAuthenticated ? <Navigate to="/admin/dashboard" /> : children;
};

function App() {
  const location = useLocation();

  return (
    <>
      <CartProvider>
        {/* Conditional Rendering - Show Navbar & Footer only for frontend routes */}
        {!location.pathname.startsWith("/admin") && (
          <>
            <Navbar />
            <Whatsapp
              phone="923294856302"
              message="Hi Welcome to abfragrance, I need more info!"
            />
          </>
        )}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ==================== */}
            {/* FRONTEND ROUTES */}
            {/* ==================== */}
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Productlist />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/productDetails/"
              element={
                <Layout>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/Privacypolicy"
              element={
                <Layout>
                  <Privacypolicy />
                </Layout>
              }
            />
            <Route
              path="/terms"
              element={
                <Layout>
                  <Termspage />
                </Layout>
              }
            />
            <Route
              path="/shipping"
              element={
                <Layout>
                  <Shipping />
                </Layout>
              }
            />
            <Route
              path="/faqs"
              element={
                <Layout>
                  <Faqs />
                </Layout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Layout>
                  <ProductDetails />
                </Layout>
              }
            />
            <Route
              path="/checkout/:id"
              element={
                <Layout>
                  <CheckoutPage />
                </Layout>
              }
            />
            <Route
              path="/order-success"
              element={
                <Layout>
                  <OrderSuccess />
                </Layout>
              }
            />
            <Route
              path="/sale"
              element={
                <Layout>
                  <Newsale />
                </Layout>
              }
            />
            <Route
              path="/newarrivals"
              element={
                <Layout>
                  <Newarrivals />
                </Layout>
              }
            />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            {/* ==================== */}
            {/* CATEGORY ROUTES */}
            {/* ==================== */}
            <Route
              path="/category/:categoryName"
              element={
                <Layout>
                  <CategoryProducts />
                </Layout>
              }
            />

            {/* ==================== */}
            {/* ADMIN ROUTES */}
            {/* ==================== */}

            {/* Admin Login (Public) */}
            <Route
              path="/admin/login"
              element={
                <PublicAdminRoute>
                  <AdminLogin />
                </PublicAdminRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/*"
              element={
                // <ProtectedAdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="coupons" element={<AdminCoupons />} />
                    {/* Redirect admin root to dashboard */}
                    <Route path="" element={<Navigate to="dashboard" />} />
                  </Routes>
                </AdminLayout>
                // </ProtectedAdminRoute>
              }
            />

            {/* Redirect to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>

        {/* Conditional Footer - Hide for admin routes */}
        {!location.pathname.startsWith("/admin") && <Footer />}
      </CartProvider>
    </>
  );
}

export default App;
