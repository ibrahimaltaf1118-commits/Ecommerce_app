// // src/data/products.js
// import earbuds1 from "./assets/earbuds/Wireless earbuds 2nd gen (1).webp";
// import earbuds2 from "./assets/earbuds/Wireless earbuds 2nd gen (2).webp";
// import earbuds3 from "./assets/earbuds/Wireless earbuds 2nd gen (3).webp";
// import earbuds4 from "./assets/earbuds/Wireless earbuds 2nd gen (4).webp";
import ab1 from "./assets/ab1.webp";
import ab2 from "./assets/ab2.webp";
import ab3 from "./assets/ab3.webp";
import ab4 from "./assets/ab4.webp";

const products = [
  {
    id: 1,
    name: "Airpods pro second generation | Bluetooth headphones | Active noise cancellation | Sound is Super | long life of Batteries",
    category: "Electronics",
    price: 1999,
    stock: 12,
    rating: 4,
    reviews: 23,
    image: ab1,
    mainImage: ab2,
    images: [ab3, ab4, ab1, ab2],
    description:
      "Product details of Airpods pro second generation | Bluetooth headphones | Active noise cancellation | Sound is Super | long life of Batteries ",
    longDescription: `
   <h3 class="text-xl font-bold text-gray-900 mb-4">Premium Sound Experience</h3>
<p class="text-gray-700 leading-relaxed mb-6">Immerse yourself in crystal-clear audio with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones block out ambient noise so you can focus on your music, podcasts, or calls.</p>

<h4 class="text-lg font-semibold text-gray-800 mb-3">Key Features:</h4>
<ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
  <li><strong class="text-gray-900">30-hour battery life</strong> - Enjoy all-day listening without frequent charging</li>
  <li><strong class="text-gray-900">Active Noise Cancellation</strong> - Block out distractions in any environment</li>
  <li><strong class="text-gray-900">Premium Comfort</strong> - Memory foam ear cushions for extended wear</li>
  <li><strong class="text-gray-900">Bluetooth 5.2</strong> - Stable connection with low latency</li>
  <li><strong class="text-gray-900">Voice Assistant Support</strong> - Compatible with Siri, Google Assistant, and Alexa</li>
  <li><strong class="text-gray-900">Quick Charge</strong> - 15 minutes charging for 3 hours of playback</li>
</ul>

<h4 class="text-lg font-semibold text-gray-800 mb-3">Technical Specifications:</h4>
<ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
  <li><strong class="text-gray-900">Driver Size:</strong> 40mm dynamic drivers</li>
  <li><strong class="text-gray-900">Frequency Response:</strong> 20Hz - 20kHz</li>
  <li><strong class="text-gray-900">Impedance:</strong> 32 ohms</li>
  <li><strong class="text-gray-900">Charging Time:</strong> 2 hours</li>
  <li><strong class="text-gray-900">Weight:</strong> 265g</li>
  <li><strong class="text-gray-900">Connectivity:</strong> Bluetooth 5.2, 3.5mm audio jack</li>
</ul>

<h4 class="text-lg font-semibold text-gray-800 mb-3">What's in the Box:</h4>
<ul class="list-disc list-inside space-y-2 text-gray-700">
  <li>Wireless Headphones</li>
  <li>Carrying Case</li>
  <li>USB-C Charging Cable</li>
  <li>3.5mm Audio Cable</li>
  <li>User Manual</li>
</ul>
    `,
    reviewsList: [
      { user: "Ali", rating: 5, comment: "Amazing product!" },
      { user: "Sara", rating: 4, comment: "Good quality but a bit pricey." },
    ],
  },
];

export default products;
