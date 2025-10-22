import ret from "../assets/return.webp";
import {
  Truck,
  RefreshCw,
  CreditCard,
  Package,
  Shield,
  Clock,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Shipping() {
  const shippingSteps = [
    {
      icon: Package,
      title: "Order Placed",
      description: "We receive your order and begin processing immediately",
      time: "Within 1 hour",
    },
    {
      icon: Clock,
      title: "Processing",
      description: "We prepare your items with care and quality check",
      time: "1-2 days",
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "Your order is dispatched with tracking information",
      time: "2-3 days",
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: "Your package arrives at your doorstep",
      time: "3-7 days",
    },
  ];

  const shippingOptions = [
    {
      type: "Standard",
      price: "FREE",
      time: "3–7 Business Days",
      free: "On all orders above Rs.3000 in Lahore",
      features: ["Tracking included", "Secure packaging"],
    },
    {
      type: "Express",
      price: "Rs. 600",
      time: "1-2 Business Days",
      free: "For major cities",
      features: [
        "Priority processing",
        "Real-time tracking",
        "Signature on delivery",
      ],
    },
    {
      type: "International",
      price: "Calculated at Checkout",
      time: "7-15 Business Days",
      free: "Varies by country",
      features: [
        "Global delivery network",
        "Customs support",
        "Full insurance coverage",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section with Banner Image */}
      <div className="relative py-20 md:py-32 overflow-hidden text-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ret})` }}
        >
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg border border-white/10">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
              Fast & Reliable Delivery
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Shipping &{" "}
            <span className="font-serif italic text-yellow-400">Returns</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Fast, transparent shipping and hassle-free returns. Your
            satisfaction is our priority.
          </p>
        </div>
      </div>

      {/* Shipping Process Timeline */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            How Your Order <span className="text-yellow-400">Travels</span>
          </h2>
          <p className="text-gray-400 text-lg">
            From our warehouse to your doorstep
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shippingSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-800 hover:border-yellow-400/30 transition-all duration-500 group text-center h-full">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3">{step.description}</p>
                <div className="bg-gray-800/50 rounded-lg px-3 py-2 inline-block">
                  <span className="text-yellow-400 text-sm font-medium">
                    {step.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Options */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">
            Choose Your <span className="text-yellow-400">Shipping</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Select the option that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {shippingOptions.map((option, index) => (
            <div
              key={index}
              className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-yellow-400/30 transition-all duration-500 group"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {option.type}
                </h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {option.price}
                </div>
                <div className="text-gray-300 mb-4">{option.time}</div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
                  <span className="text-yellow-400 text-sm">{option.free}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Return Policy Made Simple */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <RefreshCw className="w-8 h-8 text-yellow-400" />
            </div>
            <h2 className="text-3xl font-light text-white mb-4">
              Easy <span className="text-yellow-400">Returns</span>
            </h2>
            <p className="text-gray-400 text-lg">Hassle-free return process</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    What You Can Return
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Unused items in original packaging</li>
                    <li>Defective or damaged products</li>
                    <li>Wrong items received</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Return Window
                  </h4>
                  <p className="text-gray-300 text-sm">
                    7 days from delivery date
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    What You Can't Return
                  </h4>
                  <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                    <li>Personalized or custom items</li>
                    <li>Opened perfumes or attars</li>
                    <li>Gift cards</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Refund Timeline
                  </h4>
                  <p className="text-gray-300 text-sm">
                    5-10 business days after we receive your return
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Support Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 text-center border border-gray-800 h-full">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <Phone className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Call Us</h3>
            <p className="text-gray-400 text-sm mb-3">
              Speak directly with our team
            </p>
            <a
              href="tel:+923294856302"
              className="text-yellow-400 font-semibold text-lg hover:text-yellow-300 transition-colors"
            >
              +92 329 4856302
            </a>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 text-center border border-gray-800 h-full">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <Mail className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Email Us</h3>
            <p className="text-gray-400 text-sm mb-3">Get help via email</p>
            <a
              href="mailto:abfragrance01@gmail.com"
              className="text-yellow-400 font-semibold text-lg hover:text-yellow-300 transition-colors"
            >
              abfragrance01@gmail.com
            </a>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 text-center border border-gray-800 h-full">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
              <MapPin className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-400 text-sm mb-3">
              Urdu Bazar, Lahore, Pakistan
            </p>
            <a
              href="#"
              className="text-yellow-400 font-semibold text-lg hover:text-yellow-300 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
