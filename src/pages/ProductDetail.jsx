import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiStar } from "react-icons/fi";
import products from "../Products";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // find product by id
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <h2 className="text-center mt-10 text-red-500">Product not found ❌</h2>
    );
  }

  const [mainImage, setMainImage] = useState(product.mainImage);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:border-indigo-600 transition"
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[420px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-4">
          {/* Title & Category */}
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-3 py-1 rounded-full w-fit">
            {product.category}
          </span>

          {/* Price & Stock */}
          <p className="text-2xl text-indigo-600 font-semibold mt-1">
            ${product.price}
          </p>
          <p
            className={`font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description} Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Vestibulum egestas, ipsum sed bibendum
              ullamcorper, lectus felis posuere sapien, in tincidunt neque nisl
              non metus.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate(`/checkout/${product.id}`)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow hover:opacity-90 transition"
            >
              Buy Now
            </button>
            <button className="bg-gray-100 px-6 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Customer Reviews
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {product.reviewsList.map((review, idx) => (
            <div
              key={idx}
              className="p-5 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {review.user}
                </span>
                <span className="text-yellow-500">⭐ {review.rating}/5</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
