// pages/FAQs.jsx
import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, PayPal, bank transfers, and Cash on Delivery (COD) in selected regions.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days. Express delivery options are available at checkout.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, you can return products within 14 days of delivery if they are unused and in original packaging.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times vary depending on your location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you’ll receive a tracking number via email to monitor your shipment in real-time.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search input
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ❓ Frequently Asked Questions
        </h1>
        <p className="text-gray-600">
          Here are some of the most common questions customers ask. If you need
          more help, feel free to{" "}
          <a
            href="/contact"
            className="text-green-600 font-medium hover:underline"
          >
            contact us
          </a>
          .
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8 relative">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {/* FAQs List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left text-lg font-medium text-gray-800 hover:bg-gray-100 transition"
              >
                {faq.question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No FAQs found for "<span className="font-medium">{search}</span>"
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQs;
