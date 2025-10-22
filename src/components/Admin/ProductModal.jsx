// src/components/admin/ProductModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/slices/categorySlice";

const ProductModal = ({ product, onClose, onSave }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    status: "active",
    images: [],
    brand: "",
    model: "",
    color: "",
    rating: 0,
    reviews: 0,
  });
  const [variants, setVariants] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        sku: product.sku || "",
        status: product.status || "active",
        images: product.images || [],
        brand: product.brand || "",
        model: product.model || "",
        color: product.color || "",
        rating: product.rating || 0,
        reviews: product.reviews || 0,
      });
      setVariants(product.variants || []);
    }
  }, [product]);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Fetching categories from public API", categories);
    // console.log("Product List: ", productsData);
    // setNewArrivals(productsData);
    // setNewArrivalsLoading(false);
  }, [dispatch]);
  // SIMPLE Image Handling - Use file paths or URLs
  const handleImageUpload = async (files) => {
    setUploading(true);

    // For now, we'll use simple file paths or placeholder images
    // In a real app, you'd upload to cloud storage and get back URLs
    const newImages = [];

    Array.from(files).forEach((file) => {
      // Create a simple file path or use placeholder
      const fileName = file.name.toLowerCase().replace(/\s+/g, "-");
      const imagePath = `/assets/products/${fileName}`;
      newImages.push(imagePath);
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));

    setUploading(false);
  };

  // FIXED Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.stock
    ) {
      alert(
        "Please fill in all required fields: Name, Price, Category, and Stock"
      );
      return;
    }

    // Prepare product data for backend
    const productData = {
      name: formData.name,
      description: formData.description || "No description",
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      sku: formData.sku || `SKU-${Date.now()}`,
      status: formData.status,
      // Use actual image paths or placeholders
      images:
        formData.images.length > 0
          ? formData.images
          : ["/assets/products/placeholder.jpg"],
      image: formData.images[0] || "/assets/products/placeholder.jpg", // Main image
      brand: formData.brand || "Generic",
      model: formData.model || "Standard",
      color: formData.color || "Black",
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      variants: variants,
      // Add any other fields your Product schema requires
      discount: 0, // Default discount
      isNew: true, // Mark as new product
      features: [],
      specifications: {},
    };

    console.log("Submitting product data:", productData);

    try {
      await onSave(productData);
    } catch (error) {
      console.error("Error in ProductModal:", error);
    }
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", color: "", sku: "", stock: 0, price: formData.price },
    ]);
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            {product ? "Edit Product" : "Add Product"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Loading and Error States */}
          {loading && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
              Saving product...
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
              Error: {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Basic Information</h4>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {" "}
                  {categories.map((category) => (
                    <option value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brand name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Model name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Color"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto-generated if empty"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Images & Variants */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Product Images
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <i className="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </label>
                </div>

                {/* Image Preview */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        {image.includes("http") ? (
                          <img
                            src={image}
                            alt=""
                            className="w-16 h-16 rounded object-cover"
                          />
                        ) : (
                          <span>📷 {image.split("/").pop()}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = formData.images.filter(
                            (_, i) => i !== index
                          );
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {uploading && (
                    <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                {/* Image Help Text */}
                <p className="text-xs text-gray-500 mt-2">
                  Note: For now, images are stored as file paths. In production,
                  you would upload to cloud storage.
                </p>
              </div>

              {/* Variants Section - Same as before */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">
                    Product Variants
                  </h4>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Variant
                  </button>
                </div>

                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-2 mb-2 p-2 bg-gray-50 rounded"
                  >
                    <input
                      type="text"
                      placeholder="Size"
                      value={variant.size}
                      onChange={(e) =>
                        updateVariant(index, "size", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Color"
                      value={variant.color}
                      onChange={(e) =>
                        updateVariant(index, "color", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="SKU"
                      value={variant.sku}
                      onChange={(e) =>
                        updateVariant(index, "sku", e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(index, "stock", parseInt(e.target.value))
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(
                          index,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : product
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
