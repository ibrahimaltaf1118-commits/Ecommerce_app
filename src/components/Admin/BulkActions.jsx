// src/components/admin/BulkActions.jsx
import React from "react";
import { useState } from "react";

const BulkActions = ({ selectedCount, onDelete, onStatusChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-blue-800 font-medium">
            {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
          </span>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
            >
              Update Status
              <i className="fas fa-chevron-down ml-2"></i>
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {["active", "inactive", "draft"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        onStatusChange(status);
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    >
                      Mark as {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onDelete}
            className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 flex items-center"
          >
            <i className="fas fa-trash mr-2"></i>
            Delete Selected
          </button>
        </div>

        <button
          onClick={() => {
            // Export functionality
            console.log("Export selected items");
          }}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <i className="fas fa-download mr-2"></i>
          Export
        </button>
      </div>
    </div>
  );
};

export default BulkActions;
