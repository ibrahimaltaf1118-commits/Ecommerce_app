import React, { useState } from "react";
import maqbool from "../assets/maqbool.jpg";
import fahad from "../assets/fahad.jpg";
import afaq from "../assets/afaq.jpg";
// This is the image that will be used for the banner
import ab6 from "../assets/ab6.webp";
import {
  Heart,
  Award,
  Users,
  Globe,
  Shield,
  Truck,
  Star,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Zap,
  Gift,
} from "react-feather";
import banner4 from "../assets/banner4.jpg";

const team = [
  {
    name: "Maqbool Ahmad",
    role: "Founder & Master Perfumer",
    image: maqbool,
    bio: "Fifth-generation perfumer with expertise in oriental and floral fragrance families.",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Fahad Maqbool",
    role: "Head of Fragrance Development",
    image: fahad,
    bio: "Specialized in modern scent compositions and sustainable ingredient sourcing.",
  },
  {
    name: "Afaq Ahmad",
    role: "Creative Director",
    image: afaq,
    bio: "Creates immersive brand experiences and visual storytelling for our fragrance collections.",
  },
];

const testimonials = [
  {
    name: "Sara Ahmed",
    role: "Perfume Collector",
    feedback:
      "The oud collection is absolutely mesmerizing! Long-lasting and truly authentic Middle Eastern scents.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Hamza Tariq",
    role: "Luxury Retailer",
    feedback:
      "As a retailer, I appreciate their attention to detail and consistent quality across all fragrance lines.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Zainab Malik",
    role: "Beauty Influencer",
    feedback:
      "Their rose attar is the most authentic I've ever experienced. The scent evolves beautifully throughout the day.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  },
];

const faqs = [
  {
    question: "How long do your perfumes typically last?",
    answer:
      "Our concentrated perfumes last 8-12 hours on skin. The longevity varies by fragrance family, with oud and musk-based scents lasting the longest.",
  },
  {
    question: "Do you use natural ingredients?",
    answer:
      "We blend both natural essential oils and high-quality synthetic ingredients to ensure consistency, safety, and creative freedom in our compositions.",
  },
  {
    question: "What is the difference between attar and perfume?",
    answer:
      "Attars are traditional oil-based fragrances without alcohol, while our perfumes use alcohol bases for different projection and longevity characteristics.",
  },
  {
    question: "Are your fragrances tested on animals?",
    answer:
      "No, we are cruelty-free and do not test any of our products or ingredients on animals.",
  },
  {
    question: "Can I return a perfume if I don't like the scent?",
    answer:
      "We offer scent samples for purchase. Due to hygiene reasons, opened perfumes cannot be returned, but unopened items can be returned within 30 days.",
  },
];

const handleConsultation = () => {
  const phone = "+92 329 4856302";
  const message =
    "Hello! I'd like to book a fragrance consultation. Please let me know the available time slots.";
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(link, "_blank");
};

// Inline CSS for marquee animation
const styles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
  }
  .marquee-content {
    display: inline-flex;
    animation: marquee 25s linear infinite;
    will-change: transform;
  }
  .marquee-content:hover {
    animation-play-state: paused;
  }
  .testimonial-card {
    flex: 0 0 auto;
    margin-right: 2rem;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* FIX: Hero Section updated with a background image banner */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image & Overlay Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ab6})` }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg border border-white/20">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Since 2018
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
            The Art of{" "}
            <span className="font-serif italic text-yellow-400">Scent</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We craft unforgettable olfactory experiences, blending traditional
            perfumery with modern innovation to create scents that tell your
            story.
          </p>
        </div>
      </section>

      {/* Big Image Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={banner4}
                  alt="Perfume Creation Process"
                  className="w-full h-[850px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-600/10 rounded-full blur-xl opacity-40"></div>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-yellow-400/50 transition-all duration-500 shadow-lg">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
                  <GitBranch className="text-yellow-400" size={24} />
                </div>
                <h3 className="text-3xl font-light text-white mb-4">
                  Our{" "}
                  <span className="font-serif italic text-yellow-400">
                    Craft
                  </span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Each fragrance is a carefully composed symphony of notes, from
                  the first impression to the lasting memory. We source the
                  finest ingredients from around the world to create scents that
                  evoke emotion and create connections.
                </p>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-yellow-400/50 transition-all duration-500 shadow-lg">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 border border-yellow-500/20">
                  <Zap className="text-yellow-400" size={24} />
                </div>
                <h3 className="text-3xl font-light text-white mb-4">
                  The{" "}
                  <span className="font-serif italic text-yellow-400">
                    Experience
                  </span>
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Beyond the bottle, we create immersive experiences. Our
                  fragrances are designed to evolve with you, revealing
                  different characteristics throughout the day and becoming an
                  integral part of your personal story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="group">
              <div className="bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-800">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-yellow-500/20">
                  <Award className="text-yellow-400" size={24} />
                </div>
                <h2 className="text-3xl font-light text-white mb-4">
                  Our{" "}
                  <span className="font-serif italic text-yellow-400">
                    Mission
                  </span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  To capture life's most beautiful moments in scent, creating
                  fragrances that inspire confidence, evoke memories, and become
                  signatures for those who wear them.
                </p>
                <ul className="space-y-3">
                  {[
                    "Scent Craftsmanship",
                    "Ingredient Excellence",
                    "Emotional Connection",
                    "Sustainable Sourcing",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="group">
              <div className="bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-800">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-yellow-500/20">
                  <Globe className="text-yellow-400" size={24} />
                </div>
                <h2 className="text-3xl font-light text-white mb-4">
                  Our{" "}
                  <span className="font-serif italic text-yellow-400">
                    Vision
                  </span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  To become the world's most trusted creator of signature
                  scents, revolutionizing how people experience and connect with
                  fragrance in their daily lives.
                </p>
                <ul className="space-y-3">
                  {[
                    "Global Fragrance House",
                    "Innovative Scent Technology",
                    "Community of Scent Lovers",
                    "Artistic Excellence",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
              Master{" "}
              <span className="font-serif italic text-yellow-400">
                Perfumers
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The artists and scientists behind every unforgettable scent
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-700"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500 border-2 border-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-yellow-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex justify-center gap-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Infinite Scroll */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
              Scent{" "}
              <span className="font-serif italic text-yellow-400">Stories</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from our community of fragrance enthusiasts
            </p>
          </div>
          <div className="marquee-container">
            <div className="marquee-content">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-card bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-800 hover:border-yellow-400/50 mx-4 min-w-[300px] max-w-[350px] flex-shrink-0 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  <div className="relative flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400/30 shadow-md"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-yellow-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed italic text-sm">
                    "{testimonial.feedback}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
              Fragrance{" "}
              <span className="font-serif italic text-yellow-400">Guide</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400">
              Everything you need to know about our scents
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="text-yellow-400" />
                  ) : (
                    <ChevronDown className="text-yellow-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-white shadow-2xl border border-gray-800">
            <h3 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
              Discover Your Signature Scent
            </h3>
            <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
              Explore our collection of 120+ unique fragrances and find the
              scent that tells your story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-300 transition-colors transform hover:scale-105 flex items-center justify-center gap-2">
                <Gift size={20} />
                Shop Collection
              </button>
              <button
                onClick={handleConsultation}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 hover:text-gray-900 transition-colors transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Mail className="text-yellow-400 mb-4" size={32} />
              <h4 className="font-semibold text-white mb-2">Email Us</h4>
              <p className="text-gray-400">abfragrance01@gmail.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="text-yellow-400 mb-4" size={32} />
              <h4 className="font-semibold text-white mb-2">
                Fragrance Experts
              </h4>
              <p className="text-gray-400">+92 329 4856302</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="text-yellow-400 mb-4" size={32} />
              <h4 className="font-semibold text-white mb-2">Visit Our Shop</h4>
              <p className="text-gray-400">Lahore, Pakistan</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
