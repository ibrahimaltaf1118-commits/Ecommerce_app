import React from "react";
import { useCart } from "./CartContext";

const Product = () => {
  const { addToCart } = useCart();

  const sampleProduct = {
    id: 1,
    name: "dedeWireless Headphonessssssss",
    price: 120000,
    image: "https://via.placeholder.com/100",
  };

  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded-xl shadow-md max-w-sm mx-auto text-center">
        <img src={sampleProduct.image} className="w-full mb-4" />
        <h2 className="text-xl font-semibold">{sampleProduct.name}</h2>
        <p className="text-gray-600">${sampleProduct.price}</p>
        <button
          onClick={() => addToCart(sampleProduct)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
