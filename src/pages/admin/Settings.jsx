// src/pages/admin/Settings.jsx
import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      storeName: "My E-commerce Store",
      storeEmail: "admin@store.com",
      currency: "USD",
      timezone: "UTC",
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: false,
      codEnabled: true,
    },
    shipping: {
      freeShippingThreshold: 100,
      shippingRates: [
        { name: "Standard", price: 5, days: "5-7" },
        { name: "Express", price: 15, days: "2-3" },
      ],
    },
  });

  const tabs = [
    { id: "general", name: "General", icon: "fas fa-cog" },
    { id: "payment", name: "Payment", icon: "fas fa-credit-card" },
    { id: "shipping", name: "Shipping", icon: "fas fa-shipping-fast" },
    { id: "notifications", name: "Notifications", icon: "fas fa-bell" },
    { id: "seo", name: "SEO", icon: "fas fa-search" },
  ];

  const handleSave = (tab, data) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], ...data },
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600">Manage your store settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <i className={`${tab.icon} w-5`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.storeName}
                    onChange={(e) =>
                      handleSave("general", { storeName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <input
                    type="email"
                    value={settings.general.storeEmail}
                    onChange={(e) =>
                      handleSave("general", { storeEmail: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) =>
                      handleSave("general", { currency: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) =>
                      handleSave("general", { timezone: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Payment Methods</h3>
              <div className="space-y-4">
                {Object.entries(settings.payment).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium capitalize">
                        {key.replace("Enabled", "").replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {value ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          handleSave("payment", { [key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Shipping Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  value={settings.shipping.freeShippingThreshold}
                  onChange={(e) =>
                    handleSave("shipping", {
                      freeShippingThreshold: parseInt(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h4 className="font-medium mb-4">Shipping Rates</h4>
                <div className="space-y-4">
                  {settings.shipping.shippingRates.map((rate, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <input
                        type="text"
                        value={rate.name}
                        onChange={(e) => {
                          const newRates = [...settings.shipping.shippingRates];
                          newRates[index].name = e.target.value;
                          handleSave("shipping", { shippingRates: newRates });
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Shipping method name"
                      />
                      <input
                        type="number"
                        value={rate.price}
                        onChange={(e) => {
                          const newRates = [...settings.shipping.shippingRates];
                          newRates[index].price = parseFloat(e.target.value);
                          handleSave("shipping", { shippingRates: newRates });
                        }}
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Price"
                      />
                      <input
                        type="text"
                        value={rate.days}
                        onChange={(e) => {
                          const newRates = [...settings.shipping.shippingRates];
                          newRates[index].days = e.target.value;
                          handleSave("shipping", { shippingRates: newRates });
                        }}
                        className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Delivery days"
                      />
                      <button
                        onClick={() => {
                          const newRates =
                            settings.shipping.shippingRates.filter(
                              (_, i) => i !== index
                            );
                          handleSave("shipping", { shippingRates: newRates });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newRates = [
                        ...settings.shipping.shippingRates,
                        { name: "", price: 0, days: "" },
                      ];
                      handleSave("shipping", { shippingRates: newRates });
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Shipping Rate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add other tabs content similarly */}

          <div className="flex justify-end mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
