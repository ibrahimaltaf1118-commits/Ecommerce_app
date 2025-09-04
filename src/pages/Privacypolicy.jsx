import React from "react";

export default function Privacypolicy({
  companyName = "Your Store Name",
  contactEmail = "support@example.com",
  addressLine = "Your full business address",
  country = "Your Country",
  effectiveDate = "January 1, 2024",
}) {
  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      body: (
        <>
          <p>
            This Privacy Policy explains how <strong>{companyName}</strong>{" "}
            ("we", "us", or "our") collects, uses, and protects your information
            when you visit our website, create an account, or purchase our
            products. By using our services, you agree to the practices
            described in this policy.
          </p>
          <p>
            If you do not agree with this policy, please do not access the site
            or use our services. For questions, contact us at{" "}
            <a className="underline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            .
          </p>
        </>
      ),
    },
    // ... other sections unchanged
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14">
        {/* Header */}
        <header className="mb-10 lg:mb-14">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Privacy Policy
              </h1>
              <p className="mt-2 text-gray-600">
                Effective date:{" "}
                <span className="font-medium text-gray-800">
                  {effectiveDate}
                </span>
              </p>
              <p className="mt-1 text-gray-600">
                This policy applies to{" "}
                <span className="font-medium">{companyName}</span> and governs
                the collection and use of personal information on our e‑commerce
                platform.
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <a
                href="#contact"
                className="inline-flex items-center rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition"
              >
                Contact {companyName}
              </a>
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3 lg:sticky lg:top-6 h-max">
            <nav className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs uppercase tracking-wider text-gray-500">
                On this page
              </p>
              <ul className="space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-xl px-3 py-2 hover:bg-gray-50"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <article className="lg:col-span-9">
            <div className="max-w-none">
              {sections.map((s) => (
                <section id={s.id} key={s.id} className="scroll-mt-24 mb-8">
                  <h2 className="text-2xl font-semibold mb-3">{s.title}</h2>
                  {s.body}
                </section>
              ))}

              {/* Address & Footer Notice */}
              <section className="mt-10">
                <h3 className="text-xl font-semibold mb-2">Business Details</h3>
                <p>
                  <strong>{companyName}</strong>
                  <br />
                  {addressLine}
                  <br />
                  {country}
                </p>
              </section>

              <p className="mt-8 text-sm text-gray-500">
                This template is provided for informational purposes and does
                not constitute legal advice. For compliance with specific
                regulations (e.g., GDPR, CCPA, PDPA), consult a qualified
                professional.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <a
                href="#top"
                className="rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm hover:shadow"
              >
                Back to top
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Smooth scrolling */}
      <style>{`html{scroll-behavior:smooth}`}</style>
    </main>
  );
}
