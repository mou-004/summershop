import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6">
      <div className="grid md:grid-cols-2 items-center gap-8 bg-white/70 backdrop-blur-xl border border-white/30 rounded-[32px] shadow-2xl overflow-hidden p-6 md:p-10">

        {/* LEFT IMAGE */}
        <div className="relative h-[280px] sm:h-[360px] md:h-[460px] w-full rounded-3xl overflow-hidden group">
          <Image
            src="/19243.jpg"
            alt="Summer Sale"
            fill
            priority
            className="object-cover group-hover:scale-110 duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-center md:text-left">

          <p className="text-orange-500 font-semibold tracking-widest uppercase mb-3 animate-pulse">
            Limited Time Offer
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            <span className="inline-block animate-[fadeInUp_0.8s_ease]">
              Summer Sale
            </span>
            <br />
            <span className="text-orange-500 inline-block animate-[fadeInUp_1.2s_ease]">
              Up To 50% OFF
            </span>
          </h1>

          <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed animate-[fadeInUp_1.5s_ease]">
            Discover premium sunglasses, stylish accessories and top summer essentials for your lifestyle.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start animate-[fadeInUp_1.8s_ease]">
            <button
              
              className="px-7 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg transition duration-300 hover:scale-105"
            >
              Shop Now
            </button>

            <button
             
              className="px-7 py-3 rounded-full border border-gray-300 hover:border-orange-500 text-gray-800 font-semibold transition duration-300 hover:scale-105"
            >
              Explore Deals
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}