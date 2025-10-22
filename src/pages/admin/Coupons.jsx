// src/pages/admin/Coupons.jsx
import React, { useState } from "react";

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minOrder: 50,
      usageLimit: 100,
      usedCount: 45,
      validUntil: "2024-12-31",
      status: "active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const handleSave = (couponData) => {
    if (editingCoupon) {
      setCoupons(
        coupons.map((coup) =>
          coup.id === editingCoupon.id ? { ...coup, ...couponData } : coup
        )
      );
    } else {
      setCoupons([
        ...coupons,
        {
          id: Date.now(),
          usedCount: 0,
          ...couponData,
        },
      ]);
    }
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const getDiscountText = (coupon) => {
    if (coupon.type === "percentage") {
      return `${coupon.value}% OFF`;
    } else if (coupon.type === "fixed") {
      return `$${coupon.value} OFF`;
    } else {
      return "Free Shipping";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Coupons</h2>
          <p className="text-gray-600">Manage discount codes and promotions</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Create Coupon
        </button>
      </div>

      <div className="grid gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {coupon.code}
                </h3>
                <p className="text-lg text-blue-600 font-semibold">
                  {getDiscountText(coupon)}
                </p>
                {coupon.minOrder > 0 && (
                  <p className="text-sm text-gray-600">
                    Min. order: ${coupon.minOrder}
                  </p>
                )}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  coupon.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {coupon.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                <p>
                  Used: {coupon.usedCount}/{coupon.usageLimit}
                </p>
                <p>
                  Valid until:{" "}
                  {new Date(coupon.validUntil).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingCoupon(coupon);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <i className="fas fa-trash"></i>
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingCoupon ? "Edit Coupon" : "Create Coupon"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSave({
                  code: formData.get("code"),
                  type: formData.get("type"),
                  value: parseFloat(formData.get("value")),
                  minOrder: parseFloat(formData.get("minOrder")) || 0,
                  usageLimit: parseInt(formData.get("usageLimit")),
                  validUntil: formData.get("validUntil"),
                  status: formData.get("status"),
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="code"
                    defaultValue={editingCoupon?.code}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Type
                  </label>
                  <select
                    name="type"
                    defaultValue={editingCoupon?.type || "percentage"}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="free_shipping">Free Shipping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    name="value"
                    defaultValue={editingCoupon?.value}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Order
                  </label>
                  <input
                    type="number"
                    name="minOrder"
                    defaultValue={editingCoupon?.minOrder}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Usage Limit
                  </label>
                  <input
                    type="number"
                    name="usageLimit"
                    defaultValue={editingCoupon?.usageLimit}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    name="validUntil"
                    defaultValue={editingCoupon?.validUntil}
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
                    defaultValue={editingCoupon?.status || "active"}
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
                    setEditingCoupon(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCoupon ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
