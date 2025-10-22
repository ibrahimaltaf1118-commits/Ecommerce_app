// src/pages/admin/Products.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../store/slices/productSlice";
import ProductModal from "../../components/Admin/ProductModal";
import BulkActions from "../../components/admin/BulkActions";
import DataTable from "../../components/admin/DataTable";
import SearchFilter from "../../components/admin/SearchFilter";
import { fetchCategories } from "../../store/slices/categorySlice";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
  });
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Fetching categories from public API", categories);
    // console.log("Product List: ", productsData);
    // setNewArrivals(productsData);
    // setNewArrivalsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const columns = [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows(products.map((p) => p._id));
            } else {
              setSelectedRows([]);
            }
          }}
        />
      ),
      render: (product) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(product._id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, product._id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== product._id));
            }
          }}
        />
      ),
    },
    {
      key: "image",
      header: "Image",
      render: (product) => (
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-12 h-12 rounded object-cover"
        />
      ),
    },
    {
      key: "name",
      header: "Product Name",
      sortable: true,
      render: (product) => (
        <div>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-sm text-gray-500">{product.sku}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (product) => product.category?.name,
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (product) => `$${product.price}`,
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (product) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 10
              ? "bg-green-100 text-green-800"
              : product.stock > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <select
          value={product.status}
          onChange={(e) =>
            dispatch(
              updateProductStatus({
                id: product._id,
                status: e.target.value,
              })
            )
          }
          className={`text-xs font-medium px-2 py-1 rounded border ${
            product.status === "active"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (product) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedProduct(product);
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this product?")) {
                dispatch(deleteProduct(product._id));
              }
            }}
            className="text-red-600 hover:text-red-900"
          >
            <i className="fas fa-trash"></i>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <i className="fas fa-copy"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Product
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedRows.length > 0 && (
        <BulkActions
          selectedCount={selectedRows.length}
          onDelete={() => {
            selectedRows.forEach((id) => dispatch(deleteProduct(id)));
            setSelectedRows([]);
          }}
          onStatusChange={(status) => {
            selectedRows.forEach((id) =>
              dispatch(updateProductStatus({ id, status }))
            );
          }}
        />
      )}

      {/* Search & Filters */}
      <SearchFilter
        filters={filters}
        onFilterChange={setFilters}
        filterOptions={{
          status: [
            { value: "", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ],
          category: [
            { value: "", label: "All Categories" },
            // 👇 Spread dynamic categories here
            ...categories.map((category) => ({
              value: category.name,
              label: category.name,
            })),
          ],
        }}
      />

      {/* Products Table */}
      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        keyField="_id"
      />

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          onSave={(productData) => {
            // Handle save logic
            console.log("Save product:", productData);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Products;
