const products = [
  {
    id: 1,
    name: "Baby Stag Feed",
    category: "Animal Feeds",
    price: 1250,
    image: "assets/images/babystag.png",
    description: "Premium baby stag feed for optimal growth and development.",
    stock: 45,
    featured: true
  },
  {
    id: 2,
    name: "Early Wean Feed",
    category: "Animal Feeds",
    price: 1180,
    image: "assets/images/earlywean.jpg",
    description: "Specialized feed for early weaning pigs for smooth transition.",
    stock: 38,
    featured: true
  },
  {
    id: 3,
    name: "Platinum Fertilizer",
    category: "Fertilizers",
    price: 1650,
    image: "assets/images/platinum.png",
    description: "Premium complete fertilizer with balanced nutrients.",
    stock: 27,
    featured: true
  },
  {
    id: 4,
    name: "Growex 1",
    category: "Animal Feeds",
    price: 1200,
    image: "assets/images/Growex1.jpg",
    description: "Growth promoter feed for young animals.",
    stock: 56,
    featured: false
  },
  {
    id: 5,
    name: "INT 1 Insecticide",
    category: "Crop Protection",
    price: 850,
    image: "assets/images/INT1.webp",
    description: "Effective crop protection against common pests.",
    stock: 63,
    featured: false
  },
  {
    id: 6,
    name: "Pre-Startex Seeds",
    category: "Seeds",
    price: 780,
    image: "assets/images/pre-startex.jpg",
    description: "High-quality pre-treated seeds for better germination.",
    stock: 74,
    featured: false
  },
  {
    id: 7,
    name: "Galimax Feed",
    category: "Animal Feeds",
    price: 1350,
    image: "assets/images/GALIMAX.png",
    description: "Complete balanced feed for maximum growth.",
    stock: 47,
    featured: false
  },
  {
    id: 8,
    name: "Super Grower",
    category: "Fertilizers",
    price: 1550,
    image: "assets/images/supergrower.jpg",
    description: "Concentrated fertilizer for enhanced growth.",
    stock: 33,
    featured: false
  },
  {
    id: 9,
    name: "Super Starter",
    category: "Fertilizers",
    price: 1480,
    image: "assets/images/superstarter.jpg",
    description: "Starter fertilizer for young plants.",
    stock: 39,
    featured: false
  },
  {
    id: 10,
    name: "Enertone",
    category: "Animal Feeds",
    price: 1420,
    image: "assets/images/enertone.png",
    description: "Energy-rich feed supplement.",
    stock: 52,
    featured: false
  },
  {
    id: 11,
    name: "Stag Developer",
    category: "Animal Feeds",
    price: 1280,
    image: "assets/images/stagdeveloper.png",
    description: "Developmental feed for stags.",
    stock: 42,
    featured: false
  },
  {
    id: 12,
    name: "Salto Orange",
    category: "Crop Protection",
    price: 890,
    image: "assets/images/saltoorange.png",
    description: "Selective herbicide for weed control.",
    stock: 61,
    featured: false
  }
];

function formatPrice(price) {
  return '₱' + price.toLocaleString('en-PH');
}

