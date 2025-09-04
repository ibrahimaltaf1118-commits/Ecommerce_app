import { Truck, RefreshCw, CreditCard, Package } from "lucide-react";

export default function Shipping() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Learn about our shipping process, delivery timelines, and return
          policy.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid gap-8">
        {/* Shipping Info Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <Truck className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">1. Shipping Information</h2>
          </div>
          <p className="text-gray-600">
            We process and ship orders within <strong>2–3 business days</strong>
            . Delivery times depend on your location and the shipping method
            selected at checkout.
          </p>
        </div>

        {/* Shipping Cost Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-xl font-semibold">2. Shipping Costs</h2>
          </div>
          <p className="text-gray-600">
            Shipping costs are calculated during checkout. Free shipping may be
            available on promotional campaigns or for orders above a minimum
            value.
          </p>
        </div>

        {/* Tracking Info */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">3. Order Tracking</h2>
          </div>
          <p className="text-gray-600">
            After your order is shipped, you will receive a confirmation email
            with a tracking number to monitor delivery status.
          </p>
        </div>

        {/* Return Policy */}
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <div className="flex items-center mb-4">
            <RefreshCw className="w-6 h-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold">4. Return Policy</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Returns are accepted within <strong>7 days</strong> of delivery if
            the item is unused and in its original packaging. Refunds are
            processed within <strong>5–10 business days</strong>.
          </p>
          <p className="text-gray-500 text-sm">
            ⚠️ Non-returnable items include personalized products, perishable
            goods, and gift cards.
          </p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-50 py-12 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-gray-700 mb-6">
          For shipping or return-related questions, reach us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            support@example.com
          </a>
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
