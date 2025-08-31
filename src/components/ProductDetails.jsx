import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import ZoomableImage from "../components/ZomableImages";

// ✅ Main Product
const actualProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 120,
  description:
    "High-quality wireless headphones with immersive sound and long battery life.",
  category: "audio",
  images: [
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/401",
    "https://via.placeholder.com/402",
  ],
};

// ✅ Similar Products
const similarProducts = [
  {
    id: 2,
    name: "Noise Cancelling Headphones",
    image: "https://via.placeholder.com/200",
    price: 150,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "https://via.placeholder.com/200",
    price: 90,
  },
  {
    id: 4,
    name: "In-Ear Wireless Earbuds",
    image: "https://via.placeholder.com/200",
    price: 70,
  },
];

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(actualProduct.images[0]);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ ...actualProduct, quantity });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Product Card */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Image */}
        <div>
          <ZoomableImage src={selectedImage} alt={actualProduct.name} />
          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {actualProduct.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer ${
                  img === selectedImage ? "border-blue-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{actualProduct.name}</h1>
            <p className="text-gray-500 text-lg mb-4">${actualProduct.price}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {actualProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-600">Quantity:</span>
              <button
                onClick={decrease}
                className="px-3 py-1 bg-gray-200 rounded-lg text-lg hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={increase}
                className="px-3 py-1 bg-gray-200 rounded-lg text-lg hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
