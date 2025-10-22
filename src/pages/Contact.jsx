import React, { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  CheckCircle,
  User,
  MessageSquare,
  ArrowRight,
  Star,
} from "react-feather";
const WHATSAPP_PHONE = "+92 329 4856302";
const WHATSAPP_MESSAGE =
  "Hello! I saw your 'Direct Contact' and wanted to reach out.";
const cleanedPhone = WHATSAPP_PHONE.replace(/[^\d]/g, "");
const whatsappLink = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "abfragrance01@gmail.com",
      description: "We respond within 2 hours",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+92 329 4856302",
      description: "Mon to Sat, 9am to 6pm",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Urdu bazar main market Lahore, Pakistan",
      description: "Visit our fragrance studio",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-widest">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Let's Create Something
            <span className="block font-serif italic text-gray-700 mt-2">
              Extraordinary
            </span>
          </h1>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We believe in the power of collaboration. Share your vision and
            let's craft something remarkable together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-300">
                      <item.icon className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-900 font-normal text-lg">
                        {item.details}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-6"></div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <Clock size={18} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Quick Response</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors block cursor-pointer"
                  >
                    <MessageCircle
                      size={18}
                      className="text-gray-600 mx-auto mb-2"
                    />
                    <p className="text-sm text-gray-600">Direct Contact</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Studio Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">
                Follow Our Journey
              </h3>
              <div className="flex gap-3">
                {["Instagram", "LinkedIn", "Pinterest", "Behance"].map(
                  (social, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300 group"
                    >
                      <span className="text-gray-600 text-sm font-medium group-hover:text-gray-800">
                        {social[0]}
                      </span>
                    </button>
                  )
                )}
              </div>
            </div> */}
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-gray-600" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">
                  Message Received
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Thank you for reaching out. We appreciate your interest and
                  will respond within 2 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <MessageSquare className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-light text-gray-900 tracking-tight">
                      Send a Message
                    </h2>
                    <p className="text-gray-500">
                      We're here to help with your inquiry
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200 bg-white"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200 bg-white"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-200 bg-white resize-none"
                      placeholder="Tell us about your project or how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800 border border-gray-900 hover:shadow-md"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <Star size={12} className="text-gray-400" />
                    Typically respond within 2-4 hours
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-16 border-t border-gray-100 pt-16">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 mb-3">
              Ready to Begin Your Project?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Let's schedule a consultation to discuss your vision in detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium">
                Schedule Consultation
              </button>
              <button className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                View Our Work
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
