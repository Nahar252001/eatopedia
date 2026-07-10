export const CATEGORIES = {
  best_food: { label: "Best Food", emoji: "🍽️" },
  best_ambience: { label: "Best Ambience", emoji: "📸" },
  romantic: { label: "Romantic Date Spots", emoji: "💕" }
};

export const AMENITIES_CONFIG = {
  wifi: { label: "Fast Wi-Fi", icon: "wifi" },
  outlets: { label: "Power Outlets", icon: "electrical_services" },
  pets: { label: "Pet Friendly", icon: "pets" },
  parking: { label: "Free Parking", icon: "local_parking" }
};

export const PLACES = [
  {
    id: "concrete-studio",
    name: "The Concrete Studio",
    area: "Adajan",
    address: "GF, Block C, Riverfront Avenue, Adajan, Surat - 395009",
    photos: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCstgGm07_7UqySukezwmMl8nOjAZqS43DmUqfucVP0tmJbsItrtrEmAo1LC0GbBn9bGZulFp04Pu0hdYMdNZAnEZSeG1nw5dnPNZQi_MVV7wSE_ayuIP-PsyDiosEjgnpkyUAUYDma43cS0BySt4b0rwU1W4X7R6OcF8Jf4ShE9bvxcoZ6IZHts1j29FMM7SwbAbNaVAv3PGRGv6g8tXUdZyCY4UKEjaYuxk3Vc7adYwABcESpUfZE",
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80"
    ],
    categories: ["best_ambience"],
    explanation_text: {
      best_ambience: "Minimalist raw concrete walls, floor-to-ceiling glass paneling, and curated fiddle-leaf figs. It's clean, bright, and perfect for your next Instagram photo dump."
    },
    rating_count: 98,
    amenities: ["wifi", "outlets", "parking"],
    opening_hours: { weekdays: "8:00 AM – 11:00 PM", weekends: "8:00 AM – 11:00 PM" },
    testimonial: { text: "Minimalist perfection. The cold brew tonic is incredible.", author: "Kunal S." },
    map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dV2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL",
    aspectRatio: "card-tall",
    must_try_dishes: [
      { name: "Cold Brew Tonic", tag: "Signature", description: "Chilled, double-filtered house cold brew poured over sparkling tonic water with a slice of blood orange.", price: "₹210" },
      { name: "Avocado Sourdough Toast", tag: "Best Seller", description: "Freshly baked crusty sourdough topped with seasoned avocado mash, cherry tomatoes, and organic microgreens.", price: "₹320" },
      { name: "Charcoal Rose Latte", tag: "Beverage", description: "A visually striking black latte infused with active charcoal powder and sweet edible rose syrup.", price: "₹240" }
    ]
  },
  {
    id: "vellora-cafe-restro",
    name: "Vellora Cafe and Restro",
    area: "Vesu",
    address: "Ground Floor, Tigmon The Chocolate Mall, Opposite Fiona Residency, Vesu, Surat - 395007",
    photos: [
      "/vellora_facade.jpg",
      "/vellora_interior.jpg"
    ],
    categories: ["best_food"],
    explanation_text: {
      best_food: "From live wood-fired sourdough pizzas baking before your eyes to their signature Korean style crispy veg paneer, the fusion flavors here are expertly balanced."
    },
    rating_count: 215,
    amenities: ["wifi", "parking"],
    opening_hours: { weekdays: "1:00 PM – 11:00 PM", weekends: "1:00 PM – 11:30 PM" },
    testimonial: { text: "The Korean style paneer is out of this world, and the green boho-chic interior is gorgeous.", author: "Rohan D." },
    map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dV2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL",
    aspectRatio: "card-medium",
    must_try_dishes: [
      { name: "Crispy Veg Paneer (Korean Style)", tag: "Signature", description: "Crispy batter-fried paneer cubes tossed in a spicy, sticky sweet Korean chili sauce with sesame glaze.", price: "₹320" },
      { name: "Pink Sauce Spaghetti Pasta", tag: "Best Seller", description: "Fresh handmade spaghetti tossed in a creamy tomato-basil pink sauce with bell peppers and broccoli.", price: "₹290" },
      { name: "Lotus Biscoff Shake", tag: "Beverage", description: "A rich, creamy milkshake blended with caramelized Lotus Biscoff spread and crushed cookies.", price: "₹260" }
    ]
  },
  {
    id: "unvind-cafe",
    name: "Unvind Cafe",
    area: "City Light",
    address: "6th Floor, Kalp Business Center, City Light Road, opposite Pantaloons, City Light, Surat - 395007",
    photos: [
      "/unvind_entrance.jpg",
      "/unvind_terrace.jpg"
    ],
    categories: ["best_ambience"],
    explanation_text: {
      best_ambience: "Perched on the 6th-floor rooftop, Unvind blends minimal white seating with custom industrial curved lighting and rich foliage to design Surat's most stylish open-sky garden terrace."
    },
    rating_count: 189,
    amenities: ["wifi", "parking"],
    opening_hours: { weekdays: "11:00 AM – 1:00 AM", weekends: "11:00 AM – 1:00 AM" },
    testimonial: { text: "The burnt garlic rice with cheese sauce is legendary, and the open-sky views are beautiful.", author: "Karan P., Local Foodie" },
    map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dV2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL",
    aspectRatio: "card-medium",
    must_try_dishes: [
      { name: "Burnt Garlic Rice with Cheese Sauce", tag: "Best Seller", description: "Fragrant burnt garlic fried rice served with a rich, velvety, melted cheese sauce stream.", price: "₹340" },
      { name: "Oreo Milkshake", tag: "Signature", description: "Thick, creamy classic vanilla shake blended with double-stuffed chocolate Oreo cookies and whipped cream.", price: "₹220" },
      { name: "Lotus Biscoff Cheesecake", tag: "Must Try", description: "A velvety baked cheesecake with a buttery speculoos crust, topped with cookie butter drip.", price: "₹280" }
    ]
  },
  {
    id: "eighteen-nineteen",
    name: "18.19 Cafe & Lounge",
    area: "Vesu",
    address: "Bungalow No. 3, Napoleon Estate, beside VR Mall, Vesu, Surat - 395007",
    photos: [
      "/cafe1819_interior.jpg",
      "/cafe1819_night.jpg"
    ],
    categories: ["romantic"],
    explanation_text: {
      romantic: "With its high-pitched wooden ceilings, dim candlelit tables, soft acoustic background tracks, and cozy corner alcoves, it offers a beautifully warm and intimate setting for couples."
    },
    rating_count: 142,
    amenities: ["wifi", "parking"],
    opening_hours: { weekdays: "12:00 PM – 11:30 PM", weekends: "12:00 PM – 11:30 PM" },
    testimonial: { text: "The Nutella cheesecake here is absolutely heavenly, and the Mexican burrito bowl is highly satisfying!", author: "Riddhi S., Local Food Blogger" },
    map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dV2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL",
    aspectRatio: "card-medium",
    must_try_dishes: [
      { name: "Nutella Cheesecake", tag: "Best Seller", description: "A creamy, rich chilled cheesecake layered with Nutella hazelnut spread and a crispy biscuit base.", price: "₹260" },
      { name: "Mexican Burrito Bowl", tag: "Signature", description: "Spicy Mexican rice layered with refried black beans, corn salsa, sour cream, and crispy nachos.", price: "₹310" },
      { name: "Alfredo White Sauce Pasta", tag: "Must Try", description: "Handcrafted pasta tossed in a creamy, buttery Parmesan sauce with exotic vegetables and mushrooms.", price: "₹280" }
    ]
  },
  {
    id: "shakers-galleria",
    name: "Shaker's Galleria",
    area: "Adajan",
    address: "Shop 3, The Boulevard, opposite Pal Lake, Adajan, Surat - 395009",
    photos: [],
    categories: ["best_food"],
    explanation_text: {
      best_food: "Famous for their rich milkshakes, loaded chocolate waffles, and delicious pancakes, it is Surat's go-to late-night dessert gallery."
    },
    rating_count: 176,
    amenities: ["parking"],
    opening_hours: { weekdays: "11:00 AM – 11:30 PM", weekends: "11:00 AM – 12:00 AM" },
    testimonial: { text: "The KitKat shake and waffle combo here is simply heavenly, absolute late-night bliss!", author: "Aarav P." },
    map_photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpE_-qQIXe6oANyCvxFIdFq5BU9ipPkhJ48dqcs3HDdWGeYV6bElWpB5Jv4z4g7SY9A2Gl4OPQlesPuzkaLz4cwULgD57ppAeOv8swXwVVv2THMKGjVBvHLYJIsbZc75dW2ypnM2ypY5us1QDXT6jUTLdnbfAO2XBWSZfINzmwR7-7x4eSEZ-2Kft2o2-KkprVBDPIYZ3Kxyxo77Q9MFght2XCDXK6Qt4fVB0o0-3-EDFGZmUGoWKL",
    aspectRatio: "card-medium",
    must_try_dishes: [
      { name: "KitKat Milkshake", tag: "Best Seller", description: "A rich, creamy milkshake blended with crunchy KitKat bars and topped with whipped cream and chocolate fudge.", price: "₹180" },
      { name: "Biscoff & Oreo Waffle", tag: "Signature", description: "Freshly baked golden waffle loaded with caramelized Lotus Biscoff spread and crushed Oreo cookies.", price: "₹240" },
      { name: "Chocolate Pancake Stack", tag: "Must Try", description: "Fluffy pancake stack drizzled with dark and white milk chocolate syrups, served with vanilla ice cream.", price: "₹210" }
    ]
  }
];
