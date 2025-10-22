// src/pages/admin/Categories.jsx
import React, { useState, useEffect } from "react";
import {
  createCategory,
  fetchCategories,
} from "../../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Fetching categories from public API", categories);
    // console.log("Product List: ", productsData);
    // setNewArrivals(productsData);
    // setNewArrivalsLoading(false);
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSave = (categoryData) => {
    const payload = {
      name: categoryData.name,
      image: "simpleimageaddress",
      description: "test description",
    };
    dispatch(createCategory(payload));
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">
                /{category.slug} • {category.products} products
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setEditingCategory(category);
                  setIsModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button className="text-red-600 hover:text-red-800">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSave({
                  name: formData.get("name"),
                  slug: formData.get("slug"),
                  status: formData.get("status"),
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingCategory?.name}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    defaultValue={editingCategory?.slug}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={editingCategory?.status || "active"}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
