"use client";

import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import products from "../data/products.json";
import Link from "next/link";

export default function HomePage() {
  const tips = [
    "💧 Stay hydrated daily",
    "🧴 Use sunscreen before going outside",
    "😎 Protect eyes with sunglasses",
    "🍉 Eat fresh fruits in summer",
  ];

  const brands = ["SunShade", "CoolFit", "FreshGo", "SkinCare"];

  const [tipIndex, setTipIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const brandProducts = selectedBrand
    ? products.filter((item) => item.brand === selectedBrand)
    : [];

  return (
    <main className="min-h-screen bg-[#fff5e8]">
      {/* HERO */}
      <Hero />

      {/* BRAND SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-orange-500 mb-10">
             Top Brands
        </h2>

        {/* BRAND BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedBrand === brand
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-100"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* BRAND PRODUCTS */}
        {selectedBrand && (
          <div>
            <h3 className="text-center text-3xl font-bold text-orange-500 mb-8">
              {selectedBrand} Products
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {brandProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">⭐ {item.rating}</p>
                  <p className="text-orange-500 text-xl font-bold mb-3">
                    ${item.price}
                  </p>
                  <Link
                    href={`/products/${item.id}`}
                    className="block text-center bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
{/* POPULAR PRODUCTS */}
<section className="max-w-6xl mx-auto px-4 pb-16">
  <h2 className="text-center text-4xl md:text-5xl font-bold text-orange-500 mb-10">
    🔥 Popular Products
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

    {products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
      .map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md p-4 hover:-translate-y-1 hover:shadow-xl transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-28 h-28 object-cover mx-auto rounded-xl mb-4"
          />

          <h3 className="text-sm font-bold text-gray-800 text-center line-clamp-1 mb-1">
            {item.name}
          </h3>

          <p className="text-xs text-gray-500 text-center mb-1">
            ⭐ {item.rating}
          </p>

          <p className="text-lg font-bold text-orange-500 text-center mb-3">
            ${item.price}
          </p>

          <Link
            href={`/products/${item.id}`}
            className="block text-center bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
          >
            View Details
          </Link>
        </div>
      ))}

  </div>
</section>
  


      {/* SUMMER TIPS */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-orange-500 mb-10">
          ☀️ Summer Care Tips
        </h2>

        <div className="bg-white rounded-3xl shadow-md p-8 text-center text-xl md:text-3xl font-semibold text-gray-800">
          {tips[tipIndex]}
        </div>
      </section>
    </main>
  );
}