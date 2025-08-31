import React from "react";

const team = [
  {
    name: "Ayesha Khan",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/200",
  },
  {
    name: "Ali Raza",
    role: "Head of Development",
    image: "https://via.placeholder.com/200",
  },
  {
    name: "Fatima Zahra",
    role: "Marketing Lead",
    image: "https://via.placeholder.com/200",
  },
];

const testimonials = [
  {
    name: "Sara Ahmed",
    feedback:
      "Absolutely love the products! Great quality and fast delivery. Customer service is outstanding!",
  },
  {
    name: "Hamza Tariq",
    feedback:
      "Best online shopping experience I’ve had. The interface is smooth, and support is always there.",
  },
];

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy on all products. Items must be unused and in original packaging.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery takes 2-5 business days depending on your location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we only ship within Pakistan but are working to expand soon.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a passionate team dedicated to delivering quality products, a great shopping experience, and excellent support.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://via.placeholder.com/500x350"
            alt="Our Mission"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To offer stylish, affordable, and high-quality products with exceptional service. We value trust, innovation, and satisfaction.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to redefine online shopping by delivering excellence, embracing innovation, and building a loyal community.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/500x350"
            alt="Our Vision"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4"
                />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg shadow">
                <p className="text-gray-700 italic">“{t.feedback}”</p>
                <p className="mt-3 text-right text-sm font-medium text-gray-600">- {t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white p-4 rounded-xl shadow-md cursor-pointer">
                <summary className="font-medium">{faq.question}</summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12">
          <h4 className="text-xl font-medium mb-2">Have Questions?</h4>
          <p className="text-gray-600">Feel free to reach out to our support team anytime — we're here to help!</p>
        </section>
      </div>
    </div>
  );
};

export default About;
