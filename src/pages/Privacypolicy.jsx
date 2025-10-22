import React from "react";
// Make sure this path is correct relative to your component file
import ab6 from "../assets/ab6.webp";

export default function Privacypolicy({
  companyName = "abfragrance.pk",
  contactEmail = "abfragrance01@gmail.com",
  addressLine = "Main Urdu Bazar Market Lahore, Punjab",
  country = "Pakistan",
  effectiveDate = "October 19, 2025",
}) {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy explains how{" "}
            <strong className="text-yellow-400">{companyName}</strong> ("we",
            "us", or "our") collects, uses, and protects your information when
            you visit our website, create an account, or purchase our products.
            By using our services, you agree to the practices described in this
            policy.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            If you do not agree with this policy, please do not access the site
            or use our services. For questions, contact us at{" "}
            <a
              className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "information-collection",
      title: "Information We Collect",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Personal Information:</strong> Name, email address,
                phone number, shipping address
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Payment Information:</strong> Credit card details,
                billing address (processed securely)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, cookies
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                <strong>Usage Data:</strong> Pages visited, products viewed,
                purchase history
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            We use the collected information for various purposes:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
              <h4 className="text-yellow-400 font-semibold mb-2">
                Order Processing
              </h4>
              <p className="text-gray-300 text-sm">
                Process payments, ship orders, and provide customer support
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
              <h4 className="text-yellow-400 font-semibold mb-2">
                Personalization
              </h4>
              <p className="text-gray-300 text-sm">
                Customize your shopping experience and product recommendations
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
              <h4 className="text-yellow-400 font-semibold mb-2">
                Communication
              </h4>
              <p className="text-gray-300 text-sm">
                Send order updates, promotions, and important notices
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
              <h4 className="text-yellow-400 font-semibold mb-2">
                Improvement
              </h4>
              <p className="text-gray-300 text-sm">
                Enforce our website and analyze usage patterns
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            We implement robust security measures to protect your personal
            information:
          </p>
          <ul className="mt-4 space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>SSL encryption for all data transmissions</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Regular security audits and vulnerability assessments</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Limited access to personal data on a need-to-know basis
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Secure payment processing through certified providers</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            We use cookies and similar tracking technologies to enhance your
            browsing experience:
          </p>
          <div className="bg-gray-800/50 rounded-2xl p-6 mt-6 border border-gray-700">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">
                  Essential
                </h4>
                <p className="text-gray-300 text-sm">
                  Required for basic site functionality
                </p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">
                  Analytics
                </h4>
                <p className="text-gray-300 text-sm">
                  Help us understand how visitors interact
                </p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2">
                  Marketing
                </h4>
                <p className="text-gray-300 text-sm">
                  Personalize ads and content
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              You can control cookie settings through your browser preferences
            </p>
          </div>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights",
      body: (
        <>
          <p className="text-gray-300 leading-relaxed">
            You have the following rights regarding your personal data:
          </p>
          <div className="grid gap-4 mt-6">
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 text-lg">👁️</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Right to Access</h4>
                <p className="text-gray-300 text-sm">
                  Request a copy of your personal data
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 text-lg">✏️</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">
                  Right to Correction
                </h4>
                <p className="text-gray-300 text-sm">
                  Update or correct inaccurate information
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 text-lg">🗑️</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Right to Deletion</h4>
                <p className="text-gray-300 text-sm">
                  Request deletion of your personal data
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    // The main container now has a solid background color for the content area
    <div className="min-h-screen bg-black">
      {/* FIX: Banner Section with Background Image */}
      <div className="relative h-[50vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image Layer (absolute to its parent) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ab6})` }}
        >
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Header Content (relative to stay on top) */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Privacy & Security
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Privacy{" "}
            <span className="font-serif italic text-yellow-400">Policy</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            How we protect and handle your personal information
          </p>
          <p className="text-gray-400 mt-4">
            Effective date:{" "}
            <span className="text-yellow-400 font-medium">{effectiveDate}</span>
          </p>
        </div>
      </div>

      {/* Main Content Area (this is now separate from the banner) */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-800 sticky top-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                On This Page
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-gray-300 hover:text-yellow-400 py-2 px-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300 text-sm"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 mb-12 last:mb-0"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                    <h2 className="text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="ml-6">{section.body}</div>
                </section>
              ))}

              {/* Contact Section */}
              <div className="mt-12 pt-8 border-t border-gray-700">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  Contact Us
                </h3>
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <p className="text-gray-300 mb-4">
                    If you have any questions about this Privacy Policy or your
                    personal data, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">
                        Email
                      </h4>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                    <div>
                      <h4 className="text-yellow-400 font-semibold mb-2">
                        Address
                      </h4>
                      <p className="text-gray-300">
                        {companyName}
                        <br />
                        {addressLine}
                        <br />
                        {country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-gray-800/30 rounded-2xl border border-gray-700">
                <p className="text-gray-400 text-sm text-center">
                  This privacy policy is provided for informational purposes.
                  For compliance with specific regulations (GDPR, CCPA, PDPA),
                  please consult with legal professionals.
                </p>
              </div>
            </div>

            {/* Back to Top */}
            <div className="text-center mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
