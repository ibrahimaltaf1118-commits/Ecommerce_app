// src/components/admin/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { path: "/admin/products", icon: "fas fa-box", label: "Products" },
    { path: "/admin/orders", icon: "fas fa-shopping-cart", label: "Orders" },
    { path: "/admin/customers", icon: "fas fa-users", label: "Customers" },
    { path: "/admin/categories", icon: "fas fa-tags", label: "Categories" },
    { path: "/admin/analytics", icon: "fas fa-chart-bar", label: "Analytics" },
    { path: "/admin/coupons", icon: "fas fa-ticket-alt", label: "Coupons" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                location.pathname === item.path ? "bg-gray-700 text-white" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              <i className={`${item.icon} w-6 mr-3`}></i>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
