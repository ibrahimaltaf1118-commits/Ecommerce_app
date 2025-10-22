import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CartProvider } from "./pages/CartContext"; // ✅ Import CartProvider
import { Provider } from "react-redux";
import { store } from "./store/store"; // ✅ Import Redux store

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          {" "}
          {/* ✅ Wrap App here */}
          <App />
        </CartProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
