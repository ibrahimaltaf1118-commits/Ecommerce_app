// src/pages/admin/Analytics.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { fetchAnalytics } from "../../store/slices/adminSlice";

const Analytics = () => {
  const [dateRange, setDateRange] = useState("7d");
  const dispatch = useDispatch();
  const { analytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAnalytics(dateRange));
  }, [dispatch, dateRange]);

  // Use actual analytics data or fallback to mock data
  const analyticsData = analytics || {
    metrics: [
      { label: "Total Revenue", value: "$24,580", change: "+12%", trend: "up" },
      { label: "Orders", value: "1,248", change: "+8%", trend: "up" },
      { label: "Conversion Rate", value: "3.2%", change: "+0.4%", trend: "up" },
      {
        label: "Avg. Order Value",
        value: "$85.60",
        change: "-2%",
        trend: "down",
      },
    ],
    salesData: [
      { date: "Jan 1", sales: 4000, orders: 24, visitors: 450 },
      { date: "Jan 2", sales: 3000, orders: 18, visitors: 380 },
      { date: "Jan 3", sales: 5000, orders: 30, visitors: 520 },
      { date: "Jan 4", sales: 2780, orders: 22, visitors: 410 },
      { date: "Jan 5", sales: 3890, orders: 28, visitors: 460 },
      { date: "Jan 6", sales: 4390, orders: 32, visitors: 490 },
      { date: "Jan 7", sales: 3490, orders: 26, visitors: 430 },
    ],
    categoryData: [
      { name: "Electronics", value: 35, color: "#3b82f6" },
      { name: "Clothing", value: 25, color: "#8b5cf6" },
      { name: "Home & Garden", value: 20, color: "#10b981" },
      { name: "Sports", value: 15, color: "#f59e0b" },
      { name: "Others", value: 5, color: "#ef4444" },
    ],
    topProducts: [
      { name: "iPhone 14", sales: 124, revenue: 12400 },
      { name: "MacBook Pro", sales: 89, revenue: 8900 },
      { name: "AirPods", sales: 156, revenue: 7800 },
      { name: "iPad Air", sales: 67, revenue: 6700 },
      { name: "Apple Watch", sales: 98, revenue: 4900 },
    ],
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name === "sales" ? "$" : ""}
              {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
          <p className="text-gray-600">Business performance insights</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <p className="text-sm font-medium text-gray-600 mb-2">
              {metric.label}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <span
                className={`text-sm font-medium ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Sales & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales ($)"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {analyticsData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Products</h3>
        <div className="space-y-3">
          {analyticsData.topProducts.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.sales} units sold
                </p>
              </div>
              <span className="font-bold text-blue-600">
                ${product.revenue}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
