import { useState } from "react";
// lucide-react is a great icon library, we'll keep it
import { ChevronDown, ChevronUp } from "lucide-react";
// This image will be used for the banner
import banner3 from "../assets/banner3.jpg";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within 2–3 business days. Delivery usually takes 5–7 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, you can return products within 3 days of delivery if they are unused and in original packaging.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within selected countries. Please check our shipping policy for details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Jazzcash EasyPaisa BankTransfer, and Cash on Delivery (COD) in certain regions.",
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
    // Replaced light background with the signature dark theme
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section with Banner Image */}
      <div className="relative py-20 md:py-32 overflow-hidden text-center">
        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${banner3})` }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg border border-white/20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Frequently Asked{" "}
            <span className="font-serif italic text-yellow-400">Questions</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Quick answers to common questions about shopping, shipping, and
            returns.
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-yellow-400/50"
          >
            <div
              className="flex justify-between items-center p-6 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-lg font-semibold text-white">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
            {openIndex === index && (
              <div className="px-6 pb-6">
                <p className="mt-2 text-gray-300 leading-relaxed border-l-2 border-yellow-400 pl-4">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-white shadow-2xl border border-gray-800">
            <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
              Still have questions?
            </h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Our team is here to help. Reach out anytime and we'll get back to
              you as soon as possible.
            </p>
            <a
              href="/contact" // Assuming you have a contact page
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors transform hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
