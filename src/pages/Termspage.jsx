export default function Termspage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-gray-600">
        Welcome to MyStore. By accessing or using our website, you agree to
        comply with these Terms & Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
      <p className="mb-4 text-gray-600">
        You agree not to misuse our website, attempt unauthorized access, or
        engage in activities that may harm the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Orders & Payments</h2>
      <p className="mb-4 text-gray-600">
        All orders are subject to acceptance and availability. Payments must be
        made before products are shipped.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Returns & Refunds</h2>
      <p className="mb-4 text-gray-600">
        Customers may request returns within 7 days of delivery, provided the
        item is unused and in its original packaging.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Limitation of Liability
      </h2>
      <p className="mb-4 text-gray-600">
        We are not responsible for any indirect damages, data loss, or issues
        caused by third-party services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
      <p className="mb-4 text-gray-600">
        We reserve the right to update these Terms at any time. Please review
        this page regularly.
      </p>

      <p className="mt-8 text-gray-600">
        If you have questions about our Terms & Conditions, contact us at{" "}
        <a
          href="mailto:support@example.com"
          className="text-blue-600 underline"
        >
          support@example.com
        </a>
        .
      </p>
    </div>
  );
}
