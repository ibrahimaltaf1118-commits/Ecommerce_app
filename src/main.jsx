import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from'./pages/CartContext'; // ✅ Import CartProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* ✅ Wrap App here */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
