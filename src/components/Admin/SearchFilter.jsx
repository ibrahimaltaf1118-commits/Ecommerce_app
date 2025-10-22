// src/components/admin/SearchFilter.jsx
import React from "react";

const SearchFilter = ({ filters, onFilterChange, filterOptions = {} }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={filters.search || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status Filter */}
        {filterOptions.status && (
          <select
            value={filters.status || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.status.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Category Filter */}
        {filterOptions.category && (
          <select
            value={filters.category || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, category: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.category.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Date Range Filter */}
        {filterOptions.dateRange && (
          <select
            value={filters.dateRange || ""}
            onChange={(e) =>
              onFilterChange({ ...filters, dateRange: e.target.value })
            }
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.dateRange.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Clear Filters */}
        {(filters.search ||
          filters.status ||
          filters.category ||
          filters.dateRange) && (
          <button
            onClick={() =>
              onFilterChange({
                search: "",
                status: "",
                category: "",
                dateRange: "",
              })
            }
            className="text-gray-600 hover:text-gray-800 flex items-center justify-center"
          >
            <i className="fas fa-times mr-1"></i>
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
