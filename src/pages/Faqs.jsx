import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within 2–3 business days. Delivery usually takes 5–7 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, you can return products within 7 days of delivery if they are unused and in original packaging.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within selected countries. Please check our shipping policy for details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, PayPal, and Cash on Delivery (COD) in certain regions.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you’ll receive an email with a tracking link so you can monitor the delivery.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Quick answers to common questions about shopping, shipping, and
          returns.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 cursor-pointer hover:shadow-lg transition"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-indigo-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-indigo-50 py-12 mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-700 mb-6">
          Reach out to our support team anytime at{" "}
          <a
            href="mailto:support@example.com"
            className="text-indigo-600 underline"
          >
            support@example.com
          </a>
        </p>
        <a
          href="/contact"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
