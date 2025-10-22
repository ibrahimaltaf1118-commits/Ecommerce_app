export default function Termspage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-white/10">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Legal Documentation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Terms &{" "}
            <span className="font-serif italic text-yellow-400">
              Conditions
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-800 hover:border-yellow-400/30 transition-all duration-500">
          <div className="mb-8">
            <p className="text-lg text-gray-300 leading-relaxed">
              Welcome to{" "}
              <span className="text-yellow-400 font-semibold">
                abfragrance.pk
              </span>
              . By accessing or using our website, you agree to comply with
              these Terms & Conditions.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">1</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Use of the Website
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                You agree not to misuse our website, attempt unauthorized
                access, or engage in activities that may harm the website. This
                includes but is not limited to: hacking, data scraping, or any
                activity that disrupts the user experience.
              </p>
            </div>

            {/* Section 2 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">2</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Orders & Payments
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                All orders are subject to acceptance and availability. Payments
                must be made before products are shipped. We accept various
                payment methods including jazzcash, easypaisa digital wallets,
                and bank transfers for your convenience.
              </p>
            </div>

            {/* Section 3 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">3</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Returns & Refunds
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                Customers may request returns within 2 days of delivery,
                provided the item is unused and in its original packaging.
                Refunds will be processed within 5-7 business days after we
                receive the returned items.
              </p>
            </div>

            {/* Section 4 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">4</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                We are not responsible for any indirect damages, data loss, or
                issues caused by third-party services. Our liability is limited
                to the maximum extent permitted by law.
              </p>
            </div>

            {/* Section 5 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">5</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Changes to Terms
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                We reserve the right to update these Terms at any time. Please
                review this page regularly. Continued use of our services after
                changes constitutes acceptance of the modified terms.
              </p>
            </div>

            {/* Additional Section 6 */}
            <div className="group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-yellow-400 font-bold text-sm">6</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mt-1">
                  Intellectual Property
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed ml-12">
                All content on this website, including text, graphics, logos,
                and images, is the property of <b>abfragrance</b> and protected
                by intellectual property laws. Unauthorized use is strictly
                prohibited.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">
                Need Help?
              </h3>
              <p className="text-gray-300 mb-4">
                If you have questions about our Terms & Conditions, our support
                team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:support@shopmate.com"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Email Support
                </a>
                <a
                  href="/contact"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Contact Form
                </a>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
