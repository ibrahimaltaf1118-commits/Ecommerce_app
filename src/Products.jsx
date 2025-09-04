// src/data/products.js

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 199,
    stock: 12,
    rating: 4,
    reviews: 23,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    mainImage:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://via.placeholder.com/100x100?text=Headphones+1",
      "https://via.placeholder.com/100x100?text=Headphones+2",
      "https://via.placeholder.com/100x100?text=Headphones+3",
      "https://via.placeholder.com/100x100?text=Headphones+4",
    ],
    description:
      "Experience amazing sound quality with noise cancellation and 30 hours of battery life.",
    reviewsList: [
      { user: "Ali", rating: 5, comment: "Amazing product!" },
      { user: "Sara", rating: 4, comment: "Good quality but a bit pricey." },
    ],
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 499,
    stock: 8,
    rating: 5,
    reviews: 40,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    mainImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://via.placeholder.com/100x100?text=Watch+1",
      "https://via.placeholder.com/100x100?text=Watch+2",
      "https://via.placeholder.com/100x100?text=Watch+3",
    ],
    description:
      "Track your fitness and stay connected with this stylish smartwatch.",
    reviewsList: [
      { user: "John", rating: 5, comment: "Love the features!" },
      { user: "Maya", rating: 4, comment: "Battery could be better." },
    ],
  },
  {
    id: 3,
    name: "Nike Running Shoes",
    category: "Fashion",
    price: 149,
    stock: 20,
    rating: 4,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1600180758895-18e6a0d69d9b?auto=format&fit=crop&w=500&q=80",
    mainImage:
      "https://images.unsplash.com/photo-1600180758895-18e6a0d69d9b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://via.placeholder.com/100x100?text=Shoes+1",
      "https://via.placeholder.com/100x100?text=Shoes+2",
      "https://via.placeholder.com/100x100?text=Shoes+3",
    ],
    description:
      "Lightweight running shoes designed for performance and comfort.",
    reviewsList: [
      { user: "Amir", rating: 5, comment: "Very comfortable!" },
      { user: "Zoya", rating: 4, comment: "Stylish but a bit narrow." },
    ],
  },
  {
    id: 4,
    name: "Canon DSLR Camera",
    category: "Electronics",
    price: 1299,
    stock: 5,
    rating: 5,
    reviews: 8,
    image:
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=500&q=80",
    mainImage:
      "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://via.placeholder.com/100x100?text=Camera+1",
      "https://via.placeholder.com/100x100?text=Camera+2",
    ],
    description:
      "Professional DSLR camera with outstanding image quality and 4K video recording.",
    reviewsList: [
      { user: "David", rating: 5, comment: "Perfect for photography!" },
      { user: "Emma", rating: 5, comment: "Worth every penny!" },
    ],
  },
];

export default products;
