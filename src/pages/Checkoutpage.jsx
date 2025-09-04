import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../assets/Productdata";

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const product = products.find((p) => p.id === id);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => navigate("/"), 6000);
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-red-600">
          ❌ Product not found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {!orderPlaced ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-indigo-600">${product.price}</p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handlePlaceOrder}
            className="bg-white shadow-md rounded-xl p-6 space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                placeholder="Street, City, Country"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="+123456789"
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <select className="w-full border rounded-lg p-2">
              <option>Credit Card</option>
              <option>Cash on Delivery</option>
              <option>Bank Transfer</option>
            </select>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Place Order
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-green-50 rounded-2xl p-10 shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-green-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-3xl font-bold text-green-700">
            Order Placed Successfully 🎉
          </h2>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. You’ll be redirected shortly...
          </p>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
