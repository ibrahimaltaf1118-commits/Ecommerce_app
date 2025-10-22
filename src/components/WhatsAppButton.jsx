// components/WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({
  phone = "+92 329 4856302",
  message = "Hello! 👋",
}) => {
  // FIX: Clean the phone number by removing all non-digit characters (including + and spaces)
  // The regular expression /[\s\-()+]/g removes spaces, hyphens, parentheses, and the plus sign.
  // We'll also try the previous, more robust version just to be sure:
  const cleanedPhone = phone.replace(/[^\d]/g, "");

  // --- DEBUGGING STEP: Check what the final number is ---
  // Open your browser's console (F12) to see what value is being used in the link.
  console.log("Original Phone:", phone);
  console.log("Cleaned Phone for URL:", cleanedPhone);
  // --------------------------------------------------------

  // Construct the link using the cleaned phone number
  // The URL format is: https://wa.me/COUNTRYCODENUMBER?text=MESSAGE
  const link = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center gap-3 transition transform hover:scale-110 group overflow-visible"
    >
      {/* Slide-in Order here text */}
      <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap animate-pulse absolute -left-24 top-1/2 transform -translate-y-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-none">
        Order here!
      </span>

      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
